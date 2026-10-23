---
{"id":"csirt-handling","title":"Gestión de incidentes","slug":"gestion","parent":"csirt-incidents","type":"practice","order":10,"aliases":["triage","triaje","pertinencia","priorización","notificación","timestamps","Recepción, evaluación y gestión de incidentes"],"related":["csirt-teams","csirt-rdap","csirt-sensitive-information","practices-writeup","csirt-notification"],"sources":[{"id":"lecture-incidents","pages":[8,9,10,13,15,16,17,18]},{"id":"manual","pages":[25,26,27,29,30]},{"id":"practice-solutions","pages":[15]}]}
---
## Secuencia de trabajo

La gestión de incidentes organiza la respuesta desde la recepción de un reporte hasta la coordinación con responsables y afectados. La página 8 de la presentación distingue esta secuencia:

1. Recibir el reporte y reunir la información disponible.
2. Evaluar si corresponde al ámbito del equipo y si describe un incidente.
3. Clasificar el hecho y asignarle prioridad según su criticidad.
4. Gestionar el caso mediante notificaciones y coordinación de acciones.

Las actividades están conectadas: la evaluación utiliza la información recibida, y la prioridad orienta los esfuerzos de respuesta.

En esta nota, «triaje» nombra el examen inicial para decidir qué se atiende y con qué urgencia. No agrega un marco externo a la secuencia del curso ni reemplaza las actividades que este distingue.

## Recepción: reunir información antes de concluir

Los reportes pueden provenir de usuarios de la comunidad, personas externas o herramientas de monitoreo y evaluación. Los contactos publicados mediante WHOIS o RDAP permiten que un tercero comunique actividad originada en recursos de la organización.

El primer análisis debe reconocer qué se observó, qué recurso está involucrado, cuándo ocurrió y qué evidencia está disponible. Una denuncia vaga puede requerir ampliación: por ejemplo, un correo sospechoso necesita encabezados completos, no solamente una captura de su apariencia.

## Pertinencia: comunidad afectada o recurso de origen

Hay dos preguntas centrales: ¿el hecho afecta a la comunidad objetivo?, ¿es ocasionado por un recurso de esa comunidad? Basta que el caso quede comprendido por uno de estos alcances para que corresponda evaluarlo dentro del equipo.

Un usuario universitario víctima de un correo engañoso y una computadora universitaria que ataca a un tercero son escenarios distintos, ambos pertinentes. Si no hay relación con la comunidad, se identifica el destinatario adecuado de la derivación. Además de esa pertenencia, debe verificarse qué evidencia respalda que ocurrió un incidente: recibir un reporte no confirma por sí solo el hecho.

## Clasificación y prioridad

Clasificar describe la naturaleza del hecho. Priorizar decide la urgencia relativa considerando su tipo, los activos involucrados y el impacto sobre actividades críticas y terceros.

| Situación de estudio | Razonamiento sobre prioridad |
| --- | --- |
| Una PC de una sala envía spam | Puede tener menor prioridad relativa en el ejemplo, pero requiere investigación |
| Una base con datos sensibles queda expuesta a Internet | La sensibilidad y exposición elevan la criticidad |
| Muchas PCs atacan un servidor externo | El alcance y daño a terceros pueden elevar la prioridad |
| Un hecho aparentemente menor ocurre en un servicio crítico | La importancia del recurso puede modificar la evaluación |

Estos casos no forman una escala universal. «Spam = baja prioridad» pierde información si el alcance cambia o el equipo afectado sostiene una actividad crítica. La decisión debe poder justificarse con contexto.

## Notificar con evidencia utilizable

El contacto, la preparación del aviso y el cuidado de la evidencia se desarrollan paso a paso en [Notificación de incidentes](wiki:csirt-notification). El siguiente modelo ilustra esa comunicación dentro de la secuencia de gestión.

La notificación debe dirigirse al responsable adecuado del recurso y aportar hechos que pueda investigar. La presentación destaca los registros con timestamps y la zona horaria. Sin esa referencia temporal, dos organizaciones pueden buscar hechos en ventanas distintas.

Este modelo ficticio muestra qué comunicar sin atribuir una autoría no demostrada:

```text
Asunto: Actividad observada desde un recurso de su red

Observamos intentos reiterados de acceso con origen visible 192.0.2.42
hacia un servicio de nuestro laboratorio el 22/10/2026,
entre 10:00 y 10:05, zona horaria UTC-03:00.

Adjuntamos el extracto de registros necesario para identificar los intentos.
Solicitamos verificar el recurso correspondiente en ese intervalo.
Podemos coordinar el intercambio de información adicional por un canal adecuado.
```

La dirección pertenece a un ejemplo didáctico. En un caso real se incorporan los datos pertinentes disponibles, se revisan destinatarios y se protege la información sensible. Un registro de asignación ayuda a elegir el contacto, sin demostrar quién operó el recurso.

## Coordinar la respuesta

La gestión continúa coordinando acciones con responsables y afectados. Enviar un aviso no garantiza que el recurso haya sido revisado ni que el problema esté resuelto. Conviene documentar qué se observó, qué se comunicó y qué falta verificar, manteniendo separados hechos e hipótesis.

## Repaso

:::question ¿Por qué la misma clase de incidente puede recibir prioridades diferentes?
Porque la criticidad depende también del recurso, el alcance y el impacto. Un problema limitado a una PC de estudio no tiene necesariamente las mismas consecuencias que uno sobre un sistema crítico o que afecta a muchos terceros.
:::

:::question ¿Qué problema produce enviar un timestamp sin zona horaria a otro equipo?
El destinatario puede buscar el evento en un intervalo equivocado y correlacionar registros que no corresponden. La fecha y hora completas con su zona permiten relacionar observaciones de sistemas distintos.
:::
