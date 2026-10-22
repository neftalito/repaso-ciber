"""Audit acronyms in all question text, options, solutions and distractor notes.

Every candidate must resolve to an explicit glossary meaning or a reviewed
exclusion. New uppercase/mixed-case tokens fail --check until reviewed.
"""
import argparse
import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORPUS = ['data/questions.json', 'data/practice-questions.json',
          'data/option-explanations.json', 'data/practice-option-explanations.json']
TOKEN = re.compile(r'(?<!\w)[A-Za-z][A-Za-z0-9_]*(?:[-/][A-Za-z0-9_]+)*(?:\.\d+)*(?!\w)')
WHOLE_TOKENS = {'S/MIME', 'PDF/A', 'TCP/25', 'HTTP/1.1', 'SHA-224/256/384/512'}


def read(path):
    return json.loads((ROOT / path).read_text())


def candidates():
    result = defaultdict(set)
    for path in CORPUS:
        for record in read(path)['questions']:
            identifier = record.get('id', record.get('questionId'))
            if 'distractors' in record:
                texts = record['distractors'].values()
            else:
                texts = [record['prompt'], record.get('code', ''), record.get('title', ''),
                         record['source'], *record['options'].values(), record['explanation']]
            for text in texts:
                for value in TOKEN.findall(text):
                    # Slashes often join independent concepts (DNS/PCAP).
                    tokens = [value] if value in WHOLE_TOKENS else value.split('/')
                    for token in tokens:
                        if sum(c.isupper() for c in token) >= 2:
                            result[token].add(identifier)
    return dict(sorted(result.items()))


def audit():
    glossary = read('data/glossary.json')['entries']
    excluded = read('data/acronym-exclusions.json')
    assert excluded['version'] == 1
    meanings = {}
    for entry in glossary:
        for acronym in entry.get('acronyms', []):
            assert acronym['term'].strip() and acronym['meaning'].strip()
            # Case matters: DOS is an OS, while DoS is a denial-of-service attack.
            for spelling in [acronym['term'], *acronym.get('aliases', [])]:
                assert spelling not in meanings, f'Duplicate acronym alias: {spelling}'
                meanings[spelling] = (entry['id'], acronym['term'], acronym['meaning'])
    found = candidates()
    unknown = sorted(set(found) - set(meanings) - set(excluded['tokens']))
    if unknown:
        raise ValueError('Unreviewed acronym candidates: ' + ', '.join(unknown))
    stale = set(excluded['tokens']) - set(found)
    assert not stale, f'Remove stale exclusions: {sorted(stale)}'
    assert not set(excluded['tokens']) & set(meanings), 'An exclusion must not hide a defined acronym'
    coverage, exclusions = [], []
    for token, ids in found.items():
        if token in meanings:
            concept, term, meaning = meanings[token]
            coverage.append(dict(token=token, term=term, meaning=meaning, conceptId=concept, questionIds=sorted(ids)))
        else:
            reason = excluded['tokens'][token]
            assert len(reason.strip()) > 15
            exclusions.append(dict(token=token, reason=reason, questionIds=sorted(ids)))
    question_count = sum(len(read(path)['questions']) for path in CORPUS[:2])
    note_count = sum(len(record['distractors']) for path in CORPUS[2:] for record in read(path)['questions'])
    note_label = f'{note_count:,}'.replace(',', '.')
    return dict(version=1, scope=f'{question_count} consignas, opciones, soluciones, referencias y {note_label} explicaciones de distractores; se revisan siglas, acrónimos, variantes y abreviaturas técnicas.',
                checks=dict(questionsScanned=question_count, distractorExplanationsScanned=note_count, candidates=len(found),
                            covered=len(coverage), reviewedExclusions=len(exclusions), missing=0),
                coverage=coverage, exclusions=exclusions,
                documents=[dict(file=path, sha256=hashlib.sha256((ROOT / path).read_bytes()).hexdigest()) for path in CORPUS])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    report = audit()
    text = json.dumps(report, ensure_ascii=False, indent=2) + '\n'
    path = ROOT / 'data/acronym-audit.json'
    if args.check:
        assert path.read_text() == text, 'Acronym audit differs; regenerate and review'
    else:
        path.write_text(text)
    print(f'OK: {report["checks"]["covered"]} variantes con significado, {report["checks"]["reviewedExclusions"]} exclusiones revisadas y ninguna sigla pendiente.')


if __name__ == '__main__':
    main()
