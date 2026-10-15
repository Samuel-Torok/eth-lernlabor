import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cartToCyl, cartToSph, cylToCart, phiSkript, sphToCart } from './coords.js';

const close = (a, b, msg) => a.forEach((v, i) => assert.ok(Math.abs(v - b[i]) < 1e-12, `${msg}: ${a} vs ${b}`));

test('zylindrisch ↔ kartesisch (Mitschrift S. 4), Hin und Zurück', () => {
  for (const [rho, phi, z] of [[1, 0, 0], [2, 1, -1], [3, 2.5, 4], [0.5, -2, 1]]) {
    close(cartToCyl(...cylToCart(rho, phi, z)), [rho, phi, z], 'cyl');
  }
});

test('sphärisch ↔ kartesisch (Mitschrift S. 4), θ ab +z, ψ = Azimut', () => {
  close(sphToCart(1, 0, 0), [0, 0, 1], 'θ = 0 ist der Nordpol');
  close(sphToCart(2, Math.PI / 2, Math.PI / 2), [0, 2, 0], 'θ = π/2, ψ = π/2 → +y');
  for (const [r, th, ps] of [[1, 0.3, 0.2], [2, 2.0, -1.0], [3, 1.2, 3.0]]) {
    close(cartToSph(...sphToCart(r, th, ps)), [r, th, ps], 'sph');
  }
});

test('R-001: φ = arctan(y/x) aus dem Skript stimmt nur für x > 0', () => {
  assert.ok(Math.abs(phiSkript(1, 1) - Math.PI / 4) < 1e-12);
  const [, phi] = cartToCyl(-1, 1, 0); // 2. Quadrant: φ = 3π/4
  assert.ok(Math.abs(phi - (3 * Math.PI) / 4) < 1e-12);
  assert.ok(Math.abs(phiSkript(-1, 1) - phi) > 1, 'Skriptformel liefert −π/4 statt 3π/4');
});

test('Länge bleibt gleich: ρ² + z² = r²', () => {
  const [x, y, z] = sphToCart(2.5, 1.1, 0.7);
  const [rho] = cartToCyl(x, y, z);
  assert.ok(Math.abs(rho ** 2 + z ** 2 - 2.5 ** 2) < 1e-12);
});
