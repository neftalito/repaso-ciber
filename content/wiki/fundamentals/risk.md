---
{"id":"fundamentals-risk","title":"Amenaza, vulnerabilidad y riesgo","slug":"risk","parent":"fundamentals","type":"concept","order":40,"related":["fundamentals-threat","fundamentals-vulnerability","fundamentals-cia"],"sources":[{"id":"lecture-fundamentals","pages":[5,7]}]}
---
## Definición

El riesgo combina la posibilidad de que una amenaza aproveche una vulnerabilidad con el impacto resultante. La clase resume la relación como `Riesgo = Amenaza × Vulnerabilidad × Impacto`. Es una representación conceptual de dependencia entre factores; sin escalas y criterios definidos no constituye un cálculo numérico reproducible.

## Distinguir los componentes

| Componente | Caso de una cuenta institucional |
| --- | --- |
| Amenaza | Intento de obtener credenciales por engaño |
| Vulnerabilidad | Una práctica o configuración permite que el engaño prospere |
| Impacto | Lectura de documentos reservados o modificación de información |

La misma debilidad puede tener consecuencias diferentes según el recurso afectado. Una cuenta de pruebas y una cuenta que accede a información sensible no exponen el mismo impacto.

## Decidir con contexto

Evaluar riesgo exige identificar activos, vías posibles y consecuencias. Un control puede reducir la probabilidad de explotación o el impacto, sin eliminar todas las amenazas. La [defensa en profundidad](wiki:fundamentals-defense-depth) combina controles porque una única barrera puede fallar.

:::question ¿Una vulnerabilidad grave implica que ya hubo una filtración?
No. Describe una posibilidad de explotación y sus consecuencias potenciales. Afirmar una filtración requiere evidencia adicional, como accesos indebidos o transferencia de información.
:::

:::question ¿Es correcto multiplicar etiquetas como «alta» y «media» sin explicar la escala?
No. Para obtener un número interpretable deben definirse valores, criterios y supuestos. La expresión de la clase permite organizar el razonamiento, pero no aporta por sí sola esa metodología cuantitativa.
:::
