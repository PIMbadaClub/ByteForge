// ════════════════════════════════════════════════════════════
// BOSS FIGHT — o único jeito de religar o site depois do erro 500
// Clique/toque no chefe para tirar vida e esmague os erros que ele
// lança antes que cheguem lá embaixo. A cada derrota ele enfraquece,
// para ninguém ficar preso para sempre.
// ════════════════════════════════════════════════════════════
const BOSS_ATTACKS = [
  "SyntaxError", "undefined is not a function", "404", "🐞", "🐛",
  "NullPointerException", "Segmentation fault", "';' esperado", "CORS",
  "merge conflict", "NaN", "StackOverflow", "500", "IndentationError",
  "ORA-00942", "rm -rf", "DROP TABLE", "while(true)",
];

const BOSS_LINES = {
  start: "😈 Eu sou o CÓDIGO LEGADO! Ninguém me refatora!",
  hit: [
    "Ai! Isso foi um breakpoint?",
    "Nem doeu! (doeu)",
    "Para! Eu não tenho testes!",
    "Isso não estava na sprint!",
    "Você não pode me refatorar!",
    "Ei! Eu ainda tô em produção!",
  ],
  hurt: [
    "HAHA! Mais um bug em produção!",
    "Esse passou pro cliente! 😈",
    "Ninguém revisou esse PR!",
  ],
  phase2: "😠 Agora eu fiquei BRAVO! Deploy na sexta-feira!",
  phase3: "🤬 MODO PRODUÇÃO ATIVADO! SEM ROLLBACK!",
};

let bossLosses = 0;

function startBossFight(onWin) {
  const maxHp = Math.max(10, 24 - bossLosses * 4);
  const maxHearts = 3 + Math.min(2, bossLosses);
  const ease = Math.max(0.6, 1 - bossLosses * 0.12); // mais lento a cada derrota
  const state = { hp: maxHp, hearts: maxHearts, phase: 1, running: false };
  const projectiles = new Set();
  let moveTimer;
  let spawnTimer;
  let sayTimer;
  let lastFrame = 0;
  let frame;

  const arena = document.createElement("div");
  arena.id = "boss-arena";
  arena.setAttribute("role", "dialog");
  arena.setAttribute("aria-label", "Luta contra o chefe");
  arena.innerHTML = `
    <div class="boss-hud">
      <div class="boss-name">ByteForge, o Código Legado</div>
      <div class="boss-hp" role="progressbar" aria-label="Vida do chefe" aria-valuemin="0" aria-valuemax="${maxHp}">
        <div class="boss-hp-fill"></div>
      </div>
      <div class="boss-hearts" aria-label="Suas vidas"></div>
    </div>
    <div class="boss-field">
      <div class="boss-unit">
        <div class="boss-say" aria-live="assertive"></div>
        <button type="button" class="boss" aria-label="Atacar o chefe"></button>
      </div>
    </div>
    <div class="boss-end" hidden></div>`;

  const field = arena.querySelector(".boss-field");
  const bossUnit = arena.querySelector(".boss-unit"); // chefe + balão andam juntos
  const bossBtn = arena.querySelector(".boss");
  const say = arena.querySelector(".boss-say");
  const hpBar = arena.querySelector(".boss-hp");
  const hpFill = arena.querySelector(".boss-hp-fill");
  const heartsEl = arena.querySelector(".boss-hearts");

  // chefe: o mascote com cara de bravo
  bossBtn.appendChild(cloneMascot({
    mouth: "M 44 62 Q 50 55.5 56 62",
    brows: [27, 32, 46, 39.5],
  }));
  document.body.appendChild(arena);

  function updateHud() {
    hpFill.style.width = `${(state.hp / maxHp) * 100}%`;
    hpBar.setAttribute("aria-valuenow", state.hp);
    heartsEl.textContent = "❤️".repeat(state.hearts) + "🖤".repeat(maxHearts - state.hearts);
  }

  function talk(text, ms = 1800) {
    clearTimeout(sayTimer);
    say.textContent = text;
    say.classList.add("show");
    sayTimer = setTimeout(() => say.classList.remove("show"), ms);
  }

  const phaseSpeed = () => [0, 1, 1.35, 1.75][state.phase];

  function moveBoss() {
    const f = field.getBoundingClientRect();
    const w = bossBtn.offsetWidth;
    const h = bossBtn.offsetHeight;
    const x = Math.random() * Math.max(0, f.width - w);
    const y = 50 + Math.random() * Math.max(0, f.height * 0.45 - h);
    bossUnit.style.left = `${x}px`;
    bossUnit.style.top = `${y}px`;
    // o balão vai junto; só se afasta do centro para não sair pela beirada,
    // e perto do topo fala por baixo do chefe
    const half = Math.min(130, f.width / 2);
    const center = Math.min(Math.max(x + w / 2, half), f.width - half);
    bossUnit.style.setProperty("--say-shift", `${center - (x + w / 2)}px`);
    bossUnit.classList.toggle("say-below", y < 90);
    clearTimeout(moveTimer);
    moveTimer = setTimeout(moveBoss, (1500 / phaseSpeed()) / ease);
  }

  function spawn() {
    if (!state.running) return;
    const f = field.getBoundingClientRect();
    const b = bossBtn.getBoundingClientRect();
    const el = document.createElement("button");
    el.type = "button";
    el.className = "boss-bug";
    el.textContent = BOSS_ATTACKS[Math.floor(Math.random() * BOSS_ATTACKS.length)];
    el.setAttribute("aria-label", `Esmagar ${el.textContent}`);
    field.appendChild(el);
    const p = {
      el,
      x: b.left - f.left + b.width / 2 - el.offsetWidth / 2,
      y: b.top - f.top + b.height * 0.7,
      vx: (Math.random() - 0.5) * 120 * phaseSpeed(),
      vy: (70 + Math.random() * 50) * phaseSpeed() * ease,
    };
    projectiles.add(p);
    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      squash(p);
    });
    el.addEventListener("click", () => squash(p)); // teclado
    spawnTimer = setTimeout(spawn, (1400 / phaseSpeed()) / ease);
  }

  function squash(p) {
    if (!projectiles.has(p)) return;
    projectiles.delete(p);
    p.el.classList.add("squashed");
    p.el.disabled = true;
    setTimeout(() => p.el.remove(), 300);
  }

  function popText(text, x, y, cls) {
    const pop = document.createElement("div");
    pop.className = `boss-pop ${cls}`;
    pop.textContent = text;
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    field.appendChild(pop);
    setTimeout(() => pop.remove(), 700);
  }

  function hitBoss(e) {
    if (!state.running) return;
    e?.preventDefault?.();
    state.hp -= 1;
    updateHud();
    const f = field.getBoundingClientRect();
    const b = bossBtn.getBoundingClientRect();
    popText("-1", b.left - f.left + b.width / 2, b.top - f.top, "dmg");
    bossBtn.classList.remove("hit");
    void bossBtn.offsetWidth;
    bossBtn.classList.add("hit");

    if (state.hp <= 0) return win();
    if (state.phase < 3 && state.hp <= maxHp * 0.25) {
      state.phase = 3;
      arena.dataset.phase = 3;
      talk(BOSS_LINES.phase3, 2400);
    } else if (state.phase < 2 && state.hp <= maxHp * 0.5) {
      state.phase = 2;
      arena.dataset.phase = 2;
      talk(BOSS_LINES.phase2, 2400);
    } else if (Math.random() < 0.3) {
      talk(BOSS_LINES.hit[Math.floor(Math.random() * BOSS_LINES.hit.length)]);
    }
    // apanhou: foge mais cedo
    if (Math.random() < 0.5) moveBoss();
  }

  function hurtPlayer(p) {
    projectiles.delete(p);
    p.el.remove();
    state.hearts -= 1;
    updateHud();
    arena.classList.remove("hurt");
    void arena.offsetWidth;
    arena.classList.add("hurt");
    if (state.hearts <= 0) return lose();
    talk(BOSS_LINES.hurt[Math.floor(Math.random() * BOSS_LINES.hurt.length)]);
  }

  function tick(now) {
    if (!state.running) return;
    const dt = Math.min(0.05, (now - (lastFrame || now)) / 1000);
    lastFrame = now;
    const width = field.clientWidth;
    const height = field.clientHeight;
    for (const p of [...projectiles]) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const w = p.el.offsetWidth;
      if (p.x < 0 || p.x + w > width) {
        p.vx = -p.vx;
        p.x = Math.max(0, Math.min(width - w, p.x));
      }
      p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
      if (p.y > height - p.el.offsetHeight) hurtPlayer(p);
      if (!state.running) return;
    }
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    state.running = false;
    clearTimeout(moveTimer);
    clearTimeout(spawnTimer);
    cancelAnimationFrame(frame);
    projectiles.forEach((p) => p.el.remove());
    projectiles.clear();
  }

  function showEnd(html, button, action) {
    const end = arena.querySelector(".boss-end");
    end.innerHTML = `<div class="boss-end-box">${html}<button type="button" class="f500-btn">${button}</button></div>`;
    end.hidden = false;
    const btn = end.querySelector("button");
    btn.onclick = action;
    btn.focus();
  }

  function win() {
    stop();
    bossUnit.classList.add("defeated");
    bossBtn.disabled = true;
    say.classList.remove("show");
    setTimeout(() => showEnd(
      "<h2>🏆 Vitória!</h2><p>Você refatorou o código legado e corrigiu todos os bugs.<br>A forja está religada!</p>",
      "🔥 Religar a forja",
      () => {
        bossLosses = 0;
        arena.remove();
        document.getElementById("fake-500")?.remove();
        onWin();
      },
    ), 900);
  }

  function lose() {
    stop();
    bossBtn.classList.add("laughing");
    talk("😈 HAHAHA! O build quebrou!", 4000);
    setTimeout(() => showEnd(
      "<h2>💀 Game over</h2><p>O build quebrou e o site continua fora do ar.</p>"
        + "<p class=\"boss-tip\">Dica: esmague os erros primeiro e bata no chefe quando a tela estiver limpa.<br>"
        + "<small>O chefe ficou um pouco mais fraco.</small></p>",
      "⚔️ Tentar de novo",
      () => {
        bossLosses += 1;
        arena.remove();
        startBossFight(onWin);
      },
    ), 1200);
  }

  bossBtn.addEventListener("pointerdown", hitBoss);
  bossBtn.addEventListener("click", (e) => {
    // pointerdown já contou; o click sozinho vem do teclado (Enter/Espaço)
    if (e.detail === 0) hitBoss();
  });

  function begin() {
    arena.querySelector(".boss-end").hidden = true;
    moveBoss();
    talk(BOSS_LINES.start, 2200);
    // pequena pausa antes dos ataques começarem
    setTimeout(() => {
      state.running = true;
      lastFrame = 0;
      frame = requestAnimationFrame(tick);
      spawn();
    }, 1500);
  }

  updateHud();
  // Na primeira luta, explica as regras antes; na revanche, vai direto
  if (bossLosses === 0) {
    showEnd(
      `<h2>⚔️ Como jogar</h2>
      <ul class="boss-rules">
        <li>👆 <strong>Clique ou toque no chefe</strong> para tirar vida dele. Ele não fica parado!</li>
        <li>🐞 <strong>Esmague os erros</strong> que ele lança antes que cheguem lá embaixo.</li>
        <li>❤️ Cada erro que passa custa <strong>um coração</strong>. Perdeu todos, o build quebra.</li>
        <li>😠 Com metade da vida ele fica bravo e, com 25%, entra em <strong>modo produção</strong>.</li>
        <li>🔥 Vença e o site volta ao ar.</li>
      </ul>`,
      "⚔️ Começar a luta",
      begin,
    );
  } else {
    begin();
  }
}
