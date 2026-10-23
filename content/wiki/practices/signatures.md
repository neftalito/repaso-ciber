---
{"id":"practices-signatures","title":"Caso: verificar una firma y su identidad","slug":"signatures","parent":"practices","type":"practice","order":80,"related":["crypto-signature","crypto-pki","fundamentals-cia"],"sources":[{"id":"practice-1b","pages":[3,6,7,8]},{"id":"practice-questions","pages":[7,8]},{"id":"practice-solutions","pages":[9,10]}]}
---
## Escenario

Se recibe `mensaje.txt` junto con una firma separada `mensaje.txt.sig` y una clave pública que afirma pertenecer al remitente esperado. La tarea es distinguir validación matemática, identidad y confidencialidad.

## Recorrido de verificación

1. Identificar la clave pública que debe verificarse, contrastando su huella por un medio confiable.
2. Preservar los bytes del mensaje y de la firma; cambiar espacios o saltos de línea puede cambiar lo firmado.
3. En un entorno preparado con material autorizado, la forma de la operación es `gpg --verify mensaje.txt.sig mensaje.txt`.
4. Registrar qué clave intervino, el resultado real y las advertencias de confianza.

El comando se presenta como procedimiento de estudio. Sin esos archivos no existe un resultado de verificación que se pueda afirmar, ni una flag deducible.

## Conclusión razonada

Una firma válida vincula los datos con la clave usada para verificar. Para atribuirlos al remitente hace falta confiar en que esa clave le corresponde. La firma por sí sola no vuelve secreto el texto. El esquema general se explica en [firma digital](wiki:crypto-signature).

La lista de comandos de práctica 1b, página 8, describe `--sign` como si también cifrara. Firmar y cifrar son operaciones distintas; no debe inferirse confidencialidad de la mera creación de una firma.

:::question ¿Qué falla si se confía en una clave solo por el nombre que muestra?
Ese nombre puede ser declarado por quien creó o publicó la clave. Si un tercero sustituyó la clave, la verificación podría ser matemática y válida para otra identidad; debe comprobarse la huella y su vínculo confiable.
:::
