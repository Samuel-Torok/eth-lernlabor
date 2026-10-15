/**
 * U03, Übung 1, von Hand gerechnet — so, dass das Ergebnis genau der Lösung in U03 entspricht.
 * Jede Matrix ist die erweiterte Matrix (A|b) NACH dem Schritt; examples-linalg.test.js rechnet jeden Schritt nach.
 */
export const U03_START = [
  [3, 0, -1, 0],
  [6, 6, -5, -1],
  [0, -2, 1, 3],
  [3, 2, -2, 5],
];

/** ops: ['add', ziel, quelle, faktor] heisst Z_ziel := Z_ziel + faktor·Z_quelle; ['swap', i, j]. Zeilen ab 0 gezählt. */
export const U03_STEPS = [
  {
    ops: [['add', 1, 0, -2], ['add', 3, 0, -1]],
    M: [[3, 0, -1, 0], [0, 6, -3, -1], [0, -2, 1, 3], [0, 2, -1, 5]],
    why: 'Z₂ − 2·Z₁ und Z₄ − Z₁: In der ersten Spalte unter dem Pivot 3 entstehen Nullen.',
  },
  {
    ops: [['swap', 1, 2]],
    M: [[3, 0, -1, 0], [0, -2, 1, 3], [0, 6, -3, -1], [0, 2, -1, 5]],
    why: 'Z₂ und Z₃ tauschen. Nötig ist das nicht, aber mit −2 als Pivot rechnet es sich leichter (und es entspricht der Lösung in U03).',
  },
  {
    ops: [['add', 2, 1, 3], ['add', 3, 1, 1]],
    M: [[3, 0, -1, 0], [0, -2, 1, 3], [0, 0, 0, 8], [0, 0, 0, 8]],
    why: 'Z₃ + 3·Z₂ und Z₄ + Z₂: Auch x₃ verschwindet in diesen Zeilen. Zwei Nullzeilen links, rechts jeweils 8.',
  },
].map((s) => ({ ...s, tex: toTex(s.M) }));

function toTex(M) {
  return `\\left(\\begin{array}{ccc|c} ${M.map((r) => r.join(' & ')).join(' \\\\ ')} \\end{array}\\right)`;
}

export function applyOps(M, ops) {
  const R = M.map((r) => [...r]);
  for (const [kind, i, j, f] of ops) {
    if (kind === 'swap') [R[i], R[j]] = [R[j], R[i]];
    else R[i] = R[i].map((v, k) => v + f * R[j][k]);
  }
  return R;
}
