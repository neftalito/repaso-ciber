---
{"id":"crypto-elliptic-curves","title":"Criptografía de curvas elípticas","slug":"elliptic-curves","parent":"crypto-asymmetric","type":"concept","order":30,"related":["crypto-key-agreement","crypto-signature","crypto-rsa"],"sources":[{"id":"lecture-crypto-2","pages":[10]},{"id":"manual","pages":[11]}],"aliases":["CCE","ECC"],"permalink":"cryptography/encryption/modern/asymmetric/elliptic-curves"}
---
## Ubicación conceptual

La clase menciona la criptografía de curvas elípticas, abreviada CCE, y la relaciona con el problema del logaritmo discreto en curvas elípticas. Es una familia de construcciones matemáticas de clave pública, no el nombre de un único modo de cifrado.

## Por qué importa la clasificación

Un mecanismo de clave pública puede servir para firma, cifrado o acuerdo de claves según el esquema. El manual complementario insiste en distinguir esos propósitos al nombrar ejemplos asimétricos. Por eso «usa curvas elípticas» no permite deducir automáticamente qué propiedad proporciona una aplicación.

## Alcance de las fuentes

No se desarrollan en estos materiales las operaciones de puntos ni los parámetros de una curva. La nota no incluye un cálculo ni una recomendación de parámetros: permite reconocer el concepto y evitar confundir una base matemática con un protocolo completo.

:::question ¿La etiqueta CCE indica por sí sola cómo descifrar un archivo?
No. Es necesario identificar el esquema concreto, la operación realizada y sus claves y parámetros. La familia matemática no determina ese procedimiento.
:::
