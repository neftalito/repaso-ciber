---
{"id":"crypto-gpg","title":"GPG / GnuPG","slug":"gpg","parent":"crypto-pgp","type":"tool","order":20,"related":["crypto-pgp-trust","crypto-signature","crypto-base64"],"sources":[{"id":"practice-1b","pages":[7,8]},{"id":"practice-guide","pages":[8]}],"aliases":["GNU Privacy Guard","GnuPG"],"permalink":"cryptography/pgp/gpg"}
---
## Una herramienta para operaciones diferentes

GPG, GNU Privacy Guard o GnuPG, es la implementación libre de PGP presentada en la práctica. Gestiona claves y permite cifrar, descifrar, firmar y verificar. Cifrar protege la lectura del contenido; firmar permite comprobar la firma y la integridad del documento. Son operaciones distintas.

## Identificar las claves disponibles

La página 7 de *Explicación de la práctica 1, parte 2* distingue estas consultas al anillo local:

```text
gpg --list-keys
gpg --list-secret-keys
```

La primera lista claves públicas; la segunda, claves secretas. Las públicas se utilizan para cifrar para un destinatario o verificar una firma. Poseer una clave pública no implica disponer del secreto necesario para descifrar lo dirigido a ella.

## Firmar y verificar un documento

La página 8 muestra una firma separada y su verificación:

```text
gpg --detach-sign archivo.txt
gpg --verify archivo.txt.sig archivo.txt
```

1. El emisor firma con su clave privada y genera un archivo de firma independiente.
2. El receptor verifica la firma junto con el documento correspondiente, utilizando la clave pública.
3. Además del resultado de la verificación, debe evaluar si esa clave pertenece a la persona esperada.

La firma separada no modifica el original ni oculta su contenido. La explicación práctica mezcla firma y cifrado en la descripción de `--sign`; aquí se distingue explícitamente el propósito de cada operación.

## Cifrar y recuperar el contenido

El siguiente flujo conserva la forma ilustrativa de la guía complementaria, página 8. `DESTINATARIO` representa la clave pública del destinatario que debe haberse identificado correctamente:

```text
gpg --armor --encrypt -r DESTINATARIO archivo.txt
gpg --decrypt archivo.txt.asc
```

El primer comando cifra para esa clave pública. El segundo recupera el contenido cuando se dispone de la clave privada correspondiente. Los comandos son ejemplos de lectura; no se ejecutaron sobre claves ni documentos personales.

## Qué significa ASCII armor

ASCII armor representa datos PGP binarios mediante caracteres imprimibles. No agrega cifrado. Según la operación realizada, una salida textual puede contener un mensaje cifrado o una firma: el aspecto del archivo no sustituye conocer cómo se produjo.

:::question ¿Una firma válida demuestra por sí sola la identidad de una persona?
No. También hay que evaluar la relación entre la clave pública y la persona esperada. Descargar una clave o disponer de ella no establece por sí solo esa confianza.
:::
