import {roboticArms} from './identity-arms.mjs';

// Original vector artwork based on the supplied robotic-brain direction.
// Geometry is drawn on a 256-unit canvas and remains independent of the wordmark.
const leftCortex='M125 18C120 8 107 8 100 17C87 14 78 22 77 33C67 37 63 49 68 58C61 70 66 84 77 88H125Z';
const rightCortex='M131 18C136 8 149 8 156 17C169 14 178 22 179 33C189 37 193 49 188 58C195 70 190 84 179 88H131Z';
const folds=[
  'M120 20C110 20 103 25 102 31C91 27 84 34 85 43',
  'M102 31C111 30 118 39 114 48',
  'M85 43C72 44 71 57 78 63',
  'M114 48C105 46 98 53 101 60C94 64 88 59 88 53',
  'M78 63C72 69 76 78 83 81',
  'M101 60C111 60 119 68 116 75',
  'M88 67C84 75 91 82 99 81',
  'M136 21C145 19 154 25 154 32C165 28 174 35 172 44',
  'M154 32C143 33 140 39 143 47',
  'M172 44C184 44 186 54 178 62',
  'M143 47C153 45 160 53 157 61C163 64 171 58 169 52',
  'M178 62C185 69 180 78 174 80',
  'M157 61C146 59 137 67 141 77',
  'M169 67C173 75 166 81 157 81',
];
const foldMarkup=(color,width=3)=>`<g fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${folds.map(d=>`<path d="${d}"/>`).join('')}</g>`;

export function roboticBrain({monochrome=null,id='superintelligence-robot'}={}) {
  const mono=Boolean(monochrome);
  const p={
    mono,ink:monochrome,
    outline:monochrome||'#172437',
    metal:monochrome||'#5F6C80',
    metalLight:monochrome||'#A5B1C1',
    metalDark:monochrome||'#354257',
    brain:monochrome||'#E597A9',
    brainLight:monochrome||'#F5BAC4',
    brainDark:monochrome||'#A85978',
    brainEdge:monochrome||'#70475E',
    lens:monochrome||'#163E56',
    lensLight:monochrome||'#2B7EA6',
  };
  const arms=roboticArms(p);
  const lenses=[99,157].map(x=>`<g>
    <circle cx="${x}" cy="121" r="23" fill="${p.metalDark}" stroke="${p.outline}" stroke-width="3"/>
    <circle cx="${x}" cy="121" r="18.5" fill="${p.metalLight}"/>
    <circle cx="${x}" cy="121" r="14.5" fill="${p.lens}" stroke="${p.outline}" stroke-width="2.5"/>
    <path d="M${x-12} 122C${x-12} 113 ${x-5} 108 ${x+2} 109C${x-5} 112 ${x-9} 120 ${x-9} 129Z" fill="${p.lensLight}"/>
    <circle cx="${x-4}" cy="111" r="2.1" fill="${mono?p.ink:'#C5F0FA'}"/>
    <path d="M${x-13} 105A20.5 20.5 0 0 1 ${x+13} 105" fill="none" stroke="${p.metalLight}" stroke-width="1.4" stroke-linecap="round"/>
  </g>`).join('');
  const cuts=mono?`<defs><mask id="${id}-detail" x="0" y="0" width="256" height="256" maskUnits="userSpaceOnUse">
    <rect width="256" height="256" fill="#FFFFFF"/>
    ${foldMarkup('#000000',2.8)}
    <g fill="none" stroke="#000000" stroke-linecap="round">
      <path d="M78 95H178M83 148Q128 156 173 148M108 162Q128 169 148 162M99 171Q128 182 159 171" stroke-width="2.2"/>
      <path d="M118 187H138M118 192H138" stroke-width="1.8"/>
      ${[99,157].map(x=>`<circle cx="${x}" cy="121" r="18.5" stroke-width="2.4"/><circle cx="${x}" cy="121" r="12.5" stroke-width="1.4"/>`).join('')}
    </g>
    <g fill="#000000"><circle cx="95" cy="111" r="2.1"/><circle cx="153" cy="111" r="2.1"/></g>
  </mask>
  <mask id="${id}-back-joints" x="0" y="0" width="256" height="256" maskUnits="userSpaceOnUse"><rect width="256" height="256" fill="#FFFFFF"/>${arms.backCuts||''}</mask>
  <mask id="${id}-front-joints" x="0" y="0" width="256" height="256" maskUnits="userSpaceOnUse"><rect width="256" height="256" fill="#FFFFFF"/>${arms.frontCuts||''}</mask>
  </defs>`:'';
  return `${cuts}<g${mono?` mask="url(#${id}-detail)"`:''} stroke-linejoin="round" stroke-linecap="round">
    <g${mono?` mask="url(#${id}-back-joints)"`:''}>${arms.back}</g>
    <path d="M103 149H153V160Q152 170 128 170Q104 169 103 160Z" fill="${p.metalDark}" stroke="${p.outline}" stroke-width="3"/>
    <path d="M96 169Q128 157 160 169L173 190Q128 211 83 190Z" fill="${p.metal}" stroke="${p.outline}" stroke-width="3"/>
    <path d="M98 170Q128 184 158 170" fill="none" stroke="${p.metalLight}" stroke-width="2.5"/>
    <path d="M113 183H143V197H113Z" fill="${p.metalDark}"/>
    <path d="M118 187H138M118 192H138" fill="none" stroke="${p.metalLight}" stroke-width="1.5"/>
    <rect x="54" y="108" width="12" height="24" rx="4" fill="${p.metalDark}" stroke="${p.outline}" stroke-width="2.5"/>
    <rect x="190" y="108" width="12" height="24" rx="4" fill="${p.metalDark}" stroke="${p.outline}" stroke-width="2.5"/>
    <path d="M75 92H181Q192 92 192 105V133Q192 151 175 153H81Q64 151 64 134V105Q64 92 75 92Z" fill="${p.metal}" stroke="${p.outline}" stroke-width="3.2"/>
    <path d="M76 94H180L184 100H72Z" fill="${p.metalLight}"/>
    <path d="M68 134Q78 145 94 145H175Q184 144 189 137Q185 151 175 153H81Q70 150 68 142Z" fill="${p.metalDark}"/>
    <path d="M123 112H133V117H123Z" fill="${p.metalLight}"/>
    ${lenses}
    <rect x="66" y="85" width="124" height="11" rx="4" fill="${p.metalDark}" stroke="${p.outline}" stroke-width="2.5"/>
    <path d="M73 90H183" fill="none" stroke="${p.metalLight}" stroke-width="2"/>
    <path d="${leftCortex}" fill="${p.brain}" stroke="${p.brainEdge}" stroke-width="2.3"/>
    <path d="${rightCortex}" fill="${p.brain}" stroke="${p.brainEdge}" stroke-width="2.3"/>
    <path d="M69 64C78 72 83 65 88 75C99 72 110 82 124 77V87H77C67 84 64 75 69 64Z" fill="${p.brainDark}"/>
    <path d="M132 77C146 82 157 72 169 75C174 65 179 72 187 64C192 75 189 84 179 87H132Z" fill="${p.brainDark}"/>
    <path d="M80 33C81 23 89 18 101 21C106 13 115 12 121 17" fill="none" stroke="${p.brainLight}" stroke-width="2.8"/>
    <path d="M135 17C142 12 150 13 155 21C167 18 176 25 177 34" fill="none" stroke="${p.brainLight}" stroke-width="2.8"/>
    ${mono?'':foldMarkup(p.brainEdge)}
    <g${mono?` mask="url(#${id}-front-joints)"`:''}>${arms.front}</g>
  </g>`;
}
