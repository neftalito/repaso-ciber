---
{"id":"fundamentals-defense-depth","title":"Defensa en profundidad","slug":"defense-depth","parent":"fundamentals","type":"concept","order":80,"related":["fundamentals-risk","fundamentals-cia"],"sources":[{"id":"lecture-fundamentals","pages":[18]}]}
---
## Definición

La defensa en profundidad combina varias capas de protección para evitar que la seguridad dependa de una sola barrera. Las capas actúan sobre diferentes partes del entorno y pueden reducir tanto la posibilidad de un incidente como sus consecuencias.

## Capas presentadas en clase

| Ámbito | Ejemplos de controles |
| --- | --- |
| Perímetro | Firewall e IDS/IPS |
| Red interna | Segmentación |
| Equipos | Antivirus y EDR |
| Aplicaciones | WAF y validación de entradas |
| Datos | Cifrado y copias de respaldo |
| Comunicaciones | Cifrado del intercambio |
| Personas | Capacitación y autenticación multifactor |

## Ejemplo y límites

Ante un correo engañoso, la formación del usuario puede evitar la acción; otro control puede impedir un acceso no autorizado; una copia de respaldo puede ayudar a recuperar datos ante daño. Son objetivos complementarios. Sumar herramientas sin identificar qué protege cada una no demuestra que existan capas efectivas.

:::question ¿Por qué una copia de respaldo no reemplaza al control de acceso?
El respaldo ayuda a recuperar información, mientras que el control de acceso restringe quién puede utilizarla o modificarla. Una copia no evita que alguien lea o extraiga datos indebidamente.
:::
