---
{"id":"crypto-dh","title":"Diffie–Hellman","slug":"dh","parent":"crypto-key-agreement","type":"algorithm","order":10,"related":["crypto-signature","crypto-pki","crypto-symmetric"],"sources":[{"id":"lecture-crypto-2","pages":[10]},{"id":"practice-1b","pages":[4]},{"id":"practice-guide","pages":[6,7]},{"id":"practice-solutions","pages":[8]}],"aliases":["DH","intercambio de claves"],"permalink":"cryptography/key-agreement/dh"}
---
## Para qué sirve

Si Alicia y Bob quieren cifrar mensajes con una clave simétrica, ambos necesitan conocerla. Enviarla directamente por un canal que otros pueden observar expondría esa clave. **Diffie–Hellman (DH)** les permite acordar un **secreto compartido** sin transmitirlo: cada uno combina un valor público recibido del otro con un número que mantiene privado.

DH establece el secreto común; no cifra los mensajes.

## Qué valores intervienen

- `p` es un número primo y `g` es un generador: ambos se acuerdan públicamente. `g` sirve como base de las potencias.
- `a` es el número privado que elige Alicia al azar; `b` es el que elige Bob del mismo modo. Cada uno conserva el suyo en secreto.
- `A = g^a mod p` es el valor público de Alicia; `B = g^b mod p` es el de Bob. La expresión `mod p` indica que se toma el resto de la división por `p`.

## Cómo se obtiene el secreto

1. Alicia y Bob acuerdan los valores públicos `p` y `g`.
2. Alicia elige `a`, calcula `A = g^a mod p` y envía `A` a Bob.
3. Bob elige `b`, calcula `B = g^b mod p` y envía `B` a Alicia.
4. Alicia calcula `K = B^a mod p` con el valor recibido y su número privado. Bob calcula `K = A^b mod p` de la misma manera.

Los números privados `a` y `b` nunca se envían.

## Ejemplo de la cátedra

La explicación de la Práctica 1, parte 2, utiliza `p = 1999` y `g = 33`:

1. Alicia elige `a = 47` y envía `A = 33^47 mod 1999 = 1343`.
2. Bob elige `b = 117` y envía `B = 33^117 mod 1999 = 1991`.
3. Alicia recibe `1991` y calcula `K = 1991^47 mod 1999 = 1506`.
4. Bob recibe `1343` y calcula `K = 1343^117 mod 1999 = 1506`.

Ambos obtienen **`K = 1506`** sin haber enviado `a`, `b` ni `K`.

## Por qué ambos obtienen el mismo valor

Al reemplazar el valor público recibido por su fórmula, Alicia calcula `(g^b)^a mod p = g^(ab) mod p`. Bob calcula `(g^a)^b mod p = g^(ba) mod p`. Como `ab = ba`, los resultados coinciden.

## Seguridad y límite de autenticación

Quien observa el canal conoce `p`, `g`, `A` y `B`, pero no recibe `a` ni `b`. El material de la cátedra relaciona la seguridad del intercambio con la dificultad de recuperar esos exponentes privados mediante el **logaritmo discreto** cuando se usan parámetros adecuados. Los números pequeños del ejemplo sirven para entender el procedimiento, no para proteger una comunicación real.

Esto no demuestra la identidad de los participantes. En DH básico, un atacante que sustituye los valores públicos puede acordar un secreto distinto con Alicia y con Bob. Para evitar ese ataque de intermediario, el protocolo debe autenticar el intercambio.

:::question ¿Por qué Diffie–Hellman no es una subclase de cifrado de mensajes?
Porque acuerda un secreto compartido. Para cifrar los mensajes se necesita después un mecanismo de cifrado.
:::
