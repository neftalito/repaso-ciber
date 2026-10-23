---
{"id":"crypto-tls","title":"TLS y certificados en HTTPS","slug":"tls","parent":"crypto-pki","type":"protocol","order":20,"related":["crypto-certificate","crypto-ca","crypto-pki"],"sources":[{"id":"lecture-crypto-2","pages":[17,18,19,20]}],"aliases":["HTTPS"],"permalink":"cryptography/pki/tls"}
---
## Ubicación en el temario

TLS es el contexto de uso de certificados digitales que la clase presenta mediante HTTPS. Los certificados ayudan a vincular la clave del servicio con su identidad dentro de un esquema de confianza.

## Qué se comprueba

No basta con que una conexión muestre un certificado. El ejemplo de la clase distingue problemas de vencimiento, nombre incorrecto, emisor no confiable y revocación. La confianza debe evaluarse para el servicio al que se pretendía acceder.

Un nombre visible parecido al esperado no elimina la necesidad de comparar la identidad exacta. Tampoco debe confundirse una alerta de certificado con una conclusión completa sobre quién operó el sitio.

## Alcance de esta nota

Las fuentes utilizadas desarrollan el papel de certificados y autoridades, sin describir el intercambio completo de mensajes de una versión de TLS. No se inventa aquí una secuencia de handshake ni una configuración de servidor.

:::question ¿Un certificado vigente basta para aceptar cualquier nombre de sitio?
No. La vigencia es solo una comprobación. También debe corresponder a la identidad esperada y resultar confiable según el esquema de validación.
:::
