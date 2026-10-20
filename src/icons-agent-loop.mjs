// Each station is authored in the same world units as the system collection.
// The six stage names also define the order of the composite loop icon.
const stages = ['Reason', 'Plan', 'Act', 'Observe', 'Evaluate', 'Repeat'];
const base = s => s.box(-26, -22, 0, 52, 44, 5, 'neutral', 4);
const disk = (s, x, y, z, r, mat) => {
  s.cylinder(x, y, z, r, 5, mat);
  s.cylinder(x, y, z + 5, r * .42, .8, 'white');
};
const arrow = (s, from, to, mat = 'blue', width = 2.4, size = 5) => {
  const dx = to[0] - from[0], dy = to[1] - from[1];
  const length = Math.hypot(dx, dy), ux = dx / length, uy = dy / length;
  s.line([from, to], mat, width);
  s.poly([to, [to[0] - ux * size - uy * size * .55, to[1] - uy * size + ux * size * .55, to[2]],
    [to[0] - ux * size + uy * size * .55, to[1] - uy * size - ux * size * .55, to[2]]], mat);
};

export const agentLoopIcons = [
  {
    id: 'reason', name: 'Reason', category: 'Agent loop',
    description: 'Two evidence nodes converge through a diamond-shaped deduction junction into one conclusion module.',
    tags: ['AI agent loop', 'reason', 'reasoning', 'deduction', 'evidence', 'decision', 'stage 1'],
    draw(s) {
      s.box(-26, -26, 0, 52, 54, 5, 'neutral', 4);
      // Two independent premises converge into a single chosen conclusion.
      s.line([[-15, -12, 5.2], [-15, 2, 5.2], [0, 2, 5.2], [0, 19, 5.2]], 'blue', 2.6);
      s.line([[15, -12, 5.2], [15, 2, 5.2], [0, 2, 5.2]], 'purple', 2.6);
      s.box(-22, -22, 5, 14, 14, 7, 'blue', 2.6);
      s.box(8, -22, 5, 14, 14, 7, 'purple', 2.6);
      s.line([[-18, -15, 12.2], [-12, -15, 12.2]], 'white', 2);
      s.line([[15, -18, 12.2], [15, -12, 12.2]], 'white', 2);
      s.poly([[-5, 2, 5.4], [0, -3, 5.4], [5, 2, 5.4], [0, 7, 5.4]], 'coral');
      s.box(-9, 16, 5, 18, 12, 7, 'teal', 2.6);
      s.line([[-5, 22, 12.2], [5, 22, 12.2]], 'white', 2);
    },
  },
  {
    id: 'plan', name: 'Plan', category: 'Agent loop',
    description: 'A route map orders three checkpoints and a destination into an explicit sequence of actions.',
    tags: ['AI agent loop', 'plan', 'planning', 'route', 'steps', 'sequence', 'stage 2'],
    draw(s) {
      s.box(-26, -25, 0, 52, 50, 5, 'neutral', 4);
      s.box(-23, -22, 5, 46, 44, 2, 'white', 3);
      s.line([[-15, -13, 7.2], [14, -13, 7.2], [14, 4, 7.2], [-13, 4, 7.2], [-13, 16, 7.2]], 'blue', 2.5);
      disk(s, -15, -13, 7, 5.5, 'blue');
      disk(s, 14, -13, 7, 5.5, 'purple');
      disk(s, 14, 4, 7, 5.5, 'teal');
      arrow(s, [-13, 16, 7.2], [6, 16, 7.2], 'blue', 2.5, 5);
      s.box(9, 11, 7, 12, 12, 10, 'coral', 2.2);
      s.line([[12, 17, 17.2], [15, 20, 17.2], [19, 14, 17.2]], 'white', 1.9);
    },
  },
  {
    id: 'act', name: 'Act', category: 'Agent loop',
    description: 'A mechanical actuator presses an action switch, turning a planned instruction into a physical operation.',
    tags: ['AI agent loop', 'act', 'action', 'execute', 'actuator', 'tool execution', 'stage 3'],
    draw(s) {
      base(s);
      s.box(-20, -16, 5, 9, 12, 34, 'neutral', 2.5);
      s.box(-20, -16, 34, 36, 12, 8, 'blue', 3);
      // The extended shaft ends directly over the large action button.
      s.box(5, -11, 18, 6, 6, 16, 'ink', 1.6);
      s.box(-2, -17, 15, 20, 18, 4, 'purple', 2.6);
      s.cylinder(8, -7, 5, 10, 4, 'white');
      s.cylinder(8, -7, 9, 7, 5, 'coral');
      // The active output travels forward from the switch.
      s.line([[8, 4, 5.2], [8, 14, 5.2]], 'teal', 2.7);
      arrow(s, [-3, 16, 5.2], [14, 16, 5.2], 'teal', 2.7, 5.5);
      s.dot([-16, -3.8, 21], 1.7, 'teal');
    },
  },
  {
    id: 'observe', name: 'Observe', category: 'Agent loop',
    description: 'An optical sensing head focuses its pupil on a sample positioned in the observation tray.',
    tags: ['AI agent loop', 'observe', 'observation', 'sensor', 'perception', 'feedback', 'stage 4'],
    draw(s) {
      base(s);
      s.box(-5, -13, 5, 10, 9, 9, 'purple', 2);
      s.panel(-25, -5, 14, 50, 32, 'blue');
      s.panel(-21, -4.8, 18, 42, 24, 'white');
      // The almond-shaped aperture remains readable in monochrome and at 64px.
      const eye = Array.from({length: 49}, (_, i) => {
        const a = i / 48 * Math.PI * 2;
        return [17 * Math.cos(a), -4.5, 30 + 8 * Math.sin(a) * Math.abs(Math.sin(a)) ** .2];
      });
      s.line(eye, 'ink', 2, true);
      s.poly(Array.from({length: 41}, (_, i) => {
        const a = i / 40 * Math.PI * 2;
        return [6 * Math.cos(a), -4.4, 30 + 6 * Math.sin(a)];
      }), 'teal');
      s.dot([0, -4.2, 30], 2.4, 'ink');
      s.line([[-12, 1, 5.2], [-12, 15, 5.2], [12, 15, 5.2], [12, 1, 5.2]], 'blue', 1.8);
      s.box(-5, 6, 5, 10, 9, 5, 'coral', 2);
    },
  },
  {
    id: 'evaluate', name: 'Evaluate', category: 'Agent loop',
    description: 'A threshold instrument compares the observed result against a marked acceptance range and records a passing check.',
    tags: ['AI agent loop', 'evaluate', 'evaluation', 'threshold', 'acceptance', 'quality', 'stage 5'],
    draw(s) {
      base(s);
      s.panel(-23, -4, 5, 46, 40, 'white');
      const cx = 0, cy = -3.7, cz = 20;
      const arc = (a, b, mat, width) => s.line(Array.from({length: 25}, (_, i) => {
        const t = (a + (b - a) * i / 24) * Math.PI / 180;
        return [cx + 15 * Math.cos(t), cy, cz + 15 * Math.sin(t)];
      }), mat, width);
      arc(20, 160, 'purple', 3.2);
      arc(20, 70, 'teal', 3.2);
      s.line([[5, cy, 34], [7, cy, 39]], 'coral', 2.2);
      s.line([[cx, cy, cz], [10, cy, 31]], 'ink', 2.5);
      s.dot([cx, cy, cz], 2.3, 'ink');
      s.line([[-14, cy, 13], [-5, cy, 13]], 'neutral', 1.8);
      s.line([[4, cy, 14], [8, cy, 10], [15, cy, 17]], 'teal', 2.5);
      s.box(-14, 8, 5, 28, 10, 4, 'purple', 2);
      s.line([[-8, 13, 9.2], [-2, 13, 9.2]], 'white', 2);
      s.line([[5, 10, 9.2], [5, 16, 9.2]], 'white', 2);
    },
  },
  {
    id: 'repeat', name: 'Repeat', category: 'Agent loop',
    description: 'A return conveyor carries the output capsule back to the beginning for another iteration.',
    tags: ['AI agent loop', 'repeat', 'iteration', 'return', 'next cycle', 'stage 6'],
    draw(s) {
      s.box(-28, -24, 0, 56, 48, 5, 'neutral', 4);
      // Opposing lanes and broad arrowheads make the return direction explicit.
      s.line([[-19, -9, 5.2], [-19, -15, 5.2], [19, -15, 5.2], [19, 15, 5.2], [-19, 15, 5.2], [-19, 6, 5.2]], 'blue', 3.4);
      arrow(s, [-5, -15, 5.2], [9, -15, 5.2], 'blue', 3.4, 6);
      arrow(s, [7, 15, 5.2], [-9, 15, 5.2], 'teal', 3.4, 6);
      s.box(-26, -8, 5, 14, 15, 12, 'purple', 3);
      s.box(-22, -4, 17, 6, 7, 1, 'white', 1.2);
      s.box(12, -7, 5, 14, 14, 6, 'teal', 2.5);
      s.box(16, -3, 11, 6, 6, 1, 'white', 1.2);
      s.line([[-8, 0, 5.2], [7, 0, 5.2]], 'neutral', 1.8);
      s.cylinder(0, 0, 5, 3.5, 3, 'coral');
    },
  },
  {
    id: 'agent-loop', name: 'AI Agent Loop', category: 'Agent loop',
    description: 'Six connected stations cycle around an agent core in order: Reason → Plan → Act → Observe → Evaluate → Repeat.',
    tags: ['AI agent loop', 'Reason → Plan → Act → Observe → Evaluate → Repeat', 'autonomous cycle', ...stages.map(s => s.toLowerCase())],
    stages,
    draw(s) {
      s.cylinder(0, 0, 0, 34, 4, 'neutral');
      const points = stages.map((_, i) => {
        const a = (-120 + i * 60) * Math.PI / 180;
        return [26 * Math.cos(a), 26 * Math.sin(a), 4.2];
      });
      // Six stations, six short directional connections, one persistent core.
      for (let i = 0; i < points.length; i++) {
        const a = points[i], b = points[(i + 1) % points.length];
        const at = t => a.map((v, j) => v + (b[j] - v) * t);
        arrow(s, at(.24), at(.72), i % 2 ? 'teal' : 'blue', 1.9, 3.9);
      }
      const colors = ['blue', 'purple', 'coral', 'blue', 'teal', 'purple'];
      // Back stations are painted first, then the core and foreground stations.
      const station = i => {
        const [x, y] = points[i];
        s.cylinder(x, y, 4, 5.3, 4, colors[i]);
        s.cylinder(x, y, 8, 2.1, .7, 'white');
      };
      [0, 1, 5].forEach(station);
      s.box(-10, -9, 4, 20, 18, 19, 'blue', 3);
      s.box(-6, -5, 23, 12, 10, 1.3, 'white', 2);
      s.line([[-3, 0, 24.5], [3, 0, 24.5]], 'purple', 1.8);
      s.panel(-6, 9.2, 10, 12, 7, 'ink');
      s.line([[-3, 9.4, 13.5], [3, 9.4, 13.5]], 'white', 1.5);
      [2, 3, 4].forEach(station);
    },
  },
];
