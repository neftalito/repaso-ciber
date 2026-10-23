---
{"id":"csirt-services-reactive","title":"Servicios reactivos","slug":"reactivos","parent":"csirt-services","type":"concept","order":10,"related":["csirt-handling","csirt-services-proactive"],"sources":[{"id":"lecture-incidents","pages":[8,18,22]}],"permalink":"csirt/servicios/reactivos"}
---
## Responder a hechos que requieren atención

Los servicios reactivos atienden situaciones que requieren una respuesta. La cátedra ubica en este grupo alertas y advertencias, gestión de incidentes y análisis forense.

| Servicio | Función |
| --- | --- |
| Alertas y advertencias | Comunicar una situación que requiere atención |
| Gestión de incidentes | Evaluar reportes y coordinar la respuesta |
| Análisis forense | Estudiar evidencia para comprender lo ocurrido |

## De la información a la acción

La [gestión de incidentes](wiki:csirt-handling) comprende recibir el reporte, evaluar su pertinencia, clasificar y priorizar, notificar y coordinar acciones. Una alerta, un análisis y una notificación pueden contribuir a esa respuesta, pero cumplen funciones diferentes.

Para que un responsable pueda investigar, la [notificación](wiki:csirt-notification) debe comunicar hechos relevantes y registros con timestamps y zona horaria. Enviar el aviso inicia o sostiene la coordinación; por sí solo no demuestra que el incidente esté resuelto.

## Repaso

:::question ¿Una alerta y un análisis forense son el mismo servicio?
No. La alerta comunica una situación relevante; el análisis forense estudia evidencias para comprender los hechos. Ambos pueden apoyar la respuesta al mismo incidente.
:::
