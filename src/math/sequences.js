/** Folgen (Analysis I, Kap. I.1). Reine Funktionen ohne DOM, damit sie getestet werden können. */

export function terms(f, from, to) {
  const out = [];
  for (let n = from; n <= to; n++) out.push([n, f(n)]);
  return out;
}

/**
 * Kleinstes n0 ≥ from, so dass |a_n − a| < ε für alle n mit n0 ≤ n ≤ nMax.
 * Numerischer Test über endlich viele Glieder — ein Hinweis, kein Beweis.
 * Gibt null zurück, wenn schon a_nMax nicht im Streifen liegt.
 */
export function firstIndexWithin(f, a, eps, nMax, from = 1) {
  let n0 = null;
  for (let n = nMax; n >= from; n--) {
    if (Math.abs(f(n) - a) < eps) n0 = n;
    else break;
  }
  return n0;
}

/** Für a_n = 1/n (Skript I.4): |a_n| < ε ⇔ n > 1/ε, also ist n0 = ⌊1/ε⌋ + 1 die kleinste Wahl. */
export function n0ForHarmonic(eps) {
  return Math.floor(1 / eps) + 1;
}

export function factorial(n) {
  let p = 1;
  for (let k = 2; k <= n; k++) p *= k;
  return p;
}

/** a_n = 1 + 1/1! + … + 1/n!  (Skript I.5) */
export function eSum(n) {
  let s = 0;
  for (let k = 0; k <= n; k++) s += 1 / factorial(k);
  return s;
}

/** Obere Schranke c_n = 1 + 1 + 1/2 + … + 1/2^(n−1) = 3 − 1/2^(n−1)  (Skript I.5–I.6) */
export function eBound(n) {
  return 3 - 1 / 2 ** (n - 1);
}

/** Die Beispielfolgen aus dem Skript, mit Grenzwert (oder null, wenn divergent). */
export const EXAMPLES = {
  harmonic: { f: (n) => 1 / n, limit: 0, tex: 'a_n = \\tfrac{1}{n}', page: 'I.4' },
  // gerundet: sin(nπ/2) ist exakt 0 oder ±1; "+ 0" macht aus −0 eine 0
  sine: { f: (n) => Math.round(Math.sin((n * Math.PI) / 2)) + 0, limit: null, tex: 'b_n = \\sin\\!\\left(n\\cdot\\tfrac{\\pi}{2}\\right)', page: 'I.4' },
  alternating: { f: (n) => 1 + (-1) ** n / Math.sqrt(n), limit: 1, tex: 'c_n = 1 + \\tfrac{(-1)^n}{\\sqrt{n}}', page: 'I.4' },
  e: { f: eSum, limit: Math.E, tex: 'a_n = 1 + \\tfrac{1}{1!} + \\dots + \\tfrac{1}{n!}', page: 'I.5' },
};
