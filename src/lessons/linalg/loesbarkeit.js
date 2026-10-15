import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section, steps } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text } from '../../ui/svg.js';
import { analyze, solve2 } from '../../math/linsys.js';
import { U03_STEPS } from '../../math/examples-linalg.js';

const SRC = 'Übungsstunde 3 (N. Karpatchev), S.';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Ein lineares Gleichungssystem hat entweder <b>keine</b>, <b>genau eine</b> oder <b>unendlich viele</b> Lösungen. Etwas anderes gibt es nicht. Welcher Fall eintritt, sieht man an der Zeilenstufenform: an den Verträglichkeitsbedingungen und am Rang.</p>

  ${section('bild', '1. Das Bild: Geraden schneiden', `
    ${box('intuition', `<p>Mit zwei Unbekannten ${M`x_1, x_2`} beschreibt jede Gleichung eine <b>Gerade</b> in der Ebene. Eine Lösung ist ein Punkt, der auf <em>allen</em> Geraden liegt. Zwei Geraden schneiden sich in einem Punkt, sind parallel (kein gemeinsamer Punkt) oder liegen aufeinander (unendlich viele gemeinsame Punkte).</p>`)}
    ${figure('fig-lines', `Gleichung (1) ist fest (blau). Verändere Gleichung (2) (bernstein) und beobachte gleichzeitig das Bild und die Zeilenstufenform darunter. Die Knöpfe zeigen die drei Fälle.`, { wide: true })}
  `)}

  ${section('begriffe', '2. Zeilenstufenform, Rang, Verträglichkeitsbedingungen', `
    <p>Man bringt ${M`(A \mid b)`} mit dem Gauss-Algorithmus in Zeilenstufenform (${M`A \in \R^{m\times n}`}: ${M`m`} Gleichungen, ${M`n`} Unbekannte). Die ${M`r`}-te Zeile ist die letzte Zeile, die in ${M`A`} nicht nur Nullen hat:</p>
    ${MD`\left(\begin{array}{cccccc|c}
      \ast & \ast & \cdots & & & \ast & c_1\\
      0 & 0 & \ast & \cdots & & \ast & c_2\\
      \vdots & & & \ddots & & & \vdots\\
      0 & \cdots & & 0 & \ast & \cdots\ \ast & c_r\\
      0 & \cdots & & & & 0 & c_{r+1}\\
      \vdots & & & & & \vdots & \vdots\\
      0 & \cdots & & & & 0 & c_m
    \end{array}\right)`}
    <p>Die Sterne am Anfang jeder Zeile sind die <b>Pivots</b>. Der <b>Rang</b> ${M`r = \rang(A)`} ist die Anzahl der Pivots.</p>
    ${box('vorlesung', `<p><b>Definition (Verträglichkeitsbedingungen).</b> Gegeben sei ein LGS ${M`Ax = b`} mit ${M`A \in \R^{m\times n}`} und ${M`b \in \R^m`}. Die Verträglichkeitsbedingungen von ${M`Ax = b`} sind (falls vorhanden) die Zeilen des Gaussendschemas, in denen alle Variablen eliminiert wurden. Sie haben also die Form ${M`(0\ 0\ \cdots\ 0 \mid c_j)`}.</p>`, { src: `${SRC} 1–2` })}
    <p><b>So liest man das:</b> Eine Zeile ${M`(0\ \cdots\ 0 \mid c_j)`} bedeutet die Gleichung ${M`0 \cdot x_1 + \dots + 0 \cdot x_n = c_j`}, also ${M`0 = c_j`}. Ist ${M`c_j = 0`}, steht dort ${M`0 = 0`}: wahr und harmlos. Ist ${M`c_j \ne 0`}, steht dort zum Beispiel ${M`0 = 8`}: ein Widerspruch.</p>
    ${box('vorlesung', `<p><b>Satz zur Lösbarkeit.</b> Ein LGS ${M`Ax = b`} besitzt mindestens eine Lösung, wenn seine Verträglichkeitsbedingungen erfüllt sind. Sollte für mindestens ein ${M`c_k`} mit ${M`r + 1 \le k \le m`} die Bedingung ${M`c_k = 0`} nicht erfüllt sein, besitzt das LGS keine Lösung.</p>
      <p><b>Satz zur Lösungsmenge.</b> Sei ${M`Ax = b`} ein LGS mit mindestens einer Lösung, ${M`A \in \R^{m\times n}`}, ${M`\rang(A) = r`}. Falls ${M`r = n`}, hat das LGS genau eine Lösung. Falls ${M`r < n`}, hat es unendlich viele Lösungen mit ${M`n - r`} freien Parametern.</p>`, { src: `${SRC} 2` })}
    <p><b>Warum ${M`n - r`} freie Parameter?</b> Jedes Pivot «bestimmt» eine Variable durch Rückwärtseinsetzen. Es gibt ${M`r`} Pivots und ${M`n`} Variablen. Die ${M`n - r`} Variablen ohne Pivot darf man frei wählen.</p>
  `)}

  ${section('schema', '3. Das Schema in drei Schritten', `
    ${box('vorlesung', `<ol>
      <li><b>Gauss-Algorithmus anwenden:</b> ${M`(A\mid b)`} in Zeilenstufenform bringen.</li>
      <li><b>Lösbarkeit prüfen:</b> Steht in einer Nullzeile von ${M`A`} rechts ein ${M`c_k \ne 0`}? Dann gibt es keine Lösung (fertig). Sonst weiter.</li>
      <li><b>Lösungsmenge bestimmen:</b> ${M`r = n`}: genau eine Lösung. ${M`r < n`}: unendlich viele, mit ${M`n - r`} freien Parametern.</li>
    </ol>`, { src: `${SRC} 5` })}
    ${box('achtung', `<p>Die Reihenfolge ist wichtig: <b>zuerst</b> die Verträglichkeitsbedingungen, <b>dann</b> der Rang. Ein System mit ${M`r < n`} kann trotzdem <em>keine</em> Lösung haben, z.B. zwei parallele Geraden (${M`r = 1 < 2 = n`}). «${M`r < n`} ⇒ unendlich viele» gilt nur, wenn das LGS lösbar ist.</p>`)}
  `)}

  ${section('beispiel', '4. Durchgerechnet: Übung 1 aus U03', `
    ${box('vorlesung', `${MD`\begin{aligned} 3x_1 \phantom{{}+6x_2} - x_3 &= 0\\ 6x_1 + 6x_2 - 5x_3 &= -1\\ -2x_2 + x_3 &= 3\\ 3x_1 + 2x_2 - 2x_3 &= 5 \end{aligned}`}`, { src: `${SRC} 5–6` })}
    ${steps(U03_STEPS.map((s) => [MD([s.tex]), s.why]))}
    <p><b>Auswertung nach dem Schema:</b> Rang ${M`r = 2`} (zwei Pivots: 3 und ${M`-2`}). Die Verträglichkeitsbedingungen lauten ${M`0 = 8`}: nicht erfüllt. Also hat das LGS <b>keine Lösung</b>. Die Frage nach freien Variablen stellt sich gar nicht mehr.</p>
  `)}
  `;

  linesFigure(root.querySelector('#fig-lines'));
}

/* ---------------- Figur: zwei Geraden ---------------- */
function linesFigure(host) {
  const eq1 = { a: 1, b: 1, c: 2 }; // x1 + x2 = 2
  const eq2 = { a: 1, b: -1, c: 0 };
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const sliders = {};
  const mk = (key, label) => {
    sliders[key] = slider({ label, min: -3, max: 3, step: 0.5, value: eq2[key], format: (v) => M([fmt(v, 1)]), onInput: (v) => { eq2[key] = v; draw(); } });
    return sliders[key];
  };
  const presets = buttonRow([
    { label: 'genau eine', onClick: () => set(1, -1, 0) },
    { label: 'keine', onClick: () => set(2, 2, 1) },
    { label: 'unendlich viele', onClick: () => set(2, 2, 4) },
  ]);
  presets.firstChild.classList.add('active');
  controls.append(presets, mk('a', M`a_{21} =`), mk('b', M`a_{22} =`), mk('c', M`b_2 =`));
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  host.append(controls, fig, readout);

  function set(a, b, c) {
    eq2.a = a; eq2.b = b; eq2.c = c;
    for (const k of ['a', 'b', 'c']) sliders[k].querySelector('input').value = eq2[k];
    for (const k of ['a', 'b', 'c']) sliders[k].querySelector('output').innerHTML = M([fmt(eq2[k], 1)]);
    draw();
  }

  function line(p, { a, b, c }, cls) {
    const R = 4;
    let pts;
    if (Math.abs(b) > 1e-12) pts = [[-R, (c - a * -R) / b], [R, (c - a * R) / b]];
    else if (Math.abs(a) > 1e-12) pts = [[c / a, -R], [c / a, R]];
    else return; // 0 = c: keine Gerade
    el('line', { x1: p.X(pts[0][0]), y1: p.Y(pts[0][1]), x2: p.X(pts[1][0]), y2: p.Y(pts[1][1]), class: cls, 'stroke-width': 2.5 }, p.svg);
  }

  function draw() {
    fig.innerHTML = '';
    const p = plot(fig, { width: 420, height: 420, xmin: -4, xmax: 4, ymin: -4, ymax: 4 });
    p.svg.style.maxWidth = '420px';
    axes(p, { xmin: -4, xmax: 4, ymin: -4, ymax: 4, xticks: [-3, -2, -1, 1, 2, 3], yticks: [-3, -2, -1, 1, 2, 3], xlabel: 'x₁', ylabel: 'x₂' });
    line(p, eq1, 's-x');
    line(p, eq2, 's-y');
    const A = [[eq1.a, eq1.b], [eq2.a, eq2.b]];
    const res = analyze(A, [eq1.c, eq2.c]);
    const sol = solve2(eq1.a, eq1.b, eq1.c, eq2.a, eq2.b, eq2.c);
    if (sol && Math.abs(sol[0]) < 4 && Math.abs(sol[1]) < 4) {
      el('circle', { cx: p.X(sol[0]), cy: p.Y(sol[1]), r: 6, class: 'fill-point' }, p.svg);
      text(p.svg, p.X(sol[0]) + 10, p.Y(sol[1]) - 8, `(${fmtPlain(sol[0])}; ${fmtPlain(sol[1])})`, 'start', 't-point');
    }
    const R = res.R.map((row) => row.map((v) => fmt(v, 2)));
    const matrix = `\\left(\\begin{array}{cc|c} ${R.map((r) => r.join(' & ')).join('\\\\')} \\end{array}\\right)`;
    const verdict = {
      keine: `Die letzte Zeile lautet ${M([`0 = ${fmt(res.conditions[0], 2)}`])}: Verträglichkeitsbedingung verletzt → <b>keine Lösung</b>.`,
      eindeutig: `${M`r = 2 = n`} → <b>genau eine Lösung</b>.`,
      unendlich: `Verträglich, aber ${M([`r = ${res.rank} < 2 = n`])} → <b>unendlich viele Lösungen</b>, ${M([`n - r = ${res.free}`])} freier Parameter.`,
    }[res.kind];
    readout.innerHTML = `<div class="math-display">${M([`\\begin{aligned} x_1 + x_2 &= 2 \\\\ ${fmt(eq2.a, 1)}\\,x_1 + (${fmt(eq2.b, 1)})\\,x_2 &= ${fmt(eq2.c, 1)} \\end{aligned} \\quad\\longrightarrow\\quad ${matrix} \\qquad \\rang(A) = ${res.rank}`])}</div><p>${verdict}</p>`;
  }
}

function fmtPlain(x) {
  return String(Number(x.toFixed(2))).replace('.', ',');
}
