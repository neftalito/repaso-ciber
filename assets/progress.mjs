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
  if (progress.studySession) {
    const byId = new Map(questions.map(q => [q.id, q]));
    return progress.studySession.questionIds.map(id => byId.get(id));
  }
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
  if (progress.studySession?.questionIds.includes(question.id)) progress.studySession.answers[question.id] = attempt.id;
  return attempt;
}
export function beginRetry(progress, questionId) {
  progress.drafts[questionId] = { option: null, hintUsed: false };
  if (progress.studySession) delete progress.studySession.answers[questionId];
}
export function startStudySession(progress, questions, { count, topic = 'all', origin = 'all' }, random = Math.random) {
  if (!['all', ...Object.keys(TOPICS)].includes(topic) || !['all', ...Object.keys(ORIGINS)].includes(origin)) throw new Error('Elegí un tema y un origen válidos.');
  const pool = questions.filter(q => (topic === 'all' || q.topic === topic) && (origin === 'all' || q.origin === origin));
  if (!Number.isInteger(count) || count < 1 || count > pool.length) throw new Error(`Elegí una cantidad entera entre 1 y ${pool.length}.`);
  // Fisher–Yates shuffles a copy, preserving the bank and sampling without replacement.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const previousView = { ...(progress.studySession?.previousView ?? progress.view) };
  progress.studySession = { questionIds: pool.slice(0, count).map(q => q.id), topic, origin, answers: {}, previousView };
  for (const id of progress.studySession.questionIds) beginRetry(progress, id);
  progress.view = { questionId: progress.studySession.questionIds[0], topic, origin, status: 'all' };
}
export function endStudySession(progress) {
  if (!progress.studySession) return;
  progress.view = { ...progress.studySession.previousView };
  delete progress.studySession;
}
export function studyStatistics(progress) {
  const ids = new Set(Object.values(progress.studySession?.answers ?? {}));
  const attempts = progress.attempts.filter(a => ids.has(a.id));
  return { answered: attempts.length, correct: attempts.filter(a => a.correct).length,
    incorrect: attempts.filter(a => !a.correct).length, assisted: attempts.filter(a => a.hintUsed).length };
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
  const restored = { format: 'ic2026-progress', version: 1, attempts, drafts, view: { questionId: v.questionId, topic: v.topic, status: v.status, origin } };
  if (value.studySession !== undefined) {
    const s = value.studySession;
    if (!s || typeof s !== 'object' || !['all', ...Object.keys(TOPICS)].includes(s.topic)
        || !['all', ...Object.keys(ORIGINS)].includes(s.origin)) fail('configuración de modo estudio inválida.');
    if (!Array.isArray(s.questionIds) || !s.questionIds.length || s.questionIds.length > questions.length
        || new Set(s.questionIds).size !== s.questionIds.length || s.questionIds.some(id => {
          const q = byId.get(id);
          return !q || (s.topic !== 'all' && q.topic !== s.topic) || (s.origin !== 'all' && q.origin !== s.origin);
        })) fail('preguntas desconocidas, repetidas o fuera de los filtros del modo estudio.');
    if (!s.questionIds.includes(v.questionId) || v.topic !== s.topic || origin !== s.origin || v.status !== 'all') fail('punto de lectura incompatible con el modo estudio.');
    const previous = s.previousView;
    if (!previous || !byId.has(previous.questionId) || !['all', ...Object.keys(TOPICS)].includes(previous.topic)
        || !['all', ...Object.keys(ORIGINS)].includes(previous.origin) || !Object.hasOwn(STATUSES, previous.status)) fail('recorrido anterior inválido.');
    if (!s.answers || typeof s.answers !== 'object' || Array.isArray(s.answers)) fail('resultados del modo estudio inválidos.');
    const answers = {};
    const latest = new Map(attempts.map(a => [a.questionId, a]));
    for (const [id, attemptId] of Object.entries(s.answers)) {
      if (String(Number(id)) !== id || !s.questionIds.includes(Number(id)) || typeof attemptId !== 'string' || latest.get(Number(id))?.id !== attemptId || Object.hasOwn(drafts, id)) fail('resultado de modo estudio sin un intento correspondiente.');
      answers[id] = attemptId;
    }
    if (s.questionIds.some(id => !Object.hasOwn(answers, id) && !Object.hasOwn(drafts, id))) fail('pregunta de modo estudio sin borrador ni resultado.');
    restored.studySession = { questionIds: [...s.questionIds], topic: s.topic, origin: s.origin, answers,
      previousView: { questionId: previous.questionId, topic: previous.topic, status: previous.status, origin: previous.origin } };
  }
  return restored;
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
