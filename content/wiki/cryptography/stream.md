---
{"id":"crypto-stream","title":"Cifrado de flujo","slug":"stream","parent":"crypto-symmetric","type":"category","order":20,"related":["crypto-xor","crypto-ofb","crypto-block"],"sources":[{"id":"lecture-crypto-1","pages":[29]},{"id":"practice-1b","pages":[5]},{"id":"manual","pages":[11]}]}
---
## Secuencia cifrante

Un cifrado de flujo genera una secuencia pseudoaleatoria, o keystream, que se combina con los datos, habitualmente mediante XOR. Permite procesar unidades pequeñas a medida que llegan. La clase utiliza conversaciones telefónicas como contexto didáctico.

La secuencia se produce a partir de parámetros secretos y estado. No debe confundirse el mensaje con el flujo de clave: el receptor necesita reproducir el flujo correcto para recuperar el original.

El material menciona RC4 y la práctica añade SEAL y A5. Reutilizar una misma secuencia permite relacionar mensajes cifrados; por eso la inicialización y la gestión del estado son parte del análisis del esquema.
