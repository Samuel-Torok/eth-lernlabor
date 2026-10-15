import { test } from 'node:test';
import assert from 'node:assert/strict';
import { U03_START, U03_STEPS, applyOps } from './examples-linalg.js';

test('U03 Übung 1: jeder Handschritt stimmt, Endform = Lösung in U03', () => {
  let M = U03_START;
  for (const s of U03_STEPS) {
    M = applyOps(M, s.ops);
    assert.deepEqual(M, s.M, s.why);
  }
  assert.deepEqual(M, [[3, 0, -1, 0], [0, -2, 1, 3], [0, 0, 0, 8], [0, 0, 0, 8]]);
});
