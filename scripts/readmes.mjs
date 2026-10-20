import {readFileSync,writeFileSync} from 'node:fs';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const styles=[
  ['stroke','Stroke'],
  ['two-tone','Two-tone'],
  ['duotone','Duotone'],
  ['fill','Fill'],
  ['color','Color'],
];
const readmePath=style=>style==='color'?'README.md':`README-${style}.md`;
const navigation=selected=>`<!-- style-navigation:start -->
**Browse styles:** ${styles.map(([style,label])=>`[${style===selected?`**${label}**`:label}](${readmePath(style)})`).join(' · ')}
<!-- style-navigation:end -->`;

// README.md is the editable Color source. Never overwrite it during generation.
// Protect the comparison block so all five examples retain their own styles.
export function generateReadmes() {
  const source=readFileSync(join(root,'README.md'),'utf8');
  const comparison=source.match(/## Five styles, one system\n[\s\S]*?(?=\n## The collection\n)/)?.[0];
  if(!comparison || !source.includes('shown in Color.')) {
    throw new Error('README.md must contain the five-style comparison and the Color gallery label.');
  }
  if(!source.includes('<!-- style-navigation:start -->')) {
    throw new Error('README.md is missing the shared style navigation.');
  }
  if(!source.includes('<!-- product-brand:start -->') || !source.includes('brand/superintelligence-logo.svg')) {
    throw new Error('README.md is missing the shared SuperIntelligence logo header.');
  }
  for(const [style,label] of styles.filter(([style])=>style!=='color')) {
    const result=source
      .replace('<!-- product-brand:end -->',`<!-- product-brand:end -->\n\n<!-- Generated from README.md by scripts/readmes.mjs. Edit README.md, then regenerate. -->`)
      .replace(comparison,'<!-- style-comparison:placeholder -->')
      .replaceAll('icons/color/',`icons/${style}/`)
      .replaceAll('previews/brands-color-contact-sheet.png',`previews/brands-${style}-contact-sheet.png`)
      .replaceAll('previews/color-contact-sheet.png',`previews/${style}-contact-sheet.png`)
      .replace('shown in Color.',`shown in ${label}.`)
      .replace(/<!-- style-navigation:start -->[\s\S]*?<!-- style-navigation:end -->/g,navigation(style))
      .replace('<!-- style-comparison:placeholder -->',comparison);
    writeFileSync(join(root,readmePath(style)),result);
  }
  console.log('Generated 4 style README galleries from README.md.');
}

if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  generateReadmes();
}
