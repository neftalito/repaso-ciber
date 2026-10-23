---
{"id":"csirt-spoofing","title":"Suplantación del remitente (Email Spoofing)","slug":"suplantacion-del-remitente","parent":"csirt-email","type":"technique","order":40,"aliases":["email spoofing","From falso","Reply-To","phishing","Suplantación del remitente de correo"],"related":["csirt-smtp","csirt-headers","crypto-signature"],"sources":[{"id":"lecture-email","pages":[10,11,12,13,14]},{"id":"manual","pages":[21,23,24,29]},{"id":"practice-solutions","pages":[13,14]}]}
---
## Mecanismo

La suplantación del remitente aprovecha que los encabezados informativos pueden declarar una identidad que no coincide con el transporte real. La cátedra demuestra la independencia entre `MAIL FROM`, `From` y `Reply-To`: el usuario puede ver un remitente y responder a otra cuenta.

Que un mensaje muestre el nombre de una autoridad no prueba que esa autoridad lo haya enviado. Tampoco es necesario asumir el robo de una cuenta solo porque su dirección aparece en `From`.

La separación entre el sobre y los campos informativos se desarrolla en [SMTP y flujo del correo](wiki:csirt-smtp#sobre-encabezados-y-cuerpo). Esa base permite interpretar qué parte de una identidad declarada puede contrastarse con los [encabezados](wiki:csirt-headers).

## Ejemplo de investigación

Un correo ficticio muestra `From: direccion@institucion.example`, pero contiene `Reply-To: pagos@otro.example`. El servidor institucional no registra un envío equivalente. La hipótesis de suplantación es compatible con esos datos, porque otro servidor puede transmitir un mensaje con una identidad informativa ajena.

La investigación debe revisar los [encabezados completos](wiki:csirt-headers), el servidor que realizó la conexión observada, los tiempos y el contexto del pedido. La falta de un registro local aislado no alcanza para demostrar toda la cadena de hechos.

## Discrepancia no equivale a fraude

Servicios legítimos pueden usar una dirección para rebotes, otra visible y otra para respuestas. Una diferencia merece atención cuando contradice lo esperado o se combina con otros indicios, por ejemplo un pedido inesperado de credenciales. La conclusión debe expresar la evidencia disponible y sus límites.

Esta nota se concentra en el mecanismo demostrado en clase. La [firma digital](wiki:crypto-signature) explica cómo se verifica una firma criptográfica; no debe confundirse con el simple texto del campo `From` ni con la firma escrita al final del cuerpo.

## Repaso

:::question ¿Un From con una cuenta inexistente demuestra que se comprometió el SMTP del dominio mostrado?
No. El campo visible puede declararse desde infraestructura distinta. Es necesario examinar la traza confiable y los registros: la presencia del nombre del dominio no demuestra el uso de su servidor ni el compromiso de una cuenta.
:::
