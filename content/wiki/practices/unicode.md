---
{"id":"practices-unicode","title":"Caso: comparar texto con un carácter invisible","slug":"unicode","parent":"practices","type":"practice","order":170,"related":["crypto-encoding","practices-writeup"],"sources":[{"id":"practice-questions","pages":[13]},{"id":"practice-solutions","pages":[17]}]}
---
## Problema

El objetivo es comprobar igualdad de datos aunque la apariencia coincida. En el caso del solucionario complementario, página 17, dos cadenas parecen mostrar `IC{secreto}`, pero una contiene U+200B entre `se` y `creto`. El ejercicio exige comparar datos, no solo su apariencia en pantalla.

## Inspección comprobable

```python
visible = 'IC{secreto}'
hidden = 'IC{se\u200bcreto}'
assert visible != hidden
assert len(hidden) == len(visible) + 1
assert hidden.encode('unicode_escape') == br'IC{se\u200bcreto}'
```

La representación escapada muestra dónde se ubica el punto de código adicional. Se puede documentar también la secuencia de valores Unicode para evitar que el editor o el formato oculten la diferencia.

## Interpretación y límites

Una validación exacta puede rechazar una cadena visualmente idéntica porque sus secuencias de caracteres difieren. No corresponde borrar automáticamente caracteres antes de comprender las reglas de comparación del reto: esa transformación podría modificar el dato que se busca estudiar.

:::question ¿Por qué una captura de pantalla es insuficiente para probar igualdad de dos textos?
Porque puede ocultar caracteres sin representación visible y otras diferencias de codificación. La igualdad debe comprobarse sobre la secuencia de caracteres o bytes pertinente, según el formato acordado.
:::
