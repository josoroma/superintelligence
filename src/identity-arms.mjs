/**
 * Eight articulated arms for the SuperIntelligence identity.
 *
 * The two layers let the thorax occlude the rear sockets while the front
 * arms remain above its lower rim. All geometry is native SVG, with no
 * gradients, clipping, filters, or background-dependent cutouts.
 */

const ARMS = [
  {
    layer: 'back', width: 16, tip: 5.2, joints: 9,
    curves: [
      [[105, 174], [87, 177], [80, 157], [61, 155]],
      [[61, 155], [39, 153], [24, 139], [25, 119]],
      [[25, 119], [25, 103], [37, 96], [51, 100]],
    ],
  },
  {
    layer: 'back', width: 16, tip: 5.2, joints: 9,
    curves: [
      [[153, 174], [173, 177], [175, 158], [194, 157]],
      [[194, 157], [217, 156], [232, 141], [233, 122]],
      [[233, 122], [233, 106], [221, 98], [205, 101]],
    ],
  },
  {
    layer: 'back', width: 14, tip: 5, joints: 9,
    curves: [
      [[109, 181], [91, 182], [89, 199], [86, 216]],
      [[86, 216], [82, 236], [68, 242], [56, 234]],
      [[56, 234], [51, 231], [48, 227], [47, 223]],
    ],
  },
  {
    layer: 'back', width: 14, tip: 5, joints: 9,
    curves: [
      [[156, 180], [174, 167], [197, 169], [211, 182]],
      [[211, 182], [227, 197], [224, 214], [209, 221]],
      [[209, 221], [203, 224], [198, 225], [192, 225]],
    ],
  },
  {
    layer: 'front', width: 15, tip: 4.2, joints: 10,
    curves: [
      [[119, 190], [122, 208], [108, 219], [106, 230]],
      [[106, 230], [104, 240], [110, 244], [116, 242]],
    ],
  },
  {
    layer: 'front', width: 14, tip: 4.5, joints: 9,
    curves: [
      [[136, 190], [143, 204], [151, 220], [141, 231]],
      [[141, 231], [135, 238], [126, 235], [126, 243]],
    ],
  },
  {
    layer: 'front', width: 17, tip: 5, joints: 10,
    curves: [
      [[109, 182], [107, 201], [92, 215], [72, 214]],
      [[72, 214], [52, 213], [42, 194], [28, 196]],
      [[28, 196], [20, 197], [16, 204], [18, 211]],
    ],
  },
  {
    layer: 'front', width: 17, tip: 5, joints: 10,
    curves: [
      [[146, 182], [148, 201], [162, 208], [181, 216]],
      [[181, 216], [204, 225], [208, 238], [192, 241]],
      [[192, 241], [186, 243], [181, 242], [176, 240]],
    ],
  },
];

const f = n => Number(n.toFixed(2));
const xy = p => `${f(p[0])},${f(p[1])}`;
const add = (a, b, scale = 1) => [a[0] + b[0] * scale, a[1] + b[1] * scale];
const mix = (a, b, t) => a + (b - a) * t;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// Keep the generated ribbon within 0.04 SVG units of the sampled curve.
// This removes redundant line segments without altering tips or joint bands.
function simplify(points, tolerance = 0.04) {
  if (points.length < 3) return points;
  const first = points[0], last = points.at(-1);
  const dx = last[0] - first[0], dy = last[1] - first[1];
  const lengthSquared = dx * dx + dy * dy;
  let furthest = 0, split = -1;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const t = lengthSquared ? clamp(((x - first[0]) * dx + (y - first[1]) * dy) / lengthSquared, 0, 1) : 0;
    const distanceSquared = (x - first[0] - t * dx) ** 2 + (y - first[1] - t * dy) ** 2;
    if (distanceSquared > furthest) {
      furthest = distanceSquared;
      split = i;
    }
  }
  if (furthest <= tolerance * tolerance) return [first, last];
  return [
    ...simplify(points.slice(0, split + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(split), tolerance),
  ];
}

function cubic(c, t) {
  const q = 1 - t;
  return [0, 1].map(i =>
    q * q * q * c[0][i] + 3 * q * q * t * c[1][i] +
    3 * q * t * t * c[2][i] + t * t * t * c[3][i]);
}

function samples(arm) {
  const points = arm.curves.flatMap((curve, i) =>
    Array.from({ length: 41 }, (_, j) => cubic(curve, j / 40)).slice(i ? 1 : 0));
  const distance = [0];
  for (let i = 1; i < points.length; i++) {
    distance.push(distance[i - 1] + Math.hypot(
      points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  }
  const total = distance.at(-1);
  return points.map((center, i) => {
    const before = points[Math.max(0, i - 1)];
    const after = points[Math.min(points.length - 1, i + 1)];
    const length = Math.hypot(after[0] - before[0], after[1] - before[1]);
    const tangent = [(after[0] - before[0]) / length, (after[1] - before[1]) / length];
    const normal = [-tangent[1], tangent[0]];
    const progress = distance[i] / total;
    // The proximal links retain their diameter; the last third tapers.
    const taper = Math.pow(clamp((progress - 0.22) / 0.78, 0, 1), 1.3);
    const radius = mix(arm.width, arm.tip, taper) / 2;
    return { center, tangent, normal, progress, radius };
  });
}

function ribbon(data, a, b) {
  const left = simplify(data.map(s => add(s.center, s.normal, s.radius * a)));
  const right = simplify(data.map(s => add(s.center, s.normal, s.radius * b))).reverse();
  return `M${left.map(xy).join('L')}L${right.map(xy).join('L')}Z`;
}

function joint(data, t) {
  const s = data.reduce((best, candidate) =>
    Math.abs(candidate.progress - t) < Math.abs(best.progress - t) ? candidate : best);
  const start = add(s.center, s.normal, s.radius * -0.91);
  const end = add(s.center, s.normal, s.radius * 0.91);
  const middle = add(s.center, s.tangent, 1.6);
  return `M${xy(start)}Q${xy(middle)} ${xy(end)}`;
}

function armSvg(arm, p) {
  const data = samples(arm);
  const contour = ribbon(data, -1, 1);
  const segments = Array.from({ length: arm.joints }, (_, i) =>
    joint(data, mix(0.06, 0.94, i / (arm.joints - 1))));
  if (p.mono) return `<path d="${contour}" fill="${p.ink}" stroke="${p.ink}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>`;
  const shadow = ribbon(data, 0.36, 0.97);
  const highlight = ribbon(data, -0.78, -0.47);
  return `<g stroke-linecap="round" stroke-linejoin="round">
    <path d="${contour}" fill="${p.metal}" stroke="${p.outline}" stroke-width="2.3"/>
    <path d="${shadow}" fill="${p.metalDark}"/>
    <path d="${highlight}" fill="${p.metalLight}"/>
    ${segments.map(d => `<path d="${d}" fill="none" stroke="${p.outline}" stroke-width="1.8"/>`).join('')}
  </g>`;
}

/**
 * @param {{outline:string,metal:string,metalLight:string,metalDark:string,mono?:boolean,ink:string}} p
 * @returns {{back:string,front:string,cuts:string,backCuts:string,frontCuts:string}}
 */
export function roboticArms(p) {
  const cutLayer = layer => p.mono ? ARMS.filter(arm => arm.layer === layer).map(arm => {
    const data = samples(arm);
    return Array.from({ length: arm.joints }, (_, i) =>
      `<path d="${joint(data, mix(0.06, 0.94, i / (arm.joints - 1)))}" fill="none" stroke="#000000" stroke-width="1.15" stroke-linecap="round"/>`).join('');
  }).join('') : '';
  const backCuts = cutLayer('back');
  const frontCuts = cutLayer('front');
  return {
    back: ARMS.filter(arm => arm.layer === 'back').map(arm => armSvg(arm, p)).join('\n'),
    front: ARMS.filter(arm => arm.layer === 'front').map(arm => armSvg(arm, p)).join('\n'),
    cuts: backCuts + frontCuts,
    backCuts,
    frontCuts,
  };
}
