# Minifying Paths

## Source Code (SVG Arrow)

```plaintext
<svg width="2rem" height="2rem" viewBox="0 0 100 100"
xmlns="http://www.w3.org/2000/svg">
  <style>
    .background {
    rx: 0.25rem;
    ry: 0.25rem;
    }
  </style>
  <rect width="100%" height="100%" class="background" />
  <path d="M25 43 L50 43 L50 30 L75 50 L50 70 L50 57 L25 57 Z"
    opacity="1" fill="#fff" paint-order="fill markers stroke" />
</svg>
````

## Example of Minified Path

```plaintext
d="M25 43 L50 43 L50 30 L75 50 L50 70 L50 57 L25 57 Z"
d="M25 43h25V30l25 20-25 20V57H25z"
```

### Erklärung

**Kürzung von Befehlen**:

In dem ursprünglichen Pfad haben wir

`L` für "Line To" und
`Z` für "Close Path" verwendet.

Kürzere Äquivalente: wie z.B.:

`H` für "Horizontal Line To" und
`V` für "Vertical Line To".

**Entfernung von Redundanzen**:

Wenn zwei Befehle in Folge dieselbe Richtung haben (z.B. horizontal), kann ein

`H`\-Befehl anstelle von zwei
`L`\-Befehlen verwendet werden. Ähnlich kann ein
`V`\-Befehl verwendet werden, wenn zwei Linien in Folge vertikal sind.

 **Relative Positionierung statt absoluter Koordinaten**:

Anstatt absolute Koordinaten für jeden Punkt zu verwenden, nutzt der Minifier relative Bewegungen vom vorherigen Punkt aus. Dies kann die Anzahl der benötigten Zeichen reduzieren.

In Unserem Beispiel:

**`M25 43 L50 43`** wird zu **`M25 43h25`**.

Anstatt eine Linie von `(25,43)` nach `(50,43)` zu zeichnen (`L50 43`), bewegt sich der Pfad horizontal um 25 Einheiten von der aktuellen Position (`h25`).

**`L50 30 L75 50 L50 70 L50 57`** wird zu **`V30l25 20-25 20V57`**.

Hier ersetzt `V30` das `L50 30`, da es sich um eine vertikale Linie handelt. `l25 20` ist eine kürzere Art, `L75 50` zu schreiben, und `V57` ersetzt `L50 57`.

**`L25 57 Z`** wird zu **`H25z`**.

Der horizontale Linienzug zurück zu `25` und das Schließen des Pfads bleiben erhalten, aber in kürzerer Form.
