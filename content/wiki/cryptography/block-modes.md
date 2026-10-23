---
{"id":"crypto-block-modes","title":"Modos de operación","slug":"modes","parent":"crypto-block","type":"category","order":20,"aliases":["modos de cifrado por bloques"],"related":["crypto-block-algorithms","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[25,26,27,28]},{"id":"manual","pages":[10,11]}]}
---
## Aplicar un cifrador a un mensaje

Un **modo de operación** establece cómo se utiliza un cifrador de bloques para procesar datos. El algoritmo transforma cada bloque; el modo organiza esas operaciones y sus posibles dependencias. Por eso nombrar AES no basta para describir el procedimiento completo.

## Modos presentados en la materia

- [ECB](wiki:crypto-ecb): cifra los bloques de forma independiente con la misma clave.
- [CBC](wiki:crypto-cbc): encadena los bloques al combinar cada entrada con el cifrado anterior.
- [CFB](wiki:crypto-cfb): modo de realimentación del cifrado.
- [OFB](wiki:crypto-ofb): modo de realimentación de salida.

Cripto, parte 1, página 25, enumera los cuatro modos y desarrolla ECB y CBC en las páginas 26–28. El manual complementario, páginas 10–11, amplía sus diferencias. La configuración concreta también debe precisar los parámetros de inicialización y el tratamiento de los datos que correspondan al esquema.
