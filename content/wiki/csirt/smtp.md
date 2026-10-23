---
{"id":"csirt-smtp","title":"SMTP y flujo del correo","slug":"smtp","parent":"csirt-email","type":"protocol","order":10,"aliases":["Simple Mail Transfer Protocol","MAIL FROM","RCPT TO","DATA","POP","IMAP","Sobre, encabezados y cuerpo","envelope","sobre SMTP","Return-Path","From","To","Reply-To"],"related":["csirt-dns","csirt-headers","csirt-spoofing"],"sources":[{"id":"lecture-email","pages":[2,3,4,5,6,8,10,11,12,13,15]},{"id":"manual","pages":[20,21,22,23,29]},{"id":"practice-solutions","pages":[13,14]}]}
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

Para leer el intercambio, se sigue el orden de sus operaciones:

1. El servidor saluda con `220` y el cliente se presenta con `HELO`.
2. `MAIL FROM` declara el remitente de transporte y `RCPT TO`, el destinatario de la transacción: ambos construyen el sobre.
3. `DATA` solicita transmitir el mensaje; la respuesta `354` indica que el servidor espera esos datos.
4. El cliente transmite encabezados, una línea vacía y el cuerpo. El punto aislado termina los datos en el diálogo presentado.
5. El servidor confirma la aceptación y `QUIT` cierra el intercambio.

La demostración de las páginas 11 y 15 permite distinguir los comandos del cliente de las respuestas del servidor. El sobre encamina el mensaje; los campos incluidos después de `DATA` describen su contenido informativo.

## Lo que no demuestra la aceptación

Una respuesta de aceptación del servidor no valida la identidad humana declarada en `From`. La demostración de la cátedra muestra que las direcciones del sobre y de los encabezados son independientes. Tampoco debe confundirse una conexión a un servidor con autorización para retransmitir mensajes.

## Sobre, encabezados y cuerpo

### Qué gobierna cada componente

El sobre interviene en la transferencia y no forma parte del contenido del mensaje. Dentro del mensaje, los encabezados describen sus propiedades y el cuerpo contiene lo que recibe el destinatario. La separación permite entender por qué una dirección visible no determina necesariamente la entrega o la respuesta.

| Elemento | Función relevante |
| --- | --- |
| `MAIL FROM` del sobre | Indica el remitente de transporte, usado para devoluciones de entrega |
| `RCPT TO` del sobre | Indica destinatarios efectivos de la transacción |
| `From` | Declara el remitente visible del mensaje |
| `To` | Declara destinatarios en el contenido informativo del mensaje |
| `Reply-To` | Indica una dirección para la respuesta del usuario cuando está presente |
| `Return-Path` | Permite examinar la dirección de retorno registrada en el mensaje entregado |
| Cuerpo | Contiene el contenido posterior a los encabezados |

`Return-Path` es evidencia a interpretar en el contexto de la entrega; no convierte la dirección visible en una identidad autenticada. Los [encabezados](wiki:csirt-headers) completos permiten relacionarlo con la traza.

### Un ejemplo con tres direcciones

Supongamos este mensaje didáctico:

```text
MAIL FROM:<rebotes@plataforma.example>
RCPT TO:<ana@institucion.example>

From: "Mesa de ayuda" <ayuda@institucion.example>
Reply-To: casos@soporte.example
Subject: Seguimiento de consulta
```

Si falla la entrega, la devolución se relaciona con el remitente del sobre. Si Ana pulsa «Responder», la respuesta normalmente se dirige a `Reply-To`. El `From` visible es otra dirección y no gobierna por sí solo esas dos operaciones.

### Independencia y límites

Que las direcciones difieran no demuestra necesariamente phishing: existen flujos legítimos con manejo separado de rebotes o respuestas. La discrepancia requiere contexto, evidencia de transporte y comparación con el servicio esperado. La [suplantación](wiki:csirt-spoofing) explota la confianza del usuario en campos informativos.

### Repaso

:::question ¿Una dirección en To prueba que ese fue el único destinatario real de la transacción?
No. To pertenece a los encabezados, mientras RCPT TO determina los destinatarios de transporte. Son componentes independientes y deben interpretarse según la evidencia disponible del envío y la entrega.
:::

## Repaso

:::question ¿Consultar MX y enviar un correo son la misma operación?
No. MX es información consultada mediante DNS para localizar servidores receptores. SMTP realiza la transferencia del mensaje; una consulta DNS no prueba que un servidor haya recibido un correo concreto.
:::
