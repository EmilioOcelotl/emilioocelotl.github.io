import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.resolve(__dirname, '../../memoria-transvolcánica/render/fonts');

// Configuración de estilos
const COLORS = {
  primary: '#000000',
  secondary: '#555555',
  accent: '#000000',
  link: '#1a1a1a'
};

const FONTS = {
  title: 'Syne-ExtraBold',
  bold: 'Syne-Bold',
  body: 'Inconsolata-Regular',
  italic: 'Inconsolata-Regular'
};

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
  const margin = 60;

  doc.rect(0, 0, pageWidth, pageHeight).fill('#ffffff');

  const midY = pageHeight / 2 - 40;

  doc
    .font(FONTS.title)
    .fontSize(28)
    .fillColor(COLORS.primary)
    .text('Emilio Ocelotl', margin, midY, { width: pageWidth - margin * 2 });

  doc
    .font(FONTS.italic)
    .fontSize(12)
    .fillColor(COLORS.secondary)
    .text(TEXTS[language].portfolio, margin, midY + 38, { width: pageWidth - margin * 2 });

  doc
    .strokeColor('#000000')
    .lineWidth(0.5)
    .moveTo(margin, midY + 62)
    .lineTo(pageWidth - margin, midY + 62)
    .stroke();

  const year = new Date().getFullYear().toString();
  doc
    .font(FONTS.body)
    .fontSize(10)
    .fillColor(COLORS.secondary)
    .text(year, margin, midY + 74, { width: pageWidth - margin * 2 });
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

  const cleanText = text.replace(/\[LINK\d+\]/g, '');

  doc
    .font(FONTS.body)
    .fontSize(11)
    .fillColor(COLORS.primary)
    .text(cleanText, x, y, {
      width: width,
      lineGap: 4
    });

  const textHeight = doc.heightOfString(cleanText, {
    width: width,
    fontSize: 11,
    lineGap: 4
  });

  return y + textHeight;
}

// Función para renderizar un proyecto
function renderProject(doc, project, startY, isFirst = false, language = 'es') {
  const margin = 60;
  const contentWidth = doc.page.width - margin * 2;
  let currentY = startY;

  // Separador entre proyectos
  if (!isFirst) {
    doc
      .strokeColor('#cccccc')
      .lineWidth(0.5)
      .moveTo(margin, currentY)
      .lineTo(doc.page.width - margin, currentY)
      .stroke();
    currentY += 20;
  }

  // Año
  doc
    .font(FONTS.italic)
    .fontSize(10)
    .fillColor(COLORS.secondary)
    .text(project.year, margin, currentY, { width: contentWidth });

  currentY += 16;

  // Título
  const projectUrl = project.href ? `${BASE_URL}/${project.href}` : null;

  if (projectUrl) {
    doc
      .font(FONTS.title)
      .fontSize(16)
      .fillColor(COLORS.primary)
      .text(project.title, margin, currentY, {
        width: contentWidth,
        link: projectUrl,
        underline: false
      });
  } else {
    doc
      .font(FONTS.title)
      .fontSize(16)
      .fillColor(COLORS.primary)
      .text(project.title, margin, currentY, { width: contentWidth });
  }

  currentY += 22;

  // Descripción breve
  doc
    .font(FONTS.italic)
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text(project.description, margin, currentY, { width: contentWidth, lineGap: 3 });

  currentY += doc.heightOfString(project.description, { width: contentWidth, fontSize: 11, lineGap: 3 }) + 10;

  // Descripción completa
  if (project.details && project.details.fullDescription) {
    const parsedResult = parseSimpleHTML(project.details.fullDescription);
    currentY = renderSimpleText(doc, parsedResult.text, margin, currentY, contentWidth);

    if (parsedResult.links && parsedResult.links.length > 0) {
      currentY += 8;
      parsedResult.links.forEach((link, index) => {
        const fullUrl = getFullUrl(link.url);
        const linkText = `${link.text}: ${fullUrl}`;
        doc
          .font(FONTS.body)
          .fontSize(9)
          .fillColor(COLORS.secondary)
          .text(linkText, margin, currentY, {
            width: contentWidth,
            link: fullUrl,
            underline: true
          });
        currentY += 14;
      });
    }

    currentY += 10;
  } else {
    currentY += 8;
  }

  // Archivos adjuntos
  if (project.details && (project.details.audioSrc || project.details.localVideo)) {
    currentY = renderAttachments(doc, project, margin, currentY, contentWidth, language);
  }

  // Imagen principal
  if (project.imgSrc) {
    const imagePath = path.join(process.cwd(), 'static', project.imgSrc.replace('./', ''));
    if (imageExists(imagePath)) {
      try {
        const maxWidth = contentWidth;
        const maxHeight = 220;
        const imageBuffer = fs.readFileSync(imagePath);
        const imageSize = doc.openImage(imageBuffer);

        let finalWidth = maxWidth;
        let finalHeight = (imageSize.height / imageSize.width) * maxWidth;
        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = (imageSize.width / imageSize.height) * maxHeight;
        }

        // Si la imagen no cabe en el espacio restante, nueva página
        if (currentY + finalHeight > doc.page.height - margin - 40) {
          doc.addPage();
          currentY = 60;
        }

        currentY += 14;
        const imageX = margin + (contentWidth - finalWidth) / 2;
        doc.image(imageBuffer, imageX, currentY, { width: finalWidth, height: finalHeight });
        currentY += finalHeight + 16;
      } catch (error) {
        console.warn(`No se pudo cargar la imagen: ${imagePath}`, error.message);
      }
    }
  }

  // Espacio entre proyectos
  currentY += 24;

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
    autoFirstPage: true,
    bufferPages: true
  });

  // Registrar fuentes personalizadas
  doc.registerFont('Syne-ExtraBold', path.join(FONTS_DIR, 'Syne-ExtraBold.ttf'));
  doc.registerFont('Syne-Bold', path.join(FONTS_DIR, 'Syne-Bold.ttf'));
  doc.registerFont('Inconsolata-Regular', path.join(FONTS_DIR, 'Inconsolata-Regular.ttf'));
  doc.registerFont('Inconsolata-Bold', path.join(FONTS_DIR, 'Inconsolata-Bold.ttf'));

  // Contar páginas para numerar al final
  let pageCount = 0;
  doc.on('pageAdded', () => { pageCount++; });
  
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
  
  const projectsToRender = projects;
  
  let currentPage = 2;
  let currentY = 60;
  const contentWidth = doc.page.width - 120;

  // Renderizar cada proyecto
  for (let i = 0; i < projectsToRender.length; i++) {
    const project = projectsToRender[i];
    console.log(`Procesando: ${project.title}`);

    const estimatedHeight = estimateProjectHeight(doc, project, contentWidth);

    if (currentY + estimatedHeight > doc.page.height - 60) {
      console.log(`→ Nueva página para: ${project.title}`);
      doc.addPage();
      currentPage++;
      currentY = 60;
    }

    currentY = renderProject(doc, project, currentY, i === 0, language);

    if (currentY > doc.page.height - 80) {
      doc.addPage();
      currentPage++;
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
  
  // Numerar páginas (excepto portada = página 0)
  const range = doc.bufferedPageRange();
  for (let i = 1; i < range.count; i++) {
    doc.switchToPage(range.start + i);

    const savedBottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;

    doc
      .font('Inconsolata-Regular')
      .fontSize(9)
      .fillColor('#999999')
      .text(i.toString(), 0, doc.page.height - 36, {
        width: doc.page.width - 60,
        align: 'right',
        lineBreak: false
      });

    doc.page.margins.bottom = savedBottom;
  }

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