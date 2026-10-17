/** Komplexe Zahlen als [Re, Im]. Analysis I, Kap. A. */
export const cadd = (z, w) => [z[0] + w[0], z[1] + w[1]];
export const cmul = (z, w) => [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]];
export const conj = (z) => [z[0], -z[1]];
export const abs2 = (z) => z[0] * z[0] + z[1] * z[1];
export const cabs = (z) => Math.hypot(z[0], z[1]);
/** 1/z = z̄/|z|²  (Skript A.2) */
export const cinv = (z) => [z[0] / abs2(z), -z[1] / abs2(z)];
export const cdiv = (z, w) => cmul(z, cinv(w));
export const cpow = (z, n) => { let r = [1, 0]; for (let k = 0; k < n; k++) r = cmul(r, z); return r; };
