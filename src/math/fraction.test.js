import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Q, gaussSteps, pivotColumns } from './fraction.js';

test('Brüche rechnen exakt', () => {
  assert.equal(new Q(6, -4).tex(), '-\\tfrac{3}{2}');
  assert.equal(new Q(1, 2).add(new Q(1, 3)).tex(), '\\tfrac{5}{6}');
  assert.equal(new Q(5, 2).mul(-2).tex(), '-5');
});

test('Beispiel Mitschrift S. 5: Zeilenstufenform und Lösung x = (7 − 2r − 3s, r, 1, s, 2)', () => {
  const rows = [[0, 0, -2, 0, 7, 12], [2, 4, -10, 6, 12, 28], [2, 4, -5, 6, -5, -1]];
  const st = gaussSteps(rows);
  const R = st.at(-1).M.map((r) => r.map((v) => v.tex()));
  assert.deepEqual(R, [['2', '4', '-10', '6', '12', '28'], ['0', '0', '-2', '0', '7', '12'], ['0', '0', '0', '0', '\\tfrac{1}{2}', '1']]);
  assert.deepEqual(pivotColumns(st.at(-1).M), [0, 2, 4]);
  for (const [r, s] of [[0, 0], [1, -2], [3.5, 1]]) {
    const x = [7 - 2 * r - 3 * s, r, 1, s, 2];
    for (const row of rows) assert.ok(Math.abs(row.slice(0, 5).reduce((acc, a, j) => acc + a * x[j], 0) - row[5]) < 1e-12);
  }
});

test('Beispiel Mitschrift S. 2–3: x = (7/2, 1/2, 0)', () => {
  const rows = [[2, 4, 5, 9], [0, 2, 2, 1], [1, -1, 2, 3]];
  const st = gaussSteps(rows);
  const M = st.at(-1).M;
  // Rückwärtseinsetzen
  const x3 = M[2][3].div(M[2][2]);
  const x2 = M[1][3].sub(M[1][2].mul(x3)).div(M[1][1]);
  const x1 = M[0][3].sub(M[0][1].mul(x2)).sub(M[0][2].mul(x3)).div(M[0][0]);
  assert.deepEqual([x1.tex(), x2.tex(), x3.tex()], ['\\tfrac{7}{2}', '\\tfrac{1}{2}', '0']);
});
