import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.resolve(__dirname, '../static/font');

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

// URL base para enlaces
const BASE_URL = 'https://ocelotl.cc';

// Textos traducibles
const TEXTS = {
  es: {
    portfolio: 'PORTAFOLIO',
    generatedOn: 'Portafolio generado el',
    attachments: 'Archivos adjuntos:',
    statementBody: 'Entiendo la escritura de código como una práctica artística. Las preguntas que orientan mi trabajo no se formulan antes de las piezas, se formulan dentro de ellas, en el ejercicio de construirlas. El navegador se ha quedado como el espacio donde ese trabajo sucede, un lugar hecho de lectura y ejecución. Lo que me interesa no es ilustrar una idea con tecnología, sino que la tecnología misma sea el modo en que la pregunta se sostiene.'
  },
  en: {
    portfolio: 'PORTFOLIO',
    generatedOn: 'Portfolio generated on',
    attachments: 'Attached files:',
    statementBody: 'I understand code writing as an artistic practice. The questions that guide my work are not formulated before the pieces, they are formulated within them, in the act of building them. The browser has remained as the space where that work happens, a place made of reading and execution. What interests me is not illustrating an idea with technology, but having the technology itself be the form in which the question holds.'
  }
};

// Función para crear la portada
function createCoverPage(doc, language = 'es') {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margin = 60;

  doc.rect(0, 0, pageWidth, pageHeight).fill('#ffffff');

  // Bloque de nombre en el tercio inferior
  const blockY = pageHeight * 0.55;

  doc
    .strokeColor('#000000')
    .lineWidth(0.5)
    .moveTo(margin, blockY - 20)
    .lineTo(pageWidth - margin, blockY - 20)
    .stroke();

  doc
    .font(FONTS.title)
    .fontSize(32)
    .fillColor(COLORS.primary)
    .text('Emilio Ocelotl', margin, blockY, { width: pageWidth - margin * 2 });

  doc
    .font(FONTS.body)
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text(TEXTS[language].portfolio, margin, blockY + 44, { width: pageWidth - margin * 2 });

  doc
    .font(FONTS.body)
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text('ocelotl.cc', margin, blockY + 62, {
      width: pageWidth - margin * 2,
      link: 'https://ocelotl.cc',
      underline: false
    });

  // Año abajo a la derecha
  const year = new Date().getFullYear().toString();
  doc
    .font(FONTS.body)
    .fontSize(9)
    .fillColor(COLORS.secondary)
    .text(year, margin, pageHeight - margin - 10, {
      width: pageWidth - margin * 2,
      align: 'right'
    });
}

// Función para crear la página de statement
function createStatementPage(doc, language = 'es') {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margin = 80;
  const textWidth = pageWidth - margin * 2;

  doc.rect(0, 0, pageWidth, pageHeight).fill('#ffffff');

  const bodyY = pageHeight * 0.20;
  doc
    .font(FONTS.body)
    .fontSize(13)
    .fillColor(COLORS.primary)
    .text(TEXTS[language].statementBody, margin, bodyY, {
      width: textWidth,
      lineGap: 8,
      align: 'left'
    });
}

// Parsea HTML a una lista de párrafos. Cada párrafo es un array de "runs"
// (fragmentos de texto, con link opcional) que se renderizan inline.
function parseToParagraphs(html) {
  if (!html) return [];

  // Normalizar separadores de bloque a un marcador único (¶).
  // Dejamos <a> intacto para extraer enlaces después.
  const normalized = html
    .replace(/<br\s*\/?>/g, '¶')
    .replace(/<\/?(p|h3|div)>/g, '¶')
    .replace(/<\/?ul>/g, '¶')
    .replace(/<\/?ol>/g, '¶')
    .replace(/<li>/g, '¶• ')
    .replace(/<\/li>/g, '')
    .replace(/<\/?(em|emph|code|strong|b|i)>/g, '');

  const paragraphTexts = normalized
    .split(/¶+/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 0);

  const extractRuns = (pText) => {
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/g;
    const runs = [];
    let lastIndex = 0;
    let match;
    while ((match = linkRegex.exec(pText)) !== null) {
      if (match.index > lastIndex) {
        runs.push({ text: pText.slice(lastIndex, match.index) });
      }
      runs.push({ text: match[3], link: match[2] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < pText.length) {
      runs.push({ text: pText.slice(lastIndex) });
    }
    return runs.filter(r => r.text.length > 0);
  };

  return paragraphTexts.map(extractRuns).filter(p => p.length > 0);
}

// Devuelve hasta 2 rutas de imagen absolutas para renderizar en el PDF
function getImagesToRender(project) {
  const images = [];
  const staticDir = path.join(process.cwd(), 'static');

  if (project.details && project.details.images && project.details.images.length > 0) {
    for (const src of project.details.images) {
      if (images.length >= 2) break;
      const p = path.join(staticDir, src.replace('./', ''));
      if (imageExists(p)) images.push(p);
    }
  }

  if (images.length === 0 && project.imgSrc) {
    const p = path.join(staticDir, project.imgSrc.replace('./', ''));
    if (imageExists(p)) images.push(p);
  }

  return images;
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
  
  // Altura de la descripción completa (enlaces van inline, párrafos separados)
  if (project.details && project.details.fullDescription) {
    const paragraphs = parseToParagraphs(project.details.fullDescription);
    paragraphs.forEach((runs, pIdx) => {
      const pText = runs.map(r => r.text).join('');
      height += doc.heightOfString(pText, {
        width: contentWidth,
        fontSize: 11,
        lineGap: 4
      });
      if (pIdx < paragraphs.length - 1) height += 8;
    });
    height += 20;
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
  
  // Altura de imágenes (hasta 2, side by side)
  const imgs = getImagesToRender(project);
  if (imgs.length > 0) {
    height += 200 + 30;
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

// Renderiza párrafos con enlaces inline. Usa continued:true entre los runs
// de un mismo párrafo y cierra cada párrafo con un run no-continued.
function renderRichText(doc, paragraphs, x, y, width) {
  if (!paragraphs || paragraphs.length === 0) return y;

  doc.font(FONTS.body).fontSize(11);
  doc.x = x;
  doc.y = y;

  paragraphs.forEach((runs, pIdx) => {
    doc.x = x;

    runs.forEach((run, i) => {
      const isLastRun = i === runs.length - 1;
      const options = {
        width,
        lineGap: 4,
        continued: !isLastRun
      };

      if (run.link) {
        options.link = getFullUrl(run.link);
        options.underline = true;
        doc.fillColor(COLORS.link);
      } else {
        options.link = null;
        options.underline = false;
        doc.fillColor(COLORS.primary);
      }

      doc.text(run.text, options);
    });

    if (pIdx < paragraphs.length - 1) {
      doc.moveDown(0.5);
    }
  });

  return doc.y;
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

  // Enlace al proyecto
  if (projectUrl) {
    doc
      .font(FONTS.body)
      .fontSize(9)
      .fillColor(COLORS.secondary)
      .text(projectUrl, margin, currentY, {
        width: contentWidth,
        link: projectUrl,
        underline: true,
        lineBreak: false
      });
    currentY += 16;
  }

  // Descripción breve
  doc
    .font(FONTS.italic)
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text(project.description, margin, currentY, { width: contentWidth, lineGap: 3 });

  currentY += doc.heightOfString(project.description, { width: contentWidth, fontSize: 11, lineGap: 3 }) + 10;

  // Descripción completa con enlaces inline
  if (project.details && project.details.fullDescription) {
    const paragraphs = parseToParagraphs(project.details.fullDescription);
    currentY = renderRichText(doc, paragraphs, margin, currentY, contentWidth);
    currentY += 10;
  } else {
    currentY += 8;
  }

  // Archivos adjuntos
  if (project.details && (project.details.audioSrc || project.details.localVideo)) {
    currentY = renderAttachments(doc, project, margin, currentY, contentWidth, language);
  }

  // Imágenes: hasta 2 en paralelo si están disponibles
  const imagesToRender = getImagesToRender(project);
  if (imagesToRender.length > 0) {
    const maxHeight = 180;
    const gap = 10;
    const slotWidth = imagesToRender.length === 2
      ? (contentWidth - gap) / 2
      : contentWidth;

    // Calcular altura real del slot con la primera imagen para salto de página
    try {
      const firstBuf = fs.readFileSync(imagesToRender[0]);
      const firstSize = doc.openImage(firstBuf);
      const ratio = firstSize.height / firstSize.width;
      const slotHeight = Math.min(maxHeight, ratio * slotWidth);

      if (currentY + slotHeight + 14 > doc.page.height - margin - 40) {
        doc.addPage();
        currentY = 60;
      }
    } catch (_) { /* si falla la lectura, no saltamos de página preventivamente */ }

    currentY += 14;

    for (let idx = 0; idx < imagesToRender.length; idx++) {
      try {
        const imgBuf = fs.readFileSync(imagesToRender[idx]);
        const imgSize = doc.openImage(imgBuf);

        let w = slotWidth;
        let h = (imgSize.height / imgSize.width) * w;
        if (h > maxHeight) {
          h = maxHeight;
          w = (imgSize.width / imgSize.height) * h;
        }

        const slotX = margin + idx * (slotWidth + gap);
        const imgX = slotX + (slotWidth - w) / 2;
        doc.image(imgBuf, imgX, currentY, { width: w, height: h });
      } catch (error) {
        console.warn(`No se pudo cargar imagen: ${imagesToRender[idx]}`, error.message);
      }
    }

    // Avanzar Y con la altura del slot (estimada con slotWidth y maxHeight)
    try {
      const firstBuf = fs.readFileSync(imagesToRender[0]);
      const firstSize = doc.openImage(firstBuf);
      const ratio = firstSize.height / firstSize.width;
      const slotHeight = Math.min(maxHeight, ratio * slotWidth);
      currentY += slotHeight + 16;
    } catch (_) {
      currentY += maxHeight + 16;
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

  // 2. STATEMENT
  doc.addPage();
  console.log('📄 Página de statement...');
  createStatementPage(doc, language);

  // 3. PÁGINA DE PROYECTOS
  doc.addPage();
  console.log('📄 Página de proyectos...');
  
  const projectsToRender = projects.filter(p => p.details && p.details.fullDescription);
  
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
  const languageArg = process.argv.find(arg => arg === '--en' || arg === '--es');

  if (languageArg) {
    const language = languageArg === '--es' ? 'es' : 'en';
    generatePortfolio(language).catch(console.error);
  } else {
    // Sin argumento: generar ambos idiomas
    (async () => {
      await generatePortfolio('es');
      await generatePortfolio('en');
    })().catch(console.error);
  }
}

// Exportar por defecto la función con soporte para idioma
export default generatePortfolio;