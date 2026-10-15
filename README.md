# ETH Lernlabor

Interaktive Begleitung zu **Analysis I**, **Lineare Algebra I** und **Mechanik I** (ETH Zürich, D-MAVT, HS 2026): Lektionen mit Seitenangaben zum Skript, interaktive Figuren und Formeln, die durch Tests geprüft sind.

## Lokal ansehen

```
npm run dev      # oder: python3 -m http.server 8000
```
dann http://localhost:8000 öffnen. Es gibt keinen Build-Schritt und nichts zu installieren.

## Tests

```
npm test
```

## Online stellen (GitHub Pages)

1. Neues Repository auf GitHub anlegen (z.B. `eth-lernlabor`) und diesen Ordner hochladen (siehe unten).
2. Auf GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Jeder Push auf `main` testet die Seite und veröffentlicht sie unter `https://<dein-name>.github.io/eth-lernlabor/`.

```
git remote add origin https://github.com/<dein-name>/eth-lernlabor.git
git push -u origin main
```

## Mit Claude weiterbauen

Projektregeln: [`CLAUDE.md`](CLAUDE.md). Stand und Plan: [`docs/`](docs/).
Typischer Auftrag: «Schreib die nächste Lektion aus docs/PROGRESS.md. Die Skripte liegen in ~/Documents/ETH.»

KaTeX (`vendor/katex/`) steht unter MIT-Lizenz.
