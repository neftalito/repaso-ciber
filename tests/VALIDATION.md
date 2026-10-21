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
| Pruebas de contenido y modelo de progreso | 11 pruebas aprobadas |
| Interacciones en DOM con los módulos reales | 30 comprobaciones aprobadas |
| Renderizado en Chromium, capturas y dimensiones de pantalla | Pendiente por restricción del entorno |
| Publicación efectiva en GitHub Pages | No realizada; entrega local preparada para publicar desde la raíz |

Las pruebas DOM ejecutaron corrección, pistas explícitas y automáticas, protección contra doble confirmación, reintentos, ocultamiento de solución después de recargar, persistencia de filtros y lectura, estado sin coincidencias, navegación por atajo, exportación, importaciones válidas e inválidas, cancelaciones, reinicio y almacenamiento bloqueado. También verificaron la conservación de datos dañados, su recuperación mediante un respaldo, la importación en memoria cuando falla el guardado, búsqueda del glosario sin tildes, filtros, enlaces directos y resolución de rutas bajo `/ic2026/`.

El entorno impidió lanzar las instalaciones existentes de Chromium: las restricciones de procesos/sockets produjeron `Operation not permitted`. Las pruebas DOM no verifican CSS, geometría, navegación nativa de radios ni contraste visual. No se presentan como una revisión visual realizada.

`npm run test:browser` deja preparada la verificación de navegador con capturas de escritorio/celular, tamaños 320/390/768/1440, teclado real y servidor bajo subruta. Debe ejecutarse en un entorno que permita iniciar Chromium; después conviene revisar las capturas y los enlaces PDF en el lector elegido. La interfaz incluye radios nativos, etiquetas, foco visible, regiones de estado, enlace para saltar contenido, ventanas con Escape y estilos para movimiento reducido.

El informe técnico de extracción y los hashes de los PDF se conservan en `data/extraction-report.json`. No se modificaron los PDF.
