---
{"id":"crypto-signature","title":"Firma digital","slug":"signature","parent":"crypto-modern","type":"concept","order":50,"related":["crypto-hash","crypto-certificate","crypto-pgp","fundamentals-cia"],"sources":[{"id":"lecture-crypto-2","pages":[6,11,12,13]},{"id":"practice-1b","pages":[3]},{"id":"manual","pages":[6]}],"permalink":"cryptography/signature"}
---
## Vincular un documento con una clave privada

Una **firma digital** permite comprobar la integridad de un documento y su autenticidad de origen mediante una clave pública. La firma se genera con la clave privada correspondiente. Para atribuirla a una persona también debe establecerse a quién pertenece esa clave.

Cripto, parte 2, páginas 11–13, y la explicación de la Práctica 1, parte 2, página 3, relacionan la firma con integridad, autenticación de origen y no repudio.

## Cómo se firma y verifica

En el modelo didáctico de la cátedra:

1. El emisor calcula el hash del documento.
2. Genera una firma de ese resumen con su clave privada.
3. El receptor calcula el hash del documento recibido.
4. Verifica la firma con la clave pública del emisor y comprueba su correspondencia con el documento.

Las diapositivas describen el caso RSA como «cifrar el hash con la privada». Esa descripción no debe generalizarse a todos los algoritmos: [DSA](wiki:crypto-dsa), por ejemplo, se presenta para firma. Las operaciones generales son firmar y verificar.

## Qué comprobación falta sobre la identidad

La página 13 plantea el problema de saber cuál es la clave de una persona. Una firma matemáticamente verificable no resuelve por sí sola esa asociación. Los certificados y las redes de confianza abordan ese vínculo.

Firmar tampoco oculta el contenido. Puede enviarse un documento firmado y legible; para restringir su lectura se necesita además cifrado.

:::question ¿Por qué una firma no reemplaza el cifrado?
Porque comprobar origen e integridad y restringir la lectura son objetivos distintos. Un documento puede estar firmado y ser público.
:::
