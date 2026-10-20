// Shared physical carrier for the companion agents and platforms collection.
// Brand geometry retains its source proportions; only the carrier is isometric.
export function brandTile(s, accent = 'blue') {
  s.box(-29, -13, 0, 58, 31, 4, 'neutral', 3);
  s.box(-13, -4, 4, 26, 11, 5, 'ink', 2);
  s.panel(-25, 7, 8, 50, 50, accent);
  // A flat inset avoids a second extruded frame around the artwork.
  const inset = [];
  for (const [cx, cz, start] of [[-19, 14, 180], [19, 14, 270], [19, 52, 0], [-19, 52, 90]]) {
    for (let i = 0; i <= 6; i++) {
      const angle = (start + i * 15) * Math.PI / 180;
      inset.push([cx + 3 * Math.cos(angle), 7.2, cz + 3 * Math.sin(angle)]);
    }
  }
  s.poly(inset, 'white');
  s.line([[-5, 13, 4.2], [5, 13, 4.2]], accent, 2.4);
  const point = (u, v) => [u, 7.4, 32 + v];
  return {
    point,
    polygon: (points, mat = accent) => s.mark(points.map(([u, v]) => point(u, v)), mat),
    line: (points, mat = accent, width = 2.8, closed = false) =>
      s.line(points.map(([u, v]) => point(u, v)), mat, width, closed),
  };
}

/** Fit a sourced vector mark into the common carrier without redrawing its paths. */
export function logoTile(s, logo, accent = 'blue') {
  const b = brandTile(s, accent);
  const [x,y,w,h]=logo.viewBox;
  const scale=40/Math.max(w,h);
  s.logo(logo,b.point(-(x+w/2)*scale,(y+h/2)*scale+1),[scale,0,0],[0,0,-scale]);
  return b;
}

export const ellipse = (cx, cy, rx, ry, count = 48) =>
  Array.from({ length: count }, (_, i) => {
    const a = i * Math.PI * 2 / count;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });

export function sampleCurve(points, steps = 16) {
  const [a, b, c, d] = points;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps, q = 1 - t;
    return [0, 1].map(j => q ** 3 * a[j] + 3 * q ** 2 * t * b[j] + 3 * q * t ** 2 * c[j] + t ** 3 * d[j]);
  });
}
