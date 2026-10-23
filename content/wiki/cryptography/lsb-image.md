---
{"id":"crypto-lsb-image","title":"LSB en imágenes","slug":"lsb-image","parent":"crypto-lsb","type":"technique","order":10,"related":["crypto-lsb","crypto-steghide","crypto-encoding"],"sources":[{"id":"lecture-crypto-2","pages":[28]},{"id":"practice-1b","pages":[6]},{"id":"practice-solutions","pages":[8]}],"permalink":"cryptography/steganography/lsb/lsb-image"}
---
## Portador RGB

La explicación práctica presenta imágenes RGB, con tres bytes de componentes de color por píxel. Utilizar el bit menos significativo de componentes seleccionados permite repartir un mensaje a lo largo de los píxeles con cambios pequeños en sus valores.

## Capacidad didáctica

Si se utiliza exactamente un bit de cada componente R, G y B, cada píxel aporta tres bits de mensaje. En un modelo de ocho píxeles se dispondría de 24 bits, equivalentes a tres bytes. El cálculo presupone esa regla de uso; no es una garantía sobre cualquier archivo de imagen.

## Extracción y límites

Hay que conocer los canales elegidos, el orden de píxeles, el orden de bits y la longitud del mensaje. El solucionario destaca que sin esos datos no se deduce una única extracción.

La apariencia normal de una imagen no demuestra que esté vacía de datos adicionales. A la inversa, que una imagen sea grande o use RGB no prueba que contenga un mensaje.

:::question ¿Por qué no basta con leer los últimos bits de bytes arbitrarios del archivo?
Porque un archivo incluye estructura y metadatos además de componentes de píxeles. La técnica debe aplicarse a los valores y al recorrido definidos por el esquema.
:::
