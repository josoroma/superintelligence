import { logoTile } from './brand-kit.mjs';
import { omarchyLogo } from './logos/omarchy.mjs';
import { computeLogos } from './logos/compute.mjs';
import { trainingPlatformLogos } from './logos/training-platforms.mjs';
import { unslothLogo } from './logos/unsloth.mjs';

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
  meta(
    'kaggle', 'Kaggle', 'Kaggle', 'Data science and machine learning platform',
    'https://www.kaggle.com/',
    'Kaggle’s recognizable lowercase k emblem in its source blue on an isometric tile.',
    ['Kaggle', 'datasets', 'competitions', 'notebooks', 'data science'], 'blue', trainingPlatformLogos.kaggle,
  ),
  meta(
    'unsloth', 'Unsloth', 'Unsloth', 'Model training and fine-tuning tools',
    'https://unsloth.ai/',
    'Unsloth’s original sloth mark, preserving its distinctive silhouette on the shared isometric tile.',
    ['Unsloth', 'fine-tuning', 'training', 'LoRA', 'QLoRA', 'optimization'], 'teal', unslothLogo,
  ),
  meta(
    'runpod', 'Runpod', 'Runpod', 'GPU cloud and AI infrastructure',
    'https://www.runpod.io/',
    'Runpod’s official cube symbol in its source purple, with the original geometric cutouts.',
    ['Runpod', 'RunPod', 'GPU', 'cloud', 'Serverless', 'Pods', 'inference'], 'purple', trainingPlatformLogos.runpod,
  ),
];
