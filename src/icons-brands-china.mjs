import { logoTile } from './brand-kit.mjs';
import { chinaLogos } from './logos/china.mjs';

// Faithful source geometry on the same isometric carrier as the full collection.
// Each source and its adaptation notes are preserved in src/logos/china.mjs.
const entry = (id, name, organization, productType, website, tags, description, accent = 'blue') => {
  const logo = chinaLogos[id];
  return {
    id, name, category: 'Agents & platforms', collection: 'brands',
    brand: {
      organization, productType, website, reference: logo.reference,
      artwork: 'Brand mark in isometric presentation',
      assetSource: logo.source, assetLicense: logo.license,
      assetNotes: logo.notes,
    },
    tags, description, draw: s => logoTile(s, logo, accent),
  };
};

export const chinaBrandIcons = [
  entry(
    'deepseek', 'DeepSeek', 'DeepSeek', 'AI assistant and model family',
    'https://www.deepseek.com/en/',
    ['深度求索', 'DeepSeek Chat', 'DeepSeek Harness', 'Chinese AI'],
    'DeepSeek’s official whale silhouette, including the eye, belly cutout, and upturned tail.',
  ),
  entry(
    'qwen', 'Qwen', 'Alibaba Cloud', 'AI assistant and model family',
    'https://qwen.ai/',
    ['通义千问', 'Tongyi', 'Alibaba', 'Qwen Agent', 'Chinese AI'],
    'The current Qwen mark: three rounded blue ribbons arranged around a triangular opening.',
  ),
  entry(
    'kimi', 'Kimi', 'Moonshot AI', 'AI assistant and agent platform',
    'https://www.kimi.com/',
    ['月之暗面', 'Moonshot', 'Kimi Code', 'Kimi Agent', 'Chinese AI'],
    'Kimi’s precise black K and separate blue apostrophe, preserving the original contours.',
  ),
  entry(
    'z-ai', 'Z.ai / GLM', 'Zhipu AI', 'AI assistant and GLM model family',
    'https://z.ai/',
    ['智谱', '智谱清言', 'Zhipu', 'ChatGLM', 'GLM', 'AutoGLM', 'Chinese AI'],
    'The official Z.ai mark with its broad diagonal and detached horizontal strokes.',
    'purple',
  ),
  entry(
    'minimax', 'MiniMax', 'MiniMax', 'Multimodal models and agent platform',
    'https://www.minimax.io/',
    ['稀宇科技', 'MiniMax Code', 'MiniMax Agent', 'MiniMax Audio', 'Chinese AI'],
    'MiniMax’s original interleaving waveform in a flat coral brand tone.',
    'coral',
  ),
  entry(
    'doubao', 'Doubao', 'ByteDance', 'AI assistant',
    'https://www.doubao.com/',
    ['豆包', 'ByteDance Seed', '字节跳动', 'Chinese AI'],
    'Doubao’s official assistant portrait, vector traced with the original bob haircut, facial features, and blue circle.',
  ),
  entry(
    'ernie', 'ERNIE', 'Baidu', 'AI assistant and model family',
    'https://ernie.baidu.com/',
    ['文心一言', '文心', 'Baidu', '百度', 'ERNIE Bot', 'Chinese AI'],
    'The ERNIE / Wenxin cube mark with its original open geometry and central pillar.',
  ),
  entry(
    'hunyuan', 'Tencent Hunyuan', 'Tencent', 'Multimodal model family',
    'https://hunyuan.tencent.com/',
    ['腾讯混元', '混元', 'Tencent Hy', 'Hy', 'Hunyuan', 'Chinese AI'],
    'Tencent Hunyuan’s official circular blue mark with interlocking curved forms.',
  ),
];
