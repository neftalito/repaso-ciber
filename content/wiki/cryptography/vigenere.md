---
{"id":"crypto-vigenere","title":"Cifrado Vigenère","slug":"vigenere","parent":"crypto-substitution","type":"algorithm","order":30,"related":["crypto-caesar","crypto-columnar"],"sources":[{"id":"practice-guide","pages":[3]},{"id":"practice-solutions","pages":[4]}]}
---
## Definición y procedencia

Vigenère utiliza una secuencia de desplazamientos alfabéticos derivada de una clave. Se desarrolla en los ejercicios complementarios, que amplían los ejemplos clásicos de las diapositivas.

## Ejemplo original

Con A=0 hasta Z=25, se repite la clave `SOL` para cubrir `CASA`: `SOLS`. Se suman posiciones módulo 26: C+S→U, A+O→O, S+L→D y A+S→S. El resultado es `UODS`.

Para descifrar se resta, en cada posición, el desplazamiento de la letra correspondiente de la clave. La clave no es un simple orden de columnas: decide qué sustitución se aplica a cada letra.

## Limitación

La variación de desplazamientos lo distingue de César, pero sigue siendo un método clásico. No debe inferirse seguridad moderna solamente porque no se observe una única correspondencia entre letras.

:::question ¿Qué ocurre si la clave repetida tiene una sola letra?
Se usa el mismo desplazamiento en todo el mensaje. Bajo las convenciones indicadas, el procedimiento se reduce a un César con ese desplazamiento.
:::
