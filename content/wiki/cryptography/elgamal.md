---
{"id":"crypto-elgamal","title":"ElGamal","slug":"elgamal","parent":"crypto-asymmetric","type":"algorithm","order":20,"related":["crypto-dh","crypto-rsa","crypto-signature"],"sources":[{"id":"lecture-crypto-2","pages":[10]}],"permalink":"cryptography/encryption/modern/asymmetric/elgamal"}
---
## Papel en la criptografía de clave pública

ElGamal aparece en la clase como ejemplo asociado al problema del logaritmo discreto y a esquemas de cifrado y firma. Se ubica en la familia asimétrica, que utiliza secretos privados y valores públicos relacionados.

## Distinciones que conviene conservar

Cifrar para un destinatario y firmar como emisor no son operaciones con el mismo objetivo. El uso de un nombre asociado a ambas aplicaciones no significa que toda operación con ese nombre aporte simultáneamente confidencialidad y autenticidad.

Tampoco es equivalente a Diffie–Hellman: la clase presenta a este último específicamente como acuerdo de una clave, no como cifrado de un documento.

## Alcance

La diapositiva enumera ElGamal y su base matemática, sin desarrollar generación de claves ni ecuaciones. Esta nota conserva esa evidencia y no inventa un ejemplo numérico de un esquema no explicado en las fuentes.

:::question ¿Compartir la referencia al logaritmo discreto hace idénticos a ElGamal y Diffie–Hellman?
No. Una familia de problemas matemáticos puede sustentar mecanismos con propósitos distintos. Hay que identificar la operación y el protocolo concretos.
:::
