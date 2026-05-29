// Generador: content/projects/*.md -> static/data/projects.js y projects-en.js
// Uso:
//   node scripts/build-content.mjs            genera una vez
//   node scripts/build-content.mjs --watch    regenera al guardar un .md
//   node scripts/build-content.mjs --check     escribe a archivos temporales y
//                                              verifica deep-equal contra los .js actuales
//
// El .md es la fuente de verdad. Los .js generados se versionan (artefacto).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { entryFromMd, isDraft } from './content-lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'content', 'projects');
const dataDir = path.join(root, 'static', 'data');

function readEntries(lang) {
  // Se ignoran los archivos que empiezan con "_" (plantillas, notas): no son entradas.
  const files = fs
    .readdirSync(srcDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort();
  const entries = [];
  for (const f of files) {
    const text = fs.readFileSync(path.join(srcDir, f), 'utf8');
    if (isDraft(text)) continue;
    const entry = entryFromMd(text, lang);
    // Defensa: un .md sin href (incompleto o plantilla) no genera entrada rota.
    if (!entry.href) {
      console.warn(`⚠ ${f}: sin href, se omite`);
      continue;
    }
    entries.push(entry);
  }
  return entries;
}

function serialize(entries, exportName) {
  const body = entries.map((e) => JSON.stringify(e, null, 2).replace(/^/gm, '  ')).join(',\n\n');
  return `export const ${exportName} = [\n\n${body}\n\n];\n`;
}

function build({ check = false } = {}) {
  const targets = [
    { lang: 'es', exportName: 'projects', file: 'projects.js' },
    { lang: 'en', exportName: 'projects_en', file: 'projects-en.js' },
  ];
  for (const t of targets) {
    const entries = readEntries(t.lang);
    const text = serialize(entries, t.exportName);
    const dest = path.join(dataDir, check ? `.${t.file}.tmp` : t.file);
    fs.writeFileSync(dest, text);
    if (!check) console.log(`✓ ${path.relative(root, dest)} (${entries.length} entradas)`);
  }
}

if (process.argv.includes('--check')) {
  build({ check: true });
  console.log('Archivos temporales escritos. Verificá con scripts/verify-content.mjs');
} else if (process.argv.includes('--watch')) {
  build();
  console.log(`👀 Observando ${path.relative(root, srcDir)}/ ...`);
  let timer = null;
  fs.watch(srcDir, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (err) {
        console.error('Error al regenerar:', err.message);
      }
    }, 100);
  });
} else {
  build();
}
