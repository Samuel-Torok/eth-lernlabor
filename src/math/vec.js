/** Vektorrechnung im R³ (Arrays [x, y, z]). Reine Funktionen, getestet in vec.test.js. */

export const add = (a, b) => a.map((v, i) => v + b[i]);
export const sub = (a, b) => a.map((v, i) => v - b[i]);
export const scale = (k, a) => a.map((v) => k * v);
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = (a) => Math.hypot(...a);
export const unit = (a) => scale(1 / norm(a), a);

/** Zylindrische Basis im Punkt mit Winkel φ, ausgedrückt in der kartesischen Basis (Mitschrift S. 10). */
export function cylBasis(phi) {
  return {
    er: [Math.cos(phi), Math.sin(phi), 0],
    ephi: [-Math.sin(phi), Math.cos(phi), 0],
    ez: [0, 0, 1],
  };
}

/** Sphärische Basis (θ ab +z, ψ = Azimut). Reihenfolge e_r, e_θ, e_ψ. */
export function sphBasis(theta, psi) {
  const st = Math.sin(theta), ct = Math.cos(theta), sp = Math.sin(psi), cp = Math.cos(psi);
  return {
    er: [st * cp, st * sp, ct],
    etheta: [ct * cp, ct * sp, -st],
    epsi: [-sp, cp, 0],
  };
}

/** Numerische Ableitung einer Vektorfunktion (zentraler Differenzenquotient) — nur für Tests und Figuren. */
export function deriv(f, t, h = 1e-5) {
  return scale(1 / (2 * h), sub(f(t + h), f(t - h)));
}

/** Grundgleichung des starren Körpers (Mitschrift S. 22): v_M = v_B + ω × BM */
export function rigidVelocity(vB, omega, rB, rM) {
  return add(vB, cross(omega, sub(rM, rB)));
}

/**
 * Punkt der Zentralachse, der B am nächsten liegt: r_Z = r_B + (ω × v_B)/|ω|²  (Ergänzung, nicht aus dem Skript).
 * In der Ebene (v_B ⊥ ω) ist das das Momentanzentrum: dort ist v = 0.
 */
export function centralAxisPoint(rB, vB, omega) {
  return add(rB, scale(1 / dot(omega, omega), cross(omega, vB)));
}
