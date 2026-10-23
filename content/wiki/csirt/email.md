---
{"id":"csirt-email","title":"Correo electrónico e investigación","slug":"correo-electronico","parent":"csirt","type":"category","order":40,"aliases":["email","e-mail","mail","phishing"],"related":["csirt-dns","csirt-incidents"],"sources":[{"id":"lecture-email","pages":[2,3,4,7,10,16]}]}
---
## Qué permite estudiar un correo

Investigar un mensaje requiere comprender su transporte, distinguir las direcciones usadas para entregarlo de las que ve el usuario y reconstruir los saltos respaldados por los encabezados. El aspecto del mensaje por sí solo no proporciona todos esos datos.

El recorrido de esta sección parte de [SMTP](wiki:csirt-smtp) y la anatomía del correo, continúa con el análisis de encabezados y estudia la suplantación del remitente. Las herramientas de análisis facilitan la lectura, pero no reemplazan interpretar la evidencia original.

## Conexión con la gestión de incidentes

Una dirección IP o un dominio observado puede orientar consultas registrales para encontrar el contacto de abuso. Esa búsqueda debe partir de evidencia confiable: no cualquier dirección escrita en un campo del mensaje es el origen real de una conexión.

Los ejemplos son didácticos. No requieren enviar mensajes, visitar enlaces de un correo sospechoso ni ejecutar adjuntos.
