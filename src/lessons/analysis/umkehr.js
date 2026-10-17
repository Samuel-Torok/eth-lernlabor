import { M, MD, fmt } from '../../ui/tex.js';
import { box, figure, section } from '../../ui/blocks.js';
import { slider, buttonRow } from '../../ui/controls.js';
import { plot, axes, el, text, graph, grid } from '../../ui/svg.js';

export default function render(root) {
  root.innerHTML = `
  <p class="lede">Der Cosinus macht aus einer Bogenlänge eine ${M`x`}-Koordinate. Oft braucht man das Umgekehrte: Aus der ${M`x`}-Koordinate die Bogenlänge. Wann kann man eine Funktion umkehren? Die Vorlesung widerlegt: «Die Umkehrfunktion von ${M`x^2`} ist die Funktion ${M`\pm\sqrt x`}».</p>

  ${section('problem', `1. Das Problem mit ${M`x^2`}`, `
    ${box('vorlesung', `<p>Sei ${M`f(x) := x^2`}. Gesucht: ${M`g(y)`}, so dass ${M`\big(g(y)\big)^2 = y`}. <b>Problem:</b> In diesem Fall gibt es zwei Möglichkeiten für die Umkehrung, aber eine Funktion ${M`g`} kann nur einen Wert annehmen. <b>Mögliche Lösung:</b> Nur nicht-negative Werte für ${M`g`} nehmen. Also: Für ${M`f: [0,\infty)\to[0,\infty),\ x\mapsto x^2`} ist ${M`g: [0,\infty)\to[0,\infty),\ y\mapsto\sqrt y`} die <b>Umkehrfunktion</b> von ${M`f`}, d.h.</p>
      ${MD`g\big(f(x)\big) = \sqrt{x^2} = x \quad\text{und}\quad f\big(g(y)\big) = (\sqrt y)^2 = y \qquad\text{für alle } x, y\ge0.`}
      <p>Wir haben dies ermöglicht durch Einschränkung von ${M`D(f)`} und dem Zielbereich.</p>`, { src: 'S. I.21' })}
    ${box('achtung', `<p>${M`\pm\sqrt x`} ist keine Funktion: Eine Funktion ordnet jedem Input <b>genau einen</b> Output zu. ${M`\sqrt{x^2} = |x|`}, nicht ${M`x`}. Nur auf ${M`[0,\infty)`} ist ${M`\sqrt{x^2} = x`}.</p>`)}
  `)}

  ${section('begriffe', '2. Injektiv, surjektiv, bijektiv', `
    ${box('vorlesung', `<p><b>Definition.</b> Eine Funktion ${M`f`} ist <b>injektiv</b>, wenn aus ${M`x_1\ne x_2`} mit ${M`x_1, x_2\in D(f)`} stets ${M`f(x_1)\ne f(x_2)`} folgt.</p>
      <p>Gleichbedeutend: Aus ${M`f(x_1) = f(x_2)`} folgt ${M`x_1 = x_2`}. Jede horizontale Gerade schneidet den Graphen ${M`\Gamma(f)`} höchstens ein Mal.</p>
      <p><b>Beispiel.</b> ${M`f: x\mapsto x^2`} mit ${M`D(f) = \R`} ist nicht injektiv, da z.B. ${M`f(-1) = f(1)`}, aber ${M`-1\ne1`}. Mit ${M`D(f) = [0,\infty)`} ist sie jetzt injektiv, da kein Wert mehrfach angenommen wird.</p>`, { src: 'S. I.22' })}
    ${box('vorlesung', `<p><b>Definition.</b> Eine Funktion ${M`f: D(f)\to B`} ist <b>surjektiv</b>, wenn für jedes ${M`y\in B`} (mindestens) ein ${M`x\in D(f)`} existiert, so dass ${M`f(x) = y`}.</p>
      <p>Gleichbedeutend: ${M`B = W(f)`}, also Zielbereich = Wertebereich. Falls ${M`B = \R`}: Jede horizontale Gerade schneidet ${M`\Gamma(f)`} mindestens ein Mal. Jeder Wert im Zielbereich wird angenommen.</p>
      <p>Jede Funktion kann durch Einschränken von ${M`D(f)`} injektiv und durch Einschränken von ${M`B`} surjektiv gemacht werden.</p>
      <p><b>Definition.</b> Eine Funktion ${M`f`} ist <b>bijektiv / umkehrbar / invertierbar</b>, wenn ${M`f`} injektiv und surjektiv ist. ${M`\Rightarrow`} Es gibt eine <b>Umkehrfunktion / Inverse</b> ${M`f^{-1}: W(f)\to D(f)`}, so dass gilt: ${M`f^{-1}\big(f(x)\big) = x\in D(f)`} und ${M`f\big(f^{-1}(y)\big) = y \in W(f)`}.</p>`, { src: 'S. I.22' })}
    ${figure('fig-inv', `Die horizontale Gerade (violett) testet die Injektivität: Schneidet sie den Graphen (blau) zwei Mal, ist ${M`f`} nicht injektiv. Für bijektive Funktionen erscheint die Umkehrfunktion (bernstein) als Spiegelbild an der Diagonalen ${M`y = x`}.`, { wide: true })}
    ${box('achtung', `<p>${M`f^{-1}`} heisst «Umkehrfunktion», <b>nicht</b> ${M`\frac1f`}. Beispiel: ${M`\sin^{-1} = \arcsin`}, aber ${M`\frac{1}{\sin x}`} ist etwas ganz anderes.</p>`)}
  `)}

  ${section('beispiele', '3. Beispiele', `
    ${box('vorlesung', `<p><b>Beispiel.</b> ${M`f(x) := ax + b`} mit ${M`a, b\in\R`}, ${M`a\ne0`}, ist eine <b>lineare Funktion</b> (keine lineare Abbildung im Sinne der Linearen Algebra!). Wenn ${M`f(x_1) = f(x_2)`}, dann ist ${M`ax_1 + b = ax_2 + b \iff x_1 = x_2`} (da ${M`a\ne0`}): ${M`f`} ist injektiv. Für jedes ${M`y\in\R`} ist ${M`y = ax + b \iff x = \frac{y-b}{a}`}: ${M`f`} ist surjektiv. Also bijektiv mit ${M`f^{-1}(y) = \frac{y-b}{a}`}.</p>
      <p><b>Beispiel.</b> Sei ${M`f`} eine beliebige, strikt monotone Funktion. Für ${M`x_1\ne x_2`} ist ${M`f(x_1) \gtrless f(x_2)`}, also ist ${M`f`} injektiv.</p>
      <p><b>Beispiel.</b> ${M`g(x) := a^x`}, ${M`a > 1`}, ${M`D(g) = \R`}: ${M`g`} ist strikt monoton wachsend, also injektiv. ${M`W(g) = (0,\infty)`}, da jede positive Zahl angenommen wird. ${M`g: \R\to(0,\infty)`} ist bijektiv mit Inverse ${M`\log_a(x)`}.</p>
      <p><b>Beispiel.</b> ${M`h(x) := x^2`}, ${M`D(h) = \R`}: Nicht injektiv, da ${M`h(x_1) = h(x_2)\iff x_1^2 = x_2^2`} zwei Möglichkeiten hat (${M`x_1 = x_2`} oder ${M`x_1 = -x_2`}). Durch Einschränkung ${M`h|_{[0,\infty)}: [0,\infty)\to[0,\infty)`} bijektiv. Andere Einschränkung: ${M`h|_{(-\infty,0]}: (-\infty,0]\to[0,\infty)`} ist bijektiv mit Inverse ${M`\big(h|_{(-\infty,0]}\big)^{-1}: y\mapsto-\sqrt y`}.</p>`, { src: 'S. I.23–I.24' })}
    ${box('vorlesung', `<p><b>Graphisches Umkehren:</b> ${M`y = f(x) \iff (x,y)\in\Gamma(f)`}. ${M`f`} bijektiv ${M`\Rightarrow x = f^{-1}(y)\iff (y,x)\in\Gamma(f^{-1})`}. Wenn man ${M`f`} und ${M`f^{-1}`} im gleichen Koordinatensystem zeichnet, entsteht ${M`\Gamma(f^{-1})`} durch Spiegeln von ${M`\Gamma(f)`} an der Diagonalen ${M`x = y`}.</p>`, { src: 'S. I.24' })}
    <p><b>Warum spiegeln?</b> Die Umkehrfunktion vertauscht die Rollen von Input und Output. Aus jedem Punkt ${M`(x, y)`} des Graphen wird ${M`(y, x)`}. Vertauschen der Koordinaten ist genau die Spiegelung an der Diagonalen.</p>
  `)}
  `;
  invFigure(root.querySelector('#fig-inv'));
}

function invFigure(host) {
  const cases = {
    sqR: { f: (x) => x * x, D: [-3, 3], inv: null, tex: 'x^2 \\text{ auf } \\R' },
    sqP: { f: (x) => x * x, D: [0, 3], inv: Math.sqrt, invD: [0, 9], tex: 'x^2 \\text{ auf } [0,\\infty)', invTex: '\\sqrt y' },
    sqN: { f: (x) => x * x, D: [-3, 0], inv: (y) => -Math.sqrt(y), invD: [0, 9], tex: 'x^2 \\text{ auf } (-\\infty, 0]', invTex: '-\\sqrt y' },
    exp: { f: Math.exp, D: [-3, 2.2], inv: Math.log, invD: [0.01, 9], tex: 'e^x', invTex: '\\ln y' },
    cos: { f: Math.cos, D: [0, Math.PI], inv: Math.acos, invD: [-1, 1], tex: '\\cos x \\text{ auf } [0,\\pi]', invTex: '\\arccos y' },
  };
  let cs = cases.sqR;
  let h = 2;
  const controls = document.createElement('div');
  controls.className = 'fig-controls';
  const fig = document.createElement('div');
  const readout = document.createElement('div');
  readout.className = 'readout';
  const btns = buttonRow(Object.entries(cases).map(([k, c]) => ({ label: M([c.tex]), onClick: () => { cs = cases[k]; draw(); } })));
  btns.firstChild.classList.add('active');
  controls.append(btns, slider({ label: M`\text{Gerade } y =`, min: -1.5, max: 5, step: 0.1, value: h, format: (v) => M([fmt(v, 1)]), onInput: (v) => { h = v; draw(); } }));
  host.append(controls, fig, readout);
  function draw() {
    fig.innerHTML = '';
    const B = { xmin: -3.5, xmax: 5.5, ymin: -3.5, ymax: 5.5 };
    const p = plot(fig, { width: 460, height: 460, ...B });
    p.svg.style.maxWidth = '460px';
    grid(p, B);
    axes(p, { ...B, xticks: [-2, 2, 4], yticks: [-2, 2, 4], xlabel: 'x', ylabel: 'y' });
    el('line', { x1: p.X(-3.5), y1: p.Y(-3.5), x2: p.X(5.5), y2: p.Y(5.5), class: 's-dark dashed', 'stroke-width': 1 }, p.svg);
    text(p.svg, p.X(5.2), p.Y(5.2) + 16, 'y = x', 'end', 'math');
    graph(p, cs.f, { xmin: cs.D[0], xmax: cs.D[1], ...{ ymin: B.ymin, ymax: B.ymax }, cls: 's-x', width: 3 });
    if (cs.inv) graph(p, cs.inv, { xmin: cs.invD[0], xmax: cs.invD[1], ymin: B.ymin, ymax: B.ymax, cls: 's-y', width: 3 });
    el('line', { x1: p.X(-3.5), y1: p.Y(h), x2: p.X(5.5), y2: p.Y(h), class: 's-angle', 'stroke-width': 1.5 }, p.svg);
    // Schnittpunkte zählen (numerisch)
    const hits = [];
    const N = 4000;
    let prev = cs.f(cs.D[0]) - h;
    if (Math.abs(prev) < 1e-9) hits.push(cs.D[0]);
    for (let i = 1; i <= N; i++) {
      const x = cs.D[0] + ((cs.D[1] - cs.D[0]) * i) / N, v = cs.f(x) - h;
      if (prev * v < 0 || Math.abs(v) < 1e-12) hits.push(x);
      prev = v;
    }
    const uniq = hits.filter((x, i) => i === 0 || Math.abs(x - hits[i - 1]) > 1e-3);
    for (const x of uniq) el('circle', { cx: p.X(x), cy: p.Y(h), r: 5, class: 'fill-point' }, p.svg);
    const inj = cs.inv !== null;
    readout.innerHTML = `Die Gerade ${M([`y = ${fmt(h, 1)}`])} schneidet ${M([cs.tex])} ${uniq.length}-mal. ${inj ? `Die Funktion ist injektiv; Umkehrfunktion: ${M([cs.invTex])}.` : `Für ${M`y > 0`} gibt es zwei Schnittpunkte: ${M`f(-x) = f(x)`}, also nicht injektiv und nicht umkehrbar.`}`;
  }
  draw();
}
