---
{"id":"crypto-certificate","title":"Certificados digitales","slug":"certificate","parent":"cryptography","type":"concept","order":70,"related":["crypto-pki","crypto-ca","crypto-tls","crypto-signature"],"sources":[{"id":"lecture-crypto-2","pages":[13,14,15,16,17,19]}]}
---
## Definición

Un certificado digital es una estructura de datos que asocia una identidad con una clave pública y contiene la firma de su emisor. Responde al problema de conocer a quién corresponde una clave, además de comprobar operaciones matemáticas con ella.

## Qué contiene

Las diapositivas enumeran la identidad del poseedor, su clave pública, el período de validez, la identidad del emisor y la firma digital de este último. El certificado no es la clave privada del titular.

## Validación contextual

La clase muestra problemas como vencimiento, nombre de sitio incorrecto, autofirma, raíz no confiable y revocación. Son verificaciones distintas: una firma matemática válida no elimina un vencimiento ni corrige que el certificado corresponda a otro sitio.

## Ejemplo original

Un certificado emitido para `campus.example` no permite concluir que `correo.example` sea el mismo servicio autenticado. La comprobación debe considerar la identidad esperada, no únicamente que exista un archivo de certificado.

El caso de contenido mixto mostrado en la clase afecta cómo una página carga recursos; no es, por sí solo, un campo de identidad del certificado.

:::question ¿Por qué no debe compartirse una clave privada como parte del certificado?
Porque el certificado comunica una clave pública y su asociación con una identidad. La clave privada tiene otro papel y su exposición permitiría operaciones reservadas a su titular.
:::
