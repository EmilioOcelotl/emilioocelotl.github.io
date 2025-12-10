import { projects } from '../static/data/projects.js';
import { projects_en } from '../static/data/projects-en.js';
import { bioContent } from '../static/data/bio-content.js';
import { blogPosts } from '../static/data/blog-content.js';
import { blogPosts_en } from '../static/data/blog-content-en.js';
import Plyr from 'plyr';

// Configuración de idioma
let currentLanguage = 'en'; // Default to English if no preference saved
let currentProjects = projects_en; // Default to English projects

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

// Función para cargar la página de contacto
function loadContactPage() {
    console.log('Cargando página de contacto...');
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    // Textos dinámicos según idioma
    const contactTitle = currentLanguage === 'es' ? 'Contacto' : 'Contact';
    const backButtonText = currentLanguage === 'es' ? 'VOLVER' : 'BACK';

    mainContent.innerHTML = `
      <div class="project-details"> <!-- Wrap in project-details for centering -->
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
          <div class="button-wrapper"> <!-- Wrapper for button styling -->
              <button id="backButton" class="back-button">${backButtonText}</button>
          </div>
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
      <div class="project-details"> <!-- Wrap all content for centering -->
          <section id="bio">
              <h2>${content.bioTitle}</h2>
              <section>
                  <h3></h3>
                  <div>
                      <p>${content.bioText1}</p>
                      <p>${content.bioText2}</p>
                      <p>${content.bioText3}</p>
                  </div>
              </section>

              <section>
                  <h3>${content.awards}</h3>
                  <div class="container2">
                      <ul>${content.awardsList.map(item => `<li>${item}</li>`).join('')}</ul>
                  </div>
              </section>
              
              <section>
                  <h3>${content.works}</h3>
                  <div class="container2">
                      <ul>${content.worksList.map(item => `<li>${item}</li>`).join('')}</ul>
                  </div>
              </section>
              
              <section>
                  <h3>${content.teaching}</h3>
                  <div class="container2">
                      <ul>${content.teachingList.map(item => `<li>${item}</li>`).join('')}</ul>
                  </div>
              </section>
              
              <section>
                  <h3>${content.collaboration}</h3>
                  <div class="container2">
                      <ul>${content.collaborationList.map(item => `<li>${item}</li>`).join('')}</ul>
                  </div>
              </section>
              
              <section>
                  <h3>${content.publications}</h3>
                  <div class="container2">
                      <ul>${content.publicationsList.map(item => `<li>${item}</li>`).join('')}</ul>
                  </div>
              </section>
          </section>
          <div class="button-wrapper">
              <button id="backButton" class="back-button">${content.backButton}</button>
          </div>
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

// NUEVO: Función para cargar la página BLOG (ES)
function loadBlogPage() {
    console.log('Cargando página BLOG (ES)...');
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const backButtonText = currentLanguage === 'es' ? 'VOLVER' : 'BACK';
    const sortedBlogPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    mainContent.innerHTML = `
      <div class="project-details"> <!-- Wrap in project-details for centering -->
          <section id="blog-content">
              <h2>Blog</h2>
           </section>
          <section id="blog-content">

              ${sortedBlogPosts.map(post => `
                  <article class="blog-post">
                      <h2>${post.title}</h2>
                      <p class="blog-date">${post.date}</p>
                      <p>${post.content}</p>
                  </article>
              `).join('')}
          </section>
          <div class="button-wrapper"> <!-- Wrapper for button styling -->
              <button id="backButton" class="back-button">${backButtonText}</button>
          </div>
      </div>
  `;
    // Add event listener to the back button
    setTimeout(() => {
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', handleBackButton);
        }
    }, 0);

    // Reset scroll
    window.scrollTo(0, 0);
    updateButtonText(); // Update button text based on current language
}

// NUEVO: Función para cargar la página BLOG (EN)
function loadBlogEnPage() {
    console.log('Cargando página BLOG (EN)...');
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const backButtonText = currentLanguage === 'es' ? 'VOLVER' : 'BACK';
    const sortedBlogPosts = [...blogPosts_en].sort((a, b) => new Date(b.date) - new Date(a.date));

    mainContent.innerHTML = `
      <div class="project-details"> <!-- Wrap in project-details for centering -->
          <section id="blog-content">
              <h1>Blog</h1>
              ${sortedBlogPosts.map(post => `
                  <article class="blog-post">
                      <h2>${post.title}</h2>
                      <p class="blog-date">${post.date}</p>
                      <p>${post.content}</p>
                  </article>
              `).join('')}
          </section>
          <div class="button-wrapper"> <!-- Wrapper for button styling -->
              <button id="backButton" class="back-button">${backButtonText}</button>
          </div>
      </div>
  `;
    // Add event listener to the back button
    setTimeout(() => {
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', handleBackButton);
        }
    }, 0);

    // Reset scroll
    window.scrollTo(0, 0);
    updateButtonText(); // Update button text based on current language
}


// Función para cambiar el idioma
function toggleLanguage() {
    const currentPath = window.location.pathname.split('/').pop();
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';

    console.log(`Toggling language from ${currentLanguage} to ${newLanguage}`);

    // Update language and projects for the next render
    currentLanguage = newLanguage;
    currentProjects = currentLanguage === 'es' ? projects : projects_en;

    // Update the language toggle button text
    const toggleBtn = document.getElementById('languageToggle');
    const textSpan = toggleBtn.querySelector('.lang-text');
    if (textSpan) {
        textSpan.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    }

    updateNavigationText(); 

    // --- Remove direct URL navigation for blog pages --- 
    // The handleRoute function will now manage content based on the updated currentLanguage

    // Call handleRoute to re-render the current page with the new language
    handleRoute();

    // Save preference
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
      <div class="project-details"> <!-- Wrapper for centering -->
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
          <div class="button-wrapper"> <!-- Wrapper for button styling -->
              <button id="backButton" class="back-button">${backButtonText}</button>
          </div>
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

// Helper to update button text consistently
function updateButtonText() {
    const backButton = document.getElementById('backButton');
    const backButtonText = currentLanguage === 'es' ? 'VOLVER' : 'BACK';
    if (backButton) {
        backButton.textContent = backButtonText;
    }
}

// Manejar el enrutamiento
function handleRoute() {
    const path = window.location.pathname.split('/').pop();
    console.log('Manejando ruta:', path);

    // Resetear scroll en cada cambio de ruta
    window.scrollTo(0, 0);

    if (path === '' || path === 'index.html' || path === '/') {
        loadHomePage();
    } else if (path === 'bio.html') {
        loadBioPage();
    } else if (path === 'contacto.html') {
        loadContactPage();
    } else if (path === 'blog.html') { // Added for Spanish blog
        loadBlogPage();
    } else if (path === 'blog-en.html') { // Added for English blog
        loadBlogEnPage();
    } else { // Fallback for projects or unknown paths
        const projectId = path.replace('.html', '');
        // Ensure currentProjects is loaded based on currentLanguage before searching
        const projectsToSearch = currentLanguage === 'es' ? projects : projects_en;
        const project = projectsToSearch.find(p => p.href.includes(projectId));
        if (project) {
            loadProjectDetails(project);
        } else {
            // If it's not a known page or project, redirect to home
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
    } else {
        // Default language based on index.html lang attribute if available, otherwise default to Spanish.
        // Assuming index.html has lang="es", we default to Spanish.
        currentLanguage = 'es';
    }
    currentProjects = currentLanguage === 'es' ? projects : projects_en;

    // Configurar el botón de idioma
    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleLanguage);

        // Set initial state of the button (language to switch TO)
        const textSpan = toggleBtn.querySelector('.lang-text');
        if (textSpan) {
            textSpan.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
        }
    }

    // Actualizar textos de navegación al inicializar
    updateNavigationText();

    handleRoute(); // Initial route handling

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

    if (bioLink && contactLink) {
        if (currentLanguage === 'es') {
            bioLink.textContent = 'BIO'; // Keeping BIO consistent across languages
            contactLink.textContent = 'CONTACTO';
        } else {
            bioLink.textContent = 'BIO'; // Keeping BIO consistent
            contactLink.textContent = 'CONTACT';
        }
    }

    // Update the language toggle button text to reflect the language you can switch TO
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        const textSpan = languageToggle.querySelector('.lang-text');
        if (textSpan) {
            // If the current language is Spanish, show "EN" (to change to English).
            // If the current language is English, show "ES" (to change to Spanish).
            textSpan.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
        }
    }
}