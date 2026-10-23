---
{"id":"crypto-reversal","title":"Transposición por inversión","slug":"reversal","parent":"crypto-transposition","type":"technique","order":30,"related":["crypto-atbash","crypto-transposition"],"sources":[{"id":"practice-guide","pages":[3]},{"id":"practice-solutions","pages":[3]}],"permalink":"cryptography/encryption/classical/transposition/reversal"}
---
## Leer los caracteres en orden inverso

La transposición por inversión recorre una cadena desde el último carácter hasta el primero. Conserva los símbolos y cambia su posición: no reemplaza letras por otras ni aplica un desplazamiento al alfabeto.

El material complementario utiliza las cadenas invertidas como pista de reconocimiento. El desarrollo de esta variante y los ejemplos siguientes proceden de ese material.

## Ejemplos respaldados por las fuentes

La guía complementaria, página 3, muestra que `HOLA` invertido produce `ALOH`. Aplicar otra vez la misma operación recupera el orden original.

El solucionario de prácticas, página 3, presenta un caso donde también se invierte la posición de los signos:

```text
Entrada: }odnum_aloh{CI
Salida:  IC{hola_mundo}
```

Se recorre toda la cadena de derecha a izquierda. Por eso los signos y el guion bajo se conservan y cambian de posición junto con las letras.

## La unidad que se invierte importa

Invertir los caracteres del mensaje completo no es lo mismo que invertir solo el orden de sus palabras. La regla debe declararse antes de interpretar el resultado.

Una forma visible invertida puede orientar una hipótesis, pero no demuestra que sea la única transformación aplicada. El resultado todavía puede contener otra capa de representación o cifrado.

:::question ¿La inversión funciona como Atbash?
No. La inversión conserva las letras y cambia sus posiciones. Atbash sustituye cada letra mediante una correspondencia del alfabeto.
:::
