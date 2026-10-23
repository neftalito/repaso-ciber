---
{"id":"crypto-lsb","title":"Técnica LSB","slug":"lsb","parent":"crypto-steganography","type":"technique","order":30,"related":["crypto-lsb-image","crypto-lsb-audio","crypto-numbers"],"sources":[{"id":"lecture-crypto-2","pages":[28,29]},{"id":"practice-1b","pages":[6]},{"id":"practice-solutions","pages":[8]}],"aliases":["least significant bit","bit menos significativo"],"permalink":"cryptography/steganography/lsb"}
---
## Ocultar información en bits de poco peso

LSB, *least significant bit*, utiliza el bit menos significativo de valores digitales para transportar información. Cambiar ese bit modifica el valor en una unidad. La idea es repartir cambios pequeños entre valores del portador para que el mensaje no resulte evidente a simple vista o al escuchar.

Ese objetivo es distinto del [cifrado](wiki:crypto-encryption): ocultar la presencia de datos no implica que su contenido quede protegido por una clave.

## Insertar y recuperar un bit

Para insertar un bit se conserva el resto del valor y se hace que su último bit coincida con el del mensaje. Si ya coincide, no hace falta modificarlo. Para recuperarlo se lee ese último bit siguiendo el mismo recorrido.

La extracción de una secuencia requiere conocer qué valores se utilizan, en qué orden se recorren y cuántos bits forman el mensaje. Encontrar un último bit aislado no establece por sí solo el contenido oculto.

## Ejemplo del solucionario complementario

La página 8 del solucionario de prácticas presenta ocho bytes de píxeles, con la regla de recuperar sus últimos bits en orden:

```text
10010010 10100011 11010100 01000100
00110011 01000100 10100000 10010001
```

1. Leer el último bit de cada byte produce `0 1 0 0 1 0 0 1`.
2. Agruparlos en el orden indicado produce `01001001`.
3. Interpretar ese byte como ASCII da el valor decimal 73, la letra `I`.

El resultado depende de las convenciones del ejercicio. En un portador real también deben conocerse el formato, los canales, el orden de los valores y la longitud del mensaje.

## Aplicación según el portador

Las páginas 28 y 29 de *Cripto, parte 2* muestran [LSB en imágenes](wiki:crypto-lsb-image) y [LSB en audio](wiki:crypto-lsb-audio). El principio es común, pero la estructura del portador determina qué valores se modifican. Un archivo completo no es una lista indiferenciada de muestras o píxeles.

:::question ¿Insertar un bit en un valor significa agregar un byte nuevo al archivo?
No. En el mecanismo explicado se modifica un bit de un valor existente. La poca magnitud del cambio no demuestra por sí sola que sea imposible detectar el ocultamiento.
:::
