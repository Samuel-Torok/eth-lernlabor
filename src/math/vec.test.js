import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add, cross, cylBasis, deriv, dot, norm, rigidVelocity, scale, sphBasis, sub } from './vec.js';
import { cylToCart, sphToCart } from './coords.js';

const near = (a, b, tol = 1e-6, msg = '') => a.forEach((v, i) => assert.ok(Math.abs(v - b[i]) < tol, `${msg}: ${a} vs ${b}`));

test('Zylindrische Basis ist orthonormiert und ė_ρ = φ̇ e_φ (Mitschrift S. 10)', () => {
  for (const phi of [0, 0.7, 2.5, -1.2]) {
    const { er, ephi, ez } = cylBasis(phi);
    assert.ok(Math.abs(dot(er, ephi)) < 1e-12 && Math.abs(dot(er, ez)) < 1e-12);
    assert.ok(Math.abs(norm(er) - 1) < 1e-12 && Math.abs(norm(ephi) - 1) < 1e-12);
    near(cross(ez, er), ephi, 1e-12, 'e_z × e_ρ = e_φ');
  }
  const phiOf = (t) => 0.3 * t * t; // φ(t), φ̇ = 0.6 t
  const t = 1.7;
  near(deriv((s) => cylBasis(phiOf(s)).er, t), scale(0.6 * t, cylBasis(phiOf(t)).ephi), 1e-6, 'ė_ρ');
});

test('Geschwindigkeit in Zylinderbasis: v = ρ̇ e_ρ + ρ φ̇ e_φ + ż e_z (Mitschrift S. 10)', () => {
  const rho = (t) => 1 + 0.5 * t, phi = (t) => Math.sin(t), z = (t) => t * t;
  const r = (t) => cylToCart(rho(t), phi(t), z(t));
  for (const t of [0.2, 1.1, 2.3]) {
    const { er, ephi, ez } = cylBasis(phi(t));
    const v = add(add(scale(0.5, er), scale(rho(t) * Math.cos(t), ephi)), scale(2 * t, ez));
    near(deriv(r, t), v, 1e-6, `t=${t}`);
  }
});

test('Geschwindigkeit in Kugelbasis: v = ṙ e_r + r θ̇ e_θ + r sinθ ψ̇ e_ψ (Mitschrift S. 10)', () => {
  const R = (t) => 2 + t, th = (t) => 0.5 + 0.2 * t, ps = (t) => 3 * t;
  const pos = (t) => sphToCart(R(t), th(t), ps(t));
  for (const t of [0.1, 0.8]) {
    const { er, etheta, epsi } = sphBasis(th(t), ps(t));
    const v = add(add(scale(1, er), scale(R(t) * 0.2, etheta)), scale(R(t) * Math.sin(th(t)) * 3, epsi));
    near(deriv(pos, t), v, 1e-6, `t=${t}`);
  }
});

test('Kreisbewegung: v = ω × r = R φ̇ e_φ, auch wenn O nicht der Kreismittelpunkt ist (Mitschrift S. 11)', () => {
  const R = 1.5, z0 = 2, phiDot = 0.8;
  for (const phi of [0, 1, 2.2]) {
    const r = add(scale(R, cylBasis(phi).er), [0, 0, z0]);
    near(cross([0, 0, phiDot], r), scale(R * phiDot, cylBasis(phi).ephi), 1e-12, `φ=${phi}`);
  }
});

test('SdpG: Für jede Starrkörperbewegung sind die projizierten Geschwindigkeiten gleich (Mitschrift S. 12)', () => {
  const vB = [1, -2, 0.5], w = [0.3, 0.7, -1.1], B = [0, 0, 0];
  const pts = [[1, 2, 3], [-1, 0.5, 2], [4, -1, 0]];
  for (const M of pts) for (const N of pts) {
    if (M === N) continue;
    const a = sub(N, M);
    assert.ok(Math.abs(dot(rigidVelocity(vB, w, B, N), a) - dot(rigidVelocity(vB, w, B, M), a)) < 1e-12);
  }
});

test('Gleitende Leiter: v_A = −v cot θ (aus dem SdpG)', () => {
  const L = 2, v = 1.3;
  for (const th of [0.4, 0.9, 1.3]) {
    const A = [0, L * Math.sin(th), 0], B = [L * Math.cos(th), 0, 0];
    const a = -v / Math.tan(th);
    assert.ok(Math.abs(dot([v, 0, 0], sub(A, B)) - dot([0, a, 0], sub(A, B))) < 1e-12);
    // Gegenprobe mit der echten Bewegung: θ(t) mit B(t) = L cos θ, dx_B/dt = v
    const thDot = -v / (L * Math.sin(th));
    assert.ok(Math.abs(L * Math.cos(th) * thDot - a) < 1e-12);
  }
});

test('Kinemate: ω und v·e_ω sind für alle Punkte gleich (Invarianten, Mitschrift S. 24)', () => {
  const vB = [1, 0, 2], w = [0, 0.5, 1.5], B = [1, 1, 1];
  const ref = dot(vB, w);
  for (const P of [[0, 0, 0], [3, -2, 1], [-1, 4, 2]]) assert.ok(Math.abs(dot(rigidVelocity(vB, w, B, P), w) - ref) < 1e-12);
});

test('Rollen: Kontaktpunkt in Ruhe, oberster Punkt 2 v_C', () => {
  const R = 0.5, vC = 2, w = [0, 0, -vC / R]; // rollt nach +x, dreht im Uhrzeigersinn
  const C = [0, R, 0];
  near(rigidVelocity([vC, 0, 0], w, C, [0, 0, 0]), [0, 0, 0], 1e-12, 'Kontaktpunkt');
  near(rigidVelocity([vC, 0, 0], w, C, [0, 2 * R, 0]), [2 * vC, 0, 0], 1e-12, 'oben');
});

test('Zentralachse: dort ist v ∥ ω, in der Ebene sogar v = 0 (Momentanzentrum)', async () => {
  const { centralAxisPoint } = await import('./vec.js');
  const B = [1, 2, 0], w = [0.4, -0.2, 1.1], vB = [1, 0.5, 0.3];
  const Z = centralAxisPoint(B, vB, w);
  const vZ = rigidVelocity(vB, w, B, Z);
  assert.ok(norm(cross(vZ, w)) < 1e-12, 'v_Z ∥ ω');
  assert.ok(Math.abs(dot(vZ, w) - dot(vB, w)) < 1e-12, '2. Invariante');
  // eben: ω ⊥ Ebene, v_B in der Ebene
  const Z2 = centralAxisPoint([0, 0, 0], [2, 1, 0], [0, 0, 0.5]);
  near(rigidVelocity([2, 1, 0], [0, 0, 0.5], [0, 0, 0], Z2), [0, 0, 0], 1e-12, 'Momentanzentrum');
});

test('Ebene Bewegung (S. 26): v_Az = ω_x PA_y − ω_y PA_x = 0 für alle PA ⇒ ω ∥ e_z', () => {
  // Gegenprobe: ein ω mit x-Anteil erzeugt eine z-Geschwindigkeit
  const v = rigidVelocity([1, 0, 0], [0.3, 0, 1], [0, 0, 0], [0, 2, 0]);
  assert.ok(Math.abs(v[2]) > 0.1);
  const v2 = rigidVelocity([1, 0, 0], [0, 0, 1], [0, 0, 0], [3, 2, 0]);
  assert.equal(v2[2], 0);
});

test('Leiter mit Momentanzentrum (S. 27): Z = Schnitt der Normalen, ω = v_A/(L sin φ), v_B = v_A/tan φ', () => {
  const L = 2, vA = 0.8;
  for (const phi of [0.5, 1.0, 1.3]) {
    const A = [0, 0, 0], B = [L * Math.cos(phi), L * Math.sin(phi), 0]; // A unten, B oben an der Wand
    const Z = [A[0], B[1], 0]; // Normale zu v_A (senkrecht durch A) ∩ Normale zu v_B (waagrecht durch B)
    const w = [0, 0, vA / (L * Math.sin(phi))];
    const vAcalc = rigidVelocity([0, 0, 0], w, Z, A);
    const vBcalc = rigidVelocity([0, 0, 0], w, Z, B);
    assert.ok(Math.abs(Math.abs(vAcalc[0]) - vA) < 1e-12 && Math.abs(vAcalc[1]) < 1e-12, 'v_A waagrecht');
    assert.ok(Math.abs(vBcalc[0]) < 1e-12 && Math.abs(Math.abs(vBcalc[1]) - vA / Math.tan(phi)) < 1e-12, 'v_B senkrecht');
    assert.ok(Math.abs(dot(vAcalc, sub(B, A)) - dot(vBcalc, sub(B, A))) < 1e-12, 'SdpG');
  }
});

test('Planetengetriebe (Fig. 3.21): Arm ω = (R1 ω1 + R2 ω2)/(R1 + R2)', async () => {
  const { planetary } = await import('./vec.js');
  const R1 = 1, R2 = 3, w1 = 2, w2 = -0.5;
  const g = planetary(R1, R2, w1, w2);
  assert.ok(Math.abs(g.R3 - 1) < 1e-12 && Math.abs(g.L - 2) < 1e-12, 'R3 = (R2−R1)/2, L = (R1+R2)/2');
  // Planetenrad als starrer Körper: Geschwindigkeiten von P und Q passen zu einem ω3
  const vP = [-R1 * w1, 0, 0], vQ = [-R2 * w2, 0, 0]; // Punkte auf der +y-Achse, Rotation um O (z)
  const vO = rigidVelocity(vP, [0, 0, g.w3], [0, R1, 0], [0, g.L, 0]);
  const vQcalc = rigidVelocity(vP, [0, 0, g.w3], [0, R1, 0], [0, R2, 0]);
  assert.ok(Math.abs(vQcalc[0] - vQ[0]) < 1e-12, 'Rollen bei Q');
  assert.ok(Math.abs(vO[0] - (-g.L * g.w)) < 1e-12, 'Arm');
});

test('Parallelogrammregel (S. 31): gegenüberliegende Stäbe drehen gleich schnell', () => {
  // Gelenkviereck A(0,0) B(a,0) fest; Stab AD und BC drehen mit ω; Koppel DC verschiebt sich parallel
  const a = 2, b = 1;
  for (const t of [0.4, 1.1]) {
    const D = (s) => [b * Math.cos(s), b * Math.sin(s), 0], C = (s) => [a + b * Math.cos(s), b * Math.sin(s), 0];
    const dDC = sub(deriv(C, t), deriv(D, t));
    assert.ok(norm(dDC) < 1e-8, 'DC verschiebt sich nur: ω_DC = 0 = ω_AB');
  }
});
