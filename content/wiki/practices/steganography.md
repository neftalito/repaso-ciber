---
{"id":"practices-steganography","title":"Caso: reconstruir una letra desde bits LSB","slug":"steganography","parent":"practices","type":"practice","order":90,"related":["crypto-steganography","crypto-encoding"],"sources":[{"id":"practice-1b","pages":[5,6]},{"id":"practice-questions","pages":[7]},{"id":"practice-solutions","pages":[8,9]}]}
---
## Datos del problema

El objetivo es reconstruir un carácter a partir de bits distribuidos entre varios bytes. La práctica 1, parte 2, página 6, introduce LSB; el solucionario complementario, página 8, proporciona los ocho bytes de este caso, en el orden declarado por el ejercicio. El bit menos significativo de cada uno forma una letra ASCII, leyendo el primer bit obtenido como el de mayor peso del mensaje:

```text
10010010 10100011 11010100 01000100
00110011 01000100 10100000 10010001
```

## Reconstrucción

1. Tomar el último bit de cada byte, conservando el orden: `0 1 0 0 1 0 0 1`.
2. Reunirlos como un byte de mensaje: `01001001`. El primer bit recuperado ocupa la posición de mayor peso, según el enunciado.
3. Interpretar ese byte: es `0x49`, decimal 73, y corresponde a `I` en ASCII.

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
