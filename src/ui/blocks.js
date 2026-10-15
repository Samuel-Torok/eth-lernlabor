/**
 * Bausteine jeder Lektion. Eine Lektion ist eine Folge von section(...) mit box(...), figure(...) usw.
 *
 * Box-Arten (eine Farbe pro Art, überall gleich):
 *   vorlesung  – steht so im Skript; IMMER mit Seitenangabe (src)
 *   intuition  – Alltagsbild vor der Formel
 *   achtung    – typischer Denkfehler
 *   ergaenzung – nicht aus dem Skript; ausdrücklich so markiert
 *   merke      – Zusammenfassung in einem Satz
 */
const LABELS = {
  vorlesung: 'Aus der Vorlesung',
  intuition: 'Intuition',
  achtung: 'Achtung, typischer Fehler',
  ergaenzung: 'Ergänzung (nicht aus dem Skript)',
  merke: 'Merke',
};

export function box(kind, body, { title, src } = {}) {
  if (!LABELS[kind]) throw new Error(`Unbekannte Box-Art: ${kind}`);
  if (kind === 'vorlesung' && !src) throw new Error('Box "vorlesung" braucht eine Seitenangabe (src).');
  const head = `${LABELS[kind]}${title ? ` · ${title}` : ''}`;
  const srcTag = src ? `<span class="src">${src}</span>` : '';
  return `<aside class="box box-${kind}"><header>${head}${srcTag}</header><div class="box-body">${body}</div></aside>`;
}

export function section(id, title, body) {
  return `<section id="${id}" class="lsec"><h2>${title}</h2>${body}</section>`;
}

export function figure(id, caption, { wide = false } = {}) {
  return `<figure class="fig${wide ? ' fig-wide' : ''}"><div id="${id}" class="fig-body"></div><figcaption>${caption}</figcaption></figure>`;
}

/** Schritt-für-Schritt-Herleitung: jeder Schritt = Formel + Begründung ("warum darf man das?"). */
export function steps(items) {
  return `<ol class="steps">${items.map(([math, why]) => `<li><div class="step-math">${math}</div><div class="step-why">${why}</div></li>`).join('')}</ol>`;
}

/** Aufklappbare Vertiefung für lange Details. */
export function more(summary, body) {
  return `<details class="more"><summary>${summary}</summary>${body}</details>`;
}
