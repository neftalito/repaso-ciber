---
{"id":"crypto-stream","title":"Cifrado de flujo","slug":"stream","parent":"crypto-symmetric","type":"category","order":20,"related":["crypto-xor","crypto-ofb","crypto-block"],"sources":[{"id":"lecture-crypto-1","pages":[29]},{"id":"practice-1b","pages":[5]},{"id":"manual","pages":[11]}],"permalink":"cryptography/encryption/modern/symmetric/stream"}
---
## Combinar datos con una secuencia cifrante

Un **cifrado de flujo** genera una secuencia pseudoaleatoria, llamada **secuencia cifrante** o *keystream*, y la combina con los datos del mensaje, habitualmente mediante XOR. Permite procesar unidades pequeñas a medida que llegan.

Cripto, parte 1, página 29, utiliza conversaciones telefónicas como contexto y presenta RC4. La explicación de la Práctica 1, parte 2, página 5, añade SEAL y A5.

## Algoritmos de flujo mencionados

- [RC4](wiki:crypto-rc4).
- [SEAL](wiki:crypto-seal).
- [A5](wiki:crypto-a5).

El mensaje y la secuencia cifrante cumplen roles distintos. El receptor necesita reproducir el flujo correcto para recuperar el original. El manual complementario, página 11, amplía el riesgo de reutilizar una misma secuencia: puede revelar relaciones entre los mensajes cifrados.
