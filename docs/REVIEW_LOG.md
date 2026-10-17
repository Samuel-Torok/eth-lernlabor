# Quellenprobleme

| ID | Quelle | Problem | Wie in der Lektion behandelt |
|---|---|---|---|
| R-001 | Mechanik-Mitschrift S. 4 | φ = arctan(y/x) (und ψ, θ analog) stimmt nur für x > 0 (bzw. z > 0 bei θ). | `achtung`-Box + Figur `fig-atan` in Koordinaten-Lektion; Code nutzt `atan2`; Test in `coords.test.js`. |
| R-002 | Analysis I.4 | «n₀ := 1/ε aufgerundet» versagt, wenn 1/ε ganzzahlig ist (dann ist a_{n₀} = ε, nicht < ε). Sicher: n₀ = ⌊1/ε⌋ + 1. | `achtung`-Box in Folgen-Lektion; Test in `sequences.test.js`. |
| R-003 | Analysis II.8 | Pendel: «s̈(t) = g·sin(φ(t))» ohne Minus und ohne Bezug s = lφ; korrekt l·φ̈ = −g·sin φ (wie auf I.9). | `achtung`-Box in Linearisierung. |
| R-004 | Analysis II.18 | f(2/5) = −3/2·∛(4/25) beim Vergleichen; richtig −3/5·∛(4/25) (wie II.17). | `achtung`-Box in Extremalaufgaben; Test in `analysis.test.js`. |
| R-005 | Analysis II.3–II.4 | Beweis der Kettenregel teilt durch d = g(x+Δx) − g(x), das 0 sein kann. | `ergaenzung`-Box in Ableitung. |

