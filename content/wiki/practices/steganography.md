---
{"id":"practices-steganography","title":"Caso: reconstruir una letra desde bits LSB","slug":"steganography","parent":"practices","type":"practice","order":90,"related":["crypto-steganography","crypto-encoding"],"sources":[{"id":"practice-1b","pages":[5,6]},{"id":"practice-questions","pages":[7]},{"id":"practice-solutions","pages":[8,9]}]}
---
## Datos del problema

Se dispone de ocho bytes de píxeles, en el orden declarado por el ejercicio. El bit menos significativo de cada uno forma una letra ASCII, leyendo el primer bit obtenido como el de mayor peso del mensaje:

```text
10010010 10100011 11010100 01000100
00110011 01000100 10100000 10010001
```

## Reconstrucción

Tomar el último bit de cada byte produce `0 1 0 0 1 0 0 1`. El resultado `01001001` es `0x49`, decimal 73, y corresponde a `I`.

```python
values = ['10010010', '10100011', '11010100', '01000100',
          '00110011', '01000100', '10100000', '10010001']
bits = ''.join(value[-1] for value in values)
assert bits == '01001001'
assert chr(int(bits, 2)) == 'I'
```

## Límites

El caso especifica orden y codificación. En una imagen real también habría que conocer canales, recorrido, formato y longitud. No puede afirmarse que una imagen concreta contiene este mensaje si no se proporcionó. La teoría se encuentra en [esteganografía](wiki:crypto-steganography).

:::question ¿Por qué probar distintos órdenes hasta obtener una letra no demuestra el método usado en una imagen?
Porque pueden aparecer resultados legibles por casualidad. Se necesita una regla respaldada por el enunciado o por evidencia del portador, además de una recuperación consistente del mensaje completo.
:::
