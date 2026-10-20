// Original instruction files and runtime configuration mechanisms.
// Every mark is native world-space geometry, with no font or image dependency.
const md = (s, y, z) => {
  s.dot([-14, y, z + .6], 1.1, 'ink');
  s.line([[-9, y, z], [-9, y, z + 7], [-5.5, y, z + 7], [-3, y, z + 5], [-3, y, z]], 'ink', 1.7);
  s.line([[-3, y, z + 5], [-.5, y, z + 7], [3, y, z + 7], [3, y, z]], 'ink', 1.7);
  s.line([[15, y, z + 11], [15, y, z], [8, y, z], [8, y, z + 7], [15, y, z + 7]], 'ink', 1.7);
};

const instructionFile = (s, initial, accent) => {
  // The folded corner and visible side edge distinguish files from task cards.
  const front = [[-23, 0, 0], [23, 0, 0], [23, 0, 46], [10, 0, 59], [-23, 0, 59]];
  const back = front.map(([x, y, z]) => [x, y - 4, z]);
  s.poly(back, 'neutral');
  s.poly([front[1], back[1], back[2], front[2]], 'neutral');
  s.poly([front[2], back[2], back[3], front[3]], 'neutral');
  s.poly([front[3], back[3], back[4], front[4]], 'neutral');
  s.poly(front, 'white');
  s.poly([[10, .2, 59], [10, .2, 46], [23, .2, 46]], accent);
  if (initial === 'A') {
    s.line([[-13, .4, 29], [-4, .4, 49], [5, .4, 29]], accent, 3);
    s.line([[-10.2, .4, 35], [2.2, .4, 35]], accent, 2.5);
  } else {
    s.line([[4, .4, 46], [0, .4, 49], [-9, .4, 49], [-13, .4, 45], [-13, .4, 33], [-9, .4, 29], [0, .4, 29], [4, .4, 32]], accent, 3);
  }
  s.line([[-16, .3, 23], [16, .3, 23]], 'neutral', 1.4);
  md(s, .4, 8);
};

export const agentConfigIcons = [
  {
    id: 'agents-md',
    name: 'AGENTS.md',
    category: 'Agent configuration',
    description: 'A folded Markdown instruction file with a geometric A and a native vector .md extension.',
    tags: ['AGENTS.md', 'agents md', 'agent instructions', 'repository instructions', 'Markdown', 'configuration'],
    draw(s) { instructionFile(s, 'A', 'blue'); },
  },
  {
    id: 'claude-md',
    name: 'CLAUDE.md',
    category: 'Agent configuration',
    description: 'A folded Markdown instruction file with a geometric C and a native vector .md extension.',
    tags: ['CLAUDE.md', 'claude md', 'Claude Code', 'project instructions', 'Markdown', 'configuration'],
    draw(s) { instructionFile(s, 'C', 'coral'); },
  },
  {
    id: 'hooks',
    name: 'Hooks',
    category: 'Agent configuration',
    description: 'An event pulse activates a raised relay arm that connects to a waiting action contact.',
    tags: ['hooks', 'event hook', 'event trigger', 'lifecycle', 'callback', 'automation'],
    draw(s) {
      s.box(-29, -18, 0, 58, 36, 5, 'neutral', 3);
      s.line([[-20, 0, 5.2], [20, 0, 5.2]], 'ink', 1.8);
      s.box(-24, -8, 5, 13, 16, 10, 'blue', 2);
      s.line([[-22, 8.2, 10], [-19, 8.2, 10], [-19, 8.2, 13], [-16, 8.2, 13], [-16, 8.2, 7], [-13, 8.2, 7]], 'white', 1.8);
      s.box(13, -6, 5, 11, 12, 8, 'teal', 2);
      s.cylinder(18.5, 0, 13, 2.8, 3, 'white');
      s.cylinder(-2, 0, 5, 5, 9, 'purple');
      // An open switch contact reads as a trigger, rather than another loop.
      s.line([[-2, 0, 15], [18.5, 0, 25]], 'ink', 4);
      s.dot([-2, 0, 15], 2.2, 'coral');
      s.dot([18.5, 0, 25], 2.1, 'teal');
      s.mark([[-3, 0, 48], [-11, 0, 36], [-4, 0, 36], [-7, 0, 27], [5, 0, 41], [-2, 0, 41]], 'coral');
    },
  },
  {
    id: 'commands',
    name: 'Commands',
    category: 'Agent configuration',
    description: 'A slash-command terminal pairs a short executable instruction with a dedicated slash key.',
    tags: ['commands', 'slash commands', 'custom commands', 'CLI', 'terminal', 'command palette'],
    draw(s) {
      s.panel(-29, -3, 5, 58, 42, 'neutral');
      s.panel(-25, -2.8, 9, 50, 34, 'ink');
      s.line([[-25, -2.5, 35], [25, -2.5, 35]], 'neutral', 1.5);
      for (const x of [-19, -13, -7]) s.dot([x, -2.4, 39], 1.25, x === -19 ? 'coral' : 'white');
      s.line([[-17, -2.4, 15], [-10, -2.4, 29]], 'white', 2.8);
      s.line([[-1, -2.4, 26], [17, -2.4, 26]], 'white', 2.2);
      s.line([[-1, -2.4, 19], [10, -2.4, 19]], 'white', 2.2);
      // A separate, raised key makes commands distinct from the prompt laptop.
      s.box(9, 4, 0, 21, 19, 7, 'blue', 3);
      s.line([[15, 17, 7.2], [23, 10, 7.2]], 'white', 2.4);
    },
  },
  {
    id: 'skill-bundle',
    name: 'Skill Bundle',
    category: 'Agent configuration',
    description: 'Three instruction cartridges share a single holder and a common connector bus.',
    tags: ['skill bundle', 'bundle skills', 'skills bundle', 'skill pack', 'agent skills', 'reusable capabilities'],
    draw(s) {
      s.box(-30, -10, 0, 60, 30, 6, 'neutral', 3);
      s.box(-28, -9, 6, 56, 5, 8, 'ink', 1.5);
      for (const [x, mat] of [[-26, 'purple'], [-8, 'blue'], [10, 'teal']]) {
        s.panel(x, 0, 6, 16, 34, mat);
        s.panel(x + 3, .2, 20, 10, 15, 'white');
        s.line([[x + 5, .4, 30], [x + 11, .4, 30]], mat, 1.6);
        s.line([[x + 5, .4, 25], [x + 11, .4, 25]], mat, 1.6);
        for (const dx of [4, 8, 12]) s.line([[x + dx, .4, 8], [x + dx, .4, 14]], 'coral', 1.7);
      }
      s.box(-28, 9, 6, 56, 8, 8, 'purple', 2);
      s.line([[-18, 17.2, 10], [18, 17.2, 10]], 'white', 1.8);
      for (const x of [-18, 0, 18]) s.dot([x, 17.4, 10], 2, 'white');
    },
  },
];
