const arrow = (s, from, to, mat = 'blue', width = 2.6) => {
  const dx = to[0] - from[0], dy = to[1] - from[1];
  const length = Math.hypot(dx, dy), ux = dx / length, uy = dy / length;
  s.line([from, to], mat, width);
  s.poly([
    to,
    [to[0] - ux * 6 - uy * 3, to[1] - uy * 6 + ux * 3, to[2]],
    [to[0] - ux * 6 + uy * 3, to[1] - uy * 6 - ux * 3, to[2]],
  ], mat);
};

const station = (s, x, y, mat) => {
  s.box(x, y, 0, 21, 21, 5, 'neutral', 3);
  s.box(x + 2, y + 2, 5, 17, 17, 19, mat, 3);
  s.box(x + 6, y + 6, 24, 9, 9, 1, 'white', 1.4);
  s.panel(x + 6, y + 19.2, 11, 9, 6, 'ink');
  s.line([[x + 8, y + 19.4, 14], [x + 13, y + 19.4, 14]], 'white', 1.6);
};

export const operationIcons = [
  {
    id: 'model-routing',
    name: 'Model Routing',
    category: 'Runtime & operations',
    description: 'A physical rail switch selects between two independently housed models of different sizes.',
    draw(s) {
      s.box(-29, -25, 0, 58, 58, 4, 'neutral', 4);
      // Both alternatives remain visible; the blue rail is the selected route.
      s.line([[-16, -5, 4.2], [-16, 12, 4.2], [0, 25, 4.2]], 'ink', 2.2);
      s.line([[16, -5, 4.2], [16, 12, 4.2], [0, 25, 4.2]], 'blue', 3);
      s.box(-25, -22, 4, 18, 18, 29, 'purple', 3);
      s.box(-20, -17, 33, 8, 8, 1, 'white', 1);
      s.line([[-22, -3.9, 15], [-10, -3.9, 15]], 'white', 1.8);
      s.box(7, -22, 4, 18, 18, 16, 'blue', 3);
      s.box(12, -17, 20, 8, 8, 1, 'white', 1);
      s.cylinder(0, 24, 4, 6, 3, 'white');
      s.line([[0, 24, 7.2], [9, 16, 7.2]], 'coral', 2.4);
      s.cylinder(9, 16, 6.2, 2.6, 3.2, 'coral');
    },
  },
  {
    id: 'prompt-cache',
    name: 'Prompt Cache',
    category: 'Runtime & operations',
    description: 'Stored prompt blocks connect to a shortcut track that bypasses repeated processing.',
    draw(s) {
      s.line([[-17, 9, 3], [-17, 26, 3], [29, 26, 3], [29, -13, 3]], 'blue', 2.8);
      s.line([[-17, 9, 3], [8, 9, 3], [8, -13, 3], [23, -13, 3]], 'neutral', 1.8);
      s.box(-29, -20, 0, 29, 30, 5, 'neutral', 3);
      s.box(-26, -17, 5, 23, 23, 5, 'purple', 2.6);
      s.box(-26, -17, 11, 23, 23, 5, 'blue', 2.6);
      s.box(-26, -17, 17, 23, 23, 5, 'teal', 2.6);
      s.box(-21, -12, 22, 13, 13, 1, 'white', 1.5);
      s.line([[-18, -6, 23.1], [-11, -6, 23.1]], 'blue', 1.6);
      s.box(20, -22, 0, 18, 18, 7, 'blue', 2.8);
      s.box(25, -17, 7, 8, 8, 1, 'white', 1);
      arrow(s, [9, 26, 3], [21, 26, 3], 'blue');
    },
  },
  {
    id: 'structured-output',
    name: 'Structured Output',
    category: 'Runtime & operations',
    description: 'A schema tray accepts square, circular, and triangular outputs in matching fitted recesses.',
    draw(s) {
      s.box(-28, -25, 0, 56, 50, 6, 'neutral', 4);
      // Contrasting sockets keep the template readable in the solid-fill style.
      s.box(-23, -20, 6, 21, 21, 1, 'ink', 2.7);
      s.box(-20, -17, 7, 15, 15, 8, 'blue', 2);
      s.cylinder(14, -10, 6, 10.5, 1, 'ink');
      s.cylinder(14, -10, 7, 7.5, 8, 'teal');
      s.poly([[-12, 18, 6.2], [13, 18, 6.2], [0.5, 2, 6.2]], 'ink');
      // The triangular insert has real front and right facets.
      const a = [-8, 16, 7], b = [9, 16, 7], c = [0.5, 5, 7], h = 8;
      s.poly([c, b, [b[0], b[1], b[2] + h], [c[0], c[1], c[2] + h]], 'blue');
      s.poly([a, b, [b[0], b[1], b[2] + h], [a[0], a[1], a[2] + h]], 'purple');
      s.poly([a.map((v, i) => i === 2 ? v + h : v), b.map((v, i) => i === 2 ? v + h : v), c.map((v, i) => i === 2 ? v + h : v)], 'purple');
    },
  },
  {
    id: 'citations',
    name: 'Citations / Provenance',
    category: 'Runtime & operations',
    description: 'One answer document links to two distinct source documents through visible evidence connections.',
    draw(s) {
      s.panel(-18, -15, 10, 36, 39, 'white');
      s.poly([[-12, -14.7, 34], [12, -14.7, 34], [12, -14.7, 42], [-12, -14.7, 42]], 'blue');
      s.line([[-11, -14.5, 28], [10, -14.5, 28]], 'ink', 1.8);
      s.line([[-11, -14.5, 22], [3, -14.5, 22]], 'neutral', 1.8);
      s.line([[-9, -14.4, 16], [-22, 10, 16]], 'purple', 2);
      s.line([[9, -14.4, 16], [20, 10, 16]], 'teal', 2);
      s.dot([-9, -14.4, 16], 1.8, 'purple');
      s.dot([9, -14.4, 16], 1.8, 'teal');
      s.panel(-32, 10, 0, 20, 26, 'purple');
      s.line([[-27, 10.3, 19], [-17, 10.3, 19]], 'white', 2);
      s.line([[-27, 10.3, 13], [-17, 10.3, 13]], 'white', 2);
      s.line([[-27, 10.3, 7], [-21, 10.3, 7]], 'white', 2);
      s.panel(10, 10, 0, 20, 26, 'teal');
      s.line([[15, 10.3, 19], [25, 10.3, 19]], 'white', 2);
      s.line([[15, 10.3, 13], [25, 10.3, 13]], 'white', 2);
      s.line([[15, 10.3, 7], [21, 10.3, 7]], 'white', 2);
    },
  },
  {
    id: 'token-budget',
    name: 'Token Budget',
    category: 'Runtime & operations',
    description: 'A token stack sits beside a calibrated usage dial with a clear upper-limit marker.',
    draw(s) {
      s.box(-26, -18, 0, 54, 42, 4, 'neutral', 4);
      s.panel(-5, -8, 4, 33, 36, 'white');
      const cx = 11.5, cy = -7.7, cz = 16;
      const arc = (a, b, mat, width) => s.line(Array.from({length: 25}, (_, i) => {
        const t = (a + (b - a) * i / 24) * Math.PI / 180;
        return [cx + 11 * Math.cos(t), cy, cz + 11 * Math.sin(t)];
      }), mat, width);
      arc(12, 168, 'neutral', 2.7);
      arc(37, 168, 'blue', 2.7);
      s.line([[22.3, cy, 19], [19.3, cy, 18.2]], 'coral', 2);
      s.line([[cx, cy, cz], [17.7, cy, 24.5]], 'ink', 2);
      s.dot([cx, cy, cz], 2.1, 'ink');
      s.line([[4, cy, 10], [19, cy, 10]], 'neutral', 1.8);
      s.cylinder(-14, 11, 4, 10, 5, 'blue');
      s.cylinder(-14, 11, 10, 10, 5, 'purple');
      s.cylinder(-14, 11, 16, 10, 5, 'teal');
      s.ring(-14, 11, 21.1, 5, 'white', 1.7);
    },
  },
  {
    id: 'permissions',
    name: 'Agent Permissions',
    category: 'Runtime & operations',
    description: 'A scoped access keycard is presented to the reader of a controlled entry gate.',
    draw(s) {
      s.box(-28, -15, 0, 56, 39, 4, 'neutral', 4);
      s.box(-24, -11, 4, 7, 9, 38, 'neutral', 2);
      s.box(17, -11, 4, 7, 9, 38, 'neutral', 2);
      s.box(-24, -11, 39, 48, 9, 7, 'blue', 2);
      s.box(16, -1, 16, 10, 7, 17, 'ink', 2);
      s.panel(18, 6.2, 21, 6, 7, 'teal');
      s.line([[21, 6.4, 22], [21, 6.4, 26]], 'white', 1.5);
      // The card itself is the access credential; there is no safety shield.
      s.panel(-12, 17, 5, 23, 29, 'purple');
      s.poly([[-8, 17.3, 20], [0, 17.3, 20], [0, 17.3, 28], [-8, 17.3, 28]], 'white');
      s.line([[-4, 17.5, 21], [-4, 17.5, 27]], 'purple', 1.4);
      s.line([[-7, 17.5, 24], [-1, 17.5, 24]], 'purple', 1.4);
      s.line([[-7, 17.3, 15], [6, 17.3, 15]], 'white', 1.8);
      s.line([[-7, 17.3, 10], [2, 17.3, 10]], 'white', 1.8);
    },
  },
  {
    id: 'a2a',
    name: 'A2A / Agent Communication',
    category: 'Runtime & operations',
    description: 'Two independent agent stations exchange a task capsule over a bidirectional communication link.',
    draw(s) {
      // Separate return and outbound lanes make this a conversation, not a swarm.
      s.line([[-21, -7, 13], [-21, -17, 13], [24, -17, 13], [24, -7, 13]], 'purple', 2.2);
      arrow(s, [5, -17, 13], [-8, -17, 13], 'purple', 2.2);
      s.line([[-21, 14, 3], [-21, 26, 3], [24, 26, 3], [24, 14, 3]], 'blue', 2.2);
      arrow(s, [12, 26, 3], [23, 26, 3], 'blue', 2.2);
      station(s, -32, -7, 'blue');
      station(s, 13, -7, 'teal');
      s.box(-9, 21, 3, 18, 10, 6, 'white', 2);
      s.line([[-5, 24, 9.1], [5, 24, 9.1]], 'purple', 1.5);
      s.line([[-5, 27, 9.1], [1, 27, 9.1]], 'purple', 1.5);
    },
  },
  {
    id: 'synthetic-data',
    name: 'Synthetic Data',
    category: 'Runtime & operations',
    description: 'A seed example produces three new sample cards with distinct geometric contents.',
    draw(s) {
      s.panel(-11, -19, 7, 22, 33, 'white');
      s.poly([[-6, -18.7, 22], [6, -18.7, 22], [0, -18.7, 33]], 'blue');
      s.line([[-6, -18.7, 15], [6, -18.7, 15]], 'neutral', 1.8);
      s.line([[0, -19, 7], [0, 1, 3], [-26, 1, 3], [-26, 12, 3]], 'ink', 1.8);
      s.line([[0, 1, 3], [26, 1, 3], [26, 12, 3]], 'ink', 1.8);
      s.line([[0, 1, 3], [0, 12, 3]], 'ink', 1.8);
      s.cylinder(0, 1, 1, 3.5, 4, 'coral');
      s.box(-36, 12, 0, 20, 24, 4, 'purple', 2.4);
      s.poly([[-32, 29, 4.2], [-20, 29, 4.2], [-26, 18, 4.2]], 'white');
      s.box(-10, 12, 0, 20, 24, 4, 'blue', 2.4);
      s.cylinder(0, 24, 4, 5.5, 1.2, 'white');
      s.box(16, 12, 0, 20, 24, 4, 'teal', 2.4);
      s.line([[21, 20, 4.2], [31, 20, 4.2]], 'white', 2);
      s.line([[21, 25, 4.2], [28, 25, 4.2]], 'white', 2);
      s.line([[21, 30, 4.2], [31, 30, 4.2]], 'white', 2);
    },
  },
];
