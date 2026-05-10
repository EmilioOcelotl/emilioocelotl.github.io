export const projects_en = [

    {
        "href": "tea.html",
        "imgSrc": "./img/tres2-r.jpg",
        "imgAlt": "TRES ESTUDIOS ABIERTOS",
        "title": "Tres Estudios Abiertos",
        "year": "2026",
        "description": "Code writing as a form of artistic research",
        "details": {
          "fullDescription": "<p>What can code writing contribute to new modes of audiovisual performance and to the writing of a reflective document that integrates sound, graphics, and text within the context of artistic research? That is the central question of this thesis, part of the Graduate Program in Music at UNAM.</p><p>It is an academic investigation and an artistic piece that runs in the browser.</p><p>The thesis is organized in three parts. Part I is the main archive: the academic thesis in the conventional sense, with introduction, operative concepts, system architecture, experimental iterations, and conclusions. Part II is the transversal archive: thematic nodes that cut across the thesis underneath its structure. Part III is the compressed archives: generative versions of the thesis.</p><p><code>tres-app</code> is the main site of the project. It reads the SQLite database from Trilium Notes, where the thesis is written, and produces a PDF (Part I) and a navigable 3D visualization (Part II). It runs on a home server with Express, pm2, and Docker; the database is synced with a bash script and cron.</p><p>The 3D visualization is a force-directed graph built with Three.js and d3-force-3d. Each note is a sphere with an emissive halo.</p><p>The case studies are also instances of this experimental system: <a href='https://anti.ocelotl.cc'>anti</a> (audiovisual obfuscation, JavaScript + SuperCollider), <a href='https://github.com/EmilioOcelotl/THREE.studies-II'>THREE.studies-II</a> (sound and graphics in the browser, Three.js + SuperCollider), and <a href='https://risosc.ocelotl.cc'>risosc</a> (risograph prints with NFC and granular synthesis). They share <a href='https://github.com/EmilioOcelotl/treslib'>treslib</a>, a library written in parallel with the thesis.</p><p>The project can be consulted at: <a href='https://api.ocelotl.cc'>api.ocelotl.cc</a></p><p>Code repository: <a href='https://github.com/EmilioOcelotl/tres-app'>github.com/EmilioOcelotl/tres-app</a></p>",
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
        "description": "Art, technology and free culture lab",
        "details": {
          "fullDescription": "<p>Experimental laboratory at the intersection of art, technology, and education, active in Mexico City since 2019. Co-founded with Marianne Teixido; Dorian Sotomayor is currently a collaborator as well.</p><p>Produces experimental cultural infrastructure: sound installations, open-source tools, technological sovereignty workshops, and distributed archives. Workshops cover live coding, sound synthesis, and territory documentation.</p><p>Beneficiary of the Program for Support of Teaching, Research and Dissemination of the Arts.</p><p>Site: <a href='https://piranhalab.cc'>piranhalab.cc</a></p>",
          "images": [
            "./img/tecnologias-cotidianas.jpeg"
          ]
        }
      },

      {
        "href": "ciudad-monstruo.html",
        "imgSrc": "./img/ciudad-monstruo-r.jpg",
        "imgAlt": "Ciudad Monstruo",
        "title": "Ciudad Monstruo",
        "year": "2026",
        "description": "Interactive graphic score and multicanal audio render engine",
        "details": {
          "fullDescription": "<p>Ciudad Monstruo is a spatial sound composition tool. Strokes drawn over a circular field are playback instructions; they define when, where, and with what sample something sounds in space.</p><p>The stroke records the intention of the body that makes it. A slow gesture produces a wide stroke; a fast one, a thin line. Width is not decorative. It increases the source's gain and spreads its position across the loudspeakers; a thin stroke concentrates the sound at a precise point in the field.</p><p>Mexico City appears in the field as a spectral presence. Roads, boroughs, interior perimeters filtered through procedural variation. Each time the system loads it generates a slightly different variant. The city mutates.</p><p>Repository: <a href='https://0xacab.org/ocelotl/ciudad-monstruo'>0xacab.org/ocelotl/ciudad-monstruo</a></p>",
          "images": [
            "./img/ciudad-monstruo-r.jpg"
          ]
        }
      },

    {
        "href": "risosc.html",
        "imgSrc": "./img/risosc4.jpg",
        "imgAlt": "risosc",
        "title": "RisOSC",
        "year": "2025",
        "description": "Risograph prints with NFC tags and 3D sculptures",
        "details": {
          "fullDescription": "<p>Writings on the multiplied scarce and the uniquely ephemeral.</p><p>When a visitor brings a risograph print close to an NFC reader, a unique visualization is generated with Three.js and Hydra, and a compressed snapshot is written to a database. The installation has six parts: the web visualizations, a WebSocket server, the ESP32 firmware handling the reader, a 3D mesh exporter, the scripts that keep the projection running on site, and a dashboard for reviewing what happened during the show.</p><p>Presented at <em>Algorítmica Íntima</em>, Centro de Cultura Digital, Mexico City, 2025.</p><p>After the exhibition, the material captured during the show became its own object: <a href='https://risosc.ocelotl.cc'>risosc.ocelotl.cc</a> lays out the snapshots in a dense mosaic where each cell drives a granular synthesis engine in real time. Brightness, contrast, and complexity of the snapshot modulate the granular parameters.</p><p>Code: <a href='https://github.com/EmilioOcelotl/risosc'>github.com/EmilioOcelotl/risosc</a></p>",
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
        "href": "av-ccrma.html",
        "imgSrc": "./img/residencia-r.jpg",
        "imgAlt": "stanford2024",
        "title": "Audio-Visual Sessions",
        "year": "2024",
        "description": "Stanford Graduate Composers with M. Teixido and E. Ocelotl",
        "details": {
          "fullDescription": "<p>Artistic residency at the Center for Computer Research in Music and Acoustics (CCRMA), Stanford, together with Marianne Teixido, from January 8 to 17, 2024.</p><p>During our stay, we worked with six composition students and presented two concerts: one at the CCRMA Stage and another at the Elliott Program Center.</p><p>The students we collaborated with were: Celeste Betancur, Brian Brown, Tatiana Catanzaro, Anna Golubkova, Lemon Guo, and Nick Shaheed.</p>",
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
        "description": "Real-time generative videomapping with Hydra and p5.js",
        "details": {
          "fullDescription": "<p>MiniMapper is a real-time generative videomapping tool. Each surface is a deformable Bezier patch that takes as texture the output of Hydra, a video, an image, or the camera. Moving the control points slowly curves the edges; corner vertices anchor the surface in space.</p><p>Repository: <a href='https://github.com/EmilioOcelotl/minimapper'>github.com/EmilioOcelotl/minimapper</a></p>",
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
        "description": "Sound explorations and synthetic voices",
        "details": {
          "fullDescription": "<p>Sound explorations and synthetic voices. Presented together with Marianne Teixido as part of the 20th anniversary celebration of the Insonora festival in Madrid, Spain, 2025.</p>",
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
        "description": "A/V studies for the browser",
        "details": {
          "fullDescription": "<p>Audiovisual studies for the browser. This project was developed in collaboration with Iracema de Andrade.</p><p>The repository with the initial versions is available at: <a href='https://github.com/EmilioOcelotl/THREE.studies'>THREE.studies</a>.</p><p>The latest version is archived at: <a href='https://github.com/EmilioOcelotl/THREE.studies-II'>THREE.studies-II</a>. For this version, I deployed a <a href='https://github.com/EmilioOcelotl/osc-web-server'>custom web OSC server</a> and the <a href='https://github.com/EmilioOcelotl/treslib'>treslib</a> library, both developed by me. It also includes a <a href='https://github.com/EmilioOcelotl/MMLL'>variation</a> of the MMLL.js library, created in collaboration with Marianne Teixido, based on the <a href='https://github.com/sicklincoln/MMLL'>original project</a> by Nick Collins.</p>",
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
        "description": "Audiovisual obfuscation in the browser",
        "details": {
          "fullDescription": "<p>Obfuscation as a motif, writing as a detour.</p><p>Anti is a call for responsibility over data, commitment, and care, and for the participation of users who blur the boundaries of political and economic passivity, centering on the sensitive.</p><p>Online project: <a href='https://anti.ocelotl.cc'>anti.ocelotl.cc</a></p><p>Code: <a href='https://github.com/EmilioOcelotl/anti'>github.com/EmilioOcelotl/anti</a></p><p>Supported by the National Fund for Culture and the Arts (FONCA).</p>",
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
        "description": "A/V presentation at NIME with Marianne Teixido",
        "details": {
          "fullDescription": "<p>Audiovisual presentation at New Interfaces for Musical Expression 2023.</p><p>The session took place at the Centro de Cultura Digital esplanade and was part of a program featuring multiple musical and audiovisual proposals.</p><p>The NIME organizers awarded us the prize for Best Music. The decision can be found at: <a href='https://www.nime2023.org/awards-photos'>https://www.nime2023.org/awards-photos</a>.</p>",
          "images": [
            "./img/nime1-r.jpg",
            "./img/nime3-r.jpg",
            "./img/nime-r.jpg"
          ]
        }
      },
      {
        "href": "presentaciones.html",
        "imgSrc": "./img/valle01.jpg",
        "imgAlt": "valle",
        "title": "A/V Presentations",
        "year": "2011-2024",
        "description": "Live audio and visuals",
        "details": {
          "fullDescription": "<ul><li>Emilio Ocelotl, Aaron Escobar, and Dorian Sotomayor @ Concierto Post Transferencias Aurales, Mexico City, 2024</li><li>Emilio Ocelotl @ Valle de Bravo, 2019</li><li>RGGTRN @ ICLC. Nave de Terneras, Madrid, Spain, 2019</li><li>RGGTRN @ Algorave-Algorumba. Casa Rodante, Manizales, Colombia, 2017</li><li>Emilio Ocelotl and Luis Navarro @ Festival /*vivo*/ Auditorio del MUAC, UNAM, Mexico City, 2012</li></ul>",
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
        "description": "Collaboration with Dorian Sotomayor",
        "details": {
          "fullDescription": "<p>Audio-visual performance with Dorian Sotomayor at Algorave CDMX 2023.</p>",
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
          "fullDescription": "<p>Full-band RGGTRN in collaboration with Gabriel de Dios 'El Hijo de Tere' at Centro Cultural España de México (CDMX).</p>",
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
          "fullDescription": "<p>Audiovisual performance in Cusco, Peru, as part of the PUMPUMYACHKAN Festival Asimtria.</p><p><a href='https://ia904501.us.archive.org/25/items/memoria_pumpum16_cusco/memoria_virtual.pdf'>Pumpum 16 Archive</a></p>",
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
        "description": "Exploration of shared virtual spaces"
      },
      {
        "href": "feedback.html",
        "imgSrc": "./img/of13-r.jpg",
        "imgAlt": "feedback",
        "title": "Feedback",
        "year": "2020",
        "description": "Explorations between code, sound, and image"
      },
      {
        "href": "noche2.html",
        "imgSrc": "./img/disco3-r.jpg",
        "imgAlt": "nocheDeLasEstrellas II",
        "title": "Noche de las Estrellas II",
        "year": "2019",
        "description": "Audio-visual intervention based on astronomical data",
        "details": {
          "fullDescription": "<p>Audio-visual intervention based on astronomical data. This project was carried out in collaboration with ACT UNAM and the Instituto de Astronomía. In this instance, we sonified and visualized data from astronomical jets.</p><p>Repository: <a href='https://github.com/EmilioOcelotl/nocheDeLasEstrellas2019'>nocheDeLasEstrellas2019</a></p>",
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
        "description": "RGGTRN performance at the Linux Audio Conference"
      },
      {
        "href": "algoraveccd.html",
        "imgSrc": "./img/algoraveccd2-r.jpg",
        "imgAlt": "ccdAlgorave",
        "title": "Centro de Cultura Digital",
        "year": "2018",
        "description": "RGGTRN (M. Teixido + E. Ocelotl) at Algorave CCD"
      },
      {
        "href": "ofhawc.html",
        "imgSrc": "./img/ofhawc-r.jpg",
        "imgAlt": "ofhawc",
        "title": "Noche de las Estrellas I - ofHAWC",
        "year": "2018",
        "description": "Astronomical data visualization at Noche de las Estrellas"
      },
      {
        "href": "lcne.html",
        "imgSrc": "./img/lcne-r.jpg",
        "imgAlt": "iclc2017",
        "title": "Live CodeNet Ensamble",
        "year": "2017",
        "description": "LCNE performance at the International Conference on Live Coding 2017"
      },
      {
        "href": "leviathan.html",
        "imgSrc": "./img/levAle2-r.jpg",
        "imgAlt": "leviathan2017",
        "title": "Leviathan",
        "year": "2017",
        "description": "Leviathan performance at ISEA 2017, Manizales, Colombia"
      },
      {
        "href": "altamisa.html",
        "imgSrc": "./img/altamisa2-r.jpg",
        "imgAlt": "altamisa",
        "title": "Altamisa",
        "year": "2016-2018",
        "description": "Cello, electronics, and visuals"
      },
      {
        "href": "rggtrn-bellacode.html",
        "imgSrc": "./img/peru-r.jpg",
        "imgAlt": "rggtrn-bellacode",
        "title": "RGGTRN-Bellacode Tour",
        "year": "2017",
        "description": "RGGTRN tour in collaboration with Bellacode"
      }                  
                                   
                  
];
