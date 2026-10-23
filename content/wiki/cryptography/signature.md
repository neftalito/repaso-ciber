---
{"id":"crypto-signature","title":"Firma digital","slug":"signature","parent":"crypto-modern","type":"concept","order":50,"related":["crypto-hash","crypto-certificate","crypto-pgp","fundamentals-cia"],"sources":[{"id":"lecture-crypto-2","pages":[6,11,12,13]},{"id":"practice-1b","pages":[3]},{"id":"manual","pages":[6]}],"permalink":"cryptography/signature"}
---
## Definición

Una firma digital vincula un documento con el control de una clave privada y permite comprobar su integridad y autenticidad de origen. El material también la relaciona con el no repudio. La evaluación de identidad requiere establecer de quién es la clave pública empleada para verificar.

## Firma y verificación

El modelo de clase calcula un hash del documento y genera la firma con la clave privada del emisor. El receptor calcula de nuevo el hash y verifica la firma con la clave pública correspondiente.

Las diapositivas describen el caso didáctico RSA como «cifrar el hash con la privada». Esa explicación no debe generalizarse a todo algoritmo de firma: [DSA](wiki:crypto-dsa), por ejemplo, se presenta como un mecanismo de firma, no de cifrado. Firmar y verificar son las operaciones conceptuales generales.

## Ejemplo de razonamiento

Si un informe firmado cambia después de la firma, la verificación sobre ese nuevo contenido no debe aceptarlo como el mismo documento firmado. Si la firma se verifica, todavía debe comprobarse que la clave corresponde a la persona esperada.

## Límites

Una firma no oculta el documento. Puede enviarse un mensaje firmado y legible. Tampoco basta recibir una clave pública con un nombre escrito en ella: certificados o redes de confianza abordan esa asociación.

:::question ¿Por qué la firma no reemplaza el cifrado?
Porque comprobar origen e integridad es distinto de restringir la lectura. Un documento puede estar firmado y ser público; para confidencialidad se necesita además un esquema de cifrado.
:::
