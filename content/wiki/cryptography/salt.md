---
{"id":"crypto-salt","title":"Sal en el cálculo de contraseñas","slug":"salt","parent":"crypto-password-hashes","type":"concept","order":20,"related":["crypto-dictionary","crypto-password-hashes"],"sources":[{"id":"manual","pages":[9]},{"id":"practice-guide","pages":[4]}],"permalink":"cryptography/hash/password-hashes/salt"}
---
## Definición

Una sal es un dato que se incorpora al procesamiento de una contraseña. La guía complementaria utiliza un ejercicio con el esquema `MD5(salt + password)` y destaca que el orden de concatenación forma parte de la operación.

## Ejemplo conceptual

Con sal `curso:` y candidato `luna`, la entrada del esquema anterior es la secuencia que representa `curso:luna`. Invertir el orden produciría `lunacurso:`, una entrada diferente. El hash debe calcularse sobre los bytes exactos y con la misma codificación usada por el ejercicio.

## Qué resuelve y qué no

El complemento explica que una sal pública y única impide reutilizar directamente tablas precalculadas entre registros. No necesita ser una clave secreta y no vuelve costosa por sí sola una función rápida ni evita probar candidatos.

:::question ¿Publicar una sal equivale necesariamente a revelar una contraseña?
No. La sal y la contraseña tienen roles distintos. Conocer la sal permite reconstruir la operación para cada candidato, pero no entrega automáticamente el candidato correcto.
:::
