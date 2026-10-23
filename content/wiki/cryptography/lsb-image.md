---
{"id":"crypto-lsb-image","title":"LSB en imágenes","slug":"lsb-image","parent":"crypto-lsb","type":"technique","order":10,"related":["crypto-lsb","crypto-steghide","crypto-encoding"],"sources":[{"id":"lecture-crypto-2","pages":[28]},{"id":"practice-1b","pages":[6]},{"id":"practice-solutions","pages":[8]}],"permalink":"cryptography/steganography/lsb/lsb-image"}
---
## Usar los componentes de color como portador

LSB en imágenes distribuye bits de un mensaje entre valores de componentes de color. La explicación práctica utiliza el modelo RGB de tres bytes por píxel: uno para rojo, otro para verde y otro para azul. Alterar bits de poco peso produce cambios pequeños en esos valores.

La página 28 de *Cripto, parte 2* compara una imagen original con una imagen que incorpora datos y muestra el uso de componentes RGB. La explicación de la práctica, parte 2, página 6, desarrolla la idea de repartir el mensaje a lo largo de los píxeles.

## Cómo se interpreta una extracción

1. Reconocer el formato del portador y cómo se representan sus píxeles.
2. Identificar los componentes y bits que utiliza el esquema.
3. Recorrerlos en el orden establecido y reunir los bits recuperados.
4. Interpretar la secuencia según su codificación y longitud.

El [ejemplo LSB del solucionario](wiki:crypto-lsb) recupera la letra `I` a partir de los últimos bits de ocho bytes. Ese ejercicio declara un orden de bits; no establece que cualquier imagen deba recorrerse igual.

## Capacidad y límites

La capacidad depende de cuántos valores se utilicen y de cuántos bits se tomen de cada uno. No puede calcularse para un archivo concreto sin conocer esa regla.

Leer bytes arbitrarios del archivo no equivale a extraer componentes de color: el formato también contiene estructura y metadatos. Tampoco una apariencia normal demuestra ausencia de datos ocultos, ni el uso de RGB demuestra que exista un mensaje.

:::question ¿Por qué hace falta conocer los canales y el recorrido de los píxeles?
Porque determinan el orden de los bits recuperados. Los mismos datos, leídos con convenciones distintas, no garantizan el mismo resultado.
:::
