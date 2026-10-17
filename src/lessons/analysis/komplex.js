import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider } from '../../ui/controls.js';
import { plot, axes, el, text, grid, arrowDefs } from '../../ui/svg.js';
import { cinv, conj, cabs } from '../../math/complex.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Eine komplexe Zahl ${M`z = x + iy`} ist ein Punkt in der Ebene: ${M`x`} nach rechts, ${M`y`} nach oben. Gerechnet wird wie mit Klammern, mit der einzigen Zusatzregel ${M`i^2 = -1`}. Der wichtigste Trick dieser Vorlesung: Teilen durch ${M`z`} wird zu Multiplizieren mit ${M`\bar z`}.</p>

  ${section('mult', '1. Multiplikation und Konjugation', `
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`(5 + 3i)(4 - 8i) = 5\cdot4 + 3i\cdot4 - 5\cdot8i - 3i\cdot8i = 20 + 12i - 40i - 24i^2 = 20 - 28i + 24 = 44 - 28i`}.</p>
      <p><b>Beispiel.</b> ${M`(5 - 3i)(4 + 8i) = \bar z_1\cdot\bar z_2 = \overline{z_1 z_2} = \overline{44 - 28i} = 44 + 28i`}.</p>`, { src: 'S. A.1' })}
    <p><b>Konjugieren</b> heisst: das Vorzeichen des Imaginärteils umdrehen, ${M`\bar z = x - iy`}. Im Bild ist das die Spiegelung an der reellen Achse. Das zweite Beispiel zeigt die Regel ${M`\overline{z_1 z_2} = \bar z_1\,\bar z_2`}: Man muss nicht neu rechnen.</p>
    ${box('vorlesung', `<p><b>Beispiel.</b> Ist ${M`\mathrm{Re}\big((3 + i)^4(5 - 7i)\big) = \mathrm{Re}\big((3 - i)^4(5 + 7i)\big)`}? Rechts steht ${M`\bar z_1^4\,\bar z_2 = \overline{z_1^4 z_2}`}. Allgemein ist ${M`\mathrm{Re}(z) = \mathrm{Re}(\bar z)`}, also ist die Aussage korrekt.</p>
      <p><b>Beispiel.</b> Wenn ${M`(3 + 4i)^{10} = A + iB`} mit ${M`A, B\in\R`}, was ist dann ${M`i\cdot(3 - 4i)^{10}`}? ${M`= i\cdot\bar z^{10} = i\cdot\overline{z^{10}} = i\cdot\overline{A + iB} = i\,(A - iB) = B + iA`}.</p>
      <p><b>Beispiel.</b> Für jede komplexe Zahl ${M`z = x + iy`} gilt ${M`z + \bar z = x + iy + x - iy = 2x = 2\,\mathrm{Re}(z)`}, also ${M`\mathrm{Re}(z) = \frac{z + \bar z}{2}`}.</p>
      <p><b>Beispiel.</b> Wenn ${M`z = x + iy`} mit ${M`x, y\in\R`}, dann ist ${M`z\cdot\bar z = (x + iy)(x - iy) = x^2 - i^2y^2 = x^2 + y^2 = |z|^2`}, also</p>
      ${MD`|z| = \sqrt{x^2 + y^2} = \sqrt{z\,\bar z}.`}`, { src: 'S. A.1' })}
    ${box('merke', `<p>${M`z\bar z = |z|^2`} ist immer reell und ${M`\ge 0`}. Das ist der Grund, warum der Trick im nächsten Abschnitt funktioniert.</p>`)}
  `)}

  ${section('div', '2. Division', `
    ${box('vorlesung', `<p><b>Beispiel.</b></p>${MD`\frac{3 + 2i}{4 - i} = \frac{(3 + 2i)(4 + i)}{(4 - i)(4 + i)} = \frac{12 + 3i + 8i + 2i^2}{4^2 - i^2} = \frac{10 + 11i}{16 - (-1)} = \frac{10 + 11i}{17}`}`, { src: 'S. A.2' })}
    ${steps([
      [M`\frac{z_1}{z_2} = \frac{z_1\,\bar z_2}{z_2\,\bar z_2}`, `Zähler und Nenner mit dem Konjugierten des Nenners erweitern (das ist «mal 1»).`],
      [M`z_2\,\bar z_2 = |z_2|^2\in\R`, 'Der Nenner wird reell.'],
      [M`\frac{z_1\bar z_2}{|z_2|^2}`, 'Jetzt nur noch Real- und Imaginärteil des Zählers durch eine reelle Zahl teilen.'],
    ])}
    ${box('vorlesung', `<table class="ctable"><thead><tr><th>${M`z`}</th><th>${M`\frac1z`}</th><th>${M`\mathrm{Re}(\frac1z)`}</th><th>${M`\mathrm{Im}(\frac1z)`}</th><th>${M`\big|\frac1z\big|`}</th><th>${M`|z|`}</th><th>${M`\frac{\bar z}{|z|^2}`}</th></tr></thead>
      <tbody>
      <tr><td>${M`1 + 3i`}</td><td>${M`\frac1{10} - i\frac3{10}`}</td><td>${M`\frac1{10}`}</td><td>${M`\frac{-3}{10}`}</td><td>${M`\frac1{\sqrt{10}}`}</td><td>${M`\sqrt{10}`}</td><td>${M`\frac{1-3i}{10}`}</td></tr>
      <tr><td>${M`2 + 5i`}</td><td>${M`\frac2{29} - i\frac5{29}`}</td><td>${M`\frac2{29}`}</td><td>${M`\frac{-5}{29}`}</td><td>${M`\frac1{\sqrt{29}}`}</td><td>${M`\sqrt{29}`}</td><td>${M`\frac{2-5i}{29}`}</td></tr>
      <tr><td>${M`-3 - 4i`}</td><td>${M`\frac{-3}{25} + i\frac4{25}`}</td><td>${M`\frac{-3}{25}`}</td><td>${M`\frac4{25}`}</td><td>${M`\frac1{\sqrt{25}}`}</td><td>${M`\sqrt{25}`}</td><td>${M`\frac{-3+4i}{25}`}</td></tr>
      </tbody></table>
      <p>Welche Beziehungen gelten immer? ${M`\mathrm{Re}(\frac1{\bar z}) = \mathrm{Re}(\frac1z)`}: ja, denn ${M`\frac1{\bar z} = \overline{\big(\frac1z\big)}`} und ${M`\mathrm{Re}(\bar w) = \mathrm{Re}(w)`}. ${M`\frac1z = \frac{\bar z}{|z|^2}`}: ja, mit ${M`|z|^2 = \bar z\cdot z`}.</p>`, { src: 'S. A.2' })}
  `)}

  ${section('geometrie', '3. Geometrie: Wo liegt 1/z?', `
    ${box('vorlesung', `<p><b>Beispiel.</b> Sei ${M`z`} wie im Bild gegeben. Wo liegt ${M`1/z`}? Es gilt ${M`\frac1z = \frac{\bar z}{|z|^2}`}.</p>
      <ul><li><b>Betrag:</b> ${M`|\bar z| = |z| > 1 \Rightarrow \big|\frac1z\big| = \big|\frac{\bar z}{|z|^2}\big| = \frac{|\bar z|}{|z|^2} = \frac{|z|}{|z|^2} = \frac1{|z|} < 1`}, da ${M`|z| > 1`}.</li>
      <li><b>Imaginärteil:</b> Wenn ${M`\mathrm{Im}(z) > 0`}, dann ist ${M`\mathrm{Im}(\bar z) < 0`}. «${M`\cdot\frac1{|z|^2}`}» ist eine Multiplikation mit einer positiven reellen Zahl, ändert das Vorzeichen nicht. ${M`\Rightarrow \mathrm{Im}(\frac1z) = \mathrm{Im}\big(\frac{\bar z}{|z|^2}\big) < 0`}.</li></ul>`, { src: 'S. A.2–A.3' })}
    ${figure('fig-inv', `Bewege ${M`z`} (rot). ${M`\bar z`} (grau) ist das Spiegelbild an der reellen Achse. ${M`\frac1z = \frac{\bar z}{|z|^2}`} (violett) liegt auf demselben Strahl wie ${M`\bar z`}, aber im Abstand ${M`\frac{1}{|z|}`}: ausserhalb des Einheitskreises wird ${M`\frac1z`} nach innen geholt und umgekehrt. Auf dem Einheitskreis ist ${M`\frac1z = \bar z`}.`, { wide: true })}
    ${box('merke', `<p>Zwei Schritte: spiegeln (${M`z\to\bar z`}), dann auf demselben Strahl auf die Länge ${M`\frac1{|z|}`} bringen. Oben wird unten, gross wird klein.</p>`)}
  `)}
  `;
  invFigure(root.querySelector('#fig-inv'));
}

function invFigure(host) {
  const z = [1.6, 1.1];
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.append(
    slider({ label: M`\mathrm{Re}(z) =`, min: -2.4, max: 2.4, step: 0.05, value: z[0], format: (v) => M([fmt(v, 2)]), onInput: (v) => { z[0] = v; draw(); } }),
    slider({ label: M`\mathrm{Im}(z) =`, min: -2.4, max: 2.4, step: 0.05, value: z[1], format: (v) => M([fmt(v, 2)]), onInput: (v) => { z[1] = v; draw(); } }),
  );
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = { xmin: -2.6, xmax: 2.6, ymin: -2.6, ymax: 2.6 };
    const p = plot(fig, { width: 440, height: 440, ...B });
    p.svg.style.maxWidth = '440px';
    arrowDefs(p.svg);
    grid(p, { ...B, dx: 0.5, dy: 0.5 });
    axes(p, { ...B, xticks: [-2, -1, 1, 2], yticks: [-2, -1, 1, 2], xlabel: 'Re', ylabel: 'Im' });
    el('circle', { cx: p.X(0), cy: p.Y(0), r: p.X(1) - p.X(0), fill: 'none', class: 's-dark dashed', 'stroke-width': 1.2 }, p.svg);
    if (Math.hypot(...z) < 0.08) { readout.innerHTML = `Für ${M`z = 0`} ist ${M`\frac1z`} nicht definiert.`; return; }
    const zb = conj(z), w = cinv(z);
    const ray = 3 / Math.hypot(...zb);
    el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(zb[0] * ray), y2: p.Y(zb[1] * ray), class: 's-dark dashed', 'stroke-width': 0.8, opacity: 0.6 }, p.svg);
    el('line', { x1: p.X(z[0]), y1: p.Y(z[1]), x2: p.X(zb[0]), y2: p.Y(zb[1]), class: 's-dark dashed', 'stroke-width': 0.8, opacity: 0.6 }, p.svg);
    const arrow = (v, cls) => el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(v[0]), y2: p.Y(v[1]), class: `s-${cls}`, 'stroke-width': 2.5, 'marker-end': `url(#arr-${cls})` }, p.svg);
    arrow(z, 'point');
    arrow(w, 'angle');
    el('circle', { cx: p.X(zb[0]), cy: p.Y(zb[1]), r: 5, class: 'fill-dark', opacity: 0.5 }, p.svg);
    text(p.svg, p.X(z[0]) + 8, p.Y(z[1]) - 6, 'z', 'start', 'math t-point');
    text(p.svg, p.X(zb[0]) + 8, p.Y(zb[1]) + 14, 'z̄', 'start', 'math');
    text(p.svg, p.X(w[0]) + 8, p.Y(w[1]) + 14, '1/z', 'start', 'math t-angle');
    readout.innerHTML = `${M([`z = ${fmt(z[0], 2)} ${z[1] >= 0 ? '+' : '-'} ${fmt(Math.abs(z[1]), 2)}\\,i,\\quad |z| = ${fmt(cabs(z), 3)}`])}, &nbsp; ${M([`\\frac1z = ${fmt(w[0], 3)} ${w[1] >= 0 ? '+' : '-'} ${fmt(Math.abs(w[1]), 3)}\\,i,\\quad \\big|\\tfrac1z\\big| = ${fmt(cabs(w), 3)}`])}`;
  }
  draw();
}
