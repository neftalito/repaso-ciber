---
{"id":"fundamentals-ssrf","title":"Server-Side Request Forgery (SSRF)","slug":"ssrf","parent":"fundamentals-application-attacks","type":"concept","order":30,"related":["fundamentals-vulnerability","fundamentals-risk"],"sources":[{"id":"lecture-fundamentals","pages":[5,8]}],"aliases":["Solicitudes indebidas desde el servidor (SSRF)"]}
---
## Definición y alcance

SSRF se relaciona con inducir solicitudes desde una aplicación del lado del servidor hacia destinos no previstos o no autorizados. La clase la enumera dentro de los problemas de aplicaciones, sin desarrollar un laboratorio de explotación.

## Ejemplo conceptual y límites

Si una funcionalidad del servidor obtiene un recurso indicado por una entrada, la pregunta de seguridad es qué destinos y operaciones están permitidos. Debe distinguirse la entrada recibida de la solicitud que el servidor realizó efectivamente. Un destino escrito en un campo o log no demuestra por sí solo que hubo comunicación exitosa.

:::question ¿Por qué importa saber desde qué sistema se origina la solicitud?
Porque el servidor y el usuario pueden tener accesos y posiciones de red diferentes. La investigación debe identificar el origen efectivo y sus permisos, en lugar de atribuir todas las solicitudes directamente al equipo del usuario.
:::
