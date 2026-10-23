---
{"id":"crypto-braille","title":"Braille como representación","slug":"braille","parent":"crypto-encoding","type":"concept","order":60,"related":["crypto-unicode","crypto-steganography"],"sources":[{"id":"practice-1a","pages":[1,6]},{"id":"practice-solutions","pages":[3]}]}
---
## Definición

Braille representa caracteres mediante patrones de puntos organizados en celdas. En los ejercicios puede aparecer reproducido gráficamente o mediante caracteres Unicode que muestran esos patrones. No constituye, por esa razón, un cifrado.

## Cómo interpretar un ejercicio

Se reconoce primero la disposición de las celdas y la convención de lectura. Después se relaciona cada patrón con su letra o signo, conservando separadores y reconstruyendo la frase. La identificación debe apoyarse en el sistema de representación adecuado; una forma parecida no basta para asignar una letra.

## Límite de la observación

Ver una imagen con puntos no demuestra que contenga datos ocultos. Un mensaje Braille visible y una imagen con información insertada por LSB corresponden a problemas diferentes: interpretar una representación y detectar esteganografía.

:::question ¿Por qué los caracteres Braille Unicode no son simplemente bytes ASCII?
Porque pertenecen a un repertorio distinto y su representación en bytes depende de la codificación Unicode utilizada. ASCII básico no incluye esas celdas.
:::
