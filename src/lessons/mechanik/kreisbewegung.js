import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider } from '../../ui/controls.js';
import { scene } from '../../ui/svg3d.js';
import { cylBasis, add, sub, scale, cross } from '../../math/vec.js';
import { cylToCart } from '../../math/coords.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Die Kreisbewegung ist der wichtigste Spezialfall: Alles, was später beim starren Körper rotiert, bewegt sich auf Kreisen. Hier entsteht die Formel ${M`\v v = \v\omega \times \v r`}, die bis zum Ende der Vorlesung überall vorkommt.</p>

  ${section('kreis', '1. Kreisbewegung in Zylinderkoordinaten', `
    ${box('vorlesung', `<p>${M`\rho = R`}, ${M`\varphi = \varphi(t)`}, ${M`z = z_0`}. In zylindrischer Basis: ${M`\v r(t) = R\,\v e_\rho + z_0\,\v e_z`} mit ${M`\v e_\rho\big(\varphi(t)\big)`}.</p>
      ${MD`\v v = \dot\rho\,\v e_\rho + \rho\dot\varphi\,\v e_\varphi + \dot z\,\v e_z = R\dot\varphi\,\v e_\varphi \quad\text{: tangential zum Kreis}, \qquad \dot s = R\dot\varphi,\quad \v\tau = \v e_\varphi`}
      <p>${M`\dot\varphi`}: Winkelschnelligkeit in ${M`\mathrm{rad/s}`}. «Winkelgeschwindigkeit»: ${M`\v\omega = \dot\varphi\,\v e_z`}.</p>`, { src: `${SRC} 11` })}
    <p><b>Warum fallen zwei Terme weg?</b> ${M`\rho = R`} ist konstant, also ${M`\dot\rho = 0`}. ${M`z = z_0`} ist konstant, also ${M`\dot z = 0`}. Übrig bleibt nur der Term, der von der Drehung kommt.</p>
    ${box('achtung', `<p>Das Skript warnt: ${M`\v r`} hat in der Zylinderbasis die Komponenten ${M`(R,\ 0,\ z_0)`}, <b>nicht</b> ${M`(R,\ \varphi,\ z_0)`}. Der Winkel steckt in der Richtung von ${M`\v e_\rho`}, nicht in einer Komponente.</p>`)}
    ${box('intuition', `<p>${M`\v\omega`} ist ein Pfeil entlang der Drehachse. Seine Länge sagt, wie schnell es dreht. Seine Richtung folgt der Rechte-Hand-Regel: Krümme die Finger der rechten Hand in Drehrichtung, dann zeigt der Daumen in Richtung ${M`\v\omega`}.</p>`)}
  `)}

  ${section('omega', `2. Umformung: ${M`\v v = \v\omega \times \v r`}`, `
    <p>Die Herleitung aus dem Skript (S. 11), Schritt für Schritt:</p>
    ${steps([
      [M`\v e_\varphi = \v e_z \times \v e_\rho \;\Rightarrow\; \v v = R\dot\varphi\,(\v e_z \times \v e_\rho) = \dot\varphi\,\v e_z \times R\,\v e_\rho`, `${M`\v e_z, \v e_\rho, \v e_\varphi`} bilden ein Rechtssystem (wie ${M`\v e_x, \v e_y, \v e_z`}, nur in anderer Reihenfolge). Die Zahlen ${M`R`} und ${M`\dot\varphi`} darf man im Kreuzprodukt beliebig verschieben.`],
      [M`\v r = R\,\v e_\rho + z_0\,\v e_z \;\Rightarrow\; R\,\v e_\rho = \v r - z_0\,\v e_z`, `Den Ortsvektor nach ${M`R\,\v e_\rho`} auflösen.`],
      [M`\v v = \dot\varphi\,\v e_z \times (\v r - z_0\,\v e_z) = \dot\varphi\,\v e_z \times \v r - z_0\dot\varphi\,\underbrace{\v e_z \times \v e_z}_{=\,\v 0}`, `Einsetzen. Ein Vektor kreuz sich selbst ist ${M`\v 0`}, weil ${M`\sin 0 = 0`}.`],
      [M`\v v = \dot\varphi\,\v e_z \times \v r = \v\omega\times\v r`, 'Kreisbewegung.'],
    ])}
    ${box('vorlesung', `<p><b>Allgemein!</b> ${M`\v\omega \parallel`} Achse der Bewegung, ${M`\v v = \v 0`} auf der Achse.</p>`, { src: `${SRC} 11` })}
    ${figure('fig-circle', `Der Punkt ${M`M`} läuft auf einem Kreis in der Höhe ${M`z_0`}. Der Ortsvektor ${M`\v r`} (dunkel) beginnt im Ursprung ${M`O`}, nicht im Kreismittelpunkt. Trotzdem ist ${M`\v\omega\times\v r`} (magenta) genau die Kreisgeschwindigkeit ${M`R\dot\varphi\,\v e_\varphi`}: Der Anteil von ${M`\v r`} entlang der Achse fällt im Kreuzprodukt weg. Verändere ${M`z_0`} und beobachte: ${M`\v v`} bleibt gleich.`, { wide: true })}
    ${box('merke', `<p>${M`\v v = \v\omega\times\v r`} gilt, solange der Ursprung ${M`O`} <b>auf der Drehachse</b> liegt. Wo genau auf der Achse, ist egal.</p>`)}
  `)}

  ${section('kartesisch', '3. Nachrechnen in kartesischer Basis', `
    ${box('vorlesung', `${MD`\v\omega = \dot\varphi\,\v e_z,\qquad \v r = R\cos\varphi\,\v e_x + R\sin\varphi\,\v e_y + z_0\,\v e_z`}
      ${MD`\v v = \v\omega\times\v r = \begin{pmatrix}0\\0\\\dot\varphi\end{pmatrix}\times\begin{pmatrix}R\cos\varphi\\R\sin\varphi\\z_0\end{pmatrix} = \begin{pmatrix}-\dot\varphi R\sin\varphi\\ \dot\varphi R\cos\varphi\\ 0\end{pmatrix} = \dot\varphi R\,\v e_\varphi`}`, { src: `${SRC} 11` })}
    <p><b>So rechnet man das Kreuzprodukt:</b> Erste Komponente ${M`= \omega_y r_z - \omega_z r_y = 0\cdot z_0 - \dot\varphi\cdot R\sin\varphi`}. Zweite ${M`= \omega_z r_x - \omega_x r_z = \dot\varphi R\cos\varphi - 0`}. Dritte ${M`= \omega_x r_y - \omega_y r_x = 0`}. Hier sieht man direkt: ${M`z_0`} kommt im Ergebnis nicht vor.</p>
  `)}
  `;

  circleFigure(root.querySelector('#fig-circle'));
}

function circleFigure(host) {
  const s = { phi: 40, z0: 1.4, w: 1 };
  const R = 1.8;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.append(
    slider({ label: M`\varphi =`, min: 0, max: 359, step: 1, value: s.phi, format: (v) => M([`${v}^\\circ`]), onInput: (v) => { s.phi = v; draw(); } }),
    slider({ label: M`z_0 =`, min: 0, max: 2.4, step: 0.1, value: s.z0, format: (v) => M([fmt(v, 1)]), onInput: (v) => { s.z0 = v; draw(); } }),
    slider({ label: M`\dot\varphi =`, min: -1.5, max: 1.5, step: 0.1, value: s.w, format: (v) => M([fmt(v, 1)]), onInput: (v) => { s.w = v; draw(); } }),
  );
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const S3 = scene(fig, { S: 58, cy: 265, label: 'Kreisbewegung, v = ω × r' });
    S3.axes({ x: 3.2, y: 3.2, z: 3.2 }, { x: -1, y: -2.6, z: -0.4 });
    const circ = [];
    for (let i = 0; i <= 72; i++) circ.push(cylToCart(R, (i / 72) * 2 * Math.PI, s.z0));
    S3.path(circ, 's-dark', 1.2, { opacity: 0.6 });
    const phi = (s.phi * Math.PI) / 180;
    const P = cylToCart(R, phi, s.z0);
    const w = [0, 0, s.w];
    const v = cross(w, P);
    S3.arrow([0, 0, 0], scale(1.4, w), 'angle', 3.5);
    S3.label(scale(1.4, w), 'ω', 't-angle', 8, 6);
    S3.line([0, 0, s.z0], P, 's-rho dashed', 1.2);
    S3.label(add([0, 0, s.z0], scale(0.65, sub(P, [0, 0, s.z0]))), 'R', 't-rho', 2, -8);
    S3.line([0, 0, 0], P, 's-dark', 1.8);
    S3.label(scale(0.5, P), 'r', 't-dark', -14, 0);
    S3.arrow(P, scale(0.8, v), 'vel', 3);
    S3.label(add(P, scale(0.8, v)), 'v', 't-vel', 6, -4);
    S3.point(P);
    S3.label(P, 'M', 't-point', 8, 16);
    const ephi = cylBasis(phi).ephi;
    readout.innerHTML = `${M([`\\v\\omega\\times\\v r = (${fmt(v[0], 2)};\\ ${fmt(v[1], 2)};\\ ${fmt(v[2], 2)})`])} &nbsp;=&nbsp; ${M([`R\\dot\\varphi\\,\\v e_\\varphi = ${fmt(R * s.w, 2)}\\cdot(${fmt(ephi[0], 2)};\\ ${fmt(ephi[1], 2)};\\ 0)`])}`;
  }
  draw();
}
