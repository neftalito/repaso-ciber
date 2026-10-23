---
{"id":"practices-classical","title":"Caso: distinguir sustitución y transposición","slug":"classical","parent":"practices","type":"practice","order":30,"related":["crypto-encryption","practices-writeup"],"sources":[{"id":"practice-1a","pages":[8,9]},{"id":"practice-questions","pages":[3]},{"id":"practice-solutions","pages":[3,4]},{"id":"practice-guide","pages":[3,4]}]}
---
## Qué se busca distinguir

El objetivo es reconocer si una transformación reemplaza símbolos o cambia su posición. La práctica 1, parte 1, páginas 8–9, introduce César y transposición. Los mensajes resueltos aquí proceden del solucionario complementario, páginas 3–4.

## Dos entradas, dos hipótesis

En el ejercicio de César se indica desplazamiento +3 y se recibe `LF{fulswr}`. Se resta 3 a cada letra del alfabeto latino, conservando signos: `L` vuelve a `I`, `F` a `C` y `fulswr` a `cripto`. El resultado es `IC{cripto}`.

En el caso de inversión, `}odnum_aloh{CI` se lee en orden contrario y produce `IC{hola_mundo}`. No se reemplazan símbolos: cambia su posición. La comparación muestra por qué sustitución y transposición requieren procedimientos diferentes.

## Reconstrucción columnar

El caso de clave `CAT` utiliza el cifrado `HKSUTSILEYBE` y orden alfabético de columnas `A-C-T`. Hay 12 caracteres y tres columnas: cada columna contiene cuatro. Para descifrar, primero se recuperan las columnas y después se vuelve al orden de las filas.

1. Separar `HKSU`, `TSIL` y `EYBE` según el orden de lectura `A-C-T`.
2. Reubicar las columnas en el orden original `C-A-T`: `TSIL`, `HKSU`, `EYBE`.
3. Leer por filas: `THE`, `SKY`, `ISB`, `LUE`; se recupera `THESKYISBLUE`.

La ausencia de espacios es parte de la representación del ejercicio. No deben agregarse reglas de relleno que el caso no utiliza.

:::question ¿Por qué conservar el conjunto de letras orienta hacia transposición sin probar un algoritmo único?
Porque reordenar no cambia las letras, pero distintos esquemas pueden producir permutaciones compatibles con un ejemplo. La clave, las dimensiones y el orden de lectura permiten elegir y verificar el procedimiento concreto.
:::
