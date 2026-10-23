import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../build.mjs', import.meta.url));
const roots = [];
after(() => {
  for (const root of roots) {
    assert.equal(path.dirname(root), path.resolve(tmpdir()));
    assert.ok(path.basename(root).startsWith('academic-wiki-test-'));
    rmSync(root, { recursive: true, force: true });
  }
});

function put(root, file, text) {
  const target = path.join(root, file);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, text);
}
function note(metadata, text = '## Definición\n\nUna explicación original.\n') {
  return `---\n${JSON.stringify(metadata)}\n---\n${text}`;
}
const home = { id: 'wiki', title: 'Wiki Académica', slug: '', parent: null, type: 'category', order: 0, related: [], sources: [{ id: 'course', pages: [1] }] };
const child = { ...home, id: 'cia', title: 'Tríada CIA', slug: 'cia', parent: 'wiki', type: 'concept', order: 1, related: ['wiki'] };
function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), 'academic-wiki-test-'));
  roots.push(root);
  for (const file of ['index.html', 'glosario.html', 'assets/styles.css', 'assets/favicon.svg']) put(root, file, 'Existing application');
  put(root, 'content/wiki/sources.json', JSON.stringify([{ id: 'course', title: 'Material de cátedra', kind: 'official', pageCount: 3, url: null }]));
  put(root, 'content/wiki/index.md', note(home, '## Inicio\n\nConsultar [CIA](wiki:cia#definicion).\n'));
  put(root, 'content/wiki/fundamentals/cia.md', note(child, '## Definición\n\nConfidencialidad, integridad y disponibilidad.\n\n:::question ¿Qué se protege?\nLa información. <script>alert(1)</script>\n:::\n'));
  return root;
}
function run(root, ...args) {
  return spawnSync(process.execPath, [cli, '--root', root, ...args], { encoding: 'utf8' });
}
function snapshot(root, dir = 'wiki') {
  const entries = [];
  function walk(relative) {
    for (const item of readdirSync(path.join(root, relative), { withFileTypes: true })) {
      const file = path.join(relative, item.name);
      if (item.isDirectory()) walk(file);
      else entries.push([file, readFileSync(path.join(root, file), 'utf8')]);
    }
  }
  walk(dir);
  return JSON.stringify(entries.sort());
}

test('builds independent HTML routes, navigation, citations, review answers and a search index', () => {
  const root = fixture();
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  const html = readFileSync(path.join(root, 'wiki/cia/index.html'), 'utf8');
  assert.match(html, /aria-current="page"/);
  assert.match(html, /Breadcrumbs|Ruta de navegación/);
  assert.match(html, /<details class="wiki-review">/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>alert/);
  assert.match(html, /\.\.\/\.\.\/assets\/styles\.css/);
  assert.match(html, /Material de cátedra/);
  assert.match(readFileSync(path.join(root, 'wiki/index.html'), 'utf8'), /cia\/#definicion/);
  assert.equal(/^[ \t]+$/m.test(readFileSync(path.join(root, 'wiki/index.html'), 'utf8')), false, 'Empty template sections must not leave whitespace-only lines');
  const index = JSON.parse(readFileSync(path.join(root, 'wiki/search-index.json')));
  assert.ok(index.some(entry => entry.id === 'cia' && entry.text.includes('Confidencialidad')));
  assert.equal(run(root, '--check').status, 0);
});

test('links every cited PDF page and relevant glossary entry from Wiki sources', () => {
  const root = fixture();
  const source = { id: 'course', title: 'Cripto, parte 1', kind: 'official', pageCount: 3, url: 'docs/catedra cosas/02 - Cripto parte 1.pdf' };
  put(root, 'content/wiki/sources.json', JSON.stringify([source]));
  put(root, source.url, 'PDF fixture');
  put(root, 'data/glossary.json', JSON.stringify({ entries: [{ id: 'cia', term: 'Tríada CIA' }] }));
  put(root, 'content/wiki/glossary-links.json', JSON.stringify({ cia: ['cia'] }));
  put(root, 'content/wiki/fundamentals/cia.md', note({ ...child, sources: [{ id: 'course', pages: [1, 3] }] }));

  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  const html = readFileSync(path.join(root, 'wiki/cia/index.html'), 'utf8');
  assert.match(html, /docs\/catedra%20cosas\/02%20-%20Cripto%20parte%201\.pdf#page=1/);
  assert.match(html, /docs\/catedra%20cosas\/02%20-%20Cripto%20parte%201\.pdf#page=3/);
  assert.match(html, /glosario\.html#cia/);
  assert.match(html, /Explorar el glosario completo/);
  assert.match(readFileSync(path.join(root, 'wiki/index.html'), 'utf8'), /Explorar el glosario completo/);
  assert.equal(run(root, '--check').status, 0);
});

test('rejects unsafe PDF paths and nonexistent glossary targets before writing Wiki output', () => {
  const root = fixture();
  assert.equal(run(root).status, 0);
  const before = snapshot(root);
  const source = { id: 'course', title: 'Cripto, parte 1', kind: 'official', pageCount: 3, url: 'docs/catedra cosas/../outside.pdf' };
  put(root, 'content/wiki/sources.json', JSON.stringify([source]));
  put(root, 'docs/outside.pdf', 'PDF fixture');
  assert.notEqual(run(root).status, 0);
  assert.equal(snapshot(root), before);

  source.url = null;
  put(root, 'content/wiki/sources.json', JSON.stringify([source]));
  put(root, 'data/glossary.json', JSON.stringify({ entries: [{ id: 'cia', term: 'Tríada CIA' }] }));
  put(root, 'content/wiki/glossary-links.json', JSON.stringify({ cia: ['missing'] }));
  assert.notEqual(run(root).status, 0);
  assert.equal(snapshot(root), before);
});

test('retains previously accepted flat PDF filenames starting with a dot or underscore', () => {
  for (const filename of ['_lecture.pdf', '.lecture.pdf']) {
    const root = fixture();
    put(root, `docs/${filename}`, 'PDF fixture');
    put(root, 'content/wiki/sources.json', JSON.stringify([{ id: 'course', title: 'Lecture', kind: 'official', pageCount: 3, url: `docs/${filename}` }]));
    const result = run(root);
    assert.equal(result.status, 0, `${filename}: ${result.stderr}`);
    assert.equal(run(root, '--check').status, 0);
  }
});

test('check detects stale source, asset and unexpected output without rewriting files', () => {
  const root = fixture();
  assert.equal(run(root).status, 0);
  const before = snapshot(root);
  put(root, 'content/wiki/fundamentals/cia.md', note(child, '## Definición\n\nContenido revisado.\n'));
  const result = run(root, '--check');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /outdated|stale/i);
  assert.equal(snapshot(root), before);
  assert.equal(run(root).status, 0);
  put(root, 'wiki/assets/wiki.css', 'stale asset');
  assert.notEqual(run(root, '--check').status, 0);
  assert.equal(run(root).status, 0);
  put(root, 'wiki/unexpected.html', 'not generated');
  assert.notEqual(run(root, '--check').status, 0);
});

test('reparenting updates navigation while an explicit permalink preserves the original URL', () => {
  const root = fixture();
  assert.equal(run(root).status, 0);
  const original = snapshot(root);
  put(root, 'content/wiki/fundamentals/cia.md', note({ ...child, permalink: 'cia' }, '## Definición\n\nConfidencialidad, integridad y disponibilidad.\n\n:::question ¿Qué se protege?\nLa información. <script>alert(1)</script>\n:::\n'));
  assert.equal(run(root).status, 0);
  assert.equal(snapshot(root), original, 'an explicit existing path must preserve default build output');

  const category = { ...home, id: 'security', title: 'Seguridad', slug: 'security', parent: 'wiki', order: 2 };
  put(root, 'content/wiki/fundamentals/security.md', note(category));
  put(root, 'content/wiki/fundamentals/cia.md', note({ ...child, parent: 'security', permalink: 'cia' }));
  const moved = run(root);
  assert.equal(moved.status, 0, moved.stderr);
  const html = readFileSync(path.join(root, 'wiki/cia/index.html'), 'utf8');
  assert.match(html, /wiki-breadcrumbs[\s\S]*security\/">Seguridad<\/a>[\s\S]*<span aria-current="page">Tríada CIA<\/span>/);
  assert.match(readFileSync(path.join(root, 'wiki/security/index.html'), 'utf8'), /\.\.\/cia\/">Tríada CIA<\/a>/);
  assert.match(readFileSync(path.join(root, 'wiki/index.html'), 'utf8'), /cia\/#definicion/);
  const index = JSON.parse(readFileSync(path.join(root, 'wiki/search-index.json')));
  assert.equal(index.find(entry => entry.id === 'cia').url, 'cia/');
  assert.ok(!JSON.parse(readFileSync(path.join(root, 'wiki/generated-files.json'))).includes('wiki/security/cia/index.html'));
  assert.equal(run(root, '--check').status, 0);
});

test('merged notes keep their old URLs while IDs resolve to canonical sections without duplicate navigation or search', () => {
  const root = fixture();
  const legacy = { ...child, id: 'legacy-cia', title: 'Página anterior de CIA', slug: 'old-cia', parent: 'wiki', permalink: 'legacy/cia', redirectTo: 'cia#definicion', related: [] };
  put(root, 'content/wiki/legacy.md', note(legacy, 'El contenido se integró en [CIA](wiki:cia#definicion).\n'));
  put(root, 'content/wiki/index.md', note({ ...home, related: ['legacy-cia'] }, '## Inicio\n\nConsultar [CIA anterior](wiki:legacy-cia).\n'));
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  const html = readFileSync(path.join(root, 'wiki/index.html'), 'utf8');
  assert.match(html, /href="cia\/#definicion">CIA anterior<\/a>/);
  assert.match(html, /href="cia\/#definicion">Página anterior de CIA<\/a>/);
  assert.doesNotMatch(html.match(/<nav aria-label="Árbol de temas">([\s\S]*?)<\/nav>/)[1], /Página anterior/);
  const redirect = readFileSync(path.join(root, 'wiki/legacy/cia/index.html'), 'utf8');
  assert.match(redirect, /http-equiv="refresh" content="0; url=\.\.\/\.\.\/cia\/#definicion"/);
  assert.match(redirect, /rel="canonical" href="\.\.\/\.\.\/cia\/#definicion"/);
  assert.match(redirect, /<a href="\.\.\/\.\.\/cia\/#definicion">/);
  assert.doesNotMatch(redirect, /Confidencialidad, integridad y disponibilidad/);
  const index = JSON.parse(readFileSync(path.join(root, 'wiki/search-index.json')));
  assert.equal(index.length, 2);
  assert.ok(!index.some(entry => entry.id === 'legacy-cia'));
  assert.equal(run(root, '--check').status, 0);
});

test('invalid redirect destinations and route collisions fail before generated output changes', () => {
  const root = fixture();
  const legacy = { ...child, id: 'legacy-cia', title: 'Página anterior de CIA', slug: 'old-cia', parent: 'wiki', permalink: 'legacy/cia', redirectTo: 'cia#definicion', related: [] };
  const text = 'El contenido se integró en [CIA](wiki:cia#definicion).\n';
  put(root, 'content/wiki/legacy.md', note(legacy, text));
  assert.equal(run(root).status, 0);
  const before = snapshot(root);
  for (const invalid of [
    { ...legacy, redirectTo: 'missing#definicion' },
    { ...legacy, redirectTo: 'legacy-cia#definicion' },
    { ...legacy, redirectTo: 'cia#missing-section' },
    { ...legacy, redirectTo: 'https://example.invalid/#section' },
    { ...legacy, redirectTo: 7 },
    { ...legacy, permalink: undefined },
    { ...legacy, permalink: 'cia' },
  ]) {
    put(root, 'content/wiki/legacy.md', note(invalid, text));
    assert.notEqual(run(root).status, 0, JSON.stringify(invalid));
    assert.equal(snapshot(root), before);
  }
});

test('invalid hierarchy, references and paths are rejected before any generated data changes', () => {
  const root = fixture();
  assert.equal(run(root).status, 0);
  const before = snapshot(root);
  const invalid = [
    { ...child, parent: 'missing' },
    { ...child, parent: 'cia' },
    { ...child, id: 'wiki' },
    { ...child, slug: '../outside' },
    { ...child, related: ['missing'] },
    { ...child, sources: [{ id: 'course', pages: [4] }] },
    { ...child, permalink: '../outside' },
    { ...child, permalink: '/absolute' },
    { ...child, permalink: 'double//slash' },
    { ...child, permalink: 'encoded%2fpath' },
    { ...child, permalink: 'index.html' },
    { ...child, permalink: '' },
    { ...child, permalink: 7 },
  ];
  for (const metadata of invalid) {
    put(root, 'content/wiki/fundamentals/cia.md', note(metadata));
    assert.notEqual(run(root).status, 0, JSON.stringify(metadata));
    assert.equal(snapshot(root), before);
  }
  put(root, 'content/wiki/fundamentals/cia.md', note(child, '[Roto](wiki:missing)\n'));
  assert.notEqual(run(root).status, 0);
  assert.equal(snapshot(root), before);
  assert.notEqual(run(root, '--unknown-option').status, 0);
  assert.equal(snapshot(root), before);
});

test('hash consolidation retains source citations and compatibility routes', () => {
  const site = fileURLToPath(new URL('../../../', import.meta.url));
  const expected = JSON.parse(readFileSync(new URL('./fixtures/hash-consolidation.json', import.meta.url), 'utf8'));
  const [metadata, body] = readFileSync(path.join(site, 'content/wiki/cryptography/hash.md'), 'utf8').replace(/\r\n/g, '\n').split('---\n').slice(1);
  const page = JSON.parse(metadata);
  assert.ok(body.trim(), 'Canonical hash explanation is empty');
  for (const citation of expected.sources) {
    const current = page.sources.find(source => source.id === citation.id);
    assert.ok(current, `Source missing: ${citation.id}`);
    for (const number of citation.pages) assert.ok(current.pages.includes(number), `Source page missing: ${citation.id} p.${number}`);
  }
  for (const legacy of expected.legacy) {
    const note = JSON.parse(readFileSync(path.join(site, 'content/wiki/cryptography', legacy.file), 'utf8').split('---\n')[1]);
    assert.equal(note.id, legacy.id);
    assert.equal(`${note.permalink}/`, legacy.url);
    assert.ok(note.redirectTo.startsWith('crypto-hash#'));
  }
});

test('Fundamentos follows the requested hierarchy while retaining citations and URLs', () => {
  const site = fileURLToPath(new URL('../../../', import.meta.url));
  const directory = path.join(site, 'content/wiki/fundamentals');
  const pages = new Map(readdirSync(directory).filter(file => file.endsWith('.md')).map(file => {
    const [metadata, body] = readFileSync(path.join(directory, file), 'utf8').replace(/\r\n/g, '\n').split('---\n').slice(1);
    const page = JSON.parse(metadata);
    return [page.id, { ...page, body }];
  }));
  const expectedChildren = {
    fundamentals: ['security', 'cybersecurity', 'threat', 'vulnerability', 'risk', 'attackers', 'attacks', 'leaks', 'defense-depth', 'llm'],
    'fundamentals-security': ['cia'],
    'fundamentals-attacks': ['social-engineering', 'mitm', 'application-attacks', 'dos'],
    'fundamentals-social-engineering': ['phishing'],
    'fundamentals-application-attacks': ['sqli', 'rce', 'ssrf'],
    'fundamentals-llm': ['prompt-injection'],
  };
  for (const [parent, ids] of Object.entries(expectedChildren)) {
    const children = [...pages.values()].filter(page => page.parent === parent).sort((a, b) => a.order - b.order);
    assert.deepEqual(children.map(page => page.id), ids.map(id => `fundamentals-${id}`), parent);
  }
  assert.equal(pages.size, 21, 'attributes, actors and defense layers must remain sections');
  assert.equal(pages.get('fundamentals-risk').title, 'Riesgo');
  assert.equal(pages.get('fundamentals-attacks').title, 'Tipos de ataques');
  assert.equal(pages.get('fundamentals-phishing').title, 'Phishing');
  assert.equal(pages.get('fundamentals-prompt-injection').title, 'Prompt Injection');
  const expected = JSON.parse(readFileSync(new URL('./fixtures/fundamentals-preservation.json', import.meta.url), 'utf8'));
  for (const original of expected.notes) {
    const current = pages.get(original.id);
    assert.ok(current, `Stable ID missing: ${original.id}`);
    const route = page => page.permalink || `${page.parent === 'wiki' ? '' : `${route(pages.get(page.parent))}/`}${page.slug}`;
    assert.equal(`${route(current)}/`, original.url, `Published URL changed: ${original.id}`);
    for (const citation of original.sources) {
      const source = current.sources.find(source => source.id === citation.id);
      assert.ok(source, `Source missing: ${original.id}/${citation.id}`);
      for (const number of citation.pages) assert.ok(source.pages.includes(number), `Citation missing: ${original.id} p.${number}`);
    }
    assert.ok(current.body.trim(), `Canonical explanation missing: ${original.file} -> ${original.id}`);
  }
});

function readCsirt() {
  const site = fileURLToPath(new URL('../../../', import.meta.url));
  const directory = path.join(site, 'content/wiki/csirt');
  return new Map(readdirSync(directory).filter(file => file.endsWith('.md')).map(file => {
    const [metadata, body] = readFileSync(path.join(directory, file), 'utf8').replace(/\r\n/g, '\n').split('---\n').slice(1);
    const page = JSON.parse(metadata);
    return [page.id, { ...page, body }];
  }));
}

function csirtChildren(pages, parent, expected) {
  const children = [...pages.values()].filter(page => page.parent === parent && !page.redirectTo).sort((a, b) => a.order - b.order);
  assert.deepEqual(children.map(page => page.id), expected, parent);
}

function csirtPreserved(pages, ids) {
  const fixture = JSON.parse(readFileSync(new URL('./fixtures/csirt-preservation.json', import.meta.url), 'utf8'));
  for (const original of fixture.notes.filter(page => ids.includes(page.id))) {
    const current = pages.get(original.id);
    assert.ok(current, `Stable CSIRT ID missing: ${original.id}`);
    const chain = [current.slug];
    for (let parent = current.parent; parent !== 'wiki'; parent = pages.get(parent).parent) chain.unshift(pages.get(parent).slug);
    assert.equal(`${current.permalink ?? chain.join('/')}/`, original.url, `CSIRT URL changed: ${original.id}`);
    const destination = pages.get(original.destination);
    assert.ok(destination && !destination.redirectTo, `Canonical destination missing: ${original.destination}`);
    if (current.id !== destination.id) assert.ok(current.redirectTo?.startsWith(`${destination.id}#`), `Compatibility target missing: ${current.id}`);
    assert.ok(destination.body.trim(), `Canonical CSIRT explanation missing: ${original.file} -> ${destination.id}`);
    for (const citation of original.sources) {
      for (const page of [current, destination]) {
        const source = page.sources.find(source => source.id === citation.id);
        assert.ok(source, `CSIRT source missing: ${page.id}/${citation.id}`);
        for (const number of citation.pages) assert.ok(source.pages.includes(number), `CSIRT citation missing: ${page.id} p.${number}`);
      }
    }
  }
}

test('CSIRT Internet resources separate allocation, registration lookup and domain roles while retaining URLs', () => {
  const pages = readCsirt();
  csirtChildren(pages, 'csirt-resources', ['csirt-ip', 'csirt-registration-lookup', 'csirt-dns']);
  csirtChildren(pages, 'csirt-ip', ['csirt-rir']);
  csirtChildren(pages, 'csirt-registration-lookup', ['csirt-whois', 'csirt-rdap']);
  csirtChildren(pages, 'csirt-dns', ['csirt-domains']);
  csirtChildren(pages, 'csirt-domains', []);
  csirtChildren(pages, 'csirt-rdap', []);
  assert.equal(pages.get('csirt-registration-lookup').title, 'Consulta de información de registro');
  assert.equal(pages.get('csirt-dns').title, 'Nombres de dominio y DNS');
  assert.equal(pages.get('csirt-domains').title, 'Registro de nombres de dominio');
  csirtPreserved(pages, ['csirt-resources', 'csirt-ip', 'csirt-rir', 'csirt-whois', 'csirt-rdap', 'csirt-icann-rdap', 'csirt-dns', 'csirt-domains', 'csirt-registry', 'csirt-registrar', 'csirt-registrant']);
});

test('CSIRT mail and incidents integrate auxiliary pages and retain their URLs', () => {
  const pages = readCsirt();
  csirtChildren(pages, 'csirt-email', ['csirt-smtp', 'csirt-headers', 'csirt-spoofing']);
  csirtChildren(pages, 'csirt-smtp', []);
  csirtChildren(pages, 'csirt-headers', []);
  csirtChildren(pages, 'csirt-incidents', ['csirt-handling', 'csirt-sensitive-information']);
  const notification = pages.get('csirt-notification');
  csirtChildren(pages, 'csirt-handling', notification ? ['csirt-notification'] : []);
  csirtChildren(pages, 'csirt-sensitive-information', ['csirt-tlp']);
  csirtChildren(pages, 'csirt-tlp', []);
  assert.equal(pages.get('csirt-handling').title, 'Gestión de incidentes');
  assert.equal(pages.get('csirt-spoofing').title, 'Suplantación del remitente (Email Spoofing)');
  if (notification) {
    assert.equal(notification.title, 'Notificación de incidentes');
    assert.ok(notification.sources.some(source => source.id === 'lecture-incidents' && source.pages.includes(18)));
    assert.match(notification.body, /:::question/);
  } else assert.match(pages.get('csirt-handling').body, /[Nn]otificaci[oó]n/);
  csirtPreserved(pages, ['csirt-email', 'csirt-smtp', 'csirt-email-anatomy', 'csirt-headers', 'csirt-mxtoolbox', 'csirt-google-messageheader', 'csirt-spoofing', 'csirt-incidents', 'csirt-handling', 'csirt-sensitive-information', 'csirt-tlp']);
});

test('CSIRT teams contain the three service groups while retaining their published routes', () => {
  const pages = readCsirt();
  csirtChildren(pages, 'csirt', ['csirt-teams', 'csirt-resources', 'csirt-email', 'csirt-incidents']);
  csirtChildren(pages, 'csirt-teams', ['csirt-services']);
  csirtChildren(pages, 'csirt-services', ['csirt-services-reactive', 'csirt-services-proactive', 'csirt-services-quality']);
  csirtPreserved(pages, ['csirt', 'csirt-teams', 'csirt-services', 'csirt-services-reactive', 'csirt-services-proactive', 'csirt-services-quality']);
});

test('CSIRT complete hierarchy retains its canonical concepts and source citations', () => {
  const pages = readCsirt();
  const canonical = [...pages.values()].filter(page => !page.redirectTo);
  assert.equal(canonical.length, pages.has('csirt-notification') ? 23 : 22);
  assert.equal([...pages.values()].filter(page => page.redirectTo).length, 7);
  for (const page of canonical) if (page.id !== 'csirt') assert.ok(pages.has(page.parent), `Orphan CSIRT note: ${page.id}`);
  csirtPreserved(pages, [...pages.keys()]);
});

function readMalware() {
  const directory = fileURLToPath(new URL('../../../content/wiki/malware/', import.meta.url));
  return new Map(readdirSync(directory).filter(file => file.endsWith('.md')).map(file => {
    const [metadata, body] = readFileSync(path.join(directory, file), 'utf8').replace(/\r\n/g, '\n').split('---\n').slice(1);
    const page = JSON.parse(metadata);
    return [page.id, { ...page, body }];
  }));
}

function malwareChildren(pages, parent, expected) {
  const children = [...pages.values()].filter(page => page.parent === parent && !page.redirectTo).sort((a, b) => a.order - b.order);
  assert.deepEqual(children.map(page => page.id), expected.map(id => `malware-${id}`), parent);
}

function malwarePreserved(pages, ids) {
  const fixture = JSON.parse(readFileSync(new URL('./fixtures/malware-preservation.json', import.meta.url), 'utf8'));
  for (const original of fixture.notes.filter(page => ids.includes(page.id))) {
    const current = pages.get(original.id);
    assert.ok(current, `Stable Malware ID missing: ${original.id}`);
    const chain = [current.slug];
    for (let parent = current.parent; parent !== 'wiki'; parent = pages.get(parent).parent) chain.unshift(pages.get(parent).slug);
    assert.equal(`${current.permalink ?? chain.join('/')}/`, original.url, `Malware URL changed: ${original.id}`);
    const destination = pages.get(original.destination);
    assert.ok(destination && !destination.redirectTo, `Canonical Malware destination missing: ${original.destination}`);
    if (current.id !== destination.id) assert.ok(current.redirectTo?.startsWith(`${destination.id}#`), `Malware compatibility missing: ${current.id}`);
    assert.ok(destination.body.trim(), `Canonical Malware explanation missing: ${original.file} -> ${destination.id}`);
    for (const citation of original.sources) {
      for (const page of [current, destination]) {
        const source = page.sources.find(source => source.id === citation.id);
        assert.ok(source, `Malware source missing: ${page.id}/${citation.id}`);
        for (const number of citation.pages) assert.ok(source.pages.includes(number), `Malware citation missing: ${page.id} p.${number}`);
      }
    }
  }
}

test('Malware static analysis integrates identification, PE components and auxiliary tools while retaining URLs', () => {
  const pages = readMalware();
  malwareChildren(pages, 'malware-static', ['identification', 'strings', 'executables', 'packing', 'obfuscation']);
  malwareChildren(pages, 'malware-executables', ['pe', 'elf']);
  malwareChildren(pages, 'malware-identification', []);
  malwareChildren(pages, 'malware-pe', []);
  assert.equal(pages.get('malware-identification').title, 'Identificación de muestras');
  assert.equal(pages.get('malware-executables').title, 'Análisis de archivos ejecutables');
  malwarePreserved(pages, ['static', 'antivirus', 'virustotal', 'hashes', 'strings', 'executables', 'pe', 'elf', 'imports', 'exports', 'resources', 'cff-explorer', 'pestudio', 'resource-hacker', 'packing', 'obfuscation'].map(id => `malware-${id}`));
});

test('Malware dynamic analysis separates environment, system monitoring, persistence and network techniques', () => {
  const pages = readMalware();
  malwareChildren(pages, 'malware-dynamic', ['laboratory', 'system-monitoring', 'persistence', 'network-analysis']);
  malwareChildren(pages, 'malware-system-monitoring', ['registry', 'process-files']);
  malwareChildren(pages, 'malware-persistence', ['run-keys', 'services']);
  for (const id of ['laboratory', 'process-files', 'network-analysis']) malwareChildren(pages, `malware-${id}`, []);
  assert.equal(pages.get('malware-laboratory').title, 'Entorno seguro de análisis');
  assert.equal(pages.get('malware-system-monitoring').title, 'Monitoreo de cambios en el sistema');
  assert.equal(pages.get('malware-process-files').title, 'Monitoreo de procesos y archivos');
  assert.equal(pages.get('malware-network-analysis').title, 'Análisis de comunicaciones de red');
  malwarePreserved(pages, ['dynamic', 'laboratory', 'snapshots', 'online-sandbox', 'hybrid-analysis', 'any-run', 'registry', 'regshot', 'autoruns', 'procmon', 'procmon-filters', 'process-explorer', 'process-hacker', 'persistence', 'run-keys', 'services', 'network-analysis', 'wireshark', 'tcpdump', 'fakenet', 'fakedns'].map(id => `malware-${id}`));
});

test('Malware classification keeps twelve distinct class pages, an analysis overview and host/network IOC concepts', () => {
  const pages = readMalware();
  malwareChildren(pages, 'malware', ['classes', 'analysis']);
  malwareChildren(pages, 'malware-classes', ['virus', 'worm', 'trojan', 'backdoor', 'spyware', 'scareware', 'rat', 'rootkit', 'botnet', 'keylogger', 'ransomware', 'downloader']);
  malwareChildren(pages, 'malware-analysis', ['ioc', 'static', 'dynamic']);
  malwareChildren(pages, 'malware-ioc', ['ioc-host', 'ioc-network']);
  assert.equal(pages.get('malware-analysis').title, 'Análisis de malware');
  assert.equal(pages.get('malware-rat').title, 'RAT');
  assert.equal(pages.get('malware-backdoor').title, 'Backdoor');
  malwarePreserved(pages, ['malware', ...['classes', 'virus', 'worm', 'trojan', 'backdoor', 'spyware', 'scareware', 'rat', 'rootkit', 'botnet', 'keylogger', 'ransomware', 'downloader', 'analysis', 'ioc', 'ioc-host', 'ioc-network'].map(id => `malware-${id}`)]);
});

test('Malware complete hierarchy preserves its canonical concepts, citations and URLs', () => {
  const pages = readMalware();
  const canonical = [...pages.values()].filter(page => !page.redirectTo);
  assert.equal(canonical.length, 35);
  assert.equal([...pages.values()].filter(page => page.redirectTo).length, 23);
  assert.equal(pages.size, 58);
  const ids = new Set(canonical.map(page => page.id));
  for (const page of canonical) if (page.id !== 'malware') assert.ok(ids.has(page.parent), `Orphan Malware note: ${page.id}`);
  malwarePreserved(pages, [...pages.keys()]);
});
