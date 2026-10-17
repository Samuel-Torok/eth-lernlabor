import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text, graph, grid } from '../../ui/svg.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Aus der Nähe sieht fast jede Kurve wie eine Gerade aus. Ersetzt man die Funktion durch ihre Tangente, wird vieles einfach: Gleichungen werden lösbar, Messfehler kann man abschätzen. Die Frage ist immer: Wie gross ist der Fehler dabei?</p>

  ${section('ersatz', '1. Die lineare Ersatzfunktion', `
    ${box('vorlesung', `<p>Tangente und Graph sind (nahe bei ${M`x_0`}) kaum unterscheidbar, also geeignet für Approximation!</p>
      <p><b>Definition.</b> Die <b>lineare Ersatzfunktion von ${M`f`} an der Stelle ${M`x_0`}</b> ist</p>
      ${MD`t(x) := \underbrace{f(x_0)}_{\text{Stützpunkt}} + \underbrace{f'(x_0)}_{\text{Steigung}}\cdot\underbrace{(x - x_0)}_{\text{horizontaler Abstand zu } x_0}.`}
      <p>Die <b>Tangente</b> ist dann der Graph von ${M`t`}, ${M`\Gamma(t)`}.</p>`, { src: 'S. II.6' })}
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`f(x) = \cos x`} an der Stelle ${M`x_0 = 0`}: ${M`f(x_0) = \cos 0 = 1`}, ${M`f'(x_0) = -\sin 0 = 0`}, also ${M`t(x) = 1 + 0\cdot(x - 0) = 1`}. Bei ${M`x_0 = \frac\pi4`}: ${M`f(x_0) = \frac1{\sqrt2}`}, ${M`f'(x_0) = -\frac{1}{\sqrt2}`}, also ${M`t(x) = \frac{1}{\sqrt2} - \frac{1}{\sqrt2}\big(x - \frac\pi4\big) = \frac{1}{\sqrt2}\big(1 + \frac\pi4 - x\big)`}.</p>
      <p><b>Beispiel.</b> ${M`f(x) = \ln x`} an der Stelle ${M`x_0 = 1`}: ${M`f(x_0) = 0`}, ${M`f'(x_0) = \frac11 = 1`}, also ${M`t(x) = x - 1`}.</p>`, { src: 'S. II.6' })}
    ${figure('fig-lin', `Die Funktion (dunkel) und ihre lineare Ersatzfunktion bei ${M`x_0`} (blau). Der violette Abstand ist der Fehler ${M`\varphi(x) = f(x) - t(x)`}. Bewege ${M`x`} nahe an ${M`x_0`}: Der Fehler wird viel schneller klein als der Abstand ${M`\Delta x`}.`, { wide: true })}
  `)}

  ${section('qualitaet', '2. Wie gut ist die Approximation?', `
    ${box('vorlesung', `<p>Klar: ${M`\lim_{x\to x_0} t(x) = f(x_0)`}, da ${M`t`} stetig und ${M`t(x_0) = f(x_0)`}. Sei nun ${M`x\ne x_0`}, aber in der Nähe. Wie gross ist der Fehler durch Benutzen von ${M`t(x)`} statt ${M`f(x)`}? Definiere die <b>Fehlerfunktion</b></p>
      ${MD`\varphi(x) := f(x) - t(x) = f(x) - f(x_0) - f'(x_0)\cdot\underbrace{(x - x_0)}_{=\,\Delta x}.`}`, { src: 'S. II.7' })}
    ${steps([
      [M`\varphi(x_0) = f(x_0) - f(x_0) - f'(x_0)\cdot0 = 0`, 'Am Stützpunkt selbst gibt es keinen Fehler.'],
      [M`\frac{\varphi(x)}{\Delta x} = \frac{f(x) - f(x_0)}{\Delta x} - f'(x_0)\cdot\frac{\Delta x}{\Delta x} = \underbrace{\frac{f(x) - f(x_0)}{x - x_0}}_{\text{Differenzenquotient}} - \underbrace{f'(x_0)}_{\text{Differentialquotient}}`, `Den Fehler mit dem Abstand ${M`\Delta x`} vergleichen.`],
      [M`\lim_{\Delta x\to0}\frac{\varphi(x)}{\Delta x} = f'(x_0) - f'(x_0) = 0`, 'Der Differenzenquotient geht gegen den Differentialquotienten (das ist die Definition der Ableitung).'],
    ])}
    ${box('vorlesung', `<p>${M`\Rightarrow\ \varphi(x)`} geht schneller gegen 0 als ${M`\Delta x`}, d.h. die Approximation ist relativ betrachtet für kleine ${M`\Delta x`} sehr gut. ${M`\lim\frac{\varphi(x)}{\Delta x} = 0`} bedeutet: Der Graph von ${M`\varphi`} ist bei ${M`\Delta x = 0`} horizontal, der Fehler sehr klein.</p>`, { src: 'S. II.7' })}
    ${box('vorlesung', `<p><b>Beispiel.</b> Die Rückstellkraft des mathematischen Pendels der Länge ${M`l`} und Masse ${M`m`} in Auslenkung ${M`\varphi`} ist ${M`K = m\cdot g\cdot\sin(\varphi)`}. Mit ${M`K = m\cdot a(t)`} entsteht eine Differentialgleichung in ${M`\varphi(t)`}, die so kompliziert ist, dass man sie nicht elementar exakt lösen kann. Ansatz: Linearisierung verwenden! ${M`\sin\varphi`} lässt sich um ${M`\varphi_0 = 0`} linearisieren: ${M`t(\varphi) = \varphi`}. Mit ${M`K = m\cdot g\cdot\varphi(t)`} lässt sich die resultierende DGL nun elementar exakt lösen. Die approximierte Lösung gilt aber nur für kleine ${M`\varphi`}.</p>`, { src: 'S. II.8' })}
    ${box('achtung', `<p>Im Skript steht dort ${M`\ddot s(t) = g\sin(\varphi(t))`}. Vollständig ist es ${M`l\,\ddot\varphi = -g\sin\varphi`} (mit ${M`s = l\varphi`}, und mit Minus, weil die Kraft zurücktreibt), wie schon auf S. I.9: ${M`\ddot\varphi + \frac gl\sin\varphi = 0`}. Für die Idee der Linearisierung ändert das nichts.</p>`)}
  `)}

  ${section('potenz', `3. ${M`(1 + x)^\alpha \approx 1 + \alpha x`}`, `
    ${box('vorlesung', `<p><b>Beispiel.</b> Sei ${M`f(x) = (1 + x)^\alpha`} für ein ${M`\alpha\ne0`} und ${M`x_0 = 0`}: ${M`f(x_0) = 1`}, ${M`f'(x_0) = \alpha(1 + 0)^{\alpha-1} = \alpha`}, also ${M`t(x) = 1 + \alpha x`}. Für kleine ${M`x`} gilt also ${M`f(x)\approx 1 + \alpha x`}:</p>
      ${MD`\sqrt{1+x}\approx1 + \frac x2,\qquad \frac{1}{\sqrt{1+x}}\approx 1 - \frac x2,\qquad \frac{1}{1+x}\approx1 - x.`}
      <p><b>Im Alltag:</b> «B ist um 2% grösser als A»: ${M`B = A\cdot(1 + \frac{2}{100})`}, also ${M`A = B\cdot\frac{1}{1 + 2/100}`}. «A ist um 2% kleiner als B»: ${M`A = B\cdot(1 - \frac{2}{100})`}. Linearisierung: Für ${M`x`} klein ist ${M`\frac{1}{1+x}\approx1 - x`}, diese Aussagen sind für kleine ${M`x`} (wie hier ${M`x = 0{,}02`}) praktisch äquivalent.</p>`, { src: 'S. II.8–II.9' })}
  `)}

  ${section('differential', '4. Differentiale und Fehlerrechnung', `
    ${box('vorlesung', `<p><b>Idee:</b> Verschiebe das Koordinatensystem so, dass ${M`(x_0, f(x_0))`} der neue Ursprung wird. Wie sieht die lineare Ersatzfunktion in diesem System aus? Eine Gerade durch ${M`(0,0)`}! Neue Koordinaten: ${M`\dd x, \dd f`}.</p>
      <p><b>Definition.</b> Im neuen Koordinatensystem mit Achsen ${M`\dd x, \dd f`} (statt ${M`x, f`}) lautet die lineare Ersatzfunktion ${M`t(x)`} neu ${M`\dd f: \dd x\mapsto f'(x_0)\cdot\dd x`} und heisst <b>Differential</b>.</p>`, { src: 'S. II.9' })}
    <p><b>So liest man das:</b> ${M`\dd x`} ist eine kleine Änderung von ${M`x`} (eine Zahl, wie ${M`\Delta x`}). ${M`\dd f`} ist die Änderung, die die <em>Tangente</em> dafür vorhersagt, proportional zu ${M`\dd x`}. Die echte Änderung ${M`\Delta f`} ist ungefähr ${M`\dd f`}. Die Vorlesung widerlegt damit: «${M`f'`} schreiben als ${M`\frac{\dd f}{\dd x}`} ist nur umständliche Notation ohne Relevanz».</p>
    ${box('vorlesung', `<p><b>Beispiel (Fehlerrechnung).</b> Gegeben sei ein Dreieck mit bekannter Seitenlänge ${M`a`} und gegenüberliegendem Winkel ${M`\alpha`}. Es werde der Winkel ${M`\beta`} gemessen, der Messfehler betrage maximal ${M`\Delta\beta`}. Wie beeinflusst der Messfehler die Berechnung der gegenüberliegenden Seitenlänge ${M`b`}?</p>
      <p>Sinussatz: ${M`\frac{b}{\sin\beta} = \frac{a}{\sin\alpha} \Rightarrow b(\beta) := \frac{a}{\sin\alpha}\sin\beta`}. Exakt: ${M`\Delta b = b(\beta + \Delta\beta) - b(\beta)`}. Linearisiert: ${M`\Delta b\approx\dd b = b'(\beta)\,\dd\beta = \frac{a}{\sin\alpha}\cos\beta\cdot\Delta\beta`}.</p>
      <p>Relativer Fehler: ${M`\frac{\Delta b}{b}\approx\frac{\dd b}{b} = \frac{\frac{a}{\sin\alpha}\cos\beta\,\dd\beta}{\frac{a}{\sin\alpha}\sin\beta} = \cot\beta\cdot\Delta\beta`}, proportional zu ${M`\Delta\beta`}; klein wenn ${M`\beta\approx\frac\pi2`}, gross wenn ${M`\beta\to0`}; kein ${M`a`}, kein ${M`\alpha`}.</p>`, { src: 'S. II.10' })}
    ${box('vorlesung', `<p><b>Beispiel.</b> Der Durchmesser ${M`x`} einer Kugel werde mit Messfehler maximal ${M`\Delta x`} gemessen. Volumen ${M`V(x) = \frac{4\pi}{3}\big(\frac x2\big)^3`}, Oberfläche ${M`O(x) = 4\pi\big(\frac x2\big)^2`}.</p>
      ${MD`\Delta V\approx\dd V = V'(x)\,\dd x = \tfrac\pi2x^2\,\dd x,\qquad \Delta O\approx\dd O = 2\pi x\,\dd x`}
      ${MD`\frac{\Delta V}{V}\approx 3\cdot\frac{\dd x}{x},\qquad \frac{\Delta O}{O}\approx2\cdot\frac{\dd x}{x}`}
      <p>Relativer Messfehler: nützlich, wenn der Messfehler z.B. in Prozent angegeben wurde.</p>`, { src: 'S. II.11' })}
    ${box('merke', `<p>Bei ${M`f(x) = Cx^n`} gilt ${M`\frac{\dd f}{f} = n\frac{\dd x}{x}`}: Der relative Fehler wird mit dem Exponenten multipliziert. 1% Fehler im Durchmesser gibt 3% Fehler im Volumen. (Getestet in <code>analysis.test.js</code>.)</p>`)}
  `)}
  `;
  linFigure(root.querySelector('#fig-lin'));
}

function linFigure(host) {
  const fns = {
    cos: { f: Math.cos, df: (x) => -Math.sin(x), tex: '\\cos x', x0: Math.PI / 4, B: { xmin: -1, xmax: 3.4, ymin: -1.6, ymax: 1.6 }, x0min: 0, x0max: 3 },
    ln: { f: Math.log, df: (x) => 1 / x, tex: '\\ln x', x0: 1, B: { xmin: -0.2, xmax: 4.2, ymin: -2.2, ymax: 2 }, x0min: 0.4, x0max: 3.5 },
    sqrt: { f: (x) => Math.sqrt(1 + x), df: (x) => 0.5 / Math.sqrt(1 + x), tex: '\\sqrt{1+x}', x0: 0, B: { xmin: -1.2, xmax: 3.2, ymin: -0.4, ymax: 2.6 }, x0min: -0.5, x0max: 2.5 },
  };
  let fn = fns.cos;
  let x0 = fn.x0, dx = 0.8;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const sl = document.createElement('div');
  sl.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const x0s = slider({ label: M`x_0 =`, min: 0, max: 3, step: 0.05, value: x0, format: (v) => M([fmt(v, 2)]), onInput: (v) => { x0 = v; draw(); } });
  const btns = buttonRow(Object.entries(fns).map(([k, v]) => ({ label: M([`f = ${v.tex}`]), onClick: () => {
    fn = fns[k];
    const inp = x0s.querySelector('input');
    inp.min = fn.x0min; inp.max = fn.x0max;
    x0s.setValue(fn.x0);
  } })));
  btns.firstChild.classList.add('active');
  controls.appendChild(btns);
  sl.append(x0s, slider({ label: M`\Delta x =`, min: -1.2, max: 1.2, step: 0.01, value: dx, format: (v) => M([fmt(v, 2)]), onInput: (v) => { dx = v; draw(); } }));
  host.append(controls, sl, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = fn.B;
    const p = plot(fig, { width: 620, height: 340, ...B });
    grid(p, { ...B, dx: 0.5, dy: 0.5 });
    axes(p, { ...B, xticks: [1, 2, 3], yticks: [-1, 1, 2], xlabel: 'x', ylabel: 'y' });
    graph(p, fn.f, { ...B, cls: 's-dark', width: 2.5 });
    const t = (x) => fn.f(x0) + fn.df(x0) * (x - x0);
    graph(p, t, { ...B, cls: 's-x', width: 2 });
    const x = x0 + dx;
    const fx = fn.f(x), tx = t(x);
    if (Number.isFinite(fx)) {
      el('line', { x1: p.X(x), x2: p.X(x), y1: p.Y(fx), y2: p.Y(tx), class: 's-angle', 'stroke-width': 4 }, p.svg);
      el('circle', { cx: p.X(x), cy: p.Y(fx), r: 4.5, class: 'fill-dark' }, p.svg);
      el('circle', { cx: p.X(x), cy: p.Y(tx), r: 4.5, class: 'fill-x' }, p.svg);
    }
    el('circle', { cx: p.X(x0), cy: p.Y(fn.f(x0)), r: 6, class: 'fill-point' }, p.svg);
    text(p.svg, p.X(x0), p.Y(B.ymin) - 4, 'x_0', 'middle', 'math t-point');
    const phi = fx - tx;
    readout.innerHTML = Number.isFinite(fx)
      ? `${M([`\\varphi(x) = f(x) - t(x) = ${fmt(phi, 4)}`])}, ${M([`\\frac{\\varphi(x)}{\\Delta x} = ${fmt(Math.abs(dx) < 1e-9 ? 0 : phi / dx, 4)}`])}. Halbiere ${M`\Delta x`}: ${M`\varphi`} wird etwa geviertelt.`
      : `${M`x`} liegt ausserhalb von ${M`D(f)`}.`;
  }
  draw();
}
