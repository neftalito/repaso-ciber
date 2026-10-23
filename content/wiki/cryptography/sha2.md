---
{"id":"crypto-sha2","title":"Familia SHA-2","slug":"sha2","parent":"crypto-hash","type":"algorithm","order":30,"related":["crypto-sha3","crypto-hash","malware-static"],"sources":[{"id":"lecture-crypto-1","pages":[18]},{"id":"practice-guide","pages":[4]},{"id":"theory-solutions","pages":[9]}],"aliases":["SHA-224","SHA-256","SHA-384","SHA-512"]}
---
## Familia de variantes

SHA-2 agrupa las variantes SHA-224, SHA-256, SHA-384 y SHA-512 enumeradas en la clase. Cada una tiene una longitud de salida definida. El número no es una longitud de clave de cifrado.

| Variante | Bits de resumen | Dígitos hexadecimales |
| --- | --- | --- |
| SHA-224 | 224 | 56 |
| SHA-256 | 256 | 64 |
| SHA-384 | 384 | 96 |
| SHA-512 | 512 | 128 |

## Ejemplo de razonamiento

Si una herramienta calcula SHA-256 sobre dos versiones de un archivo y obtiene resúmenes diferentes, las entradas procesadas no fueron idénticas. Esa diferencia no permite inferir cuál versión es maliciosa ni quién la modificó.

La igualdad de resúmenes debe interpretarse con las limitaciones generales de los hashes. Una referencia esperada también necesita un origen confiable.

:::question ¿SHA-512 significa cifrar con una clave de 512 bits?
No. SHA-512 es una función hash de la familia SHA-2 y el número corresponde a los bits de su resumen. No existe una clave de descifrado del hash.
:::
