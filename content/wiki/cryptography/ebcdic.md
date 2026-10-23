---
{"id":"crypto-ebcdic","title":"EBCDIC en el mapa de codificaciones","slug":"ebcdic","parent":"crypto-encoding","type":"concept","order":80,"related":["crypto-ascii","crypto-unicode"],"sources":[{"id":"lecture-crypto-1","pages":[7]},{"id":"practice-1a","pages":[1]}],"permalink":"cryptography/encoding/ebcdic"}
---
## Qué representa EBCDIC

**EBCDIC es un sistema de codificación de caracteres.** Aparece entre los ejemplos de Cripto, parte 1, página 7, y de la explicación de la Práctica 1, parte 1, página 1.

Su inclusión permite reconocer que una secuencia de bytes necesita una convención para interpretarse como texto. No todo archivo textual debe leerse como ASCII o UTF-8, y obtener caracteres inesperados no demuestra que el archivo esté cifrado.

## Alcance de la explicación

Las fuentes lo enumeran sin desarrollar tablas ni variantes. Para convertir un archivo descrito como EBCDIC se necesita identificar la tabla de interpretación correspondiente; el nombre por sí solo no permite asignar aquí un valor numérico a cada letra.

:::question ¿Un visor que muestra caracteres demuestra que eligió la codificación correcta?
No. El visor interpreta los valores mediante una tabla. Que produzca símbolos visibles no confirma que correspondan al texto esperado.
:::
