import { test } from 'node:test';
import assert from 'node:assert/strict';
import { identity, madd, meq, mmul, mscale, transpose } from './matrix.js';

const A = [[1, 2, 3], [4, 5, 6]];

test('Transponierte (S. 10): (A^T)_ij = A_ji, Beispiel aus der Mitschrift', () => {
  assert.deepEqual(transpose(A), [[1, 4], [2, 5], [3, 6]]);
  assert.deepEqual(transpose(transpose(A)), A);
});

test('Addition und Skalar (S. 11): Beispiele aus der Mitschrift', () => {
  assert.deepEqual(madd([[1, 0, 1], [0, 1, 0]], [[0, 1, 0], [1, 0, 1]]), [[1, 1, 1], [1, 1, 1]]);
  assert.deepEqual(mscale(7, [[1, 0, 0], [2, 1, 0]]), [[7, 0, 0], [14, 7, 0]]);
});

test('Produkt (S. 12): m×n mal n×p gibt m×p; U04 Übung: A·C', () => {
  const A4 = [[4, -2, 0], [-1, 3, 5]], C = [[0, 1], [-3, 5], [2, 2]];
  assert.deepEqual(mmul(A4, C), [[6, -6], [1, 24]]);
  assert.throws(() => mmul(A4, A4));
});

test('Rechenregeln Satz 2.1 (S. 12) und Einheitsmatrix (S. 13)', () => {
  const B = [[1, -1], [0, 2], [3, 1]], C = [[2, 0, 1], [1, 1, 0]], D = [[0, 1, 2], [1, 0, -1]];
  assert.ok(meq(mmul(mmul(A, B), C), mmul(A, mmul(B, C))), 'Assoziativ');
  assert.ok(meq(mmul(madd(A, D), B), madd(mmul(A, B), mmul(D, B))), 'Distributiv');
  assert.ok(meq(mmul(identity(2), A), A) && meq(mmul(A, identity(3)), A), 'I_m A = A I_n = A');
});

test('Nicht kommutativ (S. 12): Beispiel mit AB ≠ BA', () => {
  const P = [[1, 2], [0, 1]], R = [[0, 1], [1, 0]];
  assert.ok(!meq(mmul(P, R), mmul(R, P)));
});

test('Satz 2.2 (S. 13): A e_i = i-te Spalte, Ax = x_1 a_1 + … + x_n a_n', () => {
  const x = [2, -1, 3];
  const Ax = mmul(A, x.map((v) => [v])).map((r) => r[0]);
  const comb = [0, 1].map((i) => x.reduce((s, xj, j) => s + xj * A[i][j], 0));
  assert.deepEqual(Ax, comb);
  assert.deepEqual(mmul(A, [[0], [1], [0]]).map((r) => r[0]), [2, 5]);
});
