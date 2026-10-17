const NS = 'http://www.w3.org/2000/svg';
let clipCounter = 0;

/** SVG-Element mit Attributen erzeugen. */
export function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v !== null && v !== undefined) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}

/**
 * Koordinatensystem: Weltkoordinaten (x nach rechts, y nach oben) → Pixel.
 * Gibt { svg, X, Y, clear } zurück. Alles Gezeichnete kommt in svg.
 */
export function plot(container, { width = 640, height = 320, xmin, xmax, ymin, ymax, pad = 34 }) {
  const svg = el('svg', { viewBox: `0 0 ${width} ${height}`, class: 'plot', role: 'img' });
  container.appendChild(svg);
  const X = (x) => pad + ((x - xmin) / (xmax - xmin)) * (width - 2 * pad);
  const Y = (y) => height - pad - ((y - ymin) / (ymax - ymin)) * (height - 2 * pad);
  const clear = () => { while (svg.firstChild) svg.removeChild(svg.firstChild); };
  // Zeichenbereich als clipPath: Graphen werden am Rand abgeschnitten statt abgeflacht.
  const clipId = `clip-${++clipCounter}`;
  const cp = el('clipPath', { id: clipId }, el('defs', {}, svg));
  el('rect', { x: Math.min(X(xmin), X(xmax)), y: Math.min(Y(ymin), Y(ymax)), width: Math.abs(X(xmax) - X(xmin)), height: Math.abs(Y(ymin) - Y(ymax)) }, cp);
  return { svg, X, Y, clear, width, height, pad, clipId };
}

export function axes(p, { xmin, xmax, ymin, ymax, xticks = [], yticks = [], xlabel = '', ylabel = '' }) {
  const g = el('g', { class: 'axes' }, p.svg);
  el('line', { x1: p.X(xmin), y1: p.Y(0), x2: p.X(xmax), y2: p.Y(0) }, g);
  el('line', { x1: p.X(0 > xmin ? 0 : xmin), y1: p.Y(ymin), x2: p.X(0 > xmin ? 0 : xmin), y2: p.Y(ymax) }, g);
  for (const t of xticks) {
    el('line', { x1: p.X(t), y1: p.Y(0) - 3, x2: p.X(t), y2: p.Y(0) + 3 }, g);
    text(g, p.X(t), p.Y(0) + 16, String(t).replace('.', ','), 'middle');
  }
  const x0 = p.X(0 > xmin ? 0 : xmin);
  for (const t of yticks) {
    el('line', { x1: x0 - 3, y1: p.Y(t), x2: x0 + 3, y2: p.Y(t) }, g);
    text(g, x0 - 7, p.Y(t) + 4, String(t).replace('.', ','), 'end');
  }
  if (xlabel) text(g, p.X(xmax) - 2, p.Y(0) - 8, xlabel, 'end', 'math');
  if (ylabel) text(g, x0 + 8, p.Y(ymax) + 12, ylabel, 'start', 'math');
  return g;
}

/** SVG-Text. cls 'math' → KaTeX_Math-Schrift (kursiv), damit Symbole wie in den Formeln aussehen. */
export function text(parent, x, y, str, anchor = 'start', cls = '') {
  const t = el('text', { x, y, 'text-anchor': anchor, class: cls }, parent);
  // "e_ρ" → e mit tiefgestelltem ρ; "v_C^*" → v, tief C, hoch * (nur einfache Fälle)
  const m = String(str).match(/^([^_^]*)(?:_([^^]+))?(?:\^(.+))?$/);
  if (!m || (!m[2] && !m[3])) { t.textContent = str; return t; }
  t.appendChild(document.createTextNode(m[1]));
  if (m[2]) { const s = el('tspan', { dy: 5, 'font-size': '0.72em' }, t); s.textContent = m[2]; }
  if (m[3]) { const s = el('tspan', { dy: m[2] ? -11 : -6, 'font-size': '0.72em' }, t); s.textContent = m[3]; }
  return t;
}

export function arrowDefs(svg) {
  const defs = el('defs', {}, svg);
  for (const name of ['dark', 'x', 'y', 'z', 'rho', 'point', 'angle', 'vel']) {
    const m = el('marker', { id: `arr-${name}`, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', class: `fill-${name}` }, m);
  }
}

/**
 * Graph einer Funktion zeichnen. Bricht die Linie bei NaN/±∞ und bei Sprüngen (|Δy| > jump) ab,
 * damit Polstellen und Sprünge nicht als senkrechte Linien erscheinen.
 */
export function graph(p, f, { xmin, xmax, ymin = -Infinity, ymax = Infinity, cls = 's-x', width = 2.5, n = 600, jump = Infinity, extra = {} } = {}) {
  let d = '';
  let pen = false, prev = null;
  for (let i = 0; i <= n; i++) {
    const x = xmin + ((xmax - xmin) * i) / n;
    const y = f(x);
    const ok = Number.isFinite(y) && y >= ymin - 1e3 && y <= ymax + 1e3;
    if (!ok || (prev !== null && Math.abs(y - prev) > jump)) { pen = false; prev = ok ? y : null; if (!ok) continue; }
    const span = Number.isFinite(ymax - ymin) ? ymax - ymin : 1e3;
    const yc = Math.max(Math.min(y, ymax + span), ymin - span); // weit ausserhalb kappen, Rest erledigt der clipPath
    d += `${pen ? 'L' : 'M'}${p.X(x).toFixed(1)},${p.Y(yc).toFixed(1)}`;
    pen = true; prev = y;
  }
  return el('path', { d, class: cls, fill: 'none', 'stroke-width': width, 'stroke-linejoin': 'round', 'clip-path': p.clipId ? `url(#${p.clipId})` : null, ...extra }, p.svg);
}

/** Gitter (dünn) für Funktionsplots. */
export function grid(p, { xmin, xmax, ymin, ymax, dx = 1, dy = 1 }) {
  const g = el('g', { class: 'grid' }, p.svg);
  for (let x = Math.ceil(xmin / dx) * dx; x <= xmax; x += dx) el('line', { x1: p.X(x), y1: p.Y(ymin), x2: p.X(x), y2: p.Y(ymax) }, g);
  for (let y = Math.ceil(ymin / dy) * dy; y <= ymax; y += dy) el('line', { x1: p.X(xmin), y1: p.Y(y), x2: p.X(xmax), y2: p.Y(y) }, g);
  return g;
}
