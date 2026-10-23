---
{"id":"crypto-ofb","title":"Modo OFB","slug":"ofb","parent":"crypto-block-modes","type":"technique","order":40,"related":["crypto-cfb","crypto-stream","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[25]},{"id":"manual","pages":[10,11]}],"permalink":"cryptography/encryption/modern/symmetric/block/ofb"}
---
## Secuencia desde un estado inicial

OFB, Output Feedback, es un modo de operación enumerado por la clase. El manual complementario explica que produce una secuencia cifrante a partir de un estado inicial.

## Diferencia conceptual

El esquema organiza la salida del cifrador para producir una secuencia que se combina con los datos. Esta descripción lo relaciona con el procesamiento de flujo, sin cambiar el hecho de que utiliza un cifrador de bloques como componente.

La gestión del estado de inicialización es central. El manual advierte que reutilizar el IV con la misma clave compromete la seguridad al repetir la secuencia cifrante. La operación no debe interpretarse como si cada mensaje empezara libremente en el mismo estado.

## Alcance

La cátedra lo nombra y el material complementario aporta esta comparación conceptual, sin desarrollar una implementación o variante concreta. No se deducen aquí parámetros omitidos.

:::question ¿Por qué repetir una secuencia cifrante merece atención aunque la clave siga secreta?
Porque al combinar mensajes con la misma secuencia pueden aparecer relaciones entre sus contenidos. El secreto de la clave no elimina los efectos de reutilizar el estado.
:::
