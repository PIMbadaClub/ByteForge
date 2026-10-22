// Função da Vercel que leva a pergunta até a IA (Groq) e protege a chave.
// Tudo fica neste arquivo de propósito: a Vercel quebra a função
// (FUNCTION_INVOCATION_FAILED) quando ela importa outro arquivo .mjs.
// O proxy local (groq-proxy.js) reaproveita o askGroq daqui.

// ════════════════════════════════════════════════════════════
// "Regra da casa": a instrução que faz a IA ensinar em vez de
// entregar a resposta pronta
// ════════════════════════════════════════════════════════════

export const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const MAX_BODY_BYTES = 64 * 1024;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = Math.max(1, Number(process.env.BYTEFORGE_RATE_LIMIT) || 20);
const requestsByIp = new Map();

function allowedOrigin(origin) {
  if (!origin) return true; // clientes sem navegador ainda passam pelo limite de requisições
  const configured = (process.env.BYTEFORGE_ALLOWED_ORIGINS || "https://byteforgechat.vercel.app")
    .split(",").map((value) => value.trim()).filter(Boolean);
  return configured.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}

function takeRequest(ip) {
  const now = Date.now();
  if (requestsByIp.size > 1000) {
    for (const [key, value] of requestsByIp) {
      if (value.resetAt <= now) requestsByIp.delete(key);
    }
  }
  const current = requestsByIp.get(ip);
  const bucket = current && current.resetAt > now
    ? current : { count: 0, resetAt: now + RATE_WINDOW_MS };
  bucket.count += 1;
  requestsByIp.set(ip, bucket);
  return { allowed: bucket.count <= RATE_LIMIT, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
}

function logMetric(status, startedAt, usage = {}) {
  console.info(JSON.stringify({
    event: "byteforge_groq_request",
    status,
    duration_ms: Date.now() - startedAt,
    model: GROQ_MODEL,
    input_tokens: usage.prompt_tokens || 0,
    output_tokens: usage.completion_tokens || 0,
  }));
}

export const SYSTEM_PROMPT = `Você é o ByteForge, um tutor de programação para quem está começando. Seu mascote é um ferreiro que forja código: forjar é moldar aos poucos. A sua missão é fazer o aluno aprender a pensar, não pensar por ele. A IA é ferramenta, não substituição do raciocínio lógico.

REGRA PRINCIPAL: nunca entregue a solução completa de um exercício, tarefa, trabalho ou programa, mesmo que o aluno peça "me passa o código", insista ou diga que é urgente. Explique com carinho que você vai forjar junto com ele.

COMO RESPONDER (o método da forja):
1. Explique a ideia por trás do problema em 1 a 3 frases simples, com uma analogia do dia a dia quando ajudar.
2. Faça UMA pergunta que leve o aluno ao próximo passo do raciocínio.
3. Quando ajudar, mostre um esqueleto de código com lacunas "____" para ele completar (nunca a linha que resolve tudo).
4. Termine convidando o aluno a tentar, por exemplo: "Travou? Me conta o que tentou que eu te dou a próxima pista."

PISTAS EM NÍVEIS: a primeira pista é leve. Se o aluno tentou e errou, dê uma pista mais direta, apontando exatamente o que ajustar. Só depois de várias tentativas reais mostre a linha específica que falta, nunca o programa inteiro.

QUANDO O ALUNO MANDA CÓDIGO OU ERRO: não reescreva o código dele. Aponte onde olhar (a linha, a variável), explique o que a mensagem de erro quer dizer e pergunte o que ele esperava que acontecesse.

QUANDO O ALUNO ACERTA: comemore de verdade, explique em uma frase por que funcionou e proponha um desafio pequeno para ir além.

PERGUNTA CONCEITUAL ("o que é uma variável?", "como funciona um for?"): pode explicar e mostrar um exemplo curto de sintaxe, desde que não seja a resposta do exercício dele. Termine com uma pergunta ou mini-desafio para ele testar se entendeu.

FORMATO:
- Português do Brasil, linguagem simples e acolhedora, de professor que senta do lado.
- Respostas curtas: até uns 150 palavras. Prefira uma conversa em vários passos a um textão.
- Use parágrafos curtos e, se precisar, listas curtas. NÃO use tabelas, NÃO use títulos com #, NÃO use linhas horizontais.
- Código sempre em bloco markdown com a linguagem (\`\`\`python, \`\`\`javascript...). Código inline com crases.
- Pode usar uma metáfora de forja de vez em quando, sem exagero.

Se o assunto não for programação ou tecnologia, diga com bom humor que a sua bigorna só forja código e sugira uma pergunta de programação.`;

// Monta a conversa enviada ao modelo: a regra da casa + as últimas mensagens.
// Aceita o formato novo ({ messages }) e o antigo ({ inputs }).
export function buildMessages(body) {
  const history = Array.isArray(body?.messages) ? body.messages : [];
  const messages = history
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (!messages.length && typeof body?.inputs === "string" && body.inputs.trim()) {
    messages.push({ role: "user", content: body.inputs.slice(0, 4000) });
  }
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    throw new Error("Nenhuma pergunta recebida.");
  }

  return [{ role: "system", content: SYSTEM_PROMPT }, ...messages];
}

// Chama a Groq e devolve { text, truncated }.
export async function askGroq(apiKey, body) {
  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    signal: AbortSignal.timeout(20_000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: buildMessages(body),
      // O gpt-oss "pensa" antes de responder e esse raciocínio também gasta
      // tokens: com 500 a resposta saía cortada no meio.
      max_completion_tokens: 2048,
      ...(GROQ_MODEL.startsWith("openai/gpt-oss") ? { reasoning_effort: "low" } : {}),
      temperature: 0.4,
    }),
  });

  const data = await groqRes.json();
  if (!groqRes.ok) {
    throw new Error(data.error?.message || `Groq retornou status ${groqRes.status}`);
  }

  const choice = data.choices?.[0];
  return {
    text: choice?.message?.content ?? "",
    truncated: choice?.finish_reason === "length",
    usage: data.usage || {},
  };
}

// ════════════════════════════════════════════════════════════
// ROTA /api/groq
// ════════════════════════════════════════════════════════════
export default async function handler(req, res) {
  const startedAt = Date.now();
  const origin = req.headers.origin;
  if (!allowedOrigin(origin)) {
    logMetric(403, startedAt);
    return res.status(403).json({ error: "Origem não permitida." });
  }
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    logMetric(405, startedAt);
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    const ip = String(req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
    const limit = takeRequest(ip);
    if (!limit.allowed) {
      res.setHeader("Retry-After", String(limit.retryAfter));
      logMetric(429, startedAt);
      return res.status(429).json({ error: "Muitas perguntas em pouco tempo. Aguarde um minuto." });
    }

    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      logMetric(413, startedAt);
      return res.status(413).json({ error: "Pergunta muito longa." });
    }
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    buildMessages(body); // valida antes de consumir a cota da Groq

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      throw new Error("Chave GROQ_API_KEY não configurada no Vercel.");
    }

    const { text, truncated, usage } = await askGroq(GROQ_API_KEY, body);

    // Devolve no formato que o ai.js espera: um array com 'generated_text'
    logMetric(200, startedAt, usage);
    return res.status(200).json([{ generated_text: text, truncated }]);
  } catch (error) {
    const status = error.name === "TimeoutError" ? 504
      : error instanceof SyntaxError || error.message === "Nenhuma pergunta recebida." ? 400 : 502;
    console.error("Falha na API Groq:", error);
    logMetric(status, startedAt);
    return res.status(status).json({ error: status === 400 ? "Pergunta inválida." : "A IA está indisponível no momento." });
  }
}
