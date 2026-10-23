---
{"id":"crypto-numbers","title":"Representaciones numéricas","slug":"numbers","parent":"crypto-encoding","type":"concept","order":10,"related":["crypto-ascii","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[8]},{"id":"practice-1a","pages":[2]},{"id":"manual","pages":[6]}],"permalink":"cryptography/encoding/numbers"}
---
## Bases y valor

Binario, decimal y hexadecimal son sistemas posicionales de base 2, 10 y 16. Una representación no modifica el valor: cambia los símbolos y pesos usados para escribirlo. Hexadecimal utiliza los dígitos 0–9 y A–F; cada dígito representa cuatro bits.

## Conversión resuelta

Para `0x2D`, el primer dígito pesa 16 y `D` vale 13: `2 × 16 + 13 = 45`. En binario, `2` se escribe `0010` y `D`, `1101`; por tanto `0x2D = 00101101₂ = 45₁₀`.

Si además se interpreta 45 como código ASCII, representa el guion `-`. Esa interpretación requiere conocer la codificación del texto; una cifra aislada no la determina.

## Precaución

Los ceros iniciales fijan una anchura visual, pero no alteran el valor. En un archivo importan también el agrupamiento en bytes y el orden en que se interpretan.

:::question ¿Dos dígitos hexadecimales siempre equivalen a dos bytes?
No. Cada dígito representa cuatro bits; dos dígitos representan ocho bits, es decir, un byte.
:::
