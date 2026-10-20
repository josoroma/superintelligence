import {logoTile} from './brand-kit.mjs';
import {featuredLogos} from './logos/featured.mjs';

const entry=(id,name,organization,productType,website,description,tags,accent)=>{
  const logo=featuredLogos[id];
  return {
    id,name,collection:'brands',category:'Agents & platforms',
    brand:{
      organization,productType,website,reference:logo.reference,
      artwork:'Brand mark in isometric presentation',
      assetSource:logo.source,assetLicense:logo.license,assetNotes:logo.notes,
    },
    description,tags,
    draw:s=>logoTile(s,logo,accent),
  };
};

export const featuredBrandIcons=[
  entry('hermes','Hermes Agent','Nous Research','Autonomous agent',
    'https://hermes-agent.nousresearch.com/',
    'The original Hermes portrait preserves the detailed bob, headband, and facial features.',
    ['nous','hermes agent','autonomous','open source'],'teal'),
  entry('grok','Grok Bot','xAI','AI agent',
    'https://x.ai/bot',
    'Grok’s original orbital silhouette and diagonal cut remain intact on an isometric tile.',
    ['grok','grok bot','xai','spacexai','spacexsi'],'ink'),
  entry('meta-muse','Meta Muse','Meta','Personal AI agent',
    'https://muse.ai/',
    'Muse’s flowing blue squiggle uses the original curves and proportions.',
    ['muse','meta','muse spark','personal agent'],'blue'),
  entry('claude','Claude','Anthropic','AI assistant',
    'https://claude.com/',
    'Claude’s terracotta symbol retains its irregular rays and original outline.',
    ['anthropic','claude code','claude cowork','assistant'],'coral'),
  entry('openai','OpenAI','OpenAI','AI platform',
    'https://openai.com/',
    'The OpenAI blossom preserves its six interwoven loops and precise negative spaces.',
    ['chatgpt','gpt','codex','open ai','openai'],'ink'),
];
