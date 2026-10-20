# Geometry and rendering

Read `src/scene.mjs` and a nearby source definition before drawing. The renderer, not these notes, is authoritative if its API changes.

## Source definition

Definitions export arrays of objects with a stable kebab-case `id`, a display `name`, `category`, a short factual `description`, search `tags`, and `draw(s)`. Original system definitions normally omit `collection`; the build assigns `systems` by default.

```js
export const exampleIcons = [{
  id: 'example-module',
  name: 'Example Module',
  category: 'AI systems',
  description: 'A raised processing module on a compact circuit base.',
  tags: ['module', 'processing'],
  draw(s) {
    s.box(-28, -20, 0, 56, 40, 5, 'neutral', 3);
    s.box(-16, -12, 5, 32, 24, 24, 'blue', 3);
    s.line([[-10, 12.2, 19], [10, 12.2, 19]], 'white', 2);
  },
}];
```

This illustrates the API, not a mandatory metaphor or starter silhouette. Keep each icon visually distinct.

## Scene primitives

World coordinates are `[x, y, z]`, with `z` vertical. Items render in insertion order; put rear geometry before foreground elements.

| Method | Purpose / behavior |
| --- | --- |
| `box(x,y,z,w,d,h,material,radius)` | Rounded slab or cuboid; `x,y` describe its plan origin. |
| `cylinder(x,y,z,radius,height,material)` | Vertical cylinder; `x,y` are its center. |
| `panel(x,y,z,width,height,material)` | Rounded upright face at `y`, extruded backward by four world units. |
| `line(points,material,width,closed)` | Open or closed polyline with rounded caps and joins. |
| `poly(points,material)` | Filled planar polygon; outlined except in Fill. |
| `mark(points,material)` | Flat inked polygon for a strong silhouette or emblem. |
| `inlay(points,material)` | Flat material polygon without an outline, useful for negative space. |
| `dot(point,radius,material)` | Screen-space circular detail. |
| `ring(x,y,z,radius,material,width)` | Horizontal circle projected as an isometric ellipse. |
| `logo(logo,origin,u,v)` | Places native source paths on a plane while preserving Beziers and winding. |

Named materials are `neutral`, `blue`, `purple`, `teal`, `coral`, `ink`, and `white`. Style conversion controls their face tones and edges. The Color palette uses electric blue, soft purple, teal, coral, and neutral bases; avoid per-icon color systems.

`Scene.render(style, accessibleName)` fits the geometry into 128×128 with 17 units of padding and caps magnification for compact objects. The outer contour is 1.6px; secondary lines may differ where the existing system uses them. Do not enlarge a tiny object with decorative outliers or alter the global camera to fix one icon.

The renderer fits recorded points, not every pixel of a thick stroke or dot radius. Inspect extremities for clipping. Place face marks slightly in front of their supporting surface and order them after the carrier to avoid occlusion. Arrowheads should join the shaft in projected space and keep a legible direction at 64px.

## Export outside the catalog

Import `Scene` and `STYLES` from the resolved collection root, instantiate a scene, call the definition's `draw(scene)` once, and write `scene.render(style, definition.name)` for each requested style. Use `pathToFileURL()` for dynamic absolute imports when paths contain spaces. This can run from a temporary or target-project module without changing `scripts/build.mjs`.

Export transparent, self-contained SVGs with the shared dimensions and accessible name. Current icon output uses only `<svg>`, `<path>`, and `<circle>`, explicit hex colors or `none`, and no scripts, external resources, raster images, filters, gradients, or font dependencies. Native path glyphs are suitable for small symbolic labels; avoid text-heavy miniatures.

Do not introduce a renderer-wide behavior change for a local geometry correction. If a shared renderer change is necessary, compare all affected styles and existing icons before accepting the larger diff.
