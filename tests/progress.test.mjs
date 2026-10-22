import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { emptyProgress, beginRetry, confirmAttempt, latestAttempt, questionStatus, statistics, filterQuestions, validateProgress, loadProgress, saveProgress, startStudySession, endStudySession, studyStatistics, STORAGE_KEY } from '../assets/progress.mjs';
const theoretical = JSON.parse(readFileSync(new URL('../data/questions.json', import.meta.url))).questions.map(q => ({ ...q, origin:'theory' }));
const practical = JSON.parse(readFileSync(new URL('../data/practice-questions.json', import.meta.url))).questions;
const questions = [...theoretical, ...practical];
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
  s.view.origin = 'theory';
  s.view.topic = 'cripto'; s.view.status = 'pending'; const result = filterQuestions(questions, s);
  assert.equal(result.length, 65); assert.equal(result[0].id, 2); assert.equal(result.at(-1).id, 66);
  s.view.status = 'correct'; assert.deepEqual(filterQuestions(questions, s).map(q => q.id), [1]);
  s.view.topic = 'malware'; s.view.status = 'all'; assert.equal(filterQuestions(questions, s).length, 124);
});
test('export/import round-trip keeps history, reading position, filters and retry drafts', () => {
  const s = emptyProgress(); confirm(s, 350, questions[349].answer); beginRetry(s, 350); s.drafts[350].hintUsed = true;
  s.view = { questionId: 350, topic: 'malware', status: 'correct', origin: 'theory' };
  assert.deepEqual(validateProgress(JSON.parse(JSON.stringify({ ...s, exportedAt: new Date().toISOString() })), questions), s);
});
test('imports reject incompatible versions, unknown ids/options, incoherent results and malformed dates', () => {
  const good = emptyProgress(); confirm(good, 1, 'E');
  const mutations = [s => s.version = 2, s => s.format = 'other', s => s.attempts = {}, s => s.attempts[0].questionId = 443,
    s => s.attempts[0].option = 'F', s => s.attempts[0].option = '__proto__', s => s.attempts[0].correct = false,
    s => s.attempts[0].date = 'ayer', s => s.attempts[0].date = 0, s => s.attempts[0].hintUsed = 'false',
    s => s.attempts.push({ ...s.attempts[0] }), s => s.view.questionId = 0, s => s.view.topic = 'typo', s => s.view.status = 'unknown',
    s => s.drafts = null, s => s.drafts[443] = { option: 'A', hintUsed: false }, s => s.drafts[1] = { option: 'F', hintUsed: false },
    s => s.view.origin = 'unknown', s => s.view.origin = null];
  for (const mutate of mutations) { const s = structuredClone(good); mutate(s); assert.throws(() => validateProgress(s, questions), /Progreso inválido/); }
  assert.throws(() => validateProgress(null, questions));
});
test('practice origin combines with topic and last result without mixing the original theoretical IDs', () => {
  const s = emptyProgress(); s.view.origin = 'practice';
  assert.deepEqual(filterQuestions(questions,s).map(q => q.id), Array.from({length:92},(_,i)=>351+i));
  s.view.topic = 'csirt'; assert.equal(filterQuestions(questions,s).length,29);
  confirm(s,391,questions[390].answer,true); s.view.status = 'pending';
  assert.equal(filterQuestions(questions,s).length,28); s.view.status = 'correct';
  assert.deepEqual(filterQuestions(questions,s).map(q=>q.id),[391]);
  assert.deepEqual(validateProgress(s,questions),s);
});
test('existing v1 backups without an origin filter preserve attempts, drafts and reading position', () => {
  const s = emptyProgress(); confirm(s,350,questions[349].answer); beginRetry(s,350);
  s.view = {questionId:350,topic:'malware',status:'correct'};
  const restored = validateProgress(s,questions);
  assert.deepEqual(restored.attempts,s.attempts); assert.deepEqual(restored.drafts,s.drafts);
  assert.deepEqual(restored.view,{...s.view,origin:'all'});
  const practice = emptyProgress(); confirm(practice,442,questions[441].answer);
  practice.view = {questionId:442,topic:'malware',status:'all',origin:'practice'};
  assert.deepEqual(validateProgress(JSON.parse(JSON.stringify(practice)),questions),practice);
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

test('study draws exact counts without replacement for every combination of topic and origin', () => {
  const originalIds = questions.map(q => q.id);
  for (const topic of ['all', 'cripto', 'csirt', 'malware']) for (const origin of ['all', 'theory', 'practice']) {
    const pool = questions.filter(q => (topic === 'all' || q.topic === topic) && (origin === 'all' || q.origin === origin));
    const s = emptyProgress();
    startStudySession(s, questions, { count: pool.length, topic, origin }, () => 0);
    assert.equal(s.studySession.questionIds.length, pool.length);
    assert.equal(new Set(s.studySession.questionIds).size, pool.length);
    assert.deepEqual([...s.studySession.questionIds].sort((a,b) => a-b), pool.map(q => q.id));
    assert.deepEqual(filterQuestions(questions,s).map(q => q.id), s.studySession.questionIds);
    assert.equal(s.view.questionId, s.studySession.questionIds[0]);
    assert.deepEqual(validateProgress(s,questions),s);
  }
  assert.deepEqual(questions.map(q => q.id),originalIds);
  const small = emptyProgress();
  startStudySession(small,questions.slice(350,354),{count:4},() => 0);
  assert.deepEqual(filterQuestions(questions,small).map(q => q.id),[352,353,354,351]);
});
test('invalid study configurations leave the current route, drafts and attempts intact', () => {
  const s = emptyProgress(); confirm(s,1,'E'); const before=JSON.stringify(s);
  for (const count of [0,-1,1.5,NaN,Infinity,30,'2']) {
    assert.throws(() => startStudySession(s,questions,{count,topic:'csirt',origin:'practice'}), /cantidad entera/);
    assert.equal(JSON.stringify(s),before);
  }
  for (const config of [{count:1,topic:'unknown'},{count:1,origin:'unknown'}]) {
    assert.throws(() => startStudySession(s,questions,config),/válidos/); assert.equal(JSON.stringify(s),before);
  }
  assert.throws(() => startStudySession(s,[],{count:1}),/cantidad entera/);
});
test('new study attempts hide old solutions and session results count only its latest confirmed answers', () => {
  const s=emptyProgress(); const bank=questions.slice(350,353);
  for (const q of bank) confirm(s,q.id,q.answer,true);
  startStudySession(s,bank,{count:3},() => 0);
  assert.deepEqual(studyStatistics(s),{answered:0,correct:0,incorrect:0,assisted:0});
  assert.ok(bank.every(q => s.drafts[q.id].option===null && !s.drafts[q.id].hintUsed));
  const [first,second]=s.studySession.questionIds;
  const wrong=Object.keys(questions[first-1].options).find(k => k!==questions[first-1].answer);
  confirm(s,first,wrong,true); confirm(s,second,questions[second-1].answer);
  assert.deepEqual(studyStatistics(s),{answered:2,correct:1,incorrect:1,assisted:1});
  beginRetry(s,first);
  assert.deepEqual(studyStatistics(s),{answered:1,correct:1,incorrect:0,assisted:0});
  confirm(s,first,questions[first-1].answer);
  assert.deepEqual(studyStatistics(s),{answered:2,correct:2,incorrect:0,assisted:0});
  assert.equal(s.attempts.length,6); assert.deepEqual(validateProgress(s,questions),s);
});
test('study export/import preserves shuffled order, cursor, drafts, help and results', () => {
  const s=emptyProgress(); s.view={questionId:228,topic:'malware',origin:'theory',status:'pending'};
  startStudySession(s,questions,{count:10,topic:'csirt',origin:'practice'},() => 0.43);
  const [first,second]=s.studySession.questionIds;
  confirm(s,first,questions[first-1].answer,true); s.view.questionId=second;
  s.drafts[second]={option:'B',hintUsed:true};
  const memory=new Map(); const storage={getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v)};
  assert.equal(saveProgress(storage,s),true); assert.deepEqual(loadProgress(storage,questions).progress,s);
  const restored=validateProgress(JSON.parse(JSON.stringify({...s,exportedAt:new Date().toISOString()})),questions);
  assert.deepEqual(restored,s); assert.equal(filterQuestions(questions,restored)[1].id,second);
});
test('study imports reject invalid draws, mismatched filters, missing drafts and fabricated result references', () => {
  const s=emptyProgress(); startStudySession(s,questions,{count:3,topic:'csirt',origin:'practice'},() => 0.5);
  const id=s.view.questionId; confirm(s,id,questions[id-1].answer);
  const mutations=[
    v=>v.studySession=null, v=>v.studySession.questionIds=[],
    v=>v.studySession.questionIds.push(id), v=>v.studySession.questionIds[0]=999,
    v=>v.studySession.questionIds[0]=1, v=>v.studySession.topic='unknown',
    v=>v.studySession.origin='theory', v=>v.view.status='correct', v=>v.view.questionId=1,
    v=>v.studySession.previousView.questionId=999, v=>v.studySession.previousView.origin='unknown',
    v=>v.studySession.answers=[], v=>v.studySession.answers[id]='missing-attempt',
    v=>v.studySession.answers[v.studySession.questionIds[1]]=v.attempts[0].id,
    v=>v.studySession.answers[999]=v.attempts[0].id,
    v=>delete v.drafts[v.studySession.questionIds[1]],
    v=>v.drafts[id]={option:null,hintUsed:false}
  ];
  for (const mutate of mutations) { const value=structuredClone(s); mutate(value); assert.throws(() => validateProgress(value,questions),/Progreso inválido/); }
});
test('replacing or leaving a study route preserves history and restores the previous reading filters', () => {
  const s=emptyProgress(); s.view={questionId:67,topic:'csirt',origin:'theory',status:'incorrect'};
  const originalView={...s.view}; confirm(s,67,'A');
  startStudySession(s,questions,{count:1,topic:'malware'},() => 0.5);
  confirm(s,s.view.questionId,questions[s.view.questionId-1].answer);
  assert.equal(studyStatistics(s).answered,1);
  startStudySession(s,questions,{count:2,origin:'practice'},() => 0.5);
  assert.deepEqual(s.studySession.previousView,originalView); assert.equal(s.attempts.length,2);
  endStudySession(s); assert.deepEqual(s.view,originalView); assert.equal(s.studySession,undefined);
  assert.deepEqual(validateProgress(s,questions),s);
  endStudySession(s); assert.deepEqual(s.view,originalView);
});
