import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, el, text, arrowDefs } from '../../ui/svg.js';
import { scene } from '../../ui/svg3d.js';
import { cylBasis, sphBasis, add, scale } from '../../math/vec.js';
import { cylToCart } from '../../math/coords.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Koordinaten sagen <em>wo</em> ein Punkt ist. Für Geschwindigkeiten und Kräfte braucht man aber Pfeile, also Vektoren. Ein Vektor wird erst durch eine <b>Basis</b> zu konkreten Zahlen. Die wichtigste Einsicht dieser Lektion: Die kartesische Basis ist überall gleich, die zylindrische dreht sich mit dem Punkt mit.</p>

  ${section('vektor', '1. Vektor und Ortsvektor', `
    ${box('vorlesung', `<p><b>Vektor:</b> Pfeil mit bestimmter Länge und Richtung/Orientierung, ein Informationsträger. ${M`\v r`}: <b>Ortsvektor</b> (punktgebunden), definiert eindeutig die Lage von ${M`M`} (wie die Koordinaten). Bewegung: ${M`t \mapsto \v r = \v r(t)`}, eine Vektorfunktion.</p>
      <p>Zur expliziten Darstellung brauchen wir eine <b>Basis</b>. Hier: orthonormierte Basisvektoren ${M`\v e_1, \v e_2, \v e_3`} mit ${M`\v e_1 \perp \v e_2 \perp \v e_3`} und ${M`|\v e_1| = |\v e_2| = |\v e_3| = 1`}.</p>`, { src: `${SRC} 5` })}
    <p><b>So liest man das:</b> Der Strich unter ${M`\v r`} heisst «Vektor». ${M`\v r(t)`} ist ein Pfeil vom Ursprung ${M`O`} zum Punkt ${M`M`}, der sich mit der Zeit ändert. «Orthonormiert» heisst zwei Dinge: Die Basisvektoren stehen paarweise senkrecht (ortho-) und haben die Länge 1 (normiert).</p>
  `)}

  ${section('produkte', '2. Skalarprodukt und Kreuzprodukt', `
    ${box('vorlesung', `<p><b>Skalarprodukt:</b> ${M`\v a \cdot \v b = |\v a|\,|\v b|\cos\varphi`}. Daraus: ${M`\v e_1 \cdot \v e_1 = 1`} (weil ${M`|\v e_1| = 1`}) und ${M`\v e_1 \cdot \v e_2 = 0`} (weil ${M`\varphi = \pi/2`}). ${M`\v a \cdot \v e_1 = |\v a| \cos\varphi`} ist die Projektion von ${M`\v a`} auf die ${M`\v e_1`}-Richtung.</p>
      <p><b>Kreuzprodukt (Vektorprodukt):</b> ${M`\v c = \v a \times \v b`} mit ${M`|\v c| = |\v a|\,|\v b| \sin\varphi`}, ${M`\v c`} senkrecht zu ${M`\v a`} und ${M`\v b`}. ${M`\v e_1 \times \v e_2 = \v e_3`}, ${M`\v e_2 \times \v e_3 = \v e_1`}, ${M`\v e_3 \times \v e_1 = \v e_2`}: Rechtssystem.</p>`, { src: `${SRC} 5` })}
    ${figure('fig-prod', `Zwei Vektoren in der Ebene. Das Skalarprodukt ist «Länge von ${M`\v b`} mal Schatten von ${M`\v a`} auf ${M`\v b`}» (violetter Schatten). Der Betrag des Kreuzprodukts ist die Fläche des Parallelogramms (türkis). Bei ${M`\varphi = 90^\circ`} ist das Skalarprodukt 0, die Fläche maximal.`)}
    ${box('merke', `<p>Skalarprodukt: «Wie viel zeigt ${M`\v a`} in Richtung ${M`\v b`}?» (eine Zahl). Kreuzprodukt: ein neuer Vektor senkrecht zu beiden, so lang wie die aufgespannte Fläche.</p>`)}
  `)}

  ${section('kart', '3. Kartesische Basis', `
    ${box('vorlesung', `${MD`\v r = r_x \v e_x + r_y \v e_y + r_z \v e_z, \qquad r_x = \v r \cdot \v e_x = x,\quad r_y = \v r \cdot \v e_y = y,\quad r_z = \v r \cdot \v e_z = z`}
      <p>Bewegung: ${M`\v r(t) = x(t)\,\v e_x + y(t)\,\v e_y + z(t)\,\v e_z \quad (1)`}</p>
      <p><b>Allgemein:</b> Basis ${M`\longleftrightarrow`} Koordinaten. <b>Basisvektoren:</b> Einheitsvektoren sind parallel bzw. tangential zu den Koordinatenlinien im betrachteten Punkt!</p>`, { src: `${SRC} 5–6` })}
    <p><b>Skalare und vektorielle Komponenten:</b> ${M`r_x`} ist eine Zahl (skalare Komponente), ${M`r_x \v e_x`} ist ein Pfeil (vektorielle Komponente). Die Zahl bekommt man mit dem Skalarprodukt, also als Projektion auf ${M`\v e_x`}.</p>
    <p><b>Was heisst «tangential zur Koordinatenlinie»?</b> Halte zwei Koordinaten fest und verändere nur die dritte. Der Punkt läuft dann auf einer Linie, der Koordinatenlinie. Der Basisvektor zeigt in die Richtung, in die sich der Punkt dabei bewegt. Kartesisch: Nur ${M`x`} ändern heisst geradeaus in ${M`x`}-Richtung. Darum ist ${M`\v e_x`} überall gleich.</p>
  `)}

  ${section('zyl', '4. Zylindrische Basis', `
    ${box('vorlesung', `${MD`\v e_\rho,\ \v e_\varphi,\ \v e_z, \qquad \v r = \rho\,\v e_\rho + z\,\v e_z`}
      <p>${M`\v e_\rho(\varphi)`}: auch hier sind 3 Informationen nötig! Bewegung:</p>
      ${MD`\v r(t) = \rho(t)\cdot \v e_\rho\big(\varphi(t)\big) + z(t)\,\v e_z \qquad (2)`}`, { src: `${SRC} 6` })}
    ${figure('fig-basis', `Die kartesische Basis (an ${M`O`}) bleibt immer gleich. Die zylindrische Basis am Punkt ${M`M`} dreht sich mit ${M`\varphi`}: ${M`\v e_\rho`} zeigt von der ${M`z`}-Achse weg, ${M`\v e_\varphi`} in Richtung wachsender ${M`\varphi`}. Schalte auf «sphärisch», um die Kugelbasis zu sehen.`, { wide: true })}
    <p><b>Warum fehlt ${M`\varphi`} in ${M`\v r = \rho\,\v e_\rho + z\,\v e_z`}?</b> Der Winkel steckt in der Richtung von ${M`\v e_\rho`}. Darum betont das Skript: Es sind trotzdem 3 Informationen (${M`\rho`}, ${M`\varphi`}, ${M`z`}), nur ist ${M`\varphi`} im Basisvektor versteckt.</p>
    ${box('achtung', `<p>${M`\v e_\rho`} und ${M`\v e_\varphi`} sind <b>nicht konstant</b>. Sie hängen von ${M`\varphi`} und damit von der Zeit ab. Beim Ableiten (nächste Lektion) darf man sie deshalb nicht wie Konstanten behandeln. Genau daraus entsteht der Term ${M`\rho\dot\varphi\,\v e_\varphi`} in der Geschwindigkeit.</p>`)}
    <p>Die Basisvektoren in der festen kartesischen Basis (aus S. 10, gebraucht für die Ableitung):</p>
    ${MD`\v e_\rho = \cos\varphi\,\v e_x + \sin\varphi\,\v e_y, \qquad \v e_\varphi = -\sin\varphi\,\v e_x + \cos\varphi\,\v e_y`}
  `)}

  ${section('sph', '5. Sphärische Basis', `
    ${box('vorlesung', `<p>Sphärische Basis, tangential zu den Koordinatenlinien: ${M`\v e_r, \v e_\theta, \v e_\psi`}. ${M`\v r = r\,\v e_r`} mit ${M`\v e_r(\theta, \psi)`}.</p>`, { src: `${SRC} 7` })}
    <p><b>In Worten:</b> ${M`\v e_r`} zeigt radial nach aussen. ${M`\v e_\theta`} zeigt entlang eines Längenkreises nach «Süden» (wachsendes ${M`\theta`}). ${M`\v e_\psi`} zeigt entlang eines Breitenkreises nach «Osten» (wachsendes ${M`\psi`}). Auch hier stecken zwei der drei Informationen (${M`\theta, \psi`}) in der Richtung von ${M`\v e_r`}.</p>
    ${box('ergaenzung', `<p>In kartesischer Basis (nachgerechnet in <code>vec.test.js</code>): ${M`\v e_r = (\sin\theta\cos\psi,\ \sin\theta\sin\psi,\ \cos\theta)`}, ${M`\v e_\theta = (\cos\theta\cos\psi,\ \cos\theta\sin\psi,\ -\sin\theta)`}, ${M`\v e_\psi = (-\sin\psi,\ \cos\psi,\ 0)`}.</p>`)}
  `)}
  `;

  productFigure(root.querySelector('#fig-prod'));
  basisFigure(root.querySelector('#fig-basis'));
}

function productFigure(host) {
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  let phiDeg = 50;
  const la = 2.2, lb = 3;
  controls.appendChild(slider({ label: M`\varphi =`, min: 0, max: 180, step: 1, value: phiDeg, format: (v) => M([`${v}^\\circ`]), onInput: (v) => { phiDeg = v; draw(); } }));
  host.append(controls, fig, readout);

  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 520, height: 300, xmin: -2.6, xmax: 4.2, ymin: -0.5, ymax: 3.2, pad: 10 });
    p.svg.style.maxWidth = '520px';
    arrowDefs(p.svg);
    const phi = (phiDeg * Math.PI) / 180;
    const a = [la * Math.cos(phi), la * Math.sin(phi)], b = [lb, 0];
    el('path', { d: `M${p.X(0)},${p.Y(0)} L${p.X(b[0])},${p.Y(0)} L${p.X(b[0] + a[0])},${p.Y(a[1])} L${p.X(a[0])},${p.Y(a[1])} Z`, class: 'fill-rho', opacity: 0.15 }, p.svg);
    const proj = la * Math.cos(phi);
    el('line', { x1: p.X(a[0]), y1: p.Y(a[1]), x2: p.X(proj), y2: p.Y(0), class: 's-dark dashed', 'stroke-width': 1 }, p.svg);
    el('line', { x1: p.X(0), y1: p.Y(0) + 6, x2: p.X(proj), y2: p.Y(0) + 6, class: 's-angle', 'stroke-width': 4 }, p.svg);
    el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(b[0]), y2: p.Y(0), class: 's-x', 'stroke-width': 2.5, 'marker-end': 'url(#arr-x)' }, p.svg);
    el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(a[0]), y2: p.Y(a[1]), class: 's-y', 'stroke-width': 2.5, 'marker-end': 'url(#arr-y)' }, p.svg);
    text(p.svg, p.X(b[0]) + 4, p.Y(0) + 18, 'b', 'start', 'math t-x');
    text(p.svg, p.X(a[0]) + 6, p.Y(a[1]) - 6, 'a', 'start', 'math t-y');
    readout.innerHTML = `${M([`\\v a \\cdot \\v b = |\\v a||\\v b|\\cos\\varphi = ${fmt(la * lb * Math.cos(phi), 2)}`])}, &nbsp; ${M([`|\\v a \\times \\v b| = |\\v a||\\v b|\\sin\\varphi = ${fmt(la * lb * Math.sin(phi), 2)}`])} <br><small>mit ${M`|\v a| = 2{,}2`}, ${M`|\v b| = 3`}</small>`;
  }
  draw();
}

function basisFigure(host) {
  let mode = 'zyl';
  const s = { rho: 2, phi: 50, z: 1.4, theta: 55 };
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const sliders = document.createElement('div');
  sliders.className = 'fig-controls';
  const fig = document.createElement('div');
  const modes = buttonRow([
    { label: 'zylindrisch', onClick: () => { mode = 'zyl'; draw(); } },
    { label: 'sphärisch', onClick: () => { mode = 'sph'; draw(); } },
  ]);
  modes.firstChild.classList.add('active');
  controls.appendChild(modes);
  sliders.append(
    slider({ label: M`\varphi\ (\psi) =`, min: 0, max: 359, step: 1, value: s.phi, format: (v) => M([`${v}^\\circ`]), onInput: (v) => { s.phi = v; draw(); } }),
    slider({ label: M`\rho =`, min: 0.6, max: 3, step: 0.1, value: s.rho, format: (v) => M([fmt(v, 1)]), onInput: (v) => { s.rho = v; draw(); } }),
    slider({ label: M`z =`, min: -0.5, max: 2.5, step: 0.1, value: s.z, format: (v) => M([fmt(v, 1)]), onInput: (v) => { s.z = v; draw(); } }),
  );
  host.append(controls, sliders, fig);

  function draw() {
    fig.innerHTML = '';
    const S3 = scene(fig, { label: 'Kartesische und zylindrische Basis' });
    S3.axes();
    const phi = (s.phi * Math.PI) / 180;
    const P = cylToCart(s.rho, phi, s.z);
    const foot = [P[0], P[1], 0];
    // Koordinatenlinien durch M: Kreis (φ-Linie), Gerade (ρ-Linie)
    const circ = [];
    for (let i = 0; i <= 72; i++) { const a = (i / 72) * 2 * Math.PI; circ.push(cylToCart(s.rho, a, s.z)); }
    S3.path(circ, 's-dark dashed', 0.8, { opacity: 0.5 });
    S3.line([0, 0, s.z], add(P, scale(0.9, cylBasis(phi).er)), 's-dark dashed', 0.8, { opacity: 0.5 });
    S3.line([0, 0, 0], foot, 's-rho', 1.2, { opacity: 0.6 });
    S3.line(foot, P, 's-z', 1.2, { opacity: 0.6, class: 's-z dashed' });
    // kartesische Basis an O (Länge 1)
    S3.arrow([0, 0, 0], [1, 0, 0], 'x', 3); S3.arrow([0, 0, 0], [0, 1, 0], 'y', 3); S3.arrow([0, 0, 0], [0, 0, 1], 'z', 3);
    S3.label([1, 0, 0], 'e_x', 't-x', -18, 14); S3.label([0, 1, 0], 'e_y', 't-y', -4, 18); S3.label([0, 0, 1], 'e_z', 't-z', 6, 8);
    S3.point(P);
    S3.label(P, 'M', 't-point', -18, -8);
    if (mode === 'zyl') {
      const { er, ephi, ez } = cylBasis(phi);
      S3.arrow(P, er, 'rho', 3); S3.arrow(P, ephi, 'angle', 3); S3.arrow(P, ez, 'z', 3);
      S3.label(add(P, er), 'e_ρ', 't-rho', 4, 4); S3.label(add(P, ephi), 'e_φ', 't-angle', 4, 4); S3.label(add(P, ez), 'e_z', 't-z', 6, 4);
    } else {
      const r = Math.hypot(s.rho, s.z), theta = Math.atan2(s.rho, s.z);
      const { er, etheta, epsi } = sphBasis(theta, phi);
      S3.line([0, 0, 0], P, 's-dark', 1.2);
      // Längenkreis (θ-Linie)
      const mer = [];
      for (let i = 0; i <= 40; i++) { const t = (i / 40) * Math.PI; mer.push([r * Math.sin(t) * Math.cos(phi), r * Math.sin(t) * Math.sin(phi), r * Math.cos(t)]); }
      S3.path(mer, 's-dark dashed', 0.8, { opacity: 0.5 });
      S3.arrow(P, er, 'dark', 3); S3.arrow(P, etheta, 'rho', 3); S3.arrow(P, epsi, 'angle', 3);
      S3.label(add(P, er), 'e_r', 't-dark', 4, 4); S3.label(add(P, etheta), 'e_θ', 't-rho', 4, 10); S3.label(add(P, epsi), 'e_ψ', 't-angle', 4, 4);
    }
  }
  draw();
}
