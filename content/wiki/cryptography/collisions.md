---
{"id":"crypto-collisions","title":"Colisiones y preimágenes","slug":"collisions","parent":"crypto-hash","type":"concept","order":50,"related":["crypto-md5","crypto-signature","crypto-password-hashes"],"sources":[{"id":"lecture-crypto-1","pages":[19,20]},{"id":"manual","pages":[9]}],"permalink":"cryptography/hash/collisions"}
---
## Tres problemas diferentes

Una colisión ocurre cuando dos entradas distintas producen el mismo digest. No es lo mismo que encontrar una entrada a partir de un digest dado ni que reemplazar un documento concreto por otro con el mismo hash.

| Problema | Dato fijado al comenzar | Objetivo |
| --- | --- | --- |
| Preimagen | Un digest | Encontrar una entrada que lo produzca |
| Segunda preimagen | Un mensaje | Encontrar otro distinto con el mismo digest |
| Colisión | Ningún mensaje concreto | Encontrar dos entradas distintas con igual digest |

## Por qué existen

Hay más entradas posibles que salidas de longitud fija. En consecuencia, varias entradas deben compartir una salida. La propiedad de seguridad relevante es que resulte impracticable encontrar ciertas coincidencias deliberadamente, no que sean matemáticamente imposibles.

## Consecuencia

La clase muestra imágenes distintas con igual MD5. En firmas, una colisión manipulable puede comprometer la vinculación entre documento y resumen firmado. Esto no significa que toda coincidencia casual permita reemplazar cualquier documento ya elegido.

:::question ¿Dos archivos con hashes distintos pueden tener exactamente los mismos bytes?
No, si se aplicó la misma función completa a las mismas condiciones de entrada. El determinismo exige el mismo resultado para bytes idénticos.
:::
