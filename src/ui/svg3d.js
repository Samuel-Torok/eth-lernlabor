import { el, text, arrowDefs } from './svg.js';

/**
 * Schrägbild wie in der Mitschrift: x zeigt nach vorne-links-unten (verkürzt), y nach rechts, z nach oben.
 * scene(host, opts) gibt Zeichenfunktionen in Weltkoordinaten zurück.
 */
export function scene(host, { S = 62, cx = 300, cy = 250, viewBox = '80 30 480 345', label: aria = '' } = {}) {
  const svg = el('svg', { viewBox, class: 'plot', role: 'img', 'aria-label': aria });
  host.appendChild(svg);
  arrowDefs(svg);
  const g = el('g', {}, svg);
  const proj = ([x, y, z]) => [cx + S * (y - 0.5 * x * Math.SQRT1_2), cy - S * (z - 0.5 * x * Math.SQRT1_2)];

  const line = (a, b, cls, w = 2, extra = {}) => {
    const [x1, y1] = proj(a), [x2, y2] = proj(b);
    return el('line', { x1, y1, x2, y2, class: cls, 'stroke-width': w, ...extra }, g);
  };
  /** Pfeil von Punkt p in Richtung des Vektors v (Weltkoordinaten). color: x|y|z|rho|dark|point|angle|vel */
  const arrow = (p, v, color, w = 2.5, extra = {}) => {
    const len = Math.hypot(...v);
    if (len < 1e-9) return null;
    return line(p, [p[0] + v[0], p[1] + v[1], p[2] + v[2]], `s-${color}`, w, { 'marker-end': `url(#arr-${color})`, ...extra });
  };
  const path = (pts, cls, w = 2, extra = {}) => el('path', { d: pts.map((p, i) => `${i ? 'L' : 'M'}${proj(p).join(',')}`).join(' '), class: cls, 'stroke-width': w, fill: 'none', ...extra }, g);
  const label = (p, str, cls = '', dx = 6, dy = -6) => { const [x, y] = proj(p); return text(g, x + dx, y + dy, str, 'start', `math ${cls}`); };
  const point = (p, cls = 'fill-point', r = 5) => { const [x, y] = proj(p); return el('circle', { cx: x, cy: y, r, class: cls }, g); };
  const axes = (len = { x: 3.6, y: 3.6, z: 3.0 }, neg = { x: -1.2, y: -2.8, z: -0.6 }) => {
    arrow([neg.x, 0, 0], [len.x - neg.x, 0, 0], 'x', 1.4);
    arrow([0, neg.y, 0], [0, len.y - neg.y, 0], 'y', 1.4);
    arrow([0, 0, neg.z], [0, 0, len.z - neg.z], 'z', 1.4);
    label([len.x + 0.1, 0, 0], 'x', 't-x', -14, 14);
    label([0, len.y + 0.1, 0], 'y', 't-y', 2, 4);
    label([0, 0, len.z + 0.1], 'z', 't-z', 6, 4);
    label([0, 0, 0], 'O', '', -16, 16);
  };
  return { svg, g, proj, line, arrow, path, label, point, axes };
}
