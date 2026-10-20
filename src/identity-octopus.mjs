// Original, editable vector identity inspired by the supplied neon octopus.
// One continuous contour keeps the head and eight arms organically connected.
// No surrounding tiles, connectors, pictograms, or embedded raster artwork.
const right = [
  [367,30,393,63,393,104],
  [393,128,384,145,381,161],
  [378,173,383,184,373,195],
  [365,214,374,226,394,221],
  [414,217,412,180,443,174],
  [481,169,485,146,482,114],
  [477,76,495,50,539,49],
  [557,49,572,52,581,54],
  [560,53,540,58,525,66],
  [502,79,507,112,502,142],
  [500,177,480,193,449,199],
  [425,205,430,232,411,243],
  [398,252,388,250,382,248],
  [376,246,375,248,380,252],
  [397,265,416,250,439,243],
  [466,235,481,255,507,243],
  [532,230,541,204,568,200],
  [589,197,604,199,615,201],
  [587,198,569,214,556,237],
  [535,273,501,279,470,266],
  [448,256,433,280,404,271],
  [388,267,375,258,368,251],
  [362,245,360,247,363,255],
  [374,282,389,289,421,285],
  [467,279,490,295,507,324],
  [523,350,552,351,581,345],
  [548,361,519,369,492,349],
  [467,330,461,308,422,311],
  [385,316,360,301,351,283],
  [347,275,344,275,346,284],
  [353,309,390,322,399,351],
  [410,385,383,400,367,387],
  [358,380,360,370,367,369],
  [377,367,374,378,380,378],
  [393,376,390,362,381,351],
  [358,329,330,315,326,282],
  [323,271,322,260,320,260],
];
const start=[320,30];
const mirror=([x,y])=>[640-x,y];
const points=[start,...right.map(c=>c.slice(4))];
const reflected=right.map((c,i)=>[
  ...mirror(c.slice(2,4)),...mirror(c.slice(0,2)),...mirror(points[i]),
]).reverse();
const contour=`M${start.join(' ')}${[...right,...reflected].map(c=>'C'+c.join(' ')).join('')}Z`;

// Small paired suckers follow the arm interiors, rather than mechanical bands.
const cups=[
  [407,226,2.6,1.5,-42],[418,211,2.7,1.7,-52],[433,194,2.8,1.8,-24],
  [455,184,3.0,1.8,-24],[479,166,3.0,1.8,-49],[490,144,2.8,1.6,-78],
  [491,120,2.5,1.5,-88],[491,99,2.1,1.3,-80],[499,79,1.7,1.1,-52],
  [414,259,2.8,1.8,-7],[439,251,3.2,2.1,0],[464,253,3.1,2.0,11],
  [489,260,3.1,2.1,-6],[514,253,2.7,1.8,-24],[535,238,2.4,1.6,-42],
  [551,220,1.9,1.2,-45],[568,207,1.4,1.0,-16],
  [380,290,2.8,1.8,30],[404,298,3.1,2.1,8],[430,298,3.2,2.1,0],
  [455,304,3.0,2.0,20],[477,320,2.8,1.8,42],[496,339,2.3,1.5,40],
  [517,351,1.9,1.2,13],[538,354,1.4,1.0,-5],
  [343,311,2.7,1.7,57],[357,329,2.8,1.8,45],[377,345,2.8,1.8,49],
  [391,365,2.5,1.6,79],[388,382,2.0,1.3,-36],[374,386,1.3,0.9,14],
];
const eyes='<ellipse cx="281" cy="178" rx="11.5" ry="15.5" transform="rotate(-17 281 178)"/><ellipse cx="359" cy="178" rx="11.5" ry="15.5" transform="rotate(17 359 178)"/>';
const cupMarkup=(stroke,opacity)=>`<g fill="none" stroke="${stroke}" stroke-width="1.5" opacity="${opacity}">${cups.flatMap(([x,y,rx,ry,a])=>[[x,y,a],[640-x,y,-a]].map(([cx,cy,angle])=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${angle} ${cx} ${cy})"/>`)).join('')}</g>`;

export function neonOctopus({monochrome=null,id='superintelligence-octopus'}={}) {
  if(monochrome) return `<defs><mask id="${id}-detail" x="0" y="0" width="640" height="420" maskUnits="userSpaceOnUse"><rect width="640" height="420" fill="#FFFFFF"/><g fill="#000000">${eyes}</g>${cupMarkup('#000000',1)}</mask></defs><path d="${contour}" fill="${monochrome}" stroke="${monochrome}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" mask="url(#${id}-detail)"/>`;
  const line=`url(#${id}-spectrum)`;
  return `<defs>
    <linearGradient id="${id}-spectrum" x1="220" y1="150" x2="420" y2="150" gradientUnits="userSpaceOnUse"><stop stop-color="#E679FF"/><stop offset=".32" stop-color="#BD52FF"/><stop offset=".53" stop-color="#7474FF"/><stop offset=".78" stop-color="#28B8FF"/><stop offset="1" stop-color="#53E0FF"/></linearGradient>
    <radialGradient id="${id}-body" cx="320" cy="120" r="290" gradientUnits="userSpaceOnUse"><stop stop-color="#0D1029"/><stop offset=".65" stop-color="#080C1B"/><stop offset="1" stop-color="#0B142C"/></radialGradient>
    <filter id="${id}-glow" x="-12%" y="-15%" width="124%" height="130%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="3.8"/></filter>
    <filter id="${id}-eye-glow" x="-100%" y="-80%" width="300%" height="260%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="4.5"/></filter>
  </defs>
  <g stroke-linecap="round" stroke-linejoin="round">
    <path d="${contour}" fill="none" stroke="${line}" stroke-width="7.5" opacity=".5" filter="url(#${id}-glow)"/>
    <path d="${contour}" fill="url(#${id}-body)" stroke="${line}" stroke-width="4.8"/>
    <path d="M264 103C265 70 286 48 311 44M326 43C353 45 375 68 380 95" fill="none" stroke="${line}" stroke-width="1.2" opacity=".22"/>
    ${cupMarkup(line,.82)}
    <g fill="${line}" opacity=".58" filter="url(#${id}-eye-glow)">${eyes}</g>
    <g fill="${line}">${eyes}</g>
  </g>`;
}
