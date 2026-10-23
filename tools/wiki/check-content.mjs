import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('../../content/wiki/', import.meta.url));
const sources = new Map(JSON.parse(readFileSync(path.join(directory, 'sources.json'), 'utf8')).map(source => [source.id, source]));
const sections = process.argv.slice(2);
if (sections.some(section => !/^[a-z0-9-]+$/.test(section))) throw new Error('Pass section directory names only');
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(path.join(dir, item.name)) : item.name.endsWith('.md') ? [path.join(dir, item.name)] : []); }
const files = sections.length ? sections.flatMap(section => walk(path.join(directory, section))) : walk(directory);
const ids = new Set();
let questions = 0;
let redirects = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
  if (!match) throw new Error(`Missing JSON metadata: ${file}`);
  const page = JSON.parse(match[1]);
  if (ids.has(page.id)) throw new Error(`Duplicate id: ${page.id}`);
  ids.add(page.id);
  if (!page.title || !Array.isArray(page.related) || !Array.isArray(page.sources) || !page.sources.length) throw new Error(`Missing metadata: ${file}`);
  if (/\b(?:TODO|TBD)\b/.test(match[2]) || /Lorem ipsum/i.test(match[2])) throw new Error(`Unfinished note: ${file}`);
  const reviews = [...match[2].matchAll(/^:::question .+\n/gm)].length;
  if (!page.redirectTo && page.type !== 'category' && !reviews) throw new Error(`Missing review answer: ${file}`);
  if (page.redirectTo) redirects++;
  if ([...match[2].matchAll(/^:::\s*$/gm)].length !== reviews) throw new Error(`Unbalanced review answers: ${file}`);
  for (const citation of page.sources) {
    const source = sources.get(citation.id);
    if (!source || !citation.pages?.length || citation.pages.some(p => !Number.isInteger(p) || p < 1 || p > source.pageCount)) throw new Error(`Invalid source pages: ${file}`);
  }
  questions += reviews;
}
console.log(`Content audit passed: ${ids.size - redirects} unique notes, ${questions} review answers; source page ranges valid${redirects ? `; ${redirects} compatibility notes` : ''}.`);
