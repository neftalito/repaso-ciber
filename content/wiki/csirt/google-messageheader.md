---
{"id":"csirt-google-messageheader","title":"Google Admin Toolbox Messageheader","slug":"google-messageheader","parent":"csirt-headers","type":"tool","order":20,"aliases":["Google Admin Toolbox","Messageheader"],"related":["csirt-headers","csirt-mxtoolbox","csirt-sensitive-information"],"sources":[{"id":"lecture-email","pages":[16]},{"id":"manual","pages":[24]},{"id":"lecture-incidents","pages":[23]}]}
---
## Función

Messageheader, de Google Admin Toolbox, es otra herramienta en línea señalada por la cátedra para facilitar el procesamiento de encabezados de correo. Sirve como apoyo a la inspección de una traza; su disponibilidad no elimina la necesidad de conocer SMTP ni la diferencia entre sobre y encabezados.

## Qué verificar en su interpretación

Una lectura útil debe permitir relacionar cada salto con el servidor que recibe y el que entrega, conservar las marcas temporales y distinguir nombres declarados de conexiones observadas. El analista debe volver al original cuando un resultado no sea claro o parezca contradecir otros registros.

Por ejemplo, ante dos saltos que contienen zonas horarias diferentes, no corresponde comparar únicamente la hora escrita. La cronología requiere interpretar ambas marcas en una referencia compatible. Un orden visual o un resumen automático no constituye por sí solo una explicación del incidente.

## Alcance y cuidado de los datos

Una herramienta de encabezados no identifica automáticamente a la persona que redactó el mensaje ni determina por sí sola que sea legítimo. Puede facilitar una hipótesis que luego debe corroborarse con evidencia confiable.

Además, trasladar encabezados a un servicio externo implica compartir datos. Antes de hacerlo deben revisarse las restricciones del caso y la información sensible incluida. Para estudiar el procedimiento pueden utilizarse trazas sintéticas, como las de esta wiki, sin exponer un incidente real.

## Repaso

:::question ¿Dos horas distintas en un resumen prueban que se falsificó la traza?
No. Pueden corresponder a zonas horarias diferentes u otras condiciones que necesitan análisis. Deben examinarse las marcas completas y su procedencia antes de afirmar una alteración.
:::
