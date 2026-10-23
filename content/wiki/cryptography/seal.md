---
{"id":"crypto-seal","title":"SEAL","slug":"seal","parent":"crypto-stream","type":"algorithm","order":20,"related":["crypto-stream","crypto-xor"],"sources":[{"id":"practice-1b","pages":[5]}],"permalink":"cryptography/encryption/modern/symmetric/stream/seal"}
---
## Qué es SEAL

SEAL aparece como ejemplo de **cifrado simétrico de flujo** en la explicación de la Práctica 1, parte 2, página 5, junto con RC4 y A5.

## Datos y secuencia cifrante

El modelo presentado combina dos secuencias: una contiene el mensaje y otra es una secuencia pseudoaleatoria o *keystream*. Cada unidad del mensaje se combina con la unidad correspondiente de esa secuencia para producir el cifrado.

La práctica explica de forma general que una función puede generar el flujo a partir de una semilla y que el receptor necesita reproducirlo para descifrar. Esto permite comprender el papel del secreto; no describe la construcción interna específica de SEAL.

:::question ¿Representar el cifrado en hexadecimal permite descifrarlo?
No. Interpretar hexadecimal recupera los bytes representados. Para obtener el mensaje también hace falta la secuencia cifrante y el procedimiento correspondiente.
:::
