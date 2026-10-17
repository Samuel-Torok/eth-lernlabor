import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text, graph, grid } from '../../ui/svg.js';
import { mvtPoints } from '../../math/analysis.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Drei Sätze, die aufeinander aufbauen: An einem Hoch- oder Tiefpunkt ist die Tangente waagrecht. Daraus folgt der Satz von Rolle, daraus der Mittelwertsatz, und aus diesem zwei Werkzeuge: das Monotoniekriterium und die Regel von Bernoulli-L'Hôpital.</p>

  ${section('lokal', '1. Lokale Extremalstellen', `
    ${box('vorlesung', `<p><b>Definition.</b> Für eine Funktion ${M`f: D(f)\to\R`} ist ${M`\xi\in D(f)`} eine <b>lokale Maximalstelle</b>, wenn es ein ${M`\xi`} enthaltendes Intervall ${M`(c,d)`} gibt, so dass für alle ${M`x\in D(f)\cap(c,d)`} gilt: ${M`f(x)\le f(\xi)`}. Der Wert ${M`f(\xi)`} ist dann das <b>lokale Maximum</b>. Analog: lokale Minimalstelle und lokales Minimum, wenn stattdessen ${M`f(x)\ge f(\xi)`} gilt.</p>
      <p>Spezialfall: ${M`f`} konstant ${M`\Rightarrow`} alle Stellen in ${M`D(f)`} sind sowohl lokal maximal wie auch lokal minimal!</p>
      <p><b>Definition.</b> Wenn ${M`\xi`} eine lokale Maximal- oder Minimalstelle ist, ist ${M`\xi`} eine <b>lokale Extremalstelle</b> und ${M`f(\xi)`} ein <b>lokales Extremum</b>.</p>`, { src: 'S. II.11–II.12' })}
    ${box('vorlesung', `<p><b>Satz.</b> Sei ${M`f: [a,b]\to\R`} differenzierbar und ${M`\xi\in(a,b)`} eine lokale Extremalstelle von ${M`f`}. Dann ist ${M`f'(\xi) = 0`}.</p>`, { src: 'S. II.12' })}
    <p><b>Beweis per Ausschlussverfahren</b> (S. II.12). ${M`f`} ist differenzierbar, also existiert ${M`f'(\xi)\in\R`}. Angenommen ${M`f'(\xi) > 0`}:</p>
    ${steps([
      [M`\lim_{x\to\xi}\frac{f(x) - f(\xi)}{x - \xi} > 0 \;\Rightarrow\; \frac{f(x) - f(\xi)}{x - \xi} > 0 \text{ für alle } x \text{ genügend nahe bei } \xi`, 'Ein Grenzwert > 0 heisst: Ab einer gewissen Nähe sind auch die Quotienten > 0.'],
      [M`x < \xi \Rightarrow f(x) < f(\xi);\qquad x > \xi\Rightarrow f(x) > f(\xi)`, `Zähler und Nenner haben dasselbe Vorzeichen.`],
      [M`\Rightarrow \xi \text{ ist keine lokale Extremalstelle}`, `In jedem Intervall um ${M`\xi`} gibt es kleinere und grössere Werte. Widerspruch, also ist ${M`f'(\xi) > 0`} falsch.`],
      [M`f'(\xi) < 0 \Rightarrow \text{gleicher Widerspruch} \;\Rightarrow\; f'(\xi) = 0`, 'Es bleibt nur 0.'],
    ])}
    ${box('achtung', `<p>Umgekehrt gilt dies nicht: ${M`f(x) = x^3`} hat ${M`f'(0) = 0`}, aber ${M`x = 0`} ist keine lokale Extremalstelle. Und der Satz verlangt ${M`\xi\in(a,b)`}, also im Inneren: Am Rand kann ein Extremum mit ${M`f'\ne0`} liegen.</p>`)}
  `)}

  ${section('rolle', '2. Satz von Rolle und Mittelwertsatz', `
    ${box('vorlesung', `<p><b>Satz (Satz von Rolle).</b> Sei ${M`f:(a,b)\to\R`} differenzierbar und es existieren ${M`a < x_1 < x_2 < b`} mit ${M`f(x_1) = f(x_2)`}. Dann gibt es ein ${M`\xi\in(x_1, x_2)`} mit ${M`f'(\xi) = 0`}.</p>
      <p><b>Beweis.</b> Falls ${M`f`} konstant: ${M`f'\equiv0`}, überall. Falls ${M`f`} nicht konstant: ${M`f`} nimmt zwischen ${M`x_1`} und ${M`x_2`} weitere Werte an. Es gibt ein lokales Maximum oder Minimum in ${M`(x_1, x_2)`}, dort ist ${M`f' = 0`}.</p>`, { src: 'S. II.13' })}
    ${box('vorlesung', `<p><b>Satz (Mittelwertsatz der Differentialrechnung, MWS).</b> Sei ${M`f`} differenzierbar auf ${M`D(f) = [a,b]`}. Dann gibt es ein ${M`\xi\in(a,b)`}, so dass</p>
      ${MD`f'(\xi) = \frac{f(b) - f(a)}{b - a} \qquad\text{bzw.}\qquad f(b) - f(a) = f'(\xi)\cdot(b - a).`}
      <p><b>Geometrische Beschreibung:</b> Die Sekante zwischen ${M`(a, f(a))`} und ${M`(b, f(b))`} kann so parallel verschoben werden, dass sie eine Tangente an ${M`\Gamma(f)`} ist. Der Berührungspunkt hat die Koordinaten ${M`(\xi, f(\xi))`}.</p>`, { src: 'S. II.13' })}
    ${figure('fig-mws', `Die Sekante (violett) zwischen ${M`a`} und ${M`b`}. An den roten Stellen ${M`\xi`} ist die Tangente (bernstein) parallel dazu. Verändere ${M`a`} und ${M`b`}: Es gibt immer mindestens einen solchen Punkt, solange ${M`f`} differenzierbar ist. Bei ${M`|x|`} auf ${M`[-1, 1]`} nicht.`, { wide: true })}
    <p><b>Beweis des MWS</b> (S. II.14): mit Rolle, angewendet auf eine geschickt gewählte Hilfsfunktion.</p>
    ${steps([
      [M`g(x) := f(x) - \frac{f(b) - f(a)}{b - a}\cdot(x - a)`, `Von ${M`f`} die Sekante «abziehen». Gesucht war ein differenzierbares ${M`g`} mit ${M`g(a) = g(b)`} und ${M`g'(x) = f'(x) - \frac{f(b) - f(a)}{b - a}`}; Integrieren von ${M`g'`} liefert dieses ${M`g`}.`],
      [M`g(a) = f(a) - 0 = f(a),\qquad g(b) = f(b) - \big(f(b) - f(a)\big) = f(a)`, `Also ${M`g(a) = g(b)`}.`],
      [M`\text{Rolle: } \exists\,\xi\in(a,b):\ 0 = g'(\xi) = f'(\xi) - \frac{f(b) - f(a)}{b - a}`, 'Voraussetzungen von Rolle erfüllt.'],
      [M`\Rightarrow f'(\xi) = \frac{f(b) - f(a)}{b - a}`, 'Das ist der MWS.'],
    ])}
    ${box('vorlesung', `<p><b>Anwendung bei Integralen:</b> Sei ${M`F' = f`}, also ${M`F`} eine Stammfunktion von ${M`f`}. Dann ist ${M`\int_a^b f(x)\,\dd x = F(b) - F(a) = F'(\xi)\,(b - a) = f(\xi)\cdot(b - a)`}. Es gibt eine Stelle ${M`\xi\in(a,b)`} mit durchschnittlicher Höhe ${M`f(\xi)`}.</p>
      <p><b>Vorsicht:</b> Der MWS muss nicht gelten, wenn ${M`f`} nur schon an einer Stelle nicht differenzierbar ist. Bsp: ${M`f(x) = |x|`}, ${M`D(f) = [-1,1]`}: Die Sekante ist waagrecht, aber nirgends ist ${M`f' = 0`}.</p>`, { src: 'S. II.13–II.14' })}
  `)}

  ${section('monotonie', '3. Folgerung 1: Monotonie aus der Ableitung', `
    ${box('vorlesung', `<p><b>Satz.</b> Falls ${M`f'(x)\ge0`} (bzw. ${M`f'(x) > 0`}) für alle ${M`x\in(a,b) = D(f)`} gilt, dann ist ${M`f`} monoton wachsend (bzw. strikt monoton wachsend). Die analogen Aussagen gelten für «${M`\le`}» und «${M`<`}» und (strikt) monoton fallend.</p>
      <p><b>Beweis.</b> Seien ${M`x_1, x_2\in(a,b)`} mit ${M`x_1 < x_2`}. MWS: Es gibt ein ${M`\xi\in(x_1, x_2)`} mit ${M`f(x_2) - f(x_1) = \underbrace{f'(\xi)}_{\ge0}\underbrace{(x_2 - x_1)}_{>0}\ge0 \Rightarrow f(x_1)\le f(x_2)`}.</p>
      <p><b>Vorsicht:</b> Die Umkehrung gilt nicht allgemein: ${M`x\mapsto x^3`} ist strikt monoton wachsend, aber ${M`f'(0) = 0`} (und nicht ${M`> 0`} wie im Satz).</p>`, { src: 'S. II.15' })}
  `)}

  ${section('hopital', "4. Folgerung 2: Regel von Bernoulli-L'Hôpital", `
    ${box('vorlesung', `<p><b>Satz (Regel von Bernoulli-L'Hôpital).</b> Seien ${M`f, g`} differenzierbar auf ${M`[a,b]`} mit ${M`f(a) = g(a) = 0`}. Wenn ausserdem ${M`g'(x)\ne0`} auf ${M`(a,b)`}, so gilt:</p>
      ${MD`\lim_{x\to a^+}\frac{f(x)}{g(x)} = \lim_{x\to a^+}\frac{f'(x)}{g'(x)}.`}
      <p>Die analogen Aussagen gelten für ${M`x\to b^-`}, ${M`x\to x_0`} und ${M`x\to\pm\infty`}.</p>`, { src: 'S. II.15' })}
    <p><b>Beweis</b> (S. II.15–II.16), wieder mit Rolle:</p>
    ${steps([
      [M`h(x) := f(x)\,g(y) - f(y)\,g(x)`, `Für ein festes ${M`y\in(a,b)`} eine Hilfsfunktion.`],
      [M`h(a) = \underbrace{f(a)}_{0}g(y) - f(y)\underbrace{g(a)}_{0} = 0,\qquad h(y) = f(y)g(y) - f(y)g(y) = 0`, `Gleiche Werte an zwei Stellen, und ${M`h`} ist differenzierbar: Rolle gilt.`],
      [M`\exists\,\xi\in(a,y):\ h'(\xi) = f'(\xi)g(y) - f(y)g'(\xi) = 0 \iff \frac{f'(\xi)}{g'(\xi)} = \frac{f(y)}{g(y)}`, 'Ableiten nach x und umstellen.'],
      [M`y\to a^+ \Rightarrow \xi\to a^+:\quad \lim_{\xi\to a^+}\frac{f'(\xi)}{g'(\xi)} = \lim_{y\to a^+}\frac{f(y)}{g(y)}`, `Da ${M`\xi\in(a,y)`}, wird ${M`\xi`} mitgezogen. Dann die Variablen umbenennen.`],
    ])}
    ${box('vorlesung', `<p><b>Beispiele.</b></p>
      ${MD`\lim_{x\to0}\frac{\sin x}{x} \overset{\text{(B-H)}}{=} \lim_{x\to0}\frac{\cos x}{1} = 1,\qquad \lim_{x\to1}\frac{e^x - e}{\ln x}\overset{\text{(B-H)}}{=}\lim_{x\to1}\frac{e^x}{1/x} = e`}
      ${MD`\lim_{x\to0}\frac{\frac{x^2}{2} - \sin(x^2)}{\ln(1 + x^2)} \overset{\text{(B-H)}}{=} \lim_{x\to0}\frac{x - 2x\cos(x^2)}{\frac{1}{1+x^2}\cdot2x} = \lim_{x\to0}\frac{1 + x^2}{2}\big(1 - 2\cos(x^2)\big) = -\frac12`}
      <p><b>Vorsicht:</b> ${M`\lim_{x\to0}\frac{e^x}{x} = \lim_{x\to0}\frac{e^x}{1} = 1`} ist Blödsinn, da ${M`e^0 = 1\ne0`}! Die Bedingung ${M`f(a) = g(a) = 0`} ist essentiell!</p>
      <p><b>Erweiterung:</b> Die Regel gilt auch für «${M`\frac{\pm\infty}{\pm\infty}`}», also wenn sowohl ${M`\lim|f(x)| = \infty`} als auch ${M`\lim|g(x)| = \infty`} gilt.</p>`, { src: 'S. II.16' })}
    ${box('merke', `<p>Vor jedem Einsatz prüfen: Ist es wirklich «${M`\frac00`}» oder «${M`\frac\infty\infty`}»? Erst dann Zähler und Nenner <b>getrennt</b> ableiten (nicht mit der Quotientenregel!).</p>`)}
  `)}
  `;
  mwsFigure(root.querySelector('#fig-mws'));
}

function mwsFigure(host) {
  const fns = {
    sin: { f: (x) => Math.sin(x) + 0.3 * x, df: (x) => Math.cos(x) + 0.3, tex: '\\sin x + 0{,}3x', a: 0.3, b: 3.6, B: { xmin: -0.4, xmax: 6.6, ymin: -1.4, ymax: 2.8 } },
    cubic: { f: (x) => 0.12 * (x - 1) * (x - 3) * (x - 5) + 1, df: (x) => 0.12 * (3 * x * x - 18 * x + 23), tex: '\\text{kubisch}', a: 0.6, b: 5.6, B: { xmin: -0.4, xmax: 6.6, ymin: -1.4, ymax: 2.8 } },
    abs: { f: (x) => Math.abs(x - 3), df: (x) => Math.sign(x - 3), tex: '|x - 3|', a: 2, b: 4, B: { xmin: -0.4, xmax: 6.6, ymin: -1.4, ymax: 3.6 } },
  };
  let fn = fns.sin;
  let a = fn.a, b = fn.b;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const sl = document.createElement('div');
  sl.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const sa = slider({ label: M`a =`, min: 0, max: 6, step: 0.05, value: a, format: (v) => M([fmt(v, 2)]), onInput: (v) => { a = v; draw(); } });
  const sb = slider({ label: M`b =`, min: 0, max: 6.2, step: 0.05, value: b, format: (v) => M([fmt(v, 2)]), onInput: (v) => { b = v; draw(); } });
  const btns = buttonRow(Object.entries(fns).map(([k, v]) => ({ label: M([v.tex]), onClick: () => { fn = fns[k]; sa.setValue(fn.a); sb.setValue(fn.b); } })));
  btns.firstChild.classList.add('active');
  controls.appendChild(btns);
  sl.append(sa, sb);
  host.append(controls, sl, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = fn.B;
    const p = plot(fig, { width: 640, height: 320, ...B });
    grid(p, B);
    axes(p, { ...B, xticks: [1, 2, 3, 4, 5, 6], yticks: [-1, 1, 2], xlabel: 'x', ylabel: 'y' });
    graph(p, fn.f, { ...B, cls: 's-dark', width: 2.5 });
    if (b - a < 0.1) { readout.innerHTML = `Wähle ${M`b > a`}.`; return; }
    const m = (fn.f(b) - fn.f(a)) / (b - a);
    el('line', { x1: p.X(a), y1: p.Y(fn.f(a)), x2: p.X(b), y2: p.Y(fn.f(b)), class: 's-angle', 'stroke-width': 2.5 }, p.svg);
    for (const x of [a, b]) el('circle', { cx: p.X(x), cy: p.Y(fn.f(x)), r: 5, class: 'fill-angle' }, p.svg);
    const xis = fn === fns.abs ? [] : mvtPoints(fn.f, fn.df, a, b);
    for (const xi of xis) {
      graph(p, (x) => fn.f(xi) + m * (x - xi), { xmin: xi - 1.2, xmax: xi + 1.2, ymin: B.ymin, ymax: B.ymax, cls: 's-y', width: 2 });
      el('circle', { cx: p.X(xi), cy: p.Y(fn.f(xi)), r: 5, class: 'fill-point' }, p.svg);
      text(p.svg, p.X(xi), p.Y(fn.f(xi)) - 10, 'ξ', 'middle', 'math t-point');
    }
    const absNo = fn === fns.abs && a < 3 && b > 3;
    readout.innerHTML = `Sekantensteigung ${M([`\\frac{f(b) - f(a)}{b - a} = ${fmt(m, 3)}`])}. ${xis.length ? `${xis.length === 1 ? 'Eine Stelle' : `${xis.length} Stellen`} mit ${M`f'(\xi) = `} Sekantensteigung: ${M([xis.map((x) => `\\xi = ${fmt(x, 3)}`).join(',\\ ')])}.` : absNo ? `${M`f'`} ist nur ${M`\pm1`}, nie ${M([fmt(m, 3)])}: Bei ${M`x = 3`} ist ${M`f`} nicht differenzierbar, der MWS gilt nicht.` : fn === fns.abs ? `${M`f`} ist auf ${M`[a, b]`} differenzierbar und linear: Jedes ${M`\xi`} passt.` : ''}`;
  }
  draw();
}
