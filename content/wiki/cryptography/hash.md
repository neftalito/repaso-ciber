---
{"id":"crypto-hash","title":"Funciones hash","slug":"hash","parent":"crypto-modern","type":"category","order":40,"related":["crypto-signature","malware-static","malware-ioc","crypto-md5"],"sources":[{"id":"lecture-crypto-1","pages":[17,18,19,20]},{"id":"manual","pages":[8,9]},{"id":"practice-guide","pages":[4]}],"permalink":"cryptography/hash","aliases":["colisiones","preimágenes","hashes de contraseñas","diccionario","salt"]}
---
## Definición de función hash

Una función hash transforma una entrada en un resumen, o digest, de longitud fija para la variante elegida. Es determinista: los mismos bytes producen el mismo resultado. No ofrece una operación de descifrado para reconstruir arbitrariamente la entrada.

## Funcionamiento general

El cálculo procesa una secuencia de bytes mediante la función elegida y produce su resumen. Para comprobar un archivo o una entrada propuesta se repite el mismo procedimiento y se compara el resultado con una referencia. La codificación, los saltos de línea y cualquier transformación previa forman parte de los datos procesados.

El resumen no es una copia cifrada del mensaje. La función no recibe una clave de descifrado que permita recuperar arbitrariamente el original.

## Propiedades de las funciones hash

Las fuentes describen cálculo eficiente, cambios amplios de salida ante cambios pequeños de entrada y resistencia práctica a encontrar una preimagen. Distinguen MD5, SHA-1, SHA-2 y SHA-3, además del problema de las colisiones.

### Determinismo e irreversibilidad

El determinismo permite repetir una comprobación: con la misma función y exactamente los mismos bytes se obtiene el mismo digest. La resistencia a preimágenes expresa una dificultad computacional para encontrar una entrada que produzca un digest dado; no significa que sea imposible probar candidatos de una lista pequeña.

La ausencia de descifrado distingue este procesamiento del cifrado reversible con una clave. Encontrar una coincidencia mediante intentos no crea una operación inversa general.

### Efecto avalancha

En las funciones criptográficas estudiadas, una modificación pequeña de la entrada cambia ampliamente el resumen. Esto impide interpretar una diferencia entre resúmenes como una medida directa de cuántas letras cambiaron. Observar esa sensibilidad en un ejemplo tampoco demuestra por sí solo la seguridad de un algoritmo.

Como ejemplo original, usando SHA-256 sobre UTF-8 sin salto de línea final:

| Entrada | SHA-256 |
| --- | --- |
| `hola` | `b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79` |
| `Hola` | `e633f4fc79badea1dc5db970cf397c8248bac47cc3acf9915ba60b5d76b0e88f` |

La diferencia entre mayúscula y minúscula modifica los bytes; no es un cambio meramente visual.

## Colisiones y resistencia a preimágenes

### Tres problemas diferentes

Una colisión ocurre cuando dos entradas distintas producen el mismo digest. No es lo mismo que encontrar una entrada a partir de un digest dado ni que reemplazar un documento concreto por otro con el mismo hash.

| Problema | Dato fijado al comenzar | Objetivo |
| --- | --- | --- |
| Preimagen | Un digest | Encontrar una entrada que lo produzca |
| Segunda preimagen | Un mensaje | Encontrar otro distinto con el mismo digest |
| Colisión | Ningún mensaje concreto | Encontrar dos entradas distintas con igual digest |

### Por qué existen

Hay más entradas posibles que salidas de longitud fija. En consecuencia, varias entradas deben compartir una salida. La propiedad de seguridad relevante es que resulte impracticable encontrar ciertas coincidencias deliberadamente, no que sean matemáticamente imposibles.

### Consecuencia

La clase muestra imágenes distintas con igual MD5. En firmas, una colisión manipulable puede comprometer la vinculación entre documento y resumen firmado. Esto no significa que toda coincidencia casual permita reemplazar cualquier documento ya elegido.

:::question ¿Dos archivos con hashes distintos pueden tener exactamente los mismos bytes?
No, si se aplicó la misma función completa a las mismas condiciones de entrada. El determinismo exige el mismo resultado para bytes idénticos.
:::

## Aplicaciones de las funciones hash

Un hash sirve para comparar contenidos y participa en firmas. No identifica por sí solo a una persona ni demuestra que un archivo sea benigno. Su uso en [análisis estático](wiki:malware-static) y en [indicadores de compromiso](wiki:malware-ioc) debe conservar esos límites.

## Hashes en la protección de contraseñas

### Comparar candidatos

Un hash de contraseña permite contrastar una entrada propuesta con una referencia calculada. No almacena una versión cifrada que se recupere mediante descifrado. Si un candidato produce el valor esperado bajo el mismo procedimiento, satisface esa comprobación.

### Por qué la velocidad importa

El cálculo rápido es útil para procesar archivos, pero también permite probar muchas contraseñas candidatas. La clase señala esa tensión: ser una función hash no elimina la posibilidad de fuerza bruta o diccionario.

La guía complementaria presenta ejercicios con concatenación de sal y contraseña. Hay que reproducir exactamente el orden y los bytes; cambiar el esquema altera lo que se compara.

### Alcance

El material diferencia hashes rápidos de archivo de mecanismos costosos de tratamiento de contraseñas. Esta nota explica el problema académico, sin proponer una configuración para un sistema productivo.

:::question ¿Una contraseña hallada mediante diccionario prueba que el hash fue invertido matemáticamente?
No. Se enumeraron candidatos y se calcularon sus resúmenes hasta encontrar una coincidencia. El procedimiento usa la función en su dirección normal.
:::

### Ampliación del material complementario

El manual advierte que aplicar directamente un hash rápido sin sal no es un mecanismo suficiente para proteger contraseñas almacenadas. También distingue la sal de un parámetro de costo: una sal única evita reutilizar directamente cálculos entre registros, pero no vuelve costosa por sí sola una función rápida.

Estas observaciones amplían el tratamiento de las diapositivas. El ejercicio con MD5 y concatenación de una sal sirve para estudiar bytes y comprobación de candidatos; no constituye una recomendación de almacenamiento para un sistema real.

## Uso de sal y ataques por diccionario

### Comprobación por diccionario

#### Definición

La comprobación por diccionario calcula el hash de una lista de candidatos y compara cada resultado con una referencia. En la guía se utiliza para estudiar ejercicios de contraseñas; se diferencia de recorrer indiscriminadamente todas las combinaciones posibles.

#### Procedimiento conceptual

Se identifica el algoritmo, la codificación y cualquier transformación adicional del ejercicio. Para cada candidato se reconstruye la entrada exacta, se calcula el digest y se compara con la referencia. Si el esquema incluye una sal, también se incorpora en la posición indicada.

#### Límite de la conclusión

Que ningún candidato coincida demuestra únicamente que la lista y el procedimiento probados no encontraron una coincidencia. Puede faltar la contraseña o puede haberse interpretado mal el esquema. No demuestra que exista una operación de descifrado pendiente.

:::question ¿Por qué agregar un salto de línea al candidato puede invalidar la comparación?
Porque modifica la secuencia de bytes procesada. Aunque la palabra visible parezca igual, ya no es la misma entrada de la función.
:::

### Sal en el cálculo de contraseñas

#### Definición

Una sal es un dato que se incorpora al procesamiento de una contraseña. La guía complementaria utiliza un ejercicio con el esquema `MD5(salt + password)` y destaca que el orden de concatenación forma parte de la operación.

#### Ejemplo conceptual

Con sal `curso:` y candidato `luna`, la entrada del esquema anterior es la secuencia que representa `curso:luna`. Invertir el orden produciría `lunacurso:`, una entrada diferente. El hash debe calcularse sobre los bytes exactos y con la misma codificación usada por el ejercicio.

#### Qué resuelve y qué no

El complemento explica que una sal pública y única impide reutilizar directamente tablas precalculadas entre registros. No necesita ser una clave secreta y no vuelve costosa por sí sola una función rápida ni evita probar candidatos.

:::question ¿Publicar una sal equivale necesariamente a revelar una contraseña?
No. La sal y la contraseña tienen roles distintos. Conocer la sal permite reconstruir la operación para cada candidato, pero no entrega automáticamente el candidato correcto.
:::

## Familias de algoritmos

Las páginas de [MD5](wiki:crypto-md5), [SHA-1](wiki:crypto-sha1), [SHA-2](wiki:crypto-sha2) y [SHA-3](wiki:crypto-sha3) distinguen las familias presentadas en la materia. Las propiedades, aplicaciones y ejemplos anteriores permanecen en esta nota general, en lugar de convertirse en familias de algoritmos.

Las variantes que las fuentes solo enumeran se explican dentro de su familia; no se crean páginas con mecanismos que el material no desarrolla.

## Preguntas de repaso

:::question ¿Por qué un resumen no permite descifrar el documento del que procede?
Porque un hash no es una transformación reversible mediante una clave de descifrado. Comparar candidatos utiliza el cálculo directo; no reconstruye arbitrariamente una entrada a partir del resumen.
:::
