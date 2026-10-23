---
{"id":"crypto-stego-pure","title":"Esteganografía pura","slug":"stego-pure","parent":"crypto-steganography","type":"technique","order":10,"related":["crypto-stego-keyed","crypto-lsb"],"sources":[{"id":"lecture-crypto-2","pages":[27]}]}
---
## Definición

La clase llama pura a la estrategia que confía en que el mensaje pase inadvertido. La protección depende de que terceros no reconozcan la presencia del dato oculto, sin una clave secreta como parámetro del esquema descrito.

## Consecuencia del modelo

Si un observador identifica el mecanismo de ocultamiento y dispone del portador, la estrategia por sí sola no aporta una barrera criptográfica basada en un secreto. Esto no implica que toda extracción sea trivial: puede faltar información sobre el formato, pero desconocerla no equivale a disponer de una clave protegida.

## Comparación

El contraste con la variante de clave secreta permite separar dos preguntas: «¿se detecta que hay un mensaje?» y «¿qué información hace falta para recuperarlo o leerlo?».

:::question ¿Qué supuesto deja de sostener la estrategia si un tercero detecta el ocultamiento?
Deja de sostenerse la expectativa de que el mensaje pase inadvertido. La técnica pura descrita no añade por sí misma un secreto criptográfico que preserve su lectura.
:::
