/**
 * Alle Formeln laufen hier durch KaTeX.
 * Notation der Vorlesungen: Vektoren unterstrichen (\v{r} → r̲), wie in der Mechanik-Mitschrift.
 * Neue Makros nur hier hinzufügen, nie ad hoc in einer Lektion.
 */
export const MACROS = {
  '\\v': '\\underline{#1}',
  '\\e': '\\underline{e}_{#1}',
  '\\dd': '\\mathrm{d}',
  '\\R': '\\mathbb{R}',
  '\\N': '\\mathbb{N}',
  '\\rang': '\\operatorname{rang}',
};

const cache = new Map();

function render(src, display) {
  const key = (display ? 'D' : 'I') + src;
  if (cache.has(key)) return cache.get(key);
  let out;
  const k = globalThis.katex;
  if (!k) {
    // KaTeX nicht geladen (offline): Quelltext sichtbar lassen statt leer.
    out = `<code class="tex-fallback">${escapeHtml(src)}</code>`;
  } else {
    try {
      out = k.renderToString(src, { displayMode: display, throwOnError: true, macros: { ...MACROS }, strict: 'error' });
    } catch (e) {
      out = `<span class="tex-error" title="${escapeHtml(e.message)}">${escapeHtml(src)}</span>`;
    }
  }
  cache.set(key, out);
  return out;
}

/** Inline-Formel. Als Tagged Template nutzbar: M`\frac{1}{n}` (Backslashes bleiben roh). */
export function M(strings, ...vals) {
  return render(raw(strings, vals), false);
}

/** Abgesetzte Formel. */
export function MD(strings, ...vals) {
  return `<div class="math-display">${render(raw(strings, vals), true)}</div>`;
}

function raw(strings, vals) {
  if (typeof strings === 'string') return strings;
  if (!strings.raw) return strings.join(''); // M([`…${wert}…`]) für berechnete Formeln
  return String.raw({ raw: strings.raw }, ...vals);
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/** Schweizer Zahlformat für Anzeigen: Dezimalkomma. In TeX wird daraus {,}. */
export function fmt(x, digits = 3) {
  if (!Number.isFinite(x)) return x > 0 ? '\\infty' : x < 0 ? '-\\infty' : '\\text{n.d.}';
  const s = Number(x.toFixed(digits)).toString();
  return s.replace('.', '{,}');
}
