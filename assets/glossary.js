import { TOPICS } from './progress.mjs';
const $ = id => document.getElementById(id);
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
let entries, questions, comparisons;
function matchesSearch(text, search) { return search.split(/\s+/).every(word => normalize(text).includes(word)); }
function manualReferences(pages) {
  const refs = el('div', 'entry-references'); refs.append('PROFUNDIZÁ EN EL MANUAL · ');
  for (const page of pages) {
    const a = el('a', 'text-link', `p. ${page} ↗`); a.href = `docs/Manual_IC2026_Cripto_CSIRT_Malware_Descarga.pdf#page=${page}`; a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', `Manual, página ${page} (PDF, nueva pestaña)`); refs.append(a);
  }
  return refs;
}
function renderComparisons(search, topic) {
  const found = comparisons.filter(c => (topic === 'all' || c.topics.includes(topic))
    && matchesSearch([c.title, c.takeaway, c.example, ...c.columns.map(col => col.label), ...c.rows.flatMap(row => [row.aspect, ...row.values])].join(' '), search));
  $('comparaciones').hidden = !found.length;
  $('comparison-count').textContent = found.length;
  const fragment = document.createDocumentFragment();
  for (const c of found) {
    const details = el('details', 'comparison-card'); details.id = c.id;
    const summary = el('summary'); summary.append(el('span', '', c.title), el('span', 'comparison-chevron', '+')); details.append(summary);
    const content = el('div', 'comparison-content');
    const hint = el('p', 'small muted comparison-scroll-note', 'Si la tabla no entra, desplazala horizontalmente. También podés enfocarla con Tab y usar las flechas.'); content.append(hint);
    const scroll = el('div', 'comparison-table-scroll'); scroll.tabIndex = 0; scroll.setAttribute('role', 'region'); scroll.setAttribute('aria-label', `Comparación: ${c.title}`);
    const table = el('table', 'comparison-table'); table.append(el('caption', 'sr-only', c.title));
    const thead = el('thead'); const header = el('tr'); const aspect = el('th', '', 'Aspecto'); aspect.scope = 'col'; header.append(aspect);
    for (const col of c.columns) {
      const th = el('th'); th.scope = 'col'; const link = el('a', '', col.label); link.href = `#${col.conceptId}`; th.append(link); header.append(th);
    }
    thead.append(header); table.append(thead);
    const tbody = el('tbody');
    for (const row of c.rows) {
      const tr = el('tr'); const heading = el('th', '', row.aspect); heading.scope = 'row'; tr.append(heading);
      row.values.forEach(value => tr.append(el('td', '', value))); tbody.append(tr);
    }
    table.append(tbody); scroll.append(table); content.append(scroll, el('p', 'comparison-takeaway', c.takeaway));
    const example = el('div', 'entry-example'); example.append(el('strong', '', 'Por ejemplo'), document.createTextNode(c.example)); content.append(example, manualReferences(c.manualPages));
    const permalink = el('a', 'text-link', 'Enlace directo a esta comparación #'); permalink.href = `#${c.id}`; content.append(permalink);
    details.append(content); fragment.append(details);
  }
  $('comparison-list').replaceChildren(fragment);
  if (search && found.length) $('comparaciones').open = true;
  return found.length;
}
function render() {
  const search = normalize($('glossary-search').value.trim());
  const topic = $('glossary-topic').value;
  const found = entries.filter(e => (topic === 'all' || e.topics.includes(topic)) && matchesSearch([e.term, e.definition, e.explanation, e.example].join(' '), search));
  const comparisonCount = renderComparisons(search, topic);
  $('glossary-count').textContent = `${found.length} de ${entries.length} conceptos · ${comparisonCount} comparaciones${search || topic !== 'all' ? ' con estos filtros' : ' para seguir aprendiendo'}`;
  const fragment = document.createDocumentFragment(); const alphabet = document.createDocumentFragment();
  let previousLetter;
  for (const entry of found) {
    const letter = normalize(entry.term)[0].toUpperCase();
    if (letter !== previousLetter) {
      const h = el('h2', 'letter-heading', letter); h.id = `letra-${letter}`; fragment.append(h);
      const a = el('a', '', letter); a.href = `#letra-${letter}`; a.setAttribute('aria-label', `Ir a la letra ${letter}`); alphabet.append(a); previousLetter = letter;
    }
    const article = el('article', 'glossary-entry'); article.id = entry.id; article.tabIndex = -1;
    const heading = el('div', 'entry-heading'); const title = el('div'); title.append(el('h2', '', entry.term));
    const badges = el('div', 'entry-badges'); entry.topics.forEach(t => badges.append(el('span', `topic-badge ${t}`, TOPICS[t]))); title.append(badges);
    const permalink = el('a', 'entry-link', '#'); permalink.href = `#${entry.id}`; permalink.setAttribute('aria-label', `Enlace directo a ${entry.term}`); permalink.title = 'Enlace directo a este concepto';
    heading.append(title, permalink); article.append(heading, el('p', 'definition', entry.definition), el('p', '', entry.explanation));
    if (entry.example) { const example = el('div', 'entry-example'); example.append(el('strong', '', 'Por ejemplo'), document.createTextNode(entry.example)); article.append(example); }
    const relatedComparisons = comparisons.filter(c => c.conceptIds.includes(entry.id));
    if (relatedComparisons.length) {
      const links = el('div', 'concept-links comparison-links');
      for (const c of relatedComparisons) { const a = el('a', 'concept-link', `Comparar: ${c.title} ↗`); a.href = `#${c.id}`; links.append(a); }
      article.append(links);
    }
    const refs = manualReferences(entry.manualPages);
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
  if (!found.length) { const empty = el('section', 'empty-state'); empty.append(el('h2', '', 'Todavía no encontramos ese concepto'), el('p', '', 'Probá con menos palabras o cambiá el filtro de tema.')); fragment.append(empty); }
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
  const comparison = comparisons.some(c => c.id === id);
  if (((entries.some(e => e.id === id) || comparison) && !$(id)) || (id === 'comparaciones' && $('comparaciones').hidden)) {
    $('glossary-search').value = ''; $('glossary-topic').value = 'all'; render();
  }
  const target = $(id);
  if (!target) return;
  if (comparison || id === 'comparaciones') $('comparaciones').open = true;
  if (comparison) target.open = true;
  target.scrollIntoView({ block: 'start' });
  if (target.matches('article')) target.focus({ preventScroll: true });
  else if (target.matches('details')) target.querySelector('summary').focus({ preventScroll: true });
}
document.querySelectorAll('[data-materials]').forEach(b => b.addEventListener('click', () => $('materials-dialog').showModal()));
document.querySelector('[data-close]').addEventListener('click', () => $('materials-dialog').close());
try {
  const responses = await Promise.all([fetch('data/glossary.json'), fetch('data/questions.json'), fetch('data/comparisons.json')]);
  if (responses.some(r => !r.ok)) throw new Error('No se pudieron cargar los conceptos.');
  const [glossary, bank, comparisonsBank] = await Promise.all(responses.map(r => r.json()));
  if (comparisonsBank.version !== 1 || !comparisonsBank.comparisons?.length) throw new Error('No se pudieron cargar las comparaciones.');
  entries = glossary.entries.sort((a, b) => a.term.localeCompare(b.term, 'es')); questions = bank.questions; comparisons = comparisonsBank.comparisons;
  const params = new URL(location.href).searchParams;
  $('glossary-search').value = params.get('q') ?? '';
  $('glossary-topic').value = Object.hasOwn(TOPICS, params.get('tema')) ? params.get('tema') : 'all';
  $('glossary-search').addEventListener('input', render); $('glossary-topic').addEventListener('change', render);
  $('clear-search').addEventListener('click', () => { $('glossary-search').value = ''; $('glossary-topic').value = 'all'; history.replaceState(null, '', location.pathname); render(); $('glossary-search').focus(); });
  window.addEventListener('hashchange', showHash); render(); showHash();
} catch (error) {
  $('glossary-count').textContent = 'No se pudo cargar el glosario.';
  $('glossary-entries').replaceChildren(el('p', 'error-card', `${error.message} Abrí la aplicación desde un servidor estático o GitHub Pages. Podés consultar el glosario original en las páginas 51–52 del manual.`));
}
