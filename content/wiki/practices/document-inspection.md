---
{"id":"practices-document-inspection","title":"Caso: revisar documentos con contenido activo","slug":"document-inspection","parent":"practices","type":"practice","order":160,"related":["malware-static","malware-laboratory","malware-hashes","practices-writeup"],"sources":[{"id":"practice-guide","pages":[15]},{"id":"practice-questions","pages":[15,16]},{"id":"practice-solutions","pages":[20,21]}]}
---
## Planteo

La guía relaciona los retos de documentos con un `.docm` y una planilla `.xls`. No se dispone de esos adjuntos para obtener sus resultados particulares. El objetivo es diseñar una inspección que preserve la diferencia entre el contenido visible y las acciones programadas.

## Recorrido razonado

Primero se identifica el formato real y se conserva una copia de trabajo y su hash. En un documento con capacidad de macros se buscan módulos, activadores automáticos y operaciones relevantes mediante lectura estática. En una planilla también pueden importar hojas ocultas, fórmulas, nombres definidos y enlaces externos.

Se documenta qué elemento existe y qué capacidad sugiere. No se habilita contenido activo en el equipo personal. Si un caso requiriera observación dinámica, esa transición necesitaría un laboratorio aislado y autorizado, como se explica en la unidad de malware.

## Resultado que sí puede darse

La extensión orienta una pregunta de análisis; no prueba que exista una macro maliciosa o una descarga concreta. Sin el documento no se puede identificar una URL, script, contraseña o flag. Esa limitación forma parte del informe, en lugar de reemplazarse por una suposición.

:::question ¿Por qué un texto visible aparentemente legítimo no basta para evaluar un documento?
Porque el contenedor puede incluir código o referencias que no se muestran como parte del texto principal. La inspección debe examinar esos elementos sin activarlos y relacionar cada inferencia con evidencia concreta.
:::
