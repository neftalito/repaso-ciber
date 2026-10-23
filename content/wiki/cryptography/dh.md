---
{"id":"crypto-dh","title":"Diffie–Hellman","slug":"dh","parent":"crypto-key-agreement","type":"algorithm","order":10,"related":["crypto-signature","crypto-pki","crypto-symmetric"],"sources":[{"id":"lecture-crypto-2","pages":[10]},{"id":"practice-1b","pages":[4]},{"id":"practice-guide","pages":[6,7]},{"id":"practice-solutions","pages":[8]}],"aliases":["DH","intercambio de claves"],"permalink":"cryptography/key-agreement/dh"}
---
## Definición

Diffie–Hellman permite acordar un secreto compartido por un canal observable. Las partes intercambian valores públicos derivados de secretos privados; no envían directamente el secreto común.

## Mecanismo del ejercicio

Se acuerdan públicamente un primo `p` y un generador `g`. Una parte elige `a` y publica `A=g^a mod p`; la otra elige `b` y publica `B=g^b mod p`. Luego calculan `B^a mod p` y `A^b mod p`. Ambos resultados coinciden porque corresponden a `g^(ab) mod p`.

## Ejemplo original pequeño

Con `p=29`, `g=2`, `a=5` y `b=7`, los valores públicos son `A=3` y `B=12`. Cada parte calcula respectivamente `12^5 mod 29 = 12` y `3^7 mod 29 = 12`. El secreto compartido es 12.

Estos números permiten comprobar las cuentas a mano; no son parámetros para una comunicación real. Los valores `p`, `g`, A y B son públicos; a y b permanecen privados.

## Límite de autenticación

El complemento práctico explica que DH básico no evita por sí solo un intermediario que sustituya valores públicos y establezca un secreto con cada extremo. Las firmas o certificados pertenecen a la solución de autenticación del protocolo.

:::question ¿Por qué Diffie–Hellman no es una subclase de cifrado de mensajes?
Porque su salida central es un secreto compartido. El cifrado posterior del contenido requiere otro mecanismo y sus parámetros.
:::
