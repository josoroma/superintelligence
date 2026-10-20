# Collection integration

Use this workflow only when the user wants to modify the collection itself. Read the current scripts before editing; the following identifies responsibilities rather than a frozen file list or release count.

## Source registration and metadata

1. Add or edit the appropriate `src/icons-*.mjs` definition. A new source module is useful for a coherent new group, not mandatory for every icon.
2. In `scripts/build.mjs`, import any new exported array and add it to `definitions`. Append new IDs to the ordered `ids` list. Keep existing IDs and order so stable manifest indices do not change. An existing-icon fix does not add an ID.
3. Supply meaningful names, descriptions, category, and search aliases. Use `collection: 'brands'` and complete brand metadata only for source-based platform marks.
4. Edit the Color source `README.md` to include new gallery entries and accurate collection totals. Update count claims in other hand-maintained files only where relevant. Derive counts from the current definitions or newly built manifest. Respect the repository's release convention for version changes; do not invent a release solely to edit an asset.

## Generated files and documentation

`npm run build` regenerates exported SVGs, `manifest.json`, the offline `index.html` preview, SVG contact sheets, brand references, diagrams, and style READMEs. Follow its current imports to identify additional generated assets.

`README.md` is the editable Color source. `scripts/readmes.mjs` generates `README-stroke.md`, `README-two-tone.md`, `README-duotone.md`, and `README-fill.md`. Keep its product-header markers, style-navigation blocks, protected five-style comparison, and expected headings intact. Edit the source and regenerate rather than hand-editing each derived README. Ensure new image paths follow the existing `icons/color/`, `previews/...color...`, or `examples/diagrams/color/` conventions so style substitution works.

Do not manually patch `manifest.json`, `index.html`, generated brand-reference rows, exported icon paths, or generated diagrams to bypass their source. Collection counts and preview entries flow from definitions through the build; inspect the generated result to confirm new IDs are actually reachable.

## Review and package

- Run `npm run check` after the build. It validates current manifest counts, file mappings, complete brand metadata, accessible labels, and native SVG constraints.
- Visually inspect changed icons in every style at 128px and 64px. In the offline preview, verify relevant searches, selection, and style switching, especially when adding a new category or metadata shape.
- Check that README galleries and style navigation resolve to the correct assets. Compare unchanged icons against the starting revision when adding new concepts or editing isolated geometry; unrelated geometry should not drift.
- `npm run build` creates SVG contact sheets but does not render their PNG counterparts. Refresh each changed sheet's existing PNG, including brand-only sheets when brand entries change. For example:

  ```bash
  node scripts/render-svg.mjs previews/color-contact-sheet.svg --out previews/color-contact-sheet.png
  ```

  Repeat for affected styles/sheets, using SVG dimensions instead of a hardcoded collection height. If a changed icon appears in a diagram with a committed PNG companion, rerender that PNG too. Do not manufacture PNGs for every icon unless requested.
- When shipping changed collection assets, documentation, or other packaged deliverables, run `npm run pack`. The ZIP is an explicit whitelist in `scripts/package.py`; ensure newly required source or asset directories are included. Exclude temporary QA captures. Check archive integrity and that packaged files match the workspace.
- Review `git diff --check` and the final file list. Commit or push only when authorized by the session; never infer publishing permission from skill invocation alone.

The packaged source, source references, current manifest, root READMEs, and generated asset previews should describe the same collection. Avoid fixed counts in reusable automation or validation.
