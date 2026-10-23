---
{"id":"practices-document-inspection","title":"Caso: revisar documentos con contenido activo","slug":"document-inspection","parent":"practices","type":"practice","order":160,"related":["malware-static","malware-laboratory","malware-hashes","practices-writeup"],"sources":[{"id":"practice-guide","pages":[15]},{"id":"practice-questions","pages":[15,16]},{"id":"practice-solutions","pages":[20,21]}]}
---
## Objetivo y material disponible

La tarea es planificar una inspección que distinga contenido visible y acciones programadas. La guía complementaria, página 15, y el solucionario, páginas 20–21, relacionan estos retos con un `.docm` y una planilla `.xls`. No se dispone de esos adjuntos para obtener sus resultados particulares.

## Recorrido razonado

1. Identificar el formato real y conservar una copia de trabajo con su hash.
2. Inspeccionar el contenido sin activarlo. En un documento con macros se buscan módulos, activadores automáticos y operaciones relevantes.
3. Revisar los componentes propios de la planilla: hojas ocultas, fórmulas, nombres definidos y enlaces externos, según la guía.
4. Documentar qué elemento se encontró y qué capacidad sugiere. Una referencia no demuestra que la acción se haya ejecutado.

El procedimiento especializado para documentos procede del material complementario; la práctica oficial de malware, páginas 5–6 y 18–20, aporta la distinción general entre inspección estática y ejecución controlada. No se habilita contenido activo en el equipo personal. Si un caso requiriera observación dinámica, esa transición necesitaría un laboratorio aislado y autorizado, como se explica en la unidad de malware.

## Resultado que sí puede darse

La extensión orienta una pregunta de análisis; no prueba que exista una macro maliciosa o una descarga concreta. Sin el documento no se puede identificar una URL, script, contraseña o flag. Esa limitación forma parte del informe, en lugar de reemplazarse por una suposición.

:::question ¿Por qué un texto visible aparentemente legítimo no basta para evaluar un documento?
Porque el contenedor puede incluir código o referencias que no se muestran como parte del texto principal. La inspección debe examinar esos elementos sin activarlos y relacionar cada inferencia con evidencia concreta.
:::
