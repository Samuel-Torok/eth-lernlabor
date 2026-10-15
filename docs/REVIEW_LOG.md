# Quellenprobleme

| ID | Quelle | Problem | Wie in der Lektion behandelt |
|---|---|---|---|
| R-001 | Mechanik-Mitschrift S. 4 | φ = arctan(y/x) (und ψ, θ analog) stimmt nur für x > 0 (bzw. z > 0 bei θ). | `achtung`-Box + Figur `fig-atan` in Koordinaten-Lektion; Code nutzt `atan2`; Test in `coords.test.js`. |
| R-002 | Analysis I.4 | «n₀ := 1/ε aufgerundet» versagt, wenn 1/ε ganzzahlig ist (dann ist a_{n₀} = ε, nicht < ε). Sicher: n₀ = ⌊1/ε⌋ + 1. | `achtung`-Box in Folgen-Lektion; Test in `sequences.test.js`. |
