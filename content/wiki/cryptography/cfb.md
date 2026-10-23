---
{"id":"crypto-cfb","title":"Modo CFB","slug":"cfb","parent":"crypto-block","type":"technique","order":60,"related":["crypto-ofb","crypto-cbc","crypto-aes"],"sources":[{"id":"lecture-crypto-1","pages":[25]},{"id":"manual","pages":[10]}]}
---
## Realimentación del cifrado

CFB, Cipher Feedback, es un modo de operación de cifradores por bloques. La clase lo enumera y el manual complementario lo caracteriza por realimentar el cifrado para trabajar con unidades menores.

## Idea que lo distingue

La realimentación utiliza datos cifrados del procesamiento para continuar la transformación. Por eso no se describe como una colección de bloques independientes al estilo ECB. El cifrador de bloques sigue siendo una pieza del esquema aunque la interfaz permita procesar fragmentos menores.

El manual señala la necesidad de un IV y de tratar correctamente sus parámetros. Nombrar CFB sin especificar la configuración no permite reconstruir un mensaje ni asumir que coincide con cualquier otra variante de realimentación.

## Alcance de las fuentes

Las fuentes utilizadas no desarrollan tamaños de segmento ni una secuencia numérica completa de CFB. Se conserva esa limitación y no se inventa un ejemplo de implementación.

:::question ¿CFB y AES son dos algoritmos alternativos del mismo nivel?
No. AES es un cifrador por bloques; CFB es un modo que organiza el uso de un cifrador. Son decisiones complementarias de un esquema.
:::
