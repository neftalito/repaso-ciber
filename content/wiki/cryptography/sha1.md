---
{"id":"crypto-sha1","title":"SHA-1","slug":"sha1","parent":"crypto-hash","type":"algorithm","order":20,"related":["crypto-md5","crypto-sha2","crypto-collisions"],"sources":[{"id":"lecture-crypto-1","pages":[18]},{"id":"manual","pages":[8]},{"id":"practice-guide","pages":[4]}],"permalink":"cryptography/hash/sha1"}
---
## Qué produce SHA-1

**SHA-1 es una función hash** que produce un resumen de 160 bits. Cripto, parte 1, página 18, lo incluye entre las funciones del temario. Su representación hexadecimal completa tiene 40 dígitos, como precisa la guía complementaria de prácticas, página 4.

## Cómo interpretar el resultado

El resumen permite calcular y comparar valores a partir de una entrada. Para comprobar un candidato se aplica SHA-1 a sus bytes y se compara el resultado; no se descifra el resumen recibido.

La longitud de cuarenta dígitos hexadecimales es una pista compatible con SHA-1. No identifica por sí sola el algoritmo ni revela la entrada que lo originó: también podría tratarse de otra función o de un resultado truncado.

## Límite de seguridad

El manual complementario, página 8, advierte que SHA-1 no es adecuado para aplicaciones que dependen de la resistencia a colisiones. La longitud del resumen y la resistencia a encontrar entradas distintas con el mismo resultado son cuestiones diferentes.

:::question ¿Comparar el hash de un candidato equivale a descifrar?
No. Se calcula la función hacia adelante sobre ese candidato y se comprueba si coincide con el resumen esperado.
:::
