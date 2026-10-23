---
{"id":"crypto-modern","title":"Criptografía moderna","slug":"modern","parent":"cryptography","type":"category","order":30,"related":["crypto-hash","crypto-key-agreement","crypto-pgp"],"sources":[{"id":"lecture-crypto-1","pages":[14,16,21]},{"id":"lecture-crypto-2","pages":[3,4,10]}],"permalink":"cryptography/encryption/modern"}
---
## Clasificación por claves

Los sistemas modernos distinguen cifrado [simétrico](wiki:crypto-symmetric), que usa un secreto compartido, y [asimétrico](wiki:crypto-asymmetric), que emplea un par de claves relacionadas. La clasificación describe cómo se utilizan las claves; no determina por sí sola un protocolo completo.

Un mismo sistema puede combinar ambas familias: [PGP](wiki:crypto-pgp) es un ejemplo de composición híbrida. También utiliza hashes y firmas, que se estudian fuera del árbol de cifrado para conservar sus propósitos específicos.

El [acuerdo de claves](wiki:crypto-key-agreement) resuelve otro problema: establecer un secreto. Diffie–Hellman no debe interpretarse como un algoritmo para cifrar directamente un documento.
