import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider } from '../../ui/controls.js';
import { plot, el, text, arrowDefs } from '../../ui/svg.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Ein starrer Körper verformt sich nicht. Aus dieser einen Eigenschaft folgt ein erstaunlich nützlicher Satz: Zwei Punkte des Körpers haben entlang ihrer Verbindungslinie immer dieselbe Geschwindigkeit. Mit diesem <b>Satz der projizierten Geschwindigkeiten (SdpG)</b> rechnet man aus einer bekannten Geschwindigkeit die nächste aus.</p>

  ${section('starr', '1. Was heisst «starr»?', `
    ${box('vorlesung', `<p><b>Eigenschaften:</b> Abstand zwischen 2 beliebigen Punkten konstant. Winkel zwischen Verbindungsvektoren konstant. Also keine Gestaltänderung, keine Volumenänderung, keine Deformation.</p>
      ${MD`\v a = \overrightarrow{MM'},\quad \v b = \overrightarrow{MM''}:\qquad |\v a(t_1)| = |\v a(t_2)|,\quad |\v b(t_1)| = |\v b(t_2)|,\quad \alpha(t_1) = \alpha(t_2)`}
      <p>für alle ${M`t_1, t_2`} und alle Punkte. Im Allgemeinen ist aber ${M`\v a(t_1) \ne \v a(t_2)`}: Die <em>Richtung</em> darf sich ändern. Damit ist ${M`\v a\cdot\v b = |\v a|\,|\v b|\cos\alpha`} konstant.</p>`, { src: `${SRC} 12` })}
    <p><b>In Worten:</b> Die Pfeile zwischen Punkten des Körpers dürfen sich drehen, aber nicht länger, kürzer oder gegeneinander verdreht werden. Ein Stein ist (fast) starr, ein Gummiball nicht.</p>
  `)}

  ${section('satz', '2. Der Satz der projizierten Geschwindigkeiten', `
    ${box('intuition', `<p>Zwei Personen halten die Enden einer Stange. Läuft die vordere schneller <em>in Richtung der Stange</em> als die hintere, würde die Stange länger: unmöglich. Senkrecht zur Stange dürfen sie sich verschieden bewegen (dann dreht sich die Stange). Nur der Anteil <em>entlang</em> der Stange muss gleich sein.</p>`)}
    ${box('vorlesung', `<p><b>Beweis des SdpG.</b> Betrachte ${M`\v a(t)\cdot\v a(t) = |\v a|^2`}: konstant.</p>`, { src: `${SRC} 12` })}
    ${steps([
      [M`\v a\cdot\v a = \text{konst.} \;\Rightarrow\; (\v a\cdot\v a)^{\boldsymbol\cdot} = 0`, 'Die Ableitung einer Konstanten ist null.'],
      [M`\v a\cdot\dot{\v a} + \dot{\v a}\cdot\v a = 2\,(\v a\cdot\dot{\v a}) = 0`, `Produktregel für das Skalarprodukt. Beide Summanden sind gleich, weil das Skalarprodukt symmetrisch ist.`],
      [M`\v a = \v r_N - \v r_M,\quad \dot{\v a} = \v v_N - \v v_M`, `${M`\v a`} ist der Pfeil von ${M`M`} nach ${M`N`}. Ableiten gibt die Differenz der Geschwindigkeiten.`],
      [M`\v a\cdot(\v v_N - \v v_M) = 0 \;\Rightarrow\; \v v_N\cdot\v a = \v v_M\cdot\v a \;\Rightarrow\; v'_N = v'_M`, `Ausmultiplizieren. ${M`v'`} bezeichnet die Projektion der Geschwindigkeit auf die Verbindungslinie ${M`MN`}.`],
    ])}
    ${box('merke', `<p><b>SdpG:</b> Für zwei beliebige Punkte ${M`M, N`} eines starren Körpers sind die Projektionen ihrer Geschwindigkeiten auf die Gerade ${M`MN`} gleich.</p>`)}
    ${box('achtung', `<p>Der SdpG sagt nichts über die Anteile <em>senkrecht</em> zu ${M`MN`}. Daraus allein folgt also nicht ${M`\v v_N = \v v_M`}. Gleiche Geschwindigkeiten haben alle Punkte nur bei einer Translation (nächste Lektion).</p>`)}
  `)}

  ${section('leiter', '3. Beispiel: gleitende Leiter', `
    ${box('vorlesung', `<p><b>Beispiel: gleitende Leiter.</b> Eine Leiter der Länge ${M`L`} lehnt an einer Wand. Das untere Ende ${M`A`} gleitet mit ${M`\v v_A`} über den Boden, das obere Ende ${M`B`} an der Wand nach unten. Winkel ${M`\varphi`} zwischen Leiter und Boden.</p>`, { src: `${SRC} 13` })}
    <p><b>Lösung mit dem SdpG.</b> ${M`A`} bewegt sich nur waagrecht, ${M`B`} nur senkrecht (beide bleiben auf Boden bzw. Wand). Beide Geschwindigkeiten projiziert man auf die Leiterrichtung ${M`\v e_{AB} = (-\cos\varphi,\ \sin\varphi)`}:</p>
    ${MD`\v v_A\cdot\v e_{AB} = v_A\cos\varphi \quad(\text{Betrag}),\qquad \v v_B\cdot\v e_{AB} = v_B\sin\varphi \;\;\Rightarrow\;\; v_B = v_A\,\frac{\cos\varphi}{\sin\varphi} = \frac{v_A}{\tan\varphi}`}
    ${figure('fig-ladder', `Die Leiter (dunkel) mit den Geschwindigkeiten ihrer Enden (magenta). Die violetten Stücke entlang der Leiter sind die Projektionen: Sie sind immer gleich lang. Wird ${M`\varphi`} klein (Leiter fast flach), muss ${M`B`} sehr schnell fallen, damit der Anteil entlang der Leiter gleich bleibt.`, { wide: true })}
    ${box('ergaenzung', `<p>Gegenprobe ohne SdpG (in <code>vec.test.js</code>): Mit ${M`x_A = L\cos\varphi`}, ${M`y_B = L\sin\varphi`} folgt ${M`\dot x_A = -L\sin\varphi\,\dot\varphi`} und ${M`\dot y_B = L\cos\varphi\,\dot\varphi`}, also ${M`|\dot y_B| = |\dot x_A|/\tan\varphi`}. Dasselbe Ergebnis.</p>`)}
  `)}
  `;
  ladderFigure(root.querySelector('#fig-ladder'));
}

function ladderFigure(host) {
  const L = 3, vA = 0.9;
  let phiDeg = 55;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.appendChild(slider({ label: M`\varphi =`, min: 15, max: 80, step: 1, value: phiDeg, format: (v) => M([`${v}^\\circ`]), onInput: (v) => { phiDeg = v; draw(); } }));
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 560, height: 360, xmin: -0.6, xmax: 4.6, ymin: -0.9, ymax: 3.6, pad: 10 });
    p.svg.style.maxWidth = '560px';
    arrowDefs(p.svg);
    const phi = (phiDeg * Math.PI) / 180;
    const A = [L * Math.cos(phi), 0], B = [0, L * Math.sin(phi)];
    const vB = vA / Math.tan(phi);
    const e = [-Math.cos(phi), Math.sin(phi)]; // von A nach B
    const proj = vA * Math.cos(phi); // Betrag der Projektion (A bewegt sich nach rechts, weg von B)
    // Boden und Wand
    el('line', { x1: p.X(-0.6), y1: p.Y(0), x2: p.X(4.6), y2: p.Y(0), class: 's-dark', 'stroke-width': 1.5 }, p.svg);
    el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(0), y2: p.Y(3.6), class: 's-dark', 'stroke-width': 1.5 }, p.svg);
    for (let i = 0; i < 14; i++) el('line', { x1: p.X(-0.5 + i * 0.35), y1: p.Y(0), x2: p.X(-0.65 + i * 0.35), y2: p.Y(-0.15), class: 's-dark', 'stroke-width': 0.7 }, p.svg);
    el('line', { x1: p.X(A[0]), y1: p.Y(A[1]), x2: p.X(B[0]), y2: p.Y(B[1]), class: 's-dark', 'stroke-width': 5, 'stroke-linecap': 'round' }, p.svg);
    const k = 1.2;
    const arrow = (P, V, cls) => el('line', { x1: p.X(P[0]), y1: p.Y(P[1]), x2: p.X(P[0] + k * V[0]), y2: p.Y(P[1] + k * V[1]), class: `s-${cls}`, 'stroke-width': 3, 'marker-end': `url(#arr-${cls})` }, p.svg);
    arrow(A, [vA, 0], 'vel');
    arrow(B, [0, -Math.min(vB, 2.6)], 'vel');
    // Projektionen auf die Leiterrichtung (beide zeigen von B weg Richtung A, also −e)
    const pr = [-e[0] * proj, -e[1] * proj];
    el('line', { x1: p.X(A[0]), y1: p.Y(A[1]) + 0, x2: p.X(A[0] + k * pr[0]), y2: p.Y(A[1] + k * pr[1]), class: 's-angle', 'stroke-width': 6, opacity: 0.8 }, p.svg);
    el('line', { x1: p.X(B[0]), y1: p.Y(B[1]), x2: p.X(B[0] + k * pr[0]), y2: p.Y(B[1] + k * pr[1]), class: 's-angle', 'stroke-width': 6, opacity: 0.8 }, p.svg);
    el('line', { x1: p.X(A[0] + k * vA), y1: p.Y(0), x2: p.X(A[0] + k * pr[0]), y2: p.Y(k * pr[1]), class: 's-dark dashed', 'stroke-width': 1 }, p.svg);
    el('line', { x1: p.X(0), y1: p.Y(B[1] - k * Math.min(vB, 2.6)), x2: p.X(B[0] + k * pr[0]), y2: p.Y(B[1] + k * pr[1]), class: 's-dark dashed', 'stroke-width': 1 }, p.svg);
    el('circle', { cx: p.X(A[0]), cy: p.Y(A[1]), r: 5, class: 'fill-point' }, p.svg);
    el('circle', { cx: p.X(B[0]), cy: p.Y(B[1]), r: 5, class: 'fill-point' }, p.svg);
    text(p.svg, p.X(A[0]) - 6, p.Y(0) + 20, 'A', 'middle', 'math t-point');
    text(p.svg, p.X(0) - 14, p.Y(B[1]) + 4, 'B', 'middle', 'math t-point');
    text(p.svg, p.X(A[0] + k * vA) + 4, p.Y(0) - 8, 'v_A', 'start', 'math t-vel');
    text(p.svg, p.X(0) + 8, p.Y(B[1] - k * Math.min(vB, 2.6)) + 4, 'v_B', 'start', 'math t-vel');
    // Winkelbogen
    const ar = 0.55;
    el('path', { d: `M${p.X(A[0] - ar)},${p.Y(0)} A${p.X(ar) - p.X(0)},${p.X(ar) - p.X(0)} 0 0 1 ${p.X(A[0] - ar * Math.cos(phi))},${p.Y(ar * Math.sin(phi))}`, class: 's-angle', fill: 'none', 'stroke-width': 1.5 }, p.svg);
    text(p.svg, p.X(A[0] - ar - 0.25), p.Y(0.18), 'φ', 'middle', 'math t-angle');
    readout.innerHTML = `${M([`v_A = ${fmt(vA, 2)}`])}, ${M([`v_B = v_A/\\tan\\varphi = ${fmt(vB, 2)}`])}. Projektion auf die Leiter: ${M([`v_A\\cos\\varphi = ${fmt(vA * Math.cos(phi), 3)}`])} und ${M([`v_B\\sin\\varphi = ${fmt(vB * Math.sin(phi), 3)}`])}.`;
  }
  draw();
}
