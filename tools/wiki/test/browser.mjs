import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../../../', import.meta.url));
const csirtCompatibility = [
  ['recursos-de-internet/dominios/registry/', 'recursos-de-internet/dominios/#registry'],
  ['recursos-de-internet/dominios/registrar/', 'recursos-de-internet/dominios/#registrar'],
  ['recursos-de-internet/dominios/registrant/', 'recursos-de-internet/dominios/#registrant'],
  ['recursos-de-internet/rdap/icann-rdap/', 'recursos-de-internet/rdap/#cliente-icann-rdap'],
  ['correo-electronico/anatomia-del-mensaje/', 'correo-electronico/smtp/#sobre-encabezados-y-cuerpo'],
  ['correo-electronico/analisis-de-encabezados/mxtoolbox/', 'correo-electronico/analisis-de-encabezados/#mxtoolbox-email-headers'],
  ['correo-electronico/analisis-de-encabezados/google-messageheader/', 'correo-electronico/analisis-de-encabezados/#google-admin-toolbox-messageheader'],
];
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.mjs': 'text/javascript', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' };
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname).replace(/^\/repaso-ciber(?=\/)/, '');
    const file = path.resolve(root, `.${pathname}`, ...(pathname.endsWith('/') ? ['index.html'] : []));
    if (!file.startsWith(root) || path.relative(root, file).startsWith('..')) { response.writeHead(403).end(); return; }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    response.end(body);
  } catch { response.writeHead(404).end(); }
});
let browser;
try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1366, height: 1000 } });
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const prefix of ['', '/repaso-ciber']) {
    for (const original of ['index.html', 'glosario.html']) {
      await page.goto(`${origin}${prefix}/${original}`);
      await page.locator('a.nav-link[href="wiki/index.html"]').click();
      assert.equal(await page.locator('h1').innerText(), 'Wiki Académica');
    }
    const entry = await page.goto(`${origin}${prefix}/wiki/`);
    assert.equal(entry.status(), 200);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['Fundamentos de ciberseguridad', 'Codificación', 'Criptografía', 'Esteganografía', 'CSIRT y gestión de incidentes', 'Malware y análisis', 'Prácticas y resolución razonada']);
    await page.locator('#wiki-query').fill('TRIADA');
    await page.locator('#wiki-results a').first().waitFor();
    assert.ok(await page.locator('#wiki-results').innerText().then(text => text.includes('Tríada CIA')));
    await page.locator('#wiki-results a').filter({ hasText: 'Tríada CIA' }).first().click();
    assert.ok(page.url().endsWith(`${prefix}/wiki/fundamentals/cia/`));
    await page.reload();
    assert.equal(await page.locator('h1').innerText(), 'Tríada CIA');
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'Fundamentos de ciberseguridad', 'Seguridad de la información', 'Tríada CIA']);
    const answer = page.locator('.wiki-review').first();
    assert.equal(await answer.getAttribute('open'), null);
    await answer.locator('summary').click();
    assert.notEqual(await answer.getAttribute('open'), null);
    await page.locator('#wiki-query').fill('zzznomatchzzz');
    await page.waitForFunction(() => document.querySelector('#wiki-search-status').textContent.startsWith('No se encontraron'));
    await page.locator('#wiki-query').fill('');
    await page.waitForFunction(() => document.querySelector('#wiki-results').hidden);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);

    await page.goto(`${origin}${prefix}/wiki/fundamentals/`);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['Seguridad de la información', 'Ciberseguridad', 'Amenaza', 'Vulnerabilidad', 'Riesgo', 'Atacantes y motivaciones', 'Tipos de ataques', 'Filtraciones de información (Leaks)', 'Defensa en profundidad', 'Riesgos de IA y modelos de lenguaje']);
    await page.locator('[aria-labelledby="subtemas"] a').filter({ hasText: /^Ciberseguridad$/ }).click();
    assert.ok(await page.locator('#wiki-main').innerText().then(text => text.includes('ISO/IEC 27032') && text.includes('NIST')));
    await page.goto(`${origin}${prefix}/wiki/fundamentals/attacks/`);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['Ingeniería social', 'Man in the Middle (MitM)', 'Ataques a aplicaciones', 'Denegación de servicio (DoS y DDoS)']);
    await page.locator('[aria-labelledby="subtemas"] a').filter({ hasText: /^Ingeniería social$/ }).click();
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['Phishing']);
    await page.locator('[aria-labelledby="subtemas"] a').filter({ hasText: /^Phishing$/ }).click();
    assert.ok(page.url().endsWith(`${prefix}/wiki/fundamentals/attacks/phishing/`));
    await page.reload();
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'Fundamentos de ciberseguridad', 'Tipos de ataques', 'Ingeniería social', 'Phishing']);
    await page.goto(`${origin}${prefix}/wiki/fundamentals/risk/`);
    assert.equal(await page.locator('h1').innerText(), 'Riesgo');
    await page.locator('#wiki-query').fill('Phishing e ingeniería social');
    await page.locator('#wiki-results a').filter({ hasText: /^Phishing$/ }).click();
    assert.ok(page.url().endsWith(`${prefix}/wiki/fundamentals/attacks/phishing/`));

    await page.goto(`${origin}${prefix}/wiki/csirt/`);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['Equipos CERT y CSIRT', 'Recursos de Internet', 'Correo electrónico e investigación', 'Incidentes de seguridad']);
    await page.goto(`${origin}${prefix}/wiki/csirt/servicios/`);
    await page.reload();
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'CSIRT y gestión de incidentes', 'Equipos CERT y CSIRT', 'Servicios de un CSIRT']);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['Servicios reactivos', 'Servicios proactivos', 'Servicios de gestión de calidad de seguridad']);
    await page.goto(`${origin}${prefix}/wiki/csirt/recursos-de-internet/registros-regionales/`);
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'CSIRT y gestión de incidentes', 'Recursos de Internet', 'Direcciones y bloques IP', 'Registros Regionales de Internet (RIR)']);
    await page.goto(`${origin}${prefix}/wiki/csirt/recursos-de-internet/consulta-de-registro/`);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['WHOIS', 'RDAP']);
    await page.locator('[aria-labelledby="subtemas"] a').filter({ hasText: /^RDAP$/ }).click();
    assert.ok(page.url().endsWith(`${prefix}/wiki/csirt/recursos-de-internet/rdap/`));
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'CSIRT y gestión de incidentes', 'Recursos de Internet', 'Consulta de información de registro', 'RDAP']);
    await page.goto(`${origin}${prefix}/wiki/csirt/recursos-de-internet/dominios/`);
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'CSIRT y gestión de incidentes', 'Recursos de Internet', 'Nombres de dominio y DNS', 'Registro de nombres de dominio']);
    assert.equal(await page.locator('[aria-labelledby="subtemas"]').count(), 0);
    await page.goto(`${origin}${prefix}/wiki/csirt/correo-electronico/`);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['SMTP y flujo del correo', 'Análisis de encabezados de correo', 'Suplantación del remitente (Email Spoofing)']);
    await page.goto(`${origin}${prefix}/wiki/csirt/incidentes/gestion/notificacion/`);
    await page.reload();
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'CSIRT y gestión de incidentes', 'Incidentes de seguridad', 'Gestión de incidentes', 'Notificación de incidentes']);
    assert.ok(await page.locator('#wiki-main').innerText().then(text => text.includes('zona horaria') && text.includes('SSH')));
    for (const [legacy, target] of csirtCompatibility) {
      await page.goto(`${origin}${prefix}/wiki/csirt/${legacy}`);
      await page.waitForURL(`${origin}${prefix}/wiki/csirt/${target}`);
      assert.equal(await page.locator(`#${target.split('#')[1]}`).count(), 1);
    }
    await page.locator('#wiki-query').fill('icann-rdap');
    await page.locator('#wiki-results a').filter({ hasText: /^RDAP$/ }).click();
    assert.ok(page.url().endsWith(`${prefix}/wiki/csirt/recursos-de-internet/rdap/`));

    // Published URLs remain stable even when the academic ancestry changes.
    await page.goto(`${origin}${prefix}/wiki/cryptography/encryption/modern/symmetric/rc5/`);
    await page.reload();
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'Criptografía', 'Criptografía moderna', 'Criptografía simétrica', 'Cifrado por bloques', 'Algoritmos', 'RC5']);
    await page.locator('.wiki-breadcrumbs a').filter({ hasText: /^Algoritmos$/ }).click();
    await page.waitForURL(`${origin}${prefix}/wiki/cryptography/modern/symmetric/block/algorithms/`);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['DES', '3DES', 'AES', 'RC5', 'IDEA', 'Blowfish']);
    await page.goto(`${origin}${prefix}/wiki/cryptography/encryption/modern/symmetric/block/cbc/`);
    assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', 'Criptografía', 'Criptografía moderna', 'Criptografía simétrica', 'Cifrado por bloques', 'Modos de operación', 'Modo CBC']);
    await page.locator('.wiki-breadcrumbs a').filter({ hasText: /^Modos de operación$/ }).click();
    await page.waitForURL(`${origin}${prefix}/wiki/cryptography/modern/symmetric/block/modes/`);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['Modo ECB', 'Modo CBC', 'Modo CFB', 'Modo OFB']);
    await page.locator('#wiki-query').fill('RC5');
    await page.locator('#wiki-results a').filter({ hasText: /^RC5$/ }).click();
    assert.ok(page.url().endsWith(`${prefix}/wiki/cryptography/encryption/modern/symmetric/rc5/`));
    const sidebarParents = await page.locator('.wiki-menu a[aria-current="page"]').evaluate(link => {
      const parents = [];
      let list = link.closest('ul');
      while (list) {
        const details = list.parentElement;
        if (details.tagName !== 'DETAILS') break;
        parents.unshift(details.querySelector(':scope > summary > a').textContent);
        list = details.closest('li').parentElement;
      }
      return parents;
    });
    assert.deepEqual(sidebarParents, ['Criptografía', 'Criptografía moderna', 'Criptografía simétrica', 'Cifrado por bloques', 'Algoritmos']);
    for (const [route, title] of [['encoding', 'Codificación'], ['steganography', 'Esteganografía']]) {
      await page.goto(`${origin}${prefix}/wiki/cryptography/${route}/`);
      await page.reload();
      assert.deepEqual(await page.locator('.wiki-breadcrumbs li').allTextContents(), ['Wiki Académica', title]);
    }
    await page.goto(`${origin}${prefix}/wiki/cryptography/hash/`);
    assert.deepEqual(await page.locator('[aria-labelledby="subtemas"] a').allTextContents(), ['MD5', 'SHA-1', 'Familia SHA-2', 'Familia SHA-3']);
    for (const [oldPath, anchor] of [
      ['collisions', 'colisiones-y-resistencia-a-preimagenes'],
      ['password-hashes', 'hashes-en-la-proteccion-de-contrasenas'],
      ['password-hashes/dictionary', 'comprobacion-por-diccionario'],
      ['password-hashes/salt', 'sal-en-el-calculo-de-contrasenas'],
    ]) {
      await page.goto(`${origin}${prefix}/wiki/cryptography/hash/${oldPath}/`);
      await page.waitForURL(`${origin}${prefix}/wiki/cryptography/hash/#${anchor}`);
      assert.equal(await page.locator(`#${anchor}`).count(), 1);
    }
    await page.locator('#wiki-query').fill('sal en el cálculo de contraseñas');
    await page.locator('#wiki-results a').filter({ hasText: /^Funciones hash$/ }).click();
    assert.ok(page.url().endsWith(`${prefix}/wiki/cryptography/hash/`));
  }
  const index = await (await fetch(`${origin}/wiki/search-index.json`)).json();
  assert.equal(index.length, 190);
  assert.ok(!index.some(entry => ['crypto-collisions', 'crypto-password-hashes', 'crypto-dictionary', 'crypto-salt', 'csirt-registry', 'csirt-registrar', 'csirt-registrant', 'csirt-icann-rdap', 'csirt-email-anatomy', 'csirt-mxtoolbox', 'csirt-google-messageheader'].includes(entry.id)));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${origin}/repaso-ciber/wiki/cryptography/hash/`);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.goto(`${origin}/repaso-ciber/wiki/fundamentals/attacks/phishing/`);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  for (const route of ['smtp', 'analisis-de-encabezados']) {
    await page.goto(`${origin}/repaso-ciber/wiki/csirt/correo-electronico/${route}/`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  }
  await page.setViewportSize({ width: 1366, height: 1000 });
  const deepest = index.reduce((a, b) => a.url.split('/').length > b.url.split('/').length ? a : b);
  await page.goto(`${origin}/repaso-ciber/wiki/${deepest.url}`);
  await page.reload();
  assert.equal(await page.locator('h1').innerText(), deepest.title);
  await mkdir(path.join(root, 'test-results/wiki'), { recursive: true });
  await page.screenshot({ path: path.join(root, 'test-results/wiki/desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  assert.equal(await page.locator('.wiki-menu').getAttribute('open'), null);
  await page.locator('.wiki-menu > summary').click();
  assert.notEqual(await page.locator('.wiki-menu').getAttribute('open'), null);
  await page.screenshot({ path: path.join(root, 'test-results/wiki/mobile.png'), fullPage: true });
  const offlinePage = await browser.newPage({ javaScriptEnabled: false });
  await offlinePage.goto(`${origin}/repaso-ciber/wiki/fundamentals/cia/`);
  assert.equal(await offlinePage.locator('h1').innerText(), 'Tríada CIA');
  await offlinePage.locator('.wiki-review summary').first().click();
  assert.notEqual(await offlinePage.locator('.wiki-review').first().getAttribute('open'), null);
  await offlinePage.goto(`${origin}/repaso-ciber/wiki/fundamentals/attacks/phishing/`);
  await offlinePage.locator('.wiki-breadcrumbs a').filter({ hasText: /^Ingeniería social$/ }).click();
  assert.equal(await offlinePage.locator('h1').innerText(), 'Ingeniería social');
  for (const prefix of ['', '/repaso-ciber']) {
    for (const [legacy, target] of csirtCompatibility) {
      await offlinePage.goto(`${origin}${prefix}/wiki/csirt/${legacy}`);
      await offlinePage.waitForURL(`${origin}${prefix}/wiki/csirt/${target}`);
      assert.equal(await offlinePage.locator(`#${target.split('#')[1]}`).count(), 1);
    }
  }
  await offlinePage.goto(`${origin}/repaso-ciber/wiki/cryptography/hash/password-hashes/salt/`);
  await offlinePage.waitForURL(`${origin}/repaso-ciber/wiki/cryptography/hash/#sal-en-el-calculo-de-contrasenas`);
  assert.ok(await offlinePage.locator('#wiki-main').innerText().then(text => text.includes('curso:luna')));
  assert.deepEqual(errors, []);
  console.log(`Wiki browser checks passed at root and /repaso-ciber/: ${index.length} indexed pages; desktop, mobile, search, direct reload and no-JavaScript reading.`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
