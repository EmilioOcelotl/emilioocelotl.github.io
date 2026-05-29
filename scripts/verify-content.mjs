// Verifica que regenerar desde content/projects/*.md produce datos idénticos
// a los projects.js / projects-en.js actuales (deep-equal). No escribe nada.
// Uso: node scripts/verify-content.mjs

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';
import { entryFromMd, isDraft } from './content-lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'content', 'projects');

function fromMd(lang) {
  return fs
    .readdirSync(srcDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort()
    .map((f) => fs.readFileSync(path.join(srcDir, f), 'utf8'))
    .filter((t) => !isDraft(t))
    .map((t) => entryFromMd(t, lang));
}

const { projects: esCur } = await import('../static/data/projects.js');
const { projects_en: enCur } = await import('../static/data/projects-en.js');

let ok = true;
for (const [lang, current] of [
  ['es', esCur],
  ['en', enCur],
]) {
  const regen = fromMd(lang);
  if (regen.length !== current.length) {
    ok = false;
    console.error(`✗ ${lang}: cantidad ${regen.length} != ${current.length}`);
    continue;
  }
  for (let i = 0; i < current.length; i++) {
    try {
      assert.deepStrictEqual(regen[i], current[i]);
    } catch {
      ok = false;
      console.error(`✗ ${lang}[${i}] (${current[i].href}) difiere:`);
      // mostrar el primer campo que difiere
      const a = current[i];
      const b = regen[i];
      for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
        const av = JSON.stringify(a[k]);
        const bv = JSON.stringify(b[k]);
        if (av !== bv) {
          console.error(`    ${k}:\n      actual: ${av}\n      regen : ${bv}`);
        }
      }
    }
  }
  if (ok) console.log(`✓ ${lang}: ${current.length} entradas idénticas`);
}

if (!ok) {
  console.error('\n❌ Hay diferencias. NO sobrescribir los .js todavía.');
  process.exit(1);
} else {
  console.log('\n✅ Regeneración idéntica a los datos actuales. Seguro sobrescribir.');
}
