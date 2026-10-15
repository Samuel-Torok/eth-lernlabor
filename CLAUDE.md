# ETH Lernlabor — Projektanweisung

Interaktive Lernseite für drei Vorlesungen im 1. Semester D-MAVT (ETH Zürich): **Analysis I**, **Lineare Algebra I**, **Mechanik I**.
Der Student will **Tiefe statt Abdeckung**: 10 Seiten richtig verstehen ist besser als 150 überfliegen.
Reihenfolge der Prioritäten: **Korrektheit > Verständlichkeit > Bilder > Tempo.**

## Zu Beginn jeder Sitzung

1. `docs/PROGRESS.md` lesen (wo stehen wir), `docs/REVIEW_LOG.md` (offene Quellenprobleme), letzten Eintrag in `docs/SESSION_LOG.md`.
2. Quellen: Die Skripte sind **nicht** im Repo (Urheberrecht). Sie liegen beim Studenten unter `~/Documents/ETH/{Analysis,Linear Algebra,Mechanik}`. Fehlt der Zugriff: danach fragen oder mit `docs/SOURCE_MAP.md` arbeiten.
3. `npm test` laufen lassen — die Basis muss grün sein, bevor du etwas änderst.

## Architektur (bewusst einfach)

- **Kein Build-Schritt, keine npm-Abhängigkeiten.** Reines HTML/CSS/JavaScript (ES-Module). GitHub Pages liefert die Dateien direkt aus.
- KaTeX liegt in `vendor/katex/` (MIT). Nicht durch ein CDN ersetzen.
- `src/curriculum.js` — Inhaltsverzeichnis aller Fächer, Status jeder Lektion.
- `src/lessons/<fach>/<id>.js` — eine Lektion = eine Funktion `render(root)`.
- `src/ui/` — Bausteine: `tex.js` (M/MD, Makros), `blocks.js` (box, section, figure, steps, more), `controls.js` (slider, buttonRow), `svg.js` (plot, axes).
- `src/math/*.js` — **reine** Mathe-Funktionen ohne DOM, jede mit `*.test.js`.
- Lokal ansehen: `npm run dev` → http://localhost:8000

## Nicht verhandelbar

- **Nie erfinden, was in der Vorlesung steht.** Alles in `box('vorlesung', …)` braucht eine Seitenangabe (`{ src: 'S. I.4' }`) und muss dort wirklich so stehen. Eigene Erklärungen gehen in den Fliesstext oder in `box('ergaenzung', …)`. Der Test `tests/curriculum.test.js` erzwingt `src`.
- **Notation des Dozenten beibehalten.** Mechanik: Vektoren unterstrichen (`\v{r}`), zylindrisch `(ρ, φ, z)`, sphärisch `(r, θ, ψ)` mit **θ ab +z, ψ = Azimut**. Analysis: `(a_n)_{n≥0}`, ε/n₀ wie im Skript. LinAlg: `rang(A)`, «Verträglichkeitsbedingungen», «Zeilenstufenform».
- **Jede gezeigte Formel ist geprüft:** durch einen Test in `src/math/*.test.js` (numerische Prüfung einer geschlossenen Form oder eines Beispiels) oder durch eine Schritt-für-Schritt-Herleitung in der Lektion. Numerische Übereinstimmung ist eine Prüfung, kein Beweis — sag das, wo es zählt.
- **Quellenfehler** bekommen eine ID `R-xxx` in `docs/REVIEW_LOG.md` und werden in der Lektion kurz in einer `achtung`-Box erklärt. Die Quelle nicht stillschweigend «korrigieren».
- **Jedes mathematische Symbol durch KaTeX**, auch in Überschriften und Bildlegenden. Kein ρ, φ, √, ² als normaler Text. SVG-Beschriftungen nutzen die Klasse `math` (KaTeX_Math-Schrift).
- **Sprache: Deutsch, Schweizer Rechtschreibung** (ss statt ß, «Guillemets»), Dezimalkomma (`fmt()` bzw. `{,}` in TeX), Semikolon zwischen Tupel-Einträgen mit Dezimalzahlen.

## Bilder zuerst — die wichtigste Anforderung des Studenten

- Jedes Konzept mit geometrischer Bedeutung bekommt eine Figur: interaktiv (Schieberegler, Knöpfe), wo man etwas ausprobieren kann.
- Eine gute Figur pro Idee statt mehrerer kleiner. Keine Duplikate.
- Ein Farbsystem überall: x blau, y bernstein, z grün, ρ türkis, r dunkel, Winkel violett, Punkte rot (CSS-Variablen in `styles.css`).
- Bildunterschriften: zuerst was man sieht, dann was es bedeutet, höchstens 3 kurze Sätze.

## So erklären, dass ein Erstsemester es beim ersten Lesen versteht

- Jede Idee zuerst in Worten oder mit einem Alltagsbild (`intuition`-Box), **dann** die Formel.
- Jedes neue Symbol beim ersten Auftreten erklären («${n_0}$ = die Stelle, ab der alles im Streifen bleibt»).
- Höchstens eine Formel pro Satz. Kurze Sätze, eine Idee pro Schritt.
- Bei jedem Schritt einer Herleitung sagen, **warum** er erlaubt ist (`steps([...])`: Formel + Begründung).
- Kompakte Skriptzeilen vorlesen: «So liest man das: …».
- Typische Denkfehler als `achtung`-Box.

## Fertig heisst

Eine Lektion kommt auf Status `review`, wenn: alle Vorlesungsboxen mit Seite, alle Formeln getestet oder hergeleitet, jede Idee mit Figur, `npm test` grün, und **du die Screenshots selbst angesehen hast** (`npm run check:pages` → `screens/`, hell + dunkel, Laptop + Handy). Tests bestehen heisst nicht, dass eine Figur stimmt.
`fertig` erst, wenn der Student sie freigibt.

## Befehle

```
npm run dev          # lokaler Server, http://localhost:8000
npm test             # Mathe-Tests + Inhalts-Lint (Node, keine Installation nötig)
npm run check:pages  # alle Lektionen im Browser rendern, Fehler suchen, Screenshots (braucht Playwright)
```

Nach jeder Sitzung: `docs/PROGRESS.md` und `docs/SESSION_LOG.md` aktualisieren.
