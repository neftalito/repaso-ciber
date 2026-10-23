---
{"id":"fundamentals-sqli","title":"Inyección SQL (SQL Injection)","slug":"sqli","parent":"fundamentals-application-attacks","type":"concept","order":10,"related":["fundamentals-vulnerability","fundamentals-risk"],"sources":[{"id":"lecture-fundamentals","pages":[5,8]}]}
---
## Definición y alcance

La inyección SQL se vincula con la interpretación indebida de entradas dentro de consultas a bases de datos. La clase la enumera como un ejemplo de problema de seguridad de aplicaciones. La distinción introductoria es entre los datos que la aplicación recibe y la operación que se permite realizar sobre la base.

## Ejemplo conceptual y límites

En una aplicación que recibe un criterio de búsqueda, corresponde evaluar que ese dato no pueda cambiar el propósito autorizado de la consulta. Este ejemplo describe la pregunta de seguridad, sin proporcionar una entrada de ataque. Un error mostrado por el sistema no demuestra por sí solo que se hayan leído o modificado registros.

:::question ¿Qué evidencia falta para afirmar una pérdida de confidencialidad tras un error de consulta?
Es necesario demostrar un acceso o exposición indebidos de datos. La presencia del error orienta una investigación, pero no acredita por sí sola que la consulta haya permitido leer información reservada.
:::
