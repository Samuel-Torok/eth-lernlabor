import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider } from '../../ui/controls.js';
import { plot, axes, el, text, graph, grid } from '../../ui/svg.js';
import { bisection } from '../../math/analysis.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Der Zwischenwertsatz sagt: Eine stetige Funktion kann keinen Wert überspringen. Das klingt selbstverständlich. Der Beweis ist trotzdem lehrreich, weil er ein Verfahren liefert, mit dem man Gleichungen numerisch löst: das <b>Halbierungsverfahren</b>. Die Vorlesung widerlegt dazu: «Die Grenzwert-Definition von Stetigkeit mag mathematisch korrekt sein, aber sie bringt nichts».</p>

  ${section('satz', '1. Der Satz', `
    ${box('vorlesung', `<p><b>Satz (Zwischenwertsatz).</b> Es sei ${M`f: x\mapsto f(x)`} eine auf ${M`[a,b]`} stetige Funktion. Es sei ${M`m`} irgendein Wert zwischen ${M`f(a)`} und ${M`f(b)`}. Dann gibt es (mindestens) ein ${M`\xi`} mit ${M`f(\xi) = m`}.</p>
      <p>Mit anderen Worten: Stetige Funktionen «überspringen» keine Werte, sondern «alles dazwischen» wird auch als Funktionswert angenommen. Zeichnen ohne Absetzen.</p>`, { src: 'S. I.18' })}
    ${box('achtung', `<p>Der Satz sagt <b>nicht</b>, wo ${M`\xi`} liegt, und auch nicht, dass es nur eines gibt. Und beide Voraussetzungen sind nötig: ${M`f`} stetig <em>und</em> auf einem ganzen Intervall ${M`[a,b]`} definiert. ${M`1/x`} auf ${M`[-1, 1]\setminus\{0\}`} nimmt den Wert 0 nie an, obwohl ${M`f(-1) < 0 < f(1)`}.</p>`)}
  `)}

  ${section('beweis', '2. Beweis: halbieren, halbieren, halbieren', `
    <p>Beweis für ${M`f(a)\le m\le f(b)`} (S. I.18–I.19). Man konstruiert zwei Folgen ${M`(x_n)`} und ${M`(y_n)`}, die sich von links und rechts auf ${M`\xi`} zubewegen.</p>
    ${steps([
      [M`x_1 := a,\quad y_1 := b`, 'Start: das ganze Intervall.'],
      [M`f\Big(\tfrac{x_i + y_i}{2}\Big)\ge m:\ x_{i+1} := x_i,\ y_{i+1} := \tfrac{x_i + y_i}{2};\quad \text{sonst } x_{i+1} := \tfrac{x_i+y_i}{2},\ y_{i+1} := y_i`, `Prüfe die Mitte. Ist dort ${M`f\ge m`}, liegt ein Treffer links davon: Behalte die linke Hälfte. Sonst die rechte. Immer gilt ${M`f(x_n)\le m\le f(y_n)`}.`],
      [M`(x_n) \text{ monoton wachsend},\ (y_n) \text{ monoton fallend},\ a\le x_n, y_n\le b`, `${M`x_n`} bewegt sich nur nach rechts, ${M`y_n`} nur nach links, und beide bleiben im Intervall.`],
      [M`\Rightarrow x_n\to x,\ y_n\to y`, 'Monoton und beschränkt, also konvergent (Satz aus Kapitel I.1).'],
      [M`y - x = \lim_{n\to\infty}(y_n - x_n) = \lim_{n\to\infty}\frac{b-a}{2^{n-1}} = 0 \;\Rightarrow\; x = y =: \xi`, 'Das Intervall halbiert sich bei jedem Schritt, seine Länge geht gegen 0. Beide Folgen haben also denselben Grenzwert.'],
      [M`f(\xi) = \lim f(x_n) \le m \le \lim f(y_n) = f(\xi) \;\Rightarrow\; f(\xi) = m`, `Hier wird die Stetigkeit gebraucht: ${M`\lim f(x_n) = f(\lim x_n)`}. Von beiden Seiten eingeklemmt bleibt nur ${M`f(\xi) = m`}.`],
    ])}
    ${figure('fig-bisect', `Das Halbierungsverfahren für ${M`f(x) = x^2 - \cos x`} auf ${M`[0, \frac\pi2]`} mit ${M`m = 0`} (Beispiel aus dem Skript). Das blaue Band ist das aktuelle Intervall ${M`[x_n, y_n]`}. Mit jedem Schritt halbiert es sich, und ${M`\xi`} bleibt immer darin.`, { wide: true })}
    ${box('merke', `<p>Das ist die Antwort auf «die Definition bringt nichts»: Genau die Folgen-Definition der Stetigkeit macht den letzten Schritt möglich, und der Beweis ist gleichzeitig ein Algorithmus, den jeder Taschenrechner benutzt.</p>`)}
  `)}

  ${section('beispiele', '3. Beispiele aus der Vorlesung', `
    ${box('vorlesung', `<p><b>Beispiel.</b> Gibt es ein ${M`x\in\R`} mit ${M`\cos x = x^2`}? Ja: Mit ${M`g(x) = \cos x`}, ${M`h(x) = x^2`} und ${M`f(x) := h(x) - g(x) = x^2 - \cos x`} ist ${M`f`} stetig und ${M`f(x) = 0 \iff x^2 = \cos x`}. Zwischenwertsatz mit ${M`m = 0`}, ${M`[a,b] = [0, \frac\pi2]`}: ${M`f(0) = 0^2 - \cos 0 = -1`}, ${M`f(\frac\pi2) = \frac{\pi^2}4 - \cos\frac\pi2 = \frac{\pi^2}{4}`}. Im Intervall ${M`[0, \frac\pi2]`} gibt es ein ${M`\xi`} mit ${M`f(\xi) = 0 \iff \xi^2 = \cos\xi`}.</p>`, { src: 'S. I.19' })}
    <p><b>Der Trick:</b> Eine Gleichung «${M`g(x) = h(x)`}» wird zur Nullstellen-Frage für die Differenz ${M`f = h - g`}. Dann reicht ein Vorzeichenwechsel.</p>
    ${box('vorlesung', `<p><b>Beispiel.</b> Seien ${M`f(x) := \frac{x}{\sqrt2}`} und ${M`g(x) := 1`} wenn ${M`x\in\mathbb Q`}, ${M`0`} wenn ${M`x\notin\mathbb Q`}. Gibt es ein ${M`x`} mit ${M`f(x) = g(x)`}? Zwei Kandidaten: ${M`x = 0`}: ${M`g(0) = 1`}, ${M`f(0) = 0`}, nein. ${M`x = \sqrt2`}: ${M`g(\sqrt2) = 0`}, ${M`f(\sqrt2) = 1`}, nein. Hier gibt es also keinen Schnittpunkt, da ${M`g`} unstetig ist.</p>`, { src: 'S. I.19' })}
  `)}
  `;
  bisectFigure(root.querySelector('#fig-bisect'));
}

function bisectFigure(host) {
  const f = (x) => x * x - Math.cos(x);
  const a = 0, b = Math.PI / 2;
  const { xs, ys } = bisection(f, a, b, 0, 30);
  let n = 1;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.appendChild(slider({ label: M`n =`, min: 1, max: 12, step: 1, value: n, format: (v) => M([String(v)]), onInput: (v) => { n = v; draw(); } }));
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = { xmin: -0.15, xmax: 1.75, ymin: -1.15, ymax: 2.6 };
    const p = plot(fig, { width: 640, height: 300, ...B });
    grid(p, { ...B, dx: 0.25, dy: 0.5 });
    const x = xs[n - 1], y = ys[n - 1];
    el('rect', { class: 'band', x: p.X(x), y: p.Y(B.ymax), width: Math.max(1, p.X(y) - p.X(x)), height: p.Y(B.ymin) - p.Y(B.ymax) }, p.svg);
    axes(p, { ...B, xticks: [0.5, 1, 1.5], yticks: [-1, 1, 2], xlabel: 'x', ylabel: 'y' });
    graph(p, f, { xmin: 0, xmax: b, cls: 's-dark', width: 2.5 });
    const mid = (x + y) / 2;
    el('line', { x1: p.X(mid), x2: p.X(mid), y1: p.Y(0), y2: p.Y(f(mid)), class: 's-angle dashed', 'stroke-width': 1.5 }, p.svg);
    el('circle', { cx: p.X(mid), cy: p.Y(f(mid)), r: 4, class: 'fill-angle' }, p.svg);
    el('circle', { cx: p.X(x), cy: p.Y(f(x)), r: 5, class: 'fill-x' }, p.svg);
    el('circle', { cx: p.X(y), cy: p.Y(f(y)), r: 5, class: 'fill-y' }, p.svg);
    text(p.svg, p.X(x), p.Y(B.ymax) + 16, 'x_n', 'middle', 'math t-x');
    text(p.svg, p.X(y), p.Y(B.ymax) + 16, 'y_n', 'middle', 'math t-y');
    readout.innerHTML = `${M([`[x_{${n}}, y_{${n}}] = [${fmt(x, 5)};\\ ${fmt(y, 5)}]`])}, Länge ${M([`\\tfrac{b-a}{2^{${n - 1}}} = ${fmt(y - x, 5)}`])}. Mitte: ${M([`f(${fmt(mid, 4)}) = ${fmt(f(mid), 4)}`])} ${f(mid) >= 0 ? `${M`\ge 0`}: links weitersuchen` : `${M`< 0`}: rechts weitersuchen`}.`;
  }
  draw();
}
