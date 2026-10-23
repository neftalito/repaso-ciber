---
{"id":"practices-logs","title":"Caso: distinguir intentos fallidos de acceso confirmado","slug":"logs","parent":"practices","type":"practice","order":110,"related":["csirt-incidents","fundamentals-risk","practices-writeup"],"sources":[{"id":"practice-questions","pages":[11,12]},{"id":"practice-solutions","pages":[15]},{"id":"practice-guide","pages":[11,16]}]}
---
## Qué debe determinarse

El objetivo es distinguir intentos de autenticación fallidos y evidencia de acceso aceptado. El caso procede del solucionario complementario, página 15; no es un registro de un incidente real.

## Entrada del caso

Se recibe este extracto sintético de autenticación. El fragmento no incluye fecha ni zona horaria; esas ausencias deben consignarse al informar.

```text
22:01:01 Failed password for root from 203.0.113.66
22:01:03 Failed password for admin from 203.0.113.66
22:01:05 Failed password for invalid user prueba from 203.0.113.66
```

## Interpretación comprobable

Hay tres fallos desde la misma dirección en cuatro segundos, dirigidos a distintos nombres de usuario. Es un patrón compatible con intentos automatizados de credenciales o enumeración. El extracto no contiene un evento de autenticación aceptada para ese origen.

Eso permite informar intentos fallidos observados; no permite afirmar que no hubo acceso en otros momentos. Hay que revisar la ventana completa, las cuentas y la actividad posterior. Una línea `Accepted publickey` demostraría aceptación de una autenticación por clave para ese evento, pero aún habría que evaluar si estaba autorizada.

## Informe útil

Se conserva la fuente del log, la ventana temporal, origen y destino, servicio, éxito o fallo y volumen. La fecha y zona horaria faltantes se solicitan antes de correlacionar con otras organizaciones. No se atribuye la acción a la persona titular del recurso IP.

:::question ¿Por qué «no aparece Accepted en este extracto» es más preciso que «nadie logró entrar»?
Porque la primera afirmación describe toda la evidencia disponible. La segunda generaliza a registros y períodos que no se observaron; requeriría una cobertura mucho mayor.
:::
