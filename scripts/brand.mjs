import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {roboticBrain} from '../src/identity-robot.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const blue='#00A3FF', ink='#192842', paper='#F5F8FF';

const mark=(color,id)=>`<g transform="scale(.3125)">${roboticBrain({monochrome:color===blue?null:color,id})}</g>`;

// Original path lettering, with optical spacing. No fonts or runtime dependencies.
const letters={
  S:[30,'M28 5C24 1 20 0 15 0C7 0 2 4 2 10C2 24 28 17 28 31C28 37 23 41 15 41C9 41 4 39 1 35'],
  u:[26,'M2 13V29C2 37 6 41 13 41C20 41 24 36 24 29M24 13V40'],
  p:[28,'M2 13V53M2 26C2 18 7 12 14 12S27 17 27 26S21 41 14 41S2 35 2 26Z'],
  e:[28,'M2 26H26C26 17 21 12 14 12C6 12 2 18 2 27S7 41 15 41C20 41 24 39 26 36'],
  r:[19,'M2 40V13M2 25C2 16 8 11 17 13'],
  I:[14,'M2 1H12M7 1V40M2 40H12'],
  n:[26,'M2 40V13M2 25C2 17 7 12 13 12C20 12 24 16 24 24V40'],
  t:[20,'M8 4V31C8 39 12 42 19 39M1 13H19'],
  l:[10,'M3 0V33C3 39 5 41 9 40'],
  i:[10,'M5 14V40M5 3V3.2'],
  g:[28,'M26 14V40C26 49 21 54 13 54C8 54 5 53 2 50M26 26C26 18 21 12 14 12S2 18 2 27S7 41 14 41S26 35 26 26Z'],
  c:[27,'M25 16C22 13 18 12 14 12C6 12 2 18 2 27S7 41 14 41C19 41 23 39 25 36'],
};
const word=(text,start)=>{
  let x=start;
  const paths=[...text].map(letter=>{
    const [width,d]=letters[letter];
    const path=`<path transform="translate(${x} 25)" d="${d}"/>`;
    x+=width+7;
    return path;
  }).join('\n    ');
  return {paths,end:x-7};
};
const left=word('Super',14);
const markX=left.end+12;
const right=word('Intelligence',markX+78);
const width=right.end+14;
const svg=(title,w,h,contents)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
  <title>${title}</title>
  ${contents}
</svg>
`.replace(/[ \t]+$/gm,'');

export function generateBrand() {
  const dir=join(root,'brand');
  mkdirSync(dir,{recursive:true});
  writeFileSync(join(dir,'superintelligence-mark.svg'),svg('SuperIntelligence robotic-brain octopus',80,80,mark(blue,'si-mark-color')));
  for(const [suffix,color] of [['',ink],['-dark',paper],['-black','#000000'],['-white','#FFFFFF']]) {
    const accent=suffix==='-black'||suffix==='-white'?color:blue;
    writeFileSync(join(dir,`superintelligence-logo${suffix}.svg`),svg('SuperIntelligence — Isometric icons for AI systems',width,104,
      `<g fill="none" stroke="${color}" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round">\n    ${left.paths}\n    ${right.paths}\n  </g>\n  <g transform="translate(${markX} 13) scale(.9)">${mark(accent,`si-logo${suffix||'-light'}`)}</g>`));
  }
  for(const [suffix,color] of [['black','#000000'],['white','#FFFFFF']]) {
    writeFileSync(join(dir,`superintelligence-mark-${suffix}.svg`),svg('SuperIntelligence robotic-brain octopus',80,80,mark(color,`si-mark-${suffix}`)));
  }
  console.log('Generated SuperIntelligence wordmarks and robotic-brain octopus artwork.');
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) generateBrand();
