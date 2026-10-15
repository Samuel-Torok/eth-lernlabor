const NS = 'http://www.w3.org/2000/svg';

/** SVG-Element mit Attributen erzeugen. */
export function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
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
  return { svg, X, Y, clear, width, height, pad };
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
  t.textContent = str;
  return t;
}

export function arrowDefs(svg) {
  const defs = el('defs', {}, svg);
  for (const name of ['dark', 'x', 'y', 'z', 'rho', 'point', 'angle']) {
    const m = el('marker', { id: `arr-${name}`, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', class: `fill-${name}` }, m);
  }
}
