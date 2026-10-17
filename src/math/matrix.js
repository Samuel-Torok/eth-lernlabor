/** Matrizen als Arrays von Zeilen. LinAlg I, Kap. 2. */
export const shape = (A) => [A.length, A[0].length];
export const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
export const madd = (A, B) => A.map((r, i) => r.map((v, j) => v + B[i][j]));
export const mscale = (k, A) => A.map((r) => r.map((v) => k * v));
/** (AB)_ij = Σ_k A_ik B_kj  (Mitschrift Rickenbach S. 12) */
export function mmul(A, B) {
  const [m, n] = shape(A), [n2, p] = shape(B);
  if (n !== n2) throw new Error(`Produkt nicht definiert: ${m}×${n} mal ${n2}×${p}`);
  return A.map((row) => [...Array(p).keys()].map((j) => row.reduce((s, a, k) => s + a * B[k][j], 0)));
}
export const identity = (n) => [...Array(n).keys()].map((i) => [...Array(n).keys()].map((j) => (i === j ? 1 : 0)));
export const meq = (A, B, tol = 1e-12) => A.length === B.length && A.every((r, i) => r.length === B[i].length && r.every((v, j) => Math.abs(v - B[i][j]) < tol));
