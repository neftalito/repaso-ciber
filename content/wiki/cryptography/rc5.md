---
{"id":"crypto-rc5","title":"RC5","slug":"rc5","parent":"crypto-block-algorithms","type":"algorithm","order":40,"related":["crypto-symmetric","crypto-aes"],"sources":[{"id":"lecture-crypto-1","pages":[30]}],"permalink":"cryptography/encryption/modern/symmetric/rc5"}
---
## Ejemplo de algoritmo simétrico

RC5 es uno de los nombres que la clase incorpora al enumerar algoritmos simétricos. La característica común desarrollada allí es la utilización de un secreto compartido para cifrar y descifrar.

## Distinguir algoritmo y administración

Elegir un algoritmo responde cómo se transforman los datos, pero no cómo se entrega la clave a las personas autorizadas. Por ejemplo, si varias personas comparten acceso, conocer el nombre RC5 no determina qué hacer al retirar el permiso de una de ellas. El problema de gestión sigue siendo parte del sistema.

## Alcance de la fuente

La diapositiva no desarrolla rondas, longitudes ni un modo concreto de RC5. Su incorporación aquí permite reconocer el ejemplo y situarlo frente a la familia asimétrica; no proporciona parámetros de implementación ni una recomendación de uso.

:::question ¿Qué información falta para reproducir un descifrado aunque se sepa que se usó RC5?
Faltan la clave y los parámetros concretos del esquema. La etiqueta del algoritmo no contiene esos valores ni explica cómo se compartieron.
:::
