import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, el, text, arrowDefs } from '../../ui/svg.js';
import { scene } from '../../ui/svg3d.js';
import { cylBasis, add, scale, norm } from '../../math/vec.js';
import { cylToCart } from '../../math/coords.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Die Geschwindigkeit ist die Ableitung des Ortsvektors: ${M`\v v = \dot{\v r}`}. Kartesisch ist das einfach: jede Komponente ableiten. In Zylinderkoordinaten kommt ein zusätzlicher Term dazu, weil sich die Basisvektoren selbst bewegen. Diesen Term zu verstehen, ist das Ziel dieser Lektion.</p>

  ${section('eindim', '1. Von der Geraden zum Raum', `
    ${box('vorlesung', `<p><b>Geradlinige Bewegung:</b> ${M`x(t)`} skalare Funktion, Geschwindigkeit</p>
      ${MD`v = \frac{\dd x(t)}{\dd t} = \dot x = \lim_{\Delta t\to 0}\frac{x(t+\Delta t) - x(t)}{\Delta t}.`}
      <p>Gesucht für 3D-Bewegung: ${M`\v v \Longleftrightarrow \v r(t)`}. <b>Geschwindigkeitsvektor</b> ${M`\v v`} liegt tangential an der Bahnkurve.</p>`, { src: `${SRC} 8` })}
    <p><b>Der Punkt über einem Symbol</b> (${M`\dot x`}) heisst immer: Ableitung nach der Zeit ${M`t`}. ${M`\dot x`} ist also «wie schnell sich ${M`x`} ändert».</p>
  `)}

  ${section('schnelligkeit', `2. Schnelligkeit und Richtung: ${M`\v v = \dot s\,\v\tau`}`, `
    ${box('intuition', `<p>Im Auto zeigt der Kilometerzähler den zurückgelegten Weg ${M`s(t)`} entlang der Strasse. Der Tacho zeigt, wie schnell dieser Zähler wächst: das ist ${M`\dot s`}, die <b>Schnelligkeit</b>. Die Richtung der Strasse an der aktuellen Stelle ist der Einheitsvektor ${M`\v\tau`}. Die Geschwindigkeit ist beides zusammen.</p>`)}
    ${box('vorlesung', `<p><b>Schnelligkeit</b> ${M`\dot s`}:</p>
      ${MD`\dot s = \lim_{\Delta t \to 0}\frac{s(t+\Delta t) - s(t)}{\Delta t} = \lim_{\Delta t\to 0}\frac{\Delta s}{\Delta t}, \qquad \v v = \dot s\,\v\tau`}
      <p>${M`\dot s`}: Wie schnell? ${M`\v \tau`}: In welche Richtung?</p>`, { src: `${SRC} 8` })}
    <p><b>Warum ist ${M`\dot{\v r}`} tangential?</b> Die Herleitung aus dem Skript (S. 9), Schritt für Schritt:</p>
    ${steps([
      [M`\dot{\v r} = \lim_{\Delta t\to 0} \frac{\v r(t+\Delta t) - \v r(t)}{\Delta t} = \lim_{\Delta t \to 0}\frac{\Delta \v r}{\Delta t}`, 'Gleiche Definition wie in 1D, nur mit Vektoren: Differenz der Ortsvektoren durch die Zeitdifferenz.'],
      [M`\Delta t \to 0:\quad \Delta \v r \parallel \v\tau \;\Rightarrow\; \dot{\v r} \parallel \v \tau`, `${M`\Delta\v r`} ist die Sehne zwischen zwei Bahnpunkten. Je näher die Punkte, desto mehr zeigt die Sehne in Richtung der Tangente (Figur unten).`],
      [M`\v r(t) = \v r\big(s(t)\big) \;\Rightarrow\; \dot{\v r} = \frac{\dd \v r}{\dd s}\cdot\frac{\dd s}{\dd t}`, `Man beschreibt die Lage über den Weg ${M`s`} statt über die Zeit. Dann gibt die Kettenregel zwei Faktoren.`],
      [M`\frac{\dd \v r}{\dd s} = \lim_{\Delta s\to 0}\frac{\Delta \v r}{\Delta s} = \v \tau`, `Für kleine Stücke ist die Sehnenlänge ${M`|\Delta\v r|`} gleich der Bogenlänge ${M`\Delta s`}. Also hat ${M`\Delta\v r/\Delta s`} die Länge 1 und zeigt tangential: das ist ${M`\v\tau`}.`],
      [M`\dot{\v r} = \v\tau\,\dot s = \v v`, 'Einsetzen. Fertig.'],
    ])}
    ${figure('fig-secant', `Der rote Punkt ist ${M`\v r(t)`}, der graue ${M`\v r(t+\Delta t)`}. Der Pfeil zeigt ${M`\Delta \v r / \Delta t`}. Mach ${M`\Delta t`} kleiner: Der Pfeil dreht sich in die Tangentenrichtung und wird zur Geschwindigkeit ${M`\v v`} (gestrichelt).`)}
  `)}

  ${section('explizit', '3. Geschwindigkeit in den drei Basen', `
    ${box('vorlesung', `<p><b>Kartesische Basis:</b> ${M`\v r(t) = x(t)\v e_x + y(t)\v e_y + z(t)\v e_z`}. Da ${M`\dot{\v e}_x = \dot{\v e}_y = \dot{\v e}_z = \v 0`}:</p>
      ${MD`\dot{\v r} = \dot x\,\v e_x + \dot y\,\v e_y + \dot z\,\v e_z`}`, { src: `${SRC} 9` })}
    ${box('vorlesung', `<p><b>Zylindrische Basis:</b> ${M`\v r = \rho(t)\cdot\v e_\rho\big(\varphi(t)\big) + z(t)\,\v e_z`}, also nach der Produktregel ${M`\dot{\v r} = \dot\rho\,\v e_\rho + \rho\,\dot{\v e}_\rho + \dot z\,\v e_z`} mit ${M`\dot{\v e}_\rho \ne \v 0`}. ${M`\v e_\rho`} beschreibt man als Vektor in einer konstanten Basis.</p>`, { src: `${SRC} 9–10` })}
    ${steps([
      [M`\v e_\rho = \cos\varphi\,\v e_x + \sin\varphi\,\v e_y`, `${M`\v e_\rho`} in der festen kartesischen Basis aufschreiben. Jetzt hängen nur noch die Zahlen ${M`\cos\varphi`} und ${M`\sin\varphi`} von ${M`t`} ab.`],
      [M`\dot{\v e}_\rho = (\cos\varphi)^{\boldsymbol\cdot}\,\v e_x + (\sin\varphi)^{\boldsymbol\cdot}\,\v e_y = \dot\varphi\,(-\sin\varphi\,\v e_x + \cos\varphi\,\v e_y)`, `Kettenregel: ${M`\big(\cos\varphi(t)\big)^{\boldsymbol\cdot} = -\sin\varphi\cdot\dot\varphi`} und ${M`\big(\sin\varphi(t)\big)^{\boldsymbol\cdot} = \cos\varphi\cdot\dot\varphi`}.`],
      [M`\dot{\v e}_\rho = \dot\varphi\,\v e_\varphi`, `Die Klammer ist genau ${M`\v e_\varphi`}.`],
      [M`\v v = \dot\rho\,\v e_\rho + \rho\dot\varphi\,\v e_\varphi + \dot z\,\v e_z`, 'Einsetzen in die Produktregel.'],
    ])}
    ${box('vorlesung', `<p><b>Sphärische Basis:</b> ${M`\v r(t) = r(t)\,\v e_r`},</p>${MD`\dot{\v r}(t) = \dot r\,\v e_r + r\dot\theta\,\v e_\theta + r\sin\theta\,\dot\psi\,\v e_\psi = \v v`}`, { src: `${SRC} 10` })}
    ${figure('fig-helix', `Ein Punkt auf einer Schraubenlinie (wie in Hausübung 2). Magenta: die Geschwindigkeit ${M`\v v`}, tangential zur Bahn. Darunter ihre Zerlegung in die zylindrische Basis: ${M`\rho\dot\varphi\,\v e_\varphi`} (violett) und ${M`\dot z\,\v e_z`} (grün). Wähle «Spirale», dann wächst ${M`\rho`} und der Anteil ${M`\dot\rho\,\v e_\rho`} (türkis) kommt dazu.`, { wide: true })}
    <p><b>Warum ${M`\rho\dot\varphi`}?</b> Dreht sich der Punkt um den Winkel ${M`\Delta\varphi`}, legt er auf einem Kreis mit Radius ${M`\rho`} den Bogen ${M`\rho\,\Delta\varphi`} zurück. Pro Zeit ist das ${M`\rho\dot\varphi`}. Weiter weg von der Achse heisst also schneller, bei gleichem ${M`\dot\varphi`}.</p>
    ${box('achtung', `<p>Häufiger Fehler: ${M`\v v = \dot\rho\,\v e_\rho + \dot\varphi\,\v e_\varphi + \dot z\,\v e_z`}, also einfach jede Koordinate ableiten. Das ist falsch: ${M`\dot\varphi`} hat die Einheit 1/s, keine Geschwindigkeit. Es fehlt der Faktor ${M`\rho`}, der aus ${M`\dot{\v e}_\rho = \dot\varphi\,\v e_\varphi`} kommt. Genauso sphärisch: ${M`r\dot\theta`} und ${M`r\sin\theta\,\dot\psi`}.</p>`)}
    ${box('ergaenzung', `<p>Alle drei Formeln sind in <code>vec.test.js</code> numerisch geprüft: Für beliebige Bewegungen ${M`\rho(t), \varphi(t), z(t)`} bzw. ${M`r(t), \theta(t), \psi(t)`} stimmen sie mit dem Differenzenquotienten von ${M`\v r(t)`} überein.</p>`)}
  `)}
  `;

  secantFigure(root.querySelector('#fig-secant'));
  helixFigure(root.querySelector('#fig-helix'));
}

function secantFigure(host) {
  const curve = (t) => [t, 0.6 + 0.9 * Math.sin(1.1 * t) + 0.15 * t];
  const dcurve = (t) => [1, 0.99 * Math.cos(1.1 * t) + 0.15];
  const t0 = 1.6;
  let dt = 1.2;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  controls.appendChild(slider({ label: M`\Delta t =`, min: 0.02, max: 2, step: 0.02, value: dt, format: (v) => M([fmt(v, 2)]), onInput: (v) => { dt = v; draw(); } }));
  host.append(controls, fig);
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 560, height: 280, xmin: -0.2, xmax: 4.6, ymin: -0.5, ymax: 2.6, pad: 12 });
    p.svg.style.maxWidth = '560px';
    arrowDefs(p.svg);
    const pts = [];
    for (let t = 0; t <= 4.5; t += 0.05) pts.push(curve(t));
    el('path', { d: pts.map((q, i) => `${i ? 'L' : 'M'}${p.X(q[0])},${p.Y(q[1])}`).join(' '), class: 's-dark', fill: 'none', 'stroke-width': 1.5 }, p.svg);
    const A = curve(t0), B = curve(t0 + dt), d = dcurve(t0);
    const q = [(B[0] - A[0]) / dt, (B[1] - A[1]) / dt];
    const k = 0.7;
    el('line', { x1: p.X(A[0]), y1: p.Y(A[1]), x2: p.X(A[0] + k * d[0]), y2: p.Y(A[1] + k * d[1]), class: 's-vel dashed', 'stroke-width': 2 }, p.svg);
    el('line', { x1: p.X(A[0]), y1: p.Y(A[1]), x2: p.X(B[0]), y2: p.Y(B[1]), class: 's-dark dashed', 'stroke-width': 1 }, p.svg);
    el('line', { x1: p.X(A[0]), y1: p.Y(A[1]), x2: p.X(A[0] + k * q[0]), y2: p.Y(A[1] + k * q[1]), class: 's-angle', 'stroke-width': 2.5, 'marker-end': 'url(#arr-angle)' }, p.svg);
    el('circle', { cx: p.X(B[0]), cy: p.Y(B[1]), r: 5, class: 'fill-dark', opacity: 0.5 }, p.svg);
    el('circle', { cx: p.X(A[0]), cy: p.Y(A[1]), r: 5, class: 'fill-point' }, p.svg);
    text(p.svg, p.X(A[0] + k * q[0]) + 4, p.Y(A[1] + k * q[1]) - 4, 'Δr/Δt', 'start', 'math t-angle');
    text(p.svg, p.X(A[0] + k * d[0]) + 4, p.Y(A[1] + k * d[1]) + 14, 'v', 'start', 'math t-vel');
  }
  draw();
}

function helixFigure(host) {
  let mode = 'helix';
  let t = 2.9;
  const R = 1.6, phiDot = 1, zDot = 0.25;
  const rho = (s) => (mode === 'helix' ? R : 0.8 + 0.3 * s);
  const rhoDot = () => (mode === 'helix' ? 0 : 0.3);
  const pos = (s) => cylToCart(rho(s), phiDot * s, zDot * s);
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const modes = buttonRow([
    { label: 'Schraubenlinie', onClick: () => { mode = 'helix'; draw(); } },
    { label: 'Spirale', onClick: () => { mode = 'spiral'; draw(); } },
  ]);
  modes.firstChild.classList.add('active');
  controls.append(modes, slider({ label: M`t =`, min: 0, max: 7, step: 0.05, value: t, format: (v) => M([fmt(v, 2)]), onInput: (v) => { t = v; draw(); } }));
  host.append(controls, fig, readout);

  function draw() {
    fig.innerHTML = '';
    const S3 = scene(fig, { S: 56, cy: 270, viewBox: '80 20 480 360', label: 'Geschwindigkeit auf einer Schraubenlinie' });
    S3.axes({ x: 3.4, y: 3.4, z: 2.6 }, { x: -1.2, y: -2.8, z: -0.3 });
    const pts = [];
    for (let s = 0; s <= 7; s += 0.05) pts.push(pos(s));
    S3.path(pts, 's-dark', 1.3, { opacity: 0.55 });
    const P = pos(t);
    const { er, ephi, ez } = cylBasis(phiDot * t);
    const k = 1.1; // Pfeile skaliert
    const cRho = scale(k * rhoDot(), er), cPhi = scale(k * rho(t) * phiDot, ephi), cZ = scale(k * zDot, ez);
    const v = add(add(cRho, cPhi), cZ);
    S3.line([0, 0, P[2]], P, 's-dark dashed', 0.8, { opacity: 0.6 });
    S3.arrow(P, cPhi, 'angle', 2.2);
    S3.arrow(add(P, cPhi), cZ, 'z', 2.2);
    if (rhoDot() > 0) S3.arrow(add(add(P, cPhi), cZ), cRho, 'rho', 2.2);
    S3.arrow(P, v, 'vel', 3);
    S3.label(add(P, v), 'v', 't-vel', 6, -4);
    S3.point(P);
    S3.label(P, 'M', 't-point', -18, 14);
    const sp = norm([rhoDot(), rho(t) * phiDot, zDot]);
    readout.innerHTML = `${M([`\\dot\\rho = ${fmt(rhoDot(), 2)},\\quad \\rho\\dot\\varphi = ${fmt(rho(t) * phiDot, 2)},\\quad \\dot z = ${fmt(zDot, 2)}`])} &nbsp;⇒&nbsp; ${M([`\\dot s = |\\v v| = \\sqrt{\\dot\\rho^2 + (\\rho\\dot\\varphi)^2 + \\dot z^2} = ${fmt(sp, 2)}`])}`;
  }
  draw();
}
