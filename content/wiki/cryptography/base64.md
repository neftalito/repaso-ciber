---
{"id":"crypto-base64","title":"Base64","slug":"base64","parent":"crypto-encoding","type":"technique","order":40,"related":["crypto-encryption","crypto-aes","crypto-gpg"],"sources":[{"id":"practice-1a","pages":[3,4,5,8]},{"id":"practice-guide","pages":[3,5]}]}
---
## Definición

Base64 representa bytes mediante un alfabeto de 64 símbolos imprimibles. Permite transportar archivos por canales pensados para texto. No utiliza una clave secreta y no aporta confidencialidad.

## Agrupamiento y relleno

Se agrupan tres bytes, equivalentes a 24 bits, en cuatro grupos de seis bits. Cada grupo selecciona un símbolo del alfabeto. Si faltan bytes al final, el formato con relleno completa la salida con `=`.

| Bytes finales de entrada | Símbolos de datos | Relleno |
| --- | --- | --- |
| 3 | 4 | Ninguno |
| 2 | 3 | `=` |
| 1 | 2 | `==` |

La página 5 de la explicación práctica invierte las cantidades de relleno en su redacción. La tabla anterior se obtiene del agrupamiento de 24 bits y se comprueba con estos ejemplos: `A` se representa como `QQ==`, `AB` como `QUI=` y `ABC` como `QUJD`.

## Capas de representación

Si un ejercicio entrega AES en Base64, primero se decodifica para recuperar los bytes cifrados; después se aplica el descifrado con la clave y el modo indicados. Decodificar no elimina el cifrado.

:::question ¿El símbolo = puede aparecer en cualquier posición?
En el formato con relleno explicado aquí, solo al final. Forma parte del relleno y no representa una clave ni un carácter secreto.
:::
