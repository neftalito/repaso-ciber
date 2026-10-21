# Registro de validación

Validación realizada el 21 de octubre de 2026.

| Comprobación | Resultado |
| --- | --- |
| IDs únicos y consecutivos 1–350 | Correcto |
| Cinco opciones originales por pregunta, en orden | 1.750 opciones verificadas |
| Coincidencia de enunciados con solucionario | 350 de 350 |
| Coincidencia de letras y textos de respuesta con solucionario | 350 de 350 |
| Coincidencia de enunciados y respuestas con anexo | 350 de 350 |
| Cantidades por tema | Criptografía 66, CSIRT 160, Malware 124 |
| Referencias locales, páginas PDF y enlaces de conceptos | Correcto |
| Glosario ampliado | 89 entradas; conserva los 33 términos originales |
| Pruebas de contenido y modelo de progreso | 14 pruebas aprobadas |
| Interacciones en DOM con los módulos reales | 47 comprobaciones aprobadas |
| Renderizado en Chromium, capturas y dimensiones de pantalla | Correcto en GitHub Actions a 320/390/768/800/801/1024/1440/1920 px |
| Publicación efectiva en GitHub Pages | Corrección desplegada correctamente desde `main` |

Las pruebas DOM ejecutaron corrección, pistas explícitas y automáticas, protección contra doble confirmación, reintentos, ocultamiento de solución después de recargar, persistencia de filtros y lectura, estado sin coincidencias, navegación por atajo, exportación, importaciones válidas e inválidas, cancelaciones, reinicio y almacenamiento bloqueado. También verificaron la conservación de datos dañados, su recuperación mediante un respaldo, la importación en memoria cuando falla el guardado, búsqueda del glosario sin tildes, filtros, enlaces directos y resolución de rutas bajo `/ic2026/`.

El entorno local impidió lanzar las instalaciones existentes de Chromium: las restricciones de procesos/sockets produjeron `Operation not permitted`. Las pruebas DOM no verifican CSS, geometría, navegación nativa de radios ni contraste visual. No se presentan como una revisión visual realizada.

`npm run test:browser` deja preparada la verificación de navegador con capturas de escritorio/celular, tamaños 320/390/768/1440, teclado real y servidor bajo subruta. Debe ejecutarse en un entorno que permita iniciar Chromium; después conviene revisar las capturas y los enlaces PDF en el lector elegido. La interfaz incluye radios nativos, etiquetas, foco visible, regiones de estado, enlace para saltar contenido, ventanas con Escape y estilos para movimiento reducido.

El informe técnico de extracción y los hashes de los PDF se conservan en `data/extraction-report.json`. No se modificaron los PDF.

## Corrección de la distribución del glosario

Se corrigió la grilla de escritorio para que las entradas ocupen el espacio principal y la ayuda lateral tenga 240 px. Las áreas de la grilla se asignan explícitamente a cada sección. Hasta 800 px se utiliza una sola columna, con las entradas primero y la ayuda después. Las páginas solicitan una nueva versión del CSS para evitar reutilizar el archivo anterior en caché.

Las 11 pruebas de contenido/progreso y la validación de referencias volvieron a pasar. La prueba de navegador ahora comprueba las proporciones y posiciones de las dos secciones, con las 89 entradas y con búsqueda, a 320, 390, 768, 800, 801, 1024, 1440 y 1920 px. El lanzamiento local de Chromium sigue bloqueado por el entorno. El flujo `.github/workflows/validate.yml` permite ejecutar esa revisión en GitHub Actions y conserva capturas como artefactos.

La [ejecución 39678167827 en GitHub Actions](https://github.com/neftalito/repaso-ciber/actions/runs/39678167827) completó correctamente las 11 pruebas de contenido/progreso, las 30 comprobaciones DOM y la suite de Chromium con las comprobaciones geométricas en los ocho anchos, teclado, importación/exportación y rutas bajo subdirectorio. Las capturas de escritorio y móvil están disponibles en el artefacto `capturas-responsive` de esa ejecución. La descarga de las capturas al entorno local estuvo bloqueada por la resolución de red; la geometría y los desbordamientos se comprobaron automáticamente en Chromium. El [despliegue de Pages 39678164716](https://github.com/neftalito/repaso-ciber/actions/runs/39678164716) también terminó correctamente.

## Explicaciones por opción y comparaciones de conceptos

Se agregaron 1.400 explicaciones didácticas de distractores para las 350 preguntas y se conservaron las 350 explicaciones originales de las opciones correctas. La validación comprueba cobertura exacta, letras, referencias y huellas de los enunciados, opciones y respuesta. El glosario suma 13 comparaciones con filas completas, enlaces a conceptos y páginas del manual válidos.

Pasaron 13 pruebas de contenido/progreso y 42 comprobaciones DOM, incluidas ausencia de explicaciones antes de confirmar, apertura de la opción elegida, acceso a la explicación correcta, cierre al reintentar o regresar, navegación próxima y final del recorrido, búsqueda y enlaces directos a comparaciones. La suite de Chromium incorpora apertura/cierre por teclado, alineación del ícono de reintento y contención de tablas en los ocho anchos. La [ejecución 39686772312](https://github.com/neftalito/repaso-ciber/actions/runs/39686772312) completó correctamente las 13 pruebas de contenido/progreso, las 42 comprobaciones DOM y la suite completa de Chromium. Se probaron los acordeones con Enter/Espacio, el orden y alineación de los botones, los enlaces directos, el final del recorrido y las tablas abiertas en los ocho tamaños, sin desbordamientos de página. Las capturas quedaron guardadas como artefactos de la ejecución. También se reforzó el contraste de la letra de la opción fallada con texto blanco sobre fondo rojo.

## Tabla ASCII del alfabeto

Se verificaron las 52 letras A–Z y a–z, sin duplicados, y la correspondencia exacta entre carácter, decimal y hexadecimal. Se aclara que la ñ y las letras acentuadas quedan fuera del ASCII estándar. Los datos se conservan en `data/ascii.json` y sus referencias apuntan a las páginas 6–7 del manual.

Pasaron 14 pruebas de contenido/progreso y 47 comprobaciones DOM, incluidas tabla cerrada al inicio, enlace desde la entrada ASCII, búsqueda hexadecimal, filtro temático y apertura del enlace directo con filtros incompatibles. La suite de Chromium comprueba apertura/cierre con Enter/Espacio y ausencia de desbordamiento de tabla y página en los ocho anchos; guarda capturas a 390 y 1440 px.
