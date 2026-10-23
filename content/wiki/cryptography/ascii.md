---
{"id":"crypto-ascii","title":"ASCII","slug":"ascii","parent":"crypto-encoding","type":"concept","order":20,"related":["crypto-numbers","crypto-unicode"],"sources":[{"id":"lecture-crypto-1","pages":[8]},{"id":"practice-1a","pages":[1,2]},{"id":"practice-guide","pages":[3]}],"permalink":"cryptography/encoding/ascii"}
---
## Definición y funcionamiento

ASCII es un repertorio de caracteres definido con códigos de 7 bits: dispone de 128 valores. Incluye letras latinas básicas, dígitos, signos y caracteres de control. Un código puede almacenarse en un byte sin que por ello ASCII deje de ser de 7 bits.

## Ejemplo

La letra `C` tiene valor decimal `67`. Ese mismo valor se escribe `0x43` en hexadecimal y `01000011` en una representación de ocho bits. Cambiar la base no cambia el carácter ni cifra su contenido.

Para interpretar una secuencia hay que distinguir números escritos como texto de bytes: los dos caracteres `6` y `7` no son el mismo dato que el byte cuyo valor es 67.

## Límite

Un valor como 241 no pertenece al ASCII básico. Es necesario conocer otra codificación para interpretarlo; no corresponde adivinar un carácter por el nombre genérico «ASCII extendido».

:::question ¿Por qué 0x43 y 67 pueden representar la misma letra?
Son escrituras de un mismo número en bases diferentes. Una vez interpretado ese número como código ASCII, ambas remiten a C.
:::
