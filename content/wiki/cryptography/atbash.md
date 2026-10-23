---
{"id":"crypto-atbash","title":"Cifrado Atbash","slug":"atbash","parent":"crypto-substitution","type":"algorithm","order":30,"related":["crypto-reversal","crypto-caesar"],"sources":[{"id":"practice-guide","pages":[3]}],"permalink":"cryptography/encryption/classical/substitution/atbash"}
---
## Correspondencia invertida

**Atbash** sustituye cada letra por la situada en la posición opuesta del alfabeto. Con el alfabeto A–Z, la correspondencia empieza por A↔Z y B↔Y. Las posiciones del mensaje se conservan: cambia el símbolo que ocupa cada una.

La guía complementaria de prácticas, página 3, presenta esta regla para reconocer cifrados clásicos. Es contenido complementario; las diapositivas oficiales citadas para otros cifrados clásicos no lo desarrollan.

## Cómo se recupera el texto

La correspondencia funciona en ambos sentidos. Para descifrar se vuelve a sustituir cada letra por su opuesta en el mismo alfabeto. La segunda aplicación deshace la primera porque cada pareja es recíproca.

Esto permite distinguirlo de invertir el mensaje: la inversión cambia el orden de sus letras; Atbash cambia las letras según una regla de sustitución.

:::question ¿Atbash invierte el orden del mensaje?
No. Invierte la correspondencia del alfabeto y mantiene el orden de las posiciones del texto.
:::
