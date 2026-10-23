---
{"id":"crypto-hybrid","title":"Cifrado híbrido","slug":"hybrid","parent":"crypto-modern","type":"concept","order":30,"related":["crypto-pgp","crypto-symmetric","crypto-asymmetric","crypto-signature"],"sources":[{"id":"lecture-crypto-2","pages":[23,24]},{"id":"practice-1b","pages":[6]}]}
---
## Combinar mecanismos

Un criptosistema híbrido combina técnicas simétricas y asimétricas. La práctica utiliza PGP como ejemplo: busca aprovechar el rendimiento de la familia simétrica y las posibilidades de distribución de claves de la familia asimétrica.

## Reparto conceptual de tareas

La combinación no convierte ambos mecanismos en uno solo. Hay que identificar qué parte protege los datos y qué parte participa en el tratamiento de las claves. Del mismo modo, una firma sigue siendo una operación distinta del cifrado.

## Caso de estudio

Un sistema puede permitir enviar un archivo cifrado, firmado o cifrado y firmado. Esas opciones no deben interpretarse como nombres equivalentes: cambian las propiedades buscadas y los secretos utilizados.

Las fuentes citadas explican la combinación en PGP, sin fijar un formato de paquete o una configuración concreta para todos los sistemas híbridos.

:::question ¿Usar cifrado híbrido implica que el mensaje quedó firmado?
No. Combinar familias de cifrado no añade automáticamente una firma. Debe existir la operación de firma y su verificación correspondiente.
:::
