---
{"id":"crypto-steghide","title":"Steghide","slug":"steghide","parent":"crypto-steganography","type":"tool","order":50,"related":["crypto-stego-keyed","crypto-lsb-image","practices-writeup"],"sources":[{"id":"practice-guide","pages":[7]},{"id":"practice-solutions","pages":[8]}],"permalink":"cryptography/steganography/steghide"}
---
## Una herramienta de extracción, no una prueba previa

Steghide es una herramienta que los materiales complementarios proponen para inspeccionar un portador e intentar extraer datos. Su uso en un ejercicio no permite asumir que cualquier imagen contiene información preparada con ese programa.

## Procedimiento del material complementario

La guía, página 7, y el solucionario de prácticas, página 8, muestran estas operaciones sobre un archivo autorizado:

```text
steghide info imagen.jpg
steghide extract -sf imagen.jpg
```

1. Inspeccionar la información del portador con `info`.
2. Intentar la extracción con `extract`, indicando el archivo mediante `-sf`.
3. Proporcionar la contraseña de extracción si el esquema la requiere.
4. Si se obtiene un archivo, verificar y documentar su nombre, formato y contenido.

Los comandos son ejemplos de estudio y no se ejecutaron sobre una muestra real. La explicación se apoya en material complementario, sin atribuir un desarrollo de Steghide a las presentaciones oficiales.

## Cómo interpretar el resultado

Sin el archivo original del desafío no puede afirmarse su contraseña, su mensaje ni su flag. Una extracción fallida tampoco demuestra ausencia de información oculta: puede faltar un parámetro o tratarse de otra técnica.

La herramienta permite probar una hipótesis. Revisar [LSB en imágenes](wiki:crypto-lsb-image), metadatos u otros datos del portador corresponde a hipótesis diferentes que deben verificarse por separado.

:::question ¿Un intento de extracción fallido demuestra que no hay información oculta?
No. Limita la prueba realizada con esa herramienta y esos parámetros. No descarta otras técnicas ni permite adivinar el contenido del archivo.
:::
