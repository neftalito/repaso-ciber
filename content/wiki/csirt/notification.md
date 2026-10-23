---
{"id":"csirt-notification","title":"Notificación de incidentes","slug":"notificacion","parent":"csirt-handling","type":"practice","order":10,"aliases":["aviso de incidentes","contacto de notificación","timestamps de incidentes"],"related":["csirt-handling","csirt-whois","csirt-rdap","csirt-sensitive-information","csirt-tlp","crypto-pgp"],"sources":[{"id":"lecture-incidents","pages":[9,18,19,23,26]}]}
---
## Propósito y destinatario

Notificar un incidente permite que el responsable de un recurso conozca hechos relevantes, investigue lo ocurrido y actúe en su resolución. La página 18 de la presentación distingue tres exigencias concretas: encontrar el contacto adecuado, aportar registros con timestamps e indicar la zona horaria. El aviso forma parte de la [gestión del incidente](wiki:csirt-handling); su envío por sí solo no demuestra que el problema se haya resuelto.

La elección del destinatario depende del recurso involucrado. La clase relaciona los reportes externos con los contactos de [WHOIS](wiki:csirt-whois) y [RDAP](wiki:csirt-rdap). Esa información ayuda a localizar a un responsable capaz de investigar; no identifica por sí sola a la persona que produjo la actividad observada.

## Preparar el aviso

1. Identificar el recurso al que se refiere la evidencia y localizar su contacto adecuado.
2. Describir los hechos relevantes que ese responsable puede investigar.
3. Incorporar registros con sus timestamps y especificar la zona horaria.
4. Revisar los destinatarios, la sensibilidad de la evidencia y sus restricciones de difusión.
5. Comunicar el aviso y coordinar las acciones que correspondan al caso.

Estos pasos ordenan las exigencias de las páginas 18 y 23. La elección del canal debe acompañar el cuidado de la información que se intercambia.

## Información que debe poder investigarse

El destinatario necesita relacionar los hechos comunicados con sus propios registros. La notificación debe aportar la evidencia disponible y su referencia temporal, en vez de limitarse a una afirmación sobre la conducta de una persona.

| Elemento desarrollado en la clase | Para qué sirve |
| --- | --- |
| Recurso al que se refiere el aviso | Permite dirigir la investigación al ámbito administrado por el contacto |
| Hechos relevantes y registros asociados | Permiten que las partes investiguen y actúen sobre evidencia |
| Timestamps de los registros | Sitúan los eventos que deben correlacionarse |
| Zona horaria | Permite interpretar los tiempos desde otro sistema u organización |

Un timestamp aislado de su zona horaria puede hacer que el receptor busque en un intervalo equivocado. El modelo ficticio incluido en [Gestión de incidentes](wiki:csirt-handling#notificar-con-evidencia-utilizable) muestra una comunicación con recurso observado, intervalo, zona horaria y un pedido de verificación.

## Ejemplo de la clase

La página 19 muestra una notificación por correo sobre intentos de acceso SSH originados en una dirección de una red administrada por el destinatario. El mensaje incorpora un extracto de registros con intentos de autenticación, aclara la referencia horaria y solicita que el responsable investigue. Así concreta la relación entre contacto, evidencia y acción desarrollada en la página anterior.

La captura es un ejemplo académico: la dirección que aparece en ella es privada y se interpreta dentro de ese escenario. El aprendizaje transferible es comunicar observaciones verificables con su contexto, sin convertir automáticamente una dirección de origen en una atribución personal.

## Canal e información sensible

El ejemplo utiliza correo electrónico. Para intercambiar información sensible, las páginas 23 y 26 presentan el cuidado de la confidencialidad, TLP, reuniones presenciales y comunicaciones protegidas mediante PGP. Estas posibilidades no establecen un canal único obligatorio para todos los casos.

Antes de compartir evidencia deben revisarse los destinatarios y el alcance de difusión. [Manejo de información sensible](wiki:csirt-sensitive-information) desarrolla estas decisiones; [TLP](wiki:csirt-tlp) comunica hasta dónde puede circular la información y [PGP](wiki:crypto-pgp) explica el mecanismo criptográfico mencionado por la cátedra.

## Repaso

:::question ¿Qué debe poder hacer el responsable que recibe una notificación?
Debe poder relacionar los hechos y la evidencia con su recurso, investigar el intervalo indicado y actuar en consecuencia. Por eso importan el contacto adecuado, los registros, sus timestamps y la zona horaria.
:::

:::question ¿Que el ejemplo se envíe por correo permite compartir toda la evidencia sin revisar su sensibilidad?
No. El canal del ejemplo no elimina el deber de cuidado. Deben revisarse destinatarios, confidencialidad y restricciones de difusión según el contenido que se intercambia.
:::
