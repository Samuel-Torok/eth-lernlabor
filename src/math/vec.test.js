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
