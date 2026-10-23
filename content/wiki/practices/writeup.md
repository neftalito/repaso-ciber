---
{"id":"practices-writeup","title":"Cómo construir un writeup","slug":"writeup","parent":"practices","type":"practice","order":10,"related":["practices-encoding","practices-malware-static"],"sources":[{"id":"lecture-writeup","pages":[1,2,3,4]},{"id":"practice-guide","pages":[15,16]}]}
---
## Objetivo

Un writeup explica cómo se resolvió un desafío, con suficiente detalle para seguir el razonamiento. La cátedra propone enunciado, solución, reflexión y flag. Esta estructura se usa aquí sin criterios administrativos o de evaluación.

## Recorrido de un informe

1. Contextualizar el reto: nombre, categoría, datos recibidos, pistas y adjuntos relevantes.
2. Desarrollar la solución: hipótesis inicial, pruebas elegidas, herramientas, comandos y resultados que justifican cada paso.
3. Reflexionar: dificultades, estrategias descartadas, aprendizaje y límites de la evidencia.
4. Registrar la flag solo si se recuperó y verificó realmente.

## Ejemplo de razonamiento

Para una cadena codificada, el informe muestra la entrada, el motivo para interpretarla como Base64, los bytes obtenidos y su lectura como texto. Una captura de la salida sin indicar la transformación no permite repetir el proceso.

En malware, «importa una función de descarga» es una observación; «podría descargar» es una hipótesis; «descargó este archivo» exige otra evidencia. Si falta el archivo original del reto, se conserva el límite en lugar de completar el informe con una respuesta supuesta.

:::question ¿Qué debería explicar la reflexión cuando la primera estrategia falló?
Qué supuesto resultó incorrecto, qué evidencia lo mostró y por qué se eligió otra prueba. Esa explicación hace visible el aprendizaje y evita presentar un resultado casual como método reproducible.
:::
