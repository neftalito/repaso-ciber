---
{"id":"csirt-mxtoolbox","title":"MXToolbox Email Headers","slug":"mxtoolbox","parent":"csirt-headers","type":"tool","order":10,"related":["csirt-headers","csirt-google-messageheader","csirt-sensitive-information"],"sources":[{"id":"lecture-email","pages":[16]},{"id":"manual","pages":[24]},{"id":"lecture-incidents","pages":[23]}]}
---
## Para qué se utiliza

MXToolbox Email Headers es una herramienta en línea que la clase menciona para simplificar la inspección de encabezados. Su utilidad está en ayudar a organizar la lectura de una traza extensa. La presentación advierte que el procesamiento automático puede no interpretar correctamente todos los casos.

## Forma de trabajo razonada

El punto de partida debe ser el mensaje original con sus encabezados completos. El analista compara la interpretación obtenida con las líneas originales, identifica qué servidores son confiables y comprueba los tiempos. El resultado de una herramienta es una ayuda de lectura, no una nueva fuente independiente que autentique al remitente.

Como ejercicio, se puede estudiar una traza sintética con un servidor externo y un salto privado interno. Si una interpretación automática presenta la dirección privada como origen público del incidente, corresponde explicar el salto y corregir la conclusión, conservando el original como evidencia.

## Confidencialidad y límite del servicio

Los encabezados pueden revelar direcciones de correo, infraestructura y otros datos del caso. Antes de introducir información en un servicio en línea debe evaluarse si se permite compartirla. El deber de cuidado del CSIRT también se aplica a los datos que usa para analizar un incidente.

La cátedra no necesita una función específica de la interfaz para sostener este método: lo relevante es interpretar y corroborar la traza, sin confiar ciegamente en el resumen automático.

## Repaso

:::question ¿Un resumen de MXToolbox sustituye conservar los encabezados originales?
No. La interpretación puede ser incompleta o incorrecta. Los encabezados originales permiten revisar las líneas, cuestionar los supuestos y justificar qué saltos respaldan la conclusión.
:::
