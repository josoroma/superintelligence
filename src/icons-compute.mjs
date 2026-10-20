// Original compute objects. The shared Scene owns projection and all five styles.
const fanBlade = (s, cx, cy, z, angle) => {
  const polar = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a), z];
  s.mark([
    polar(3, angle), polar(8, angle - .34), polar(11.6, angle - .25),
    polar(12.2, angle + .08), polar(9.3, angle + .31), polar(4, angle + .35),
  ], 'ink');
};

export const computeIcons = [
  {
    id: 'gpu',
    name: 'GPU',
    category: 'Systems & Infrastructure',
    description: 'A graphics accelerator card with a radial cooling fan, heat-sink fins, and exposed edge-connector contacts.',
    tags: ['GPU', 'graphics processing unit', 'graphics card', 'accelerator', 'compute', 'hardware', 'inference', 'training', 'CUDA'],
    draw(s) {
      // The broad board and its projecting contact tongue establish the card.
      s.box(-34, -20, 0, 68, 40, 3, 'teal', 2.4);
      s.box(-21, 20, .4, 43, 7, 2, 'neutral', .8);
      for (const x of [-18, -12, -6, 0, 10, 16]) {
        s.inlay([[x, 20.2, 2.5], [x + 3.7, 20.2, 2.5], [x + 3.7, 26.7, 2.5], [x, 26.7, 2.5]], 'coral');
      }
      // Heat sink and fan shroud are supported directly by the circuit board.
      s.box(-29, -17, 3, 58, 32, 10, 'neutral', 3);
      for (const x of [20, 24]) {
        s.box(x, -12, 13, 2, 22, 2, 'ink', .6);
      }
      s.cylinder(-6, -1, 13, 14, 1.4, 'white');
      s.ring(-6, -1, 14.5, 12.7, 'ink', 1.3);
      for (let i = 0; i < 6; i++) fanBlade(s, -6, -1, 14.6, i * Math.PI / 3);
      s.cylinder(-6, -1, 14.7, 3.5, 1, 'blue');
      // The end bracket is taller than the board and has one inset video port.
      s.box(-36, -21, 0, 4, 42, 17, 'neutral', 1);
      s.poly([[-36.1, -12, 5], [-36.1, 5, 5], [-36.1, 5, 12], [-36.1, -12, 12]], 'ink');
      s.line([[-36.2, -9, 8.5], [-36.2, 2, 8.5]], 'white', 1.4);
    },
  },
  {
    id: 'quantization',
    name: 'Quantization',
    category: 'Models & Learning',
    description: 'A smooth precision profile is approximated by three broad, discrete levels in a stepped sampling gauge.',
    tags: ['quantization', 'quantize', 'model compression', 'reduced precision', 'low precision', 'INT8', 'INT4', 'FP16', 'GGUF', 'discrete levels'],
    draw(s) {
      s.box(-32, -20, 0, 64, 43, 4, 'neutral', 3);
      // The rear profile gives a continuous reference without a chart frame.
      s.panel(-29, -14, 4, 58, 40, 'white');
      const curve = Array.from({length: 33}, (_, i) => {
        const t = i / 32;
        return [-24 + 48 * t, -13.7, 39 - 28 * (t * t * (3 - 2 * t))];
      });
      s.line(curve, 'purple', 2.6);
      s.dot(curve[0], 1.9, 'purple');
      s.dot(curve.at(-1), 1.9, 'purple');
      // Coarse solid levels replace that precision with three reproducible bins.
      // Increasing x comes toward the camera. Each face mark shares its solid's
      // paint order so a nearer tier can correctly hide the farther one.
      for (const [x, h] of [[-19, 31], [0, 22], [19, 13]]) {
        s.box(x - 9, -5, 4, 18, 22, h - 4, 'blue', 1.8);
        s.line([[x - 4, 4, h + .2], [x + 4, 4, h + .2]], 'white', 2.1);
      }
      // Three calibrated notches belong to the instrument's front lip.
      for (const x of [-19, 0, 19]) {
        s.line([[x, 23.1, 1], [x, 23.1, 3.5]], 'ink', 1.4);
      }
    },
  },
];
