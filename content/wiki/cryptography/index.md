---
{"id":"cryptography","title":"Criptografía","slug":"cryptography","parent":"wiki","type":"category","order":20,"related":["fundamentals-cia","practices-writeup"],"sources":[{"id":"lecture-crypto-1","pages":[6,9,16]},{"id":"lecture-crypto-2","pages":[10,18,26]}]}
---
## Recorrido de estudio

La criptografía estudia mecanismos para proteger información mediante transformaciones y claves. El recorrido comienza por distinguir representación, confidencialidad, integridad y autenticidad: no todas las transformaciones de datos resuelven el mismo problema.

La [codificación](wiki:crypto-encoding) permite representar datos; el [cifrado](wiki:crypto-encryption) busca restringir su lectura; las [funciones hash](wiki:crypto-hash) calculan resúmenes; las [firmas digitales](wiki:crypto-signature) permiten comprobar origen e integridad. El [acuerdo de claves](wiki:crypto-key-agreement) aborda cómo establecer un secreto compartido. La [esteganografía](wiki:crypto-steganography) intenta ocultar la existencia del mensaje.

Los métodos históricos se estudian para comprender sus mecanismos y limitaciones. Los ejemplos numéricos pequeños son ejercicios, no configuraciones para aplicaciones reales. Relacionar cada mecanismo con la [tríada CIA](wiki:fundamentals-cia) evita atribuirle propiedades que no proporciona.

## Categorías relacionadas

Codificación y Esteganografía se consultan como categorías independientes en la raíz de la wiki. Se relacionan con los temas de esta sección, pero representar información y ocultar su existencia no son subcategorías de cifrado.
