---
{"id":"crypto-aes","title":"AES","slug":"aes","parent":"crypto-block-algorithms","type":"algorithm","order":30,"related":["crypto-ecb","crypto-cbc","crypto-base64"],"sources":[{"id":"lecture-crypto-1","pages":[25,26,27,28,30]},{"id":"manual","pages":[10]},{"id":"practice-guide","pages":[5]}],"permalink":"cryptography/encryption/modern/symmetric/block/aes"}
---
## Para qué sirve

**AES** cifra datos con una clave secreta compartida. Es un cifrador **por bloques**: transforma unidades de tamaño fijo y permite recuperar cada una mediante el descifrado con la clave correspondiente. La cátedra lo utiliza para mostrar que el modo de procesar esos bloques también influye en lo que revela el resultado.

## Bloque, clave y modo son datos distintos

El manual complementario, página 10, precisa los tamaños de AES:

| Dato | Qué indica |
| --- | --- |
| Bloque de 128 bits | AES transforma unidades de 16 bytes |
| Clave de 128, 192 o 256 bits | Longitud del secreto utilizado por el algoritmo |
| Modo de operación | Cómo se aplica el cifrador a los bloques de un mensaje |

Elegir AES-256 cambia la longitud de la clave; el tamaño de bloque sigue siendo de 128 bits.

## Qué cambia entre ECB y CBC

Cripto, parte 1, páginas 25–28, desarrolla la diferencia:

1. **ECB** divide el mensaje en bloques y cifra cada uno por separado con la misma clave. Si se repite un bloque de entrada, se repite su bloque cifrado. Esa igualdad puede conservar patrones visibles en los datos.
2. **CBC** combina cada bloque de texto claro mediante XOR con el bloque cifrado anterior antes de aplicar AES. Así introduce una dependencia entre bloques. El manual complementario, página 10, aclara que el primero utiliza un vector de inicialización o IV.

AES es el algoritmo empleado en ambos casos. ECB y CBC describen formas diferentes de aplicarlo, no algoritmos que cambien la longitud de su clave.

## Cómo leer un ejercicio de AES

La guía complementaria de prácticas, página 5, describe el caso **AES-128-ECB con salida en Base64**. Para interpretarlo:

1. Base64 indica cómo están representados los bytes cifrados; primero se decodifica esa representación.
2. AES-128 indica el algoritmo y una clave de 16 bytes.
3. ECB indica cómo se cifraron los bloques.
4. Para recuperar el mensaje también debe conocerse el relleno, si se utilizó.

Decodificar Base64 y descifrar AES son operaciones diferentes. Las fuentes citadas desarrollan esta lectura del esquema y los modos, sin explicar las rondas internas de AES.

:::question ¿AES-256 cifra bloques de 256 bits?
No. El número identifica la longitud de la clave. Cada bloque de AES sigue teniendo 128 bits, equivalentes a 16 bytes.
:::
