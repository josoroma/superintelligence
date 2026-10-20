// Original isometric systems icons. Coordinates are world-space x, y, z.
// Shared construction: rounded solids, 1.6px exterior edges, opaque face details.
export const systemIcons = [
  {
    id: 'reasoning',
    name: 'Reasoning Path',
    category: 'Intelligence',
    description: 'A connected series of rising steps represents a structured reasoning trace.',
    draw(s) {
      s.box(-28, -10, 0, 17, 20, 7, 'neutral');
      s.box(-6, -10, 0, 17, 20, 18, 'purple');
      s.box(16, -10, 0, 17, 20, 30, 'blue');
      s.line([[-19.5, 0, 11], [-9, 0, 11], [-9, 0, 22], [2.5, 0, 22], [13, 0, 22], [13, 0, 34], [24.5, 0, 34]], 'ink', 1.8);
      s.dot([-19.5, 0, 11], 2.3, 'teal');
      s.dot([2.5, 0, 22], 2.3, 'purple');
      s.dot([24.5, 0, 34], 2.3, 'blue');
      s.line([[21, 0, 38], [25, 0, 34], [21, 0, 30]], 'ink', 1.8);
    },
  },
  {
    id: 'tools',
    name: 'Tool Use',
    category: 'Systems',
    description: 'A precise open-end wrench meets a processor, representing callable tools.',
    draw(s) {
      for (const x of [-12, 0, 12]) {
        s.box(x - 2, -24, 2, 4, 7, 3, 'neutral', 1);
        s.box(x - 2, 17, 2, 4, 7, 3, 'neutral', 1);
      }
      s.box(-22, -17, 0, 44, 34, 8, 'neutral', 3);
      s.box(-14, -11, 8, 28, 22, 4, 'blue', 2);
      // A single strong fork silhouette keeps the tool readable when small.
      const wrench = [
        [-14, 6, 13], [-18, 6, 17], [-15, 6, 22],
        [1, 6, 36], [0, 6, 43], [5, 6, 49], [11, 6, 50],
        [7, 6, 44], [12, 6, 39], [18, 6, 43], [18, 6, 36],
        [12, 6, 31], [6, 6, 31], [-9, 6, 15],
      ];
      s.poly(wrench.map(([x, y, z]) => [x, y - 3, z]), 'neutral');
      s.poly([[18, 3, 43], [18, 3, 36], [12, 3, 31], [12, 6, 31], [18, 6, 36], [18, 6, 43]], 'purple');
      s.poly(wrench, 'purple');
      s.dot([-12, 6.1, 18], 1.8, 'white');
    },
  },
  {
    id: 'memory',
    name: 'Long-term Memory',
    category: 'Knowledge',
    description: 'Three retained archive cartridges form a durable, indexed memory bank.',
    draw(s) {
      s.box(-23, -15, 0, 46, 30, 9, 'neutral', 2);
      s.box(-23, -15, 10, 46, 30, 9, 'neutral', 2);
      s.box(-23, -15, 20, 46, 30, 10, 'blue', 2);
      for (const z of [4.5, 14.5, 25]) {
        s.line([[-15, 15.1, z], [-1, 15.1, z]], 'ink', 1.6);
        s.dot([15, 15.1, z], 1.5, z === 25 ? 'white' : 'teal');
      }
      s.poly([[-10, -8, 30.1], [6, -8, 30.1], [10, -4, 30.1], [10, 7, 30.1], [-10, 7, 30.1]], 'white');
      s.line([[-5, -3, 30.2], [4, -3, 30.2]], 'ink', 1.4);
      s.line([[-5, 2, 30.2], [1, 2, 30.2]], 'ink', 1.4);
    },
  },
  {
    id: 'orchestration',
    name: 'Workflow Engine',
    category: 'Systems',
    description: 'A central routing engine distributes work through three connected modules.',
    draw(s) {
      s.line([[-24, -24, 5], [-24, 0, 5], [0, 0, 5]], 'ink', 1.8);
      s.line([[27, -12, 5], [27, 0, 5], [0, 0, 5]], 'ink', 1.8);
      s.line([[0, 0, 5], [0, 27, 5], [-12, 27, 5]], 'ink', 1.8);
      s.box(-31, -31, 0, 14, 14, 14, 'purple', 2);
      s.line([[-27, -24, 14.1], [-21, -24, 14.1]], 'white', 1.8);
      s.box(20, -19, 0, 14, 14, 10, 'teal', 2);
      s.line([[24, -12, 10.1], [30, -12, 10.1]], 'white', 1.8);
      s.box(-11, -11, 0, 22, 22, 12, 'neutral', 3);
      s.box(-6, -6, 12, 12, 12, 4, 'blue', 2);
      s.dot([0, 0, 16.1], 2.1, 'white');
      s.box(-19, 20, 0, 14, 14, 10, 'coral', 2);
      s.line([[-15, 27, 10.1], [-9, 27, 10.1]], 'white', 1.8);
    },
  },
  {
    id: 'evaluation',
    name: 'Evaluation',
    category: 'Governance',
    description: 'Ascending benchmark bars and a passing checkmark on a measurement display.',
    draw(s) {
      s.box(-15, -12, 0, 30, 23, 4, 'neutral', 2);
      s.box(-3, -5, 4, 6, 6, 8, 'neutral', 1);
      s.panel(-27, 0, 10, 54, 37, 'neutral');
      s.line([[-20, 0.1, 17], [20, 0.1, 17]], 'ink', 1.5);
      s.poly([[-18, 0.2, 17], [-18, 0.2, 26], [-11, 0.2, 26], [-11, 0.2, 17]], 'purple');
      s.poly([[-6, 0.2, 17], [-6, 0.2, 33], [1, 0.2, 33], [1, 0.2, 17]], 'blue');
      s.poly([[6, 0.2, 17], [6, 0.2, 39], [13, 0.2, 39], [13, 0.2, 17]], 'teal');
      s.line([[16, 0.2, 37], [20, 0.2, 33], [27, 0.2, 42]], 'ink', 2.1);
    },
  },
  {
    id: 'alignment',
    name: 'Alignment & Safety',
    category: 'Governance',
    description: 'A thick protective shield with a verified center represents aligned boundaries.',
    draw(s) {
      const shield = [
        [-23, 4, 42], [0, 4, 50], [23, 4, 42],
        [21, 4, 23], [14, 4, 10], [0, 4, 0],
        [-14, 4, 10], [-21, 4, 23],
      ];
      const rear = shield.map(([x, y, z]) => [x, y - 7, z]);
      s.poly(rear, 'neutral');
      s.poly([rear[2], rear[3], rear[4], rear[5], shield[5], shield[4], shield[3], shield[2]], 'neutral');
      s.poly([rear[0], rear[1], rear[2], shield[2], shield[1], shield[0]], 'neutral');
      s.poly(shield, 'neutral');
      s.poly([
        [-16, 4.1, 37], [0, 4.1, 43], [16, 4.1, 37],
        [14, 4.1, 24], [9, 4.1, 15], [0, 4.1, 8],
        [-9, 4.1, 15], [-14, 4.1, 24],
      ], 'teal');
      s.line([[-8, 4.2, 27], [-2, 4.2, 21], [9, 4.2, 33]], 'white', 2.8);
    },
  },
  {
    id: 'inference',
    name: 'Inference',
    category: 'Intelligence',
    description: 'A processor emits one decisive energy bolt to symbolize generated output.',
    draw(s) {
      for (const x of [-11, 0, 11]) {
        s.box(x - 2, -24, 2, 4, 7, 3, 'neutral', 1);
        s.box(x - 2, 17, 2, 4, 7, 3, 'neutral', 1);
      }
      s.box(-21, -17, 0, 42, 34, 8, 'neutral', 3);
      s.box(-13, -10, 8, 26, 20, 6, 'blue', 2);
      const bolt = [
        [7, 9, 50], [-13, 9, 28], [-3, 9, 28],
        [-8, 9, 13], [16, 9, 37], [5, 9, 37],
      ];
      s.poly(bolt.map(([x, y, z]) => [x, y - 3, z]), 'neutral');
      s.poly([[7, 6, 50], [-13, 6, 28], [-13, 9, 28], [7, 9, 50]], 'coral');
      s.poly(bolt, 'coral');
    },
  },
  {
    id: 'knowledge-graph',
    name: 'Knowledge Graph',
    category: 'Knowledge',
    description: 'A central knowledge node connects distinct concepts across an open network.',
    draw(s) {
      const nodes = [[-25, -13, 6, 'purple'], [0, -27, 6, 'blue'], [25, -7, 6, 'teal'], [-20, 20, 6, 'teal'], [12, 24, 6, 'purple']];
      for (const [x, y] of nodes) s.line([[0, 0, 6], [x, y, 6]], 'ink', 1.8);
      s.line([[-25, -13, 6], [0, -27, 6], [25, -7, 6]], 'ink', 1.8);
      s.line([[-20, 20, 6], [12, 24, 6]], 'ink', 1.8);
      s.cylinder(0, -27, 0, 6, 10, 'blue');
      s.cylinder(-25, -13, 0, 6, 10, 'purple');
      s.cylinder(25, -7, 0, 6, 10, 'teal');
      s.cylinder(0, 0, 0, 10, 17, 'neutral');
      s.dot([0, 0, 17.1], 2.7, 'blue');
      s.cylinder(-20, 20, 0, 6, 10, 'teal');
      s.cylinder(12, 24, 0, 6, 10, 'purple');
    },
  },
  {
    id: 'prompt',
    name: 'Prompt Engineering',
    category: 'Knowledge',
    description: 'An isometric command terminal with an input caret and waiting cursor.',
    draw(s) {
      s.box(-26, -11, 0, 52, 29, 5, 'neutral', 3);
      s.panel(-24, -5, 5, 48, 36, 'neutral');
      s.poly([[-19, -4.9, 10], [19, -4.9, 10], [19, -4.9, 32], [-19, -4.9, 32]], 'blue');
      for (const x of [-17, -11, -5]) s.dot([x, -4.9, 36], 1.15, x === -17 ? 'coral' : 'ink');
      s.line([[-12, -4.8, 26], [-6, -4.8, 21], [-12, -4.8, 16]], 'white', 2.2);
      s.line([[0, -4.8, 16], [11, -4.8, 16]], 'white', 2.2);
      s.line([[-17, 8, 5.1], [17, 8, 5.1]], 'ink', 1.4);
      s.line([[-11, 13, 5.1], [11, 13, 5.1]], 'ink', 1.4);
    },
  },
  {
    id: 'self-play',
    name: 'Self-Play',
    category: 'Learning',
    description: 'Two competing strategy nodes exchange moves around a shared game surface.',
    draw(s) {
      s.line([[-20, -4, 6], [-20, -23, 6], [20, -23, 6], [20, -4, 6]], 'ink', 1.8);
      s.line([[16, -11, 6], [20, -4, 6], [24, -11, 6]], 'ink', 1.8);
      s.box(-15, -14, 0, 30, 28, 4, 'neutral', 2);
      s.poly([[-12, -11, 4.1], [0, -11, 4.1], [0, 0, 4.1], [-12, 0, 4.1]], 'purple');
      s.poly([[0, 0, 4.1], [12, 0, 4.1], [12, 11, 4.1], [0, 11, 4.1]], 'purple');
      s.cylinder(-23, 1, 0, 7, 6, 'neutral');
      s.box(-28, -4, 6, 10, 10, 14, 'blue', 2);
      s.box(-29, -5, 20, 12, 12, 5, 'blue', 2);
      s.cylinder(23, 1, 0, 7, 6, 'neutral');
      s.box(18, -4, 6, 10, 10, 14, 'coral', 2);
      s.box(17, -5, 20, 12, 12, 5, 'coral', 2);
      s.line([[20, 8, 6], [20, 24, 6], [-20, 24, 6], [-20, 8, 6]], 'ink', 1.8);
      s.line([[-24, 15, 6], [-20, 8, 6], [-16, 15, 6]], 'ink', 1.8);
    },
  },
];
