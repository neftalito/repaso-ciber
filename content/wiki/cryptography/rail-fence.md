---
{"id":"crypto-rail-fence","title":"Transposición rail fence","slug":"rail-fence","parent":"crypto-transposition","type":"algorithm","order":50,"related":["crypto-columnar","crypto-transposition"],"sources":[{"id":"practice-guide","pages":[3]},{"id":"practice-solutions","pages":[4]}],"permalink":"cryptography/encryption/classical/transposition/rail-fence"}
---
## Distribuir letras en rieles

**Rail fence** es una transposición: distribuye las letras del mensaje en un zigzag sobre varios rieles y después lee cada riel completo. Cambia el orden de los símbolos, no los reemplaza.

La guía y el solucionario de prácticas lo incluyen como contenido complementario. Su desarrollo no procede de una explicación de este algoritmo en las diapositivas oficiales.

## Ejemplo complementario con dos rieles

El solucionario de prácticas, página 4, presenta el cifrado `CBRIE` y pide recuperar el mensaje con dos rieles. Para entenderlo, se puede reconstruir la distribución del original `CIBER`:

```text
Riel 1: C . B . R
Riel 2: . I . E .
```

Leer el primer riel y después el segundo produce **`CBRIE`**.

## Cómo se descifra este caso

1. Hay cinco posiciones que alternan entre los dos rieles. El primero recibe las posiciones 1, 3 y 5; el segundo, las posiciones 2 y 4.
2. Se separa el cifrado en `CBR` para el primer riel e `IE` para el segundo.
3. Se intercalan las letras siguiendo la alternancia original: C, I, B, E, R.

El mensaje recuperado es **`CIBER`**. Con más rieles hay que reconstruir el zigzag completo; el reparto de este ejemplo corresponde específicamente a dos.

:::question ¿Por qué los dos grupos tienen distinta longitud?
Porque el recorrido comienza en el primer riel y hay cinco letras. Ese riel recibe tres posiciones y el segundo recibe dos.
:::
