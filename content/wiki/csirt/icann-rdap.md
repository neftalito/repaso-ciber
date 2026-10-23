---
{"id":"csirt-icann-rdap","title":"Cliente icann-rdap","slug":"icann-rdap","parent":"csirt-rdap","type":"tool","order":10,"aliases":["ICANN","cliente RDAP","rdap CLI"],"related":["csirt-rdap","csirt-rir"],"sources":[{"id":"lecture-resources","pages":[12,13]},{"id":"manual","pages":[17,18]}]}
---
## Función de la herramienta

icann-rdap es el cliente de línea de comandos desarrollado por ICANN que la cátedra emplea para demostrar consultas RDAP. ICANN significa Internet Corporation for Assigned Names and Numbers. En esta demostración su papel concreto es proveer el cliente; no debe confundirse con el RIR que devuelve los datos de asignación.

## Cómo leer la demostración

La diapositiva utiliza esta invocación:

```text
./rdap 190.15.133.5
```

El argumento es la dirección consultada. La salida del ejemplo contiene mensajes de diagnóstico del cliente y un documento JSON con la red y sus entidades. No toda línea mostrada en la terminal pertenece al JSON: conviene distinguir el registro de ejecución del contenido registral.

La ficha de la clase presenta enlaces a LACNIC, el bloque `190.15.128.0/20` y entidades con roles administrativo, técnico y de abuso. Estos datos explican cómo encontrar al responsable operativo del recurso; son una captura académica y no una consulta actual realizada para esta wiki.

## Alcance y limitaciones

El cliente facilita consultar e interpretar respuestas, pero la información procede del servicio registral correspondiente. Su presencia no sustituye la evaluación de qué campo se necesita ni el control de los límites de la conclusión. Para una denuncia se busca el contacto de abuso, no simplemente el primer correo visible.

## Repaso

:::question ¿ICANN pasa a ser el administrador de la IP porque el programa usado se llama icann-rdap?
No. El desarrollador del cliente y el registro responsable del recurso cumplen papeles distintos. La respuesta y sus enlaces permiten reconocer la fuente registral correspondiente.
:::
