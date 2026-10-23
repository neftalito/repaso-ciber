---
{"id":"crypto-numbers","title":"Representaciones numéricas","slug":"numbers","parent":"crypto-encoding","type":"concept","order":10,"related":["crypto-ascii","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[8]},{"id":"practice-1a","pages":[2]},{"id":"manual","pages":[6]},{"id":"dh-rsa-guide","pages":[2,5,8]}],"permalink":"cryptography/encoding/numbers"}
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

## Aritmética modular para RSA y Diffie–Hellman

`x mod n` es el resto de dividir x por n. Para calcular `b^e mod n` se pueden elevar al cuadrado residuos intermedios, evitando construir toda la potencia. Por ejemplo, con módulo 23: `5²≡2`, `5⁴≡4` y `5⁸≡16`.

Dos enteros son coprimos cuando su máximo común divisor, **MCD**, es 1. Un inverso multiplicativo d de e respecto de un módulo N satisface `e×d≡1 mod N` y existe si e y N son coprimos.

El totiente `φ(n)` cuenta los enteros entre 1 y n−1 coprimos con n. Para dos primos **distintos**, `φ(pq)=(p−1)(q−1)`. En el ejemplo RSA de la guía, `φ(3233)=3120` y el inverso de 17 módulo 3120 es 2753. Véanse [los parámetros y cálculos de RSA](wiki:crypto-rsa#segundo-ejemplo-completo-hola-con-numeros-pequenos).
