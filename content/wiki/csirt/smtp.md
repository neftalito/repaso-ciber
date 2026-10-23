---
{"id":"csirt-smtp","title":"SMTP y flujo del correo","slug":"smtp","parent":"csirt-email","type":"protocol","order":10,"aliases":["Simple Mail Transfer Protocol","MAIL FROM","RCPT TO","DATA","POP","IMAP"],"related":["csirt-dns","csirt-email-anatomy","csirt-headers"],"sources":[{"id":"lecture-email","pages":[2,3,5,11,12]},{"id":"manual","pages":[20,21,22]}]}
---
## Función

SMTP, Simple Mail Transfer Protocol, transfiere mensajes de correo. La clase muestra el envío desde el usuario hacia su servidor y la transferencia entre servidores, típicamente por TCP/25. La consulta del buzón por POP o IMAP cumple otra función: acceder a mensajes recibidos.

El esquema de estudio es usuario emisor → servidor de envío → servidor receptor → buzón → usuario receptor. Puede haber intermediarios. DNS aporta registros MX para localizar servidores que reciben correo del dominio destinatario.

## Una transacción explicada

El siguiente diálogo es ficticio y representa un intercambio académico, no una instrucción para conectarse a un servidor externo. `C` identifica al cliente y `S` al servidor.

```text
S: 220 mx.lab.example ESMTP
C: HELO cliente.lab.example
S: 250 mx.lab.example
C: MAIL FROM:<rebotes@lab.example>
S: 250 OK
C: RCPT TO:<destino@lab.example>
S: 250 OK
C: DATA
S: 354 End data with <CRLF>.<CRLF>
C: From: emisor@lab.example
C: To: destino@lab.example
C: Subject: Prueba didáctica
C:
C: Mensaje de laboratorio.
C: .
S: 250 Queued
C: QUIT
S: 221 Bye
```

`MAIL FROM` y `RCPT TO` construyen el sobre de transporte. Después de `DATA` se transmiten encabezados y cuerpo; la línea vacía los separa. El punto aislado termina los datos en el diálogo presentado. Los códigos indican la respuesta del servidor a cada operación.

## Lo que no demuestra la aceptación

Una respuesta de aceptación del servidor no valida la identidad humana declarada en `From`. La demostración de la cátedra muestra que las direcciones del sobre y de los encabezados son independientes. Tampoco debe confundirse una conexión a un servidor con autorización para retransmitir mensajes.

## Repaso

:::question ¿Consultar MX y enviar un correo son la misma operación?
No. MX es información consultada mediante DNS para localizar servidores receptores. SMTP realiza la transferencia del mensaje; una consulta DNS no prueba que un servidor haya recibido un correo concreto.
:::
