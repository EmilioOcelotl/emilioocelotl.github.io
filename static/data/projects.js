export const projects = [

  {
    "href": "tea.html",
    "imgSrc": "./img/tres2-r.jpg",
    "imgAlt": "TRES ESTUDIOS ABIERTOS",
    "title": "Tres Estudios Abiertos",
    "year": "2026",
    "description": "Escritura de código como forma de investigación artística",
    "details": {
      "fullDescription": "<p>¿Qué aportes puede realizar la escritura de código a los nuevos modos del performance audiovisual y a la escritura de un documento reflexivo que integra sonido, gráficos y texto en el contexto de la investigación artística? Esa es la pregunta central de esta tesis, inscrita en el Programa de Maestría y Doctorado en Música de la UNAM.</p><p>Es una investigación académica y una pieza artística que corre en el navegador.</p><p>La tesis se organiza en tres partes. La Parte I es el archivo principal: la tesis académica en sentido convencional, con introducción, conceptos operativos, arquitectura del sistema, iteraciones experimentales y conclusiones. La Parte II es el archivo transversal: nodos temáticos que atraviesan la tesis por debajo de su estructura. La Parte III son los archivos comprimidos: versiones generativas de la tesis.</p><p><code>tres-app</code> es el sitio principal del proyecto. Lee la base de datos SQLite de Trilium Notes, donde se escribe la tesis, y produce un PDF (Parte I) y una visualización 3D navegable (Parte II). Corre en un servidor casero con Express, pm2 y Docker; la base se sincroniza con un script bash y cron.</p><p>La visualización 3D es un grafo force-directed construido con Three.js y d3-force-3d. Cada nota es una esfera con halo emisivo.</p><p>Los casos de estudio son también instancias de este sistema experimental: <a href='https://anti.ocelotl.cc'>anti</a> (ofuscación audiovisual, JavaScript + SuperCollider), <a href='https://github.com/EmilioOcelotl/THREE.studies-II'>THREE.studies-II</a> (sonido y gráficos en el navegador, Three.js + SuperCollider) y <a href='https://risosc.ocelotl.cc'>risosc</a> (impresiones risográficas con NFC y síntesis granular). Comparten <a href='https://github.com/EmilioOcelotl/treslib'>treslib</a>, librería escrita en paralelo a la tesis.</p><p>El proyecto puede consultarse en: <a href='https://api.ocelotl.cc'>api.ocelotl.cc</a></p><p>Repositorio de código: <a href='https://github.com/EmilioOcelotl/tres-app'>github.com/EmilioOcelotl/tres-app</a></p>",
      "images": [
        "./img/tres-r.jpg",
        "./img/tres2-r.jpg"
      ]
    }
  },

  {
    "href": "piranhalab.html",
    "imgSrc": "./img/tecnologias-cotidianas.jpeg",
    "imgAlt": "PiranhaLab",
    "title": "PiranhaLab",
    "year": "2019–2026",
    "description": "Laboratorio de arte, tecnología y cultura libre",
    "details": {
      "fullDescription": "<p>Laboratorio de experimentación entre arte, tecnología y educación, activo en Ciudad de México desde 2019. Co-fundado con Marianne Teixido; colabora actualmente también Dorian Sotomayor.</p><p>Produce infraestructura cultural experimental: instalaciones sonoras, herramientas de código abierto, talleres de soberanía tecnológica y archivo distribuido. Los talleres cubren live coding, síntesis sonora y documentación del territorio.</p><p>Proyecto beneficiario del Programa de Apoyo a la Docencia, Investigación y Difusión de las Artes.</p><p>Sitio: <a href='https://piranhalab.cc'>piranhalab.cc</a></p>",
      "images": [
        "./img/tecnologias-cotidianas.jpeg"
      ]
    }
  },

  {
    "href": "risosc.html",
    "imgSrc": "./img/risosc4.jpg",
    "imgAlt": "risosc",
    "title": "RisOSC",
    "year": "2025",
    "description": "Impresiones risográficas con identificadores NFC y esculturas 3D",
    "details": {
      "fullDescription": "<p>Escrituras sobre lo escaso multiplicado y lo efímero único.</p><p>Cuando un visitante acerca una impresión risográfica a un lector NFC, se genera una visualización única con Three.js e Hydra y se captura un snapshot comprimido en base de datos. La instalación tiene seis partes: las visualizaciones web, un servidor con WebSockets, el firmware ESP32 que maneja el lector, un exportador de mallas 3D, los scripts que dejan corriendo la proyección en sala y un dashboard para revisar lo que pasó durante la muestra.</p><p>Presentada en <em>Algorítmica Íntima</em>, Centro de Cultura Digital, Ciudad de México, 2025.</p><p>Después de la exhibición, el material capturado se volvió su propio objeto: <a href='https://risosc.ocelotl.cc'>risosc.ocelotl.cc</a> organiza los snapshots en un mosaico denso donde cada celda controla un motor de síntesis granular en tiempo real. Brillo, contraste y complejidad del snapshot modulan los parámetros del granulador.</p><p>Código: <a href='https://github.com/EmilioOcelotl/risosc'>github.com/EmilioOcelotl/risosc</a></p>",
      "images": [
        "./img/risosc16nov.jpg",
        "./img/risoscccd.jpeg",
        "./img/risosc4.jpg",
        "./img/risosc2.jpeg",
        "./img/risosc3.jpeg",
        "./img/risosc5.jpeg"
      ],
      "embed3d": "<div class=\"sketchfab-embed-wrapper\"><iframe title=\"risosc-01\" frameborder=\"0\" allowfullscreen mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" allow=\"autoplay; fullscreen; xr-spatial-tracking\" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src=\"https://sketchfab.com/models/9d273c827c854b1485c24fa8a1543669/embed?ui_theme=dark\"></iframe><p style=\"font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A44;\"><a href=\"https://sketchfab.com/3d-models/risosc-01-9d273c827c854b1485c24fa8a1543669?utm_medium=embed&utm_campaign=share-popup&utm_content=9d273c827c854b1485c24fa8a1543669\" target=\"_blank\" rel=\"nofollow\" style=\"font-weight: bold; color: #1CAAD9;\">risosc-01</a> by <a href=\"https://sketchfab.com/emilioocelotl?utm_medium=embed&utm_campaign=share-popup&utm_content=9d273c827c854b1485c24fa8a1543669\" target=\"_blank\" rel=\"nofollow\" style=\"font-weight: bold; color: #1CAAD9;\">emilioocelotl</a> on <a href=\"https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=9d273c827c854b1485c24fa8a1543669\" target=\"_blank\" rel=\"nofollow\" style=\"font-weight: bold; color: #1CAAD9;\">Sketchfab</a></p></div>"
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
    "href": "threeStudies.html",
    "imgSrc": "./img/three2024-2.jpg",
    "imgAlt": "three2022",
    "title": "THREE.studies",
    "year": "2022-2024",
    "description": "Estudios A/V para el navegador",
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
    "description": "Presentación A/V en NIME junto con Marianne Teixido",
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
    "href": "presentaciones.html",
    "imgSrc": "./img/valle01-r.jpg",
    "imgAlt": "valle",
    "title": "Presentaciones Audiovisuales",
    "year": "2011-2024",
    "description": "Audio e imagen en vivo",
    "details": {
      "fullDescription": "<li>Emilio Ocelotl, Aaron Escobar y Dorian Sotomayor @ Concierto Post Transferencias Aurales, Ciudad de México, 2024</li><li>Emilio Ocelotl @ Valle de Bravo, 2019</li><li>RGGTRN @ ICLC. Nave de Terneras. Madrid, España. 2019</li><li>RGGTRN @ Algorave-Algorumba. Casa Rodante. Manizales, Colombia. 2017</li><li>Emilio Ocelotl y Luis Navarro @ Festival /*vivo*/ Auditorio del MUAC, UNAM. Ciudad de México 2012</li>",
      "images": [
        "./img/valle2.jpeg",
        "./img/valle01-r.jpg",
        "./img/algoraveccd.jpg",
        "./img/algoraveccd2-r.jpg",
        "./img/algoraveMadrid2019.jpeg",
        "./img/algoraveMadrid2019-2.jpeg",
        "./img/postrans.jpg"
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
    "href": "xicalcoMusica.html",
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
    "href": "cusco.html",
    "imgSrc": "./img/cusco-r.jpg",
    "imgAlt": "cusco2022",
    "title": "Concierto A/V",
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
    "href": "linux.html",
    "imgSrc": "./img/lac-r.jpg",
    "imgAlt": "lac",
    "title": "Linux Audio Conference",
    "year": "2019",
    "description": "Presentación de RGGTRN en la Linux Audio Conference"
  },
  {
    "href": "algoraveccd.html",
    "imgSrc": "./img/algoraveccd2-r.jpg",
    "imgAlt": "ccdAlgorave",
    "title": "Centro de Cultura Digital",
    "year": "2018",
    "description": "RGGTRN (M. Teixido + E. Ocelotl) en Algorave CCD"
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
  },
  {
    "href": "rggtrn-bellacode.html",
    "imgSrc": "./img/peru-r.jpg",
    "imgAlt": "rggtrn-bellacode",
    "title": "RGGTRN-Bellacode Tour",
    "year": "2017",
    "description": "Gira de RGGTRN en colaboración con Bellacode"
  }
  
];
