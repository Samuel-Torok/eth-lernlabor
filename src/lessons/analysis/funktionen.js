import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, more } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text, graph, grid, arrowDefs } from '../../ui/svg.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Eine Funktion ordnet jedem erlaubten Input genau einen Output zu. Klingt banal, aber drei Dinge gehören immer dazu: der Definitionsbereich (was darf rein?), der Zielbereich (wo landet es?) und die Zuordnung. Die Vorlesung widerlegt dazu: «Funktionen sind immer durch eine Formel gegeben».</p>

  ${section('def', '1. Was ist eine Funktion?', `
    ${box('vorlesung', `${MD`f:\ \underbrace{(-1, 1)}_{\text{Definitionsbereich } D(f)} \longrightarrow \underbrace{\R}_{\text{Zielbereich}}, \qquad \underbrace{x}_{\text{Variable}} \longmapsto \underbrace{\tfrac{1}{1-x}}_{\text{Funktionswert}}`}
      <p><b>Notation.</b> Manchmal in aller Kürze: ${M`f(x) := \frac1{1-x}`} oder ${M`f: x\mapsto\frac1{1-x}`}.</p>
      <p>Wenn nichts anderes angegeben ist, ist für ${M`D(f)`} der maximal mögliche Definitionsbereich in den reellen Zahlen gemeint. Beispiel: ${M`f: x\mapsto\frac1{1-x}`} bedeutet ${M`D(f) = \R\setminus\{1\}`}, implizit definiert.</p>`, { src: 'S. I.7–I.8' })}
    <p><b>Die zwei Pfeile:</b> ${M`\longrightarrow`} (Mengenpfeil) steht zwischen <em>Mengen</em>: von wo nach wo. ${M`\longmapsto`} (Zuordnungspfeil) steht zwischen <em>Elementen</em>: was mit einem einzelnen ${M`x`} passiert. ${M`\R\setminus\{1\}`} heisst «alle reellen Zahlen ausser 1».</p>
    ${box('vorlesung', `<p><b>Einschränkung:</b> ${M`f|_{(-1,1)}: x\mapsto\frac{1}{1-x}`} hat ${M`D\big(f|_{(-1,1)}\big) = (-1, 1)`}.</p>
      <p><b>Intervalle</b> (${M`a\le b`}): ${M`[a,b] := \{x\in\R \mid a\le x\le b\}`}, ${M`(a,b) := \{x \mid a < x < b\}`}, ${M`[a,b)`}, ${M`(a,b]`} entsprechend, ${M`[a,\infty) := \{x \mid a \le x\}`}, ${M`(-\infty, b) := \{x \mid x < b\}`}.</p>`, { src: 'S. I.8' })}
    ${box('achtung', `<p>Bei ${M`\infty`} steht immer eine runde Klammer: ${M`[a, \infty)`}, nie ${M`[a, \infty]`}. ${M`\infty`} ist keine reelle Zahl, also kann sie nicht «dazugehören».</p>`)}
  `)}

  ${section('wertebereich', '2. Wertebereich und Graph', `
    ${box('vorlesung', `<p><b>Definition.</b> Der <b>Wertebereich</b> / das <b>Bild</b> von ${M`f`} ist die Menge ${M`W(f) := \mathrm{Im}(f) := \{f(x) \mid x \in D(f)\}`}.</p>
      <p><b>Definition.</b> Der <b>Graph</b> von ${M`f`} ist die Menge ${M`\Gamma(f) := \{(x, f(x)) \in \R\times\R\} = \{(x,y)\in\R\times\R \mid y = f(x)\}`}. (${M`\Gamma`}: «Gamma».)</p>
      <p><b>Definition.</b> Die Menge ${M`A\times B`} ist das kartesische Produkt der Mengen ${M`A, B`}: ${M`(a,b)\in A\times B \iff a\in A \text{ und } b \in B`}.</p>`, { src: 'S. I.8–I.9' })}
    <p><b>Zielbereich ≠ Wertebereich.</b> Der Zielbereich sagt nur, <em>wo</em> die Werte liegen dürfen (z.B. ${M`\R`}). Der Wertebereich ist, was wirklich herauskommt. Beispiel aus dem Skript: ${M`f: (-1,1)\to\R`}, ${M`x\mapsto\frac1{1-x}`}. Für ${M`x\in(-1,1)`} ist ${M`1-x\in(0,2)`}, also ${M`\frac1{1-x}\in(\frac12,\infty)`}. Umgekehrt gibt es zu jedem ${M`y\in(\frac12, \infty)`} ein passendes ${M`x`}. Also ${M`W(f) = (\frac12,\infty)`}.</p>
    ${figure('fig-dw', `Der Definitionsbereich (blau, auf der ${M`x`}-Achse) wird durch ${M`f`} auf den Wertebereich (bernstein, auf der ${M`y`}-Achse) abgebildet. Die dünnen Linien zeigen, wie die Ränder abgebildet werden. Wähle ein Beispiel.`, { wide: true })}
  `)}

  ${section('definitionen', '3. Wie man eine Funktion angeben kann', `
    ${box('vorlesung', `<ol>
      <li><b>Wertetabelle:</b> sinnvoll, wenn ${M`D(f)`} endlich ist und es keine schöne/bekannte Formel gibt.</li>
      <li><b>Formel, explizite Definition:</b> eine eindeutige, direkte Rechenvorschrift, z.B. ${M`f(x) := \sin\big(\frac{2\pi x}{3}\big)`}. Vorsicht: Kann kompliziert werden oder gar nicht exakt berechenbar sein, z.B. ${M`f(x) := \int_0^x e^{-t^2}\,\dd t`}.</li>
      <li><b>Lösung einer Gleichung, implizite Definition.</b> Beispiel: Differentialgleichung des mathematischen Pendels ${M`\ddot\varphi(t) + \frac gL\sin\big(\varphi(t)\big) = 0`}. Diese Gleichung lässt sich nicht elementar exakt lösen, sondern nur näherungsweise oder numerisch. Trotzdem ist die Funktion ${M`\varphi(t)`} so eindeutig definiert.</li>
      <li><b>Geometrische Definition:</b> Sinus und Cosinus am Einheitskreis ${M`x^2 + y^2 = 1`}.</li></ol>`, { src: 'S. I.9–I.10' })}
    ${figure('fig-unit', `Am Einheitskreis läuft man die Bogenlänge ${M`t`} ab (gegen den Uhrzeigersinn für ${M`t > 0`}). Der erreichte Punkt ist ${M`(\cos t, \sin t)`}: Cosinus = ${M`x`}-Koordinate (blau), Sinus = ${M`y`}-Koordinate (bernstein).`)}
    ${box('vorlesung', `<p><b>Eigenschaften:</b> Umfang ${M`= 2\pi \Rightarrow \cos(t + 2\pi) = \cos t,\ \sin(t + 2\pi) = \sin t`}. ${M`\cos^2 t + \sin^2 t = 1`}, da ${M`(\cos t, \sin t)`} auf dem Kreis liegt. ${M`\sin(x\pm y) = \sin x\cos y \pm \cos x\sin y`}, ${M`\cos(x\pm y) = \cos x\cos y \mp \sin x\sin y`}, ${M`\sin 2x = 2\sin x\cos x`}, ${M`\cos 2x = 2\cos^2 x - 1`}.</p>`, { src: 'S. I.10' })}
    ${more('Funktionen mit anderen Ziel- oder Definitionsbereichen (S. I.10–I.11)', `
      ${box('vorlesung', `<p>${M`f: t\mapsto\v a + t\cdot\v n`}, ${M`\v a, \v n\in\R^3`}: ${M`f:\R\to\R^3`}, Bild ist eine Gerade im Raum. ${M`g: t\mapsto(a\cos t, b\sin t)`}, ${M`a, b > 0`}: Zielbereich ${M`\R^2`}, Bild ist eine Ellipse mit Halbachsen ${M`a, b`}.</p>
        <p><b>Beispiel.</b> Planung eines Gleises: minimaler Kurvenradius ${M`r`} eines Kreisbogens um ein Gebäude mit Kantenlänge ${M`2a`}, so dass der maximale Abstand zwischen Gebäude und Kreisbogen ${M`x`} beträgt. Pythagoras: ${M`r^2 = a^2 + (r-x)^2 \Rightarrow r(a,x) = \frac{a^2 + x^2}{2x}`}, mit ${M`D(r) = (0,\infty)\times(0,\infty)`}. Funktionen in 2 Variablen: Analysis II.</p>`, { src: 'S. I.11' })}`)}
  `)}

  ${section('eigenschaften', '4. Gerade, ungerade, monoton', `
    ${box('vorlesung', `<p><b>Definition.</b> Wenn ${M`f(-x) = f(x)`} für alle ${M`x\in D(f)`} gilt und ${M`D(f)`} symmetrisch zum Nullpunkt ist, ist ${M`f`} <b>gerade</b>. Bsp: ${M`\cos x,\ x^2,\ x^4,\ |x|`}.</p>
      <p><b>Definition.</b> Wenn ${M`f(-x) = -f(x)`} für alle ${M`x\in D(f)`} gilt und ${M`D(f)`} symmetrisch zum Nullpunkt ist, ist ${M`f`} <b>ungerade</b>. Bsp: ${M`\sin x,\ x,\ x^3,\ \tan x`}.</p>
      <p><b>Definition.</b> Wenn aus ${M`x_1 < x_2`} immer ${M`f(x_1)\le f(x_2)`} folgt, ist ${M`f`} <b>monoton wachsend</b>. Wenn gar ${M`f(x_1) < f(x_2)`} immer gilt, dann ist ${M`f`} <b>strikt monoton wachsend</b>. Bsp: ${M`x,\ x^3,\ e^x`}. Analog (strikt) monoton fallend.</p>`, { src: 'S. I.11–I.12' })}
    <p><b>Bildlich:</b> Gerade heisst spiegelsymmetrisch zur ${M`y`}-Achse. Ungerade heisst punktsymmetrisch zum Ursprung (um ${M`180^\circ`} drehen ändert nichts). In der Figur oben kannst du das an ${M`x^2`} und ${M`x^3`} sehen.</p>
  `)}

  ${section('elementar', '5. Grundlegende und elementare Funktionen', `
    ${box('vorlesung', `<ol>
      <li><b>Potenzfunktionen:</b> ${M`f(x) = x^r,\ r\in\R`}</li>
      <li><b>Polynome:</b> ${M`f(x) = a_0 + a_1x + \dots + a_nx^n`} mit ${M`a_n\ne0`} und <b>Koeffizienten</b> ${M`a_0, \dots, a_n\in\R`}; ${M`n`} ist der <b>Grad</b>.</li>
      <li><b>Rationale Funktionen:</b> ${M`f(x) = p(x)/q(x)`} mit Polynomen ${M`p, q`}.</li>
      <li><b>Trigonometrische Funktionen:</b> ${M`\sin x,\ \cos x,\ \tan x := \frac{\sin x}{\cos x},\ \cot x := \frac{\cos x}{\sin x},\ \arcsin x,\ \arccos x, \dots`}</li>
      <li><b>Exponentialfunktionen:</b> ${M`f(x) = a^x`} mit ${M`a > 1`}.</li>
      <li><b>Logarithmen:</b> ${M`f(x) = \log_a x`} ist die Umkehrfunktion von ${M`g(x) = a^x`}, d.h. ${M`x = \log_a(a^x)`}, ${M`a^{\log_a x} = x`} für ${M`x > 0`}. Spezialfall ${M`a = e`}: ${M`\ln x := \log_e x`}, der natürliche Logarithmus.</li></ol>
      <p>Kombinationen dieser Funktionen durch ${M`+, -, \cdot, \div`}, Verkettung und Umkehrfunktionen nennt man <b>elementare Funktionen</b>. Beispiele: ${M`e^{-x^2}`}, ${M`\sin(\ln(1 + x^2))`}, ${M`|x| = \sqrt{x^2}`}; aber ${M`x\mapsto\int_0^x e^{-t^2}\dd t`} sowie viele Potenzreihen sind nicht elementar.</p>`, { src: 'S. I.12–I.13' })}
  `)}
  `;
  dwFigure(root.querySelector('#fig-dw'));
  unitFigure(root.querySelector('#fig-unit'));
}

function dwFigure(host) {
  const examples = {
    a: { f: (x) => 1 / (1 - x), D: [-1, 1], openD: [true, true], W: [0.5, 6], openW: [true, true], tex: 'f(x) = \\tfrac{1}{1-x},\\ D = (-1, 1)', note: 'W(f) = (\\tfrac12, \\infty)' },
    b: { f: (x) => Math.sqrt(x + 1), D: [-1, 3.4], openD: [false, true], W: [0, Math.sqrt(4.4)], openW: [false, true], tex: 'f(x) = \\sqrt{x+1},\\ D = [-1, \\infty)', note: 'W(f) = [0, \\infty)' },
    c: { f: (x) => x * x, D: [-2, 2], openD: [false, false], W: [0, 4], openW: [false, false], tex: 'f(x) = x^2,\\ D = [-2, 2]', note: 'W(f) = [0, 4] \\text{ (gerade)}' },
    d: { f: (x) => x ** 3 / 2, D: [-2, 2], openD: [false, false], W: [-4, 4], openW: [false, false], tex: 'f(x) = \\tfrac{x^3}{2},\\ D = [-2, 2]', note: 'W(f) = [-4, 4] \\text{ (ungerade)}' },
  };
  let ex = examples.a;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const btns = buttonRow(Object.entries(examples).map(([k, e]) => ({ label: M([e.tex.split(',')[0]]), onClick: () => { ex = examples[k]; draw(); } })));
  btns.firstChild.classList.add('active');
  controls.appendChild(btns);
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = { xmin: -2.6, xmax: 3.6, ymin: -4.5, ymax: 6 };
    const p = plot(fig, { width: 560, height: 380, ...B });
    p.svg.style.maxWidth = '560px';
    grid(p, B);
    axes(p, { ...B, xticks: [-2, -1, 1, 2, 3], yticks: [-4, -2, 2, 4], xlabel: 'x', ylabel: 'y' });
    // D und W als dicke Balken
    el('line', { x1: p.X(ex.D[0]), x2: p.X(ex.D[1]), y1: p.Y(0), y2: p.Y(0), class: 's-x', 'stroke-width': 7, opacity: 0.55 }, p.svg);
    el('line', { x1: p.X(0), x2: p.X(0), y1: p.Y(ex.W[0]), y2: p.Y(Math.min(ex.W[1], B.ymax)), class: 's-y', 'stroke-width': 7, opacity: 0.55 }, p.svg);
    // offenes Intervallende: leerer Kreis, geschlossenes: voller Kreis
    const ends = (x, y, open, cls) => {
      const c = cls === 'fill-x' ? 'x' : 'y';
      return el('circle', { cx: x, cy: y, r: 5, style: `fill: var(--${open ? 'panel' : c}); stroke: var(--${c}); stroke-width: 2` }, p.svg);
    };
    graph(p, ex.f, { xmin: ex.D[0] + 1e-6, xmax: ex.D[1] - 1e-6, ymin: B.ymin, ymax: B.ymax, cls: 's-dark', width: 2.5 });
    for (const xb of ex.D) {
      const yb = ex.f(xb);
      if (Number.isFinite(yb) && yb <= B.ymax) el('line', { x1: p.X(xb), y1: p.Y(0), x2: p.X(xb), y2: p.Y(yb), class: 's-dark dashed', 'stroke-width': 0.8 }, p.svg), el('line', { x1: p.X(xb), y1: p.Y(yb), x2: p.X(0), y2: p.Y(yb), class: 's-dark dashed', 'stroke-width': 0.8 }, p.svg);
    }
    ends(p.X(ex.D[0]), p.Y(0), ex.openD[0], 'fill-x'); ends(p.X(ex.D[1]), p.Y(0), ex.openD[1], 'fill-x');
    ends(p.X(0), p.Y(ex.W[0]), ex.openW[0], 'fill-y');
    if (ex.W[1] <= B.ymax) ends(p.X(0), p.Y(ex.W[1]), ex.openW[1], 'fill-y');
    readout.innerHTML = `${M([ex.tex])} &nbsp;⇒&nbsp; ${M([ex.note])}`;
  }
  draw();
}

function unitFigure(host) {
  let t = 1;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.appendChild(slider({ label: M`t =`, min: -6.28, max: 6.28, step: 0.02, value: t, format: (v) => M([fmt(v, 2)]), onInput: (v) => { t = v; draw(); } }));
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 380, height: 380, xmin: -1.4, xmax: 1.4, ymin: -1.4, ymax: 1.4, pad: 16 });
    p.svg.style.maxWidth = '380px';
    arrowDefs(p.svg);
    axes(p, { xmin: -1.4, xmax: 1.4, ymin: -1.4, ymax: 1.4, xticks: [-1, 1], yticks: [-1, 1], xlabel: 'x', ylabel: 'y' });
    el('circle', { cx: p.X(0), cy: p.Y(0), r: p.X(1) - p.X(0), fill: 'none', class: 's-dark', 'stroke-width': 1.2 }, p.svg);
    const pts = [];
    const steps = Math.max(2, Math.ceil(Math.abs(t) * 30));
    for (let i = 0; i <= steps; i++) { const s = (t * i) / steps; pts.push(`${i ? 'L' : 'M'}${p.X(Math.cos(s))},${p.Y(Math.sin(s))}`); }
    el('path', { d: pts.join(' '), class: 's-angle', fill: 'none', 'stroke-width': 4, opacity: 0.8 }, p.svg);
    const c = Math.cos(t), s = Math.sin(t);
    el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(c), y2: p.Y(0), class: 's-x', 'stroke-width': 4 }, p.svg);
    el('line', { x1: p.X(c), y1: p.Y(0), x2: p.X(c), y2: p.Y(s), class: 's-y', 'stroke-width': 4 }, p.svg);
    el('circle', { cx: p.X(c), cy: p.Y(s), r: 6, class: 'fill-point' }, p.svg);
    text(p.svg, p.X(c / 2), p.Y(0) + (s >= 0 ? 16 : -8), 'cos t', 'middle', 'math t-x');
    text(p.svg, p.X(c) + (c >= 0 ? 6 : -6), p.Y(s / 2), 'sin t', c >= 0 ? 'start' : 'end', 'math t-y');
    readout.innerHTML = `${M([`(\\cos t,\\ \\sin t) = (${fmt(c, 3)};\\ ${fmt(s, 3)})`])}, ${M([`\\cos^2 t + \\sin^2 t = ${fmt(c * c + s * s, 3)}`])}`;
  }
  draw();
}
