// ════════════════════════════════════════════════════════════
// RAIOS — relâmpagos com cara de relâmpago de verdade
// O caminho é gerado na hora por "deslocamento do ponto médio" (um
// fractal: cada trecho reto é quebrado ao meio e o meio é empurrado para
// o lado, várias vezes), com galhos saindo do tronco. Cada raio é
// desenhado em camadas (halo azul borrado, corpo azul-claro e núcleo
// branco) e pisca como um relâmpago real, junto com um clarão no fundo.
// ════════════════════════════════════════════════════════════
const SVG_NS = "http://www.w3.org/2000/svg";
let raioFilterId = 0;

// Quebra o segmento a→b em zigue-zague (recursivo)
function boltPoints(a, b, spread = 0.42, minLen = 7) {
  const out = [a];
  (function split(p, q, depth) {
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
    if (len < minLen || depth > 12) {
      out.push(q);
      return;
    }
    const nx = -(q[1] - p[1]) / len;
    const ny = (q[0] - p[0]) / len;
    const off = (Math.random() - 0.5) * spread * len;
    const m = [(p[0] + q[0]) / 2 + nx * off, (p[1] + q[1]) / 2 + ny * off];
    split(p, m, depth + 1);
    split(m, q, depth + 1);
  })(a, b, 0);
  return out;
}

// Tronco + galhos (e alguns galhos dos galhos)
function boltTree(from, to, branches = 4) {
  const trunk = boltPoints(from, to);
  const paths = [{ pts: trunk, level: 0 }];
  const total = Math.hypot(to[0] - from[0], to[1] - from[1]);

  function grow(parent, count, level) {
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(parent.length * (0.15 + Math.random() * 0.6));
      const start = parent[idx];
      const next = parent[Math.min(parent.length - 1, idx + 1)];
      const dir = Math.atan2(next[1] - start[1], next[0] - start[0]);
      const angle = dir + (Math.random() < 0.5 ? -1 : 1) * (0.35 + Math.random() * 0.6);
      const len = total * (0.12 + Math.random() * 0.22) / (level + 1);
      const end = [start[0] + Math.cos(angle) * len, start[1] + Math.sin(angle) * len];
      const pts = boltPoints(start, end, 0.5, 5);
      paths.push({ pts, level: level + 1 });
      if (level === 0 && Math.random() < 0.5) grow(pts, 1, level + 1);
    }
  }

  grow(trunk, branches, 0);
  return paths;
}

const toD = (pts) => "M" + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L");

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

// Desenha um raio de `from` até `to` (coordenadas em px dentro de `host`).
// host = null → tela inteira. Devolve uma Promise que resolve quando some.
function strikeLightning(from, to, { host = null, width = 1, branches = 4, flash = true, duration = 520 } = {}) {
  const svg = svgEl("svg", { class: "raio-layer" + (host ? " in-field" : ""), "aria-hidden": "true" });
  const fid = `raio-glow-${++raioFilterId}`;
  const defs = svgEl("defs", {});
  const filter = svgEl("filter", { id: fid, x: "-50%", y: "-50%", width: "200%", height: "200%" });
  filter.appendChild(svgEl("feGaussianBlur", { stdDeviation: 5 * width }));
  defs.appendChild(filter);
  svg.appendChild(defs);

  const tree = boltTree(from, to, branches);
  // camadas: halo (borrado) → corpo → núcleo branco
  const layers = [
    { stroke: "#3d8bff", w: 9, op: 0.55, blur: true },
    { stroke: "#a8dcff", w: 3.2, op: 0.95 },
    { stroke: "#ffffff", w: 1.4, op: 1 },
  ];
  layers.forEach((layer) => {
    const g = svgEl("g", {
      fill: "none",
      stroke: layer.stroke,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      opacity: layer.op,
      ...(layer.blur ? { filter: `url(#${fid})` } : {}),
    });
    tree.forEach(({ pts, level }) => {
      g.appendChild(svgEl("path", {
        d: toD(pts),
        "stroke-width": (layer.w * width) / (level ? 1.8 * level : 1),
        opacity: level ? 0.75 / level : 1,
      }));
    });
    svg.appendChild(g);
  });

  // brilho no ponto de impacto
  svg.appendChild(svgEl("circle", {
    cx: to[0], cy: to[1], r: 14 * width, fill: "#cfeeff", filter: `url(#${fid})`, opacity: 0.9,
  }));

  (host || document.body).appendChild(svg);

  // pisca como relâmpago: acende, quase apaga, reacende, some
  const anim = svg.animate(
    [
      { opacity: 0 }, { opacity: 1, offset: 0.06 }, { opacity: 0.15, offset: 0.2 },
      { opacity: 1, offset: 0.3 }, { opacity: 0.5, offset: 0.55 }, { opacity: 0 },
    ],
    { duration, easing: "linear" },
  );

  if (flash) flashSky(host, (from[0] / (host?.clientWidth || innerWidth)) * 100);
  return anim.finished.then(() => svg.remove(), () => svg.remove());
}

// Clarão no céu (fundo) acompanhando o raio
function flashSky(host = null, xPercent = 50) {
  const el = document.createElement("div");
  el.className = "raio-flash" + (host ? " in-field" : "");
  el.style.setProperty("--fx", `${xPercent}%`);
  (host || document.body).appendChild(el);
  el.animate(
    [{ opacity: 0 }, { opacity: 0.55, offset: 0.06 }, { opacity: 0.08, offset: 0.2 },
     { opacity: 0.35, offset: 0.3 }, { opacity: 0 }],
    { duration: 450, easing: "ease-out" },
  ).finished.then(() => el.remove(), () => el.remove());
}

// Faíscas estalando em volta de um elemento (bola de plasma)
function crackle(svg, size) {
  const c = size / 2 + 14;
  svg.replaceChildren();
  for (let i = 0; i < 3; i++) {
    const a = Math.random() * Math.PI * 2;
    const r1 = size * 0.25;
    const r2 = size * 0.55 + Math.random() * 10;
    const pts = boltPoints([c + Math.cos(a) * r1, c + Math.sin(a) * r1],
      [c + Math.cos(a + 0.4) * r2, c + Math.sin(a + 0.4) * r2], 0.6, 3);
    svg.appendChild(svgEl("path", {
      d: toD(pts), fill: "none", stroke: "#e6f8ff", "stroke-width": 1.2,
      "stroke-linecap": "round", opacity: 0.9,
    }));
  }
}
