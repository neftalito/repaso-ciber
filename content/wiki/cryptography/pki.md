---
{"id":"crypto-pki","title":"Infraestructura de clave pública (PKI)","slug":"pki","parent":"crypto-modern","type":"category","order":70,"related":["crypto-certificate","crypto-pgp-trust","csirt-email"],"sources":[{"id":"lecture-crypto-2","pages":[18,19,20,21,25]}],"permalink":"cryptography/pki"}
---
## Gestionar certificados y confianza

Una **infraestructura de clave pública**, o **PKI**, emite y gestiona certificados digitales. Estos vinculan identidades con claves públicas mediante firmas de emisores en los que los participantes confían.

Cripto, parte 2, páginas 18–20, relaciona PKI con certificados X.509, certificados personales y el uso de TLS en HTTPS. La página 25 contrapone la confianza centralizada en autoridades con la red descentralizada de PGP.

## Autoridades y uso en la web

- [Autoridades de certificación](wiki:crypto-ca): emisores en los que se apoya la confianza de la infraestructura.
- [TLS y certificados en HTTPS](wiki:crypto-tls): aplicación del modelo a la comunicación web.

La infraestructura no consiste únicamente en repartir claves: también importa comprobar la validez del certificado y establecer por qué se confía en su emisor.
