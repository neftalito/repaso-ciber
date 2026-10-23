---
{"id":"practices-dh","title":"Caso: comprobar el secreto de Diffie-Hellman","slug":"dh","parent":"practices","type":"practice","order":70,"related":["crypto-signature","crypto-pki","fundamentals-mitm"],"sources":[{"id":"practice-1b","pages":[4]},{"id":"practice-solutions","pages":[8]},{"id":"practice-guide","pages":[6,7]},{"id":"dh-rsa-guide","pages":[3,4,9]},{"id":"exam-questions","pages":[11]},{"id":"exam-solutions","pages":[7]}]}
---
## Datos del ejemplo oficial

La práctica 1, parte 2, página 4, propone `p=1999`, `g=33`, con secretos de Alicia `a=47` y de Bob `b=117`. El objetivo es comprobar que ambos pueden obtener el mismo secreto sin transmitirlo directamente.

## Qué hace cada participante

1. Ambos conocen los parámetros públicos p y g.
2. Cada uno calcula un valor público con su propio exponente secreto y lo envía al otro.
3. Cada uno eleva el valor recibido a su propio exponente, siempre módulo p. Los dos resultados deben coincidir.

Los exponentes a y b se muestran para comprobar el ejercicio, pero no se transmiten en el intercambio.

## Secuencia calculada

| Paso | Operación | Resultado |
| --- | --- | --- |
| Valor público de Alicia | 33^47 mod 1999 | 1343 |
| Valor público de Bob | 33^117 mod 1999 | 1991 |
| Cálculo de Alicia | 1991^47 mod 1999 | 1506 |
| Cálculo de Bob | 1343^117 mod 1999 | 1506 |

La igualdad se comprueba con aritmética modular:

```python
p, g, a, b = 1999, 33, 47, 117
public_a, public_b = pow(g, a, p), pow(g, b, p)
assert (public_a, public_b) == (1343, 1991)
assert pow(public_b, a, p) == pow(public_a, b, p) == 1506
```

Alicia calcula `(g^b)^a mod p` y Bob calcula `(g^a)^b mod p`. Ambos obtienen `g^(a·b) mod p` porque a·b y b·a son iguales. La igualdad explica el resultado compartido de la tabla.

## Interpretación y límites

Se acordó un secreto; no se cifró un mensaje con esta tabla. El esquema básico tampoco autentica por sí solo a los participantes. Un protocolo debe resolver esa identidad para evitar sustituciones de valores por un intermediario. Los tamaños pequeños tienen finalidad didáctica.

:::question ¿Por qué obtener el mismo número no demuestra que se habló con la persona esperada?
Porque el cálculo muestra consistencia matemática del intercambio, pero no vincula los valores públicos con identidades. La autenticación necesita evidencia o mecanismos adicionales.
:::

## Repaso adicional de la guía de Diffie–Hellman

:::question Con p=23, g=5, a=6 y b=15, ¿qué envían Alice y Bob y qué secreto obtienen?
Alice envía `A=8` y Bob `B=19`. Alice calcula `19^6 mod 23=2`; Bob calcula `8^15 mod 23=2`. Ninguno transmite directamente ese secreto ni su exponente privado.
:::

:::question Si se observan p, g, A y B, ¿qué dificultad busca un intercambio con parámetros seguros?
La guía relaciona la dificultad de recuperar un exponente privado con el logaritmo discreto. Recuperar ese exponente permitiría calcular el secreto; el observador no lo recibe directamente. El ejemplo con módulo 23 es fácil de resolver por prueba y no representa seguridad real. También hace falta autenticar el intercambio para impedir que un intermediario sustituya valores.
:::
