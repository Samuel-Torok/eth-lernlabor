import { M, MD } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { buttonRow } from '../../ui/controls.js';
import { gaussSteps, pivotColumns } from '../../math/fraction.js';

const SRC = 'Mitschrift Rickenbach, S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Der Gauss-Algorithmus ist das Werkzeug der ganzen Vorlesung: Ein lineares Gleichungssystem wird so lange umgeformt, bis man die Lösung von unten nach oben ablesen kann. Die Lösungsmenge bleibt dabei immer gleich. Darum geht es in dieser Lektion: welche Umformungen erlaubt sind und warum.</p>

  ${section('lgs', '1. Lineare Gleichungssysteme', `
    ${box('vorlesung', `<p><b>Bsp 1:</b> ${M`x_1 + 2x_2 = 5,\ 2x_1 + 3x_2 = 8`}: genau eine Lösung. <b>Bsp 2:</b> ${M`x_1 + x_2 = 4,\ 2x_1 + 2x_2 = 5`}: keine Lösung, denn «${M`2\cdot`}(i)» ${M`2x_1 + 2x_2 = 8`} widerspricht (ii). <b>Bsp 3:</b> ${M`x_1 - x_2 + x_3 = 2,\ 2x_1 + x_2 - x_3 = 4`}: unendlich viele Lösungen, nämlich ${M`x_1 = 2,\ x_2 = \alpha,\ x_3 = \alpha`} für eine beliebige Zahl ${M`\alpha\in\R`}. Das sind alle Lösungen.</p>
      <p>Im Allgemeinen hat man ${M`m`} Gleichungen und ${M`n`} Unbekannte in einem LGS. <b>Def.</b> Die Lösungen eines LGS heissen <b>Lösungsmenge</b> des LGS.</p>`, { src: `${SRC} 1` })}
    ${box('vorlesung', `<p><b>Grundidee des Gauss-Verfahrens:</b> Forme das LGS um in eines, welches einfacher zu lösen ist und dieselbe Lösungsmenge hat.</p>
      <p><b>Def.</b> Wir nennen zwei LGS <b>äquivalent</b>, wenn sie dieselbe Lösungsmenge haben. Folgende Umformungen führen ein LGS in ein äquivalentes über:</p>
      <ol type="I"><li>Vertauschen von zwei Gleichungen des LGS.</li>
      <li>Addieren eines Vielfachen einer Gleichung zu einer anderen.</li>
      <li>(Manchmal auch) Multiplizieren einer Zeile mit einer Zahl ${M`\ne0`}.</li></ol>
      <p>Jede der Operationen (I) und (II) lässt sich durch eine gleichartige Operation rückgängig machen.</p>`, { src: `${SRC} 1–2` })}
    <p><b>Warum ändert sich die Lösungsmenge nicht?</b> Wer beide alten Gleichungen erfüllt, erfüllt auch die neue (sie ist ja aus ihnen zusammengesetzt). Und umgekehrt, weil man die Umformung rückgängig machen kann: Aus den neuen Gleichungen bekommt man die alten zurück. Darum ist bei (III) die Zahl ${M`\ne0`} wichtig: «mal 0» kann man nicht rückgängig machen.</p>
  `)}

  ${section('dreieck', '2. Dreiecksform und Rückwärtseinsetzen', `
    ${box('vorlesung', `<p>Wann ist ein LGS einfach zu lösen? Falls ${M`m = n`}, ist dies der Fall, wenn das LGS <b>Dreiecksform</b> hat. Bsp ${M`m = n = 3`}:</p>
      ${MD`\begin{aligned} 3x_1 + 2x_2 + x_3 &= 1 \;\Rightarrow\; x_1 = -3\\ x_2 - x_3 &= 2 \;\Rightarrow\; x_2 = 4\\ 2x_3 &= 4 \;\Rightarrow\; x_3 = 2 \end{aligned}`}
      <p>(Rückwärtseinsetzen: von unten nach oben.) So erhalten wir das Gauss-Verfahren: ① Bringe mit den Umformungen (I) und (II) das LGS in Dreiecksform. ② Löse das LGS durch Rückwärtseinsetzen. Im Bsp hat das Rückwärtseinsetzen eine eindeutige Lösung geliefert, weil die Koeffizienten auf der Diagonalen ${M`\ne0`}.</p>`, { src: `${SRC} 2` })}
    ${box('vorlesung', `<p>Man definiert das Produkt einer Matrix mit einem Vektor:</p>
      ${MD`A x = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n}\\ \vdots & & & \vdots\\ a_{m1} & a_{m2} & \cdots & a_{mn}\end{pmatrix}\begin{pmatrix}x_1\\ \vdots\\ x_n\end{pmatrix} := \begin{pmatrix} a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n\\ \vdots \\ a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n\end{pmatrix}`}
      <p>Dann lautet das LGS ${M`Ax = b`}. In Matlab: <code>A = [1,2,3; 4,5,6]; x = [1;2;3]; A*x</code>.</p>`, { src: `${SRC} 3` })}
    <p><b>Das Gauss-Schema</b> schreibt nur die Zahlen auf: Jede Zeile ist eine Gleichung, jede Spalte gehört zu einer Unbekannten, die letzte Spalte (überschrieben mit «1») ist die rechte Seite. So spart man das Abschreiben der ${M`x_i`}.</p>
  `)}

  ${section('stufen', '3. Gauss-Algorithmus (allgemeine Form) und Zeilenstufenform', `
    ${box('vorlesung', `<p>Man kann bei ${M`m \ne n`} nicht immer eine Dreiecksform mit von Null verschiedenen Pivots erreichen. Aber man kann immer eine einfache, spezielle Form erreichen: die <b>Zeilenstufenform</b>.</p>
      <p><b>Gauss'scher Algorithmus</b> (allgemeine Form):</p><ol>
      <li>Man bestimme die am weitesten links stehende Spalte, die von Null verschiedene Elemente enthält.</li>
      <li>Ist die oberste Zahl der gefundenen Spalte Null, so vertausche man die erste Zeile mit einer anderen, wo keine Null steht (<b>Pivot</b>).</li>
      <li>Addiere ein passendes Vielfaches der (neuen) ersten Zeile zu den übrigen Zeilen darunter, um unter dem Pivot Nullen zu erzeugen.</li>
      <li>Wende die Schritte 1–3 auf die Untermatrix an, die durch Weglassen der obersten Zeile entsteht, solange, bis es nicht mehr geht. Dann ist die Zeilenstufenform erreicht.</li>
      <li>Bestimme die Lösungsmenge durch Rückwärtseinsetzen.</li></ol>`, { src: `${SRC} 4–5` })}
    ${figure('fig-gauss', `Der Algorithmus Schritt für Schritt, mit exakten Brüchen. Das aktuelle Pivot ist rot umrandet, die eben veränderte Zeile hervorgehoben. Am Ende steht darunter, welche Variablen Pivot-Variablen sind und welche frei wählbar.`, { wide: true })}
    ${box('vorlesung', `<p><b>Def.</b> Eine Variable ${M`x_k`} über einem Pivot heisst <b>Pivot-Variable</b> oder führende Variable. Alle anderen Variablen heissen <b>freie Parameter</b>. Freie Parameter kann man beim Rückwärtseinsetzen frei wählen, nach den Pivot-Variablen kann man auflösen.</p>
      <p><b>Bsp.</b> (Endform im zweiten Beispiel der Figur) Wir wählen ${M`x_2 = r\in\R`} und ${M`x_4 = s\in\R`} beliebig und bestimmen ${M`x_1, x_3, x_5`} durch Rückwärtseinsetzen: 3. Gleichung ${M`\frac12x_5 = 1\Rightarrow x_5 = 2`}; 2. ${M`-2x_3 + 7\cdot2 = 12 \Rightarrow x_3 = 1`}; 1. ${M`2x_1 + 4r - 10\cdot1 + 6s + 12\cdot2 = 28\Rightarrow x_1 = 7 - 2r - 3s`}.</p>
      ${MD`\text{Allgemeine Lösung: } \begin{pmatrix}x_1\\x_2\\x_3\\x_4\\x_5\end{pmatrix} = \begin{pmatrix}7 - 2r - 3s\\ r\\ 1\\ s\\ 2\end{pmatrix},\quad r, s\in\R`}<p>«Zweiparametrische Lösungsschar».</p>`, { src: `${SRC} 5` })}
    ${box('vorlesung', `<p><b>Bemerkungen.</b> (i) Durch die elementare Zeilenumformung (III) kann jedes Pivot auf den Wert 1 gebracht werden. (ii) In der Zeilenstufenform kann man dann mit der Zeilenumformung (II) auch oberhalb der Pivots Nullen erzeugen. Dann ist die <b>normierte Zeilenstufenform</b> erreicht.</p>`, { src: `${SRC} 6` })}
    ${box('achtung', `<p>Aus der Nachbesprechung der Serie 1 (Übungsstunde 4): Elementare Zeilenumformungen gelten immer für die <b>gesamte</b> Zeile, auch für die rechte Seite ${M`b`}. Und nach dem Lösen immer kontrollieren: die gefundene Lösung in die ursprünglichen Gleichungen einsetzen. (Das garantiert, dass es Lösungen sind, aber bei unendlich vielen Lösungen nicht, dass man alle gefunden hat.)</p>`)}
  `)}

  ${section('anwendung', '4. Anwendung: Stöchiometrie', `
    ${box('vorlesung', `<p>Die Photosynthese-Reaktion: Aus ${M`\mathrm{CO_2}`} und ${M`\mathrm{H_2O}`} entsteht ${M`\mathrm{C_6H_{12}O_6}`} und ${M`\mathrm{O_2}`}: ${M`x_1\,\mathrm{CO_2} + x_2\,\mathrm{H_2O}\to x_3\,\mathrm{C_6H_{12}O_6} + x_4\,\mathrm{O_2}`}. Für jedes Element eine Gleichung (Atome links = Atome rechts):</p>
      ${MD`\mathrm C:\ x_1 = 6x_3,\qquad \mathrm H:\ 2x_2 = 12x_3,\qquad \mathrm O:\ 2x_1 + x_2 = 6x_3 + 2x_4`}
      <p>Wähle ${M`x_4 = \alpha\in\R`}, dann folgt durch Rückwärtseinsetzen ${M`x_3 = \frac\alpha6,\ x_2 = x_1 = \alpha`}. Für ${M`\alpha = 6`}: ${M`6\,\mathrm{CO_2} + 6\,\mathrm{H_2O}\to\mathrm{C_6H_{12}O_6} + 6\,\mathrm{O_2}`}.</p>`, { src: `${SRC} 7` })}
    <p><b>Warum ein freier Parameter?</b> Eine Reaktionsgleichung legt nur das <em>Verhältnis</em> fest: Doppelt so viel von allem ist auch richtig. Genau das ist der freie Parameter ${M`\alpha`}. Man wählt ihn so, dass alle Zahlen ganz und möglichst klein werden.</p>
  `)}
  `;
  gaussFigure(root.querySelector('#fig-gauss'));
}

function gaussFigure(host) {
  const systems = {
    s3: { rows: [[2, 4, 5, 9], [0, 2, 2, 1], [1, -1, 2, 3]], label: 'Beispiel S. 2–3' },
    s5: { rows: [[0, 0, -2, 0, 7, 12], [2, 4, -10, 6, 12, 28], [2, 4, -5, 6, -5, -1]], label: 'Beispiel S. 5' },
    u03: { rows: [[3, 0, -1, 0], [6, 6, -5, -1], [0, -2, 1, 3], [3, 2, -2, 5]], label: 'U03 Übung 1' },
  };
  let sys = systems.s3, states = gaussSteps(sys.rows), k = 0;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const nav = document.createElement('div');
  nav.className = 'fig-controls';
  const fig = document.createElement('div');
  fig.className = 'math-display';
  const readout = document.createElement('div');
  readout.className = 'readout';
  const btns = buttonRow(Object.entries(systems).map(([key, s]) => ({ label: s.label, onClick: () => { sys = systems[key]; states = gaussSteps(sys.rows); k = 0; draw(); } })));
  btns.firstChild.classList.add('active');
  controls.appendChild(btns);
  const mk = (label, fn) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.addEventListener('click', fn); return b; };
  const navRow = document.createElement('div');
  navRow.className = 'btn-row';
  const counter = document.createElement('span');
  navRow.append(mk('◀ zurück', () => { k = Math.max(0, k - 1); draw(); }), mk('weiter ▶', () => { k = Math.min(states.length - 1, k + 1); draw(); }), mk('Ende', () => { k = states.length - 1; draw(); }));
  nav.append(navRow, counter);
  host.append(controls, nav, fig, readout);

  function draw() {
    const st = states[k];
    const n = st.M[0].length - 1;
    const head = [...Array(n).keys()].map((j) => `x_${j + 1}`).concat(['1']).join(' & ');
    const body = st.M.map((row, i) => row.map((v, j) => {
      let t = v.tex();
      if (st.pivot && st.pivot[0] === i && st.pivot[1] === j) t = `\\boxed{${t}}`;
      if (st.target === i || (st.swap && st.swap.includes(i))) t = `\\color{#db2777}{${t}}`;
      return t;
    }).join(' & ')).join(' \\\\ ');
    fig.innerHTML = M([`\\begin{array}{${'c'.repeat(n)}|c} ${head} \\\\ \\hline ${body} \\end{array}`]);
    counter.innerHTML = `Schritt ${k} von ${states.length - 1}`;
    let extra = '';
    if (st.done) {
      const piv = pivotColumns(st.M);
      const free = [...Array(n).keys()].filter((j) => !piv.includes(j));
      const r = piv.length;
      const bad = st.M.slice(r).some((row) => !row[n].isZero());
      extra = `<br>Rang ${M([`r = ${r}`])}. Pivot-Variablen: ${M([piv.map((j) => `x_${j + 1}`).join(', ') || '\\text{keine}'])}; freie Parameter: ${M([free.map((j) => `x_${j + 1}`).join(', ') || '\\text{keine}'])}. ${bad ? `Eine Nullzeile hat rechts ${M`c_k \ne 0`}: <b>keine Lösung</b>.` : free.length ? `Lösbar, ${M([`n - r = ${free.length}`])} freie Parameter: <b>unendlich viele Lösungen</b>.` : '<b>Genau eine Lösung</b> (Rückwärtseinsetzen).'}`;
    }
    readout.innerHTML = st.note + '.' + extra;
  }
  draw();
}
