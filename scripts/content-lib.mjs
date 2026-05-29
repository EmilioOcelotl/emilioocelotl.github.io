// Utilidades compartidas para el sistema de contenido en Markdown.
// El .md es la fuente de verdad; build-content.mjs regenera projects.js / projects-en.js.
// Sin dependencias externas: conversor Markdown <-> HTML mínimo, suficiente para
// el subconjunto que usan las entradas (párrafos, enlaces, *em*, `code`, **strong**, listas).

const LANGS = ['es', 'en'];

// --- rutas de imagen ---------------------------------------------------------
// En el frontmatter/sección images se escribe solo el nombre (ej. tres-r.jpg).
// El generador antepone ./img/ salvo que ya venga con una ruta (contiene '/').
export function imgPath(name) {
  if (!name) return name;
  return name.includes('/') ? name : `./img/${name}`;
}
function stripImg(path) {
  return path && path.startsWith('./img/') ? path.slice('./img/'.length) : path;
}

// --- Markdown inline -> HTML -------------------------------------------------
function inlineMdToHtml(s) {
  // Protegemos enlaces y code spans con tokens que no aparecen en prosa, para que
  // el énfasis (*, _) y los números reales (años, etc.) no los rompan.
  const links = [];
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t, u) => {
    links.push(`<a href='${u}'>${t}</a>`);
    return `@@L${links.length - 1}@@`;
  });
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_m, c) => {
    codes.push(`<code>${c}</code>`);
    return `@@C${codes.length - 1}@@`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  s = s.replace(/(?<!\w)_([^_]+)_(?!\w)/g, '<em>$1</em>');
  s = s.replace(/@@C(\d+)@@/g, (_m, i) => codes[+i]);
  s = s.replace(/@@L(\d+)@@/g, (_m, i) => links[+i]);
  return s;
}

// --- Markdown (bloques) -> HTML (fullDescription) ----------------------------
export function mdToHtml(md) {
  if (!md) return '';
  const blocks = md.trim().split(/\n{2,}/);
  const out = [];
  for (const b of blocks) {
    const lines = b.split('\n');
    if (lines.length && lines.every((l) => /^\s*-\s+/.test(l))) {
      const items = lines
        .map((l) => `<li>${inlineMdToHtml(l.replace(/^\s*-\s+/, '').trim())}</li>`)
        .join('');
      out.push(`<ul>${items}</ul>`);
    } else {
      // El whitespace contiguo se colapsa a un solo espacio (igual que el parser del PDF).
      const text = lines.map((l) => l.trim()).join(' ');
      out.push(`<p>${inlineMdToHtml(text)}</p>`);
    }
  }
  return out.join('');
}

// --- HTML -> Markdown (solo para la migración inicial) -----------------------
function inlineHtmlToMd(s) {
  s = s.replace(/<a [^>]*href=['"]([^'"]*)['"][^>]*>(.*?)<\/a>/gs, '[$2]($1)');
  s = s.replace(/<strong>(.*?)<\/strong>/gs, '**$1**');
  s = s.replace(/<b>(.*?)<\/b>/gs, '**$1**');
  s = s.replace(/<em>(.*?)<\/em>/gs, '*$1*');
  s = s.replace(/<i>(.*?)<\/i>/gs, '*$1*');
  s = s.replace(/<code>(.*?)<\/code>/gs, '`$1`');
  return s.trim();
}
export function htmlToMd(html) {
  if (!html) return '';
  const blocks = [];
  const re = /<p>(.*?)<\/p>|<ul>(.*?)<\/ul>/gs;
  let m;
  while ((m = re.exec(html))) {
    if (m[1] != null) {
      blocks.push(inlineHtmlToMd(m[1]));
    } else {
      const items = [...m[2].matchAll(/<li>(.*?)<\/li>/gs)].map(
        (x) => `- ${inlineHtmlToMd(x[1].trim())}`
      );
      blocks.push(items.join('\n'));
    }
  }
  // Fallback: HTML sin <p> (ej. <li> sueltos). Lo tratamos como un bloque.
  if (!blocks.length) blocks.push(inlineHtmlToMd(html));
  return blocks.join('\n\n');
}

// --- Frontmatter (plano, claves con punto para idioma) -----------------------
export function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: m[2] };
}
function fmValue(v) {
  // Siempre entre comillas dobles; si el valor las contiene, usar simples.
  if (v == null) return '""';
  const s = String(v);
  return s.includes('"') ? `'${s}'` : `"${s}"`;
}

// --- Secciones del cuerpo (::: nombre) ---------------------------------------
export function parseSections(body) {
  const sections = {};
  let cur = null;
  let buf = [];
  const flush = () => {
    if (cur) sections[cur] = buf.join('\n').trim();
  };
  for (const line of body.split('\n')) {
    const open = line.match(/^:::\s*(\S+)\s*$/);
    if (open) {
      flush();
      cur = open[1];
      buf = [];
    } else if (/^:::\s*$/.test(line)) {
      flush();
      cur = null;
      buf = [];
    } else if (cur) {
      buf.push(line);
    }
  }
  flush();
  return sections;
}
function parseImages(text) {
  if (!text) return [];
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split('|').map((p) => p.trim());
      const src = imgPath(parts[0]);
      const caption = {};
      for (const p of parts.slice(1)) {
        const i = p.indexOf(':');
        if (i < 0) continue;
        caption[p.slice(0, i).trim()] = p.slice(i + 1).trim();
      }
      return { src, caption: Object.keys(caption).length ? caption : null };
    });
}

// --- .md -> objeto de proyecto por idioma ------------------------------------
export function entryFromMd(text, lang) {
  const { data: fm, body } = parseFrontmatter(text);
  const sections = parseSections(body);
  const e = {
    href: fm.href,
    imgSrc: imgPath(fm.imgSrc),
    imgAlt: fm[`imgAlt.${lang}`] ?? fm.imgAlt ?? '',
    title: fm[`title.${lang}`] ?? fm.title ?? '',
    year: fm.year ?? '',
    description: fm[`description.${lang}`] ?? fm.description ?? '',
  };
  // details solo se incluye si hay algo que mostrar (algunas entradas no lo tienen).
  const details = {};
  const fullDescription = mdToHtml(sections[lang] || '');
  if (fullDescription) details.fullDescription = fullDescription;
  const images = parseImages(sections.images).map((im) =>
    im.caption && im.caption[lang] ? { src: im.src, caption: im.caption[lang] } : im.src
  );
  if (images.length) details.images = images;
  if (fm.localVideo) details.localVideo = fm.localVideo;
  if (fm.videoPoster) details.videoPoster = fm.videoPoster;
  if (sections.videoEmbed) details.videoEmbed = sections.videoEmbed;
  if (sections.audio) {
    details.audioSrc = sections.audio
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (sections.embed3d) details.embed3d = sections.embed3d;
  if (Object.keys(details).length) e.details = details;
  return e;
}
export function isDraft(text) {
  const { data } = parseFrontmatter(text);
  return data.draft === 'true' || data.draft === true;
}

// --- objeto de proyecto (par es/en) -> texto .md -----------------------------
export function mdFromEntries(es, en, { draft } = {}) {
  const fm = [];
  if (es.href) fm.push(`href: ${es.href}`);
  fm.push(`imgSrc: ${fmValue(stripImg(es.imgSrc))}`);
  fm.push(`year: ${fmValue(es.year)}`);
  fm.push(`title.es: ${fmValue(es.title)}`);
  fm.push(`title.en: ${fmValue(en.title)}`);
  fm.push(`imgAlt.es: ${fmValue(es.imgAlt)}`);
  fm.push(`imgAlt.en: ${fmValue(en.imgAlt)}`);
  fm.push(`description.es: ${fmValue(es.description)}`);
  fm.push(`description.en: ${fmValue(en.description)}`);
  const d = es.details || {};
  if (d.localVideo) fm.push(`localVideo: ${fmValue(d.localVideo)}`);
  if (d.videoPoster) fm.push(`videoPoster: ${fmValue(d.videoPoster)}`);
  if (draft) fm.push('draft: true');

  const out = ['---', ...fm, '---', ''];

  out.push('::: es', htmlToMd((es.details || {}).fullDescription || ''), '');
  out.push('::: en', htmlToMd((en.details || {}).fullDescription || ''), '');

  const esImgs = (es.details || {}).images || [];
  const enImgs = (en.details || {}).images || [];
  if (esImgs.length) {
    const lines = esImgs.map((im, i) => {
      const src = typeof im === 'string' ? im : im.src;
      const name = stripImg(src);
      const caps = [];
      if (typeof im === 'object' && im.caption) caps.push(`es: ${im.caption}`);
      const enImg = enImgs[i];
      if (enImg && typeof enImg === 'object' && enImg.caption) caps.push(`en: ${enImg.caption}`);
      return caps.length ? `${name} | ${caps.join(' | ')}` : name;
    });
    out.push('::: images', ...lines, '');
  }

  if (d.audioSrc && d.audioSrc.length) {
    out.push('::: audio', ...d.audioSrc, '');
  }
  if (d.videoEmbed) {
    out.push('::: videoEmbed', d.videoEmbed, '');
  }
  if (d.embed3d) {
    out.push('::: embed3d', d.embed3d, '');
  }
  return out.join('\n').replace(/\n+$/, '\n');
}

export { LANGS };
