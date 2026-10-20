import { logoTile } from './brand-kit.mjs';
import { omarchyLogo } from './logos/omarchy.mjs';
import { computeLogos } from './logos/compute.mjs';

// Official marks on the same physical carrier as the rest of the collection.
const meta = (id, name, organization, productType, website, description, tags, accent, logo) => ({
  id, name, category: 'Agents & platforms', collection: 'brands',
  brand: {
    organization, productType, website, reference: logo.reference,
    artwork: 'Brand mark in isometric presentation',
    assetSource: logo.source, assetLicense: logo.license, assetName: logo.assetName,
    assetNotes: logo.notes,
  },
  description, tags,
  draw: s => logoTile(s, logo, accent),
});

export const ecosystemBrandIcons = [
  meta(
    'omarchy', 'Omarchy', 'Omarchy / Omacom', 'Linux developer environment',
    'https://omarchy.org/',
    'Omarchy’s official geometric emblem, preserving its nested outline and source green.',
    ['Omarchy', 'Linux', 'Arch Linux', 'Hyprland', 'DHH', 'Omacom'], 'teal', omarchyLogo,
  ),
  meta(
    'huggingface', 'Hugging Face', 'Hugging Face', 'Machine learning model and dataset platform',
    'https://huggingface.co/',
    'Hugging Face’s official yellow face and hands, with its original monochrome mark in tonal styles.',
    ['Hugging Face', 'huggingface', 'HF', 'Hub', 'Transformers', 'Spaces'], 'coral', computeLogos.huggingface,
  ),
  meta(
    'nvidia', 'NVIDIA', 'NVIDIA', 'AI computing platform',
    'https://www.nvidia.com/',
    'NVIDIA’s official eye symbol, preserving its native cutouts and signature green.',
    ['NVIDIA', 'Nvidia', 'GPU', 'CUDA', 'NIM', 'AI computing'], 'teal', computeLogos.nvidia,
  ),
];
