---
{"id":"csirt-email","title":"Correo electrónico e investigación","slug":"correo-electronico","parent":"csirt","type":"category","order":40,"aliases":["email","e-mail","mail","phishing"],"related":["csirt-dns","csirt-incidents"],"sources":[{"id":"lecture-email","pages":[2,3,4,7,10,16]}]}
---
## Qué permite investigar un correo

El análisis de un correo busca reconocer cómo se transportó el mensaje, qué servidores participaron y qué direcciones se usaron para el envío y la respuesta. El nombre del remitente que muestra el lector de correo es solo una parte de esa información.

La idea central es separar el encaminamiento del mensaje de los campos que ve el usuario. La cátedra muestra que la dirección del sobre SMTP puede diferir del campo `From` que ve el destinatario.

## Del transporte a la interpretación

- [SMTP y flujo del correo](wiki:csirt-smtp): recorrido entre servidores y diferencia entre sobre, encabezados y cuerpo.
- [Análisis de encabezados](wiki:csirt-headers): servidores, IP, marcas temporales y herramientas para interpretar la traza.
- [Suplantación del remitente](wiki:csirt-spoofing): uso de campos informativos para aparentar un origen distinto.

## Conexión con la gestión de incidentes

La IP de la conexión observada y el dominio involucrado pueden orientar consultas registrales para localizar un contacto de abuso. Primero se interpreta la evidencia: una dirección escrita en el mensaje no demuestra por sí sola que ese sistema haya realizado el envío.

Las herramientas de análisis ayudan a ordenar los encabezados, pero su interpretación debe compararse con el original. Los ejemplos de esta unidad son didácticos y no requieren enviar mensajes ni interactuar con el contenido de un correo sospechoso.
