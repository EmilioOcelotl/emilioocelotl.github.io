# =============================================================================
# PLANTILLA — copia este archivo para crear una entrada nueva.
#
# Los archivos que empiezan con "_" se IGNORAN al generar el sitio: esta
# plantilla nunca aparece en projects.js. Para crear una entrada real:
#
#   1. Copia este archivo a content/projects/NN-slug.md
#        - NN  = prefijo numérico que define el ORDEN (010, 020, 030...).
#                Para insertar entre dos, usa un número intermedio (p. ej. 105).
#        - slug = igual al href sin .html (ej. ciudad-monstruo).
#   2. Borra este bloque de comentarios y rellena los campos de abajo.
#   3. Corre `npm run content` (o ya corre solo durante `npm start`).
#
# Las líneas del frontmatter que empiezan con "#" son comentarios y se ignoran.
# =============================================================================
---
# href: ruta del detalle (suele coincidir con el slug del archivo).
href: nueva-entrada.html

# imgSrc: imagen de portada en el grid. SOLO el nombre del archivo; el generador
# antepone ./img/ automáticamente. Convención responsive: nombre.jpg + nombre-r.jpg.
imgSrc: "nombre-r.jpg"

# year: string. Acepta rangos: "2026", "2020-2026", "2019–2026".
year: "2026"

# Strings cortos, uno por idioma (.es / .en):
title.es: "Título en español"
title.en: "Title in English"
imgAlt.es: "Texto alternativo de la imagen"
imgAlt.en: "Image alt text"
description.es: "Resumen de una línea para la tarjeta del grid"
description.en: "One-line summary for the grid card"

# --- opcionales ---
# draft: true            # excluye la entrada del sitio sin borrar el archivo
# localVideo: "./videos/mi-video.mp4"
# videoPoster: "./img/poster.jpg"
---

::: es
Prosa en Markdown. Cada bloque separado por una línea en blanco se convierte en
un párrafo <p>.

Enlaces inline: [texto del enlace](https://ejemplo.com). También funcionan
*énfasis*, `código`, **negrita** y listas:

- primer punto
- segundo punto

::: en
Same prose in English. Mirror the structure of the Spanish block.

::: images
# Una imagen por línea. SOLO el nombre (el generador antepone ./img/).
# La primera suele repetir imgSrc. Captions opcionales por imagen:
#   nombre.jpg | es: Pie en español. Lugar, año. | en: Caption in English.
nombre-r.jpg
otra-imagen.jpg | es: Descripción. Lugar, 2026. | en: Description. Place, 2026.

# --- secciones opcionales (borra las que no uses) ---------------------------
# ::: audio
# ./snd/pista1.mp3
# ./snd/pista2.mp3
#
# ::: videoEmbed
# <iframe width='560' height='315' src='https://www.youtube.com/embed/ID'></iframe>
#
# ::: embed3d
# <div class="sketchfab-embed-wrapper"><iframe ...></iframe></div>
