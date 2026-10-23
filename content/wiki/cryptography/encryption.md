---
{"id":"crypto-encryption","title":"Cifrado","slug":"encryption","parent":"cryptography","type":"category","order":20,"related":["crypto-encoding","fundamentals-cia","crypto-signature"],"sources":[{"id":"lecture-crypto-1","pages":[9,10,11,16]},{"id":"lecture-crypto-2","pages":[4,7]}]}
---
## Transformación con clave

El cifrado transforma texto plano en texto cifrado mediante un algoritmo y una clave. El descifrado recupera el original con la clave y los parámetros apropiados. Su objetivo característico es la confidencialidad.

Los [métodos clásicos](wiki:crypto-classical) permiten estudiar sustitución y transposición; la [criptografía moderna](wiki:crypto-modern) distingue esquemas simétricos y asimétricos. La existencia de un algoritmo conocido no equivale a poseer la clave que permite descifrar.

Cifrar no implica por sí mismo comprobar identidad o detectar toda modificación. Para estas preguntas se estudian [hashes](wiki:crypto-hash), [firmas](wiki:crypto-signature) y sus mecanismos de confianza.
