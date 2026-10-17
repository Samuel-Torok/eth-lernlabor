import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider } from '../../ui/controls.js';
import { plot, axes, el, text, graph, grid } from '../../ui/svg.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Wo ist eine Funktion am grössten oder am kleinsten, und zwar auf dem <em>ganzen</em> Definitionsbereich? Die Antwort ist ein Rezept in zwei Schritten: Kandidaten sammeln (drei Sorten), dann vergleichen. Die häufigste Fehlerquelle: einen der drei Kandidatentypen vergessen.</p>

  ${section('def', '1. Globale Extremalstellen', `
    ${box('vorlesung', `<p><b>Definition.</b> Eine Stelle ${M`x_0\in D(f)`} ist eine <b>globale Maximalstelle von ${M`f`}</b>, wenn für alle ${M`x\in D(f)`} gilt: ${M`f(x_0)\ge f(x)`}. Analog ist ${M`x_0`} eine <b>globale Minimalstelle</b>, wenn ${M`f(x_0)\le f(x)`} für alle ${M`x\in D(f)`}. Eine Stelle ist eine <b>globale Extremalstelle</b>, wenn sie eine globale Maximal- oder Minimalstelle ist. In diesen Fällen ist ${M`f(x_0)`} ein <b>globales Maximum oder Minimum oder Extremum</b>.</p>
      <p><b>Satz.</b> Sei ${M`x_0\in D(f) = [a,b]`} eine lokale Extremalstelle einer Funktion ${M`f`}. Dann ist</p><ul>
      <li>(I): die Funktion ${M`f`} differenzierbar an der Stelle ${M`x_0`} und ${M`f'(x_0) = 0`}, oder</li>
      <li>(II): die Funktion ${M`f`} nicht differenzierbar an der Stelle ${M`x_0`}, oder</li>
      <li>(III): ${M`x_0`} auf dem Rand des Definitionsbereichs.</li></ul>
      <p>Suchen von globalen Extremalstellen geht deshalb wie folgt: <b>Schritt 1:</b> Anhand (I), (II), (III) alle lokalen Extremalstellen finden. <b>Schritt 2:</b> Vergleichen, was der grösste/kleinste Wert ist.</p>`, { src: 'S. II.17' })}
    <p><b>Warum genügen diese drei Sorten?</b> Ein Extremum im Inneren, an dem ${M`f`} differenzierbar ist, hat nach dem Satz aus II.12 ${M`f' = 0`}: Sorte (I). Alle anderen Extrema liegen entweder an einer «Knickstelle» (II) oder am Rand (III). Bei ${M`D(f) = \R`} gibt es keinen Rand; stattdessen schaut man ${M`x\to\pm\infty`} an.</p>
  `)}

  ${section('beispiel', `2. Beispiel: ${M`f(x) = (x - 1)\sqrt[3]{x^2}`}`, `
    ${box('vorlesung', `<p><b>Beispiel.</b> Man bestimme die globalen Extremalstellen der Funktion ${M`f(x) := (x - 1)\cdot\sqrt[3]{x^2}`} mit ${M`D(f) = \R`}.</p>`, { src: 'S. II.17–II.18' })}
    ${steps([
      [M`f'(x) = \sqrt[3]{x^2} + (x - 1)\cdot\frac23\cdot\frac{1}{\sqrt[3]x} = \frac{x + \frac23(x - 1)}{\sqrt[3]x} = \frac{5x - 2}{3\sqrt[3]x}`, `Schritt 1 (I): Produktregel. ${M`\sqrt[3]{x^2} = x^{2/3}`} hat die Ableitung ${M`\frac23x^{-1/3}`}. Auf gemeinsamen Nenner bringen.`],
      [M`f'(x) \overset!= 0 \iff x = \tfrac25,\qquad f\big(\tfrac25\big) = -\tfrac35\sqrt[3]{\tfrac{4}{25}}`, 'Ein Bruch ist null, wenn der Zähler null ist.'],
      [M`\text{(II): } f \text{ ist bei } x = 0 \text{ nicht differenzierbar},\ f(0) = 0`, `Im Nenner von ${M`f'`} steht ${M`\sqrt[3]x`}, das bei 0 null wird (senkrechte Tangente, eine «Spitze»).`],
      [M`\text{(III): } D(f) = \R:\quad \lim_{x\to\infty}(x - 1)\sqrt[3]{x^2} = \infty,\quad \lim_{x\to-\infty}(x - 1)\sqrt[3]{x^2} = -\infty`, 'Keine Randpunkte, also Verhalten im Unendlichen ansehen.'],
      [M`\Rightarrow \text{Es gibt kein globales Maximum oder Minimum.}`, 'Schritt 2, Vergleichen: Die Funktion wird beliebig gross und beliebig klein.'],
    ])}
    ${box('achtung', `<p>Auf S. II.18 steht beim Vergleichen ${M`f(\frac25) = -\frac32\sqrt[3]{\frac{4}{25}}`}; richtig ist ${M`-\frac35\sqrt[3]{\frac4{25}}`} wie auf S. II.17 (denn ${M`\frac25 - 1 = -\frac35`}). Das Ergebnis ändert sich nicht.</p>`)}
    ${figure('fig-ext', `Der Graph mit den Kandidaten: ${M`x = \frac25`} (${M`f' = 0`}, ein lokales Minimum) und ${M`x = 0`} (nicht differenzierbar, ein lokales Maximum mit Spitze). Verkleinere den Definitionsbereich auf ${M`[a, b]`}: Dann kommen die Randpunkte dazu, und es gibt globale Extrema (rot markiert).`, { wide: true })}
  `)}

  ${section('zylinder', '3. Beispiel: Kreuzstab im Zylinder', `
    ${box('vorlesung', `<p><b>Beispiel.</b> Ausfüllen eines Zylinders von Radius ${M`r`} mit einem Kreuzstab. Gegeben die Geometrie und ${M`r > 0`}. Gesucht: ${M`x, y, \alpha`}, so dass die Fläche ${M`A`} maximal wird.</p>
      ${MD`A = 4\,\big(xy + y(x - y)\big) = 4y\,(2x - y)`}
      <p>Es gilt ${M`x^2 + y^2 = r^2 \Rightarrow x = r\cos\alpha,\ y = r\sin\alpha`}, also</p>
      ${MD`A(\alpha) = 4\,r\sin\alpha\,(2r\cos\alpha - r\sin\alpha) = 4r^2\big(\sin(2\alpha) - \sin^2\alpha\big).`}`, { src: 'S. II.18' })}
    <p><b>So liest man das:</b> Statt zwei Unbekannten ${M`x, y`} mit der Nebenbedingung ${M`x^2 + y^2 = r^2`} nimmt man <em>einen</em> Winkel ${M`\alpha`}. Die Nebenbedingung ist dann automatisch erfüllt, und aus einer Aufgabe mit zwei Variablen wird eine mit einer.</p>
    ${box('ergaenzung', `<p>Die Rechnung endet im Skript hier. Weiter: ${M`A'(\alpha) = 4r^2\big(2\cos 2\alpha - 2\sin\alpha\cos\alpha\big) = 4r^2\big(2\cos2\alpha - \sin2\alpha\big) \overset!= 0 \iff \tan 2\alpha = 2`}, also ${M`\alpha^* = \frac12\arctan 2\approx 31{,}7^\circ`}. Die Randpunkte ${M`\alpha = 0`} (${M`A = 0`}) und ${M`\alpha = \frac\pi4`} (${M`A = 2r^2`}) sind kleiner, also ist ${M`\alpha^*`} das globale Maximum mit ${M`A_{\max} = 2r^2(\sqrt5 - 1)\approx 2{,}47\,r^2`}. (Numerisch geprüft in <code>analysis.test.js</code>.)</p>`)}
    ${figure('fig-cross', `Links: Querschnitt mit dem Kreuzstab für den Winkel ${M`\alpha`}. Rechts: die Fläche ${M`A(\alpha)/r^2`}. Suche das Maximum mit dem Regler.`, { wide: true })}
  `)}
  `;
  extFigure(root.querySelector('#fig-ext'));
  crossFigure(root.querySelector('#fig-cross'));
}

function extFigure(host) {
  const f = (x) => (x - 1) * Math.cbrt(x * x);
  let a = -0.8, b = 1.6;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.append(
    slider({ label: M`a =`, min: -1.5, max: 0.3, step: 0.05, value: a, format: (v) => M([fmt(v, 2)]), onInput: (v) => { a = v; draw(); } }),
    slider({ label: M`b =`, min: 0.5, max: 2, step: 0.05, value: b, format: (v) => M([fmt(v, 2)]), onInput: (v) => { b = v; draw(); } }),
  );
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = { xmin: -1.6, xmax: 2.1, ymin: -2.2, ymax: 1.7 };
    const p = plot(fig, { width: 620, height: 320, ...B });
    grid(p, { ...B, dx: 0.5, dy: 0.5 });
    axes(p, { ...B, xticks: [-1, 1, 2], yticks: [-2, -1, 1], xlabel: 'x', ylabel: 'y' });
    graph(p, f, { ...B, cls: 's-dark', width: 1.2, extra: { opacity: 0.4 } });
    graph(p, f, { xmin: a, xmax: b, ymin: B.ymin, ymax: B.ymax, cls: 's-x', width: 3 });
    const cands = [{ x: 0.4, why: "f'=0" }, { x: 0, why: 'nicht diff’bar' }, { x: a, why: 'Rand' }, { x: b, why: 'Rand' }].filter((c) => c.x >= a - 1e-9 && c.x <= b + 1e-9);
    const vals = cands.map((c) => f(c.x));
    const max = Math.max(...vals), min = Math.min(...vals);
    for (const c of cands) {
      const y = f(c.x);
      const glob = Math.abs(y - max) < 1e-9 || Math.abs(y - min) < 1e-9;
      el('circle', { cx: p.X(c.x), cy: p.Y(y), r: glob ? 7 : 5, class: glob ? 'fill-point' : 'fill-angle' }, p.svg);
    }
    const xmax = cands[vals.indexOf(max)].x, xmin = cands[vals.indexOf(min)].x;
    readout.innerHTML = `Kandidaten auf ${M([`[${fmt(a, 2)}, ${fmt(b, 2)}]`])}: ${cands.map((c) => `${M([`x = ${fmt(c.x, 2)}`])} (${c.why}, ${M([`f = ${fmt(f(c.x), 3)}`])})`).join('; ')}. Globales Maximum bei ${M([`x = ${fmt(xmax, 2)}`])}, globales Minimum bei ${M([`x = ${fmt(xmin, 2)}`])}.`;
  }
  draw();
}

function crossFigure(host) {
  let deg = 25;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  fig.style.display = 'grid';
  fig.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
  fig.style.gap = '12px';
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.appendChild(slider({ label: M`\alpha =`, min: 1, max: 44, step: 0.5, value: deg, format: (v) => M([`${fmt(v, 1)}^\\circ`]), onInput: (v) => { deg = v; draw(); } }));
  host.append(controls, fig, readout);
  const A = (al) => 4 * (Math.sin(2 * al) - Math.sin(al) ** 2);
  function draw() {
    fig.innerHTML = '';
    const left = document.createElement('div'), right = document.createElement('div');
    fig.append(left, right);
    const al = (deg * Math.PI) / 180, x = Math.cos(al), y = Math.sin(al);
    const p = plot(left, { width: 300, height: 300, xmin: -1.15, xmax: 1.15, ymin: -1.15, ymax: 1.15, pad: 6 });
    el('circle', { cx: p.X(0), cy: p.Y(0), r: p.X(1) - p.X(0), fill: 'none', class: 's-dark', 'stroke-width': 1.5 }, p.svg);
    const cross = [[x, y], [y, y], [y, x], [-y, x], [-y, y], [-x, y], [-x, -y], [-y, -y], [-y, -x], [y, -x], [y, -y], [x, -y]];
    el('path', { d: cross.map((q, i) => `${i ? 'L' : 'M'}${p.X(q[0])},${p.Y(q[1])}`).join(' ') + 'Z', class: 'fill-rho s-rho', opacity: 0.35, 'stroke-width': 1.5 }, p.svg);
    el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(x), y2: p.Y(y), class: 's-point', 'stroke-width': 2 }, p.svg);
    text(p.svg, p.X(x / 2) + 4, p.Y(y / 2) - 6, 'r', 'start', 'math t-point');
    text(p.svg, p.X(x / 2), p.Y(0) + 16, 'x', 'middle', 'math t-x');
    text(p.svg, p.X(x) + 6, p.Y(y / 2), 'y', 'start', 'math t-y');
    const q = plot(right, { width: 300, height: 300, xmin: -3, xmax: 48, ymin: -0.3, ymax: 2.8, pad: 26 });
    axes(q, { xmin: 0, xmax: 48, ymin: 0, ymax: 2.8, xticks: [15, 30, 45], yticks: [1, 2], xlabel: 'α [°]', ylabel: 'A/r²' });
    graph(q, (d) => A((d * Math.PI) / 180), { xmin: 0, xmax: 45, ymin: 0, ymax: 2.8, cls: 's-rho', width: 2.5 });
    el('circle', { cx: q.X(deg), cy: q.Y(A(al)), r: 5.5, class: 'fill-point' }, q.svg);
    readout.innerHTML = `${M([`A(\\alpha) = 4r^2\\big(\\sin 2\\alpha - \\sin^2\\alpha\\big) = ${fmt(A(al), 3)}\\,r^2`])} &nbsp; (Maximum ${M`\approx 2{,}472\,r^2`} bei ${M`\alpha\approx31{,}7^\circ`})`;
  }
  draw();
}
