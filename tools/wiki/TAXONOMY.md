# Source-led Academic Wiki taxonomy

The source map below was checked against physical, one-based PDF pages. Official lecture and practice explanations take priority over companion compilations. The Wiki represents independent concepts as pages, and properties, steps and review answers as sections. Every category is itself a page. Do not duplicate a concept across groups: use `wiki:ID` links instead.

## Shared identifiers and authoring contract

Root: `wiki`. Top groups: `fundamentals`, `crypto-encoding`, `cryptography`, `crypto-steganography`, `csirt`, `malware`, `practices` (orders 10, 15, 20, 25, 30, 40, 50). Encoding and steganography retain their legacy IDs, source locations and published URLs while becoming independent categories. IDs in the original groups use their existing prefixes (`fundamentals-`, `crypto-`, `csirt-`, `malware-`, `practices-`). Stable cross-group targets: `fundamentals-cia`, `fundamentals-risk`, `crypto-encoding`, `crypto-encryption`, `crypto-hash`, `crypto-signature`, `crypto-pki`, `crypto-steganography`, `csirt-incidents`, `csirt-email`, `csirt-dns`, `csirt-rdap`, `csirt-whois`, `csirt-tlp`, `malware-static`, `malware-dynamic`, `malware-ioc`, `practices-writeup`.

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

The revised Fundamentos tree has 21 pages. CIA is below information security; cybersecurity is a separate root child using the course's ISO/IEC 27032 and NIST formulations from physical p.4. Threat, vulnerability and risk remain separate; the former joint note keeps its ID and `/fundamentals/risk/` URL with the title Riesgo. The conceptual risk product has no numeric scales in the source. Attacker profiles stay together.

Tipos de ataques contains social engineering → phishing, MitM, application attacks → SQL Injection/RCE/SSRF, and the joint DoS/DDoS note. CIA and phishing use explicit permalinks to preserve their previous published routes while changing ancestry. Only social engineering and cybersecurity are new pages. Application mechanism distinctions are labeled clarifications beyond the short labels of p.8. All 74 original non-heading academic units, including examples and review answers, and all source-page references are checked by `fundamentals-preservation.json`; the cybersecurity paragraph moves intact and the phishing introduction is distributed sentence by sentence.

Leaks stays one note, including the Yahoo/Sony image examples (p.12), Have I Been Pwned (p.13), and the unverified claims in the illustrative extortion message (p.14). Defense keeps all seven layers together (p.18). AI risks include deepfakes/disinformation (p.16); Prompt Injection retains the complete customer-support/database example (p.17). The source's combined “Prompt Injection / jail break” heading does not define the terms separately; their distinction is explicitly an editorial clarification. Do not reconstruct the cut-off meeting-invitation sentence on p.16 or present a malicious request as proof of successful execution.

## Cryptography

`lecture-crypto-1`: encoding/ASCII (7–8), classical ROT, Scytale, columnar transposition, Enigma (12), Caesar/ROT3 (13), hash properties (17), MD5/SHA1/SHA2/SHA3 (18), collisions/uses (19–20), symmetric model (21–25), DES/AES (25), ECB/CBC (26–28), stream ciphers (29). `practice-1a`: numeric representations, Unicode and Base64 (1–5), encoding versus encryption (8), classical/transposition (8–9), XOR (10). `manual` p.8 explains Enigma beyond its mention in slides. Rail fence and grid transposition are in `practice-guide` p.4 and `practice-solutions` p.4.

`lecture-crypto-2`: asymmetric key pairs/sign/encrypt (3–9), DH/RSA/ElGamal (10), digital signatures (11–13), certificates/validation (14–17), PKI/TLS and centralized versus PGP trust (18–25), steganography/image+audio LSB/network channels (26–30). `practice-1b`: RSA calculations, DH, signatures, PGP/GPG (1–4,7–8), image LSB (6).

Keep hash pages outside encryption. DH is key agreement, not an encryption algorithm. Classical substitution/transposition and modern symmetric/asymmetric are separate classification levels; block modes are below block encryption. ECB, CBC, CFB and OFB are explicitly listed on crypto1 physical p.25 (corrected after full-page readback); each needs a separate page. Use companion sources for mechanism detail where needed. SHA3 variant names in crypto1 p.18 are internally inconsistent: do not silently reproduce the apparent typo as fact. Descriptions of historical/weak algorithms are educational, not recommendations to use them in production.

### Revised cryptography navigation

Classical and modern cryptography are direct children of cryptography, alongside the general encryption note. Modern cryptography contains symmetric/asymmetric encryption, key agreement, hashes, signatures, certificates, PKI, hybrid encryption and PGP. Block encryption separates algorithm pages (DES, 3DES, AES, RC5, IDEA, Blowfish) from mode pages (ECB, CBC, CFB, OFB). Encoding and steganography are independent root categories. XOR remains a cross-cutting operation at the cryptography root rather than being classified as an encryption algorithm; stream and block-mode notes already link to it.

The intermediate algorithm/mode categories contain their own explanations and generated child links. An optional validated `permalink` freezes a published output path; the parent relationship drives sidebar navigation and breadcrumbs. Encoding/steganography bodies remain intact. The four property/application notes below are consolidated without loss into the hash overview, with static compatibility output at their old URLs. Generated HTML in other areas reflects only the shared topic tree, page count and any necessary link resolution; their Markdown and academic explanations remain untouched.

The finer block classification is the requested organization: lecture1 p.25 explicitly identifies DES/AES as block examples, while p.30 only enumerates 3DES/RC5/IDEA/Blowfish as symmetric examples. Do not infer mechanism details from that list. The new algorithm category makes this source boundary explicit.

Atbash, Vigenère, reversal, grid and rail fence retain their separate pages but rely on companion guides rather than the lecture's named classical examples. Their provenance must stay visible; these are extensions to the lecture coverage. Only MD5, SHA-1, SHA-2 and SHA-3 remain children of hashes. TLS stays below PKI as an application of certificate validation.

The user-authorized consolidation maps `crypto-collisions` to the hash section `colisiones-y-resistencia-a-preimagenes`, `crypto-password-hashes` to `hashes-en-la-proteccion-de-contrasenas`, `crypto-dictionary` to `comprobacion-por-diccionario`, and `crypto-salt` to `sal-en-el-calculo-de-contrasenas`. Existing IDs resolve to those sections; compatibility notes are excluded from the hierarchy/search. All 21 original academic blocks, questions and bibliographic page references are preserved and checked by a regression fixture.

Binary/decimal/hexadecimal remain together; practice1A pp.2–3 lists UTF-8/16/32 without enough separate mechanism detail. Lecture1 p.18 and the companion sources likewise support SHA family pages rather than independent variant notes. Do not manufacture pages from a list of names. A1Z26 remains a public alphabet-index representation, not secure encryption. Hash-password cost/salt discussion is identified as companion expansion. The Cifrado concept note introduces confidentiality, algorithm/key roles, reversibility and navigation, with examples/questions; it does not classify hashes, signatures or key agreement as encryption.

Potential later classification review: XOR is an operation and TLS is a protocol using several services; neither is treated as an encryption algorithm. Steganography keeps the course's type/technique/tool organization and existing explanations. No artificial mathematics category or additional variant pages were introduced.

## CSIRT

`lecture-resources`: Internet IP/domain resources, RIR allocation (2–5), WHOIS/RDAP/lookup commands including icann-rdap (6–13), DNS hierarchy and registry/registrar/registrant roles (14–18), investigative use (19–20).

`lecture-email`: SMTP/mail flow/DNS (2–3), envelope/header/body (4–6), header analysis/traces (7–8,15), spoofing/envelope versus From (10–14), MXToolbox and Google Admin Toolbox (16).

`lecture-incidents`: incidents and CERT/CSIRT (6–7), response/intake/relevance (8–10), prioritization (13–17), notification (18), services (20–22), sensitive information/TLP (23–24), PGP use (26). Reuse the crypto-signature/PGP concepts and CIA instead of duplicating explanations. Do not impose an unrelated external incident-response standard onto the course sequence. Public lookup examples must be illustrative; no remote queries are authorized.

### Revised CSIRT navigation and consolidation

CSIRT now has 23 canonical pages. Teams contain the three service groups; Internet resources separate IP allocation/RIRs, registration lookup with WHOIS/RDAP, and DNS/domain registration. The new lookup category explains queries for both IPs and domains, explicitly supported by resources physical pp.17–18. The existing domain-registration note contains Registry, Registrar and Registrant as sections; the RDAP note contains the auxiliary icann-rdap client demonstration. Individual permalinks preserve every reparented note and service descendant's previous route.

Mail keeps SMTP, header analysis and spoofing as independent topics. Envelope/headers/body are integrated into SMTP; MXToolbox and Google Messageheader are practical subsections of header analysis. The seven merged role/tool/component notes retain their IDs and original source references as compatibility stubs; redirects point to the matching canonical section. All 185 original academic blocks from 28 notes, their citations and all prior URLs are pinned in `csirt-preservation.json`, with focused and complete hierarchy tests. Other academic groups are unchanged.

Notification qualifies as an independent child of incident handling: incidents p.18 develops purpose, selecting a contact, evidence, timestamps and timezone, while p.19 contains an image-based email notification with SSH log evidence. Pages 23/26 contextualize sensitive exchange. The new note links to the existing fictional handling example and shared PGP/TLP notes instead of copying their complete explanations. It does not add an external response lifecycle or mandate one communication channel. TLP labels remain together within the course context. This source-supported classification is intentional; a brief name-only mention would have stayed an internal section.

## Malware

`lecture-malware`: classes/goals/IOCs (1–4), static/dynamic distinction (5–6), antivirus/VirusTotal, hashes, strings, PE/imports/exports/packers (7–29), dynamic analysis/safe VM/snapshots/methodology (35–40), registry persistence (41–45), Procmon/filtering (48,52–55), Wireshark/Tcpdump/FakeNet/FakeDNS/process inspection (56–57).

`practice-2`: static/dynamic/IOC types (1–6), PE/ELF, CFF Explorer, PEStudio, Resource Hacker, strings (9–17), VM/snapshots, Regshot, Procmon, Process Explorer, Hybrid Analysis/Any.run, FakeNet (18–25). Give independent techniques and mechanisms their own pages; integrate auxiliary tools into the corresponding method as detailed below. Malware classes can have concise source-grounded pages, but a named example/family without explanatory coverage does not require an invented detailed treatment. Hash functions themselves live under crypto-hash; malware pages explain their investigative use and link there. Do not include executable malware or download samples.

### Revised Malware navigation and tool integration

The requested tree contains 35 canonical pages: twelve class notes remain independent, while the analysis overview introduces IOC, static and dynamic approaches. Propagation, deceptive presentation, remote-control capability, coordinated compromised devices and concealment are different classification criteria that can overlap. The existing definitions are retained; botnet describes a controlled set of devices rather than a file format. The overview keeps its former objectives and adds source-bounded comparison and IOC context.

Static analysis contains identification, strings, executables with PE/ELF, packing and obfuscation. Identification integrates antivirus, VirusTotal and sample hashes. PE integrates imports, exports, embedded resources, CFF Explorer, PEStudio and Resource Hacker. Practice pp.9–10 introduces ELF and general headers/sections; existing interpretation and examples are explicitly labeled as study expansion. Packing and obfuscation remain distinct.

Dynamic analysis separates safe environment, system monitoring, persistence and network communications. Safe environment integrates snapshots, online sandboxes, Hybrid Analysis and Any.run, preserving containment and third-party confidentiality cautions. System monitoring contains Windows Registry and process/file monitoring; Regshot compares states, Autoruns enumerates autostarts, Procmon traces events, and Explorer/Hacker inspect running processes. Their grouping follows the investigation workflow rather than claiming functional equivalence. Persistence keeps Run Keys and Windows Services separate. Primary p.56 explicitly distinguishes traffic observation (Wireshark/tcpdump) from service/DNS simulation (FakeNet/FakeDNS).

Three notes are new: identification, system monitoring and process/file monitoring. Twenty-three former component/tool notes retain their IDs, titles, sources, old-route permalinks and direct section redirects. The historical fixture `malware-preservation.json` checks all 201 original non-heading blocks from 55 notes, including commands, examples and questions, plus citation unions and old URLs. Browser checks exercise all 23 redirects with/without JavaScript at both hosting prefixes and narrow layouts of the enlarged canonical articles. These changes do not execute samples, contact third parties or alter the production generator.

## Practices

`lecture-writeup` (1–4): report context, analysis, tools, reflection and flag. Omit administrative/grading details. Use practice-1a/1b, practice-2, practice-questions and practice-solutions for distinct worked workflows that cross-link to canonical concepts rather than duplicate their theory. Calculations must be checked; examples of malicious files should be fictitious/benign and never executed.
