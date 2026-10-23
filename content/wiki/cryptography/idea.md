---
{"id":"crypto-idea","title":"IDEA","slug":"idea","parent":"crypto-block-algorithms","type":"algorithm","order":50,"related":["crypto-symmetric","crypto-aes"],"sources":[{"id":"lecture-crypto-1","pages":[30]}],"permalink":"cryptography/encryption/modern/symmetric/idea"}
---
## Qué es IDEA

IDEA es uno de los algoritmos **simétricos** enumerados en Cripto, parte 1, página 30. En ese modelo, el emisor y el receptor dependen de un secreto compartido para cifrar y descifrar.

## El problema del secreto compartido

La diapositiva advierte sobre el uso de una misma clave en un grupo. Cifrar permite restringir quién puede leer, pero conocer el secreto compartido no distingue por sí solo a una persona de las demás que también lo conocen. La elección del algoritmo y la administración de las claves son aspectos diferentes del sistema.

La fuente menciona IDEA sin explicar su construcción interna. Esta página conserva ese alcance: permite reconocer el ejemplo y comprender el problema de gestión que acompaña a la familia simétrica.

:::question ¿Una clave compartida por todo un grupo identifica al autor individual de cada mensaje?
No por sí sola. Cada integrante conoce el mismo secreto; esa condición no permite distinguir cuál de ellos produjo un mensaje.
:::
