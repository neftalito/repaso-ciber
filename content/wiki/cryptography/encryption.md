---
{"id":"crypto-encryption","title":"Cifrado","slug":"encryption","parent":"cryptography","type":"concept","order":20,"related":["crypto-encoding","fundamentals-cia","crypto-signature"],"sources":[{"id":"lecture-crypto-1","pages":[9,10,11,13,16]},{"id":"lecture-crypto-2","pages":[4,7]}]}
---
## Transformar un mensaje mediante una clave

El **cifrado** transforma un mensaje legible, o **texto plano**, en **texto cifrado** mediante un algoritmo y una clave. El descifrado permite recuperar el original con la clave y los parámetros correspondientes. Su objetivo característico es la confidencialidad: restringir quién puede leer la información.

Cripto, parte 1, páginas 9–10, presenta este recorrido. El algoritmo establece el procedimiento; la clave interviene en la transformación aplicada. Conocer el procedimiento no equivale a poseer el secreto necesario para descifrar.

## Cómo se estudia en la Wiki

Los [métodos clásicos](wiki:crypto-classical) permiten comparar [sustitución](wiki:crypto-substitution) y [transposición](wiki:crypto-transposition). La [criptografía moderna](wiki:crypto-modern) distingue cifrado [simétrico](wiki:crypto-symmetric) y [asimétrico](wiki:crypto-asymmetric); los sistemas [híbridos](wiki:crypto-hybrid) combinan ambas familias.

En un esquema simétrico se utiliza el mismo secreto para cifrar y descifrar. Cripto, parte 2, páginas 4 y 7, muestra el uso asimétrico: el emisor cifra con la pública del destinatario y este descifra con su privada.

## Distinguir los objetivos

El cifrado se relaciona con la [tríada CIA](wiki:fundamentals-cia) por la confidencialidad, pero no reúne automáticamente todos los servicios de seguridad. La [codificación](wiki:crypto-encoding) representa datos; los [hashes](wiki:crypto-hash) calculan resúmenes; las [firmas](wiki:crypto-signature) permiten verificar origen e integridad; el [acuerdo de claves](wiki:crypto-key-agreement) establece un secreto compartido.

La página de [César y ROT](wiki:crypto-caesar) desarrolla un ejemplo clásico del mecanismo de cifrado y sus límites.

:::question ¿Conocer el algoritmo equivale a poder descifrar cualquier mensaje?
No. También se necesitan la clave y los parámetros correspondientes al esquema. La descripción del procedimiento no entrega automáticamente esos valores.
:::

:::question ¿Cifrar un mensaje garantiza por sí solo su autenticidad?
No. Restringir la lectura y comprobar el origen son objetivos distintos. La autenticidad requiere los mecanismos y las comprobaciones correspondientes.
:::
