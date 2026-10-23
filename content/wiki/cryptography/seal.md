---
{"id":"crypto-seal","title":"SEAL","slug":"seal","parent":"crypto-stream","type":"algorithm","order":20,"related":["crypto-stream","crypto-xor"],"sources":[{"id":"practice-1b","pages":[5]}],"permalink":"cryptography/encryption/modern/symmetric/stream/seal"}
---
## Ejemplo de cifrado de flujo

La explicación práctica menciona SEAL entre los ejemplos de algoritmos de flujo. El mecanismo general de esa categoría produce una secuencia pseudoaleatoria que se combina con los datos conforme al esquema.

## Flujo de datos y flujo de clave

Son dos entradas con roles distintos. El flujo de datos contiene el mensaje; la secuencia cifrante permite transformarlo y recuperarlo al aplicar la combinación correspondiente. No debe asumirse que el texto cifrado sea una lista de códigos de caracteres simplemente cambiados de base.

La práctica explica la generación de flujo de forma conceptual mediante una función y una semilla. No proporciona en esas páginas el algoritmo interno específico de SEAL.

## Alcance

Se conserva la clasificación documentada, sin atribuir tamaños o estados concretos ni presentar una secuencia de salida inventada.

:::question ¿Qué diferencia existe entre decodificar una salida hexadecimal y descifrar un mensaje de flujo?
Decodificar reconstruye los bytes representados. Descifrar requiere además la secuencia y el procedimiento apropiados para recuperar el mensaje.
:::
