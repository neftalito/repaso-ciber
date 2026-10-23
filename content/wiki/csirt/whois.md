---
{"id":"csirt-whois","title":"WHOIS","slug":"whois","parent":"csirt-registration-lookup","type":"protocol","order":10,"related":["csirt-rdap","csirt-rir","csirt-domains"],"sources":[{"id":"lecture-resources","pages":[6,7,8,9,10,11,17,18]},{"id":"practice-solutions","pages":[11,12]}],"permalink":"csirt/recursos-de-internet/whois"}
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

La demostración se interpreta en tres pasos:

1. La primera consulta devuelve un registro histórico ERX genérico para un bloque amplio.
2. Las observaciones de esa respuesta indican que la información específica debe buscarse en el RIR correspondiente.
3. La segunda consulta especifica el servidor de LACNIC y obtiene el bloque `163.10.0.0/16`, la Universidad Nacional de La Plata como entidad asignataria y sus referencias de contacto.

Las páginas 9 a 11 muestran este caso histórico. No se ha ejecutado ninguna consulta externa ni se garantiza que una respuesta actual coincida con la captura.

Un resultado incompleto puede deberse a la base consultada o a restricciones de privacidad. No encontrar un nombre personal visible no demuestra que el recurso carezca de responsable. [RDAP](wiki:csirt-rdap) ofrece estructura para el procesamiento, pero también exige interpretar lo que los datos permiten concluir.

## Consulta de un dominio

La presentación también consulta un nombre de dominio:

```text
whois cualesmiip.com
```

En la captura académica aparecen `Domain Name`, `Registrar WHOIS Server`, fechas de creación y vencimiento, `Registrar` y `Registrar Abuse Contact Email`. Los campos del registrante muestran `Redacted by Privacy` y un enlace intermediario de contacto. El servidor del registrar y su canal de abuso permiten distinguirlo del titular del dominio. Esta salida corresponde al ejemplo de clase; el comando es ilustrativo y no se ejecutó para esta wiki.

## Comparación con RDAP

Ambos protocolos permiten consultar información registral de IP y dominios. WHOIS devuelve texto libre; [RDAP](wiki:csirt-rdap) utiliza JSON con una estructura adecuada para el procesamiento automático. La diferencia de formato no elimina las restricciones de privacidad ni convierte un contacto registral en prueba de autoría.

## Repaso

:::question ¿Por qué un programa que busca siempre una línea owner puede fallar al procesar WHOIS?
Porque la salida es heterogénea: el campo puede llamarse de otra manera, estar ausente o aparecer en comentarios. La extracción debe reconocer el formato y la fuente; no basta suponer un esquema universal.
:::
