---
{"id":"crypto-covert-channel","title":"Canales encubiertos de red","slug":"covert-channel","parent":"crypto-steganography","type":"technique","order":40,"related":["crypto-encoding","csirt-incidents","malware-ioc"],"sources":[{"id":"lecture-crypto-2","pages":[30]},{"id":"practice-1b","pages":[6]}],"aliases":["canal encubierto","covert channel","cover channel"],"permalink":"cryptography/steganography/covert-channel"}
---
## Comunicación que busca pasar inadvertida

Un canal encubierto utiliza una comunicación como portador de información cuya existencia se intenta ocultar. En la esteganografía, la pregunta no es solamente qué significa el contenido: también importa que un observador no reconozca que se está transmitiendo ese mensaje adicional.

La página 30 de *Cripto, parte 2* presenta IP, ICMP y DNS como protocolos que pueden utilizarse para construir canales encubiertos de red.

## Qué hace falta para reconocerlo

El protocolo visible aporta el medio de transporte. El esquema de ocultamiento establece cómo se incorpora y recupera la información. Identificar el protocolo, por sí solo, no demuestra que haya un mensaje oculto: hay que reconocer también la regla y la evidencia que respalda esa interpretación.

## Alcance de la explicación

La presentación enumera los protocolos, pero no desarrolla un formato de mensaje, campos concretos ni un procedimiento de extracción para cada uno. No permite deducir una implementación única a partir de la expresión «canal encubierto».

Tampoco debe confundirse [codificar](wiki:crypto-encoding) el contenido con ocultar la existencia de la comunicación. Son funciones diferentes que deben analizarse según el caso.

:::question ¿Todo tráfico con contenido codificado constituye un canal encubierto?
No. La codificación puede ser parte del funcionamiento visible de la comunicación. Para sostener la hipótesis de un canal encubierto se necesita evidencia del uso como portador de un mensaje oculto.
:::
