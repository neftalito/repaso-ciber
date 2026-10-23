---
{"id":"crypto-lsb-audio","title":"LSB en audio","slug":"lsb-audio","parent":"crypto-lsb","type":"technique","order":20,"related":["crypto-lsb-image","crypto-steganography"],"sources":[{"id":"lecture-crypto-2","pages":[29]},{"id":"practice-guide","pages":[7]}],"permalink":"cryptography/steganography/lsb/lsb-audio"}
---
## Usar las muestras de audio como portador

LSB en audio incorpora bits de un mensaje en posiciones de poco peso de los valores que representan las muestras. La página 29 de *Cripto, parte 2* relaciona esta idea con la digitalización del sonido: el portador es una secuencia de valores, no los caracteres del nombre del archivo.

## Leer el ejemplo de la clase

La diapositiva compara el último bit de ocho valores de audio antes y después de insertar el mensaje:

| Último bit original | Bit del mensaje | Último bit resultante |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 1 | 1 |
| 0 | 0 | 0 |
| 1 | 0 | 0 |
| 0 | 1 | 1 |
| 0 | 0 | 0 |
| 1 | 1 | 1 |

Solo se cambia un valor cuando su último bit no coincide con el bit que debe transportar. Para extraer la secuencia se leen los últimos bits resultantes en el orden indicado: `01100101`.

**Precisión sobre la fuente:** la tabla de la diapositiva rotula el mensaje como «A», pero los bits mostrados son `01100101`, que en ASCII corresponden a `e`. La secuencia y la etiqueta de esa tabla no coinciden; el mecanismo se comprende siguiendo los bits efectivamente mostrados.

## Qué falta para analizar un archivo real

Hay que conocer el formato, la representación de las muestras, los canales, el recorrido y la longitud del mensaje. La tabla explica el principio, pero no determina un extractor universal.

La guía complementaria también propone observar forma de onda y espectrograma. Esas observaciones pueden orientar el análisis, sin demostrar por sí solas que una anomalía sea un mensaje LSB.

:::question ¿Escuchar un audio sin notar cambios permite descartar esteganografía?
No. La técnica busca que los cambios pasen inadvertidos. Escuchar y extraer datos según un esquema definido son comprobaciones diferentes.
:::
