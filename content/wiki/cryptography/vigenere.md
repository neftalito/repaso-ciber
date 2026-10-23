---
{"id":"crypto-vigenere","title":"Cifrado Vigenère","slug":"vigenere","parent":"crypto-substitution","type":"algorithm","order":40,"related":["crypto-caesar","crypto-columnar"],"sources":[{"id":"practice-guide","pages":[3]},{"id":"practice-solutions","pages":[4]}],"permalink":"cryptography/encryption/classical/substitution/vigenere"}
---
## Una clave que determina los desplazamientos

**Vigenère** sustituye letras mediante una secuencia de desplazamientos alfabéticos derivada de una clave. Mientras César usa un desplazamiento fijo, aquí cada posición utiliza el de la letra correspondiente de la clave repetida.

La guía de prácticas, página 3, y el solucionario, página 4, lo presentan como contenido complementario. Este desarrollo no se atribuye a las diapositivas oficiales de la cátedra.

## Ejemplo complementario: descifrar RIJVS

El solucionario utiliza el texto cifrado `RIJVS` y la clave `KEY`. Para trabajar con las cinco posiciones, se repite la clave hasta obtener `KEYKE`.

Con el alfabeto A=0, B=1, …, Z=25, descifrar consiste en restar el índice de la clave al del cifrado y conservar el resto módulo 26:

| Cifrado | Clave | Resta módulo 26 | Letra recuperada |
| --- | --- | --- | --- |
| R | K | 17 - 10 = 7 | H |
| I | E | 8 - 4 = 4 | E |
| J | Y | 9 - 24 ≡ 11 | L |
| V | K | 21 - 10 = 11 | L |
| S | E | 18 - 4 = 14 | O |

El resultado es **`HELLO`**. En la tercera posición, la resta negativa se lleva al rango 0–25 mediante el retorno circular del alfabeto.

## Qué función cumple la clave

Para cifrar se suman esos desplazamientos en cada posición; para descifrar se restan. La clave decide qué sustitución corresponde a cada letra, no el orden de lectura de columnas. Por eso Vigenère es sustitución y no transposición.

:::question ¿Qué ocurre si la clave repetida tiene una sola letra?
Se utiliza el mismo desplazamiento en todas las posiciones. Bajo la convención A–Z indicada, el procedimiento se reduce a un César con ese desplazamiento.
:::
