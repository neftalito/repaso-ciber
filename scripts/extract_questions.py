"""Extract and cross-check the supplied PDFs. No network access is used.

python scripts/extract_questions.py         writes the validated data
python scripts/extract_questions.py --check compares it with versioned data
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
DOCS = ROOT / 'docs'
QUESTION_FILE = 'IC_2026_Cripto_CSIRT_Malware_350_Preguntas.pdf'
SOLUTION_FILE = 'IC_2026_Cripto_CSIRT_Malware_Solucionario.pdf'
MANUAL_FILE = 'Manual_IC2026_Cripto_CSIRT_Malware_Descarga.pdf'
IDS = list(range(1, 351))


def clean(text):
    # The source wraps prose but contains no multiline code blocks in questions.
    # Keep punctuation, shell flags, backslashes and hexadecimal literals intact.
    return unicodedata.normalize('NFC', re.sub(r'\s+', ' ', text.replace('\u00ad', '')).strip())


def body_pages(reader):
    for number, page in enumerate(reader.pages, 1):
        if number == 1:
            continue
        lines = page.extract_text().splitlines()
        if len(lines) < 3 or lines[2].strip() != str(number):
            raise ValueError(f'Unexpected running header on page {number}')
        text = '\n'.join(lines[3:])
        text = re.sub(r'(?m)^(Criptografía|CSIRT|Malware)\s*\n(?:Preguntas de opción múltiple[^\n]*\n?)?', '', text)
        yield number, text


def records(pages):
    locations, parts = {}, []
    for page, text in pages:
        for value in re.findall(r'(?m)^(\d{3})\.\s', text):
            identifier = int(value)
            if identifier in locations:
                raise ValueError(f'Duplicate ID {identifier}')
            locations[identifier] = page
        parts.append(text)
    text = '\n'.join(parts)
    matches = list(re.finditer(r'(?m)^(\d{3})\.\s', text))
    if [int(m[1]) for m in matches] != IDS:
        raise ValueError('Expected exactly 350 ordered IDs, 001–350')
    return {int(m[1]): text[m.end():matches[i+1].start() if i+1 < len(matches) else len(text)].strip()
            for i, m in enumerate(matches)}, locations


def extract():
    question_reader = PdfReader(DOCS / QUESTION_FILE)
    question_pages, annex_pages = [], []
    in_annex = False
    for page, text in body_pages(question_reader):
        if 'Anexo final de respuestas' in text:
            in_annex = True
        (annex_pages if in_annex else question_pages).append((page, text))
    raw, locations = records(question_pages)
    annex, annex_locations = records(annex_pages)
    solution_reader = PdfReader(DOCS / SOLUTION_FILE)
    solved, solution_locations = records(body_pages(solution_reader))
    mapping = json.loads((ROOT / 'data/concept-map.json').read_text())
    glossary = json.loads((ROOT / 'data/glossary.json').read_text())
    concept_ids = {entry['id'] for entry in glossary['entries']}
    if set(mapping) != {str(i) for i in IDS}:
        raise ValueError('Concept map must cover exactly IDs 1–350')
    questions = []
    for identifier in IDS:
        # Justification lines are blank writing space, not part of option E.
        if raw[identifier].count('Justificación:') != 1:
            raise ValueError(f'Unexpected justification marker: {identifier}')
        body = raw[identifier].split('Justificación:')[0]
        options = list(re.finditer(r'(?m)^\s*([A-E])\)\s*', body))
        if [o[1] for o in options] != list('ABCDE'):
            raise ValueError(f'Missing or reordered options: {identifier}')
        prompt = clean(body[:options[0].start()])
        choices = {o[1]: clean(body[o.end():options[i+1].start() if i < 4 else len(body)])
                   for i, o in enumerate(options)}
        solution = re.fullmatch(r'(.*?)Respuesta correcta:\s*([A-E])\)\s*(.*?)Explicación:\s*(.*?)Fuente:\s*(.*)', solved[identifier], re.S)
        answer_record = re.fullmatch(r'(.*?)Respuesta:\s*([A-E])\)\s*(.*)', annex[identifier], re.S)
        if not solution or not answer_record:
            raise ValueError(f'Unrecognized solution or annex: {identifier}')
        solution_prompt, answer, answer_text, explanation, source = solution.groups()
        annex_prompt, annex_answer, annex_answer_text = answer_record.groups()
        if clean(solution_prompt) != prompt or clean(annex_prompt) != prompt:
            raise ValueError(f'Prompt mismatch between PDFs: {identifier}')
        if answer != annex_answer or clean(answer_text) != choices[answer] or clean(annex_answer_text) != choices[answer]:
            raise ValueError(f'Answer letter/text mismatch between PDFs: {identifier}')
        ids = mapping[str(identifier)]
        if not ids or len(ids) != len(set(ids)) or any(i not in concept_ids for i in ids):
            raise ValueError(f'Invalid glossary links: {identifier}')
        question = dict(id=identifier, topic='cripto' if identifier <= 66 else 'csirt' if identifier <= 226 else 'malware',
                        prompt=prompt, options=choices, answer=answer, explanation=clean(explanation), source=clean(source),
                        questionPage=locations[identifier], solutionPage=solution_locations[identifier],
                        annexPage=annex_locations[identifier], conceptIds=ids)
        if any(not value or '\ufffd' in value or re.search(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', value)
               for value in [prompt, *choices.values(), question['explanation'], question['source']]):
            raise ValueError(f'Empty or damaged text: {identifier}')
        questions.append(question)
    counts = dict(Counter(q['topic'] for q in questions))
    if counts != {'cripto': 66, 'csirt': 160, 'malware': 124}:
        raise ValueError('Topic counts differ from the supplied index')
    # Regression checks for easily damaged CLI and Windows path fragments.
    if 'whois 163.10.5.66 -h whois.lacnic.net' not in questions[104]['prompt']:
        raise ValueError('WHOIS command damaged')
    if 'HKLM\\System\\CurrentControlSet\\Services' not in questions[321]['prompt']:
        raise ValueError('Registry path damaged')
    report = dict(version=1, extractor='pypdf', extractorVersion=pypdf_version, checks=dict(uniqueConsecutiveIds=350, optionsPerQuestion=5,
                  solutionPromptsMatched=350, solutionAnswersMatched=350, annexPromptsMatched=350,
                  annexAnswersMatched=350, glossaryLinksValidated=350, topicCounts=counts),
                  documents=[dict(file='docs/'+name, pages=len(PdfReader(DOCS / name).pages),
                             sha256=hashlib.sha256((DOCS / name).read_bytes()).hexdigest())
                             for name in [QUESTION_FILE, SOLUTION_FILE, MANUAL_FILE]])
    return {'questions.json': dict(version=1, origin='theory', questions=questions), 'extraction-report.json': report}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='verify without writing')
    args = parser.parse_args()
    # No outputs are written until the complete extraction passes every check.
    outputs = extract()
    for name, value in outputs.items():
        path = ROOT / 'data' / name
        text = json.dumps(value, ensure_ascii=False, indent=2) + '\n'
        if args.check:
            if not path.exists() or path.read_text() != text:
                raise ValueError(f'{name} differs; regenerate and review')
        else:
            path.write_text(text)
    print('OK: 350 preguntas, 1.750 opciones, 350 soluciones y 350 enunciados/respuestas del anexo coinciden.')


if __name__ == '__main__':
    main()
