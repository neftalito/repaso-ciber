import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { emptyProgress, beginRetry, confirmAttempt, latestAttempt, questionStatus, statistics, filterQuestions, validateProgress, loadProgress, saveProgress, STORAGE_KEY } from '../assets/progress.mjs';
const questions = JSON.parse(readFileSync(new URL('../data/questions.json', import.meta.url))).questions;
const confirm = (s, id, option, hintUsed = false) => { s.drafts[id] = { option, hintUsed }; return confirmAttempt(s, questions[id - 1]); };

test('correction uses the bank, records date/help, and latest attempt determines status', () => {
  const s = emptyProgress();
  assert.throws(() => confirmAttempt(s, questions[0]), /Elegí/);
  const a = confirm(s, 1, 'A');
  assert.equal(a.correct, false); assert.equal(a.hintUsed, false); assert.ok(Number.isFinite(Date.parse(a.date)));
  assert.equal(questionStatus(s, 1), 'incorrect'); assert.equal(questionStatus(s, 2), 'pending');
  beginRetry(s, 1); assert.deepEqual(s.drafts[1], { option: null, hintUsed: false }); assert.equal(s.attempts.length, 1);
  confirm(s, 1, 'E', true);
  assert.equal(s.attempts.length, 2); assert.equal(questionStatus(s, 1), 'correct'); assert.equal(latestAttempt(s, 1).hintUsed, true); assert.equal(s.drafts[1], undefined);
});
test('statistics distinguish latest question states from total attempts and help', () => {
  const s = emptyProgress(); confirm(s, 1, 'A'); confirm(s, 1, 'E', true); confirm(s, 2, 'A'); confirm(s, 3, 'A', true);
  assert.deepEqual(statistics(s), { answered: 3, correct: 2, incorrect: 1, attempts: 4, assisted: 2, assistedCorrect: 1, independent: 2, independentCorrect: 1 });
});
test('topic and last-result filters combine and preserve source order', () => {
  const s = emptyProgress(); confirm(s, 1, 'E'); confirm(s, 67, 'A');
  s.view.topic = 'cripto'; s.view.status = 'pending'; const result = filterQuestions(questions, s);
  assert.equal(result.length, 65); assert.equal(result[0].id, 2); assert.equal(result.at(-1).id, 66);
  s.view.status = 'correct'; assert.deepEqual(filterQuestions(questions, s).map(q => q.id), [1]);
  s.view.topic = 'malware'; s.view.status = 'all'; assert.equal(filterQuestions(questions, s).length, 124);
});
test('export/import round-trip keeps history, reading position, filters and retry drafts', () => {
  const s = emptyProgress(); confirm(s, 350, questions[349].answer); beginRetry(s, 350); s.drafts[350].hintUsed = true;
  s.view = { questionId: 350, topic: 'malware', status: 'correct' };
  assert.deepEqual(validateProgress(JSON.parse(JSON.stringify({ ...s, exportedAt: new Date().toISOString() })), questions), s);
});
test('imports reject incompatible versions, unknown ids/options, incoherent results and malformed dates', () => {
  const good = emptyProgress(); confirm(good, 1, 'E');
  const mutations = [s => s.version = 2, s => s.format = 'other', s => s.attempts = {}, s => s.attempts[0].questionId = 351,
    s => s.attempts[0].option = 'F', s => s.attempts[0].option = '__proto__', s => s.attempts[0].correct = false,
    s => s.attempts[0].date = 'ayer', s => s.attempts[0].date = 0, s => s.attempts[0].hintUsed = 'false',
    s => s.attempts.push({ ...s.attempts[0] }), s => s.view.questionId = 0, s => s.view.topic = 'typo', s => s.view.status = 'unknown',
    s => s.drafts = null, s => s.drafts[351] = { option: 'A', hintUsed: false }, s => s.drafts[1] = { option: 'F', hintUsed: false }];
  for (const mutate of mutations) { const s = structuredClone(good); mutate(s); assert.throws(() => validateProgress(s, questions), /Progreso inválido/); }
  assert.throws(() => validateProgress(null, questions));
});
test('blocked storage and corrupt data leave a usable in-memory session', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); } };
  const loaded = loadProgress(blocked, questions); assert.ok(loaded.warning); confirm(loaded.progress, 1, 'E');
  assert.equal(saveProgress(blocked, loaded.progress), false); assert.equal(loaded.progress.attempts.length, 1);
  const corrupt = { getItem() { return '{'; } };
  assert.ok(loadProgress(corrupt, questions).warning);
  assert.equal(loadProgress(corrupt, questions).recoveryRaw, '{');
  const memory = new Map(); const storage = { getItem: k => memory.get(k), setItem: (k, v) => memory.set(k, v) };
  assert.equal(saveProgress(storage, loaded.progress), true); assert.ok(memory.has(STORAGE_KEY)); assert.deepEqual(loadProgress(storage, questions).progress, loaded.progress);
});
