// Original OpenSpec workflow metaphors, authored once for all five styles.
// Command semantics: https://openspec.dev/
const meta = (id, name, description, tags, draw) => ({
  id, name, category: 'Spec-driven development', description,
  tags: ['OpenSpec', `/opsx:${id}`, ...tags], draw,
});
const circleXZ = (x, y, z, radius) => Array.from({length: 48}, (_, i) => {
  const a = i * Math.PI / 24;
  return [x + Math.cos(a) * radius, y, z + Math.sin(a) * radius];
});
const check = (s, x, y, z, size, mat = 'white') =>
  s.line([[x, y, z + size * .45], [x + size * .34, y, z], [x + size, y, z + size]], mat, 2.6);

export const specWorkflowIcons = [
  meta('explore', 'Explore', 'A magnifying lens follows a route across a folded map to investigate a codebase before proposing changes.',
    ['investigate', 'codebase', 'discovery', 'problem space'], s => {
      // Three distinct folds keep the map readable without a busy grid.
      s.poly([[-29,-20,4],[-9,-20,10],[-9,20,10],[-29,20,4]], 'white');
      s.poly([[-9,-20,10],[11,-20,4],[11,20,4],[-9,20,10]], 'blue');
      s.poly([[11,-20,4],[29,-20,10],[29,20,10],[11,20,4]], 'white');
      s.line([[-23,12,6],[-15,1,8.4],[-2,-4,8],[10,-12,4.5],[22,-7,8]], 'purple', 2.2);
      s.dot([-23,12,6.2], 2.4, 'coral');
      s.dot([22,-7,8.2], 2.4, 'teal');
      // Opaque lens and a faceted handle form a single unmistakable silhouette.
      s.poly([[3,13,27],[8,13,30],[23,13,10],[18,13,7]], 'purple');
      s.poly([[8,13,30],[8,9,30],[23,9,10],[23,13,10]], 'blue');
      s.poly(circleXZ(-4,9,40,13), 'blue');
      s.poly(circleXZ(-4,13,40,13), 'blue');
      s.poly(circleXZ(-4,13.2,40,9), 'white');
      s.line([[-10,13.5,39],[-5,13.5,44],[2,13.5,39]], 'purple', 1.8);
      s.dot([-5,13.6,44], 2, 'coral');
    }),
  meta('propose', 'Propose', 'A drafting pencil adds a structured change proposal to a dimensional blueprint.',
    ['proposal', 'specification', 'design', 'tasks', 'blueprint'], s => {
      s.panel(-25,-2,3,43,49,'blue');
      // A nested layout conveys a specification, not arbitrary text.
      s.line([[-18,-1.7,44],[10,-1.7,44]],'white',2.1);
      s.line([[-18,-1.7,36],[-6,-1.7,36],[-6,-1.7,23],[-18,-1.7,23]],'white',1.8,true);
      s.line([[0,-1.7,35],[10,-1.7,35]],'white',1.8);
      s.line([[0,-1.7,28],[8,-1.7,28]],'white',1.8);
      s.line([[-18,-1.7,15],[4,-1.7,15]],'white',1.8);
      // The pencil has a separate graphite point, bevel, body, and eraser.
      s.poly([[9,7,8],[12,7,20],[19,7,17]],'white');
      s.mark([[9,7.3,8],[10.4,7.3,13.4],[13.4,7.3,12.1]],'ink');
      s.poly([[12,7,20],[26,7,51],[33,7,48],[19,7,17]],'purple');
      s.poly([[19,7,17],[33,7,48],[33,3,48],[19,3,17]],'blue');
      s.line([[15.5,7.3,21],[28,7.3,48]],'white',1.6);
      s.poly([[26,7,51],[29,7,57],[36,7,54],[33,7,48]],'coral');
      s.poly([[33,7,48],[36,7,54],[36,3,54],[33,3,48]],'coral');
    }),
  meta('apply', 'Apply', 'A specification guides a module into its matching implementation socket.',
    ['implement', 'implementation', 'spec tasks', 'install'], s => {
      s.box(-27,-20,0,54,42,5,'neutral',4);
      s.panel(-25,-12,10,27,39,'white');
      s.line([[-19,-11.7,41],[-5,-11.7,41]],'purple',2);
      for (const z of [32,24]) {
        s.dot([-18,-11.7,z],1.8,'teal');
        s.line([[-12,-11.7,z],[-5,-11.7,z]],'neutral',1.8);
      }
      s.box(0,-6,5,23,23,3,'ink',3);
      s.box(4,-2,8,15,15,1,'white',1.5);
      // Alignment guides and a downward arrow make insertion explicit.
      for(const [x,y] of [[2,-4],[21,-4],[21,15]]) s.line([[x,y,9],[x,y,20]],'teal',1.4);
      s.box(1,-5,22,21,21,15,'blue',3);
      s.box(6,0,37,11,11,1,'white',1.5);
      s.line([[9,5.5,38.2],[14,5.5,38.2]],'blue',1.8);
      s.line([[-9,18,28],[-9,18,13]],'teal',2.5);
      s.poly([[-14,18,17],[-9,18,10],[-4,18,17]],'teal');
    }),
  meta('verify', 'Verify', 'A specification sheet receives a large conformance stamp after its implementation is checked.',
    ['validation', 'conformance', 'specification', 'check'], s => {
      s.panel(-20,-7,9,40,45,'purple');
      s.panel(-25,-2,4,40,45,'white');
      s.line([[-18,-1.7,41],[8,-1.7,41]],'purple',2);
      s.line([[-18,-1.7,34],[-4,-1.7,34]],'neutral',1.8);
      // Registration brackets distinguish conformance checking from a task list.
      s.line([[-17,-1.7,27],[-17,-1.7,20],[-10,-1.7,20]],'blue',1.8);
      s.line([[-17,-1.7,13],[-17,-1.7,9],[-10,-1.7,9]],'blue',1.8);
      s.panel(-2,8,6,29,29,'teal');
      s.line([[3,8.3,11],[22,8.3,11],[22,8.3,30],[3,8.3,30]],'white',1.4,true);
      check(s,5,8.5,16,15);
    }),
  meta('archive', 'Archive', 'A completed change folder is filed in a deep archive tray with a visible approval mark.',
    ['completed change', 'file', 'retire', 'history'], s => {
      s.box(-28,-21,0,56,43,5,'neutral',4);
      s.box(-28,-21,5,56,5,18,'purple',2);
      // Two archived sheets sit behind a broad tabbed folder.
      s.panel(-21,-10,5,43,30,'white');
      s.panel(-23,-4,5,43,34,'white');
      s.panel(-23,3,5,46,33,'teal');
      s.panel(-20,3,36,17,8,'teal');
      s.line([[-15,3.3,40],[-8,3.3,40]],'white',1.7);
      check(s,-7,3.4,22,14);
      s.box(-28,-16,5,5,33,16,'purple',1.5);
      s.box(23,-16,5,5,33,16,'purple',1.5);
      s.box(-28,17,5,56,5,16,'purple',2);
      s.panel(-11,22.2,10,22,6,'white');
      s.line([[-5,22.5,13],[5,22.5,13]],'purple',1.5);
    }),
];
