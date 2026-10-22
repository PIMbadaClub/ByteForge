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
function renderAiResponse(response, { historyMode = false } = {}) {
  const followResponse = isNearBottom();
  hideTyping();
  if (!historyMode) {
    chatWin.querySelectorAll(".trail textarea, .trail-actions").forEach((control) => control.remove());
  }
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

  if (response.source) {
    const badge = document.createElement("div");
    badge.className = "source-badge";
    badge.textContent = response.source === "groq" ? "Resposta da IA"
      : response.source === "local" ? "Forja local" : "Resposta indisponível";
    chatWin.appendChild(badge);
    firstPart ||= badge;
  }

  if (response.progress && !historyMode) {
    const { step, total } = response.progress;
    const trail = document.createElement("div");
    trail.className = "trail";
    const label = document.createElement("div");
    label.className = "trail-progress";
    label.textContent = `Pista ${step} de ${total}`;
    const attempt = document.createElement("textarea");
    attempt.rows = 2;
    attempt.maxLength = 4000;
    attempt.placeholder = "Escreva sua tentativa aqui...";
    attempt.setAttribute("aria-label", "Sua tentativa para o exercício");
    const actions = document.createElement("div");
    actions.className = "trail-actions";
    const tryBtn = document.createElement("button");
    tryBtn.type = "button";
    tryBtn.textContent = "Testar tentativa";
    tryBtn.onclick = () => {
      if (attempt.value.trim()) sendMessage(attempt.value);
      else attempt.focus();
    };
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = "Próxima pista";
    nextBtn.disabled = step >= total;
    nextBtn.onclick = () => sendMessage("Próxima pista");
    actions.append(tryBtn, nextBtn);
    trail.append(label, attempt, actions);
    chatWin.appendChild(trail);
  }

  if (!firstPart) return;
  if (historyMode) return;
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
async function sendMessage(override) {
  const text = (typeof override === "string" ? override : input.value).trim();
  if (!text || sendBtn.disabled) return;

  if (!resumeBanner.hidden) {
    clearSavedSession();
    resumeBanner.hidden = true;
  }

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
    persistTurn(text, response);
    reactToTopic(text);
  } catch (error) {
    console.error("Erro ao gerar resposta de IA:", error);
    const response = {
      parts: [{
        type: "text",
        content: "Desculpe, algo deu errado ao buscar a resposta. Tente novamente em alguns instantes.",
      }],
      source: "error",
    };
    renderAiResponse(response);
    persistTurn(text, response);
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
  clearSavedSession();
  resumeBanner.hidden = true;
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
const resumeBanner = document.getElementById("resume-banner");
document.getElementById("resume-btn").onclick = () => {
  const data = readSavedSession();
  resumeBanner.hidden = true;
  if (!data) return;
  chatWin.innerHTML = "";
  init();
  const turns = restoreSession(data);
  turns.forEach((turn, index) => {
    if (typeof turn.userText !== "string" || !Array.isArray(turn.response?.parts)) return;
    addMsg(turn.userText, "user");
    renderAiResponse(turn.response, { historyMode: index < turns.length - 1 });
  });
  scrollDown();
};
document.getElementById("new-chat-btn").onclick = clearChat;
sendBtn.onclick = () => sendMessage();
clearBtn.onclick = clearChat;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Inicia
init();
resumeBanner.hidden = !readSavedSession();

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

  // 1) Acima do título (se o mascote saiu do lugar fugindo, acima dele)
  bubble.dataset.placement = "above";
  bubble.style.maxWidth = `${Math.min(240, rightEdge - leftEdge)}px`;
  let width = bubble.offsetWidth;
  let height = bubble.offsetHeight;
  const above = titleRect.top - height - 10;
  if (above >= topEdge) {
    const anchorX = dodgeX ? mascoteCX : titleRect.left + titleRect.width / 2;
    const left = Math.max(leftEdge, Math.min(anchorX - width / 2, rightEdge - width));
    bubble.style.left = `${left}px`;
    bubble.style.top = `${above}px`;
    bubble.style.setProperty("--pointer-left",
      `${Math.max(16, Math.min(mascoteCX - left, width - 16))}px`);
    return;
  }

  // 2) Ao lado do mascote, com a seta apontando para ele: à direita e, se ele
  //    fugiu para a direita e não sobrou espaço, à esquerda
  const appRect = document.getElementById("app").getBoundingClientRect();
  const sideLeft = mascoteRect.right + 6;
  const sideWidth = Math.min(300, Math.min(rightEdge, appRect.right - margin) - sideLeft);
  const sideRight = mascoteRect.left - 6;
  const leftWidth = Math.min(300, sideRight - Math.max(leftEdge, appRect.left + margin));
  const useLeft = sideWidth < 150 && leftWidth >= 150;
  if (sideWidth >= 150 || useLeft) {
    bubble.dataset.placement = useLeft ? "side-left" : "side";
    bubble.style.maxWidth = `${useLeft ? leftWidth : sideWidth}px`;
    width = bubble.offsetWidth;
    height = bubble.offsetHeight;
    const top = Math.max(topEdge, Math.min(mascoteCY - height / 2, bottomEdge - height));
    bubble.style.left = `${useLeft ? sideRight - width : sideLeft}px`;
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
    document.documentElement.style.setProperty(
      "--viewport-top", `${viewport?.offsetTop || 0}px`,
    );
    if (atBottom) scrollDown();
  }
  if (bubble.classList.contains("show")) positionBubble();
}

window.addEventListener("resize", syncViewport);
window.visualViewport?.addEventListener("resize", syncViewport);
window.visualViewport?.addEventListener("scroll", () => {
  syncViewport();
  if (bubble.classList.contains("show")) positionBubble();
});
syncViewport();

// ════════════════════════════════════════════════════════════
// HUMOR — clicar muitas vezes seguidas deixa o mascote bravo
// 0 normal · 1 irritado · 2 bravo · 3 furioso
// ════════════════════════════════════════════════════════════
const moodLines = [
  null, // nível 0 usa as reações normais
  [
    "😑 Tá, já entendi que eu sou clicável.",
    "🤨 Isso é um teste de estresse? Porque tá funcionando.",
    "😒 Você clica assim no botão de deploy também?",
    "🙄 Tô tentando forjar aqui, sabia?",
  ],
  [
    "😠 Para de me cutucar! Eu tô segurando um MARTELO.",
    "😤 Mais um clique e eu te dou um git blame em público.",
    "💢 Eu não sou botão de elevador pra apertar várias vezes!",
    "😠 Vou abrir uma issue contra você: 'usuário clicando demais'.",
  ],
  [
    "🤬 CHEGA! Vou fazer deploy na SEXTA-FEIRA ÀS 18H!",
    "🔥 FURIOSO! Vou apagar o seu node_modules... ah, não, isso seria um favor.",
    "🤬 MAIS UM CLIQUE E EU DOU DROP TABLE NA SUA PACIÊNCIA!",
    "🌋 TÔ MAIS QUENTE QUE A FORJA! SAI DAQUI!",
    "🤬 Clicou de novo?! Agora seu código vai ter ponto e vírgula faltando ALEATORIAMENTE!",
  ],
];

const calmLines = [
  "😮‍💨 Tá... passou. Amigos de novo?",
  "😌 Respirei fundo. Desculpa o surto, foi a temperatura da forja.",
  "🫠 Ok, voltei ao normal. Mas fica de olho, hein.",
];

// Sobrancelhas e boca de cada nível (coordenadas do SVG)
const moodFaces = [
  { brows: [28, 35, 46, 35], mouth: "M 45 59 Q 50 63 55 59" },
  { brows: [28, 35, 46, 36.5], mouth: "M 45 60 L 55 60" },
  { brows: [28, 33, 46, 38], mouth: "M 45 61 Q 50 57.5 55 61" },
  { brows: [27, 32, 46, 39.5], mouth: "M 44 62 Q 50 55.5 56 62" },
];

const moodLineBags = moodLines.map((lines) => (lines ? shuffleBag(lines) : null));
const nextCalmLine = shuffleBag(calmLines);
const CLICKS_PER_LEVEL = 4; // a cada 4 cliques seguidos sobe um nível
let clickStreak = 0;
let mood = 0;
let lastClickAt = 0;
let calmTimer;

function setMood(level) {
  mood = level;
  if (level) mascoteWrap.dataset.mood = level;
  else delete mascoteWrap.dataset.mood;

  const face = moodFaces[level];
  const [x1, y1, x2, y2] = face.brows;
  const left = document.getElementById("brow-left");
  const right = document.getElementById("brow-right");
  // a sobrancelha direita é o espelho da esquerda (centro em x = 50)
  left.setAttribute("x1", x1); left.setAttribute("y1", y1);
  left.setAttribute("x2", x2); left.setAttribute("y2", y2);
  right.setAttribute("x1", 100 - x1); right.setAttribute("y1", y1);
  right.setAttribute("x2", 100 - x2); right.setAttribute("y2", y2);
  document.getElementById("bot-mouth").setAttribute("d", face.mouth);
}

// Sem cliques, ele se acalma um nível a cada 2,5 s
function scheduleCalmDown() {
  clearTimeout(calmTimer);
  calmTimer = setTimeout(function calmStep() {
    if (!mood) return;
    setMood(mood - 1);
    clickStreak = mood * CLICKS_PER_LEVEL;
    if (mood < 2) moveMascot(0, 0); // calmo o bastante para voltar ao lugar
    if (!mood) showBubble(nextCalmLine());
    else calmTimer = setTimeout(calmStep, 2500);
  }, 3000);
}

// ════════════════════════════════════════════════════════════
// DESVIO — bravo, ele foge do mouse (no celular, pula a cada toque)
// ════════════════════════════════════════════════════════════
const DODGE_RADIUS = 80;   // px do centro do mascote até o mouse
const DODGE_CHANCE = 0.7;  // às vezes ele vacila e dá pra pegar
let dodgeX = 0;
let dodgeY = 0;
let lastDodgeAt = 0;

// Quanto ele pode andar sem sair do cabeçalho. offsetLeft/Top ignoram o
// translate, então a medida não depende de onde ele está no meio do pulo.
function dodgeLimits() {
  const header = document.getElementById("header");
  const { offsetLeft: left, offsetTop: top, offsetWidth: w, offsetHeight: h } = mascoteWrap;
  return {
    minX: 4 - left,
    maxX: header.clientWidth - 4 - w - left,
    minY: Math.min(0, 2 - top),
    maxY: Math.max(0, header.clientHeight - 2 - h - top),
  };
}

function moveMascot(x, y) {
  const lim = dodgeLimits();
  dodgeX = Math.round(Math.max(lim.minX, Math.min(lim.maxX, x)));
  dodgeY = Math.round(Math.max(lim.minY, Math.min(lim.maxY, y)));
  mascoteWrap.style.translate = dodgeX || dodgeY ? `${dodgeX}px ${dodgeY}px` : "";
  followMascot();
}

// O balão acompanha o mascote quadro a quadro enquanto ele se mexe
let followUntil = 0;
function followMascot(ms = 350) {
  const running = followUntil > performance.now();
  followUntil = performance.now() + ms;
  if (running) return;
  requestAnimationFrame(function step() {
    if (bubble.classList.contains("show")) positionBubble();
    if (performance.now() < followUntil) requestAnimationFrame(step);
  });
}

function jumpToRandomSpot() {
  const lim = dodgeLimits();
  let x;
  do {
    x = lim.minX + Math.random() * (lim.maxX - lim.minX);
  } while (Math.abs(x - dodgeX) < 60 && lim.maxX - lim.minX > 120);
  moveMascot(x, lim.minY + Math.random() * (lim.maxY - lim.minY));
}

document.addEventListener("mousemove", (e) => {
  if (mood < 2 || crashed) return;
  const rect = mascoteWrap.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = cx - e.clientX;
  const dy = cy - e.clientY;
  const dist = Math.hypot(dx, dy);
  const now = Date.now();
  if (dist > DODGE_RADIUS || now - lastDodgeAt < 300) return;
  lastDodgeAt = now;
  if (Math.random() > DODGE_CHANCE) return;

  // foge na direção oposta ao mouse; encurralado na parede, pula pro outro lado
  const step = 110;
  const before = dodgeX;
  moveMascot(dodgeX + (dx / (dist || 1)) * step, dodgeY + (dy / (dist || 1)) * 20);
  if (Math.abs(dodgeX - before) < 20) jumpToRandomSpot();
});

// ════════════════════════════════════════════════════════════
// ERRO 500 FAKE — clicou demais com ele furioso, ele "derruba o site"
// ════════════════════════════════════════════════════════════
const RAGE_CLICKS = 3 * CLICKS_PER_LEVEL + 6; // 5 cliques depois de ficar furioso
const SITE_DOWN_KEY = "byteforge-site-derrubado"; // F5 não salva ninguém
let crashed = false;

// Cópia do mascote do cabeçalho (sem ids, para não duplicar) com outra cara
function cloneMascot({ mouth, mouthFill = "none", brows = null }) {
  const svg = document.getElementById("byteforge").cloneNode(true);
  svg.querySelector("#bot-mouth").setAttribute("d", mouth);
  svg.querySelector("#bot-mouth").setAttribute("fill", mouthFill);
  if (brows) {
    const [x1, y1, x2, y2] = brows;
    const left = svg.querySelector("#brow-left");
    const right = svg.querySelector("#brow-right");
    left.setAttribute("x1", x1); left.setAttribute("y1", y1);
    left.setAttribute("x2", x2); left.setAttribute("y2", y2);
    right.setAttribute("x1", 100 - x1); right.setAttribute("y1", y1);
    right.setAttribute("x2", 100 - x2); right.setAttribute("y2", y2);
  } else {
    svg.querySelector(".brows").remove();
  }
  svg.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  svg.removeAttribute("id");
  svg.setAttribute("aria-hidden", "true");
  return svg;
}

function setSiteDown(down) {
  try {
    if (down) localStorage.setItem(SITE_DOWN_KEY, "1");
    else localStorage.removeItem(SITE_DOWN_KEY);
  } catch {}
}

function isSiteDown() {
  try { return localStorage.getItem(SITE_DOWN_KEY) === "1"; } catch { return false; }
}

// O site só volta se o aluno vencer a boss fight (js/boss.js)
function crashSite({ reloaded = false } = {}) {
  crashed = true;
  setSiteDown(true);
  clearTimeout(calmTimer);
  clearTimeout(bubbleTimer);
  bubble.classList.remove("show");
  const originalTitle = "ByteForge";
  document.title = "500 Internal Server Error";

  const taunt = reloaded
    ? "😈 Achou que um F5 ia te salvar? <strong>O site continua fora do ar.</strong><br><small>Quer ele de volta? Vai ter que me derrotar.</small>"
    : `😈 <strong>Derrubei o site!</strong> Isso que dá clicar ${clickStreak} vezes em mim.<br><small>Quer ele de volta? Vai ter que me derrotar.</small>`;

  const overlay = document.createElement("div");
  overlay.id = "fake-500";
  overlay.setAttribute("role", "alertdialog");
  overlay.setAttribute("aria-label", "Erro 500 (de brincadeira)");
  overlay.innerHTML = `
    <div class="f500-page">
      <h1>Internal Server Error</h1>
      <p>The server encountered an internal error or misconfiguration and was unable to complete your request.</p>
      <p>Please contact the server administrator to inform them of the time this error occurred, and the actions you performed just before this error.</p>
      <p>More information about this error may be available in the server error log.</p>
      <hr>
      <address>ByteForge/1.0 (Bigorna) Server at ${location.hostname} Port 443</address>
    </div>
    <div class="f500-reveal">
      <div class="f500-bubble">${taunt}</div>
      <button type="button" class="f500-btn">⚔️ Encarar o chefe</button>
    </div>`;

  // mascote gargalhando
  overlay.querySelector(".f500-reveal").prepend(
    cloneMascot({ mouth: "M 43 57 Q 50 67 57 57 Z", mouthFill: "#3a1f04" }),
  );

  document.body.appendChild(overlay);
  setMood(0);
  moveMascot(0, 0);

  setTimeout(() => {
    overlay.classList.add("reveal");
    overlay.querySelector(".f500-btn").focus();
  }, reloaded ? 1200 : 2800);

  function restore() {
    overlay.remove();
    setSiteDown(false);
    document.title = originalTitle;
    crashed = false;
    clickStreak = 0;
    moveMascot(0, 0);
    showBubble("😵 Tá bom, tá bom, você venceu! Forja religada. Agora vamos estudar, combinado?");
  }

  overlay.querySelector(".f500-btn").onclick = () => startBossFight(restore);
}

// Clique no mascote → pula + reação (ou bronca, se clicar demais)
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

  // clique até 2 s depois do anterior conta como "seguido"; mais devagar,
  // ele continua do nível de raiva em que está (não esquece na hora)
  const now = Date.now();
  clickStreak = (now - lastClickAt < 2000 ? clickStreak : mood * CLICKS_PER_LEVEL) + 1;
  lastClickAt = now;

  if (crashed) return;
  if (clickStreak >= RAGE_CLICKS) {
    crashSite();
    return;
  }

  const level = Math.min(3, Math.floor((clickStreak - 1) / CLICKS_PER_LEVEL));
  if (level !== mood) setMood(level);
  showBubble(level ? moodLineBags[level]() : nextReaction());
  scheduleCalmDown();

  // no celular não tem mouse para fugir: bravo, ele pula para outro lugar
  if (level >= 2 && matchMedia("(hover: none)").matches) {
    setTimeout(jumpToRandomSpot, 350);
  }
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

// Site derrubado numa visita anterior continua fora até vencer o chefe
if (isSiteDown()) crashSite({ reloaded: true });
