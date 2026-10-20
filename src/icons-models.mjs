// Isometric model and context objects. World units, z up; the shared Scene
// renderer owns projection, flat face tones, outlines, and export bounds.
export const modelIcons = [
  {
    id: 'llm',
    name: 'Large Language Model',
    category: 'Models & Learning',
    description: 'A substantial three-layer model with a connected parameter lattice on its top face.',
    draw(s) {
      s.box(-22, -17, 0, 44, 34, 8, 'neutral', 3);
      s.box(-22, -17, 11, 44, 34, 8, 'blue', 3);
      s.box(-22, -17, 22, 44, 34, 10, 'purple', 3);
      s.line([[-12, -8, 32.2], [0, -8, 32.2], [12, -8, 32.2]], 'ink', 1.8);
      s.line([[-12, 7, 32.2], [0, 7, 32.2], [12, 7, 32.2]], 'ink', 1.8);
      s.line([[-12, -8, 32.2], [0, 7, 32.2], [12, -8, 32.2]], 'ink', 1.8);
      s.line([[0, -8, 32.2], [-12, 7, 32.2]], 'ink', 1.8);
      s.line([[0, -8, 32.2], [12, 7, 32.2]], 'ink', 1.8);
      for (const x of [-12, 0, 12]) {
        s.dot([x, -8, 32.5], 2.2, 'ink');
        s.dot([x, 7, 32.5], 2.2, 'ink');
      }
    },
  },
  {
    id: 'slm',
    name: 'Small Language Model',
    category: 'Models & Learning',
    description: 'A compact single model module with a four-node parameter lattice.',
    draw(s) {
      s.box(-17, -15, 0, 34, 30, 7, 'neutral', 3);
      s.box(-15, -13, 7, 30, 26, 13, 'blue', 3);
      s.line([[-7, -6, 20.2], [7, -6, 20.2], [7, 6, 20.2], [-7, 6, 20.2], [-7, -6, 20.2]], 'ink', 1.8);
      s.line([[-7, 6, 20.2], [7, -6, 20.2]], 'ink', 1.8);
      for (const x of [-7, 7]) {
        s.dot([x, -6, 20.5], 2.3, 'ink');
        s.dot([x, 6, 20.5], 2.3, 'ink');
      }
      s.box(-8, 15, 2, 16, 4, 3, 'teal', 1);
    },
  },
  {
    id: 'local-model',
    name: 'Local Model',
    category: 'Models & Learning',
    description: 'A laptop with a model chip embedded in its screen, representing on-device intelligence.',
    draw(s) {
      s.box(-29, -18, 0, 58, 39, 4, 'neutral', 3);
      s.panel(-26, -14, 4, 52, 35, 'neutral');
      s.poly([[-21, -13.8, 10], [21, -13.8, 10], [21, -13.8, 34], [-21, -13.8, 34]], 'blue');
      s.poly([[-8, -13.6, 15], [8, -13.6, 15], [8, -13.6, 29], [-8, -13.6, 29]], 'purple');
      for (const x of [-4, 4]) {
        s.line([[x, -13.4, 29], [x, -13.4, 32]], 'white', 1.5);
        s.line([[x, -13.4, 12], [x, -13.4, 15]], 'white', 1.5);
      }
      s.line([[-11, -13.4, 22], [-8, -13.4, 22]], 'white', 1.5);
      s.line([[8, -13.4, 22], [11, -13.4, 22]], 'white', 1.5);
      s.dot([0, -13.3, 22], 2.2, 'white');
      s.line([[-20, -5, 4.2], [20, -5, 4.2]], 'ink', 1.3);
      s.line([[-20, 0, 4.2], [20, 0, 4.2]], 'ink', 1.3);
      s.box(-8, 7, 4.1, 16, 8, 0.6, 'teal', 1.2);
    },
  },
  {
    id: 'training',
    name: 'Model Training',
    category: 'Models & Learning',
    description: 'A three-channel tuning console whose sliders adjust model parameters.',
    draw(s) {
      s.box(-27, -21, 0, 54, 42, 9, 'neutral', 3);
      for (const x of [-17, 0, 17]) {
        s.line([[x, -15, 9.2], [x, 15, 9.2]], 'ink', 2.2);
        s.dot([x, -15, 9.3], 1.5, 'ink');
        s.dot([x, 15, 9.3], 1.5, 'ink');
      }
      s.box(-22, -11, 9, 10, 8, 5, 'blue', 1.7);
      s.box(-5, 5, 9, 10, 8, 5, 'purple', 1.7);
      s.box(12, -3, 9, 10, 8, 5, 'teal', 1.7);
      s.line([[-19, -7, 14.2], [-15, -7, 14.2]], 'white', 1.5);
      s.line([[-2, 9, 14.2], [2, 9, 14.2]], 'white', 1.5);
      s.line([[15, 1, 14.2], [19, 1, 14.2]], 'white', 1.5);
    },
  },
  {
    id: 'rsi',
    name: 'Recursive Self-Improvement',
    category: 'Models & Learning',
    description: 'Three increasingly capable model blocks feed back through an elevated return loop.',
    draw(s) {
      s.line([[22, -4, 31], [22, -4, 44], [-24, -4, 44], [-24, -4, 17]], 'purple', 3);
      s.poly([[-29, -4, 22], [-24, -4, 15], [-19, -4, 22]], 'purple');
      s.box(-31, -10, 0, 18, 22, 9, 'blue', 2);
      s.box(-10, -10, 0, 18, 22, 19, 'teal', 2);
      s.box(11, -10, 0, 18, 22, 29, 'purple', 2);
      s.line([[-25, -2, 9.2], [-19, -2, 9.2]], 'white', 2);
      s.line([[-4, -2, 19.2], [2, -2, 19.2]], 'white', 2);
      s.line([[17, -2, 29.2], [23, -2, 29.2]], 'white', 2);
    },
  },
  {
    id: 'harness',
    name: 'AI Harness',
    category: 'Systems & Infrastructure',
    description: 'A model core held within an open structural control frame.',
    draw(s) {
      s.box(-27, -19, 0, 54, 38, 4, 'neutral', 2.5);
      s.box(-27, -19, 4, 6, 6, 30, 'neutral', 1.5);
      s.box(21, -19, 4, 6, 6, 30, 'neutral', 1.5);
      s.box(-27, -19, 29, 54, 6, 5, 'teal', 1.5);
      s.box(-15, -10, 4, 30, 24, 20, 'blue', 3);
      s.box(-7, -3, 24, 14, 11, 3, 'purple', 1.5);
      s.box(-27, 13, 4, 6, 6, 30, 'neutral', 1.5);
      s.box(21, 13, 4, 6, 6, 30, 'neutral', 1.5);
      s.box(-27, -13, 29, 6, 26, 5, 'neutral', 1.5);
      s.box(21, -13, 29, 6, 26, 5, 'neutral', 1.5);
      s.dot([-24, 19.2, 16], 1.8, 'teal');
      s.dot([24, 19.2, 16], 1.8, 'teal');
    },
  },
  {
    id: 'rag',
    name: 'Retrieval-Augmented Generation',
    category: 'Systems & Infrastructure',
    description: 'A knowledge store feeds retrieved context into a model, which emits a new result tile.',
    draw(s) {
      s.cylinder(-25, 8, 0, 12, 8, 'neutral');
      s.cylinder(-25, 8, 10, 12, 8, 'teal');
      s.cylinder(-25, 8, 20, 12, 8, 'neutral');
      s.line([[-13, 8, 16], [7, 8, 16]], 'teal', 2.8);
      s.box(7, -8, 0, 24, 25, 21, 'blue', 2.5);
      s.box(13, -2, 21, 12, 13, 3, 'purple', 1.5);
      s.line([[31, -2, 10], [42, -7, 10]], 'blue', 2.8);
      s.box(42, -13, 4, 9, 12, 8, 'teal', 1.5);
      s.line([[-29, 8, 28.2], [-21, 8, 28.2]], 'teal', 1.8);
    },
  },
  {
    id: 'vector-database',
    name: 'Vector Database',
    category: 'Systems & Infrastructure',
    description: 'Three database tiers hold a directional vector on their top surface.',
    draw(s) {
      s.cylinder(0, 0, 0, 21, 10, 'neutral');
      s.cylinder(0, 0, 13, 21, 10, 'blue');
      s.cylinder(0, 0, 26, 21, 10, 'teal');
      s.line([[-10, 9, 36.3], [9, -9, 36.3]], 'white', 2.4);
      s.poly([[3, -10, 36.4], [11, -11, 36.4], [10, -3, 36.4]], 'white');
      s.dot([-10, 9, 36.5], 2.3, 'white');
      s.dot([-8, -7, 36.5], 1.7, 'white');
      s.dot([9, 8, 36.5], 1.7, 'white');
    },
  },
  {
    id: 'tokens',
    name: 'Tokenization',
    category: 'Language & Context',
    description: 'A continuous input splits into three discrete, individually colored token tiles.',
    draw(s) {
      s.box(-29, -21, 19, 58, 11, 6, 'neutral', 2);
      s.line([[-20, -15, 19], [-20, -2, 8]], 'ink', 1.7);
      s.line([[0, -15, 19], [0, -2, 8]], 'ink', 1.7);
      s.line([[20, -15, 19], [20, -2, 8]], 'ink', 1.7);
      s.box(-29, -2, 0, 17, 25, 8, 'blue', 2.5);
      s.box(-8, -2, 0, 16, 25, 8, 'purple', 2.5);
      s.box(12, -2, 0, 17, 25, 8, 'teal', 2.5);
      s.line([[-24, 10, 8.2], [-17, 10, 8.2]], 'white', 2);
      s.line([[-3, 10, 8.2], [3, 10, 8.2]], 'white', 2);
      s.line([[17, 10, 8.2], [24, 10, 8.2]], 'white', 2);
    },
  },
  {
    id: 'context-window',
    name: 'Context Window',
    category: 'Language & Context',
    description: 'A finite open tray bounds a sequence of context tokens.',
    draw(s) {
      s.box(-30, -20, 0, 60, 40, 4, 'neutral', 2.5);
      s.box(-30, -20, 4, 60, 4, 15, 'neutral', 1.5);
      s.box(-30, -16, 4, 4, 36, 15, 'blue', 1.5);
      s.box(-22, -10, 4, 12, 23, 7, 'blue', 1.7);
      s.box(-6, -10, 4, 12, 23, 7, 'purple', 1.7);
      s.box(10, -10, 4, 12, 23, 7, 'teal', 1.7);
      s.line([[-18, 2, 11.2], [-14, 2, 11.2]], 'white', 1.8);
      s.line([[-2, 2, 11.2], [2, 2, 11.2]], 'white', 1.8);
      s.line([[14, 2, 11.2], [18, 2, 11.2]], 'white', 1.8);
      s.box(26, -16, 4, 4, 36, 15, 'blue', 1.5);
      s.box(-26, 16, 4, 52, 4, 5, 'neutral', 1.5);
    },
  },
];
