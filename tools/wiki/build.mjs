import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, lstatSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
let root = path.resolve(toolDir, '../..');
let check = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') check = true;
  else if (args[i] === '--root' && args[i + 1] && !args[i + 1].startsWith('--')) root = path.resolve(args[++i]);
  else if (args[i] === '--help') {
    console.log('Usage: node tools/wiki/build.mjs [--check] [--root DIRECTORY]\nBuild the static Wiki. --check validates freshness without writing. --root selects a site root for isolated tests.');
    process.exit(0);
  } else {
    console.error(`Unknown or incomplete option: ${args[i]}`);
    process.exit(1);
  }
}

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const slugify = value => normalize(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
const posix = file => file.split(path.sep).join('/');
const pdfHref = file => file.split('/').map(encodeURIComponent).join('/');
function publicPdfExists(root, file) {
  if (typeof file !== 'string') return false;
  const parts = file.split('/');
  if (parts[0] !== 'docs' || ![2, 3].includes(parts.length) || (parts.length === 3 && parts[1] !== 'catedra cosas')) return false;
  if (!parts.slice(1).every(part => part !== '.' && part !== '..' && /^[\p{L}\p{N}._-][\p{L}\p{N} ._-]*$/u.test(part))) return false;
  if (!parts.at(-1).endsWith('.pdf')) return false;
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    if (!existsSync(current) || lstatSync(current).isSymbolicLink()) return false;
  }
  return lstatSync(current).isFile();
}
function filesIn(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en')).flatMap(item => {
    const file = path.join(directory, item.name);
    if (item.isSymbolicLink()) throw new Error(`Symbolic links are not allowed: ${file}`);
    return item.isDirectory() ? filesIn(file) : [file];
  });
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  const sourceDir = path.join(root, 'content/wiki');
  const outputDir = path.join(root, 'wiki');
  assert(!existsSync(outputDir) || !lstatSync(outputDir).isSymbolicLink(), 'Wiki output cannot be a symbolic link');
  const sources = JSON.parse(readFileSync(path.join(sourceDir, 'sources.json'), 'utf8'));
  assert(Array.isArray(sources), 'sources.json must contain an array');
  const bibliography = new Map();
  for (const source of sources) {
    assert(/^[a-z0-9-]+$/.test(source.id) && !bibliography.has(source.id), `Invalid or duplicate source: ${source.id}`);
    assert(typeof source.title === 'string' && source.title.length > 0 && Number.isInteger(source.pageCount) && source.pageCount > 0, `Invalid source metadata: ${source.id}`);
    assert(['official', 'companion'].includes(source.kind), `Invalid source kind: ${source.id}`);
    if (source.url !== null) assert(publicPdfExists(root, source.url), `Invalid public PDF: ${source.id}`);
    bibliography.set(source.id, source);
  }
  const allPages = filesIn(sourceDir).filter(file => file.endsWith('.md')).map(file => {
    const text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
    assert(match, `Missing JSON front matter: ${file}`);
    const metadata = JSON.parse(match[1]);
    assert(/^[a-z0-9-]+$/.test(metadata.id), `Invalid note id: ${file}`);
    assert(typeof metadata.title === 'string' && metadata.title.trim(), `Missing title: ${metadata.id}`);
    assert(typeof metadata.slug === 'string' && (metadata.id === 'wiki' ? metadata.slug === '' : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)), `Invalid slug: ${metadata.id}`);
    assert(metadata.permalink === undefined || (typeof metadata.permalink === 'string' && (metadata.id === 'wiki' ? metadata.permalink === '' : /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(metadata.permalink))), `Invalid permalink: ${metadata.id}`);
    assert(['category', 'concept', 'technique', 'algorithm', 'protocol', 'tool', 'practice'].includes(metadata.type), `Invalid concept type: ${metadata.id}`);
    assert(Number.isFinite(metadata.order) && Array.isArray(metadata.related) && Array.isArray(metadata.sources) && metadata.sources.length, `Missing note metadata: ${metadata.id}`);
    assert(metadata.aliases === undefined || (Array.isArray(metadata.aliases) && metadata.aliases.every(alias => typeof alias === 'string')), `Invalid search aliases: ${metadata.id}`);
    assert(metadata.redirectTo === undefined || (metadata.id !== 'wiki' && typeof metadata.redirectTo === 'string' && /^[a-z0-9-]+#[a-z0-9-]+$/.test(metadata.redirectTo)), `Invalid redirect target: ${metadata.id}`);
    assert(match[2].trim().length > 30, `Empty note: ${metadata.id}`);
    for (const citation of metadata.sources) {
      const source = bibliography.get(citation.id);
      assert(source && Array.isArray(citation.pages) && citation.pages.length && citation.pages.every(p => Number.isInteger(p) && p > 0 && p <= source.pageCount), `Invalid source/page in ${metadata.id}: ${citation.id}`);
    }
    return { ...metadata, body: match[2], file, children: [] };
  });
  const pages = allPages.filter(page => !page.redirectTo);
  const redirects = allPages.filter(page => page.redirectTo);
  const byId = new Map();
  for (const page of allPages) {
    assert(!byId.has(page.id), `Duplicate note id: ${page.id}`);
    byId.set(page.id, page);
  }
  const glossaryLinksFile = path.join(sourceDir, 'glossary-links.json');
  const glossaryLinks = existsSync(glossaryLinksFile) ? JSON.parse(readFileSync(glossaryLinksFile, 'utf8')) : {};
  assert(glossaryLinks && typeof glossaryLinks === 'object' && !Array.isArray(glossaryLinks), 'glossary-links.json must contain an object');
  let glossary = new Map();
  if (Object.keys(glossaryLinks).length) {
    const data = JSON.parse(readFileSync(path.join(root, 'data/glossary.json'), 'utf8'));
    assert(Array.isArray(data.entries), 'glossary.json must contain entries');
    glossary = new Map(data.entries.map(entry => [entry.id, entry]));
    assert(glossary.size === data.entries.length, 'Duplicate glossary ID');
  }
  for (const [id, targets] of Object.entries(glossaryLinks)) {
    assert(byId.has(id) && !byId.get(id).redirectTo, `Unknown or redirected Wiki page in glossary links: ${id}`);
    assert(Array.isArray(targets) && targets.length && new Set(targets).size === targets.length && targets.every(target => glossary.has(target) && typeof glossary.get(target).term === 'string'), `Invalid glossary links for ${id}`);
  }
  assert(byId.has('wiki') && byId.get('wiki').parent === null, 'A root note with id wiki and parent null is required');
  for (const page of pages) {
    if (page.id !== 'wiki') {
      assert(byId.has(page.parent) && !byId.get(page.parent).redirectTo, `Unknown or redirected parent of ${page.id}: ${page.parent}`);
      byId.get(page.parent).children.push(page);
    }
    assert(new Set(page.related).size === page.related.length && page.related.every(id => byId.has(id) && id !== page.id), `Invalid related notes: ${page.id}`);
    const seen = new Set();
    let ancestor = page;
    const chain = [];
    while (ancestor) {
      assert(!seen.has(ancestor.id), `Hierarchy cycle at ${page.id}`);
      seen.add(ancestor.id);
      chain.unshift(ancestor);
      ancestor = byId.get(ancestor.parent);
    }
    assert(chain[0].id === 'wiki', `Orphan note: ${page.id}`);
    page.chain = chain;
    page.route = page.permalink ?? chain.slice(1).map(item => item.slug).join('/');
  }
  for (const page of redirects) {
    const [id, anchor] = page.redirectTo.split('#');
    assert(byId.has(id) && !byId.get(id).redirectTo, `Redirect must target a canonical note: ${page.id}`);
    assert(page.permalink, `Redirect requires its former permalink: ${page.id}`);
    page.destination = byId.get(id);
    page.anchor = anchor;
    page.route = page.permalink;
  }
  const routes = new Set();
  for (const page of allPages) {
    assert(!routes.has(page.route), `Duplicate route: ${page.route}`);
    routes.add(page.route);
    page.children.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id, 'en'));
  }
  const navigationFile = path.join(sourceDir, 'navigation.json');
  const hasNavigation = existsSync(navigationFile);
  const navigation = hasNavigation ? JSON.parse(readFileSync(navigationFile, 'utf8')) : null;
  if (hasNavigation) {
    assert(navigation && Array.isArray(navigation.groups) && navigation.groups.length === 3, 'Wiki navigation requires three topic groups');
    assert(byId.has('fundamentals') && byId.has('practices') && byId.has('practices-writeup'), 'Wiki navigation is missing shared pages');
    assert(navigation.groups.every(group => group && typeof group.title === 'string' && group.title.trim() && Array.isArray(group.roots) && group.roots.length && Array.isArray(group.practices) && group.practices.length), 'Invalid Wiki navigation group');
    const rootIds = navigation.groups.flatMap(group => group.roots);
    const practiceIds = navigation.groups.flatMap(group => group.practices);
    assert(new Set(navigation.groups.map(group => slugify(group.title))).size === navigation.groups.length, 'Duplicate Wiki navigation group');
    assert(new Set(rootIds).size === rootIds.length && rootIds.every(id => byId.get(id)?.parent === 'wiki'), 'Invalid Wiki navigation root');
    assert(new Set(practiceIds).size === practiceIds.length && practiceIds.every(id => byId.get(id)?.parent === 'practices'), 'Invalid Wiki navigation practice');
    const expectedRoots = byId.get('wiki').children.filter(page => !['fundamentals', 'practices'].includes(page.id)).map(page => page.id);
    const expectedPractices = byId.get('practices').children.filter(page => page.id !== 'practices-writeup').map(page => page.id);
    assert(rootIds.length === expectedRoots.length && expectedRoots.every(id => rootIds.includes(id)), 'Wiki navigation leaves out a root topic');
    assert(practiceIds.length === expectedPractices.length && expectedPractices.every(id => practiceIds.includes(id)), 'Wiki navigation leaves out a practice');
  }
  pages.sort((a, b) => a.route.localeCompare(b.route, 'en'));
  const outputs = new Map();
  const template = readFileSync(path.join(toolDir, 'page.html'), 'utf8');
  const redirectTemplate = redirects.length ? readFileSync(path.join(toolDir, 'redirect.html'), 'utf8') : '';
  const render = (source, values) => source.replace(/{{(\w+)}}/g, (_, key) => { assert(key in values, `Unknown template field: ${key}`); return values[key]; });
  const href = (from, to) => `${path.posix.relative(from.route || '.', to.route || '.') || '.'}/`;
  function reference(from, to, anchor) {
    if (to.redirectTo) return `${href(from, to.destination)}#${to.anchor}`;
    return href(from, to) + (anchor ? `#${anchor}` : '');
  }
  function link(from, to) {
    return `<a href="${reference(from, to)}"${from.id === to.id ? ' aria-current="page"' : ''}>${escape(to.title)}</a>`;
  }
  function menuItem(from, child) {
    return `<li>${child.children.length ? `<details${from.chain.some(item => item.id === child.id) ? ' open' : ''}><summary>${link(from, child)}</summary>${tree(from, child)}</details>` : link(from, child)}</li>`;
  }
  function tree(from, page) {
    return `<ul>${page.children.map(child => menuItem(from, child)).join('')}</ul>`;
  }
  function menu(from) {
    const home = byId.get('wiki');
    if (!navigation) return `${link(from, home)}${tree(from, home)}`;
    const groups = navigation.groups.map(group => {
      const titleId = `wiki-menu-${slugify(group.title)}`;
      const practiceItems = group.practices.map(id => `<li>${link(from, byId.get(id))}</li>`).join('');
      const practices = `<li><details${group.practices.includes(from.id) ? ' open' : ''}><summary>Casos prácticos</summary><ul>${practiceItems}</ul></details></li>`;
      return `<section class="wiki-menu-group" aria-labelledby="${titleId}"><h3 class="wiki-menu-group-title" id="${titleId}">${escape(group.title)}</h3><ul>${group.roots.map(id => menuItem(from, byId.get(id))).join('')}${practices}</ul></section>`;
    }).join('');
    const practicesIndex = { ...byId.get('practices'), title: 'Todas las prácticas' };
    return `<ul class="wiki-menu-utilities"><li>${link(from, home)}</li>${menuItem(from, byId.get('fundamentals'))}</ul>${groups}<ul class="wiki-menu-utilities"><li>${link(from, practicesIndex)}</li><li>${link(from, byId.get('practices-writeup'))}</li></ul>`;
  }
  for (const page of pages) {
    const headingCounts = new Map();
    const md = new Marked({ gfm: true, async: false });
    md.use({
      renderer: {
        html({ text }) { return escape(text); },
        heading({ tokens, depth, text }) {
          assert(depth >= 2, `Use H2 or deeper inside note ${page.id}; the template supplies H1`);
          const base = slugify(text);
          const count = (headingCounts.get(base) || 0) + 1;
          headingCounts.set(base, count);
          return `<h${depth} id="${base}${count > 1 ? `-${count}` : ''}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
        },
        link({ href: target, title, tokens }) {
          if (target.startsWith('wiki:')) {
            const [id, anchor] = target.slice(5).split('#');
            assert(byId.has(id), `Broken wiki link in ${page.id}: ${id}`);
            target = reference(page, byId.get(id), anchor);
          } else assert(/^(https?:\/\/|mailto:|#)/i.test(target), `Use wiki: IDs for internal links in ${page.id}: ${target}`);
          return `<a href="${escape(target)}"${title ? ` title="${escape(title)}"` : ''}>${this.parser.parseInline(tokens)}</a>`;
        },
        image() { throw new Error(`Images require an explicit local asset policy: ${page.id}`); },
      },
      extensions: [{
        name: 'question', level: 'block',
        start(src) { return src.indexOf(':::question '); },
        tokenizer(src) {
          const match = /^:::question ([^\n]+)\n([\s\S]*?)\n:::(?:\n|$)/.exec(src);
          if (match) return { type: 'question', raw: match[0], question: match[1], tokens: this.lexer.blockTokens(match[2]) };
        },
        renderer(token) { return `<details class="wiki-review"><summary>${escape(token.question)}</summary>${this.parser.parse(token.tokens)}</details>\n`; },
      }],
    });
    const content = md.parse(page.body);
    assert(!content.includes(':::question'), `Unclosed review answer in ${page.id}`);
    const siteRoot = `${path.posix.relative(`wiki/${page.route}`, '.')}/`;
    const wikiRoot = `${path.posix.relative(page.route || '.', '.') || '.'}/`;
    const section = (id, title, body) => `<section class="wiki-section" aria-labelledby="${id}"><h2 id="${id}">${title}</h2>${body}</section>`;
    const values = {
      title: escape(page.title), description: escape(`${page.title}: explicación, ejemplos y preguntas de repaso de IC 2026.`),
      count: pages.length, siteRoot, wikiRoot,
      type: escape({ category: 'CATEGORÍA', concept: 'CONCEPTO', technique: 'TÉCNICA', algorithm: 'ALGORITMO', protocol: 'PROTOCOLO', tool: 'HERRAMIENTA', practice: 'PRÁCTICA' }[page.type]),
      tree: menu(page),
      breadcrumbs: `<nav class="wiki-breadcrumbs" aria-label="Ruta de navegación"><ol>${page.chain.map(item => `<li>${item.id === page.id ? `<span aria-current="page">${escape(item.title)}</span>` : link(page, item)}</li>`).join('')}</ol></nav>`,
      content,
      children: page.children.length ? section('subtemas', 'Subtemas', `<ul class="wiki-cards">${page.children.map(item => `<li>${link(page, item)}</li>`).join('')}</ul>`) : '',
      related: page.related.length ? section('relacionados', 'Conceptos relacionados', `<ul>${page.related.map(id => `<li>${link(page, byId.get(id))}</li>`).join('')}</ul>`) : '',
      sources: section('fuentes', 'Fuentes', `<ul class="wiki-sources">${page.sources.map(citation => {
        const source = bibliography.get(citation.id);
        const pages = source.url ? citation.pages.map(number => `<a href="${siteRoot}${escape(pdfHref(source.url))}#page=${number}" target="_blank" rel="noopener">p. ${number} ↗</a>`).join(', ') : `pp. ${citation.pages.join(', ')}`;
        return `<li>${escape(source.title)} · ${pages}. <span>${source.kind === 'official' ? 'Material de cátedra' : 'Material complementario'}${source.url ? '' : ', fuente local de trabajo; PDF no distribuido por este sitio.'}</span></li>`;
      }).join('')}${(glossaryLinks[page.id] || []).map(id => `<li>Glosario · <a href="${siteRoot}glosario.html#${escape(id)}">${escape(glossary.get(id).term)} ↗</a></li>`).join('')}<li><a href="${siteRoot}glosario.html">Explorar el glosario completo ↗</a></li></ul>`),
    };
    const pageTemplate = values.related ? template : template.replace(/^[ \t]*{{related}}$/m, '');
    const html = '<!-- Generated by tools/wiki/build.mjs. Edit content/wiki/ or tools/wiki/. -->\n' + render(pageTemplate, values);
    outputs.set(`wiki/${page.route ? `${page.route}/` : ''}index.html`, html);
  }
  for (const page of redirects) {
    const values = {
      title: escape(page.title), targetTitle: escape(page.destination.title),
      destination: escape(reference(page, page)),
      siteRoot: `${path.posix.relative(`wiki/${page.route}`, '.')}/`,
    };
    outputs.set(`wiki/${page.route}/index.html`, '<!-- Generated compatibility redirect. Edit content/wiki/ or tools/wiki/. -->\n' + render(redirectTemplate, values));
  }
  const index = pages.map(page => ({ id: page.id, title: page.title, url: `${page.route ? `${page.route}/` : './'}`, aliases: page.aliases || [], text: page.body.replace(/:::question /g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[#*`>|]/g, '').replace(/\s+/g, ' ').trim() }));
  outputs.set('wiki/search-index.json', `${JSON.stringify(index, null, 2)}\n`);
  for (const name of ['wiki.css', 'wiki.mjs']) outputs.set(`wiki/assets/${name}`, readFileSync(path.join(toolDir, 'static', name), 'utf8'));
  outputs.set('wiki/generated-files.json', `${JSON.stringify([...outputs.keys(), 'wiki/generated-files.json'].sort(), null, 2)}\n`);

  // Validate every generated local resource and anchor before writing any output.
  let links = 0;
  for (const [file, html] of outputs) {
    if (!file.endsWith('.html')) continue;
    for (const [, reference] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:)/i.test(reference)) continue;
      const url = new URL(reference.replace(/&amp;/g, '&'), `https://wiki.invalid/${file}`);
      let target = decodeURIComponent(url.pathname).slice(1);
      if (target.endsWith('/')) target += 'index.html';
      assert(outputs.has(target) || existsSync(path.join(root, target)), `Broken local link in ${file}: ${reference}`);
      if (url.hash && target.endsWith('.html') && target !== 'glosario.html') {
        const targetHtml = outputs.get(target) || readFileSync(path.join(root, target), 'utf8');
        assert(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Broken anchor in ${file}: ${reference}`);
      }
      links++;
    }
  }
  const existing = filesIn(outputDir).map(file => posix(path.relative(root, file)));
  const stale = [...outputs].filter(([file, bytes]) => !existsSync(path.join(root, file)) || readFileSync(path.join(root, file), 'utf8') !== bytes).map(([file]) => file);
  const extra = existing.filter(file => !outputs.has(file));
  if (check) {
    assert(!stale.length && !extra.length, `Wiki output is outdated: ${stale.length} changed/missing, ${extra.length} unexpected files. Run the Wiki build.`);
  } else {
    const previousManifest = path.join(outputDir, 'generated-files.json');
    const previous = existsSync(previousManifest) ? JSON.parse(readFileSync(previousManifest, 'utf8')) : [];
    assert(Array.isArray(previous) && previous.every(file => /^wiki\/(?:[a-z0-9-]+\/)*(?:index\.html|[a-z0-9.-]+)$/.test(file)), 'Invalid generated output manifest');
    assert(extra.every(file => previous.includes(file)), `Unexpected files in Wiki output: ${extra.join(', ')}`);
    for (const file of stale) {
      const target = path.join(root, file);
      mkdirSync(path.dirname(target), { recursive: true });
      writeFileSync(target, outputs.get(file), 'utf8');
    }
    for (const file of extra) unlinkSync(path.join(root, file));
  }
  console.log(`Wiki: ${pages.length} pages, ${links} local links checked; ${check ? 'generated output is current' : `${stale.length} files generated`}${redirects.length ? `; ${redirects.length} compatibility redirects` : ''}.`);
} catch (error) {
  console.error(`Wiki build failed: ${error.message}`);
  process.exitCode = 1;
}
