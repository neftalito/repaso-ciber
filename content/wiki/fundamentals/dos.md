---
{"id":"fundamentals-dos","title":"Denegación de servicio (DoS y DDoS)","slug":"dos","parent":"fundamentals-attacks","type":"concept","order":40,"related":["fundamentals-cia","malware-botnet"],"sources":[{"id":"lecture-fundamentals","pages":[8]}],"aliases":["Denegación de servicio: DoS y DDoS"]}
---
## Definición

La denegación de servicio busca impedir o dificultar el acceso legítimo a un servicio. La clase presenta DoS y su variante distribuida, DDoS, dentro de los ataques que saturan servicios.

## Efecto y ejemplo

Si las solicitudes consumen la capacidad disponible, los usuarios autorizados pueden no obtener respuesta. El atributo directamente afectado es la disponibilidad. En la variante distribuida participan múltiples orígenes; el término describe esa distribución y no una identidad única del atacante.

## Límites

Un servicio lento o caído no demuestra por sí solo un ataque: también puede haber fallas o carga legítima. Para sostener la hipótesis se necesitan registros, volumen, origen y relación temporal con la interrupción.

:::question ¿Una caída demuestra que se robaron datos?
No. La interrupción aporta evidencia sobre disponibilidad. La pérdida de confidencialidad o integridad debe probarse por separado, aunque un mismo incidente pueda combinar varios efectos.
:::
