---
{"id":"crypto-morse","title":"Código Morse","slug":"morse","parent":"crypto-encoding","type":"technique","order":50,"related":["crypto-encoding","crypto-braille"],"sources":[{"id":"practice-1a","pages":[1,6]},{"id":"lecture-crypto-1","pages":[7]}]}
---
## Representación por señales

Morse representa caracteres mediante secuencias de señales cortas y largas, habitualmente escritas como puntos y rayas. Los separadores permiten reconocer dónde termina cada carácter. Es una codificación: conocer el sistema basta para interpretar las señales, sin una clave criptográfica.

## Ejemplo de lectura

La práctica muestra `-.-. .. -... . .-. ... . --.`. Separando por espacios se reconocen las letras `C I B E R S E G`. Mantener los límites entre grupos es parte del procedimiento; eliminar los separadores puede volver ambigua la lectura.

## Alcance

Reconocer Morse permite recuperar una representación del mensaje. No demuestra que el resultado sea el texto final: un ejercicio puede encadenar codificaciones o aplicar luego un cifrado.

:::question ¿Un mensaje incomprensible para quien desconoce Morse está cifrado?
No. La dificultad del observador no define el mecanismo. Morse utiliza una correspondencia pública entre señales y caracteres; no depende de un secreto para restringir su lectura.
:::
