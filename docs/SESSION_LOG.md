# Sitzungen

## 2026-10-15 — Grundgerüst

- Projekt angelegt: statische Seite ohne Build (HTML + ES-Module), KaTeX im Repo, Tests mit `node --test`, Deployment über GitHub Actions → Pages.
- Grund für «kein Build»: einfacher zu verstehen und zu ändern, nichts zu installieren, kein Abhängigkeits-Ärger.
- Quellen gesichtet und in `SOURCE_MAP.md` erfasst.
- Drei Muster-Lektionen (Status `entwurf`): Analysis «Folgen und Konvergenz», LinAlg «Lösbarkeit und Rang», Mechanik «Koordinaten».
- Quellenprobleme R-001, R-002 erfasst.
- 17 Tests grün; alle Seiten im Browser geprüft (hell/dunkel, Laptop/Handy), keine KaTeX- oder Konsolenfehler.
- Offen: Feedback des Studenten zu Stil und Tiefe.

## 2026-10-17 — Stoff bis Woche 5

- 21 neue bzw. erweiterte Lektionen: Analysis Kap. I komplett, Kap. II (II.1–II.18), Kap. A (A.1–A.3); LinAlg Gauss, Lösbarkeit (+ Sätze 1.1–1.7), Matrizen; Mechanik S. 5–25.
- Neue Bausteine: `ui/svg3d.js` (Schrägbild), `graph()`/`grid()` mit clipPath, tiefgestellte SVG-Beschriftungen, Geschwindigkeitsfarbe magenta.
- Neue Mathe-Module mit Tests: `vec.js`, `analysis.js`, `complex.js`, `fraction.js` (exakter Gauss), `matrix.js`. 55 Tests grün.
- Quellenprobleme R-003 bis R-005 erfasst.
- Serie 4 LinAlg bewusst nicht gelöst (laufende Abgabe).
- Nachtrag: Mechanik «Ebene Bewegung» (S. 26–28, inkl. Planetengetriebe als Ergänzung) und «Fachwerk» (S. 29–31). 59 Tests grün.


## 2026-10-23 — Fachwerk-Beispiel S. 30

- Beispiel S. 30 (in der Mitschrift nur Figur) nach der handschriftlichen Lösung aus der Vorlesung (annotierte Fassung des Studenten, dort S. 28) als neuer Abschnitt 2 in «Fachwerk»: sechs Etappen, Ergebnistabelle, drei Wege zu v_E (a, b, c).
- Interaktive Figur `fig-truss`: Knöpfe führen Etappe für Etappe durch (Z_i, Hilfsgeraden, Geschwindigkeiten).
- Neues Mathe-Modul `src/math/fachwerk.js`: rechnet alle ω_i, Z_i und Knotengeschwindigkeiten nur aus Grundgleichung + Gelenkbedingung; `fachwerk.test.js` vergleicht mit den Werten der Vorlesung, prüft SdpG an allen 8 Stäben und Methode c). 69 Tests grün.
- Koordinaten der Knoten aus der Skizze abgelesen (alle Schrägstäbe unter 45°); damit stimmen alle Zahlen der Vorlesung.
- Seite im Browser geprüft (Laptop hell, Handy dunkel, alle Etappen), keine Konsolen-/KaTeX-Fehler, kein horizontales Scrollen.
