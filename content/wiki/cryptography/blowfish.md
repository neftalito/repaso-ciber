---
{"id":"crypto-blowfish","title":"Blowfish","slug":"blowfish","parent":"crypto-symmetric","type":"algorithm","order":50,"related":["crypto-symmetric","crypto-aes"],"sources":[{"id":"lecture-crypto-1","pages":[30]}]}
---
## Definición dentro del temario

Blowfish se incluye en la lista de ejemplos simétricos de la clase. Esa ubicación indica el modelo de clave compartida; no lo convierte en un formato de texto, una función hash ni un protocolo completo de comunicación.

## Lectura de un procedimiento

Un ejercicio puede presentar datos cifrados mediante una representación imprimible. En ese caso hay dos operaciones conceptuales: interpretar la representación para obtener bytes y aplicar el descifrado con el algoritmo y sus parámetros. Saber que aparece el nombre Blowfish no elimina ninguna de esas decisiones.

## Límite documental

La diapositiva no desarrolla una modalidad de operación ni los parámetros internos de Blowfish. Se conserva como ejemplo de algoritmo, sin inventar un cálculo o trasladar parámetros de AES por analogía.

:::question ¿Es correcto suponer que todo algoritmo simétrico utiliza los mismos tamaños de bloque y clave que AES?
No. Pertenecer a una familia no establece parámetros idénticos. Es necesario consultar la especificación del algoritmo y del esquema concreto, que esta fuente no desarrolla para Blowfish.
:::
