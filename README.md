# IC 2026 · Espacio de estudio

Repositorio: [neftalito/repaso-ciber](https://github.com/neftalito/repaso-ciber). Al habilitar GitHub Pages desde `main` y `/(root)`, la dirección será [neftalito.github.io/repaso-ciber](https://neftalito.github.io/repaso-ciber/).

Aplicación estática en español para practicar **562 preguntas** de Introducción a la Ciberseguridad: **350 de Teoría** y **212 de Práctica**. Criptografía (166), CSIRT (229) y Malware (167). Incluye corrección explicada de cada opción, pistas conceptuales, un glosario de **138 entradas**, historial de intentos y progreso local.

HTML, CSS y JavaScript nativos. No requiere compilación, framework, cuenta, backend ni dependencias para funcionar en GitHub Pages. Los nueve PDF del espacio de práctica están en `docs/`; las diapositivas de cátedra de la wiki están en `docs/catedra cosas/`. No se utilizan fuentes remotas, analítica ni servicios externos.

## Ejecutar localmente

Desde la raíz del repositorio:

```sh
python3 -m http.server 8000
```

Abrir [http://localhost:8000](http://localhost:8000). El servidor solo entrega archivos estáticos durante la prueba local. Evitar abrir `index.html` con `file://`: los navegadores restringen la lectura de JSON mediante `fetch`. Usar un navegador actualizado con soporte para módulos JavaScript, `dialog` y `localStorage`.

## Publicar desde la raíz en GitHub Pages

1. Subir los archivos del proyecto a la rama que se vaya a publicar, por ejemplo `main`. Mantener `index.html`, `glosario.html`, `.nojekyll`, `assets/`, `data/` y `docs/` en la raíz.
2. En el repositorio de GitHub, entrar a **Settings → Pages**.
3. En **Build and deployment → Source**, elegir **Deploy from a branch**.
4. Elegir la rama y la carpeta **/(root)**; guardar.
5. Esperar la publicación y abrir la dirección informada por GitHub, habitualmente `https://USUARIO.github.io/REPOSITORIO/`.

No se necesita generar una carpeta `dist/` ni ejecutar npm. `.nojekyll` permite servir los archivos directamente. Todos los recursos, PDF y enlaces usan rutas relativas compatibles con una subruta. Instrucciones contrastadas con la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Cómo practicar

- Elegir una opción y pulsar **Confirmar respuesta**. Hasta entonces se puede cambiar de opción.
- Después de confirmar se habilitan cinco acordeones dentro de las opciones. Se abre automáticamente solo la elegida; las demás quedan cerradas y pueden abrirse con clic, Enter o Espacio. La opción correcta conserva la explicación literal del solucionario y su fuente; cada distractor tiene una explicación identificada como ampliación didáctica.
- **Ver pista** presenta una orientación conceptual sin indicar la letra ni resolver los cálculos de la pregunta. Al fallar, se muestran automáticamente la definición, la explicación y el ejemplo del concepto relacionado, junto con la corrección.
- El ícono **Intentar de nuevo**, alineado a la derecha y con nombre accesible, abre un borrador sin solución ni pista visibles. El botón **Siguiente pregunta** aparece también junto a las opciones después de confirmar y recorre el mismo filtro que el botón inferior. Ambos se deshabilitan al llegar al final. Al volver a una pregunta respondida, sus acordeones empiezan cerrados. Conserva los intentos anteriores, que se consultan en el historial desplegable. Los borradores también sobreviven a una recarga.
- El badge **Teoría/Práctica** indica el origen. El filtro **Origen** se combina con tema y estado, actualiza las cantidades por tema y se conserva al recargar. Los ejercicios de prácticas mantienen su número original y se identifican como preguntas **351–442** en el sitio; los IDs teóricos **1–350** permanecen iguales.
- Los 92 ejercicios nuevos son consignas abiertas: las cinco opciones y las 368 explicaciones de distractores son **adaptaciones didácticas**, señaladas como tales. La explicación correcta conserva el texto del solucionario de prácticas. Los comandos y logs se muestran en bloques con saltos de línea.
- El índice y los filtros usan el **último intento confirmado**. Durante un reintento, el estado anterior sigue vigente hasta confirmar. Si una respuesta deja de coincidir con el filtro, su corrección sigue visible hasta navegar o cambiar los filtros.
- El recorrido se cuenta sobre 562 preguntas con al menos un intento, independientemente del resultado. Las estadísticas de correctas/falladas corresponden al último intento; las estadísticas con/sin pista consideran todos los intentos.
- Los botones y controles funcionan con Tab, Mayús+Tab, Enter y Espacio; las flechas cambian opciones dentro del grupo de radio. **Alt+← / Alt+→** navega preguntas del recorrido filtrado. Escape cierra las ventanas de material, progreso y modo estudio.

## Modo estudio

El botón **Modo estudio** abre la configuración de un recorrido aleatorio. Permite elegir una cantidad entera entre 1 y el número de preguntas disponibles, una colección (todas, preguntas de teoría, prácticas 1 y 2 o banco del parcial), un tema (todos, Criptografía, CSIRT o Malware) y un origen (Teoría y Práctica, Teoría o Práctica). Los filtros se combinan y la cantidad disponible se actualiza antes de empezar. Se incluyen tanto preguntas pendientes como respondidas.

La selección usa Fisher–Yates, sin repetir preguntas dentro del mismo recorrido. El índice y los botones anterior/siguiente, incluido **Alt+← / Alt+→**, respetan ese orden aleatorio. Mientras el recorrido está activo, su configuración reemplaza los filtros habituales del índice; **Nuevo recorrido** permite elegir otra configuración.

Cada pregunta seleccionada empieza con un intento nuevo y las soluciones ocultas, conservando todo el historial confirmado. Las pistas, los acordeones y los reintentos funcionan como en la práctica habitual. El panel de modo estudio muestra respondidas, correctas, falladas y respuestas con pista de este recorrido; al completarlo, permite revisar las respuestas o crear otro. Un reintento vuelve a dejar esa pregunta pendiente en el recorrido hasta confirmar de nuevo. Las estadísticas generales siguen incluyendo todos los intentos.

Se guardan el orden, el punto de lectura, los borradores y los resultados para continuar al recargar o después de consultar el glosario. **Salir del modo estudio** restaura el punto de lectura y los filtros previos, conservando intentos y borradores. Crear otro recorrido reemplaza la selección activa y conserva el historial. Un enlace directo a una pregunta desde el glosario o el historial abre la práctica habitual. Escape o Cancelar cierra la configuración sin cambiar el recorrido activo.

## Nuevos PDF: banco de parcial y guía de Diffie–Hellman/RSA

Se incorporaron **120 preguntas con cuatro opciones originales**, IDs **443–562**, manteniendo los IDs **1–442** anteriores. Su origen es **Práctica** y su colección **Banco del parcial**. El filtro **Colección** permite elegir ese banco tanto en la práctica habitual como en Modo estudio. El contexto de cada tarjeta conserva unidad, número original, dificultad y marca **Base/Ampliación**. Los totales pasan a 350 de teoría y 212 de práctica.

La corrección utiliza la clave y la explicación literal de `Parcial_IC_Solucionario_Razonado.pdf`. Cada una de las **360 opciones incorrectas** añade una explicación didáctica revisada. Los enlaces distinguen el nuevo cuadernillo, su solucionario, el manual anterior, la guía de prácticas y la nueva guía matemática. Se conservan las referencias P1.1, P1.2, P2.1–P2.3 y W1/W2 sin convertirlas en páginas de otro documento. Los tres PDF están en Material de consulta.

`Guia_Diffie_Hellman_y_RSA.pdf` amplía el glosario y siete notas de la wiki, conservando los ejemplos y URL previos. Incluye variables, potencias modulares, inverso y totiente, los ejemplos completos con HOLA, diferencias de finalidad y autenticación, y las cinco preguntas abiertas de repaso con sus respuestas. La wiki mantiene sus 170 páginas canónicas y 34 redirecciones de compatibilidad.

El glosario suma **nueve entradas**: codificación porcentual de URL; coprimos/MCD/totiente; RSA-OAEP/RSA-PSS; logaritmo discreto; espectrograma; GPT; NTFS; PowerShell EncodedCommand/UTF-16LE; ECDH/X25519. Queda en **138 conceptos**. También amplía RSA, Diffie–Hellman, aritmética modular, ASCII, XOR, KDF/HKDF/HMAC, autenticación y referencias de los conceptos existentes. La nueva comparación de DH y RSA es la número 14, accesible en `glosario.html#comparar-diffie-hellman-rsa`.

La extracción reproducible está en `scripts/extract_exam_questions.py`. Contrasta las 120 soluciones con el texto de la opción correcta y con la clave rápida; conserva las 480 opciones y exige revisión si cambia la huella de la fuente. `data/exam-editorial.json` contiene conceptos y explicaciones de distractores; los archivos generados son `data/exam-questions.json`, `data/exam-option-explanations.json` y `data/exam-extraction-report.json`. El informe registra hashes y páginas de los tres PDF. El guion `--review` imprime los originales para revisión; `--check` valida sin escribir.

```sh
.venv/bin/python scripts/extract_exam_questions.py --check
```

El progreso v1 anterior, incluidos los recorridos activos de Modo estudio, sigue siendo válido. Se admiten preguntas de cuatro y cinco opciones según su fuente; una opción E importada para una pregunta del nuevo banco se rechaza antes de reemplazar el progreso.

## Progreso y transferencia

El progreso pertenece al **navegador, perfil, origen y dispositivo** utilizados. No hay sincronización. Cambiar de dominio, navegador o puerto local puede mostrar un progreso distinto. Borrar los datos del sitio lo elimina.

**Mi progreso** permite consultar estadísticas con/sin pista y todo el historial, exportar un JSON, importarlo o reiniciar. Cada intento almacena identificador, pregunta, opción elegida, resultado, fecha ISO UTC y uso de pista. «Con pista» significa haber pulsado **Ver pista antes de confirmar**; la ayuda automática después de fallar no cambia el intento ya registrado. Consultar el glosario por separado no se contabiliza como uso del botón.

La clave local es `ic2026.progress.v1`. El formato exportado contiene:

```json
{
  "format": "ic2026-progress",
  "version": 1,
  "attempts": [],
  "drafts": {},
  "view": { "questionId": 1, "topic": "all", "status": "all", "origin": "all" },
  "exportedAt": "2026-10-21T12:00:00.000Z"
}
```

El formato conserva la versión 1: al leer respaldos anteriores sin `view.origin`, se utiliza `all`, manteniendo intentos, borradores y punto de lectura. Los nuevos respaldos incluyen `origin` (`all`, `theory` o `practice`). Si hay un recorrido de modo estudio activo, incorporan también el campo opcional `studySession`: `questionIds` en orden aleatorio, `topic`, `origin`, `answers` (pregunta → ID del intento confirmado en ese recorrido) y `previousView` para restaurar la práctica habitual. Los respaldos anteriores sin ese campo siguen siendo válidos. El filtro opcional `view.bank` y `studySession.bank` distingue `theory`, `guides` y `exam`; su ausencia conserva el recorrido de todas las colecciones. La importación comprueba que la selección sea única, respete los filtros y contenga borradores o resultados coherentes con el historial y el punto de lectura.

La importación valida versión, IDs, opciones, resultados contra el solucionario, fechas, ayuda, duplicados, borradores y filtros **antes de pedir confirmación**. Reemplaza el historial; no lo mezcla. Rechaza archivos mayores a 10 MB y más de 50.000 intentos. Cancelar la importación o el reinicio conserva los datos. Si falla el almacenamiento, se informa y la sesión continúa en memoria: exportar antes de salir. Si los datos guardados no se pueden interpretar, se preservan sin sobrescribirlos y se ofrece descargarlos desde **Mi progreso**; importar un respaldo válido o reiniciar permite volver a guardar.

## Datos y trazabilidad

- `data/questions.json`: banco de origen `theory` con 350 preguntas con IDs estables `1`–`350`, opciones originales A–E en orden, solución, explicación, fuente de las diapositivas, páginas de los PDF y conceptos relacionados.
- `data/glossary.json`: 138 entradas con ID, temas, definición, explicación, ejemplo cuando aporta claridad, pista y páginas del manual de teorías y/o de la guía de prácticas. Conserva los 33 términos del glosario original de pp. 51–52; las demás entradas amplían su cobertura.
- `data/concept-map.json`: correspondencia revisada de las 350 preguntas con los conceptos. El primer concepto orienta la pista; los demás permiten profundizar. La extracción no adivina relaciones por palabras clave.
- `data/option-explanations.json`: 1.400 explicaciones específicas para los cuatro distractores de cada pregunta, con referencias conceptuales al manual, notas de contexto y una huella del enunciado/opciones/respuesta que permite detectar cambios que requieren revisión editorial. No modifica las explicaciones originales ni se regenera desde los PDF.
- `data/comparisons.json`: 14 cuadros de elaboración didáctica sobre conceptos que suelen confundirse, con columnas, diferencias, ejemplos, enlaces a entradas y páginas del manual.
- `data/acronym-audit.json`: inventario reproducible de 330 candidatos de las preguntas, opciones, soluciones y explicaciones; 182 variantes con significado y 148 exclusiones revisadas (cadenas cifradas, identificadores, comandos y expansiones ficticias).
- `data/acronym-exclusions.json`: decisiones editoriales explícitas; una sigla nueva sin definición ni revisión hace fallar la validación.
- `data/ascii.json`: tabla de las 52 letras A–Z y a–z, con sus valores decimales y hexadecimales, una aclaración sobre los caracteres del español que quedan fuera del ASCII estándar y referencias al manual.
- `data/practice-questions.json`: 92 ejercicios con IDs 351–442, origen `practice`, número y parte de práctica, consigna y código originales, opciones adaptadas, solución literal, páginas y conceptos.
- `data/practice-editorial.json`: adaptación revisada de cada ejercicio abierto, cuatro distractores y sus explicaciones, conceptos y páginas de la guía. La huella de título/consigna/referencia/solución detecta cambios que exigen revisión.
- `data/practice-option-explanations.json`: 368 explicaciones de distractores, con huellas que incluyen también los bloques de código.
- `data/practice-extraction-report.json`: 92 coincidencias entre consignas y solucionario, cobertura de las adaptaciones y hashes/páginas de los tres PDF nuevos.
- `data/extraction-report.json`: resultados de las comprobaciones, versión del extractor, páginas y SHA-256 de cada PDF.

Las referencias **Fuente original (diapositivas)** se copian del solucionario y tienen su propia numeración. Esas presentaciones no están incluidas. Los enlaces **Manual, p. …** abren el PDF disponible de 55 páginas. Los enlaces **Guía de prácticas, p. …** abren el PDF de 18 páginas, con numeración independiente. Los cuadernillos y solucionarios también se distinguen por origen. Las entradas que agregan detalles no desarrollados en el manual lo indican y citan sus páginas como contexto. Los enlaces PDF usan `#page=N`; algunos lectores externos pueden ignorar el salto y abrir el inicio del documento.

El glosario admite búsqueda sin distinguir mayúsculas o tildes, filtros de tema y enlaces como `glosario.html#run-key`. La sección **Compará conceptos** incorpora 14 cuadros desplegables que también se buscan y filtran. Las entradas ofrecen enlaces a sus comparaciones, y cada cuadro tiene un enlace directo, por ejemplo `glosario.html#comparar-estatico-dinamico`. Un enlace directo abre el cuadro y despeja filtros incompatibles. En pantallas angostas las tablas se desplazan dentro de su propio contenedor, sin ensanchar la página. Cada entrada ofrece acceso a sus preguntas relacionadas mediante `index.html?pregunta=321`.

La **Tabla ASCII del alfabeto** se consulta en `glosario.html#tabla-ascii` o desde la entrada sobre ASCII. Incluye mayúsculas y minúsculas en grupos que se apilan en pantallas angostas, puede abrirse con Enter/Espacio y admite búsqueda por valores como `65` o `0x41`. La ñ y las letras acentuadas no tienen códigos en ASCII estándar; la tabla lo aclara sin asignarles valores de otras codificaciones.

## Glosario ampliado para prácticas

Se añadieron **19 entradas**: A1Z26/Braille, Vigenère, Rail Fence/transposición columnar, aritmética modular, RSA, Diffie–Hellman, esteganografía/steghide, LSB, confianza en claves GPG/passphrase/ASCII armor, ataques de diccionario, NIR, logs SSH, canales encubiertos ICMP/DNS/PCAP, HID/Rubber Ducky, Unicode invisible, ofuscación VBScript, macros DOCM/XLS/VBA/XLM, exfiltración y writeups. Cada una tiene definición, explicación, ejemplo, pista y páginas de la guía disponible.

Otras **58 entradas existentes** suman referencias a esa guía, cubriendo codificación, cifrados, hashes, PGP, recursos de Internet, correo, análisis de malware y gestión de incidentes. Las 562 preguntas están vinculadas a conceptos revisados; no se deducen respuestas ni flags de archivos o servicios ausentes.

## Siglas y acrónimos

La revisión de los enunciados, bloques de datos, opciones, soluciones y explicaciones de distractores añadió **21 entradas** y dejó el glosario en **129 entradas**. Se incorporaron significados explícitos en listas de definición, variantes como `SHA256`/`SHA-256`, referencias oficiales y enlaces a las preguntas que usan cada término. La búsqueda admite siglas, variantes y nombres completos como `Endpoint Detection and Response`.

Se explican 152 siglas, abreviaturas y denominaciones, incluyendo las que ya aparecían sin desarrollo. Se distinguen DOS/DoS, los significados de MAC y el uso de GUI como tecla en DuckyScript; no se inventan expansiones para extensiones o nombres como DOCM, WAV o WHOIS. Las páginas del manual aportan contexto y los enlaces oficiales documentan las ampliaciones.

Las 53 denominaciones que no estaban nombradas en las definiciones anteriores son: ARM, ARP, ASN, BGP, BSD, CA, CEDIA, CLSID, CNAME, COM, CPU, CTF, DB, DH, DHCP, DNI, DNSSEC, EDR, ELF, ESMTP, GDB, GPU, GUI, GUID, HKCR, HKEY_USERS, HTML, ICANN, IDA, JPEG, KDF, LAN, LEA, MAC, Mach-O, MIME, MTA, OpenPGP, PDF, PDF/A, PNG, POP3, RC5, RISC, S/MIME, SRV, TAR, TTL, TXT, VBS, VPN, WAV, XSS. RISC se añade además para explicar el nombre histórico de ARM.

El script `scripts/audit_acronyms.py` genera el inventario con preguntas relacionadas y hashes de los cuatro archivos de contenido. `--check` no escribe: exige que todos los candidatos tengan significado o una exclusión explícita y que el informe coincida con el banco vigente. El contenido de preguntas, opciones y soluciones y el progreso de los usuarios se conservan.

## Extracción reproducible

Python solo es necesario para regenerar o verificar los datos, no para publicar el sitio:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python scripts/extract_questions.py --check
.venv/bin/python scripts/extract_practice_questions.py --check
```

Para regenerar, quitar `--check` y revisar las diferencias antes de incorporar los JSON. La extracción:

1. Reconoce el inicio del anexo por su encabezado y lo excluye del banco.
2. Exige 350 IDs únicos, consecutivos y ordenados, y cinco opciones A–E.
3. Compara cada enunciado con el solucionario y el anexo, y cada respuesta por letra **y texto** con ambos.
4. Exige las cantidades 66/160/124 y enlaces al glosario válidos.
5. Une los saltos de línea del texto corrido, normaliza Unicode NFC y comprueba texto vacío o dañado. Mantiene comandos, flags, rutas de Windows, signos y valores hexadecimales; incluye verificaciones específicas de los fragmentos más frágiles.
6. Genera los archivos solo después de validar todo el contenido. `--check` no escribe y detecta diferencias con los datos versionados.

El extractor de prácticas compara las 92 consignas con su solucionario, conserva los fragmentos monoespaciados del PDF y exige la cobertura 40/29/23 por tema. Incorpora las opciones desde el archivo editorial sólo si su huella coincide, preserva las soluciones y genera un banco separado para mantener los IDs anteriores. Comprueba cálculos autocontenidos y fragmentos frágiles en las pruebas de contenido.

Las definiciones y la correspondencia conceptual se mantienen editorialmente en los JSON; no se sobrescriben al extraer los PDF.

## Validación

Sin dependencias adicionales, salvo Node para las pruebas JavaScript:

```sh
python3 scripts/validate_data.py
python3 scripts/audit_acronyms.py --check
npm test
```

Para probar los módulos de la interfaz en un DOM y ejecutar la revisión real en Chromium (dependencias **solo de desarrollo**):

```sh
npm install
npm run test:dom
npx playwright install chromium
npm run test:browser
```

La prueba de navegador levanta un servidor temporal, comprueba práctica, teclado, glosario, recarga, progreso, importaciones, almacenamiento bloqueado, PDF y subruta `/ic2026/`. Comprueba desbordamientos a 320, 390, 768, 800, 801, 1024, 1440 y 1920 px y guarda capturas en `test-results/`. El servidor se cierra al terminar.

Ver [tests/VALIDATION.md](tests/VALIDATION.md) para los resultados obtenidos y los límites de la verificación en este entorno.

Esta versión ofrece práctica guiada, glosario e historial. No incluye cuentas, sincronización, simulacros ni repaso espaciado.
