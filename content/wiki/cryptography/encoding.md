---
{"id":"crypto-encoding","title":"Codificación","slug":"encoding","parent":"wiki","type":"category","order":15,"related":["crypto-encryption","crypto-hash"],"sources":[{"id":"lecture-crypto-1","pages":[7,8]},{"id":"practice-1a","pages":[1,2,3,5,6,8]}],"permalink":"cryptography/encoding"}
---
## Representar información

La **codificación** asigna una representación a caracteres o datos para almacenarlos, transmitirlos e interpretarlos. Sus reglas no necesitan permanecer secretas. Desconocer una representación no la convierte en cifrado.

Cripto, parte 1, páginas 7–8, y la explicación de la Práctica 1, parte 1, páginas 1–3, presentan representaciones de caracteres, bases numéricas y formatos como Base64. No todos actúan en el mismo nivel: un código identifica caracteres, una base escribe números y Base64 representa bytes mediante caracteres imprimibles.

## Sistemas y representaciones de esta sección

- [Representaciones numéricas](wiki:crypto-numbers).
- [ASCII](wiki:crypto-ascii).
- [Unicode y formatos UTF](wiki:crypto-unicode).
- [Base64](wiki:crypto-base64).
- [Código Morse](wiki:crypto-morse).
- [Braille como representación](wiki:crypto-braille).
- [Índices alfabéticos A1Z26](wiki:crypto-alphabet-indices).
- [EBCDIC](wiki:crypto-ebcdic).

Ante una cadena desconocida conviene identificar su alfabeto, separadores y contexto antes de convertirla. El resultado puede ser texto, un archivo o datos que todavía están cifrados.
