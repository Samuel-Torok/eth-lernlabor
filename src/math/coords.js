/**
 * Koordinaten (Mechanik I, Mitschrift S. 3–4).
 * Notation der Vorlesung: zylindrisch (ρ, φ, z); sphärisch (r, θ, ψ), θ ab der +z-Achse, ψ = Azimut.
 */

export function cylToCart(rho, phi, z) {
  return [rho * Math.cos(phi), rho * Math.sin(phi), z];
}

/** Umkehrung. Das Skript schreibt φ = arctan(y/x); das stimmt nur für x > 0 (siehe REVIEW_LOG R-001). atan2 gilt überall. */
export function cartToCyl(x, y, z) {
  return [Math.hypot(x, y), Math.atan2(y, x), z];
}

/** Formel genau wie im Skript, nur zum Vergleich in Tests und in der Figur. */
export function phiSkript(x, y) {
  return Math.atan(y / x);
}

export function sphToCart(r, theta, psi) {
  return [r * Math.sin(theta) * Math.cos(psi), r * Math.sin(theta) * Math.sin(psi), r * Math.cos(theta)];
}

export function cartToSph(x, y, z) {
  return [Math.hypot(x, y, z), Math.atan2(Math.hypot(x, y), z), Math.atan2(y, x)];
}

/** Winkel auf [0, 2π) normieren (für Anzeige). */
export function wrap2pi(a) {
  const t = a % (2 * Math.PI);
  return t < 0 ? t + 2 * Math.PI : t;
}
