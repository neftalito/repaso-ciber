---
{"id":"crypto-tls","title":"TLS y certificados en HTTPS","slug":"tls","parent":"crypto-pki","type":"protocol","order":20,"related":["crypto-certificate","crypto-ca","crypto-pki"],"sources":[{"id":"lecture-crypto-2","pages":[17,18,19,20]}],"aliases":["HTTPS"],"permalink":"cryptography/pki/tls"}
---
## Certificados para identificar el servicio

TLS utiliza certificados digitales en el contexto de HTTPS presentado por la cátedra. El certificado vincula una clave pública con una identidad dentro de una [infraestructura de confianza](wiki:crypto-pki). Ver un certificado no basta: debe ser válido para el servicio al que se pretendía acceder.

## Qué debe comprobarse

La página 17 de *Cripto, parte 2* muestra problemas como certificados vencidos, nombres incorrectos, emisores no confiables y revocación. Las páginas 18 a 20 ubican esas comprobaciones en el uso de certificados y autoridades de certificación.

| Aspecto | Pregunta que orienta la comprobación |
| --- | --- |
| Vigencia | ¿El certificado está dentro de su período de validez? |
| Identidad | ¿Corresponde al nombre del servicio esperado? |
| Confianza | ¿Su emisor resulta confiable dentro del esquema de validación? |
| Revocación | ¿Se ha revocado el certificado? |

Son aspectos diferentes. La vigencia no corrige un nombre incorrecto, y un nombre parecido no equivale a la identidad esperada.

## Cómo interpretar una advertencia

Una advertencia exige identificar qué comprobación falló. No constituye por sí sola una reconstrucción completa de quién administra el sitio o qué ocurrió con él. La relación entre certificado, identidad y confianza debe evaluarse para el servicio concreto.

La fuente desarrolla esos conceptos, pero no el intercambio completo de mensajes de una versión de TLS. Esta nota no deduce de las capturas una secuencia de negociación ni una configuración de servidor.

:::question ¿Un certificado vigente basta para aceptar cualquier nombre de sitio?
No. La vigencia es una comprobación. El certificado también debe corresponder a la identidad esperada y resultar confiable según el esquema de validación.
:::
