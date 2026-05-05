const GROQ_API_KEY = "";
const GROQ_API_MODEL = "llama-3.1-8b-instant";
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

function getLocalAnswer(userText) {
  const clean = userText.toLowerCase();
  return INTERNAL_BRAIN.find((item) =>
    item.keys.some((key) => clean.includes(key)),
  );
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
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
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

async function queryGroq(prompt) {
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
      options: { wait_for_model: true },
      parameters: {
        max_new_tokens: 500,
        temperature: 0.2,
        return_full_text: false,
      },
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
      if (errData.error) msg = errData.error;
    } catch (_) {}
    throw new Error(msg);
  }

  const data = await response.json();
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text;
  }
  if (data.error) {
    throw new Error(data.error);
  }
  throw new Error("Resposta inválida da API do Groq");
}

async function getAIResponse(userText) {
  const localMatch = getLocalAnswer(userText);
  const useBrowserAi = GROQ_USE_PROXY || (hasGroqApiKey() && !isFileProtocol());

  if (!useBrowserAi) {
    if (localMatch) {
      const parts = [{ type: "text", content: localMatch.text }];
      if (localMatch.code)
        parts.push({
          type: "code",
          lang: localMatch.lang || "text",
          content: localMatch.code,
        });
      parts.push({
        type: "text",
        content:
          "Nota: estou usando a resposta local porque o chat não pode acessar o Groq diretamente nesse modo. Rode o projeto via servidor local ou configure um backend para IA completa.",
      });
      return { parts, source: "local" };
    }

    const message =
      "Ainda não tenho uma resposta pronta para isso sem conexão com a IA. Use um tópico como JavaScript, Python, Git, CSS, API, Node.js, SQL, Docker ou carreira. Configure sua chave do Groq com setGroqApiKey('SEU_TOKEN') ou defina GROQ_API_KEY no backend em produção.";

    return {
      parts: [
        {
          type: "text",
          content: message,
        },
      ],
      source: "local",
    };
  }

  try {
    const prompt = buildPrompt(userText);
    const text = await queryGroq(prompt);
    const parts = parseAiResponse(text);
    if (parts.length > 0) return { parts, source: "groq" };
    throw new Error("Resposta vazia da IA");
  } catch (error) {
    console.warn("Falha na IA do Groq:", error);
    const offline = isOfflineError(error);

    if (localMatch) {
      const parts = [{ type: "text", content: localMatch.text }];
      if (localMatch.code)
        parts.push({
          type: "code",
          lang: localMatch.lang || "text",
          content: localMatch.code,
        });
      parts.push({
        type: "text",
        content: offline
          ? "Desculpe, tive um problema de conexão ao acessar a API do Groq, então usei uma resposta preparada localmente para continuar ajudando. Tente novamente quando estiver online ou rode o projeto via servidor local para acessar a IA completa."
          : "Desculpe, tive um problema ao acessar a API do Groq, então usei uma resposta preparada localmente para continuar ajudando. Tente novamente em alguns instantes ou rode o projeto com a API disponível para respostas completas.",
      });
      return { parts, source: "local" };
    }

    return {
      parts: [
        {
          type: "text",
          content: offline
            ? "Não consegui acessar a IA do Groq agora e não encontrei uma resposta pronta no meu banco interno. Tente novamente quando estiver online ou use um servidor local/proxy para acessar a IA completa."
            : "Ocorreu um problema ao acessar a IA do Groq e não encontrei uma resposta pronta no meu banco interno. Tente outro tópico de programação ou abra o projeto em um servidor local para usar a API completa.",
        },
      ],
      source: "error",
    };
  }
}

window.setGroqApiKey = setGroqApiKey;
window.isGroqApiKeyConfigured = hasGroqApiKey;
