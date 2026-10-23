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
  const index = JSON.parse(readFileSync(path.join(root, 'wiki/search-index.json')));
  assert.ok(index.some(entry => entry.id === 'cia' && entry.text.includes('Confidencialidad')));
  assert.equal(run(root, '--check').status, 0);
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
