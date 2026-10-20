import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {STYLES} from '../src/scene.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Edit these six nodes to compose a different architecture from the library.
// Main row: 190 × 194 cards, with 58-unit connector gaps.
// Support row: tools beneath the agent; memory beneath the language model.
// Every symbol below embeds the source icon's paths in its original 128 viewBox.
const nodes = [
  {id: 'prompt', label: 'Prompt', note: 'Instructions + user input', x: 32, y: 130, step: '01'},
  {id: 'agent', label: 'Agent', note: 'Plan and coordinate', x: 280, y: 130, step: '02'},
  {id: 'llm', label: 'LLM', note: 'Reason and generate', x: 528, y: 130, step: '03'},
  {id: 'structured-output', label: 'Structured output', note: 'Typed response', x: 776, y: 130, step: '04'},
  {id: 'tools', label: 'Tools', note: 'APIs + functions', x: 280, y: 432, support: true},
  {id: 'memory', label: 'Memory', note: 'Retrieved context', x: 528, y: 432, support: true},
];

const xml = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const styleLabels = {'stroke': 'Stroke', 'two-tone': 'Two-tone', 'duotone': 'Duotone', 'fill': 'Fill', 'color': 'Color'};

function iconSymbol(root, style, id) {
  const source = readFileSync(join(root, 'icons', style, `${id}.svg`), 'utf8').trim();
  if (!/viewBox="0 0 128 128"/.test(source)) throw new Error(`Unexpected icon viewBox: ${style}/${id}`);
  const content = source.replace(/^<svg\b[^>]*>/, '').replace(/<\/svg>$/, '');
  return `<symbol id="icon-${id}" viewBox="0 0 128 128"><g fill="none" stroke-linecap="round" stroke-linejoin="round">${content}</g></symbol>`;
}

function nodeCard(node) {
  const {id, label, note, x, y, support, step} = node;
  const height = support ? 146 : 194;
  const iconSize = support ? 90 : 128;
  const iconX = (190 - iconSize) / 2;
  const iconY = support ? 2 : 9;
  const labelY = support ? 112 : 157;
  return `<g transform="translate(${x} ${y})" aria-label="${xml(label)}">
    <rect width="190" height="${height}" rx="16" fill="#FFFFFF" stroke="#DCE3ED"/>
    ${step ? `<text x="16" y="24" fill="#8491A5" font-size="11" font-weight="600">${step}</text>` : ''}
    <use href="#icon-${id}" x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" aria-hidden="true"/>
    <text x="95" y="${labelY}" text-anchor="middle" font-size="17" font-weight="600" fill="#23334B">${xml(label)}</text>
    <text x="95" y="${labelY + 21}" text-anchor="middle" font-size="12" fill="#66758B">${xml(note)}</text>
  </g>`;
}

function diagramSvg(root, style) {
  const color = style === 'color';
  const violet = style === 'duotone';
  const forward = color ? '#137EC6' : violet ? '#7956B3' : '#596B83';
  const back = color ? '#238C85' : violet ? '#A18ABF' : '#8A98AA';
  const label = styleLabels[style] || style;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="620" viewBox="0 0 1000 620" role="img" aria-labelledby="diagram-title diagram-description" font-family="Arial, Helvetica, sans-serif" stroke-linecap="round" stroke-linejoin="round">
  <title id="diagram-title">Agent workflow — ${xml(label)} icons</title>
  <desc id="diagram-description">Prompt sends a request to an agent. The agent sends a prompt to a large language model, which produces structured output. The agent calls tools and receives results. The model queries memory and receives retrieved context. All six icons are embedded vector paths from the SuperIntelligence library.</desc>
  <defs>
    ${nodes.map(node => iconSymbol(root, style, node.id)).join('\n    ')}
    <marker id="forward-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="${forward}" stroke-width="1.8"/></marker>
    <marker id="return-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="${back}" stroke-width="1.8"/></marker>
  </defs>
  <rect x="0.5" y="0.5" width="999" height="619" rx="20" fill="#F7F9FC" stroke="#E2E8F0"/>
  <text x="32" y="46" fill="#23334B" font-size="25" font-weight="600">An agent workflow, in icons</text>
  <text x="32" y="72" fill="#66758B" font-size="14">Compose the library into a self-contained architecture diagram.</text>
  <rect x="866" y="32" width="102" height="28" rx="14" fill="#FFFFFF" stroke="#DCE3ED"/>
  <text x="917" y="50" fill="#596B83" font-size="11" font-weight="600" text-anchor="middle">${xml(label.toUpperCase())}</text>
  <g fill="none" stroke="${forward}" stroke-width="1.8" marker-end="url(#forward-arrow)">
    <path d="M222 218H280"/>
    <path d="M470 218H528"/>
    <path d="M718 218H776"/>
    <path d="M353 324V432"/>
    <path d="M601 324V432"/>
  </g>
  <g fill="none" stroke="${back}" stroke-width="1.8" marker-end="url(#return-arrow)">
    <path d="M397 432V324"/>
    <path d="M645 432V324"/>
  </g>
  <g fill="#66758B" font-size="10" text-anchor="middle">
    <text x="251" y="202">request</text>
    <text x="499" y="202">prompt</text>
    <text x="747" y="202">response</text>
  </g>
  <g font-size="12">
    <text x="340" y="383" fill="${forward}" text-anchor="end">tool call</text>
    <text x="410" y="383" fill="${back}">result</text>
    <text x="588" y="383" fill="${forward}" text-anchor="end">query</text>
    <text x="658" y="383" fill="${back}">context</text>
  </g>
  ${nodes.map(nodeCard).join('\n  ')}
  <text x="32" y="602" fill="#8491A5" font-size="10">SUPERINTELLIGENCE</text>
  <text x="968" y="602" fill="#8491A5" font-size="10" text-anchor="end">SVG paths · No external assets</text>
</svg>\n`;
}

// A clockwise six-stage cycle, laid out as two rows for Markdown readability.
const loopNodes = [
  {id: 'reason', label: 'Reason', note: 'Interpret the current state', x: 30, y: 126},
  {id: 'plan', label: 'Plan', note: 'Choose the next steps', x: 385, y: 126},
  {id: 'act', label: 'Act', note: 'Execute an action', x: 740, y: 126},
  {id: 'observe', label: 'Observe', note: 'Collect the result', x: 740, y: 390},
  {id: 'evaluate', label: 'Evaluate', note: 'Assess progress', x: 385, y: 390},
  {id: 'repeat', label: 'Repeat', note: 'Begin the next iteration', x: 30, y: 390},
];

function loopDiagramSvg(root, style) {
  const edge = style === 'color' ? '#137EC6' : style === 'duotone' ? '#7956B3' : '#596B83';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="620" viewBox="0 0 1000 620" role="img" aria-labelledby="loop-title loop-description" font-family="Arial, Helvetica, sans-serif" stroke-linecap="round" stroke-linejoin="round">
  <title id="loop-title">AI Agent Loop — ${xml(styleLabels[style])} icons</title>
  <desc id="loop-description">Six stages in sequence: Reason, Plan, Act, Observe, Evaluate, Repeat. Repeat connects back to Reason. Read the upper row from left to right, then the lower row from right to left.</desc>
  <defs>
    ${loopNodes.map(node => iconSymbol(root, style, node.id)).join('\n    ')}
    <marker id="cycle-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto"><path d="M2 1L8 5L2 9" fill="none" stroke="${edge}" stroke-width="2"/></marker>
  </defs>
  <rect x="0.5" y="0.5" width="999" height="619" rx="20" fill="#F7F9FC" stroke="#E2E8F0"/>
  <text x="30" y="46" fill="#23334B" font-size="25" font-weight="600">AI Agent Loop</text>
  <text x="30" y="74" fill="#66758B" font-size="14">Reason → Plan → Act → Observe → Evaluate → Repeat</text>
  <rect x="866" y="32" width="104" height="28" rx="14" fill="#FFFFFF" stroke="#DCE3ED"/>
  <text x="918" y="50" fill="#596B83" font-size="11" font-weight="600" text-anchor="middle">${xml(styleLabels[style].toUpperCase())}</text>
  <g fill="none" stroke="${edge}" stroke-width="2" marker-end="url(#cycle-arrow)">
    <path d="M260 216H385"/><path d="M615 216H740"/>
    <path d="M855 306V390"/>
    <path d="M740 480H615"/><path d="M385 480H260"/>
    <path d="M145 390V306"/>
  </g>
  <text x="500" y="352" fill="#66758B" font-size="13" text-anchor="middle">Use each result to inform the next iteration.</text>
  ${loopNodes.map((node,i)=>`<g transform="translate(${node.x} ${node.y})" aria-label="${node.label}">
    <rect width="230" height="180" rx="16" fill="#FFFFFF" stroke="#DCE3ED"/>
    <text x="16" y="25" fill="#8491A5" font-size="11" font-weight="600">${String(i+1).padStart(2,'0')}</text>
    <use href="#icon-${node.id}" x="59" y="0" width="112" height="112" aria-hidden="true"/>
    <text x="115" y="135" text-anchor="middle" font-size="18" font-weight="600" fill="#23334B">${node.label}</text>
    <text x="115" y="158" text-anchor="middle" font-size="12" fill="#66758B">${node.note}</text>
  </g>`).join('\n  ')}
  <text x="30" y="602" fill="#8491A5" font-size="10">SUPERINTELLIGENCE</text>
  <text x="970" y="602" fill="#8491A5" font-size="10" text-anchor="end">Six stage icons · One repeatable cycle</text>
</svg>\n`;
}

export function generateDiagrams(root = projectRoot) {
  const files = [];
  for (const style of STYLES) {
    const directory = join(root, 'examples', 'diagrams', style);
    mkdirSync(directory, {recursive: true});
    const file = join(directory, 'agent-workflow.svg');
    writeFileSync(file, diagramSvg(root, style));
    files.push(file);
    const loopFile = join(directory, 'agent-loop.svg');
    writeFileSync(loopFile, loopDiagramSvg(root, style));
    files.push(loopFile);
  }
  return files;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const files = generateDiagrams();
  console.log(`Built ${files.length} self-contained agent workflow diagrams.`);
}
