---
{"id":"practices-hash-check","title":"Caso: comprobar un hash con salt","slug":"hash-check","parent":"practices","type":"practice","order":50,"related":["crypto-hash","practices-writeup"],"sources":[{"id":"practice-questions","pages":[4]},{"id":"practice-solutions","pages":[5]},{"id":"practice-guide","pages":[4]}]}
---
## Datos del caso

El caso del solucionario complementario, página 5, define `MD5(salt || password)`, el salt `IntroCiberseguridad` y el digest `6bff121a17aae857825427eab59ebe13`. Las candidatas autorizadas son `mate`, `sol` y `luna`. La tarea es comparar entradas concretas, no descifrar MD5.

## Procedimiento comprobado

1. Conservar el salt, el digest esperado y las tres candidatas tal como se proporcionan.
2. Concatenar el salt antes de cada candidata, sin incluir comillas ni separadores.
3. Representar la entrada como bytes UTF-8 y calcular MD5.
4. Comparar cada digest con el esperado y registrar las coincidencias.

```python
import hashlib
salt = 'IntroCiberseguridad'
expected = '6bff121a17aae857825427eab59ebe13'
matches = []
for candidate in ['mate', 'sol', 'luna']:
    digest = hashlib.md5((salt + candidate).encode('utf-8')).hexdigest()
    if digest == expected:
        matches.append(candidate)
assert matches == ['mate']
```

La concatenación exacta produce la coincidencia para `mate`. Cambiar el orden, incluir comillas como datos o agregar un salto de línea cambia la entrada y puede cambiar el digest.

## Conclusión y límites

Se encontró una candidata compatible entre tres entradas dadas. No se invirtió matemáticamente la función ni se demostró que no existan colisiones. El uso de MD5 pertenece al ejercicio educativo y no constituye una recomendación de almacenamiento de contraseñas. Las propiedades generales se estudian en [funciones hash](wiki:crypto-hash).

:::question ¿Qué parte del procedimiento depende de que el salt sea conocido?
Permite construir exactamente cada entrada que se compara. El salt no reemplaza la contraseña ni convierte esta búsqueda acotada en un descifrado del hash.
:::
