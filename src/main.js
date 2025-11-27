import { projects } from '../static/data/projects.js';
import { projects_en } from '../static/data/projects-en.js';
import { bioContent } from '../static/data/bio-content.js';
import Plyr from 'plyr';

// Configuración de idioma
let currentLanguage = 'en';
let currentProjects = projects;

// Expose player so it can be used from the console
const player = new Plyr('#player', {
    controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'pip',
        'airplay',
    ]
});
window.player = player;

// Función para actualizar textos de navegación
// Función para cargar la página de contacto
function loadContactPage() {
  console.log('Cargando página de contacto...');
  const mainContent = document.querySelector('main');
  if (!mainContent) return;
  
  // Textos dinámicos según idioma
  const contactTitle = currentLanguage === 'es' ? 'Contacto' : 'Contact';
  const backButtonText = currentLanguage === 'es' ? 'VOLVER' : 'BACK';
  
  mainContent.innerHTML = `
      <div class="project-details">
          <section id="contact">
              <h2>${contactTitle}</h2>
              <div>
                  <i class="contact-icon fas fa-envelope"></i>
                  <a href="mailto:emilio.ocelotl@gmail.com">emilio.ocelotl@gmail.com</a>
              </div>
              <div>
                  <i class="contact-icon fab fa-github"></i>
                  <a href="https://github.com/EmilioOcelotl">EmilioOcelotl</a>
              </div>
              <div>
                  <i class="contact-icon fab fa-instagram"></i>
                  <a href="https://www.instagram.com/emilio.ocelotl/">EmilioOcelotl</a>
              </div> 
              <div>
                  <i class="contact-icon fab fa-linkedin"></i>
                  <a href="https://www.linkedin.com/in/emilio-ocelotl-reyes-777061ab">EmilioOcelotl</a>
              </div> 
          </section>
      </div>
      <div class="project-details">
          <button id="backButton" class="back-button">${backButtonText}</button>
      </div>
  `;

  // Agregar event listener al botón volver
  setTimeout(() => {
      const backButton = document.getElementById('backButton');
      if (backButton) {
          backButton.addEventListener('click', handleBackButton);
      }
  }, 0);
  
  // Resetear scroll
  window.scrollTo(0, 0);
}

// Función para cargar la página BIO
function loadBioPage() {
  console.log('Cargando página BIO...');
  const mainContent = document.querySelector('main');
  if (!mainContent) return;
  
  const content = bioContent[currentLanguage];
  
  mainContent.innerHTML = `
      <section id="bio">
          <h2>${content.bioTitle}</h2>
          <section>
              <h3></h3>
              <div class="container2">
                  <p>${content.bioText1}</p>
                  <p>${content.bioText2}</p>
                  <p>${content.bioText3}</p>
              </div>
          </section>

          <h2>${content.trajectory}</h2> 
          <section>
              <h3>${content.awards}</h3>
              <div class="container2">
                  ${content.awardsList.map(item => `<li>${item}</li>`).join('')}
              </div>
          </section>
          
          <section>
              <h3>${content.works}</h3>
              <div class="container2">
                  ${content.worksList.map(item => `<li>${item}</li>`).join('')}
              </div>
          </section>
          
          <section>
              <h3>${content.teaching}</h3>
              <div class="container2">
                  ${content.teachingList.map(item => `<li>${item}</li>`).join('')}
              </div>
          </section>
          
          <section>
              <h3>${content.collaboration}</h3>
              <div class="container2">
                  ${content.collaborationList.map(item => `<li>${item}</li>`).join('')}
              </div>
          </section>
          
          <section>
              <h3>${content.publications}</h3>
              <div class="container2">
                  ${content.publicationsList.map(item => `<li>${item}</li>`).join('')}
              </div>
          </section>
          
          <div class="project-details">
              <button id="backButton" class="back-button">${content.backButton}</button>
          </div>
      </section>
  `;

  // Agregar event listener al botón volver
  setTimeout(() => {
      const backButton = document.getElementById('backButton');
      if (backButton) {
          backButton.addEventListener('click', handleBackButton);
      }
  }, 0);
  
  // Resetear scroll
  window.scrollTo(0, 0);
}

// Función para cambiar el idioma
function toggleLanguage() {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  currentProjects = currentLanguage === 'es' ? projects : projects_en;
  
  // Actualizar el botón de idioma
  const toggleBtn = document.getElementById('languageToggle');
  const textSpan = toggleBtn.querySelector('.lang-text');
  
  if (currentLanguage === 'es') {
      textSpan.textContent = 'ES';
  } else {
      textSpan.textContent = 'EN';
  }
  
  // Actualizar textos de navegación
  updateNavigationText();
  
  // Recargar el contenido según la página actual
  const path = window.location.pathname.split('/').pop();
  if (path === '' || path === 'index.html' || path === '/') {
      loadHomePage();
  } else if (path === 'bio.html') {
      loadBioPage(); // NUEVO: Recargar BIO en el idioma correcto
  } else if (path === 'contacto.html') {
      loadContactPage();
  } else {
      const projectId = path.replace('.html', '');
      const project = currentProjects.find(p => p.href.includes(projectId));
      if (project) {
          loadProjectDetails(project);
      } else {
          loadHomePage();
      }
  }
  
  // Guardar preferencia de idioma
  localStorage.setItem('preferredLanguage', currentLanguage);
}

// Función para cargar la página principal
function loadHomePage() {
    console.log('Cargando página principal...');
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <section id="proyectos">
            <div class="projects"></div>
        </section>
    `;
    
    const projectsContainer = document.querySelector('.projects');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';

    currentProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <a href="${project.href}" data-href="${project.href}" class="project-link">
                <img src="${project.imgSrc}" alt="${project.imgAlt}">
                <h3>${project.title}<br>${project.year}</h3>
                <p>${project.description}</p>
            </a>
        `;
        projectsContainer.appendChild(projectElement);
    });

    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectHref = e.currentTarget.getAttribute('data-href');
            const project = currentProjects.find(p => p.href === projectHref);
            if (project) {
                console.log('Cargando detalles del proyecto:', project.title);
                loadProjectDetails(project);
                window.history.pushState({ project: project.id }, '', project.href);
            }
        });
    });
    window.scrollTo(0, 0);
}

function loadProjectDetails(project) {
  console.log('Cargando detalles para:', project.title);
  const mainContent = document.querySelector('main');
  if (!mainContent) {
      console.error('No se encontró el elemento main');
      return;
  }
  
  // Textos dinámicos según idioma
  const backButtonText = currentLanguage === 'es' ? 'VOLVER' : 'BACK';
  
  mainContent.innerHTML = `
      <div class="project-details">
          <h3>${project.title}</h3>
          <p>${project.details.fullDescription}</p>
          ${project.details.localVideo ? `
              <div class="local-video-container">
                  <video controls poster="${project.details.videoPoster || ''}">
                      <source src="${project.details.localVideo}" type="video/mp4">
                      ${currentLanguage === 'es' ? 'Tu navegador no soporta videos HTML5.' : 'Your browser does not support HTML5 video.'}
                  </video>
              </div>
          ` : ''}
          ${project.details.videoEmbed ? `
              <div class="video-container">${project.details.videoEmbed}</div>
          ` : ''}
          ${project.details.audioSrc ? `
              <div class="audio-container">
                  ${project.details.audioSrc.map(audio => `
                      <audio controls>
                          <source src="${audio}" type="audio/mpeg">
                          ${currentLanguage === 'es' ? 'Tu navegador no soporta el elemento de audio.' : 'Your browser does not support the audio element.'}
                      </audio>
                  `).join('')}
              </div>
          ` : ''}
          <div class="carousel">
              ${project.details.images.map(img => `
                  <img src="${img}" loading="lazy" alt="${project.title}">
              `).join('')}
          </div>
          ${project.details.embed3d ? `
              <div class="embed-3d-container">${project.details.embed3d}</div>
          ` : ''}
          <button id="backButton" class="back-button">${backButtonText}</button>
      </div>
  `;

  // CORRECCIÓN: Usar setTimeout para asegurar que el DOM esté actualizado
  setTimeout(() => {
      const backButton = document.getElementById('backButton');
      console.log('Buscando botón volver...', backButton);
      if (backButton) {
          console.log('Agregando event listener al botón volver');
          backButton.addEventListener('click', handleBackButton);
      } else {
          console.error('No se encontró el botón volver');
      }
      
      // RESETEO DEL SCROLL: Desplazar al inicio cuando se cargan los detalles
      window.scrollTo(0, 0);
  }, 0);

  initializeCarousel();
}

// Función separada para manejar el botón volver
function handleBackButton() {
    console.log('Botón volver clickeado');
    window.history.pushState({}, '', '/');
    loadHomePage();
}

function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    showImage(currentIndex);

    const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 3000);

    return () => clearInterval(interval);
}

// Manejo del enrutamiento
function handleRoute() {
  const path = window.location.pathname.split('/').pop();
  console.log('Manejando ruta:', path);
  
  // Resetear scroll en cada cambio de ruta
  window.scrollTo(0, 0);
  
  if (path === '' || path === 'index.html' || path === '/') {
      loadHomePage();
  } else if (path === 'bio.html') {
      loadBioPage(); // NUEVO: Manejar página BIO
  } else if (path === 'contacto.html') {
      loadContactPage();
  } else {
      const projectId = path.replace('.html', '');
      const project = currentProjects.find(p => p.href.includes(projectId));
      if (project) {
          loadProjectDetails(project);
      } else {
          window.location.href = '/';
      }
  }
}

// Manejar el evento popstate (navegación con botones adelante/atrás)
window.addEventListener('popstate', handleRoute);

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado, inicializando aplicación...');
  // Cargar idioma preferido desde localStorage
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
      currentLanguage = savedLanguage;
      currentProjects = currentLanguage === 'es' ? projects : projects_en;
  }
  
  // Configurar el botón de idioma
  const toggleBtn = document.getElementById('languageToggle');
  if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleLanguage);
      
      // CORRECCIÓN: Establecer estado inicial del botón (idioma al que se puede cambiar)
      const textSpan = toggleBtn.querySelector('.lang-text');
      if (currentLanguage === 'es') {
          textSpan.textContent = 'EN'; // Si está en español, mostrar "EN" para cambiar a inglés
      } else {
          textSpan.textContent = 'ES'; // Si está en inglés, mostrar "ES" para cambiar a español
      }
  }
  
  // Actualizar textos de navegación al inicializar
  updateNavigationText();
  
  handleRoute();
  
  // Configurar el reproductor si existe en la página actual
  if (document.querySelector('#player')) {
      window.player = new Plyr('#player', {
          controls: [
              'play-large',
              'play',
              'progress',
              'current-time',
              'mute',
              'volume',
              'pip',
              'airplay'
          ]
      });
  }
});

// Función para actualizar textos de navegación
function updateNavigationText() {
  const bioLink = document.getElementById('bioLink');
  const contactLink = document.getElementById('contactLink');
  const languageToggle = document.getElementById('languageToggle');
  
  if (bioLink && contactLink) {
      if (currentLanguage === 'es') {
          bioLink.textContent = 'BIO';
          contactLink.textContent = 'CONTACTO';
      } else {
          bioLink.textContent = 'BIO';
          contactLink.textContent = 'CONTACT';
      }
  }
  
  // CORRECCIÓN: Mostrar el idioma AL QUE se puede cambiar, no el actual
  if (languageToggle) {
      const textSpan = languageToggle.querySelector('.lang-text');
      if (textSpan) {
          // Si el idioma actual es español, mostrar "EN" (para cambiar a inglés)
          // Si el idioma actual es inglés, mostrar "ES" (para cambiar a español)
          textSpan.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
      }
  }
}