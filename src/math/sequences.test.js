import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EXAMPLES, eBound, eSum, firstIndexWithin, n0ForHarmonic } from './sequences.js';

test('1/n: n0 = ⌊1/ε⌋+1 ist die kleinste Wahl (Skript I.4)', () => {
  for (const eps of [0.5, 0.3, 0.1, 0.07, 0.01]) {
    const n0 = n0ForHarmonic(eps);
    assert.ok(1 / n0 < eps, `a_n0 im Streifen für ε=${eps}`);
    assert.ok(n0 === 1 || 1 / (n0 - 1) >= eps, `n0−1 noch nicht im Streifen für ε=${eps}`);
    assert.equal(firstIndexWithin(EXAMPLES.harmonic.f, 0, eps, 5000), n0);
  }
});

test('sin(nπ/2) ist keine Nullfolge: für ε = 1/2 liegt jedes 4. Glied bei 1 (Skript I.4)', () => {
  const f = EXAMPLES.sine.f;
  assert.deepEqual([1, 2, 3, 4, 5].map(f), [1, 0, -1, 0, 1]);
  for (let n = 1; n < 400; n += 4) assert.equal(f(n), 1);
});

test('1 + (−1)^n/√n → 1: |c_n − 1| = 1/√n < ε ⇔ n > 1/ε²', () => {
  for (const eps of [0.45, 0.15, 0.07]) {
    const n0 = Math.floor(1 / eps ** 2) + 1;
    assert.equal(firstIndexWithin(EXAMPLES.alternating.f, 1, eps, 20000), n0);
  }
});

test('Summe 1/k!: wachsend und durch c_n = 3 − 1/2^(n−1) < 3 beschränkt (Skript I.5–I.6)', () => {
  for (let n = 1; n <= 15; n++) { // ab n ≈ 18 ist 1/n! kleiner als die Rechengenauigkeit
    assert.ok(eSum(n + 1) > eSum(n), 'streng monoton wachsend');
    assert.ok(eSum(n) <= eBound(n) + 1e-12, `a_n ≤ c_n für n=${n}`);
    assert.ok(eBound(n) < 3);
  }
  assert.ok(Math.abs(eSum(20) - Math.E) < 1e-12, 'Grenzwert e (Skript I.6, numerisch)');
});
