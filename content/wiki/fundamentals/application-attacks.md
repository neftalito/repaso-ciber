---
{"id":"fundamentals-application-attacks","title":"Ataques a aplicaciones","slug":"application-attacks","parent":"fundamentals-attacks","type":"category","order":30,"related":["fundamentals-vulnerability","fundamentals-defense-depth"],"sources":[{"id":"lecture-fundamentals","pages":[5,8]}]}
---
Los ataques a aplicaciones aprovechan una entrada o una función disponible para provocar un comportamiento indebido. La cátedra menciona tres casos que conviene distinguir: **SQL Injection** es una técnica de inyección; **RCE** describe la posibilidad de ejecutar código de forma remota; **SSRF** induce al servidor a realizar solicitudes. Sus mecanismos y consecuencias pueden ser diferentes.

## Conceptos relacionados

- [SQL Injection](wiki:fundamentals-sqli)
- [Ejecución remota de código (RCE)](wiki:fundamentals-rce)
- [Server-Side Request Forgery (SSRF)](wiki:fundamentals-ssrf)

Para evaluar un caso concreto hay que identificar la vulnerabilidad, las condiciones de explotación y el impacto sobre el sistema. La presentación los enumera a nivel introductorio, sin desarrollar un procedimiento de explotación.
