---
href: decoding-gesture.html
imgSrc: "decoding-gesture-interfaz-r.png"
year: "2026"
title.es: "Decoding Gesture"
title.en: "Decoding Gesture"
imgAlt.es: "Decoding Gesture"
imgAlt.en: "Decoding Gesture"
description.es: "Performance audiovisual octofónico con código al vuelo, con Marianne Teixido"
description.en: "Octophonic audiovisual performance with live coding, with Marianne Teixido"
localVideo: "./videos/decoding-gesture.mp4"
videoPoster: "./img/decoding-gesture-poster.jpg"
---

::: es
Decoding Gesture es un performance audiovisual octofónico con código al vuelo, hecho con Marianne Teixido. Dura ocho minutos. El cuerpo de la intérprete, seguido con una cámara de profundidad, controla la síntesis neuronal de una voz asémica que se granula y se reparte entre ocho bocinas. Marianne compone el sonido; la composición visual es de las dos y yo hice la captura, la interfaz proyectada y el puente hacia SuperCollider.

El público no ve a la intérprete sino su cuerpo capturado en profundidad, en una malla de cromo, dentro de un anillo dibujado. El anillo es el de la sala: las ocho bocinas entre las que el público está sentado, vistas desde arriba. Una cinta de grosor variable alrededor del cuerpo dice cuánto suena cada una, en violeta la mano izquierda y en rojo la derecha, y donde las dos caen sobre la misma bocina el color se suma a magenta.

La regla que organiza todo es la pinza. La posición de una fuente sólo se actualiza mientras el pulgar y el índice se tocan; al soltar, el sonido queda anclado donde estaba y sigue sonando sin la mano. La intérprete decide cuándo el sistema responde, y una mano que el sensor pierde no arrastra nada consigo. En la fotografía tomada desde el fondo del auditorio, la mano izquierda dice PERDIDA y su fuente sigue sonando en el lugar donde la dejaron.

La cadena empieza en un iPhone que transmite por WiFi un cuadro partido, profundidad codificada en el matiz de un lado y RGB del otro, con unos tres metros de rango útil. El navegador desproyecta ese campo a metros con la matriz intrínseca de la cámara, rastrea las manos sobre la mitad RGB, dibuja la interfaz y manda los rasgos por WebSocket a un puente en Python que los reenvía a SuperCollider por OSC, a sesenta cuadros por segundo fijos. La voz es un modelo RAVE corriendo dentro de SuperCollider. El gesto se mapea a su espacio latente.

El anillo del CMMAS no está numerado en orden. Las ocho bocinas van en pares izquierda y derecha de adelante hacia atrás, así que el recorrido físico en sentido horario es 1, 2, 4, 6, 8, 7, 5, 3. Sin corregirlo, una fuente girando suave sale saltando de un lado a otro de la sala. La permutación existe en el patch y también en el dibujo, que es la razón por la que los picos de la cinta caen sobre las bocinas que de verdad están sonando.

La interfaz de control va proyectada en la pantalla del escenario, así que tiene dos lectores con necesidades opuestas. La intérprete la lee de reojo a tres metros mientras toca. La sala la ve a doce, donde el texto ya no se lee y lo único que llega son áreas y grosores. Por eso los grosores de línea se calculan como fracción del radio del dibujo y no en píxeles.

Estrenada el 14 de agosto de 2026 en el auditorio del CMMAS, Morelia.

Repositorio: [github.com/MarianneTeixido/decoding-gesture](https://github.com/MarianneTeixido/decoding-gesture)

::: en
Decoding Gesture is an octophonic audiovisual performance with live coding, made with Marianne Teixido. It lasts eight minutes. The performer's body, tracked with a depth camera, drives the neural synthesis of an asemic voice that is granulated and spread across eight loudspeakers. Marianne composes the sound; visual composition is by both of us, and I built the capture, the projected interface, and the bridge into SuperCollider.

The audience does not see the performer but her body captured in depth, as a chrome mesh, inside a drawn ring. The ring is the room's: the eight loudspeakers the audience is sitting among, seen from above. A ribbon of varying thickness around the body shows how much each one is sounding, violet for the left hand and red for the right, and where both land on the same speaker the colors add up to magenta.

The rule that organizes everything is the pinch. A source's position only updates while thumb and index finger touch; on release, the sound stays anchored where it was and keeps sounding without the hand. The performer decides when the system responds, and a hand the sensor loses does not drag anything with it. In the photograph taken from the back of the auditorium, the left hand reads PERDIDA, lost, and its source keeps sounding where it was left.

The chain starts with an iPhone streaming a split frame over WiFi, depth encoded in hue on one side and RGB on the other, with about three meters of usable range. The browser unprojects that field into meters using the camera's intrinsic matrix, tracks the hands over the RGB half, draws the interface, and sends the features over WebSocket to a Python bridge that forwards them to SuperCollider over OSC at a fixed sixty frames per second. The voice is a RAVE model running inside SuperCollider. Gesture is mapped into its latent space.

The ring at CMMAS is not numbered in order. The eight speakers run in left and right pairs from front to back, so the physical clockwise path is 1, 2, 4, 6, 8, 7, 5, 3. Without correcting for it, a source turning smoothly comes out jumping from one side of the room to the other. The permutation lives in the patch and in the drawing too, which is why the peaks of the ribbon fall on the speakers that are actually sounding.

The control interface is projected onto the stage screen, so it has two readers with opposing needs. The performer glances at it from three meters while playing. The room watches from twelve, where the text no longer reads and all that arrives are areas and thicknesses. That is why line weights are computed as a fraction of the drawing's radius rather than in pixels.

Premiered on 14 August 2026 at the CMMAS auditorium in Morelia, Mexico.

Repository: [github.com/MarianneTeixido/decoding-gesture](https://github.com/MarianneTeixido/decoding-gesture)

::: images
decoding-gesture-interfaz-r.png | es: La interfaz entera: el anillo con las ocho bocinas numeradas, la cinta de ganancia, el cuerpo en la malla de cromo y las trazas de las dos manos a los lados. Las dos dicen AGARRADA. Captura del sistema corriendo, septiembre de 2026. | en: The whole interface: the ring with its eight numbered speakers, the gain ribbon, the body as a chrome mesh, and the traces of both hands at either side. Both read AGARRADA, gripped. Captured from the running system, September 2026.
decoding-gesture-sala.jpg | es: Desde el fondo de la sala. A esta distancia el anillo se lee entero y el texto ya no. La mano izquierda está en PERDIDA y su fuente sigue sonando, anclada donde quedó. CMMAS, Morelia, 2026. | en: From the back of the room. At this distance the ring reads in full and the text no longer does. The left hand reads PERDIDA, lost, and its source keeps sounding, anchored where it was left. CMMAS, Morelia, 2026.
decoding-gesture-perdida-r.png | es: Las dos manos en PERDIDA, en ceniza, y el anillo encendido entero: las fuentes quedaron ancladas donde se soltaron y siguen sonando sin nadie. Captura del sistema corriendo, septiembre de 2026. | en: Both hands read PERDIDA, lost, in ash gray, and the whole ring stays lit: the sources were left anchored where they were released and keep sounding with no one. Captured from the running system, September 2026.
decoding-gesture-media.jpg | es: La pantalla como fondo de escena. Marianne Teixido a la derecha. CMMAS, Morelia, 2026. | en: The screen as the back of the stage. Marianne Teixido at the right. CMMAS, Morelia, 2026.
decoding-gesture.jpg | es: La misma interfaz fotografiada sobre la pantalla, con el grano del proyector encima. CMMAS, Morelia, 2026. | en: The same interface photographed off the screen, with the projector's grain over it. CMMAS, Morelia, 2026.
