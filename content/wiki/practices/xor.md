---
{"id":"practices-xor","title":"Caso: recuperar texto con XOR de un byte","slug":"xor","parent":"practices","type":"practice","order":40,"related":["crypto-encoding","crypto-encryption"],"sources":[{"id":"practice-1a","pages":[10]},{"id":"practice-questions","pages":[5]},{"id":"practice-solutions","pages":[6]}]}
---
## Entrada

El ejemplo utiliza los bytes hexadecimales `63 69 51 72 65 78 57` y la clave de un byte `0x2a`. El objetivo es reconstruir el mensaje y explicar por qué la misma operación revierte la transformación.

## Cálculo comprobado

```python
cipher = bytes.fromhex('63 69 51 72 65 78 57')
key = 0x2a
plain = bytes(value ^ key for value in cipher)
assert plain == b'IC{XOR}'
assert bytes(value ^ key for value in plain) == cipher
```

Para el primer byte, `0x63 XOR 0x2a = 0x49`, que representa `I`. La propiedad usada es `(x XOR k) XOR k = x`: la clave aplicada dos veces se cancela.

## Interpretación y límites

La conversión desde hexadecimal recupera bytes; XOR es la transformación posterior. Si la clave fuera desconocida y se restringiera a un byte, existirían 256 candidatos. Encontrar unas pocas letras legibles no bastaría para elegirlo: el mensaje completo y las reglas del reto deben ser consistentes. Este caso pequeño no es un esquema adecuado para proteger datos reales.

:::question ¿Por qué no se debe aplicar XOR a los caracteres «6» y «3» de la representación hexadecimal?
Porque representan un único byte de valor 0x63. Operar sobre sus caracteres ASCII transformaría otros datos y no resolvería el ejemplo planteado.
:::
