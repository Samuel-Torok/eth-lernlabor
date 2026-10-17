import { test } from 'node:test';
import assert from 'node:assert/strict';
import { abs2, cabs, cadd, cdiv, cinv, cmul, conj, cpow } from './complex.js';

const near = (z, w, msg = '') => assert.ok(Math.abs(z[0] - w[0]) < 1e-9 && Math.abs(z[1] - w[1]) < 1e-9, `${msg}: ${z} vs ${w}`);

test('Beispiele aus dem Skript (A.1–A.2)', () => {
  near(cmul([5, 3], [4, -8]), [44, -28], '(5+3i)(4−8i)');
  near(cmul([5, -3], [4, 8]), [44, 28], '(5−3i)(4+8i) = konjugiert');
  near(cdiv([3, 2], [4, -1]), [10 / 17, 11 / 17], '(3+2i)/(4−i)');
  near(cinv([1, 3]), [0.1, -0.3], '1/(1+3i)');
  near(cinv([2, 5]), [2 / 29, -5 / 29], '1/(2+5i)');
  near(cinv([-3, -4]), [-3 / 25, 4 / 25], '1/(−3−4i)');
});

test('Re((3+i)^4(5−7i)) = Re((3−i)^4(5+7i)), da Re(z) = Re(z̄) (A.1)', () => {
  const a = cmul(cpow([3, 1], 4), [5, -7]), b = cmul(cpow([3, -1], 4), [5, 7]);
  assert.ok(Math.abs(a[0] - b[0]) < 1e-9);
  near(b, conj(a));
});

test('(3+4i)^10 = A + iB ⇒ i·(3−4i)^10 = B + iA (A.1)', () => {
  const [A, B] = cpow([3, 4], 10);
  near(cmul([0, 1], cpow([3, -4], 10)), [B, A]);
});

test('z + z̄ = 2 Re z, z·z̄ = |z|², 1/z = z̄/|z|² (A.1–A.2)', () => {
  for (const z of [[1, 3], [-2, 0.5], [0.3, -4]]) {
    near(cadd(z, conj(z)), [2 * z[0], 0]);
    near(cmul(z, conj(z)), [abs2(z), 0]);
    near(cmul(z, cinv(z)), [1, 0]);
    assert.ok(Math.abs(cabs(cinv(z)) - 1 / cabs(z)) < 1e-12);
    assert.ok(Math.abs(cinv(conj(z))[0] - cinv(z)[0]) < 1e-12, 'Re(1/z̄) = Re(1/z)');
  }
});
