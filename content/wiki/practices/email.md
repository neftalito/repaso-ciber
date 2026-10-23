---
{"id":"practices-email","title":"Caso: reconstruir el origen técnico de un correo","slug":"email","parent":"practices","type":"practice","order":100,"related":["csirt-email","csirt-rdap","csirt-whois","practices-writeup"],"sources":[{"id":"lecture-email","pages":[4,5,6,7,8,10,15]},{"id":"practice-questions","pages":[10,11]},{"id":"practice-solutions","pages":[13,14]}]}
---
## Evidencia sintética

El caso combina un remitente visible, una dirección de respuesta y una traza de entrega. Los nombres e IP son ilustrativos; no se realiza ninguna consulta remota.

```text
From: soporte@empresa.example
Reply-To: pagos@otro.example
To: ana@universidad.example
Received: from relay.remoto.example (198.51.100.44)
    by mx.universidad.example with ESMTP
```

## Resolver las preguntas por separado

| Pregunta | Evidencia e interpretación |
| --- | --- |
| ¿Qué destinatario figura? | `To` declara `ana@universidad.example`; es una cabecera informativa |
| ¿Qué servidor registró recibir el salto? | `mx.universidad.example`, si confiamos en que añadió esa traza |
| ¿Qué IP entregó ese salto al receptor? | `198.51.100.44`, según el `Received` mostrado |
| ¿Dónde iría normalmente una respuesta? | A `pagos@otro.example`, por `Reply-To` |
| ¿Quién es la persona autora? | El fragmento no permite determinarlo |

La discrepancia entre campos merece revisión, pero también existe en flujos legítimos. El envelope SMTP y el encabezado `From` son independientes; no deben confundirse.

## Próxima evidencia y límites

Para identificar el contacto de abuso se usaría el registro del recurso IP mediante [RDAP](wiki:csirt-rdap) o [WHOIS](wiki:csirt-whois). Sin una respuesta real no se puede inventar ese correo ni inferir el país del autor. El servidor que entrega un salto no necesariamente es el equipo de quien redactó el mensaje. También deben conservarse tiempos y cabeceras completas.

:::question ¿Por qué `To` no basta para demostrar a qué buzón se entregó efectivamente el mensaje?
Porque es una cabecera informativa. La entrega usa destinatarios del envelope y deja registros de tránsito o recepción que deben contrastarse. El caso solo permite afirmar qué dirección está declarada en ese campo.
:::
