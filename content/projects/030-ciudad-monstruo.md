---
href: ciudad-monstruo.html
imgSrc: "ciudad-monstruo-mapa-r.png"
year: "2026"
title.es: "Ciudad Monstruo"
title.en: "Ciudad Monstruo"
imgAlt.es: "Ciudad Monstruo"
imgAlt.en: "Ciudad Monstruo"
description.es: "Partitura gráfica interactiva y motor de audio multicanal"
description.en: "Interactive graphic score and multichannel audio render engine"
---

::: es
Ciudad Monstruo es una herramienta de composición sonora espacial. Los trazos dibujados sobre un campo circular son instrucciones de reproducción; definen cuándo, dónde y con qué muestra suena algo en el espacio.

El trazo registra la intención del cuerpo que lo hace. Un gesto lento produce un trazo ancho; uno rápido, una línea fina. El ancho no es decorativo. Aumenta la ganancia de la fuente y dispersa su posición entre los altavoces; el trazo delgado concentra el sonido en un punto preciso del campo.

Bajo la superficie gráfica hay un motor de render espacial. Renderizar recorre los trazos y produce un archivo multicanal, de dos, cuatro u ocho canales según el layout de altavoces, que se reproduce en hardware externo; el navegador solo monitorea en estéreo. La espacialización usa DBAP y las muestras no suenan en bucle sino por síntesis granular: el puntero avanza por el archivo mientras el ancho del trazo modula la densidad de los granos, produciendo una textura electroacústica continua.

La ciudad de México aparece en el campo como una presencia espectral. Vialidades, alcaldías, perímetros interiores filtrados a través de una variación procedural. Cada vez que el sistema carga genera una variante ligeramente distinta. La ciudad muta.

Una segunda interfaz, radionauta, abre la pieza a la intervención en tiempo real: hasta cuatro personas modifican el sonido desde sus dispositivos, cada una sobre una alcaldía del mapa, mientras la composición avanza.

Una tercera interfaz, deriva, es la versión pública y jugable. Sin partitura ni sincronía, cualquiera recorre el campo sonoro de la ciudad desde el navegador: elige una categoría con los colores y toca las alcaldías del mapa, donde cada una guarda muestras que suenan al deslizar el dedo. Disponible en [cdm.ocelotl.cc](https://cdm.ocelotl.cc/).

Estas interfaces son la base de Radionautas de la Ciudad Monstruo, pieza generada en conjunto con La Sonora que Sueña, seleccionada para Mecánicas Inmersivas (CENART, Fonoteca Nacional, INBAL, ESM) y pendiente de estreno.

Repositorio: [0xacab.org/ocelotl/ciudad-monstruo](https://0xacab.org/ocelotl/ciudad-monstruo)

::: en
Ciudad Monstruo is a spatial sound composition tool. Strokes drawn over a circular field are playback instructions; they define when, where, and with what sample something sounds in space.

The stroke records the intention of the body that makes it. A slow gesture produces a wide stroke; a fast one, a thin line. Width is not decorative. It increases the source's gain and spreads its position across the loudspeakers; a thin stroke concentrates the sound at a precise point in the field.

Beneath the graphic surface there is a spatial render engine. Rendering traverses the strokes and produces a multichannel file, of two, four, or eight channels depending on the loudspeaker layout, played back on external hardware; the browser only monitors in stereo. Spatialization uses DBAP, and the samples do not loop but sound through granular synthesis: the pointer advances through the file while the stroke's width modulates grain density, producing a continuous electroacoustic texture.

Mexico City appears in the field as a spectral presence. Roads, boroughs, interior perimeters filtered through procedural variation. Each time the system loads it generates a slightly different variant. The city mutates.

A second interface, radionauta, opens the piece to real-time intervention: up to four people modify the sound from their own devices, each over a borough of the map, while the composition unfolds.

A third interface, deriva, is the public, playable version. With no score or synchronization, anyone can wander the city's sound field from the browser: pick a category with the colors and touch the boroughs of the map, each holding samples that sound as you slide your finger. Available at [cdm.ocelotl.cc](https://cdm.ocelotl.cc/).

These interfaces are the basis of Radionautas de la Ciudad Monstruo, a piece created together with La Sonora que Sueña, selected for Mecánicas Inmersivas (CENART, Fonoteca Nacional, INBAL, ESM) and awaiting its premiere.

Repository: [0xacab.org/ocelotl/ciudad-monstruo](https://0xacab.org/ocelotl/ciudad-monstruo)

::: images
ciudad-monstruo-mapa-r.png | es: El mapa solo, sin partitura ni layout de bocinas encima. Una de las variantes que el sistema genera en cada carga. | en: The map on its own, with no score or speaker layout over it. One of the variants the system generates on each load.
ciudad-monstruo-campo.jpg | es: Campo de composición. Layout octofónico sobre el trazo de la Ciudad de México. | en: Composition field. Octophonic layout over the outline of Mexico City.
ciudad-monstruo-mapeo.jpg | es: Mapeo gráfico a audio: velocidad del gesto al ancho y la ganancia, trayectoria al movimiento espacial, color a la muestra. | en: Graphic-to-audio mapping: gesture speed to width and gain, trajectory to spatial movement, color to sample.
cdm-foto.jpeg
