import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider } from '../../ui/controls.js';
import { plot, el, text, arrowDefs } from '../../ui/svg.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Ein Fachwerk ist ein Gerüst aus geraden Stäben, die in Gelenken verbunden sind: Brücken, Kräne, Dachträger. Kinematisch ist jeder Stab ein eigener starrer Körper. Die Frage dieses Abschnitts: Wie bewegen sich die Stäbe, wenn sich ein Lager bewegt? Das wichtigste Werkzeug dafür ist die <b>Parallelogrammregel</b>.</p>

  ${section('def', '1. Ebene, ideale Fachwerke', `
    ${box('vorlesung', `<p>Fachwerke bestehen aus Stäben, welche in Knotenpunkten verbunden sind. Hier: ebene, ideale Fachwerke.</p>
      <p><b>Eigenschaften:</b></p><ul>
      <li>Stäbe und Bahnkurven aller Punkte in einer Ebene</li>
      <li>Stäbe sind in Knotenpunkten frei drehbar</li>
      <li>Stäbe sind starre Körper</li></ul>
      <p><b>Bsp. Fig. 3.24:</b> Ein Fachwerk mit den Knoten ${M`A, \dots, F`} und den Stäben 1 bis 9, links in ${M`A`} drehbar an der Wand gelagert, rechts in ${M`B`} auf einem Rollenlager, das sich mit ${M`\v v`} verschiebt.</p>`, { src: `${SRC} 29` })}
    <p><b>Was folgt daraus für die Kinematik?</b> Jeder Stab ist ein starrer Körper in ebener Bewegung. Also gilt für jeden Stab der SdpG: Die beiden Endknoten haben entlang des Stabs dieselbe Geschwindigkeitskomponente. Und jeder Stab hat (falls er sich dreht) ein eigenes Momentanzentrum.</p>
    ${box('merke', `<p>Ein Knoten, der an einem festen Gelenk hängt (wie ${M`A`}), ruht. Ein Stab, der an einem ruhenden Knoten hängt, kann sich also nur um diesen drehen: Seine Geschwindigkeiten stehen senkrecht auf dem Stab.</p>`)}
    ${box('achtung', `<p>Das Beispiel auf S. 30 (Fachwerk mit ${M`\overline{AC} = L`}, ${M`\overline{AD} = \sqrt2L`} und Stab 7 mit einer Kraft bei ${M`B`}) ist in der Mitschrift nicht gelöst. Hier wird es deshalb nicht vorgerechnet.</p>`)}
  `)}

  ${section('parallelogramm', '2. Die Parallelogrammregel', `
    ${box('vorlesung', `<p><b>Parallelogrammregel</b> (Fig. 3.25): Vier Stäbe bilden ein Parallelogramm ${M`ABCD`} mit den Seiten ${M`a = \overline{AB} = \overline{DC}`} und ${M`b = \overline{BC} = \overline{AD}`}. Die Stäbe drehen mit ${M`\v\omega_1`} (${M`AB`}), ${M`\v\omega_2`} (${M`BC`}), ${M`\v\omega_3`} (${M`DC`}), ${M`\v\omega_4`} (${M`AD`}). Dann gilt</p>
      ${MD`\v\omega_2 = \v\omega_4,\qquad \v\omega_1 = \v\omega_3.`}`, { src: `${SRC} 31` })}
    <p><b>In Worten:</b> Gegenüberliegende Seiten eines Parallelogramms drehen sich gleich schnell. Darum bleibt ein Parallelogramm-Gestänge immer ein Parallelogramm, und die Koppelstange einer Parallelführung (z.B. Schreibtischlampe, Hebebühne) behält ihre Richtung, wenn die Seitenstäbe still stehen.</p>
    <p><b>Beweis</b> (S. 31): Viermal die Grundgleichung, einmal ringsum.</p>
    ${steps([
      [M`\v v_A = \v v_B + \v\omega_1\times\overrightarrow{BA},\quad \v v_B = \v v_C + \v\omega_2\times\overrightarrow{CB},\quad \v v_C = \v v_D + \v\omega_3\times\overrightarrow{DC},\quad \v v_D = \v v_A + \v\omega_4\times\overrightarrow{AD}`, `Grundgleichung für jeden Stab, jeweils mit seinem eigenen ${M`\v\omega`}.`],
      [M`\v v_A = \v v_A + \v\omega_4\times\overrightarrow{AD} + \v\omega_3\times\overrightarrow{DC} + \v\omega_2\times\overrightarrow{CB} + \v\omega_1\times\overrightarrow{BA}`, `Nacheinander einsetzen: von ${M`A`} über ${M`B, C, D`} wieder zurück zu ${M`A`}.`],
      [M`\overrightarrow{AD} = \overrightarrow{BC} = -\overrightarrow{CB},\qquad \overrightarrow{DC} = \overrightarrow{AB} = -\overrightarrow{BA}`, 'Im Parallelogramm sind gegenüberliegende Seiten gleiche Vektoren.'],
      [M`\v v_A = \v v_A + (\v\omega_4 - \v\omega_2)\times\overrightarrow{BC} + (\v\omega_3 - \v\omega_1)\times\overrightarrow{AB}`, 'Zusammenfassen.'],
      [M`\Rightarrow \v\omega_4 = \v\omega_2,\quad \v\omega_3 = \v\omega_1 \quad\text{q.e.d.}`, `Die Summe muss ${M`\v 0`} sein. In der Ebene stehen alle ${M`\v\omega`} senkrecht zur Ebene, und ${M`\overrightarrow{BC}`}, ${M`\overrightarrow{AB}`} zeigen in verschiedene Richtungen. Die zwei Kreuzprodukte können sich also nur aufheben, wenn beide null sind.`],
    ])}
    ${figure('fig-para', `Ein Parallelogramm-Gestänge: ${M`A`} und ${M`B`} sind feste Gelenke, die Seitenstäbe ${M`AD`} und ${M`BC`} drehen. Die Koppel ${M`DC`} verschiebt sich nur (${M`\omega_3 = \omega_1 = 0`}), und alle ihre Punkte haben dieselbe Geschwindigkeit (magenta). Die Seitenstäbe drehen gleich schnell (${M`\omega_2 = \omega_4`}).`, { wide: true })}
  `)}
  `;
  paraFigure(root.querySelector('#fig-para'));
}

function paraFigure(host) {
  const a = 2.6, b = 1.6, w = 0.6;
  let deg = 60;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.appendChild(slider({ label: M`\text{Winkel bei } A =`, min: 20, max: 160, step: 1, value: deg, format: (v) => M([`${v}^\\circ`]), onInput: (v) => { deg = v; draw(); } }));
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 560, height: 300, xmin: -1.8, xmax: 4.6, ymin: -0.6, ymax: 2.6, pad: 8 });
    p.svg.style.maxWidth = '560px';
    arrowDefs(p.svg);
    const t = (deg * Math.PI) / 180;
    const A = [0, 0], B = [a, 0], D = [b * Math.cos(t), b * Math.sin(t)], C = [a + D[0], D[1]];
    const bar = (P, Q, cls, wd = 5) => el('line', { x1: p.X(P[0]), y1: p.Y(P[1]), x2: p.X(Q[0]), y2: p.Y(Q[1]), class: cls, 'stroke-width': wd, 'stroke-linecap': 'round' }, p.svg);
    bar(A, B, 's-dark', 3); bar(A, D, 's-x'); bar(B, C, 's-x'); bar(D, C, 's-y');
    for (const P of [A, B]) for (let i = 0; i < 5; i++) el('line', { x1: p.X(P[0] - 0.25 + i * 0.12), y1: p.Y(-0.12), x2: p.X(P[0] - 0.33 + i * 0.12), y2: p.Y(-0.24), class: 's-dark', 'stroke-width': 0.8 }, p.svg);
    // Geschwindigkeit der Koppelpunkte: v = ω × AD (für alle gleich)
    const v = [-w * D[1], w * D[0]];
    const k = 1;
    for (let s = 0; s <= 1.0001; s += 0.25) {
      const P = [D[0] + s * a, D[1]];
      el('line', { x1: p.X(P[0]), y1: p.Y(P[1]), x2: p.X(P[0] + k * v[0]), y2: p.Y(P[1] + k * v[1]), class: 's-vel', 'stroke-width': 2, 'marker-end': 'url(#arr-vel)' }, p.svg);
    }
    for (const [P, n] of [[A, 'A'], [B, 'B'], [C, 'C'], [D, 'D']]) {
      el('circle', { cx: p.X(P[0]), cy: p.Y(P[1]), r: 5, style: 'fill: var(--panel); stroke: var(--dark); stroke-width: 2' }, p.svg);
      text(p.svg, p.X(P[0]) + (P[1] > 0.1 ? 8 : -12), p.Y(P[1]) + (P[1] > 0.1 ? -8 : -8), n, 'start', 'math');
    }
    readout.innerHTML = `${M([`\\omega_4 = \\omega_2 = ${fmt(w, 1)},\\quad \\omega_1 = \\omega_3 = 0`])}. Alle Punkte der Koppel: ${M([`|\\v v| = \\omega_4\\cdot b = ${fmt(w * b, 2)}`])}.`;
  }
  draw();
}
