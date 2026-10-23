---
{"id":"crypto-substitution","title":"Cifrado por sustitución","slug":"substitution","parent":"crypto-classical","type":"category","order":10,"related":["crypto-transposition"],"sources":[{"id":"manual","pages":[7,8]},{"id":"practice-guide","pages":[3]}],"permalink":"cryptography/encryption/classical/substitution"}
---
## Reemplazar símbolos

Un **cifrado por sustitución** reemplaza los símbolos del mensaje según una correspondencia. En un esquema monoalfabético se conserva la misma correspondencia; en uno polialfabético puede variar según la posición o el estado del mecanismo.

El manual complementario, páginas 7–8, y la guía de prácticas, página 3, permiten distinguir estos métodos de la transposición: sustituir cambia los símbolos; transponer cambia su orden.

## Métodos de sustitución de esta sección

- [César y ROT](wiki:crypto-caesar): aplican un desplazamiento fijo en el alfabeto.
- [Enigma](wiki:crypto-enigma): utiliza una configuración variable de rotores.
- [Atbash](wiki:crypto-atbash): invierte la correspondencia del alfabeto.
- [Vigenère](wiki:crypto-vigenere): obtiene los desplazamientos de una clave repetida.

César y Enigma aparecen en las diapositivas oficiales; Atbash y Vigenère se desarrollan en los materiales complementarios. Una única pareja de mensajes no basta siempre para identificar qué algoritmo concreto produjo el resultado.
