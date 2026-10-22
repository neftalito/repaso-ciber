import { STORAGE_KEY, TOPICS, ORIGINS, emptyProgress, latestAttempt, questionStatus, filterQuestions, statistics, confirmAttempt, beginRetry, startStudySession, endStudySession, studyStatistics, validateProgress, loadProgress, saveProgress } from './progress.mjs?v=20261021-7';
const $ = id => document.getElementById(id);
const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; };
const number = id => String(id).padStart(3, '0');
const stateLabels = { pending: 'Pendiente', correct: 'Correcta', incorrect: 'Fallada' };
const dateLabel = date => new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(date));
const pdfLink = (file, page, text) => { const a = el('a', 'text-link', text); a.href = `docs/${file}#page=${page}`; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', `${text} (PDF, nueva pestaña)`); return a; };
const MANUAL = 'Manual_IC2026_Cripto_CSIRT_Malware_Descarga.pdf';
const PRACTICE_GUIDE = 'Guia_de_estudio_IC_Practicas_1_y_2.pdf';
let questions, concepts, optionNotes, progress, storage, pinned = false, recoveryRaw = null, autoOpenQuestion = null;
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
  $('overall-progress').max = questions.length;
  $('total-questions').textContent = questions.length;
  $('bank-count').textContent = questions.length;
  $('progress-percent').textContent = `${Math.round(s.answered / questions.length * 100)}%`;
}
function renderIndex(filtered) {
  const session = progress.studySession;
  $('bank-count').textContent = session ? filtered.length : questions.length;
  $('index-description').textContent = session ? 'Este es el orden aleatorio de tu recorrido. Los estados corresponden a las respuestas de este recorrido.' : '350 de teoría y 92 de práctica, en tres temas.';
  for (const id of ['topic-filter', 'status-filter', 'origin-filter']) $(id).closest('.filter-field').hidden = Boolean(session);
  $('reset-filters').hidden = Boolean(session);
  $('topic-filter').value = progress.view.topic;
  $('status-filter').value = progress.view.status;
  $('origin-filter').value = progress.view.origin;
  for (const option of $('topic-filter').options) {
    const count = questions.filter(q => (progress.view.origin === 'all' || q.origin === progress.view.origin) && (option.value === 'all' || q.topic === option.value)).length;
    option.textContent = `${TOPICS[option.value] ?? 'Todos los temas'} · ${count}`;
  }
  $('index-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'pregunta' : 'preguntas'}`;
  const fragment = document.createDocumentFragment();
  for (const [topic, label] of session ? [['study', 'Orden aleatorio']] : Object.entries(TOPICS)) {
    const group = session ? filtered : filtered.filter(q => q.topic === topic);
    if (!group.length) continue;
    const heading = el('h3', `index-topic ${topic}`, label);
    heading.append(el('span', '', group.length));
    fragment.append(heading);
    const grid = el('div', 'number-grid');
    for (const [position, q] of group.entries()) {
      const status = session && !session.answers[q.id] ? 'pending' : questionStatus(progress, q.id);
      const b = el('button', `question-number ${status}`, number(q.id));
      b.type = 'button'; b.dataset.question = q.id;
      b.setAttribute('aria-label', `${session ? `Lugar ${position + 1} de ${group.length}. ` : ''}Pregunta ${q.id}, ${ORIGINS[q.origin]}, ${TOPICS[q.topic]}, ${stateLabels[status].toLowerCase()}`);
      b.title = `${session ? `${position + 1} de ${group.length} · ` : ''}Pregunta ${number(q.id)} · ${ORIGINS[q.origin]} · ${stateLabels[status]}`;
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
function renderStudySession() {
  const session = progress.studySession;
  $('study-session').hidden = !session;
  if (!session) return;
  const s = studyStatistics(progress), total = session.questionIds.length;
  const complete = s.answered === total;
  $('study-session-title').textContent = complete ? '¡Recorrido completado!' : `Tu recorrido de ${total} ${total === 1 ? 'pregunta' : 'preguntas'}`;
  $('study-session-filters').textContent = `${TOPICS[session.topic] ?? 'Todos los temas'} · ${ORIGINS[session.origin] ?? 'Teoría y Práctica'} · Sin repeticiones`;
  $('study-session-status').textContent = `${s.answered} de ${total} respondidas · ${s.correct} correctas · ${s.incorrect} falladas · ${s.assisted} con pista${complete ? '. Podés revisar las respuestas o empezar otro recorrido.' : ''}`;
  $('study-session-progress').max = total;
  $('study-session-progress').value = s.answered;
}
function updateStudyAvailability() {
  const topic = $('study-topic').value, origin = $('study-origin').value;
  const count = questions.filter(q => (topic === 'all' || q.topic === topic) && (origin === 'all' || q.origin === origin)).length;
  $('study-count').max = count;
  $('study-available').textContent = `${count} preguntas disponibles con estos filtros. Elegí entre 1 y ${count}.`;
  $('study-error').hidden = true;
  $('study-count').removeAttribute('aria-invalid');
}
function openStudySetup() {
  const session = progress.studySession;
  $('study-topic').value = session?.topic ?? progress.view.topic;
  $('study-origin').value = session?.origin ?? progress.view.origin;
  $('study-replace-note').hidden = !session;
  updateStudyAvailability();
  $('study-count').value = Math.min(session?.questionIds.length ?? 10, Number($('study-count').max));
  $('study-dialog').showModal();
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
  references.append('Para profundizar: ');
  if (c.manualPages.length) references.append(pdfLink(MANUAL, c.manualPages[0], `Manual de teorías, pp. ${c.manualPages.join(', ')}`));
  if (c.practicePages?.length) references.append(' ', pdfLink(PRACTICE_GUIDE, c.practicePages[0], `Guía de prácticas, pp. ${c.practicePages.join(', ')}`));
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
function answerOption(q, letter, text, confirmed, last, draft) {
  const card = el(confirmed ? 'details' : 'div', 'answer-option');
  card.dataset.option = letter;
  const choice = el(confirmed ? 'summary' : 'label', 'answer-choice');
  if (confirmed) {
    card.open = autoOpenQuestion === q.id && last.option === letter;
    if (letter === q.answer) card.classList.add('is-correct');
    else if (letter === last.option) card.classList.add('is-incorrect');
  } else {
    const radio = el('input');
    radio.type = 'radio'; radio.name = 'answer'; radio.value = letter;
    radio.id = `answer-${q.id}-${letter}`; radio.checked = draft?.option === letter;
    choice.htmlFor = radio.id; choice.append(radio);
  }
  choice.append(el('span', 'option-letter', letter), el('span', 'option-text', text));
  if (confirmed) {
    const meta = el('span', 'option-meta');
    if (letter === q.answer) meta.append(el('span', 'option-result', last.option === letter ? '✓ Tu elección · Correcta' : '✓ Correcta'));
    else if (letter === last.option) meta.append(el('span', 'option-result', '× Tu elección'));
    const toggle = el('span', 'option-toggle', 'Explicación ');
    const chevron = el('span', 'option-chevron', '⌄'); chevron.setAttribute('aria-hidden', 'true');
    toggle.append(chevron); meta.append(toggle); choice.append(meta);
  }
  card.append(choice);
  if (confirmed) {
    const correct = letter === q.answer;
    const note = optionNotes.get(q.id);
    const body = el('div', 'option-explanation');
    body.append(el('h3', '', correct ? 'Por qué es correcta' : 'Por qué no responde a esta pregunta'),
      el('p', '', correct ? q.explanation : note.distractors[letter]));
    const reference = el('p', 'option-reference');
    if (correct) {
      reference.append(el('strong', '', 'Solucionario original · '),
        pdfLink(q.origin === 'practice' ? 'IC2026_Solucionario_Practicas_1_y_2.pdf' : 'IC_2026_Cripto_CSIRT_Malware_Solucionario.pdf', q.solutionPage, `${ORIGINS[q.origin]}, p. ${q.solutionPage}`),
        el('span', 'original-reference', `${q.origin === 'practice' ? 'Referencia del ejercicio' : 'Fuente original (diapositivas)'}: ${q.source}`));
    } else {
      reference.append(el('strong', '', 'Ampliación didáctica · '));
      if (note.manualPages.length) reference.append(pdfLink(MANUAL, note.manualPages[0], `Conceptos en el manual, pp. ${note.manualPages.join(', ')}`));
      if (note.practicePages?.length) reference.append(pdfLink(PRACTICE_GUIDE, note.practicePages[0], `Guía de prácticas, pp. ${note.practicePages.join(', ')}`));
      if (note.referenceNote) reference.append(el('span', 'reference-note', note.referenceNote));
    }
    body.append(reference); card.append(body);
  }
  return card;
}
function renderQuestion(filtered) {
  const q = current();
  const last = latestAttempt(progress, q.id);
  const draft = progress.drafts[q.id];
  const confirmed = Boolean(last && !draft);
  const empty = filtered.length === 0 && !pinned;
  $('question-card').hidden = empty;
  $('empty-state').hidden = !empty;
  $('question-position').textContent = `Pregunta ${number(q.id)} de ${questions.length}`;
  $('question-topic').textContent = TOPICS[q.topic];
  $('question-topic').className = `topic-badge ${q.topic}`;
  $('question-origin').textContent = ORIGINS[q.origin];
  $('question-origin').className = `origin-badge ${q.origin}`;
  $('question-state').textContent = draft && last ? 'Nuevo intento' : last ? last.correct ? 'Correcta' : 'Fallada' : 'Pendiente';
  $('question-state').className = `state-label ${confirmed ? last.correct ? 'correct-text' : 'incorrect-text' : ''}`;
  $('question-title').textContent = q.prompt;
  $('question-code').textContent = q.code ?? '';
  $('question-code').hidden = !q.code;
  $('practice-context').hidden = q.origin !== 'practice';
  $('practice-context').textContent = q.origin === 'practice' ? `${q.practice} · Ejercicio original ${String(q.sourceNumber).padStart(2, '0')}: ${q.title}. Opciones adaptadas para esta práctica guiada.` : '';
  $('selection-note').textContent = confirmed ? `Elegiste la opción ${last.option}. ${last.hintUsed ? 'Usaste una pista en este intento.' : 'Respondiste sin usar pista.'}` : 'Elegí una opción. Podés cambiarla antes de confirmar.';
  const fieldset = $('answer-options');
  fieldset.replaceChildren(el('legend', 'sr-only', 'Opciones de respuesta'));
  for (const [letter, text] of Object.entries(q.options)) {
    fieldset.append(answerOption(q, letter, text, confirmed, last, draft));
  }
  autoOpenQuestion = null;
  $('confirm-answer').hidden = confirmed;
  $('confirm-answer').disabled = !draft?.option;
  $('retry-answer').hidden = !confirmed;
  $('next-question-inline').hidden = !confirmed;
  $('show-hint').hidden = confirmed || Boolean(draft?.hintUsed);
  $('feedback').hidden = !confirmed;
  $('feedback').replaceChildren();
  if (confirmed) {
    $('feedback').className = `feedback ${last.correct ? 'success' : 'failure'}`;
    $('feedback').append(el('h3', '', last.correct ? '✓ Bien, esa es la respuesta.' : `La respuesta correcta es ${q.answer}.`),
      el('p', '', 'Desplegá las opciones para consultar sus explicaciones. La que elegiste se abre al confirmar.'));
  }
  renderHint(q, confirmed ? !last.correct || last.hintUsed : Boolean(draft?.hintUsed), confirmed && !last.correct);
  const history = progress.attempts.filter(a => a.questionId === q.id);
  $('question-history').hidden = !history.length;
  $('history-count').textContent = `(${history.length})`;
  $('history-list').replaceChildren(...history.toReversed().map(attemptItem));
  // Prevent a previously opened history from showing solutions during a retry.
  if (!confirmed) $('question-history').open = false;
  $('question-source').replaceChildren();
  $('question-source').append('ENUNCIADO ORIGINAL · ', pdfLink(q.origin === 'practice' ? 'IC2026_Preguntas_Basadas_en_Practicas_1_y_2.pdf' : 'IC_2026_Cripto_CSIRT_Malware_350_Preguntas.pdf', q.questionPage, `${q.origin === 'practice' ? 'Cuadernillo de prácticas' : 'Cuestionario de teorías'}, p. ${q.questionPage}`));
  if (q.adaptationNote) $('question-source').append(el('span', 'reference-note', q.adaptationNote));
  const index = filtered.findIndex(item => item.id === q.id);
  $('outside-filter').hidden = empty || index >= 0;
  const previous = progress.studySession ? filtered[index - 1] : filtered.filter(item => item.id < q.id).at(-1);
  const next = progress.studySession ? filtered[index + 1] : filtered.find(item => item.id > q.id);
  $('previous-question').disabled = empty || !previous;
  $('next-question').disabled = empty || !next;
  $('next-question-inline').disabled = empty || !next;
  $('filtered-position').textContent = index >= 0 ? `${index + 1} de ${filtered.length} en este recorrido` : `${filtered.length} en el filtro`;
}
function render() { const filtered = filterQuestions(questions, progress); renderStats(); renderStudySession(); renderIndex(filtered); renderQuestion(filtered); }
function navigate(id) {
  autoOpenQuestion = null;
  progress.view.questionId = id; pinned = false; persist(); render();
  $('question-title').focus({ preventScroll: true });
  if (matchMedia('(max-width: 800px)').matches) $('question-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function move(direction) {
  const filtered = filterQuestions(questions, progress);
  const candidate = progress.studySession ? filtered[filtered.findIndex(q => q.id === current().id) + direction]
    : direction > 0 ? filtered.find(q => q.id > current().id) : filtered.filter(q => q.id < current().id).at(-1);
  if (candidate) navigate(candidate.id);
}
function setFilters(topic = $('topic-filter').value, status = $('status-filter').value, origin = $('origin-filter').value) {
  if (progress.studySession) return;
  progress.view.topic = topic; progress.view.status = status; progress.view.origin = origin; pinned = false;
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
  $('open-study').disabled = false;
  $('open-study').addEventListener('click', openStudySetup);
  $('new-study').addEventListener('click', openStudySetup);
  for (const id of ['study-topic', 'study-origin']) $(id).addEventListener('change', updateStudyAvailability);
  $('study-form').addEventListener('submit', event => {
    event.preventDefault();
    try {
      startStudySession(progress, questions, { count: Number($('study-count').value), topic: $('study-topic').value, origin: $('study-origin').value });
      autoOpenQuestion = null; pinned = false; persist(); render(); $('study-dialog').close();
      $('question-title').focus({ preventScroll: true }); $('study-session').scrollIntoView({ block: 'start', behavior: 'smooth' });
    } catch (error) {
      $('study-error').textContent = error.message; $('study-error').hidden = false;
      $('study-count').setAttribute('aria-invalid', 'true'); $('study-count').focus();
    }
  });
  $('end-study').addEventListener('click', () => {
    endStudySession(progress); autoOpenQuestion = null; pinned = false; persist(); render(); $('open-study').focus();
  });
  $('answer-form').addEventListener('change', event => {
    if (event.target.name !== 'answer') return;
    draftFor(current()).option = event.target.value; persist();
    $('confirm-answer').disabled = false;
  });
  $('answer-form').addEventListener('submit', event => {
    event.preventDefault();
    // A confirmed card cannot append a second attempt without an explicit retry.
    if (latestAttempt(progress, current().id) && !progress.drafts[current().id]) return;
    try {
      confirmAttempt(progress, current()); autoOpenQuestion = current().id; pinned = true; persist(); render();
      const selected = $('answer-options').querySelector('details[open]');
      selected.querySelector('summary').focus({ preventScroll: true });
      selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
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
  $('next-question-inline').addEventListener('click', () => move(1));
  $('question-index').addEventListener('click', event => { const b = event.target.closest('[data-question]'); if (b) navigate(Number(b.dataset.question)); });
  $('topic-filter').addEventListener('change', () => setFilters());
  $('status-filter').addEventListener('change', () => setFilters());
  $('origin-filter').addEventListener('change', () => setFilters());
  for (const id of ['reset-filters', 'clear-filters']) $(id).addEventListener('click', () => setFilters('all', 'all', 'all'));
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
      link.addEventListener('click', () => { $('progress-dialog').close(); endStudySession(progress); progress.view.topic = 'all'; progress.view.status = 'all'; progress.view.origin = 'all'; navigate(a.questionId); });
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
    if (!window.confirm('¿Borrar todos los intentos, borradores, filtros y el recorrido de modo estudio de este navegador? Podés exportar una copia antes.')) return;
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
  const responses = await Promise.all([fetch('data/questions.json', { cache: 'no-cache' }), fetch('data/glossary.json', { cache: 'no-cache' }), fetch('data/option-explanations.json', { cache: 'no-cache' }), fetch('data/practice-questions.json', { cache: 'no-cache' }), fetch('data/practice-option-explanations.json', { cache: 'no-cache' })]);
  if (responses.some(r => !r.ok)) throw new Error('No se pudieron cargar los archivos de contenido.');
  const [bank, glossary, notes, practical, practicalNotes] = await Promise.all(responses.map(r => r.json()));
  questions = [...bank.questions.map(q => ({ ...q, origin: bank.origin ?? 'theory' })), ...practical.questions]; concepts = new Map(glossary.entries.map(c => [c.id, c]));
  optionNotes = new Map([...notes.questions, ...practicalNotes.questions].map(n => [n.questionId, n]));
  if (bank.version !== 1 || practical.version !== 1 || bank.questions.length !== 350 || practical.questions.length !== 92 || questions.some((q, i) => q.id !== i + 1 || !Object.hasOwn(ORIGINS, q.origin) || !q.conceptIds.every(id => concepts.has(id)))) throw new Error('El banco de preguntas está incompleto.');
  if (notes.version !== 1 || practicalNotes.version !== 1 || optionNotes.size !== questions.length || questions.some(q => !optionNotes.has(q.id) || Object.keys(q.options).filter(k => k !== q.answer).some(k => !optionNotes.get(q.id).distractors[k]))) throw new Error('Las explicaciones por opción están incompletas.');
  try { storage = window.localStorage; } catch { storage = null; }
  const loaded = loadProgress(storage, questions); progress = loaded.progress; recoveryRaw = loaded.recoveryRaw; warn(loaded.warning);
  const linkedId = new URL(location.href).searchParams.get('pregunta');
  if (linkedId && /^\d+$/.test(linkedId) && questions.some(q => q.id === Number(linkedId))) {
    endStudySession(progress);
    progress.view = { questionId: Number(linkedId), topic: 'all', status: 'all', origin: 'all' }; persist();
    history.replaceState(null, '', location.pathname);
  }
  bindEvents(); render(); $('study-layout').hidden = false; $('load-status').hidden = true;
} catch (error) {
  $('load-status').className = 'notice warning';
  $('load-status').textContent = `${error.message} Abrí la aplicación desde un servidor estático local o GitHub Pages. Los PDF siguen disponibles en Material de consulta.`;
}
