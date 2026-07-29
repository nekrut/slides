# Deck: ASV 2026 (American Society for Virology)

15-minute talk, 12 slides. Source: `slides.md` (deckkit — see `../CLAUDE.md`
and `../deckkit/README.md`). Build: `../deckkit/bin/deck build slides.md`.

## Argument

The deck is one argument in four moves, and edits should preserve it:

1. **BRC Analytics is the front door** — 1,920 pathogen taxa across bacteria,
   viruses and fungi; 5,060 assemblies; free compute at TACC via ACCESS-CI.
2. **Its real function is handing you to Galaxy** — the six-step flow from
   organism to result. BRC is a launcher, not a download site.
3. **Workflows only answer anticipated questions.** This is the hinge, and it is
   stated assertively on purpose: analysis is moving from running a pipeline to
   directing an agent that assembles one. Orbit is an instance of that.
4. **Logan and LexicMap** — two slides on what they are and how to reach them
   in Galaxy.

The **Andes hantavirus glycoprotein** analysis is the running example, reused
from `../toolsfortomorrow_May_23_2026`. The same question appears twice: once
answered by a hand-built workflow (slide 5), once directed through an agent
(slide 9). That repetition is the point of the deck — do not collapse it.

Closing ask: a virologist should leave able to run *their own* pathogen through
it. The last slide is the one people photograph.

## Still to fill in

Placeholders render as dashed `.todo` blocks so they cannot be missed:

- Orbit screenshots — plan-approval pause and the `notebook.md` pane (slide 9).
- Logan/LexicMap exact Galaxy tool names and a tool-panel screenshot (slide 11).
- Conference dates on the title slide.

## Assets

- `assets/brc/` — six workflow screenshots plus logo and QR code, from
  `~/git/infographics/what_is_brc`. Screenshots are downscaled to 900px and
  cropped to a uniform band by `thumb=120px` on the cards grid.
- `assets/hanta/` — phylogeny, BGM network and the Data→Analysis→Inference
  schematic, from the May deck.

## Facts to keep accurate

Verified as of July 2026 — recheck before presenting:

- BRC: 1,920 taxa, 5,060 assemblies, TACC/ACCESS-CI, brc-analytics.org
- Orbit: Electron app, Galaxy MCP server auto-registered, plan approval before
  execution, steps tagged `[local]`/`[hybrid]`/`[remote]`, `notebook.md` under
  git auto-commit. Still beta. galaxyproject.org/tools/orbit/
- Logan: assembly over the entire SRA, 87 petabases at construction; unitigs
  preserve sample information, contigs trade variation for length.
- LexicMap: aligns queries above ~500 bp against millions of prokaryotic
  genomes.
- Hantavirus: 104 isolates, M segment, MV Hondius outbreak May 2026, six
  host-specific Contrast-FEL sites, site 649 in the W-A-A-S-A cleavage motif,
  selection intensity unchanged across the host transition (K ≈ 1).

Tone follows the May deck: objective about the biology, assertive about the
direction of the field.
