---
{"id":"crypto-ebcdic","title":"EBCDIC en el mapa de codificaciones","slug":"ebcdic","parent":"crypto-encoding","type":"concept","order":80,"related":["crypto-ascii","crypto-unicode"],"sources":[{"id":"lecture-crypto-1","pages":[7]},{"id":"practice-1a","pages":[1]}]}
---
## Ubicación conceptual

EBCDIC aparece en la enumeración de sistemas de codificación de la clase y la práctica. Su presencia recuerda que una secuencia de bytes requiere una convención para ser interpretada como texto: no todo archivo textual debe leerse como ASCII o UTF-8.

## Qué permite concluir la fuente

El material lo utiliza como ejemplo de representación, sin desarrollar su tabla de caracteres ni sus variantes. Por eso esta nota no asigna valores numéricos a letras ni propone una conversión concreta sin una tabla identificada.

Ante un archivo descrito como EBCDIC, el procedimiento conceptual es determinar la codificación exacta y convertirla a una representación conocida antes de evaluar el contenido. Interpretar bytes con la tabla equivocada puede producir caracteres incorrectos sin que exista cifrado.

:::question ¿Por qué no alcanza con ver bytes imprimibles para identificar su codificación?
Porque los valores necesitan una tabla de interpretación. El hecho de que un visor muestre caracteres no demuestra que haya usado la tabla correcta.
:::
