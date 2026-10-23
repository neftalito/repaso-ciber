---
{"id":"crypto-sha2","title":"Familia SHA-2","slug":"sha2","parent":"crypto-hash","type":"algorithm","order":30,"related":["crypto-sha3","crypto-hash","malware-static"],"sources":[{"id":"lecture-crypto-1","pages":[18]},{"id":"practice-guide","pages":[4]},{"id":"theory-solutions","pages":[9]}],"aliases":["SHA-224","SHA-256","SHA-384","SHA-512"],"permalink":"cryptography/hash/sha2"}
---
## Una familia de funciones hash

**SHA-2** agrupa las variantes SHA-224, SHA-256, SHA-384 y SHA-512 enumeradas en Cripto, parte 1, página 18. Cada una transforma los datos de entrada en un resumen de longitud definida. El número del nombre indica bits de salida, no una clave de cifrado.

| Variante | Bits de resumen | Dígitos hexadecimales |
| --- | --- | --- |
| SHA-224 | 224 | 56 |
| SHA-256 | 256 | 64 |
| SHA-384 | 384 | 96 |
| SHA-512 | 512 | 128 |

Cada dígito hexadecimal representa cuatro bits; la tabla expresa el resumen completo, sin prefijos ni separadores.

## Qué permite comprobar un resumen

Para comparar dos archivos se aplica la misma función a los bytes de cada uno. Si los resúmenes son diferentes, las entradas también lo son: una misma entrada procesada con la misma función da siempre el mismo resultado.

Esa comparación informa sobre la coincidencia de los datos, pero no determina por sí sola quién los produjo ni si son maliciosos. La guía complementaria de prácticas, página 4, recuerda además que un hash igual no es una demostración matemática de entradas idénticas, debido a la posibilidad de colisiones.

:::question ¿SHA-512 significa cifrar con una clave de 512 bits?
No. Es una función hash de la familia SHA-2 y el número corresponde a los bits del resumen. No hay una clave de descifrado para recuperar la entrada.
:::
