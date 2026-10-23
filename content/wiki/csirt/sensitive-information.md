---
{"id":"csirt-sensitive-information","title":"Manejo de información sensible del incidente","slug":"informacion-sensible","parent":"csirt-incidents","type":"practice","order":20,"aliases":["confidencialidad del reporte","PGP en CSIRT","intercambio seguro"],"related":["csirt-tlp","crypto-encryption","crypto-signature","fundamentals-cia"],"sources":[{"id":"lecture-incidents","pages":[23,24,26]},{"id":"manual","pages":[27,28]}]}
---
## Qué se protege

La evidencia de un incidente puede contener información de afectados, detalles internos y datos que agraven el problema si se difunden. La cátedra exige cuidado en su manejo y reserva del acceso a quienes corresponda. La necesidad de coordinar con otros equipos no autoriza una difusión indiscriminada.

## Tres decisiones distintas

1. Determinar qué destinatarios necesitan recibir la información para investigar o actuar.
2. Expresar con quién podrán compartirla, mediante [TLP](wiki:csirt-tlp) y las restricciones aplicables.
3. Elegir una forma de intercambio que proteja el contenido sensible.

La clase presenta reuniones presenciales y criptografía, en particular PGP, como posibilidades para intercambiar información. Incluye el envío de datos entre integrantes del equipo, informes de pruebas de penetración e informes forenses.

## Confidencialidad y autenticidad

El [cifrado](wiki:crypto-encryption) y la [firma digital](wiki:crypto-signature) responden preguntas diferentes. Cifrar un informe para sus destinatarios busca restringir su lectura. Firmarlo permite verificar la firma y las propiedades de integridad y autenticidad que ese mecanismo ofrece bajo sus supuestos de confianza.

Una etiqueta TLP no realiza ninguna de esas operaciones criptográficas. Del mismo modo, que un archivo esté cifrado no explica si el receptor puede reenviarlo ni a quién: esa decisión debe comunicarse aparte.

## Ejemplo

Un equipo necesita enviar un informe con datos personales a otro CSIRT para coordinar una investigación. Selecciona la evidencia necesaria, verifica los destinatarios, expresa las restricciones de difusión y utiliza el mecanismo criptográfico acordado. El informe completo no debe publicarse solo porque contiene información útil sobre una amenaza.

## Repaso

:::question ¿Firmar un informe alcanza para ocultar los nombres de las víctimas a terceros?
No. La firma permite verificar determinadas propiedades del mensaje, pero no oculta su contenido. La confidencialidad requiere restringir el acceso y, cuando corresponda, cifrar el intercambio para los destinatarios adecuados.
:::
