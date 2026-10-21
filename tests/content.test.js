import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const readJSON = async path => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const { questions } = await readJSON('data/questions.json');
const { entries } = await readJSON('data/glossary.json');
const mapping = await readJSON('data/concept-map.json');
const notes = await readJSON('data/option-explanations.json');
const comparisons = await readJSON('data/comparisons.json');
const ascii = await readJSON('data/ascii.json');
test('ASCII reference covers all 52 Latin letters with exact decimal and hexadecimal codes', () => {
  assert.equal(ascii.version, 1); assert.ok(entries.some(e => e.id === ascii.conceptId));
  const characters = ascii.groups.flatMap(g => g.characters);
  assert.equal(characters.length, 52); assert.equal(new Set(characters.map(c => c.character)).size, 52);
  assert.equal(characters.map(c => c.character).join(''), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
  for (const item of characters) {
    assert.equal(Buffer.from(item.character, 'ascii')[0], item.decimal);
    assert.equal(Number(item.hexadecimal), item.decimal);
    assert.match(item.hexadecimal, /^0x[0-7][0-9A-F]$/);
  }
  assert.match(ascii.note, /ñ/); assert.match(ascii.note, /no pertenecen al ASCII estándar/);
});
test('every distractor has its own reviewed explanation linked to unchanged question wording', () => {
  assert.equal(notes.version, 1); assert.match(notes.authorship, /No son transcripciones/);
  assert.deepEqual(notes.questions.map(n => n.questionId), questions.map(q => q.id));
  let total = 0;
  for (const [i, q] of questions.entries()) {
    const n = notes.questions[i];
    assert.deepEqual(Object.keys(n.distractors), Object.keys(q.options).filter(k => k !== q.answer));
    // Match the canonical fingerprint produced by the editorial content validator.
    const canonical = JSON.stringify({ answer: q.answer, options: q.options, prompt: q.prompt });
    assert.equal(n.questionFingerprint, createHash('sha256').update(canonical).digest('hex'), `Question ${q.id} needs editorial review`);
    for (const text of Object.values(n.distractors)) { assert.ok(text.trim().length > 35); assert.notEqual(text, q.explanation); total++; }
    assert.ok(n.manualPages.length && n.manualPages.every(p => p >= 1 && p <= 55));
  }
  assert.equal(total, 1400);
});
test('comparison tables have complete rows, valid concepts, themes and manual references', () => {
  assert.equal(comparisons.version, 1); assert.equal(comparisons.comparisons.length, 13);
  const ids = new Set(entries.map(e => e.id));
  const comparisonIds = new Set();
  for (const c of comparisons.comparisons) {
    assert.ok(!ids.has(c.id) && !comparisonIds.has(c.id)); comparisonIds.add(c.id);
    assert.ok(c.title && c.example && c.takeaway);
    assert.ok(c.conceptIds.length && c.conceptIds.every(id => ids.has(id)));
    assert.ok(c.columns.length >= 2 && c.columns.every(col => ids.has(col.conceptId) && col.label));
    assert.ok(c.rows.every(row => row.aspect && row.values.length === c.columns.length && row.values.every(Boolean)));
    assert.ok(c.manualPages.every(p => Number.isInteger(p) && p >= 1 && p <= 55));
    assert.ok(c.topics.every(t => ['cripto','csirt','malware'].includes(t)));
  }
});
test('bank has ordered unique IDs 1–350, original five options and a solution for every question', () => {
  assert.deepEqual(questions.map(q => q.id), Array.from({ length: 350 }, (_, i) => i + 1));
  for (const q of questions) {
    assert.deepEqual(Object.keys(q.options), ['A', 'B', 'C', 'D', 'E']);
    assert.ok(q.prompt.length > 10 && q.explanation && q.source);
    assert.ok(Object.hasOwn(q.options, q.answer));
    assert.ok(Object.values(q.options).every(v => typeof v === 'string' && v.trim() && !v.includes('Justificación:')));
    assert.ok(q.questionPage >= 2 && q.questionPage <= 152);
    assert.ok(q.solutionPage >= 2 && q.solutionPage <= 43);
    assert.ok(q.annexPage >= 153 && q.annexPage <= 172);
  }
});
test('all 350 question links agree with the reviewed concept map and appropriate themes', () => {
  const byId = new Map(entries.map(e => [e.id, e]));
  assert.equal(byId.size, entries.length);
  for (const q of questions) {
    assert.deepEqual(q.conceptIds, mapping[q.id]); assert.ok(q.conceptIds.length);
    for (const id of q.conceptIds) { assert.ok(byId.has(id)); assert.ok(byId.get(id).topics.includes(q.topic), `${q.id}: ${id}`); }
  }
});
test('expanded glossary preserves all 33 original terms and has explanations, hints and manual references', () => {
  assert.equal(entries.length, 89); assert.equal(entries.filter(e => e.fromManualGlossary).length, 33);
  for (const e of entries) {
    assert.match(e.id, /^[a-z0-9-]+$/);
    assert.ok(e.term.trim());
    for (const field of ['definition','explanation','hint','example']) assert.ok(e[field].length > 5);
    assert.ok(e.manualPages.length && e.manualPages.every(p => Number.isInteger(p) && p >= 1 && p <= 55));
    assert.ok(e.topics.every(t => ['cripto','csirt','malware'].includes(t)));
    assert.ok(!/respuesta correcta|opción [A-E]\)/i.test(e.hint));
  }
});
test('HTML links/assets and all JavaScript imports resolve using relative paths', async () => {
  for (const page of ['index.html','glosario.html']) {
    const html = await readFile(new URL(page,root),'utf8');
    assert.match(html,/lang="es-AR"/); assert.match(html,/name="viewport"/);
    for (const [,path] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (path.startsWith('#')) continue;
      assert.ok(!path.startsWith('/') && !path.includes('://'));
      await access(new URL(path.split('#')[0].split('?')[0],root));
    }
  }
  for (const file of ['app.js','glossary.js','progress.mjs']) {
    const code = await readFile(new URL(`assets/${file}`,root),'utf8');
    for (const [,path] of code.matchAll(/from ['"]([^'"]+)['"]/g)) { assert.ok(path.startsWith('./')); await access(new URL(`assets/${path}`,root)); }
    assert.doesNotMatch(code,/fetch\(['"]https?:/);
  }
});
test('extraction report records complete comparison with solutions and the original annex', async () => {
  const report=await readJSON('data/extraction-report.json');
  for (const key of ['solutionPromptsMatched','solutionAnswersMatched','annexPromptsMatched','annexAnswersMatched','glossaryLinksValidated']) assert.equal(report.checks[key],350);
  assert.deepEqual(report.checks.topicCounts,{cripto:66,csirt:160,malware:124});
});
