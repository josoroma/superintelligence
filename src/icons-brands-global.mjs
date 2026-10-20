import { logoTile } from './brand-kit.mjs';
import { globalLogos } from './logos/global.mjs';

// Source vector marks; the shared physical carrier is SuperIntelligence artwork.
const meta = (id, name, organization, productType, website, description, tags, accent) => {
  const logo = globalLogos[id];
  return {
    id, name, category: 'Agents & platforms', collection: 'brands',
    brand: {
      organization, productType, website, reference: logo.reference,
      artwork: 'Brand mark in isometric presentation',
      assetSource: logo.source, assetLicense: logo.license, assetName: logo.assetName,
      assetNotes: logo.notes,
    },
    description, tags,
    draw: s => logoTile(s, logo, accent),
  };
};

export const globalBrandIcons = [
  meta(
    'gemini', 'Gemini', 'Google', 'AI assistant and model family',
    'https://gemini.google.com/',
    'Google’s original Gemini sparkle silhouette, rendered in flat source blue on an isometric tile.',
    ['Google', 'DeepMind', 'Gemini', 'Bard', 'multimodal'], 'blue',
  ),
  meta(
    'perplexity', 'Perplexity', 'Perplexity', 'AI answer engine',
    'https://www.perplexity.ai/',
    'Perplexity’s official geometric symbol, with its precise intersecting strokes in True Turquoise.',
    ['Perplexity', 'answer engine', 'search', 'Comet', 'research'], 'teal',
  ),
  meta(
    'mistral', 'Mistral', 'Mistral AI', 'AI model and agent platform',
    'https://mistral.ai/',
    'Mistral’s official 2026 pixel cat, preserving the exact stepped silhouette and five warm color bands.',
    ['Mistral AI', 'Le Chat', 'Vibe', 'Codestral', 'open weights'], 'coral',
  ),
  meta(
    'copilot', 'GitHub Copilot', 'GitHub', 'AI coding assistant',
    'https://github.com/features/copilot',
    'The official Primer Copilot product UI mascot, preserving its goggle openings and curved helmet.',
    ['GitHub', 'Copilot', 'coding assistant', 'pair programming', 'Primer', 'Octicons'], 'purple',
  ),
  meta(
    'cursor', 'Cursor', 'Anysphere', 'AI coding agent and editor',
    'https://cursor.com/',
    'Cursor’s official 2D cube with its exact diagonal cutout and rounded outer corners.',
    ['Cursor', 'Anysphere', 'Composer', 'coding agent', 'editor'], 'ink',
  ),
  meta(
    'openclaw', 'OpenClaw', 'OpenClaw', 'Self-hosted AI assistant',
    'https://openclaw.ai/',
    'OpenClaw’s official red lobster, retaining the rounded claws, antennae, feet, and teal eyes.',
    ['OpenClaw', 'Clawdbot', 'Moltbot', 'lobster', 'local agent'], 'coral',
  ),
  meta(
    'manus', 'Manus', 'Manus', 'General-purpose AI agent',
    'https://manus.im/',
    'Manus’s original hand glyph, retaining the precise finger contours, cuff, and action marks.',
    ['Manus', 'Manus AI', 'general agent', 'hands on'], 'ink',
  ),
];
