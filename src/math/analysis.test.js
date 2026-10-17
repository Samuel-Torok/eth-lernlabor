import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bisection, dnum, geomClosed, geomPartial, harmonic, railRadius, tangentLine, transforms } from './analysis.js';

const close = (a, b, tol = 1e-9, msg = '') => assert.ok(Math.abs(a - b) < tol, `${msg}: ${a} vs ${b}`);

test('Geometrische Reihe: s_n = (1 − x^{n+1})/(1 − x) → 1/(1 − x) für |x| < 1 (Skript I.7)', () => {
  for (const x of [-0.9, -0.3, 0.5, 0.8, 1.5, -2]) for (const n of [0, 1, 5, 12]) close(geomPartial(x, n), geomClosed(x, n), 1e-9, `x=${x}, n=${n}`);
  for (const x of [-0.5, 0.5, 0.9]) close(geomPartial(x, 400), 1 / (1 - x), 1e-9, `Grenzwert x=${x}`);
});

test('Harmonische Reihe wächst unbeschränkt (Skript I.6): H_{2^k} ≥ 1 + k/2', () => {
  for (let k = 0; k <= 16; k++) assert.ok(harmonic(2 ** k) >= 1 + k / 2 - 1e-12);
});

test('Rechenregeln, Beispiele aus dem Skript (I.6): (2n+7)/(n−1) → 2, (7n⁴+3n²+2)/(−2n⁴+5n³−n) → −7/2', () => {
  const n = 1e7;
  close((2 * n + 7) / (n - 1), 2, 1e-5);
  close((7 * n ** 4 + 3 * n ** 2 + 2) / (-2 * n ** 4 + 5 * n ** 3 - n), -3.5, 1e-5);
});

test('Stetigkeit (I.13–I.17): sin x / x → 1, Sandwich cos x < sin x/x < 1/cos x', () => {
  for (const x of [0.5, 0.1, 0.01, 1e-4]) {
    const q = Math.sin(x) / x;
    assert.ok(Math.cos(x) < q && q < 1 / Math.cos(x), `x=${x}`);
  }
  close(Math.sin(1e-6) / 1e-6, 1, 1e-10);
  close(Math.tan(1e-6) / 1e-6, 1, 1e-10, 'tan x / x');
  close(Math.sin(1e-4) ** 2 / (1e-8 * (1 + Math.cos(1e-4))), 0.5, 1e-6, 'sin²x/(x²(1+cos x))');
  // 2^{-1/x}: links → ∞, rechts → 0 (I.15)
  assert.ok(2 ** (-1 / -0.01) > 1e29);
  assert.ok(2 ** (-1 / 0.01) < 1e-29);
});

test('Zwischenwertsatz: Halbierung findet ξ mit ξ² = cos ξ in [0, π/2] (Skript I.18–I.19)', () => {
  const f = (x) => x * x - Math.cos(x);
  assert.ok(f(0) < 0 && f(Math.PI / 2) > 0);
  const { xs, ys } = bisection(f, 0, Math.PI / 2, 0, 50);
  for (let i = 1; i < xs.length; i++) {
    assert.ok(xs[i] >= xs[i - 1] && ys[i] <= ys[i - 1], 'x_n wachsend, y_n fallend');
    close(ys[i] - xs[i], (Math.PI / 2) / 2 ** i, 1e-12, 'y_n − x_n = (b − a)/2^n');
    assert.ok(f(xs[i]) <= 0 && f(ys[i]) >= 0, 'f(x_n) ≤ m ≤ f(y_n)');
  }
  close(f(xs.at(-1)), 0, 1e-12);
});

test('Gleis-Beispiel (I.11): r² = a² + (r − x)²', () => {
  for (const [a, x] of [[1, 0.2], [2, 0.5], [3, 3]]) {
    const r = railRadius(a, x);
    close(r * r, a * a + (r - x) ** 2, 1e-12);
  }
});

test('Koordinatentransformationen (I.20)', () => {
  const f = (x) => x * x;
  close(transforms.shiftX(f, 2)(3), 1);
  close(transforms.shiftY(f, 2)(3), 11);
  close(transforms.scaleX(f, -2)(3), 36);
  close(transforms.scaleY(f, -2)(3), -18);
  close(transforms.invertY(f)(2), 0.25);
  close(transforms.invertX(f)(2), 0.25);
});

test('Linearisierung (II.6, II.8): cos bei 0 → t = 1; ln bei 1 → t = x − 1; (1+x)^α ≈ 1 + αx', () => {
  const t1 = tangentLine(Math.cos, (x) => -Math.sin(x), 0);
  close(t1(0.3), 1);
  const t2 = tangentLine(Math.log, (x) => 1 / x, 1);
  close(t2(1.4), 0.4);
  for (const a of [0.5, -0.5, -1, 3]) {
    const f = (x) => (1 + x) ** a, x = 1e-3;
    assert.ok(Math.abs(f(x) - (1 + a * x)) < 10 * x * x, `α=${a}`);
  }
});

test('Ableitungen aus Kap. II stimmen numerisch', () => {
  const cases = [
    [(x) => x ** 3, (x) => 3 * x * x, 'x³'],
    [Math.tan, (x) => 1 + Math.tan(x) ** 2, 'tan'],
    [(x) => Math.cos(x) ** 3, (x) => -3 * Math.cos(x) ** 2 * Math.sin(x), 'cos³'],
    [(x) => 1 / Math.tan(x * x), (x) => -2 * x / Math.sin(x * x) ** 2, 'cot(x²)'],
    [Math.acos, (x) => -1 / Math.sqrt(1 - x * x), 'arccos'],
    [Math.log, (x) => 1 / x, 'ln'],
  ];
  for (const [f, df, name] of cases) for (const x of [0.3, 0.7]) close(dnum(f, x), df(x), 1e-6, name);
});

test("Bernoulli-L'Hôpital-Beispiele (II.16): sin x/x → 1, (x−2x·cos(x²))... numerisch", () => {
  close(Math.sin(1e-7) / 1e-7, 1, 1e-10);
  // lim_{x→1} ln x/(x − 1) = 1
  close(Math.log(1 + 1e-8) / 1e-8, 1, 1e-6);
});

test('Extremalaufgabe (II.17): f(x) = (x − 1)·∛(x²) hat lokales Minimum bei x = 2/5', () => {
  const cbrt = Math.cbrt;
  const f = (x) => (x - 1) * cbrt(x * x);
  const df = (x) => (5 * x - 2) / (3 * cbrt(x));
  close(dnum(f, 0.7), df(0.7), 1e-6, "f'");
  close(df(0.4), 0, 1e-12);
  assert.ok(f(0.4) < f(0.39) && f(0.4) < f(0.41));
  close(f(0.4), -0.6 * cbrt(0.16), 1e-12, 'f(2/5) = −(3/5)·∛(4/25)');
});

test('Zylinder aus Kreisstamm (II.18): A(α) = 4r²(sin 2α − sin²α) ist maximal bei tan 2α = 2', () => {
  const A = (a) => Math.sin(2 * a) - Math.sin(a) ** 2;
  const aStar = Math.atan(2) / 2;
  close(dnum(A, aStar), 0, 1e-8);
  for (const d of [-0.05, 0.05]) assert.ok(A(aStar) > A(aStar + d));
});

test('Fehlerrechnung (II.10–II.11): Dreieck Δb/b ≈ cot β·Δβ, Kugel ΔV/V ≈ 3Δx/x, ΔO/O ≈ 2Δx/x', () => {
  const a = 2, alpha = 0.7, b = (beta) => (a / Math.sin(alpha)) * Math.sin(beta);
  for (const beta of [0.4, 1.0, 1.4]) {
    const d = 1e-5;
    close((b(beta + d) - b(beta)) / b(beta), d / Math.tan(beta), 1e-9, `β=${beta}`);
  }
  const V = (x) => (4 * Math.PI / 3) * (x / 2) ** 3, O = (x) => 4 * Math.PI * (x / 2) ** 2;
  const x = 3, dx = 1e-6;
  close((V(x + dx) - V(x)) / V(x), 3 * dx / x, 1e-11);
  close((O(x + dx) - O(x)) / O(x), 2 * dx / x, 1e-11);
});

test('Qualität der Linearisierung (II.7): φ(x)/Δx → 0', () => {
  const f = Math.exp, x0 = 0.5;
  const phi = (x) => f(x) - (f(x0) + f(x0) * (x - x0));
  let prev = Infinity;
  for (const dx of [0.1, 0.01, 0.001]) { const r = Math.abs(phi(x0 + dx) / dx); assert.ok(r < prev); prev = r; }
  assert.ok(prev < 1e-3);
});

test("Bernoulli-L'Hôpital (II.16): (e^x − e)/ln x → e (x→1), (x²/2 − sin x²)/ln(1+x²) → −1/2 (x→0)", () => {
  const x = 1 + 1e-6;
  close((Math.exp(x) - Math.E) / Math.log(x), Math.E, 1e-5);
  const y = 1e-3;
  close((y * y / 2 - Math.sin(y * y)) / Math.log(1 + y * y), -0.5, 1e-5);
});

test('MWS (II.13): für f = sin auf [0.2, 2.5] existiert ξ mit f\'(ξ) = Sekantensteigung', async () => {
  const { mvtPoints } = await import('./analysis.js');
  const a = 0.2, b = 2.5, m = (Math.sin(b) - Math.sin(a)) / (b - a);
  const xs = mvtPoints(Math.sin, Math.cos, a, b);
  assert.ok(xs.length >= 1);
  for (const x of xs) { assert.ok(x > a && x < b); close(Math.cos(x), m, 1e-9); }
});
