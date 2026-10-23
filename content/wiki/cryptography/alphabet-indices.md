---
{"id":"crypto-alphabet-indices","title":"Índices alfabéticos A1Z26","slug":"alphabet-indices","parent":"crypto-encoding","type":"technique","order":70,"related":["crypto-ascii","crypto-caesar"],"sources":[{"id":"practice-guide","pages":[3]}]}
---
## Definición

A1Z26 asocia las letras del alfabeto latino básico con sus posiciones: A con 1 y Z con 26. La guía complementaria lo presenta como una representación que puede aparecer en desafíos de codificación.

## Ejemplo original

Con la convención A=1, B=2 y así sucesivamente, `3-1-19-1` se interpreta como `CASA`. Los guiones separan valores; sin ellos, una cadena como `31` podría confundirse con un único número fuera del rango.

## Límites

La interpretación depende del alfabeto declarado y de los separadores. No debe confundirse con ASCII: el valor 3 de A1Z26 representa C, mientras que el código ASCII de C es 67. La correspondencia pública no proporciona secreto criptográfico.

:::question ¿Basta ver números del 1 al 26 para demostrar que se usa A1Z26?
No. Es una hipótesis compatible con el rango. Hay que comprobar que la conversión y los separadores producen un resultado coherente con el contexto.
:::
