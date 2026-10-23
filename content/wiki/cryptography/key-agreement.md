---
{"id":"crypto-key-agreement","title":"Acuerdo de claves","slug":"key-agreement","parent":"crypto-modern","type":"category","order":30,"related":["crypto-symmetric","crypto-signature","crypto-pki"],"sources":[{"id":"lecture-crypto-2","pages":[10]},{"id":"practice-1b","pages":[4]},{"id":"practice-guide","pages":[6]}],"permalink":"cryptography/key-agreement"}
---
## Establecer un secreto

Un acuerdo de claves permite que dos partes obtengan un secreto compartido a partir de sus datos privados y de intercambios públicos. Su propósito es resolver parte del problema de establecimiento de secretos del cifrado simétrico.

[Diffie–Hellman](wiki:crypto-dh) es el mecanismo desarrollado en la práctica. No cifra por sí mismo el texto de una conversación ni demuestra automáticamente quién está al otro extremo.

La autenticación de participantes requiere otro mecanismo dentro del protocolo. Separar acuerdo, cifrado y firma permite explicar qué resuelve cada etapa de una comunicación protegida.
