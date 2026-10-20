# LangChain product marks

The SVG assets in this directory are unmodified downloads from the official
[LangChain brand-assets page](https://www.langchain.com/brand-assets), checked on
2026-10-20. `sources.json` records their exact source URLs and the path indices
selected by the editable data in `src/logos/langchain-platforms.mjs`.

| Asset | Source identity | Treatment in the package |
| --- | --- | --- |
| `langchain-official-lockup.svg` | Current LangChain open-source framework lockup | Retains the linked-chain badge; omits the wordmark. |
| `langgraph-official-lockup.svg` | Current LangGraph open-source framework lockup | Retains the four-node badge; omits the wordmark. |
| `deep-agents-official-lockup.svg` | Current Deep Agents open-source framework lockup | Retains the folded geometric badge; omits the wordmark. |
| `langsmith-official-symbol.svg` | Current LangSmith black symbol | Retains all four symbol paths. |

Selected path data is unchanged. The source rectangular export clips and masks
are omitted in the standalone icon artwork; Deep Agents’ mask only trims a
subpixel fraction of the top edge. LangChain’s stroke widths and butt caps are
preserved. Color retains the official flat colors. The other styles recolor the
marks to the collection’s tonal palette, with pale foregrounds on the three
framework badges to preserve contrast.

These isometric and tonal presentations are unofficial variants. The official
guidelines request the provided colors, proportions, clear space, and original
lockups, and disallow effects or off-brand recoloring. Use the linked original
assets when an application requires compliance with those guidelines. Inclusion
does not imply endorsement or affiliation.

LangChain retains all rights in its brand artwork and trademarks. The framework
code licenses are not artwork or trademark licenses. This package grants no
open-source artwork or trademark license for these marks; applicable brand-owner
rights and source usage terms continue to apply. The original isometric carrier
and package code remain covered by the repository’s own license.
