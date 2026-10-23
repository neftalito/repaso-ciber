---
{"id":"crypto-md5","title":"MD5","slug":"md5","parent":"crypto-hash","type":"algorithm","order":10,"related":["crypto-collisions","crypto-sha1","crypto-password-hashes"],"sources":[{"id":"lecture-crypto-1","pages":[18,19,20]},{"id":"manual","pages":[8,9]}],"permalink":"cryptography/hash/md5"}
---
## Definición

MD5 es una función hash que produce un resumen de 128 bits. En notación hexadecimal completa ocupa `128/4 = 32` dígitos, porque cada dígito representa cuatro bits.

## Cómo leer un resultado

El resumen depende de los bytes exactos de entrada. Un cambio de mayúscula, de codificación o la incorporación de un salto de línea cambia el dato que se procesa. La clase utiliza comandos con `echo`; al reproducir un ejemplo debe tenerse en cuenta el salto de línea que normalmente agrega.

## Colisiones y límites

La clase muestra dos imágenes diferentes con el mismo MD5. El manual complementario señala que su resistencia a colisiones está comprometida. Por eso una coincidencia de MD5 no demuestra identidad matemática de archivos ni debe interpretarse como autenticación de su origen.

El método se estudia como parte del temario y de la lectura de identificadores históricos, sin recomendarlo como protección resistente a adversarios.

:::question ¿Un digest de 32 caracteres hexadecimales demuestra que se usó MD5?
No. Es compatible con su longitud, pero podría provenir de otra función o ser un valor truncado. El tamaño orienta; no identifica inequívocamente el algoritmo.
:::
