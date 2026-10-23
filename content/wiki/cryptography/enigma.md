---
{"id":"crypto-enigma","title":"Máquina Enigma","slug":"enigma","parent":"crypto-substitution","type":"algorithm","order":20,"related":["crypto-caesar","crypto-symmetric"],"sources":[{"id":"lecture-crypto-1","pages":[12]},{"id":"manual","pages":[8]}],"permalink":"cryptography/encryption/classical/substitution/enigma"}
---
## Qué es Enigma

**Enigma** es una máquina electromecánica de sustitución polialfabética utilizada durante la Segunda Guerra Mundial. Cripto, parte 1, página 12, la menciona entre los ejemplos de criptografía clásica. El manual complementario, página 8, precisa el uso de rotores y configuraciones variables.

## Por qué no es un César fijo

César aplica el mismo desplazamiento a cada letra. En Enigma, la configuración variable de los rotores interviene en la sustitución: para reproducir la transformación no basta con elegir una distancia fija en el alfabeto.

El ejemplo permite comprender que la seguridad también depende de cómo se eligen y administran las configuraciones. El manual destaca la importancia conjunta del diseño, la gestión de claves y la operación de la máquina.

Las fuentes citadas no describen el cableado ni un recorrido eléctrico completo; su explicación se limita a reconocer el mecanismo y su lugar histórico.

:::question ¿Por qué Enigma se clasifica como sustitución?
Porque transforma los símbolos según la configuración del mecanismo. La operación central no consiste en reordenar las letras originales.
:::
