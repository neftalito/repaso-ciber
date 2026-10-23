---
{"id":"crypto-triple-des","title":"3DES","slug":"triple-des","parent":"crypto-block-algorithms","type":"algorithm","order":20,"related":["crypto-des","crypto-aes","crypto-key-agreement"],"sources":[{"id":"lecture-crypto-1","pages":[30]},{"id":"practice-1b","pages":[5]}],"permalink":"cryptography/encryption/modern/symmetric/block/triple-des"}
---
## Ubicación en el temario

3DES aparece entre los ejemplos de cifrado simétrico de la clase y entre los cifradores por bloques de la explicación práctica. Por esa clasificación, debe interpretarse como un mecanismo de transformación reversible con secretos compartidos, no como hash o firma digital.

## Lectura de un enunciado

Si un ejercicio identifica 3DES como algoritmo, esa información todavía no define el procedimiento completo para un archivo: hacen falta la clave o claves indicadas, el modo y los parámetros del ejercicio. La categoría «por bloques» describe la unidad de procesamiento, no el origen o la distribución de la clave.

## Alcance

Las fuentes citadas lo nombran sin desarrollar su composición interna. No se infieren aquí configuraciones, equivalencias de seguridad ni recomendaciones de uso. Su inclusión permite ubicar un nombre del temario y compararlo con AES y DES.

:::question ¿Nombrar 3DES resuelve el problema de distribuir secretos?
No. La elección de un algoritmo simétrico no establece por sí misma cómo las partes obtienen y protegen sus claves.
:::
