---
{"id":"csirt","title":"CSIRT y gestión de incidentes","slug":"csirt","parent":"wiki","type":"category","order":30,"aliases":["CERT","respuesta a incidentes"],"related":["fundamentals-cia","fundamentals-risk","malware-ioc"],"sources":[{"id":"lecture-incidents","pages":[6,7,8,22,23]},{"id":"lecture-resources","pages":[19]}]}
---
## Un equipo para coordinar la respuesta

Un CSIRT es un equipo que gestiona incidentes de seguridad para una comunidad definida. Su trabajo relaciona lo ocurrido, los recursos involucrados, la evidencia disponible y las personas que pueden intervenir. La comunidad comprende tanto a los afectados de la organización como a los recursos propios que ocasionan incidentes a terceros.

## Recorrido de la unidad

- [Equipos CERT y CSIRT](wiki:csirt-teams): comunidad objetivo y servicios que presta el equipo.
- [Recursos de Internet](wiki:csirt-resources): direcciones IP, dominios y consultas para localizar responsables y contactos.
- [Correo electrónico e investigación](wiki:csirt-email): transporte SMTP, lectura de encabezados y suplantación del remitente.
- [Incidentes de seguridad](wiki:csirt-incidents): recepción del reporte, evaluación, prioridad, notificación y cuidado de la información.

## De la evidencia a la coordinación

La investigación busca hechos que otro responsable pueda verificar. Una dirección observada puede orientar la búsqueda de un contacto mediante registros de Internet; el aviso debe explicar qué ocurrió y aportar evidencia con su referencia temporal. El registro del recurso orienta el contacto, pero no demuestra por sí solo quién realizó la actividad.

Durante la coordinación se protege la información sensible y se indica hasta dónde puede circular mediante [TLP](wiki:csirt-tlp). La [tríada CIA](wiki:fundamentals-cia) permite reconocer qué propiedad de la información está afectada.
