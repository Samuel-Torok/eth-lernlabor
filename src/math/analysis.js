/** Analysis I: Hilfsfunktionen für Figuren und Tests. Rein, ohne DOM. */

/** Partialsumme s_n = Σ_{k=0}^{n} x^k  (Skript I.7) */
export function geomPartial(x, n) {
  let s = 0, p = 1;
  for (let k = 0; k <= n; k++) { s += p; p *= x; }
  return s;
}

/** Geschlossene Form (1 − x^{n+1})/(1 − x), x ≠ 1  (Skript I.7) */
export function geomClosed(x, n) {
  return (1 - x ** (n + 1)) / (1 - x);
}

/** Harmonische Partialsumme 1 + 1/2 + … + 1/n  (Skript I.6) */
export function harmonic(n) {
  let s = 0;
  for (let k = 1; k <= n; k++) s += 1 / k;
  return s;
}

/**
 * Halbierungsverfahren aus dem Beweis des Zwischenwertsatzes (Skript I.18–I.19).
 * Voraussetzung: f stetig auf [a, b], f(a) ≤ m ≤ f(b). Gibt die Folgen (x_n), (y_n) zurück.
 */
export function bisection(f, a, b, m, steps) {
  const xs = [a], ys = [b];
  let x = a, y = b;
  for (let i = 0; i < steps; i++) {
    const mid = (x + y) / 2;
    if (f(mid) >= m) y = mid; else x = mid;
    xs.push(x); ys.push(y);
  }
  return { xs, ys };
}

/** Gleis um ein Gebäude (Skript I.11): Radius r(a, x) = (a² + x²)/(2x) */
export function railRadius(a, x) {
  return (a * a + x * x) / (2 * x);
}

/** Koordinatentransformationen (Skript I.20) als Funktionsfabrik. */
export const transforms = {
  shiftX: (f, a) => (x) => f(x - a),
  shiftY: (f, b) => (x) => f(x) + b,
  scaleX: (f, c) => (x) => f(c * x),
  scaleY: (f, d) => (x) => d * f(x),
  invertY: (f) => (x) => 1 / f(x),
  invertX: (f) => (x) => f(1 / x),
};

/** Numerische Ableitung (zentral) — für Figuren und Tests. */
export function dnum(f, x, h = 1e-6) {
  return (f(x + h) - f(x - h)) / (2 * h);
}

/** Lineare Ersatzfunktion t(x) = f(x0) + f'(x0)(x − x0)  (Skript II.6) */
export function tangentLine(f, df, x0) {
  return (x) => f(x0) + df(x0) * (x - x0);
}

/** Alle Stellen ξ ∈ (a, b) mit f'(ξ) = (f(b) − f(a))/(b − a), numerisch (Vorzeichenwechsel + Halbierung). */
export function mvtPoints(f, df, a, b, n = 2000) {
  const m = (f(b) - f(a)) / (b - a);
  const g = (x) => df(x) - m;
  const out = [];
  let x0 = a + (b - a) / n / 2, g0 = g(x0);
  for (let i = 1; i <= n; i++) {
    const x1 = a + ((b - a) * (i + 0.5)) / (n + 1), g1 = g(x1);
    if (g0 === 0) out.push(x0);
    else if (g0 * g1 < 0) {
      let lo = x0, hi = x1;
      for (let k = 0; k < 60; k++) { const mid = (lo + hi) / 2; if (g(lo) * g(mid) <= 0) hi = mid; else lo = mid; }
      out.push((lo + hi) / 2);
    }
    x0 = x1; g0 = g1;
  }
  return out;
}
