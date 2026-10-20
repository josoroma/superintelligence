import { logoTile } from './brand-kit.mjs';
import { langchainPlatformLogos } from './logos/langchain-platforms.mjs';

// Current official product marks on the collection's shared isometric carrier.
const meta = (id, name, productType, website, description, tags, accent) => {
  const logo = langchainPlatformLogos[id];
  return {
    id, name, category: 'Agents & platforms', collection: 'brands',
    brand: {
      organization: 'LangChain', productType, website, reference: logo.reference,
      artwork: 'Brand mark in isometric presentation',
      assetSource: logo.source, assetLicense: logo.license, assetName: logo.assetName,
      assetNotes: logo.notes,
    },
    description, tags,
    draw: s => logoTile(s, logo, accent),
  };
};

export const langchainBrandIcons = [
  meta(
    'langchain', 'LangChain', 'Open-source agent framework',
    'https://www.langchain.com/langchain',
    'LangChain’s current official linked-chain framework badge in its native navy and light blue.',
    ['LangChain', 'Lang Chain', 'framework', 'agents', 'Python', 'TypeScript'], 'blue',
  ),
  meta(
    'langgraph', 'LangGraph', 'Agent runtime and orchestration framework',
    'https://www.langchain.com/langgraph',
    'LangGraph’s current official four-node framework badge, with its original connected geometry.',
    ['LangGraph', 'Lang Graph', 'LangChain', 'orchestration', 'stateful', 'graph', 'runtime'], 'teal',
  ),
  meta(
    'deep-agents', 'Deep Agents', 'Open-source agent harness',
    'https://www.langchain.com/deep-agents',
    'Deep Agents’ current official folded geometric badge for LangChain’s long-running agent harness.',
    ['Deep Agents', 'deepagents', 'LangChain', 'harness', 'planning', 'subagents', 'context management'], 'blue',
  ),
  meta(
    'langsmith', 'LangSmith', 'Agent engineering and observability platform',
    'https://www.langchain.com/langsmith-platform',
    'LangSmith’s current official four-part symbol, preserving the native silhouette and black color.',
    ['LangSmith', 'Lang Smith', 'LangChain', 'observability', 'tracing', 'evaluation', 'deployment'], 'purple',
  ),
];
