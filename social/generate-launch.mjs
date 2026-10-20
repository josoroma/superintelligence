import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const outputDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(outputDir);
const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
const total = manifest.icons.length;
const styleCount = manifest.styles.length;
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

// Copy the shipped paths; the launch artwork has no external image dependencies.
async function symbol(file, id) {
  const svg = await readFile(path.join(root, file), 'utf8');
  const opening = svg.match(/<svg\b([^>]*)>/)?.[1];
  if (!opening) throw new Error(`Missing SVG root: ${file}`);
  const viewBox = opening.match(/viewBox="([^"]+)"/)?.[1];
  if (!viewBox) throw new Error(`Missing viewBox: ${file}`);
  const inherited = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin']
    .map((name) => opening.match(new RegExp(`(?:^|\\s)${name}="([^"]+)"`)))
    .filter(Boolean).map((match) => match[0].trim()).join(' ');
  let body = svg.replace(/^[\s\S]*?<svg\b[^>]*>/, '').replace(/<\/svg>\s*$/, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/g, '');
  const ids = [...body.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  for (const oldId of ids) {
    const newId = `${id}-${oldId}`;
    body = body.replaceAll(`id="${oldId}"`, `id="${newId}"`)
      .replaceAll(`url(#${oldId})`, `url(#${newId})`)
      .replaceAll(`href="#${oldId}"`, `href="#${newId}"`);
  }
  return `<symbol id="${id}" viewBox="${viewBox}" ${inherited}>${body}</symbol>`;
}

const picks = [
  ['agent', 'AI agents'], ['multi-agent', 'Swarms'], ['llm', 'Models'],
  ['rag', 'RAG'], ['tools', 'Tool use'], ['gpu', 'Compute'],
  ['memory', 'Memory'], ['mcp', 'MCP'], ['monitoring', 'Observability'],
];
const definitions = [await symbol('brand/superintelligence-logo-dark.svg', 'launch-brand')];
for (const [id] of picks) {
  const icon = manifest.icons.find((item) => item.id === id);
  if (!icon) throw new Error(`Unknown icon: ${id}`);
  definitions.push(await symbol(icon.files.color, `launch-${id}`));
}

const cards = picks.map(([id, label], index) => {
  const x = 864 + (index % 3) * 224;
  const y = 174 + Math.floor(index / 3) * 198;
  const color = ['#00A3FF', '#A58BEF', '#47C5B3'][index % 3];
  return `<g>
    <rect x="${x}" y="${y}" width="208" height="182" rx="20" fill="#F5F7FB"/>
    <rect x="${x + 18}" y="${y + 18}" width="5" height="5" rx="2.5" fill="${color}"/>
    <use href="#launch-${id}" x="${x + 26}" y="${y + 2}" width="156" height="156"/>
    <text x="${x + 104}" y="${y + 164}" text-anchor="middle" font-size="18" font-weight="550" fill="#40516B">${escape(label)}</text>
  </g>`;
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="launch-title launch-desc">
<title id="launch-title">SuperIntelligence — icons for the AI stack</title>
<desc id="launch-desc">${total} isometric icons in ${styleCount} styles, ${total * styleCount} SVGs. Nine actual collection icons show AI agents, swarms, models, RAG, tool use, compute, memory, MCP, and observability. Includes Codex skills for icons and diagrams.</desc>
<defs>
  <radialGradient id="launch-aura" cx="100%" cy="0%" r="100%">
    <stop offset="0" stop-color="#123E63"/>
    <stop offset="0.6" stop-color="#0A1428"/>
    <stop offset="1" stop-color="#090E1B"/>
  </radialGradient>
  <linearGradient id="launch-accent" x1="0" y1="0" x2="1" y2="0">
    <stop stop-color="#BC9AFF"/><stop offset="1" stop-color="#67CEFF"/>
  </linearGradient>
  ${definitions.join('\n')}
</defs>
<rect width="1600" height="900" fill="url(#launch-aura)"/>
<g font-family="Inter, Arial, Helvetica, sans-serif">
  <path d="M864 137H1520" stroke="#29415D"/>
  <text x="864" y="111" font-size="17" letter-spacing="2.6" font-weight="600" fill="#9DB4CD">A VISUAL LANGUAGE FOR AI</text>
  <use href="#launch-brand" x="64" y="48" width="650" height="104"/>

  <text x="76" y="294" font-size="84" font-weight="750" letter-spacing="-3" fill="#F4F7FF">Icons for</text>
  <text x="76" y="391" font-size="84" font-weight="750" letter-spacing="-3" fill="url(#launch-accent)">the AI stack.</text>
  <text x="80" y="475" font-size="30" font-weight="600" fill="#F4F7FF">${total} icons<tspan fill="#5E718D"> · </tspan>${styleCount} styles<tspan fill="#5E718D"> · </tspan>${total * styleCount} SVGs</text>
  <text x="80" y="528" font-size="27" fill="#ACBCD3">For UI, docs &amp; diagrams.</text>

  <path d="M80 586H720" stroke="#26354A"/>
  <g transform="translate(80 620)">
    <rect width="34" height="34" rx="9" fill="#172D43"/>
    <path d="M10 11L16 17L10 23M20 23H25" stroke="#80CCFF" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="49" y="15" font-size="21" font-weight="600" fill="#D5E1F5">Includes Codex skills</text>
    <text x="49" y="44" font-size="20" fill="#8FA5C2">Create icons. Build diagrams.</text>
  </g>

  ${cards}

  <path d="M80 802H1520" stroke="#26354A"/>
  <text x="80" y="849" font-size="25" fill="#C7D6EC">github.com/josoroma/<tspan font-weight="600" fill="#74CAFF">superintelligence</tspan></text>
  <text x="1520" y="849" text-anchor="end" font-size="18" letter-spacing="1.7" font-weight="600" fill="#8FA5C2">EDITABLE SVG · FIVE STYLES</text>
</g>
</svg>\n`;

await writeFile(path.join(outputDir, 'superintelligence-launch.svg'), svg.replace(/[\t ]+$/gm, ''));
await writeFile(path.join(outputDir, 'x-post.txt'), `SuperIntelligence 🐙\n\n${total} isometric icons. ${styleCount} styles. ${total * styleCount} SVGs.\n\nFor AI agents, tools, dashboards & docs. Includes Codex skills to create icons and diagrams.\n\nhttps://github.com/josoroma/superintelligence\n`);
await writeFile(path.join(outputDir, 'alt-text.txt'), `SuperIntelligence launch card on a dark navy background, with the neon octopus wordmark and the headline “Icons for the AI stack.” ${total} icons, ${styleCount} styles, ${total * styleCount} SVGs for UI, docs, and diagrams. Includes Codex skills to create icons and build diagrams. A three-by-three gallery shows the actual isometric icons for AI agents, swarms, models, RAG, tool use, compute, memory, MCP, and observability. Repository: github.com/josoroma/superintelligence.\n`);
console.log(`Generated social SVG, tweet, and alt text from ${total} icons × ${styleCount} styles.`);
