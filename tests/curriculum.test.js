import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SUBJECTS } from '../src/curriculum.js';

const SRC = fileURLToPath(new URL('../src/', import.meta.url));
const lessons = SUBJECTS.flatMap((s) => s.chapters.flatMap((c) => c.lessons.map((l) => ({ s, l }))));

test('Jede Lektion hat eine eindeutige ID, eine Quelle und einen gültigen Status', () => {
  const ids = new Set();
  for (const { s, l } of lessons) {
    const key = `${s.id}/${l.id}`;
    assert.ok(!ids.has(key), `doppelte ID ${key}`);
    ids.add(key);
    assert.ok(l.src, `${key}: Quelle fehlt`);
    assert.ok(['geplant', 'entwurf', 'review', 'fertig'].includes(l.status), `${key}: Status ${l.status}`);
    if (l.status !== 'geplant') assert.ok(l.module, `${key}: Status ${l.status}, aber kein Modul`);
  }
});

test('Jedes Lektionsmodul existiert', () => {
  for (const { l } of lessons.filter((x) => x.l.module)) {
    assert.ok(existsSync(SRC + l.module.replace('./', '')), `${l.module} fehlt`);
  }
});

test('Jede Box "vorlesung" hat eine Seitenangabe (src)', () => {
  for (const { l } of lessons.filter((x) => x.l.module)) {
    const code = readFileSync(SRC + l.module.replace('./', ''), 'utf8');
    const calls = code.split("box('vorlesung'").slice(1);
    for (const c of calls) {
      // Die Box endet mit `, { src: … })`. Grob prüfen: vor dem nächsten box(-Aufruf kommt "src:".
      const until = c.split(/box\('/)[0];
      assert.ok(/\{\s*src:/.test(until), `${l.module}: Vorlesungsbox ohne src`);
    }
  }
});
