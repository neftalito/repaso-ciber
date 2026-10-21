"""Validate versioned content and all local file/concept references (stdlib only)."""
import json
import hashlib
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
ROOT = Path(__file__).resolve().parents[1]

def read(name):
    return json.loads((ROOT / name).read_text())

def validate():
    bank, glossary, report = read('data/questions.json'), read('data/glossary.json'), read('data/extraction-report.json')
    qs, entries = bank['questions'], glossary['entries']
    assert bank['version'] == glossary['version'] == report['version'] == 1
    assert [q['id'] for q in qs] == list(range(1, 351))
    assert Counter(q['topic'] for q in qs) == {'cripto': 66, 'csirt': 160, 'malware': 124}
    ids = {e['id'] for e in entries}
    assert len(ids) == len(entries)
    manual_terms = {'aead','backdoor','base64','botnet','cbc','csirt','cia','ciphertext','digest','dns','envelope','ioc','iv','keystream','malware','mitm','mx','no-repudio','packing','pe','phishing','plaintext','pgp','prompt-injection','rdap','registry','rir','run-key','sha-256','smtp','tlp','virtualprotect','whois'}
    assert {e['id'] for e in entries if e['fromManualGlossary']} == manual_terms
    for e in entries:
        assert re.fullmatch(r'[a-z0-9-]+', e['id'])
        assert all(isinstance(e[k], str) and e[k].strip() and '\ufffd' not in e[k] for k in ['term','definition','explanation','hint'])
        assert e['topics'] and set(e['topics']) <= {'cripto','csirt','malware'}
        assert e['manualPages'] and all(type(p) is int and 1 <= p <= 55 for p in e['manualPages'])
    mapping = read('data/concept-map.json')
    for q in qs:
        assert list(q['options']) == list('ABCDE') and all(q['options'].values())
        assert q['answer'] in q['options'] and q['explanation'] and q['source']
        assert q['conceptIds'] == mapping[str(q['id'])] and set(q['conceptIds']) <= ids and q['conceptIds']
        assert 2 <= q['questionPage'] <= 152 and 2 <= q['solutionPage'] <= 43 and 153 <= q['annexPage'] <= 172
        assert all(q['topic'] in next(e for e in entries if e['id'] == c)['topics'] for c in q['conceptIds']), q['id']
    notes = read('data/option-explanations.json')
    assert notes['version'] == 1 and notes['authorship']
    assert [n['questionId'] for n in notes['questions']] == list(range(1, 351))
    for q, n in zip(qs, notes['questions']):
        fingerprint = hashlib.sha256(json.dumps({k:q[k] for k in ['prompt','options','answer']}, ensure_ascii=False, sort_keys=True, separators=(',',':')).encode()).hexdigest()
        assert n['questionFingerprint'] == fingerprint, f'Explanations need review after question change: {q["id"]}'
        assert list(n['distractors']) == [letter for letter in 'ABCDE' if letter != q['answer']]
        assert all(isinstance(t, str) and len(t.strip()) > 35 and '\ufffd' not in t for t in n['distractors'].values())
        assert n['manualPages'] and all(type(p) is int and 1 <= p <= 55 for p in n['manualPages'])
    comparisons = read('data/comparisons.json')
    assert comparisons['version'] == 1 and comparisons['authorship']
    comparison_ids = {c['id'] for c in comparisons['comparisons']}
    assert len(comparison_ids) == len(comparisons['comparisons']) and not comparison_ids & ids
    for c in comparisons['comparisons']:
        assert re.fullmatch(r'comparar-[a-z0-9-]+', c['id']) and c['title'] and c['takeaway'] and c['example']
        assert c['topics'] and set(c['topics']) <= {'cripto','csirt','malware'}
        assert set(c['conceptIds']) <= ids and c['conceptIds']
        assert len(c['columns']) >= 2 and all(col['conceptId'] in ids and col['label'] for col in c['columns'])
        assert c['rows'] and all(row['aspect'] and len(row['values']) == len(c['columns']) and all(row['values']) for row in c['rows'])
        assert c['manualPages'] and all(type(p) is int and 1 <= p <= 55 for p in c['manualPages'])
    for doc in report['documents']:
        assert hashlib.sha256((ROOT/doc['file']).read_bytes()).hexdigest() == doc['sha256'], 'Source PDF changed'
    checks = report['checks']
    assert checks['annexPromptsMatched'] == checks['annexAnswersMatched'] == checks['solutionPromptsMatched'] == checks['solutionAnswersMatched'] == 350
    class Links(HTMLParser):
        def __init__(self): super().__init__(); self.links=[]; self.ids=[]
        def handle_starttag(self, tag, attrs):
            attrs=dict(attrs)
            if 'id' in attrs: self.ids.append(attrs['id'])
            for k in ['href','src']:
                if attrs.get(k): self.links.append(attrs[k])
    for file in ['index.html','glosario.html']:
        parser=Links();parser.feed((ROOT/file).read_text())
        assert len(parser.ids) == len(set(parser.ids)), 'Duplicate HTML ID'
        for ref in parser.links:
            url=urlsplit(ref)
            assert not url.path.startswith('/'), f'Absolute path incompatible with Pages subpath: {ref}'
            if url.scheme: continue
            if url.path:
                assert (ROOT/unquote(url.path)).is_file(), f'Missing local reference: {ref}'
            elif url.fragment:
                assert url.fragment in parser.ids, f'Missing fragment: {ref}'
    for file in ['assets/app.js','assets/glossary.js']:
        code=(ROOT/file).read_text()
        for ref in re.findall(r"fetch\(['\"]([^'\"]+)",code): assert (ROOT/ref).is_file(), ref
        assert not re.search(r"(?:fetch\(|href\s*=\s*)['\"]/", code)
    print(f'OK: 350 IDs, 1.750 opciones, 1.400 explicaciones de distractores, {len(entries)} conceptos, {len(comparison_ids)} comparaciones y todas las referencias locales.')
if __name__ == '__main__': validate()
