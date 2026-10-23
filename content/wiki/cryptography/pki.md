---
{"id":"crypto-pki","title":"Infraestructura de clave pública (PKI)","slug":"pki","parent":"cryptography","type":"category","order":80,"related":["crypto-certificate","crypto-pgp-trust","csirt-email"],"sources":[{"id":"lecture-crypto-2","pages":[18,19,20,21,25]}]}
---
## Gestionar confianza en certificados

Una PKI es una infraestructura de emisión y gestión de certificados digitales. La clase la relaciona con certificados X.509 y con autoridades de certificación en las que los participantes confían.

El sistema permite vincular identidades con claves públicas mediante firmas de emisores reconocidos. No consiste solo en repartir claves: también importa la validez del certificado y el criterio usado para confiar en su emisor.

Los certificados utilizados con TLS y HTTPS son un caso del temario. La confianza se organiza de forma diferente de la red descentralizada de PGP; comparar ambas estructuras ayuda a identificar dónde se toma la decisión de confiar.
