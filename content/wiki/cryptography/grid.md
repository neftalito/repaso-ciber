---
{"id":"crypto-grid","title":"Transposición por grilla","slug":"grid","parent":"crypto-transposition","type":"technique","order":30,"related":["crypto-columnar","crypto-scytale"],"sources":[{"id":"practice-guide","pages":[3,4]}]}
---
## Definición y alcance

Una grilla organiza el texto en filas y columnas para cambiar el recorrido de lectura. La guía complementaria propone ensayar dimensiones indicadas por una pista, sin asumir que toda tabla utiliza una clave alfabética.

## Ejemplo original

Se colocan las seis letras de `SEGURO` en dos filas y tres columnas:

```text
S E G
U R O
```

Leer por columnas de arriba abajo y de izquierda a derecha produce `SUERGO`. Para recuperar la entrada se reconstruyen columnas de dos letras y luego se leen las filas.

## Convenciones

Las dimensiones, el orden de llenado, el orden de lectura y el tratamiento de casillas vacías forman parte del método. Una pista `8 × 3` no determina por sí sola todos esos datos.

:::question ¿Qué diferencia esta variante de la transposición columnar con clave?
Aquí se declara directamente un recorrido de columnas. La variante con clave utiliza además una regla para reordenarlas, por ejemplo el orden alfabético de una palabra.
:::
