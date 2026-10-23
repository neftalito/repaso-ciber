---
{"id":"crypto-substitution","title":"Cifrado por sustitución","slug":"substitution","parent":"crypto-classical","type":"category","order":10,"related":["crypto-transposition"],"sources":[{"id":"manual","pages":[7,8]},{"id":"practice-guide","pages":[3]}],"permalink":"cryptography/encryption/classical/substitution"}
---
## Qué se transforma

Una sustitución reemplaza símbolos del mensaje según una correspondencia. En un esquema monoalfabético se mantiene la misma correspondencia durante el mensaje; una sustitución polialfabética permite que cambie según la posición o el estado.

[César](wiki:crypto-caesar) usa un desplazamiento fijo. [Vigenère](wiki:crypto-vigenere) obtiene desplazamientos de una clave repetida. [Enigma](wiki:crypto-enigma) ilustra una transformación que cambia con la configuración de rotores. [Atbash](wiki:crypto-atbash) invierte la correspondencia del alfabeto.

La diferencia con la transposición está en el mecanismo: sustituir cambia los símbolos; transponer cambia sus posiciones. Observar una única pareja de mensajes no basta siempre para identificar el algoritmo exacto.
