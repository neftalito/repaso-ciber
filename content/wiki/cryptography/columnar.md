---
{"id":"crypto-columnar","title":"Transposición columnar","slug":"columnar","parent":"crypto-transposition","type":"algorithm","order":40,"related":["crypto-grid","crypto-vigenere"],"sources":[{"id":"practice-1a","pages":[9]},{"id":"manual","pages":[7]},{"id":"practice-solutions","pages":[4]}]}
---
## Funcionamiento

Se escribe el texto por filas en una tabla y se leen las columnas en un orden acordado, que puede derivarse de una palabra clave. Para invertirlo se reconstruyen primero las columnas y luego se lee por filas.

## Ejemplo original

Con clave `SOL`, sin espacios y con doce letras de entrada, se arma esta tabla:

```text
S O L
C I B
E R S
E G U
R I D
```

La entrada es `CIBERSEGURID`. Al ordenar las columnas por sus letras de clave, L–O–S, se leen `BSUD`, `IRGI` y `CEER`: el cifrado es `BSUDIRGICEER`.

Para descifrar, se separan tres grupos de cuatro letras y se colocan de nuevo bajo L, O y S. La lectura de las filas en el orden original S–O–L recupera el mensaje.

## Convenciones necesarias

Hay que precisar el tratamiento de claves con letras repetidas y de filas incompletas. El ejemplo evita ambos problemas para mostrar únicamente la permutación.

:::question ¿Ordenar alfabéticamente la clave modifica las letras del mensaje?
No. Determina el orden de lectura de las columnas. Los símbolos del mensaje permanecen iguales y cambian de posición.
:::
