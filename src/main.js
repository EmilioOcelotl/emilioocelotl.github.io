import {projects} from '../static/data/projects.js'; 

function redirectToProject(projectUrl) {
    window.location.href = projectUrl;
  }
  
  function redirectToPublication(publicationUrl) {
    window.location.href = publicationUrl;
  }  

document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.querySelector('.projects');

  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    
    projectElement.innerHTML = `
      <a href="${project.href}">
        <img src="${project.imgSrc}" alt="${project.imgAlt}">
        <h3>${project.title}<br>${project.year}</h3>
        <p>${project.description}</p>
      </a>
    `;
    
    projectsContainer.appendChild(projectElement);
  });
});

// console.log(projects)