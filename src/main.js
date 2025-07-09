import { projects } from '../static/data/projects.js';
import Plyr from 'plyr';

// Expose player so it can be used from the console
const player = new Plyr('#player', {
  controls: [
    'play-large', // The large play button in the center
    'play', // Play/pause playback
    'progress', // The progress bar and scrubber for playback and buffering
    'current-time', // The current time of playback
    'mute', // Toggle mute
    'volume', // Volume control
    'pip', // Picture-in-picture (currently Safari only)
    'airplay', // Airplay (currently Safari only)
  ]
});
window.player = player;

// Función para cargar la página principal
function loadHomePage() {
  const projectsContainer = document.querySelector('.projects');
  projectsContainer.innerHTML = ''; // Limpiar contenedor

  projects.forEach(project => {
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
      const project = projects.find(p => p.href === projectHref);
      if (project) {
        loadProjectDetails(project);
        // Actualizar la URL sin recargar la página
        window.history.pushState({ project: project.id }, '', project.href);
      }
    });
  });
}

function loadProjectDetails(project) {
  const mainContent = document.querySelector('main');
  mainContent.innerHTML = `
    <div class="project-details">
      <h3>${project.title}</h3>
      <p>${project.details.fullDescription}</p>
      <div class="carousel">
        ${project.details.images.map(img => `<img src="${img}" loading="lazy" alt="${project.title}">`).join('')}
      </div>
      ${project.details.videoEmbed ? `<div class="video-container">${project.details.videoEmbed}</div>` : ''}
      ${project.details.audioSrc ? `<div class="audio-container">${project.details.audioSrc.map(audio => `<audio controls><source src="${audio}" type="audio/mpeg">Your browser does not support the audio element.</audio>`).join('')}</div>` : ''}
     <button id="backButton" onclick="window.location.href = 'index.html'">VOLVER</button>
    </div>
  `;

  document.querySelector('#backButton').addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    loadHomePage();
  });

  initializeCarousel();
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

  // Limpiar intervalo al salir de la página
  return () => clearInterval(interval);
}

// Manejo del enrutamiento
function handleRoute() {
  const path = window.location.pathname.split('/').pop();
  
  // Si es la raíz o index.html, cargar la página principal
  if (path === '' || path === 'index.html') {
    loadHomePage();
  } 
  // Si es una página de proyecto, cargarla directamente
  else {
    const projectId = path.replace('.html', '');
    const project = projects.find(p => p.href.includes(projectId));
    if (project) {
      loadProjectDetails(project);
    } else {
      // Redirigir a la página principal si el proyecto no existe
      window.location.href = '/';
    }
  }
}

// Manejar el evento popstate (navegación con botones adelante/atrás)
window.addEventListener('popstate', handleRoute);

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
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

