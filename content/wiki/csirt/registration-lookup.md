---
{"id":"csirt-registration-lookup","title":"Consulta de información de registro","slug":"consulta-de-registro","parent":"csirt-resources","type":"category","order":20,"related":["csirt-ip","csirt-domains","csirt-handling"],"sources":[{"id":"lecture-resources","pages":[3,6,7,16,17,18,19,20]}]}
---
## Propósito de la consulta

Consultar información de registro permite relacionar una dirección IP o un nombre de dominio con los responsables y contactos que figuran en las bases registrales. En un CSIRT, esos datos ayudan a dirigir reportes de incidentes, phishing, malware o abusos al contacto pertinente.

| Recurso consultado | Información presentada por la cátedra |
| --- | --- |
| Dirección IP | Bloque asignado, organización poseedora y contactos administrativo, técnico y de abuso o CSIRT. |
| Nombre de dominio | Registry y registrar intervinientes, información disponible del registrant y canales de contacto. |

Los [RIR](wiki:csirt-rir) mantienen las bases de recursos IP asignados. Para los dominios, el [sistema de registro](wiki:csirt-domains) distingue la información que mantiene el registry sobre el registrar y la que mantiene este último sobre el registrant.

## Protocolos de consulta

- [WHOIS](wiki:csirt-whois) presenta información en texto libre. La falta de un formato uniforme dificulta extraer campos automáticamente y exige interpretar la base que responde.
- [RDAP](wiki:csirt-rdap) es el sucesor presentado por la cátedra y devuelve datos estructurados en JSON, adecuados para su procesamiento automático.

Ambos se utilizan para información de registro de direcciones IP y dominios. La demostración del cliente icann-rdap se desarrolla dentro de RDAP como ejemplo práctico.

## Alcance de los datos públicos

Una consulta registral orienta la coordinación del incidente; no demuestra quién realizó la acción investigada. La información pública puede omitir datos personales o mostrar mecanismos intermediarios de contacto. La cátedra diferencia este trabajo del acceso a datos no públicos que requieren las autoridades competentes mediante los procedimientos correspondientes.

## Repaso

:::question ¿WHOIS y RDAP solo permiten investigar la asignación de direcciones IP?
No. La cátedra también los utiliza para consultar la información de registro de nombres de dominio. Cambian el recurso y los responsables que se buscan, pero en ambos casos es necesario interpretar la fuente y los límites de los datos disponibles.
:::
