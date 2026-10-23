---
{"id":"fundamentals-llm","title":"Riesgos de IA y modelos de lenguaje","slug":"llm","parent":"fundamentals","type":"concept","order":90,"related":["fundamentals-phishing","fundamentals-defense-depth"],"sources":[{"id":"lecture-fundamentals","pages":[15,16,17]}]}
---
## Superficie de riesgo

Los modelos de lenguaje pueden incorporarse a tareas de trabajo y a sistemas con acceso a información o herramientas. La clase identifica exposición de datos confidenciales, phishing mejor redactado o personalizado, contenidos sintéticos convincentes e instrucciones maliciosas dirigidas al modelo.

## Datos y capacidades

Enviar información reservada a un servicio puede ampliar quién la procesa o conserva. El alcance depende del servicio, sus condiciones y configuración: no corresponde afirmar que todo modelo reutiliza siempre cualquier dato para entrenamiento. La pregunta de seguridad es qué información sale del ámbito previsto y quién puede acceder a ella.

Un modelo integrado con una base de datos o herramientas también exige evaluar qué operaciones puede realizar. La [inyección de instrucciones](wiki:fundamentals-prompt-injection) trata el riesgo de confundir contenido recibido con autoridad para actuar.

## Ejemplo

Un asistente que consulta datos de clientes no debería tratar una petición incluida en un documento como autorización para divulgar toda la base. La calidad de la respuesta escrita no prueba que el acceso o la divulgación sean legítimos.

## Deepfakes e información engañosa

La diapositiva 16 también menciona **deepfakes y desinformación**. Los contenidos sintéticos pueden aparentar una identidad o respaldar una afirmación falsa; su apariencia convincente no acredita su origen. Este riesgo se relaciona con el phishing potenciado por IA y se distingue de la exposición de datos o del intento de introducir órdenes maliciosas. El material los presenta como riesgos generales, sin desarrollar técnicas independientes.

:::question ¿Un audio o texto convincente demuestra la identidad de quien lo envió?
No. La clase destaca que los contenidos sintéticos pueden reforzar una suplantación. La identidad necesita verificación por medios adecuados al contexto, además de la apariencia del contenido.
:::
