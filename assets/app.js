import { STORAGE_KEY, TOPICS, emptyProgress, latestAttempt, questionStatus, filterQuestions, statistics, confirmAttempt, beginRetry, validateProgress, loadProgress, saveProgress } from './progress.mjs';
const $ = id => document.getElementById(id);
const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; };
const number = id => String(id).padStart(3, '0');
const stateLabels = { pending: 'Pendiente', correct: 'Correcta', incorrect: 'Fallada' };
const dateLabel = date => new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(date));
const pdfLink = (file, page, text) => { const a = el('a', 'text-link', text); a.href = `docs/${file}#page=${page}`; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', `${text} (PDF, nueva pestaña)`); return a; };
const MANUAL = 'Manual_IC2026_Cripto_CSIRT_Malware_Descarga.pdf';
let questions, concepts, progress, storage, pinned = false, recoveryRaw = null;
function warn(message) { $('storage-warning').textContent = message; $('storage-warning').hidden = !message; $('save-state').textContent = message ? 'Sesión sin guardado garantizado' : 'Progreso en este navegador'; }
function persist() {
  if (recoveryRaw !== null) {
    warn('Los datos guardados no se pudieron leer y siguen intactos. Esta práctica está en memoria: exportala desde Mi progreso antes de cerrar. Para volver a guardar, importá un respaldo o reiniciá.');
    return false;
  }
  const saved = saveProgress(storage, progress);
  if (!saved) warn('El navegador no permite guardar el progreso. Podés seguir practicando en esta sesión. Exportá el JSON antes de salir para conservar tus intentos.');
  else warn('');
  return saved;
}
function downloadJSON(value, name) {
  const url = URL.createObjectURL(new Blob([typeof value === 'string' ? value : JSON.stringify(value, null, 2)], { type: 'application/json' }));
  const anchor = el('a'); anchor.href = url; anchor.download = name; document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function current() { return questions[progress.view.questionId - 1]; }
function draftFor(q) {
  if (!progress.drafts[q.id]) progress.drafts[q.id] = { option: null, hintUsed: false };
  return progress.drafts[q.id];
}
function glossaryLink(id) {
  const a = el('a', 'concept-link', `${concepts.get(id).term} ↗`);
  a.href = `glosario.html#${id}`;
  return a;
}
function renderStats() {
  const s = statistics(progress);
  $('answered-count').textContent = s.answered;
  $('correct-count').textContent = s.correct;
  $('incorrect-count').textContent = s.incorrect;
  $('attempt-count').textContent = s.attempts;
  $('assisted-count').textContent = `${s.assisted} con pista · ${s.independent} sin pista`;
  $('overall-progress').value = s.answered;
  $('progress-percent').textContent = `${Math.round(s.answered / 350 * 100)}%`;
}
function renderIndex(filtered) {
  $('topic-filter').value = progress.view.topic;
  $('status-filter').value = progress.view.status;
  $('index-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'pregunta' : 'preguntas'}`;
  const fragment = document.createDocumentFragment();
  for (const [topic, label] of Object.entries(TOPICS)) {
    const group = filtered.filter(q => q.topic === topic);
    if (!group.length) continue;
    const heading = el('h3', `index-topic ${topic}`, label);
    heading.append(el('span', '', group.length));
    fragment.append(heading);
    const grid = el('div', 'number-grid');
    for (const q of group) {
      const status = questionStatus(progress, q.id);
      const b = el('button', `question-number ${status}`, number(q.id));
      b.type = 'button'; b.dataset.question = q.id;
      b.setAttribute('aria-label', `Pregunta ${q.id}, ${TOPICS[q.topic]}, ${stateLabels[status].toLowerCase()}`);
      b.title = `Pregunta ${number(q.id)} · ${stateLabels[status]}`;
      if (q.id === progress.view.questionId) b.setAttribute('aria-current', 'step');
      grid.append(b);
    }
    fragment.append(grid);
  }
  if (!filtered.length) fragment.append(el('p', 'muted small', 'No hay coincidencias. Cambiá los filtros para seguir.'));
  const scroll = $('question-index').scrollTop;
  $('question-index').replaceChildren(fragment);
  $('question-index').scrollTop = scroll;
}
function renderHint(q, show, automatic = false) {
  $('hint-panel').hidden = !show;
  $('hint-title').textContent = automatic ? 'Repasá la idea detrás de la respuesta' : 'Una idea para orientarte';
  const c = concepts.get(q.conceptIds[0]);
  const fragment = document.createDocumentFragment();
  if (automatic) {
    fragment.append(el('h4', '', c.term), el('p', '', c.definition), el('p', '', c.explanation));
    if (c.example) fragment.append(el('p', 'small muted', `Por ejemplo: ${c.example}`));
  } else {
    fragment.append(el('p', '', c.hint));
  }
  const links = el('div', 'concept-links');
  q.conceptIds.forEach(id => links.append(glossaryLink(id)));
  fragment.append(links);
  const references = el('p', 'small muted');
  references.append('Para profundizar: ', pdfLink(MANUAL, c.manualPages[0], `Manual, ${c.manualPages.length === 1 ? 'p.' : 'pp.'} ${c.manualPages.join(', ')}`));
  if (c.referenceNote) references.append(el('span', 'reference-note', c.referenceNote));
  fragment.append(references);
  $('hint-content').replaceChildren(fragment);
}
function attemptItem(a) {
  const item = el('li', 'history-item');
  item.append(el('span', a.correct ? 'history-result correct-text' : 'history-result incorrect-text', a.correct ? '✓ Correcta' : '× Fallada'), el('span', '', `Opción ${a.option} · ${a.hintUsed ? 'con pista' : 'sin pista'}`), el('time', 'muted', dateLabel(a.date)));
  item.querySelector('time').dateTime = a.date;
  return item;
}
function renderQuestion(filtered) {
  const q = current();
  const last = latestAttempt(progress, q.id);
  const draft = progress.drafts[q.id];
  const confirmed = Boolean(last && !draft);
  const empty = filtered.length === 0 && !pinned;
  $('question-card').hidden = empty;
  $('empty-state').hidden = !empty;
  $('question-position').textContent = `Pregunta ${number(q.id)} de 350`;
  $('question-topic').textContent = TOPICS[q.topic];
  $('question-topic').className = `topic-badge ${q.topic}`;
  $('question-state').textContent = draft && last ? 'Nuevo intento' : last ? last.correct ? 'Correcta' : 'Fallada' : 'Pendiente';
  $('question-state').className = `state-label ${confirmed ? last.correct ? 'correct-text' : 'incorrect-text' : ''}`;
  $('question-title').textContent = q.prompt;
  $('selection-note').textContent = confirmed ? `Elegiste la opción ${last.option}. ${last.hintUsed ? 'Usaste una pista en este intento.' : 'Respondiste sin usar pista.'}` : 'Elegí una opción. Podés cambiarla antes de confirmar.';
  const fieldset = $('answer-options');
  fieldset.replaceChildren(el('legend', 'sr-only', 'Opciones de respuesta'));
  for (const [letter, text] of Object.entries(q.options)) {
    const label = el('label', 'answer-option');
    const radio = el('input'); radio.type = 'radio'; radio.name = 'answer'; radio.value = letter; radio.disabled = confirmed;
    radio.checked = confirmed ? last.option === letter : draft?.option === letter;
    label.append(radio, el('span', 'option-letter', letter), el('span', 'option-text', text));
    if (confirmed && letter === q.answer) { label.classList.add('is-correct'); label.append(el('span', 'option-result', last.option === letter ? '✓ Tu elección · Correcta' : '✓ Correcta')); }
    else if (confirmed && letter === last.option) { label.classList.add('is-incorrect'); label.append(el('span', 'option-result', '× Tu elección')); }
    fieldset.append(label);
  }
  $('confirm-answer').hidden = confirmed;
  $('confirm-answer').disabled = !draft?.option;
  $('retry-answer').hidden = !confirmed;
  $('show-hint').hidden = confirmed || Boolean(draft?.hintUsed);
  $('feedback').hidden = !confirmed;
  $('feedback').replaceChildren();
  if (confirmed) {
    $('feedback').className = `feedback ${last.correct ? 'success' : 'failure'}`;
    $('feedback').append(el('h3', '', last.correct ? '✓ Bien, esa es la respuesta.' : `La respuesta correcta es ${q.answer}.`), el('p', '', q.explanation));
    const ref = el('p', 'small solution-reference');
    ref.append(pdfLink('IC_2026_Cripto_CSIRT_Malware_Solucionario.pdf', q.solutionPage, `Solucionario, p. ${q.solutionPage}`));
    ref.append(el('span', 'original-reference', `Fuente original (diapositivas): ${q.source}`));
    $('feedback').append(ref);
  }
  renderHint(q, confirmed ? !last.correct || last.hintUsed : Boolean(draft?.hintUsed), confirmed && !last.correct);
  const history = progress.attempts.filter(a => a.questionId === q.id);
  $('question-history').hidden = !history.length;
  $('history-count').textContent = `(${history.length})`;
  $('history-list').replaceChildren(...history.toReversed().map(attemptItem));
  // Prevent a previously opened history from showing solutions during a retry.
  if (!confirmed) $('question-history').open = false;
  $('question-source').replaceChildren();
  $('question-source').append('ENUNCIADO ORIGINAL · ', pdfLink('IC_2026_Cripto_CSIRT_Malware_350_Preguntas.pdf', q.questionPage, `Cuestionario, p. ${q.questionPage}`));
  const index = filtered.findIndex(item => item.id === q.id);
  $('outside-filter').hidden = empty || index >= 0;
  const previous = filtered.filter(item => item.id < q.id).at(-1);
  const next = filtered.find(item => item.id > q.id);
  $('previous-question').disabled = empty || !previous;
  $('next-question').disabled = empty || !next;
  $('filtered-position').textContent = index >= 0 ? `${index + 1} de ${filtered.length} en este recorrido` : `${filtered.length} en el filtro`;
}
function render() { const filtered = filterQuestions(questions, progress); renderStats(); renderIndex(filtered); renderQuestion(filtered); }
function navigate(id) {
  progress.view.questionId = id; pinned = false; persist(); render();
  $('question-title').focus({ preventScroll: true });
  if (matchMedia('(max-width: 800px)').matches) $('question-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function move(direction) {
  const filtered = filterQuestions(questions, progress);
  const candidate = direction > 0 ? filtered.find(q => q.id > current().id) : filtered.filter(q => q.id < current().id).at(-1);
  if (candidate) navigate(candidate.id);
}
function setFilters(topic = $('topic-filter').value, status = $('status-filter').value) {
  progress.view.topic = topic; progress.view.status = status; pinned = false;
  const filtered = filterQuestions(questions, progress);
  if (filtered.length && !filtered.some(q => q.id === current().id)) progress.view.questionId = filtered[0].id;
  persist(); render();
}
function renderDetailedStats() {
  const s = statistics(progress);
  const rows = [['Sin pista', s.independent, s.independentCorrect], ['Con pista', s.assisted, s.assistedCorrect]];
  const table = el('table');
  const caption = el('caption', 'sr-only', 'Estadísticas de todos los intentos confirmados'); table.append(caption);
  const head = el('thead'); const tr = el('tr'); ['Intentos', 'Total', 'Correctos', 'Acierto'].forEach(t => { const th = el('th', '', t); th.scope = 'col'; tr.append(th); }); head.append(tr); table.append(head);
  const body = el('tbody');
  for (const [label, total, correct] of rows) { const row = el('tr'); const th = el('th', '', label); th.scope = 'row'; row.append(th, el('td', '', total), el('td', '', correct), el('td', '', total ? `${Math.round(correct / total * 100)}%` : '—')); body.append(row); }
  table.append(body); $('detailed-stats').replaceChildren(table);
  if (recoveryRaw !== null) {
    const note = el('p', 'small muted', 'Los datos originales guardados no se pudieron leer. ');
    const download = el('button', 'text-button', 'Descargar datos originales para recuperarlos');
    download.addEventListener('click', () => downloadJSON(recoveryRaw, 'ic2026-datos-originales.json'));
    note.append(download); $('detailed-stats').append(note);
  }
  $('all-attempts').replaceChildren(); $('all-attempts').parentElement.open = false;
}
function bindEvents() {
  $('answer-form').addEventListener('change', event => {
    if (event.target.name !== 'answer') return;
    draftFor(current()).option = event.target.value; persist();
    $('confirm-answer').disabled = false;
  });
  $('answer-form').addEventListener('submit', event => {
    event.preventDefault();
    // A confirmed card cannot append a second attempt without an explicit retry.
    if (latestAttempt(progress, current().id) && !progress.drafts[current().id]) return;
    try { confirmAttempt(progress, current()); pinned = true; persist(); render(); $('feedback').scrollIntoView({ block: 'nearest', behavior: 'smooth' }); $('retry-answer').focus({ preventScroll: true }); }
    catch (error) { $('selection-note').textContent = error.message; }
  });
  $('show-hint').addEventListener('click', () => {
    draftFor(current()).hintUsed = true; persist();
    renderHint(current(), true); $('show-hint').hidden = true;
    $('hint-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    $('hint-panel').querySelector('a').focus({ preventScroll: true });
  });
  $('retry-answer').addEventListener('click', () => {
    beginRetry(progress, current().id); persist(); render(); $('answer-options').querySelector('input').focus({ preventScroll: true });
  });
  $('previous-question').addEventListener('click', () => move(-1));
  $('next-question').addEventListener('click', () => move(1));
  $('question-index').addEventListener('click', event => { const b = event.target.closest('[data-question]'); if (b) navigate(Number(b.dataset.question)); });
  $('topic-filter').addEventListener('change', () => setFilters());
  $('status-filter').addEventListener('change', () => setFilters());
  for (const id of ['reset-filters', 'clear-filters']) $(id).addEventListener('click', () => setFilters('all', 'all'));
  document.addEventListener('keydown', event => {
    if (document.querySelector('dialog[open]') || !event.altKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
  });
  $('manage-progress').addEventListener('click', () => { renderDetailedStats(); $('transfer-status').textContent = ''; $('progress-dialog').showModal(); });
  $('all-attempts').parentElement.addEventListener('toggle', event => {
    if (!event.target.open) return;
    const list = el('ol', 'full-history-list');
    for (const a of progress.attempts.toReversed()) {
      const li = attemptItem(a); const link = el('button', 'text-button', `Pregunta ${number(a.questionId)}`);
      link.addEventListener('click', () => { $('progress-dialog').close(); progress.view.topic = 'all'; progress.view.status = 'all'; navigate(a.questionId); });
      li.prepend(link); list.append(li);
    }
    $('all-attempts').replaceChildren(progress.attempts.length ? list : el('p', 'muted small', 'Todavía no confirmaste intentos.'));
  });
  $('export-progress').addEventListener('click', () => {
    const value = { ...progress, exportedAt: new Date().toISOString() };
    downloadJSON(value, `ic2026-progreso-${new Date().toISOString().slice(0, 10)}.json`);
    $('transfer-status').textContent = 'Copia exportada. Conservá el archivo JSON para importar tu progreso.';
  });
  $('import-progress').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error('El archivo supera el máximo de 10 MB.');
      const imported = validateProgress(JSON.parse(await file.text()), questions);
      if (!window.confirm(`¿Reemplazar tu progreso actual (${progress.attempts.length} intentos) por el del archivo (${imported.attempts.length} intentos)? Esta acción no combina historiales.`)) { $('transfer-status').textContent = 'Importación cancelada. Se conservó tu progreso.'; return; }
      progress = imported; pinned = false; recoveryRaw = null;
      const saved = persist(); render(); renderDetailedStats();
      $('transfer-status').textContent = saved ? `Progreso importado: ${progress.attempts.length} intentos. El historial anterior fue reemplazado.` : `Progreso importado en memoria: ${progress.attempts.length} intentos. El navegador no pudo guardarlo; exportalo antes de cerrar.`;
    } catch (error) { $('transfer-status').textContent = `No se importó el archivo. ${error instanceof SyntaxError ? 'El archivo no contiene JSON válido.' : error.message}`; }
    finally { event.target.value = ''; }
  });
  $('reset-progress').addEventListener('click', () => {
    if (!window.confirm('¿Borrar todos los intentos, borradores y filtros de este navegador? Podés exportar una copia antes.')) return;
    progress = emptyProgress(); pinned = false; recoveryRaw = null;
    const saved = persist(); render(); renderDetailedStats();
    $('transfer-status').textContent = saved ? 'Progreso reiniciado.' : 'La sesión se reinició, pero el navegador no pudo guardar el cambio.';
  });
}
function bindDialogs() {
  document.querySelectorAll('[data-materials]').forEach(b => b.addEventListener('click', () => $('materials-dialog').showModal()));
  document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', event => { if (event.target === d) { const r = d.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) d.close(); } }));
}
bindDialogs();
try {
  const responses = await Promise.all([fetch('data/questions.json'), fetch('data/glossary.json')]);
  if (responses.some(r => !r.ok)) throw new Error('No se pudieron cargar los archivos de contenido.');
  const [bank, glossary] = await Promise.all(responses.map(r => r.json()));
  questions = bank.questions; concepts = new Map(glossary.entries.map(c => [c.id, c]));
  if (bank.version !== 1 || questions.length !== 350 || questions.some((q, i) => q.id !== i + 1 || !q.conceptIds.every(id => concepts.has(id)))) throw new Error('El banco de preguntas está incompleto.');
  try { storage = window.localStorage; } catch { storage = null; }
  const loaded = loadProgress(storage, questions); progress = loaded.progress; recoveryRaw = loaded.recoveryRaw; warn(loaded.warning);
  const linkedId = new URL(location.href).searchParams.get('pregunta');
  if (linkedId && /^\d{1,3}$/.test(linkedId) && Number(linkedId) >= 1 && Number(linkedId) <= 350) {
    progress.view = { questionId: Number(linkedId), topic: 'all', status: 'all' }; persist();
    history.replaceState(null, '', location.pathname);
  }
  bindEvents(); render(); $('study-layout').hidden = false; $('load-status').hidden = true;
} catch (error) {
  $('load-status').className = 'notice warning';
  $('load-status').textContent = `${error.message} Abrí la aplicación desde un servidor estático local o GitHub Pages. Los PDF siguen disponibles en Material de consulta.`;
}
