---
{"id":"crypto-alphabet-indices","title":"Índices alfabéticos A1Z26","slug":"alphabet-indices","parent":"crypto-encoding","type":"technique","order":70,"related":["crypto-ascii","crypto-caesar"],"sources":[{"id":"practice-guide","pages":[3]}],"permalink":"cryptography/encoding/alphabet-indices"}
---
## Letras representadas por su posición

A1Z26 representa las letras del alfabeto latino básico mediante sus posiciones: A=1, B=2, hasta Z=26. Es una codificación pública, sin una clave secreta que proteja la lectura. La página 3 de la guía complementaria la presenta como una posibilidad en desafíos de codificación.

## Cómo interpretar una secuencia

1. Identificar qué números y separadores aparecen.
2. Comprobar la hipótesis de que los valores representan posiciones del alfabeto declarado.
3. Sustituir cada valor por su letra y conservar la separación que indique el ejercicio.
4. Verificar si el resultado es coherente con el contexto o requiere otra transformación.

Los separadores importan: no basta con reconocer dígitos si todavía se desconoce dónde termina cada valor o cada palabra.

## Diferencia con otros códigos

A1Z26 no es [ASCII](wiki:crypto-ascii). Ambos pueden expresarse con números, pero utilizan correspondencias diferentes. La guía recomienda examinar los rangos y el contexto antes de elegir una interpretación.

Esta técnica se apoya aquí en material complementario; no se presenta como un desarrollo de las diapositivas oficiales.

:::question ¿Basta ver números del 1 al 26 para demostrar que se usa A1Z26?
No. Es una hipótesis compatible con el rango. Hay que comprobar la separación de valores y verificar que la conversión produce un resultado coherente.
:::
