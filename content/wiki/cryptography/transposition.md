---
{"id":"crypto-transposition","title":"Cifrado por transposición","slug":"transposition","parent":"crypto-classical","type":"category","order":20,"related":["crypto-substitution"],"sources":[{"id":"practice-1a","pages":[9]},{"id":"manual","pages":[7]},{"id":"practice-guide","pages":[3,4]}],"permalink":"cryptography/encryption/classical/transposition"}
---
## Cambiar el orden de los símbolos

Un **cifrado por transposición** reordena unidades del texto mediante un esquema definido. La explicación de la Práctica 1, parte 1, página 9, aclara que esas unidades pueden ser letras o grupos de letras.

Para recuperar el mensaje debe reconstruirse cómo se distribuyeron y leyeron sus símbolos. A diferencia de una sustitución, la operación central no reemplaza cada letra por otra.

## Métodos de transposición de esta sección

- [Escítala](wiki:crypto-scytale): relaciona el orden de lectura con un soporte físico.
- [Transposición columnar](wiki:crypto-columnar): escribe por filas y lee columnas en un orden acordado.
- [Transposición por inversión](wiki:crypto-reversal): lee el mensaje en el sentido contrario.
- [Transposición por grilla](wiki:crypto-grid): utiliza una tabla y reglas de llenado y lectura.
- [Rail fence](wiki:crypto-rail-fence): distribuye los símbolos en rieles siguiendo un zigzag.

El manual complementario, página 7, y la guía de prácticas, páginas 3–4, amplían estos procedimientos. Sin relleno ni otras transformaciones se conserva el recuento de cada letra. Eso orienta el reconocimiento, pero no identifica por sí solo el método utilizado.
