import { SUBJECTS, findLesson } from './curriculum.js';

const nav = document.getElementById('nav');
const main = document.getElementById('main');

const STATUS_LABEL = { geplant: 'geplant', entwurf: 'Entwurf', review: 'zur Durchsicht', fertig: 'fertig' };

function lessonHref(s, l) {
  return `#/${s.id}/${l.id}`;
}

function renderNav(active) {
  nav.innerHTML = `
    <a class="brand" href="#/">ETH Lernlabor</a>
    ${SUBJECTS.map((s) => `
      <details class="nav-subject" ${active?.subject === s.id || !active ? 'open' : ''} style="--subject:${s.color}">
        <summary>${s.title}</summary>
        ${s.chapters.map((ch) => `
          <div class="nav-chapter">${ch.title}</div>
          <ul>${ch.lessons.map((l) => `
            <li><a href="${lessonHref(s, l)}" class="st-${l.status}${active?.lesson === l.id && active?.subject === s.id ? ' current' : ''}">${l.title}</a></li>`).join('')}
          </ul>`).join('')}
      </details>`).join('')}
    <p class="nav-foot">Stand: Entwurf · Quellen in <code>docs/SOURCE_MAP.md</code></p>`;
}

function renderHome() {
  main.innerHTML = `
    <article class="home">
      <h1>ETH Lernlabor</h1>
      <p class="lede">Interaktive Begleitung zu drei Vorlesungen im ersten Semester D-MAVT. Jede Lektion folgt dem Skript, mit Seitenangabe, einem Bild für jede Idee und Formeln, die durch Tests geprüft sind.</p>
      <div class="cards">
        ${SUBJECTS.map((s) => {
          const all = s.chapters.flatMap((c) => c.lessons);
          const done = all.filter((l) => l.status !== 'geplant');
          const first = done[0] ?? all[0];
          return `<a class="card" style="--subject:${s.color}" href="${lessonHref(s, first)}">
            <h2>${s.title}</h2>
            <p>${s.source}</p>
            <div class="meter"><span style="width:${(100 * done.length) / all.length}%"></span></div>
            <small>${done.length} von ${all.length} Lektionen begonnen</small>
          </a>`;
        }).join('')}
      </div>
      <h2>So ist jede Lektion aufgebaut</h2>
      <ul class="legend">
        <li><span class="dot box-vorlesung"></span> <b>Aus der Vorlesung:</b> steht so im Skript, mit Seitenangabe</li>
        <li><span class="dot box-intuition"></span> <b>Intuition:</b> ein Alltagsbild, bevor die Formel kommt</li>
        <li><span class="dot box-achtung"></span> <b>Achtung:</b> ein typischer Denkfehler</li>
        <li><span class="dot box-ergaenzung"></span> <b>Ergänzung:</b> nicht aus dem Skript, ausdrücklich markiert</li>
      </ul>
    </article>`;
}

async function renderLesson(subjectId, lessonId) {
  const found = findLesson(subjectId, lessonId);
  if (!found) {
    main.innerHTML = `<article class="lesson"><h1>Nicht gefunden</h1><p><a href="#/">Zur Übersicht</a></p></article>`;
    return;
  }
  const { subject, chapter, lesson } = found;
  const header = `<div class="crumbs" style="--subject:${subject.color}">${subject.title} · ${chapter.title}</div>
    <h1>${lesson.title}</h1>
    <div class="meta"><span class="badge st-${lesson.status}">${STATUS_LABEL[lesson.status]}</span> Quelle: ${lesson.src}</div>`;
  if (!lesson.module) {
    main.innerHTML = `<article class="lesson">${header}<p class="placeholder">Diese Lektion ist noch nicht geschrieben. Sie entsteht nach demselben Muster wie die Entwurfs-Lektionen.</p></article>`;
    return;
  }
  main.innerHTML = `<article class="lesson">${header}<div id="lesson-body"></div></article>`;
  try {
    const mod = await import(lesson.module);
    mod.default(document.getElementById('lesson-body'));
  } catch (e) {
    console.error(e);
    document.getElementById('lesson-body').innerHTML = `<p class="tex-error">Fehler beim Laden der Lektion: ${e.message}</p>`;
  }
}

function route() {
  const [, subject, lesson] = location.hash.replace(/^#/, '').split('/');
  renderNav(subject ? { subject, lesson } : null);
  if (subject && lesson) renderLesson(subject, lesson);
  else renderHome();
  main.scrollTop = 0;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
