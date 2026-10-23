---
{"id":"crypto-covert-channel","title":"Canales encubiertos de red","slug":"covert-channel","parent":"crypto-steganography","type":"technique","order":40,"related":["crypto-encoding","csirt-incidents","malware-ioc"],"sources":[{"id":"lecture-crypto-2","pages":[30]},{"id":"practice-1b","pages":[6]}],"aliases":["canal encubierto","covert channel","cover channel"],"permalink":"cryptography/steganography/covert-channel"}
---
## Definición

Un canal encubierto utiliza un medio de comunicación para transportar información adicional de manera que su existencia pase inadvertida. La clase menciona IP, ICMP y DNS como contextos en los que pueden construirse esos canales.

## Cómo interpretar el concepto

El protocolo visible actúa como portador. El mensaje oculto depende de una regla que asigna información a elementos observables de la comunicación. Conocer que se usó DNS o ICMP no basta para concluir que existió un canal encubierto: también son protocolos con usos legítimos.

## Ejemplo conceptual

Un análisis puede investigar si un patrón de campos o contenidos transmite una secuencia adicional. La conclusión requiere evidenciar la regla, la secuencia recuperada y el contexto, sin confundir una coincidencia aislada con una demostración.

Esta nota no configura infraestructura ni transmite datos. El objetivo es reconocer el mecanismo y registrar los límites de la evidencia.

:::question ¿Todo tráfico con contenido codificado constituye un canal encubierto?
No. Una representación codificada puede ser parte del funcionamiento normal de un protocolo. Debe demostrarse el uso como portador de una comunicación adicional y su contexto.
:::
