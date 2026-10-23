---
{"id":"crypto-caesar","title":"Cifrado César y ROT","slug":"caesar","parent":"crypto-substitution","type":"algorithm","order":10,"related":["crypto-alphabet-indices","crypto-vigenere"],"sources":[{"id":"lecture-crypto-1","pages":[12,13]},{"id":"manual","pages":[7]}],"aliases":["ROT3","ROT13","Caesar"],"permalink":"cryptography/encryption/classical/substitution/caesar"}
---
## Desplazamiento fijo

César reemplaza cada letra por otra situada a una distancia fija en un alfabeto. Para A=0 hasta Z=25, el cifrado es `c = (p + k) mod 26` y el descifrado `p = (c - k) mod 26`. Se debe declarar qué ocurre con espacios, acentos y signos.

## Ejemplo original

Con el alfabeto A–Z y `k=3`, `LUNA` se transforma en `OXQD`: L→O, U→X, N→Q y A→D. Para recuperar el original se retroceden tres posiciones, con retorno circular al alcanzar el inicio.

ROT designa una rotación del alfabeto. ROT13 avanza trece lugares; aplicarlo dos veces devuelve el original porque el desplazamiento total es 26.

## Limitación

Solo hay 26 desplazamientos posibles, incluido el que no cambia nada. Es posible enumerarlos, por lo que el método se estudia como ejemplo histórico y ejercicio de reconocimiento.

:::question ¿César conserva el orden de las posiciones del mensaje?
Sí. La primera letra sigue siendo la primera, pero se sustituye por otra. Por eso es sustitución y no transposición.
:::
