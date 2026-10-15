import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps, more } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text } from '../../ui/svg.js';
import { EXAMPLES, eBound, eSum, firstIndexWithin } from '../../math/sequences.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Eine Folge ist eine unendlich lange, nummerierte Liste von Zahlen. Die grosse Frage dieses Kapitels: <b>Kommen die Zahlen irgendwann einem festen Wert beliebig nahe?</b> Dafür braucht man eine genaue Definition von «beliebig nahe». Das ist das ${M`\varepsilon`} der Nullfolge.</p>

  ${section('folge', '1. Was ist eine Folge?', `
    ${box('intuition', `<p>Stell dir eine Kasse vor, die jede Sekunde einen Betrag ausdruckt: zuerst ${M`a_0`}, dann ${M`a_1`}, dann ${M`a_2`} … Der Index ${M`n`} sagt nur, <em>an welcher Stelle</em> die Zahl steht. Die Zahl selbst ist ${M`a_n`}.</p>`)}
    ${box('vorlesung', `<p><b>Definition.</b> Eine <b>Folge von reellen Zahlen</b> ist eine Abbildung der natürlichen Zahlen ${M`\N = \{0, 1, 2, 3, \dots\}`} in die reellen Zahlen ${M`\R`}. Manchmal beginnt man auch bei 1, 2 oder einer anderen natürlichen Zahl.</p>
      ${MD`(a_0, a_1, a_2, a_3, \dots) =: (a_n)_{n \ge 0}`}`, { src: 'Analysis I, S. I.1' })}
    <p><b>So liest man das:</b> ${M`(a_n)_{n\ge0}`} mit Klammern ist die <em>ganze Folge</em>. ${M`a_n`} ohne Klammern ist <em>ein einzelnes Glied</em>, nämlich das an der Stelle ${M`n`}. Das «${M`=:`}» heisst: «wird definiert als».</p>
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`a_n = -2 + 5n`}, ${M`n \ge 0`}: ${M`a_0 = -2`}, ${M`a_1 = 3`}, ${M`a_2 = 8`}, …</p>`, { src: 'S. I.1' })}
  `)}

  ${section('eigenschaften', '2. Beschränkt und monoton', `
    ${box('vorlesung', `<p><b>Definition.</b> Eine Folge ${M`(a_n)`} ist <b>beschränkt</b>, wenn es ${M`r, s \in \R`} gibt, so dass für alle ${M`n`} gilt: ${M`r \le a_n \le s`}.</p>
      <p><b>Definition.</b> ${M`(a_n)`} ist <b>(strikt) monoton wachsend</b>, wenn für alle ${M`n`} gilt: ${M`a_n \le a_{n+1}`} (bzw. ${M`a_n < a_{n+1}`}). Analog <b>(strikt) monoton fallend</b> mit ${M`\ge`} bzw. ${M`>`}.</p>`, { src: 'S. I.3' })}
    <p><b>In Worten:</b> Beschränkt heisst, alle Glieder passen zwischen zwei feste Linien ${M`r`} und ${M`s`}. Monoton wachsend heisst, es geht nie nach unten. ${M`a_n = -2 + 5n`} ist strikt monoton wachsend, weil ${M`a_{n+1} - a_n = 5 > 0`}. Sie ist aber unbeschränkt, denn sie wächst über jede Linie ${M`s`} hinaus.</p>
  `)}

  ${section('nullfolge', `3. Nullfolge: das ${M`\varepsilon`}-Spiel`, `
    ${box('intuition', `<p>Ein Spiel zwischen zwei Personen. Person A gibt eine winzige Toleranz ${M`\varepsilon`} vor, zum Beispiel ${M`0{,}01`}. Person B muss eine Stelle ${M`n_0`} nennen, ab der <em>alle</em> weiteren Glieder näher als ${M`\varepsilon`} bei 0 liegen. Kann B für <em>jedes</em> ${M`\varepsilon`} gewinnen, ist die Folge eine Nullfolge.</p>`)}
    ${box('vorlesung', `<p><b>Definition.</b> Eine Folge ${M`(a_n)`} ist eine <b>Nullfolge</b>, falls es zu jeder noch so kleinen Zahl ${M`\varepsilon > 0`} ein ${M`n_0`} gibt, so dass für alle darauf folgenden Glieder ${M`a_n`} mit ${M`n \ge n_0`} gilt: ${M`|a_n| < \varepsilon`}.</p>`, { src: 'S. I.3' })}
    <p><b>Was jedes Symbol bedeutet:</b> ${M`\varepsilon`} ist die Toleranz (die Breite des Streifens). ${M`n_0`} ist die Stelle, ab der alles im Streifen bleibt. ${M`|a_n| < \varepsilon`} heisst: ${M`a_n`} liegt zwischen ${M`-\varepsilon`} und ${M`\varepsilon`}.</p>
    ${figure('fig-eps', `Der blaue Streifen hat die halbe Breite ${M`\varepsilon`} um den Kandidaten für den Grenzwert. Blau: Glieder im Streifen, rot: ausserhalb. Die gestrichelte Linie markiert das kleinste ${M`n_0`}, ab dem <em>alle</em> Glieder im Streifen bleiben. Mach ${M`\varepsilon`} kleiner: Bei einer konvergenten Folge wandert ${M`n_0`} nach rechts, existiert aber immer.`, { wide: true })}
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`a_n = 1/n`}, ${M`n \ge 1`}, ist eine Nullfolge, denn für jedes ${M`\varepsilon > 0`} gilt</p>
      ${MD`|a_n| < \varepsilon \iff \frac{1}{n} < \varepsilon \iff n > \frac{1}{\varepsilon}.`}
      <p>D.h. wenn wir ${M`n_0 := \frac{1}{\varepsilon}`} «aufgerundet» wählen, gilt ${M`|a_{n_0}| < \varepsilon`}, und das gilt auch für alle ${M`a_{n_0+k}`} mit ${M`k \ge 0`}.</p>`, { src: 'S. I.4' })}
    ${box('achtung', `<p>«Aufgerundet» genügt nicht immer: Ist ${M`1/\varepsilon`} schon eine ganze Zahl (z.B. ${M`\varepsilon = 0{,}1`}, also ${M`1/\varepsilon = 10`}), dann ist ${M`a_{10} = 0{,}1`} <em>nicht</em> kleiner als ${M`\varepsilon`}. Sicher ist ${M`n_0 = \lfloor 1/\varepsilon \rfloor + 1`}. Probier es in der Figur mit ${M`\varepsilon = 0{,}1`} aus.</p>`)}
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`b_n = \sin\!\left(n \cdot \tfrac{\pi}{2}\right)`}, ${M`n \ge 1`}: ${M`b_1 = 1`}, ${M`b_2 = 0`}, ${M`b_3 = -1`}, ${M`b_4 = 0`}, danach wiederholen sich die Werte periodisch. Für ${M`\varepsilon = \tfrac12`} findet man kein ${M`n_0`}, so dass für alle ${M`k`} gilt ${M`|a_{n_0+k}| < \tfrac12`}. Also <b>keine Nullfolge</b>.</p>`, { src: 'S. I.4' })}
  `)}

  ${section('konvergenz', '4. Konvergenz', `
    ${box('vorlesung', `<p><b>Definition.</b> Eine Folge ${M`(a_n)`} <b>konvergiert</b> gegen den <b>Grenzwert</b> (Limes) ${M`a \in \R`}, falls die Folge ${M`b_n := a_n - a`} eine Nullfolge ist. Notation: ${M`\lim_{n\to\infty} a_n = a`} oder ${M`a_n \xrightarrow{n\to\infty} a`}.</p>
      <p><b>Definition.</b> ${M`(a_n)`} <b>divergiert</b>, wenn ${M`(a_n)`} nicht konvergiert.</p>`, { src: 'S. I.5' })}
    <p><b>Warum so?</b> Die Definition führt Konvergenz auf die Nullfolge zurück. «${M`a_n`} kommt ${M`a`} beliebig nahe» heisst dasselbe wie «der Abstand ${M`a_n - a`} wird beliebig klein». In der Figur oben ist das der Streifen um ${M`a`} statt um 0.</p>
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`c_n = 1 + \frac{(-1)^n}{\sqrt n}`}, ${M`n \ge 1`}: keine Nullfolge, nähert sich aber 1. Wähle ${M`a = 1`}, dann ist ${M`c_n - a = \frac{(-1)^n}{\sqrt n} \to 0`}, also ${M`\lim_{n\to\infty} c_n = 1`}.</p>`, { src: 'S. I.4' })}
    ${box('vorlesung', `<p><b>Eigenschaften.</b> Eine konvergente Folge ist (immer) beschränkt. Eine unbeschränkte Folge ist divergent.</p>`, { src: 'S. I.5' })}
    ${box('achtung', `<p>Die Umkehrung gilt nicht: <b>beschränkt heisst nicht konvergent.</b> ${M`b_n = \sin(n\pi/2)`} bleibt immer zwischen ${M`-1`} und ${M`1`}, konvergiert aber nicht. Wähle in der Figur das Sinus-Beispiel: Kein Streifen mit ${M`\varepsilon \le 1`} fängt alle Glieder ein.</p>`)}
  `)}

  ${section('monoton', '5. Monoton und beschränkt ⇒ konvergent', `
    ${box('vorlesung', `<p><b>Satz.</b> <em>Ist eine Folge monoton wachsend (oder fallend) und beschränkt, so ist sie konvergent.</em></p>`, { src: 'S. I.5' })}
    ${box('intuition', `<p>Eine Ameise krabbelt eine Wand hoch und geht nie zurück (monoton). Über ihr ist eine Decke (beschränkt). Sie muss sich also irgendeiner Höhe immer weiter annähern. Sie kann nicht ewig weiter steigen und auch nicht hin und her springen.</p>`)}
    ${box('vorlesung', `<p><b>Beispiel.</b> Für ${M`n \ge 1`} sei ${M`a_n := 1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \dots + \frac{1}{n!}`}, wobei ${M`n! := n\cdot(n-1)\cdot(n-2)\cdots 3\cdot2\cdot1`}, ${M`1! := 1`}, ${M`0! := 1`}. <b>Behauptung:</b> ${M`(a_n)`} ist konvergent.</p>`, { src: 'S. I.5' })}
    <p><b>Der Beweis aus der Vorlesung, Schritt für Schritt</b> (S. I.5–I.6):</p>
    ${steps([
      [M`a_{n+1} - a_n = \frac{1}{(n+1)!} > 0`, 'Zwei aufeinanderfolgende Glieder unterscheiden sich nur um den letzten Summanden. Also ist die Folge strikt monoton wachsend.'],
      [M`n! = n\cdot(n-1)\cdots 3\cdot 2\cdot 1 \;\ge\; 2^{n-1}`, 'Von den n Faktoren sind die n − 1 Faktoren n, n − 1, …, 2 jeweils ≥ 2. Der letzte Faktor ist 1.'],
      [M`\frac{1}{n!} \le \frac{1}{2^{n-1}}`, 'Kehrwert: Ein grösserer Nenner ergibt einen kleineren Bruch.'],
      [M`a_n \le 1 + 1 + \tfrac12 + \tfrac1{2^2} + \dots + \tfrac{1}{2^{n-1}} =: c_n`, 'Jeden Summanden 1/k! durch die grössere Zahl 1/2^(k−1) ersetzen.'],
      [M`c_n = 1 + \left(2 - \tfrac{1}{2^{n-1}}\right) = 3 - \tfrac{1}{2^{n-1}} < 3`, 'Geometrische Summe: 1 + ½ + … + 1/2^(n−1) = 2 − 1/2^(n−1). Also gilt 0 ≤ a_n ≤ c_n < 3, die Folge ist beschränkt.'],
      [M`\Rightarrow (a_n) \text{ konvergiert.}`, 'Monoton wachsend und beschränkt → Satz von oben.'],
    ])}
    ${figure('fig-e', `Die Glieder ${M`a_n`} (blau) wachsen und bleiben unter der Schranke ${M`c_n`} (bernstein), die selbst unter 3 bleibt. Sie nähern sich der Zahl ${M`e \approx 2{,}718`} (gestrichelt).`)}
    ${box('vorlesung', `<p>Was ist der Grenzwert? Es gilt ${M`\lim_{n\to\infty} a_n = e \approx 2{,}718`}, die Eulersche Zahl.</p>`, { src: 'S. I.6' })}
    ${more('Warum stimmt die geometrische Summe?', `${box('ergaenzung', `<p>Setze ${M`S = 1 + \tfrac12 + \dots + \tfrac1{2^{n-1}}`}. Dann ist ${M`\tfrac12 S = \tfrac12 + \dots + \tfrac1{2^{n}}`}. Zieht man das ab, bleibt ${M`S - \tfrac12 S = 1 - \tfrac1{2^n}`}, also ${M`S = 2 - \tfrac{1}{2^{n-1}}`}. Im Skript kommt das allgemein als geometrische Reihe auf S. I.8.</p>`)}`)}
  `)}
  `;

  epsFigure(root.querySelector('#fig-eps'));
  eFigure(root.querySelector('#fig-e'));
}

/* ---------------- Figur: ε-Streifen ---------------- */
function epsFigure(host) {
  const N = 60;
  const examples = {
    harmonic: { ...EXAMPLES.harmonic, a: 0, ymin: -0.35, ymax: 1.1, epsMin: 0.03, epsMax: 0.6, eps0: 0.2 },
    alternating: { ...EXAMPLES.alternating, a: 1, ymin: -0.1, ymax: 2.1, epsMin: 0.13, epsMax: 0.8, eps0: 0.3 },
    sine: { ...EXAMPLES.sine, a: 0, ymin: -1.4, ymax: 1.4, epsMin: 0.1, epsMax: 1.2, eps0: 0.5 },
  };
  let ex = examples.harmonic;
  let eps = ex.eps0;

  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const epsSlider = slider({ label: M`\varepsilon =`, min: 0.03, max: 1.2, step: 0.01, value: eps, format: (v) => M([fmt(v, 2)]), onInput: (v) => { eps = v; draw(); } });
  const choose = buttonRow([
    { label: M`\tfrac1n`, onClick: () => select('harmonic') },
    { label: M`1 + \tfrac{(-1)^n}{\sqrt n}`, onClick: () => select('alternating') },
    { label: M`\sin(n\tfrac{\pi}{2})`, onClick: () => select('sine') },
  ]);
  choose.firstChild.classList.add('active');
  controls.append(choose, epsSlider);
  host.appendChild(controls);
  const box = document.createElement('div');
  host.appendChild(box);
  const readout = document.createElement('div');
  readout.className = 'readout';
  host.appendChild(readout);

  function select(key) {
    ex = examples[key];
    const input = epsSlider.querySelector('input');
    input.min = ex.epsMin; input.max = ex.epsMax;
    epsSlider.setValue(ex.eps0);
  }

  /** n0 für die aktuelle Folge. Sinus: jedes 4. Glied ist 1 (getestet), also gibt es für ε ≤ 1 kein n0. */
  function n0() {
    if (ex === examples.sine) return eps > 1 ? 1 : null;
    return firstIndexWithin(ex.f, ex.a, eps, 20000);
  }

  function draw() {
    box.innerHTML = '';
    const p = plot(box, { width: 680, height: 300, xmin: 0, xmax: N + 1, ymin: ex.ymin, ymax: ex.ymax });
    el('rect', { class: 'band', x: p.X(0), y: p.Y(ex.a + eps), width: p.X(N + 1) - p.X(0), height: p.Y(ex.a - eps) - p.Y(ex.a + eps) }, p.svg);
    el('line', { x1: p.X(0), x2: p.X(N + 1), y1: p.Y(ex.a), y2: p.Y(ex.a), class: 's-x dashed', 'stroke-width': 1 }, p.svg);
    axes(p, { xmin: 0, xmax: N + 1, ymin: ex.ymin, ymax: ex.ymax, xticks: [10, 20, 30, 40, 50, 60], yticks: ex === examples.sine ? [-1, 1] : ex.a === 1 ? [1, 2] : [0.5, 1], xlabel: 'n', ylabel: 'aₙ' });
    const k = n0();
    if (k !== null && k <= N) {
      el('line', { x1: p.X(k), x2: p.X(k), y1: p.Y(ex.ymin), y2: p.Y(ex.ymax), class: 's-angle dashed', 'stroke-width': 1.5 }, p.svg);
      text(p.svg, p.X(k) + 5, p.Y(ex.ymax) + 14, `n₀ = ${k}`, 'start', 't-angle');
    }
    for (let n = 1; n <= N; n++) {
      const v = ex.f(n);
      const inside = Math.abs(v - ex.a) < eps;
      el('circle', { cx: p.X(n), cy: p.Y(v), r: 3.6, class: inside ? 'dot-in' : 'dot-out' }, p.svg);
    }
    readout.innerHTML = k === null
      ? `Für ${M([`\\varepsilon = ${fmt(eps, 2)}`])} gibt es <b>kein</b> ${M`n_0`}: Immer wieder liegt ein Glied (${M`b_n = 1`} bei ${M`n = 1, 5, 9, \dots`}) ausserhalb. Keine Nullfolge.`
      : k > N
        ? `${M([`n_0 = ${k}`])} liegt rechts ausserhalb des Bildes. Es existiert, man muss nur weiter gehen.`
        : `Ab ${M([`n_0 = ${k}`])} liegen alle Glieder im Streifen ${M([`|${ex === examples.alternating ? 'c_n - 1' : ex === examples.sine ? 'b_n' : 'a_n'}| < ${fmt(eps, 2)}`])}.`;
  }
}

/* ---------------- Figur: Summe 1/k! unter der Schranke ---------------- */
function eFigure(host) {
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const box = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  let nMax = 6;
  controls.appendChild(slider({ label: M`n \le`, min: 1, max: 12, step: 1, value: nMax, format: (v) => M([String(v)]), onInput: (v) => { nMax = v; draw(); } }));
  host.append(controls, box, readout);

  function draw() {
    box.innerHTML = '';
    const p = plot(box, { width: 640, height: 280, xmin: 0, xmax: 12.8, ymin: 0, ymax: 3.3 });
    axes(p, { xmin: 0, xmax: 12.8, ymin: 0, ymax: 3.3, xticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], yticks: [1, 2, 3], xlabel: 'n' });
    el('line', { x1: p.X(0), x2: p.X(12.8), y1: p.Y(Math.E), y2: p.Y(Math.E), class: 's-dark dashed', 'stroke-width': 1 }, p.svg);
    text(p.svg, p.X(12.7), p.Y(Math.E) - 6, 'e', 'end', 'math');
    el('line', { x1: p.X(0), x2: p.X(12.8), y1: p.Y(3), y2: p.Y(3), class: 's-y dashed', 'stroke-width': 1 }, p.svg);
    for (let n = 1; n <= nMax; n++) {
      el('rect', { x: p.X(n) - 9, width: 8, y: p.Y(eSum(n)), height: p.Y(0) - p.Y(eSum(n)), class: 'fill-x', rx: 1.5 }, p.svg);
      el('rect', { x: p.X(n) + 1, width: 8, y: p.Y(eBound(n)), height: p.Y(0) - p.Y(eBound(n)), class: 'fill-y', rx: 1.5, opacity: 0.75 }, p.svg);
    }
    readout.innerHTML = `${M([`a_{${nMax}} = ${fmt(eSum(nMax), 6)}`])}, ${M([`c_{${nMax}} = ${fmt(eBound(nMax), 6)}`])}, ${M([`e - a_{${nMax}} = ${fmt(Math.E - eSum(nMax), 6)}`])}`;
  }
}
