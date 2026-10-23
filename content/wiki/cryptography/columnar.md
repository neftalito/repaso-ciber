---
{"id":"crypto-columnar","title":"Transposición columnar","slug":"columnar","parent":"crypto-transposition","type":"algorithm","order":20,"related":["crypto-grid","crypto-vigenere"],"sources":[{"id":"practice-1a","pages":[9]},{"id":"manual","pages":[7]},{"id":"practice-solutions","pages":[4]}],"permalink":"cryptography/encryption/classical/transposition/columnar"}
---
## Reordenar el texto mediante una tabla

La **transposición columnar** cifra un mensaje cambiando el orden de sus letras. Primero se escribe por filas en una tabla y después se leen las columnas en un orden acordado. Una palabra clave puede determinar ese orden.

La explicación de la Práctica 1, parte 1, introduce la transposición en la página 9 y muestra la tabla con clave `CAT` al comienzo de la página 10. El solucionario complementario de prácticas, página 4, desarrolla el mismo caso.

## Ejemplo con la clave CAT

El mensaje `THE SKY IS BLUE` se escribe sin espacios bajo las letras de la clave:

```text
C A T
T H E
S K Y
I S B
L U E
```

La clave establece el orden alfabético **A–C–T** para leer las columnas:

1. Debajo de A se obtiene `HKSU`.
2. Debajo de C se obtiene `TSIL`.
3. Debajo de T se obtiene `EYBE`.

Al concatenar esos grupos resulta **`HKSUTSILEYBE`**. No se han reemplazado letras: las mismas doce letras aparecen en otro orden.

## Cómo deshacer la transposición

En este caso hay tres columnas y cuatro filas completas:

1. Separar el cifrado en tres grupos de cuatro letras: `HKSU`, `TSIL`, `EYBE`.
2. Colocarlos bajo las columnas A, C y T, respectivamente.
3. Volver al orden original de la tabla, C–A–T, y leer por filas.

Se recupera `THESKYISBLUE`. Los espacios originales no se recuperan por la transposición, porque se habían quitado antes de llenar la tabla.

La distribución en grupos iguales corresponde a este ejemplo de filas completas. Para otros mensajes deben conocerse las reglas sobre filas incompletas y letras repetidas en la clave.

:::question ¿Ordenar alfabéticamente la clave modifica las letras del mensaje?
No. Determina el orden de lectura de las columnas. Las letras se conservan y cambian de posición.
:::
