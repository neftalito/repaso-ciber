---
{"id":"csirt-ip","title":"Direcciones y bloques IP","slug":"direcciones-ip","parent":"csirt-resources","type":"concept","order":10,"aliases":["IPv4","IPv6","prefijo","dirección privada"],"related":["csirt-rir","csirt-rdap","csirt-headers"],"sources":[{"id":"lecture-resources","pages":[2,3,7,8,11,13]},{"id":"lecture-email","pages":[2,8]},{"id":"practice-solutions","pages":[11,12,14]}]}
---
## Qué se consulta

Una dirección IP es un dato de red que puede aparecer como origen o destino en la evidencia. Para una investigación registral interesa conocer el bloque que contiene esa dirección, la organización a la que figura asignado y los contactos asociados. La cátedra trabaja tanto con IPv4 como con IPv6.

Un bloque reúne direcciones. En la notación de prefijo, como `203.0.113.0/24`, el sufijo indica la longitud del prefijo de red. El registro del bloque aporta contexto administrativo; no identifica necesariamente al usuario que utilizó una dirección en el momento del incidente.

## Direcciones internas y evidencia pública

En encabezados de correo pueden aparecer direcciones privadas IPv4: `10.0.0.0/8`, `172.16.0.0/12` y `192.168.0.0/16`. Describen saltos internos y no deben interpretarse como una asignación pública global atribuible a una única organización.

Por ejemplo, una línea con `10.0.0.9` puede representar el paso del servidor de entrada al servidor de buzones. Para coordinar con un proveedor externo interesa la dirección pública del servidor que se conectó al sistema receptor, cuando esa conexión está respaldada por una traza confiable.

## Ejemplo registral

Una ficha didáctica indica bloque `203.0.113.0/24`, entidad «Laboratorio Ejemplo» y contacto `abuse@lab.example`. Eso permite preparar una notificación dirigida al administrador del recurso. No demuestra que esa entidad haya redactado un correo o que una persona concreta haya iniciado la actividad.

## Repaso

:::question ¿Una IP privada encontrada en Received permite buscar al responsable externo mediante el registro público de ese número?
No. Los rangos privados se reutilizan en redes internas. Hay que distinguir esos saltos de la conexión pública observable y correlacionar la evidencia antes de elegir una consulta o un contacto.
:::
