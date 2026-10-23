---
{"id":"fundamentals-defense-depth","title":"Defensa en profundidad","slug":"defense-depth","parent":"fundamentals","type":"concept","order":80,"related":["fundamentals-risk","fundamentals-cia"],"sources":[{"id":"lecture-fundamentals","pages":[18]}]}
---
La **defensa en profundidad** combina controles en distintas capas. Si una barrera falla, otras pueden seguir protegiendo la información o limitar las consecuencias de un incidente.

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

La diapositiva 18 distingue estas siete capas. **Hosts** se refiere a los equipos y **usuarios**, a las personas. Los controles cumplen funciones diferentes: una copia de respaldo ayuda a recuperar datos, mientras que un control de acceso restringe quién puede utilizarlos. Para evaluar la defensa hay que entender qué cubre cada capa.

:::question ¿Un único control fuerte reemplaza la defensa en profundidad?
No. La defensa en profundidad requiere capas complementarias para que una falla puntual no deje toda la protección expuesta.
:::
