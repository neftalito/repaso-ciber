---
{"id":"crypto-certificate","title":"Certificados digitales","slug":"certificate","parent":"crypto-modern","type":"concept","order":60,"related":["crypto-pki","crypto-ca","crypto-tls","crypto-signature"],"sources":[{"id":"lecture-crypto-2","pages":[13,14,15,16,17,19]}],"permalink":"cryptography/certificate"}
---
## Qué es un certificado digital

Un **certificado digital** asocia una identidad con una clave pública y contiene la firma de su emisor. Responde a una pregunta previa a verificar firmas o cifrar para alguien: ¿a quién pertenece realmente esta clave pública?

## Qué contiene

Cripto, parte 2, páginas 14–16, enumera estos datos:

- Identidad del poseedor y su clave pública.
- Período de validez.
- Identidad del emisor y su firma digital.

El certificado comunica la clave pública; no contiene la clave privada del titular.

## Qué debe comprobarse

La página 17 presenta certificados vencidos, emitidos para un nombre de sitio incorrecto, autofirmados, con una raíz no confiable o revocados. Son problemas diferentes: verificar una firma no corrige el vencimiento ni hace que un certificado corresponda a otro sitio.

La confianza en el emisor también importa. La página 19 relaciona esa decisión con las autoridades de certificación y la infraestructura de clave pública.

El caso de contenido mixto incluido en la página 17 se refiere a cómo una página carga recursos; no es un dato de identidad dentro del certificado.

:::question ¿Por qué el certificado no debe incluir la clave privada?
Porque comunica una clave pública y su asociación con una identidad. La clave privada debe conservarse en secreto para las operaciones reservadas a su titular.
:::
