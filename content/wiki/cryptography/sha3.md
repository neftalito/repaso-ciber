---
{"id":"crypto-sha3","title":"Familia SHA-3","slug":"sha3","parent":"crypto-hash","type":"algorithm","order":40,"related":["crypto-sha2","crypto-collisions"],"sources":[{"id":"lecture-crypto-1","pages":[18]},{"id":"manual","pages":[8]}],"permalink":"cryptography/hash/sha3"}
---
## Ubicación conceptual

SHA-3 aparece en la clase como una familia de funciones hash, separada de SHA-2. Su uso conceptual sigue siendo calcular y comparar resúmenes; no transforma un archivo en un mensaje que pueda descifrarse con una clave.

## Precisión sobre la fuente

La diapositiva enumera SHA-3, pero repite a su lado la misma lista de nombres que emplea para SHA-2. Esa redacción no permite tratar los nombres SHA-224, SHA-256, SHA-384 y SHA-512 como si identificaran indistintamente ambas familias.

El manual complementario conserva la distinción entre las familias sin desarrollar sus mecanismos internos. Por eso esta nota no reproduce la lista inconsistente ni inventa una explicación de rondas o parámetros ausente del material.

## Caso de interpretación

Si dos herramientas informan únicamente «256 bits de salida», esa longitud no alcanza para concluir que ejecutaron la misma función. La identificación de familia y variante forma parte del procedimiento reproducible.

:::question ¿Es suficiente comparar la cantidad de dígitos para equiparar SHA-2 y SHA-3?
No. La longitud de salida no define la función que se aplicó. Se necesita el identificador concreto del algoritmo y la misma entrada en bytes.
:::
