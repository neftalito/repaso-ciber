---
{"id":"fundamentals-cia","title":"Tríada CIA","slug":"cia","parent":"fundamentals-security","type":"concept","order":10,"aliases":["confidencialidad","integridad","disponibilidad"],"related":[],"sources":[{"id":"lecture-fundamentals","pages":[2,3,4]},{"id":"lecture-incidents","pages":[2,3]}],"permalink":"fundamentals/cia"}
---
La **tríada CIA** reúne tres atributos que la seguridad de la información busca preservar. Sus iniciales provienen de *Confidentiality, Integrity, Availability*:

| Atributo | Qué significa |
| --- | --- |
| **Confidencialidad** | Solo las personas autorizadas pueden acceder a la información. |
| **Integridad** | Solo quien está autorizado puede crear o modificar la información. |
| **Disponibilidad** | Los usuarios autorizados pueden acceder a la información cuando la necesitan. |

Estos atributos permiten distinguir el efecto de un incidente. Un acceso indebido compromete la confidencialidad; una modificación indebida, la integridad; y la imposibilidad de acceder a la información cuando se necesita, la disponibilidad. Un mismo hecho puede afectar más de uno.

:::question ¿Que un servicio siga disponible descarta un problema de seguridad?
No. Puede mantenerse la disponibilidad y, al mismo tiempo, existir una pérdida de confidencialidad o de integridad.
:::
