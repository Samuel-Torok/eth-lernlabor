import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider } from '../../ui/controls.js';
import { plot, el, text, arrowDefs } from '../../ui/svg.js';
import { centralAxisPoint, rigidVelocity } from '../../math/vec.js';

const SRC = 'Mitschrift Mechanik I, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Rollen, Kreiselung und die allgemeinste Bewegung haben eines gemeinsam: Man beschreibt sie über einen Punkt und den Vektor ${M`\v\omega`}. Am Ende steht die <b>Grundgleichung</b> ${M`\v v_M = \v v_B + \v\omega\times\overrightarrow{BM}`}. Mit ihr berechnet man die Geschwindigkeit jedes Punktes eines starren Körpers.</p>

  ${section('rollen', '1. Rollen: momentane Rotation', `
    ${box('intuition', `<p>Ein Autoreifen auf trockener Strasse hinterlässt keine Bremsspuren. Der Teil des Reifens, der gerade den Boden berührt, steht also für einen Augenblick still. Darum dreht sich das Rad in diesem Augenblick um die Berührlinie, nicht um seine eigene Achse.</p>`)}
    ${box('vorlesung', `<p><b>Rollen: momentane Rotation.</b> Ein Zylinder rollt auf einer Ebene, Berührlinie ${M`AB`}, eigene Achse ${M`CD`}. Momentane Drehachse ${M`\mu \leftrightarrow AB`}, nicht ${M`CD`}.</p>`, { src: `${SRC} 20` })}
    <p><b>Warum?</b> Die Punkte auf ${M`AB`} ruhen in diesem Augenblick. Zwei ruhende Punkte bedeuten nach der Definition eine Rotation, hier mit der Achse ${M`AB`}. «Momentan», weil im nächsten Augenblick eine andere Linie den Boden berührt.</p>
    ${box('vorlesung', `<p><b>Gleiten/Rollen.</b> Kontakt (ohne Eindringen) zweier Körper in den Punkten ${M`Z_1, Z_2`} mit gemeinsamer Tangentialebene ${M`E`}. ${M`\v n`}: Einheitsvektor ${M`\perp E`}, ${M`\v t`}: Einheitsvektor in ${M`E`}.</p>
      <ul><li>«Kontakt»: ${M`v_n(Z_1) = v_n(Z_2)`}</li>
      <li>Gleiten: ${M`v_t(Z_1) \ne v_t(Z_2)`}</li>
      <li>Rollen: ${M`v_t(Z_1) = v_t(Z_2)`}</li></ul>
      <p>Falls ${M`Z_2`} in Ruhe: ${M`\v v(Z_1) = \v 0 \leftrightarrow`} Rollen; ${M`\v v(Z_1) = \v v_t(Z_1) \ne \v 0 \leftrightarrow`} Gleiten.</p>`, { src: `${SRC} 20` })}
    ${figure('fig-roll', `Ein Rad (Radius ${M`R`}) auf ruhendem Boden. Stelle die Geschwindigkeit der Mitte ${M`v_C`} und die Drehgeschwindigkeit ${M`\omega`} ein. Ist ${M`v_C = R\omega`}, ruht der Kontaktpunkt: <b>Rollen</b>, und alle Pfeile stehen senkrecht auf der Verbindung zum Kontaktpunkt. Sonst hat der Kontaktpunkt eine Geschwindigkeit: <b>Gleiten</b> (durchdrehen oder blockieren).`, { wide: true })}
    ${box('achtung', `<p>Beim Rollen ist der <b>oberste</b> Punkt doppelt so schnell wie die Mitte (${M`2v_C`}), der unterste steht still. Deshalb sieht man bei einem fahrenden Velo die Speichen oben verwischt und unten scharf.</p>`)}
  `)}

  ${section('kreiselung', '2. Kreiselung', `
    ${box('vorlesung', `<p><b>Kreiselung</b> liegt vor, falls nur 1 Punkt in Ruhe ist. Wähle diesen als ${M`O`}. Bahnkurven: auf Kugeln mit Radius ${M`|\v r|`}.</p>
      <p><b>Behauptung:</b> Momentan ist nicht nur ${M`O`} in Ruhe, sondern eine ganze Achse durch ${M`O`}. Kreiselung ist also eine <b>momentane Rotation</b>: ${M`\v v = \v\omega\times\v r`}.</p>`, { src: `${SRC} 20–21` })}
    <p><b>Beweisidee</b> (S. 21): Nimm zwei Punkte ${M`M`} und ${M`N`}. Lege durch ${M`O`} die Ebene ${M`E_M \perp \v v_M`} und die Ebene ${M`E_N\perp\v v_N`}. Die beiden Ebenen schneiden sich in einer Geraden durch ${M`O`}; ${M`A`} sei ein Punkt darauf.</p>
    ${steps([
      [M`\v v_A\cdot\overrightarrow{AM} = \v v_M\cdot\overrightarrow{AM} = 0 \;\Rightarrow\; \v v_A = \v 0 \text{ oder } \v v_A\perp\overrightarrow{AM}`, `SdpG zwischen ${M`A`} und ${M`M`}. ${M`\v v_M\cdot\overrightarrow{AM} = 0`}, weil ${M`A`} und ${M`M`} beide in der Ebene ${M`E_M\perp\v v_M`} liegen.`],
      [M`\v v_A = \v 0 \text{ oder } \v v_A\perp\overrightarrow{AN}`, `Genauso mit ${M`N`}.`],
      [M`\v v_A\cdot\overrightarrow{AO} = \v v_O\cdot\overrightarrow{AO} = 0`, `SdpG mit dem ruhenden Punkt ${M`O`}: ${M`\v v_A`} hat auch keinen Anteil entlang ${M`AO`}.`],
      [M`\v v_A \perp \overrightarrow{AM},\ \overrightarrow{AN},\ \overrightarrow{AO} \;\Rightarrow\; \v v_A = \v 0`, 'Ein Vektor, der auf drei Richtungen senkrecht steht, die nicht in einer Ebene liegen, ist der Nullvektor. Also ruht die ganze Gerade OA.'],
    ])}
  `)}

  ${section('allgemein', '3. Allgemeinste Bewegung und Grundgleichung', `
    ${box('vorlesung', `<p>Kombination von Kreiselung und Translation ergibt den allgemeinsten Bewegungszustand des starren Körpers. Mit einem Bezugspunkt ${M`B`} des Körpers ${M`K`}:</p>
      ${MD`\v r_M = \v r_B + \v\rho,\qquad \dot{\v r}_M = \v v_M = \v v_B + \dot{\v\rho}`}
      <p>${M`\dot{\v\rho}`}: Geschwindigkeit von ${M`M`} bezüglich ${M`B`}. Bezüglich ${M`B`} führen alle Punkte eine Kreiselung aus: ${M`\dot{\v\rho} = \v\omega^*\times\overrightarrow{BM}`}.</p>`, { src: `${SRC} 22` })}
    <p><b>Ist ${M`\v\omega`} für jeden Bezugspunkt gleich?</b> Das Skript zeigt: ja. Mit einem anderen Bezugspunkt ${M`C`} gilt ${M`\v v_M = \v v_C + \v\omega^{**}\times\overrightarrow{CM}`}.</p>
    ${steps([
      [M`\v v_B + \v\omega^*\times\overrightarrow{BM} = \v v_C + \v\omega^{**}\times\overrightarrow{CM}`, `Beide Darstellungen beschreiben dieselbe Geschwindigkeit ${M`\v v_M`}.`],
      [M`\v v_B + \v\omega^*\times\overrightarrow{BC} + \v\omega^*\times\overrightarrow{CM} = \v v_C + \v\omega^{**}\times\overrightarrow{CM}`, `${M`\overrightarrow{BM} = \overrightarrow{BC} + \overrightarrow{CM}`} einsetzen.`],
      [M`\v v_C = \v v_B + \v\omega^*\times\overrightarrow{BC}`, `Dieselbe Gleichung, angewendet auf den Punkt ${M`C`}. Damit kürzen sich die ersten zwei Terme links gegen ${M`\v v_C`} rechts.`],
      [M`\v\omega^*\times\overrightarrow{CM} = \v\omega^{**}\times\overrightarrow{CM} \text{ für alle } M \;\Rightarrow\; \v\omega^* = \v\omega^{**} = \v\omega`, `Gilt für beliebige ${M`M`}, also müssen die Vektoren gleich sein.`],
    ])}
    ${box('vorlesung', `<p><b>Grundgleichung des Bewegungszustandes eines starren Körpers:</b></p>${MD`\v v_M = \v v_B + \v\omega\times\overrightarrow{BM} \qquad \forall\, M, B \in K`}<p>Aus ${M`\v v_B`} und ${M`\v\omega`} kann man die Geschwindigkeit in jedem Punkt berechnen!</p>`, { src: `${SRC} 22` })}
    ${figure('fig-general', `Ebene Bewegung: Bezugspunkt ${M`B`} (rot) mit Geschwindigkeit ${M`\v v_B`} und ${M`\v\omega`} senkrecht zur Bildebene. Die Pfeile zeigen ${M`\v v_M = \v v_B + \v\omega\times\overrightarrow{BM}`} in vielen Punkten. Es gibt immer genau einen Punkt mit ${M`\v v = \v 0`} (violett, das Momentanzentrum), solange ${M`\omega \ne 0`}. Der Körper dreht sich in diesem Augenblick um diesen Punkt. Bei ${M`\omega = 0`}: Translation.`, { wide: true })}
  `)}

  ${section('kinemate', '4. Kinemate und Invarianten', `
    ${box('vorlesung', `<p><b>Spezialfälle:</b> ${M`\v\omega = \v 0 \Rightarrow \v v_M = \v v_B`}: Translation. ${M`\v v_B = \v 0 \Rightarrow \v v_M = \v\omega\times\overrightarrow{BM}`}: Rotation, Achse durch ${M`B`}.</p>
      <p>Im Allgemeinen: ${M`\{\v v_B, \v\omega\}`}: <b>Kinemate</b> in ${M`B`}, sie charakterisiert den Bewegungszustand. Wechselt man den Punkt, ist ${M`\v\omega' = \v\omega`}: <b>1. Invariante</b> (unabhängig vom Ort), aber ${M`\v v_P = \v v_B + \v\omega\times\overrightarrow{BP} \ne \v v_B`}.</p>
      ${MD`\v v_P\cdot\v e_\omega = \v v_B\cdot\v e_\omega + \underbrace{(\v\omega\times\overrightarrow{BP})\cdot\v e_\omega}_{=\,0}`}
      <p>Die Projektion von ${M`\v v`} in Richtung von ${M`\v\omega`}, ${M`\v v_\omega`}, ist in jedem Punkt gleich: <b>2. Invariante</b>.</p>`, { src: `${SRC} 24` })}
    ${box('vorlesung', `<p>Allgemeine Bewegung als <b>«Schraubung»</b> um die Zentralachse ${M`\zeta`}. Kinemate der Punkte auf ${M`\zeta`}: ${M`\{\v v_\omega, \v\omega\}`}, die «Schraube». ${M`|\v v|`} ist minimal auf ${M`\zeta`} und wächst mit dem Abstand von ${M`\zeta`}. ${M`\zeta`} braucht nicht materieller Bestandteil des Körpers zu sein. ${M`|\v v_\omega| = \v v_B\cdot\frac{\v\omega}{|\v\omega|}`}.</p>
      <p><b>Spezialfälle:</b> ${M`\v\omega = \v 0`}: Translation. ${M`\v\omega\ne\v 0,\ \v v_B = \v 0`}: Rotation, ${M`B\in\mu`}. ${M`\v\omega\ne\v 0,\ \v v_B\perp\v\omega`}: Rotation, ${M`B\notin\mu`}. Wichtige Anwendung: ebene Bewegung.</p>`, { src: `${SRC} 25` })}
    <p><b>So liest man das:</b> Jede Bewegung eines starren Körpers sieht in einem Augenblick aus wie eine Schraube, die sich dreht (${M`\v\omega`}) und dabei entlang ihrer Achse vorschiebt (${M`\v v_\omega`}). Ist der Vorschub null (${M`\v v_B\perp\v\omega`}), bleibt eine reine Drehung. Das ist genau der Fall der ebenen Bewegung in der Figur oben: Das Momentanzentrum ist dort, wo die Zentralachse die Ebene durchstösst.</p>
    ${box('ergaenzung', `<p>Lage der Zentralachse: Der Punkt ${M`Z`} auf ${M`\zeta`}, der ${M`B`} am nächsten liegt, ist ${M`\v r_Z = \v r_B + \dfrac{\v\omega\times\v v_B}{|\v\omega|^2}`}. Geprüft in <code>vec.test.js</code>: Dort ist ${M`\v v_Z \parallel \v\omega`}, in der Ebene sogar ${M`\v v_Z = \v 0`}.</p>`)}
  `)}
  `;
  rollFigure(root.querySelector('#fig-roll'));
  generalFigure(root.querySelector('#fig-general'));
}

function rollFigure(host) {
  const R = 1;
  const s = { vC: 1, w: 1 };
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.append(
    slider({ label: M`v_C =`, min: 0, max: 1.5, step: 0.05, value: s.vC, format: (v) => M([fmt(v, 2)]), onInput: (v) => { s.vC = v; draw(); } }),
    slider({ label: M`R\omega =`, min: 0, max: 1.5, step: 0.05, value: s.w, format: (v) => M([fmt(v, 2)]), onInput: (v) => { s.w = v; draw(); } }),
  );
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 600, height: 300, xmin: -2.2, xmax: 3.6, ymin: -0.35, ymax: 2.55, pad: 6 });
    p.svg.style.maxWidth = '600px';
    arrowDefs(p.svg);
    el('line', { x1: p.X(-2.2), y1: p.Y(0), x2: p.X(3.6), y2: p.Y(0), class: 's-dark', 'stroke-width': 1.5 }, p.svg);
    for (let i = 0; i < 24; i++) el('line', { x1: p.X(-2.1 + i * 0.25), y1: p.Y(0), x2: p.X(-2.2 + i * 0.25), y2: p.Y(-0.12), class: 's-dark', 'stroke-width': 0.6 }, p.svg);
    const C = [0, R];
    el('circle', { cx: p.X(0), cy: p.Y(R), r: p.X(R) - p.X(0), class: 'fill-rho', opacity: 0.12 }, p.svg);
    el('circle', { cx: p.X(0), cy: p.Y(R), r: p.X(R) - p.X(0), class: 's-rho', fill: 'none', 'stroke-width': 2 }, p.svg);
    const omega = [0, 0, -s.w / R]; // Uhrzeigersinn
    const k = 0.5;
    for (let i = 0; i < 12; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 6;
      const P = [R * Math.cos(a), R + R * Math.sin(a), 0];
      const v = rigidVelocity([s.vC, 0, 0], omega, [0, R, 0], P);
      el('circle', { cx: p.X(P[0]), cy: p.Y(P[1]), r: 3, class: 'fill-dark' }, p.svg);
      if (Math.hypot(v[0], v[1]) > 0.01) el('line', { x1: p.X(P[0]), y1: p.Y(P[1]), x2: p.X(P[0] + k * v[0]), y2: p.Y(P[1] + k * v[1]), class: 's-vel', 'stroke-width': 2.2, 'marker-end': 'url(#arr-vel)' }, p.svg);
    }
    el('line', { x1: p.X(0), y1: p.Y(R), x2: p.X(k * s.vC), y2: p.Y(R), class: 's-vel', 'stroke-width': 3, 'marker-end': 'url(#arr-vel)' }, p.svg);
    el('circle', { cx: p.X(0), cy: p.Y(R), r: 4, class: 'fill-dark' }, p.svg);
    text(p.svg, p.X(0) - 8, p.Y(R) - 8, 'C', 'end', 'math');
    const slip = s.vC - s.w;
    el('circle', { cx: p.X(0), cy: p.Y(0), r: 6, class: Math.abs(slip) < 1e-9 ? 'fill-angle' : 'fill-point' }, p.svg);
    text(p.svg, p.X(0) + 9, p.Y(0) + 18, 'A', 'start', 'math');
    const kind = Math.abs(slip) < 1e-9 ? '<b>Rollen</b>: Der Kontaktpunkt ruht.' : slip > 0 ? '<b>Gleiten</b> (das Rad dreht zu langsam, z.B. Bremsen): Der Kontaktpunkt rutscht nach vorne.' : '<b>Gleiten</b> (das Rad dreht zu schnell, z.B. Durchdrehen): Der Kontaktpunkt rutscht nach hinten.';
    readout.innerHTML = `${M([`\\v v_A = v_C - R\\omega = ${fmt(slip, 2)}`])}. ${kind}`;
  }
  draw();
}

function generalFigure(host) {
  const s = { v: 1, dir: 20, w: 0.5 };
  const B = [-0.8, -0.4, 0];
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.append(
    slider({ label: M`|\v v_B| =`, min: 0, max: 1.5, step: 0.05, value: s.v, format: (v) => M([fmt(v, 2)]), onInput: (v) => { s.v = v; draw(); } }),
    slider({ label: M`\text{Richtung} =`, min: 0, max: 359, step: 1, value: s.dir, format: (v) => M([`${v}^\\circ`]), onInput: (v) => { s.dir = v; draw(); } }),
    slider({ label: M`\omega =`, min: -1, max: 1, step: 0.05, value: s.w, format: (v) => M([fmt(v, 2)]), onInput: (v) => { s.w = v; draw(); } }),
  );
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 600, height: 380, xmin: -3.4, xmax: 3.4, ymin: -2.2, ymax: 2.2, pad: 6 });
    p.svg.style.maxWidth = '600px';
    arrowDefs(p.svg);
    const d = (s.dir * Math.PI) / 180;
    const vB = [s.v * Math.cos(d), s.v * Math.sin(d), 0];
    const w = [0, 0, s.w];
    const k = 0.55;
    for (let x = -3; x <= 3.01; x += 0.6) for (let y = -1.8; y <= 1.81; y += 0.6) {
      const v = rigidVelocity(vB, w, B, [x, y, 0]);
      el('circle', { cx: p.X(x), cy: p.Y(y), r: 1.8, class: 'fill-dark', opacity: 0.6 }, p.svg);
      if (Math.hypot(v[0], v[1]) > 0.02) el('line', { x1: p.X(x), y1: p.Y(y), x2: p.X(x + k * v[0]), y2: p.Y(y + k * v[1]), class: 's-vel', 'stroke-width': 1.6, 'marker-end': 'url(#arr-vel)', opacity: 0.85 }, p.svg);
    }
    el('line', { x1: p.X(B[0]), y1: p.Y(B[1]), x2: p.X(B[0] + 1.2 * vB[0]), y2: p.Y(B[1] + 1.2 * vB[1]), class: 's-point', 'stroke-width': 3, 'marker-end': 'url(#arr-point)' }, p.svg);
    el('circle', { cx: p.X(B[0]), cy: p.Y(B[1]), r: 6, class: 'fill-point' }, p.svg);
    text(p.svg, p.X(B[0]) - 10, p.Y(B[1]) + 18, 'B', 'end', 'math t-point');
    let msg;
    if (Math.abs(s.w) < 1e-9) msg = `${M`\v\omega = \v 0`}: <b>Translation</b>, alle Pfeile sind gleich.`;
    else {
      const Z = centralAxisPoint(B, vB, w);
      const inView = Math.abs(Z[0]) < 3.4 && Math.abs(Z[1]) < 2.2;
      if (inView) {
        el('circle', { cx: p.X(Z[0]), cy: p.Y(Z[1]), r: 7, class: 'fill-angle' }, p.svg);
        text(p.svg, p.X(Z[0]) + 10, p.Y(Z[1]) - 8, 'Z', 'start', 'math t-angle');
      }
      msg = `Momentanzentrum ${M([`Z = (${fmt(Z[0], 2)};\\ ${fmt(Z[1], 2)})`])}${inView ? '' : ' (ausserhalb des Bildes)'}: Dort ist ${M`\v v = \v 0`}. Der Körper dreht sich momentan um ${M`Z`}.`;
    }
    readout.innerHTML = msg;
  }
  draw();
}
