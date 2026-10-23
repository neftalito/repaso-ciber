# Source-led Academic Wiki taxonomy

The source map below was checked against physical, one-based PDF pages. Official lecture and practice explanations take priority over companion compilations. The Wiki represents independent concepts as pages, and properties, steps and review answers as sections. Every category is itself a page. Do not duplicate a concept across groups: use `wiki:ID` links instead.

## Shared identifiers and authoring contract

Root: `wiki`. Top groups: `fundamentals`, `cryptography`, `csirt`, `malware`, `practices` (orders 10, 20, 30, 40, 50). IDs in each group use its prefix (`fundamentals-`, `crypto-`, `csirt-`, `malware-`, `practices-`). Stable cross-group targets: `fundamentals-cia`, `fundamentals-risk`, `crypto-encoding`, `crypto-encryption`, `crypto-hash`, `crypto-signature`, `crypto-pki`, `crypto-steganography`, `csirt-incidents`, `csirt-email`, `csirt-dns`, `csirt-rdap`, `csirt-whois`, `csirt-tlp`, `malware-static`, `malware-dynamic`, `malware-ioc`, `practices-writeup`.

Each Markdown file starts with JSON between `---` lines. Required fields: `id`, `title`, `slug`, `parent` (ID), `type`, `order`, `related` (ID array), `sources` (array of `{ "id": "source-id", "pages": [1, 2] }`). Optional `aliases` is an array of search terms. Types: category, concept, technique, algorithm, protocol, tool, practice. The generator derives the output path from ancestor slugs; source files can be flat inside each group directory. The template supplies H1, children, related links, citations and breadcrumbs. Body headings start at H2. Do not manually repeat generated bibliography or subcategory lists.

Academic text is original, neutral professional Spanish, matching the existing site. Explain definition, mechanism, limits and a worked example when relevant; leaf pages include at least one meaningful review question. Category notes are shorter and orient the reader. Use `[label](wiki:note-id)` for internal links, with optional `#heading-anchor` (lowercase, accents removed). Review syntax:

```text
:::question ¿Pregunta concreta?
Respuesta en Markdown, con una explicación del porqué.
:::
```

Raw HTML is escaped. Sources are registered in `content/wiki/sources.json`. Local course PDF titles may be cited but never published as files or broken download links. Do not add external academic claims unless explicitly marked and justified as an extension; source-internal exercises may be explained without external research.

## Fundamentals

`lecture-fundamentals`: information security and CIA (2–4), threats/common attacks (5,8), attacker motivations (6), vulnerability/threat/risk (7), defense in depth (18), AI/LLM risks (15–17). Incident deck repeats CIA/context (2–4): cross-link rather than duplicate. CIA remains one page with its attributes as sections. Create source-supported independent concepts, not one page for each adjective.

## Cryptography

`lecture-crypto-1`: encoding/ASCII (7–8), classical ROT, Scytale, columnar transposition, Enigma (12), Caesar/ROT3 (13), hash properties (17), MD5/SHA1/SHA2/SHA3 (18), collisions/uses (19–20), symmetric model (21–25), DES/AES (25), ECB/CBC (26–28), stream ciphers (29). `practice-1a`: numeric representations, Unicode and Base64 (1–5), encoding versus encryption (8), classical/transposition (8–9), XOR (10). `manual` p.8 explains Enigma beyond its mention in slides. Rail fence and grid transposition are in `practice-guide` p.4 and `practice-solutions` p.4.

`lecture-crypto-2`: asymmetric key pairs/sign/encrypt (3–9), DH/RSA/ElGamal (10), digital signatures (11–13), certificates/validation (14–17), PKI/TLS and centralized versus PGP trust (18–25), steganography/image+audio LSB/network channels (26–30). `practice-1b`: RSA calculations, DH, signatures, PGP/GPG (1–4,7–8), image LSB (6).

Keep hash pages outside encryption. DH is key agreement, not an encryption algorithm. Classical substitution/transposition and modern symmetric/asymmetric are separate classification levels; block modes are below block encryption. ECB, CBC, CFB and OFB are explicitly listed on crypto1 physical p.25 (corrected after full-page readback); each needs a separate page. Use companion sources for mechanism detail where needed. SHA3 variant names in crypto1 p.18 are internally inconsistent: do not silently reproduce the apparent typo as fact. Descriptions of historical/weak algorithms are educational, not recommendations to use them in production.

## CSIRT

`lecture-resources`: Internet IP/domain resources, RIR allocation (2–5), WHOIS/RDAP/lookup commands including icann-rdap (6–13), DNS hierarchy and registry/registrar/registrant roles (14–18), investigative use (19–20).

`lecture-email`: SMTP/mail flow/DNS (2–3), envelope/header/body (4–6), header analysis/traces (7–8,15), spoofing/envelope versus From (10–14), MXToolbox and Google Admin Toolbox (16).

`lecture-incidents`: incidents and CERT/CSIRT (6–7), response/intake/relevance (8–10), prioritization (13–17), notification (18), services (20–22), sensitive information/TLP (23–24), PGP use (26). Reuse the crypto-signature/PGP concepts and CIA instead of duplicating explanations. Do not impose an unrelated external incident-response standard onto the course sequence. Public lookup examples must be illustrative; no remote queries are authorized.

## Malware

`lecture-malware`: classes/goals/IOCs (1–4), static/dynamic distinction (5–6), antivirus/VirusTotal, hashes, strings, PE/imports/exports/packers (7–29), dynamic analysis/safe VM/snapshots/methodology (35–40), registry persistence (41–45), Procmon/filtering (48,52–55), Wireshark/Tcpdump/FakeNet/FakeDNS/process inspection (56–57).

`practice-2`: static/dynamic/IOC types (1–6), PE/ELF, CFF Explorer, PEStudio, Resource Hacker, strings (9–17), VM/snapshots, Regshot, Procmon, Process Explorer, Hybrid Analysis/Any.run, FakeNet (18–25). Give independent techniques and supported tools their own pages; malware classes can have concise source-grounded pages, but a named example/family without explanatory coverage does not require an invented detailed treatment. Hash functions themselves live under crypto-hash; malware pages explain their investigative use and link there. Do not include executable malware or download samples.

## Practices

`lecture-writeup` (1–4): report context, analysis, tools, reflection and flag. Omit administrative/grading details. Use practice-1a/1b, practice-2, practice-questions and practice-solutions for distinct worked workflows that cross-link to canonical concepts rather than duplicate their theory. Calculations must be checked; examples of malicious files should be fictitious/benign and never executed.
