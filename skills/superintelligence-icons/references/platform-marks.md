# Platform marks and provenance

Use this reference for real agent, model, product, company, or platform identities. Original concepts such as GPU, tokenization, or instruction files do not automatically need branded artwork.

## Verify the current identity

Search the existing manifest and `src/logos/` first. For a new or corrected mark, inspect the user's attached reference or current official brand/product resources. Prefer official native vector assets. Use a clearly attributed vector library only when necessary and record its source and terms. Distinguish related products rather than assuming a parent company's logo represents every product.

Do not substitute a generic geometric approximation when the request is to match the real mark. If the authoritative identity is ambiguous, complete independent work and ask for the specific missing reference. If only raster artwork is available, any vector trace should preserve the supplied silhouette and be identified as a trace in source notes.

## Preserve native artwork

Store reusable path data and source metadata in `src/logos/*.mjs`; follow a nearby module's schema. Keep path curves, fill rules, proportions, required transforms, and internal negative space. The `Scene.logo()` adapter preserves native Beziers on the isometric face. Use `logoTile()` in `src/brand-kit.mjs` for the collection's shared carrier rather than designing a new platform-specific tile system.

Keep the exported SVG free of embedded bitmaps and runtime external references. Sanitize fetched vector data into the explicit path representation; do not embed untrusted SVG scripts, event handlers, or remote links. When an official source uses gradients, document any flat-color simplification. If tonal conversion loses internal separation, provide a `monoPaths` variant or existing per-path tonal metadata instead of changing the source silhouette.

Color exports preserve source flat colors where practical; the other four styles use the renderer's tonal treatment. Review all five, particularly marks with white cutouts or neighboring dark shapes.

## Record provenance and rights

Use the existing branded-definition structure:

```js
{
  id, name, category: 'Agents & platforms', collection: 'brands',
  brand: {
    organization, productType, website, reference,
    artwork: 'Brand mark in isometric presentation',
    assetSource, assetLicense, assetName, assetNotes,
  },
  description, tags,
  draw: s => logoTile(s, logo, accent),
}
```

`reference` identifies the brand/product reference; `assetSource` identifies the actual artwork source. Record the source's real license or usage terms and adaptation notes. Retain necessary downloaded references and license notices under `vendor/brand-logos/` using the repository's existing conventions. Do not assert that a logo is MIT-licensed because the collection's original code or presentation is MIT-licensed.

The build derives `BRAND-REFERENCES.md`, manifest provenance, brand gallery data, and preview links from these definitions. Keep unofficial presentation and third-party rights clear, and avoid claims of endorsement. Rebuild and confirm both the displayed geometry and source links.
