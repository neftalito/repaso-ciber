---
{"id":"crypto-atbash","title":"Cifrado Atbash","slug":"atbash","parent":"crypto-substitution","type":"algorithm","order":30,"related":["crypto-reversal","crypto-caesar"],"sources":[{"id":"practice-guide","pages":[3]}],"permalink":"cryptography/encryption/classical/substitution/atbash"}
---
## Correspondencia invertida

Atbash sustituye cada letra por la situada en la posición opuesta del alfabeto: A↔Z, B↔Y y así sucesivamente. La guía complementaria lo menciona para reconocer transformaciones clásicas.

## Ejemplo original

Tomando solo A–Z, `CASA` se transforma en `XZHZ`: C corresponde a X, A a Z y S a H. Aplicar la misma correspondencia a `XZHZ` recupera `CASA`.

## Diferencia con invertir el mensaje

Atbash invierte la correspondencia del alfabeto, no las posiciones del texto. La inversión de `CASA` es `ASAC`, una transposición; Atbash produce otros símbolos.

La regla fija puede ser reproducida por cualquiera que la conozca. Es útil como ejercicio de clasificación, sin aportar un secreto configurable en la convención descrita.

:::question ¿Por qué se recupera el mensaje aplicando Atbash dos veces?
Porque cada pareja de letras es simétrica: la letra que reemplaza a C es X y la que reemplaza a X es C. La segunda aplicación deshace la primera.
:::
