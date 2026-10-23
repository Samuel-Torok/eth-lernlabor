/**
 * Fachwerk-Beispiel (Mitschrift S. 30, Lösung aus der Vorlesung): Kinematik aller Stäbe.
 * Reine Funktionen, getestet in fachwerk.test.js.
 *
 * Geometrie (aus der Skizze abgelesen, Ursprung in A, x nach rechts, y nach oben):
 *   A = (0, 0), C = (L, 0), D = (L, −L), E = (2L, −L), F = (2L, −2L), B = (3L, −2L)
 *   Stäbe 1–5 (AC, AD, CD, CE, DE) bilden einen starren Körper, Stab 6 = DF, Stab 7 = FB, Stab 8 = EB.
 *   A: festes Gelenk (v_A = 0). Gegeben: v_B = (−v, 0, 0).
 *
 * Gerechnet wird NICHT mit den Ergebnissen der Vorlesung, sondern nur mit der Grundgleichung
 * v_M = v_P + ω × PM für jeden Stab und der Bedingung «Gelenkpunkt = gleiche Geschwindigkeit in beiden Stäben».
 * Die Tests vergleichen dann mit den Werten der Vorlesung.
 */
import { add, sub, cross, scale, centralAxisPoint } from './vec.js';

const ez = [0, 0, 1];

/** 2×2-System a·x + b·y = r (Vektoren a, b, r in der Ebene) mit der Cramerschen Regel lösen. */
function solve2(a, b, r) {
  const det = a[0] * b[1] - a[1] * b[0];
  if (Math.abs(det) < 1e-12) throw new Error('System singulär');
  return [(r[0] * b[1] - r[1] * b[0]) / det, (a[0] * r[1] - a[1] * r[0]) / det];
}

export function fachwerkBeispiel(L = 1, v = 1) {
  const P = {
    A: [0, 0, 0], C: [L, 0, 0], D: [L, -L, 0], E: [2 * L, -L, 0], F: [2 * L, -2 * L, 0], B: [3 * L, -2 * L, 0],
  };
  const vB = [-v, 0, 0];

  // Gelenk E gehört zum Körper 1–5 (dreht um A) und zu Stab 8 (enthält B):
  //   w15·(e_z × AE) = v_B + w8·(e_z × BE)   →   w15·a − w8·b = v_B
  const a = cross(ez, sub(P.E, P.A));
  const b = cross(ez, sub(P.E, P.B));
  const [w15, w8] = solve2(a, scale(-1, b), vB);
  const vE = scale(w15, a);

  // Gelenk D gehört zum Körper 1–5, also v_D = w15·(e_z × AD); ebenso v_C.
  const vD = scale(w15, cross(ez, sub(P.D, P.A)));
  const vC = scale(w15, cross(ez, sub(P.C, P.A)));

  // Gelenk F gehört zu Stab 6 (enthält D) und Stab 7 (enthält B):
  //   v_D + w6·(e_z × DF) = v_B + w7·(e_z × BF)
  const c = cross(ez, sub(P.F, P.D));
  const d = cross(ez, sub(P.F, P.B));
  const [w6, w7] = solve2(c, scale(-1, d), sub(vB, vD));
  const vF = add(vD, scale(w6, c));

  const w = { '1-5': w15, 6: w6, 7: w7, 8: w8 };
  const Z = {
    '1-5': centralAxisPoint(P.A, [0, 0, 0], [0, 0, w15]),
    6: centralAxisPoint(P.D, vD, [0, 0, w6]),
    7: centralAxisPoint(P.B, vB, [0, 0, w7]),
    8: centralAxisPoint(P.B, vB, [0, 0, w8]),
  };
  return { P, v: { A: [0, 0, 0], B: vB, C: vC, D: vD, E: vE, F: vF }, w, Z };
}
