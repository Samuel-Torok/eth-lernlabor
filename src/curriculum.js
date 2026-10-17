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
    source: 'Vorlesungsnotizen HS26: Kapitel I, II und A (Seiten I.1 ff., II.1 ff., A.1 ff.)',
    chapters: [
      {
        title: 'I Funktionen',
        lessons: [
          { id: 'folgen', title: 'Folgen und Konvergenz', src: 'I.1–I.6', status: 'entwurf', module: './lessons/analysis/folgen.js' },
          { id: 'reihen', title: 'Rechenregeln, geometrische Reihe', src: 'I.6–I.7', status: 'entwurf', module: './lessons/analysis/reihen.js' },
          { id: 'funktionen', title: 'Funktionen und ihre Eigenschaften', src: 'I.7–I.13', status: 'entwurf', module: './lessons/analysis/funktionen.js' },
          { id: 'stetigkeit', title: 'Grenzwerte von Funktionen, Stetigkeit', src: 'I.13–I.17', status: 'entwurf', module: './lessons/analysis/stetigkeit.js' },
          { id: 'zws', title: 'Zwischenwertsatz', src: 'I.18–I.19', status: 'entwurf', module: './lessons/analysis/zws.js' },
          { id: 'transformationen', title: 'Koordinatentransformationen', src: 'I.20–I.21', status: 'entwurf', module: './lessons/analysis/transformationen.js' },
          { id: 'umkehr', title: 'Die inverse Funktion', src: 'I.21–I.24', status: 'entwurf', module: './lessons/analysis/umkehr.js' },
        ],
      },
      {
        title: 'II Differentialrechnung',
        lessons: [
          { id: 'ableitung', title: 'Differentialquotient und Ableitungsregeln', src: 'II.1–II.5', status: 'entwurf', module: './lessons/analysis/ableitung.js' },
          { id: 'linearisierung', title: 'Linearisieren, Fehlerrechnung', src: 'II.6–II.11', status: 'entwurf', module: './lessons/analysis/linearisierung.js' },
          { id: 'mittelwertsatz', title: "Mittelwertsatz, Rolle, Bernoulli-L'Hôpital", src: 'II.11–II.16', status: 'entwurf', module: './lessons/analysis/mittelwertsatz.js' },
          { id: 'extremal', title: 'Extremalaufgaben', src: 'II.17–II.18', status: 'entwurf', module: './lessons/analysis/extremal.js' },
        ],
      },
      {
        title: 'A Komplexe Zahlen',
        lessons: [
          { id: 'komplex', title: 'Multiplikation, Division, Geometrie', src: 'A.1–A.3', status: 'entwurf', module: './lessons/analysis/komplex.js' },
        ],
      },
    ],
  },
  {
    id: 'linalg',
    title: 'Lineare Algebra I',
    color: 'var(--c-linalg)',
    source: 'Übersicht Mitschrift F. Rickenbach (2022, Prof. Hungerbühler) + Übungsstunden U03, U04',
    chapters: [
      {
        title: '1 Lineare Gleichungssysteme',
        lessons: [
          { id: 'gauss', title: 'Gauss-Algorithmus und Zeilenstufenform', src: 'Mitschrift S. 1–7', status: 'entwurf', module: './lessons/linalg/gauss.js' },
          { id: 'loesbarkeit', title: 'Lösbarkeit und Rang', src: 'U03 S. 1–5, Mitschrift S. 6–9', status: 'entwurf', module: './lessons/linalg/loesbarkeit.js' },
        ],
      },
      {
        title: '2 Matrizen',
        lessons: [
          { id: 'matrizen', title: 'Matrizen: Begriffe, Produkt, Rechenregeln', src: 'Mitschrift S. 10–13, U04', status: 'entwurf', module: './lessons/linalg/matrizen.js' },
          { id: 'inverse', title: 'Inverse Matrix, Gauss-Jordan', src: 'Mitschrift S. 15–19', status: 'geplant' },
          { id: 'lr', title: 'LR-Zerlegung', src: 'Mitschrift S. 20–24', status: 'geplant' },
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
          { id: 'basen', title: 'Vektoren und Basen', src: 'S. 5–7', status: 'entwurf', module: './lessons/mechanik/basen.js' },
        ],
      },
      {
        title: '2 Geschwindigkeit',
        lessons: [
          { id: 'geschwindigkeit', title: 'Geschwindigkeitsvektor in drei Basen', src: 'S. 8–10', status: 'entwurf', module: './lessons/mechanik/geschwindigkeit.js' },
          { id: 'kreisbewegung', title: 'Kreisbewegung und Winkelgeschwindigkeit', src: 'S. 11', status: 'entwurf', module: './lessons/mechanik/kreisbewegung.js' },
        ],
      },
      {
        title: '3 Starrer Körper',
        lessons: [
          { id: 'sdpg', title: 'Starrer Körper und SdpG', src: 'S. 12–13', status: 'entwurf', module: './lessons/mechanik/sdpg.js' },
          { id: 'rotation', title: 'Translation und Rotation', src: 'S. 13–19', status: 'entwurf', module: './lessons/mechanik/rotation.js' },
          { id: 'allgemein', title: 'Rollen, Kreiselung, allgemeine Bewegung', src: 'S. 20–25', status: 'entwurf', module: './lessons/mechanik/allgemein.js' },
          { id: 'eben', title: 'Ebene Bewegung, Momentanzentrum', src: 'S. 26–28', status: 'entwurf', module: './lessons/mechanik/eben.js' },
          { id: 'fachwerk', title: 'Fachwerk, Parallelogrammregel', src: 'S. 29–31', status: 'entwurf', module: './lessons/mechanik/fachwerk.js' },
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
