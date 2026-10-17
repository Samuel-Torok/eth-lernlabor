import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text, grid, arrowDefs } from '../../ui/svg.js';
import { mmul } from '../../math/matrix.js';

const SRC = 'Mitschrift Rickenbach, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Eine Matrix ist zunächst nur ein Zahlenschema. Interessant wird sie durch das Produkt: «Zeile mal Spalte». Diese Lektion sammelt die Begriffe und Rechenregeln und zeigt die zwei Sichtweisen auf ${M`Ax`}: zeilenweise (Skalarprodukte) und spaltenweise (Linearkombination der Spalten).</p>

  ${section('begriffe', '1. Begriffe', `
    ${box('vorlesung', `<p><b>Def.</b> (i) Eine ${M`m\times n`}-Matrix ist ein Schema der Form</p>
      ${MD`A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n}\\ a_{21} & a_{22} & \cdots & a_{2n}\\ \vdots & & & \vdots\\ a_{m1} & a_{m2} & \cdots & a_{mn}\end{pmatrix}\quad(m \text{ Zeilen}, n \text{ Spalten}).`}
      <p>${M`a_{ij}`} = Eintrag mit Zeile ${M`i`}, Spalte ${M`j`}. Schreibweise: ${M`a_{ij} = (A)_{ij}`}. (ii) Falls ${M`m = n`}, so heisst die Matrix <b>quadratisch</b>. (iii) Die Matrizen ${M`A`} und ${M`B`} heissen <b>gleich</b>, wenn sie in Zeilen- und Spaltenzahl übereinstimmen und ${M`(A)_{ij} = (B)_{ij}`} für alle ${M`i, j`}.</p>`, { src: `${SRC} 10` })}
    ${box('vorlesung', `<ul>
      <li><b>Nullmatrix</b> ${M`0`}: alle Einträge gleich 0 (Matlab: <code>zeros(2,3)</code>).</li>
      <li><b>Obere Dreiecksmatrix</b> (Rechtsdreiecksmatrix) ${M`R`}: ${M`(R)_{ij} = 0`} für ${M`i > j`}. <b>Untere Dreiecksmatrix</b> (Linksdreiecksmatrix) ${M`L`}: ${M`(L)_{ij} = 0`} für ${M`i < j`}. Matlab: <code>triu(X)</code>, <code>tril(X)</code>.</li>
      <li><b>Diagonalmatrix</b>: gleichzeitig obere und untere Dreiecksmatrix, ${M`D = \mathrm{diag}(d_{11}, \dots, d_{nn})`}.</li>
      <li><b>Einheitsmatrix</b> oder Identität: ${M`\mathrm{diag}(1, 1, \dots, 1) = I_n`} (Matlab: <code>eye(3)</code>).</li>
      <li><b>Spaltenvektor</b>: ${M`m\times1`}-Matrix, ${M`b = \begin{pmatrix}b_1\\b_2\\b_3\end{pmatrix}`} (man spart sich den Spaltenindex). <b>Zeilenvektor</b>: ${M`1\times n`}-Matrix, ${M`a = (a_1, a_2, a_3)`}.</li>
      <li><b>Transponierte</b>: ${M`(A^T)_{ij} = (A)_{ji}`}. Bsp: ${M`A = \begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}\Rightarrow A^T = \begin{pmatrix}1&4\\2&5\\3&6\end{pmatrix}`}, «Transponieren ≙ Spiegeln an der Diagonalen» (Matlab: <code>A'</code>).</li>
      <li>Die quadratische Matrix ${M`A`} heisst <b>symmetrisch</b>, falls ${M`A = A^T`}, und <b>antisymmetrisch</b> oder schiefsymmetrisch, falls ${M`A^T = -A`}.</li></ul>`, { src: `${SRC} 10` })}
    ${box('achtung', `<p>Bei ${M`a_{ij}`} kommt <b>immer zuerst die Zeile</b>, dann die Spalte. Und eine ${M`m\times n`}-Matrix hat ${M`m`} Zeilen. Merkhilfe: «Zeile zuerst, Spalte später».</p>`)}
  `)}

  ${section('rechnen', '2. Rechnen mit Matrizen', `
    ${box('vorlesung', `<p><b>Def.</b> (i) Sind ${M`A, B`} ${M`m\times n`}-Matrizen, so ist ${M`(A + B)_{ij} = (A)_{ij} + (B)_{ij}`} eine ${M`m\times n`}-Matrix. (ii) Ist ${M`\alpha\in\R`}, so ist ${M`(\alpha A)_{ij} = (A\alpha)_{ij} = \alpha\,(A)_{ij}`}.</p>
      <p>(iii) Sei ${M`A`} eine ${M`m\times n`}-Matrix und ${M`B`} eine ${M`n\times p`}-Matrix. Dann ist</p>
      ${MD`(AB)_{ij} = \sum_{k=1}^n (A)_{ik}(B)_{kj} = (A)_{i1}(B)_{1j} + (A)_{i2}(B)_{2j} + \dots + (A)_{in}(B)_{nj}`}
      <p>= Skalarprodukt von Zeile ${M`i`} von ${M`A`} mit Spalte ${M`j`} von ${M`B`}. ${M`AB`} ist dann eine ${M`m\times p`}-Matrix.</p>`, { src: `${SRC} 11–12` })}
    ${figure('fig-prod', `Wähle einen Eintrag von ${M`AC`}. Er entsteht aus der markierten Zeile von ${M`A`} und der markierten Spalte von ${M`C`}: paarweise multiplizieren, dann addieren. (Matrizen aus der Übungsstunde 4.)`, { wide: true })}
    <p><b>Wann ist ${M`AB`} definiert?</b> Die «inneren» Zahlen müssen passen: ${M`(m\times\underline{n})\cdot(\underline{n}\times p)`}. Die äusseren geben das Format des Ergebnisses: ${M`m\times p`}. Grund: Eine Zeile von ${M`A`} hat ${M`n`} Einträge, eine Spalte von ${M`B`} auch ${M`n`}, sonst gibt es kein Skalarprodukt.</p>
    ${box('vorlesung', `<p><b>Einstein'sche Summenkonvention:</b> Wenn das Produkt ${M`AB`} definiert ist, so schreibt man unter Weglassung des Summenzeichens ${M`(AB)_{ij} = (A)_{ik}(B)_{kj}`}: Über repetitiv vorkommende Indizes wird stillschweigend summiert.</p>`, { src: `${SRC} 12` })}
  `)}

  ${section('regeln', '3. Rechenregeln', `
    ${box('vorlesung', `<p><b>Satz 2.1.</b></p><ol type="i">
      <li>Kommutativgesetz Addition: Sind ${M`A, B`} ${M`m\times n`}-Matrizen, so gilt ${M`A + B = B + A`}.</li>
      <li>Assoziativgesetz Addition: ${M`(A + B) + C = A + (B + C)`}.</li>
      <li>Assoziativgesetz Multiplikation: Sei ${M`A`} eine ${M`m\times n`}-, ${M`B`} eine ${M`n\times p`}- und ${M`C`} eine ${M`p\times q`}-Matrix. Dann gilt ${M`(AB)C = A(BC)`}.</li>
      <li>Distributivgesetz: ${M`(A + B)C = AC + BC`} und ${M`A(C + D) = AC + AD`}.</li>
      <li>Seien ${M`\lambda, \mu\in\R`}. Dann gilt ${M`\lambda(A + B) = \lambda A + \lambda B`} und ${M`\lambda(\mu A) = (\lambda\mu)A`}.</li></ol>
      <p>⚠ Die Multiplikation von Matrizen ist <b>nicht</b> kommutativ, d.h. im Allgemeinen ist ${M`AB\ne BA`}.</p>`, { src: `${SRC} 12` })}
    <p><b>Beweisidee</b> (S. 13): Alles wird auf die Einträge zurückgeführt, wo es reelle Zahlen sind. Z.B. ${M`(A + B)_{ij} = (A)_{ij} + (B)_{ij} = (B)_{ij} + (A)_{ij} = (B + A)_{ij}`}, weil für Zahlen das Kommutativgesetz gilt. Bei ${M`(AB)C`} genauso mit dem Assoziativgesetz für Zahlen.</p>
    ${box('achtung', `<p>Ein Beispiel für ${M`AB\ne BA`}: ${M`\begin{pmatrix}1&2\\0&1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix} = \begin{pmatrix}2&1\\1&0\end{pmatrix}`}, aber ${M`\begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}1&2\\0&1\end{pmatrix} = \begin{pmatrix}0&1\\1&2\end{pmatrix}`}. Darum darf man bei Matrizen nie einfach «umsortieren», und es kommt darauf an, ob man von links oder von rechts multipliziert.</p>`)}
    ${box('vorlesung', `<p><b>Bemerkung.</b> Für die Einheitsmatrix ${M`I_m`} bzw. ${M`I_n`} und eine beliebige ${M`m\times n`}-Matrix ${M`A`} gilt ${M`I_mA = AI_n = A`}. Für ${M`m = n`} gilt ${M`I_nA = AI_n = A`}. Mit dem Kronecker-Symbol ${M`\delta_{ij} = 1`} falls ${M`i = j`}, ${M`0`} falls ${M`i\ne j`}, gilt ${M`(I)_{ij} = \delta_{ij}`} und ${M`(I_mA)_{ij} = \delta_{ik}(A)_{kj} = (A)_{ij}`}.</p>`, { src: `${SRC} 13` })}
  `)}

  ${section('spalten', `4. Zwei Blicke auf ${M`Ax`}`, `
    ${box('vorlesung', `<p><b>Notation.</b> Seien ${M`a^{(1)}, a^{(2)}, \dots, a^{(n)}`} ${M`m\times1`}-Matrizen. Dann ist ${M`A = \big(a^{(1)}\ a^{(2)}\ \cdots\ a^{(n)}\big)`} die ${M`m\times n`}-Matrix mit den ${M`a^{(i)}`} als Spalten.</p>
      <p><b>Satz 2.2.</b> Sei ${M`A = \big(a^{(1)}\ \cdots\ a^{(n)}\big)`} eine ${M`m\times n`}-Matrix mit Spalten ${M`a^{(i)}`} und ${M`e^{(i)}`} die ${M`i`}-te Spalte der Einheitsmatrix ${M`I_n`}. Dann gilt: (i) ${M`Ae^{(i)} = a^{(i)}`}. (ii) Für ${M`x = (x_1, \dots, x_n)^T`} gilt ${M`Ax = x_1a^{(1)} + x_2a^{(2)} + \dots + x_na^{(n)}`}: eine <b>Linearkombination</b> der ${M`a^{(i)}`}.</p>`, { src: `${SRC} 13` })}
    <p><b>Zwei Blicke, dasselbe Ergebnis.</b> Zeilenweise: Jede Komponente von ${M`Ax`} ist ein Skalarprodukt «Zeile mal ${M`x`}». Spaltenweise: ${M`Ax`} ist eine Mischung der Spalten von ${M`A`}, mit den ${M`x_j`} als Mischungsverhältnis. Der zweite Blick erklärt sofort: ${M`Ax = b`} ist genau dann lösbar, wenn man ${M`b`} aus den Spalten von ${M`A`} mischen kann.</p>
    ${figure('fig-comb', `${M`A`} hat die Spalten ${M`a^{(1)}`} (blau) und ${M`a^{(2)}`} (bernstein). Mit den Reglern wählst du ${M`x_1, x_2`}. Der rote Pfeil ist ${M`Ax = x_1a^{(1)} + x_2a^{(2)}`}: zuerst ${M`x_1`}-mal die erste Spalte, dann ${M`x_2`}-mal die zweite anhängen.`, { wide: true })}
  `)}
  `;
  prodFigure(root.querySelector('#fig-prod'));
  combFigure(root.querySelector('#fig-comb'));
}

function prodFigure(host) {
  const A = [[4, -2, 0], [-1, 3, 5]], C = [[0, 1], [-3, 5], [2, 2]];
  const P = mmul(A, C);
  let I = 0, J = 0;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  fig.className = 'math-display';
  const readout = document.createElement('div');
  readout.className = 'readout math-display';
  const cells = [];
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) cells.push({ label: M([`(AC)_{${i + 1}${j + 1}}`]), onClick: () => { I = i; J = j; draw(); } });
  const btns = buttonRow(cells);
  btns.firstChild.classList.add('active');
  controls.appendChild(btns);
  host.append(controls, fig, readout);
  const hl = (t) => `\\colorbox{#fde68a}{$${t}$}`;
  function mat(X, rowHl, colHl, cell) {
    return `\\begin{pmatrix}${X.map((r, i) => r.map((v, j) => {
      const on = (rowHl === i) || (colHl === j) || (cell && cell[0] === i && cell[1] === j);
      return on ? hl(String(v)) : String(v);
    }).join(' & ')).join(' \\\\ ')}\\end{pmatrix}`;
  }
  function draw() {
    fig.innerHTML = M([`\\underbrace{${mat(A, I, null)}}_{A\\ (2\\times3)}\\cdot\\underbrace{${mat(C, null, J)}}_{C\\ (3\\times2)} = \\underbrace{${mat(P, null, null, [I, J])}}_{AC\\ (2\\times2)}`]);
    const terms = A[I].map((a, k) => `(${a})\\cdot(${C[k][J]})`).join(' + ');
    readout.innerHTML = M([`(AC)_{${I + 1}${J + 1}} = \\sum_{k=1}^{3} a_{${I + 1}k}\\,c_{k${J + 1}} = ${terms} = ${P[I][J]}`]);
  }
  draw();
}

function combFigure(host) {
  const a1 = [2, 0.6], a2 = [-0.6, 1.4];
  let x1 = 1.2, x2 = 1;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  controls.append(
    slider({ label: M`x_1 =`, min: -2, max: 2, step: 0.1, value: x1, format: (v) => M([fmt(v, 1)]), onInput: (v) => { x1 = v; draw(); } }),
    slider({ label: M`x_2 =`, min: -2, max: 2, step: 0.1, value: x2, format: (v) => M([fmt(v, 1)]), onInput: (v) => { x2 = v; draw(); } }),
  );
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = { xmin: -4.5, xmax: 4.5, ymin: -3.5, ymax: 3.5 };
    const p = plot(fig, { width: 560, height: 440, ...B });
    p.svg.style.maxWidth = '560px';
    arrowDefs(p.svg);
    grid(p, B);
    axes(p, { ...B, xticks: [-4, -2, 2, 4], yticks: [-2, 2], xlabel: 'y_1', ylabel: 'y_2' });
    const arrow = (from, v, cls, w = 2.5, extra = {}) => el('line', { x1: p.X(from[0]), y1: p.Y(from[1]), x2: p.X(from[0] + v[0]), y2: p.Y(from[1] + v[1]), class: `s-${cls}`, 'stroke-width': w, 'marker-end': `url(#arr-${cls})`, ...extra }, p.svg);
    const s1 = [x1 * a1[0], x1 * a1[1]], s2 = [x2 * a2[0], x2 * a2[1]];
    const r = [s1[0] + s2[0], s1[1] + s2[1]];
    arrow([0, 0], a1, 'x', 1.5, { opacity: 0.5 });
    arrow([0, 0], a2, 'y', 1.5, { opacity: 0.5 });
    arrow([0, 0], s1, 'x', 3);
    arrow(s1, s2, 'y', 3);
    arrow([0, 0], r, 'point', 3.5);
    text(p.svg, p.X(a1[0]) + 4, p.Y(a1[1]) + 16, 'a^(1)', 'start', 'math t-x');
    text(p.svg, p.X(a2[0]) - 4, p.Y(a2[1]) - 6, 'a^(2)', 'end', 'math t-y');
    text(p.svg, p.X(r[0]) + 6, p.Y(r[1]) - 6, 'Ax', 'start', 'math t-point');
    readout.innerHTML = M([`Ax = \\begin{pmatrix}${fmt(a1[0], 1)} & ${fmt(a2[0], 1)}\\\\ ${fmt(a1[1], 1)} & ${fmt(a2[1], 1)}\\end{pmatrix}\\begin{pmatrix}${fmt(x1, 1)}\\\\ ${fmt(x2, 1)}\\end{pmatrix} = ${fmt(x1, 1)}\\begin{pmatrix}${fmt(a1[0], 1)}\\\\ ${fmt(a1[1], 1)}\\end{pmatrix} + ${fmt(x2, 1)}\\begin{pmatrix}${fmt(a2[0], 1)}\\\\ ${fmt(a2[1], 1)}\\end{pmatrix} = \\begin{pmatrix}${fmt(r[0], 2)}\\\\ ${fmt(r[1], 2)}\\end{pmatrix}`]);
  }
  draw();
}
