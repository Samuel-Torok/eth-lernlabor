/** Exakte Brüche für Gauss-Schritte, damit die Zahlen wie von Hand aussehen (−3/2 statt −1,5). */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };

export class Q {
  constructor(n, d = 1) {
    if (d === 0) throw new Error('Division durch 0');
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    this.n = n / g; this.d = d / g;
  }
  static of(x) { return x instanceof Q ? x : new Q(x, 1); }
  add(o) { o = Q.of(o); return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Q.of(o); return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Q.of(o); return new Q(this.n * o.n, this.d * o.d); }
  div(o) { o = Q.of(o); return new Q(this.n * o.d, this.d * o.n); }
  neg() { return new Q(-this.n, this.d); }
  isZero() { return this.n === 0; }
  valueOf() { return this.n / this.d; }
  tex() { return this.d === 1 ? String(this.n) : `${this.n < 0 ? '-' : ''}\\tfrac{${Math.abs(this.n)}}{${this.d}}`; }
}

/**
 * Gauss-Algorithmus (allgemeine Form, Mitschrift Rickenbach S. 4–5), Schritt für Schritt.
 * Gibt eine Liste von Zuständen { M, note, pivot } zurück; M ist die erweiterte Matrix (A | b) aus Q.
 */
export function gaussSteps(rows) {
  let M = rows.map((r) => r.map(Q.of));
  const m = M.length, n = M[0].length - 1;
  const states = [{ M: clone(M), note: 'Start: erweiterte Matrix', pivot: null }];
  let r = 0;
  for (let c = 0; c < n && r < m; c++) {
    let p = r;
    while (p < m && M[p][c].isZero()) p++;
    if (p === m) continue; // Spalte ohne Pivot → freie Variable
    if (p !== r) {
      [M[p], M[r]] = [M[r], M[p]];
      states.push({ M: clone(M), note: `Zeilen ${r + 1} und ${p + 1} vertauschen (Umformung I), damit oben in Spalte ${c + 1} keine Null steht`, pivot: [r, c], swap: [r, p] });
    }
    for (let i = r + 1; i < m; i++) {
      if (M[i][c].isZero()) continue;
      const f = M[i][c].div(M[r][c]).neg();
      M[i] = M[i].map((v, j) => v.add(f.mul(M[r][j])));
      states.push({ M: clone(M), note: `Zeile ${i + 1} plus (${f.tex()})·Zeile ${r + 1} (Umformung II): Null unter dem Pivot`, pivot: [r, c], target: i, factor: f });
    }
    r++;
  }
  states.push({ M: clone(M), note: 'Zeilenstufenform erreicht', pivot: null, done: true });
  return states;
}

const clone = (M) => M.map((r) => r.slice());

/** Pivotspalten einer Zeilenstufenform (ohne rechte Seite). */
export function pivotColumns(M) {
  const n = M[0].length - 1;
  const cols = [];
  for (const row of M) {
    const c = row.slice(0, n).findIndex((v) => !v.isZero());
    if (c >= 0) cols.push(c);
  }
  return cols;
}
