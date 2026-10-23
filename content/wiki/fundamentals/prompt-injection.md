---
{"id":"fundamentals-prompt-injection","title":"Prompt Injection","slug":"prompt-injection","parent":"fundamentals-llm","type":"concept","order":10,"related":["fundamentals-risk","fundamentals-defense-depth"],"sources":[{"id":"lecture-fundamentals","pages":[16,17]}],"aliases":["Inyección de instrucciones en LLM"]}
---
## Definición

La inyección de instrucciones intenta que un modelo siga órdenes adversarias recibidas como parte de una consulta o de contenido que procesa. El problema aparece cuando el sistema trata ese contenido como si pudiera cambiar sus reglas o autorizar operaciones.

## Escenario de la clase

Un sistema de soporte utiliza un modelo con acceso a datos de clientes. Una petición maliciosa busca que ignore su tarea y divulgue información de otros usuarios. La existencia de la petición no demuestra que el sistema la ejecutó: el resultado depende de sus restricciones y capacidades efectivas.

## Qué evaluar

Conviene separar qué texto leyó el modelo, qué acceso tenía y qué acción realizó realmente. Un documento, invitación o mensaje puede contener instrucciones sin que su autor esté autorizado para dirigir el asistente. La defensa se analiza junto con los permisos y las capas de protección del sistema.

## Pedido y consecuencia en el ejemplo

En la diapositiva 17, el cliente malicioso pide ignorar las instrucciones anteriores, listar los datos de todos los clientes y enviarlos por correo al atacante. El desvío buscado combina acceso indebido y divulgación de información. Para que ocurra, el sistema debe disponer de acceso y capacidad de realizar esas acciones; el texto de la petición no confirma su ejecución.

## Relación con jailbreak

**Aclaración terminológica:** la diapositiva titula el caso «Prompt Injection / jail break», pero no define ambos términos por separado. Aquí, Prompt Injection se refiere al intento de desviar la tarea mediante instrucciones adversarias; jailbreak suele referirse a intentar eludir restricciones de comportamiento del modelo. Pueden relacionarse, pero no son equivalentes: el caso de soporte se analiza por el desvío de instrucciones y el acceso a datos, sin suponer que toda inyección produzca una evasión de restricciones o una filtración.

:::question ¿Cuál es el salto de confianza que intenta producir esta técnica?
Convertir contenido de menor confianza en una orden con capacidad de cambiar el comportamiento o usar recursos. El riesgo aumenta cuando el sistema puede acceder a datos o ejecutar acciones fuera de la solicitud legítima.
:::
