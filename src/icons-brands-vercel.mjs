import { logoTile } from './brand-kit.mjs';
import { vercelPlatformLogos } from './logos/vercel-platforms.mjs';

const meta = (id, name, productType, website, description, tags, accent) => {
  const logo = vercelPlatformLogos[id];
  return {
    id, name, category: 'Agents & platforms', collection: 'brands',
    brand: {
      organization: 'Vercel', productType, website, reference: logo.reference,
      artwork: 'Brand mark in isometric presentation',
      assetSource: logo.source, assetLicense: logo.license, assetName: logo.assetName,
      assetNotes: logo.notes,
    },
    description, tags,
    draw: s => logoTile(s, logo, accent),
  };
};

export const vercelBrandIcons = [
  meta(
    'ai-sdk', 'Vercel AI SDK', 'TypeScript AI toolkit', 'https://vercel.com/ai-sdk',
    'The official AI SDK wordmark and outlined SDK capsule on the shared isometric tile.',
    ['AI SDK', 'Vercel', 'TypeScript', 'streaming', 'tools', 'agents', 'ai-sdk.dev'], 'blue',
  ),
  meta(
    'nextjs', 'Next.js', 'React web application framework', 'https://nextjs.org/',
    'Next.js’s original circle-N geometry, with gradient fades flattened for a crisp vector mark.',
    ['Next.js', 'nextjs', 'Next', 'Vercel', 'React', 'App Router', 'full-stack'], 'ink',
  ),
];
