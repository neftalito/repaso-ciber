---
{"id":"crypto-ecb","title":"Modo ECB","slug":"ecb","parent":"crypto-block","type":"technique","order":40,"related":["crypto-aes","crypto-cbc"],"sources":[{"id":"lecture-crypto-1","pages":[25,26,28]},{"id":"manual","pages":[10]}]}
---
## Cifrado independiente

ECB, Electronic Codebook, aplica el cifrador a cada bloque de manera independiente bajo la misma clave: `Cᵢ = E(K, Pᵢ)`. No utiliza un bloque previo para variar la transformación.

## Ejemplo conceptual

Para tres bloques `P, Q, P`, el resultado tiene la forma `E(K,P), E(K,Q), E(K,P)`. El primer y tercer bloque cifrados coinciden porque sus entradas y la clave coinciden. El observador aprende una relación de repetición aunque desconozca el contenido de P.

## Limitación

En datos estructurados, las repeticiones pueden revelar patrones. La clase lo ilustra con imágenes: el cifrado puede ocultar valores y aun así dejar reconocibles formas. No implica que todos los píxeles se conserven; se conserva una relación entre bloques iguales.

:::question ¿Una clave desconocida evita la filtración de repeticiones en ECB?
No. La igualdad de bloques cifrados puede observarse sin descifrar. La filtración deriva del procesamiento determinista e independiente bajo la misma clave.
:::
