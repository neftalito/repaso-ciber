---
{"id":"fundamentals-prompt-injection","title":"Inyección de instrucciones en LLM","slug":"prompt-injection","parent":"fundamentals-llm","type":"concept","order":10,"related":["fundamentals-risk","fundamentals-defense-depth"],"sources":[{"id":"lecture-fundamentals","pages":[16,17]}]}
---
## Definición

La inyección de instrucciones intenta que un modelo siga órdenes adversarias recibidas como parte de una consulta o de contenido que procesa. El problema aparece cuando el sistema trata ese contenido como si pudiera cambiar sus reglas o autorizar operaciones.

## Escenario de la clase

Un sistema de soporte utiliza un modelo con acceso a datos de clientes. Una petición maliciosa busca que ignore su tarea y divulgue información de otros usuarios. La existencia de la petición no demuestra que el sistema la ejecutó: el resultado depende de sus restricciones y capacidades efectivas.

## Qué evaluar

Conviene separar qué texto leyó el modelo, qué acceso tenía y qué acción realizó realmente. Un documento, invitación o mensaje puede contener instrucciones sin que su autor esté autorizado para dirigir el asistente. La defensa se analiza junto con los permisos y las capas de protección del sistema.

:::question ¿Cuál es el salto de confianza que intenta producir esta técnica?
Convertir contenido de menor confianza en una orden con capacidad de cambiar el comportamiento o usar recursos. El riesgo aumenta cuando el sistema puede acceder a datos o ejecutar acciones fuera de la solicitud legítima.
:::
