"""Extract the 120 original four-choice practice questions and their reasoned key.

Keep original wording, numbering, option order, Base/Ampliación and difficulty.
Editorial concept links and explanations of incorrect options are reviewed in
data/exam-editorial.json. --check reproduces data without modifying files.
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
QUESTION_FILE = 'Parcial_IC_Preguntas_Multiple_Choice.pdf'
SOLUTION_FILE = 'Parcial_IC_Solucionario_Razonado.pdf'
GUIDE_FILE = 'Guia_Diffie_Hellman_y_RSA.pdf'


def clean(text):
    return unicodedata.normalize('NFC', re.sub(r'\s+', ' ', text).strip())


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def pages(name):
    reader = PdfReader(ROOT / 'docs' / name)
    result = []
    for index, page in enumerate(reader.pages, 1):
        text = page.extract_text().splitlines()
        assert text[0].startswith('Introducción a la Ciberseguridad'), (name, index)
        assert text[1] == f'Página {index}', (name, index)
        text = [line for line in text[2:] if not re.match(r'^\d{2}\. |^Guía de referencia:', line)]
        result.append((index, '\n'.join(text).split('Repaso final sugerido')[0]))
    return result


def extract_raw():
    units = []
    reader = PdfReader(ROOT / 'docs' / QUESTION_FILE)
    for page in reader.pages[1:]:
        for match in re.finditer(r'(?m)^(\d{2})\. (.+)$', page.extract_text()):
            units.append((int(match[1]), clean(match[2])))
    assert [n for n, _ in units] == list(range(1, 13)), units
    questions = []
    for page_number, text in pages(QUESTION_FILE)[1:]:
        matches = list(re.finditer(r'(?m)^(\d{3}) · (Básico|Intermedio|Avanzado) · (Base|Ampliación) · ([^\n]+)\n', text))
        for i, match in enumerate(matches):
            number = int(match[1])
            body = text[match.end():matches[i + 1].start() if i + 1 < len(matches) else len(text)]
            choices = list(re.finditer(r'(?m)^\s*([A-D])\) ', body))
            assert [m[1] for m in choices] == list('ABCD'), number
            options = {m[1]: clean(body[m.end():choices[j + 1].start() if j + 1 < len(choices) else len(body)]) for j, m in enumerate(choices)}
            assert len(set(options.values())) == 4 and all(options.values()), number
            questions.append(dict(number=number, difficulty=match[2], coverage=match[3], reference=clean(match[4]),
                unit=units[(number - 1) // 10][1], prompt=clean(body[:choices[0].start()]), options=options, questionPage=page_number))
    assert [q['number'] for q in questions] == list(range(1, 121))
    solutions = {}
    for page_number, text in pages(SOLUTION_FILE)[1:]:
        matches = list(re.finditer(r'(?m)^(\d{3}) · Respuesta ([A-D]): ', text))
        for i, match in enumerate(matches):
            number, answer = int(match[1]), match[2]
            assert number not in solutions
            body = text[match.end():matches[i + 1].start() if i + 1 < len(matches) else len(text)]
            reference = list(re.finditer(r'(?m)^(Base|Ampliación) · ([^\n]+)\s*$', body))
            assert len(reference) == 1, number
            ref = reference[0]
            source = clean(body[:ref.start()])
            option = questions[number - 1]['options'][answer]
            assert source.startswith(option), (number, option, source)
            explanation = source[len(option):].strip()
            assert explanation and not body[ref.end():].strip(), number
            solutions[number] = dict(answer=answer, explanation=explanation, solutionPage=page_number,
                                     coverage=ref[1], reference=clean(ref[2]))
    assert sorted(solutions) == list(range(1, 121))
    quick_key = {int(n): letter for n, letter in re.findall(r'\b(\d{3}) ([A-D])\b', pages(SOLUTION_FILE)[0][1])}
    assert len(quick_key) == 120
    for q in questions:
        solution = solutions[q['number']]
        assert (q['coverage'], q['reference']) == (solution['coverage'], solution['reference']), q['number']
        assert quick_key[q['number']] == solution['answer'], q['number']
        q.update(solution)
        q['sourceFingerprint'] = fingerprint({k: q[k] for k in ['prompt', 'options', 'answer', 'explanation', 'reference']})
    return questions


def extract():
    originals = extract_raw()
    editorial = json.loads((ROOT / 'data/exam-editorial.json').read_text())
    concepts = {e['id']: e for e in json.loads((ROOT / 'data/glossary.json').read_text())['entries']}
    assert editorial['version'] == 1 and [r['number'] for r in editorial['questions']] == list(range(1, 121))
    questions, notes = [], []
    for q, review in zip(originals, editorial['questions']):
        assert review['sourceFingerprint'] == q['sourceFingerprint'], f'Editorial review needed: {q["number"]}'
        distractors = {k: review['distractors'][k] for k in q['options'] if k != q['answer']}
        assert set(review['distractors']) == set(distractors) and all(len(s.strip()) > 35 for s in distractors.values())
        topic = 'cripto' if q['number'] <= 60 else 'csirt' if q['number'] <= 100 else 'malware'
        assert review['conceptIds'] and all(topic in concepts[id]['topics'] for id in review['conceptIds'])
        record = dict(id=442 + q['number'], origin='practice', collection='exam', sourceNumber=q['number'],
            title=q['unit'], practice=f'Banco de parcial · Unidad {(q["number"] - 1) // 10 + 1:02}',
            topic=topic, prompt=q['prompt'], options=q['options'], answer=q['answer'], explanation=q['explanation'],
            source=f'{q["coverage"]} · {q["reference"]}', coverage=q['coverage'], difficulty=q['difficulty'],
            questionPage=q['questionPage'], solutionPage=q['solutionPage'],
            questionDocument=QUESTION_FILE, solutionDocument=SOLUTION_FILE, conceptIds=review['conceptIds'])
        questions.append(record)
        notes.append(dict(questionId=record['id'], questionFingerprint=fingerprint({k: record[k] for k in ['prompt', 'options', 'answer']}),
            distractors=distractors, manualPages=review.get('manualPages', []), practicePages=review.get('practicePages', []),
            dhRsaPages=review.get('dhRsaPages', [])))
    report = dict(version=1, extractor='scripts/extract_exam_questions.py', pypdfVersion=pypdf_version,
        checks=dict(questions=120, originalOptions=480, solutionOptionsMatched=120, quickKeyMatched=120,
                    distractorExplanations=360, topicCounts=dict(Counter(q['topic'] for q in questions))),
        documents=[dict(file=name, pages=len(PdfReader(ROOT / 'docs' / name).pages),
                        sha256=hashlib.sha256((ROOT / 'docs' / name).read_bytes()).hexdigest()) for name in [QUESTION_FILE, SOLUTION_FILE, GUIDE_FILE]])
    return {'data/exam-questions.json': dict(version=1, origin='practice', collection='exam', questions=questions),
        'data/exam-option-explanations.json': dict(version=1, authorship='Las cuatro opciones y la solución son originales del PDF. Las explicaciones de distractores son ampliaciones didácticas revisadas.', questions=notes),
        'data/exam-extraction-report.json': report}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--review', action='store_true', help='Print original extracted records for editorial review only')
    args = parser.parse_args()
    if args.review:
        print(json.dumps(extract_raw(), ensure_ascii=False, indent=2))
        return
    for name, value in extract().items():
        text = json.dumps(value, ensure_ascii=False, indent=2) + '\n'
        if args.check:
            assert (ROOT / name).read_text() == text, f'Generated file differs: {name}'
        else:
            (ROOT / name).write_text(text)
    print('OK: 120 preguntas, 480 opciones originales, 120 claves cotejadas y 360 explicaciones de distractores.')


if __name__ == '__main__':
    main()
