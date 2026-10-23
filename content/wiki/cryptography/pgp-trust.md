---
{"id":"crypto-pgp-trust","title":"Red de confianza de PGP","slug":"pgp-trust","parent":"crypto-pgp","type":"concept","order":10,"related":["crypto-pki","crypto-ca","crypto-certificate"],"sources":[{"id":"lecture-crypto-2","pages":[23,25]},{"id":"practice-1b","pages":[6,7]}],"permalink":"cryptography/pgp/pgp-trust"}
---
## Confianza descentralizada

La clase contrapone la red de confianza de PGP a la estructura centralizada de autoridades de una PKI. En PGP, los usuarios pueden certificar asociaciones entre identidades y claves y decidir en qué certificaciones confían.

## Procedimiento conceptual

Antes de certificar una clave ajena se necesita tener certeza de su pertenencia a la persona esperada. La firma sobre esa asociación comunica una decisión; no elimina la necesidad de evaluar cómo se verificó la identidad.

El material admite esquemas basados en firmas propias, confianza en otras personas o múltiples firmas. Por eso la presencia de una certificación no debe interpretarse fuera de la política de confianza elegida.

## Límite

Un repositorio facilita obtener claves, pero no reemplaza la comprobación de identidad. Tampoco todas las personas que descargan la misma clave tienen necesariamente las mismas decisiones de confianza.

:::question ¿Qué diferencia central tiene este modelo respecto de PKI?
La confianza no se deposita necesariamente en una lista central de autoridades. Los usuarios administran certificaciones y decisiones de confianza de forma descentralizada.
:::
