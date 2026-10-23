import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps, more } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, el, text, arrowDefs } from '../../ui/svg.js';
import { fachwerkBeispiel } from '../../math/fachwerk.js';
import { rigidVelocity } from '../../math/vec.js';

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
    <p>Das Beispiel auf S. 30 wird im nächsten Abschnitt Schritt für Schritt gelöst, so wie in der Vorlesung.</p>
  `)}

  ${beispielSection()}

  ${section('parallelogramm', '3. Die Parallelogrammregel', `
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
  trussFigure(root.querySelector('#fig-truss'));
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

/* ---------------------------------------------------------------------------------------------
 * Beispiel S. 30, gelöst wie in der Vorlesung (annotierte Fassung des Studenten).
 * Alle Zahlen sind in src/math/fachwerk.test.js unabhängig nachgerechnet.
 * ------------------------------------------------------------------------------------------- */
function beispielSection() {
  return section('beispiel', '2. Beispiel: alle Stäbe eines Fachwerks in sechs Etappen', `
    ${box('vorlesung', `<p><b>Beispiel.</b> Gegeben: ${M`\v v_B = \begin{pmatrix}-v\\0\\0\end{pmatrix}`}. Gesucht: ${M`\v\omega_i`} und ${M`Z_i`} für alle Stäbe.</p>
      <p>Fachwerk mit den Knoten ${M`A, C, D, E, F, B`}: ${M`A`} drehbar an der Wand, ${M`\overline{AC} = L`}, ${M`\overline{AD} = \sqrt2 L`}. Stäbe ${M`1`} bis ${M`5`} (${M`AC, AD, CD, CE, DE`}), Stab ${M`6`} (${M`DF`}), Stab ${M`7`} (${M`FB`}), Stab ${M`8`} (${M`EB`}).</p>`, { src: `${SRC} 30 + Lösung VL` })}

    ${box('intuition', `<p>Ein Fachwerk löst man wie eine Kette: Man beginnt beim Körper, über den man am meisten weiss, und reicht die Geschwindigkeit von Gelenk zu Gelenk weiter. Ein Gelenk gehört zu zwei Stäben, darum hat es in beiden <em>dieselbe</em> Geschwindigkeit. Das ist die Brücke von einem Stab zum nächsten.</p>`)}

    <p><b>Der Fahrplan</b> (jede Etappe braucht nur, was vorher berechnet wurde):</p>
    <ol>
      <li>Körper ${M`1`}–${M`5`} dreht um ${M`A`} → <em>Richtungen</em> von ${M`\v v_C, \v v_D, \v v_E`}.</li>
      <li>Stab ${M`8`}: ${M`\v v_B`} ganz bekannt, ${M`\v v_E`} der Richtung nach → ${M`Z_8`}, ${M`\omega_8`}.</li>
      <li>Gelenk ${M`E`} verbindet Stab ${M`8`} mit Körper ${M`1`}–${M`5`} → ${M`\omega_{1-5}`}, ${M`\v v_E`}.</li>
      <li>${M`\v v_D`} aus ${M`\omega_{1-5}`}; ${M`\v v_F`} aus zweimal SdpG.</li>
      <li>Stab ${M`6`}: ${M`Z_6`}, ${M`\omega_6`}.</li>
      <li>Stab ${M`7`}: ${M`Z_7`}, ${M`\omega_7`}.</li>
    </ol>

    ${figure('fig-truss', `Klicke dich durch die Etappen. Farben: Körper ${M`1`}–${M`5`} blau, Stab ${M`8`} bernstein, Stab ${M`6`} grün, Stab ${M`7`} türkis; Momentanzentren violett, Geschwindigkeiten magenta, Hilfsgeraden gestrichelt. Entlang eines Stabs wachsen die Geschwindigkeiten linear mit dem Abstand zu seinem ${M`Z`} (Etappe 5 und «Alles»).`, { wide: true })}

    <p><b>Basis und Lage der Knoten.</b> Ursprung in ${M`A`}, ${M`\e x`} nach rechts, ${M`\e y`} nach oben, ${M`\e z`} aus der Ebene heraus. Aus der Skizze (alle schrägen Stäbe unter ${M`45^\circ`}):</p>
    ${MD`A = (0,0),\ C = (L,0),\ D = (L,-L),\ E = (2L,-L),\ F = (2L,-2L),\ B = (3L,-2L)`}
    ${box('ergaenzung', `<p>Diese Koordinaten sind aus der Skizze abgelesen (Stäbe ${M`4`}, ${M`6`}, ${M`8`} parallel zu ${M`AD`}, ${M`\overline{DE} = \overline{FB} = L`}). Mit ihnen ergeben sich genau die Zahlen der Vorlesung.</p>`)}

    <h3>Etappe 1: Stäbe ${M`1`}–${M`5`} sind ein einziger Körper, der um ${M`A`} dreht</h3>
    ${steps([
      [M`\text{Dreiecke } ACD \text{ und } CDE \text{ sind starr}`, `Ein Dreieck aus Stäben kann seine Form nicht ändern. Zwei Dreiecke mit gemeinsamer Seite ${M`CD`} auch nicht. Also bewegen sich die Stäbe ${M`1`} bis ${M`5`} wie <em>ein</em> starrer Körper.`],
      [M`\v v_A = \v 0 \;\Rightarrow\; Z_{1-5} \equiv A`, `${M`A`} ist ein festes Gelenk. Der Körper dreht also um ${M`A`} (Satz vom Momentanzentrum, SMZ).`],
      [M`\v v_C \perp AC,\quad \v v_D \perp AD,\quad \v v_E \perp AE`, `Bei einer Rotation um ${M`A`} steht jede Geschwindigkeit senkrecht auf der Verbindung zu ${M`A`}. Die Beträge kennen wir noch nicht, nur die <b>Richtungen</b>.`],
    ])}

    <h3>Etappe 2: Momentanzentrum und ${M`\omega`} von Stab ${M`8`}</h3>
    ${steps([
      [M`Z_8 = (\text{Senkrechte zu } \v v_B \text{ durch } B) \cap (\text{Senkrechte zu } \v v_E \text{ durch } E)`, `Stab ${M`8`} enthält ${M`B`} und ${M`E`}. Von beiden kennen wir die Richtung der Geschwindigkeit. ${M`Z`} liegt auf beiden Senkrechten.`],
      [M`\text{Senkrechte durch } B: x = 3L, \qquad \text{Senkrechte durch } E: \text{Gerade } AE,\ y = -\tfrac{x}{2}`, `${M`\v v_B`} ist waagrecht, also ist die Senkrechte vertikal. ${M`\v v_E \perp AE`}, also ist die Senkrechte die Gerade ${M`AE`} selbst (verlängert über ${M`E`} hinaus).`],
      [M`Z_8 = \big(3L,\ -\tfrac32 L\big),\qquad |\overrightarrow{Z_8B}| = \tfrac{L}{2}`, `Schnittpunkt einsetzen: ${M`y = -\tfrac{3L}{2}`}. ${M`Z_8`} liegt ${M`\tfrac L2`} über ${M`B`}.`],
      [M`\omega_8 = \frac{v}{L/2} = \frac{2v}{L} \;\Rightarrow\; \v\omega_8 = \begin{pmatrix}0\\0\\-\frac{2v}{L}\end{pmatrix}`, `Betrag = Schnelligkeit / Abstand. Vorzeichen: ${M`B`} liegt unter ${M`Z_8`} und läuft nach links, also dreht Stab ${M`8`} im Uhrzeigersinn, das ist ${M`-\e z`}.`],
    ])}

    <h3>Etappe 3: ${M`\omega`} des Körpers ${M`1`}–${M`5`} über das Gelenk ${M`E`}</h3>
    ${steps([
      [M`\omega_{1-5}\,|\overrightarrow{AE}| = |\v v_E| = \omega_8\,|\overrightarrow{Z_8E}|`, `${M`E`} gehört zu beiden Körpern, hat also nur <em>eine</em> Geschwindigkeit. Links aus Sicht von Körper ${M`1`}–${M`5`}, rechts aus Sicht von Stab ${M`8`}.`],
      [M`|\overrightarrow{AE}| = \sqrt{(2L)^2 + L^2} = \sqrt5\,L,\qquad |\overrightarrow{Z_8E}| = \sqrt{L^2 + \big(\tfrac L2\big)^2} = \tfrac{\sqrt5}{2}L`, 'Pythagoras mit den Koordinaten.'],
      [M`\omega_{1-5} = \tfrac12\,\omega_8 = \frac{v}{L} \;\Rightarrow\; \v\omega_{1-5} = \begin{pmatrix}0\\0\\\frac{v}{L}\end{pmatrix}`, `${M`A`}, ${M`E`} und ${M`Z_8`} liegen auf einer Geraden, aber auf verschiedenen Seiten von ${M`E`}. Darum dreht Körper ${M`1`}–${M`5`} im Gegenuhrzeigersinn (${M`+\e z`}), Stab ${M`8`} im Uhrzeigersinn.`],
    ])}
    ${more(`Drei Wege zu ${M`\v v_E`} (wie in der Vorlesung a, b, c)`, `
      <p><b>a) Grundgleichung</b> mit dem Momentanzentrum:</p>
      ${MD`\v v_E = \v\omega_8\times\overrightarrow{Z_8E} = \begin{pmatrix}0\\0\\-\frac{2v}{L}\end{pmatrix}\times\begin{pmatrix}-L\\\frac L2\\0\end{pmatrix} = \begin{pmatrix}v\\2v\\0\end{pmatrix}`}
      <p><b>b) Nur der Betrag:</b> ${M`\v v_E\perp\overrightarrow{Z_8E}`} und ${M`|\v v_E| = |\omega_8|\cdot|\overrightarrow{Z_8E}| = \frac{2v}{L}\cdot\sqrt{L^2 + \tfrac{L^2}{4}} = \sqrt5\,v`}.</p>
      <p><b>c) Hilfspunkte und SdpG.</b> Denke Stab ${M`8`} auf die ganze Ebene ausgedehnt. ${M`H_2`} liegt waagrecht neben ${M`E`}, direkt über ${M`Z_8`}; ${M`H_1`} liegt senkrecht unter ${M`E`}, auf Höhe von ${M`Z_8`}.</p>
      ${MD`|\v v_{H_2}| = \omega_8\cdot\tfrac L2 = v \ (\text{waagrecht}),\qquad |\v v_{H_1}| = \omega_8\cdot L = 2v \ (\text{senkrecht})`}
      <p>SdpG ${M`E\leftrightarrow H_2`} (Verbindung waagrecht) liefert ${M`v_{Ex} = v`}, SdpG ${M`E\leftrightarrow H_1`} (Verbindung senkrecht) liefert ${M`v_{Ey} = 2v`}. Gleiches Ergebnis, ganz ohne Kreuzprodukt.</p>
    `)}

    <h3>Etappe 4: Geschwindigkeiten von ${M`D`} und ${M`F`}</h3>
    ${steps([
      [M`\v v_D = \v\omega_{1-5}\times\overrightarrow{AD} = \begin{pmatrix}0\\0\\\frac vL\end{pmatrix}\times\begin{pmatrix}L\\-L\\0\end{pmatrix} = \begin{pmatrix}v\\v\\0\end{pmatrix},\quad |\v v_D| = \omega_{1-5}\sqrt2 L = \sqrt2\,v`, `${M`D`} gehört zum Körper ${M`1`}–${M`5`}, dessen ${M`\v\omega`} wir jetzt kennen.`],
      [M`\v v_D\perp AD,\ DF \;\Rightarrow\; \v v_F \perp DF \quad(\text{SdpG Stab } 6)`, `${M`DF`} liegt auf derselben Geraden wie ${M`AD`}. ${M`\v v_D`} hat also <em>keine</em> Komponente entlang Stab ${M`6`}. Nach dem SdpG hat dann auch ${M`\v v_F`} keine.`],
      [M`v_{Fx} = v_{Bx} = -v \quad(\text{SdpG Stab } 7)`, `Stab ${M`7`} ist waagrecht, also müssen ${M`F`} und ${M`B`} dieselbe ${M`x`}-Komponente haben.`],
      [M`\v v_F = \begin{pmatrix}-v\\-v\\0\end{pmatrix},\qquad |\v v_F| = \sqrt2\,v`, `${M`\v v_F\perp(1,-1)`} heisst ${M`v_{Fx} = v_{Fy}`}. Zusammen mit ${M`v_{Fx} = -v`} ist ${M`\v v_F`} festgelegt.`],
    ])}

    <h3>Etappe 5: Stab ${M`6`}, wenn die Senkrechten zusammenfallen</h3>
    ${steps([
      [M`\text{Senkrechte zu } \v v_D \text{ durch } D \;=\; \text{Senkrechte zu } \v v_F \text{ durch } F \;=\; \text{Gerade } AF`, `Beide Geschwindigkeiten stehen senkrecht auf Stab ${M`6`}. Die beiden Senkrechten sind dieselbe Gerade, ein Schnittpunkt lässt sich nicht bilden. ${M`Z_6`} liegt irgendwo auf dieser Geraden.`],
      [M`\omega_6\,|\overrightarrow{Z_6D}| = \sqrt2\,v,\qquad \omega_6\,|\overrightarrow{Z_6F}| = \sqrt2\,v`, `Statt Schnittpunkt: Beträge. ${M`\v v_D`} und ${M`\v v_F`} sind gleich gross und zeigen entgegengesetzt, also liegt ${M`Z_6`} <em>zwischen</em> ${M`D`} und ${M`F`}, gleich weit von beiden.`],
      [M`Z_6 = \text{Mitte von } DF,\quad |\overrightarrow{Z_6F}| = \tfrac{\sqrt2}{2}L \;\Rightarrow\; \omega_6 = \frac{\sqrt2\,v}{\frac{\sqrt2}{2}L} = \frac{2v}{L},\quad \v\omega_6 = \begin{pmatrix}0\\0\\-\frac{2v}{L}\end{pmatrix}`, `${M`D`} (oben) läuft nach rechts oben, ${M`F`} (unten) nach links unten: Stab ${M`6`} dreht im Uhrzeigersinn.`],
    ])}

    <h3>Etappe 6: Stab ${M`7`}</h3>
    ${steps([
      [M`Z_7 = (x = 3L) \cap (\text{Senkrechte zu } \v v_F \text{ durch } F) = (3L,\ -3L)`, `Senkrechte zu ${M`\v v_B`} durch ${M`B`} ist wieder vertikal. Senkrechte zu ${M`\v v_F = (-v,-v)`} durch ${M`F`} hat die Richtung ${M`(1,-1)`}, also ${M`y = -x`}.`],
      [M`|\overrightarrow{Z_7B}| = L \;\Rightarrow\; \omega_7 = \frac vL,\quad \v\omega_7 = \begin{pmatrix}0\\0\\\frac vL\end{pmatrix}`, `${M`B`} liegt über ${M`Z_7`} und läuft nach links: Gegenuhrzeigersinn.`],
      [M`\text{Kontrolle: } \v\omega_7\times\overrightarrow{Z_7F} = \tfrac vL\,\e z\times\begin{pmatrix}-L\\L\\0\end{pmatrix} = \begin{pmatrix}-v\\-v\\0\end{pmatrix} = \v v_F\ ✓`, 'Mit dem gefundenen Momentanzentrum kommt dieselbe Geschwindigkeit von F heraus wie in Etappe 4.'],
    ])}

    <h3>Ergebnis</h3>
    <table class="ctable">
      <tr><th>Körper</th><th>${M`Z_i`}</th><th>${M`\v\omega_i`}</th><th>Drehsinn</th></tr>
      <tr><td>${M`1`}–${M`5`}</td><td>${M`A = (0,0)`}</td><td>${M`\tfrac vL\,\e z`}</td><td>Gegenuhrzeigersinn</td></tr>
      <tr><td>${M`6`}</td><td>${M`(\tfrac32L,\,-\tfrac32L)`}</td><td>${M`-\tfrac{2v}L\,\e z`}</td><td>Uhrzeigersinn</td></tr>
      <tr><td>${M`7`}</td><td>${M`(3L,\,-3L)`}</td><td>${M`\tfrac vL\,\e z`}</td><td>Gegenuhrzeigersinn</td></tr>
      <tr><td>${M`8`}</td><td>${M`(3L,\,-\tfrac32L)`}</td><td>${M`-\tfrac{2v}L\,\e z`}</td><td>Uhrzeigersinn</td></tr>
    </table>
    ${box('ergaenzung', `<p>Unabhängig nachgerechnet in <code>fachwerk.test.js</code>: nur mit der Grundgleichung ${M`\v v_M = \v v_P + \v\omega\times\overrightarrow{PM}`} pro Stab und «Gelenk = gleiche Geschwindigkeit». Dort wird auch für jeden der acht Stäbe der SdpG geprüft.</p>`)}
    ${box('achtung', `<p><b>Drei typische Fehler.</b> (1) Jeder Stab hat sein <em>eigenes</em> ${M`Z_i`} und ${M`\omega_i`}; nur die Gelenkgeschwindigkeit ist gemeinsam. (2) Fallen die zwei Senkrechten zusammen (Stab ${M`6`}), gibt es keinen Schnittpunkt: dann mit den Beträgen arbeiten. (3) Sind die zwei Senkrechten parallel und verschieden, gibt es kein ${M`Z`}: Translation, ${M`\v\omega = \v 0`}.</p>`)}
    ${box('merke', `<p>Kette bilden: Richtungen aus festen Lagern → ${M`Z`} als Schnitt der Senkrechten → ${M`\omega = v/\text{Abstand}`} → Gelenk weitergeben → SdpG für Richtungen, die noch fehlen.</p>`)}
  `);
}

function trussFigure(host) {
  const L = 1, v = 1;
  const r = fachwerkBeispiel(L, v);
  const { P } = r;
  const STEPS = [
    { label: 'Start', text: `Gegeben ist nur ${M`\v v_B = -v\,\e x`}. ${M`A`} ist ein festes Gelenk.` },
    { label: '1 Körper 1–5', text: `Stäbe ${M`1`}–${M`5`} bilden einen starren Körper, der um ${M`Z_{1-5}\equiv A`} dreht. Darum ${M`\v v_E\perp AE`} (kurze Striche: nur die Richtung).` },
    { label: `2 ${M`Z_8`}`, text: `Senkrechte zu ${M`\v v_B`} durch ${M`B`} und Gerade ${M`AE`} schneiden sich in ${M`Z_8 = (3L, -\tfrac32 L)`}. ${M`\omega_8 = \frac{v}{L/2} = \frac{2v}{L}`}, Uhrzeigersinn.` },
    { label: `3 ${M`\v v_E`}`, text: `${M`|\v v_E| = \omega_8\cdot\tfrac{\sqrt5}{2}L = \sqrt5\,v`} und ${M`\omega_{1-5} = \frac{|\v v_E|}{\sqrt5 L} = \frac vL`}. Also ${M`\v v_E = (v,\ 2v)`}.` },
    { label: `4 ${M`\v v_D, \v v_F`}`, text: `${M`\v v_D = \v\omega_{1-5}\times\overrightarrow{AD} = (v,\ v)`}. SdpG an Stab ${M`6`}: ${M`\v v_F\perp DF`}; SdpG an Stab ${M`7`}: ${M`v_{Fx} = -v`}. Also ${M`\v v_F = (-v,\ -v)`}.` },
    { label: `5 ${M`Z_6`}`, text: `Beide Senkrechten sind die Gerade ${M`AF`}. ${M`\v v_D`} und ${M`\v v_F`} gleich gross, entgegengesetzt: ${M`Z_6`} = Mitte von ${M`DF`}, ${M`\omega_6 = \frac{2v}{L}`}, Uhrzeigersinn.` },
    { label: `6 ${M`Z_7`}`, text: `Senkrechte durch ${M`B`} (vertikal) und durch ${M`F`} (Richtung ${M`(1,-1)`}) schneiden sich in ${M`Z_7 = (3L, -3L)`}. ${M`\omega_7 = \frac{v}{L}`}, Gegenuhrzeigersinn.` },
    { label: 'Alles', text: `Alle Momentanzentren und Knotengeschwindigkeiten. Auf Stab ${M`7`} und ${M`8`}: ${M`|\v v|`} wächst linear mit dem Abstand zu ${M`Z_7`} bzw. ${M`Z_8`}.` },
  ];
  let step = 0;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const row = buttonRow(STEPS.map((s, i) => ({ label: s.label, onClick: () => { step = i; draw(); } })));
  controls.appendChild(row);
  host.append(controls, fig, readout);
  row.querySelector('button').classList.add('active');

  const BODY = { '1-5': 's-x', 6: 's-z', 7: 's-rho', 8: 's-y' };
  const BARS = [['A', 'C', '1-5', '1'], ['A', 'D', '1-5', '2'], ['C', 'D', '1-5', '3'], ['C', 'E', '1-5', '4'], ['D', 'E', '1-5', '5'], ['D', 'F', 6, '6'], ['F', 'B', 7, '7'], ['E', 'B', 8, '8']];
  const k = 0.32; // Pfeil-Massstab: Länge = k · |v| (in L)

  function draw() {
    fig.innerHTML = '';
    readout.innerHTML = STEPS[step].text;
    const p = plot(fig, { width: 560, height: 500, xmin: -0.7, xmax: 3.9, ymin: -3.35, ymax: 0.75, pad: 10 });
    p.svg.style.maxWidth = '560px';
    arrowDefs(p.svg);
    const g = (o = 1) => el('g', { opacity: o }, p.svg);
    const line = (Q, R, cls, w, parent, extra = {}) => el('line', { x1: p.X(Q[0]), y1: p.Y(Q[1]), x2: p.X(R[0]), y2: p.Y(R[1]), class: cls, 'stroke-width': w, 'stroke-linecap': 'round', ...extra }, parent);
    const arrow = (Q, vv, parent, w = 1.8) => {
      if (Math.hypot(vv[0], vv[1]) < 1e-6) return;
      line(Q, [Q[0] + k * vv[0], Q[1] + k * vv[1]], 's-vel', w, parent, { 'marker-end': 'url(#arr-vel)' });
    };
    const zDot = (Z, name, parent, dx = 10, dy = 5, anchor = 'start') => {
      el('circle', { cx: p.X(Z[0]), cy: p.Y(Z[1]), r: 6, class: 'fill-angle' }, parent);
      text(parent, p.X(Z[0]) + dx, p.Y(Z[1]) + dy, name, anchor, 'math t-angle');
    };
    const now = (s) => (step === s || step === 7 ? 1 : 0.45); // aktuelle Etappe kräftig, frühere blass
    const on = (s) => step >= s;

    // Lager: Wand bei A, Festlager unter B
    const sup = g(1);
    line([-0.14, 0.32], [-0.14, -0.32], 's-dark', 2, sup);
    for (let i = 0; i < 6; i++) line([-0.14, 0.3 - i * 0.12], [-0.28, 0.2 - i * 0.12], 's-dark', 0.8, sup);
    line([-0.14, 0], [0, 0], 's-dark', 1.5, sup);
    const Bt = P.B;
    el('path', { d: `M${p.X(Bt[0])},${p.Y(Bt[1])} L${p.X(Bt[0] - 0.13)},${p.Y(Bt[1] - 0.2)} L${p.X(Bt[0] + 0.13)},${p.Y(Bt[1] - 0.2)} Z`, fill: 'none', class: 's-dark', 'stroke-width': 1.5 }, sup);
    line([Bt[0] - 0.22, Bt[1] - 0.2], [Bt[0] + 0.22, Bt[1] - 0.2], 's-dark', 1.5, sup);
    for (let i = 0; i < 5; i++) line([Bt[0] - 0.18 + i * 0.09, Bt[1] - 0.2], [Bt[0] - 0.24 + i * 0.09, Bt[1] - 0.29], 's-dark', 0.8, sup);

    // Körper 1–5 hervorheben (Etappe 1)
    if (step === 1) el('path', { d: ['A', 'C', 'E', 'D'].map((n, i) => `${i ? 'L' : 'M'}${p.X(P[n][0])},${p.Y(P[n][1])}`).join(' ') + ' Z', class: 'fill-x', opacity: 0.12 }, p.svg);

    // Stäbe
    const bars = g(1);
    for (const [a, b, body, num] of BARS) {
      line(P[a], P[b], BODY[body], 5, bars);
      const m = [(P[a][0] + P[b][0]) / 2, (P[a][1] + P[b][1]) / 2];
      const off = a === 'C' && b === 'D' ? [-0.12, 0] : a === 'D' && b === 'E' || a === 'F' ? [0, 0.12] : a === 'A' && b === 'C' ? [0, 0.12] : [0.1, 0.08];
      text(bars, p.X(m[0] + off[0]), p.Y(m[1] + off[1]), num, 'middle', '');
    }

    // Etappe 1: Richtungen ⊥ zu den Verbindungen mit A (kurze Striche)
    if (on(1)) {
      const gg = g(now(1));
      for (const n of ['C', 'D', 'E']) {
        const d = [P[n][0], P[n][1]], len = Math.hypot(...d), u = [-d[1] / len, d[0] / len];
        line([P[n][0] - 0.25 * u[0], P[n][1] - 0.25 * u[1]], [P[n][0] + 0.25 * u[0], P[n][1] + 0.25 * u[1]], 's-vel', 1.5, gg, { class: 's-vel dashed' });
      }
      line(P.A, P.E, 's-angle dashed', 1, gg);
      zDot(P.A, 'Z_1–5', gg, -8, 28, 'start');
    }
    // Etappe 2: Z8
    if (on(2)) {
      const gg = g(now(2));
      line([3, 0.4], [3, -2.3], 's-angle dashed', 1.2, gg);
      line(P.E, [3.6, -1.8], 's-angle dashed', 1.2, gg);
      line(r.Z[8], P.B, 's-angle', 1, gg);
      line(r.Z[8], P.E, 's-angle', 1, gg);
      zDot(r.Z[8], 'Z_8', gg, 10, -6);
      text(gg, p.X(3.06), p.Y(-1.78), 'L/2', 'start', 'math t-angle');
      arrow(P.B, r.v.B, gg);
    } else arrow(P.B, r.v.B, g(1));
    // Etappe 3: v_E
    if (on(3)) arrow(P.E, r.v.E, g(now(3)), 2.2);
    // Etappe 4: v_D, v_F
    if (on(4)) {
      const gg = g(now(4));
      arrow(P.D, r.v.D, gg, 2.2);
      arrow(P.F, r.v.F, gg, 2.2);
    }
    // Etappe 5: Z6 mit linearer Verteilung entlang DF
    if (on(5)) {
      const gg = g(now(5));
      line([0.8, -0.8], [2.35, -2.35], 's-angle dashed', 1, gg);
      zDot(r.Z[6], 'Z_6', gg, -12, 4, 'end');
      for (let s = 0.25; s < 1; s += 0.25) {
        const Q = [P.D[0] + s * (P.F[0] - P.D[0]), P.D[1] + s * (P.F[1] - P.D[1]), 0];
        arrow(Q, rigidVelocity([0, 0, 0], [0, 0, r.w[6]], r.Z[6], Q), gg, 1.2);
      }
    }
    // Etappe 6: Z7
    if (on(6)) {
      const gg = g(now(6));
      line(P.B, [3, -3.2], 's-angle dashed', 1.2, gg);
      line(P.F, [3.15, -3.15], 's-angle dashed', 1.2, gg);
      zDot(r.Z[7], 'Z_7', gg, -12, 4, 'end');
    }
    // Alles: Knotengeschwindigkeiten + Verteilung entlang der Stäbe 7 und 8 (6 schon in Etappe 5)
    if (step === 7) {
      const gg = g(0.9);
      arrow(P.C, r.v.C, gg, 2.2);
      for (const [body, a, b] of [[7, 'F', 'B'], [8, 'E', 'B']]) for (let s = 0.25; s < 1; s += 0.25) {
        const Q = [P[a][0] + s * (P[b][0] - P[a][0]), P[a][1] + s * (P[b][1] - P[a][1]), 0];
        arrow(Q, rigidVelocity([0, 0, 0], [0, 0, r.w[body]], r.Z[body], Q), gg, 1.2);
      }
    }

    // Knoten zuletzt (oben drauf)
    const LAB = { A: [8, -10], C: [6, -12], D: [-24, 4], E: [10, -10], F: [-22, 12], B: [12, -8] };
    for (const n of ['A', 'C', 'D', 'E', 'F', 'B']) {
      el('circle', { cx: p.X(P[n][0]), cy: p.Y(P[n][1]), r: 5, style: 'fill: var(--panel); stroke: var(--dark); stroke-width: 2' }, p.svg);
      text(p.svg, p.X(P[n][0]) + LAB[n][0], p.Y(P[n][1]) + LAB[n][1], n, 'start', 'math');
    }
  }
  draw();
}
