---
{"id":"csirt-registry","title":"Registry: registro de un TLD","slug":"registry","parent":"csirt-domains","type":"concept","order":10,"aliases":["registro de dominios"],"related":["csirt-registrar","csirt-registrant","csirt-dns"],"sources":[{"id":"lecture-resources","pages":[16,17,18]},{"id":"practice-solutions","pages":[12,13]}]}
---
## Función

El registry mantiene el registro oficial de un dominio de nivel superior o TLD. En la estructura presentada por la cátedra, conserva información que permite reconocer el registrar que gestionó la asignación de un nombre.

Su función corresponde al registro del espacio de nombres, no a la identidad del usuario que visita un sitio ni a la administración de cualquier servidor que utilice el dominio. Para investigar un hecho concreto hay que separar esas capas.

## Relación con los otros actores

El [registrar](wiki:csirt-registrar) gestiona la registración frente al registry y la relación comercial con quien solicita el nombre. El [registrant](wiki:csirt-registrant) es el titular registral. Las tres funciones pueden involucrar organizaciones diferentes.

Como ejemplo de coincidencia de roles, la clase presenta a NIC Argentina actuando como registry y registrar para `.ar`. Esto explica que dos funciones puedan reunirse en una entidad; no establece una regla universal para los dominios.

## Uso en una investigación

Si una consulta devuelve el registro de un dominio y muestra qué registrar intervino, ese dato orienta el siguiente contacto. No demuestra que el registry sea el autor del contenido publicado. El dominio, el alojamiento del sitio y la actividad investigada deben correlacionarse con evidencia adicional.

## Repaso

:::question ¿El registry es necesariamente la empresa a la que el titular compró el dominio?
No. Esa relación corresponde al registrar. Las funciones pueden coincidir en una entidad, pero deben distinguirse para interpretar correctamente el registro y dirigir una notificación.
:::
