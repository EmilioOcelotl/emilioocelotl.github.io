import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Configuración de estilos
const COLORS = {
  primary: '#000000',
  secondary: '#666666',
  accent: '#2a5c85',
  lightGray: '#f5f5f5',
  timeline: '#cccccc',
  link: '#2a5c85'
};

const FONTS = {
  title: 'Courier-Bold',
  body: 'Courier-Bold',
  italic: 'Courier-Bold',
  bold: 'Courier-Bold'
};

// Símbolos (vacíos según tus modificaciones)
const SYMBOLS = {
  video: '',
  audio: '',
  web: '',
  '3d': '',
  link: ''
};

// URL base para enlaces
const BASE_URL = 'https://ocelotl.cc';

// Textos traducibles
const TEXTS = {
  es: {
    portfolio: 'PORTFOLIO',
    generatedOn: 'Portafolio generado el',
    seeCompleteProject: 'Ver proyecto completo:',
    attachments: 'Archivos adjuntos:',
    continues: '(continúa)'
  },
  en: {
    portfolio: 'PORTFOLIO',
    generatedOn: 'Portfolio generated on',
    seeCompleteProject: 'See complete project:',
    attachments: 'Attached files:',
    continues: '(continues)'
  }
};

// Función para crear la portada
function createCoverPage(doc, language = 'es') {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  
  // Fondo minimalista
  doc.rect(0, 0, pageWidth, pageHeight).fill('#ffffff');
  
  // Línea de tiempo vertical sutil en la portada
  doc
    .strokeColor(COLORS.timeline)
    .lineWidth(0.5)
    .moveTo(60, 100)
    .lineTo(60, pageHeight - 100)
    .dash(3, { space: 3 })
    .stroke()
    .undash();
  
  // Nombre principal - grande y centrado
  doc
    .font(FONTS.title)
    .fontSize(36)
    .fillColor(COLORS.primary)
    .text('EMILIO OCELOTL', 80, pageHeight / 2 - 60, {
      width: pageWidth - 160,
      align: 'left'
    });
  
  // Subtítulo (traducible)
  doc
    .font(FONTS.body)
    .fontSize(14)
    .fillColor(COLORS.secondary)
    .text(TEXTS[language].portfolio, 80, pageHeight / 2 - 15, {
      width: pageWidth - 160,
      align: 'left'
    });
  
  // Línea decorativa bajo el nombre
  doc
    .strokeColor(COLORS.accent)
    .lineWidth(1)
    .moveTo(80, pageHeight / 2 + 10)
    .lineTo(300, pageHeight / 2 + 10)
    .stroke();
  
  // Año en la timeline de la portada
  doc
    .fillColor(COLORS.accent)
    .circle(60, pageHeight / 2, 6)
    .fill();
  
  doc
    .font(FONTS.body)
    .fontSize(10)
    .fillColor(COLORS.accent)
    .text('2025', 30, pageHeight / 2 - 8, {
      width: 25,
      align: 'right'
    });
}

// Función mejorada para parsear HTML y manejar enlaces
function parseSimpleHTML(text) {
  if (!text) return { text: '', links: [] };
  
  // Primero, extraer todos los enlaces para manejarlos por separado
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/g;
  const links = [];
  let match;
  let processedText = text;
  
  // Encontrar y reemplazar enlaces
  while ((match = linkRegex.exec(text)) !== null) {
    links.push({
      original: match[0],
      url: match[2],
      text: match[3]
    });
  }
  
  // Reemplazar etiquetas HTML básicas
  processedText = processedText
    .replace(/<p>/g, '\n')
    .replace(/<\/p>/g, '\n')
    .replace(/<br\/?>/g, '\n')
    .replace(/<emph>/g, '')
    .replace(/<\/emph>/g, '')
    .replace(/<h3>/g, '\n\n')
    .replace(/<\/h3>/g, '\n')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>/g, '\n')
    .trim();
  
  // Reemplazar enlaces con marcadores
  links.forEach((link, i) => {
    const marker = `[LINK${i}]`;
    processedText = processedText.replace(link.original, `${link.text} ${marker}`);
  });
  
  return {
    text: processedText,
    links: links
  };
}

// Función para obtener símbolos basados en el tipo de contenido
function getContentSymbols(project) {
  const symbols = [];
  const details = project.details || {};
  
  if (details.videoEmbed || details.localVideo) symbols.push(SYMBOLS.video);
  if (details.audioSrc && details.audioSrc.length > 0) symbols.push(SYMBOLS.audio);
  if (details.embed3d) symbols.push(SYMBOLS['3d']);
  if (project.description.toLowerCase().includes('web') || 
      project.description.toLowerCase().includes('navegador')) symbols.push(SYMBOLS.web);
  
  // Siempre agregar símbolo de enlace si tiene href
  if (project.href) symbols.push(SYMBOLS.link);
  
  return symbols.length > 0 ? ` ${symbols.join(' ')}` : '';
}

// Función para verificar si existe una imagen
function imageExists(imagePath) {
  try {
    return fs.existsSync(imagePath);
  } catch (error) {
    return false;
  }
}

// Función para verificar si un archivo existe en el servidor
function fileExistsOnServer(filePath) {
  // Lista de extensiones de archivo que queremos verificar
  const validExtensions = ['.mp3', '.wav', '.ogg', '.mp4', '.mov', '.avi', '.webm'];
  const extension = path.extname(filePath).toLowerCase();
  
  return validExtensions.includes(extension);
}

// Función para generar URL completa
function getFullUrl(relativePath) {
  if (!relativePath) return '';
  
  // Si ya es una URL completa, devolverla tal cual
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  
  // Limpiar la ruta
  const cleanPath = relativePath.replace(/^\.\//, '');
  
  // Si es un archivo de audio/video, usar la ruta directa
  if (fileExistsOnServer(cleanPath)) {
    return `${BASE_URL}/${cleanPath}`;
  }
  
  // Para HTML y otros, usar la ruta base
  return `${BASE_URL}/${cleanPath}`;
}

// Función para calcular la altura aproximada que ocupará un proyecto
function estimateProjectHeight(doc, project, contentWidth) {
  let height = 0;
  
  // Altura del título (aproximado)
  height += 25;
  
  // Altura de la descripción breve
  height += doc.heightOfString(project.description, {
    width: contentWidth,
    fontSize: 11
  }) + 20;
  
  // Altura de la descripción completa
  if (project.details && project.details.fullDescription) {
    const parsedResult = parseSimpleHTML(project.details.fullDescription);
    const textHeight = doc.heightOfString(parsedResult.text, {
      width: contentWidth,
      fontSize: 10,
      lineGap: 3
    });
    height += textHeight + 20;
  } else {
    height += 10;
  }
  
  // Altura de archivos adjuntos (audio/video)
  if (project.details && project.details.audioSrc && project.details.audioSrc.length > 0) {
    height += (project.details.audioSrc.length * 15) + 10;
  }
  
  if (project.details && project.details.localVideo) {
    height += 20;
  }
  
  // Altura de la imagen (si existe) - AUMENTADA
  if (project.imgSrc) {
    const imagePath = path.join(process.cwd(), 'static', project.imgSrc.replace('./', ''));
    if (imageExists(imagePath)) {
      height += 250 + 30;
    }
  }
  
  // Espacio para enlace al proyecto
  height += 20;
  
  // Espacio final entre proyectos
  height += 30;
  
  return height;
}

// Función para renderizar archivos adjuntos (audio/video)
function renderAttachments(doc, project, startX, startY, contentWidth, language = 'es') {
  let currentY = startY;
  const attachments = [];
  
  if (project.details) {
    // Archivos de audio
    if (project.details.audioSrc && project.details.audioSrc.length > 0) {
      project.details.audioSrc.forEach(audioFile => {
        const fullUrl = getFullUrl(audioFile);
        attachments.push({
          type: 'audio',
          name: path.basename(audioFile),
          url: fullUrl
        });
      });
    }
    
    // Archivos de video local
    if (project.details.localVideo) {
      const fullUrl = getFullUrl(project.details.localVideo);
      attachments.push({
        type: 'video',
        name: path.basename(project.details.localVideo),
        url: fullUrl
      });
    }
  }
  
  // Renderizar los enlaces a archivos
  if (attachments.length > 0) {
    doc
      .font(FONTS.body)
      .fontSize(9)
      .fillColor(COLORS.secondary)
      .text(TEXTS[language].attachments, startX, currentY, {
        width: contentWidth
      });
    
    currentY += 15;
    
    attachments.forEach(attachment => {
      const text = ` ${attachment.name}`;
      
      doc
        .font(FONTS.body)
        .fontSize(8)
        .fillColor(COLORS.link)
        .text(text, startX, currentY, {
          width: contentWidth,
          link: attachment.url,
          underline: true
        });
      
      currentY += 12;
    });
  }
  
  return currentY;
}

// Versión simplificada: renderizar texto sin manejar enlaces complejos inline
function renderSimpleText(doc, text, x, y, width) {
  if (!text) return y;
  
  // Primero, eliminar todos los marcadores de enlace y procesar texto básico
  const cleanText = text.replace(/\[LINK\d+\]/g, '');
  
  doc
    .font(FONTS.body)
    .fontSize(10)
    .fillColor(COLORS.primary)
    .text(cleanText, x, y, {
      width: width,
      lineGap: 3
    });
  
  // Calcular la nueva altura
  const textHeight = doc.heightOfString(cleanText, {
    width: width,
    lineGap: 3
  });
  
  return y + textHeight;
}

// Función para renderizar un proyecto
function renderProject(doc, project, startY, isFirst = false, language = 'es') {
  const marginLeft = 80;
  const contentWidth = doc.page.width - marginLeft - 50;
  let currentY = startY;
  
  // Línea vertical de timeline (si no es el primer proyecto)
  if (!isFirst) {
    doc
      .strokeColor(COLORS.timeline)
      .lineWidth(0.5)
      .moveTo(60, currentY - 20)
      .lineTo(60, currentY)
      .dash(2, { space: 2 })
      .stroke()
      .undash();
  }
  
  // Punto en la timeline
  doc
    .fillColor(COLORS.accent)
    .circle(60, currentY, 4)
    .fill();
  
  // Año con símbolos
  const yearWithSymbols = `${project.year}${getContentSymbols(project)}`;
  
  doc
    .font(FONTS.body)
    .fontSize(9)
    .fillColor(COLORS.accent)
    .text(yearWithSymbols, 30, currentY - 6, {
      width: 25,
      align: 'right'
    });
  
  // Título del proyecto como enlace
  const projectUrl = project.href ? `${BASE_URL}/${project.href}` : null;
  
  if (projectUrl) {
    doc
      .font(FONTS.title)
      .fontSize(16)
      .fillColor(COLORS.link)
      .text(project.title, marginLeft, currentY, {
        width: contentWidth,
        link: projectUrl,
        underline: true
      });
  } else {
    doc
      .font(FONTS.title)
      .fontSize(16)
      .fillColor(COLORS.primary)
      .text(project.title, marginLeft, currentY, {
        width: contentWidth
      });
  }
  
  currentY += 25;
  
  // Descripción breve (en gris, itálica)
  doc
    .font(FONTS.italic)
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text(project.description, marginLeft, currentY, {
      width: contentWidth
    });
  
  currentY += 20;
  
  // Descripción completa (versión simplificada)
  if (project.details && project.details.fullDescription) {
    const parsedResult = parseSimpleHTML(project.details.fullDescription);
    
    // Primero renderizar el texto sin enlaces
    currentY = renderSimpleText(doc, parsedResult.text, marginLeft, currentY, contentWidth);
    
    // Luego agregar los enlaces como una lista al final de la descripción
    if (parsedResult.links && parsedResult.links.length > 0) {
      currentY += 10;
      
      parsedResult.links.forEach((link, index) => {
        const fullUrl = getFullUrl(link.url);
        const linkText = `${index + 1}. ${link.text}: ${fullUrl}`;
        
        doc
          .font(FONTS.body)
          .fontSize(9)
          .fillColor(COLORS.link)
          .text(linkText, marginLeft, currentY, {
            width: contentWidth,
            link: fullUrl,
            underline: true
          });
        
        currentY += 12;
      });
    }
    
    currentY += 15;
  } else {
    currentY += 10;
  }
  
  // Renderizar archivos adjuntos (audio/video)
  if (project.details && (project.details.audioSrc || project.details.localVideo)) {
    currentY = renderAttachments(doc, project, marginLeft, currentY, contentWidth, language);
  }
  
  // Imagen principal (si existe)
  if (project.imgSrc) {
    const imagePath = path.join(process.cwd(), 'static', project.imgSrc.replace('./', ''));
    
    if (imageExists(imagePath)) {
      try {
        // Calcular dimensiones
        const maxWidth = contentWidth;
        const maxHeight = 250;
        
        const imageBuffer = fs.readFileSync(imagePath);
        const imageSize = doc.openImage(imageBuffer);
        
        // Calcular dimensiones manteniendo proporción
        let finalWidth = maxWidth;
        let finalHeight = (imageSize.height / imageSize.width) * maxWidth;
        
        // Si es más alta que el máximo, escalar por altura
        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = (imageSize.width / imageSize.height) * maxHeight;
        }
        
        // Centrar horizontalmente
        const imageX = marginLeft + (contentWidth - finalWidth) / 2;
        
        doc.image(imageBuffer, imageX, currentY, {
          width: finalWidth,
          height: finalHeight
        });
        
        // Borde gris fino alrededor de la imagen
        doc
          .rect(imageX, currentY, finalWidth, finalHeight)
          .strokeColor('#e0e0e0')
          .lineWidth(0.5)
          .stroke();
        
        // Pie de foto opcional
        if (project.imgAlt) {
          currentY += finalHeight + 5;
          doc
            .font(FONTS.body)
            .fontSize(8)
            .fillColor(COLORS.secondary)
            .text(project.imgAlt, marginLeft, currentY, {
              width: contentWidth,
              align: 'center'
            });
          currentY += 15;
        } else {
          currentY += finalHeight + 15;
        }
        
      } catch (error) {
        console.warn(`No se pudo cargar la imagen: ${imagePath}`, error.message);
      }
    }
  }
  
  // Espacio entre proyectos
  currentY += 20;
  
  return currentY;
}

// Función principal para generar el PDF
async function generatePortfolio(language = 'en') {
  console.log(`🎨 Generando portafolio artístico (${language}) con portada...`);
  
  // Cargar proyectos según el idioma
  // Cargar proyectos según el idioma
  let projects;
  try {
    if (language === 'en') {
      // Import dinámico para el archivo en inglés - usa 'projects_en'
      const module = await import('../static/data/projects-en.js');
      projects = module.projects_en;  // ¡Aquí está el cambio!
    } else {
      // Import dinámico para el archivo en español
      const module = await import('../static/data/projects.js');
      projects = module.projects;
    }
    
    // Verificar si la exportación existe
    if (!projects) {
      throw new Error(`No se encontró la exportación en ${language === 'en' ? 'projects-en.js' : 'projects.js'}`);
    }
 } catch (error) {
    console.error(`❌ Error al cargar proyectos en ${language}:`, error.message);
    
    // Intentar cargar el español como fallback
    try {
      const module = await import('../static/data/projects.js');
      if (module && module.projects) {
        projects = module.projects;
        language = 'es';
        console.log('✓ Usando proyectos en español como fallback');
      } else {
        throw new Error('No se encontró la exportación en español');
      }
    } catch (fallbackError) {
      console.error('❌ Error crítico: No se pudo cargar ningún archivo de proyectos');
      throw new Error('No se pudo cargar los datos de proyectos');
    }
  }

  // Verificar que projects se cargó correctamente
  if (!projects || !Array.isArray(projects)) {
    throw new Error('Los proyectos no se cargaron correctamente o no son un array');
  }
  
  // Crear documento PDF
  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    autoFirstPage: true
  });
  
  // Configurar pipe de salida
  const outputFilename = language === 'en' ? 'portfolio-en.pdf' : 'portfolio.pdf';
  const outputPath = path.join(process.cwd(), outputFilename);
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);
  
  // Agregar metadatos (traducibles)
  const metadata = {
    es: {
      Title: 'Portafolio Artístico - Emilio Ocelotl',
      Author: 'Emilio Ocelotl',
      Subject: 'Portafolio de proyectos artísticos audiovisuales',
      Keywords: 'arte, sonido, audiovisual, código, live coding'
    },
    en: {
      Title: 'Artistic Portfolio - Emilio Ocelotl',
      Author: 'Emilio Ocelotl',
      Subject: 'Portfolio of audiovisual artistic projects',
      Keywords: 'art, sound, audiovisual, code, live coding'
    }
  };
  
  doc.info.Title = metadata[language].Title;
  doc.info.Author = metadata[language].Author;
  doc.info.Subject = metadata[language].Subject;
  doc.info.Keywords = metadata[language].Keywords;
  
  // 1. CREAR PORTADA
  console.log('📄 Creando portada...');
  createCoverPage(doc, language);
  
  // 2. AGREGAR NUEVA PÁGINA PARA LOS PROYECTOS
  doc.addPage();
  console.log('📄 Página de proyectos...');
  
  // Tomar solo los primeros 12 proyectos
  const projectsToRender = projects.slice(0, 12);
  
  let currentPage = 2;
  let currentY = 60;
  const contentWidth = doc.page.width - 80 - 40;
  
  // Dibujar línea de tiempo en la página de proyectos
  const drawTimeline = () => {
    const pageHeight = doc.page.height;
    doc
      .strokeColor(COLORS.timeline)
      .lineWidth(0.5)
      .moveTo(60, 40)
      .lineTo(60, pageHeight - 40)
      .dash(2, { space: 2 })
      .stroke()
      .undash();
  };
  
  drawTimeline();
  
  currentY = 80;
  
  // Renderizar cada proyecto
  for (let i = 0; i < projectsToRender.length; i++) {
    const project = projectsToRender[i];
    console.log(`Procesando: ${project.title}`);
    
    // Estimar altura del proyecto
    const estimatedHeight = estimateProjectHeight(doc, project, contentWidth);
    
    // Verificar si necesitamos nueva página ANTES de renderizar
    if (currentY + estimatedHeight > doc.page.height - 40) {
      console.log(`→ Nueva página necesaria para: ${project.title}`);
      doc.addPage();
      currentPage++;
      currentY = 40;
      drawTimeline();
      
      currentY = 60;
    }
    
    // Renderizar proyecto
    currentY = renderProject(doc, project, currentY, i === 0, language);
    
    // Asegurar que no nos pasamos del límite de la página
    if (currentY > doc.page.height - 80) {
      doc.addPage();
      currentPage++;
      currentY = 40;
      drawTimeline();
      
      currentY = 60;
    }
  }
  
  // Pie de página final
  doc.addPage();
  
  // Formatear fecha según el idioma
  let formattedDate;
  if (language === 'en') {
    formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else {
    formattedDate = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  doc
    .font(FONTS.body)
    .fontSize(10)
    .fillColor(COLORS.secondary)
    .text(`${TEXTS[language].generatedOn} ${formattedDate}`, 80, doc.page.height - 60, {
      width: doc.page.width - 160,
      align: 'center'
    });
  
  // Finalizar documento
  doc.end();
  
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log(`✅ PDF generado exitosamente: ${outputPath}`);
      console.log(`📄 ${currentPage} páginas totales (incluye portada)`);
      console.log(`🔗 Enlaces interactivos habilitados`);
      console.log(`🌐 Idioma: ${language === 'en' ? 'Inglés' : 'Español'}`);
      resolve(outputPath);
    });
    
    stream.on('error', (error) => {
      console.error('❌ Error al generar PDF:', error);
      reject(error);
    });
  });
}

// Si se ejecuta directamente con parámetro de idioma
if (import.meta.url === `file://${process.argv[1]}`) {
  // Verificar si se especificó un idioma como argumento
  const languageArg = process.argv.find(arg => arg === '--en' || arg === '--es');
  const language = languageArg === '--es' ? 'es' : 'en';
  
  generatePortfolio(language).catch(console.error);
}

// Exportar por defecto la función con soporte para idioma
export default generatePortfolio;