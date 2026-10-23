---
{"id":"csirt-headers","title":"Análisis de encabezados de correo","slug":"analisis-de-encabezados","parent":"csirt-email","type":"technique","order":30,"aliases":["Received","headers","traza de correo","Return-Path","IP de origen"],"related":["csirt-email-anatomy","csirt-ip","csirt-rdap","practices-writeup"],"sources":[{"id":"lecture-email","pages":[2,7,8,10,15,16]},{"id":"manual","pages":[22,23,24]},{"id":"practice-solutions","pages":[13,14]}]}
---
## Objetivo y evidencia inicial

El análisis de encabezados examina metadatos del mensaje para reconstruir servidores, direcciones, tiempos y destinos de respuesta. Es especialmente útil ante spam o phishing. Debe partir del mensaje original con encabezados completos: una captura del cuerpo no conserva la traza necesaria.

Los datos interesantes incluyen la IP del servidor emisor inmediato, los saltos posteriores, `From`, `Reply-To`, `Return-Path` y las fechas con su zona horaria. El nombre mostrado al usuario es una declaración que necesita contrastarse.

## Leer Received con límites de confianza

Los servidores añaden líneas `Received` conforme aceptan el mensaje. Para reconstruir el recorrido cronológico se leen normalmente desde abajo hacia arriba. Para evaluar su credibilidad, primero se identifica qué información proviene de servidores confiables del receptor: un emisor puede haber incorporado líneas antiguas falsas.

```text
Received: from mx.institucion.example (10.0.0.9)
  by buzon.institucion.example;
  Thu, 22 Oct 2026 10:01:00 -0300
Received: from relay.remoto.example (198.51.100.44)
  by mx.institucion.example;
  Thu, 22 Oct 2026 10:00:30 -0300
From: "Soporte" <ayuda@institucion.example>
Reply-To: consultas@servicio.example
```

En esta traza sintética, el salto inferior indica que `198.51.100.44` entregó el mensaje al MX institucional; el superior representa un salto interno desde `10.0.0.9`. La primera dirección pertenece aquí a un rango utilizado para ejemplos, no a un emisor real. La conclusión presupone que esos registros fueron añadidos por los servidores receptores indicados y pueden corroborarse.

## De la observación a la conclusión

1. Conservar el mensaje y reconocer los saltos confiables.
2. Extraer servidores, IP, tiempos y zonas horarias sin confundir direcciones privadas con orígenes públicos.
3. Comparar remitente visible, dirección de retorno y destino de respuesta.
4. Contrastar el recorrido con la información DNS y los registros del servidor disponibles.
5. Si corresponde notificar, localizar el contacto registral del recurso y enviar evidencia relevante.

La IP de un relay puede identificar infraestructura usada para el envío, sin revelar la computadora original ni la persona que redactó el mensaje. Una marca temporal discordante exige investigación; no debe repararse inventando una secuencia.

## Herramientas y datos sensibles

MXToolbox y Google Admin Toolbox ayudan a ordenar encabezados. El resultado debe cotejarse con el original y con la sensibilidad del material antes de compartirlo con un servicio externo.

## Repaso

:::question ¿Por qué no basta con elegir el Received más antiguo para identificar al atacante?
Porque las líneas antiguas pueden haber sido introducidas por el emisor y la IP observada puede corresponder a un intermediario. Se necesita establecer un límite de confianza y corroborar qué conexión vio realmente un servidor confiable.
:::
