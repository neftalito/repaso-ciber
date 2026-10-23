---
{"id":"crypto-rsa","title":"RSA","slug":"rsa","parent":"crypto-asymmetric","type":"algorithm","order":10,"related":["crypto-signature","crypto-numbers","crypto-encryption"],"sources":[{"id":"lecture-crypto-2","pages":[10,12]},{"id":"practice-1b","pages":[1,2]},{"id":"practice-guide","pages":[6]}]}
---
## Definición

RSA es un sistema de clave pública utilizado en esquemas de cifrado y firma. La práctica lo estudia mediante aritmética modular y relaciona la obtención de la clave privada con la dificultad de factorizar un módulo grande.

## Modelo matemático del ejercicio

Se eligen primos distintos `p` y `q`, se calcula `n=p×q` y `φ(n)=(p-1)(q-1)`. Se escoge `e` coprimo con `φ(n)` y se obtiene `d` como su inverso modular: `e×d ≡ 1 mod φ(n)`.

La clave pública es `(n,e)` y el exponente privado es `d`. Para un entero `0 ≤ m < n`, el modelo simplificado cifra `c = m^e mod n` y descifra `m = c^d mod n`.

## Ejemplo original pequeño

Tomando `p=11`, `q=17`, se obtiene `n=187` y `φ(n)=160`. Para `e=7`, un inverso es `d=23`, porque `7×23=161`, que deja resto 1 al dividir por 160.

Con `m=42`, el cifrado es `42^7 mod 187 = 15`. El descifrado `15^23 mod 187 = 42` recupera el valor de entrada. Los primos son deliberadamente pequeños y el ejemplo no incluye un esquema de relleno.

## Cuidado con la fuente

La página 2 de la explicación práctica indica un valor de `d` al derivar la clave y otro distinto en la expresión posterior de descifrado. Para sus valores p, q y e, el inverso correcto es `56692460753`, que aparece en el descifrado; el valor `59397641569` impreso durante la derivación no satisface la condición modular. No deben mezclarse exponentes: hay que comprobar el inverso y la recuperación del mensaje.

:::question ¿Por qué conocer p y q cambia el problema del ejercicio?
Permite calcular φ(n) y, a partir de e, su inverso modular d. Conocer solamente el módulo público n no entrega directamente esos factores.
:::
