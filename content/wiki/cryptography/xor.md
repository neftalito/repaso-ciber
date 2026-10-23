---
{"id":"crypto-xor","title":"Operación XOR","slug":"xor","parent":"cryptography","type":"concept","order":40,"related":["crypto-stream","crypto-cbc","crypto-numbers"],"sources":[{"id":"practice-1a","pages":[10]},{"id":"practice-1b","pages":[5]},{"id":"practice-guide","pages":[5]}]}
---
## Definición

XOR es una operación bit a bit cuyo resultado vale 1 cuando sus entradas son diferentes y 0 cuando son iguales. Es una operación reutilizada en esquemas criptográficos, no una garantía de seguridad por sí misma.

| a | b | a XOR b |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## Ejemplo original

`01001010 XOR 00110011 = 01111001`, o `0x4A XOR 0x33 = 0x79`. Aplicar otra vez `0x33` al resultado recupera `0x4A`.

Esto ocurre porque `x XOR x = 0`, `x XOR 0 = x` y la operación permite reagrupar operandos. Por tanto `(m XOR k) XOR k = m`.

## Límite del cifrado con una constante

Si se repite una clave de un byte, existen solo `2⁸ = 256` valores posibles. La reversibilidad de XOR no convierte esa construcción elemental en un esquema robusto.

:::question ¿Qué revela combinar dos cifrados que usaron el mismo flujo de clave?
Si c1=m1 XOR k y c2=m2 XOR k, entonces c1 XOR c2=m1 XOR m2: el flujo k se cancela. No se recuperan automáticamente ambos mensajes, pero se revela una relación entre ellos.
:::
