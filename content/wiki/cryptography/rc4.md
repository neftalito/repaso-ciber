---
{"id":"crypto-rc4","title":"RC4","slug":"rc4","parent":"crypto-stream","type":"algorithm","order":10,"related":["crypto-stream","crypto-ecb"],"sources":[{"id":"lecture-crypto-1","pages":[29]},{"id":"practice-1b","pages":[5]},{"id":"manual","pages":[11]}]}
---
## Ejemplo de cifrado de flujo

RC4 es el algoritmo que la clase utiliza como ejemplo de cifrado de flujo. Se ubica en el modelo de una secuencia pseudoaleatoria combinada con los datos, en lugar de transformar cada bloque plano de forma independiente.

## Qué debe comprenderse

El secreto permite generar la secuencia cifrante; esa secuencia no es simplemente el texto plano reordenado. Para recuperar el contenido hay que reproducir el flujo correcto y combinarlo con el texto cifrado conforme al esquema.

El manual complementario lo trata como ejemplo histórico y advierte su obsolescencia. La nota no recomienda su utilización ni presenta código para incorporarlo en aplicaciones.

## Alcance

Las fuentes no desarrollan el estado interno ni la inicialización detallada de RC4. Su función en el temario es ejemplificar la categoría y sus diferencias frente al cifrado por bloques.

:::question ¿RC4 es un modo de AES como ECB?
No. En el temario aparece como un algoritmo de flujo, mientras que ECB es un modo de operación de cifradores por bloques.
:::
