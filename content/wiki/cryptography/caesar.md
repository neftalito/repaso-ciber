---
{"id":"crypto-caesar","title":"Cifrado César y ROT","slug":"caesar","parent":"crypto-substitution","type":"algorithm","order":10,"related":["crypto-alphabet-indices","crypto-vigenere"],"sources":[{"id":"lecture-crypto-1","pages":[12,13]},{"id":"manual","pages":[7]}],"aliases":["ROT3","ROT13","Caesar"],"permalink":"cryptography/encryption/classical/substitution/caesar"}
---
## Desplazar letras sin cambiar su orden

El **cifrado César** sustituye cada letra por otra situada a una distancia fija en el alfabeto. Al llegar al final, continúa desde el principio. El desplazamiento es el mismo en todas las posiciones del mensaje.

Cripto, parte 1, páginas 12–13, presenta César/ROT entre los cifrados clásicos y explica ROT3, con un desplazamiento de tres posiciones. La página 13 también ilustra ROT13.

## Ejemplo de César con desplazamiento 3

El manual complementario, página 7, utiliza el alfabeto A–Z y el mensaje `HOLA`:

| Entrada | Avanzar tres posiciones | Salida |
| --- | --- | --- |
| H | H → I → J → K | K |
| O | O → P → Q → R | R |
| L | L → M → N → O | O |
| A | A → B → C → D | D |

El resultado es **`KROD`**. Para descifrar se recorren tres posiciones hacia atrás en cada letra.

## Expresión con índices

Si A vale 0 y Z vale 25, `p` representa el índice de una letra del mensaje, `c` el de su sustituta y `k` el desplazamiento:

- Cifrar: `c = (p + k) mod 26`.
- Descifrar: `p = (c - k) mod 26`.

`mod 26` conserva el resto de la división por 26 y expresa el retorno circular del alfabeto. Debe precisarse qué ocurre con espacios, acentos y signos, que no están incluidos en esta convención A–Z.

## ROT13 y límite del método

ROT indica una rotación del alfabeto. En la ilustración oficial de ROT13, `HOLA` se transforma en `UBYN`. Repetir ROT13 recupera el original: dos desplazamientos de trece completan las 26 posiciones.

El manual señala que basta probar los 26 desplazamientos posibles para enumerar las alternativas de César. Se estudia como mecanismo clásico, no como protección criptográfica moderna.

:::question ¿Por qué César es sustitución y no transposición?
Porque cada posición conserva su lugar, pero la letra que contiene se reemplaza por otra. Una transposición cambiaría el orden de las letras originales.
:::
