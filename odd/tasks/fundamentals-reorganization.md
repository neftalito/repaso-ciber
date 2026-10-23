# Fundamentos Wiki reorganization
Objective: preserve and reorganize the existing academic content. Branch: `feat/wiki-academica`; baseline: `2e042b1`; delivery: `single-pr` (no push/PR).
Runner: `node --test tools/wiki/test/build.test.mjs`, content/freshness checks and local browser smoke. Forecast: about 450 authored changed lines, excluding generated HTML and preservation hashes; one coherent work-unit commit with Spanish Conventional message.

## Specs

S1. Scope and preservation: “Esta etapa debe afectar únicamente Fundamentos de Ciberseguridad.” “No quiero perder contenido académico durante esta reorganización.” Preserve stable IDs, old URLs, citations, examples and review questions; no architecture/style/dependency/original-app/PDF changes.

S2. Hierarchy and granularity: “Quiero que Tríada CIA pase a ser una página hija de Seguridad de la información.” “Crear o adaptar una página independiente llamada **Ciberseguridad** dentro de Fundamentos.” “Quiero reorganizarlas como tres páginas independientes:” Amenaza, Vulnerabilidad, Riesgo. “Mantener una única página para Atacantes y motivaciones.” The complete exact target tree and all required titles are in L1 below.

S3. Attacks: “Quiero reorganizarla bajo el nombre **Tipos de ataques**, conservando su función como categoría general.” Ingeniería social → Phishing; retain MitM, application category with SQL Injection/RCE/SSRF, and a single DoS/DDoS comparison. “No presentarlos como mecanismos idénticos.”

S4. Source-led explanations: “La presentación oficial tiene prioridad sobre el material complementario.” Use physical2–18 of `docs/catedra cosas/01c - Conceptos Básicos.pdf`, with contextual ISO/IEC27032/NIST definitions, HIBP, seven defense layers, AI risks and class Prompt Injection example. “Tampoco confundir Prompt Injection con otros conceptos, como el jailbreak de modelos, aunque puedan relacionarse.” Label correct companion/editorial expansions when appropriate.

S5. Compatibility and validation: “Preservá las URLs antiguas mediante los mecanismos de compatibilidad existentes.” “Verificá la compatibilidad con GitHub Pages y la ruta `/repaso-ciber/`.” “Verificá que no haya pérdida de contenido.” Check complete target hierarchy, links, orphans, search, breadcrumbs, generated freshness and unchanged outside content. Final report includes the complete tree and every requested delivery item from L1.

## Tasks

- T1 | S1,S4 | delegated read-only source map: evidence budget exceeded by original19-note read | complete; course pages2–18 mapped, parent spot-check4/17; commit pending.
- T2 | S1–S4 | inline: one coherent passive content/metadata unit, no writer trigger | complete; hierarchy test observed RED then GREEN, 74/74 original academic units and all19 IDs/URLs/citations retained; 2newnotes and requested tree implemented; functional commit pending.
- T3 | S1,S5 | inline focused tests/browser/build and bounded baseline audit; long original-app suite may be delegated per action | complete; 8/8 Wiki tests, 195canonical +4compatibility pages, 172answers, 41,588validatedlinks; both browser prefixes/mobile/no-JS PASS; baseline audit retains197oldroutes and173outsideHTML bodies/179outside source files; original25tests and data validation PASS; DOM unavailable(jsdom), Windows screenshot adaptation only in scratch; functional commit pending.
- T4 | S1,S5 | inline documentation/readback and explicit-path local Spanish commit | pending; native assessment according to user-owned review mode; no push/PR. Prior S12 native review ended at context budget before execution; never resume that terminated candidate.

## Log

### L1 — Original authorized request (verbatim)

# Reorganización de la Wiki Académica — Fundamentos de Ciberseguridad

Quiero continuar mejorando la organización jerárquica de la Wiki Académica.

Ya completamos la reorganización de Criptografía, Codificación y Esteganografía. **No quiero modificar esas secciones nuevamente.**

En esta etapa trabajaremos exclusivamente sobre **Fundamentos de Ciberseguridad**, aplicando los mismos criterios de granularidad, organización académica y conservación de contenido.

## 1. Objetivo

Reorganizar las páginas existentes de Fundamentos de Ciberseguridad para obtener una jerarquía conceptualmente correcta, clara y consistente.

El objetivo NO es reconstruir las páginas desde cero, sino:

- Corregir relaciones jerárquicas.
- Separar conceptos independientes que actualmente comparten una página.
- Integrar explicaciones redundantes cuando corresponda.
- Conservar todas las definiciones, ejemplos, preguntas y referencias relevantes.
- Mantener la máxima granularidad útil sin fragmentar características o propiedades.

## 2. Árbol jerárquico objetivo

Quiero que Fundamentos de Ciberseguridad tenga la siguiente organización:

```text
Fundamentos de ciberseguridad
│
├── Seguridad de la información
│   └── Tríada CIA
│
├── Ciberseguridad
│
├── Amenaza
│
├── Vulnerabilidad
│
├── Riesgo
│
├── Atacantes y motivaciones
│
├── Tipos de ataques
│   │
│   ├── Ingeniería social
│   │   └── Phishing
│   │
│   ├── Man in the Middle (MitM)
│   │
│   ├── Ataques a aplicaciones
│   │   ├── SQL Injection
│   │   ├── Ejecución remota de código (RCE)
│   │   └── Server-Side Request Forgery (SSRF)
│   │
│   └── Denegación de servicio (DoS y DDoS)
│
├── Filtraciones de información (Leaks)
│
├── Defensa en profundidad
│
└── Riesgos de IA y modelos de lenguaje
    └── Prompt Injection
```

Esta estructura debe utilizarse como referencia principal para reorganizar las páginas.

Todas las categorías y técnicas representadas como nodos deben tener una página propia, siempre que exista contenido académico suficiente para desarrollarla.

## 3. Seguridad de la información y Tríada CIA

Actualmente, Seguridad de la información y Tríada CIA son páginas del mismo nivel.

Quiero que Tríada CIA pase a ser una página hija de Seguridad de la información.

La página **Seguridad de la información** debe explicar:

- Definición de seguridad de la información.
- Objetivos generales.
- Importancia de proteger la información.
- Introducción a los atributos de seguridad.
- Enlace a Tríada CIA.

La página **Tríada CIA** debe explicar:

- Confidencialidad.
- Integridad.
- Disponibilidad.
- Relación entre estos tres atributos.
- Ejemplos y preguntas de repaso.

**No crear subpáginas individuales para confidencialidad, integridad y disponibilidad.**

Son atributos que deben explicarse dentro de Tríada CIA.

## 4. Página Ciberseguridad

Crear o adaptar una página independiente llamada **Ciberseguridad** dentro de Fundamentos.

Debe explicar el concepto general de ciberseguridad y distinguirlo de Seguridad de la información, utilizando las definiciones proporcionadas por la cátedra.

Tomar como referencia las definiciones de ISO/IEC 27032 y NIST presentes en el material, respetando su contexto.

Los conceptos de autenticación y no repudio pueden explicarse como atributos relacionados, sin crear nuevas subpáginas automáticamente.

Evitar duplicar extensamente las explicaciones de Seguridad de la información.

## 5. Amenaza, Vulnerabilidad y Riesgo

Actualmente existen:

- Amenaza.
- Vulnerabilidad.
- Amenaza, vulnerabilidad y riesgo.

Quiero reorganizarlas como tres páginas independientes:

- Amenaza.
- Vulnerabilidad.
- Riesgo.

La página **Riesgo** debe explicar el concepto de riesgo y su relación con amenaza, vulnerabilidad e impacto.

La página actual *Amenaza, vulnerabilidad y riesgo* debe utilizarse como fuente para distribuir las explicaciones entre las tres páginas correspondientes.

No perder:

- Definiciones.
- Fórmulas conceptuales de la teoría.
- Ejemplos.
- Preguntas de repaso.
- Referencias bibliográficas.

Evitar repetir innecesariamente las mismas explicaciones en las tres páginas.

La URL de la página anterior debe conservarse mediante una redirección o mecanismo de compatibilidad, preferentemente hacia Riesgo, que explicará la relación conjunta entre los conceptos.

## 6. Atacantes y motivaciones

Mantener una única página para Atacantes y motivaciones.

Dentro deben explicarse los tipos de atacantes presentados en la teoría:

- Script kiddies.
- Cibercriminales.
- Hacktivistas.
- Actores estatales.
- Insiders.

Explicar sus motivaciones, diferencias y ejemplos cuando estén disponibles.

**No crear una subpágina individual para cada tipo de atacante.**

La presentación de la cátedra los desarrolla como parte de una clasificación introductoria y comparativa. Para este caso, considero más útil mantenerlos dentro de una única página.

## 7. Reorganización de Tipos de ataques

Actualmente existe una categoría llamada Conceptos de ataques comunes.

Quiero reorganizarla bajo el nombre **Tipos de ataques**, conservando su función como categoría general.

La página debe introducir las principales clases de ataques y permitir navegar a sus páginas correspondientes.

### 7.1 Ingeniería social y Phishing

Actualmente existe una página que combina ambos conceptos.

Quiero separarlos en:

```text
Ingeniería social
└── Phishing
```

La página Ingeniería social debe explicar el concepto general de manipulación de personas para obtener información o provocar determinadas acciones.

La página Phishing debe explicar esta técnica particular, su funcionamiento y ejemplos.

Distribuir correctamente el contenido existente entre ambas páginas.

Conservar preguntas, ejemplos y fuentes.

Evitar contenido duplicado.

### 7.2 Man in the Middle (MitM)

Mantener una página independiente para MitM dentro de Tipos de ataques.

Explicar su funcionamiento general, objetivos y ejemplos.

No crear subcategorías artificiales.

### 7.3 Ataques a aplicaciones

Mantener una categoría intermedia dedicada a ataques y problemas de seguridad de aplicaciones.

Debe contener:

```text
Ataques a aplicaciones
├── SQL Injection
├── Ejecución remota de código (RCE)
└── Server-Side Request Forgery (SSRF)
```

Cada concepto debe tener su página independiente.

Es importante mantener precisión conceptual:

- SQL Injection es una técnica de inyección.
- RCE describe la capacidad de ejecutar código remotamente y puede ser consecuencia de diferentes vulnerabilidades o técnicas.
- SSRF implica que un servidor realiza solicitudes inducidas por un atacante.

No presentarlos como mecanismos idénticos.

### 7.4 Denegación de servicio

Mantener una única página:

**Denegación de servicio (DoS y DDoS)**

Debe explicar ambos conceptos, sus diferencias y ejemplos.

No separar automáticamente DoS y DDoS en páginas distintas, dado que la explicación comparativa es más útil para el nivel introductorio de la materia.

## 8. Filtraciones de información

Mantener una página independiente:

**Filtraciones de información (Leaks)**

Dentro deben explicarse:

- Concepto de filtración de información.
- Consecuencias de la exposición de datos.
- Ejemplos.
- Formas de comprobar si determinados datos aparecen en filtraciones conocidas.
- Referencia a Have I Been Pwned, tal como aparece en la teoría.

No crear subpáginas para los ejemplos o herramientas mencionadas brevemente.

## 9. Defensa en profundidad

Mantener una única página.

Debe explicar el principio de utilizar múltiples capas de protección.

Incluir las capas presentadas en la teoría, entre ellas:

- Perímetro.
- Red interna.
- Hosts.
- Aplicaciones.
- Datos.
- Comunicaciones.
- Usuarios.

**No crear una página individual para cada capa.**

Estos elementos son componentes de la estrategia de defensa en profundidad y deben explicarse dentro de la misma página.

## 10. Riesgos de IA y modelos de lenguaje

Mantener:

```text
Riesgos de IA y modelos de lenguaje
└── Prompt Injection
```

La página principal debe explicar los riesgos de seguridad asociados al uso de LLM, incluyendo los tratados por la cátedra:

- Exposición de información confidencial.
- Phishing potenciado mediante IA.
- Deepfakes y desinformación.
- Riesgos asociados a instrucciones maliciosas.

La página Prompt Injection debe explicar específicamente la técnica, su funcionamiento y el ejemplo presentado en clase.

No crear subpáginas para cada riesgo mencionado superficialmente.

Tampoco confundir Prompt Injection con otros conceptos, como el jailbreak de modelos, aunque puedan relacionarse.

## 11. Fuentes académicas

Utilizar principalmente el documento:

`docs/catedra cosas/01c - Conceptos Básicos.pdf`

Tomar como referencia:

- Páginas 2–4: Seguridad de la información, Tríada CIA y Ciberseguridad.
- Páginas 5–7: Amenazas, atacantes, vulnerabilidades y riesgo.
- Páginas 8–10: Tipos de ataques y casos de seguridad.
- Páginas 11–14: Filtraciones de información.
- Páginas 15–17: Riesgos de IA y Prompt Injection.
- Página 18: Defensa en profundidad.

La presentación oficial tiene prioridad sobre el material complementario.

No inventar explicaciones ni ampliar innecesariamente los conceptos.

Si las notas existentes contienen información adicional que no aparece en la presentación, conservarla cuando sea correcta e identificarla como ampliación cuando corresponda.

## 12. Conservación de contenido

**No quiero perder contenido académico durante esta reorganización.**

Antes de fusionar o dividir páginas:

1. Identificá el contenido original.
2. Determiná a qué página corresponde cada explicación.
3. Conservá definiciones, ejemplos, preguntas y referencias.
4. Evitá duplicaciones innecesarias.
5. Conservá identificadores estables cuando sea posible.
6. Actualizá las referencias internas.
7. Implementá redirecciones para las URLs antiguas que dejen de representar páginas independientes.

Si una página existente debe convertirse en otra o dividirse, verificá que su contenido quede correctamente distribuido.

No elimines archivos de contenido sin haber comprobado que su información relevante fue preservada.

## 13. Restricciones de implementación

Esta etapa debe afectar únicamente Fundamentos de Ciberseguridad.

No modificar las siguientes secciones:

- Codificación.
- Criptografía.
- Esteganografía.
- CSIRT y gestión de incidentes.
- Malware y análisis.
- Prácticas y resolución razonada.

Se permiten únicamente actualizaciones indispensables de enlaces cruzados que apunten a páginas reorganizadas.

No modificar:

- La arquitectura general de la aplicación.
- Los estilos y componentes visuales existentes, salvo ajustes estrictamente necesarios.
- Los cuestionarios originales del sitio.
- Los documentos académicos originales.
- El sistema de navegación global fuera de lo necesario para reflejar la nueva jerarquía.

Trabajar sobre la rama de desarrollo actual.

No realizar push ni abrir Pull Requests.

## 14. Actualización y generación

Después de reorganizar el contenido:

1. Actualizá el catálogo o manifiesto de páginas.
2. Corregí las relaciones padre-hijo.
3. Regenerá los archivos HTML.
4. Actualizá la barra lateral.
5. Actualizá breadcrumbs.
6. Actualizá el índice de búsqueda.
7. Actualizá enlaces internos y relaciones entre páginas.
8. Preservá las URLs antiguas mediante los mecanismos de compatibilidad existentes.
9. Verificá la compatibilidad con GitHub Pages y la ruta `/repaso-ciber/`.

Utilizá las herramientas y el generador que ya existen en el proyecto.

No introducir dependencias innecesarias.

## 15. Validación

Al finalizar:

- Ejecutá las pruebas disponibles.
- Confirmá que todas las páginas reorganizadas sean accesibles.
- Verificá que no existan enlaces rotos.
- Comprobá que no aparezcan páginas huérfanas.
- Confirmá que las antiguas URLs siguen funcionando.
- Verificá que no haya pérdida de contenido.
- Comprobá que la jerarquía coincida con el árbol solicitado.
- Confirmá que ninguna sección ajena a Fundamentos haya sido modificada funcionalmente.
- Verificá que los HTML generados estén actualizados.

## 16. Resultado esperado

Cuando termines, quiero que me proporciones:

1. **Árbol jerárquico final de Fundamentos de Ciberseguridad.**
2. Lista de páginas reubicadas.
3. Lista de páginas divididas, fusionadas o renombradas.
4. Nuevas páginas creadas.
5. Explicación de cómo se conservó el contenido original.
6. Archivos modificados.
7. Pruebas ejecutadas y resultados.
8. Posibles problemas pendientes.

No avances hacia CSIRT, Malware ni otras secciones.

**Quiero revisar y aprobar esta reorganización antes de continuar con el siguiente bloque académico.**
### L2 — Evidence and implementation boundary

The original19 Fundamentos pages have been read. The existing generator supports parent-independent `permalink`: use it for CIA and Phishing, retain risk ID/slug/URL while renaming its title. Add only Ciberseguridad and Ingeniería social. Expected21 Fundamentos pages /195 global canonical pages +4 existing hash compatibility outputs. Other academic Markdown and the shared generator stay unchanged. Course formula is conceptual; precise application-attack and jailbreak distinctions are explanatory clarifications beyond brief slide labels. No meaningful academic prose RED; deterministic public build/hierarchy/preservation assertions will be observed RED before source changes.

Risk: none — passive academic content and metadata, using unchanged existing routing/rendering code. One PR is the user's explicit delivery strategy even if authored lines exceed the planning heuristic.

### L3 — Verification evidence

The new hierarchy/preservation assertion failed against the original tree before implementation (CIA still a root child, Ciberseguridad absent), then passed. All8 generator/content tests passed. The historical fixture preserves74 units across19 original Fundamentos notes; all original citation pages and route IDs remain. New total:21 Fundamentos pages,195 canonical pages globally,4 unchanged compatibility redirects,199 published HTML pages. Build checks41,588 local links; `--check` reports current output. Browser smoke passed at `/` and `/repaso-ciber/` including CIA/Phishing new ancestry at old URLs, social-engineering child navigation, new cybersecurity content, legacy-title search, desktop/mobile/no-JavaScript.

Baseline2e042b1 audit: all197 old HTML URLs still exist,179 outside academic source files unchanged,173 outside academic HTML bodies unchanged. The shared sidebar/count and renamed related-link labels are the only outside rendered differences. Original app/PDFs/generator/styles/dependencies unchanged. Bounded original-app runner:25/25 npm tests and data validator PASS; DOM blocked by absentjsdom, original browser requires only a scratch Windows fileURLToPath screenshot fix and then PASS. Parent spot-check of data validator PASS. These two environment limitations predate this change; no original test or dependency modified.

Native assessment on the pre-stage worktree could not classify untracked new files without explicit inventory. No native review was started; include only known authorized new files in the local feature commit, then assess that exact committed range. Previous S12 review remains terminal at its context budget; its consent does not apply to this candidate.
