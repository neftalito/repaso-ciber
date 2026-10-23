---
{"id":"crypto-stego-keyed","title":"Esteganografía de clave secreta","slug":"stego-keyed","parent":"crypto-steganography","type":"technique","order":20,"related":["crypto-stego-pure","crypto-steghide","crypto-encryption"],"sources":[{"id":"lecture-crypto-2","pages":[27]},{"id":"practice-guide","pages":[7]}]}
---
## Definición

En la variante de clave secreta descrita por la clase, el algoritmo se parametriza con una clave y combina ocultamiento con cifrado del mensaje. El objetivo de pasar inadvertido y el de proteger la lectura corresponden a funciones distintas.

## Datos necesarios

Recuperar información requiere identificar el esquema, disponer del portador y conocer los parámetros necesarios, incluida la clave cuando corresponde. La guía muestra ejercicios de extracción de imágenes en los que puede solicitarse una contraseña.

No debe inferirse que toda técnica LSB o todo archivo con contenido oculto incluye cifrado. Esa propiedad pertenece al esquema concreto y debe estar evidenciada.

## Límite

La presencia de una contraseña tampoco demuestra que el portador resulte indetectable. Confidencialidad del contenido y discreción del canal son preguntas independientes.

:::question ¿Una clave de extracción garantiza que nadie puede detectar la existencia del mensaje?
No. Puede limitar su recuperación o lectura según el esquema, pero la detección del ocultamiento depende también del portador y del procedimiento de inserción.
:::
