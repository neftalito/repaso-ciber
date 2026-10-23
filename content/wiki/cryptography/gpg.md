---
{"id":"crypto-gpg","title":"GPG / GnuPG","slug":"gpg","parent":"crypto-pgp","type":"tool","order":20,"related":["crypto-pgp-trust","crypto-signature","crypto-base64"],"sources":[{"id":"practice-1b","pages":[7,8]},{"id":"practice-guide","pages":[8]}],"aliases":["GNU Privacy Guard","GnuPG"],"permalink":"cryptography/pgp/gpg"}
---
## Herramienta y operaciones

GPG, GNU Privacy Guard o GnuPG, es la implementación libre de PGP presentada en la práctica. Gestiona claves y permite cifrar, descifrar, firmar y verificar. Las operaciones deben interpretarse por su propósito, no por la extensión del archivo resultante.

## Ejemplos locales ilustrativos

Los nombres siguientes son ficticios; los comandos se muestran para explicar el flujo y no fueron ejecutados sobre claves o documentos personales.

```text
gpg --list-keys
gpg --list-secret-keys
gpg --detach-sign informe.txt
gpg --verify informe.txt.sig informe.txt
gpg --armor --encrypt -r DESTINATARIO informe.txt
gpg --decrypt informe.txt.asc
```

La firma separada permite verificar `informe.txt` junto con su archivo de firma. Cifrar para `DESTINATARIO` es otra operación y requiere haber identificado correctamente su clave pública.

## ASCII armor y precisión de lectura

ASCII armor representa datos PGP binarios como texto imprimible. No constituye cifrado adicional. Una salida textual puede contener datos cifrados o una firma según la operación utilizada.

La explicación práctica describe `--sign` con una frase que mezcla firma y cifrado. Para evitar esa confusión, este ejemplo utiliza `--detach-sign` y muestra cifrado explícito por separado: una firma no proporciona confidencialidad por sí misma.

:::question ¿Qué diferencia hay entre listar claves públicas y claves secretas?
Las públicas permiten cifrar para otros o verificar firmas; las secretas están asociadas a operaciones privadas del titular. Una lista pública no demuestra que se posea el secreto necesario para descifrar.
:::
