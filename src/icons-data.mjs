// Original data objects, authored once in the shared isometric world.
export const dataIcons = [
  {
    id: 'dataset',
    name: 'Dataset',
    category: 'Data & knowledge',
    description: 'A stack of structured record sheets carries a clear column header and a three-by-three data grid.',
    tags: ['dataset', 'data', 'records', 'table', 'training data', 'corpus', 'data collection'],
    draw(s) {
      // The thin, repeated edges identify a collection of records rather than
      // the cylindrical storage used by the vector-database icon.
      s.box(-26, -22, 0, 52, 44, 3, 'neutral', 3);
      s.box(-26, -22, 6, 52, 44, 3, 'blue', 3);
      s.box(-26, -22, 12, 52, 44, 3, 'white', 3);

      // Header and fields share one plane, inset six units from the sheet.
      const z = 15.2;
      s.poly([[-19, -15, z], [19, -15, z], [19, 15, z], [-19, 15, z]], 'white');
      s.poly([[-19, -15, z], [19, -15, z], [19, -7, z], [-19, -7, z]], 'blue');
      for (const x of [-6.33, 6.33]) {
        s.line([[x, -15, z + .1], [x, 15, z + .1]], 'ink', 1.4);
      }
      for (const y of [0.33, 7.67]) {
        s.line([[-19, y, z + .1], [19, y, z + .1]], 'ink', 1.4);
      }
    },
  },
];
