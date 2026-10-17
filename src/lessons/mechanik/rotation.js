import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps, more } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, el, text, arrowDefs } from '../../ui/svg.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Zwei Grundbewegungen des starren Körpers: Bei der <b>Translation</b> haben alle Punkte dieselbe Geschwindigkeit. Bei der <b>Rotation</b> stehen die Punkte einer Achse still, und alle anderen laufen auf Kreisen um diese Achse. Jede andere Bewegung wird sich später aus diesen beiden zusammensetzen.</p>

  ${section('translation', '1. Translation', `
    ${box('vorlesung', `<p>${M`M, N`}: 2 beliebige Punkte des Körpers, ${M`\v a = \v r_N - \v r_M`}. Starrer Körper: Betrag ${M`|\v a|`} ist konstant für alle ${M`t`}, die Richtung von ${M`\v a`} ist veränderlich. Falls ${M`\v a`} konstant ist in Betrag <b>und</b> Richtung, ist der Bewegungszustand eine <b>Translation</b>.</p>
      ${MD`\v a = \text{konst} \;\Rightarrow\; \dot{\v a} = \v 0 = \dot{\v r}_N - \dot{\v r}_M = \v v_N - \v v_M \;\Rightarrow\; \v v_N = \v v_M`}
      <p>Alle Punkte haben die gleiche Geschwindigkeit. Alle Bahnkurven sind <b>kongruent</b>: geradlinige oder krummlinige Translation.</p>`, { src: `${SRC} 13–14` })}
    ${box('achtung', `<p>Translation heisst <b>nicht</b> «geradeaus». Eine Gondel am Riesenrad bleibt immer aufrecht, bewegt sich aber auf einem Kreis: Das ist eine <b>kreisförmige Translation</b>. Entscheidend ist nur, dass sich der Körper nicht verdreht (jeder Pfeil ${M`\v a`} behält seine Richtung). Das Skript zeigt zusätzlich die <b>momentane Translation</b>: Nur in einem Augenblick haben alle Punkte dieselbe Geschwindigkeit.</p>`)}
  `)}

  ${section('rotation', '2. Rotation', `
    ${box('vorlesung', `<p><b>Rotation</b> liegt vor, falls 2 Punkte des Körpers in Ruhe sind. <b>Rotationsachse</b> ${M`\mu`}: Achse durch 2 Punkte des Körpers, die in Ruhe sind.</p>
      <p><b>Eigenschaften:</b></p><ol>
      <li>Alle Punkte auf ${M`\mu`} sind in Ruhe.</li>
      <li>Alle Punkte ${M`\notin\mu`}: Kreisbewegung.</li>
      <li>Die Winkelschnelligkeit ist gleich für alle Punkte.</li></ol>`, { src: `${SRC} 15` })}
    ${figure('fig-field', `Ein ebener Körper, gesehen in Richtung der Achse. Magenta: die Geschwindigkeiten einzelner Punkte. Bei der Rotation (Achse ${M`\mu`} durch den roten Punkt, senkrecht zum Bild) ist jeder Pfeil senkrecht zur Verbindung mit der Achse und umso länger, je weiter der Punkt entfernt ist. Bei der Translation sind alle Pfeile gleich.`, { wide: true })}
    <p><b>Eigenschaft 1 anschaulich</b> (S. 15): Ein Punkt ${M`C`} auf ${M`\mu`} zwischen den ruhenden Punkten ${M`A`} und ${M`D`}. Seine Geschwindigkeit hat keinen Anteil entlang ${M`\mu`} (aus dem SdpG mit ${M`A`}, das ruht). Sie hat auch keinen Anteil senkrecht zu ${M`\mu`}, sonst würde sich der Winkel ${M`\angle ACD`} von ${M`180^\circ`} ändern, und der Körper wäre nicht starr. Also ${M`\v v_C = \v 0`}.</p>
  `)}

  ${section('beweise', '3. Warum Kreise mit gleicher Winkelschnelligkeit?', `
    <p><b>Eigenschaft 2</b> (S. 16). ${M`P`} ist ein Punkt ausserhalb der Achse, ${M`D`} und ${M`A`} ruhen auf ${M`\mu`}. Für eine Kreisbewegung um ${M`\mu`} muss gelten: ${M`\v v_P \perp \overrightarrow{DP}`} und ${M`\v v_P \perp \mu`}.</p>
    ${steps([
      [M`\v v_P\cdot\overrightarrow{DP} = \v v_D\cdot\overrightarrow{DP} = 0 \;\Rightarrow\; \v v_P \perp \overrightarrow{DP}`, `SdpG zwischen ${M`P`} und ${M`D`}; ${M`D`} ruht.`],
      [M`\big(\overrightarrow{DP}\cdot\overrightarrow{DA}\big)^{\boldsymbol\cdot} = \big((\v r_P - \v r_D)\cdot(\v r_A - \v r_D)\big)^{\boldsymbol\cdot} = 0`, `Der Winkel zwischen ${M`\overrightarrow{DP}`} und ${M`\overrightarrow{DA}`} ist im starren Körper konstant, ebenso die Längen. Also ist das Skalarprodukt konstant.`],
      [M`\dot{\v r}_P\cdot(\v r_A - \v r_D) = 0 \;\Rightarrow\; \v v_P \perp \mu`, `Produktregel; die Terme mit ${M`\v v_A = \v v_D = \v 0`} fallen weg.`],
      [M`\v v_P = \dot\rho\,\v e_\rho + \rho\dot\varphi\,\v e_\varphi + \dot z\,\v e_z:\quad \v v_P\perp\v e_z \Rightarrow \dot z = 0,\quad \v v_P \perp \v e_\rho \Rightarrow \dot\rho = 0`, `Zylinderkoordinaten mit ${M`z`}-Achse ${M`= \mu`}. Also ${M`z = z_0`}, ${M`\rho = R`}: Kreisbewegung!`],
    ])}
    <p><b>Eigenschaft 3</b> (S. 17): Für zwei Punkte gilt ${M`\v v_P = \dot\varphi_P\,\v e_z\times\v r_P`} und ${M`\v v_Q = \dot\varphi_Q\,\v e_z\times\v r_Q`}. Setzt man beide in den SdpG ${M`\v v_P\cdot\overrightarrow{PQ} = \v v_Q\cdot\overrightarrow{PQ}`} ein und formt mit dem Spatprodukt um, bleibt ${M`\dot\varphi_P\,(\v e_z\times\v r_P)\cdot\v r_Q = \dot\varphi_Q\,(\v e_z\times\v r_P)\cdot\v r_Q`}, also ${M`\dot\varphi_P = \dot\varphi_Q`}.</p>
    ${more('Die Umformung im Detail (S. 17)', `
      ${steps([
        [M`\dot\varphi_P(\v e_z\times\v r_P)\cdot(\v r_Q - \v r_P) = \dot\varphi_Q(\v e_z\times\v r_Q)\cdot(\v r_Q - \v r_P)`, 'SdpG einsetzen.'],
        [M`(\v e_z\times\v r_P)\cdot\v r_P = 0,\quad (\v e_z\times\v r_Q)\cdot\v r_Q = 0`, `Ein Kreuzprodukt steht senkrecht auf seinen Faktoren. Je ein Term fällt weg.`],
        [M`\dot\varphi_P(\v e_z\times\v r_P)\cdot\v r_Q = -\dot\varphi_Q(\v e_z\times\v r_Q)\cdot\v r_P = \dot\varphi_Q(\v r_Q\times\v e_z)\cdot\v r_P`, `${M`-(\v a\times\v b) = \v b\times\v a`}.`],
        [M`(\v r_Q\times\v e_z)\cdot\v r_P = (\v e_z\times\v r_P)\cdot\v r_Q \;\Rightarrow\; \dot\varphi_P = \dot\varphi_Q`, `Spatprodukt: ${M`(\v a\times\v b)\cdot\v c = (\v b\times\v c)\cdot\v a`}. Beide Seiten haben denselben Faktor, er kürzt sich (solange er nicht 0 ist).`],
      ])}`)}
    ${box('vorlesung', `<p>Somit: Bei der Rotation führen alle Punkte eine Kreisbewegung mit der «Winkelgeschwindigkeit» oder «Rotationsgeschwindigkeit» ${M`\v\omega = \dot\varphi\,\v e_\mu`} aus. Mit ${M`\mu = z'Oz`}: ${M`\v\omega = \dot\varphi\,\v e_z`} und</p>
      ${MD`\v v = \v\omega\times\v r = \dot\varphi\,\v e_z \times \v r \qquad (3)`}
      <p>(mit ${M`O`} auf ${M`\mu`}). Die Gleichung ${M`\v v = \v\omega\times\v r`} gilt auch, falls ${M`\mu \ne z'Oz`}, solange der Ursprung ${M`O`} auf ${M`\mu`} ist!</p>`, { src: `${SRC} 17–18` })}
    ${box('merke', `<p>Rotation: ein einziger Vektor ${M`\v\omega`} beschreibt die Geschwindigkeit <em>aller</em> Punkte. Daraus folgt: ${M`|\v v| = |\v\omega|\cdot`} (Abstand zur Achse). Die Geschwindigkeit wächst linear mit dem Abstand.</p>`)}
  `)}
  `;
  fieldFigure(root.querySelector('#fig-field'));
}

function fieldFigure(host) {
  let mode = 'rot';
  let w = 0.6, ax = -0.6, ay = -0.3;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const sl = document.createElement('div');
  sl.className = 'fig-controls';
  const fig = document.createElement('div');
  const modes = buttonRow([
    { label: 'Rotation', onClick: () => { mode = 'rot'; draw(); } },
    { label: 'Translation', onClick: () => { mode = 'trans'; draw(); } },
  ]);
  modes.firstChild.classList.add('active');
  controls.appendChild(modes);
  sl.append(
    slider({ label: M`\omega =`, min: -1, max: 1, step: 0.05, value: w, format: (v) => M([fmt(v, 2)]), onInput: (v) => { w = v; draw(); } }),
    slider({ label: M`\mu\text{ bei } x =`, min: -2, max: 2, step: 0.1, value: ax, format: (v) => M([fmt(v, 1)]), onInput: (v) => { ax = v; draw(); } }),
  );
  host.append(controls, sl, fig);
  // ein Körper: unregelmässige Platte
  const shape = [[-2.2, -1.2], [1.8, -1.6], [2.4, 0.6], [0.6, 1.8], [-1.6, 1.4]];
  function inside([x, y]) {
    let c = false;
    for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
      const [xi, yi] = shape[i], [xj, yj] = shape[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 600, height: 360, xmin: -3.4, xmax: 3.6, ymin: -2.3, ymax: 2.4, pad: 6 });
    p.svg.style.maxWidth = '600px';
    arrowDefs(p.svg);
    el('path', { d: shape.map((q, i) => `${i ? 'L' : 'M'}${p.X(q[0])},${p.Y(q[1])}`).join(' ') + 'Z', class: 'fill-rho', opacity: 0.12 }, p.svg);
    el('path', { d: shape.map((q, i) => `${i ? 'L' : 'M'}${p.X(q[0])},${p.Y(q[1])}`).join(' ') + 'Z', class: 's-rho', fill: 'none', 'stroke-width': 1.5 }, p.svg);
    for (let x = -2.2; x <= 2.4; x += 0.6) for (let y = -1.5; y <= 1.8; y += 0.6) {
      if (!inside([x, y])) continue;
      const v = mode === 'trans' ? [0.6, 0.25] : [-w * (y - ay), w * (x - ax)];
      const k = 0.9;
      el('circle', { cx: p.X(x), cy: p.Y(y), r: 2.2, class: 'fill-dark' }, p.svg);
      if (Math.hypot(...v) > 0.02) el('line', { x1: p.X(x), y1: p.Y(y), x2: p.X(x + k * v[0]), y2: p.Y(y + k * v[1]), class: 's-vel', 'stroke-width': 2, 'marker-end': 'url(#arr-vel)' }, p.svg);
    }
    if (mode === 'rot') {
      for (const r of [0.6, 1.2, 1.8, 2.4]) el('circle', { cx: p.X(ax), cy: p.Y(ay), r: p.X(r) - p.X(0), fill: 'none', class: 's-dark dashed', 'stroke-width': 0.6, opacity: 0.5 }, p.svg);
      el('circle', { cx: p.X(ax), cy: p.Y(ay), r: 6, class: 'fill-point' }, p.svg);
      text(p.svg, p.X(ax) + 9, p.Y(ay) + 18, 'μ', 'start', 'math t-point');
    }
  }
  draw();
}
