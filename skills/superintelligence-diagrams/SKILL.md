---
name: superintelligence-diagrams
description: Create or edit architecture, workflow, and research diagrams using SuperIntelligence SVG icons, with portable SVG, PNG, and Markdown outputs. Use for composing diagrams from this collection; not general websites, data charts, or new icon and logo design.
---

# SuperIntelligence diagrams

Compose readable diagrams from the collection's actual icon geometry. Preserve the user's architecture, chosen style, destination, and level of detail.

## Locate the collection and destination

Find the collection from a user-provided path, the current workspace, or an ancestor of this skill's resolved filesystem path (resolve installed symlinks first). Confirm `manifest.json`, `icons/`, and `package.json` with package name `superintelligence-icons`. If none is available, request its location; an installed skill alone does not contain the icon library.

Treat the collection as the asset source and the requested project as the output destination; they need not be the same directory. Reusing icons in another repository does not authorize changing this collection. Read its `manifest.json` for current IDs, descriptions, tags, styles, and file paths; do not hardcode the collection count or guess filenames.

## Establish the diagram's meaning

Identify the intended reader, image placement, nodes, relationships, and deliverables. For a familiar user-supplied flow, proceed directly. For a diagram claiming to reflect current documentation or an example repository, read [architecture grounding](references/architecture.md): verify primary sources, inspect the relevant implementation, and record the checked date and repository revision.

Separate execution, results, persistent state, evaluations, and telemetry when their roles differ. Show meaningful return paths, finish conditions, and bounded retries where relevant. A model/tool loop, application pipeline, and six-stage teaching cycle describe different things; choose the one the evidence and request support. Optional integrations must look optional.

## Compose and maintain the image

Search the manifest for suitable system concepts and product marks. Use one consistent style unless a comparison is requested. Prefer the closest existing concept with a precise label; a missing exact icon is not a reason to invent a vendor logo. Read [SVG composition and integration](references/svg-integration.md) when embedding the paths, exporting images, or updating this collection's docs.

Use a canvas sized for the content and destination. Keep the main flow easy to follow, route connectors around cards and labels, wrap long text explicitly, and leave room for arrowheads. Check readability at the actual embed width, typically about 960 px for a README; split an overloaded diagram instead of shrinking its labels.

Maintain editable source or a generator alongside the output. For existing diagrams, edit their generator rather than only the generated SVG. Collection examples normally receive all five styles; honor an explicitly requested subset and external-project scope.

## Verify and deliver

Render the SVG and inspect it at full size and intended embed width. Check clipped text, overlaps, connector endpoints, flow direction, icon scale, and optional-state labels. Verify accessible `title`/`desc`, unique IDs, valid internal references, and absence of external image/script dependencies.

Export PNGs explicitly when requested; `npm run build` generates SVGs, not their PNG snapshots. The collection provides `node scripts/render-svg.mjs input.svg --out output.png`, with optional `--width` and `--scale`. Use paths relative to the collection or absolute paths as appropriate.

When integrating into the collection, run its build and validation, regenerate matching README variants, and refresh the package if it is part of the requested deliverable. For external projects, run only relevant checks and preserve upstream assets. Report the SVG/PNG and source locations, a usable Markdown embed, and any substantive assumptions. Commit, push, or publish only within the user's existing authorization; using this skill does not grant those actions.
