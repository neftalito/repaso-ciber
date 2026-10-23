---
{"id":"crypto-idea","title":"IDEA","slug":"idea","parent":"crypto-symmetric","type":"algorithm","order":40,"related":["crypto-symmetric","crypto-aes"],"sources":[{"id":"lecture-crypto-1","pages":[30]}]}
---
## Lugar en el mapa de la materia

IDEA aparece entre los algoritmos simétricos enumerados por la cátedra. Se estudia dentro del modelo de un secreto compartido y de una transformación reversible de los datos.

## Comparación de propósitos

No debe confundirse el nombre del algoritmo con una operación de firma digital. Cifrar un documento con una clave compartida puede restringir su lectura, pero el esquema descrito no identifica por sí solo cuál de las personas que conoce el secreto lo produjo.

Ese contraste permite separar la pregunta «¿quién puede leer?» de «¿cómo verifico el origen?», que se desarrolla en firmas y mecanismos de confianza.

## Alcance

La página citada nombra IDEA sin explicar su construcción interna. Esta nota no atribuye tamaños, rondas ni una salida numérica inexistente en el material: conserva el ejemplo con el alcance realmente documentado.

:::question ¿Compartir una clave IDEA con un grupo identifica de manera individual al autor de cada mensaje?
No por ese solo hecho. Todos los integrantes poseen el secreto compartido. La atribución individual requiere analizar otros mecanismos del sistema.
:::
