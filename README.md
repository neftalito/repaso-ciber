# IC 2026 · Espacio de estudio

Repositorio: [neftalito/repaso-ciber](https://github.com/neftalito/repaso-ciber). Al habilitar GitHub Pages desde `main` y `/(root)`, la dirección será [neftalito.github.io/repaso-ciber](https://neftalito.github.io/repaso-ciber/).

Aplicación estática en español para practicar las **350 preguntas originales** de Introducción a la Ciberseguridad: Criptografía (66), CSIRT (160) y Malware (124). Incluye corrección explicada, pistas conceptuales, un glosario ampliado de **89 entradas**, historial de intentos y progreso local.

HTML, CSS y JavaScript nativos. No requiere compilación, framework, cuenta, backend ni dependencias para funcionar en GitHub Pages. Los tres PDF originales están en `docs/`. No se utilizan fuentes remotas, analítica ni servicios externos.

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
- Después de confirmar se muestran la selección, la respuesta correcta, la explicación literal del solucionario y su fuente.
- **Ver pista** presenta una orientación conceptual sin indicar la letra ni resolver los cálculos de la pregunta. Al fallar, se muestran automáticamente la definición, la explicación y el ejemplo del concepto relacionado, junto con la corrección.
- **Intentar de nuevo** abre un borrador sin solución ni pista visibles. Conserva los intentos anteriores, que se consultan en el historial desplegable. Los borradores también sobreviven a una recarga.
- El índice y los filtros usan el **último intento confirmado**. Durante un reintento, el estado anterior sigue vigente hasta confirmar. Si una respuesta deja de coincidir con el filtro, su corrección sigue visible hasta navegar o cambiar los filtros.
- El recorrido se cuenta sobre 350 preguntas con al menos un intento, independientemente del resultado. Las estadísticas de correctas/falladas corresponden al último intento; las estadísticas con/sin pista consideran todos los intentos.
- Los botones y controles funcionan con Tab, Mayús+Tab, Enter y Espacio; las flechas cambian opciones dentro del grupo de radio. **Alt+← / Alt+→** navega preguntas del recorrido filtrado. Escape cierra las ventanas de material y progreso.

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
  "view": { "questionId": 1, "topic": "all", "status": "all" },
  "exportedAt": "2026-10-21T12:00:00.000Z"
}
```

La importación valida versión, IDs, opciones, resultados contra el solucionario, fechas, ayuda, duplicados, borradores y filtros **antes de pedir confirmación**. Reemplaza el historial; no lo mezcla. Rechaza archivos mayores a 10 MB y más de 50.000 intentos. Cancelar la importación o el reinicio conserva los datos. Si falla el almacenamiento, se informa y la sesión continúa en memoria: exportar antes de salir. Si los datos guardados no se pueden interpretar, se preservan sin sobrescribirlos y se ofrece descargarlos desde **Mi progreso**; importar un respaldo válido o reiniciar permite volver a guardar.

## Datos y trazabilidad

- `data/questions.json`: 350 preguntas con IDs estables `1`–`350`, opciones originales A–E en orden, solución, explicación, fuente de las diapositivas, páginas de los PDF y conceptos relacionados.
- `data/glossary.json`: 89 entradas con ID, temas, definición, explicación, ejemplo cuando aporta claridad, pista y páginas del manual. Conserva los 33 términos del glosario original de pp. 51–52; las demás entradas amplían su cobertura.
- `data/concept-map.json`: correspondencia revisada de las 350 preguntas con los conceptos. El primer concepto orienta la pista; los demás permiten profundizar. La extracción no adivina relaciones por palabras clave.
- `data/extraction-report.json`: resultados de las comprobaciones, versión del extractor, páginas y SHA-256 de cada PDF.

Las referencias **Fuente original (diapositivas)** se copian del solucionario y tienen su propia numeración. Esas presentaciones no están incluidas. Los enlaces **Manual, p. …** abren el PDF disponible de 55 páginas. Las entradas que agregan detalles no desarrollados en el manual lo indican y citan sus páginas como contexto. Los enlaces PDF usan `#page=N`; algunos lectores externos pueden ignorar el salto y abrir el inicio del documento.

El glosario admite búsqueda sin distinguir mayúsculas o tildes, filtros de tema y enlaces como `glosario.html#run-key`. Cada entrada ofrece acceso a sus preguntas relacionadas mediante `index.html?pregunta=321`.

## Extracción reproducible

Python solo es necesario para regenerar o verificar los datos, no para publicar el sitio:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python scripts/extract_questions.py --check
```

Para regenerar, quitar `--check` y revisar las diferencias antes de incorporar los JSON. La extracción:

1. Reconoce el inicio del anexo por su encabezado y lo excluye del banco.
2. Exige 350 IDs únicos, consecutivos y ordenados, y cinco opciones A–E.
3. Compara cada enunciado con el solucionario y el anexo, y cada respuesta por letra **y texto** con ambos.
4. Exige las cantidades 66/160/124 y enlaces al glosario válidos.
5. Une los saltos de línea del texto corrido, normaliza Unicode NFC y comprueba texto vacío o dañado. Mantiene comandos, flags, rutas de Windows, signos y valores hexadecimales; incluye verificaciones específicas de los fragmentos más frágiles.
6. Genera los archivos solo después de validar todo el contenido. `--check` no escribe y detecta diferencias con los datos versionados.

Las definiciones y la correspondencia conceptual se mantienen editorialmente en los JSON; no se sobrescriben al extraer los PDF.

## Validación

Sin dependencias adicionales, salvo Node para las pruebas JavaScript:

```sh
python3 scripts/validate_data.py
npm test
```

Para probar los módulos de la interfaz en un DOM y ejecutar la revisión real en Chromium (dependencias **solo de desarrollo**):

```sh
npm install
npm run test:dom
npx playwright install chromium
npm run test:browser
```

La prueba de navegador levanta un servidor temporal, comprueba práctica, teclado, glosario, recarga, progreso, importaciones, almacenamiento bloqueado, PDF y subruta `/ic2026/`. Comprueba desbordamientos a 320, 390, 768 y 1440 px y guarda capturas en `test-results/`. El servidor se cierra al terminar.

Ver [tests/VALIDATION.md](tests/VALIDATION.md) para los resultados obtenidos y los límites de la verificación en este entorno.

Esta versión ofrece práctica guiada, glosario e historial. No incluye cuentas, sincronización, simulacros ni repaso espaciado.
