---
{"id":"crypto-enigma","title":"Máquina Enigma","slug":"enigma","parent":"crypto-substitution","type":"algorithm","order":40,"related":["crypto-caesar","crypto-symmetric"],"sources":[{"id":"lecture-crypto-1","pages":[12]},{"id":"manual","pages":[8]}]}
---
## Definición

Enigma es una máquina electromecánica de sustitución polialfabética utilizada durante la Segunda Guerra Mundial. La clase la menciona entre los cifrados clásicos; el manual complementario explica el papel de sus rotores y configuraciones variables.

## Idea de funcionamiento

La transformación no consiste en aplicar a todas las letras un desplazamiento fijo como en César. El estado de los rotores participa en la sustitución, de modo que el contexto de procesamiento importa para reproducirla. Emisor y receptor necesitan configuraciones compatibles.

## Qué enseña el ejemplo

El diseño del mecanismo, la elección de configuraciones y su operación influyen en la seguridad. Una máquina más compleja no elimina automáticamente los problemas de gestión de claves.

Las fuentes citadas no desarrollan el cableado ni un recorrido eléctrico completo. Por eso no se presenta una simulación de rotores ni una tabla inventada de sustituciones.

:::question ¿Por qué Enigma no se clasifica como transposición?
Porque su mecanismo reemplaza símbolos mediante una transformación variable. El punto central no es reordenar las letras originales, sino sustituirlas según el estado de la máquina.
:::
