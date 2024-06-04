var e={};e={projects:[{href:"projects/tres.html",imgSrc:"./img/tres.png",imgAlt:"TRES ESTUDIOS ABIERTOS",title:"Tres Estudios Abiertos",year:"2024",description:"Escritura, JavaScript e investigación artística (en curso)."},{href:"projects/nr2024.html",imgSrc:"./img/nucleoroto.jpg",imgAlt:"nr2024",title:"Future Sound of Nucleoroto Sesión 1",year:"2024",description:"Experiencia audiovisual electrónica experimental."},{href:"projects/codepunk.html",imgSrc:"./img/2.png",imgAlt:"codepunk",title:"code punk alchemy",year:"2024",description:"live coding visuals, music"},{href:"projects/stanford2024.html",imgSrc:"./img/1.jpeg",imgAlt:"stanford2024",title:"Audio-Visual Sessions",year:"2024",description:"Stanford Graduate Composers with M. Teixido and E. Ocelotl"}]},document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector(".projects");(0,e.projects).forEach(e=>{let i=document.createElement("div");i.classList.add("project"),i.innerHTML=`
      <a href="${e.href}">
        <img src="${e.imgSrc}" alt="${e.imgAlt}">
        <h3>${e.title}<br>${e.year}</h3>
        <p>${e.description}</p>
      </a>
    `,t.appendChild(i)})});
//# sourceMappingURL=index.c6ffdeb1.js.map
