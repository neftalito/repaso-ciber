---
{"id":"crypto-lsb-audio","title":"LSB en audio","slug":"lsb-audio","parent":"crypto-lsb","type":"technique","order":20,"related":["crypto-lsb-image","crypto-steganography"],"sources":[{"id":"lecture-crypto-2","pages":[29]},{"id":"practice-guide","pages":[7]}],"permalink":"cryptography/steganography/lsb/lsb-audio"}
---
## Muestras como portador

La clase presenta LSB en audio como otra aplicación del ocultamiento en datos digitales. La idea es utilizar bits de poco peso de muestras para transportar información sin que el cambio resulte evidente al escuchar.

## Qué debe conocerse

Para interpretar una extracción hay que identificar cómo se representan las muestras y qué recorrido utiliza el esquema. Un archivo de audio no es una lista indiferenciada de caracteres; interpretar su contenido exige reconocer formato y canales.

La guía complementaria también propone observar forma de onda, canales y espectrograma. Esas observaciones pueden orientar una investigación, pero no equivalen a demostrar que toda anomalía sea un mensaje LSB.

## Alcance

Las fuentes no fijan un algoritmo universal de extracción ni una muestra concreta para esta nota. No se inventa un mensaje oculto a partir del nombre de un archivo o de su sonido aparente.

:::question ¿Escuchar un audio sin notar cambios permite descartar esteganografía?
No. La finalidad de la técnica es que los cambios pasen inadvertidos. La escucha es una observación parcial y debe distinguirse de una extracción técnica verificada.
:::
