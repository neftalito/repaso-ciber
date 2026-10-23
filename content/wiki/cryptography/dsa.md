---
{"id":"crypto-dsa","title":"DSA","slug":"dsa","parent":"crypto-signature","type":"algorithm","order":10,"related":["crypto-rsa","crypto-elgamal","crypto-signature"],"sources":[{"id":"lecture-crypto-2","pages":[10]}]}
---
## Algoritmo de firma

DSA aparece en la clase asociado al logaritmo discreto y señalado expresamente como un algoritmo destinado solo a firma digital. Su papel es permitir firmar con una clave privada y verificar con información pública.

## Diferencia de propósito

Que DSA pertenezca a la criptografía de clave pública no implica que permita cifrar un archivo para un destinatario. La categoría matemática es más amplia que el servicio de confidencialidad. La diapositiva lo contrasta con ejemplos que también se utilizan para cifrado.

## Alcance del material

Las fuentes no desarrollan sus ecuaciones, parámetros ni generación de firmas. No se reconstruye una implementación desde la explicación simplificada de RSA: esa analogía no proporciona el funcionamiento de DSA.

:::question ¿Por qué DSA demuestra un límite de la frase «cifrar con una clave y descifrar con la otra»?
Porque su operación es firma y verificación. La relación entre clave pública y privada no convierte todos los mecanismos asimétricos en algoritmos de cifrado reversible de mensajes.
:::
