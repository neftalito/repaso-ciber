---
{"id":"crypto-encoding","title":"Codificación","slug":"encoding","parent":"wiki","type":"category","order":15,"related":["crypto-encryption","crypto-hash"],"sources":[{"id":"lecture-crypto-1","pages":[7,8]},{"id":"practice-1a","pages":[1,2,3,5,6,8]}],"permalink":"cryptography/encoding"}
---
## Representar información

La codificación asigna una representación a caracteres o datos para almacenarlos, transmitirlos e interpretarlos. Sus reglas no necesitan permanecer secretas. Desconocer una representación no la convierte en cifrado.

Conviene separar tres niveles: [ASCII](wiki:crypto-ascii) y [Unicode](wiki:crypto-unicode) identifican caracteres; las [bases numéricas](wiki:crypto-numbers) escriben valores; [Base64](wiki:crypto-base64) representa bytes con caracteres imprimibles. Morse y Braille muestran que una representación también puede emplear señales o patrones de puntos.

Ante una cadena desconocida, identificar alfabeto, separadores y contexto antes de convertirla. El resultado puede ser texto, un archivo o datos que todavía están cifrados.
