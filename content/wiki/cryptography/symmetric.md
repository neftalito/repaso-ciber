---
{"id":"crypto-symmetric","title":"Criptografía simétrica","slug":"symmetric","parent":"crypto-modern","type":"category","order":10,"related":["crypto-asymmetric","crypto-key-agreement","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[22,23,24,30]},{"id":"practice-1b","pages":[5]}]}
---
## Secreto compartido

En un esquema simétrico, emisor y receptor utilizan la misma clave secreta para cifrar y descifrar. La clave debe estar disponible para las partes autorizadas y protegida frente a terceros.

Los cifradores [por bloques](wiki:crypto-block) transforman unidades de tamaño fijo; los [de flujo](wiki:crypto-stream) combinan los datos con una secuencia cifrante. Esta distinción no equivale a «archivos frente a red»: describe el mecanismo de procesamiento.

La clase destaca el rendimiento y el problema de distribuir y administrar claves. Compartir una clave entre muchas personas dificulta limitar el alcance de una exposición o retirar el acceso de un participante. Los ejemplos didácticos no sustituyen esa gestión.
