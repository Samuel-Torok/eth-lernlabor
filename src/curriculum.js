/**
 * Inhaltsverzeichnis aller drei Fächer.
 * status: 'geplant' | 'entwurf' | 'review' | 'fertig'  (fertig erst nach deiner Freigabe)
 * src:    Seiten in der Quelle (siehe docs/SOURCE_MAP.md)
 * module: Pfad zur Lektion (nur wenn sie existiert)
 */
export const SUBJECTS = [
  {
    id: 'analysis',
    title: 'Analysis I',
    color: 'var(--c-analysis)',
    source: 'Skript HS26, Kapitel I (Vorlesungsnotizen, Seiten I.1 ff.)',
    chapters: [
      {
        title: 'I Funktionen',
        lessons: [
          { id: 'folgen', title: 'Folgen und Konvergenz', src: 'I.1–I.7', status: 'entwurf', module: './lessons/analysis/folgen.js' },
          { id: 'funktionen', title: 'Funktionen', src: 'I.8–I.12', status: 'geplant' },
          { id: 'stetigkeit', title: 'Grenzwerte von Funktionen, Stetigkeit', src: 'I.13–I.17', status: 'geplant' },
          { id: 'zws', title: 'Zwischenwertsatz', src: 'I.18–I.19', status: 'geplant' },
          { id: 'transformationen', title: 'Koordinatentransformationen', src: 'I.20–I.21', status: 'geplant' },
          { id: 'umkehr', title: 'Die inverse Funktion', src: 'I.21–I.24', status: 'geplant' },
        ],
      },
    ],
  },
  {
    id: 'linalg',
    title: 'Lineare Algebra I',
    color: 'var(--c-linalg)',
    source: 'Übersicht Mitschrift F. Rickenbach (2022) + Übungsstunden-Notizen U03, U04',
    chapters: [
      {
        title: '1 Lineare Gleichungssysteme',
        lessons: [
          { id: 'gauss', title: 'Gauss-Algorithmus', src: 'Mitschrift S. 1–3', status: 'geplant' },
          { id: 'loesbarkeit', title: 'Lösbarkeit und Rang', src: 'U03 S. 1–5', status: 'entwurf', module: './lessons/linalg/loesbarkeit.js' },
        ],
      },
      {
        title: '2 Matrizen',
        lessons: [
          { id: 'matrizen', title: 'Rechnen mit Matrizen', src: 'U04', status: 'geplant' },
          { id: 'inverse', title: 'Inverse Matrix, Gauss-Jordan', src: 'Mitschrift S. 10–12', status: 'geplant' },
          { id: 'lr', title: 'LR-Zerlegung', src: 'Mitschrift S. 13', status: 'geplant' },
        ],
      },
      {
        title: '3 Determinanten',
        lessons: [{ id: 'det', title: 'Determinanten', src: 'Mitschrift S. 15–23', status: 'geplant' }],
      },
      {
        title: '4 Vektorräume',
        lessons: [{ id: 'vr', title: 'Vektorräume und Unterräume', src: 'Mitschrift S. 25–32', status: 'geplant' }],
      },
    ],
  },
  {
    id: 'mechanik',
    title: 'Mechanik I',
    color: 'var(--c-mechanik)',
    source: 'Mitschrift Mechanik I (Prof. E. Mazza), Kendall & Gao, Version 2.0',
    chapters: [
      {
        title: '1 Bewegung eines materiellen Punktes',
        lessons: [
          { id: 'koordinaten', title: 'Koordinaten: kartesisch, zylindrisch, sphärisch', src: 'S. 3–4', status: 'entwurf', module: './lessons/mechanik/koordinaten.js' },
          { id: 'basen', title: 'Vektorielle Darstellung, Basen', src: 'S. 5–7', status: 'geplant' },
        ],
      },
      {
        title: '2 Geschwindigkeit',
        lessons: [{ id: 'geschwindigkeit', title: 'Geschwindigkeitsvektor', src: 'S. 8–11', status: 'geplant' }],
      },
      {
        title: '3 Starrer Körper',
        lessons: [
          { id: 'starr', title: 'Starrer Körper, SdpG', src: 'S. 12–25', status: 'geplant' },
          { id: 'eben', title: 'Ebene Bewegung', src: 'S. 26–28', status: 'geplant' },
        ],
      },
      {
        title: '4–6 Kräfte, Leistung, Statik',
        lessons: [
          { id: 'kraefte', title: 'Kräfte', src: 'S. 32–35', status: 'geplant' },
          { id: 'leistung', title: 'Leistung', src: 'S. 36–39', status: 'geplant' },
          { id: 'statik', title: 'Statik: Momente, Dyname', src: 'S. 40–49', status: 'geplant' },
        ],
      },
    ],
  },
];

export function findLesson(subjectId, lessonId) {
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  if (!subject) return null;
  for (const ch of subject.chapters) {
    const lesson = ch.lessons.find((l) => l.id === lessonId);
    if (lesson) return { subject, chapter: ch, lesson };
  }
  return null;
}
