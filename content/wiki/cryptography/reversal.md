---
{"id":"crypto-reversal","title":"Transposición por inversión","slug":"reversal","parent":"crypto-transposition","type":"technique","order":30,"related":["crypto-atbash","crypto-transposition"],"sources":[{"id":"practice-guide","pages":[3]},{"id":"practice-solutions","pages":[3]}],"permalink":"cryptography/encryption/classical/transposition/reversal"}
---
## Definición

Invertir una cadena consiste en leer sus caracteres desde el último hasta el primero. Es una transposición porque conserva cada símbolo y modifica su posición. El material complementario utiliza cadenas invertidas como una pista de reconocimiento.

## Ejemplo original

`LUNA` pasa a `ANUL`. Si se aplica la inversión de nuevo, se recupera `LUNA`. La operación no exige cambiar el alfabeto ni sumar desplazamientos.

En una resolución debe declararse la unidad de inversión. Invertir los caracteres de todo el mensaje no es lo mismo que invertir solo el orden de las palabras; la convención del ejemplo opera sobre caracteres.

## Límite

La presencia de signos de apertura y cierre intercambiados puede sugerir una inversión, pero no demuestra que sea la única transformación aplicada.

:::question ¿Invertir CASA y aplicar Atbash a CASA son el mismo procedimiento?
No. La inversión produce ASAC y mantiene las letras originales; Atbash las sustituye mediante una tabla de correspondencias.
:::
