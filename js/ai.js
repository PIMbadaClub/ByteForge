const GROQ_API_KEY = "";
const GROQ_API_MODEL = "openai/gpt-oss-20b";
const GROQ_USE_PROXY = true;

function getGroqApiKey() {
  return GROQ_API_KEY || localStorage.getItem("groq_api_key");
}

function getGroqProxyUrl() {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const isLocalhost = /^(localhost|127\.0\.0\.1|::1)$/.test(host);
    if (isLocalhost) {
      return "http://localhost:3000/groq";
    }
  }
  return "/api/groq";
}

function isFileProtocol() {
  return typeof window !== "undefined" && window.location.protocol === "file:";
}

const LOCAL_FALLBACK = [
  {
    keys: [
      "oi",
      "olá",
      "ola",
      "hey",
      "hello",
      "bom dia",
      "boa tarde",
      "boa noite",
      "tudo",
    ],
    text: "Olá, dev! Sou o ByteForge, seu assistente de programação. Posso ajudar com JavaScript, Python, Git, CSS, APIs, TypeScript, Docker e muito mais.\nO que vamos aprender hoje?",
  },
  {
    keys: [
      "quem",
      "você",
      "voce",
      "byteforge",
      "o que é",
      "o que voce",
      "quem é",
    ],
    text: "Sou o ByteForge — um assistente de programação criado para ajudar devs. Respondo dúvidas sobre código, linguagens, ferramentas e boas práticas. Use os atalhos ou escreva qualquer tópico de programação!",
  },
  {
    keys: [
      "javascript",
      " js ",
      "js,",
      "var ",
      "const ",
      "let ",
      "function ",
      "=>",
    ],
    text: "JavaScript é a linguagem da web — roda no browser e no servidor (Node.js). Veja os fundamentos básicos:",
    code: `// Declaração de variáveis\nconst nome = "Dev";\nlet idade = 20;\n\n// Condicional if / else\nif (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}\n\n// Laço for\nfor (let i = 0; i < 5; i++) {\n  console.log("Número:", i);\n}\n\n// Função básica\nfunction somar(a, b) {\n  return a + b;\n}\nconsole.log(somar(3, 4)); // 7`,
    lang: "javascript",
  },
  {
    keys: ["python", "pip", "django", "flask"],
    text: "Python é fácil de aprender e muito poderoso — usado em IA, automação e backend. Veja os fundamentos básicos:",
    code: `# Variáveis (sem declaração de tipo)\nnome = "Dev"\nidade = 20\npi = 3.14\n\n# Condicional if / elif / else\nif idade >= 18:\n    print("Maior de idade")\nelif idade == 17:\n    print("Quase lá!")\nelse:\n    print("Menor de idade")\n\n# Laço for\nfor i in range(5):\n    print("Número:", i)\n\n# Laço while\ncontador = 0\nwhile contador < 3:\n    print(contador)\n    contador += 1\n\n# Função básica\ndef somar(a, b):\n    return a + b\n\nprint(somar(3, 4))  # 7`,
    lang: "python",
  },
  {
    keys: ["git", "commit", "branch", "merge", "rebase", "github"],
    text: "Git controla versões do código e facilita o trabalho em equipe. Comandos básicos do dia a dia:",
    code: `# Configuração inicial\ngit config --global user.name "Seu Nome"\ngit config --global user.email "seu@email.com"\n\n# Iniciar um repositório\ngit init\n\n# Ver o estado atual do projeto\ngit status\n\n# Registrar alterações\ngit add .\ngit commit -m "mensagem"\n\n# Enviar e receber do repositório remoto\ngit push origin main\ngit pull origin main\n\n# Branches\ngit branch\ngit checkout -b nova-feature\ngit merge nova-feature`,
    lang: "bash",
  },
  {
    keys: ["css", "estilo", "flexbox", "grid", "layout", "responsivo"],
    text: "CSS define o visual da página. Aqui estão alguns conceitos importantes:",
    code: `/* Seletores básicos */\nh1 { color: blue; }\n.destaque { font-weight: bold; }\n#titulo { font-size: 24px; }\n\n/* Box model */\n.caixa {\n  margin: 16px;\n  padding: 12px;\n  border: 1px solid #ccc;\n  width: 300px;\n}\n\n/* Flexbox */\n.centro {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n:root {\n  --cor-principal: #58a6ff;\n  --espacamento: 16px;\n}`,
    lang: "css",
  },
  {
    keys: ["api", "rest", "fetch", "axios", "http", "endpoint", "request"],
    text: "APIs representam comunicação entre sistemas. Exemplo com fetch:",
    code: `// GET: buscar dados\nfetch("https://api.exemplo.com/usuarios")\n  .then(res => res.json())\n  .then(dados => console.log(dados))\n  .catch(erro => console.error("Erro:", erro));\n\n// POST: enviar dados\nfetch("https://api.exemplo.com/usuarios", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ nome: "Ana", idade: 25 })\n})\n  .then(res => res.json())\n  .then(novo => console.log("Criado:", novo));`,
    lang: "javascript",
  },
  {
    keys: ["docker", "container", "dockerfile", "imagem", "compose"],
    text: "Docker empacota aplicativos em containers. Veja um Dockerfile simples para Node.js:",
    code: `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]`,
    lang: "dockerfile",
  },
  {
    keys: ["debug", "erro", "bug", "error", "problema", "fix", "console"],
    text: "Debug — como encontrar e corrigir erros no código:\n\n• `console.log()` para ver valores em tempo real\n• `console.table()` para arrays e objetos\n• Breakpoints no DevTools (F12) — pausa a execução\n• Leia o stack trace: indica o arquivo e a linha do erro\n• Isole o problema: comente o código até o bug sumir\n• Use `typeof x` para ver o tipo de uma variável",
    code: `// Inspecionar valores\nlet x = 42;\nconsole.log("x =", x);          // x = 42\nconsole.log(typeof x);           // "number"\n\n// Visualizar array ou objeto\nconst frutas = ["maçã", "banana", "uva"];\nconsole.table(frutas);\n\n// Capturar erros com try/catch\ntry {\n    let resultado = JSON.parse("texto inválido");\n} catch (erro) {\n    console.error("Erro:", erro.message);\n}\n\n// Verificar tipo antes de usar\nfunction dobrar(n) {\n    if (typeof n !== "number") {\n        console.warn("Esperado um número, recebeu:", typeof n);\n        return;\n    }\n    return n * 2;\n}`,
    lang: "javascript",
  },
  {
    keys: [
      "sql",
      "banco",
      "database",
      "mysql",
      "postgres",
      "sqlite",
      "query",
      "select",
      "insert",
    ],
    text: "SQL — linguagem para criar e manipular bancos de dados.\nOs 4 comandos essenciais (CRUD):",
    code: `-- Criar tabela\nCREATE TABLE alunos (\n    id    INT PRIMARY KEY AUTO_INCREMENT,\n    nome  VARCHAR(100) NOT NULL,\n    nota  DECIMAL(4,2)\n);\n\n-- Inserir dados (Create)\nINSERT INTO alunos (nome, nota)\nVALUES ('Ana', 9.5), ('João', 7.0);\n\n-- Consultar dados (Read)\nSELECT * FROM alunos;\nSELECT nome, nota FROM alunos WHERE nota >= 7;\n\n-- Atualizar dados (Update)\nUPDATE alunos SET nota = 8.0 WHERE nome = 'João';\n\n-- Remover dados (Delete)\nDELETE FROM alunos WHERE id = 1;`,
    lang: "sql",
  },
  {
    keys: ["typescript", "ts", "tipagem", "type", "interface", "generics"],
    text: "TypeScript adiciona tipos ao JavaScript, ajudando a pegar erros antes de rodar o código:",
    code: `// Tipos básicos\nlet nome:   string  = "Dev";\nlet idade:  number  = 20;\nlet ativo:  boolean = true;\n\n// Array tipado\nlet notas: number[] = [9, 7, 8.5];\n\n// Condicional com tipo\nif (idade >= 18) {\n    console.log("Maior de idade");\n} else {\n    console.log("Menor de idade");\n}\n\n// Interface — define a forma de um objeto\ninterface Usuario {\n    nome:   string;\n    idade:  number;\n    email?: string; // ? = opcional\n}\n\n// Função com tipos definidos\nfunction saudar(usuario: Usuario): string {\n    return \`Olá, \${usuario.nome}!\`;\n}\n\nconst dev: Usuario = { nome: "Ana", idade: 25 };\nconsole.log(saudar(dev)); // "Olá, Ana!"`,
    lang: "typescript",
  },
  {
    keys: ["carreira", "emprego", "vaga", "dev", "programador"],
    text: "Carreira em tecnologia pede prática, curiosidade e networking. Comece com pequenos projetos, mantenha um portfólio e estude Git e boas práticas.",
  },
];

function hasGroqApiKey() {
  return Boolean(getGroqApiKey());
}

function setGroqApiKey(key) {
  const normalized = String(key || "").trim();
  if (!normalized) {
    localStorage.removeItem("groq_api_key");
    return;
  }
  localStorage.setItem("groq_api_key", normalized);
}

const INTERNAL_BRAIN = typeof brain !== "undefined" ? brain : LOCAL_FALLBACK;
const LOCAL_EXERCISES = typeof exercicios !== "undefined" ? exercicios : [];

// A palavra-chave precisa começar uma palavra ("impar" não casa com "limpar")
function keyScore(clean, key) {
  const k = key.trim().toLowerCase();
  if (!k) return 0;
  const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}`, "u").test(clean) ? k.length : 0;
}

// Escolhe a entrada cuja palavra-chave mais longa aparece no texto
// ("typescript" ganha de "type")
function findBest(list, userText) {
  const clean = ` ${userText.toLowerCase()} `;
  let best = null;
  let bestScore = 0;
  for (const item of list) {
    const score = Math.max(0, ...item.keys.map((key) => keyScore(clean, key)));
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return best;
}

function getLocalAnswer(userText) {
  return findBest(INTERNAL_BRAIN, userText);
}

// ════════════════════════════════════════════════════════════
// TUTOR OFFLINE — exercício em andamento e pista atual
// ════════════════════════════════════════════════════════════
let currentExercise = null; // { ex, step }

const STUCK_WORDS = /travei|não sei|nao sei|desisto|pista|dica|ajuda|não entendi|nao entendi|não consegui|nao consegui|socorro/i;

function localTutorAnswer(userText) {
  const newExercise = findBest(LOCAL_EXERCISES, userText);
  if (newExercise && newExercise !== currentExercise?.ex) {
    currentExercise = { ex: newExercise, step: 0 };
    return pistaParts(newExercise.pistas[0]);
  }

  if (!currentExercise) return null;
  const { ex } = currentExercise;

  if (ex.acerto.test(userText)) {
    currentExercise = null;
    return [{ type: "text", content: ex.parabens }];
  }

  // Mudou de assunto: sai do exercício e deixa o banco de respostas tentar
  if (getLocalAnswer(userText) && !STUCK_WORDS.test(userText)) {
    currentExercise = null;
    return null;
  }

  currentExercise.step = Math.min(currentExercise.step + 1, ex.pistas.length - 1);
  const parts = pistaParts(ex.pistas[currentExercise.step]);
  if (currentExercise.step === ex.pistas.length - 1) {
    parts.push({
      type: "text",
      content: "Essa foi a minha última pista. Tenta montar o código e me manda aqui que eu confiro com você! 🔨",
    });
  }
  return parts;
}

function pistaParts(pista) {
  const parts = [{ type: "text", content: pista.text }];
  if (pista.code) parts.push({ type: "code", lang: pista.lang || "text", content: pista.code });
  parts.push({
    type: "text",
    content: "Travou? Me conta o que tentou que eu te dou a próxima pista.",
  });
  return parts;
}

function brainParts(item) {
  const parts = [{ type: "text", content: item.text }];
  if (item.code) parts.push({ type: "code", lang: item.lang || "text", content: item.code });
  if (item.pergunta) parts.push({ type: "text", content: item.pergunta });
  return parts;
}

// ════════════════════════════════════════════════════════════
// HISTÓRICO — a IA precisa lembrar da conversa para dar a
// "próxima pista" em vez de recomeçar do zero a cada mensagem
// ════════════════════════════════════════════════════════════
const chatHistory = [];

function rememberTurn(userText, parts) {
  const answer = parts
    .filter((p) => p.type !== "note")
    .map((p) => (p.type === "code" ? "```" + p.lang + "\n" + p.content + "\n```" : p.content))
    .join("\n\n");
  chatHistory.push({ role: "user", content: userText }, { role: "assistant", content: answer });
  chatHistory.splice(0, Math.max(0, chatHistory.length - 12));
}

function resetConversation() {
  chatHistory.length = 0;
  currentExercise = null;
}

function isOfflineError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    (typeof navigator !== "undefined" && navigator.onLine === false) ||
    /network|failed to fetch|offline|cors|connection/i.test(message)
  );
}

function buildPrompt(userText) {
  return userText;
}

function parseAiResponse(text) {
  const blocks = [];
  text = text.replace(/<think>[\s\S]*?<\/think>/g, "").replace(/\r\n/g, "\n");
  // Bloco de código que veio sem fechar (resposta cortada): fecha no fim
  if ((text.match(/```/g) || []).length % 2 === 1) text += "\n```";
  const regex = /```([\w+#-]*)[^\n]*\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({
        type: "text",
        content: text.slice(lastIndex, match.index).trim(),
      });
    }
    blocks.push({
      type: "code",
      lang: match[1] || "text",
      content: match[2].trim(),
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    blocks.push({ type: "text", content: text.slice(lastIndex).trim() });
  }

  return blocks.filter((block) => block.content.length > 0);
}

async function queryGroq(prompt, history = []) {
  const token = getGroqApiKey();
  const useProxy = GROQ_USE_PROXY;
  const endpoint = useProxy
    ? getGroqProxyUrl()
    : "https://api.groq.com/openai/v1/chat/completions";

  if (!useProxy && !token) {
    throw new Error("Chave do Groq não configurada.");
  }

  let response;
  try {
    const payload = {
      inputs: prompt,
      messages: [...history, { role: "user", content: prompt }],
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (!useProxy) {
      headers.Authorization = `Bearer ${token}`;
    }

    response = await fetch(endpoint, {
      method: "POST",
      mode: "cors",
      cache: "no-store",
      headers,
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new Error(
      "Falha de rede/CORS ao conectar com o Groq. Verifique a chave e o proxy local.",
    );
  }

  if (!response.ok) {
    let msg = `Groq API falhou com status ${response.status}`;
    try {
      const errData = await response.json();
      if (errData.error) {
        msg =
          typeof errData.error === "object"
            ? errData.error.message || JSON.stringify(errData.error)
            : errData.error;
      }
    } catch (_) {}
    throw new Error(msg);
  }

  const data = await response.json();
  if (Array.isArray(data) && data[0]?.generated_text) {
    return { text: data[0].generated_text, truncated: Boolean(data[0].truncated) };
  }
  if (data.error) {
    const errMsg =
      typeof data.error === "object"
        ? data.error.message || JSON.stringify(data.error)
        : data.error;
    throw new Error(errMsg);
  }
  throw new Error("Resposta inválida da API do Groq");
}

// Resposta do plano B: exercício guiado > banco de respostas > aviso
function localAnswer(userText, note) {
  const tutor = localTutorAnswer(userText);
  const match = tutor ? null : getLocalAnswer(userText);
  let parts;

  if (tutor) {
    parts = tutor;
  } else if (match) {
    parts = brainParts(match);
  } else {
    return {
      parts: [{
        type: "text",
        content: "Ainda não tenho uma resposta guardada para isso e a IA está fora do ar agora. 😅 Tenta um tema como **Python**, **JavaScript**, **Git** ou **SQL**, ou um exercício clássico: *inverter uma palavra*, *par ou ímpar*, *tabuada*, *fatorial*, *FizzBuzz*...",
      }],
      source: "error",
    };
  }

  if (note) parts.push({ type: "note", content: note });
  rememberTurn(userText, parts);
  return { parts, source: "local", progress: getExerciseProgress() };
}

function getExerciseProgress() {
  if (!currentExercise) return null;
  return {
    step: currentExercise.step + 1,
    total: currentExercise.ex.pistas.length,
  };
}

async function getAIResponse(userText) {
  // Mudou de assunto no meio do exercício: sai da trilha e deixa a IA responder
  if (currentExercise && !findBest(LOCAL_EXERCISES, userText)
      && getLocalAnswer(userText) && !STUCK_WORDS.test(userText)) {
    currentExercise = null;
  }
  // Exercícios do catálogo usam sempre a mesma trilha, inclusive se a IA voltar.
  if (currentExercise || findBest(LOCAL_EXERCISES, userText)) {
    return localAnswer(userText);
  }
  const useBrowserAi = GROQ_USE_PROXY || (hasGroqApiKey() && !isFileProtocol());

  if (!useBrowserAi) {
    return localAnswer(userText, "Modo offline: resposta da forja local.");
  }

  try {
    const prompt = buildPrompt(userText);
    const { text, truncated } = await queryGroq(prompt, chatHistory);
    const parts = parseAiResponse(text);
    if (!parts.length) throw new Error("Resposta vazia da IA");

    if (truncated) {
      parts.push({
        type: "note",
        content: "A resposta ficou longa e foi cortada. Pede \"continua\" que eu sigo de onde parei.",
      });
    }
    // A IA assumiu a conversa: o exercício offline não continua por baixo
    currentExercise = null;
    rememberTurn(userText, parts);
    return { parts, source: "groq" };
  } catch (error) {
    console.warn("Falha na IA do Groq:", error);
    const note = isOfflineError(error)
      ? "Sem conexão com a IA agora: usei a forja local."
      : "A IA não respondeu agora: usei a forja local.";
    return localAnswer(userText, note);
  }
}

const SESSION_KEY = "byteforge-session-v1";
let savedTurns = [];

function readSavedSession() {
  try {
    const data = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return data?.version === 1 && Array.isArray(data.turns) ? data : null;
  } catch {
    return null;
  }
}

function persistTurn(userText, response) {
  savedTurns.push({ userText, response });
  savedTurns = savedTurns.slice(-30);
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      version: 1,
      turns: savedTurns,
      history: chatHistory,
      exercise: currentExercise && {
        index: LOCAL_EXERCISES.indexOf(currentExercise.ex),
        step: currentExercise.step,
      },
    }));
  } catch (error) {
    console.warn("Não foi possível salvar a conversa neste navegador:", error);
  }
}

function restoreSession(data) {
  savedTurns = data.turns.slice(-30);
  chatHistory.length = 0;
  chatHistory.push(...(Array.isArray(data.history) ? data.history.slice(-12) : []));
  const index = data.exercise?.index;
  const ex = Number.isInteger(index) ? LOCAL_EXERCISES[index] : null;
  currentExercise = ex ? {
    ex,
    step: Math.max(0, Math.min(Number(data.exercise.step) || 0, ex.pistas.length - 1)),
  } : null;
  return savedTurns;
}

function clearSavedSession() {
  savedTurns = [];
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

window.setGroqApiKey = setGroqApiKey;
window.isGroqApiKeyConfigured = hasGroqApiKey;
