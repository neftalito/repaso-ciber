---
{"id":"csirt-whois","title":"WHOIS","slug":"whois","parent":"csirt-resources","type":"protocol","order":30,"related":["csirt-rdap","csirt-rir","csirt-domains"],"sources":[{"id":"lecture-resources","pages":[6,7,8,9,10,11,17,18]},{"id":"practice-solutions","pages":[11,12]}]}
---
## Definición

WHOIS es un protocolo de consulta de datos de registro utilizado para recursos como direcciones IP y dominios. La presentación destaca que sus respuestas son texto libre y pueden variar entre registros, lo que dificulta extraer automáticamente siempre los mismos campos.

## Qué buscar en una respuesta

En una consulta IP interesan el rango o prefijo, la entidad asignataria y los contactos administrativo, técnico y de abuso. En una consulta de dominio pueden aparecer el registrador, fechas y mecanismos de contacto del titular. Los nombres de los campos y su disponibilidad no son uniformes.

```text
inetnum: 203.0.113.0/24
owner: Laboratorio Ejemplo
abuse: abuse@lab.example
```

Este fragmento es ficticio y simplificado. Debe interpretarse como información registral, no como prueba de quién utilizó una máquina.

## Ejemplos de consulta y límites

La clase presenta comandos con esta forma, reproducidos aquí solo para explicar su lectura:

```text
whois 163.10.5.66
whois 163.10.5.66 -h whois.lacnic.net
```

El segundo especifica el servidor. En el caso histórico de la diapositiva permite superar una respuesta ERX genérica. No se ha ejecutado ninguna consulta externa ni se garantiza que una respuesta actual coincida con la captura.

Un resultado incompleto puede deberse a la base consultada o a restricciones de privacidad. No encontrar un nombre personal visible no demuestra que el recurso carezca de responsable. [RDAP](wiki:csirt-rdap) ofrece estructura para el procesamiento, pero también exige interpretar lo que los datos permiten concluir.

## Repaso

:::question ¿Por qué un programa que busca siempre una línea owner puede fallar al procesar WHOIS?
Porque la salida es heterogénea: el campo puede llamarse de otra manera, estar ausente o aparecer en comentarios. La extracción debe reconocer el formato y la fuente; no basta suponer un esquema universal.
:::
