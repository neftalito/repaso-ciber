---
{"id":"fundamentals-rce","title":"Ejecución remota de código (RCE)","slug":"rce","parent":"fundamentals-application-attacks","type":"concept","order":20,"related":["fundamentals-vulnerability","fundamentals-risk"],"sources":[{"id":"lecture-fundamentals","pages":[5,8]}]}
---
## Definición y alcance

RCE se refiere a ejecución remota de código. La clase la incluye entre los problemas de aplicaciones: un actor podría conseguir que un sistema ejecute código fuera de la operación autorizada. El alcance real depende de los permisos y recursos disponibles en ese contexto.

## Ejemplo conceptual y límites

Un informe que sospecha ejecución remota debe diferenciar esa posibilidad de una acción registrada. Se buscaría evidencia del proceso, su origen y sus efectos; una respuesta anómala de la aplicación no prueba por sí sola que se ejecutó código. La presentación no desarrolla aquí procedimientos para explotar esta clase de problema.

## Capacidad y origen

RCE describe una capacidad o una consecuencia, no una única técnica de explotación. Diferentes vulnerabilidades o técnicas pueden hacer posible esa ejecución. Esta precisión amplía la etiqueta introductoria de la diapositiva 8 y evita confundirla con el mecanismo particular de SQL Injection o SSRF.

:::question ¿RCE implica necesariamente control administrativo completo del equipo?
No puede deducirse ese alcance solo del nombre. Deben determinarse el contexto de ejecución, los permisos y los efectos realmente posibles u observados.
:::
