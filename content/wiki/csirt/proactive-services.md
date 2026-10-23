---
{"id":"csirt-services-proactive","title":"Servicios proactivos","slug":"proactivos","parent":"csirt-services","type":"concept","order":20,"related":["csirt-services-reactive","csirt-services-quality"],"sources":[{"id":"lecture-incidents","pages":[22]},{"id":"manual","pages":[27]}],"permalink":"csirt/servicios/proactivos"}
---
## Propósito

Los servicios proactivos buscan mejorar las condiciones de seguridad y detección sin esperar a que un incidente motive toda la actividad. La clasificación de la cátedra incluye auditorías o evaluaciones de seguridad, desarrollo de herramientas de seguridad y servicios de detección de intrusiones.

Una evaluación identifica debilidades en un entorno. El desarrollo de herramientas puede facilitar tareas de protección y observación. La detección permite reconocer actividad relevante que luego debe analizarse, en lugar de asumir que toda alerta es automáticamente un incidente confirmado.

## Ejemplo y límite

Un equipo revisa la exposición de servicios de su propia organización y encuentra una configuración que debe corregirse. Esa evaluación es proactiva. Si luego descubre que el servicio ya fue comprometido, la gestión del hecho incorpora actividades [reactivas](wiki:csirt-services-reactive).

Las categorías describen el propósito de los servicios; no forman compartimentos aislados. Que una herramienta de detección sea parte de una capacidad proactiva no impide que sus observaciones alimenten una respuesta reactiva. Tampoco la mera instalación de una herramienta demuestra que sus alertas se interpreten correctamente.

## Repaso

:::question ¿Una alerta generada por detección de intrusiones confirma por sí sola un incidente?
No. Es información que debe evaluarse: hay que determinar qué ocurrió, su pertinencia para la comunidad objetivo y la evidencia disponible. Detectar y confirmar son operaciones relacionadas, pero diferentes.
:::
