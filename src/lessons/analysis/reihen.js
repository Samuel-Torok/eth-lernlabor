import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text } from '../../ui/svg.js';
import { geomPartial, harmonic } from '../../math/analysis.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Grenzwerte muss man nicht jedes Mal mit ${M`\varepsilon`} und ${M`n_0`} ausrechnen: Die <b>Rechenregeln</b> erlauben es, schwierige Folgen in einfache zu zerlegen. Danach kommt eine neue Art von Folge: die <b>Reihe</b>, also die Folge der Teilsummen. Unendlich viele positive Summanden können eine endliche Summe haben, müssen aber nicht.</p>

  ${section('harmonisch', '1. Beliebig oft etwas addieren', `
    ${box('vorlesung', `<p><b>Beispiel.</b> Für ${M`n \ge 1`} sei ${M`b_n := 1 + \frac12 + \frac13 + \dots + \frac1n`}. Divergiert (siehe Skript/Übungen).</p>`, { src: 'S. I.6' })}
    <p><b>Der Kontrast:</b> In der letzten Lektion konvergierte ${M`1 + \frac1{1!} + \dots + \frac1{n!}`} gegen ${M`e`}, obwohl man beliebig oft etwas Positives addiert. Hier werden die Summanden ${M`\frac1n`} auch immer kleiner, und trotzdem wächst die Summe über jede Grenze. Es kommt also darauf an, <em>wie schnell</em> die Summanden klein werden.</p>
    ${box('ergaenzung', `<p>Warum ${M`b_n`} divergiert: Fasse Blöcke zusammen. ${M`\frac13 + \frac14 \ge \frac14 + \frac14 = \frac12`}, ${M`\frac15 + \dots + \frac18 \ge 4\cdot\frac18 = \frac12`}, usw. Jeder Block bis ${M`2^k`} bringt mindestens ${M`\frac12`}, also ${M`b_{2^k} \ge 1 + \frac k2 \to \infty`}. (Getestet in <code>analysis.test.js</code>.)</p>`)}
  `)}

  ${section('rechenregeln', '2. Rechenregeln für Grenzwerte', `
    ${box('vorlesung', `<p><b>Satz (Rechenregeln für Grenzwerte).</b> Seien ${M`a_n \to a`} und ${M`b_n \to b`} konvergente Folgen und ${M`b \ne 0`}. Dann gilt:</p>
      ${MD`\lim_{n\to\infty}(a_n + b_n) = a + b,\quad \lim_{n\to\infty}(a_n - b_n) = a - b,\quad \lim_{n\to\infty}a_n\cdot b_n = a\cdot b,\quad \lim_{n\to\infty}\frac{a_n}{b_n} = \frac ab`}`, { src: 'S. I.6' })}
    ${box('achtung', `<p>Die Regeln gelten nur, wenn ${M`(a_n)`} und ${M`(b_n)`} <b>einzeln</b> konvergieren. ${M`\frac{2n+7}{n-1}`} darf man nicht als «${M`\lim(2n+7) / \lim(n-1)`}» rechnen: Beide Grenzwerte existieren nicht (${M`\infty/\infty`}). Darum zuerst umformen.</p>`)}
    ${box('vorlesung', `<p><b>Beispiel.</b></p>`, { src: 'S. I.6' })}
    ${steps([
      [M`\lim_{n\to\infty}\frac{2n+7}{n-1} = \lim_{n\to\infty}\frac{1/n}{1/n}\cdot\frac{2n+7}{n-1}`, `Mit ${M`\frac{1/n}{1/n} = 1`} erweitern: Das ändert nichts, macht aber Zähler und Nenner einzeln konvergent.`],
      [M`= \lim_{n\to\infty}\frac{2 + 7/n}{1 - 1/n}`, `Ausmultiplizieren. ${M`7/n \to 0`} und ${M`1/n \to 0`}.`],
      [M`= \frac{2 + 0}{1 - 0} = 2`, `Jetzt gelten die Rechenregeln: Zähler ${M`\to 2`}, Nenner ${M`\to 1 \ne 0`}.`],
    ])}
    <p>Genauso bei höheren Potenzen: Man teilt durch die <b>höchste Potenz im Nenner</b>. Im Skript: ${M`\lim\frac{7n^4 + 3n^2 + 2}{-2n^4 + 5n^3 - n} = \lim\frac{7 + 3/n^2 + 2/n^4}{-2 + 5/n - 1/n^3} = -\frac72`}.</p>
    ${box('merke', `<p>Bei Brüchen von Polynomen in ${M`n`}: durch die höchste Potenz des Nenners teilen. Bleiben nur Konstanten übrig, ist der Grenzwert das Verhältnis der führenden Koeffizienten.</p>`)}
  `)}

  ${section('geometrisch', '3. Geometrische Folge und Reihe', `
    ${box('vorlesung', `<p><b>Definition.</b> Eine Folge ${M`(a_n)`} mit ${M`a_0 = a \ne 0`} und ${M`a_n = aq^n`} für feste ${M`a, q\in\R`} und alle ${M`n\ge1`} ist eine <b>geometrische Folge</b>. Für ${M`|q| < 1`} ist dies eine Nullfolge, da ${M`|q^n| \to 0`}.</p>
      <p><b>Definition.</b> Gegeben eine Folge ${M`(a_n)`}, definiere</p>
      ${MD`s_n := a_0 + a_1 + a_2 + \dots + a_{n-1} + a_n =: \sum_{k=0}^{n} a_k,`}
      <p>die <b>Summe von ${M`k=0`} bis ${M`n`} über ${M`a_k`}</b>. Dann bilden die so definierten ${M`s_n`} eine Folge ${M`(s_n)`}, genannt die <b>Reihe</b> zur Folge ${M`(a_n)`}.</p>`, { src: 'S. I.7' })}
    <p><b>So liest man das Summenzeichen:</b> ${M`\sum_{k=0}^n a_k`} heisst: Setze nacheinander ${M`k = 0, 1, \dots, n`} ein und addiere. Das ${M`k`} ist nur ein Zähler; nach dem Summieren kommt es nicht mehr vor.</p>
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`a_n := \frac1{n!}`}, ${M`n\ge0`}: ${M`s_n = \sum_{k=0}^n\frac1{k!}`}, und ${M`(s_n)`} ist konvergent mit ${M`\lim s_n = e`}.</p>
      <p><b>Beispiel.</b> Für ein festes ${M`x\ne0`} und ${M`b_n := x^n`}, ${M`n \ge 0`}, ist die zugehörige Reihe</p>
      ${MD`s_n = 1 + x + x^2 + \dots + x^n = \sum_{k=0}^n x^k = \frac{1 - x^{n+1}}{1 - x} \xrightarrow[|x|<1]{n\to\infty} \frac{1}{1-x}`}
      <p>die <b>geometrische Reihe</b>.</p>`, { src: 'S. I.7' })}
    ${box('ergaenzung', `<p>Warum ${M`s_n = \frac{1 - x^{n+1}}{1-x}`}? Multipliziere ${M`s_n`} mit ${M`x`}: ${M`x s_n = x + x^2 + \dots + x^{n+1}`}. Abziehen: ${M`s_n - x s_n = 1 - x^{n+1}`}. Fast alles hebt sich weg. Teilen durch ${M`1 - x`} (erlaubt für ${M`x \ne 1`}). Für ${M`|x| < 1`} gilt ${M`x^{n+1}\to0`}, daher der Grenzwert.</p>`)}
    ${figure('fig-geom', `Die Teilsummen ${M`s_n`} als Punkte. Gestrichelt: der Grenzwert ${M`\frac1{1-x}`}. Für ${M`|x| < 1`} nähern sich die Punkte der Linie, für ${M`x < 0`} abwechselnd von oben und unten. Für ${M`|x| \ge 1`} divergiert die Reihe. Zum Vergleich: die harmonische Reihe wächst langsam, aber ohne Grenze.`, { wide: true })}
  `)}
  `;
  geomFigure(root.querySelector('#fig-geom'));
}

function geomFigure(host) {
  let mode = 'geom';
  let x = 0.6;
  const N = 30;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const xs = slider({ label: M`x =`, min: -1.2, max: 1.1, step: 0.05, value: x, format: (v) => M([fmt(v, 2)]), onInput: (v) => { x = v; draw(); } });
  const modes = buttonRow([
    { label: 'geometrisch', onClick: () => { mode = 'geom'; xs.style.visibility = 'visible'; draw(); } },
    { label: 'harmonisch', onClick: () => { mode = 'harm'; xs.style.visibility = 'hidden'; draw(); } },
  ]);
  modes.firstChild.classList.add('active');
  controls.append(modes, xs);
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const ymin = -1, ymax = 6;
    const p = plot(fig, { width: 640, height: 300, xmin: 0, xmax: N + 1, ymin, ymax });
    axes(p, { xmin: 0, xmax: N + 1, ymin, ymax, xticks: [5, 10, 15, 20, 25, 30], yticks: [1, 2, 3, 4, 5], xlabel: 'n', ylabel: 's_n' });
    const f = mode === 'geom' ? (n) => geomPartial(x, n) : (n) => harmonic(n + 1);
    const conv = mode === 'geom' && Math.abs(x) < 1;
    if (conv) {
      const L = 1 / (1 - x);
      el('line', { x1: p.X(0), x2: p.X(N + 1), y1: p.Y(L), y2: p.Y(L), class: 's-dark dashed', 'stroke-width': 1 }, p.svg);
      text(p.svg, p.X(N + 0.8), p.Y(L) - 6, '1/(1−x)', 'end', 'math');
    }
    for (let n = 0; n <= N; n++) {
      const v = f(n);
      if (v < ymin - 0.2 || v > ymax + 0.2) continue;
      el('circle', { cx: p.X(n), cy: p.Y(v), r: 3.6, class: mode === 'geom' ? 'dot-in' : 'fill-y' }, p.svg);
    }
    readout.innerHTML = mode === 'harm'
      ? `${M`1 + \tfrac12 + \dots + \tfrac1{31} \approx`} ${M([fmt(harmonic(31), 3)])}. Die Summe wächst etwa wie ${M`\ln n`}: langsam, aber unbeschränkt.`
      : conv
        ? `${M([`s_{${N}} = ${fmt(geomPartial(x, N), 4)}`])}, ${M([`\\tfrac{1}{1-x} = ${fmt(1 / (1 - x), 4)}`])}: konvergent.`
        : `${M([`|x| = ${fmt(Math.abs(x), 2)} \\ge 1`])}: ${M`x^{n+1}`} wird nicht klein, die Reihe divergiert.`;
  }
  draw();
}
