---
{"id":"practices-encoding","title":"Caso: reconocer y decodificar representaciones","slug":"encoding","parent":"practices","type":"practice","order":20,"related":["crypto-encoding","practices-writeup"],"sources":[{"id":"practice-1a","pages":[1,2,3,4,5]},{"id":"practice-questions","pages":[2]},{"id":"practice-solutions","pages":[2]},{"id":"practice-guide","pages":[2,3]}]}
---
## Datos y objetivo

Los ejercicios de representación piden recuperar texto y justificar qué reglas se aplicaron. La práctica 1, parte 1, páginas 1–5, introduce ASCII, bases numéricas y Base64. Las entradas autocontenidas de esta nota proceden del solucionario complementario, página 2, salvo las comprobaciones de capas y relleno.

Por ejemplo, la secuencia decimal `73 67 123 65 125` corresponde a `IC{A}`: 123 y 125 son llaves, no letras. Debe declararse la base antes de interpretar los números.

## Resolver y comprobar

1. Reconocer la representación y declarar la regla que se va a probar.
2. Recuperar los valores o bytes y después interpretar su contenido.
3. Volver a codificar cuando sea posible para comprobar que el resultado reproduce la entrada.

La cadena `SUN7YmFzZTY0X25vX2VzX2NpZnJhZG99` se interpreta como Base64. La comprobación local sobre estos datos de texto es:

```python
import base64
encoded = 'SUN7YmFzZTY0X25vX2VzX2NpZnJhZG99'
plain = base64.b64decode(encoded, validate=True)
assert plain == b'IC{base64_no_es_cifrado}'
assert base64.b64encode(plain).decode() == encoded
```

El resultado se obtiene con reglas públicas, sin clave secreta. La distinción conceptual se desarrolla en [codificación](wiki:crypto-encoding).

## Capas y relleno

Un resultado decodificado puede ser otra representación. Como ampliación didáctica, en el ejemplo `NDk0Mw==`, Base64 recupera el texto `4943`; interpretarlo como bytes hexadecimales produce `IC`. Deben documentarse ambas transformaciones, sin llamar cifrado a la primera capa.

La diapositiva de práctica 1a, página 5, invierte el número de signos de relleno para cada resto. La comprobación de bytes permite corregirlo: `I` se representa como `SQ==` y `IC` como `SUM=`. Un byte residual requiere `==`; dos requieren `=`.

:::question ¿Por qué volver a codificar el resultado ayuda a verificar una solución?
Porque comprueba que se recuperó una secuencia de bytes compatible con la entrada bajo las reglas elegidas. No prueba por sí sola que esos bytes sean el mensaje final: pueden contener otra capa que deba interpretarse.
:::
