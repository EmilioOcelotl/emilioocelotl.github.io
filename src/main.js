import { projects } from '../static/data/projects.js';

document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.querySelector('.projects');

  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    projectElement.innerHTML = `
      <a href="#" data-href="${project.href}" class="project-link">
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
      loadProjectDetails(project);
    });
  });
});

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
      <button id="backButton">VOLVER</button>
    </div>
  `;

  document.querySelector('#backButton').addEventListener('click', () => {
    location.reload();
  });

  initializeCarousel();
}

function initializeCarousel() {
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('img');
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  showImage(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 3000); 
}
