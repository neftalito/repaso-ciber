---
{"id":"practices","title":"Prácticas y resolución razonada","slug":"practices","parent":"wiki","type":"category","order":50,"related":["crypto-encoding","csirt-incidents","malware-analysis"],"sources":[{"id":"lecture-writeup","pages":[1,2,3,4]},{"id":"practice-guide","pages":[2,15,16,18]}]}
---
## Cómo estudiar con casos

Las prácticas aplican conceptos a problemas concretos. Cada recorrido distingue datos de entrada, procedimiento, resultado comprobable y límites. Un [writeup](wiki:practices-writeup) documenta las decisiones y las evidencias que permiten seguir la solución.

Los cálculos y casos sintéticos permiten comprobar razonamientos. Cuando faltan archivos del CTF, capturas, mensajes o claves, se identifica qué evidencia sería necesaria: no se inventan flags ni resultados de herramientas. Cada caso distingue los datos oficiales de las ampliaciones del material complementario.

## Representaciones y cálculos criptográficos

- [Reconocer y decodificar representaciones](wiki:practices-encoding).
- [Distinguir sustitución y transposición](wiki:practices-classical).
- [Recuperar texto con XOR de un byte](wiki:practices-xor).
- [Comprobar un hash con salt](wiki:practices-hash-check).
- [Verificar un cálculo RSA](wiki:practices-rsa).
- [Comprobar el secreto de Diffie-Hellman](wiki:practices-dh).
- [Verificar una firma y su identidad](wiki:practices-signatures).
- [Reconstruir una letra desde bits LSB](wiki:practices-steganography).
- [Comparar texto con un carácter invisible](wiki:practices-unicode).

## Interpretación de registros y comunicaciones

- [Reconstruir el origen técnico de un correo](wiki:practices-email).
- [Distinguir intentos fallidos y acceso confirmado](wiki:practices-logs).
- [Reconstruir datos en una captura de red](wiki:practices-pcap).

## Inspección de archivos y comportamiento

- [Triage estático de un ejecutable](wiki:practices-malware-static).
- [Correlacionar procesos, persistencia y red](wiki:practices-malware-timeline).
- [Reconstruir texto ofuscado sin ejecutar un script](wiki:practices-script-inspection).
- [Revisar documentos con contenido activo](wiki:practices-document-inspection).
