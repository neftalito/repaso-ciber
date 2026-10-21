"""Extract the 92 open exercises and match each prompt against its solution.

The multiple-choice adaptation is reviewed separately in practice-editorial.json.
Run with --check to reproduce all generated practice data without writing files.
"""
import argparse
import hashlib
import json
import re
import unicodedata
from collections import Counter
from pathlib import Path
from pypdf import PdfReader, __version__ as pypdf_version

ROOT = Path(__file__).resolve().parents[1]
QUESTION_FILE = 'IC2026_Preguntas_Basadas_en_Practicas_1_y_2.pdf'
SOLUTION_FILE = 'IC2026_Solucionario_Practicas_1_y_2.pdf'
GUIDE_FILE = 'Guia_de_estudio_IC_Practicas_1_y_2.pdf'
ADAPTATION = 'Consigna abierta original adaptada a cinco opciones de elaboración didáctica. La explicación correcta conserva el solucionario de prácticas.'


def clean(text):
    return unicodedata.normalize('NFC', re.sub(r'\s+', ' ', text).strip())


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def records(name):
    reader = PdfReader(ROOT / 'docs' / name)
    parts, locations, code_lines = [], {}, {}
    current = None
    for number, page in enumerate(reader.pages, 1):
        if number == 1:
            continue
        def visitor(text, cm, tm, font, size):
            nonlocal current
            match = re.match(r'^(\d{2}) · ', text)
            if match:
                current = int(match[1])
            if current and 'Mono' in str((font or {}).get('/BaseFont', '')):
                code_lines.setdefault(current, []).append(text.rstrip('\n'))
        lines = page.extract_text(visitor_text=visitor).splitlines()
        if lines[1] != f'{"Preguntas" if name == QUESTION_FILE else "Solucionario"} · Página {number}':
            raise ValueError(f'Unexpected header: {name}, {number}')
        text = re.sub(r'(?m)^PRÁCTICA [^\n]+\n?', '', '\n'.join(lines[2:]))
        for match in re.finditer(r'(?m)^(\d{2}) · ', text):
            identifier = int(match[1])
            if identifier in locations:
                raise ValueError(f'Duplicate practice exercise: {identifier}')
            locations[identifier] = number
        parts.append(text)
    text = '\n'.join(parts)
    matches = list(re.finditer(r'(?m)^(\d{2}) · (.+)\nReferencia: ([^\n]+)\n', text))
    if [int(m[1]) for m in matches] != list(range(1, 93)):
        raise ValueError('Expected exactly 92 ordered exercises')
    result = []
    for index, match in enumerate(matches):
        identifier = int(match[1])
        result.append(dict(number=identifier, title=clean(match[2]), reference=clean(match[3]), page=locations[identifier],
                           body=text[match.end():matches[index + 1].start() if index + 1 < len(matches) else len(text)].strip(),
                           code='\n'.join(code_lines.get(identifier, []))))
    return reader, result


def extract_raw():
    _, questions = records(QUESTION_FILE)
    _, solutions = records(SOLUTION_FILE)
    for q, s in zip(questions, solutions):
        prompt, explanation = s['body'].split('Solución:', 1)
        if (q['title'], q['reference'], clean(q['body'])) != (s['title'], s['reference'], clean(prompt)):
            raise ValueError(f'Question/solution mismatch: {q["number"]}')
        q['solution'] = clean(explanation)
        q['solutionPage'] = s['page']
        q['sourceFingerprint'] = fingerprint({k: clean(q[k]) for k in ['title', 'reference', 'body', 'solution']})
    return questions


def extract():
    raw = extract_raw()
    editorial = json.loads((ROOT / 'data/practice-editorial.json').read_text())
    entries = json.loads((ROOT / 'data/glossary.json').read_text())['entries']
    concepts = {e['id']: e for e in entries}
    assert editorial['version'] == 1 and [r['number'] for r in editorial['questions']] == list(range(1, 93))
    questions, notes = [], []
    for original, adapted in zip(raw, editorial['questions']):
        number = original['number']
        assert original['sourceFingerprint'] == adapted['sourceFingerprint'], f'Editorial review needed: {number}'
        assert len(adapted['distractors']) == 4 and all(d['text'] and len(d['explanation']) > 35 for d in adapted['distractors'])
        choices = [dict(text=adapted['correctOption'])] + adapted['distractors']
        # Balance correct positions without changing the stable question order.
        position = (number - 1) % 5
        choices = choices[-position:] + choices[:-position] if position else choices
        options = {letter: item['text'] for letter, item in zip('ABCDE', choices)}
        assert len(set(options.values())) == 5
        answer = 'ABCDE'[position]
        topic = 'cripto' if number <= 40 else 'csirt' if number <= 69 else 'malware'
        assert adapted['conceptIds'] and all(id in concepts and topic in concepts[id]['topics'] for id in adapted['conceptIds']), number
        prompt = clean(original['body'])
        code = original['code']
        if code:
            assert prompt.endswith(clean(code)), f'Code must remain separate and unchanged: {number}'
            prompt = prompt[:-len(clean(code))].rstrip()
        q = dict(id=350 + number, origin='practice', sourceNumber=number, title=original['title'],
                 practice='P1 · Parte 1' if number <= 25 else 'P1 · Parte 2' if number <= 40 else 'P2 · Parte 1' if number <= 51 else 'P2 · Parte 2' if number <= 69 else 'P2 · Parte 3',
                 topic=topic, prompt=prompt, code=code, options=options, answer=answer,
                 explanation=original['solution'], source=original['reference'], questionPage=original['page'],
                 solutionPage=original['solutionPage'], conceptIds=adapted['conceptIds'], adaptationNote=ADAPTATION)
        assert all(text and '\ufffd' not in text for text in [prompt, *options.values(), q['explanation']])
        questions.append(q)
        notes.append(dict(questionId=q['id'], questionFingerprint=fingerprint({k:q[k] for k in ['prompt','code','options','answer']}),
                          distractors={letter:item['explanation'] for letter,item in zip('ABCDE',choices) if letter != answer},
                          manualPages=[], practicePages=adapted['guidePages'], referenceNote='Explicación de la opción adaptada; referencias a la guía de prácticas disponible.'))
    report = dict(version=1, extractor='pypdf', extractorVersion=pypdf_version,
                  checks=dict(questionCount=92, solutionPromptsMatched=92, originalSolutionsPreserved=92, adaptedOptions=460,
                              distractorExplanations=368, topicCounts=dict(Counter(q['topic'] for q in questions))),
                  documents=[dict(file='docs/' + name, pages=len(PdfReader(ROOT / 'docs' / name).pages),
                                  sha256=hashlib.sha256((ROOT / 'docs' / name).read_bytes()).hexdigest())
                             for name in [QUESTION_FILE, SOLUTION_FILE, GUIDE_FILE]])
    return {'practice-questions.json': dict(version=1, adaptationNote=ADAPTATION, questions=questions),
            'practice-option-explanations.json': dict(version=1, authorship='Ampliaciones didácticas de opciones adaptadas; no son transcripciones del solucionario.', questions=notes),
            'practice-extraction-report.json': report}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    outputs = extract()
    for name, value in outputs.items():
        path = ROOT / 'data' / name
        text = json.dumps(value, ensure_ascii=False, indent=2) + '\n'
        if args.check:
            assert path.read_text() == text, f'{name} differs; regenerate and review'
        else:
            path.write_text(text)
    print('OK: 92 consignas y soluciones coinciden; 460 opciones adaptadas y 368 explicaciones verificadas.')


if __name__ == '__main__':
    main()
