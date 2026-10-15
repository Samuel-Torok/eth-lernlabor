import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyze, solve2 } from './linsys.js';

test('U03 Übung 1: Rang 2, Verträglichkeitsbedingungen verletzt → keine Lösung', () => {
  const A = [[3, 0, -1], [6, 6, -5], [0, -2, 1], [3, 2, -2]];
  const b = [0, -1, 3, 5];
  const res = analyze(A, b);
  assert.equal(res.rank, 2);
  assert.equal(res.solvable, false);
  assert.equal(res.kind, 'keine');
  // U03 zeigt (0 0 0 | 8) zweimal; mit anderen Zeilenoperationen entstehen andere Zahlen,
  // entscheidend ist nur: zwei Nullzeilen mit rechter Seite ≠ 0.
  assert.equal(res.conditions.length, 2);
  assert.ok(res.conditions.every((c) => Math.abs(c) > 1e-9));
});

test('r = n → genau eine Lösung', () => {
  const res = analyze([[2, 1], [1, -1]], [5, 1]);
  assert.equal(res.kind, 'eindeutig');
  assert.deepEqual(solve2(2, 1, 5, 1, -1, 1), [2, 1]);
});

test('r < n und verträglich → unendlich viele Lösungen mit n − r freien Parametern', () => {
  const res = analyze([[1, 2, 3], [2, 4, 6]], [1, 2]);
  assert.equal(res.rank, 1);
  assert.equal(res.kind, 'unendlich');
  assert.equal(res.free, 2);
});

test('Parallele Geraden: Rang 1, Bedingung ≠ 0 → keine Lösung', () => {
  const res = analyze([[1, 1], [2, 2]], [1, 3]);
  assert.equal(res.kind, 'keine');
  assert.equal(solve2(1, 1, 1, 2, 2, 3), null);
});

test('Zeilenvertauschung bei Pivot 0', () => {
  const res = analyze([[0, 1], [1, 0]], [2, 3]);
  assert.equal(res.kind, 'eindeutig');
  assert.deepEqual(res.pivots, [0, 1]);
});
