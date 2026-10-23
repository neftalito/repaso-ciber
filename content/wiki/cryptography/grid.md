---
{"id":"crypto-grid","title":"Transposición por grilla","slug":"grid","parent":"crypto-transposition","type":"technique","order":40,"related":["crypto-columnar","crypto-scytale"],"sources":[{"id":"practice-guide","pages":[3,4]}],"permalink":"cryptography/encryption/classical/transposition/grid"}
---
## Cambiar el recorrido de lectura

La transposición por grilla organiza el texto en filas y columnas y lo recupera con un recorrido diferente. Las letras conservan su identidad; cambia la posición en la que se leen.

La guía complementaria, páginas 3 y 4, propone usar una pista de dimensiones para ensayar esa disposición. El desarrollo de esta variante procede de ese material, no de una explicación específica de las diapositivas oficiales.

## Cómo usar la pista de dimensiones

La guía utiliza `8 × 3` como pista y propone ensayar una grilla de ocho columnas por tres filas:

1. Reconocer qué dimensión se interpreta como cantidad de filas y cuál como columnas.
2. Declarar cómo se coloca el texto en las casillas.
3. Ensayar y registrar el recorrido de lectura.
4. Comparar el resultado con el contexto del ejercicio.

Las dimensiones no determinan por sí solas los otros pasos. Si el texto no completa la grilla, también hace falta conocer el tratamiento de las casillas vacías o del relleno; no corresponde inventarlo para forzar una solución.

## Diferencia con la transposición columnar con clave

Una grilla describe una disposición y unos recorridos. La [transposición columnar](wiki:crypto-columnar) puede añadir una clave que determine el orden de lectura de las columnas. No debe suponerse esa clave cuando la pista solo indica dimensiones.

:::question ¿Una pista de ocho columnas por tres filas determina una única transformación?
No. Todavía faltan el orden de llenado, el recorrido de lectura y, cuando corresponda, el tratamiento de las casillas que no contienen texto.
:::
