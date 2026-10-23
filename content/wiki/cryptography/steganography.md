---
{"id":"crypto-steganography","title":"Esteganografía","slug":"steganography","parent":"cryptography","type":"category","order":100,"related":["crypto-encryption","crypto-encoding","csirt-incidents"],"sources":[{"id":"lecture-crypto-2","pages":[26,27,28,29,30]},{"id":"practice-1b","pages":[5,6]}]}
---
## Ocultar la existencia

La esteganografía inserta un mensaje dentro de un portador para que su presencia pase inadvertida. El portador puede ser una imagen, audio, video u otro medio. Su objetivo se distingue del cifrado: ocultar que existe información adicional no equivale a volverla ilegible mediante una clave.

La clase distingue esteganografía pura y de clave secreta. También presenta LSB en imágenes y audio, además de canales encubiertos de red. Son ejes complementarios: el tipo de portador no determina por sí solo si el esquema utiliza una clave.

El análisis debe identificar el portador, la regla de inserción y los datos necesarios para extraer el mensaje. La ausencia de cambios perceptibles no demuestra ausencia de información oculta.
