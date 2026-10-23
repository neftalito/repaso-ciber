---
{"id":"crypto-des","title":"DES","slug":"des","parent":"crypto-block","type":"algorithm","order":10,"related":["crypto-triple-des","crypto-aes","crypto-rsa"],"sources":[{"id":"lecture-crypto-1","pages":[25]},{"id":"practice-1b","pages":[5]}]}
---
## Ubicación conceptual

DES es uno de los ejemplos de cifrado simétrico por bloques enumerados por la cátedra. En el modelo de estudio recibe un bloque de texto y una clave secreta, y produce un bloque cifrado que puede revertirse con la clave correspondiente.

## Cómo distinguirlo de otras etiquetas

DES nombra un algoritmo, mientras que ECB o CBC nombran modos de operación. Identificar DES no basta para reconstruir un mensaje: siguen siendo necesarios la clave, el modo y sus parámetros. Tampoco debe interpretarse como una función hash, porque el modelo incluye descifrado.

## Alcance de la fuente

Las páginas citadas lo presentan como ejemplo y no desarrollan sus rondas ni parámetros internos. Esta nota conserva ese alcance y su contexto histórico; no propone utilizarlo para proteger información actual.

:::question ¿DES pertenece a la misma categoría de mecanismo que RSA?
No. DES aparece entre los algoritmos simétricos por bloques. RSA utiliza un par de claves públicas y privadas y se estudia en criptografía asimétrica.
:::
