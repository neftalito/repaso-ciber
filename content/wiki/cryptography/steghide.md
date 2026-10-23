---
{"id":"crypto-steghide","title":"Steghide","slug":"steghide","parent":"crypto-steganography","type":"tool","order":50,"related":["crypto-stego-keyed","crypto-lsb-image","practices-writeup"],"sources":[{"id":"practice-guide","pages":[7]},{"id":"practice-solutions","pages":[8]}],"permalink":"cryptography/steganography/steghide"}
---
## Herramienta en los ejercicios

Steghide aparece en los materiales complementarios como herramienta para inspeccionar un portador e intentar extraer datos de un ejercicio de esteganografía. No debe asumirse que cualquier imagen fue creada con esta herramienta.

## Ejemplo ilustrativo

```text
steghide info imagen.jpg
steghide extract -sf imagen.jpg
```

El primer comando permite inspeccionar información del portador; el segundo intenta extraer el contenido conforme al formato que reconoce la herramienta y puede requerir una contraseña. Son ejemplos de estudio sobre un archivo autorizado; no se ejecutaron sobre una muestra real.

## Verificación del resultado

Una extracción debe documentar el archivo obtenido, su formato y su contenido. Sin disponer de la imagen original del desafío no es posible afirmar su contraseña, su mensaje o su flag. La herramienta tampoco sustituye otras hipótesis, como revisar metadatos o una técnica LSB diferente.

:::question ¿Un intento de extracción fallido demuestra que no hay información oculta?
No. Puede tratarse de otra técnica, faltar parámetros o no ser compatible el portador. El resultado limita esa prueba concreta, no todas las formas posibles de esteganografía.
:::
