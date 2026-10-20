import {mkdirSync,writeFileSync,existsSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
import {Scene,STYLES,PALETTE} from '../src/scene.mjs';
import {coreIcons} from '../src/icons-core.mjs';
import {modelIcons} from '../src/icons-models.mjs';
import {systemIcons} from '../src/icons-systems.mjs';
import {capabilityIcons} from '../src/icons-capabilities.mjs';
import {operationIcons} from '../src/icons-operations.mjs';
import {featuredBrandIcons} from '../src/icons-brands-featured.mjs';
import {globalBrandIcons} from '../src/icons-brands-global.mjs';
import {chinaBrandIcons} from '../src/icons-brands-china.mjs';
import {ecosystemBrandIcons} from '../src/icons-brands-ecosystem.mjs';
import {dataIcons} from '../src/icons-data.mjs';
import {generateReadmes} from './readmes.mjs';
import {generateBrand} from './brand.mjs';
import {generateDiagrams} from './diagram.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
generateBrand();
const {version}=JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
const ids=['agent','multi-agent','task','goal','feedback-loop','recursive-loop','reflection','llm','slm','local-model','training','rsi','harness','rag','vector-database','tokens','context-window','reasoning','tools','memory','orchestration','evaluation','alignment','inference','knowledge-graph','prompt','self-play','asi-core','monitoring','mixture-of-experts','distillation','world-model','mcp','skills','computer-use','voice','multimodal','human-approval','sandbox','context-compaction','model-routing','prompt-cache','structured-output','citations','token-budget','permissions','a2a','synthetic-data'];
ids.push('hermes','grok','meta-muse','claude','openai','gemini','perplexity','mistral','copilot','cursor','openclaw','manus','deepseek','qwen','kimi','z-ai','minimax','doubao','ernie','hunyuan');
ids.push('omarchy','huggingface','nvidia');
ids.push('kaggle','unsloth','runpod','dataset');
const definitions=[...coreIcons,...modelIcons,...systemIcons,...capabilityIcons,...operationIcons,...featuredBrandIcons,...globalBrandIcons,...chinaBrandIcons,...ecosystemBrandIcons,...dataIcons];
if(definitions.length!==ids.length || new Set(definitions.map(i=>i.id)).size!==ids.length) {
  throw new Error(`Expected ${ids.length} unique concepts`);
}
const icons=ids.map(id=>{
  const icon=definitions.find(i=>i.id===id);
  if(!icon) throw new Error(`Missing icon ${id}`);
  return icon;
});
const manifest=icons.map(({draw,...m},i)=>({collection:'systems',...m,index:i+1,viewBox:'0 0 128 128',files:Object.fromEntries(STYLES.map(style=>[style,`icons/${style}/${m.id}.svg`]))}));
const svgs=Object.fromEntries(STYLES.map(style=>[style,{}]));
for(const icon of icons) {
  const scene=new Scene();icon.draw(scene);
  for(const style of STYLES) {
    const svg=scene.render(style,icon.name);
    mkdirSync(join(root,'icons',style),{recursive:true});
    writeFileSync(join(root,'icons',style,`${icon.id}.svg`),svg);
    svgs[style][icon.id]=svg;
  }
}
const xml=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const inner=svg=>svg.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
function sheet(style, entries=manifest, title='SUPERINTELLIGENCE / AI SYSTEMS') {
  const w=1408,h=120+Math.ceil(entries.length/8)*194;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" stroke-linecap="round" stroke-linejoin="round">
  <rect width="${w}" height="${h}" fill="#F7F8FC"/>
  <text x="40" y="46" fill="#192842" font-family="Arial,sans-serif" font-size="23" font-weight="700">${title}</text>
  <text x="1368" y="44" text-anchor="end" fill="#66758B" font-family="Arial,sans-serif" font-size="12">${entries.length} ISOMETRIC ICONS · ${style.toUpperCase()} · 128 × 128</text>
  ${entries.map((m,i)=>{
    const x=32+(i%8)*168,y=80+Math.floor(i/8)*194;
    const words=m.name.split(' ');let a='',b='';for(const word of words) {if((a+' '+word).trim().length<=20&&!b) a+=(a?' ':'')+word;else b+=(b?' ':'')+word;}
    return `<g transform="translate(${x} ${y})"><rect width="160" height="182" rx="12" fill="#FFFFFF" stroke="#E4E9F1" stroke-width="1"/><text x="12" y="20" font-family="Arial,sans-serif" font-size="9" fill="#8291A5">${String(i+1).padStart(2,'0')}</text><g transform="translate(16 14)">${inner(svgs[style][m.id])}</g><text x="80" y="151" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="600" fill="#33445E">${xml(a)}</text>${b?`<text x="80" y="165" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="600" fill="#33445E">${xml(b)}</text>`:''}</g>`;
  }).join('')}
  <text x="40" y="${h-17}" fill="#7B889C" font-family="Arial,sans-serif" font-size="11">${entries.every(m=>m.collection==='brands')?'Source-based brand marks · Original isometric presentation':`${manifest.filter(m=>m.collection==='systems').length} original system icons · ${manifest.filter(m=>m.collection==='brands').length} sourced brand marks`} · Transparent icon backgrounds</text></svg>`;
}
mkdirSync(join(root,'previews'),{recursive:true});
for(const style of STYLES)writeFileSync(join(root,'previews',`${style}-contact-sheet.svg`),sheet(style));
const brands=manifest.filter(m=>m.collection==='brands');
for(const style of STYLES)writeFileSync(join(root,'previews',`brands-${style}-contact-sheet.svg`),sheet(style,brands,'SUPERINTELLIGENCE / AGENTS &amp; PLATFORMS'));
writeFileSync(join(root,'manifest.json'),JSON.stringify({name:'SuperIntelligence — AI Systems',version,count:icons.length,collections:{systems:icons.length-brands.length,brands:brands.length},styles:STYLES,camera:{azimuth:45,elevation:30},palette:PALETTE,icons:manifest},null,2)+'\n');
writeFileSync(join(root,'BRAND-REFERENCES.md'),`# Agents & platforms — artwork references

${brands.length} source-based brand marks in SuperIntelligence’s original isometric presentation, each exported in five styles. The exported illustrations are unofficial; their source geometry comes from the official assets or identified vector libraries below.

The [MIT license](LICENSE) covers SuperIntelligence’s original system icons, code, and presentation. Third-party marks retain their owners’ rights and source terms; this package does not relicense them or grant trademark rights. Source-license notices and downloaded reference assets are included in [vendor/brand-logos](vendor/brand-logos/). Use the linked official resources when you need unmodified brand assets.

Identity references checked on 2026-10-20. Color preserves source flat colors where available. Gradients are simplified to flat colors to keep the exports free of raster images, filters, and gradients. The other four styles use monochrome or tonal versions while retaining the logo geometry.

| Icon | Organization | Brand reference | Vector / reference asset |
| --- | --- | --- | --- |
${brands.map(m=>`| [${m.name}](${m.files.color}) | ${m.brand.organization} | [Brand reference](${m.brand.reference}) | [Asset source](${m.brand.assetSource}) |`).join('\n')}

## Adaptations and source terms

${brands.map(m=>`- **${m.name}:** ${m.brand.assetNotes||'Source geometry preserved on the isometric carrier.'} Source terms: ${m.brand.assetLicense.replace(/\.+$/, '')}.`).join('\n')}

Hermes uses the detailed portrait paths from Nous Research’s master SVG. Qwen and Doubao are vector traces of the current official reference images; the exported SVGs contain paths, not embedded bitmaps.

Vector data lives in [src/logos](src/logos/), with product definitions in [featured brands](src/icons-brands-featured.mjs), [global brands](src/icons-brands-global.mjs), [Chinese platforms](src/icons-brands-china.mjs), and [developer platforms](src/icons-brands-ecosystem.mjs). The shared [tile carrier](src/brand-kit.mjs) controls the presentation. Source URLs, notes, terms, and search aliases are also stored in [manifest.json](manifest.json).
`);
if(existsSync(join(root,'src/preview.mjs'))) {
  const {previewHtml}=await import('../src/preview.mjs');
  writeFileSync(join(root,'index.html'),previewHtml(manifest,svgs));
}
generateDiagrams();
generateReadmes();
console.log(`Built ${icons.length} icons × ${STYLES.length} styles = ${icons.length*STYLES.length} standalone SVGs, ${STYLES.length*2} contact sheets, ${STYLES.length} workflow diagrams, brand references, manifest${existsSync(join(root,'index.html'))?', and preview':''}.`);
