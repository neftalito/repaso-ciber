---
{"id":"csirt-rdap","title":"RDAP","slug":"rdap","parent":"csirt-resources","type":"protocol","order":40,"aliases":["Registration Data Access Protocol","JSON registral"],"related":["csirt-whois","csirt-rir","csirt-icann-rdap"],"sources":[{"id":"lecture-resources","pages":[6,7,12,13,17]},{"id":"manual","pages":[16,17,18]},{"id":"practice-solutions","pages":[11,12]}]}
---
## Qué aporta

RDAP, Registration Data Access Protocol, permite consultar información de registro mediante respuestas estructuradas en JSON. La cátedra lo presenta como sucesor de WHOIS y destaca su utilidad para el procesamiento automático.

El formato ayuda a reconocer objetos, entidades y roles sin depender exclusivamente de líneas de texto libre. No convierte la información registral en una prueba de autoría ni garantiza que todos los datos personales estén publicados.

## Lectura de una ficha

En la respuesta mostrada en clase aparecen campos como `objectClassName`, `handle`, `startAddress`, `endAddress`, `events`, `links` y `entities`. Las entidades pueden incluir datos de contacto y roles como `administrative`, `technical` o `abuse`.

```json
{
  "objectClassName": "ip network",
  "handle": "203.0.113.0/24",
  "entities": [
    { "handle": "CONTACTO-EJEMPLO", "roles": ["abuse"] }
  ]
}
```

Es un extracto didáctico, no una respuesta completa ni una consulta real. El rol `abuse` orienta hacia el contacto de incidentes; en una respuesta real habría que examinar la entidad y sus datos disponibles.

## Interpretar antes de automatizar

Un programa puede seleccionar entidades por su rol y conservar la fuente y los eventos fechados. Debe contemplar que existan datos omitidos o diferencias entre bases. Si WHOIS y RDAP muestran detalles distintos, corresponde contrastar la procedencia y actualización, no elegir sin explicación la salida que confirma una hipótesis.

El cliente [icann-rdap](wiki:csirt-icann-rdap) es la herramienta utilizada en la demostración del curso; el protocolo no se reduce a ese programa.

## Repaso

:::question ¿Por qué JSON facilita una consulta automatizada pero no identifica al atacante?
La estructura permite procesar campos y roles de manera consistente. El contenido sigue describiendo registros de recursos y contactos; para vincular una acción con una persona hace falta evidencia adicional del incidente.
:::
