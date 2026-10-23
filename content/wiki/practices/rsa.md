---
{"id":"practices-rsa","title":"Caso: verificar un cálculo RSA","slug":"rsa","parent":"practices","type":"practice","order":60,"related":["crypto-encryption","crypto-encoding","practices-writeup"],"sources":[{"id":"practice-1b","pages":[1,2]},{"id":"practice-questions","pages":[6]},{"id":"practice-solutions","pages":[7]},{"id":"practice-guide","pages":[5,6]}]}
---
## Objetivo y parámetros

Se aplica el procedimiento simplificado de RSA del material a enteros pequeños, explicando cada transformación. Para el caso del solucionario complementario, página 7, con `p=61`, `q=53`, `e=17` y `C=2790`, se obtiene `n=3233` y `φ(n)=3120`.

## Resolver con la relación inversa

La resolución separa cuatro cálculos:

1. Calcular el módulo: `n = 61·53 = 3233`.
2. Calcular `φ(n) = (61−1)(53−1) = 3120`.
3. Obtener el exponente privado d que satisface `e·d ≡ 1 (mod φ(n))`. Aquí `d=2753`, pues `17·2753 = 46801 = 15·3120 + 1`.
4. Descifrar el entero mediante `M = C^d mod n` y comprobar que volver a cifrarlo produce el C recibido.

El código reúne esos pasos y verifica los resultados:

```python
n = 61 * 53
phi = (61 - 1) * (53 - 1)
d = pow(17, -1, phi)
message = pow(2790, d, n)
assert (n, phi, d, message) == (3233, 3120, 2753, 65)
assert pow(message, 17, n) == 2790
```

El entero 65 se interpreta como `A` solo si la representación acordada es compatible, por ejemplo ASCII sin otro esquema. Recuperar un entero y conocer su interpretación son pasos distintos.

## Corregir la inconsistencia del ejemplo oficial

La página 2 de práctica 1b usa `p=524287`, `q=131071`, `e=65537`, `n=68718821377` y `φ(n)=68718166020`. En la generación aparece `d=59397641569`, mientras la línea de descifrado usa `56692460753`. La comprobación del inverso determina que el segundo es correcto:

```python
n = 524287 * 131071
phi = (524287 - 1) * (131071 - 1)
d = pow(65537, -1, phi)
assert d == 56692460753
assert (65537 * d) % phi == 1
assert pow(21543768249, d, n) == 1752132705
assert int.from_bytes(b'hola', 'big') == 1752132705
```

Así se conserva el ejemplo y se identifica exactamente el dato corregido. Son cálculos de estudio con parámetros pequeños y RSA simplificado, sin trasladarlos a una aplicación real.

:::question ¿Qué comprobación detecta un exponente privado equivocado antes de intentar interpretar texto?
Verificar que e·d módulo φ(n) sea 1, dentro de este procedimiento de generación. Después se comprueba el ciclo de cifrado y descifrado; no debe elegirse un número solo porque figura en una línea del documento.
:::
