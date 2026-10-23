---
{"id":"csirt-dns","title":"Nombres de dominio y DNS","slug":"dns","parent":"csirt-resources","type":"protocol","order":30,"aliases":["DNS y jerarquía de nombres","Domain Name System","TLD","gTLD","ccTLD","MX","raíz DNS"],"related":["csirt-domains","csirt-smtp","csirt-headers"],"sources":[{"id":"lecture-resources","pages":[2,14,15,16]},{"id":"lecture-email","pages":[2,3]},{"id":"manual","pages":[18,20,21]}],"permalink":"csirt/recursos-de-internet/dns"}
---
## Definición

DNS designa tanto una base de datos distribuida y jerárquica como el protocolo que permite consultarla. La administración de la información está descentralizada: distintos responsables gestionan partes del espacio de nombres.

Un nombre de dominio sitúa un recurso dentro del espacio jerárquico de nombres. La cátedra lo presenta junto con las direcciones IP como recurso de Internet: estudiar el nombre y consultar DNS permite reconocer su ubicación en esa jerarquía y la información publicada sobre él. El [registro de nombres de dominio](wiki:csirt-domains) explica cómo se solicita el nombre y qué funciones cumplen quienes participan en su registración.

## Leer un nombre desde la raíz

En `mail.unlp.edu.ar.`, el punto final representa la raíz. Desde allí, `ar` es un dominio de nivel superior, `edu.ar` está debajo, `unlp.edu.ar` ocupa un nivel más específico y `mail` identifica un nombre dentro de ese dominio.

La clase distingue gTLD, como `.com` y `.org`; ccTLD asociados a países, como `.ar` y `.cl`; y `.arpa`, destinado a infraestructura, por ejemplo resolución inversa. Los niveles se interpretan según su posición en el árbol: «dominio» y «subdominio» expresan relaciones, no una cantidad universal de etiquetas.

## Relación con el correo

Los registros MX anuncian servidores para recibir correo de un dominio. La consulta ilustrativa `host -t mx dominio.example` pide ese tipo de registro; no envía un mensaje.

```text
dominio.example mail is handled by 10 mx1.dominio.example.
dominio.example mail is handled by 20 mx2.dominio.example.
```

En este ejemplo ficticio, el menor valor numérico tiene preferencia de entrega. La configuración MX describe la ruta esperable; los [encabezados](wiki:csirt-headers) y registros del servidor permiten estudiar el recorrido de un mensaje concreto.

## Límite de cada consulta

DNS y los registros de titularidad responden preguntas diferentes. Que un nombre anuncie un servidor no identifica al registrante ni prueba quién redactó un correo. Para localizar responsables se consultan también los datos de [registro del dominio](wiki:csirt-domains) y de sus direcciones.

## Repaso

:::question ¿Un MX de preferencia 10 demuestra que todos los correos del dominio pasaron por ese servidor?
No. Indica una preferencia de entrega en la configuración consultada. El recorrido efectivo de un mensaje se reconstruye con su evidencia, incluidos encabezados y registros disponibles.
:::
