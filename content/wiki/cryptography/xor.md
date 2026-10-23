---
{"id":"crypto-xor","title":"Operación XOR","slug":"xor","parent":"cryptography","type":"concept","order":40,"related":["crypto-stream","crypto-cbc","crypto-numbers"],"sources":[{"id":"practice-1a","pages":[10]},{"id":"practice-1b","pages":[5]},{"id":"practice-guide","pages":[5]}]}
---
## Comparar bits

**XOR** es una operación bit a bit: produce 1 cuando los dos bits son diferentes y 0 cuando son iguales. Se utiliza dentro de distintos esquemas criptográficos; su reversibilidad no garantiza por sí sola la seguridad del esquema completo.

| a | b | a XOR b |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## Ejemplo de la cátedra

La explicación de la Práctica 1, parte 1, página 10, combina los bytes de un mensaje que comienza por `IC{` con el valor hexadecimal `0x11`:

| Carácter | Byte de entrada | XOR con 0x11 | Byte de salida |
| --- | --- | --- | --- |
| I | 0x49 | 0x49 XOR 0x11 | 0x58 |
| C | 0x43 | 0x43 XOR 0x11 | 0x52 |
| { | 0x7B | 0x7B XOR 0x11 | 0x6A |

Para recuperar cada byte se vuelve a aplicar el mismo valor: `0x58 XOR 0x11 = 0x49`.

## Por qué se recupera el original

Al combinar un valor consigo mismo se obtiene cero, y combinarlo con cero no lo cambia: `x XOR x = 0` y `x XOR 0 = x`. Por eso **`(m XOR k) XOR k = m`**: la segunda aplicación de `k` cancela la primera.

La guía complementaria, página 5, advierte el límite de una clave repetida de un byte: solo tiene 256 valores posibles. La explicación práctica, parte 2, página 5, presenta XOR en el contexto de cifradores de flujo, donde importa cómo se genera la secuencia cifrante.

:::question ¿Qué ocurre si dos mensajes usan el mismo flujo de clave?
Al combinar ambos cifrados, el flujo se cancela: si c1=m1 XOR k y c2=m2 XOR k, entonces c1 XOR c2=m1 XOR m2. Esto revela una relación entre los mensajes; no recupera automáticamente ambos originales.
:::
