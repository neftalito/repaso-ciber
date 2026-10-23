/* Runs the actual browser modules in a DOM, without networking or a display.
   This verifies interactions, not CSS layout or native browser keyboard behavior. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SourceTextModule } from 'node:vm';
const { JSDOM } = await import(process.env.JSDOM_MODULE || 'jsdom');
const root = new URL('../', import.meta.url);
const key = 'ic2026.progress.v1';
const originalQuestions = JSON.parse(await readFile(new URL('data/questions.json', root), 'utf8')).questions;
const practiceQuestions = JSON.parse(await readFile(new URL('data/practice-questions.json', root), 'utf8')).questions;
const examQuestions=JSON.parse(await readFile(new URL('data/exam-questions.json',root),'utf8')).questions;
const practiceNotes = JSON.parse(await readFile(new URL('data/practice-option-explanations.json', root), 'utf8')).questions;
const glossaryEntries = JSON.parse(await readFile(new URL('data/glossary.json', root), 'utf8')).entries;
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
check('theory origin badge and total progress reflect the complete bank', () => {
  assert.equal(app.$('question-origin').textContent,'Teoría'); assert.equal(app.$('origin-filter').value,'all');
  assert.equal(app.$('overall-progress').max,562); assert.equal(app.$('total-questions').textContent,'562');
  assert.equal(app.$('practice-context').hidden,true); assert.equal(app.$('question-code').hidden,true);
  assert.equal(app.$('materials-dialog').querySelectorAll('.document-links a').length,9);
});
check('initial app loads all 562 questions and leaves correction hidden', () => { assert.equal(app.$('study-layout').hidden, false); assert.equal(app.w.document.querySelectorAll('[data-question]').length, 562); assert.equal(app.$('confirm-answer').disabled, true); assert.equal(app.$('feedback').hidden, true); assert.equal(app.$('hint-panel').hidden, true); });
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
check('pending filter excludes question answered correctly', () => { assert.equal(app.w.document.querySelectorAll('[data-question]').length, 561); assert.match(app.$('question-position').textContent, /002/); });
app.change('topic-filter','malware');
check('combined topic filter shows 167 pending Malware questions', () => { assert.equal(app.w.document.querySelectorAll('[data-question]').length, 167); assert.match(app.$('question-position').textContent, /227/); });
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
app=await mount('index.html',{suffix:'?pregunta=562'});
check('question links work under a GitHub Pages subpath', () => { assert.match(app.$('question-position').textContent,/562/); assert.deepEqual(app.requests,['/ic2026/data/questions.json','/ic2026/data/glossary.json','/ic2026/data/option-explanations.json','/ic2026/data/practice-questions.json','/ic2026/data/practice-option-explanations.json','/ic2026/data/exam-questions.json','/ic2026/data/exam-option-explanations.json']); });
app.select(practiceQuestions.at(-1).answer); app.submit();
check('both next buttons stop at the end of the route while retry remains available', () => {
  assert.equal(app.$('next-question-inline').disabled, true); assert.equal(app.$('next-question').disabled, true);
  assert.equal(app.$('retry-answer').hidden, false);
}); app.close();
app=await mount('index.html',{failFetch:true});
check('data loading failure offers the original materials', () => { assert.match(app.$('load-status').textContent,/servidor estático/); app.w.document.querySelector('[data-materials]').click(); assert.equal(app.$('materials-dialog').open,true); }); app.close();
app = await mount(); app.change('origin-filter','practice'); app.change('bank-filter','guides');
check('practice filter selects 92 exercises and shows badge, source number and adaptation', () => {
  assert.equal(app.w.document.querySelectorAll('[data-question]').length,92);
  assert.equal(app.$('question-origin').textContent,'Práctica'); assert.match(app.$('question-position').textContent,/351 de 562/);
  assert.match(app.$('practice-context').textContent,/Ejercicio original 01/);
  assert.match(app.$('question-source').querySelector('a').href,/IC2026_Preguntas_Basadas_en_Practicas_1_y_2.pdf#page=2$/);
});
app.change('topic-filter','csirt');
check('origin and topic combine and topic counters reflect that origin', () => {
  assert.equal(app.w.document.querySelectorAll('[data-question]').length,29);
  assert.match(app.$('question-position').textContent,/391/);
  assert.match(app.$('topic-filter').querySelector('[value="cripto"]').textContent,/40/);
});
const practiceMemory = app.memory; app.close(); app = await mount('index.html',{memory:practiceMemory});
check('origin filter and reading position survive reload', () => {
  assert.equal(app.$('origin-filter').value,'practice'); assert.equal(app.$('topic-filter').value,'csirt');
  assert.match(app.$('question-position').textContent,/391/);
});
app.click('reset-filters'); app.change('origin-filter','theory');
check('theory filter has the original 350 questions and reset clears origin too', () => {
  assert.equal(app.w.document.querySelectorAll('[data-question]').length,350);
  assert.equal(app.$('question-origin').textContent,'Teoría');
});
app.click('reset-filters');
check('reset returns to all 562 questions', () => {
  assert.equal(app.$('origin-filter').value,'all'); assert.equal(app.w.document.querySelectorAll('[data-question]').length,562);
}); app.close();
app = await mount('index.html',{suffix:'?pregunta=382'});
check('practice data blocks preserve command newlines and have correct document references', () => {
  assert.equal(app.$('question-code').hidden,false); assert.equal(app.$('question-code').textContent,practiceQuestions[31].code);
  assert.match(app.$('question-code').textContent,/steghide info imagen.jpg\nsteghide extract/);
});
const wrong = Object.keys(practiceQuestions[31].options).find(letter=>letter!==practiceQuestions[31].answer);
app.select(wrong); app.submit();
check('wrong practice choice opens its own explanation and conceptual help with guide references', () => {
  assert.equal(app.state().attempts[0].questionId,382); assert.equal(app.state().attempts[0].correct,false);
  assert.equal(app.$('hint-panel').hidden,false);
  const selected = app.w.document.querySelector(`details[data-option="${wrong}"]`);
  assert.equal(selected.open,true); assert.ok(selected.textContent.includes(practiceNotes[31].distractors[wrong]));
  assert.match(selected.querySelector('.option-reference a').href,/Guia_de_estudio_IC_Practicas_1_y_2.pdf#page=7$/);
  const correct = app.w.document.querySelector(`details[data-option="${practiceQuestions[31].answer}"]`);
  assert.ok(correct.textContent.includes(practiceQuestions[31].explanation));
  assert.match(correct.querySelector('.option-reference a').href,/IC2026_Solucionario_Practicas_1_y_2.pdf#page=8$/);
  assert.ok(app.$('hint-content').querySelector('a[href*="Guia_de_estudio"]'));
  assert.equal(app.w.document.querySelectorAll('a[href*="#page=undefined"]').length,0);
});
app.click('retry-answer');
check('practice retry hides explanations and retains the original attempt', () => {
  assert.equal(app.w.document.querySelectorAll('.option-explanation').length,0); assert.equal(app.state().attempts.length,1);
}); app.close();
const legacyAttempt = {id:'legacy-test',questionId:350,option:originalQuestions[349].answer,correct:true,date:'2026-10-21T12:00:00.000Z',hintUsed:false};
const legacy = {format:'ic2026-progress',version:1,attempts:[legacyAttempt],drafts:{},view:{questionId:350,topic:'all',status:'all'}};
app = await mount('index.html',{memory:new Map([[key,JSON.stringify(legacy)]])});
check('old saved progress loads without warnings and can cross the theory/practice boundary', () => {
  assert.equal(app.$('storage-warning').hidden,true); assert.equal(app.$('answered-count').textContent,'1');
  assert.equal(app.$('origin-filter').value,'all'); assert.match(app.$('question-position').textContent,/350/);
});
app.click('next-question');
check('navigation after old final question reaches the first practice without losing history', () => {
  assert.match(app.$('question-position').textContent,/351/); assert.equal(app.$('question-origin').textContent,'Práctica');
  assert.equal(app.state().attempts[0].id,'legacy-test');
}); app.close();
let glossary=await mount('glosario.html');
check('EDR has an explicit meaning, official source and a link to the question that uses it', () => {
  const entry=glossary.$('edr'); assert.ok(entry);
  assert.match(entry.querySelector('.acronym-list').textContent,/Endpoint Detection and Response/);
  assert.ok(entry.querySelector('a[href="index.html?pregunta=89"]'));
  assert.ok(entry.querySelector('.acronym-sources a[href^="https://learn.microsoft.com/"]'));
});
glossary.$('glossary-search').value='endpoint detection response'; glossary.$('glossary-search').dispatchEvent(new glossary.w.Event('input'));
check('glossary search finds the expanded English meaning', () => {
  assert.ok(glossary.$('edr')); assert.equal(glossary.w.document.querySelectorAll('.glossary-entry').length,1);
});
glossary.$('glossary-search').value='SHA256'; glossary.$('glossary-search').dispatchEvent(new glossary.w.Event('input'));
check('acronym aliases resolve to their canonical glossary entry', () => assert.ok(glossary.$('sha-256')));
glossary.click('clear-search');
check('new glossary concepts cite the practice guide and link to relevant practical exercises', () => {
  const rsa = glossary.$('rsa'); assert.ok(rsa);
  assert.equal(rsa.querySelector('.entry-references a').getAttribute('href'),'docs/Guia_de_estudio_IC_Practicas_1_y_2.pdf#page=5');
  assert.ok(rsa.querySelector('a[href="index.html?pregunta=376"]'));
  assert.match(rsa.querySelector('a[href="index.html?pregunta=376"]').textContent,/Práctica/);
  const ids = new Set([...glossary.w.document.querySelectorAll('[id]')].map(n=>n.id));
  for (const entry of glossaryEntries.filter(e=>e.practicePages?.length && !e.manualPages.length)) assert.ok(ids.has(entry.id));
});
check('ASCII reference starts closed, contains all 52 letters and is linked from its concept', () => {
  assert.equal(glossary.$('tabla-ascii').open, false);
  const rows = [...glossary.w.document.querySelectorAll('.ascii-table tbody tr')];
  assert.equal(rows.length, 52);
  assert.deepEqual(rows[0].textContent, 'A650x41'); assert.deepEqual(rows[25].textContent, 'Z900x5A');
  assert.deepEqual(rows[26].textContent, 'a970x61'); assert.deepEqual(rows[51].textContent, 'z1220x7A');
  assert.equal(glossary.$('ascii').querySelector('.ascii-entry-link').getAttribute('href'), '#tabla-ascii');
});
check('glossary renders all entries with unique direct links', () => { assert.equal(glossary.w.document.querySelectorAll('.glossary-entry').length,glossaryEntries.length); assert.equal(new Set([...glossary.w.document.querySelectorAll('.glossary-entry')].map(n=>n.id)).size,glossaryEntries.length); });
check('the glossary includes fourteen comparison tables, initially collapsed', () => {
  assert.equal(glossary.w.document.querySelectorAll('.comparison-card').length, 14);
  assert.equal(glossary.w.document.querySelectorAll('.comparison-card[open]').length, 0);
  assert.equal(glossary.$('comparaciones').open, false);
  assert.equal(glossary.w.document.querySelectorAll('.comparison-table').length, 14);
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
glossary.$('glossary-search').value = '0x41'; glossary.$('glossary-search').dispatchEvent(new glossary.w.Event('input'));
check('ASCII decimal and hexadecimal values participate in glossary search', () => {
  assert.equal(glossary.$('tabla-ascii').hidden, false); assert.equal(glossary.$('tabla-ascii').open, true);
});
glossary.change('glossary-topic', 'csirt');
check('ASCII reference follows theme filters', () => assert.equal(glossary.$('tabla-ascii').hidden, true));
glossary.w.location.hash = '#tabla-ascii'; await tick();
check('ASCII permalink clears conflicting filters and opens the table', () => {
  assert.equal(glossary.$('glossary-search').value, ''); assert.equal(glossary.$('glossary-topic').value, 'all');
  assert.equal(glossary.$('tabla-ascii').hidden, false); assert.equal(glossary.$('tabla-ascii').open, true);
  assert.equal(glossary.w.document.activeElement, glossary.$('tabla-ascii').querySelector('summary'));
});
glossary.close();
glossary=await mount('glosario.html',{suffix:'?q=base64&tema=cripto#run-key'});
check('deep link after asynchronous loading takes priority over conflicting filters', () => { assert.ok(glossary.$('run-key')); assert.equal(glossary.$('glossary-search').value,''); });
check('all rendered local links resolve inside the deployment subpath', () => { for(const a of glossary.w.document.querySelectorAll('a[href]')) { const url=new URL(a.href); if(url.origin===glossary.w.location.origin) assert.ok(url.pathname.startsWith('/ic2026/')); else { assert.equal(url.protocol,'https:'); assert.equal(a.target,'_blank'); assert.equal(a.rel,'noopener'); } } }); glossary.close();
glossary = await mount('glosario.html', { suffix: '?q=base64&tema=malware#comparar-estatico-dinamico' });
check('a comparison permalink opens after asynchronous loading with conflicting URL filters', () => {
  assert.equal(glossary.$('comparar-estatico-dinamico').open, true); assert.equal(glossary.$('comparaciones').open, true);
  assert.equal(glossary.$('glossary-search').value, ''); assert.equal(glossary.$('glossary-topic').value, 'all');
}); glossary.close();
glossary = await mount('glosario.html', { suffix: '?q=base64&tema=csirt#tabla-ascii' });
check('ASCII URL opens after loading even when URL search and topic conflict', () => {
  assert.equal(glossary.$('tabla-ascii').open, true); assert.equal(glossary.$('tabla-ascii').hidden, false);
  assert.equal(glossary.$('glossary-search').value, ''); assert.equal(glossary.$('glossary-topic').value, 'all');
}); glossary.close();
glossary = await mount('glosario.html',{suffix:'?q=base64&tema=cripto#edr'});
check('a new acronym permalink reveals its entry despite incompatible URL filters', () => {
  assert.ok(glossary.$('edr')); assert.equal(glossary.$('glossary-search').value,'');
  assert.equal(glossary.$('glossary-topic').value,'all'); assert.equal(glossary.w.document.activeElement,glossary.$('edr'));
}); glossary.close();
// Exercise a fresh study route over questions with an existing history.
const studyOldAttempts=practiceQuestions.filter(q=>q.topic==='csirt').map(q=>({
  id:`previous-${q.id}`,questionId:q.id,option:q.answer,correct:true,date:'2026-10-21T12:00:00.000Z',hintUsed:false
}));
const studyPreviousView={questionId:391,topic:'csirt',origin:'practice',status:'correct',bank:'guides'};
const studyMemory=new Map([[key,JSON.stringify({format:'ic2026-progress',version:1,attempts:studyOldAttempts,drafts:{},view:studyPreviousView})]]);
app=await mount('index.html',{memory:studyMemory}); app.click('open-study');
const submitStudy=()=>app.$('study-form').dispatchEvent(new app.w.Event('submit',{bubbles:true,cancelable:true}));
check('study setup inherits topic and origin and reports the matching pool size',()=>{
  assert.equal(app.$('study-dialog').open,true); assert.equal(app.$('study-topic').value,'csirt');
  assert.equal(app.$('study-origin').value,'practice'); assert.equal(app.$('study-count').max,'29');
  assert.match(app.$('study-available').textContent,/29 preguntas/);
});
const beforeStudy=JSON.stringify(app.state());
check('invalid study counts show an accessible error without changing saved progress',()=>{
  for(const value of ['30','0','1.5','']) { app.$('study-count').value=value; submitStudy();
    assert.equal(app.$('study-error').hidden,false); assert.equal(app.$('study-count').getAttribute('aria-invalid'),'true');
    assert.equal(app.$('study-dialog').open,true); assert.equal(JSON.stringify(app.state()),beforeStudy);
  }
});
app.$('study-dialog').querySelector('[data-close]').click();
check('closing study setup leaves the current history and filters untouched',()=>{
  assert.equal(app.$('study-dialog').open,false); assert.equal(JSON.stringify(app.state()),beforeStudy);
});
app.click('open-study'); app.$('study-count').value='2'; submitStudy();
let studyRoute=app.state().studySession.questionIds;
check('study starts a filtered draw without repeats and hides old solutions while keeping history',()=>{
  assert.equal(app.$('study-dialog').open,false); assert.equal(app.$('study-session').hidden,false);
  assert.equal(studyRoute.length,2); assert.equal(new Set(studyRoute).size,2);
  assert.ok(studyRoute.every(id=>practiceQuestions.find(q=>q.id===id)?.topic==='csirt'));
  assert.equal(app.state().attempts.length,29); assert.equal(app.$('feedback').hidden,true);
  assert.equal(app.w.document.querySelectorAll('.option-explanation').length,0);
  assert.equal(app.$('study-session-progress').value,0);
  assert.equal(app.$('question-index').querySelectorAll('.pending').length,2);
});
check('study index preserves shuffled order and temporarily replaces ordinary filters',()=>{
  assert.deepEqual([...app.$('question-index').querySelectorAll('[data-question]')].map(n=>Number(n.dataset.question)),studyRoute);
  assert.equal(app.$('origin-filter').closest('.filter-field').hidden,true);
  assert.equal(app.$('status-filter').closest('.filter-field').hidden,true);
  assert.equal(app.$('reset-filters').hidden,true); assert.match(app.$('filtered-position').textContent,/1 de 2/);
});
const firstStudyQ=practiceQuestions.find(q=>q.id===studyRoute[0]);
app.click('show-hint'); app.select(Object.keys(firstStudyQ.options).find(k=>k!==firstStudyQ.answer)); app.submit();
check('study confirmation records help and a result for this route independently of old answers',()=>{
  assert.equal(app.state().attempts.length,30); assert.equal(app.$('study-session-progress').value,1);
  assert.match(app.$('study-session-status').textContent,/1 de 2 respondidas · 0 correctas · 1 falladas · 1 con pista/);
  assert.equal(app.w.document.querySelectorAll('#answer-options details[open]').length,1);
});
app.click('next-question-inline');
check('both study navigation buttons follow the draw rather than question numbering',()=>{
  assert.equal(app.state().view.questionId,studyRoute[1]); assert.equal(app.$('feedback').hidden,true);
  assert.equal(app.$('next-question').disabled,true); assert.equal(app.$('previous-question').disabled,false);
  app.w.document.dispatchEvent(new app.w.KeyboardEvent('keydown',{key:'ArrowLeft',altKey:true,bubbles:true}));
  assert.equal(app.state().view.questionId,studyRoute[0]);
  assert.equal(app.w.document.querySelectorAll('#answer-options details[open]').length,0);
  app.click('next-question'); assert.equal(app.state().view.questionId,studyRoute[1]);
});
app.select(practiceQuestions.find(q=>q.id===studyRoute[1]).answer); app.submit();
check('finishing a study route shows its own totals without counting the older history',()=>{
  assert.match(app.$('study-session-title').textContent,/completado/); assert.equal(app.$('study-session-progress').value,2);
  assert.match(app.$('study-session-status').textContent,/2 de 2 respondidas · 1 correctas · 1 falladas · 1 con pista/);
  assert.equal(app.$('next-question-inline').disabled,true); assert.equal(app.state().attempts.length,31);
});
app.close(); app=await mount('index.html',{memory:studyMemory});
check('reload restores study order, current question and completed results with accordions closed',()=>{
  assert.deepEqual(app.state().studySession.questionIds,studyRoute); assert.equal(app.state().view.questionId,studyRoute[1]);
  assert.match(app.$('study-session-title').textContent,/completado/);
  assert.equal(app.w.document.querySelectorAll('#answer-options details[open]').length,0);
});
app.click('retry-answer');
check('retrying within study clears only that route result until another answer is confirmed',()=>{
  assert.equal(app.$('study-session-progress').value,1); assert.equal(app.$('feedback').hidden,true);
  assert.equal(app.state().attempts.length,31); assert.equal(app.state().studySession.answers[studyRoute[1]],undefined);
});
app.select(practiceQuestions.find(q=>q.id===studyRoute[1]).answer); app.submit();
app.click('manage-progress'); app.click('export-progress');
const studyReader=new app.w.FileReader();
const studyExport=await new Promise(resolve=>{studyReader.onload=()=>resolve(studyReader.result);studyReader.readAsText(app.downloads[0]);});
const badStudy=JSON.parse(studyExport); badStudy.studySession.questionIds[1]=badStudy.studySession.questionIds[0];
await app.importData(JSON.stringify(badStudy));
check('an invalid imported study draw is rejected without confirmation or changing the active route',()=>{
  assert.match(app.$('transfer-status').textContent,/repetidas/); assert.equal(app.confirmations.length,0);
  assert.deepEqual(app.state().studySession.questionIds,studyRoute);
});
app.click('reset-progress'); await app.importData(studyExport);
check('export and confirmed import restore the complete study route along with all previous attempts',()=>{
  assert.equal(app.confirmations.length,2); assert.equal(app.$('study-session').hidden,false);
  assert.deepEqual(app.state().studySession.questionIds,studyRoute); assert.equal(app.state().attempts.length,32);
});
app.$('progress-dialog').querySelector('[data-close]').click(); app.click('new-study');
const activeStudyBefore=JSON.stringify(app.state());
app.$('study-dialog').querySelector('[data-close]').click();
check('cancelling a replacement study keeps the active route and its results',()=>{
  assert.equal(JSON.stringify(app.state()),activeStudyBefore);
});
app.click('new-study'); app.change('study-topic','malware'); app.change('study-origin','practice');
app.$('study-count').value='1'; submitStudy();
check('a new draw can change filters and quantity while retaining attempts and the original reading view',()=>{
  assert.equal(app.state().studySession.questionIds.length,1);
  assert.deepEqual(app.state().studySession.previousView,studyPreviousView);
  assert.equal(app.state().attempts.length,32); assert.match(app.$('study-session-filters').textContent,/Malware · Práctica/);
});
app.click('end-study');
check('leaving study restores ordinary navigation and the filters used before starting',()=>{
  assert.equal(app.$('study-session').hidden,true); assert.equal(app.state().studySession,undefined);
  assert.deepEqual(app.state().view,studyPreviousView); assert.equal(app.state().attempts.length,32);
  assert.equal(app.$('origin-filter').closest('.filter-field').hidden,false);
  assert.equal(app.$('origin-filter').value,'practice'); assert.equal(app.$('status-filter').value,'correct');
});
app.click('open-study'); app.$('study-count').value='1'; submitStudy(); app.close();
app=await mount('index.html',{memory:studyMemory,suffix:'?pregunta=1'});
check('a glossary question link exits study and opens the requested question in ordinary practice',()=>{
  assert.equal(app.state().studySession,undefined); assert.equal(app.state().view.questionId,1);
  assert.equal(app.$('study-session').hidden,true); assert.equal(app.state().attempts.length,32);
}); app.close();
app=await mount('index.html',{blocked:true}); app.click('open-study'); app.$('study-count').value='1'; submitStudy();
app.select('A'); app.submit();
check('study remains usable with blocked storage and advertises export for preserving the session',()=>{
  assert.equal(app.$('study-session-progress').value,1); assert.match(app.$('study-session-title').textContent,/completado/);
  assert.equal(app.$('storage-warning').hidden,false); assert.match(app.$('storage-warning').textContent,/exportá/i);
}); app.close();
const oldLastAttempt={id:'before-new-pdfs',questionId:442,option:practiceQuestions.at(-1).answer,correct:true,date:'2026-10-22T12:00:00.000Z',hintUsed:false};
const oldEndMemory=new Map([[key,JSON.stringify({format:'ic2026-progress',version:1,attempts:[oldLastAttempt],drafts:{},view:{questionId:442,topic:'all',status:'all',origin:'all'}})]]);
app=await mount('index.html',{memory:oldEndMemory});app.click('next-question-inline');
check('a reader at the old final question can continue into question 443 with history intact',()=>{
  assert.equal(app.state().view.questionId,443);assert.equal(app.state().attempts.length,1);
  assert.equal(app.$('answer-options').querySelectorAll('input').length,4);assert.equal(app.$('feedback').hidden,true);
});app.close();
app=await mount(); app.change('bank-filter','exam');
check('the partial collection selects 120 practice questions and preserves the four original choices',()=>{
  assert.equal(app.$('origin-filter').value,'practice');assert.equal(app.w.document.querySelectorAll('[data-question]').length,120);
  assert.match(app.$('question-position').textContent,/443 de 562/);assert.equal(app.$('question-collection').hidden,false);
  assert.match(app.$('practice-context').textContent,/Pregunta original 001/);assert.match(app.$('practice-context').textContent,/Cuatro opciones originales/);
  assert.equal(app.$('answer-options').querySelectorAll('input').length,4);assert.equal(app.$('answer-options').querySelector('input[value="E"]'),null);
  assert.match(app.$('question-source').querySelector('a').href,/Parcial_IC_Preguntas_Multiple_Choice.pdf#page=2$/);
  assert.equal(app.$('feedback').hidden,true);
});
app.select('A');app.submit();
check('a wrong partial answer opens its reviewed explanation and links the correct choice to the new solution PDF',()=>{
  assert.equal(app.$('answer-options').querySelectorAll('details').length,4);
  assert.equal(app.$('answer-options').querySelectorAll('details[open]').length,1);
  assert.equal(app.$('answer-options').querySelector('details[open]').dataset.option,'A');
  assert.match(app.$('answer-options').querySelector('[data-option="A"] .option-explanation').textContent,/cualquiera puede decodificar/);
  assert.match(app.$('answer-options').querySelector('[data-option="B"] .option-reference a').href,/Parcial_IC_Solucionario_Razonado.pdf#page=2$/);
  assert.equal(app.$('hint-panel').hidden,false);assert.equal(app.state().attempts[0].questionId,443);
});
app.click('retry-answer');app.click('show-hint');app.select('B');app.submit();
const examMemory=app.memory;app.close();app=await mount('index.html',{memory:examMemory});
check('partial retry, help, source filter and correction survive reload without losing earlier attempts',()=>{
  assert.equal(app.state().attempts.length,2);assert.equal(app.state().attempts[1].hintUsed,true);
  assert.equal(app.$('bank-filter').value,'exam');assert.equal(app.$('correct-count').textContent,'1');
  assert.equal(app.$('answer-options').querySelectorAll('details[open]').length,0);
});
app.change('bank-filter','theory');
check('switching collection restores five-choice questions and synchronizes the origin filter',()=>{
  assert.equal(app.$('origin-filter').value,'theory');assert.equal(app.w.document.querySelectorAll('[data-question]').length,350);
  assert.equal(app.$('answer-options').querySelectorAll('input').length,5);assert.equal(app.$('question-collection').hidden,true);
});
app.change('bank-filter','exam');app.click('open-study');app.change('study-topic','cripto');
check('study setup can select only the partial bank and limits quantity to the matching sixty cryptography questions',()=>{
  assert.equal(app.$('study-bank').value,'exam');assert.equal(app.$('study-count').max,'60');
  assert.match(app.$('study-available').textContent,/60 preguntas/);
});
app.$('study-count').value='8';app.$('study-form').dispatchEvent(new app.w.Event('submit',{bubbles:true,cancelable:true}));
check('partial study draws unique original four-choice questions and identifies the selected collection',()=>{
  const state=app.state();assert.equal(state.studySession.bank,'exam');assert.equal(state.studySession.questionIds.length,8);
  assert.equal(new Set(state.studySession.questionIds).size,8);assert.ok(state.studySession.questionIds.every(id=>id>=443&&id<=502));
  assert.equal(app.$('answer-options').querySelectorAll('input').length,4);assert.match(app.$('study-session-filters').textContent,/Banco del parcial/);
});
const examStudyMemory=app.memory;app.close();app=await mount('index.html',{memory:examStudyMemory});
check('an active partial study route reloads with its source, order and hidden solutions intact',()=>{
  assert.equal(app.state().studySession.bank,'exam');assert.equal(app.$('feedback').hidden,true);
  assert.equal(app.$('question-index').querySelectorAll('[data-question]').length,8);assert.equal(app.$('storage-warning').hidden,true);
});
app.click('manage-progress');const invalidCollection=app.state();invalidCollection.view.bank='unknown';
await app.importData(JSON.stringify(invalidCollection));
check('an unknown imported collection is rejected before asking to replace progress',()=>{
  assert.match(app.$('transfer-status').textContent,/colección desconocida/);assert.equal(app.confirmations.length,0);
  assert.equal(app.state().view.bank,'exam');
});app.close();
app=await mount('index.html',{suffix:'?pregunta=489'});app.click('show-hint');
check('a DH hint cites the new guide without revealing the numeric answer before confirmation',()=>{
  assert.ok(app.$('hint-content').querySelector('a[href="docs/Guia_Diffie_Hellman_y_RSA.pdf#page=3"]'));
  assert.doesNotMatch(app.$('hint-content').textContent,/A=8|A = 8|5\^6 mod 23 = 8/);
  assert.equal(app.$('feedback').hidden,true);assert.equal(app.$('answer-options').querySelectorAll('details').length,0);
});app.close();
glossary=await mount('glosario.html',{suffix:'#comparar-diffie-hellman-rsa'});
check('the new comparison opens directly and links to the specific DH/RSA guide pages',()=>{
  assert.equal(glossary.$('comparar-diffie-hellman-rsa').open,true);
  assert.ok(glossary.$('comparar-diffie-hellman-rsa').querySelector('a[href="docs/Guia_Diffie_Hellman_y_RSA.pdf#page=9"]'));
});
check('new glossary entries expose definitions, source pages and question links for the partial bank',()=>{
  assert.ok(glossary.$('rsa-padding'));assert.ok(glossary.$('ntfs'));assert.ok(glossary.$('powershell-codificado'));
  assert.ok(glossary.$('rsa').querySelector('a[href="index.html?pregunta=483"]'));
  assert.ok(glossary.$('rsa').querySelector('a[href="docs/Guia_Diffie_Hellman_y_RSA.pdf#page=5"]'));
  assert.match(glossary.$('kdf').querySelector('.acronym-list').textContent,/HKDF/);
  assert.equal(glossary.$('materials-dialog').querySelectorAll('.document-links a').length,9);
});glossary.close();
console.log(`PASS: ${checks} comprobaciones de interacción DOM. La revisión visual requiere un navegador real.`);
