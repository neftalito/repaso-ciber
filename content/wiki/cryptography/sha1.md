---
{"id":"crypto-sha1","title":"SHA-1","slug":"sha1","parent":"crypto-hash","type":"algorithm","order":20,"related":["crypto-md5","crypto-sha2","crypto-collisions"],"sources":[{"id":"lecture-crypto-1","pages":[18]},{"id":"manual","pages":[8]},{"id":"practice-guide","pages":[4]}]}
---
## Definición

SHA-1 produce resúmenes de 160 bits, equivalentes a 40 dígitos hexadecimales cuando se escriben completos y sin prefijos. Es una función hash: se calcula y compara, no se descifra.

## Interpretación de una identificación

Encontrar cuarenta símbolos hexadecimales es una pista compatible con SHA-1. Para confirmar el algoritmo debe conocerse el procedimiento que produjo el valor o comprobarse una entrada disponible. La apariencia no permite deducir qué archivo o contraseña lo originó.

## Limitación

El manual complementario advierte que SHA-1 no es adecuado cuando se requiere resistencia a colisiones. La longitud de salida no basta para comparar la seguridad de funciones diferentes: también importan las debilidades del diseño y de los ataques conocidos que la fuente menciona.

:::question ¿Por qué comparar un candidato con SHA-1 no constituye descifrado?
Se calcula la función hacia adelante sobre el candidato y se compara el resumen. No se aplica una operación inversa al digest recibido.
:::
