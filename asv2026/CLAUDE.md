# Deck: ASV 2026 (American Society for Virology)

15-minute talk, 15 slides. Source: `slides.md` (deckkit — see `../CLAUDE.md`
and `../deckkit/README.md`).

```bash
../deckkit/bin/deck build slides.md   # HTML — the deck you present
../deckkit/bin/deck png   slides.md   # per-slide PNGs, for checking layout
../deckkit/bin/deck pptx  slides.md --image-scale 4 -o nekrutenko_asv26.pptx
```

Always run `build` as well as `png` after an edit — checking a PNG while
`slides.html` is stale has caused confusion more than once.

## Argument

The deck is one argument in four moves; edits should preserve it:

1. **BRC-Analytics is the front door** — 1,920 pathogen taxa across bacteria,
   viruses and fungi; 5,060 assemblies; free compute at TACC via ACCESS-CI.
2. **Its real function is handing you to Galaxy** — the six-step flow from
   organism to result. BRC is a launcher, not a download site.
3. **The future is agentic.** Stated assertively on purpose (slide 9), then
   paid off by Orbit. Expect pushback in Q&A; that is intended.
4. **Logan** — the entire public SRA, reassembled and searchable, as the closer.

Slides 3 and 10 are deliberately the same three-pillar diagram under an
"Agents" brace, with only the title changed. That repetition is the callback —
do not collapse it.

Closing ask: a virologist should leave able to run *their own* pathogen through
it. The last slide is the one people photograph.

## Published

- Deck: <https://nekrut.github.io/slides/asv2026/>
- Short link: `gxy.io/asv26` — QR on the title and closing slides.
  **Live only once <https://github.com/galaxyproject/gxy.io/pull/131> merges.**
  Until then the QR falls through to gxy.io's default.
- `nekrutenko_asv26.pptx` — image-only fallback for PowerPoint-only venues,
  15 slides at 5120×2880. Regenerate it after *any* slide edit; it is a
  snapshot, not a build artifact that updates itself.

## Known limits

- **Slide 11 is a live widget**, lifted from galaxyproject.github.io/loom and
  inlined into `assets/orbit-demo.html` (~28 KB of markup, CSS and JS). It
  plays when its slide becomes active and replays on each visit, keyed off
  Marp's `bespoke-marp-active` class on the wrapping `<svg>`. In the PPTX and
  in PNG exports it is a still frame.
- Reduced-motion is deliberately overridden for that widget, since the
  animation *is* the slide's content.

## Assets

- `assets/brc/` — six workflow screenshots, logo, QR, from
  `~/git/infographics/what_is_brc`.
- `assets/galaxy/` — four Galaxy screenshots from
  `~/git/infographics-generator/sites/what_is_galaxy`, trimmed of their
  drop-shadow margin to 830×524.
- `assets/hanta/` — phylogeny and schematic from the May deck.
- `assets/qr/` — `asv26`, `testers`, `kmindex`, generated with `npx qrcode -t svg`.
- `images/` — workflow cards normalised to an identical 1077×426 so they tile
  cleanly on slide 5.

## Facts to keep accurate

Verified July 2026 — recheck before presenting:

- BRC: 1,920 taxa, 5,060 assemblies, TACC/ACCESS-CI, brc-analytics.org
- Galaxy: 750k jobs/month, 400k+ users, $2M+ free compute/year, 22k+ citations
- Orbit: Electron app, Galaxy MCP auto-registered, plan approval before
  execution, steps tagged `[local]`/`[hybrid]`/`[remote]`, `notebook.md` under
  git auto-commit. Still beta. galaxyproject.org/tools/orbit/
- Logan: v1.2 figures are on the slide (38M accessions, 87 Pbp raw, 8.5 Pbp
  unitigs, Dec 2025 freeze). The **preprint describes v1** (27.3M, 50 Pbp) — do
  not mix the two sets, and do not call the preprint published.
- kmindex on Galaxy: median 4 s single-index, 8.4 min all-index, from 186 + 17
  measured jobs. The all-index figure is a **worst case** — the wrapper queries
  indices sequentially within one job.
- The 383 novel papillomavirus types come from a **separate April 2026
  preprint** that used Logan, not from the Logan paper itself.
- LexicMap is a real IUC tool but is **not on usegalaxy.org** — it is live on
  usegalaxy.eu only. It was dropped from the outline for that reason; do not
  reintroduce it without naming the server.
- Hantavirus: 104 isolates, M segment, MV Hondius outbreak May 2026, six
  host-specific Contrast-FEL sites, site 649 in the W-A-A-S-A cleavage motif,
  selection intensity unchanged across the host transition (K ≈ 1).

Tone follows the May deck: objective about the biology, assertive about the
direction of the field.
