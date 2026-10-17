import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text, graph, grid } from '../../ui/svg.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">«Stetig» heisst anschaulich: Man kann den Graphen zeichnen, ohne abzusetzen. Die Vorlesung macht das präzise mit Folgen: Nähert man sich der Stelle ${M`\xi`}, müssen sich die Funktionswerte ${M`f(\xi)`} nähern. Und zwar für <em>jede</em> Art, sich zu nähern.</p>

  ${section('frage', '1. Was kann bei Definitionslücken passieren?', `
    ${box('vorlesung', `<p>${M`f(x) = \sin\big(\frac{2\pi}{x}\big)`} und ${M`f(x) = \frac{\sin x}{x}`}: Beide Funktionen sind bei ${M`x = 0`} nicht definiert, verhalten sich aber sehr unterschiedlich um ${M`x = 0`}.</p>
      <p>Sei ${M`f: (a,b)\to\R`} und ${M`(x_n)\subset(a,b)`} mit ${M`\lim x_n = \xi\in[a,b]`}. Frage: Ist ${M`\lim_{n\to\infty} f(x_n) \overset{?}{=} f(\xi) \ \big(= f(\lim_{n\to\infty} x_n)\big)`}? Wenn ja: ${M`f`} ist stetig.</p>`, { src: 'S. I.13' })}
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`f(x) := 1`} falls ${M`x > 0`}, ${M`0`} falls ${M`x\le0`}. Sei ${M`x_n := \frac1n`}. Dann ${M`\lim x_n = 0 =: \xi`} mit ${M`f(\xi) = f(0) = 0`}, aber ${M`\lim f(x_n) = \lim f(\frac1n) = \lim 1 = 1`}. Antwort hier: Nein! ${M`f`} «springt» bei ${M`x = 0`} von 0 nach 1.</p>
      <p><b>Beispiel.</b> ${M`g(x) := \sin(2\pi/x)`} falls ${M`x\ne0`}, ${M`0`} falls ${M`x = 0`}. Hier gilt ${M`\lim g(x_n) = g(\lim x_n)`} für die Folgen ${M`x_n := \frac1n`} und ${M`x_n := \frac2n`}, aber nicht für ${M`x_n := \frac4n`}!</p>
      <p><b>Fazit:</b> Um solche Sprünge mit Folgen zu erkennen, muss man <b>alle</b> Folgen ${M`(x_n)`} mit ${M`x_n\to\xi`} auf ${M`\lim g(x_n) = g(\xi)`} überprüfen.</p>`, { src: 'S. I.13–I.14' })}
    ${figure('fig-seq', `Die Punkte ${M`(x_n, f(x_n))`} für eine Folge ${M`x_n = c/n \to 0`} (rot). Der Kreis bei ${M`x = 0`} markiert ${M`f(0)`}. Bei ${M`g(x) = \sin(2\pi/x)`} mit ${M`c = 1`} oder ${M`2`} landen alle Punkte auf 0, mit ${M`c = 4`} springen sie zwischen ${M`1, 0, -1, 0`} hin und her: Eine einzige «gute» Folge beweist also nichts.`, { wide: true })}
    <p><b>Warum ${M`c = 4`} versagt:</b> ${M`g(4/n) = \sin(2\pi n/4) = \sin(n\pi/2)`}. Das ist genau die Folge ${M`1, 0, -1, 0, \dots`} aus der Lektion über Folgen, die nicht konvergiert.</p>
  `)}

  ${section('def', '2. Definition der Stetigkeit', `
    ${box('vorlesung', `<p><b>Definition.</b> ${M`f:(a,b)\to\R`} ist <b>stetig an der Stelle</b> ${M`\xi\in(a,b)`}, wenn für jede Folge ${M`(x_n)\subset(a,b)`} mit ${M`x_n\to\xi`} gilt:</p>
      ${MD`\lim_{n\to\infty} f(x_n) = f(\xi) \quad\Big(= f\big(\lim_{n\to\infty}x_n\big)\Big).`}
      <p><b>Definition.</b> Eine Funktion ${M`f`} ist <b>stetig</b>, wenn ${M`f`} an jeder Stelle ${M`\xi\in D(f)`} stetig ist.</p>
      <p>Bsp: Alle grundlegenden Funktionen sind stetig. Bemerkung: Auch ${M`f(x) = 1/x`} mit ${M`D(f) = \R\setminus\{0\}`} ist stetig, denn für jedes ${M`x\ne0`} gilt obige Definition. ${M`x = 0`}, die «Polstelle», ist nicht in ${M`D(f)`}!</p>`, { src: 'S. I.14' })}
    ${box('achtung', `<p>«Heute widerlegen wir: Die Funktion ${M`1/x`} ist nicht stetig, denn sie hat einen Pol» (Vorlesung 4). Stetigkeit wird nur <b>an Stellen des Definitionsbereichs</b> geprüft. Bei ${M`x = 0`} ist ${M`1/x`} gar nicht definiert, also gibt es dort nichts zu prüfen.</p>`)}
  `)}

  ${section('einseitig', '3. Links- und Rechtsgrenzwert', `
    ${box('vorlesung', `<p><b>Definition.</b> Die Funktion ${M`f:(a,b)\to\R`} hat den <b>linken Grenzwert</b> ${M`c`} an der Stelle ${M`\xi`}, wenn für jede Folge ${M`(x_n)`} mit ${M`x_n\to\xi`} und ${M`x_n < \xi`} für alle ${M`n`} gilt: ${M`\lim f(x_n) = c`}. Notation: ${M`\lim_{x\to\xi^-} f(x) = c`}. Analog: <b>rechter Grenzwert</b> für ${M`x_n > \xi`}, ${M`\lim_{x\to\xi^+} f(x) = c`}.</p>
      <p><b>Satz.</b> ${M`f`} ist genau dann stetig an der Stelle ${M`\xi\in D(f)`}, wenn gilt:</p>
      ${MD`\lim_{x\to\xi^-} f(x) = f(\xi) = \lim_{x\to\xi^+} f(x).`}
      <p><b>Bemerkung:</b> In der Definition von Links-/Rechtsgrenzwert muss nicht zwingend ${M`\xi\in D(f)`} gelten. Auch ${M`\xi = a`} oder ${M`\xi = b`}, d.h. auf dem Rand von ${M`D(f)`}, ist möglich.</p>`, { src: 'S. I.14–I.15' })}
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`f(x) := 2^{-1/x}`}, ${M`D(f) = \R\setminus\{0\}`}. Ausserhalb von ${M`x = 0`} ist die Funktion sicher stetig, da eine Verkettung von grundlegenden Funktionen.</p>
      <ul><li>${M`\lim_{x\to0^-} f(x) = \infty`}, da ${M`-\frac1x > 0`} für ${M`x < 0`} und ${M`-\frac1x\to+\infty`} für ${M`x\to0^-`}.</li>
      <li>${M`\lim_{x\to0^+} f(x) = 0`}, da ${M`-\frac1x < 0`} für ${M`x > 0`} und ${M`-\frac1x\to-\infty`}, also ${M`2^{-1/x}\to0`}.</li></ul>
      <p>Beachte: ${M`\lim_{x\to0^+}f(x)`} ist bestimmbar, obwohl ${M`0\notin D(f)`}.</p>`, { src: 'S. I.15' })}
    ${box('vorlesung', `<p><b>Satz (Rechenregeln für Grenzwerte).</b> Seien ${M`\lim_{x\to\xi^+} f(x) = a`} und ${M`\lim_{x\to\xi^+} g(x) = b`} konvergente Rechtsgrenzwerte und (wo nötig) ${M`b\ne0`}. Dann gilt ${M`\lim (f\pm g) = a\pm b`}, ${M`\lim f\cdot g = a\cdot b`}, ${M`\lim\frac fg = \frac ab`}. Alle Regeln gelten analog für Linksgrenzwerte und beidseitige Grenzwerte.</p>`, { src: 'S. I.15' })}
  `)}

  ${section('sinx', `4. Der wichtigste Grenzwert: ${M`\frac{\sin x}{x}\to 1`}`, `
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`f(x) := \frac{\sin x}{x}`}, ${M`D(f) = \R\setminus\{0\}`}. Was ist ${M`\lim_{x\to0^+}f(x)`}? Zuerst: ${M`f(-x) = \frac{\sin(-x)}{-x} = \frac{-\sin x}{-x} = f(x)`}, ${M`f`} ist gerade. Also ${M`\lim_{x\to0^-}f = \lim_{x\to0^+}f`}, es reicht ${M`x\to0^+`}.</p>`, { src: 'S. I.16' })}
    <p><b>Der Beweis mit drei Flächen</b> (S. I.16–I.17). Für ${M`0 < x < \frac\pi2`} vergleicht man im Einheitskreis: das kleine Dreieck ${M`\subset`} den Kreissektor ${M`\subset`} das grosse Dreieck.</p>
    ${steps([
      [M`\frac{\cos x\,\sin x}{2} < \frac x2 < \frac{\tan x}{2}`, `Flächen: kleines Dreieck (Grundseite ${M`\cos x`}, Höhe ${M`\sin x`}), Kreissektor mit Winkel ${M`x`} im Einheitskreis (Fläche ${M`\frac x2`}), grosses Dreieck (Grundseite 1, Höhe ${M`\tan x`}).`],
      [M`\cos x < \frac{x}{\sin x} < \frac{1}{\cos x}`, `Mit ${M`\frac2{\sin x}`} multiplizieren (positiv für ${M`0 < x < \frac\pi2`}, die Ungleichungen bleiben).`],
      [M`\frac{1}{\cos x} > \frac{\sin x}{x} > \cos x`, 'Kehrwerte nehmen (alles positiv): Die Ungleichungen drehen sich um.'],
      [M`\lim_{x\to0^+}\frac{1}{\cos x} = 1 = \lim_{x\to0^+}\cos x \;\Rightarrow\; \lim_{x\to0^+}\frac{\sin x}{x} = 1`, `${M`\frac{\sin x}{x}`} ist zwischen zwei Funktionen eingeklemmt, die beide gegen 1 gehen. Es kann aus dem «Sandwich» nicht entfliehen.`],
    ])}
    ${figure('fig-sandwich', `Das Sandwich: ${M`\cos x`} (blau) unten, ${M`\frac1{\cos x}`} (bernstein) oben, dazwischen ${M`\frac{\sin x}{x}`} (dunkel). Bei ${M`x = 0`} hat ${M`\frac{\sin x}{x}`} ein Loch, aber alle drei Kurven laufen auf den Punkt ${M`(0, 1)`} zu.`)}
    ${box('vorlesung', `<p><b>Folgerung:</b> Die Funktion ${M`\tilde f(x) := f(x)`} für ${M`x\in D(f) = \R\setminus\{0\}`}, ${M`\tilde f(0) := 1`} ist stetig (und definiert!) auf ganz ${M`\R`}.</p>
      <p><b>Definition.</b> ${M`f`} kann an der Stelle 0 durch ${M`f(0) := 1`} <b>stetig fortgesetzt</b> werden.</p>
      <p><b>Beispiel.</b> ${M`f(x) := \frac{|x|}{x}`}: ${M`\lim_{x\to0^-}f(x) = \lim\frac{-x}{x} = -1`}, ${M`\lim_{x\to0^+}f(x) = \lim\frac xx = 1`}. Links- und Rechtsgrenzwert ungleich, also ist keine stetige Fortsetzung bei ${M`x = 0`} möglich.</p>`, { src: 'S. I.17' })}
    ${box('vorlesung', `<p><b>Beispiele mit ${M`\frac{\sin x}{x}\to1`}:</b></p>
      ${MD`\lim_{x\to0}\frac{\tan x}{x} = \lim\frac{1}{\cos x}\cdot\frac{\sin x}{x} = 1\cdot1 = 1,\qquad \lim_{x\to0}\frac{\sin^2x}{x^2(1+\cos x)} = \Big(\lim\frac{\sin x}{x}\Big)^2\cdot\lim\frac{1}{1+\cos x} = 1\cdot\frac12 = \frac12`}
      ${MD`\lim_{x\to0}\frac{\sin(x^3)}{x} = \lim_{x\to0}x^2\cdot\lim_{y\to0}\frac{\sin y}{y} = 0\cdot1 = 0 \quad(y = x^3 \to 0)`}`, { src: 'S. I.16' })}
    ${box('merke', `<p>Trick bei allen drei Beispielen: den Ausdruck so umbauen, dass ${M`\frac{\sin(\square)}{\square}`} mit demselben ${M`\square\to0`} entsteht, und den Rest mit den Rechenregeln behandeln.</p>`)}
  `)}
  `;
  seqFigure(root.querySelector('#fig-seq'));
  sandwichFigure(root.querySelector('#fig-sandwich'));
}

function seqFigure(host) {
  const fns = {
    step: { f: (x) => (x > 0 ? 1 : 0), f0: 0, tex: 'f(x) = \\begin{cases}1 & x>0\\\\ 0 & x\\le0\\end{cases}', jump: 0.5 },
    sin2pi: { f: (x) => (x === 0 ? 0 : Math.sin((2 * Math.PI) / x)), f0: 0, tex: 'g(x) = \\sin(2\\pi/x)', jump: 0.3 },
    sinc: { f: (x) => (x === 0 ? 1 : Math.sin(x) / x), f0: 1, tex: '\\tilde f(x) = \\tfrac{\\sin x}{x},\\ \\tilde f(0) = 1', jump: Infinity },
  };
  let fn = fns.sin2pi;
  let c = 4;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const btns = buttonRow([
    { label: 'Sprung', onClick: () => { fn = fns.step; draw(); } },
    { label: M`\sin(2\pi/x)`, onClick: () => { fn = fns.sin2pi; draw(); } },
    { label: M`\tfrac{\sin x}{x}`, onClick: () => { fn = fns.sinc; draw(); } },
  ]);
  btns.children[1].classList.add('active');
  controls.append(btns, slider({ label: M`x_n = c/n,\ c =`, min: 1, max: 4, step: 1, value: c, format: (v) => M([String(v)]), onInput: (v) => { c = v; draw(); } }));
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = { xmin: -0.6, xmax: 4.4, ymin: -1.4, ymax: 1.5 };
    const p = plot(fig, { width: 640, height: 280, ...B });
    axes(p, { ...B, xticks: [1, 2, 3, 4], yticks: [-1, 1], xlabel: 'x', ylabel: 'y' });
    // Graph (sin(2π/x) nur ab 0.03, darunter unlesbar)
    graph(p, fn.f, { xmin: -0.6, xmax: -0.0005, ymin: B.ymin, ymax: B.ymax, cls: 's-dark', width: 1.3, n: 1500, jump: fn.jump, extra: { opacity: 0.6 } });
    graph(p, fn.f, { xmin: 0.0005, xmax: 4.4, ymin: B.ymin, ymax: B.ymax, cls: 's-dark', width: 1.3, n: 3000, jump: fn.jump, extra: { opacity: 0.6 } });
    const vals = [];
    for (let n = 1; n <= 40; n++) {
      const x = c / n, y = fn.f(x);
      vals.push(y);
      if (x <= 4.4) el('circle', { cx: p.X(x), cy: p.Y(y), r: 3.6, class: 'fill-point' }, p.svg);
    }
    el('circle', { cx: p.X(0), cy: p.Y(fn.f0), r: 7, class: 's-angle', fill: 'none', 'stroke-width': 2.5 }, p.svg);
    text(p.svg, p.X(0) - 8, p.Y(fn.f0) - 10, 'f(0)', 'end', 'math t-angle');
    const last = vals.slice(-8).map((v) => fmt(v + 0, 2)).join(';\\ ');
    const conv = vals.slice(-8).every((v) => Math.abs(v - vals.at(-1)) < 0.02);
    const ok = conv && Math.abs(vals.at(-1) - fn.f0) < 0.02;
    readout.innerHTML = `${M([fn.tex])}. Letzte Werte ${M([`f(x_n)`])}: ${M([last])}. ${!conv ? 'Die Werte konvergieren nicht.' : ok ? `${M`\lim f(x_n) = f(0)`} für diese Folge.` : `${M([`\\lim f(x_n) = ${fmt(vals.at(-1), 0)} \\ne f(0)`])}: unstetig.`}`;
  }
  draw();
}

function sandwichFigure(host) {
  const B = { xmin: -1.5, xmax: 1.5, ymin: 0, ymax: 1.6 };
  const p = plot(host.querySelector('.fig-body') ?? host, { width: 560, height: 300, ...B });
  p.svg.style.maxWidth = '560px';
  grid(p, { ...B, dx: 0.5, dy: 0.25 });
  axes(p, { ...B, xticks: [-1, 1], yticks: [0.5, 1, 1.5], xlabel: 'x', ylabel: 'y' });
  graph(p, Math.cos, { ...B, cls: 's-x' });
  graph(p, (x) => 1 / Math.cos(x), { ...B, cls: 's-y' });
  graph(p, (x) => Math.sin(x) / x, { ...B, cls: 's-dark', width: 3 });
  el('circle', { cx: p.X(0), cy: p.Y(1), r: 5, style: 'fill: var(--panel); stroke: var(--dark); stroke-width: 2' }, p.svg);
  text(p.svg, p.X(1.25), p.Y(1 / Math.cos(1.25)) > p.Y(1.6) ? p.Y(1.45) : p.Y(1 / Math.cos(1.25)) - 6, '1/cos x', 'middle', 'math t-y');
  text(p.svg, p.X(-1.15), p.Y(Math.cos(-1.15)) + 18, 'cos x', 'middle', 'math t-x');
  text(p.svg, p.X(0.75), p.Y(Math.sin(0.75) / 0.75) + 18, 'sin x / x', 'start', 'math');
}
