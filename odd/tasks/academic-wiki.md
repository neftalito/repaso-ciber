# Academic Wiki implementation
Branch: feat/wiki-academica; baseline: a835f96; delivery: single-pr (explicit user choice), no push or PR publication.
Runner: Node tests + isolated Wiki build/check + existing npm/Python checks. Forecast: substantial academic corpus, above 400 authored lines; coherent commits within the same PR.

## Specs
S1: "mantené HTML, CSS y JavaScript nativo. No introduzcas frameworks innecesarios."
S2: "Los PDF de docs/catedra cosas/ son fuentes locales de trabajo. No los agregues al repositorio, no los elimines ni los modifiques."
S3: "los archivos HTML generados deben quedar disponibles y versionados para GitHub Pages. Incorporá mecanismos para detectar si quedaron desactualizados respecto de las fuentes Markdown."
S4: "Conservá íntegramente las funcionalidades, estilos y comportamientos originales."
S5: "creá una rama feat/wiki-academica. Todo el desarrollo se realizará allí y estará destinado a un único Pull Request."
S6: "comenzá por la infraestructura y una página piloto para validar navegación, estilos y rutas. Después continuá con la generación de todo el contenido académico."
S7: "ejecutá las pruebas disponibles y verificá la compilación de las notas, los enlaces internos y la compatibilidad con GitHub Pages."
S8: "cuando termines la implementación, indicame exactamente cómo ejecutar y probar toda la aplicación en localhost."
S9: "no realices push ni abras el Pull Request hasta que te lo autorice explícitamente."
S10: The following attached specification is authoritative, reproduced verbatim:
# Implementar módulo Wiki Académica en repaso-ciber

## 1. Contexto del proyecto

Estoy trabajando sobre una copia local del repositorio:

https://github.com/neftalito/repaso-ciber

Sitio publicado:

https://neftalito.github.io/repaso-ciber/

El proyecto ya cuenta con una aplicación web funcional que incluye recursos académicos, enlaces a documentos y cuestionarios de Introducción a la Ciberseguridad.

Quiero contribuir al proyecto mediante un **pull request que incorpore un nuevo módulo de Wiki Académica**.

**No quiero reconstruir, rediseñar ni reemplazar la aplicación existente.**

El objetivo es agregar una funcionalidad nueva que conviva con las secciones actuales sin modificar su comportamiento.

Estás trabajando directamente sobre la carpeta clonada del repositorio.

## 2. Inspección inicial obligatoria

Antes de implementar cualquier cambio:

1. Analizá la estructura del repositorio.
2. Identificá las tecnologías, dependencias y arquitectura existentes.
3. Identificá cómo se implementan las páginas y la navegación.
4. Investigá el mecanismo de compilación y despliegue en GitHub Pages.
5. Revisá las convenciones de código, componentes y estilos actuales.
6. Verificá el estado de Git, las ramas y los repositorios remotos.
7. Identificá los archivos que sería necesario crear o modificar para incorporar la wiki.

Reutilizá las tecnologías existentes siempre que sea razonable.

No introduzcas un framework nuevo ni una arquitectura paralela innecesaria.

Antes de desarrollar, definí cómo integrar el módulo de forma aislada y con el menor impacto posible.

## 3. Restricción principal: preservar la aplicación existente

Esta es una condición prioritaria de la implementación.

**No modificar las funcionalidades existentes de la web.**

En particular:

- No alterar documentos, cuestionarios ni sus contenidos.
- No modificar rutas existentes.
- No alterar el diseño visual de las secciones actuales.
- No refactorizar componentes ajenos a la wiki.
- No modificar funcionalidades que ya funcionan.
- No cambiar innecesariamente la configuración del proyecto.
- No realizar migraciones de arquitectura.
- No modificar el mecanismo de despliegue salvo que exista una necesidad técnica justificada.

Priorizar la creación de archivos nuevos.

Se permite una modificación mínima y localizada en la navegación existente para incorporar un enlace a la wiki.

Cualquier otra modificación a archivos preexistentes debe estar estrictamente justificada por una necesidad de integración.

Los estilos de la wiki deben estar aislados para evitar efectos secundarios sobre el resto de la aplicación.

## 4. Nuevo módulo: Wiki Académica

Implementar una sección de solo lectura dedicada a explicar los contenidos de la materia Introducción a la Ciberseguridad.

La wiki debe permitir estudiar los temas de forma progresiva, navegando desde conceptos generales hasta clasificaciones, técnicas y algoritmos específicos.

Debe funcionar como un sistema de notas académicas independientes, organizadas jerárquicamente.

La wiki tendrá una ruta propia dentro del sitio, preferentemente `/wiki/`, adaptada al sistema de rutas existente.

No implementar edición, autenticación, administración de usuarios ni base de datos.

## 5. Organización jerárquica y granularidad

**Regla fundamental: cada concepto temático independiente debe tener su propia página.**

La jerarquía puede alcanzar tantos niveles como sean necesarios.

Crear páginas independientes para:

- Temas generales.
- Categorías.
- Subcategorías.
- Técnicas.
- Métodos.
- Algoritmos.
- Protocolos y herramientas cuando corresponda.

### Ejemplo 1: Criptografía clásica

```text
Criptografía
└── Cifrado
    └── Criptografía clásica
        ├── Sustitución
        │   ├── Cifrado César (ROT)
        │   └── Máquina Enigma
        └── Transposición
            ├── Escítala
            └── Transposición columnar
```

Cada elemento debe tener su propia página.

La página `Sustitución` introduce el concepto y enlaza con César y Enigma.

La página `Cifrado César` explica específicamente el algoritmo, sus características, funcionamiento, ejemplos y preguntas.

### Ejemplo 2: Criptografía simétrica

```text
Criptografía moderna
└── Criptografía simétrica
    ├── Cifrado por bloques
    │   ├── ECB
    │   ├── CBC
    │   ├── CFB
    │   └── OFB
    └── Cifrado de flujo
```

Cada modo de operación tiene su propia página.

No concentrar las explicaciones completas de ECB, CBC, CFB y OFB en la página de Cifrado por bloques.

### Ejemplo 3: Funciones hash

```text
Criptografía
└── Funciones hash
    ├── MD5
    ├── SHA-1
    ├── SHA-2
    └── SHA-3
```

Las funciones hash deben mantenerse conceptualmente separadas de los métodos de cifrado.

Este árbol es ilustrativo. La clasificación definitiva debe construirse a partir de las fuentes, respetando las relaciones conceptuales correctas.

### Qué NO debe convertirse en subpágina

No crear automáticamente páginas para:

- Características.
- Propiedades.
- Ventajas y desventajas.
- Objetivos.
- Pasos de funcionamiento.
- Ejemplos.
- Preguntas de repaso.

Por ejemplo, la tríada CIA puede explicarse en una misma página incluyendo confidencialidad, integridad y disponibilidad, sin dividir automáticamente esos atributos en tres páginas.

**La granularidad se aplica a categorías, clasificaciones y conceptos temáticos independientes; no a cada término o característica mencionada en una explicación.**

## 6. Contenido de cada página

Cada página debe incluir, según corresponda:

1. **Definición:** explicación breve y precisa.
2. **Funcionamiento:** explicación técnica o conceptual.
3. **Características:** propiedades, ventajas, desventajas y limitaciones.
4. **Ejemplos:** demostraciones, cálculos, comandos o casos prácticos.
5. **Subcategorías:** introducción y enlaces a páginas hijas.
6. **Conceptos relacionados:** enlaces a otras páginas pertinentes.
7. **Preguntas de repaso:** preguntas con respuestas desplegables.
8. **Fuentes:** documentos y páginas utilizados para elaborar el contenido.

No forzar secciones que no sean pertinentes.

Las páginas de categorías deben ser relativamente breves y servir como punto de navegación.

Las páginas finales, correspondientes a técnicas o algoritmos, pueden ser más detalladas.

Evitar duplicar las mismas explicaciones en diferentes páginas.

## 7. Navegación de la wiki

Implementar dentro del nuevo módulo:

- Árbol jerárquico de temas.
- Categorías expandibles y contraíbles.
- Breadcrumbs que permitan regresar a categorías superiores.
- Enlaces a subcategorías, técnicas y algoritmos.
- Enlaces cruzados a conceptos relacionados.
- Buscador de páginas por nombre o tema.
- Preguntas con respuestas desplegables.
- Navegación compatible con dispositivos móviles.

Cada nota debe tener su propia URL, permitiendo compartir un enlace directo a ella.

La experiencia debe ser similar a la de una wiki o sistema de documentación académica.

## 8. Arquitectura del contenido

El contenido académico debe mantenerse separado de la implementación visual.

Preferentemente utilizar archivos Markdown o MDX si son compatibles con la arquitectura actual, evitando introducir dependencias innecesarias.

Cada página debe tener metadatos suficientes para representar:

- Identificador único.
- Título.
- Página padre.
- Tipo de concepto.
- Orden de navegación.
- Relaciones con otras páginas.
- Referencias bibliográficas.

La jerarquía y los enlaces internos deben generarse a partir de una fuente estructurada, evitando mantener manualmente múltiples estructuras inconsistentes.

El sistema debe permitir agregar nuevas notas sin tener que desarrollar un componente nuevo para cada una.

## 9. Contenido académico y fuentes

Utilizar los documentos proporcionados de Introducción a la Ciberseguridad como fuentes.

La teoría oficial de la cátedra tiene prioridad sobre las explicaciones complementarias.

Generar explicaciones originales basadas en las fuentes, sin reproducir extensamente sus textos.

No inventar clasificaciones, definiciones ni procedimientos.

No incorporar contenido externo sin identificarlo como ampliación y justificar su necesidad.

Antes de crear las notas:

1. Identificar todos los conceptos relevantes.
2. Construir una taxonomía completa.
3. Determinar las relaciones padre-hijo.
4. Identificar conceptos relacionados.
5. Detectar posibles duplicaciones.
6. Revisar la corrección conceptual de la estructura.

Si los PDF no se encuentran disponibles en el entorno de trabajo, informarlo. No generar contenido académico extenso sin las fuentes necesarias.

## 10. Diseño visual e integración

Mantener la identidad visual general del proyecto.

La wiki puede tener una distribución específica para documentación, incluyendo una barra lateral y un área central de lectura.

Reutilizar componentes y estilos existentes cuando sea apropiado.

Los nuevos estilos deben estar aislados.

No incorporar estilos globales que alteren páginas existentes.

Priorizar accesibilidad, legibilidad y diseño responsive.

## 11. Compatibilidad con GitHub Pages

La aplicación debe seguir funcionando correctamente en:

https://neftalito.github.io/repaso-ciber/

Considerar especialmente:

- La ruta base `/repaso-ciber/`.
- Enlaces relativos.
- Carga de recursos estáticos.
- Acceso directo a notas internas mediante URL.
- Recarga del navegador desde páginas internas.
- Compatibilidad con el proceso de despliegue actual.

No asumir que GitHub Pages proporciona automáticamente un sistema de fallback para rutas de aplicaciones SPA.

Resolver las rutas de manera compatible con la arquitectura existente.

## 12. Preparación para pull request

Todo el trabajo debe realizarse en una rama nueva, por ejemplo:

`feat/wiki-academica`

Antes de crearla, verificar el estado de Git y no sobrescribir modificaciones locales existentes.

El PR debe estar enfocado exclusivamente en la implementación del módulo Wiki Académica.

Priorizar un diff limpio, limitado y fácil de revisar.

No incluir refactorizaciones ajenas al objetivo.

No subir innecesariamente los PDF originales ni archivos generados que no correspondan al repositorio.

Preparar una descripción del PR que incluya:

- Objetivo de la contribución.
- Funcionalidades agregadas.
- Archivos nuevos.
- Archivos existentes modificados y justificación.
- Instrucciones para probar la wiki.
- Pruebas realizadas.
- Capturas de la interfaz, si están disponibles.

No realizar push ni abrir el PR automáticamente sin mi autorización.

## 13. Verificación

Antes de considerar terminada la implementación:

- Ejecutar las pruebas existentes del proyecto.
- Comprobar que la aplicación compile correctamente.
- Comprobar que los documentos sigan funcionando.
- Comprobar que los cuestionarios no hayan sido alterados.
- Verificar la navegación jerárquica de la wiki.
- Verificar que no existan enlaces internos rotos.
- Verificar que no existan páginas huérfanas.
- Verificar que la jerarquía no contenga ciclos.
- Verificar que cada técnica o algoritmo identificado tenga su página correspondiente.
- Comprobar el funcionamiento con la ruta base de GitHub Pages.
- Revisar el diff final para detectar modificaciones innecesarias.

## 14. Organización de la implementación

Trabajar en estas etapas:

**Etapa 1 — Análisis:** inspeccionar el repositorio y definir el punto de integración.

**Etapa 2 — Taxonomía:** construir la estructura jerárquica a partir de las fuentes.

**Etapa 3 — Infraestructura:** implementar el sistema de páginas, navegación y componentes reutilizables.

**Etapa 4 — Contenido:** crear las notas individuales y sus relaciones.

**Etapa 5 — Validación:** comprobar el funcionamiento de la wiki y que las funcionalidades existentes permanezcan intactas.

**Etapa 6 — Preparación del PR:** revisar los cambios, documentarlos y dejar la rama lista para su publicación.

## Resultado esperado

Una nueva sección Wiki Académica completamente funcional e integrada al proyecto repaso-ciber, capaz de mostrar notas organizadas jerárquicamente hasta el nivel de técnicas y algoritmos individuales.

El proyecto original debe conservar todas sus funcionalidades y comportamiento.

**La implementación debe ser modular, mantenible, incremental y adecuada para presentarse como un pull request de bajo impacto sobre el código existente.**
### S11 — Cryptography hierarchy revision

Quiero reorganizar la estructura jerárquica de la Wiki Académica.

Vamos a realizar esta tarea progresivamente, trabajando sobre una sección a la vez.

**Por el momento, quiero modificar exclusivamente la jerarquía de Criptografía.**

No modifiques Fundamentos de Ciberseguridad, CSIRT, Malware ni Prácticas.

## 1. Objetivo

La wiki ya está implementada y cuenta con numerosas páginas.

El objetivo no es reconstruirla ni generar nuevamente todo su contenido, sino **corregir las relaciones jerárquicas entre las páginas existentes**, para obtener una clasificación académicamente coherente.

Cada categoría, subcategoría, técnica y algoritmo debe conservar su propia página.

Las características, propiedades, ventajas, desventajas y ejemplos deben permanecer dentro de las páginas correspondientes.

## 2. Nueva jerarquía de Criptografía

Utilizá el siguiente árbol como estructura objetivo:

```text
Criptografía
│
├── Cifrado
│
├── Criptografía clásica
│   ├── Cifrado por sustitución
│   │   ├── Cifrado César (ROT)
│   │   └── Máquina Enigma
│   │
│   └── Cifrado por transposición
│       ├── Escítala
│       └── Transposición columnar
│
└── Criptografía moderna
    │
    ├── Criptografía simétrica
    │   ├── Cifrado por bloques
    │   │   ├── Algoritmos
    │   │   │   ├── DES
    │   │   │   ├── 3DES
    │   │   │   ├── AES
    │   │   │   ├── RC5
    │   │   │   ├── IDEA
    │   │   │   └── Blowfish
    │   │   └── Modos de operación
    │   │       ├── ECB
    │   │       ├── CBC
    │   │       ├── CFB
    │   │       └── OFB
    │   └── Cifrado de flujo
    │       ├── RC4
    │       ├── SEAL
    │       └── A5
    │
    ├── Criptografía asimétrica
    │   ├── RSA
    │   ├── ElGamal
    │   └── Criptografía de curvas elípticas (ECC)
    │
    ├── Acuerdo de claves
    │   └── Diffie-Hellman
    │
    ├── Funciones hash
    │   ├── MD5
    │   ├── SHA-1
    │   ├── SHA-2
    │   └── SHA-3
    │
    ├── Firma digital
    │   └── DSA
    │
    ├── Certificados digitales
    │
    ├── Infraestructura de clave pública (PKI)
    │   └── Autoridades de certificación (CA)
    │
    ├── Cifrado híbrido
    │
    └── PGP
        ├── Red de confianza
        └── GPG / GnuPG
```

Esta estructura representa las relaciones principales. No es una lista exhaustiva que autorice a eliminar conceptos que no aparecen.

Las páginas de categorías intermedias, como "Algoritmos" y "Modos de operación", deben tener explicaciones propias y enlaces a sus páginas hijas.

## 3. Tratamiento del contenido existente

Esta es una condición fundamental:

**No elimines páginas ni contenido académico porque no aparezcan explícitamente en el nuevo árbol.**

Existen actualmente páginas adicionales, como:

- Atbash.
- Vigenère.
- Rail Fence.
- Transposición por inversión.
- Transposición por grilla.
- Colisiones y preimágenes.
- Hashes y comprobación de contraseñas.
- Operación XOR.
- TLS y certificados en HTTPS.

Para esas páginas:

1. Evaluá su ubicación académicamente correcta.
2. Conservá su contenido.
3. Reubicá las técnicas y algoritmos que correspondan.
4. Identificá los conceptos que sean características o propiedades y que podrían integrarse como secciones de otras páginas.
5. No fusiones ni elimines páginas existentes sin mi autorización.
6. Identificá claramente los contenidos que sean ampliaciones y no estén respaldados directamente por las teorías de la cátedra.

Por ahora, mantené Codificación y Esteganografía en sus ubicaciones actuales. Más adelante revisaremos su ubicación dentro de la taxonomía general de la wiki.

## 4. Preservación de enlaces y contenido

Los cambios deben afectar principalmente a la jerarquía y navegación.

- Conservá las explicaciones, ejemplos y preguntas existentes.
- Conservá los identificadores estables de las páginas siempre que sea posible.
- No modifiques URLs innecesariamente.
- Si es indispensable modificar rutas, actualizá todos los enlaces internos afectados y preservá la compatibilidad de las URLs anteriores cuando sea posible.
- Actualizá breadcrumbs, barra lateral, buscador y relaciones padre-hijo.
- Regenerá los HTML y los índices necesarios mediante el sistema de generación existente.
- Evitá crear contenido duplicado.
- No alteres estilos ni funcionalidades de la aplicación.

## 5. Restricciones

No modifiques ninguna sección fuera de Criptografía, excepto referencias o enlaces que necesiten actualizarse para evitar errores de navegación.

No agregues nuevas dependencias ni modifiques la arquitectura de la aplicación.

No realices push ni abras un Pull Request.

Trabajá sobre la rama de desarrollo actual, sin afectar main.

## 6. Verificación

Después de reorganizar la jerarquía:

1. Comprobá que todas las páginas existentes sigan siendo accesibles.
2. Verificá que no haya páginas huérfanas.
3. Comprobá que no existan enlaces rotos.
4. Verificá que breadcrumbs y navegación lateral reflejen la nueva estructura.
5. Ejecutá las pruebas correspondientes.
6. Confirmá que no hubo pérdida de contenido académico.
7. Mostrame el árbol final resultante.

Finalmente, informame qué páginas fueron reubicadas, qué archivos se modificaron y qué conceptos considerás que todavía necesitan una revisión de clasificación.

**No avances a reorganizar las demás áreas de la Wiki Académica. Quiero revisar y aprobar primero la sección de Criptografía.**

## Tasks
- T1 | S1,S2,S10 | delegated read-only source map (mapping trigger: full corpus exceeds evidence budget), parent records taxonomy | complete (source map and parent spot-check) | commit: pending
- T2 | S1,S3,S4,S6,S10 | inline generator and pilot with focused RED/GREEN | self-checks passed; final verification pending | commit: pending | Risk: item 5 (new isolated build dependency and CI)
- T3 | S2,S6,S10 | delegated cryptography notes (parallel independent content unit) | complete, 74 notes / 59 answers; contribution commit pending | commit: pending
- T4 | S2,S6,S10 | delegated CSIRT notes (parallel independent content unit) | complete, 28 notes / 24 answers; contribution commit pending | commit: pending
- T5 | S2,S6,S10 | delegated fundamentals, malware and practices notes (parallel independent content unit) | complete, 92 notes / 84 answers; contribution commit pending | commit: pending
- T6 | S3,S4,S7,S10 | inline integration and full generated output; delegated long suites and independent verifier for item 5 | functional checks passed; dependency/DOM proof pending | commit: pending
- T7 | S5,S8,S9,S10 | inline contribution documentation and local review instructions | documentation complete; final delivery pending | commit: pending

- T8 | S11 | inline hierarchy/permalink change; delegated read-only map (74 notes exceeds evidence budget), independent verification for shared generator item 3 | implemented and independently verified; native review pending | commit: pending | Risk: item 3 (shared route generation consumed by every Wiki page)

## Log
L1 (2026-10-22): User authorized implementation of the previously proposed architecture, expressly chose feat/wiki-academica and one PR, protected the untracked PDF sources, and prohibited push/PR publication. The attached original request above is retained verbatim.
L2: Read-only baseline was preserved: main a835f96, no tracked changes, only pre-existing untracked docs/catedra cosas/. Created requested feature branch. Existing review switch reads on (global); never toggle it automatically.
L3: Content is Spanish matching the existing academic site; code, tooling and contributor documentation are English. Taxonomy comes from official lecture PDFs first. Generated Wiki assets are isolated; only two existing HTML nav links may change. No broad git add.
L4: T1 source map completed in tools/wiki/TAXONOMY.md, official PDF page provenance checked. T2 pilot self-checks passed: focused tests 3/3 after observed RED; build/check 3 pages and 45 local links; browser verified root and /repaso-ciber/, desktop/mobile, direct reload, search and no-JavaScript reading. Chromium download absent; used locally installed Chrome via existing executable override. New parser is locally available Marked 17.0.5, with an entirely offline-generated lockfile. Public npm registry query was rejected by automatic permission review; no network workaround attempted. Local dependency preparation and remaining verification will use available offline resources.

L5: Corrected initial source map: lecture-crypto-1 physical p.25 explicitly lists CFB/OFB as well as ECB/CBC, confirmed by parent full-page extraction. Original npm test fails its SHA audit on this CRLF checkout: all four document hashes match recorded values after LF normalization. Direct Windows Python also needs UTF-8 mode; python3 alias is not executable. Data, source PDFs and original test scripts remain unchanged. Progress suite passes 14/14. Full clean-LF verification will distinguish platform conditions from regressions. New .gitattributes is scoped exclusively to new Wiki/task/workflow files for deterministic output; it does not normalize original files.
L6: Verification scratch: C:\Users\taiel\AppData\Local\Temp\academic-wiki-verification-7f55fae65f0349e0ae587fb5d57554da. PDF hashes persisted there as pdf-hashes.json. Source writes are confined to declared note directories; all source PDF modification timestamps predate implementation. Runtime tool reload discarded the earlier in-memory hash store, so use this durable snapshot and Git blob comparison for the final preservation check. Keep odd/tasks/academic-wiki.md as local agent bookkeeping, outside the contribution commit; no broad git add.

L7: Combined corpus is complete: 195 notes (root plus 74 cryptography, 28 CSIRT, 19 fundamentals, 55 malware, 18 practices), 167 review answers. Parent seam checks passed: 3 generator tests; full structural/source audit; build and --check validate 41,578 local links; browser passes both root and /repaso-ciber/, desktop/mobile, deep direct reload, search and no-JavaScript reading. Original-file diff remains exactly 2 nav-line additions. New tools/wiki/PULL_REQUEST.md is a local draft, not publication. Independent odd-verify (item5: dependency and CI) is running on a fresh temp snapshot with baseline comparison and long original suites, no network. Preliminary native assessment returned high/unassessable because untracked scope needs explicit declaration; no transaction START/consent/review has run. Reassess final committed scope after checks, explicitly excluding protected PDFs and local task log from contribution.
L8: Independent verifier completed canonical LF comparisons and 14 isolated probes. Candidate-only blocker: original validator requires file hrefs. Corrected only new navigation anchors to wiki/index.html, added original-to-Wiki browser coverage and neutralized two new search strings. Regenerated output; parent focused tests 3/3 and freshness 195 pages/41,578 links pass, diff --check clean. Limited blocker recheck delegated; no new full sweep. Baseline and candidate npm tests both 25/25; original browser assertions pass both after identical screenshot-only Windows path adaptation in scratch. Extraction checks differ solely in installed pypdf6.19.0 vs recorded6.20.1. Original DOM proof unavailable (jsdom absent). Offline Marked lock lacks integrity/resolved; clean offline install ENOTCACHED with empty cache, not evidence of online CI failure. Need explicit registry authorization to finish clean-install/DOM proof before contribution commits and final native review. No push/PR.

L9: Limited independent recheck resolved the only candidate-caused blocker: original Python validator passes 442 questions and all references; updated Wiki browser passes; original HTML bytes differ only in inserted file-target anchors. Parent reran Wiki browser successfully and confirmed all 18 PDF hashes unchanged against durable guard. Work remains uncommitted; exact-scope commits/native review await dependency verification. Will request anonymous registry.npmjs.org access only for declared npm development dependencies with lifecycle scripts disabled; user remote-authorization rule and prior automatic rejection require explicit consent. Existing local site is ready for personal preview, but final completion is pending these checks.

L10 (2026-10-22): User committed prior work as 816815e on feat/wiki-academica; working tree was clean. New attached request above authorizes only cryptography hierarchy revision and necessary navigation/reference regeneration, not registry access or publication. Existing course PDFs are now tracked in the user commit; never modify them. Preserve all 74 crypto note IDs, slugs, bodies and old URLs. Add an optional validated permalink override only to preserve existing moved-note paths; navigation remains parent-driven. Add only Algoritmos and Modos de operación as category pages. Keep encoding, steganography and cross-cutting XOR at their current root positions; preserve all extra notes. New classification caveats must distinguish official lecture coverage from companion explanations. Forecast: a single coherent source/tool/test unit plus generated output, single-pr strategy retained; not split by generated line count.

L11: T8 implementation: two category pages added; 54 existing metadata blocks gain fixed permalinks while parent/order changes implement the requested tree. Existing academic bodies/IDs/slugs are preserved. Optional permalink regression observed RED (old URL removed after reparent, invalid values accepted), then GREEN4/4 after minimal generator route override and strict path validation. Before content edits, default generator output remained byte-current (195pages), proving unchanged absent-option behavior. Full build/check passes197pages/42,398links; content audit197notes/167answers; updated browser passes root/prefix, retained RC5/CBC URLs, category children, parent-driven sidebar/breadcrumbs, search and responsive/noJS reading. No dependencies/styles/architecture/publishing changes. Independent item3 verification pending; compare all original bodies/routes against816815e.

L12: Independent S11 verification PASS at baseline816815e: 60 target parent relationships, all195 IDs/slugs/bodies/searchrecords/URLs retained,121 noncrypto Markdown files byte-identical,197 unique pages,2 newcategories,14 invalid permalink cases rejected before writes with unchanged output hashes. Root/prefix browser and4/4 generator tests pass. Parent differential spot-check of build/--root/--check/--help/unknown option matches baseline stdout/stderr/exitcodes; initial scratch baseline lacked Marked, then reused existing local parser and reran successfully without installation/network. Source/body preservation compare passed; formatting-only empty-child indentation fixed, diff --check clean. Native assessment is high due shared routing item3; no START/consent/review yet. Scope is one coherent hierarchy change, retains single-pr strategy; generated output accounts for most diff lines. Registry/DOM limitations from prior feature are unchanged and outside this scope.
