---
{"id":"crypto-rsa","title":"RSA","slug":"rsa","parent":"crypto-asymmetric","type":"algorithm","order":10,"related":["crypto-signature","crypto-numbers","crypto-encryption"],"sources":[{"id":"lecture-crypto-2","pages":[10,12]},{"id":"practice-1b","pages":[1,2]},{"id":"practice-guide","pages":[6]},{"id":"dh-rsa-guide","pages":[2,5,6,7,8,9]},{"id":"exam-questions","pages":[10,11]},{"id":"exam-solutions","pages":[6,7]}],"permalink":"cryptography/encryption/modern/asymmetric/rsa"}
---
## Para qué sirve

**RSA** utiliza una clave pública y una privada relacionadas matemáticamente. En un esquema de cifrado, quien envía el mensaje utiliza la clave pública del destinatario; este lo recupera con su clave privada. Cripto, parte 2, página 10, también lo presenta para firma digital.

La explicación de la Práctica 1, parte 2, páginas 1–2, desarrolla un modelo simplificado con números enteros. Su idea es que multiplicar dos primos permite construir el módulo público, mientras que conocer esos factores permite calcular el exponente privado. La fuente relaciona la seguridad con la dificultad de factorizar un módulo grande.

## Qué representa cada valor

- `p` y `q`: dos números primos distintos que se mantienen secretos.
- `n = p × q`: módulo que aparece tanto en la clave pública como en la privada.
- `φ(n) = (p - 1)(q - 1)`: valor calculado con los factores y utilizado para elegir los exponentes.
- `e`: exponente público, elegido coprimo con `φ(n)`; su único divisor positivo común es 1.
- `d`: exponente privado, obtenido como inverso modular de `e` respecto de `φ(n)`.

La clave pública es `(n, e)` y, en este modelo, la privada es `(n, d)`. Que `d` sea un inverso modular significa que **`e × d` deja resto 1 al dividirlo por `φ(n)`**.

## Generar las claves del ejemplo de la cátedra

La página 2 utiliza estos valores:

1. Elegir `p = 524287` y `q = 131071`.
2. Multiplicarlos: `n = 68718821377`.
3. Calcular `φ(n) = 524286 × 131070 = 68718166020`.
4. Elegir `e = 65537`, coprimo con ese valor.
5. Calcular su inverso modular: **`d = 56692460753`**.

**Corrección de una inconsistencia del PDF:** la derivación impresa indica `d = 59397641569`, pero el descifrado posterior usa `56692460753`. Para los valores de `p`, `q` y `e` del propio ejemplo, el segundo valor es el inverso correcto: `(65537 × 56692460753) mod 68718166020 = 1`. La explicación conserva los datos del ejercicio y utiliza ese valor coherente en ambas operaciones.

## Cifrar el mensaje «hola»

Antes de operar, el mensaje debe representarse como un entero. En el ejemplo oficial:

1. Los bytes de `hola` se escriben en hexadecimal como `686f6c61`.
2. Su valor entero es `m = 1752132705`, menor que `n`.
3. Se eleva `m` al exponente público y se conserva el resto de dividir por `n`:

```text
c = m^e mod n
c = 1752132705^65537 mod 68718821377
c = 21543768249
```

`mod n` significa tomar ese resto. El resultado `c` es el entero cifrado del ejercicio, no una representación hexadecimal del mensaje.

## Descifrar y recuperar el texto

El destinatario aplica su exponente privado al entero recibido:

```text
m = c^d mod n
m = 21543768249^56692460753 mod 68718821377
m = 1752132705
```

Al representar de nuevo ese entero como los bytes `68 6f 6c 61`, se recupera **`hola`**.

La guía complementaria, página 6, advierte que este RSA simplificado no debe trasladarse directamente a una aplicación: los parámetros y el relleno seguro forman parte del esquema real.

:::question ¿Por qué conocer p y q cambia el problema del ejercicio?
Porque permite calcular φ(n) y obtener d como inverso modular de e. El módulo público n es su producto, pero no entrega por separado esos factores.
:::

## Segundo ejemplo completo: HOLA, con números pequeños

La nueva guía complementaria, páginas 5–7, utiliza otro conjunto de valores, independiente del ejemplo de la cátedra anterior:

1. `p=61`, `q=53` y `n=p×q=3233`.
2. `φ(n)=(61−1)(53−1)=3120`.
3. `e=17`, coprimo con 3120.
4. `d=2753`, porque `17×2753=46801=1+15×3120`.

La clave pública del ejemplo es `(3233,17)`; el exponente privado es 2753. El algoritmo extendido de Euclides da `1=2×3120−367×17`, de donde `d=−367 mod 3120=2753`.

### Cifrar cada byte de HOLA

Esta demostración usa ASCII y **RSA matemático sin padding**, carácter por carácter. No es un esquema apropiado para proteger mensajes reales.

| Letra | Entero m | c = m^17 mod 3233 | c^2753 mod 3233 |
| --- | --- | --- | --- |
| H | 72 | 3000 | 72 |
| O | 79 | 1307 | 79 |
| L | 76 | 2726 | 76 |
| A | 65 | 2790 | 65 |

Para calcular el primer bloque mediante cuadrados sucesivos: `72² mod 3233=1951`, `72⁴ mod 3233=1160`, `72⁸ mod 3233=672` y `72¹⁶ mod 3233=2197`. Como `17=16+1`, el cifrado es `(2197×72) mod 3233=3000`.

### Descifrar el primer bloque

Se descompone `2753=2048+512+128+64+1`. Las potencias de 3000 para esos exponentes dejan residuos `1282`, `916`, `611`, `733` y `3000`. Al multiplicarlos y reducir módulo 3233 se recupera `72`, el código ASCII de H. Los demás bloques recuperan 79, 76 y 65; el texto final es **HOLA**.

### Por qué coinciden las operaciones y qué falta para uso real

La relación `ed=1+kφ(n)` explica la recuperación para mensajes coprimos con n mediante el teorema de Euler; la justificación general para los enteros del rango utiliza el teorema chino del resto. Con un módulo tan pequeño, factorizar 3233 permite reconstruir la clave privada.

La guía, página 8, distingue **RSA-OAEP** para cifrado de **RSA-PSS** para firma. OAEP significa *Optimal Asymmetric Encryption Padding* y PSS, *Probabilistic Signature Scheme*. En cifrado híbrido, RSA puede proteger una clave de sesión y un cifrado autenticado protege el mensaje. La clave pública también debe asociarse de forma confiable a su propietario.

:::question Con n=55 y e=3, ¿qué da cifrar el entero 7 en el RSA elemental de repaso?
`7³ mod 55 = 343 mod 55 = 13`. Es una cuenta de la guía, página 9, que ilustra la operación modular; no un ejemplo de cifrado seguro para una aplicación.
:::
