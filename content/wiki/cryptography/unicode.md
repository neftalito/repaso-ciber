---
{"id":"crypto-unicode","title":"Unicode y formatos UTF","slug":"unicode","parent":"crypto-encoding","type":"concept","order":30,"related":["crypto-ascii","crypto-hash"],"sources":[{"id":"practice-1a","pages":[2,3]},{"id":"manual","pages":[7]}],"permalink":"cryptography/encoding/unicode"}
---
## Definición

Unicode permite representar caracteres de numerosos idiomas mediante puntos de código. Es necesario distinguir el carácter abstracto de la secuencia de bytes que lo representa. UTF-8, UTF-16 y UTF-32 son formatos de codificación mencionados en la práctica.

## Interpretación de bytes

El mismo texto puede requerir secuencias de bytes distintas según el formato UTF utilizado. En UTF-8, un carácter no ocupa necesariamente un solo byte. Esto afecta al conteo de posiciones, a la lectura de archivos y a los hashes calculados sobre su contenido.

Por ejemplo, una cadena que mezcla letras básicas y caracteres acentuados no permite deducir su tamaño en bytes contando únicamente las letras visibles. Primero hay que conocer la codificación.

## Relación con ASCII

UTF-8 conserva los valores del repertorio ASCII básico. Esa compatibilidad no permite interpretar cualquier byte mayor que 127 como un carácter ASCII.

:::question ¿Unicode y UTF-8 son nombres intercambiables?
No. Unicode define el repertorio y sus puntos de código; UTF-8 establece una forma de representarlos en bytes. Confundirlos oculta una decisión necesaria al leer o escribir un archivo.
:::
