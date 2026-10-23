# Add an Academic Wiki alongside the existing study application

The application offers practice questions and a glossary, but no hierarchy of independently addressable academic explanations. This contribution adds a read-only Wiki with Markdown sources, generated static HTML, a collapsible topic tree, breadcrumbs, related concepts, local search and review answers.

## Scope

- Native HTML, CSS and JavaScript; no application framework, authentication or database.
- Source-led notes covering fundamentals, cryptography, CSIRT, malware and practice workflows, with physical PDF page citations.
- An isolated Node authoring tool under `tools/wiki/`, with its own pinned Markdown dependency and lockfile.
- Versioned `wiki/` output, deterministic freshness checks and a validation-only GitHub Actions workflow.
- Exactly one existing navigation line changed in each of `index.html` and `glosario.html`. Original academic data, scripts, CSS and PDFs are preserved.
- Local lecture PDFs are working sources only and are excluded from the contribution. Existing public PDF links remain available.

## Review order

1. Review the source taxonomy in `tools/wiki/TAXONOMY.md` and notes under `content/wiki/`.
2. Review the generator, template, isolated styles/search module and tests under `tools/wiki/`.
3. Review the two existing HTML navigation additions and the separate Wiki validation workflow.
4. Rebuild and check generated output. `.gitattributes` marks `wiki/` as generated so source review stays manageable.

## Local review

From the repository root:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Visit `http://localhost:8080/`, `/glosario.html` and `/wiki/`. Check existing practice/study/glossary behavior and PDF links, then Wiki search, expandable navigation, breadcrumbs, questions, direct note links and mobile layout.

For the project prefix, run `python -m http.server 8081 --bind 127.0.0.1 --directory ..` and visit `http://localhost:8081/repaso-ciber/`.

## Validation

Observed local validation covers 195 pages, 167 review answers and 41,578 local links. Generator tests pass (3/3), and additional isolated rejection/freshness probes pass (14/14). Wiki browser checks pass at the domain root and project prefix, including search, mobile layout, direct reload and reading without JavaScript.

Canonical LF baseline and candidate copies both pass the original content/progress tests (25/25). The original browser suite passes on both with the same screenshot-path-only Windows adaptation in temporary harnesses. The original extraction check differs only in recorded versus installed pypdf versions (6.20.1 versus 6.19.0). No original test or data was edited for these checks.

Pending before publication: clean dependency installation and lockfile verification, the original DOM suite (jsdom is unavailable locally), final contribution commits and candidate review. The current offline lockfile pins Marked's version but has no registry integrity metadata yet.

Recheck the final branch with:

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

Original byte-hash audits require LF versions of the four audited JSON files; Windows CRLF conversions can cause a pre-existing failure without content changes. Use a clean LF checkout for that audit, not regenerated academic data. Original DOM/browser tests require their declared development dependencies; see the authoring README for local browser overrides.

Screenshots are generated locally under ignored `test-results/wiki/` and can be attached to the eventual PR. This document does not publish the branch or open a PR.
