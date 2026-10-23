---
{"id":"csirt-rdap","title":"RDAP","slug":"rdap","parent":"csirt-registration-lookup","type":"protocol","order":20,"aliases":["Registration Data Access Protocol","JSON registral"],"related":["csirt-whois","csirt-rir","csirt-domains"],"sources":[{"id":"lecture-resources","pages":[6,7,12,13,17]},{"id":"manual","pages":[16,17,18]},{"id":"practice-solutions","pages":[11,12]}],"permalink":"csirt/recursos-de-internet/rdap"}
---
## Qué aporta

RDAP, Registration Data Access Protocol, permite consultar información de registro mediante respuestas estructuradas en JSON. La cátedra lo presenta como sucesor de WHOIS y destaca su utilidad para el procesamiento automático.

El formato permite separar datos de la red, entidades y roles de contacto sin buscar nombres de campos en texto libre. La consulta describe registros de recursos; su estructura no demuestra quién realizó una actividad.

## Recursos consultables y diferencias con WHOIS

La cátedra utiliza RDAP para consultar tanto direcciones IP como nombres de dominio. Una consulta IP permite buscar el bloque, su poseedor y los contactos administrativo, técnico y de abuso. Para un dominio interesa distinguir el registrar, el registrant y los canales de contacto disponibles, según la información publicada por cada registro.

WHOIS responde en texto libre, mientras que RDAP utiliza JSON. La estructura facilita procesar datos automáticamente, pero no elimina la necesidad de reconocer la fuente ni las restricciones sobre información personal. El ejemplo de línea de comandos de esta página consulta una IP; la presentación también establece el uso de ambos protocolos para dominios sin desarrollar una invocación RDAP de dominio específica.

## Lectura de una ficha

La página 13 permite recorrer la respuesta por su estructura:

1. `objectClassName` indica la clase de objeto, en este caso `ip network`.
2. `handle`, `startAddress` y `endAddress` describen la red y sus límites.
3. `entities` reúne entidades con datos de contacto y roles como `administrative`, `technical` o `abuse`.
4. Los roles orientan la elección del contacto; `events` y `links` aportan fechas y referencias del registro.

El siguiente fragmento simplifica esa estructura:

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

## Cliente icann-rdap

### Función de la herramienta

icann-rdap es el cliente de línea de comandos desarrollado por ICANN que la cátedra emplea para demostrar consultas RDAP. ICANN significa Internet Corporation for Assigned Names and Numbers. En esta demostración su papel concreto es proveer el cliente; no debe confundirse con el RIR que devuelve los datos de asignación.

### Cómo leer la demostración

La diapositiva utiliza esta invocación:

```text
./rdap 190.15.133.5
```

El argumento es la dirección consultada. La salida del ejemplo contiene mensajes de diagnóstico del cliente y un documento JSON con la red y sus entidades. No toda línea mostrada en la terminal pertenece al JSON: conviene distinguir el registro de ejecución del contenido registral.

La ficha de la clase presenta enlaces a LACNIC, el bloque `190.15.128.0/20` y entidades con roles administrativo, técnico y de abuso. Estos datos explican cómo encontrar al responsable operativo del recurso; son una captura académica y no una consulta actual realizada para esta wiki.

### Alcance y limitaciones

El cliente facilita consultar e interpretar respuestas, pero la información procede del servicio registral correspondiente. Su presencia no sustituye la evaluación de qué campo se necesita ni el control de los límites de la conclusión. Para una denuncia se busca el contacto de abuso, no simplemente el primer correo visible.

### Repaso

:::question ¿ICANN pasa a ser el administrador de la IP porque el programa usado se llama icann-rdap?
No. El desarrollador del cliente y el registro responsable del recurso cumplen papeles distintos. La respuesta y sus enlaces permiten reconocer la fuente registral correspondiente.
:::
