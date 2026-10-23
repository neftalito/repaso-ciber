---
{"id":"crypto-password-hashes","title":"Hashes y comprobación de contraseñas","slug":"password-hashes","parent":"crypto-hash","type":"concept","order":60,"related":["crypto-dictionary","crypto-salt","crypto-hash"],"sources":[{"id":"lecture-crypto-1","pages":[19]},{"id":"manual","pages":[9]},{"id":"practice-guide","pages":[4]}],"permalink":"cryptography/hash/password-hashes"}
---
## Comparar candidatos

Un hash de contraseña permite contrastar una entrada propuesta con una referencia calculada. No almacena una versión cifrada que se recupere mediante descifrado. Si un candidato produce el valor esperado bajo el mismo procedimiento, satisface esa comprobación.

## Por qué la velocidad importa

El cálculo rápido es útil para procesar archivos, pero también permite probar muchas contraseñas candidatas. La clase señala esa tensión: ser una función hash no elimina la posibilidad de fuerza bruta o diccionario.

La guía complementaria presenta ejercicios con concatenación de sal y contraseña. Hay que reproducir exactamente el orden y los bytes; cambiar el esquema altera lo que se compara.

## Alcance

El material diferencia hashes rápidos de archivo de mecanismos costosos de tratamiento de contraseñas. Esta nota explica el problema académico, sin proponer una configuración para un sistema productivo.

:::question ¿Una contraseña hallada mediante diccionario prueba que el hash fue invertido matemáticamente?
No. Se enumeraron candidatos y se calcularon sus resúmenes hasta encontrar una coincidencia. El procedimiento usa la función en su dirección normal.
:::
