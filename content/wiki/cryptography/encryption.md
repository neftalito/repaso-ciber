---
{"id":"crypto-encryption","title":"Cifrado","slug":"encryption","parent":"cryptography","type":"concept","order":20,"related":["crypto-encoding","fundamentals-cia","crypto-signature"],"sources":[{"id":"lecture-crypto-1","pages":[9,10,11,13,16]},{"id":"lecture-crypto-2","pages":[4,7]}]}
---
## Transformación con clave

El cifrado transforma texto plano en texto cifrado mediante un algoritmo y una clave. El descifrado recupera el original con la clave y los parámetros apropiados. Su objetivo característico es la confidencialidad.

Los [métodos clásicos](wiki:crypto-classical) permiten estudiar sustitución y transposición; la [criptografía moderna](wiki:crypto-modern) distingue esquemas simétricos y asimétricos. La existencia de un algoritmo conocido no equivale a poseer la clave que permite descifrar.

Cifrar no implica por sí mismo comprobar identidad o detectar toda modificación. Para estas preguntas se estudian [hashes](wiki:crypto-hash), [firmas](wiki:crypto-signature) y sus mecanismos de confianza.

## Algoritmo, clave y recuperación

El texto plano es la información antes de aplicar el cifrado; el texto cifrado es el resultado de esa transformación. El algoritmo establece el procedimiento y la clave selecciona la transformación concreta dentro del esquema. Conocer el procedimiento no equivale a conocer el secreto necesario para recuperar el mensaje.

Se puede expresar el recorrido como `C = E(K, P)`: cifrar el texto plano P con la clave K produce C. El descifrado aplica la operación correspondiente y los parámetros apropiados para recuperar P. En sistemas asimétricos, las claves utilizadas en ambas operaciones cumplen roles diferentes.

## Clasificaciones y navegación

La [criptografía clásica](wiki:crypto-classical) permite estudiar [sustitución](wiki:crypto-substitution) y [transposición](wiki:crypto-transposition). La [criptografía moderna](wiki:crypto-modern) incluye cifrado [simétrico](wiki:crypto-symmetric), [asimétrico](wiki:crypto-asymmetric) e [híbrido](wiki:crypto-hybrid). Estas categorías conservan sus propias páginas y no necesitan depender jerárquicamente de esta introducción.

El [acuerdo de claves](wiki:crypto-key-agreement) establece un secreto; los hashes calculan resúmenes y las firmas permiten comprobar origen e integridad. Son servicios relacionados, con propósitos diferentes del cifrado de un mensaje.

## Ejemplo sencillo

Como ejercicio clásico sobre A–Z, un César con desplazamiento 3 transforma `HOLA` en `KROD`. Aplicar el desplazamiento inverso recupera `HOLA`. El ejemplo permite distinguir mensaje, regla y clave; no muestra una protección adecuada para una aplicación real. La página de [César y ROT](wiki:crypto-caesar) desarrolla el método y sus límites.

## Preguntas de repaso

:::question ¿Conocer el algoritmo equivale a poder descifrar cualquier mensaje?
No. También se necesitan la clave y los parámetros correspondientes al esquema. La descripción del procedimiento no entrega automáticamente esos valores.
:::

:::question ¿Cifrar un mensaje garantiza por sí solo su autenticidad?
No. La confidencialidad busca restringir su lectura. La autenticidad y la detección de modificaciones requieren mecanismos y comprobaciones adecuados, que no deben atribuirse automáticamente al cifrado.
:::
