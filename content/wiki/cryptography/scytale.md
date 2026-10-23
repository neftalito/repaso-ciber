---
{"id":"crypto-scytale","title":"Escítala","slug":"scytale","parent":"crypto-transposition","type":"technique","order":10,"related":["crypto-grid","crypto-columnar"],"sources":[{"id":"lecture-crypto-1","pages":[12]},{"id":"manual","pages":[7]}],"aliases":["Scytale"],"permalink":"cryptography/encryption/classical/transposition/scytale"}
---
## Definición

La escítala es un mecanismo histórico de transposición asociado con una tira enrollada alrededor de una vara. Se escribe siguiendo la disposición de la tira sobre el soporte; al desenrollarla, el orden visible ya no coincide con la lectura original.

## Papel del soporte

Un soporte de dimensiones compatibles permite reconstruir la alineación y recuperar el orden del mensaje. El grosor funciona como parte de la configuración compartida: cambiar la geometría altera qué caracteres quedan próximos durante la lectura.

## Relación con una tabla

Su idea puede estudiarse mediante una grilla: se fija una forma de colocar caracteres y una forma diferente de recorrerlos. No se reemplazan letras por otras. La equivalencia concreta depende de las dimensiones y del recorrido elegidos; las fuentes no fijan una única tabla numérica para todos los casos.

:::question ¿Qué se conserva al usar una escítala sin relleno?
Se conservan los caracteres y sus cantidades. Cambia su disposición, por lo que corresponde a transposición y no a sustitución.
:::
