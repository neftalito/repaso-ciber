/* Runs the actual browser modules in a DOM, without networking or a display.
   This verifies interactions, not CSS layout or native browser keyboard behavior. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SourceTextModule } from 'node:vm';
const { JSDOM } = await import(process.env.JSDOM_MODULE || 'jsdom');
const root = new URL('../', import.meta.url);
const key = 'ic2026.progress.v1';
const originalQuestions = JSON.parse(await readFile(new URL('data/questions.json', root), 'utf8')).questions;
const editorialNotes = JSON.parse(await readFile(new URL('data/option-explanations.json', root), 'utf8')).questions;
const tick = () => new Promise(resolve => setTimeout(resolve, 0));
let checks = 0;
function check(message, fn) { fn(); checks++; console.log(`OK ${checks}: ${message}`); }
async function mount(file = 'index.html', options = {}) {
  const dom = new JSDOM(await readFile(new URL(file, root), 'utf8'), { url: `https://example.test/ic2026/${file}${options.suffix || ''}`, runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window;
  const errors = [];
  w.addEventListener('error', event => errors.push(event.error?.message || event.message));
  const memory = options.memory || new Map();
  const requests = [], confirmations = [], downloads = [], runtimeErrors = [];
  w.addEventListener('error', event => { runtimeErrors.push(event.error?.stack || event.message); event.preventDefault(); });
  w.addEventListener('unhandledrejection', event => { runtimeErrors.push(String(event.reason)); event.preventDefault(); });
  const storage = { getItem: k => { if (options.blocked) throw Error('blocked'); return memory.get(k) || null; }, setItem: (k,v) => { if (options.blocked || options.quota) throw Error('quota'); memory.set(k, v); } };
  Object.defineProperty(w, 'localStorage', { value: storage });
  w.fetch = async path => {
    const url = new URL(path, w.location.href); requests.push(url.pathname);
    assert.ok(url.pathname.startsWith('/ic2026/'), `Lost subpath: ${url.pathname}`);
    if (options.failFetch) return { ok: false };
    const body = await readFile(new URL(url.pathname.slice('/ic2026/'.length), root), 'utf8');
    return { ok: true, json: async () => JSON.parse(body) };
  };
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.matchMedia = () => ({ matches: false });
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; };
  w.confirm = message => { confirmations.push(message); return options.confirm !== false; };
  w.URL.createObjectURL = blob => { downloads.push(blob); return 'blob:local-export'; };
  w.URL.revokeObjectURL = () => {};
  w.HTMLAnchorElement.prototype.click = function () { downloads.push(this.download); };
  const context = dom.getInternalVMContext();
  const progress = new SourceTextModule(await readFile(new URL('assets/progress.mjs', root), 'utf8'), { context });
  const module = new SourceTextModule(await readFile(new URL(file === 'index.html' ? 'assets/app.js' : 'assets/glossary.js', root), 'utf8'), { context });
  await module.link(() => progress); await module.evaluate(); await tick();
  const $ = id => w.document.getElementById(id);
  const change = (id,value) => { $(id).value = value; $(id).dispatchEvent(new w.Event('change', { bubbles: true })); };
  const click = id => $(id).click();
  const state = () => JSON.parse(memory.get(key));
  const select = letter => { const r = w.document.querySelector(`input[name="answer"][value="${letter}"]`); r.click(); };
  const submit = () => $('answer-form').dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
  const importData = async data => { Object.defineProperty($('import-progress'), 'files', { configurable: true, value: [{ size: data.length, text: async () => data }] }); $('import-progress').dispatchEvent(new w.Event('change')); await tick(); await tick(); };
  return { w, $, memory, requests, confirmations, downloads, change, click, state, select, submit, importData, close: () => { w.close(); assert.deepEqual(errors, [], 'Unexpected interaction errors'); } };
}
let app = await mount();
check('initial app loads all 350 questions and leaves correction hidden', () => { assert.equal(app.$('study-layout').hidden, false); assert.equal(app.w.document.querySelectorAll('[data-question]').length, 350); assert.equal(app.$('confirm-answer').disabled, true); assert.equal(app.$('feedback').hidden, true); assert.equal(app.$('hint-panel').hidden, true); });
check('explanations and accordion controls are unavailable before confirmation', () => {
  assert.equal(app.w.document.querySelectorAll('#answer-options details, .option-explanation').length, 0);
  assert.equal(app.$('next-question-inline').hidden, true); assert.equal(app.$('retry-answer').hidden, true);
});
app.select('A'); app.submit();
check('wrong answer highlights chosen/correct options and automatically shows concept', () => { assert.equal(app.$('feedback').hidden, false); assert.equal(app.$('hint-panel').hidden, false); assert.equal(app.w.document.querySelectorAll('.is-correct').length, 1); assert.equal(app.w.document.querySelectorAll('.is-incorrect').length, 1); assert.equal(app.state().attempts[0].hintUsed, false); });
check('confirmation enables five accordions and opens only the selected wrong option', () => {
  assert.equal(app.w.document.querySelectorAll('#answer-options details').length, 5);
  assert.equal(app.w.document.querySelectorAll('#answer-options details[open]').length, 1);
  const chosen = app.w.document.querySelector('[data-option="A"]'); const correct = app.w.document.querySelector('[data-option="E"]');
  assert.equal(chosen.open, true); assert.equal(correct.open, false);
  assert.ok(chosen.textContent.includes(editorialNotes[0].distractors.A));
  assert.match(chosen.textContent, /Ampliación didáctica/);
  assert.ok(correct.textContent.includes(originalQuestions[0].explanation)); assert.match(correct.textContent, /Solucionario original/);
});
app.w.document.querySelector('[data-option="E"] summary').click();
check('other options including the correct one can be expanded without recording another attempt', () => {
  assert.equal(app.w.document.querySelector('[data-option="E"]').open, true); assert.equal(app.state().attempts.length, 1);
});
app.submit();
check('duplicate submit cannot register a second confirmed attempt', () => assert.equal(app.state().attempts.length, 1));
app.click('retry-answer');
check('retry hides answer and conceptual help, retains history', () => { assert.equal(app.$('feedback').hidden, true); assert.equal(app.$('hint-panel').hidden, true); assert.equal(app.$('question-history').open, false); assert.equal(app.state().attempts.length, 1); assert.equal(app.$('confirm-answer').disabled, true); assert.equal(app.w.document.activeElement.name, 'answer'); });
check('retry removes all option explanations and restores five editable radio choices', () => {
  assert.equal(app.w.document.querySelectorAll('.option-explanation, #answer-options details').length, 0);
  assert.equal(app.w.document.querySelectorAll('#answer-options input:not(:disabled)').length, 5);
  assert.equal(app.$('next-question-inline').hidden, true);
});
const firstMemory = app.memory; app.close(); app = await mount('index.html', { memory: firstMemory });
check('reload retains the in-progress retry without redisplaying solution', () => { assert.equal(app.$('feedback').hidden, true); assert.equal(app.state().drafts[1].option, null); });
app.click('show-hint'); app.select('E'); app.submit();
check('explicit hint is recorded and successful retry updates last state and statistics', () => { assert.equal(app.state().attempts.length, 2); assert.equal(app.state().attempts[1].hintUsed, true); assert.equal(app.$('correct-count').textContent, '1'); assert.equal(app.$('incorrect-count').textContent, '0'); assert.equal(app.$('answered-count').textContent, '1'); });
check('a chosen correct option opens its original explanation and leaves distractors closed', () => {
  assert.equal(app.w.document.querySelector('#answer-options details[open]').dataset.option, 'E');
  assert.equal(app.w.document.querySelectorAll('#answer-options details[open]').length, 1);
  assert.equal(app.$('next-question-inline').hidden, false);
  assert.equal(app.$('retry-answer').getAttribute('aria-label'), 'Intentar de nuevo');
});
app.click('next-question-inline');
check('the nearby next button navigates and hides correction on the following unanswered question', () => {
  assert.match(app.$('question-position').textContent, /002/); assert.equal(app.$('feedback').hidden, true);
});
app.click('previous-question');
check('returning to a confirmed question leaves its accordions closed by default', () => {
  assert.match(app.$('question-position').textContent, /001/); assert.equal(app.w.document.querySelectorAll('#answer-options details[open]').length, 0);
});
app.change('status-filter','pending');
check('pending filter excludes question answered correctly', () => { assert.equal(app.w.document.querySelectorAll('[data-question]').length, 349); assert.match(app.$('question-position').textContent, /002/); });
app.change('topic-filter','malware');
check('combined topic filter shows 124 pending Malware questions', () => { assert.equal(app.w.document.querySelectorAll('[data-question]').length, 124); assert.match(app.$('question-position').textContent, /227/); });
app.click('next-question');
const saved = app.memory; app.close(); app = await mount('index.html', { memory: saved });
check('reading position and both filters survive reload', () => { assert.match(app.$('question-position').textContent, /228/); assert.equal(app.$('topic-filter').value,'malware'); assert.equal(app.$('status-filter').value,'pending'); });
app.change('status-filter','correct');
check('empty filters have a useful empty state', () => { assert.equal(app.$('empty-state').hidden,false); assert.equal(app.$('question-card').hidden,true); });
app.click('clear-filters');
app.w.document.dispatchEvent(new app.w.KeyboardEvent('keydown',{ key:'ArrowRight', altKey:true, bubbles:true }));
check('keyboard navigation moves to next question', () => assert.match(app.$('question-position').textContent,/229/));
app.click('manage-progress'); app.click('export-progress');
let exported;
const blob = app.downloads[0];
const reader = new app.w.FileReader(); exported = await new Promise(resolve => { reader.onload = () => resolve(reader.result); reader.readAsText(blob); });
check('export contains versioned valid history including assisted attempts', () => { const data=JSON.parse(exported); assert.equal(data.version,1); assert.equal(data.format,'ic2026-progress'); assert.equal(data.attempts.length,2); assert.equal(data.attempts[1].hintUsed,true); });
await app.importData('{broken');
check('invalid JSON does not alter history or ask confirmation', () => { assert.match(app.$('transfer-status').textContent,/JSON válido/); assert.equal(app.confirmations.length,0); assert.equal(app.state().attempts.length,2); });
const invalid=JSON.parse(exported); invalid.attempts[0].correct=true; await app.importData(JSON.stringify(invalid));
check('incoherent imported result is rejected before replacement', () => { assert.match(app.$('transfer-status').textContent,/incoherente/); assert.equal(app.state().attempts.length,2); });
app.click('reset-progress');
check('reset requires confirmation and clears history', () => { assert.equal(app.confirmations.length,1); assert.equal(app.state().attempts.length,0); });
await app.importData(exported);
check('validated import requires confirmation and replaces progress', () => { assert.equal(app.confirmations.length,2); assert.equal(app.state().attempts.length,2); assert.match(app.$('transfer-status').textContent,/Progreso importado/); });
app.close();
app=await mount('index.html',{memory:saved,confirm:false}); app.click('manage-progress'); const before=JSON.stringify(app.state()); await app.importData(exported); app.click('reset-progress');
check('cancelled import and reset leave the current progress unchanged', () => assert.equal(JSON.stringify(app.state()),before)); app.close();
app=await mount('index.html',{blocked:true}); app.select('E'); app.submit();
check('blocked localStorage warns and keeps the session usable', () => { assert.equal(app.$('storage-warning').hidden,false); assert.equal(app.$('correct-count').textContent,'1'); assert.match(app.$('storage-warning').textContent,/exportá/i); }); app.close();
const corruptMemory = new Map([[key, '{damaged-data']]);
app = await mount('index.html', { memory: corruptMemory }); app.select('E'); app.submit(); app.click('manage-progress');
check('unreadable saved data is preserved while new attempts remain usable in memory', () => {
  assert.equal(corruptMemory.get(key), '{damaged-data');
  assert.equal(app.$('correct-count').textContent, '1');
  assert.match(app.$('detailed-stats').textContent, /Descargar datos originales/);
  assert.equal(app.$('storage-warning').hidden, false);
});
await app.importData(exported);
check('confirmed import recovers from unreadable storage without losing the new backup', () => {
  assert.equal(app.state().attempts.length, 2);
  assert.equal(app.$('storage-warning').hidden, true);
}); app.close();
app = await mount('index.html', { quota: true }); app.click('manage-progress'); await app.importData(exported);
check('a validated backup remains usable in memory when the storage quota prevents saving', () => {
  assert.match(app.$('transfer-status').textContent, /memoria/);
  assert.equal(app.$('storage-warning').hidden, false);
  assert.equal(app.$('correct-count').textContent, '1');
}); app.close();
app=await mount('index.html',{suffix:'?pregunta=350'});
check('question links work under a GitHub Pages subpath', () => { assert.match(app.$('question-position').textContent,/350/); assert.deepEqual(app.requests,['/ic2026/data/questions.json','/ic2026/data/glossary.json','/ic2026/data/option-explanations.json']); });
app.select(originalQuestions[349].answer); app.submit();
check('both next buttons stop at the end of the route while retry remains available', () => {
  assert.equal(app.$('next-question-inline').disabled, true); assert.equal(app.$('next-question').disabled, true);
  assert.equal(app.$('retry-answer').hidden, false);
}); app.close();
app=await mount('index.html',{failFetch:true});
check('data loading failure offers the original materials', () => { assert.match(app.$('load-status').textContent,/servidor estático/); app.w.document.querySelector('[data-materials]').click(); assert.equal(app.$('materials-dialog').open,true); }); app.close();
let glossary=await mount('glosario.html');
check('glossary renders 89 entries with unique direct links', () => { assert.equal(glossary.w.document.querySelectorAll('.glossary-entry').length,89); assert.equal(new Set([...glossary.w.document.querySelectorAll('.glossary-entry')].map(n=>n.id)).size,89); });
check('the glossary includes thirteen comparison tables, initially collapsed', () => {
  assert.equal(glossary.w.document.querySelectorAll('.comparison-card').length, 13);
  assert.equal(glossary.w.document.querySelectorAll('.comparison-card[open]').length, 0);
  assert.equal(glossary.$('comparaciones').open, false);
  assert.equal(glossary.w.document.querySelectorAll('.comparison-table').length, 13);
  assert.ok(glossary.$('hash').querySelector('.comparison-links a'));
});
glossary.$('glossary-search').value='criptografia simetrica'; glossary.$('glossary-search').dispatchEvent(new glossary.w.Event('input'));
check('search ignores accents and finds concepts', () => { assert.ok(glossary.w.document.querySelectorAll('.glossary-entry').length>0); assert.ok(glossary.$('simetrica')); });
glossary.change('glossary-topic','malware');
check('search and theme filters combine', () => assert.equal(glossary.w.document.querySelectorAll('.glossary-entry').length,0));
glossary.click('clear-search'); glossary.change('glossary-topic','malware');
check('glossary topic filter retains relevant entries only', () => { assert.ok(glossary.$('run-key')); assert.equal(glossary.$('cesar'),null); });
glossary.w.location.hash='#base64'; await tick();
check('direct links reveal concepts hidden by a filter', () => { assert.ok(glossary.$('base64')); assert.equal(glossary.$('glossary-topic').value,'all'); });
glossary.change('glossary-topic', 'malware'); glossary.w.location.hash = '#comparar-whois-rdap'; await tick();
check('comparison deep links clear conflicting filters and open both accordion levels', () => {
  assert.equal(glossary.$('glossary-topic').value, 'all'); assert.equal(glossary.$('comparaciones').open, true);
  assert.equal(glossary.$('comparar-whois-rdap').open, true);
});
glossary.$('glossary-search').value = 'sobre smtp'; glossary.$('glossary-search').dispatchEvent(new glossary.w.Event('input'));
check('comparison titles and contents participate in glossary search', () => {
  assert.ok(glossary.$('comparar-sobre-cabeceras-cuerpo')); assert.equal(glossary.$('comparaciones').open, true);
  assert.equal(glossary.$('comparar-whois-rdap'), null);
});
glossary.close();
glossary=await mount('glosario.html',{suffix:'?q=base64&tema=cripto#run-key'});
check('deep link after asynchronous loading takes priority over conflicting filters', () => { assert.ok(glossary.$('run-key')); assert.equal(glossary.$('glossary-search').value,''); });
check('all rendered local links resolve inside the deployment subpath', () => { for(const a of glossary.w.document.querySelectorAll('a[href]')) { const url=new URL(a.href); assert.ok(url.pathname.startsWith('/ic2026/')); } }); glossary.close();
glossary = await mount('glosario.html', { suffix: '?q=base64&tema=malware#comparar-estatico-dinamico' });
check('a comparison permalink opens after asynchronous loading with conflicting URL filters', () => {
  assert.equal(glossary.$('comparar-estatico-dinamico').open, true); assert.equal(glossary.$('comparaciones').open, true);
  assert.equal(glossary.$('glossary-search').value, ''); assert.equal(glossary.$('glossary-topic').value, 'all');
}); glossary.close();
console.log(`PASS: ${checks} comprobaciones de interacción DOM. La revisión visual requiere un navegador real.`);
