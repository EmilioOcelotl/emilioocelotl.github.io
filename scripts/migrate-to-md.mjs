// Migración única: convierte projects.js / projects-en.js -> content/projects/*.md
// Uso: node scripts/migrate-to-md.mjs
// Los arrays es/en son paralelos (mismo orden, mismo href). Se fusionan en un .md bilingüe.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdFromEntries } from './content-lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'content', 'projects');

const { projects: es } = await import('../static/data/projects.js');
const { projects_en: en } = await import('../static/data/projects-en.js');

if (es.length !== en.length) {
  console.warn(`⚠ es (${es.length}) y en (${en.length}) tienen distinto número de entradas`);
}

fs.mkdirSync(outDir, { recursive: true });

es.forEach((esEntry, i) => {
  const enEntry = en[i] || esEntry;
  if (esEntry.href !== enEntry.href) {
    console.warn(`⚠ índice ${i}: href no coincide (${esEntry.href} vs ${enEntry.href})`);
  }
  const slug = (esEntry.href || `entry-${i}`).replace(/\.html$/, '');
  const prefix = String((i + 1) * 10).padStart(3, '0');
  const file = path.join(outDir, `${prefix}-${slug}.md`);
  fs.writeFileSync(file, mdFromEntries(esEntry, enEntry));
  console.log(`✓ ${path.relative(root, file)}`);
});

console.log(`\nMigradas ${es.length} entradas a ${path.relative(root, outDir)}/`);
