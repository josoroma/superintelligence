// Agent capabilities and interaction primitives. Every icon is authored as
// original world-space geometry and exported through the shared Scene renderer.
const check = (s, x, y, z, size = 10, mat = 'white') =>
  s.line([[x, y, z + size * .45], [x + size * .35, y, z], [x + size, y, z + size]], mat, 2.4);

export const capabilityIcons = [
  {
    id: 'mcp',
    name: 'MCP / Tool Connector',
    category: 'Agents & control',
    description: 'A universal docking hub connects three distinct tool plugs through visible contact pins.',
    draw(s) {
      s.box(-27, -21, 0, 54, 26, 14, 'neutral', 4);
      s.box(-9, -16, 14, 18, 15, 2, 'blue', 2);
      s.line([[-4, -8.5, 16.2], [4, -8.5, 16.2]], 'white', 2);
      s.line([[0, -12.5, 16.2], [0, -4.5, 16.2]], 'white', 2);
      for (const [x, mat, distance] of [[-18, 'purple', 15], [0, 'blue', 19], [18, 'teal', 15]]) {
        // A dark socket, exposed metal tongue, and longer colored grip give
        // these connectors a different silhouette from the agent network.
        s.poly([[x - 5, 5.1, 4], [x + 5, 5.1, 4], [x + 5, 5.1, 10], [x - 5, 5.1, 10]], 'ink');
        s.box(x - 3, 5.3, 5, 6, distance - 5, 4, 'white', 1);
        s.box(x - 6, distance, 2, 12, 17, 10, mat, 2.5);
        s.line([[x - 3, distance + 5, 12.2], [x + 3, distance + 5, 12.2]], 'white', 1.8);
        s.line([[x, distance + 17, 7], [x, distance + 23, 7]], 'ink', 2.8);
      }
    },
  },
  {
    id: 'skills',
    name: 'Agent Skills',
    category: 'Agents & control',
    description: 'A reusable instruction cartridge slots into an agent chassis to add a capability.',
    draw(s) {
      s.box(-23, -17, 0, 46, 34, 22, 'blue', 4);
      s.box(-16, -5, 22, 32, 10, 2, 'ink', 2);
      s.panel(-12, 1, 21, 24, 31, 'purple');
      s.panel(-8, 1.2, 28, 16, 20, 'white');
      s.line([[-4, 1.4, 43], [4, 1.4, 43]], 'purple', 1.9);
      s.line([[-4, 1.4, 38], [4, 1.4, 38]], 'purple', 1.9);
      s.line([[-4, 1.4, 33], [1, 1.4, 33]], 'purple', 1.9);
      for (const x of [-5, 0, 5]) s.line([[x, 1.4, 22], [x, 1.4, 26]], 'coral', 2);
      s.panel(-12, 17.1, 7, 24, 9, 'ink');
      s.line([[-6, 17.3, 11.5], [6, 17.3, 11.5]], 'white', 2);
      s.dot([17, 17.2, 7], 1.8, 'teal');
    },
  },
  {
    id: 'computer-use',
    name: 'Computer Use',
    category: 'Agents & control',
    description: 'An oversized pointer selects a control in a dimensional browser interface.',
    draw(s) {
      s.panel(-29, 0, 4, 58, 43, 'neutral');
      s.panel(-25, .2, 8, 50, 35, 'white');
      s.line([[-25, .5, 35], [25, .5, 35]], 'neutral', 1.7);
      for (const x of [-20, -14, -8]) s.dot([x, .5, 39.5], 1.5, 'purple');
      s.line([[-19, .5, 27], [-3, .5, 27]], 'ink', 2);
      s.line([[-19, .5, 20], [-8, .5, 20]], 'neutral', 2);
      s.poly([[4, .5, 17], [20, .5, 17], [20, .5, 29], [4, .5, 29]], 'teal');
      // A complete arrow silhouette keeps the pointer legible without a stroke.
      s.poly([[10, 4, 26], [10, 4, 5], [16, 4, 11], [22, 4, 1], [27, 4, 4], [21, 4, 14], [30, 4, 14]], 'purple');
    },
  },
  {
    id: 'voice',
    name: 'Realtime Voice',
    category: 'Agents & control',
    description: 'A microphone hub carries separate incoming and outgoing audio waveforms.',
    draw(s) {
      s.cylinder(0, 0, 0, 16, 5, 'neutral');
      s.box(-3, -3, 5, 6, 6, 11, 'purple', 1);
      // The cradle remains separate from the microphone capsule.
      s.line([[-11, 0, 29], [-11, 0, 21], [-7, 0, 16], [7, 0, 16], [11, 0, 21], [11, 0, 29]], 'ink', 2.4);
      s.cylinder(0, 0, 21, 7, 22, 'blue');
      s.line([[-33, 0, 23], [-30, 0, 23], [-27, 0, 31], [-23, 0, 15], [-19, 0, 28], [-16, 0, 23]], 'teal', 2.7);
      s.line([[16, 0, 23], [19, 0, 23], [22, 0, 31], [26, 0, 15], [30, 0, 28], [34, 0, 23]], 'purple', 2.7);
      s.line([[-3, 7, 32], [3, 7, 32]], 'white', 1.7);
      s.line([[-3, 7, 27], [3, 7, 27]], 'white', 1.7);
    },
  },
  {
    id: 'multimodal',
    name: 'Multimodal',
    category: 'Models & Learning',
    description: 'Image, text, and audio cards converge into one shared model core.',
    draw(s) {
      s.line([[-25, -15, 7], [-25, 11, 7], [0, 19, 7]], 'ink', 1.8);
      s.line([[0, -15, 7], [0, 19, 7]], 'ink', 1.8);
      s.line([[25, -15, 7], [25, 11, 7], [0, 19, 7]], 'ink', 1.8);
      s.panel(-35, -15, 8, 20, 26, 'teal');
      s.poly([[-32, -14.7, 14], [-27, -14.7, 22], [-24, -14.7, 18], [-20, -14.7, 24], [-18, -14.7, 14]], 'white');
      s.dot([-29, -14.5, 28], 1.6, 'white');
      s.panel(-10, -15, 8, 20, 26, 'purple');
      for (const z of [16, 22, 28]) s.line([[-5, -14.7, z], [5, -14.7, z]], 'white', 1.7);
      s.panel(15, -15, 8, 20, 26, 'blue');
      s.line([[19, -14.7, 21], [22, -14.7, 21], [24, -14.7, 28], [27, -14.7, 15], [30, -14.7, 23], [32, -14.7, 21]], 'white', 1.7);
      s.box(-12, 14, 0, 24, 23, 15, 'neutral', 3);
      s.box(-7, 19, 15, 14, 13, 2, 'blue', 2);
      s.dot([0, 25.5, 17.2], 2.2, 'white');
    },
  },
  {
    id: 'human-approval',
    name: 'Human Approval',
    category: 'Agents & control',
    description: 'A checkpoint gate opens only when its manual approval lever is engaged.',
    draw(s) {
      s.box(-28, -15, 0, 56, 35, 4, 'neutral', 3);
      // Route markings pass beneath the gate.
      s.line([[0, -10, 4.2], [0, 16, 4.2]], 'blue', 2.4);
      s.box(-25, -5, 4, 10, 10, 27, 'purple', 2);
      s.box(18, -5, 4, 7, 10, 18, 'neutral', 2);
      s.box(-18, -3, 23, 38, 6, 6, 'teal', 1.5);
      s.line([[-10, 3.2, 26], [0, 3.2, 26], [10, 3.2, 26]], 'white', 2);
      // A broad handle, pivot, and approval badge read as a human checkpoint.
      s.line([[-20, 5.2, 17], [-29, 9, 32]], 'ink', 3);
      s.box(-34, 5, 31, 11, 8, 5, 'coral', 2);
      s.dot([-20, 5.4, 17], 2.6, 'coral');
      s.panel(7, 9, 32, 18, 18, 'teal');
      check(s, 10.5, 9.3, 37, 10);
    },
  },
  {
    id: 'sandbox',
    name: 'Agent Sandbox',
    category: 'Systems & Infrastructure',
    description: 'An isolated execution tray encloses a terminal inside a continuous raised boundary.',
    draw(s) {
      s.box(-29, -24, 0, 58, 48, 5, 'neutral', 4);
      s.box(-29, -24, 5, 58, 5, 13, 'purple', 2);
      s.box(-29, -19, 5, 5, 38, 13, 'purple', 1.5);
      s.panel(-17, 1, 9, 34, 29, 'blue');
      s.panel(-13, 1.2, 13, 26, 21, 'ink');
      s.line([[-8, 1.5, 28], [-3, 1.5, 24], [-8, 1.5, 20]], 'white', 2);
      s.line([[2, 1.5, 19], [8, 1.5, 19]], 'white', 2);
      s.box(24, -19, 5, 5, 38, 13, 'purple', 1.5);
      s.box(-29, 19, 5, 58, 5, 13, 'purple', 2);
      s.line([[-11, 24.2, 11.5], [-3, 24.2, 11.5]], 'white', 2);
      s.line([[3, 24.2, 11.5], [11, 24.2, 11.5]], 'white', 2);
    },
  },
  {
    id: 'context-compaction',
    name: 'Context Compaction',
    category: 'Language & Context',
    description: 'A mechanical press compresses a stack of context cards into a compact retained packet.',
    draw(s) {
      s.box(-25, -21, 0, 50, 42, 5, 'neutral', 3);
      s.box(-24, -19, 5, 6, 6, 39, 'neutral', 1.5);
      s.box(18, -19, 5, 6, 6, 39, 'neutral', 1.5);
      s.box(-24, -19, 40, 48, 10, 6, 'purple', 2);
      s.box(-3, -10, 28, 6, 12, 15, 'ink', 1);
      // Separate layers remain visible below the press head.
      s.box(-14, -10, 5, 28, 25, 3, 'teal', 1.4);
      s.box(-14, -10, 10, 28, 25, 3, 'white', 1.4);
      s.box(-14, -10, 15, 28, 25, 3, 'blue', 1.4);
      s.box(-17, -13, 24, 34, 31, 5, 'purple', 2);
      s.line([[-8, 18.2, 26.5], [8, 18.2, 26.5]], 'white', 2);
      // Downward pressure indicator floats beside the working gap.
      s.line([[30, 4, 31], [30, 4, 16]], 'coral', 2.6);
      s.poly([[25, 4, 20], [30, 4, 14], [35, 4, 20]], 'coral');
    },
  },
];
