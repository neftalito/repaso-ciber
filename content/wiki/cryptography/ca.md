---
{"id":"crypto-ca","title":"Autoridades de certificación","slug":"ca","parent":"crypto-pki","type":"concept","order":10,"related":["crypto-certificate","crypto-tls","crypto-pgp-trust"],"sources":[{"id":"lecture-crypto-2","pages":[19,20,21,22,25]}],"aliases":["CA","Certification Authority"],"permalink":"cryptography/pki/ca"}
---
## Definición

Una autoridad de certificación, o CA, emite certificados que asocian identidades con claves públicas. Su firma permite verificar quién emitió esa asociación; la utilidad de la verificación depende de la confianza depositada en esa autoridad.

## Raíces de confianza

La clase utiliza los navegadores como ejemplo de aplicaciones que incorporan autoridades reconocidas. Un certificado raíz puede estar autofirmado, pero la autofirma por sí sola no obliga a un tercero a confiar en él: la confianza inicial debe estar establecida.

## Ejemplo conceptual

Dos certificados pueden contener firmas matemáticamente verificables y recibir decisiones distintas si sus emisores no tienen la misma confianza para el verificador. Además, reconocer al emisor no elimina las comprobaciones de identidad y vigencia del certificado final.

Las diapositivas incluyen un caso de problema con una CA como recordatorio de que la infraestructura también es un punto de dependencia.

:::question ¿Por qué cualquier persona no se vuelve una CA confiable para el navegador al autofirmar un certificado?
Porque crear una firma propia no establece la confianza de los demás. El navegador necesita un criterio o configuración previa para aceptar a ese emisor.
:::
