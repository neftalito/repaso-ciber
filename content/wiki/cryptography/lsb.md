---
{"id":"crypto-lsb","title":"Técnica LSB","slug":"lsb","parent":"crypto-steganography","type":"technique","order":30,"related":["crypto-lsb-image","crypto-lsb-audio","crypto-numbers"],"sources":[{"id":"lecture-crypto-2","pages":[28,29]},{"id":"practice-1b","pages":[6]},{"id":"practice-solutions","pages":[8]}],"aliases":["least significant bit","bit menos significativo"],"permalink":"cryptography/steganography/lsb"}
---
## Bit menos significativo

LSB utiliza el bit de menor peso de valores digitales para transportar información. Cambiar ese bit modifica el valor en una unidad, lo que puede producir una alteración pequeña de una muestra o un componente de color. Pequeño no significa imposible de detectar.

## Ejemplo original

El byte `10110110` vale 182. Su último bit es 0; si se necesita insertar un 1, se cambia a `10110111`, cuyo valor es 183. Para extraerlo se lee el último bit según la regla acordada.

Para ocultar una secuencia de varios bits hay que fijar el orden de bytes, canales y bits, además de la longitud o condición de terminación. Sin esas convenciones, distintas extracciones pueden producir resultados diferentes.

## Portadores

La clase aplica la idea a imágenes RGB y a muestras de audio. La técnica comparte el principio de alterar bits de poco peso, pero la estructura del portador determina dónde se ubican los valores y cómo se recorren.

:::question ¿Insertar un bit en cada byte significa agregar un byte nuevo al archivo?
No en el modelo mostrado. Se modifica un bit de un valor existente. Eso no asegura que cualquier edición o conversión posterior conserve el mensaje.
:::
