---
{"id":"practices-pcap","title":"Caso: reconstruir datos en una captura de red","slug":"pcap","parent":"practices","type":"practice","order":120,"related":["csirt-dns","crypto-encoding","malware-wireshark","practices-writeup"],"sources":[{"id":"practice-questions","pages":[12]},{"id":"practice-solutions","pages":[16]},{"id":"practice-guide","pages":[12,13]}]}
---
## Caso ICMP

El ejercicio entrega cuatro primeros bytes de datos de paquetes ICMP, en orden: `49`, `43`, `7b`, `7d`, expresados en hexadecimal. Interpretarlos como ASCII produce `IC{}`. Se puede comprobar localmente con `bytes.fromhex('49 43 7b 7d').decode('ascii')`.

El orden viene dado por el problema. En una captura real deben verificarse secuencias, dirección y duplicados antes de concatenar; mezclar paquetes puede generar un mensaje falso.

## Caso DNS

La etiqueta inicial de `49437b646e737d.data.example` se propone como hexadecimal. Separada en bytes, `49 43 7b 64 6e 73 7d` representa `IC{dns}`. Es una lectura del caso sintético, no una consulta DNS ni un hallazgo sobre un dominio real.

## Justificar la conclusión

El contenido legible es un dato para investigar. Para sostener un canal encubierto se examinan protocolo, frecuencia, continuidad de la secuencia y contexto. Una etiqueta larga o un ping periódico aislado también puede ser legítimo. En un writeup deben conservarse filtro, campos extraídos y orden de reconstrucción.

:::question ¿Por qué recuperar texto desde un paquete no demuestra por sí solo exfiltración de archivos?
Porque prueba únicamente que esos bytes estaban presentes bajo la interpretación indicada. Demostrar salida de información de un sistema exige relacionar contenido, dirección y contexto, sin asumir archivos completos a partir de una secuencia corta.
:::
