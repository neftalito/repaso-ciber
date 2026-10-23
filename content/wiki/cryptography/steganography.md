---
{"id":"crypto-steganography","title":"Esteganografía","slug":"steganography","parent":"wiki","type":"category","order":25,"related":["crypto-encryption","crypto-encoding","csirt-incidents"],"sources":[{"id":"lecture-crypto-2","pages":[26,27,28,29,30]},{"id":"practice-1b","pages":[5,6]}],"permalink":"cryptography/steganography"}
---
## Ocultar la existencia de un mensaje

La **esteganografía** inserta un mensaje en otro medio, llamado **portador**, para que su presencia pase inadvertida. Cripto, parte 2, página 26, presenta imágenes, audio y video como portadores posibles.

Su objetivo difiere del cifrado: ocultar que existe información adicional no equivale a volverla ilegible mediante una clave. Ambos mecanismos pueden combinarse.

## Estrategias, técnicas y herramientas

- [Esteganografía pura](wiki:crypto-stego-pure): busca que el mensaje pase inadvertido sin una clave.
- [Esteganografía de clave secreta](wiki:crypto-stego-keyed): incorpora una clave al procedimiento.
- [Técnica LSB](wiki:crypto-lsb): utiliza los bits menos significativos del portador.
- [Canales encubiertos de red](wiki:crypto-covert-channel): transmiten información mediante protocolos de red.
- [Steghide](wiki:crypto-steghide): herramienta estudiada para trabajar con información oculta.

La clase distingue las estrategias en la página 27 y presenta LSB y canales de red en las páginas 28–30. La explicación de la Práctica 1, parte 2, páginas 5–6, retoma el concepto y LSB. Al analizar un caso deben identificarse el portador, la regla de inserción y los datos necesarios para extraer el mensaje.
