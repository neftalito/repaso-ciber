---
{"id":"crypto-dsa","title":"DSA","slug":"dsa","parent":"crypto-signature","type":"algorithm","order":10,"related":["crypto-rsa","crypto-elgamal","crypto-signature"],"sources":[{"id":"lecture-crypto-2","pages":[10]}],"permalink":"cryptography/signature/dsa"}
---
## Para qué sirve DSA

**DSA es un algoritmo de firma digital.** Permite producir una firma con una clave privada y verificarla con la información pública correspondiente. Su propósito es la firma y verificación de un mensaje, no ocultar su contenido mediante cifrado.

Cripto, parte 2, página 10, lo asocia al problema del logaritmo discreto y lo identifica expresamente como «solo firma digital».

## Qué distinción enseña

La criptografía de clave pública incluye mecanismos con funciones diferentes. En la misma página, RSA y ElGamal aparecen asociados a cifrado y firma, mientras que Diffie–Hellman permite acordar una clave. Que todos utilicen información pública y privada no hace intercambiables sus operaciones.

La diapositiva no desarrolla las ecuaciones ni el proceso de generación de firmas DSA. El esquema simplificado de RSA no sirve para deducir ese funcionamiento.

:::question ¿DSA permite cifrar un archivo para que solo el destinatario pueda leerlo?
No. En el temario, DSA cumple la función de firma digital. La confidencialidad del archivo requiere un mecanismo de cifrado.
:::
