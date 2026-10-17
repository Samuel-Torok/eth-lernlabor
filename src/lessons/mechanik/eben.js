import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider } from '../../ui/controls.js';
import { plot, el, text, arrowDefs } from '../../ui/svg.js';
import { planetary, rigidVelocity } from '../../math/vec.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Die meisten Maschinen bewegen sich in einer Ebene: Kurbeln, Räder, Leitern, Getriebe. Dann wird die allgemeine Bewegung viel einfacher: In jedem Augenblick dreht sich der Körper um einen einzigen Punkt, das <b>Momentanzentrum</b>. Wer diesen Punkt findet, kennt alle Geschwindigkeiten.</p>

  ${section('eben', '1. Ebene Bewegung ist momentan Translation oder Rotation', `
    ${box('vorlesung', `<p>Bahnkurven aller Punkte bleiben in parallelen Ebenen! Ebene ${M`E\parallel`} zur ${M`x`}-${M`y`}-Ebene, Punkt ${M`P\in E \Rightarrow \v v_P = (v_{Px},\ v_{Py},\ 0)`}, und Punkt ${M`A`} im gleichen Körper:</p>
      ${MD`\v v_A = \v v_P + \v\omega\times\overrightarrow{PA}:\qquad \begin{pmatrix}v_{Ax}\\v_{Ay}\\0\end{pmatrix} = \begin{pmatrix}v_{Px}\\v_{Py}\\0\end{pmatrix} + \begin{pmatrix}\omega_x\\\omega_y\\\omega_z\end{pmatrix}\times\begin{pmatrix}PA_x\\PA_y\\PA_z\end{pmatrix}`}`, { src: `${SRC} 26` })}
    ${steps([
      [M`v_{Az} = 0 = 0 + \omega_x\,PA_y - \omega_y\,PA_x \quad \forall\, PA_x, PA_y`, `Die ${M`z`}-Komponente der Gleichung. Links steht 0, weil auch ${M`A`} in seiner Ebene bleibt.`],
      [M`\Rightarrow \omega_x = \omega_y = 0`, `Die Gleichung muss für <em>alle</em> Punkte ${M`A`} gelten, also für beliebige ${M`PA_x, PA_y`}. Das geht nur, wenn beide Koeffizienten null sind.`],
      [M`\v\omega = \begin{pmatrix}0\\0\\\omega_z\end{pmatrix} \text{ (Rotation!) oder } \v\omega = \v 0 \text{ (Translation)}`, `${M`\v\omega`} steht senkrecht auf der Bewegungsebene, oder es dreht sich gar nichts.`],
    ])}
    ${box('vorlesung', `<p>Falls Rotation: ${M`\mu\perp`} Ebene ${M`E`}.</p>
      <p><b>Satz vom Momentanzentrum.</b> Bei jeder ebenen Bewegung eines starren Körpers ${M`K`} mit ${M`\v\omega\ne\v 0`} beschreibt der ebene Schnitt ${M`K_E`} von ${M`K`} in der Bewegungsebene ${M`E`} eine momentane Rotation um einen Punkt ${M`Z = \mu\cap E`}, der <b>Momentanzentrum</b> der ebenen Bewegung heisst. Das Momentanzentrum ${M`Z`} ist der einzige momentan ruhende Punkt des in Gedanken auf die ganze Ebene ${M`E`} ausgedehnten Körpers ${M`K_E`}. Die Geschwindigkeit ${M`\v v_M`} eines beliebigen Punktes ${M`M`} von ${M`K`} in ${M`E`} ist dann senkrecht zur Verbindungsgeraden mit dem Momentanzentrum ${M`Z`} und besitzt den durch den Drehsinn von ${M`\v\omega = \omega\,\v e_z = \dot\varphi\,\v e_z`} vorgeschriebenen Richtungssinn sowie den mit dem Abstand ${M`r`} von ${M`Z`} gebildeten Betrag ${M`v_M = \omega r`}.</p>`, { src: `${SRC} 26` })}
    ${box('merke', `<p><b>So findet man ${M`Z`}:</b> Kennt man die <em>Richtungen</em> der Geschwindigkeiten zweier Punkte, zeichnet man durch jeden Punkt die Senkrechte zu seiner Geschwindigkeit. ${M`Z`} ist der Schnittpunkt. Grund: ${M`\v v_M\perp\overrightarrow{ZM}`}, also liegt ${M`Z`} auf der Senkrechten zu ${M`\v v_M`} durch ${M`M`}.</p>`)}
    ${box('achtung', `<p>${M`Z`} muss kein Punkt des Körpers sein, er kann auch daneben liegen («in Gedanken auf die ganze Ebene ausgedehnt»). Und ${M`Z`} wandert: Er ist nur in <em>diesem</em> Augenblick in Ruhe. Beim rollenden Rad (Fig. 3.20) ist ${M`Z`} der Berührpunkt, darum gilt dort ${M`\v v_P\perp\overrightarrow{ZP}`}, ${M`v_P = \omega\cdot|\overrightarrow{ZP}|`} und ${M`v_O = \omega R`}.</p>`)}
  `)}

  ${section('leiter', '2. Beispiel: Leiter, geführte ebene Bewegung', `
    ${box('vorlesung', `<p><b>Beispiel.</b> Leiter der Länge ${M`L`}, unten ${M`A`} auf dem Boden, oben ${M`B`} an der Wand, Winkel ${M`\varphi`} am Boden. Aus SdpG: ${M`v_V = v_H\cdot\frac{1}{\tan\varphi}`}. Löse mit SMZ (Satz vom Momentanzentrum).</p>`, { src: `${SRC} 27` })}
    ${steps([
      [M`Z = \text{Senkrechte zu } \v v_A \text{ durch } A \;\cap\; \text{Senkrechte zu } \v v_B \text{ durch } B`, `${M`A`} gleitet waagrecht, also ist die Senkrechte durch ${M`A`} vertikal. ${M`B`} gleitet senkrecht, die Senkrechte durch ${M`B`} ist horizontal. ${M`Z`} liegt «über ${M`A`}, auf Höhe von ${M`B`}».`],
      [M`|\overrightarrow{ZA}| = L\sin\varphi,\qquad |\overrightarrow{ZB}| = L\cos\varphi`, 'Die Leiter ist die Diagonale des Rechtecks aus Z, A, B und der Wandecke.'],
      [M`v_H = \omega\,L\sin\varphi,\qquad v_V = \omega\,L\cos\varphi`, `Beide Punkte drehen momentan um ${M`Z`}: Betrag = ${M`\omega`} mal Abstand.`],
      [M`\frac{v_V}{v_H} = \frac{\cos\varphi}{\sin\varphi} \;\Rightarrow\; v_V = v_H\cdot\frac{1}{\tan\varphi}`, 'Dividieren, ω kürzt sich. Gleiches Ergebnis wie mit dem SdpG.'],
    ])}
    ${figure('fig-ladder', `Die Leiter mit Momentanzentrum ${M`Z`} (violett). Die dünnen Linien von ${M`Z`} zu den Punkten der Leiter stehen senkrecht auf den Geschwindigkeiten (magenta). Weiter weg von ${M`Z`} heisst schneller. Der Punkt der Leiter, der ${M`Z`} am nächsten ist, ist der langsamste.`, { wide: true })}
  `)}

  ${section('getriebe', '3. Beispiel: Planetengetriebe', `
    ${box('vorlesung', `<p><b>Figur 3.21: Planetengetriebe.</b> 1 Sonnenrad (Radius ${M`R_1`}, ${M`Z_1\equiv O`}, ${M`\omega_1`}), 2 Hohlrad (${M`R_2`}, ${M`Z_2\equiv O`}, ${M`\omega_2`}), 3 Planetenrad (${M`R_3`}, Momentanzentrum ${M`Z_3`}, ${M`\omega_3`}), Arm (Länge ${M`L`}, ${M`Z_A\equiv O`}, ${M`\omega`}). Geometrie:</p>
      ${MD`R_3 = \tfrac12(R_2 - R_1),\qquad L = R_1 + R_3 = \tfrac12(R_2 + R_1).`}`, { src: `${SRC} 28` })}
    <p><b>So rechnet man das</b>: Jedes Rad ist ein starrer Körper in ebener Bewegung. Sonnenrad, Hohlrad und Arm drehen um den festen Punkt ${M`O`}. Das Planetenrad rollt zwischen Sonnenrad (Berührpunkt ${M`P`}) und Hohlrad (Berührpunkt ${M`Q`}). Rollen heisst: Am Berührpunkt haben beide Räder dieselbe Geschwindigkeit.</p>
    ${steps([
      [M`v_P = R_1\omega_1,\qquad v_Q = R_2\omega_2`, `${M`P`} gehört auch zum Sonnenrad (Abstand ${M`R_1`} von ${M`O`}), ${M`Q`} auch zum Hohlrad (Abstand ${M`R_2`}).`],
      [M`v_{O'} = \tfrac12(v_P + v_Q)`, `${M`O'`} (Mitte des Planetenrads) liegt genau zwischen ${M`P`} und ${M`Q`}, und im Planetenrad wächst die Geschwindigkeit linear mit dem Abstand zu ${M`Z_3`}.`],
      [M`v_{O'} = L\,\omega \;\Rightarrow\; \omega = \frac{R_1\omega_1 + R_2\omega_2}{R_1 + R_2}`, `${M`O'`} gehört auch zum Arm, der um ${M`O`} dreht. Mit ${M`L = \frac12(R_1 + R_2)`}.`],
    ])}
    ${box('ergaenzung', `<p>Diese Rechnung steht nicht in der Mitschrift (dort nur Figur und Geometrie). Geprüft in <code>vec.test.js</code> mit der Grundgleichung. Ausserdem ${M`\omega_3 = \frac{R_2\omega_2 - R_1\omega_1}{R_2 - R_1}`}.</p>`)}
    ${figure('fig-planet', `Stelle ${M`\omega_1`} (Sonnenrad) und ${M`\omega_2`} (Hohlrad) ein. Die Pfeile zeigen die Geschwindigkeiten entlang der senkrechten Linie ${M`O`}–${M`Q`}. Sie liegen auf zwei Geraden: im Sonnen- und Hohlrad durch ${M`O`}, im Planetenrad durch das Momentanzentrum ${M`Z_3`} (violett). Steht das Hohlrad still (${M`\omega_2 = 0`}), liegt ${M`Z_3`} genau bei ${M`Q`}.`, { wide: true })}
  `)}
  `;
  ladderFigure(root.querySelector('#fig-ladder'));
  planetFigure(root.querySelector('#fig-planet'));
}

function ladderFigure(host) {
  const L = 3, vA = 0.9;
  let deg = 50;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.appendChild(slider({ label: M`\varphi =`, min: 20, max: 75, step: 1, value: deg, format: (v) => M([`${v}^\\circ`]), onInput: (v) => { deg = v; draw(); } }));
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 560, height: 380, xmin: -1.6, xmax: 3.4, ymin: -0.6, ymax: 3.4, pad: 10 });
    p.svg.style.maxWidth = '560px';
    arrowDefs(p.svg);
    const phi = (deg * Math.PI) / 180;
    const xw = L * Math.cos(phi); // Wand bei x = xw
    const A = [0, 0, 0], B = [xw, L * Math.sin(phi), 0], Z = [0, B[1], 0];
    const w = [0, 0, -vA / (L * Math.sin(phi))]; // A gleitet nach links (weg von der Wand), Leiter dreht im Uhrzeigersinn
    el('line', { x1: p.X(-1.6), y1: p.Y(0), x2: p.X(xw), y2: p.Y(0), class: 's-dark', 'stroke-width': 1.5 }, p.svg);
    el('line', { x1: p.X(xw), y1: p.Y(0), x2: p.X(xw), y2: p.Y(3.4), class: 's-dark', 'stroke-width': 1.5 }, p.svg);
    el('rect', { x: p.X(0), y: p.Y(B[1]), width: p.X(xw) - p.X(0), height: p.Y(0) - p.Y(B[1]), fill: 'none', class: 's-dark dashed', 'stroke-width': 0.8, opacity: 0.6 }, p.svg);
    el('line', { x1: p.X(A[0]), y1: p.Y(A[1]), x2: p.X(B[0]), y2: p.Y(B[1]), class: 's-dark', 'stroke-width': 5, 'stroke-linecap': 'round' }, p.svg);
    const k = 1.1;
    for (let i = 0; i <= 6; i++) {
      const s = i / 6, P = [s * B[0], s * B[1], 0];
      const v = rigidVelocity([0, 0, 0], w, Z, P);
      el('line', { x1: p.X(Z[0]), y1: p.Y(Z[1]), x2: p.X(P[0]), y2: p.Y(P[1]), class: 's-angle', 'stroke-width': 0.8, opacity: 0.5 }, p.svg);
      if (Math.hypot(v[0], v[1]) > 0.02) el('line', { x1: p.X(P[0]), y1: p.Y(P[1]), x2: p.X(P[0] + k * v[0]), y2: p.Y(P[1] + k * v[1]), class: 's-vel', 'stroke-width': i % 6 === 0 ? 3 : 1.8, 'marker-end': 'url(#arr-vel)' }, p.svg);
    }
    el('circle', { cx: p.X(Z[0]), cy: p.Y(Z[1]), r: 6, class: 'fill-angle' }, p.svg);
    text(p.svg, p.X(Z[0]) - 10, p.Y(Z[1]) - 8, 'Z', 'end', 'math t-angle');
    for (const [P, n] of [[A, 'A'], [B, 'B']]) { el('circle', { cx: p.X(P[0]), cy: p.Y(P[1]), r: 5, class: 'fill-point' }, p.svg); }
    text(p.svg, p.X(A[0]) + 6, p.Y(0) + 18, 'A', 'start', 'math t-point');
    text(p.svg, p.X(B[0]) + 10, p.Y(B[1]) + 4, 'B', 'start', 'math t-point');
    const vB = vA / Math.tan(phi);
    readout.innerHTML = `${M([`\\omega = \\frac{v_H}{L\\sin\\varphi} = ${fmt(Math.abs(w[2]), 3)}`])}, ${M([`v_V = \\omega L\\cos\\varphi = ${fmt(vB, 3)} = \\frac{v_H}{\\tan\\varphi}`])}`;
  }
  draw();
}

function planetFigure(host) {
  const R1 = 1, R2 = 3;
  const s = { w1: 1, w2: 0 };
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.append(
    slider({ label: M`\omega_1 =`, min: -1.5, max: 1.5, step: 0.1, value: s.w1, format: (v) => M([fmt(v, 1)]), onInput: (v) => { s.w1 = v; draw(); } }),
    slider({ label: M`\omega_2 =`, min: -1, max: 1, step: 0.1, value: s.w2, format: (v) => M([fmt(v, 1)]), onInput: (v) => { s.w2 = v; draw(); } }),
  );
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 520, height: 460, xmin: -3.8, xmax: 3.8, ymin: -3.4, ymax: 3.4, pad: 6 });
    p.svg.style.maxWidth = '520px';
    arrowDefs(p.svg);
    const g = planetary(R1, R2, s.w1, s.w2);
    const r = (rr) => p.X(rr) - p.X(0);
    el('circle', { cx: p.X(0), cy: p.Y(0), r: r(R2), fill: 'none', class: 's-dark', 'stroke-width': 3 }, p.svg);
    el('circle', { cx: p.X(0), cy: p.Y(0), r: r(R1), class: 'fill-point', opacity: 0.25 }, p.svg);
    el('circle', { cx: p.X(0), cy: p.Y(0), r: r(R1), fill: 'none', class: 's-point', 'stroke-width': 1.5 }, p.svg);
    el('circle', { cx: p.X(0), cy: p.Y(g.L), r: r(g.R3), class: 'fill-rho', opacity: 0.25 }, p.svg);
    el('circle', { cx: p.X(0), cy: p.Y(g.L), r: r(g.R3), fill: 'none', class: 's-rho', 'stroke-width': 1.5 }, p.svg);
    el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(0), y2: p.Y(g.L), class: 's-y', 'stroke-width': 7, opacity: 0.6, 'stroke-linecap': 'round' }, p.svg);
    // Geschwindigkeiten entlang der y-Achse: Punkte im Sonnenrad (0..R1), Planetenrad (R1..R2)
    const k = 0.8;
    const vel = (y) => (y <= R1 ? -y * s.w1 : -(R1 * s.w1) - g.w3 * (y - R1)); // x-Komponente
    for (let y = 0.25; y <= R2 + 1e-9; y += 0.25) {
      const v = vel(y);
      if (Math.abs(v) > 0.02) el('line', { x1: p.X(0), y1: p.Y(y), x2: p.X(k * v), y2: p.Y(y), class: 's-vel', 'stroke-width': 1.8, 'marker-end': 'url(#arr-vel)' }, p.svg);
    }
    const lab = (y, t, cls = '') => text(p.svg, p.X(0) + 8, p.Y(y) + 4, t, 'start', `math ${cls}`);
    lab(0, 'O'); lab(R1, 'P'); lab(g.L, "O'"); lab(R2, 'Q');
    // Momentanzentrum des Planetenrads: v = 0 auf der Linie y in [R1, R2] oder Verlängerung
    if (Math.abs(g.w3) > 1e-9) {
      const yZ = R1 - (R1 * s.w1) / g.w3;
      if (yZ > -3.4 && yZ < 3.4) {
        el('circle', { cx: p.X(0), cy: p.Y(yZ), r: 6, class: 'fill-angle' }, p.svg);
        text(p.svg, p.X(0) - 10, p.Y(yZ) + 4, 'Z_3', 'end', 'math t-angle');
      }
    }
    readout.innerHTML = `${M([`\\omega_{\\text{Arm}} = \\frac{R_1\\omega_1 + R_2\\omega_2}{R_1 + R_2} = ${fmt(g.w, 3)}`])}, ${M([`\\omega_3 = ${fmt(g.w3, 3)}`])} &nbsp; (${M`R_1 = 1,\ R_2 = 3`})`;
  }
  draw();
}
