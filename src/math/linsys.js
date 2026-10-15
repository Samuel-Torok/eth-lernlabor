/** Lineare Gleichungssysteme (LinAlg I, Kap. 1). Reine Funktionen, getestet in linsys.test.js. */

const TOL = 1e-10;

/**
 * Bringt die erweiterte Matrix (A|b) mit Gauss in Zeilenstufenform.
 * Zeilenvertauschung nur, wenn das Pivot 0 ist (wie von Hand), damit die Schritte nachvollziehbar bleiben.
 * Gibt die Zeilenstufenform R, die Pivotspalten und die Liste der Schritte zurück.
 */
export function echelon(A, b) {
  const m = A.length;
  const n = A[0].length;
  const R = A.map((row, i) => [...row, b[i]]);
  const pivots = [];
  const log = [];
  let r = 0;
  for (let c = 0; c < n && r < m; c++) {
    let p = r;
    while (p < m && Math.abs(R[p][c]) < TOL) p++;
    if (p === m) continue; // keine Pivot in dieser Spalte → freie Variable
    if (p !== r) {
      [R[p], R[r]] = [R[r], R[p]];
      log.push({ op: 'swap', i: r, j: p });
    }
    for (let i = r + 1; i < m; i++) {
      const f = R[i][c] / R[r][c];
      if (Math.abs(f) < TOL) continue;
      for (let j = c; j <= n; j++) R[i][j] -= f * R[r][j];
      R[i][c] = 0;
      log.push({ op: 'sub', target: i, source: r, factor: f });
    }
    pivots.push(c);
    r++;
  }
  for (const row of R) for (let j = 0; j < row.length; j++) if (Math.abs(row[j]) < TOL) row[j] = 0;
  return { R, pivots, rank: pivots.length, log };
}

/**
 * Analyse nach dem Schema aus U03 (Karpatchev, S. 5):
 * 1. Zeilenstufenform  2. Verträglichkeitsbedingungen c_{r+1} = … = c_m = 0  3. Rang r vs. n.
 */
export function analyze(A, b) {
  const n = A[0].length;
  const { R, pivots, rank } = echelon(A, b);
  const conditions = R.slice(rank).map((row) => row[n]); // c_{r+1}, …, c_m
  const solvable = conditions.every((c) => Math.abs(c) < TOL);
  let kind;
  if (!solvable) kind = 'keine';
  else if (rank === n) kind = 'eindeutig';
  else kind = 'unendlich';
  return { R, pivots, rank, conditions, solvable, kind, free: solvable ? n - rank : null };
}

/** Lösung eines 2×2-Systems für die Figur (null, wenn nicht eindeutig). */
export function solve2(a11, a12, b1, a21, a22, b2) {
  const det = a11 * a22 - a12 * a21;
  if (Math.abs(det) < TOL) return null;
  return [(b1 * a22 - a12 * b2) / det, (a11 * b2 - b1 * a21) / det];
}
