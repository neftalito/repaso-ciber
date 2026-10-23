---
{"id":"cryptography","title":"Criptografía","slug":"cryptography","parent":"wiki","type":"category","order":20,"related":["fundamentals-cia","practices-writeup"],"sources":[{"id":"lecture-crypto-1","pages":[6,9,16]},{"id":"lecture-crypto-2","pages":[10,18,26]}]}
---
## Mecanismos para proteger información

La **criptografía** estudia técnicas para proteger la información. En este recorrido conviene comenzar por el objetivo de cada mecanismo: cifrar restringe la lectura, un hash produce un resumen y una firma permite comprobar origen e integridad.

Cripto, parte 1, páginas 9 y 16, introduce el cifrado y las familias modernas. Cripto, parte 2, amplía el recorrido con acuerdos de claves, firmas y mecanismos de confianza. Relacionarlos con la [tríada CIA](wiki:fundamentals-cia) ayuda a identificar qué necesidad resuelve cada uno.

## Temas de esta sección

- [Cifrado](wiki:crypto-encryption): mensaje, algoritmo, clave y descifrado.
- [Criptografía clásica](wiki:crypto-classical): sustitución y transposición.
- [Criptografía moderna](wiki:crypto-modern): claves, hashes, firmas y confianza.
- [Operación XOR](wiki:crypto-xor): combinación de bits utilizada en distintos esquemas.

## Representar, establecer secretos y ocultar mensajes

La [codificación](wiki:crypto-encoding) permite representar datos y la [esteganografía](wiki:crypto-steganography) busca ocultar la existencia de un mensaje. Ambas conservan sus categorías independientes en la raíz de la Wiki.

Las páginas de [funciones hash](wiki:crypto-hash), [firmas digitales](wiki:crypto-signature) y [acuerdo de claves](wiki:crypto-key-agreement) profundizan sus objetivos específicos. Los ejemplos numéricos pequeños permiten entender los procedimientos; no describen configuraciones para aplicaciones reales.
