export const STORAGE_KEY = 'ic2026.progress.v1';
export const TOPICS = { cripto: 'Criptografía', csirt: 'CSIRT', malware: 'Malware' };
export const ORIGINS = { theory: 'Teoría', practice: 'Práctica' };
export const STATUSES = { all: 'Todos los estados', pending: 'Pendientes', correct: 'Correctas', incorrect: 'Falladas' };
export const emptyProgress = () => ({ format: 'ic2026-progress', version: 1, attempts: [], drafts: {}, view: { questionId: 1, topic: 'all', status: 'all', origin: 'all' } });
export function latestAttempt(progress, questionId) {
  return progress.attempts.findLast(attempt => attempt.questionId === questionId) ?? null;
}
export function questionStatus(progress, questionId) {
  const last = latestAttempt(progress, questionId);
  return !last ? 'pending' : last.correct ? 'correct' : 'incorrect';
}
export function filterQuestions(questions, progress) {
  return questions.filter(q => (progress.view.topic === 'all' || q.topic === progress.view.topic)
    && ((progress.view.origin ?? 'all') === 'all' || q.origin === progress.view.origin)
    && (progress.view.status === 'all' || questionStatus(progress, q.id) === progress.view.status));
}
export function statistics(progress) {
  const last = new Map(progress.attempts.map(a => [a.questionId, a]));
  return { answered: last.size, correct: [...last.values()].filter(a => a.correct).length,
    incorrect: [...last.values()].filter(a => !a.correct).length, attempts: progress.attempts.length,
    assisted: progress.attempts.filter(a => a.hintUsed).length,
    assistedCorrect: progress.attempts.filter(a => a.hintUsed && a.correct).length,
    independent: progress.attempts.filter(a => !a.hintUsed).length,
    independentCorrect: progress.attempts.filter(a => !a.hintUsed && a.correct).length };
}
export function confirmAttempt(progress, question, date = new Date().toISOString()) {
  const draft = progress.drafts[question.id];
  if (!draft || !Object.hasOwn(question.options, draft.option)) throw new Error('Elegí una opción antes de confirmar.');
  const attempt = { id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    questionId: question.id, option: draft.option, correct: draft.option === question.answer, date, hintUsed: draft.hintUsed };
  progress.attempts.push(attempt);
  delete progress.drafts[question.id];
  return attempt;
}
export function beginRetry(progress, questionId) {
  progress.drafts[questionId] = { option: null, hintUsed: false };
}
export function validateProgress(value, questions) {
  const fail = message => { throw new Error(`Progreso inválido: ${message}`); };
  if (!value || typeof value !== 'object' || value.format !== 'ic2026-progress' || value.version !== 1) fail('formato o versión incompatible.');
  if (!Array.isArray(value.attempts) || value.attempts.length > 50000) fail('historial ausente o demasiado grande (máximo 50.000 intentos).');
  const byId = new Map(questions.map(q => [q.id, q]));
  const ids = new Set();
  const attempts = value.attempts.map(a => {
    if (!a || typeof a !== 'object' || typeof a.id !== 'string' || !a.id || a.id.length > 100 || ids.has(a.id)) fail('identificador de intento ausente o duplicado.');
    ids.add(a.id);
    const q = byId.get(a.questionId);
    if (!q || !Object.hasOwn(q.options, a.option)) fail('pregunta u opción desconocida.');
    if (typeof a.correct !== 'boolean' || a.correct !== (q.answer === a.option)) fail('resultado incoherente con el solucionario.');
    if (typeof a.hintUsed !== 'boolean') fail('uso de pista sin especificar.');
    if (typeof a.date !== 'string' || !Number.isFinite(Date.parse(a.date)) || new Date(a.date).toISOString() !== a.date) fail('fecha inválida; se requiere fecha ISO UTC.');
    return { id: a.id, questionId: a.questionId, option: a.option, correct: a.correct, date: a.date, hintUsed: a.hintUsed };
  });
  const v = value.view;
  const origin = v?.origin === undefined ? 'all' : v.origin;
  if (!v || !byId.has(v.questionId) || !['all', ...Object.keys(TOPICS)].includes(v.topic) || !Object.hasOwn(STATUSES, v.status)) fail('punto de lectura o filtros inválidos.');
  if (!['all', ...Object.keys(ORIGINS)].includes(origin)) fail('filtro de Teoría/Práctica inválido.');
  const drafts = {};
  if (!value.drafts || typeof value.drafts !== 'object' || Array.isArray(value.drafts)) fail('borradores inválidos.');
  for (const [id, d] of Object.entries(value.drafts)) {
    const q = byId.get(Number(id));
    if (!q || String(q.id) !== id || !d || typeof d !== 'object' || typeof d.hintUsed !== 'boolean'
        || (d.option !== null && !Object.hasOwn(q.options, d.option))) fail('borrador con pregunta u opción desconocida.');
    drafts[id] = { option: d.option, hintUsed: d.hintUsed };
  }
  // Older v1 backups have no origin filter; their IDs and attempts remain valid.
  return { format: 'ic2026-progress', version: 1, attempts, drafts, view: { questionId: v.questionId, topic: v.topic, status: v.status, origin } };
}
export function loadProgress(storage, questions) {
  let raw;
  try {
    raw = storage.getItem(STORAGE_KEY);
    return { progress: raw ? validateProgress(JSON.parse(raw), questions) : emptyProgress(), warning: '', recoveryRaw: null };
  } catch {
    return { progress: emptyProgress(), recoveryRaw: typeof raw === 'string' ? raw : null,
      warning: typeof raw === 'string'
        ? 'No se pudo leer el progreso guardado. Se conservarán los datos originales. Podés descargar esos datos desde Mi progreso, practicar en memoria e importar un respaldo o reiniciar para volver a guardar.'
        : 'No se pudo acceder al progreso local. Podés practicar en esta sesión y exportar tus intentos antes de cerrar.' };
  }
}
export function saveProgress(storage, progress) {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(progress)); return true; }
  catch { return false; }
}
