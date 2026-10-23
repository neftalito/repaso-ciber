---
{"id":"csirt-email-anatomy","title":"Sobre, encabezados y cuerpo","slug":"anatomia-del-mensaje","parent":"csirt-email","type":"concept","order":20,"aliases":["envelope","sobre SMTP","Return-Path","From","To","Reply-To"],"related":["csirt-smtp","csirt-headers","csirt-spoofing"],"sources":[{"id":"lecture-email","pages":[4,5,6,8,10,11,12,13,15]},{"id":"manual","pages":[21,23,29]},{"id":"practice-solutions","pages":[13,14]}]}
---
## Tres componentes conceptuales

La cátedra distingue sobre SMTP, encabezados y cuerpo. El sobre interviene en la transferencia y no forma parte del contenido del mensaje. Los encabezados describen propiedades del correo; el cuerpo contiene el texto u otros contenidos que recibe el destinatario.

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

## Un ejemplo con tres direcciones

Supongamos este mensaje didáctico:

```text
MAIL FROM:<rebotes@plataforma.example>
RCPT TO:<ana@institucion.example>

From: "Mesa de ayuda" <ayuda@institucion.example>
Reply-To: casos@soporte.example
Subject: Seguimiento de consulta
```

Si falla la entrega, la devolución se relaciona con el remitente del sobre. Si Ana pulsa «Responder», la respuesta normalmente se dirige a `Reply-To`. El `From` visible es otra dirección y no gobierna por sí solo esas dos operaciones.

## Independencia y límites

Que las direcciones difieran no demuestra necesariamente phishing: existen flujos legítimos con manejo separado de rebotes o respuestas. La discrepancia requiere contexto, evidencia de transporte y comparación con el servicio esperado. La [suplantación](wiki:csirt-spoofing) explota la confianza del usuario en campos informativos.

## Repaso

:::question ¿Una dirección en To prueba que ese fue el único destinatario real de la transacción?
No. To pertenece a los encabezados, mientras RCPT TO determina los destinatarios de transporte. Son componentes independientes y deben interpretarse según la evidencia disponible del envío y la entrega.
:::
