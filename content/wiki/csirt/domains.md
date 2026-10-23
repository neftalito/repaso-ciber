---
{"id":"csirt-domains","title":"Registro de nombres de dominio","slug":"dominios","parent":"csirt-dns","type":"category","order":10,"related":["csirt-dns","csirt-whois","csirt-rdap"],"sources":[{"id":"lecture-resources","pages":[16,17,18,19,20]},{"id":"practice-solutions","pages":[12,13]}],"permalink":"csirt/recursos-de-internet/dominios","aliases":["Nombres de dominio y registro"]}
---
## Un nombre y tres funciones de registro

Registrar un dominio significa solicitar un nombre dentro de un espacio administrado. La cátedra distingue tres funciones: el **registry** mantiene el registro oficial del TLD, el **registrar** gestiona la registración comercial y el **registrant** es el cliente o titular que solicita el nombre.

La relación se entiende siguiendo la solicitud: el registrant solicita el nombre a un registrar, que interviene frente al registry del dominio de nivel superior. Las funciones pueden coincidir en una entidad; la presentación utiliza a NIC Argentina como ejemplo para `.ar`.

## Registry

El registry conserva la información oficial del espacio de nombres de un TLD. Según el esquema de la clase, mantiene datos que permiten identificar qué registrar asignó un nombre.

Su registro orienta hacia el intermediario que gestionó el dominio. Esa función no lo convierte en administrador de todos los servidores ni en autor del contenido que utiliza ese nombre.

## Registrar

El registrar comercializa y gestiona la registración y mantiene información de sus registrantes. En la consulta de la clase se distinguen el nombre del registrar, su servidor WHOIS y su contacto de abuso.

Ese contacto corresponde al registrador. Si el propósito es comunicarse con el titular del dominio, debe buscarse el contacto del registrant o el mecanismo intermediario que figure para él.

## Registrant

El registrant es la persona u organización a cuyo nombre se registra el dominio. La titularidad registral describe esa relación con el nombre; no demuestra por sí sola quién realizó cada actividad a través de él.

La captura de `cualesmiip.com` muestra campos del registrant como `Redacted by Privacy` y un enlace de contacto intermediario. La ausencia de un correo personal visible limita la consulta pública, pero no constituye por sí sola una prueba de fraude.

## Cómo orientar una consulta

1. Consultar el dominio mediante [WHOIS](wiki:csirt-whois) o [RDAP](wiki:csirt-rdap).
2. Distinguir el registrar identificado del registrant y sus datos disponibles.
3. Elegir el canal según la finalidad: contactar al titular o comunicar un abuso al registrador.
4. Relacionar el registro con la evidencia del incidente antes de atribuir responsabilidades.

Las páginas 16 a 18 de la presentación explican los roles y muestran la consulta. Las páginas 19 y 20 distinguen el uso operativo por los CSIRT del acceso a datos no públicos por las autoridades competentes. Una respuesta pública no permite reconstruir datos personales que no expone.

## Repaso

:::question ¿El registry es necesariamente la empresa a la que el titular compró el dominio?
No. La relación comercial corresponde al registrar. Las funciones pueden coincidir en una entidad, pero hay que distinguirlas para interpretar el registro y elegir el contacto.
:::

:::question ¿El contacto de abuso del registrar es necesariamente el correo del titular?
No. Corresponde al intermediario registrador. El registrant puede tener otro contacto o un mecanismo de comunicación protegido por privacidad.
:::
