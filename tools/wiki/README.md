# Academic Wiki authoring and local review

The Wiki is an isolated static module. Markdown notes and their JSON metadata are the editable source; `wiki/` is versioned generated output served by the existing branch-root GitHub Pages deployment. The original application keeps its tooling and data.

## Read the complete application locally

From the repository root, run:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Open `http://localhost:8080/` for practice, `/glosario.html` for the glossary, and `/wiki/` for the Wiki. Only Python is needed to read the checked-in site. Keep the terminal running; Ctrl+C stops it. The existing `npm start` uses `python3`, which may need a working Python alias on Windows.

To check the GitHub Pages project prefix from the repository root, run a second server:

```sh
python -m http.server 8081 --bind 127.0.0.1 --directory ..
```

Open `http://localhost:8081/repaso-ciber/` and `/repaso-ciber/wiki/`. Navigate to a deeply nested note, copy its URL into a new tab, and reload. Check the sidebar, breadcrumbs, related links, review answers and search (including accented/unaccented names). Check both wide and narrow viewports, then revisit the original practice, study mode, glossary and PDF links.

## Install authoring tools and generate HTML

Node 22 or newer is required for authoring. Reading generated HTML does not require Node. Once network/package installation is authorized in your environment:

```sh
npm --prefix tools/wiki ci --ignore-scripts
node tools/wiki/build.mjs
node tools/wiki/build.mjs --check
```

`--check` validates the exact expected output without changing it. It reports missing, outdated and unexpected generated files. Commit both Markdown and generated output. The build validates all note IDs, parents, cycles, routes, related links, citations, local resources and anchors before writing anything. Files formerly listed in `generated-files.json` are removed if a note's route is removed; unknown files are never silently deleted.

Do not hand-edit generated HTML, search data or `wiki/assets/`. The template and original Wiki CSS/JavaScript are in `tools/wiki/page.html` and `tools/wiki/static/`. Relative links support both a domain root and the `/repaso-ciber/` prefix without SPA fallback rules.

## Add or update a note

Read `TAXONOMY.md` first. Create one Markdown file in the appropriate directory under `content/wiki/`. Its first block is JSON between `---` lines:

```text
---
{
  "id": "unique-concept-id",
  "title": "Título del concepto",
  "slug": "concept-slug",
  "parent": "existing-parent-id",
  "type": "concept",
  "order": 10,
  "aliases": ["sigla", "sinónimo"],
  "related": ["existing-related-id"],
  "sources": [{ "id": "lecture-crypto-1", "pages": [17, 18] }]
}
---
## Definición

Explicación original basada en las fuentes.

:::question ¿Pregunta de repaso?
Respuesta razonada; puede incluir Markdown.
:::
```

IDs are stable. Parent IDs and slugs generate the entire hierarchy; file placement does not duplicate that structure. Every category is a page. Distinct techniques, algorithms and protocols have their own notes, while properties, advantages, steps and examples remain sections. Body headings start at H2 because the template supplies H1. Internal links use `[title](wiki:unique-concept-id)` and may include `#heading-anchor`. Raw HTML is escaped; no MDX or per-note component is needed.

When reparenting a published note, preserve its existing URL with an optional `"permalink": "cryptography/existing/path"` field. Its value is relative to `wiki/`, uses lowercase slug segments, and has no leading/trailing slash or filename. Parents still determine breadcrumbs and the topic tree; this override changes only the output URL. Notes without it retain the original ancestor-slug routing. Use `wiki:ID` links so both new and existing parents resolve to the same single page.

For an authorized content consolidation, retain the old Markdown file as a compatibility note with its existing ID, title, sources and `permalink`, and add `"redirectTo": "canonical-note-id#section-anchor"`. Move all academic paragraphs, examples, review answers and citations into that canonical section first. The generator emits a static HTML redirect plus a visible fallback link at the former URL. Compatibility notes do not appear in the tree or search; incoming `wiki:ID` links and related IDs resolve directly to the canonical section. Redirect chains, missing sections and route collisions fail before output changes. Prior URL fragments lead to the merged note's designated section rather than reconstructing its former heading layout.

The hash consolidation regression fixture records hashes of 21 original academic blocks and their source-page coverage. It verifies preservation without duplicating those notes or reading Git history at test runtime. Do not regenerate that fixture merely to silence a missing-content failure.

The Fundamentos preservation fixture similarly records 74 original academic units across 19 notes, their source references and published URLs. Its hierarchy test checks the revised 21-page tree, including the two new concept pages. The cybersecurity paragraph and the general social-engineering sentences have explicit destination IDs; moving them does not discard the original text. These preservation fixtures are historical evidence, not generated output to refresh after an accidental deletion.

Source references use physical PDF pages counted from 1, not printed slide numbers. `sources.json` distinguishes official material from companion guides. The twelve PDFs in `docs/catedra cosas/` remain local working sources: never stage, move, edit or delete them. Their titles and page references are displayed without broken public links. The six PDFs already distributed by the original application retain their existing download paths.

## Verify changes

```sh
node --test tools/wiki/test/build.test.mjs
node tools/wiki/check-content.mjs
node tools/wiki/build.mjs --check
npm test
npm run test:dom
npm run test:browser
node tools/wiki/test/browser.mjs
python -X utf8 scripts/validate_data.py
```

Original DOM/browser tests require the root development dependencies and a Playwright browser. The Wiki browser test uses the existing Playwright dependency and writes screenshots only under ignored `test-results/wiki/`. `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_CHROMIUM_EXECUTABLE` can select an already installed local module and Chrome/Chromium executable; no browser download is needed when these are available. This same override is supported by the original browser test.

On Windows, `python -X utf8` avoids the system code-page default. The original acronym audit hashes four original JSON files byte-for-byte. A checkout with CRLF conversions can fail that original audit even with unchanged data; use a clean LF checkout for the original data validation rather than regenerating or changing academic data. The Wiki's scoped `.gitattributes` entries keep new source/output bytes stable without changing existing file conventions.

The additional `wiki.yml` workflow validates content and output and exercises the browser. It never deploys; the existing publishing mechanism remains responsible for hosting. No push or PR publication is part of these local commands.
