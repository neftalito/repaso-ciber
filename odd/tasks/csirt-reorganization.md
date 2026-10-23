# CSIRT Wiki reorganization
Objective: preserve academic content and URLs while applying the requested hierarchy. Branch: `feat/wiki-academica`; baseline: `8ec5347`; delivery: `single-pr`, no push/PR.
Runner: Wiki build/content/preservation tests and browser smoke; original application regression suite. Forecast: about 650 authored changed lines excluding generated output, preservation hashes and the verbatim request; coherent local Spanish Conventional work-unit commits. Risk: none — passive academic notes/metadata, unchanged generator and original application.

## Specs

S1. Scope: “Esta etapa debe modificar exclusivamente **CSIRT y gestión de incidentes**.” “Trabajá sobre la rama actual:” `feat/wiki-academica`. “No realices push ni abras un Pull Request.” Other academic content, PDFs, application, styles, generator and dependencies remain unchanged.

S2. Exact target hierarchy, conditional on S5 notification-source sufficiency:

```text
CSIRT y gestión de incidentes
│
├── Equipos CERT y CSIRT
│   └── Servicios de un CSIRT
│       ├── Servicios reactivos
│       ├── Servicios proactivos
│       └── Servicios de gestión de calidad de seguridad
│
├── Recursos de Internet
│   ├── Direcciones y bloques IP
│   │   └── Registros Regionales de Internet (RIR)
│   │
│   ├── Consulta de información de registro
│   │   ├── WHOIS
│   │   └── RDAP
│   │
│   └── Nombres de dominio y DNS
│       └── Registro de nombres de dominio
│
├── Correo electrónico e investigación
│   ├── SMTP y flujo del correo
│   ├── Análisis de encabezados de correo
│   └── Suplantación del remitente (Email Spoofing)
│
└── Incidentes de seguridad
    ├── Gestión de incidentes
    │   └── Notificación de incidentes
    │
    └── Manejo de información sensible
        └── Traffic Light Protocol (TLP)
```

S3. Resources: “No presentar WHOIS y RDAP como mecanismos exclusivos de consulta de direcciones IP, porque también pueden utilizarse para consultar información de registración de dominios.” Add the lookup category; group RIR under IP and domain registration under DNS. “Quiero que esos tres conceptos se expliquen dentro de Registro de nombres de dominio.” Evaluate and consolidate icann-rdap only as the auxiliary client it represents; preserve all commands and examples. Main source: `04 - CSIRT parte 1 - Gestión de Recursos de Internet.pdf`.

S4. Mail: “Quiero que su contenido se integre dentro de SMTP y flujo del correo, porque son componentes de un mensaje y su transporte, no categorías independientes.” Consolidate envelope/header/body under SMTP. Integrate auxiliary MXToolbox and Google Messageheader into header analysis if their content supports that classification. Keep spoofing independent with SMTP/header cross-links and only course-supported protections. Main source: `04 - CSIRT parte 2 - SMTP Y Analisis de Encabezados.pdf`.

S5. Incidents: “Utilizá únicamente las etapas efectivamente desarrolladas en las fuentes.” Rename handling to Gestión de incidentes. “Si la notificación solamente aparece como una etapa breve de Gestión de incidentes, mantenela como sección interna y explicá en el informe por qué no se justifica una página independiente.” Otherwise create a source-backed notification note. Sensitive information introduces TLP; labels stay sections. “No duplicar sus explicaciones completas dentro de CSIRT.” Cross-link existing PGP/crypto notes. Main source: `04 - CSIRT parte 3 - Gestión de incidentes.pdf`.

S6. Preservation: “No quiero perder contenido académico durante esta reorganización.” Keep definitions, procedures, commands, examples, questions, citations, stable IDs and old URLs. Existing optional `permalink` preserves paths independently of ancestry; `redirectTo: canonical-id#section-anchor` emits compatibility output and resolves incoming IDs directly. Merged originals become compatibility stubs only after all non-heading academic blocks and citations are present in the destination. Never modify the historical preservation fixture to silence a missing-content failure.

S7. Validation and delivery: “Si alguna prueba no puede ejecutarse, indicá claramente el motivo y no la reportes como aprobada.” Verify tests, links, old URLs, orphans, preservation, unaffected areas, freshness, browser navigation/search/breadcrumbs at root and `/repaso-ciber/`. Final report supplies the complete tree, relocated/merged/renamed/new notes, per-merge destinations and preserved URLs, files, results, and any debatable classification. “Quiero revisar y aprobar personalmente la nueva estructura de CSIRT antes de continuar.”

## Tasks

- T1 | S1,S2,S6 | inline parent: known metadata/root/teams/services seam, baseline fixture and focused assertions | complete; historical185-block/28-note fixture captured before edits; three new assertions observed RED; services ancestry corrected and all four service paths pinned; focused teams assertion GREEN; commit pending.
- T2 | S3,S6 | delegated writer: Internet resources unit; parallel with T3, disjoint files and several-minute source/content work | complete; csirt_resources coveredS1/S3/S6/S7, source lecture physical3–20, focusedassertionPASS andparentexactrerunPASS; 4redirects andnewlookup, all185-fixture-relatedunitblocks/citations/URLs preserved; commit pending.
- T3 | S4,S5,S6 | delegated writer: mail/incidents unit; parallel with T2, disjoint files and several-minute source/content work | complete; csirt_mail_incidents coveredS1/S4/S5/S6/S7, source SMTP1–17/incidents6–26, focusedassertionPASS andparentexactrerunPASS; 3redirects andsource-backednotification; commit pending.
- T4 | S1,S2,S6,S7 | inline parent: seam integration, shared authoring docs, browser and generated output | complete; 12/12tests,190canonical+11compatibilitynotes,175answers,39,630links/currentoutput; browserroot+prefixdesktop/mobile/noJSPASS, all7newredirects; outside-source/HTMLscopeauditPASS; commit pending.
- T5 | S1,S7 | bounded command runner for original-app suite when long; parent preservation audit and spot-check | complete execution;25/25originaltests+datavalidatorPASS(parentspotPASS),33originalfilesunchanged;DOMunavailablejsdom;originalbrowserFAILbaselineWindowspathandthenquestion442timeoutafteronlyscratchpathadaptation. Nooriginalfixauthorized; reportfailurehonestly. Noindependentsemanticverifierrequiredforpassivecontent; commit pending.
- T6 | S1,S7 | inline parent: explicit-path Spanish local commit, native assessment according to user-owned mode and final report | in progress; finalscopedcommitandnativeassessmentpending; no publish, no automatic consent, no old review transaction resumed.

## Log

### L1 — Original authorized request (verbatim)

# Reorganización de la Wiki Académica — CSIRT y Gestión de Incidentes

Quiero continuar con la reorganización jerárquica de la Wiki Académica.

Ya completamos y validamos las secciones de:

- Codificación.
- Criptografía.
- Esteganografía.
- Fundamentos de Ciberseguridad.

**No quiero modificar nuevamente esas secciones.**

En esta etapa trabajaremos exclusivamente sobre **CSIRT y gestión de incidentes**, siguiendo los mismos criterios de organización, granularidad y conservación de contenido utilizados anteriormente.

## 1. Objetivo

Reorganizar las páginas existentes de CSIRT para conseguir una estructura académicamente coherente y fácil de navegar.

El objetivo NO es reconstruir la sección desde cero, sino:

- Corregir relaciones jerárquicas.
- Agrupar conceptos relacionados bajo categorías apropiadas.
- Mantener páginas independientes para protocolos, técnicas y conceptos relevantes.
- Integrar características, roles, herramientas auxiliares y etapas de procedimientos dentro de sus páginas correspondientes.
- Eliminar redundancias sin perder contenido.
- Conservar ejemplos, preguntas y referencias.
- Preservar enlaces y URLs existentes.

## 2. Árbol jerárquico objetivo

Quiero que la sección tenga la siguiente estructura:

```text
CSIRT y gestión de incidentes
│
├── Equipos CERT y CSIRT
│   └── Servicios de un CSIRT
│       ├── Servicios reactivos
│       ├── Servicios proactivos
│       └── Servicios de gestión de calidad de seguridad
│
├── Recursos de Internet
│   ├── Direcciones y bloques IP
│   │   └── Registros Regionales de Internet (RIR)
│   │
│   ├── Consulta de información de registro
│   │   ├── WHOIS
│   │   └── RDAP
│   │
│   └── Nombres de dominio y DNS
│       └── Registro de nombres de dominio
│
├── Correo electrónico e investigación
│   ├── SMTP y flujo del correo
│   ├── Análisis de encabezados de correo
│   └── Suplantación del remitente (Email Spoofing)
│
└── Incidentes de seguridad
    ├── Gestión de incidentes
    │   └── Notificación de incidentes
    │
    └── Manejo de información sensible
        └── Traffic Light Protocol (TLP)
```

Esta será la estructura de referencia para reorganizar las páginas existentes.

No interpretes el árbol como una autorización para eliminar contenido que actualmente existe y no aparece explícitamente representado.

Las páginas de categorías intermedias deben tener explicaciones propias y enlaces hacia sus subcategorías.

## 3. Equipos CERT y CSIRT

Actualmente existen páginas separadas para Equipos CERT y CSIRT y Servicios de un CSIRT.

Quiero mantener ambas, pero establecer la siguiente relación:

```text
Equipos CERT y CSIRT
└── Servicios de un CSIRT
    ├── Servicios reactivos
    ├── Servicios proactivos
    └── Servicios de gestión de calidad de seguridad
```

### Equipos CERT y CSIRT

Explicar:

- Qué son los equipos CERT y CSIRT.
- Cuáles son sus objetivos.
- Cuáles son sus funciones generales.
- Cómo contribuyen a la respuesta ante incidentes.
- Relación con los servicios que ofrecen.

### Servicios de un CSIRT

Mantener las tres clasificaciones principales de servicios, con sus respectivas páginas independientes.

Cada página debe explicar el tipo de servicio y ofrecer los ejemplos correspondientes según la bibliografía.

No generar subpáginas adicionales para cada actividad o característica mencionada dentro de un servicio.

Conservar todas las definiciones, ejemplos y preguntas existentes.

## 4. Recursos de Internet

Esta sección necesita una reorganización importante.

Actualmente se presentan en el mismo nivel conceptos de direccionamiento, registración, protocolos de consulta y herramientas.

Quiero separarlos en tres grupos principales.

### 4.1 Direcciones y bloques IP

```text
Direcciones y bloques IP
└── Registros Regionales de Internet (RIR)
```

La página Direcciones y bloques IP debe explicar los conceptos de direccionamiento y asignación de recursos desarrollados en la teoría.

La página RIR debe explicar qué son los registros regionales, sus responsabilidades y los ejemplos que menciona la cátedra.

No crear páginas independientes para cada RIR si solamente se presentan como ejemplos de una misma clasificación.

### 4.2 Consulta de información de registro

Crear una categoría intermedia:

```text
Consulta de información de registro
├── WHOIS
└── RDAP
```

Esta categoría debe explicar el propósito general de consultar información de registro de recursos de Internet.

WHOIS y RDAP deben mantener páginas independientes.

Cada una debe incluir:

- Definición.
- Funcionamiento general.
- Tipo de información consultable.
- Características.
- Ejemplos de consultas.
- Diferencias relevantes entre WHOIS y RDAP.
- Preguntas de repaso.

No presentar WHOIS y RDAP como mecanismos exclusivos de consulta de direcciones IP, porque también pueden utilizarse para consultar información de registración de dominios.

#### Cliente icann-rdap

Actualmente existe una página independiente llamada Cliente icann-rdap.

Quiero que evalúes su contenido y, si únicamente describe una herramienta utilizada para consultar RDAP, lo integres como una sección práctica de la página RDAP.

Conservá:

- Comandos.
- Ejemplos.
- Explicaciones.
- Preguntas.
- Referencias académicas.

No elimines la URL anterior sin implementar un mecanismo de compatibilidad.

### 4.3 Nombres de dominio y DNS

Organizar de la siguiente manera:

```text
Nombres de dominio y DNS
└── Registro de nombres de dominio
```

La página principal debe explicar:

- Qué son los nombres de dominio.
- Concepto general de DNS.
- Jerarquía de nombres.
- Relación entre nombres de dominio y recursos de Internet.
- Conceptos relevantes presentados por la cátedra.

La página Registro de nombres de dominio debe explicar el proceso de registración y sus participantes.

Actualmente existen páginas individuales para:

- Registry.
- Registrar.
- Registrant.

Quiero que esos tres conceptos se expliquen dentro de Registro de nombres de dominio.

Son roles dentro del sistema de registración, no subcategorías de nombres de dominio.

Conservá sus definiciones, diferencias, ejemplos, preguntas y referencias.

Si se fusionan las páginas anteriores, implementá redirecciones para sus URLs y actualizá los enlaces internos.

## 5. Correo electrónico e investigación

Organizar esta sección de la siguiente manera:

```text
Correo electrónico e investigación
├── SMTP y flujo del correo
├── Análisis de encabezados de correo
└── Suplantación del remitente (Email Spoofing)
```

### 5.1 SMTP y flujo del correo

Mantener una página dedicada a explicar el funcionamiento general del correo electrónico.

Debe incluir:

- Concepto de SMTP.
- Funcionamiento general del envío de mensajes.
- Componentes y participantes del proceso.
- Sobre SMTP.
- Encabezados del mensaje.
- Cuerpo del mensaje.
- Diferencia entre información del sobre y del encabezado.
- Ejemplos y preguntas de repaso.

Actualmente existe una página independiente llamada Sobre, encabezados y cuerpo.

Quiero que su contenido se integre dentro de SMTP y flujo del correo, porque son componentes de un mensaje y su transporte, no categorías independientes.

Conservar el contenido y las URLs mediante el mecanismo de compatibilidad existente.

### 5.2 Análisis de encabezados de correo

Mantener una página independiente para el análisis de encabezados.

Debe explicar:

- Objetivo del análisis.
- Información relevante de los encabezados.
- Interpretación de los campos tratados en la teoría.
- Reconstrucción del recorrido de un mensaje.
- Ejemplos de investigación.

Actualmente existen páginas específicas para:

- MXToolbox Email Headers.
- Google Admin Toolbox Messageheader.

Si esas páginas se limitan a presentar herramientas utilizadas para analizar encabezados, integrarlas como subsecciones prácticas dentro de Análisis de encabezados de correo.

Conservar procedimientos, ejemplos, preguntas y referencias.

No crear una página independiente por cada herramienta auxiliar.

### 5.3 Suplantación del remitente

Mantener una página independiente para:

**Suplantación del remitente (Email Spoofing)**

Explicar:

- Qué es la suplantación del remitente.
- Cómo se relaciona con el funcionamiento del correo electrónico.
- Qué información puede falsificarse.
- Cómo puede investigarse.
- Ejemplos.
- Mecanismos de protección tratados en la bibliografía, si corresponde.

Conservar enlaces cruzados con SMTP y Análisis de encabezados.

No incorporar conceptos externos que la cátedra no desarrolla, salvo que ya existan como ampliaciones identificadas y técnicamente correctas.

## 6. Incidentes de seguridad

Reorganizar de la siguiente manera:

```text
Incidentes de seguridad
├── Gestión de incidentes
│   └── Notificación de incidentes
│
└── Manejo de información sensible
    └── Traffic Light Protocol (TLP)
```

### 6.1 Gestión de incidentes

Actualmente existe una página denominada Recepción, evaluación y gestión de incidentes.

Quiero convertirla en una página más general llamada Gestión de incidentes.

Debe explicar el proceso de gestión desarrollado por la cátedra, incluyendo las etapas que correspondan:

- Recepción.
- Evaluación de pertinencia.
- Clasificación.
- Priorización.
- Análisis.
- Coordinación.
- Seguimiento.
- Cierre.

Utilizá únicamente las etapas efectivamente desarrolladas en las fuentes.

No crear automáticamente subpáginas para cada etapa del procedimiento.

Estas deben explicarse como secciones dentro de Gestión de incidentes.

### 6.2 Notificación de incidentes

Quiero contemplar una página independiente para Notificación de incidentes.

Primero verificá si las fuentes y el contenido existente ofrecen información suficiente para desarrollarla.

Si existe contenido suficiente, creá la página y explicá:

- Qué significa notificar un incidente.
- Objetivos de la notificación.
- Información relevante que debe comunicarse.
- Destinatarios y canales de comunicación, según la bibliografía.
- Consideraciones sobre manejo de información sensible.

Si la notificación solamente aparece como una etapa breve de Gestión de incidentes, mantenela como sección interna y explicá en el informe por qué no se justifica una página independiente.

No inventes contenido para completar artificialmente la jerarquía.

### 6.3 Manejo de información sensible

Mantener una página que explique los criterios generales para tratar y compartir información sensible relacionada con incidentes.

Debe servir como introducción a Traffic Light Protocol.

### 6.4 Traffic Light Protocol (TLP)

Mantener una página propia para TLP.

Explicar:

- Qué es.
- Para qué sirve.
- Cómo se utiliza para clasificar la distribución de información.
- Niveles o etiquetas presentados por la cátedra.
- Ejemplos de aplicación.
- Preguntas de repaso.

No crear subpáginas independientes para cada etiqueta TLP.

Los niveles deben explicarse dentro de la página principal.

## 7. PGP y conceptos compartidos con Criptografía

En la teoría de CSIRT pueden aparecer referencias a PGP, cifrado, firmas digitales y mecanismos de protección de comunicaciones.

Esos conceptos ya tienen páginas en Criptografía.

**No duplicar sus explicaciones completas dentro de CSIRT.**

Cuando resulte pertinente, agregar enlaces a las páginas existentes.

Por ejemplo, desde el manejo de información sensible puede incluirse un enlace a PGP.

La relación debe representarse como un enlace entre temas, no como una duplicación jerárquica.

## 8. Regla general de granularidad

Mantener el criterio utilizado en las reorganizaciones anteriores.

### Crear páginas para:

- Conceptos temáticos independientes.
- Categorías.
- Subcategorías.
- Técnicas.
- Protocolos.
- Métodos suficientemente desarrollados en las fuentes.

### No crear automáticamente páginas para:

- Características.
- Propiedades.
- Roles dentro de una explicación.
- Etapas de un procedimiento.
- Ejemplos.
- Herramientas auxiliares mencionadas brevemente.
- Ventajas y desventajas.
- Preguntas de repaso.

Estas últimas deben incluirse como secciones dentro de las páginas correspondientes.

Excepcionalmente, una herramienta o procedimiento puede tener una página propia si la bibliografía lo desarrolla como tema independiente y dispone de contenido académico suficiente.

## 9. Fuentes académicas

Utilizar prioritariamente los siguientes documentos de la carpeta `docs/catedra cosas/`:

- `04 - CSIRT parte 1 - Gestión de Recursos de Internet.pdf`
- `04 - CSIRT parte 2 - SMTP Y Analisis de Encabezados.pdf`
- `04 - CSIRT parte 3 - Gestión de incidentes.pdf`

Podés utilizar los manuales complementarios existentes en `/docs` para aclaraciones, ejemplos o contexto adicional.

Las presentaciones oficiales de la cátedra tienen prioridad.

Respetar la terminología, definiciones y nivel de profundidad de las fuentes.

No inventar explicaciones ni completar conceptos con información no respaldada.

Si una fuente solamente menciona un concepto brevemente, no generar contenido académico extenso de forma artificial.

Conservar las ampliaciones existentes que sean correctas, identificándolas cuando corresponda.

## 10. Conservación de contenido y URLs

Esta es una condición prioritaria.

**No quiero perder contenido académico durante esta reorganización.**

Antes de fusionar, renombrar o reubicar páginas:

1. Identificá su contenido original.
2. Determiná a qué página nueva corresponde cada explicación.
3. Conservá definiciones, ejemplos, procedimientos, comandos, preguntas y referencias.
4. Evitá duplicaciones innecesarias.
5. Conservá identificadores estables cuando sea posible.
6. Actualizá los enlaces internos.
7. Preservá las URLs antiguas mediante permalinks o redirecciones estáticas.
8. Verificá que ninguna página quede huérfana.

Utilizá los mecanismos de compatibilidad que ya implementaste en reorganizaciones anteriores.

No elimines páginas sin comprobar que toda su información relevante fue preservada.

## 11. Restricciones de implementación

Esta etapa debe modificar exclusivamente **CSIRT y gestión de incidentes**.

No modificar el contenido académico de:

- Fundamentos de Ciberseguridad.
- Codificación.
- Criptografía.
- Esteganografía.
- Malware y análisis.
- Prácticas y resolución razonada.

Se permiten modificaciones indispensables de enlaces cruzados y archivos HTML generados que reflejen la navegación compartida.

No modificar:

- La arquitectura general del proyecto.
- Los estilos visuales existentes.
- Los cuestionarios originales.
- Los documentos PDF.
- Funcionalidades ajenas a la wiki.
- El sistema de generación, salvo que exista una necesidad técnica justificada.

Trabajá sobre la rama actual:

`feat/wiki-academica`

No realices push ni abras un Pull Request.

## 12. Actualización de navegación

Una vez reorganizado el contenido:

1. Actualizá el manifiesto o catálogo de páginas.
2. Corregí las relaciones padre-hijo.
3. Regenerá los HTML estáticos.
4. Actualizá la barra lateral.
5. Actualizá breadcrumbs.
6. Actualizá el índice de búsqueda.
7. Actualizá las relaciones entre páginas.
8. Preservá las URLs antiguas.
9. Verificá el funcionamiento bajo `/repaso-ciber/` en GitHub Pages.

No crees un segundo sistema de navegación ni modifiques la arquitectura de la wiki.

## 13. Validación

Al finalizar:

- Ejecutá las pruebas existentes del proyecto.
- Ejecutá las pruebas específicas de la wiki.
- Verificá que no haya enlaces rotos.
- Comprobá que todas las páginas anteriores continúen siendo accesibles.
- Verificá que no existan páginas huérfanas.
- Confirmá que la jerarquía resultante sea consistente.
- Verificá que no se hayan perdido ejemplos, preguntas o referencias.
- Confirmá que las demás secciones conserven sus contenidos.
- Comprobá que los HTML generados estén actualizados.
- Verificá navegación, búsqueda y breadcrumbs.
- Comprobá el funcionamiento en localhost y con el prefijo `/repaso-ciber/`.

Si alguna prueba no puede ejecutarse, indicá claramente el motivo y no la reportes como aprobada.

## 14. Resultado esperado

Cuando termines, proporcioname:

1. **Árbol jerárquico final completo de CSIRT y gestión de incidentes.**
2. Lista de páginas reubicadas.
3. Lista de páginas fusionadas o renombradas.
4. Nuevas páginas creadas, si corresponde.
5. Explicación de dónde quedó el contenido de cada página fusionada.
6. URLs antiguas preservadas y mecanismos de compatibilidad utilizados.
7. Archivos modificados.
8. Pruebas ejecutadas y resultados.
9. Conceptos cuya clasificación todavía consideres discutible.

No avances a reorganizar Malware, Fundamentos, Criptografía ni otras secciones.

**Quiero revisar y aprobar personalmente la nueva estructura de CSIRT antes de continuar.**

El objetivo es conseguir una jerarquía académicamente coherente, con páginas independientes para conceptos relevantes y sin crear subpáginas innecesarias para características, roles o etapas de procedimientos.
### L2 — Initial evidence and route

Clean branch HEAD8ec5347 is a user-amended commit with the same tree as d94b57a (1aaa29d069a090d8701db6ee9a85f7371b3c8e9a); preserve the user's history. Existing28 CSIRT notes, with7 role/auxiliary-page consolidation candidates. Expected new lookup category and conditional notification page. The parent owns root/teams/four services, preservation fixtures/tests, shared docs, generation, browser and Git. Two bounded writers own Internet resources vs mail/incidents; their surfaces are disjoint. All existing IDs and old routes must remain available, including descendants of reparented categories. All academic text is neutral professional Spanish; identifiers are English; commit messages are Spanish. No external query or remote command is part of academic examples.

Test-first exception applies to passive academic prose; deterministic hierarchy/preservation assertions are observed RED before source edits and GREEN after. No normalizer/generator/install is delegated. The existing generator computes each route from the full ancestor slug chain unless that note has its own permalink; an ancestor permalink alone does not pin descendant routes.

### L3 — Parent foundation and checks

Captured185 non-heading academic blocks from all28 original CSIRT notes before any content edits. Historical fixture includes each stable ID, old published URL, source-page references and intended canonical destination for the7 consolidation candidates. The three new CSIRT assertions failed on the baseline hierarchy (resources flat, anatomy independent, services a root sibling). Reparented services to teams and pinned all four service pages individually, because the generator does not inherit ancestor permalinks. Focused teams test passed. Two independent bounded writers are active on declared disjoint Internet-resources vs mail/incidents surfaces; the parent retains all shared integration and Git ownership. Original-app regression runner is read-only in fresh LF TEMP state.

### L4 — Source decisions and consolidation

Both bounded writers completed within declared disjoint surfaces and reported `skill_resolution: paths-injected`. Parent reran both exact focused commands successfully. Resources lecture p17 explicitly supports domain queries by WHOIS/RDAP; parent checked the source. The auxiliary client and three roles were integrated without deleting any original academic block. Mail anatomy and both header tools likewise fit practical sections. Notification has enough independent content: incidents p18 explains purpose/contact/evidence/timestamps/timezone, and p19 shows an SSH email notification (parent visually verified the image, including a private example IP and PST reference). Its own note cites9/18/19/23/26 and cross-links existing handling/PGP/TLP material. No artificial stages or universal channel mandates added.

### L5 — Final functional verification

`node --test tools/wiki/test/build.test.mjs`:12/12PASS. Content audit:190canonicalnotes,175reviewanswers,11compatibilitynotes. Staticbuild and`--check`:39,630locallinksvalid,currentoutput. All185originalacademicblocks,28CSIRTIDs/URLs/sourcepagespreserved;23canonicalCSIRTpagesand7compatibilitynotes. Independent baseline-byte audit:172outsideacademicsourcesunchanged;166outsideacademicHTMLbodiesunchangedexceptnecessarycanonicalredirectlinks;all199oldHTMLURLsretained,201nowpublished. Originalapp/PDFs/styles/generator/dependenciesunchanged.

Wiki browser first exposed a nonwaiting child-card snapshot after an existing Algoritmos breadcrumb click; static HTML and target href were correct. Added explicit load waits for the existing algorithm/mode category navigations in the Wiki test only. RecheckPASS atrootand`/repaso-ciber/`:requestedancestry/oldpermalinks,all7newredirectswithandwithoutJavaScript,search,desktop,mobile,directreload. Thisdoesnotmodifycryptographycontentorproductbehavior.

Original-app runner exportedLFbaseline8ec5347. All33originalfilesmatchHEAD/liveafterLFnormalization (aggregateSHA256manifest7232ce5e2306465d23818dee31a6c0f3768a1c63d3d01d207bd0e4bb1b888369). `npm test`:25/25PASS;datavalidatorPASSandparentexactspotPASS. `npm run test:dom` unavailable:missingjsdom. UnchangedoriginalbrowserFAILwithWindowsURL.pathname screenshotpath;after12scratch-onlyfileURLToPathadaptations,itFAILedat`tests/browser.mjs:269`with30-secondtimeout:question442confirmbuttonhidden/disabled. No retry,nooriginalfilefix,andnotreportedPASS. Thisfailureoccurredonthebaseappcopy;newWikiUIproofisindependent. Noadditionalstageauthorized.
