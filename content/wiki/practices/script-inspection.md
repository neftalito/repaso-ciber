---
{"id":"practices-script-inspection","title":"Caso: reconstruir texto ofuscado sin ejecutar un script","slug":"script-inspection","parent":"practices","type":"practice","order":150,"related":["malware-obfuscation","malware-strings","crypto-encoding"],"sources":[{"id":"practice-guide","pages":[15]},{"id":"practice-questions","pages":[15]},{"id":"practice-solutions","pages":[20]}]}
---
## Fragmento del ejercicio

El objetivo es recuperar texto a partir de datos conocidos sin activar el script. El solucionario complementario, página 20, propone esta concatenación de códigos de caracteres: `Chr(73) & Chr(67) & Chr(123) & Chr(125)`. No es necesario ejecutar VBScript para resolverla; basta interpretar los valores decimales como indica el enunciado.

## Resolución por datos

| Decimal | Carácter |
| --- | --- |
| 73 | I |
| 67 | C |
| 123 | { |
| 125 | } |

La concatenación produce `IC{}`. La transformación explica cómo una cadena puede no aparecer literalmente en el archivo aunque se construya a partir de sus instrucciones.

## Límites de la interpretación

Este fragmento solo reconstruye texto. No demuestra qué hará el script completo con él ni que todos los códigos de caracteres se interpreten igual en cualquier entorno. Es importante mantener separados el cálculo de datos conocidos y la evaluación de código no confiable. No deben activarse otras expresiones del archivo para «ver el resultado».

:::question ¿Por qué obtener la cadena final no basta para declarar inocuo el script?
Porque solo se examinó una expresión. El resto del programa puede usar ese dato en acciones que no se analizaron; la conclusión debe limitarse al fragmento y al significado efectivamente reconstruido.
:::
