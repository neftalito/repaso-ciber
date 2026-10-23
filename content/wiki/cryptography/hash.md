---
{"id":"crypto-hash","title":"Funciones hash","slug":"hash","parent":"crypto-modern","type":"category","order":40,"related":["crypto-signature","malware-static","malware-ioc","crypto-md5"],"sources":[{"id":"lecture-crypto-1","pages":[17,18,19,20]},{"id":"manual","pages":[8,9]},{"id":"practice-guide","pages":[4]}],"permalink":"cryptography/hash","aliases":["colisiones","preimágenes","hashes de contraseñas","diccionario","salt"]}
---
## Qué es una función hash

Una **función hash** transforma una entrada en un resumen, o *digest*, de longitud fija para la variante elegida. Es **determinista**: los mismos bytes procesados con la misma función producen el mismo resultado. No ofrece una operación de descifrado para reconstruir la entrada.

Cripto, parte 1, página 17, presenta esas propiedades y el cálculo eficiente. Para comprobar datos se vuelve a calcular su resumen y se compara con una referencia. La codificación y los saltos de línea forman parte de los bytes procesados.

## Familias de algoritmos

- [MD5](wiki:crypto-md5).
- [SHA-1](wiki:crypto-sha1).
- [SHA-2](wiki:crypto-sha2).
- [SHA-3](wiki:crypto-sha3).

Estas son las familias enumeradas en Cripto, parte 1, página 18. La variante elegida determina la longitud del resumen; su tamaño por sí solo no identifica inequívocamente la función.

## Cambios de entrada y efecto avalancha

Las funciones criptográficas estudiadas producen un cambio amplio del resumen ante una modificación pequeña de la entrada. La página 18 compara los hashes MD5 de `Ciberseguridad` y `CiberSeguridad`: cambiar una mayúscula modifica los bytes y los resultados mostrados son diferentes.

El manual complementario, página 9, aclara que los comandos con `echo` normalmente agregan un salto de línea. Para reproducir el cálculo hay que conservar también ese byte. La diferencia entre dos resúmenes no mide cuántas letras cambiaron.

## Colisiones y resistencia a preimágenes

Una **colisión** ocurre cuando dos entradas distintas producen el mismo resumen. La página 20 muestra dos imágenes distintas, `ship.jpg` y `plane.jpg`, con igual MD5. Por eso un hash igual no demuestra que los archivos tengan exactamente los mismos bytes.

El manual complementario, página 9, distingue tres problemas:

| Problema | Qué se conoce al comenzar | Qué se busca |
| --- | --- | --- |
| Preimagen | Un resumen | Una entrada que lo produzca |
| Segunda preimagen | Un mensaje | Otro mensaje distinto con el mismo resumen |
| Colisión | Ningún mensaje concreto fijado | Dos entradas distintas con igual resumen |

Como hay más entradas posibles que resúmenes de longitud fija, las colisiones deben existir. La propiedad de seguridad relevante es la dificultad de encontrarlas deliberadamente. Eso no implica que toda colisión permita reemplazar cualquier documento ya elegido.

:::question ¿Dos archivos con hashes distintos pueden tener exactamente los mismos bytes?
No, si se aplicó la misma función completa bajo las mismas condiciones. El determinismo exige el mismo resultado para bytes idénticos.
:::

## Aplicaciones de las funciones hash

La página 19 presenta su uso en firmas y en el tratamiento de contraseñas. También sirven para comparar contenidos en [análisis estático](wiki:malware-static) e [indicadores de compromiso](wiki:malware-ioc). Un resumen no demuestra por sí solo quién produjo un archivo ni si es benigno.

## Hashes en la protección de contraseñas

Para comprobar una contraseña propuesta se reproduce el procedimiento que produjo la referencia y se comparan los resultados. Se utiliza la función hacia adelante: no se recupera una contraseña mediante descifrado.

La página 19 advierte que el cálculo rápido también facilita probar muchos candidatos. Ser una función hash no elimina la posibilidad de fuerza bruta o de comprobación por diccionario.

### Comprobación por diccionario

La guía complementaria de prácticas, página 4, describe un procedimiento con una lista de candidatos:

1. Identificar el algoritmo, la codificación y cualquier transformación adicional.
2. Reconstruir los bytes de cada candidato con ese mismo procedimiento.
3. Calcular el resumen y compararlo con la referencia.

Si ninguno coincide, la lista y el procedimiento probados no encontraron una coincidencia. Puede faltar el candidato correcto o haberse interpretado mal el esquema; el resultado no demuestra que exista una operación de descifrado pendiente.

:::question ¿Agregar un salto de línea al candidato puede invalidar la comparación?
Sí. Modifica los bytes procesados, aunque la palabra visible parezca la misma.
:::

### Sal en el cálculo de contraseñas

Una **sal** es un dato incorporado al procesamiento de una contraseña. La guía complementaria, página 4, presenta el esquema `MD5(salt + password)`: primero se concatena la sal y después la contraseña. Invertir el orden cambia la entrada que se compara.

El material complementario distingue la sal del secreto de la contraseña. Una sal pública y única impide reutilizar directamente tablas precalculadas entre registros, pero no evita por sí sola probar candidatos.

:::question ¿Publicar una sal equivale necesariamente a revelar la contraseña?
No. Conocer la sal permite reconstruir el procesamiento de cada candidato; no entrega automáticamente el candidato correcto.
:::

### Ampliación del material complementario

El manual, página 9, explica que aplicar directamente un hash rápido no es un mecanismo suficiente para proteger contraseñas almacenadas. Distingue la sal de un parámetro de costo: la sal no vuelve costosa por sí sola una función rápida. Este desarrollo amplía el problema de velocidad señalado por las diapositivas; el ejercicio con MD5 sirve para estudiar el procedimiento, no como recomendación de almacenamiento.
