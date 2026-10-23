---
{"id":"crypto-hash","title":"Funciones hash","slug":"hash","parent":"crypto-modern","type":"category","order":40,"related":["crypto-signature","malware-static","malware-ioc"],"sources":[{"id":"lecture-crypto-1","pages":[17,18,19,20]},{"id":"manual","pages":[8,9]}],"permalink":"cryptography/hash"}
---
## Resúmenes de datos

Una función hash transforma una entrada en un resumen, o digest, de longitud fija para la variante elegida. Es determinista: los mismos bytes producen el mismo resultado. No ofrece una operación de descifrado para reconstruir arbitrariamente la entrada.

Las fuentes describen cálculo eficiente, cambios amplios de salida ante cambios pequeños de entrada y resistencia práctica a encontrar una preimagen. Distinguen MD5, SHA-1, SHA-2 y SHA-3, además del problema de las colisiones.

Un hash sirve para comparar contenidos y participa en firmas. No identifica por sí solo a una persona ni demuestra que un archivo sea benigno. Su uso en [análisis estático](wiki:malware-static) y en [indicadores de compromiso](wiki:malware-ioc) debe conservar esos límites.
