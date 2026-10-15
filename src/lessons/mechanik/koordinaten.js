import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { el, text, arrowDefs, plot, axes } from '../../ui/svg.js';
import { cartToCyl, cartToSph, cylToCart, phiSkript, sphToCart, wrap2pi } from '../../math/coords.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Wo ist der Punkt ${M`M`} gerade? Drei Zahlen genügen, aber welche drei, hängt von der Wahl ab. Kartesisch: wie weit nach vorne, zur Seite, nach oben. Zylindrisch: wie weit weg von der ${M`z`}-Achse, in welche Richtung, wie hoch. Sphärisch: wie weit weg vom Ursprung und unter welchen zwei Winkeln.</p>

  ${section('bezug', '1. Lage und Bewegung brauchen einen Bezugskörper', `
    ${box('vorlesung', `<p><b>Materielles System:</b> Menge von materiellen Punkten. <b>Lage</b> eines materiellen Punktes ${M`M`} zur Zeit ${M`t`}: ${M`M(t)`}, geometrischer Punkt im 3D-Raum. <b>Bewegung:</b> Lageänderung als Funktion der Zeit, ${M`M(t_1), M(t_2), \dots`}</p>
      <p>Beschreibung der Lage? Man benötigt einen <b>starren Bezugskörper</b> (d.h. der Abstand zwischen 2 Punkten des Körpers ist konstant). ${M`x'Ox`}, ${M`y'Oy`}, ${M`z'Oz`}: gerichtete orthogonale Achsen im Bezugskörper.</p>`, { src: `${SRC} 3` })}
    ${box('intuition', `<p>«Der Zug fährt mit 100 km/h» stimmt nur relativ zum Boden. Im Zug sitzt du still. Ohne Bezugskörper (hier: das Achsenkreuz, fest mit dem Boden verbunden) hat «wo» und «wie schnell» keine Bedeutung.</p>`)}
    <p>Die <b>Bewegung</b> von ${M`M`} ist dann einfach: drei Koordinaten, jede eine Funktion der Zeit. Kartesisch ${M`x = F_x(t),\ y = F_y(t),\ z = F_z(t)`}, und genauso in den anderen Koordinaten.</p>
  `)}

  ${section('explorer', '2. Drei Arten, denselben Punkt zu beschreiben', `
    ${figure('fig-coords', `Wähle oben, mit welchen Koordinaten du den Punkt ${M`M`} steuerst. Die Figur zeigt immer alle drei Beschreibungen. Farben: ${M`x`} blau, ${M`y`} bernstein, ${M`z`} grün, ${M`\rho`} türkis, ${M`r`} dunkel, Winkel violett, der Punkt rot.`, { wide: true })}
  `)}

  ${section('zyl', `3. Zylindrische Koordinaten ${M`(\rho, \varphi, z)`}`, `
    <p><b>Was die Symbole bedeuten:</b> ${M`\rho`} ist der Abstand von der ${M`z`}-Achse (nicht vom Ursprung!). ${M`\varphi`} ist der Winkel in der ${M`xy`}-Ebene, gemessen von der ${M`x`}-Achse aus. ${M`z`} ist die Höhe, wie kartesisch.</p>
    ${box('vorlesung', `${MD`x = \rho\cos\varphi,\qquad y = \rho\sin\varphi,\qquad z = z`}
      <p>Und umgekehrt:</p>${MD`\rho = \sqrt{x^2 + y^2},\qquad \varphi = \arctan\!\left(\frac{y}{x}\right),\qquad z = z`}`, { src: `${SRC} 4` })}
    <p><b>Warum gilt das?</b> Schau den Punkt von oben an (Projektion auf die ${M`xy`}-Ebene). Dort ist ${M`\rho`} die Hypotenuse eines rechtwinkligen Dreiecks mit den Katheten ${M`x`} und ${M`y`} und dem Winkel ${M`\varphi`} bei ${M`O`}. Also ${M`x = \rho\cos\varphi`}, ${M`y = \rho\sin\varphi`}, und Pythagoras gibt ${M`\rho^2 = x^2 + y^2`}.</p>
    ${figure('fig-atan', `Dreh ${M`\varphi`} einmal ganz herum. Der echte Winkel (violett) und der Wert von ${M`\arctan(y/x)`} (gestrichelt) stimmen nur für ${M`x > 0`} (rechte Halbebene, grün hinterlegt) überein.`)}
    ${box('achtung', `<p>${M`\arctan(y/x)`} liefert nur Werte zwischen ${M`-\tfrac{\pi}{2}`} und ${M`\tfrac{\pi}{2}`}. Die Formel stimmt also nur für ${M`x > 0`}. Für ${M`x < 0`} muss man ${M`\pi`} addieren. Beispiel: ${M`(x, y) = (-1, 1)`} hat ${M`\varphi = \tfrac{3\pi}{4}`}, aber ${M`\arctan(-1) = -\tfrac{\pi}{4}`}. In Prüfungen: immer kurz prüfen, in welchem Quadranten der Punkt liegt.</p>`)}
  `)}

  ${section('sph', `4. Sphärische Koordinaten ${M`(r, \theta, \psi)`}`, `
    <p><b>Was die Symbole bedeuten:</b> ${M`r`} ist der Abstand vom Ursprung ${M`O`}. ${M`\theta`} ist der Winkel <b>ab der positiven ${M`z`}-Achse</b> (oben ${M`\theta = 0`}, am «Äquator» ${M`\theta = \tfrac{\pi}{2}`}). ${M`\psi`} ist der Winkel in der ${M`xy`}-Ebene, also dasselbe wie ${M`\varphi`} bei den Zylinderkoordinaten.</p>
    ${box('vorlesung', `${MD`x = r\sin\theta\cos\psi,\qquad y = r\sin\theta\sin\psi,\qquad z = r\cos\theta`}
      <p>Und umgekehrt:</p>${MD`r = \sqrt{x^2+y^2+z^2},\qquad \theta = \arctan\!\left(\frac{\sqrt{x^2+y^2}}{z}\right),\qquad \psi = \arctan\!\left(\frac{y}{x}\right)`}`, { src: `${SRC} 4` })}
    <p><b>Warum gilt das?</b> Zwei Schritte. (1) Im senkrechten Dreieck aus ${M`O`}, ${M`M`} und der ${M`z`}-Achse gilt ${M`z = r\cos\theta`}, und der Abstand zur ${M`z`}-Achse ist ${M`\rho = r\sin\theta`}. (2) Setze dieses ${M`\rho`} in die Zylinderformeln ein: ${M`x = \rho\cos\psi = r\sin\theta\cos\psi`}, ${M`y = r\sin\theta\sin\psi`}.</p>
    ${box('achtung', `<p>Viele Bücher (und Analysis II) nennen die Winkel anders, etwa ${M`\varphi`} für den Azimut oder messen ab der ${M`xy`}-Ebene. In Mechanik I gilt: <b>${M`\theta`} ab der ${M`+z`}-Achse, ${M`\psi`} = Azimut.</b> Und wie oben gilt die ${M`\arctan`}-Formel für ${M`\theta`} nur für ${M`z > 0`}.</p>`)}
    ${box('merke', `<p>${M`\rho = r\sin\theta`}: Die Zylinderkoordinaten sind der Zwischenschritt von sphärisch zu kartesisch.</p>`)}
  `)}
  `;

  coordsFigure(root.querySelector('#fig-coords'));
  atanFigure(root.querySelector('#fig-atan'));
}

/* ---------------- 3D-Figur (Schrägbild wie in der Mitschrift: x zeigt nach vorne-unten) ---------------- */
function coordsFigure(host) {
  let mode = 'cyl';
  let P = cylToCart(2.2, 0.9, 1.6);
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const sliderBox = document.createElement('div');
  sliderBox.className = 'fig-controls';
  const modes = buttonRow([
    { label: 'kartesisch', onClick: () => setMode('cart') },
    { label: 'zylindrisch', onClick: () => setMode('cyl') },
    { label: 'sphärisch', onClick: () => setMode('sph') },
  ]);
  modes.children[1].classList.add('active');
  controls.appendChild(modes);
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  host.append(controls, sliderBox, fig, readout);

  const deg = (v) => M([`${Math.round(v)}^\\circ`]);
  const num = (v) => M([fmt(v, 1)]);

  function setMode(m) {
    mode = m;
    sliderBox.innerHTML = '';
    if (m === 'cart') {
      const c = [...P];
      sliderBox.append(
        slider({ label: M`x =`, min: -3, max: 3, step: 0.1, value: c[0], format: num, onInput: (v) => { c[0] = v; P = [...c]; draw(); } }),
        slider({ label: M`y =`, min: -3, max: 3, step: 0.1, value: c[1], format: num, onInput: (v) => { c[1] = v; P = [...c]; draw(); } }),
        slider({ label: M`z =`, min: -2, max: 3, step: 0.1, value: c[2], format: num, onInput: (v) => { c[2] = v; P = [...c]; draw(); } }),
      );
    } else if (m === 'cyl') {
      const [rho, phi, z] = cartToCyl(...P);
      const c = [Math.max(rho, 0.1), wrap2pi(phi) * 180 / Math.PI, z];
      const upd = () => { P = cylToCart(c[0], c[1] * Math.PI / 180, c[2]); draw(); };
      sliderBox.append(
        slider({ label: M`\rho =`, min: 0, max: 3, step: 0.1, value: c[0], format: num, onInput: (v) => { c[0] = v; upd(); } }),
        slider({ label: M`\varphi =`, min: 0, max: 359, step: 1, value: c[1], format: deg, onInput: (v) => { c[1] = v; upd(); } }),
        slider({ label: M`z =`, min: -2, max: 3, step: 0.1, value: c[2], format: num, onInput: (v) => { c[2] = v; upd(); } }),
      );
    } else {
      const [r, th, ps] = cartToSph(...P);
      const c = [Math.max(r, 0.1), th * 180 / Math.PI, wrap2pi(ps) * 180 / Math.PI];
      const upd = () => { P = sphToCart(c[0], c[1] * Math.PI / 180, c[2] * Math.PI / 180); draw(); };
      sliderBox.append(
        slider({ label: M`r =`, min: 0, max: 3.2, step: 0.1, value: c[0], format: num, onInput: (v) => { c[0] = v; upd(); } }),
        slider({ label: M`\theta =`, min: 0, max: 180, step: 1, value: c[1], format: deg, onInput: (v) => { c[1] = v; upd(); } }),
        slider({ label: M`\psi =`, min: 0, max: 359, step: 1, value: c[2], format: deg, onInput: (v) => { c[2] = v; upd(); } }),
      );
    }
  }

  // Schrägbild: x-Achse nach vorne-links-unten (verkürzt), y nach rechts, z nach oben.
  const S = 62, cx = 300, cy = 250;
  const proj = ([x, y, z]) => [cx + S * (y - 0.5 * x * Math.cos(Math.PI / 4)), cy - S * (z - 0.5 * x * Math.sin(Math.PI / 4))];
  const line = (g, a, b, cls, w = 2, extra = {}) => {
    const [x1, y1] = proj(a), [x2, y2] = proj(b);
    return el('line', { x1, y1, x2, y2, class: cls, 'stroke-width': w, ...extra }, g);
  };
  const path = (g, pts, cls, w = 2, extra = {}) => el('path', { d: pts.map((p, i) => `${i ? 'L' : 'M'}${proj(p).join(',')}`).join(' '), class: cls, 'stroke-width': w, fill: 'none', ...extra }, g);
  const label = (g, p, str, cls, dx = 6, dy = -6) => { const [x, y] = proj(p); text(g, x + dx, y + dy, str, 'start', `math ${cls}`); };

  function draw() {
    fig.innerHTML = '';
    const svg = el('svg', { viewBox: '80 30 480 345', class: 'plot', role: 'img', 'aria-label': 'Punkt M mit kartesischen, zylindrischen und sphärischen Koordinaten' });
    fig.appendChild(svg);
    arrowDefs(svg);
    const g = el('g', {}, svg);
    const [x, y, z] = P;
    const [rho, phiRaw] = cartToCyl(x, y, z);
    const [r, th] = cartToSph(x, y, z);
    const phi = wrap2pi(phiRaw);

    // Achsen
    line(g, [-1.5, 0, 0], [4.2, 0, 0], 's-x', 1.5, { 'marker-end': 'url(#arr-x)' });
    line(g, [0, -3.2, 0], [0, 3.6, 0], 's-y', 1.5, { 'marker-end': 'url(#arr-y)' });
    line(g, [0, 0, -1.8], [0, 0, 3.2], 's-z', 1.5, { 'marker-end': 'url(#arr-z)' });
    label(g, [4.3, 0, 0], 'x', 't-x', -14, 14);
    label(g, [0, 3.7, 0], 'y', 't-y', 2, 4);
    label(g, [0, 0, 3.3], 'z', 't-z', 6, 4);
    label(g, [0, 0, 0], 'O', '', -16, 16);

    const foot = [x, y, 0];
    // kartesische Hilfslinien (Quader-Kanten in der xy-Ebene)
    line(g, [x, 0, 0], foot, 's-y dashed', 1);
    line(g, [0, y, 0], foot, 's-x dashed', 1);
    // ρ in der xy-Ebene, z senkrecht
    line(g, [0, 0, 0], foot, 's-rho', 2.5);
    label(g, [x / 2, y / 2, 0], 'ρ', 't-rho', 4, 16);
    line(g, foot, P, 's-z', 2.5);
    label(g, [x, y, z / 2], 'z', 't-z', 6, 0);
    // φ-Bogen in der xy-Ebene
    const arcR = Math.min(0.8, Math.max(rho * 0.5, 0.35));
    const arc = [];
    for (let i = 0; i <= 40; i++) { const a = (phi * i) / 40; arc.push([arcR * Math.cos(a), arcR * Math.sin(a), 0]); }
    if (rho > 0.05) { path(g, arc, 's-angle', 2); label(g, [arcR * Math.cos(phi / 2) * 1.3, arcR * Math.sin(phi / 2) * 1.3, 0], mode === 'sph' ? 'ψ' : 'φ', 't-angle', -4, 4); }
    // r und θ
    line(g, [0, 0, 0], P, 's-dark', mode === 'sph' ? 2.5 : 1.2, mode === 'sph' ? {} : { class: 's-dark dashed' });
    if (mode === 'sph' && r > 0.05) {
      const tArc = [];
      const tr = Math.min(0.9, r * 0.45);
      for (let i = 0; i <= 40; i++) { const t = (th * i) / 40; tArc.push([tr * Math.sin(t) * Math.cos(phi), tr * Math.sin(t) * Math.sin(phi), tr * Math.cos(t)]); }
      path(g, tArc, 's-angle', 2);
      const tm = th / 2;
      label(g, [tr * 1.3 * Math.sin(tm) * Math.cos(phi), tr * 1.3 * Math.sin(tm) * Math.sin(phi), tr * 1.3 * Math.cos(tm)], 'θ', 't-angle', 2, 0);
      label(g, [x / 2, y / 2, z / 2], 'r', '', -16, -4);
    }
    // Punkt
    const [px, py] = proj(P);
    el('circle', { cx: px, cy: py, r: 6, class: 'fill-point' }, g);
    text(g, px + 9, py - 9, 'M', 'start', 'math t-point');

    readout.innerHTML = `${M([`(x;\\, y;\\, z) = (${fmt(x, 2)};\\ ${fmt(y, 2)};\\ ${fmt(z, 2)})`])}<br>
      ${M([`(\\rho;\\, \\varphi;\\, z) = (${fmt(rho, 2)};\\ ${Math.round(phi * 180 / Math.PI)}^\\circ;\\ ${fmt(z, 2)})`])}<br>
      ${M([`(r;\\, \\theta;\\, \\psi) = (${fmt(r, 2)};\\ ${Math.round(th * 180 / Math.PI)}^\\circ;\\ ${Math.round(phi * 180 / Math.PI)}^\\circ)`])}`;
  }

  setMode('cyl');
}

/* ---------------- 2D-Figur: arctan(y/x) vs. echter Winkel ---------------- */
function atanFigure(host) {
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  let phiDeg = 135;
  controls.appendChild(slider({ label: M`\varphi =`, min: 0, max: 359, step: 1, value: phiDeg, format: (v) => M([`${v}^\\circ`]), onInput: (v) => { phiDeg = v; draw(); } }));
  host.append(controls, fig, readout);

  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 360, height: 360, xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5, pad: 20 });
    p.svg.style.maxWidth = '360px';
    el('rect', { x: p.X(0), y: p.Y(1.5), width: p.X(1.5) - p.X(0), height: p.Y(-1.5) - p.Y(1.5), class: 'fill-z', opacity: 0.08 }, p.svg);
    axes(p, { xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5, xlabel: 'x', ylabel: 'y' });
    el('circle', { cx: p.X(0), cy: p.Y(0), r: p.X(1) - p.X(0), fill: 'none', class: 's-dark', 'stroke-width': 0.6, opacity: 0.4 }, p.svg);
    const phi = (phiDeg * Math.PI) / 180;
    const [x, y] = [Math.cos(phi), Math.sin(phi)];
    const wrong = phiSkript(x, y);
    const ray = (a, cls, len = 1) => el('line', { x1: p.X(0), y1: p.Y(0), x2: p.X(len * Math.cos(a)), y2: p.Y(len * Math.sin(a)), class: cls, 'stroke-width': 2.5 }, p.svg);
    const arcPath = (a, rr) => {
      const pts = [];
      const steps = 48;
      for (let i = 0; i <= steps; i++) { const t = (a * i) / steps; pts.push(`${i ? 'L' : 'M'}${p.X(rr * Math.cos(t))},${p.Y(rr * Math.sin(t))}`); }
      return pts.join(' ');
    };
    ray(phi, 's-rho');
    el('path', { d: arcPath(phi, 0.35), class: 's-angle', fill: 'none', 'stroke-width': 2.5 }, p.svg);
    if (Number.isFinite(wrong)) {
      ray(wrong, 's-angle dashed', 1.3);
      el('path', { d: arcPath(wrong, 0.55), class: 's-angle dashed', fill: 'none', 'stroke-width': 1.5 }, p.svg);
    }
    el('circle', { cx: p.X(x), cy: p.Y(y), r: 6, class: 'fill-point' }, p.svg);
    const ok = Number.isFinite(wrong) && Math.abs(wrap2pi(wrong) - wrap2pi(phi)) < 1e-9;
    readout.innerHTML = `${M([`\\arctan\\!\\left(\\tfrac{y}{x}\\right) = ${Number.isFinite(wrong) ? Math.round((wrong * 180) / Math.PI) + '^\\circ' : '\\text{nicht definiert}'}`])} ${ok ? '✓ stimmt' : Math.abs(x) < 1e-9 ? '— bei x = 0 ist y/x nicht definiert' : `✗ falsch, richtig wäre ${M([`${phiDeg}^\\circ`])} (also ${M`\pi`} = 180° addieren)`}`;
  }
  draw();
}
