/**
 * Browser-Check: öffnet die Startseite und jede geschriebene Lektion in Chromium,
 * schlägt fehl bei Konsolenfehlern oder KaTeX-Fehlern, und speichert Screenshots
 * (hell + dunkel, Laptop + Handy) nach screens/ — die muss man sich ANSEHEN, Tests allein reichen nicht.
 *
 *   npx playwright@1.49.1 install chromium   # einmalig
 *   node scripts/check-pages.mjs
 */
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SUBJECTS } from '../src/curriculum.js';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright fehlt: npm i --no-save playwright@1.49.1 && npx playwright install chromium');
  process.exit(1);
}

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const file = join(ROOT, path === '/' ? 'index.html' : path);
  try {
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const base = `http://localhost:${server.address().port}/`;

const pages = [{ name: 'start', hash: '' }];
for (const s of SUBJECTS) for (const c of s.chapters) for (const l of c.lessons) if (l.module) pages.push({ name: `${s.id}-${l.id}`, hash: `#/${s.id}/${l.id}` });

const shots = process.argv.includes('--no-screens') ? [] : [
  { tag: 'laptop-hell', viewport: { width: 1280, height: 900 }, scheme: 'light' },
  { tag: 'handy-dunkel', viewport: { width: 390, height: 844 }, scheme: 'dark' },
];

await mkdir(join(ROOT, 'screens'), { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let failed = 0;
for (const pg of pages) {
  for (const shot of shots.length ? shots : [{ tag: 'check', viewport: { width: 1280, height: 900 }, scheme: 'light' }]) {
    const ctx = await browser.newContext({ viewport: shot.viewport, colorScheme: shot.scheme });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(base + pg.hash, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const texErrors = await page.$$eval('.tex-error, .tex-fallback', (els) => els.map((e) => e.textContent.slice(0, 120)));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const problems = [...errors, ...texErrors.map((t) => `TeX: ${t}`), ...(overflow ? ['Seite scrollt horizontal'] : [])];
    if (problems.length) { failed++; console.error(`✗ ${pg.name} (${shot.tag})\n  ${problems.join('\n  ')}`); }
    else console.log(`✓ ${pg.name} (${shot.tag})`);
    if (shots.length) await page.screenshot({ path: join(ROOT, 'screens', `${pg.name}--${shot.tag}.png`), fullPage: true });
    await ctx.close();
  }
}
await browser.close();
server.close();
process.exit(failed ? 1 : 0);
