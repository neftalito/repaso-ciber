const query = document.querySelector('#wiki-query');
const results = document.querySelector('#wiki-results');
const status = document.querySelector('#wiki-search-status');
const base = new URL('../', import.meta.url);
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
let indexPromise;
let request = 0;
let timer;

async function search() {
  const current = ++request;
  const terms = normalize(query.value.trim()).split(/\s+/).filter(Boolean);
  results.replaceChildren();
  results.hidden = true;
  if (!terms.length) {
    status.textContent = 'Por nombre, tema o contenido. La búsqueda ignora los acentos.';
    return;
  }
  status.textContent = 'Buscando…';
  try {
    indexPromise ||= fetch(new URL('search-index.json', base)).then(response => {
      if (!response.ok) throw new Error('Search index unavailable');
      return response.json();
    }).catch(error => { indexPromise = undefined; throw error; });
    const index = await indexPromise;
    if (current !== request) return;
    const matches = index.map(entry => {
      const title = normalize(entry.title);
      const aliases = normalize(entry.aliases.join(' '));
      const text = normalize(entry.text);
      return { entry, score: terms.every(term => `${title} ${aliases} ${text}`.includes(term)) ? terms.reduce((score, term) => score + (title.includes(term) ? 10 : aliases.includes(term) ? 5 : 1), 0) : 0 };
    }).filter(match => match.score).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'es'));
    status.textContent = matches.length ? `${matches.length} páginas encontradas${matches.length > 20 ? '; se muestran las primeras 20' : ''}.` : 'No se encontraron páginas. Prueba con otro concepto o un término más general.';
    for (const { entry } of matches.slice(0, 20)) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = new URL(entry.url, base).href;
      link.textContent = entry.title;
      const excerpt = document.createElement('p');
      excerpt.textContent = `${entry.text.slice(0, 160)}${entry.text.length > 160 ? '…' : ''}`;
      item.append(link, excerpt);
      results.append(item);
    }
    results.hidden = !matches.length;
  } catch {
    if (current === request) status.textContent = 'No se pudo cargar el índice. Puedes navegar por el árbol de temas o volver a buscar.';
  }
}

query.addEventListener('input', () => {
  clearTimeout(timer);
  ++request;
  timer = setTimeout(search, 150);
});
query.form.addEventListener('submit', event => { event.preventDefault(); clearTimeout(timer); search(); });
