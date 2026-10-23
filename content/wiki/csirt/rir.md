---
{"id":"csirt-rir","title":"Registros regionales de Internet","slug":"registros-regionales","parent":"csirt-resources","type":"concept","order":20,"aliases":["RIR","IANA","LACNIC","ARIN","APNIC","RIPE NCC","AFRINIC","ERX","legacy"],"related":["csirt-ip","csirt-whois","csirt-rdap"],"sources":[{"id":"lecture-resources","pages":[3,4,5,7,9,10,11]},{"id":"manual","pages":[16,17]},{"id":"practice-solutions","pages":[10,11,12]}]}
---
## Asignación regional

Los RIR, Regional Internet Registries, administran recursos numéricos de Internet por regiones. La organización que solicita un bloque aporta información que permite mantener registros de asignación y contactos. Esa base registral es útil para localizar responsables ante un incidente.

| Registro | Región general presentada por la cátedra |
| --- | --- |
| ARIN | Estados Unidos, Canadá y partes del Caribe y Atlántico Norte |
| APNIC | Partes de Asia y Oceanía |
| LACNIC | América Latina y regiones del Caribe |
| RIPE NCC | Europa, Oriente Medio y Asia Central |
| AFRINIC | África y algunas regiones del océano Índico |

La región orienta la búsqueda, pero no reemplaza consultar el recurso concreto. El material complementario también describe registros nacionales, NIR, a los que un RIR puede delegar funciones. Esa delegación requiere seguir la base pertinente, no inferir al responsable solo por geografía.

## IANA y las asignaciones históricas

La clase explica que IANA realizaba asignaciones directas antes de la existencia de los RIR. Algunos bloques históricos o ERX pueden producir respuestas genéricas si se consulta una base que no contiene el registro operativo específico.

El ejemplo de la presentación para `163.10.5.66` muestra primero un registro histórico genérico y luego una consulta explícita a LACNIC con información más precisa. Se trata de una captura de clase, no de una verificación actual de esa dirección.

## Elegir el contacto

Los contactos administrativo, técnico y de abuso cumplen funciones diferentes. Para reportar actividad maliciosa se busca preferentemente el contacto de abuso o del CSIRT, acompañado por evidencia y tiempos. El nombre de la organización asignataria no equivale a una atribución de autoría del ataque.

## Repaso

:::question ¿Una respuesta ERX genérica significa que la investigación terminó sin responsable posible?
No. Puede ser una referencia a una asignación histórica. Hay que interpretar las indicaciones y consultar el registro competente para obtener el bloque y los contactos más específicos disponibles.
:::
