---
{"id":"crypto-rc5","title":"RC5","slug":"rc5","parent":"crypto-block-algorithms","type":"algorithm","order":40,"related":["crypto-symmetric","crypto-aes"],"sources":[{"id":"lecture-crypto-1","pages":[30]}],"permalink":"cryptography/encryption/modern/symmetric/rc5"}
---
## Qué es RC5

RC5 aparece entre los algoritmos **simétricos** de Cripto, parte 1, página 30. La característica común explicada allí es que emisor y receptor dependen de un secreto compartido para cifrar y descifrar.

## Algoritmo y distribución de claves

Saber qué algoritmo transforma los datos no explica cómo la clave llega a las personas autorizadas. La diapositiva destaca precisamente esa dificultad: se necesita un medio seguro para intercambiarla, y administrar una misma clave entre muchas personas plantea problemas de escala.

La fuente enumera RC5 sin desarrollar sus parámetros ni su construcción interna. Su mención sirve para reconocer el ejemplo y relacionarlo con el problema de administración de secretos de la familia simétrica.

:::question ¿Conocer el nombre RC5 basta para descifrar un mensaje?
No. También hacen falta la clave y los parámetros del esquema utilizado. El nombre del algoritmo no proporciona esos datos.
:::
