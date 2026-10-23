---
{"id":"crypto-rail-fence","title":"Transposición rail fence","slug":"rail-fence","parent":"crypto-transposition","type":"algorithm","order":50,"related":["crypto-columnar","crypto-transposition"],"sources":[{"id":"practice-guide","pages":[3]},{"id":"practice-solutions","pages":[4]}],"permalink":"cryptography/encryption/classical/transposition/rail-fence"}
---
## Rieles y recorrido

Rail fence distribuye el mensaje sobre varios rieles siguiendo un zigzag y luego lee cada riel completo. La guía y el solucionario complementarios permiten distinguirlo de la transposición columnar.

## Ejemplo original de dos rieles

En `LUNARES`, se alternan los rieles al colocar las letras:

```text
Riel 1: L . N . R . S
Riel 2: . U . A . E .
```

Al concatenar los rieles se obtiene `LNRSUAE`. Para descifrar se cuentan cuatro posiciones en el primero y tres en el segundo, se distribuyen los grupos y se reconstruye la alternancia.

## Límite

Con más rieles debe reconstruirse el zigzag completo, no simplemente repartir todos los grupos con la misma longitud. El número de rieles y el recorrido son parámetros del ejercicio.

:::question ¿Por qué el primer riel puede tener más letras que el segundo?
En el ejemplo se empieza arriba y hay siete letras. Las posiciones impares quedan en el primer riel y son cuatro; las pares quedan en el segundo y son tres.
:::
