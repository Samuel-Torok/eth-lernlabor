import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps, more } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text, graph, grid } from '../../ui/svg.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Die Ableitung ist die Steigung der Tangente. Man bekommt sie als Grenzwert von Sekantensteigungen: zweiten Punkt nehmen, Gerade durchlegen, zweiten Punkt näher schieben. Ziele des Kapitels laut Vorlesung: Funktionen analysieren (Extrema und Wendepunkte), Approximation durch Linearisierung, Mittelwertsatz und Bernoulli-L'Hôpital, Wachstumsverhalten, ebene Kurven.</p>

  ${section('dq', '1. Der Differentialquotient', `
    ${box('vorlesung', `<p>Was ist die Gleichung der Tangente an ${M`\Gamma(f)`} im Punkt ${M`(x_0, f(x_0))`}? Allgemeine Geradengleichung durch den Punkt ${M`(x_0, f(x_0))`}:</p>
      ${MD`y - f(x_0) = m\cdot(x - x_0).`}
      <p>Wie bestimmt man ${M`m`} für die Tangente? Nehme einen zweiten Punkt ${M`(x, f(x))\in\Gamma(f)`}. Steigung der Geraden durch ${M`(x_0, f(x_0))`} und ${M`(x, f(x))`} ist ${M`\frac{f(x) - f(x_0)}{x - x_0}`}, der <b>Differenzenquotient</b>. Grenzwertprozess: Wenn ${M`x\to x_0`}, wird die Gerade (falls ${M`f`} «nett genug» ist) zur Tangente an ${M`\Gamma(f)`} im Punkt ${M`(x_0, f(x_0))`}.</p>`, { src: 'S. II.1' })}
    ${box('vorlesung', `<p><b>Definition.</b></p>${MD`\frac{\dd f}{\dd x}(x_0) := \lim_{x\to x_0}\frac{f(x) - f(x_0)}{x - x_0} = \lim_{\Delta x\to0}\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}`}
      <p>ist (sofern der Grenzwert existiert) der <b>Differentialquotient von ${M`f`} an der Stelle ${M`x_0`}</b>. Äquivalente Schreibweise mit ${M`\Delta x := x - x_0`}.</p>
      <p><b>Definition.</b> Wenn der Differentialquotient an der Stelle ${M`x_0`} existiert, ist ${M`f`} an der Stelle ${M`x_0`} <b>differenzierbar</b>. Wenn ${M`f`} an jeder Stelle ${M`x_0\in D(f)`} differenzierbar ist, ist ${M`f`} selbst differenzierbar.</p>
      <p><b>Definition.</b> Wenn ${M`f`} differenzierbar ist, ist die <b>Ableitung von ${M`f`}</b> die Funktion ${M`f': D(f)\to\R,\ x\mapsto f'(x) := \frac{\dd f}{\dd x}(x)`}. (In der Physik auch ${M`\dot f`}.)</p>`, { src: 'S. II.1' })}
    ${figure('fig-secant', `Die Sekante (violett) durch ${M`(x_0, f(x_0))`} und ${M`(x_0 + \Delta x, f(x_0 + \Delta x))`}. Schiebe ${M`\Delta x`} von rechts und von links gegen 0. Bei ${M`x^2`} landen beide Seiten auf derselben Tangente. Bei ${M`|x|`} und ${M`\sqrt{|x|}`} an der Stelle 0 nicht: Dort ist ${M`f`} nicht differenzierbar.`, { wide: true })}
    ${box('vorlesung', `<p><b>Beispiel.</b> Differentialquotient von ${M`f: x\mapsto x^2`} für ein beliebiges ${M`x\in\R`}:</p>
      ${MD`f'(x) = \lim_{\Delta x\to0}\frac{(x + \Delta x)^2 - x^2}{\Delta x} = \lim_{\Delta x\to0}\frac{2x\,\Delta x + (\Delta x)^2}{\Delta x} = \lim_{\Delta x\to0}(2x + \Delta x) = 2x.`}
      <p><b>Beispiel.</b> ${M`f(x) = \sqrt{|x|}`} bei ${M`x_0 = 0`}: Rechtsseitiger Grenzwert ${M`\lim_{\Delta x\to0^+}\frac{\sqrt{\Delta x}}{\Delta x} = \lim\frac{1}{\sqrt{\Delta x}} = +\infty`}. Grenzwert existiert nicht, also ist ${M`f`} bei 0 nicht differenzierbar. (Die Tangente ist dort senkrecht.)</p>
      <p><b>Beispiel.</b> ${M`f(x) = |x|`}: Für ${M`x < 0`} ist ${M`f'(x) = -1`}, für ${M`x > 0`} ist ${M`f'(x) = 1`}. Bei 0: ${M`\lim_{\Delta x\to0^+}\frac{\Delta x - 0}{\Delta x} = 1`}, ähnlich ${M`\lim_{\Delta x\to0^-}\frac{f(0+\Delta x) - f(0)}{\Delta x} = -1`}. Also ist ${M`f`} bei 0 nicht differenzierbar.</p>`, { src: 'S. II.2–II.3' })}
  `)}

  ${section('stetig', '2. Differenzierbar ⇒ stetig', `
    ${box('vorlesung', `<p><b>Beispiel.</b> Man beweise: Wenn ${M`f`} differenzierbar an der Stelle ${M`x_0`} ist, dann ist ${M`f`} an der Stelle ${M`x_0`} auch stetig.</p>`, { src: 'S. II.2' })}
    ${steps([
      [M`\lim_{\Delta x\to0}\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x} \in\R \text{ existiert}, \quad \Delta x\to0`, 'Voraussetzung: Der Grenzwert ist eine endliche Zahl, und der Nenner geht gegen 0.'],
      [M`\Rightarrow \lim_{\Delta x\to0}\big(f(x_0 + \Delta x) - f(x_0)\big) = 0`, `Falls ${M`\lim\frac{a(\Delta x)}{b(\Delta x)}`} existiert und ${M`\lim b(\Delta x) = 0`}, dann ist ${M`\lim a(\Delta x) = 0`}. Sonst würde der Bruch explodieren.`],
      [M`\Rightarrow \lim_{\Delta x\to0}f(x_0 + \Delta x) = f(x_0)`, `Das ist genau die Stetigkeit bei ${M`x_0`}.`],
    ])}
    ${box('achtung', `<p>Die Umkehrung gilt <b>nicht</b>: ${M`|x|`} ist bei 0 stetig, aber nicht differenzierbar. Und eine Unstetigkeit verhindert die Differenzierbarkeit sicher. Beispiel aus dem Skript: ${M`f(x) = x^2`} für ${M`x\ge0`}, ${M`1`} für ${M`x < 0`}; bei ${M`x_0 = 0`} ist ${M`\lim_{\Delta x\to0^-}\frac{f(\Delta x) - f(0)}{\Delta x} = \lim\frac{1}{\Delta x} = -\infty`}.</p>`)}
  `)}

  ${section('regeln', '3. Rechenregeln und Kettenregel', `
    ${box('vorlesung', `<p><b>Satz (Rechenregeln).</b> Wenn ${M`f`} und ${M`g`} an der Stelle ${M`x`} differenzierbar sind und falls nötig ${M`g(x)\ne0`}, dann gilt:</p>
      ${MD`(f + g)' = f' + g',\qquad (C\cdot f)' = C\cdot f',\qquad (f\cdot g)' = f'\cdot g + f\cdot g',\qquad \Big(\frac fg\Big)' = \frac{f'\cdot g - f\cdot g'}{g^2}.`}`, { src: 'S. II.2' })}
    ${box('vorlesung', `<p><b>Beispiele.</b> ${M`\big(\frac1x\big)' = \frac{0\cdot x - 1\cdot1}{x^2} = -\frac1{x^2}`} (Quotientenregel). ${M`(x^3)' = (x\cdot x^2)' = 1\cdot x^2 + x\cdot2x = 3x^2`} (Produktregel); allgemein ${M`(x^m)' = m\cdot x^{m-1}`} für alle ${M`m\in\mathbb Z`}.</p>
      ${MD`(\tan x)' = \Big(\frac{\sin x}{\cos x}\Big)' = \frac{\cos^2 x + \sin^2 x}{\cos^2 x} = \frac{1}{\cos^2 x} = 1 + \tan^2 x.`}`, { src: 'S. II.3' })}
    ${box('vorlesung', `<p><b>Definition.</b> Seien ${M`f, g`} Funktionen mit ${M`W(g)\subset D(f)`}. Dann ist ${M`(f\circ g)(x) := f(g(x))`} die <b>Verkettung / Verknüpfung</b> von ${M`f`} und ${M`g`}. Beispiel: ${M`f(x)`} ist die Höhe an der Position ${M`x`}, ${M`g(t)`} die Position zum Zeitpunkt ${M`t`}; ${M`(f\circ g)(t)`} ist die Höhe zum Zeitpunkt ${M`t`}.</p>
      <p><b>Satz (Kettenregel).</b> ${M`(f\circ g)'(x) = f'(g(x))\cdot g'(x)`}.</p>`, { src: 'S. II.3' })}
    <p><b>Beweis</b> (S. II.3–II.4). Gesucht ist ${M`\lim_{\Delta x\to0}\frac{f(g(x+\Delta x)) - f(g(x))}{\Delta x}`}.</p>
    ${steps([
      [M`d := g(x + \Delta x) - g(x) \quad(\Rightarrow \lim_{\Delta x\to0}d = 0)`, `Wie stark sich ${M`g`} ändert. ${M`d\to0`}, weil ${M`g`} differenzierbar, also stetig ist.`],
      [M`\frac{f(g(x) + d) - f(g(x))}{d}\cdot\frac{d}{\Delta x}`, `Mit ${M`\frac dd`} erweitern. Der erste Faktor ist der Differenzenquotient von ${M`f`} an der Stelle ${M`g(x)`} mit Abstand ${M`d`}.`],
      [M`= \frac{f(g(x)+d) - f(g(x))}{d}\cdot\frac{g(x + \Delta x) - g(x)}{\Delta x} \;\xrightarrow{\Delta x\to0}\; f'(g(x))\cdot g'(x)`, `Der zweite Faktor ist der Differenzenquotient von ${M`g`}. Mit ${M`d\to0`} und ${M`\Delta x\to0`} gehen beide gegen die Ableitungen.`],
    ])}
    ${box('ergaenzung', `<p>Genau genommen hat der Beweis eine Lücke: ${M`d`} kann für manche ${M`\Delta x \ne 0`} gleich 0 sein, dann darf man nicht durch ${M`d`} teilen. Der Satz stimmt trotzdem; der vollständige Beweis umgeht das mit einer Hilfsfunktion. Für die Prüfung zählt die Idee oben.</p>`)}
    ${box('vorlesung', `<p><b>Beispiele.</b> ${M`(\cos^3x)' = 3(\cos x)^2\cdot(-\sin x)`} mit ${M`f(x) = x^3`}, ${M`g(x) = \cos x`}. ${M`\big(\cot(x^2)\big)' = -\frac{1}{\sin^2(x^2)}\cdot2x`}. Mit ${M`f(x) = x^m`}: ${M`\big((g(x))^m\big)' = m\,(g(x))^{m-1}\cdot g'(x)`} und ${M`\big(g(x^m)\big)' = g'(x^m)\cdot m\,x^{m-1}`}. Drei Funktionen: ${M`(f\circ g\circ h)'(x) = f'\big(g(h(x))\big)\cdot g'(h(x))\cdot h'(x)`}.</p>`, { src: 'S. II.4–II.5' })}
    ${box('merke', `<p>Kettenregel: «äussere Ableitung, ausgewertet an der inneren Funktion, mal innere Ableitung». Bei mehreren Schichten von aussen nach innen weitermachen.</p>`)}
  `)}

  ${section('inverse', '4. Ableitung der Umkehrfunktion', `
    ${steps([
      [M`(f\circ f^{-1})(x) = x`, `${M`f`} bijektiv mit Inverse ${M`f^{-1}`}.`],
      [M`(f\circ f^{-1})'(x) = f'\big(f^{-1}(x)\big)\cdot(f^{-1})'(x) = 1`, 'Beide Seiten ableiten, links mit der Kettenregel.'],
      [M`(f^{-1})'(x) = \frac{1}{f'\big(f^{-1}(x)\big)}`, `Auflösen (wo ${M`f' \ne 0`}).`],
    ])}
    ${box('vorlesung', `<p><b>Satz.</b> Die Ableitung der Umkehrfunktion ${M`f^{-1}`} einer bijektiven Funktion ${M`f`} ist gegeben durch ${M`(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}`}.</p>
      <p><b>Beispiel.</b> ${M`(\arccos x)' = \frac{1}{-\sin(\arccos x)}`} (mit ${M`f = \cos`}, ${M`f' = -\sin`}). Klappt, aber noch keine «schöne Form». Mit ${M`\sin^2x + \cos^2x = 1 \Rightarrow \sin x = \sqrt{1 - \cos^2x}`}:</p>
      ${MD`(\arccos x)' = -\frac{1}{\sqrt{1 - \cos^2(\arccos x)}} = -\frac{1}{\sqrt{1 - x^2}} \quad\text{für passende } x\in\R.`}
      <p><b>Beispiel.</b> ${M`(\ln x)' = \frac{1}{e^{\ln x}} = \frac1x`} mit ${M`f(x) = e^x`}, ${M`f'(x) = e^x`}.</p>`, { src: 'S. II.5' })}
    ${more(`Warum ${M`\sqrt{1 - \cos^2 x}`} ohne ${M`\pm`}?`, `${box('ergaenzung', `<p>${M`\arccos x`} liegt in ${M`[0, \pi]`}, und dort ist ${M`\sin\ge0`}. Also ist die positive Wurzel richtig. Genau das meint «für passende ${M`x`}».</p>`)}`)}
  `)}
  `;
  secantFigure(root.querySelector('#fig-secant'));
}

function secantFigure(host) {
  const fns = {
    sq: { f: (x) => x * x, df: (x) => 2 * x, tex: 'x^2', x0: 0.8, B: { xmin: -2, xmax: 2.4, ymin: -0.8, ymax: 4 } },
    abs: { f: Math.abs, df: null, tex: '|x|', x0: 0, B: { xmin: -2, xmax: 2.4, ymin: -0.8, ymax: 2.6 } },
    sqrtabs: { f: (x) => Math.sqrt(Math.abs(x)), df: null, tex: '\\sqrt{|x|}', x0: 0, B: { xmin: -2, xmax: 2.4, ymin: -0.8, ymax: 2 } },
  };
  let fn = fns.sq;
  let dx = 1;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const btns = buttonRow(Object.entries(fns).map(([k, v]) => ({ label: M([`f(x) = ${v.tex}`]), onClick: () => { fn = fns[k]; draw(); } })));
  btns.firstChild.classList.add('active');
  controls.append(btns, slider({ label: M`\Delta x =`, min: -1.5, max: 1.5, step: 0.01, value: dx, format: (v) => M([fmt(v, 2)]), onInput: (v) => { dx = Math.abs(v) < 0.005 ? 0.005 * Math.sign(v || 1) : v; draw(); } }));
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = fn.B;
    const p = plot(fig, { width: 620, height: 340, ...B });
    grid(p, { ...B, dx: 0.5, dy: 0.5 });
    axes(p, { ...B, xticks: [-1, 1, 2], yticks: [1, 2, 3], xlabel: 'x', ylabel: 'y' });
    graph(p, fn.f, { ...B, cls: 's-dark', width: 2.5 });
    const x0 = fn.x0, y0 = fn.f(x0), x1 = x0 + dx, y1 = fn.f(x1);
    const m = (y1 - y0) / dx;
    const line = (slope, cls, w) => graph(p, (x) => y0 + slope * (x - x0), { ...B, cls, width: w });
    if (fn.df) line(fn.df(x0), 's-y dashed', 1.5);
    line(m, 's-angle', 2);
    el('circle', { cx: p.X(x1), cy: p.Y(y1), r: 5, class: 'fill-angle' }, p.svg);
    el('circle', { cx: p.X(x0), cy: p.Y(y0), r: 5.5, class: 'fill-point' }, p.svg);
    text(p.svg, p.X(x0) + 8, p.Y(y0) + 18, 'x_0', 'start', 'math t-point');
    readout.innerHTML = `Sekantensteigung ${M([`\\frac{f(x_0+\\Delta x) - f(x_0)}{\\Delta x} = ${fmt(m, 3)}`])}. ${fn.df ? `Tangente (gestrichelt): ${M([`f'(x_0) = ${fmt(fn.df(x0), 3)}`])}.` : dx > 0 ? 'Von rechts …' : 'Von links …'} ${fn === fns.abs ? `Rechts immer ${M`1`}, links immer ${M`-1`}: kein gemeinsamer Grenzwert.` : fn === fns.sqrtabs ? `Für ${M`\Delta x\to0`} wächst ${M`|m|`} über alle Grenzen.` : ''}`;
  }
  draw();
}
