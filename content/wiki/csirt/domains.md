---
{"id":"csirt-domains","title":"Registro de nombres de dominio","slug":"dominios","parent":"csirt-dns","type":"category","order":10,"related":["csirt-dns","csirt-whois","csirt-rdap"],"sources":[{"id":"lecture-resources","pages":[16,17,18,19,20]},{"id":"practice-solutions","pages":[12,13]}],"permalink":"csirt/recursos-de-internet/dominios","aliases":["Nombres de dominio y registro"]}
---
## Un nombre y distintos responsables

Los nombres de dominio son recursos cuyo registro involucra tres funciones: registry, registrar y registrant. Distinguirlas permite comprender quién mantiene el registro de un TLD, quién gestiona la registración comercial y a nombre de quién figura el dominio.

Una misma entidad puede desempeñar más de una función. La clase presenta NIC Argentina como ejemplo de registry y registrar para `.ar`; ese ejemplo no debe extrapolarse automáticamente a todos los TLD.

## Investigación y privacidad

WHOIS y RDAP permiten consultar datos de dominio y localizar canales de contacto. Algunas respuestas muestran datos del titular ocultos o un formulario intermediario por privacidad. Esa circunstancia no demuestra por sí sola fraude.

Ante un abuso interesa distinguir el contacto del titular del canal de abuso del registrador. Los datos no públicos requieren procedimientos de acceso adecuados y no se recuperan simplemente reinterpretando una respuesta pública.

## Proceso de registración

La relación presentada por la cátedra parte del registrant, que solicita el nombre a un registrar. El registrar comercializa y gestiona esa registración en relación con el registry del TLD. El registry conserva la información oficial del espacio de nombres y permite reconocer el registrar que asignó el dominio; este último mantiene información sobre su registrante.

La distinción es funcional: las tareas de registry y registrar pueden coincidir en una entidad, como en el ejemplo de NIC Argentina para `.ar`. Para investigar el dominio se consulta mediante [WHOIS](wiki:csirt-whois) o [RDAP](wiki:csirt-rdap) y se elige el canal de contacto según el propósito del reporte.

## Registry

### Función

El registry mantiene el registro oficial de un dominio de nivel superior o TLD. En la estructura presentada por la cátedra, conserva información que permite reconocer el registrar que gestionó la asignación de un nombre.

Su función corresponde al registro del espacio de nombres, no a la identidad del usuario que visita un sitio ni a la administración de cualquier servidor que utilice el dominio. Para investigar un hecho concreto hay que separar esas capas.

### Relación con los otros actores

El [registrar](wiki:csirt-registrar) gestiona la registración frente al registry y la relación comercial con quien solicita el nombre. El [registrant](wiki:csirt-registrant) es el titular registral. Las tres funciones pueden involucrar organizaciones diferentes.

Como ejemplo de coincidencia de roles, la clase presenta a NIC Argentina actuando como registry y registrar para `.ar`. Esto explica que dos funciones puedan reunirse en una entidad; no establece una regla universal para los dominios.

### Uso en una investigación

Si una consulta devuelve el registro de un dominio y muestra qué registrar intervino, ese dato orienta el siguiente contacto. No demuestra que el registry sea el autor del contenido publicado. El dominio, el alojamiento del sitio y la actividad investigada deben correlacionarse con evidencia adicional.

### Repaso

:::question ¿El registry es necesariamente la empresa a la que el titular compró el dominio?
No. Esa relación corresponde al registrar. Las funciones pueden coincidir en una entidad, pero deben distinguirse para interpretar correctamente el registro y dirigir una notificación.
:::

## Registrar

### Función

El registrar es la entidad que comercializa y gestiona la registración de nombres de dominio. Actúa en relación con el registry y mantiene información de sus registrantes. No debe confundirse con el cliente a cuyo nombre se registró el dominio.

### Qué aporta su registro

Una consulta puede identificar el registrar, su servidor de consulta y su canal de abuso. Ese canal permite reportar situaciones relacionadas con un dominio, mientras que el contacto del registrant permite comunicarse con el titular. Elegir uno u otro depende del propósito de la notificación.

Por ejemplo, un reporte solicita primero avisar al titular de una página que parece comprometida y luego informar al registrador sobre el uso abusivo del nombre. Las dos comunicaciones pueden dirigirse a contactos diferentes y necesitar evidencias contextualizadas.

### Privacidad y límites

El registrador puede ofrecer mecanismos de privacidad que ocultan datos directos del titular y publican un formulario intermediario. La falta de un correo personal visible no prueba que no exista un responsable ni que el dominio sea malicioso.

El registrar tampoco debe confundirse automáticamente con el proveedor de alojamiento o con quien redactó el contenido. Los roles registrales explican la gestión del nombre; la investigación de la infraestructura y de los hechos necesita otras evidencias.

### Repaso

:::question ¿El correo de abuso del registrar es necesariamente el correo del titular del dominio?
No. Uno pertenece al canal del intermediario registrador y el otro al registrant o a su mecanismo de contacto. Diferenciar los roles evita enviar datos a una parte que no puede resolver la solicitud concreta.
:::

## Registrant

### Definición

El registrant es la persona u organización a cuyo nombre se registra un dominio. Es el cliente que solicita el nombre mediante un registrar. La relación describe titularidad registral y no atribuye automáticamente todas las acciones realizadas a través de ese dominio.

### Contacto y privacidad

La información pública puede incluir datos directos del registrant o un mecanismo intermediario de contacto. La presentación muestra una salida donde algunos campos están redactados por privacidad. Esto limita qué puede conocerse mediante la consulta, pero no demuestra por sí solo ocultamiento malicioso.

Un investigador debe identificar qué contacto necesita. Si busca avisar al titular, utiliza el canal disponible para el registrant; si pretende reportar abuso al registrador, selecciona el canal de ese otro actor. Sustituirlos sin explicación puede retrasar la gestión.

### Ejemplo y cautela de atribución

Un sitio de una institución aparece utilizado para engañar a sus visitantes. La ficha registral puede orientar hacia la institución o su intermediario. Aun así, el sitio podría estar comprometido: el registro no prueba que el titular haya creado deliberadamente el engaño.

Los datos personales no expuestos públicamente no pueden deducirse de campos vacíos. La clase distingue las consultas abiertas de los procedimientos que requieren las autoridades competentes para acceder a información no pública.

### Repaso

:::question ¿Un nombre de titular redactado por privacidad permite concluir que el dominio es fraudulento?
No. La privacidad puede ser una característica legítima del servicio registral. La conclusión debe basarse en el comportamiento y la evidencia del caso, respetando qué información está efectivamente disponible.
:::
