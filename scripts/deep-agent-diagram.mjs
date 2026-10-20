import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {STYLES} from '../src/scene.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WIDTH = 1600;
const HEIGHT = 1460;
const styleLabels = {'stroke': 'Stroke', 'two-tone': 'Two-tone', 'duotone': 'Duotone', 'fill': 'Fill', 'color': 'Color'};
const xml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const iconIds = ['prompt', 'deep-agents', 'llm', 'tools', 'observe', 'structured-output', 'explore', 'computer-use', 'memory', 'multi-agent', 'sandbox', 'plan', 'context-compaction', 'skills', 'langgraph', 'langsmith', 'monitoring', 'dataset', 'citations'];

// Copy the actual icon geometry, keeping the diagram portable in Markdown,
// image viewers and exports. There are no external fonts, images or scripts.
function iconSymbol(root, style, id) {
  const source = readFileSync(join(root, 'icons', style, `${id}.svg`), 'utf8').trim();
  if (!/viewBox="0 0 128 128"/.test(source)) throw new Error(`Unexpected icon viewBox: ${style}/${id}`);
  const geometry = source.replace(/^<svg\b[^>]*>/, '').replace(/<\/svg>$/, '');
  return `<symbol id="deep-icon-${id}" viewBox="0 0 128 128"><g fill="none" stroke-linecap="round" stroke-linejoin="round">${geometry}</g></symbol>`;
}

const icon = (id, x, y, size = 96) => `<use href="#deep-icon-${id}" x="${x}" y="${y}" width="${size}" height="${size}" aria-hidden="true"/>`;
const text = (x, y, content, size = 20, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${xml(content)}</text>`;
const card = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#FFFFFF" stroke="#DCE4EE" stroke-width="1.5" ${extra}/>`;

function diagramSvg(root, style) {
  const accent = style === 'color' ? '#127AB8' : style === 'duotone' ? '#7852AD' : '#4B607B';
  const result = style === 'color' ? '#167D78' : style === 'duotone' ? '#8865AC' : '#61758E';
  const tint = style === 'color' ? '#EDF7FD' : style === 'duotone' ? '#F5F0FC' : '#F0F4F8';
  const line = (d, color = accent, marker = 'action', extra = '') => `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" marker-end="url(#deep-${marker}-arrow)" ${extra}/>`;
  const section = (x, y, content) => text(x, y, content, 16, 'fill="#64758D" font-weight="700" letter-spacing="1.8"');
  const label = (x, y, content, size = 22) => text(x, y, content, size, 'fill="#20324A" font-weight="600" text-anchor="middle"');
  const note = (x, y, content, size = 18) => text(x, y, content, size, 'fill="#62738A" text-anchor="middle"');
  const tools = [
    {id: 'explore', title: 'Web search + fetch', one: 'Configured tools', two: 'Provider or MCP'},
    {id: 'computer-use', title: 'Computer use', one: 'Custom tool or MCP', two: 'Optional extension', optional: true},
    {id: 'memory', title: 'Files + artifacts', one: 'Read, write, edit, search', two: 'Built-in filesystem tools'},
    {id: 'multi-agent', title: 'Task / subagents', one: 'Delegate bounded work', two: 'Built-in task tool'},
    {id: 'sandbox', title: 'Sandbox execution', one: 'Requires a compatible', two: 'sandbox backend', optional: true},
  ];
  const harness = [
    {id: 'plan', x: 64, title: 'Optional planning', one: 'write_todos', two: 'Opt in, v0.7+'},
    {id: 'context-compaction', x: 326, title: 'Context handling', one: 'Summarization', two: 'Built into the harness'},
    {id: 'skills', x: 588, title: 'Skills + memory', one: 'Reusable context', two: 'Configure sources'},
    {id: 'langgraph', x: 850, title: 'LangGraph runtime', one: 'State + execution', two: 'Optional checkpoints'},
  ];
  const example = [
    {id: 'plan', x: 64, title: 'Plan + search', one: 'Application-owned', two: 'phase ordering'},
    {id: 'dataset', x: 366, title: 'Collect + index', one: 'Evidence + sources', two: 'Application-owned'},
    {id: 'deep-agents', x: 668, title: 'Synthesize + write', one: 'Bounded Deep Agents', two: 'authoring calls'},
    {id: 'citations', x: 970, title: 'Citation gate', one: 'Validate citation IDs', two: 'Repair when needed'},
    {id: 'structured-output', x: 1272, title: 'Document + report', one: 'Export + run status', two: 'Draft retained on failure'},
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="deep-title deep-description" font-family="Arial, Helvetica, sans-serif" stroke-linecap="round" stroke-linejoin="round">
  <title id="deep-title">LangChain Deep Agents: model, tools and research workflow — ${xml(styleLabels[style])}</title>
  <desc id="deep-description">A brief enters Deep Agents. The model requests tool calls, the dispatcher executes tools, and tool-result messages return to the model. When the model makes no more tool calls, it returns a final response. Available tools include configured web search, optional custom computer use or MCP tools, built-in filesystem tools, the task subagent tool, and sandbox execution with a compatible backend. The harness provides context handling, optional planning, configured skills and memory, and the LangGraph runtime with optional checkpoints. LangSmith tracing and evaluation and application logs are separate observability concerns, not mandatory steps in the control loop. A separate Content Writer example shows application-owned Plan and Search, Collect and Index, bounded Deep Agents Synthesize and Write calls, a citation-identity gate with at most two repair passes, and the exported document and run report. Computer use is an optional reference-architecture extension and is not implemented in that example repository. Documentation checked October 20, 2026.</desc>
  <defs>
    ${iconIds.map(id => iconSymbol(root, style, id)).join('\n    ')}
    ${[['action', accent], ['result', result], ['telemetry', '#91A0B3']].map(([id, color]) => `<marker id="deep-${id}-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path d="M3 2L10 6L3 10" fill="none" stroke="${color}" stroke-width="2.2"/></marker>`).join('\n    ')}
  </defs>
  <rect x="0.5" y="0.5" width="1599" height="1459" rx="24" fill="#F7F9FC" stroke="#E1E7F0"/>
  ${text(40, 57, 'Deep Agents, from tool call to research output', 35, 'fill="#1D3049" font-weight="700"')}
  ${text(40, 94, 'A LangChain reference architecture with a bounded content-writing example.', 22, 'fill="#62738A"')}
  <rect x="1400" y="36" width="160" height="36" rx="18" fill="#FFFFFF" stroke="#DCE4EE"/>
  ${text(1480, 60, `${styleLabels[style].toUpperCase()} ICONS`, 15, 'fill="#62738A" font-weight="600" text-anchor="middle"')}

  ${card(36, 137, 1528, 466)}
  ${section(64, 176, '01  THE MODEL–TOOL LOOP')}
  ${text(1500, 176, 'Repeat tool calls until the model can finish', 18, 'fill="#62738A" text-anchor="end"')}
  ${card(64, 210, 200, 180)}
  ${icon('prompt', 112, 218, 104)}
  ${label(164, 346, 'Brief')}
  ${note(164, 373, 'Goal + instructions')}
  <rect x="365" y="210" width="290" height="180" rx="18" fill="${tint}" stroke="${accent}" stroke-width="1.8"/>
  ${icon('deep-agents', 397, 219, 110)}
  ${icon('llm', 526, 232, 92)}
  ${label(510, 346, 'Deep Agents + model')}
  ${note(510, 373, 'Choose tools or finish')}
  ${card(790, 210, 290, 180)}
  ${icon('tools', 883, 218, 104)}
  ${label(935, 346, 'Tool dispatcher')}
  ${note(935, 373, 'Invoke available tools')}
  ${card(1215, 210, 285, 180)}
  ${icon('observe', 1306, 218, 104)}
  ${label(1357.5, 346, 'Tool results')}
  ${note(1357.5, 373, 'Messages + artifacts')}
  ${line('M264 286H365')}
  ${line('M655 286H790')}
  ${line('M1080 286H1215')}
  ${note(314.5, 269, 'input', 17)}
  ${note(722.5, 269, 'tool calls', 17)}
  ${note(1147.5, 269, 'execution', 17)}
  ${line('M1357 390V440Q1357 452 1345 452H717Q705 452 705 440V347Q705 335 693 335H655', result, 'result')}
  ${text(1040, 435, 'Tool messages → next model step', 19, `fill="${result}" text-anchor="middle" font-weight="600"`)}
  ${line('M510 390V502')}
  ${text(528, 478, 'no tool calls', 17, `fill="${accent}"`)}
  ${card(365, 502, 290, 76)}
  ${icon('structured-output', 380, 507, 66)}
  ${text(458, 534, 'Final response', 21, 'fill="#20324A" font-weight="600"')}
  ${text(458, 558, 'Return to the application', 16, 'fill="#62738A"')}
  ${text(64, 530, 'The model chooses', 19, 'fill="#62738A"')}
  ${text(64, 556, 'when to use a tool.', 19, 'fill="#62738A"')}
  ${text(790, 518, 'Tool results guide the next turn.', 24, 'fill="#20324A" font-weight="600"')}
  ${text(790, 548, 'The model can plan, delegate or search as needed.', 20, 'fill="#62738A"')}
  ${text(790, 575, 'Each result becomes context for the next decision.', 20, 'fill="#62738A"')}

  ${card(36, 635, 1528, 240)}
  ${section(64, 674, '02  TOOLS AVAILABLE TO THE DISPATCHER')}
  ${text(1500, 674, 'Dashed cards = optional extensions', 18, 'fill="#62738A" text-anchor="end"')}
  ${tools.map((tool, i) => {
    const x = 64 + i * 296;
    return `<g aria-label="${xml(tool.title)}">
      <rect x="${x}" y="696" width="270" height="155" rx="14" fill="#FAFCFE" stroke="${tool.optional ? '#98ADC6' : '#E2E8F0'}" stroke-width="1.5" ${tool.optional ? 'stroke-dasharray="6 5"' : ''}/>
      ${icon(tool.id, x + 13, 705, 78)}
      ${text(x + 90, 733, tool.title, 18, 'fill="#20324A" font-weight="600"')}
      ${text(x + 20, 800, tool.one, 18, 'fill="#62738A"')}
      ${text(x + 20, 825, tool.two, 18, 'fill="#62738A"')}
    </g>`;
  }).join('\n  ')}

  ${card(36, 906, 1070, 177)}
  ${section(64, 945, '03  HARNESS + RUNTIME')}
  ${harness.map(item => `<g>
    ${icon(item.id, item.x - 3, 960, 62)}
    ${text(item.x + 65, 983, item.title, 17, 'fill="#20324A" font-weight="600"')}
    ${text(item.x + 65, 1008, item.one, 17, 'fill="#62738A"')}
    ${text(item.x + 6, 1053, item.two, 17, 'fill="#62738A"')}
  </g>`).join('\n  ')}
  ${card(1126, 906, 438, 177)}
  ${section(1154, 945, 'OBSERVABILITY')}
  ${icon('langsmith', 1142, 961, 66)}
  ${text(1212, 984, 'LangSmith', 18, 'fill="#20324A" font-weight="600"')}
  ${text(1212, 1008, 'Traces + evals', 17, 'fill="#62738A"')}
  ${text(1154, 1053, 'Opt-in tracing', 17, 'fill="#62738A"')}
  ${icon('monitoring', 1349, 961, 66)}
  ${text(1419, 984, 'Application', 18, 'fill="#20324A" font-weight="600"')}
  ${text(1419, 1008, 'JSONL logs', 17, 'fill="#62738A"')}
  ${text(1361, 1053, 'Optional OTLP metrics', 17, 'fill="#62738A"')}
  ${line('M1564 508H1570Q1582 508 1582 520V983Q1582 995 1570 995H1564', '#91A0B3', 'telemetry', 'stroke-dasharray="5 6"')}

  ${card(36, 1115, 1528, 294)}
  ${section(64, 1154, '04  CONTENT WRITER · A BOUNDED APPLICATION FLOW')}
  ${text(64, 1184, 'The app owns Search → Collect ordering; Deep Agents runs bounded Synthesize, Write and Repair work.', 20, 'fill="#62738A"')}
  ${example.map(item => `<g aria-label="${xml(item.title)}">
    <rect x="${item.x}" y="1207" width="240" height="130" rx="14" fill="#FAFCFE" stroke="#E2E8F0"/>
    ${icon(item.id, item.x + 8, 1212, 62)}
    ${text(item.x + 73, 1244, item.title, 18, 'fill="#20324A" font-weight="600"')}
    ${text(item.x + 18, 1289, item.one, 17, 'fill="#62738A"')}
    ${text(item.x + 18, 1314, item.two, 17, 'fill="#62738A"')}
  </g>`).join('\n  ')}
  ${[304,606,908,1210].map(x => line(`M${x} 1266H${x + 62}`)).join('\n  ')}
  ${line('M1090 1337V1351Q1090 1361 1080 1361H798Q788 1361 788 1351V1337', result, 'result')}
  ${text(940, 1387, 'Repair ≤ 2 passes · unresolved citation errors → failed report', 17, `fill="${result}" text-anchor="middle"`)}
  ${text(40, 1438, 'SUPERINTELLIGENCE  /  Reference architecture · Docs checked 2026-10-20', 16, 'fill="#718198"')}
  ${text(1560, 1438, 'Computer use is an extension, not part of the Content Writer example.', 16, 'fill="#718198" text-anchor="end"')}
</svg>\n`;
}

export function generateDeepAgentDiagrams(root = projectRoot) {
  return STYLES.map(style => {
    const directory = join(root, 'examples', 'diagrams', style);
    mkdirSync(directory, {recursive: true});
    const file = join(directory, 'deep-agent-research.svg');
    writeFileSync(file, diagramSvg(root, style));
    return file;
  });
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  console.log(`Built ${generateDeepAgentDiagrams().length} self-contained Deep Agents research diagrams.`);
}
