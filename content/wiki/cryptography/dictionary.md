---
{"id":"crypto-dictionary","title":"Comprobación por diccionario","slug":"dictionary","parent":"crypto-password-hashes","type":"technique","order":10,"related":["crypto-salt","crypto-password-hashes"],"sources":[{"id":"practice-guide","pages":[4]}],"permalink":"cryptography/hash/password-hashes/dictionary"}
---
## Definición

La comprobación por diccionario calcula el hash de una lista de candidatos y compara cada resultado con una referencia. En la guía se utiliza para estudiar ejercicios de contraseñas; se diferencia de recorrer indiscriminadamente todas las combinaciones posibles.

## Procedimiento conceptual

Se identifica el algoritmo, la codificación y cualquier transformación adicional del ejercicio. Para cada candidato se reconstruye la entrada exacta, se calcula el digest y se compara con la referencia. Si el esquema incluye una sal, también se incorpora en la posición indicada.

## Límite de la conclusión

Que ningún candidato coincida demuestra únicamente que la lista y el procedimiento probados no encontraron una coincidencia. Puede faltar la contraseña o puede haberse interpretado mal el esquema. No demuestra que exista una operación de descifrado pendiente.

:::question ¿Por qué agregar un salto de línea al candidato puede invalidar la comparación?
Porque modifica la secuencia de bytes procesada. Aunque la palabra visible parezca igual, ya no es la misma entrada de la función.
:::
