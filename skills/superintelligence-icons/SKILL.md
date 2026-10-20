---
name: superintelligence-icons
description: Create, extend, or refine native isometric SVG icons in the SuperIntelligence visual system, including its five styles and source-based platform marks. Use for collection changes or matching standalone icons; not raster image generation or diagram composition.
---

# SuperIntelligence Icons

Author native vector geometry once and render it through the collection's shared `Scene`. Preserve the existing visual language and the user's requested destination.

## Establish the source and scope

Find the collection in the current workspace, a user-provided path, or an ancestor of this skill's resolved real path. Confirm it by checking for `src/scene.mjs`, `scripts/build.mjs`, and `manifest.json`; do not assume the repository's directory name. A locally installed symlink may resolve back into the collection. If none is available, request the collection path before dependent work.

Read applicable repository instructions, `package.json`, the current manifest, and the nearest relevant source module. Search for existing concepts and aliases before adding an icon. A request to fix an icon should change its existing source definition and retain its ID.

Distinguish two scopes:

- **Collection work:** change source definitions and update the repository's generated deliverables. Read [collection integration](references/collection-integration.md).
- **Standalone work:** use the collection's renderer to create matching SVGs in the user's requested output location. Keep a small editable source module with the result when useful. Do not add catalog entries, rewrite collection documentation, or change the source repository merely to produce an icon for another project.

Do not publish, push, or modify another repository unless the current session authorizes it. Existing authorization remains valid; this skill adds no separate approval step.

## Draw in the shared visual system

Read [geometry and rendering](references/geometry.md) when authoring or adjusting geometry. Use an original, recognizable physical metaphor with a distinct silhouette. Compare related icons so the new concept is distinguishable at UI sizes.

The collection renders `stroke`, `two-tone`, `duotone`, `fill`, and `color` from the same geometry. Retain the shared 128×128 viewBox, 45° azimuth / 30° elevation, generous 17-unit padding, rounded joins, and 1.6px outer contours. These settings belong to `Scene`, not per-icon overrides. Use its named materials and existing primitives; keep flat fills and transparent backgrounds.

For company, product, or agent identities, read [platform marks and provenance](references/platform-marks.md). Preserve sourced logo geometry and keep third-party rights distinct from original system artwork. An instruction-file icon such as `CLAUDE.md` can be original concept art without becoming an official brand mark.

For collection changes, edit `src/icons-*.mjs` and, for sourced artwork, `src/logos/*.mjs`. Repair the source definition and regenerate its SVGs. Check all five collection styles even when the reported defect appears in only one; standalone work follows the user's requested styles and destination.

## Verify the actual result

For collection work, run `npm run build` and `npm run check` from the collection root. Treat current manifest data as the source of counts, IDs, styles, and paths; never assume a fixed collection size. The validator checks structural SVG requirements, not whether an icon looks right.

Render and inspect the changed icons in all five styles at 128px and 64px. Use an available SVG-capable renderer; the repository supplies:

```bash
node scripts/render-svg.mjs icons/color/agent.svg --out /tmp/agent-review.png
node scripts/render-svg.mjs icons/color/agent.svg --out /tmp/agent-review-64.png --width 64
```

Substitute the changed ID and styles. Check clipping, disconnected arrowheads, obscured features, thin gaps, flat-style contrast, consistent apparent scale, and recognizable silhouettes. Review against neighboring icons rather than relying only on an enlarged isolated render. For standalone exports, apply the same native-vector and visual checks without requiring a catalog build.

For collection delivery, refresh changed raster previews and the download ZIP as described in the integration reference. Report the files produced, any source-license constraints for added brands, and validation performed. Distinguish completed local work from any authorized publication actually performed.
