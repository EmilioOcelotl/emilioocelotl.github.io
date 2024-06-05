import { pprojects } from '../static/data/projects.js';
//<a href="./projects/${project.href}"> esto iba dentro de la iteración

document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.querySelector('.projects');

  pprojects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    console.log(`${project.href}`)
    projectElement.innerHTML = `
    <img src="${project.imgSrc}" alt="${project.imgAlt}">
        <h3>${project.title}<br>${project.year}</h3>
        <p>${project.description}</p>
      </a>
    `;
    
    projectsContainer.appendChild(projectElement);
  });
});


