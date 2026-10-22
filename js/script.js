// ════════════════════════════════════════════════════════════
// REFERÊNCIAS DO DOM
// ════════════════════════════════════════════════════════════
const chatWin = document.getElementById("chat-window");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");

// ════════════════════════════════════════════════════════════
// EFEITOS SONOROS
// ════════════════════════════════════════════════════════════
const anvilSound = new Audio("assets/anvil-use.mp3");

// ════════════════════════════════════════════════════════════
// RELÓGIO — atualiza a cada minuto
// ════════════════════════════════════════════════════════════
function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" },
  );
}
setInterval(updateClock, 1000);
updateClock();

// ════════════════════════════════════════════════════════════
// ADICIONAR MENSAGEM DE TEXTO
// ════════════════════════════════════════════════════════════
function addMsg(text, side, options = {}) {
  const wrap = document.createElement("div");
  wrap.className = `msg-wrap ${side}`;

  const bubble = document.createElement("div");
  bubble.className = "msg";
  if (options.html) {
    bubble.innerHTML = text;
  } else {
    bubble.textContent = text;
  }

  const time = document.createElement("span");
  time.className = "msg-time";
  time.textContent = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  wrap.appendChild(bubble);
  wrap.appendChild(time);
  chatWin.appendChild(wrap);
  return wrap;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderTextMarkdown(text) {
  let html = escapeHtml(text);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  const lines = html.split(/\r?\n/);
  let output = "";
  let inList = false;
  let inOrderedList = false;
  let inParagraph = false;

  function closeParagraph() {
    if (inParagraph) {
      output += "</p>";
      inParagraph = false;
    }
  }

  function closeLists() {
    if (inList) {
      output += "</ul>";
      inList = false;
    }
    if (inOrderedList) {
      output += "</ol>";
      inOrderedList = false;
    }
  }

  // Tabela markdown: junta as linhas "| a | b |" e desenha como <table>
  let tableRows = [];

  function closeTable() {
    if (!tableRows.length) return;
    const cells = (row) => row.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
    const [head, ...body] = tableRows;
    output += '<div class="md-table"><table><thead><tr>'
      + cells(head).map((c) => `<th>${c}</th>`).join("")
      + "</tr></thead><tbody>"
      + body.map((r) => "<tr>" + cells(r).map((c) => `<td>${c}</td>`).join("") + "</tr>").join("")
      + "</tbody></table></div>";
    tableRows = [];
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);

    if (trimmed.startsWith("|")) {
      closeParagraph();
      closeLists();
      // linha separadora "|---|:---:|" não vira linha da tabela
      if (!/^\|?[\s:|-]+\|?$/.test(trimmed)) tableRows.push(trimmed);
      if (index === lines.length - 1) closeTable();
      return;
    }
    closeTable();

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      closeParagraph();
      closeLists();
    } else if (headingMatch) {
      closeParagraph();
      closeLists();
      const level = Math.min(6, headingMatch[1].length);
      output += `<h${level}>${headingMatch[2]}</h${level}>`;
    } else if (/^&gt;\s?/.test(trimmed)) {
      closeParagraph();
      closeLists();
      output += `<blockquote>${trimmed.replace(/^&gt;\s?/, "")}</blockquote>`;
    } else if (bulletMatch) {
      closeParagraph();
      if (inOrderedList) {
        output += "</ol>";
        inOrderedList = false;
      }
      if (!inList) {
        inList = true;
        output += "<ul>";
      }
      output += `<li>${bulletMatch[1]}</li>`;
    } else if (orderedMatch) {
      closeParagraph();
      if (inList) {
        output += "</ul>";
        inList = false;
      }
      if (!inOrderedList) {
        inOrderedList = true;
        output += "<ol>";
      }
      output += `<li>${orderedMatch[1]}</li>`;
    } else if (trimmed === "") {
      closeParagraph();
      closeLists();
    } else {
      if (!inParagraph) {
        inParagraph = true;
        output += "<p>";
      } else {
        output += " ";
      }
      output += trimmed;
    }

    if (index === lines.length - 1) {
      closeParagraph();
      closeLists();
    }
  });

  return output;
}

// ════════════════════════════════════════════════════════════
// SYNTAX HIGHLIGHTER
// Protege strings/comentários → aplica cores → restaura
// ════════════════════════════════════════════════════════════
function highlightCode(code, lang) {
  if (!code) return "";
  try {
    const vault = [];

    function protect(text, type) {
      vault.push({ text, type });
      return "___TOKEN_" + (vault.length - 1) + "___";
    }

    // helper: aplica replace ignorando tokens
    function safeReplace(str, regex, replacer) {
      return str
        .split(/(___TOKEN_\d+___)/)
        .map((part) => {
          if (/^___TOKEN_\d+___$/.test(part)) return part;
          return part.replace(regex, replacer);
        })
        .join("");
    }

    // 1. Escapar HTML
    let s = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Proteger strings
    s = s.replace(/(`[\s\S]*?`)/g, (m) => protect(m, "str"));
    s = s.replace(/("(?:[^"\\]|\\.)*")/g, (m) => protect(m, "str"));
    s = s.replace(/('(?:[^'\\]|\\.)*')/g, (m) => protect(m, "str"));

    // 3. Proteger comentários
    const pyLike = ["python", "bash", "dockerfile", "yaml", "shell"];

    if (pyLike.includes(lang)) {
      s = s.replace(/(#[^\n]*)/g, (m) => protect(m, "cmt"));
    } else if (lang === "sql") {
      s = s.replace(/(--[^\n]*)/g, (m) => protect(m, "cmt"));
      s = s.replace(/(\/\*[\s\S]*?\*\/)/g, (m) => protect(m, "cmt"));
    } else {
      s = s.replace(/(\/\*[\s\S]*?\*\/)/g, (m) => protect(m, "cmt"));
      s = s.replace(/(\/\/[^\n]*)/g, (m) => protect(m, "cmt"));
    }

    // 4. Keywords
    const KW_JS =
      "const|let|var|function|return|class|if|else|for|while|do|async|await|import|export|default|new|this|from|of|in|typeof|instanceof|try|catch|finally|throw|static|extends|super|true|false|null|undefined|void|delete|switch|case|break|continue|yield|get|set";
    const KW_PY =
      "def|elif|with|pass|raise|lambda|and|or|not|True|False|None|self|global|nonlocal|as";
    const KW_SQL =
      "SELECT|FROM|WHERE|JOIN|INSERT|INTO|UPDATE|DELETE|CREATE|TABLE|VALUES|PRIMARY|KEY|UNIQUE|INDEX|INNER|LEFT|RIGHT|FULL|OUTER|GROUP|ORDER|BY|ON|AS|AND|OR|NOT|IN|LIKE|LIMIT|OFFSET|BEGIN|COMMIT|ROLLBACK|DEFAULT|REFERENCES|AUTOINCREMENT|SERIAL|FOREIGN|ALTER|ADD|DISTINCT|HAVING|UNION|COUNT|SUM|AVG|MAX|MIN|NULL|SET|DROP|TRUNCATE";

    let kw;
    if (lang === "sql") kw = KW_SQL;
    else if (pyLike.includes(lang)) kw = KW_JS + "|" + KW_PY;
    else kw = KW_JS + "|" + KW_PY;

    s = safeReplace(
      s,
      new RegExp(`\\b(${kw})\\b`, "g"),
      '<span class="hl-kw">$1</span>',
    );

    // 5. Números
    s = safeReplace(s, /\b(\d+\.?\d*)\b/g, '<span class="hl-num">$1</span>');

    // 6. HTML
    if (lang === "html" || lang === "jsx") {
      s = safeReplace(
        s,
        /(&lt;\/?)([\w-]+)/g,
        (_, slash, tag) => slash + '<span class="hl-tag">' + tag + "</span>",
      );

      s = safeReplace(
        s,
        /\s([\w-]+)(?==)/g,
        ' <span class="hl-attr">$1</span>',
      );
    }

    // 7. CSS
    if (lang === "css") {
      s = safeReplace(
        s,
        /([a-z-]+)(?=\s*:(?!:))/g,
        '<span class="hl-prop">$1</span>',
      );
    }

    // 8. Funções — antes de restaurar para não colorir dentro de strings
    s = safeReplace(
      s,
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g,
      '<span class="hl-fn">$1</span>',
    );

    // 9. Restaurar tokens (strings e comentários)
    s = s.replace(/___TOKEN_(\d+)___/g, (_, i) => {
      const { text, type } = vault[+i];
      return `<span class="${type === "str" ? "hl-str" : "hl-cmt"}">${text}</span>`;
    });

    return s;
  } catch (err) {
    console.error("Erro no Highlight:", err);
    // Fallback seguro: exibe o código sem cores, mas nunca o esconde
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

// ════════════════════════════════════════════════════════════
// BLOCO DE CÓDIGO — com botão de cópia + highlight
// ════════════════════════════════════════════════════════════
function addCodeBlock(code, lang) {
  const block = document.createElement("div");
  block.className = "code-block";

  // cabeçalho: linguagem + botão copiar
  const header = document.createElement("div");
  header.className = "code-header";

  const langTag = document.createElement("span");
  langTag.className = "code-lang";
  langTag.textContent = lang;

  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-btn";
  copyBtn.textContent = "⎘ Copiar";
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = "✓ Copiado!";
      copyBtn.classList.add("ok");
      setTimeout(() => {
        copyBtn.textContent = "⎘ Copiar";
        copyBtn.classList.remove("ok");
      }, 2000);
    });
  };

  const pre = document.createElement("pre");
  pre.innerHTML = highlightCode(code, lang);

  header.appendChild(langTag);
  header.appendChild(copyBtn);
  block.appendChild(header);
  block.appendChild(pre);
  chatWin.appendChild(block);
  return block;
}

// ════════════════════════════════════════════════════════════
// INDICADOR DE DIGITAÇÃO (três pontinhos animados)
// ════════════════════════════════════════════════════════════
function showTyping() {
  const wrap = document.createElement("div");
  wrap.id = "typing";
  wrap.className = "typing-indicator";
  wrap.innerHTML = `
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>`;
  chatWin.appendChild(wrap);
}

function hideTyping() {
  const el = document.getElementById("typing");
  if (el) el.remove();
}

// ════════════════════════════════════════════════════════════
// EXIBIR RESPOSTA DE IA
// ════════════════════════════════════════════════════════════
function renderAiResponse(response) {
  const followResponse = isNearBottom();
  hideTyping();
  let firstPart;

  // Textos seguidos viram um balão só (em vez de vários balõezinhos)
  const parts = [];
  response.parts.forEach((part) => {
    const last = parts[parts.length - 1];
    if (part.type === "text" && last?.type === "text") {
      last.content += "\n\n" + part.content;
    } else {
      parts.push({ ...part });
    }
  });

  parts.forEach((part) => {
    let element;
    if (part.type === "note") {
      // aviso discreto (ex.: "usei a forja local")
      element = document.createElement("div");
      element.className = "msg-note";
      element.textContent = part.content;
      chatWin.appendChild(element);
    } else if (part.type === "text") {
      element = addMsg(renderTextMarkdown(part.content), "bot", { html: true });
    } else if (part.type === "code") {
      element = addCodeBlock(part.content, part.lang || "text");
    }
    firstPart ||= element;
  });

  if (!firstPart) return;
  // Mostra a pergunta e o início da resposta sem interromper a leitura do histórico.
  if (followResponse) {
    const question = firstPart.previousElementSibling;
    const anchor = question?.classList.contains("user") ? question : firstPart;
    scrollChatTo(offsetInChat(anchor), true);
  } else {
    pendingAnswer = firstPart;
    showJumpButton();
  }
}

function offsetInChat(el) {
  const padding = parseFloat(getComputedStyle(chatWin).paddingTop);
  return chatWin.scrollTop + el.getBoundingClientRect().top
    - chatWin.getBoundingClientRect().top - chatWin.clientTop - padding;
}

// ════════════════════════════════════════════════════════════
// BOTÃO "NOVA RESPOSTA" — aparece se chegou resposta enquanto
// o usuário lia mensagens antigas
// ════════════════════════════════════════════════════════════
const jumpBtn = document.createElement("button");
jumpBtn.id = "jump-btn";
jumpBtn.type = "button";
jumpBtn.textContent = "↓ Nova resposta";
document.getElementById("app").appendChild(jumpBtn);
let pendingAnswer = null;

function showJumpButton() {
  const app = document.getElementById("app").getBoundingClientRect();
  const chat = chatWin.getBoundingClientRect();
  jumpBtn.style.setProperty("--jump-bottom", `${app.bottom - chat.bottom + 12}px`);
  jumpBtn.classList.add("show");
}

jumpBtn.onclick = () => {
  scrollChatTo(pendingAnswer ? offsetInChat(pendingAnswer) : chatWin.scrollHeight, true);
  pendingAnswer = null;
  jumpBtn.classList.remove("show");
};

chatWin.addEventListener("scroll", () => {
  if (jumpBtn.classList.contains("show") && isNearBottom()) {
    pendingAnswer = null;
    jumpBtn.classList.remove("show");
  }
}, { passive: true });

// ════════════════════════════════════════════════════════════
// ENVIAR MENSAGEM
// ════════════════════════════════════════════════════════════
async function sendMessage() {
  const text = input.value.trim();
  if (!text || sendBtn.disabled) return;

  // Reinicia e reproduz o som da bigorna
  anvilSound.currentTime = 0;
  anvilSound
    .play()
    .catch((err) => console.warn("Áudio bloqueado pelo navegador:", err));

  addMsg(text, "user");
  input.value = "";
  showTyping();
  sendBtn.disabled = true;
  input.disabled = true;
  scrollDown();

  try {
    const response = await getAIResponse(text);
    renderAiResponse(response);
    reactToTopic(text);
  } catch (error) {
    console.error("Erro ao gerar resposta de IA:", error);
    renderAiResponse({
      parts: [{
        type: "text",
        content: "Desculpe, algo deu errado ao buscar a resposta. Tente novamente em alguns instantes.",
      }],
    });
  } finally {
    hideTyping();
    sendBtn.disabled = false;
    input.disabled = false;
    if (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      [document.body, sendBtn].includes(document.activeElement)
    ) {
      input.focus({ preventScroll: true });
    }
  }
}

// ════════════════════════════════════════════════════════════
// QUICK ASK — botões de tópico rápido
// ════════════════════════════════════════════════════════════
function quickAsk(topic) {
  if (sendBtn.disabled) return;
  input.value = topic;
  sendMessage();
}

// ════════════════════════════════════════════════════════════
// LIMPAR CHAT
// ════════════════════════════════════════════════════════════
function clearChat() {
  chatWin.innerHTML = "";
  resetConversation();
  pendingAnswer = null;
  jumpBtn.classList.remove("show");
  init();
}

function isNearBottom() {
  return chatWin.scrollHeight - chatWin.clientHeight - chatWin.scrollTop <= 80;
}

function scrollChatTo(top, smooth = false) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  chatWin.scrollTo({
    top,
    behavior: smooth && !reducedMotion ? "smooth" : "auto",
  });
}

function scrollDown(smooth = false) {
  scrollChatTo(chatWin.scrollHeight, smooth);
}

// ════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ════════════════════════════════════════════════════════════
function init() {
  addMsg(
    "⚒️ A forja está acesa, dev! Sou o ByteForge.\nAqui eu não entrego código pronto: explico a ideia, te faço uma pergunta e deixo uma lacuna pra você completar. Travou? Eu dou a próxima pista.\nMe conta sua dúvida, cola o exercício ou escolhe um atalho abaixo!",
    "bot",
  );
}

// Eventos
sendBtn.onclick = sendMessage;
clearBtn.onclick = clearChat;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Inicia
init();

// ════════════════════════════════════════════════════════════
// MASCOTE INTERATIVO
// ════════════════════════════════════════════════════════════
const mascoteWrap = document.getElementById("mascote-wrap");
const bubble = document.getElementById("thought-bubble");
const eyePupilLeft = document.getElementById("eye-pupil-left");
const eyePupilRight = document.getElementById("eye-pupil-right");

const MAX_EYE_MOVE_X = 4; // Movimento horizontal restaurado!
const MAX_EYE_MOVE_Y = 2; // Movimento vertical (cima/baixo) limitado para não vazar a pupila

// Pensamentos periódicos — tema forja
const thoughts = [
  "⚒️ Martelando esse bug até ele virar função pura...",
  "🔥 Código bruto vira arte na forja certa",
  "⚙️ Temperatura do servidor: crítica. A bigorna aguenta?",
  "🔩 Deploy com estilo de Thor: só na marreta!",
  "⚒️ Bug na bigorna — vou refinar isso em aço inox",
  "🌋 Esse erro tá mais quente que overclock no inferno",
  "🔥 while (!funciona) { martela(); if (fw) break; }",
  "⚙️ Corrigi um bug, nascem 3 iguais à Hidra de Gorgon",
  "🔩 Na minha máquina tá forjado perfeito. No mundo real? veremos.",
  "⚒️ Deploy de sexta = jogar metal quente no frio. Só não chama o QA.",
  "🔥 console.log('vai aqui?') → ainda não fundiu, mas tá quase",
  "⚙️ NullPointerException é o minério mais traiçoeiro",
  "🌋 Sem café, a forja pára. Com café, o código voa.",
  "⚒️ Se tá funcionando, não mexe. Se não tá, martela mais.",
  "🔥 Bug intermitente = o fantasma da forja. Só expulsar com testes.",
  "⚙️ Frontend e backend discutindo igual ferro e fogo",
  "⚒️ Aqui a gente funde ideias e transforma em código útil",
  "🔥 return 42; // verdade universal e sarcasmo forjado",
  "⚙️ Mais uma camada de abstração... e agora virou armadura.",
  "⚒️ ctrl+c ctrl+v — arma de fogo do dev forjador",
  "🌋 Stack Overflow: minha bigorna favorita. Cultura de forja total.",
  "⚒️ Todo código vencedor já passou pela bigorna da refatoração.",
  "🔥 Esse terminal tá mais pegando fogo que forja de dragão.",
  "⚙️ Se o bug não se quebra, o código se adapta.",
  "💻 Um commit por dia mantém o pânico afastado.",
  "🧠 Essa branch tá mais perdida que variável global.",
  "⌨️ Se deu erro, reajusta. Se não deu, documenta.",
  "🐞 Bugs e café: a dieta padrão do dev forjador.",
  "🛠️ Refatorar é forjar duas vezes para ficar melhor.",
  "🦆 Expliquei o bug pro patinho de borracha. Ele pediu demissão.",
  "📦 node_modules pesa mais que a minha bigorna.",
  "🕳️ Existem 10 tipos de devs: os que entendem binário e os que não.",
  "⏳ 'É rapidinho' — disse o dev, três sprints atrás.",
  "🧯 Hotfix em produção: forjar com o martelo pegando fogo.",
  "🍝 Esse código legado é macarronada com molho de goto.",
  "🌙 Programador não dorme, entra em modo de espera.",
  "🔍 Passei 2 horas caçando bug. Era um ponto e vírgula.",
  "🧩 Funciona e eu não sei por quê. Não funciona e eu também não sei.",
  "📅 Estimativa de dev: pegue o número, dobre e troque a unidade.",
  "🤖 Eu não erro. Eu gero exceções não documentadas.",
  "🧱 A dívida técnica tá rendendo mais juros que a poupança.",
  "📜 Documentação? O código é autoexplicativo... pra mim, ontem.",
  "🐢 Meu código não é lento, ele é contemplativo.",
  "🔐 Senha forte: 'senha123' com uma bigorna em cima.",
  "🎯 99 bugs no código. Corrige um, compila... 127 bugs no código.",
  "🧪 Teste unitário passou. O teste de 'abrir no celular do chefe', não.",
  "🌐 Funciona no Chrome. No Safari a gente reza.",
  "🪓 Comentei o código inteiro. Agora compila!",
  "🧘 Respira... é só um merge conflict de 400 linhas.",
  "☕ Café: o verdadeiro combustível desta forja.",
  "🚀 Subi pra produção sexta 17h59. Até segunda, se tudo der certo.",
  "🗿 Variável chamada 'x2_final_agora_vai'. Clássico.",
  "🎲 Regex: resolvi um problema, agora tenho dois.",
];

// Reações ao clique — tema forja
const reactions = [
  "⚒️ Forjando código aqui, precisa de ajuda?",
  "🔥 Tô no calor da forja, pode falar!",
  "⚙️ Clique registrado no sistema de bigorna!",
  "🌋 Que metal quer fundir hoje?",
  "⚒️ A forja nunca para — bora trabalhar!",
  "🔥 Temperatura máxima. Produtividade ao nível lendário.",
  "⚙️ Deixa eu martelar esse bug com estilo geek 😎",
  "🔩 A bigorna já tá aquecida. Lança o próximo pedido!",
  "⚒️ Chamou? Tô forjando uma solução digna de um herói.",
  "🌋 Bug detectado — vai direto pra forja de recompilação! 🤖",
  "🔥 Código pronto pra ser temperado e lançado na produção.",
  "⚙️ Se a lógica fosse espada, eu a afiaria até brilhar.",
  "⚒️ Só um toque: bugs também entram na forja para se tornarem recursos.",
  "💻 Programador feliz: teclado, café e código compilando.",
  "🐛 Debug rápido? Só depois do terceiro café, né?",
  "🔁 Sempre testando no 'minha máquina' e depois no mundo real.",
  "🧠 Git é meu caderninho de versão; branch é mapa do tesouro.",
  "⌨️ Se o código não funciona, acrescente mais café. Ou teste.",
  "🧪 A melhor feature é a que buga menos na reunião de deploy.",
  "😵 Ei! Cuidado que eu tô segurando um martelo!",
  "🙃 Clicar em mim não resolve o bug... mas ajuda na moral.",
  "🛡️ Toca de novo e eu faço um git blame em você.",
  "🔨 Mais um clique e eu viro um loop infinito de pulos.",
  "🥵 Tá quente aqui, hein? Ah, é a forja mesmo.",
  "🫡 ByteForge à disposição, capitão!",
  "🎤 Testando, testando... 1, 2, 3... 0x04?",
  "🐉 Eu já forjei espada de dragão. Seu CRUD é moleza.",
  "🍕 Pagamento aceito em pizza e estrelinha no GitHub.",
  "🤓 Curiosidade: o primeiro bug foi uma mariposa de verdade (1947).",
  "🙈 Não olha pro meu código de 2019, por favor.",
  "📣 Lembrete: salve o arquivo. Agora. Confia.",
];

// Piadinhas por assunto da pergunta
const topicJokes = [
  { keys: ["javascript", " js", "node", "react"], jokes: [
    "🟨 JavaScript: onde [] + {} é '[object Object]' e tá tudo bem.",
    "🟨 '1' + 1 = '11'. '1' - 1 = 0. JS é arte abstrata.",
    "🟨 Usei var em 2026. A bigorna chorou.",
  ] },
  { keys: ["typescript", " ts"], jokes: [
    "🔷 TypeScript: JavaScript que foi pra terapia.",
    "🔷 any é o 'deixa quieto' do TypeScript.",
  ] },
  { keys: ["python", "django", "flask"], jokes: [
    "🐍 Python: onde um espaço a mais derruba a forja inteira.",
    "🐍 import antigravity — e o dev saiu voando.",
    "🐍 Tab ou espaço? Aqui é martelo.",
  ] },
  { keys: ["git", "commit", "branch", "merge"], jokes: [
    "🌿 git push --force: o martelo mais perigoso da forja.",
    "🌿 Mensagem do commit: 'ajustes'. 47 arquivos alterados.",
    "🌿 Git blame apontou pra mim. Que ofensa.",
  ] },
  { keys: ["css", "flex", "grid", "layout"], jokes: [
    "🎨 Centralizar uma div: o desafio final de todo herói.",
    "🎨 CSS é fácil, disse ninguém depois do z-index: 9999.",
    "🎨 !important em tudo. A forja virou anarquia.",
  ] },
  { keys: ["sql", "banco", "database", "query"], jokes: [
    "🗄️ DELETE sem WHERE: o grito mais rápido da TI.",
    "🗄️ Um SELECT entra num bar e pergunta: posso dar JOIN em vocês?",
    "🗄️ Backup? Eu achava que você tinha feito.",
  ] },
  { keys: ["docker", "container", "kubernetes"], jokes: [
    "🐳 'Funciona na minha máquina.' — Então mandamos a sua máquina. Nasceu o Docker.",
    "🐳 Container: a marmita do deploy.",
  ] },
  { keys: ["api", "rest", "http", "endpoint"], jokes: [
    "🌐 HTTP 418: sou uma bigorna, não uma chaleira.",
    "🌐 Status 200 com { erro: true } no corpo. Clássico.",
  ] },
  { keys: ["debug", "erro", "bug", "exception"], jokes: [
    "🐞 Debug: ser o detetive num crime em que você é o culpado.",
    "🐞 console.log('aqui'), console.log('aqui2'), console.log('AQUIIII')",
  ] },
  { keys: ["carreira", "emprego", "estágio", "estagio", "vaga"], jokes: [
    "💼 Vaga júnior: 5 anos de experiência em framework de 2 anos.",
    "💼 Dica de carreira: aprenda a ler erro antes de colar no Google.",
  ] },
];

let bubbleTimer;

// Escolhe onde o balão cabe inteiro: acima do título (desktop), ao lado do
// mascote (celular, cobrindo o título por alguns segundos) ou abaixo dele.
function positionBubble() {
  const titleRect = document.querySelector(".header-info h1").getBoundingClientRect();
  const mascoteRect = mascoteWrap.getBoundingClientRect();
  const viewport = window.visualViewport;
  const margin = 10;
  const leftEdge = (viewport?.offsetLeft || 0) + margin;
  const topEdge = (viewport?.offsetTop || 0) + margin;
  const rightEdge = leftEdge + (viewport?.width || window.innerWidth) - margin * 2;
  const bottomEdge = topEdge + (viewport?.height || window.innerHeight) - margin * 2;
  const mascoteCX = mascoteRect.left + mascoteRect.width / 2;
  const mascoteCY = mascoteRect.top + mascoteRect.height / 2;

  // 1) Acima do título
  bubble.dataset.placement = "above";
  bubble.style.maxWidth = `${Math.min(240, rightEdge - leftEdge)}px`;
  let width = bubble.offsetWidth;
  let height = bubble.offsetHeight;
  const above = titleRect.top - height - 10;
  if (above >= topEdge) {
    const left = Math.max(leftEdge, Math.min(
      titleRect.left + titleRect.width / 2 - width / 2,
      rightEdge - width,
    ));
    bubble.style.left = `${left}px`;
    bubble.style.top = `${above}px`;
    bubble.style.setProperty("--pointer-left",
      `${Math.max(16, Math.min(mascoteCX - left, width - 16))}px`);
    return;
  }

  // 2) Ao lado do mascote, com a seta apontando para ele
  const sideLeft = mascoteRect.right + 6;
  const appRight = document.getElementById("app").getBoundingClientRect().right - margin;
  const sideWidth = Math.min(300, Math.min(rightEdge, appRight) - sideLeft);
  if (sideWidth >= 150) {
    bubble.dataset.placement = "side";
    bubble.style.maxWidth = `${sideWidth}px`;
    height = bubble.offsetHeight;
    const top = Math.max(topEdge, Math.min(mascoteCY - height / 2, bottomEdge - height));
    bubble.style.left = `${sideLeft}px`;
    bubble.style.top = `${top}px`;
    bubble.style.setProperty("--pointer-top",
      `${Math.max(14, Math.min(mascoteCY - top, height - 14))}px`);
    return;
  }

  // 3) Abaixo do mascote
  bubble.dataset.placement = "below";
  bubble.style.maxWidth = `${rightEdge - leftEdge}px`;
  width = bubble.offsetWidth;
  height = bubble.offsetHeight;
  const left = Math.max(leftEdge, Math.min(mascoteCX - 24, rightEdge - width));
  bubble.style.left = `${left}px`;
  bubble.style.top = `${Math.min(mascoteRect.bottom + 10, bottomEdge - height)}px`;
  bubble.style.setProperty("--pointer-left",
    `${Math.max(16, Math.min(mascoteCX - left, width - 16))}px`);
}

function showBubble(text) {
  clearTimeout(bubbleTimer);
  bubble.textContent = text;
  positionBubble();
  bubble.classList.add("show");
  // Tempo de leitura proporcional ao tamanho da piada
  const duration = Math.min(9000, 2500 + text.length * 55);
  bubbleTimer = setTimeout(() => bubble.classList.remove("show"), duration);
}

// Sorteia sem repetir até esgotar a lista
function shuffleBag(list) {
  let bag = [];
  return () => {
    if (!bag.length) bag = [...list].sort(() => Math.random() - 0.5);
    return bag.pop();
  };
}

const nextThought = shuffleBag(thoughts);
const nextReaction = shuffleBag(reactions);

// Piadinha sobre o assunto da pergunta (palavra-chave → lista)
function reactToTopic(text) {
  const lower = " " + text.toLowerCase();
  const topic = topicJokes.find(({ keys }) => keys.some((k) => lower.includes(k)));
  if (!topic) return;
  setTimeout(() => {
    showBubble(topic.jokes[Math.floor(Math.random() * topic.jokes.length)]);
  }, 900);
}

function syncViewport() {
  const viewport = window.visualViewport;
  const atBottom = isNearBottom();
  // A altura visível acompanha o teclado sem redimensionar o app durante o zoom.
  if (!viewport || viewport.scale === 1) {
    document.documentElement.classList.toggle(
      "short-viewport", (viewport?.height || window.innerHeight) < 320,
    );
    document.documentElement.style.setProperty(
      "--viewport-height", `${viewport?.height || window.innerHeight}px`,
    );
    if (atBottom) scrollDown();
  }
  if (bubble.classList.contains("show")) positionBubble();
}

window.addEventListener("resize", syncViewport);
window.visualViewport?.addEventListener("resize", syncViewport);
window.visualViewport?.addEventListener("scroll", () => {
  if (bubble.classList.contains("show")) positionBubble();
});
syncViewport();

// Clique no mascote → pula + reação
mascoteWrap.addEventListener("click", () => {
  mascoteWrap.classList.remove("bouncing");
  void mascoteWrap.offsetWidth; // reflow para reiniciar animação
  mascoteWrap.classList.add("bouncing");
  mascoteWrap.addEventListener(
    "animationend",
    () => {
      mascoteWrap.classList.remove("bouncing");
    },
    { once: true },
  );

  showBubble(nextReaction());
});

// Pensamentos automáticos (12 – 22 s)
function schedulePensamento() {
  const delay = 12000 + Math.random() * 10000;
  setTimeout(() => {
    // Não interrompe uma piada que ainda está na tela
    if (!bubble.classList.contains("show")) showBubble(nextThought());
    schedulePensamento();
  }, delay);
}
setTimeout(schedulePensamento, 8000); // primeiro após 8 s

// Olhos seguem o mouse em X e Y
document.addEventListener("mousemove", (e) => {
  const svgRect = document.getElementById("byteforge").getBoundingClientRect();
  const svgCX = svgRect.left + svgRect.width / 2;
  const svgCY = svgRect.top + svgRect.height / 2;

  const normX = Math.max(
    -1,
    Math.min(1, (e.clientX - svgCX) / (window.innerWidth * 0.5)),
  );
  const normY = Math.max(
    -1,
    Math.min(1, (e.clientY - svgCY) / (window.innerHeight * 0.5)),
  );

  const dx = (normX * MAX_EYE_MOVE_X).toFixed(2);
  const dy = (normY * MAX_EYE_MOVE_Y).toFixed(2);

  if (eyePupilLeft)
    eyePupilLeft.style.transform = `translate(${dx}px, ${dy}px)`;
  if (eyePupilRight)
    eyePupilRight.style.transform = `translate(${dx}px, ${dy}px)`;
});
