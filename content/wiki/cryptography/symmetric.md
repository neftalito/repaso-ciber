---
{"id":"crypto-symmetric","title":"Criptografía simétrica","slug":"symmetric","parent":"crypto-modern","type":"category","order":10,"related":["crypto-asymmetric","crypto-key-agreement","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[22,23,24,30]},{"id":"practice-1b","pages":[5]}],"permalink":"cryptography/encryption/modern/symmetric"}
---
## Cifrar con un secreto compartido

La **criptografía simétrica** utiliza la misma clave secreta para cifrar y descifrar. El emisor y el receptor deben disponer de ella y protegerla frente a terceros. Cripto, parte 1, páginas 22–24, muestra el recorrido del mensaje en ambos extremos.

## Dos formas de procesar los datos

- [Cifrado por bloques](wiki:crypto-block): transforma unidades de tamaño fijo.
- [Cifrado de flujo](wiki:crypto-stream): combina los datos con una secuencia cifrante.

La distinción describe el mecanismo de procesamiento; no equivale a separar archivos de comunicaciones de red.

## El problema de administrar la clave

La página 30 destaca la velocidad del cifrado simétrico, pero también la necesidad de intercambiar el secreto de forma segura. Utilizar una misma clave en un grupo complica su administración: todas las personas que la conocen comparten la posibilidad de usarla. Elegir el algoritmo no resuelve por sí solo ese problema.
