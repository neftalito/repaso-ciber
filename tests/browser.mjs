/* Real Chromium QA. Starts a temporary static server and exercises /ic2026/.
   npm install; npx playwright install chromium; npm run test:browser */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../', import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.pdf':'application/pdf' };
const server = createServer(async (req,res) => {
  const url = new URL(req.url,'http://localhost');
  if (!url.pathname.startsWith('/ic2026/')) { res.writeHead(404); res.end(); return; }
  const relative = decodeURIComponent(url.pathname.slice('/ic2026/'.length)) || 'index.html';
  const full = path.resolve(root,relative);
  if (!full.startsWith(root)) { res.writeHead(403); res.end(); return; }
  try { const body=await readFile(full); res.writeHead(200,{'Content-Type':types[path.extname(full)] || 'application/octet-stream'}); res.end(body); }
  catch { res.writeHead(404); res.end(); }
});
let browser;
const errors=[];
async function assertGlossaryLayout(page, width) {
  const layout = await page.evaluate(() => {
    const box = selector => {
      const { x, y, width, height } = document.querySelector(selector).getBoundingClientRect();
      return { x, y, width, height };
    };
    return { entries: box('.glossary-content'), sidebar: box('.glossary-sidebar'), container: box('.glossary-layout') };
  });
  const { entries, sidebar, container } = layout;
  if (width > 800) {
    assert.ok(entries.width > sidebar.width, `Glossary entries must be wider than the sidebar at ${width}px`);
    assert.ok(sidebar.x >= entries.x + entries.width, `Sidebar must be to the right of the entries at ${width}px`);
    assert.ok(sidebar.width <= container.width / 3, `Sidebar must remain secondary at ${width}px`);
  } else {
    assert.ok(Math.abs(entries.width - container.width) <= 1, `Entries must fill the mobile column at ${width}px`);
    assert.ok(Math.abs(sidebar.width - container.width) <= 1, `Sidebar must fill the mobile column at ${width}px`);
    assert.ok(sidebar.y >= entries.y + entries.height, `Mobile sidebar must follow the entries at ${width}px`);
  }
}
try {
  browser=await chromium.launch({headless:true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? {executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE} : {})});
  await new Promise((resolve,reject) => { server.once('error',reject); server.listen(0,'127.0.0.1',resolve); });
  const url=`http://127.0.0.1:${server.address().port}/ic2026/`;
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  const page=await context.newPage(); page.on('pageerror',error=>errors.push(error.message));
  page.on('response',r=>{ if(r.status()>=400) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto(url); await page.waitForSelector('#study-layout:visible');
  assert.equal(await page.locator('[data-question]').count(),442);
  assert.equal(await page.locator('#confirm-answer').isDisabled(),true);
  assert.equal(await page.locator('.option-explanation').count(),0);
  await mkdir(new URL('../test-results/',import.meta.url),{recursive:true});
  await page.screenshot({path:new URL('../test-results/practica-escritorio.png',import.meta.url).pathname,fullPage:true});
  await page.keyboard.press('Tab'); // Skip link and native tab order are available.
  await page.locator('.answer-option').nth(0).click(); await page.locator('#confirm-answer').click();
  await page.waitForSelector('#feedback:visible'); assert.equal(await page.locator('#hint-panel').isVisible(),true);
  assert.equal(await page.locator('.is-incorrect').count(),1); assert.equal(await page.locator('.is-correct').count(),1);
  assert.equal(await page.locator('#answer-options > details').count(),5);
  assert.equal(await page.locator('#answer-options > details[open]').count(),1);
  assert.equal(await page.locator('#answer-options > details[open]').getAttribute('data-option'),'A');
  assert.match(await page.locator('[data-option="A"] .option-explanation').textContent(),/Ampliación didáctica/);
  await page.locator('[data-option="E"] summary').focus(); await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-option="E"]').getAttribute('open'),'');
  assert.match(await page.locator('[data-option="E"] .option-explanation').textContent(),/Solucionario original/);
  await page.keyboard.press('Space'); assert.equal(await page.locator('[data-option="E"]').getAttribute('open'),null);
  assert.equal((await page.locator('#retry-answer').textContent()).trim(),'');
  assert.equal(await page.locator('#retry-answer').getAttribute('aria-label'),'Intentar de nuevo');
  await page.locator('#retry-answer').click(); assert.equal(await page.locator('#feedback').isVisible(),false);
  assert.equal(await page.locator('.option-explanation').count(),0);
  await page.reload(); await page.waitForSelector('#study-layout:visible'); assert.equal(await page.locator('#feedback').isVisible(),false);
  await page.locator('#show-hint').click(); await page.locator('.answer-option').nth(4).click(); await page.locator('#confirm-answer').click();
  const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('ic2026.progress.v1')));
  assert.equal(state.attempts.length,2); assert.equal(state.attempts[0].hintUsed,false); assert.equal(state.attempts[1].hintUsed,true);
  assert.equal(await page.locator('#answer-options > details[open]').getAttribute('data-option'),'E');
  await page.locator('#next-question-inline').click(); assert.match(await page.locator('#question-position').textContent(),/002/);
  await page.locator('#previous-question').click(); assert.equal(await page.locator('#answer-options > details[open]').count(),0);
  await page.locator('#topic-filter').selectOption('malware'); await page.locator('#status-filter').selectOption('pending');
  assert.equal(await page.locator('[data-question]').count(),147);
  await page.locator('#next-question').click(); await page.reload(); await page.waitForSelector('#study-layout:visible');
  assert.match(await page.locator('#question-position').textContent(),/228/); assert.equal(await page.locator('#topic-filter').inputValue(),'malware');
  await page.locator('#manage-progress').click();
  const downloadPromise=page.waitForEvent('download'); await page.locator('#export-progress').click(); const download=await downloadPromise;
  const exported=await readFile(await download.path(),'utf8'); assert.equal(JSON.parse(exported).attempts.length,2);
  await page.locator('#import-progress').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{bad')});
  await page.waitForFunction(()=>document.querySelector('#transfer-status').textContent.includes('JSON válido'));
  page.once('dialog',d=>d.dismiss()); await page.locator('#import-progress').setInputFiles({name:'cancel.json',mimeType:'application/json',buffer:Buffer.from(exported)});
  await page.waitForFunction(()=>document.querySelector('#transfer-status').textContent.includes('cancelada'));
  page.once('dialog',d=>d.accept()); await page.locator('#reset-progress').click();
  assert.equal(await page.locator('#answered-count').textContent(),'0');
  page.once('dialog',d=>d.accept()); await page.locator('#import-progress').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(exported)});
  await page.waitForFunction(()=>document.querySelector('#transfer-status').textContent.includes('Progreso importado'));
  assert.equal(await page.locator('#answered-count').textContent(),'1');
  await page.keyboard.press('Escape'); assert.equal(await page.locator('#progress-dialog').isVisible(),false);
  await page.locator('#reset-filters').click();
  await page.locator('[data-question="1"]').click(); await page.locator('#retry-answer').click();
  await page.locator('input[value="A"]').focus(); await page.keyboard.press('ArrowDown');
  assert.equal(await page.locator('input[value="B"]').isChecked(),true);
  await page.keyboard.press('Alt+ArrowRight'); assert.match(await page.locator('#question-position').textContent(),/002/);
  await page.goto(`${url}glosario.html#run-key`); await page.waitForSelector('#run-key');
  assert.equal(await page.locator('.glossary-entry').count(),108);
  await page.locator('#glossary-search').fill('criptografia simetrica'); assert.equal(await page.locator('#simetrica').count(),1);
  await page.locator('#glossary-topic').selectOption('malware'); assert.equal(await page.locator('.glossary-entry').count(),0);
  await page.locator('#clear-search').click();
  await page.locator('#glossary-search').fill('base64');
  await page.screenshot({path:new URL('../test-results/glosario-escritorio.png',import.meta.url).pathname,fullPage:true});
  for (const width of [320,390,768,800,801,1024,1440,1920]) {
    await page.setViewportSize({width,height:900}); await page.evaluate(()=>localStorage.clear());
    await page.goto(url); await page.waitForSelector('#study-layout:visible');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Horizontal overflow at ${width}px`);
    if(width===390) await page.screenshot({path:new URL('../test-results/practica-celular.png',import.meta.url).pathname,fullPage:true});
    await page.locator('.answer-option').nth(0).click(); await page.locator('#confirm-answer').click();
    await page.locator('#next-question-inline').scrollIntoViewIfNeeded();
    const actions = await page.evaluate(() => {
      const bounds = id => { const r=document.getElementById(id).getBoundingClientRect(); return {x:r.x,y:r.y,right:r.right}; };
      return { next:bounds('next-question-inline'), retry:bounds('retry-answer'), rowRight:document.querySelector('.answer-actions').getBoundingClientRect().right };
    });
    assert.ok(actions.retry.x > actions.next.x, `Retry must be on the right at ${width}px`);
    assert.ok(Math.abs(actions.retry.y - actions.next.y) <= 2, `Answer actions must stay on one row at ${width}px`);
    assert.ok(Math.abs(actions.rowRight - actions.retry.right) <= 2, `Retry must align right at ${width}px`);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Expanded option overflow at ${width}px`);
    if(width===390 || width===1440) await page.screenshot({path:new URL(`../test-results/opcion-desplegada-${width}.png`,import.meta.url).pathname,fullPage:true});
    await page.locator('#origin-filter').selectOption('practice');
    assert.equal(await page.locator('[data-question]').count(),92);
    assert.equal(await page.locator('#question-origin').textContent(),'Práctica');
    await page.locator('[data-question="428"]').click();
    assert.match(await page.locator('#question-code').textContent(),/HKCU\\Software/);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Practice code overflow at ${width}px`);
    await page.locator('input[value="A"]').check(); await page.locator('#confirm-answer').click();
    assert.equal(await page.locator('#answer-options details[open]').getAttribute('data-option'),'A');
    assert.match(await page.locator('[data-option="A"] .option-reference a').getAttribute('href'),/Guia_de_estudio_IC_Practicas_1_y_2.pdf/);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Practice feedback overflow at ${width}px`);
    if(width===390 || width===1440) await page.screenshot({path:new URL(`../test-results/practica-origen-${width}.png`,import.meta.url).pathname,fullPage:true});
    await page.reload(); await page.waitForSelector('#study-layout:visible');
    assert.equal(await page.locator('#origin-filter').inputValue(),'practice');
    assert.match(await page.locator('#question-position').textContent(),/428/);
    await page.goto(`${url}glosario.html`); await page.waitForSelector('#base64');
    await assertGlossaryLayout(page, width);
    assert.equal(await page.locator('.glossary-entry').count(),108);
    await page.locator('#comparaciones > summary').click();
    await page.locator('#comparar-codificacion-cifrado-hash-firma > summary').click();
    await assertGlossaryLayout(page, width);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Comparison overflow at ${width}px`);
    if (width <= 480) {
      assert.equal(await page.locator('#comparar-codificacion-cifrado-hash-firma .comparison-table-scroll').evaluate(n => n.scrollWidth > n.clientWidth),true);
    }
    if(width===390 || width===1440) await page.screenshot({path:new URL(`../test-results/comparaciones-${width}.png`,import.meta.url).pathname});
    await page.locator('#comparaciones > summary').click();
    if(width===1440) await page.screenshot({path:new URL('../test-results/glosario-escritorio-completo.png',import.meta.url).pathname});
    await page.locator('#tabla-ascii > summary').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.locator('#tabla-ascii').getAttribute('open'), '');
    assert.equal(await page.locator('.ascii-table tbody tr').count(), 52);
    assert.equal(await page.locator('.ascii-table tbody tr').first().textContent(), 'A650x41');
    assert.equal(await page.locator('.ascii-table tbody tr').last().textContent(), 'z1220x7A');
    await assertGlossaryLayout(page, width);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`ASCII table overflow at ${width}px`);
    assert.equal(await page.locator('.ascii-table').evaluateAll(tables => tables.every(table => table.scrollWidth <= table.clientWidth)),true,`ASCII cells overflow at ${width}px`);
    if(width===390 || width===1440) await page.screenshot({path:new URL(`../test-results/ascii-${width}.png`,import.meta.url).pathname});
    await page.locator('#tabla-ascii > summary').focus(); await page.keyboard.press('Space');
    assert.equal(await page.locator('#tabla-ascii').getAttribute('open'), null);
    await page.locator('#glossary-search').fill('base64');
    await assertGlossaryLayout(page, width);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Glossary overflow at ${width}px`);
    if(width===390) await page.screenshot({path:new URL('../test-results/glosario-celular.png',import.meta.url).pathname,fullPage:true});
  }
  await page.goto(`${url}glosario.html?q=base64&tema=malware#comparar-whois-rdap`);
  await page.waitForSelector('#comparar-whois-rdap[open]');
  assert.equal(await page.locator('#glossary-topic').inputValue(),'all');
  assert.equal(await page.locator('#comparaciones').getAttribute('open'),'');
  await page.goto(`${url}glosario.html?q=base64&tema=csirt#tabla-ascii`);
  await page.waitForSelector('#tabla-ascii[open]');
  assert.equal(await page.locator('#glossary-topic').inputValue(), 'all');
  assert.equal(await page.locator('#glossary-search').inputValue(), '');
  await page.goto(`${url}index.html?pregunta=442`); await page.waitForSelector('#study-layout:visible');
  await page.locator('.answer-option').nth(2).click(); await page.locator('#confirm-answer').click();
  assert.equal(await page.locator('#next-question-inline').isDisabled(),true);
  assert.equal(await page.locator('#next-question').isDisabled(),true);
  await page.locator('#reset-filters').click(); await page.locator('#origin-filter').selectOption('practice');
  await page.locator('#topic-filter').selectOption('csirt');
  assert.equal(await page.locator('[data-question]').count(),29);
  await page.locator('[data-question="391"]').click();
  await page.locator('input[value="A"]').check(); await page.locator('#confirm-answer').click();
  assert.equal(await page.locator('[data-option="A"]').getAttribute('class'),'answer-option is-correct');
  assert.match(await page.locator('[data-option="A"] .option-reference a').getAttribute('href'),/IC2026_Solucionario_Practicas_1_y_2.pdf/);
  await page.locator('#manage-progress').click();
  const practiceDownloadPromise=page.waitForEvent('download'); await page.locator('#export-progress').click();
  const practiceDownload=await practiceDownloadPromise;
  const practiceExport=await readFile(await practiceDownload.path(),'utf8');
  assert.equal(JSON.parse(practiceExport).view.origin,'practice');
  page.once('dialog',d=>d.accept());
  await page.locator('#import-progress').setInputFiles({name:'practice.json',mimeType:'application/json',buffer:Buffer.from(practiceExport)});
  await page.waitForFunction(()=>document.querySelector('#transfer-status').textContent.includes('Progreso importado'));
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#origin-filter').inputValue(),'practice');
  const invalidOrigin=JSON.parse(practiceExport); invalidOrigin.view.origin='invalid';
  await page.locator('#manage-progress').click();
  await page.locator('#import-progress').setInputFiles({name:'bad-origin.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(invalidOrigin))});
  await page.waitForFunction(()=>document.querySelector('#transfer-status').textContent.includes('Teoría/Práctica inválido'));
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#origin-filter').inputValue(),'practice');
  const blocked=await browser.newContext(); await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError');}}));
  const p=await blocked.newPage(); await p.goto(url); await p.waitForSelector('#study-layout:visible');
  await p.locator('.answer-option').nth(4).click(); await p.locator('#confirm-answer').click(); assert.equal(await p.locator('#storage-warning').isVisible(),true);
  assert.equal(await p.locator('#correct-count').textContent(),'1'); await blocked.close();
  for(const file of ['Manual_IC2026_Cripto_CSIRT_Malware_Descarga.pdf','IC_2026_Cripto_CSIRT_Malware_350_Preguntas.pdf','IC_2026_Cripto_CSIRT_Malware_Solucionario.pdf','IC2026_Preguntas_Basadas_en_Practicas_1_y_2.pdf','IC2026_Solucionario_Practicas_1_y_2.pdf','Guia_de_estudio_IC_Practicas_1_y_2.pdf']) { const response=await context.request.get(`${url}docs/${file}`); assert.equal(response.status(),200); }
  assert.deepEqual(errors,[]); console.log('PASS: práctica, glosario, progreso, teclado, columnas del glosario a 320/390/768/800/801/1024/1440/1920 px y subruta /ic2026/. Capturas en test-results/.');
} finally { if(browser) await browser.close(); if(server.listening) await new Promise(resolve=>server.close(resolve)); }
