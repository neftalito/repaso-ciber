import { TOPICS } from './progress.mjs';
const $ = id => document.getElementById(id);
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
let entries, questions;
function render() {
  const search = normalize($('glossary-search').value.trim());
  const topic = $('glossary-topic').value;
  const found = entries.filter(e => (topic === 'all' || e.topics.includes(topic)) && search.split(/\s+/).every(word => normalize([e.term, e.definition, e.explanation, e.example].join(' ')).includes(word)));
  $('glossary-count').textContent = `${found.length} de ${entries.length} conceptos${search || topic !== 'all' ? ' coinciden con tu búsqueda' : ' para seguir aprendiendo'}`;
  const fragment = document.createDocumentFragment();
  const alphabet = document.createDocumentFragment();
  let previousLetter;
  for (const entry of found) {
    const letter = normalize(entry.term)[0].toUpperCase();
    if (letter !== previousLetter) {
      const h = el('h2', 'letter-heading', letter); h.id = `letra-${letter}`; fragment.append(h);
      const a = el('a', '', letter); a.href = `#letra-${letter}`; a.setAttribute('aria-label', `Ir a la letra ${letter}`); alphabet.append(a);
      previousLetter = letter;
    }
    const article = el('article', 'glossary-entry'); article.id = entry.id; article.tabIndex = -1;
    const heading = el('div', 'entry-heading');
    const title = el('div'); title.append(el('h2', '', entry.term));
    const badges = el('div', 'entry-badges'); entry.topics.forEach(t => badges.append(el('span', `topic-badge ${t}`, TOPICS[t]))); title.append(badges);
    const permalink = el('a', 'entry-link', '#'); permalink.href = `#${entry.id}`; permalink.setAttribute('aria-label', `Enlace directo a ${entry.term}`); permalink.title = 'Enlace directo a este concepto';
    heading.append(title, permalink); article.append(heading, el('p', 'definition', entry.definition), el('p', '', entry.explanation));
    if (entry.example) { const example = el('div', 'entry-example'); example.append(el('strong', '', 'Por ejemplo'), document.createTextNode(entry.example)); article.append(example); }
    const refs = el('div', 'entry-references'); refs.append('PROFUNDIZÁ EN EL MANUAL · ');
    for (const page of entry.manualPages) {
      const a = el('a', 'text-link', `p. ${page} ↗`); a.href = `docs/Manual_IC2026_Cripto_CSIRT_Malware_Descarga.pdf#page=${page}`; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', `Manual, página ${page} (PDF, nueva pestaña)`); refs.append(a);
    }
    if (entry.referenceNote) refs.append(el('span', 'reference-note', entry.referenceNote));
    article.append(refs, el('span', 'origin-label', entry.fromManualGlossary ? 'Concepto del glosario original · definición ampliada para estudiar' : 'Ampliación del glosario · elaboración didáctica'));
    const related = questions.filter(q => q.conceptIds.includes(entry.id));
    if (related.length) {
      const details = el('details', 'question-history'); details.append(el('summary', '', `Practicar preguntas relacionadas (${related.length})`));
      const links = el('div', 'concept-links');
      related.forEach(q => { const a = el('a', 'concept-link', `Pregunta ${String(q.id).padStart(3, '0')}`); a.href = `index.html?pregunta=${q.id}`; links.append(a); });
      details.append(links); article.append(details);
    }
    fragment.append(article);
  }
  if (!found.length) {
    const empty = el('section', 'empty-state'); empty.append(el('h2', '', 'Todavía no encontramos ese concepto'), el('p', '', 'Probá con menos palabras o cambiá el filtro de tema.')); fragment.append(empty);
  }
  $('glossary-entries').replaceChildren(fragment); $('alphabet').replaceChildren(alphabet);
  const url = new URL(location.href);
  if ($('glossary-search').value) url.searchParams.set('q', $('glossary-search').value); else url.searchParams.delete('q');
  if (topic !== 'all') url.searchParams.set('tema', topic); else url.searchParams.delete('tema');
  history.replaceState(null, '', url);
}
function showHash() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  if (!id) return;
  if (entries.some(e => e.id === id) && !$(id)) { $('glossary-search').value = ''; $('glossary-topic').value = 'all'; render(); }
  const target = $(id);
  if (target) { target.scrollIntoView({ block: 'start' }); if (target.matches('article')) target.focus({ preventScroll: true }); }
}
document.querySelectorAll('[data-materials]').forEach(b => b.addEventListener('click', () => $('materials-dialog').showModal()));
document.querySelector('[data-close]').addEventListener('click', () => $('materials-dialog').close());
try {
  const responses = await Promise.all([fetch('data/glossary.json'), fetch('data/questions.json')]);
  if (responses.some(r => !r.ok)) throw new Error('No se pudieron cargar los conceptos.');
  const [glossary, bank] = await Promise.all(responses.map(r => r.json()));
  entries = glossary.entries.sort((a, b) => a.term.localeCompare(b.term, 'es'));
  questions = bank.questions;
  const params = new URL(location.href).searchParams;
  $('glossary-search').value = params.get('q') ?? '';
  $('glossary-topic').value = Object.hasOwn(TOPICS, params.get('tema')) ? params.get('tema') : 'all';
  $('glossary-search').addEventListener('input', render);
  $('glossary-topic').addEventListener('change', render);
  $('clear-search').addEventListener('click', () => { $('glossary-search').value = ''; $('glossary-topic').value = 'all'; history.replaceState(null, '', location.pathname); render(); $('glossary-search').focus(); });
  window.addEventListener('hashchange', showHash);
  render(); showHash();
} catch (error) {
  $('glossary-count').textContent = 'No se pudo cargar el glosario.';
  $('glossary-entries').replaceChildren(el('p', 'error-card', `${error.message} Abrí la aplicación desde un servidor estático o GitHub Pages. Podés consultar el glosario original en las páginas 51–52 del manual.`));
}
