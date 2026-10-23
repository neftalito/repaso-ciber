---
{"id":"crypto-blowfish","title":"Blowfish","slug":"blowfish","parent":"crypto-block-algorithms","type":"algorithm","order":60,"related":["crypto-symmetric","crypto-aes"],"sources":[{"id":"lecture-crypto-1","pages":[30]}],"permalink":"cryptography/encryption/modern/symmetric/blowfish"}
---
## Qué es Blowfish

Blowfish es uno de los algoritmos **simétricos** enumerados en Cripto, parte 1, página 30. Su lugar en esa lista permite reconocer el modelo de clave compartida: las partes necesitan el secreto correspondiente para cifrar y descifrar.

## Qué aporta conocer el nombre

Identificar el algoritmo ayuda a entender qué transformación se utilizó, pero no proporciona la clave ni resuelve cómo compartirla. La misma diapositiva destaca que la administración y el intercambio seguro de claves son problemas del cifrado simétrico.

La fuente menciona Blowfish sin desarrollar su construcción ni sus parámetros. Para esta página, su función es reconocer un ejemplo de la familia; no se trasladan por analogía los tamaños o modos de AES.

:::question ¿Dos algoritmos simétricos tienen necesariamente los mismos parámetros?
No. La clasificación describe el uso de un secreto compartido, no establece tamaños ni configuraciones idénticos para todos sus integrantes.
:::
