import { M, fmt } from '../../ui/tex.js';
import { box, figure, section } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, graph, grid } from '../../ui/svg.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Viele Funktionen sind bekannte Grundfunktionen, die nur verschoben, gestreckt oder gespiegelt wurden. Wer die sechs Grundtransformationen kennt, kann den Graphen von ${M`A\cos(\omega t + \varphi)`} oder ${M`\frac{4}{(x-6)(x+1)}`} ohne Rechnen skizzieren.</p>

  ${section('sechs', '1. Die sechs Transformationen', `
    ${box('vorlesung', `<p>Mögliche Transformationen einer Funktion ${M`f`}:</p><ol>
      <li>${M`f_1(x) := f(x - a),\ a\in\R`}: Verschieben von ${M`f`} um ${M`a`} entlang der ${M`x`}-Achse.</li>
      <li>${M`f_2(x) := f(x) + b,\ b\in\R`}: Verschieben von ${M`f`} um ${M`b`} entlang der ${M`y`}-Achse.</li>
      <li>${M`f_3(x) := f(c\cdot x),\ c\in\R\setminus\{0\}`}: Strecken/Stauchen um Faktor ${M`|c|`} entlang der ${M`x`}-Achse, mit Spiegelung falls ${M`c < 0`}.</li>
      <li>${M`f_4(x) := d\cdot f(x),\ d\in\R\setminus\{0\}`}: Strecken/Stauchen um Faktor ${M`|d|`} entlang der ${M`y`}-Achse, mit Spiegelung falls ${M`d < 0`}.</li>
      <li>${M`f_5(x) := \frac{1}{f(x)},\ f(x)\ne0`}: Invertieren entlang der ${M`y`}-Achse, vertauscht Null- mit Polstellen.</li>
      <li>${M`f_6(x) := f\big(\frac1x\big),\ x\ne0`}: Invertieren entlang der ${M`x`}-Achse.</li></ol>`, { src: 'S. I.20' })}
    ${box('achtung', `<p>Bei ${M`f(x - a)`} wandert der Graph um ${M`a`} nach <b>rechts</b>, nicht nach links. Grund: Der neue Graph erreicht den Wert, den ${M`f`} bei ${M`0`} hatte, erst bei ${M`x = a`}. Genauso staucht ${M`f(2x)`} den Graphen (er ist «doppelt so schnell»), statt ihn zu strecken. Alles, was <em>innen</em> am ${M`x`} passiert, wirkt umgekehrt.</p>`)}
    ${figure('fig-trans', `Gestrichelt: die Grundfunktion ${M`f`}. Durchgezogen: ${M`d\cdot f\big(c\,(x - a)\big) + b`}. Ändere einen Regler nach dem anderen und beobachte, welche Richtung er bewegt. Die Knöpfe zeigen zusätzlich die Inversionen 5 und 6.`, { wide: true })}
  `)}

  ${section('beispiele', '2. Beispiele aus der Vorlesung', `
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`f(x) := \frac{4}{(x-6)(x+1)} = 4\cdot\frac{1}{(\ )(\ )} = f_4\big(f_5((x-6)(x+1))\big)`}: Die Nullstellen des Polynoms, 6 und ${M`-1`}, werden durch ${M`\frac1{(\ )}`} zu Polstellen.</p>
      <p><b>Beispiel.</b> ${M`f(x) := \frac13\cdot\tan(2x - \pi/2) + 2 = f_2\big(f_4(f_3(f_1(\tan x)))\big)`}: ein verschobener, verzerrter Tangens.</p>
      <p><b>Beispiel.</b> ${M`f(t) := A\cdot\cos(\omega t + \varphi)`}: ${M`A`} Amplitude, ${M`\omega`} Winkelgeschwindigkeit, ${M`\varphi`} Phasenverschiebung.</p>`, { src: 'S. I.20–I.21' })}
    <p><b>Reihenfolge beim Tangens-Beispiel:</b> ${M`\tan(2x - \pi/2) = \tan\big(2(x - \pi/4)\big)`}. Also zuerst um ${M`\pi/4`} nach rechts verschieben (${M`f_1`}), dann mit ${M`c = 2`} entlang ${M`x`} stauchen (${M`f_3`}), dann mit ${M`d = \frac13`} entlang ${M`y`} stauchen (${M`f_4`}), dann um 2 nach oben (${M`f_2`}).</p>
    ${box('merke', `<p>Bei ${M`A\cos(\omega t + \varphi)`}: ${M`A`} ist ${M`f_4`} (Höhe), ${M`\omega`} ist ${M`f_3`} (Periode ${M`2\pi/\omega`}), ${M`\varphi`} ist ${M`f_1`} mit Verschiebung ${M`-\varphi/\omega`}. Das braucht man in der Mechanik bei jeder Schwingung.</p>`)}
  `)}
  `;
  transFigure(root.querySelector('#fig-trans'));
}

function transFigure(host) {
  const bases = {
    sin: { f: Math.sin, tex: '\\sin x' },
    sq: { f: (x) => x * x, tex: 'x^2' },
    lin: { f: (x) => x - 1, tex: 'x - 1' },
  };
  let base = bases.sin;
  let inv = 'none';
  const s = { a: 0, b: 0, c: 1, d: 1 };
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const sl = document.createElement('div');
  sl.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const b1 = buttonRow(Object.entries(bases).map(([k, v]) => ({ label: M([`f = ${v.tex}`]), onClick: () => { base = bases[k]; draw(); } })));
  b1.firstChild.classList.add('active');
  const b2 = buttonRow([
    { label: 'keine Inversion', onClick: () => { inv = 'none'; draw(); } },
    { label: M`\tfrac{1}{f(x)}`, onClick: () => { inv = 'y'; draw(); } },
    { label: M`f(\tfrac1x)`, onClick: () => { inv = 'x'; draw(); } },
  ]);
  b2.firstChild.classList.add('active');
  controls.append(b1, b2);
  const mk = (key, label, min, max) => slider({ label, min, max, step: 0.1, value: s[key], format: (v) => M([fmt(v, 1)]), onInput: (v) => { s[key] = v; draw(); } });
  sl.append(mk('a', M`a =`, -3, 3), mk('b', M`b =`, -3, 3), mk('c', M`c =`, -3, 3), mk('d', M`d =`, -3, 3));
  host.append(controls, sl, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = { xmin: -6.5, xmax: 6.5, ymin: -4.5, ymax: 4.5 };
    const p = plot(fig, { width: 660, height: 360, ...B });
    grid(p, B);
    axes(p, { ...B, xticks: [-6, -4, -2, 2, 4, 6], yticks: [-4, -2, 2, 4], xlabel: 'x', ylabel: 'y' });
    const c = Math.abs(s.c) < 0.05 ? 0.05 : s.c;
    const f0 = inv === 'y' ? (x) => 1 / base.f(x) : inv === 'x' ? (x) => base.f(1 / x) : base.f;
    const g = (x) => s.d * f0(c * (x - s.a)) + s.b;
    graph(p, f0, { ...B, cls: 's-dark dashed', width: 1.5, jump: 6, n: 1600 });
    graph(p, g, { ...B, cls: 's-x', width: 3, jump: 6, n: 1600 });
    const inner = inv === 'y' ? `\\frac{1}{${base.tex.replace(/x/g, '\\square')}}` : inv === 'x' ? base.tex.replace(/x/g, '\\tfrac{1}{\\square}') : base.tex.replace(/x/g, '\\square');
    const arg = `${fmt(c, 1)}\\,(x ${s.a >= 0 ? '-' : '+'} ${fmt(Math.abs(s.a), 1)})`;
    readout.innerHTML = `${M([`g(x) = ${fmt(s.d, 1)}\\cdot ${inner.replace(/\\square/g, `\\big(${arg}\\big)`)} ${s.b >= 0 ? '+' : '-'} ${fmt(Math.abs(s.b), 1)}`])}`;
  }
  draw();
}
