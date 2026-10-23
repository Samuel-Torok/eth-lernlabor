import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fachwerkBeispiel } from './fachwerk.js';
import { dot, norm, rigidVelocity, sub } from './vec.js';

const near = (a, b, tol = 1e-9, msg = '') => {
  if (typeof a === 'number') return assert.ok(Math.abs(a - b) < tol, `${msg}: ${a} vs ${b}`);
  a.forEach((x, i) => assert.ok(Math.abs(x - b[i]) < tol, `${msg}: ${a} vs ${b}`));
};

for (const [L, v] of [[1, 1], [2.5, 0.8]]) {
  const r = fachwerkBeispiel(L, v);
  const { P } = r;

  test(`Fachwerk S. 30: ω und Z wie in der Vorlesung (L = ${L}, v = ${v})`, () => {
    near(r.w[8], -2 * v / L, 1e-9, 'ω8');
    near(r.w['1-5'], v / L, 1e-9, 'ω1-5');
    near(r.w[6], -2 * v / L, 1e-9, 'ω6');
    near(r.w[7], v / L, 1e-9, 'ω7');
    near(r.Z['1-5'], P.A, 1e-9, 'Z1-5 = A');
    near(r.Z[8], [3 * L, -1.5 * L, 0], 1e-9, 'Z8');
    near(r.Z[6], [1.5 * L, -1.5 * L, 0], 1e-9, 'Z6 = Mitte DF');
    near(r.Z[7], [3 * L, -3 * L, 0], 1e-9, 'Z7');
  });

  test(`Fachwerk S. 30: Geschwindigkeiten der Knoten (L = ${L}, v = ${v})`, () => {
    near(r.v.E, [v, 2 * v, 0], 1e-9, 'v_E');
    near(norm(r.v.E), Math.sqrt(5) * v, 1e-9, '|v_E| = √5 v');
    near(r.v.D, [v, v, 0], 1e-9, 'v_D');
    near(r.v.F, [-v, -v, 0], 1e-9, 'v_F');
    // Abstände aus der Vorlesung
    near(norm(sub(r.Z[8], P.B)), L / 2, 1e-9, '|Z8B|');
    near(norm(sub(P.E, P.A)), Math.sqrt(5) * L, 1e-9, '|AE|');
    near(norm(sub(P.E, r.Z[8])), (Math.sqrt(5) / 2) * L, 1e-9, '|Z8E|');
    near(norm(sub(P.F, r.Z[6])), (Math.SQRT2 / 2) * L, 1e-9, '|Z6F|');
    near(norm(sub(P.B, r.Z[7])), L, 1e-9, '|Z7B|');
  });

  test(`Fachwerk S. 30: jeder Stab ist starr (SdpG an allen Stäben, L = ${L})`, () => {
    const bars = [['A', 'C'], ['A', 'D'], ['C', 'D'], ['C', 'E'], ['D', 'E'], ['D', 'F'], ['F', 'B'], ['E', 'B']];
    for (const [p, q] of bars) {
      const e = sub(P[q], P[p]);
      near(dot(r.v[p], e), dot(r.v[q], e), 1e-9, `SdpG ${p}${q}`);
    }
  });

  test(`Fachwerk S. 30: Kontrolle über das Momentanzentrum (v = ω × ZM, L = ${L})`, () => {
    const body = { 8: ['E', 'B'], 6: ['D', 'F'], 7: ['F', 'B'], '1-5': ['C', 'D', 'E'] };
    for (const [k, pts] of Object.entries(body)) {
      for (const n of pts) near(rigidVelocity([0, 0, 0], [0, 0, r.w[k]], r.Z[k], P[n]), r.v[n], 1e-9, `Stab ${k}, Punkt ${n}`);
    }
  });

  test(`Fachwerk S. 30, Methode c): Hilfspunkte H1, H2 auf Stab 8 (L = ${L})`, () => {
    const H2 = [P.E[0] + L, P.E[1], 0]; // waagrecht neben E, senkrecht über Z8
    const H1 = [P.E[0], r.Z[8][1], 0]; // senkrecht unter E, auf Höhe von Z8
    const vH2 = rigidVelocity([0, 0, 0], [0, 0, r.w[8]], r.Z[8], H2);
    const vH1 = rigidVelocity([0, 0, 0], [0, 0, r.w[8]], r.Z[8], H1);
    near(vH2, [v, 0, 0], 1e-9, 'v_H2 = v e_x');
    near(vH1, [0, 2 * v, 0], 1e-9, 'v_H1 = 2v e_y');
    near(r.v.E[0], vH2[0], 1e-9, 'SdpG E–H2'); // EH2 waagrecht
    near(r.v.E[1], vH1[1], 1e-9, 'SdpG E–H1'); // EH1 senkrecht
  });
}
