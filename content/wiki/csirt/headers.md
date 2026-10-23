---
{"id":"csirt-headers","title":"Análisis de encabezados de correo","slug":"analisis-de-encabezados","parent":"csirt-email","type":"technique","order":30,"aliases":["Received","headers","traza de correo","Return-Path","IP de origen","MXToolbox Email Headers","Google Admin Toolbox Messageheader","Google Admin Toolbox","Messageheader"],"related":["csirt-smtp","csirt-ip","csirt-rdap","csirt-spoofing","csirt-sensitive-information","practices-writeup"],"sources":[{"id":"lecture-email","pages":[2,7,8,10,15,16]},{"id":"manual","pages":[22,23,24]},{"id":"practice-solutions","pages":[13,14]},{"id":"lecture-incidents","pages":[23]}]}
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

## MXToolbox Email Headers

### Para qué se utiliza

MXToolbox Email Headers es una herramienta en línea que la clase menciona para simplificar la inspección de encabezados. Su utilidad está en ayudar a organizar la lectura de una traza extensa. La presentación advierte que el procesamiento automático puede no interpretar correctamente todos los casos.

### Forma de trabajo razonada

El punto de partida debe ser el mensaje original con sus encabezados completos. El analista compara la interpretación obtenida con las líneas originales, identifica qué servidores son confiables y comprueba los tiempos. El resultado de una herramienta es una ayuda de lectura, no una nueva fuente independiente que autentique al remitente.

Como ejercicio, se puede estudiar una traza sintética con un servidor externo y un salto privado interno. Si una interpretación automática presenta la dirección privada como origen público del incidente, corresponde explicar el salto y corregir la conclusión, conservando el original como evidencia.

### Confidencialidad y límite del servicio

Los encabezados pueden revelar direcciones de correo, infraestructura y otros datos del caso. Antes de introducir información en un servicio en línea debe evaluarse si se permite compartirla. El deber de cuidado del CSIRT también se aplica a los datos que usa para analizar un incidente.

La cátedra no necesita una función específica de la interfaz para sostener este método: lo relevante es interpretar y corroborar la traza, sin confiar ciegamente en el resumen automático.

### Repaso

:::question ¿Un resumen de MXToolbox sustituye conservar los encabezados originales?
No. La interpretación puede ser incompleta o incorrecta. Los encabezados originales permiten revisar las líneas, cuestionar los supuestos y justificar qué saltos respaldan la conclusión.
:::

## Google Admin Toolbox Messageheader

### Función

Messageheader, de Google Admin Toolbox, es otra herramienta en línea señalada por la cátedra para facilitar el procesamiento de encabezados de correo. Sirve como apoyo a la inspección de una traza; su disponibilidad no elimina la necesidad de conocer SMTP ni la diferencia entre sobre y encabezados.

### Qué verificar en su interpretación

Una lectura útil debe permitir relacionar cada salto con el servidor que recibe y el que entrega, conservar las marcas temporales y distinguir nombres declarados de conexiones observadas. El analista debe volver al original cuando un resultado no sea claro o parezca contradecir otros registros.

Por ejemplo, ante dos saltos que contienen zonas horarias diferentes, no corresponde comparar únicamente la hora escrita. La cronología requiere interpretar ambas marcas en una referencia compatible. Un orden visual o un resumen automático no constituye por sí solo una explicación del incidente.

### Alcance y cuidado de los datos

Una herramienta de encabezados no identifica automáticamente a la persona que redactó el mensaje ni determina por sí sola que sea legítimo. Puede facilitar una hipótesis que luego debe corroborarse con evidencia confiable.

Además, trasladar encabezados a un servicio externo implica compartir datos. Antes de hacerlo deben revisarse las restricciones del caso y la información sensible incluida. Para estudiar el procedimiento pueden utilizarse trazas sintéticas, como las de esta wiki, sin exponer un incidente real.

### Repaso

:::question ¿Dos horas distintas en un resumen prueban que se falsificó la traza?
No. Pueden corresponder a zonas horarias diferentes u otras condiciones que necesitan análisis. Deben examinarse las marcas completas y su procedencia antes de afirmar una alteración.
:::

## Repaso

:::question ¿Por qué no basta con elegir el Received más antiguo para identificar al atacante?
Porque las líneas antiguas pueden haber sido introducidas por el emisor y la IP observada puede corresponder a un intermediario. Se necesita establecer un límite de confianza y corroborar qué conexión vio realmente un servidor confiable.
:::
