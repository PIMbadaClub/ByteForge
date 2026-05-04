// ════════════════════════════════════════════════════════════
// REFERÊNCIAS DO DOM
// ════════════════════════════════════════════════════════════
const chatWin = document.getElementById("chat-window");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");

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
function addMsg(text, side) {
  const wrap = document.createElement("div");
  wrap.className = `msg-wrap ${side}`;

  const bubble = document.createElement("div");
  bubble.className = "msg";
  bubble.textContent = text;

  const time = document.createElement("span");
  time.className = "msg-time";
  time.textContent = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  wrap.appendChild(bubble);
  wrap.appendChild(time);
  chatWin.appendChild(wrap);
  scrollDown();
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
  scrollDown();
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
  requestAnimationFrame(() => scrollDown(true, 900));
}

function hideTyping() {
  const el = document.getElementById("typing");
  if (el) el.remove();
}

// ════════════════════════════════════════════════════════════
// BUSCA NO BANCO DE CONHECIMENTO
// ════════════════════════════════════════════════════════════
function findAnswer(userText) {
  const clean = userText.toLowerCase();
  return brain.find((item) => item.keys.some((k) => clean.includes(k)));
}

// ════════════════════════════════════════════════════════════
// ENVIAR MENSAGEM
// ════════════════════════════════════════════════════════════
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMsg(text, "user");
  input.value = "";
  showTyping();

  // delay para simular "pensamento" do ByteForge
  const delay = 600 + Math.random() * 500;
  setTimeout(() => {
    hideTyping();

    const match = findAnswer(text);
    if (match) {
      addMsg(match.text, "bot");
      if (match.code) addCodeBlock(match.code, match.lang);
    } else {
      addMsg(
        "Hmm, não encontrei uma resposta específica para isso.\n\nTente perguntar sobre: JavaScript, Python, Git, CSS, API, TypeScript, SQL, Node.js, React, Docker, Debug, Regex, POO, Arrays ou Carreira!",
        "bot",
      );
    }
  }, delay);
}

// ════════════════════════════════════════════════════════════
// QUICK ASK — botões de tópico rápido
// ════════════════════════════════════════════════════════════
function quickAsk(topic) {
  input.value = topic;
  sendMessage();
}

// ════════════════════════════════════════════════════════════
// LIMPAR CHAT
// ════════════════════════════════════════════════════════════
function clearChat() {
  chatWin.innerHTML = "";
  init();
}

function scrollDown(smooth = false, duration = 900) {
  if (!smooth) {
    chatWin.scrollTop = chatWin.scrollHeight;
    return;
  }

  const start = chatWin.scrollTop;
  const end = chatWin.scrollHeight;
  const distance = end - start;
  if (distance <= 0) return;

  const startTime = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const elapsed = Math.min((now - startTime) / duration, 1);
    chatWin.scrollTop = start + distance * ease(elapsed);
    if (elapsed < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ════════════════════════════════════════════════════════════
function init() {
  addMsg(
    "⚒️ A forja está acesa, dev! Sou o ByteForge — aqui o código bruto vira arte.\nMe jogue qualquer dúvida de programação ou use os atalhos abaixo para começar!",
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
  "⚒️ Martelando esse bug até ele sumir...",
  "🔥 Código bruto vira arte na forja certa",
  "⚙️ Temperatura do servidor: CRÍTICA",
  "🔩 Mais um parafuso apertado no deploy",
  "⚒️ Bug na bigorna — vai sair na força!",
  "🌋 Esse erro vai fundir como ferro em brasa",
  "🔥 while (!funciona) { martela(); }",
  "⚙️ Corrigi um bug, nasceram 3 igual hidra",
  "🔩 Na minha máquina tá forjado perfeito 👍",
  "⚒️ Deploy de sexta = jogar metal quente no frio",
  "🔥 console.log('vai aqui?') → ainda não fundiu",
  "⚙️ NullPointerException — o pior minério",
  "🌋 Café acabou... a forja esfria ☕❌",
  "⚒️ Se tá funcionando, NÃO ENCOSTA ⚠️",
  "🔥 Bug intermitente = o fantasma da forja 👻",
  "⚙️ Frontend e backend brigando feito ferreiro e fogo",
  "⚒️ Funciona aqui, funde em produção 🎯",
  "🔥 return 42; // a resposta universal",
  "⚙️ Mais uma camada de abstração... e outra... e outra",
  "⚒️ ctrl+c ctrl+v — a arte do reaproveitamento de metal",
  "🌋 Stack Overflow: minha bigorna favorita 🤝",
];

// Reações ao clique — tema forja
const reactions = [
  "⚒️ Forjando código aqui, precisa de ajuda?",
  "🔥 Tô no calor da forja, pode falar!",
  "⚙️ Clique registrado no sistema de bigorna!",
  "🌋 Que metal quer fundir hoje?",
  "⚒️ A forja nunca para — bora trabalhar!",
  "🔥 Temperatura: máxima. Produtividade: alta.",
  "⚙️ Me deixa marttelar esse bug em paz 😅",
  "🔩 Para de me cutucar, tô temperando o código!",
  "⚒️ Chamou? Tô forjando uma solução aqui!",
  "🌋 Bug detectado — vai pra bigorna! 🤖",
];

let bubbleTimer;

function showBubble(text) {
  clearTimeout(bubbleTimer);
  bubble.classList.remove("show");

  const titleEl = document.querySelector(".header-info h1");
  const titleRect = titleEl.getBoundingClientRect();
  const mascoteRect = mascoteWrap.getBoundingClientRect();

  bubble.textContent = text;
  bubble.style.left = titleRect.left + titleRect.width / 2 + "px";
  bubble.style.transform = "translate(-50%, 0)";

  // força reflow para a transição funcionar após adicionar o texto
  void bubble.offsetWidth;

  const bubbleLeft =
    titleRect.left + titleRect.width / 2 - bubble.offsetWidth / 2;
  const botCenterX = mascoteRect.left + mascoteRect.width / 2;
  const pointerX = Math.min(
    Math.max(botCenterX - bubbleLeft, 16),
    bubble.offsetWidth - 16,
  );
  bubble.style.setProperty("--pointer-left", `${pointerX}px`);

  bubble.style.top = titleRect.top - bubble.offsetHeight - 10 + "px";
  bubble.classList.add("show");

  bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 3800);
}

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

  const r = reactions[Math.floor(Math.random() * reactions.length)];
  showBubble(r);
});

// Pensamentos automáticos (12 – 22 s)
function schedulePensamento() {
  const delay = 12000 + Math.random() * 10000;
  setTimeout(() => {
    const t = thoughts[Math.floor(Math.random() * thoughts.length)];
    showBubble(t);
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
