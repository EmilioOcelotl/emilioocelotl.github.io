import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { projects } from '../static/data/projects.js';

// Configuración de estilos
const COLORS = {
  primary: '#000000',
  secondary: '#666666',
  accent: '#2a5c85',
  lightGray: '#f5f5f5',
  timeline: '#cccccc'
};

const FONTS = {
  title: 'Courier-Bold',
  body: 'Courier-Bold',
  italic: 'Courier-Bold',
  bold: 'Courier-Bold'
};

// Símbolos en lugar de emojis para compatibilidad
const SYMBOLS = {
  video: '[]',
  audio: '[]',
  web: '[]',
  '3d': '[]'
};

// Función para crear la portada
function createCoverPage(doc) {
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
  
  // Subtítulo
  doc
    .font(FONTS.body)
    .fontSize(14)
    .fillColor(COLORS.secondary)
    .text('PORTFOLIO', 80, pageHeight / 2 - 15, {
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
  
  // Pie de página en la portada
  const currentDate = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
}

// Función para parsear HTML simple
function parseSimpleHTML(text) {
  if (!text) return '';
  
  return text
    .replace(/<p>/g, '\n')
    .replace(/<\/p>/g, '\n')
    .replace(/<br\/?>/g, '\n')
    .replace(/<emph>/g, '')
    .replace(/<\/emph>/g, '')
    .replace(/<h3>/g, '\n\n')
    .replace(/<\/h3>/g, '\n')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>/g, '\n')
    .replace(/<a href='([^']+)'>([^<]+)<\/a>/g, '$2 ($1)')
    .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '$2 ($1)')
    .trim();
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
    const parsedDescription = parseSimpleHTML(project.details.fullDescription);
    height += doc.heightOfString(parsedDescription, {
      width: contentWidth,
      fontSize: 10,
      lineGap: 3
    }) + 15;
  } else {
    height += 10;
  }
  
  // Altura de la imagen (si existe) - AUMENTADA
  if (project.imgSrc) {
    const imagePath = path.join(process.cwd(), 'static', project.imgSrc.replace('./', ''));
    if (imageExists(imagePath)) {
      height += 250 + 30;
    }
  }
  
  // Espacio final entre proyectos
  height += 30;
  
  return height;
}

// Función para renderizar un proyecto
function renderProject(doc, project, startY, isFirst = false) {
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
  
  // Año con símbolos (sin emojis)
  const yearWithSymbols = `${project.year}${getContentSymbols(project)}`;
  
  doc
    .font(FONTS.body)
    .fontSize(9)
    .fillColor(COLORS.accent)
    .text(yearWithSymbols, 30, currentY - 6, {
      width: 25,
      align: 'right'
    });
  
  // Título del proyecto
  doc
    .font(FONTS.title)
    .fontSize(16)
    .fillColor(COLORS.primary)
    .text(project.title, marginLeft, currentY, {
      width: contentWidth
    });
  
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
  
  // Descripción completa (parseada)
  if (project.details && project.details.fullDescription) {
    const parsedDescription = parseSimpleHTML(project.details.fullDescription);
    
    doc
      .font(FONTS.body)
      .fontSize(10)
      .fillColor(COLORS.primary)
      .text(parsedDescription, marginLeft, currentY, {
        width: contentWidth,
        lineGap: 3
      });
    
    // Calcular altura del texto
    const textHeight = doc.heightOfString(parsedDescription, {
      width: contentWidth,
      lineGap: 3
    });
    
    currentY += textHeight + 15;
  } else {
    currentY += 10;
  }
  
  // Imagen principal (si existe) - AHORA MÁS GRANDE
  if (project.imgSrc) {
    const imagePath = path.join(process.cwd(), 'static', project.imgSrc.replace('./', ''));
    
    if (imageExists(imagePath)) {
      try {
        // Calcular dimensiones - AHORA MÁS GRANDES
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
        
        // Pie de foto opcional (usando imgAlt)
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
  currentY += 40;
  
  return currentY;
}

// Función principal para generar el PDF
async function generatePortfolio() {
  console.log('🎨 Generando portafolio artístico con portada...');
  
  // Crear documento PDF
  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    autoFirstPage: true // Cambiado a true para que cree la primera página automáticamente
  });
  
  // Configurar pipe de salida
  const outputPath = path.join(process.cwd(), 'portfolio.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);
  
  // Agregar metadatos
  doc.info.Title = 'Portafolio Artístico - Emilio Ocelotl';
  doc.info.Author = 'Emilio Ocelotl';
  doc.info.Subject = 'Portafolio de proyectos artísticos audiovisuales';
  doc.info.Keywords = 'arte, sonido, audiovisual, código, live coding';
  
  // 1. CREAR PORTADA
  console.log('📄 Creando portada...');
  createCoverPage(doc);
  
  // 2. AGREGAR NUEVA PÁGINA PARA LOS PROYECTOS
  doc.addPage();
  console.log('📄 Página de proyectos...');
  
  // Tomar solo los primeros 9 proyectos
  const projectsToRender = projects.slice(0, 12);
  
  let currentPage = 2; // Ya tenemos página 1 (portada) y página 2 (proyectos)
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
  
  currentY = 80; // Empezar después del título
  
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
      currentY = 60;
      drawTimeline();
    }
    
    // Renderizar proyecto
    currentY = renderProject(doc, project, currentY, i === 0);
    
    // Asegurar que no nos pasamos del límite de la página
    if (currentY > doc.page.height - 80) {
      doc.addPage();
      currentPage++;
      currentY = 60;
      drawTimeline();
    }
  }
  
  // Finalizar documento
  doc.end();
  
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log(`✅ PDF generado exitosamente: ${outputPath}`);
      console.log(`📄 ${currentPage} páginas totales (incluye portada)`);
      console.log(`🖼️  Imágenes en tamaño grande (250px de altura máxima)`);
      resolve(outputPath);
    });
    
    stream.on('error', (error) => {
      console.error('❌ Error al generar PDF:', error);
      reject(error);
    });
  });
}

// Si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePortfolio().catch(console.error);
}

export default generatePortfolio;