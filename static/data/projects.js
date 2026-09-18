export const projects = [

  {
    "href": "decoding-gesture.html",
    "imgSrc": "./img/decoding-gesture-interfaz-r.png",
    "imgAlt": "Decoding Gesture",
    "title": "Decoding Gesture",
    "year": "2026",
    "description": "Performance audiovisual octofónico con código al vuelo, con Marianne Teixido",
    "details": {
      "fullDescription": "<p>Decoding Gesture es un performance audiovisual octofónico con código al vuelo, hecho con Marianne Teixido. Dura ocho minutos. El cuerpo de la intérprete, seguido con una cámara de profundidad, controla la síntesis neuronal de una voz asémica que se granula y se reparte entre ocho bocinas. Marianne compone el sonido; la composición visual es de las dos y yo hice la captura, la interfaz proyectada y el puente hacia SuperCollider.</p><p>El público no ve a la intérprete sino su cuerpo capturado en profundidad, en una malla de cromo, dentro de un anillo dibujado. El anillo es el de la sala: las ocho bocinas entre las que el público está sentado, vistas desde arriba. Una cinta de grosor variable alrededor del cuerpo dice cuánto suena cada una, en violeta la mano izquierda y en rojo la derecha, y donde las dos caen sobre la misma bocina el color se suma a magenta.</p><p>La regla que organiza todo es la pinza. La posición de una fuente sólo se actualiza mientras el pulgar y el índice se tocan; al soltar, el sonido queda anclado donde estaba y sigue sonando sin la mano. La intérprete decide cuándo el sistema responde, y una mano que el sensor pierde no arrastra nada consigo. En la fotografía tomada desde el fondo del auditorio, la mano izquierda dice PERDIDA y su fuente sigue sonando en el lugar donde la dejaron.</p><p>La cadena empieza en un iPhone que transmite por WiFi un cuadro partido, profundidad codificada en el matiz de un lado y RGB del otro, con unos tres metros de rango útil. El navegador desproyecta ese campo a metros con la matriz intrínseca de la cámara, rastrea las manos sobre la mitad RGB, dibuja la interfaz y manda los rasgos por WebSocket a un puente en Python que los reenvía a SuperCollider por OSC, a sesenta cuadros por segundo fijos. La voz es un modelo RAVE corriendo dentro de SuperCollider. El gesto se mapea a su espacio latente.</p><p>El anillo del CMMAS no está numerado en orden. Las ocho bocinas van en pares izquierda y derecha de adelante hacia atrás, así que el recorrido físico en sentido horario es 1, 2, 4, 6, 8, 7, 5, 3. Sin corregirlo, una fuente girando suave sale saltando de un lado a otro de la sala. La permutación existe en el patch y también en el dibujo, que es la razón por la que los picos de la cinta caen sobre las bocinas que de verdad están sonando.</p><p>La interfaz de control va proyectada en la pantalla del escenario, así que tiene dos lectores con necesidades opuestas. La intérprete la lee de reojo a tres metros mientras toca. La sala la ve a doce, donde el texto ya no se lee y lo único que llega son áreas y grosores. Por eso los grosores de línea se calculan como fracción del radio del dibujo y no en píxeles.</p><p>Estrenada el 14 de agosto de 2026 en el auditorio del CMMAS, Morelia.</p><p>Repositorio: <a href='https://github.com/MarianneTeixido/decoding-gesture'>github.com/MarianneTeixido/decoding-gesture</a></p>",
      "images": [
        {
          "src": "./img/decoding-gesture-interfaz-r.png",
          "caption": "La interfaz entera: el anillo con las ocho bocinas numeradas, la cinta de ganancia, el cuerpo en la malla de cromo y las trazas de las dos manos a los lados. Las dos dicen AGARRADA. Captura del sistema corriendo, septiembre de 2026."
        },
        {
          "src": "./img/decoding-gesture-sala.jpg",
          "caption": "Desde el fondo de la sala. A esta distancia el anillo se lee entero y el texto ya no. La mano izquierda está en PERDIDA y su fuente sigue sonando, anclada donde quedó. CMMAS, Morelia, 2026."
        },
        {
          "src": "./img/decoding-gesture-perdida-r.png",
          "caption": "Las dos manos en PERDIDA, en ceniza, y el anillo encendido entero: las fuentes quedaron ancladas donde se soltaron y siguen sonando sin nadie. Captura del sistema corriendo, septiembre de 2026."
        },
        {
          "src": "./img/decoding-gesture-media.jpg",
          "caption": "La pantalla como fondo de escena. Marianne Teixido a la derecha. CMMAS, Morelia, 2026."
        },
        {
          "src": "./img/decoding-gesture.jpg",
          "caption": "La misma interfaz fotografiada sobre la pantalla, con el grano del proyector encima. CMMAS, Morelia, 2026."
        }
      ],
      "localVideo": "./videos/decoding-gesture.mp4",
      "videoPoster": "./img/decoding-gesture-poster.jpg"
    }
  },

  {
    "href": "tea.html",
    "imgSrc": "./img/tres-grafo2-r.jpg",
    "imgAlt": "TRES ESTUDIOS ABIERTOS",
    "title": "Tres Estudios Abiertos",
    "year": "2026",
    "description": "Tesis de doctorado que corre en el navegador",
    "details": {
      "fullDescription": "<p>¿Qué aportes puede realizar la escritura de código a los nuevos modos del performance audiovisual y a la escritura de un documento reflexivo que integra sonido, gráficos y texto en el contexto de la investigación artística? Esa es la pregunta central de esta tesis, inscrita en el Programa de Maestría y Doctorado en Música de la UNAM.</p><p>Es una investigación académica y una pieza artística que corre en el navegador.</p><p>La tesis se organiza en tres partes. La Parte I es el archivo principal: la tesis académica en sentido convencional, con introducción, conceptos operativos, arquitectura del sistema, iteraciones experimentales y conclusiones. La Parte II es el archivo transversal: nodos temáticos que atraviesan la tesis por debajo de su estructura. La Parte III son los archivos comprimidos: versiones generativas de la tesis.</p><p><code>tres-app</code> es el sitio principal del proyecto. Lee la base de datos SQLite de Trilium Notes, donde se escribe la tesis, y produce un PDF (Parte I) y una visualización 3D navegable (Parte II). Corre en un servidor casero con Express, pm2 y Docker; la base se sincroniza con un script bash y cron.</p><p>La visualización 3D es un grafo force-directed construido con Three.js y d3-force-3d. Cada nota es una esfera con halo emisivo.</p><p>Los casos de estudio son también instancias de este sistema experimental: <a href='https://anti.ocelotl.cc'>anti</a> (ofuscación audiovisual, JavaScript + SuperCollider), <a href='https://github.com/EmilioOcelotl/THREE.studies-II'>THREE.studies-II</a> (sonido y gráficos en el navegador, Three.js + SuperCollider) y <a href='https://risosc.ocelotl.cc'>risosc</a> (impresiones risográficas con NFC y síntesis granular). Comparten <a href='https://github.com/EmilioOcelotl/treslib'>treslib</a>, librería escrita en paralelo a la tesis.</p><p>El proyecto puede consultarse en: <a href='https://api.ocelotl.cc'>api.ocelotl.cc</a></p><p>Repositorio de código: <a href='https://github.com/EmilioOcelotl/tres-app'>github.com/EmilioOcelotl/tres-app</a></p>",
      "images": [
        "./img/tres-grafo2-r.jpg",
        "./img/tres-grafo-r.jpg",
        "./img/tres-comprimido-r.jpg",
        "./img/tres-comprimido-codigo-r.jpg"
      ]
    }
  },

  {
    "href": "piranhalab.html",
    "imgSrc": "./img/profeticas-r.png",
    "imgAlt": "PiranhaLab",
    "title": "PiranhaLab",
    "year": "2019–2026",
    "description": "Laboratorio de arte, tecnología y cultura libre",
    "details": {
      "fullDescription": "<p>Laboratorio de experimentación entre arte, tecnología y educación, activo en Ciudad de México desde 2019. Co-fundado con Marianne Teixido; colabora actualmente también Dorian Sotomayor.</p><p>Produce infraestructura cultural experimental: instalaciones sonoras, herramientas de código abierto, talleres de soberanía tecnológica y archivo distribuido. Los talleres cubren live coding, síntesis sonora y documentación del territorio.</p><p>Proyecto beneficiario del Programa de Apoyo a la Docencia, Investigación y Difusión de las Artes.</p><p>Sitio: <a href='https://piranhalab.cc'>piranhalab.cc</a></p>",
      "images": [
        "./img/profeticas-r.png",
        "./img/tecnologias-cotidianas.jpeg"
      ]
    }
  },

  {
    "href": "ciudad-monstruo.html",
    "imgSrc": "./img/ciudad-monstruo-campo-r.jpg",
    "imgAlt": "Ciudad Monstruo",
    "title": "Ciudad Monstruo",
    "year": "2026",
    "description": "Partitura gráfica interactiva y motor de audio multicanal",
    "details": {
      "fullDescription": "<p>Ciudad Monstruo es una herramienta de composición sonora espacial. Los trazos dibujados sobre un campo circular son instrucciones de reproducción; definen cuándo, dónde y con qué muestra suena algo en el espacio.</p><p>El trazo registra la intención del cuerpo que lo hace. Un gesto lento produce un trazo ancho; uno rápido, una línea fina. El ancho no es decorativo. Aumenta la ganancia de la fuente y dispersa su posición entre los altavoces; el trazo delgado concentra el sonido en un punto preciso del campo.</p><p>Bajo la superficie gráfica hay un motor de render espacial. Renderizar recorre los trazos y produce un archivo multicanal, de dos, cuatro u ocho canales según el layout de altavoces, que se reproduce en hardware externo; el navegador solo monitorea en estéreo. La espacialización usa DBAP y las muestras no suenan en bucle sino por síntesis granular: el puntero avanza por el archivo mientras el ancho del trazo modula la densidad de los granos, produciendo una textura electroacústica continua.</p><p>La ciudad de México aparece en el campo como una presencia espectral. Vialidades, alcaldías, perímetros interiores filtrados a través de una variación procedural. Cada vez que el sistema carga genera una variante ligeramente distinta. La ciudad muta.</p><p>Una segunda interfaz, radionauta, abre la pieza a la intervención en tiempo real: hasta cuatro personas modifican el sonido desde sus dispositivos, cada una sobre una alcaldía del mapa, mientras la composición avanza.</p><p>Una tercera interfaz, deriva, es la versión pública y jugable. Sin partitura ni sincronía, cualquiera recorre el campo sonoro de la ciudad desde el navegador: elige una categoría con los colores y toca las alcaldías del mapa, donde cada una guarda muestras que suenan al deslizar el dedo. Disponible en <a href='https://cdm.ocelotl.cc/'>cdm.ocelotl.cc</a>.</p><p>Estas interfaces son la base de Radionautas de la Ciudad Monstruo, pieza generada en conjunto con La Sonora que Sueña, seleccionada para Mecánicas Inmersivas (CENART, Fonoteca Nacional, INBAL, ESM) y pendiente de estreno.</p><p>Repositorio: <a href='https://0xacab.org/ocelotl/ciudad-monstruo'>0xacab.org/ocelotl/ciudad-monstruo</a></p>",
      "images": [
        {
          "src": "./img/ciudad-monstruo-campo.jpg",
          "caption": "Campo de composición. Layout octofónico sobre el trazo de la Ciudad de México."
        },
        {
          "src": "./img/ciudad-monstruo-mapeo.jpg",
          "caption": "Mapeo gráfico a audio: velocidad del gesto al ancho y la ganancia, trayectoria al movimiento espacial, color a la muestra."
        },
        "./img/cdm-foto.jpeg"
      ]
    }
  },

  {
    "href": "risosc.html",
    "imgSrc": "./img/risosc4.jpg",
    "imgAlt": "risosc",
    "title": "RisOSC",
    "year": "2025-2026",
    "description": "Impresiones risográficas con identificadores NFC y esculturas 3D",
    "details": {
      "fullDescription": "<p>Escrituras sobre lo escaso multiplicado y lo efímero único.</p><p>Cuando un visitante acerca una impresión risográfica a un lector NFC, se genera una visualización única con Three.js e Hydra y se captura un snapshot comprimido en base de datos. La instalación tiene seis partes: las visualizaciones web, un servidor con WebSockets, el firmware ESP32 que maneja el lector, un exportador de mallas 3D, los scripts que dejan corriendo la proyección en sala y un dashboard para revisar lo que pasó durante la muestra.</p><p>Presentada en <em>Algorítmica Íntima</em>, Centro de Cultura Digital, Ciudad de México, 2025-2026.</p><p>Después de la exhibición, el material capturado se volvió su propio objeto: <a href='https://risosc.ocelotl.cc'>risosc.ocelotl.cc</a> organiza los 618 snapshots en un mosaico denso donde cada celda controla un motor de síntesis granular en tiempo real. Brillo, contraste y complejidad del snapshot modulan los parámetros del granulador.</p><p>Código: <a href='https://github.com/EmilioOcelotl/risosc'>github.com/EmilioOcelotl/risosc</a></p>",
      "images": [
        {
          "src": "./img/risoscccd.jpeg",
          "caption": "La instalación en Algorítmica Íntima: pantalla, impresiones y lector NFC. Centro de Cultura Digital, 2025."
        },
        {
          "src": "./img/risosc2.jpeg",
          "caption": "Impresión risográfica con las cuatro texturas. 2025."
        },
        {
          "src": "./img/risosc3.jpeg",
          "caption": "Las cuatro impresiones enmarcadas sobre la proyección. Centro de Cultura Digital, 2025."
        },
        {
          "src": "./img/risosc5.jpeg",
          "caption": "El lector: ESP32 y módulo PN532 en caja de acrílico. 2025."
        },
        {
          "src": "./img/risosc4.jpg",
          "caption": "Visualización activa: malla deformada por una textura de Hydra. 2025."
        },
        {
          "src": "./img/risosc-mosaico-r.png",
          "caption": "Mosaico con los 618 registros capturados durante la muestra. risosc.ocelotl.cc, 2026."
        },
        {
          "src": "./img/risosc-granulador-r.png",
          "caption": "Una celda activa controla el granulador: brillo, contraste y complejidad en tiempo real. 2026."
        },
        {
          "src": "./img/risosc-snapshot-r.png",
          "caption": "Un registro de 80×80 pixeles en cuatro tonos de gris, ampliado. 2026."
        },
        {
          "src": "./img/risosc-mosaico-nfc2-r.png",
          "caption": "El mosaico filtrado por una etiqueta NFC. 2026."
        },
        {
          "src": "./img/risosc-dashboard-r.png",
          "caption": "El dashboard: eventos por hora del día y distribución por etiqueta NFC. risosc.ocelotl.cc/dashboard, 2026."
        }
      ],
      "embed3d": "<div class=\"sketchfab-embed-wrapper\"><iframe title=\"risosc-01\" frameborder=\"0\" allowfullscreen mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" allow=\"autoplay; fullscreen; xr-spatial-tracking\" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src=\"https://sketchfab.com/models/9d273c827c854b1485c24fa8a1543669/embed?ui_theme=dark\"></iframe><p style=\"font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A44;\"><a href=\"https://sketchfab.com/3d-models/risosc-01-9d273c827c854b1485c24fa8a1543669?utm_medium=embed&utm_campaign=share-popup&utm_content=9d273c827c854b1485c24fa8a1543669\" target=\"_blank\" rel=\"nofollow\" style=\"font-weight: bold; color: #1CAAD9;\">risosc-01</a> by <a href=\"https://sketchfab.com/emilioocelotl?utm_medium=embed&utm_campaign=share-popup&utm_content=9d273c827c854b1485c24fa8a1543669\" target=\"_blank\" rel=\"nofollow\" style=\"font-weight: bold; color: #1CAAD9;\">emilioocelotl</a> on <a href=\"https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=9d273c827c854b1485c24fa8a1543669\" target=\"_blank\" rel=\"nofollow\" style=\"font-weight: bold; color: #1CAAD9;\">Sketchfab</a></p></div>"
    }
  },

  {
    "href": "av-ccrma.html",
    "imgSrc": "./img/residencia-r.jpg",
    "imgAlt": "stanford2024",
    "title": "Audio-Visual Sessions",
    "year": "2024",
    "description": "Compositores de posgrado de Stanford junto con M. Teixido y E. Ocelotl",
    "details": {
      "fullDescription": "<p>Residencia artística realizada en el Center for Computer Research in Music and Acoustics (CCRMA), Stanford, junto con Marianne Teixido, del 8 al 17 de enero de 2024.</p><p>Durante nuestra estancia trabajamos con seis estudiantes de composición y presentamos dos conciertos: uno en CCRMA Stage y otro en Elliott Program Center.</p><p>Los estudiantes con los que colaboramos fueron: Celeste Betancur, Brian Brown, Tatiana Catanzaro, Anna Golubkova, Lemon Guo y Nick Shaheed.</p>",
      "images": [
        "./img/residencia-r.jpg",
        "./img/ccrma2024-1-r.jpg",
        "./img/ccrmaCel-r.jpg",
        "./img/sd-r.jpeg"
      ],
      "localVideo": "./videos/ccrma-web.mp4",
      "videoEmbed": "<iframe width='560' height='315' src='https://www.youtube.com/embed/fjBn5qU85QI?si=QpEU2ODarxtDuPZE' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>"
    }
  },

  {
    "href": "minimapper.html",
    "imgSrc": "./img/minimapper-r.jpg",
    "imgAlt": "MiniMapper",
    "title": "MiniMapper",
    "year": "2026",
    "description": "Videomapping generativo en el navegador, sin instalar nada",
    "details": {
      "fullDescription": "<p>MiniMapper es una herramienta de videomapping generativo en tiempo real. Cada superficie es un parche Bezier deformable que puede recibir como textura gráficos de Hydra, videos, imágenes o cámaras. Funciona en el navegador: no hace falta servir ni instalar nada. Las sesiones pueden guardarse en cualquier momento.</p><p>Este proyecto surge de la fricción que implica instalar y usar software de mapping comercial, que además exige una instalación local. MiniMapper se fue construyendo en dos escalas: decisiones que marcaron el rumbo general de la herramienta, y rumbos específicos que se probaron y retroalimentaron en sesiones de un laboratorio de creatividad y tecnología —como la audiorreactividad y la detección de picos de amplitud en la señal del micrófono.</p><p>El objetivo fue acortar la distancia entre el software que opera como caja negra y los programas pequeños y personalizables: los que disminuyen las complicaciones técnicas y las curvas de aprendizaje, y dejan el foco en las decisiones creativas.</p><p>Sitio: <a href='https://emilioocelotl.github.io/minimapper/'>emilioocelotl.github.io/minimapper</a></p><p>Repositorio: <a href='https://github.com/EmilioOcelotl/minimapper'>github.com/EmilioOcelotl/minimapper</a></p>",
      "images": [
        "./img/minimapper-r.jpg"
      ]
    }
  },

  {
    "href": "synthaxis.html",
    "imgSrc": "./img/synth2.jpeg",
    "imgAlt": "synthaxis",
    "title": "Error de Synthaxis",
    "year": "2025",
    "description": "Exploraciones sonoras y voces sintéticas",
    "details": {
      "fullDescription": "<p>Exploraciones sonoras y voces sintéticas. Presentado junto con Marianne Teixido en el marco de la celebración del 20° aniversario del festival Insonora en Madrid, España, 2025.</p>",
      "images": [
        "./img/synth1.jpeg",
        "./img/synth2.jpeg",
        "./img/synth3.jpeg"
      ],
      "audioSrc": [
        "./snd/insonora.mp3"
      ]
    }
  },

  {
    "href": "threeStudies.html",
    "imgSrc": "./img/three2024-2.jpg",
    "imgAlt": "three2022",
    "title": "THREE.studies",
    "year": "2022-2024",
    "description": "Estudios audiovisuales para el navegador",
    "details": {
      "fullDescription": "<p>Estudios audiovisuales para el navegador. Este proyecto se realizó en colaboración con Iracema de Andrade.</p><p>El repositorio con las primeras versiones se encuentra en: <a href='https://github.com/EmilioOcelotl/THREE.studies'>THREE.studies</a>.</p><p>La última versión está respaldada en: <a href='https://github.com/EmilioOcelotl/THREE.studies-II'>THREE.studies-II</a>. Para esta versión, despliego la instancia de un <a href='https://github.com/EmilioOcelotl/osc-web-server'>servidor OSC web personalizado</a> y la biblioteca <a href='https://github.com/EmilioOcelotl/treslib'>treslib</a>, ambas desarrolladas por mí. También implementa una <a href='https://github.com/EmilioOcelotl/MMLL'>variación</a> de la biblioteca MMLL.js, trabajada en conjunto con Marianne Teixido, basada en el <a href='https://github.com/sicklincoln/MMLL'>proyecto original</a> de Nick Collins.</p>",
      "images": [
        "./img/iracema-r.jpg",
        "./img/threeclnF-r.png",
        "./img/three2024.jpg",
        "./img/threeNw-r.png"
      ]
    }
  },

  {
    "href": "anti.html",
    "imgSrc": "./img/antiHydra2-r.jpg",
    "imgAlt": "anti2022",
    "title": "Anti",
    "year": "2022-2024",
    "description": "Ofuscación audiovisual en el navegador",
    "details": {
      "fullDescription": "<p>La ofuscación como motivo, la escritura como rodeo.</p><p>Anti es un llamado a la responsabilidad sobre los datos, al compromiso y cuidado, y a la participación de usuarixs que desdibujan las fronteras de la pasividad política y económica, teniendo como epicentro lo sensible.</p><p>Proyecto en línea: <a href='https://anti.ocelotl.cc'>anti.ocelotl.cc</a></p><p>Código: <a href='https://github.com/EmilioOcelotl/anti'>github.com/EmilioOcelotl/anti</a></p><p>Proyecto apoyado por el Fondo Nacional para la Cultura y las Artes.</p>",
      "images": [
        "./img/anti2-r.jpg",
        "./img/anti-r.jpg",
        "./img/antiHydra2-r.jpg"
      ]
    }
  },

  {
    "href": "nime2023.html",
    "imgSrc": "./img/nime1-r.jpg",
    "imgAlt": "nime2023",
    "title": "NIME",
    "year": "2023",
    "description": "Presentación audiovisual en NIME junto con Marianne Teixido",
    "details": {
      "fullDescription": "<p>Presentación audiovisual en New Interfaces for Musical Expression 2023.</p><p>La sesión se realizó en la explanada del Centro de Cultura Digital y formó parte de un programa con varias propuestas musicales y audiovisuales.</p><p>La organización de NIME nos otorgó el premio a la mejor música. La decisión se puede consultar en: <a href='https://www.nime2023.org/awards-photos'>https://www.nime2023.org/awards-photos</a>.</p>",
      "images": [
        "./img/nime1-r.jpg",
        "./img/nime3-r.jpg",
        "./img/nime-r.jpg"
      ]
    }
  },

  {
    "href": "rggtrn.html",
    "imgSrc": "./img/lac-r.jpg",
    "imgAlt": "RGGTRN",
    "title": "RGGTRN",
    "year": "2012-2019",
    "description": "Colectivo de música algorítmica e improvisación audiovisual",
    "details": {
      "fullDescription": "<p>RGGTRN (reɣɣaeˈtɾon) comenzó en 2012 en Ciudad de México como ~ON, un dúo de música electroacústica y mixta con Luis Navarro. Las primeras presentaciones incluían músicos invitados. En 2014 tocamos en el Festival Databit.me, Arles, Francia, con Henri Marquet en guitarrón y Emmanuelle Aymès en voz. En Bilbao, durante esa gira, adoptamos el nombre RGGTRN.</p><p>El trabajo se desplazó hacia la música algorítmica para bailar y la improvisación audiovisual, vinculada al contexto Latinx de sus miembros. Presentaciones en Algorave CCD (Ciudad de México, 2018), Algorave-Algorumba (Manizales, Colombia, 2017), International Conference on Live Coding (Madrid, 2019) y Linux Audio Conference (2019). La gira con Bellacode (2017) fue una de las actividades más emblemáticas del colectivo.</p>",
      "images": [
        "./img/lac-r.jpg",
        "./img/algoraveccd.jpg",
        "./img/algoraveccd2-r.jpg",
        "./img/algoraveMadrid2019.jpeg",
        "./img/algoraveMadrid2019-2.jpeg",
        "./img/peru-r.jpg",
        "./img/rggtrnbanner-r.png",
        "./img/rggtrnFull-r.jpg",
        "./img/on-muac1.jpeg",
        "./img/on-muac2.jpeg"
      ],
      "videoEmbed": "<iframe width='560' height='315' src='https://www.youtube.com/embed/owJwB3BsclI' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>"
    }
  },

  {
    "href": "xicalco.html",
    "imgSrc": "./img/xicalco-r.jpeg",
    "imgAlt": "xicalco2022",
    "title": "Xicalcoliuhqui",
    "year": "2022",
    "description": "RGGTRN + Gabriel de Dios 'El Hijo de Tere'",
    "details": {
      "fullDescription": "<p>RGGTRN en formato completo, en colaboración con Gabriel de Dios 'El Hijo de Tere', en el Centro Cultural España de México (CDMX).</p>",
      "images": [
        "./img/xicalco-r.jpeg",
        "./img/2-r.jpeg",
        "./img/3-r.jpeg",
        "./img/6-r.jpeg"
      ],
      "audioSrc": [
        "./snd/audio1.mp3",
        "./snd/audio2.mp3",
        "./snd/audio3.mp3"
      ]
    }
  },

  {
    "href": "algorave2023.html",
    "imgSrc": "./img/algorave2-r.jpg",
    "imgAlt": "algorave",
    "title": "Algorave CDMX",
    "year": "2023",
    "description": "Colaboración con Dorian Sotomayor",
    "details": {
      "fullDescription": "<p>Presentación audiovisual junto con Dorian Sotomayor en Algorave CDMX 2023.</p>",
      "images": [
        "./img/algorave2-r.jpg"
      ],
      "videoEmbed": "<iframe width='560' height='315' src='https://www.youtube.com/embed/-2E_Hc4lCBw?si=Z6cXaSI4IdL5RZwv' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>"
    }
  },

  {
    "href": "cusco.html",
    "imgSrc": "./img/cusco-r.jpg",
    "imgAlt": "cusco2022",
    "title": "Concierto audiovisual",
    "year": "2021",
    "description": "PUMPUMYACHKAN Festival Asimtria",
    "details": {
      "fullDescription": "<p>Presentación audiovisual en Cusco, Perú, en el marco del PUMPUMYACHKAN Festival Asimtria.</p><p><a href='https://ia904501.us.archive.org/25/items/memoria_pumpum16_cusco/memoria_virtual.pdf'>Memoria Pumpum 16</a></p>",
      "images": [
        "./img/cusco-r.jpg"
      ],
      "videoEmbed": "<iframe width='560' height='315' src='https://www.youtube.com/embed/XbRZuhifAJE?si=ygXWNT5CQiHuLbM5' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>"
    }
  },

  {
    "href": "panorama-edges.html",
    "imgSrc": "./img/edges-r.png",
    "imgAlt": "edges",
    "title": "Panorama-EDGES",
    "year": "2020",
    "description": "Exploración de espacios virtuales compartidos"
  },

  {
    "href": "feedback.html",
    "imgSrc": "./img/of13-r.jpg",
    "imgAlt": "feedback",
    "title": "Feedback",
    "year": "2020",
    "description": "Exploraciones entre código, sonido e imagen"
  },

  {
    "href": "noche2.html",
    "imgSrc": "./img/disco3-r.jpg",
    "imgAlt": "nocheDeLasEstrellas II",
    "title": "Noche de las Estrellas II",
    "year": "2019",
    "description": "Intervención audiovisual basada en datos astronómicos",
    "details": {
      "fullDescription": "<p>Intervención audiovisual basada en datos astronómicos. Este proyecto se realizó en colaboración con ACT UNAM y el Instituto de Astronomía. En esta ocasión sonificamos y visualizamos datos de jets astronómicos.</p><p>Repositorio: <a href='https://github.com/EmilioOcelotl/nocheDeLasEstrellas2019'>nocheDeLasEstrellas2019</a></p>",
      "images": [
        "./img/disco3.jpg",
        "./img/noche2019-1.jpg",
        "./img/noche01-r.png",
        "./img/noche2019-2.jpg",
        "./img/data.jpg",
        "./img/noche2019-3.jpg",
        "./img/noche02-r.png"
      ]
    }
  },

  {
    "href": "ofhawc.html",
    "imgSrc": "./img/ofhawc-r.jpg",
    "imgAlt": "ofhawc",
    "title": "Noche de las Estrellas I - ofHAWC",
    "year": "2018",
    "description": "Visualización de datos astronómicos en la Noche de las Estrellas"
  },

  {
    "href": "lcne.html",
    "imgSrc": "./img/lcne-r.jpg",
    "imgAlt": "iclc2017",
    "title": "Live CodeNet Ensamble",
    "year": "2017",
    "description": "Presentación de LCNE en la International Conference on Live Coding 2017"
  },

  {
    "href": "leviathan.html",
    "imgSrc": "./img/levAle2-r.jpg",
    "imgAlt": "leviathan2017",
    "title": "Leviathan",
    "year": "2017",
    "description": "Presentación de Leviathan en ISEA 2017, Manizales, Colombia"
  },

  {
    "href": "altamisa.html",
    "imgSrc": "./img/altamisa2-r.jpg",
    "imgAlt": "altamisa",
    "title": "Altamisa",
    "year": "2016-2018",
    "description": "Cello, electrónica e imagen"
  }

];
