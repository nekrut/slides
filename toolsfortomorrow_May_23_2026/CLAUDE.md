# Deck: Andes Hantavirus selection analysis (Tools for Tomorrow, May 2026)

Source of truth: `slides.md` (deckkit format — see `../CLAUDE.md` and
`../deckkit/README.md`).

Build: `../deckkit/bin/deck build slides.md` (add `png` to check layout).

Assets referenced by the deck, all relative to this directory:
`datamonkey.svg`, `results/segM_tree.png`, `scratch/bgm_network_new.svg`.

## Where the rest of the project lives

The HyPhy analysis this deck reports on — alignments, trees, FEL/MEME/BUSTED/
B-STILL output, scripts — stays in the `grants` repo under
`presentations/toolsfortomorrow_May_23_2026/`, along with
`outbreak_presentation.md`, the superseded hand-written deck this one replaces.
Only the deck and the assets it references live here.

Deployment (Sergei): the built HTML goes to
`data.hyphy.org/web/slides/BRC-hantavirus.html`. The asset files above must be
uploaded alongside it — the HTML links them by relative path rather than
inlining them.

## Scientific tone mandate

Slide text — titles, bullets, callouts — stays strictly objective:

- **No definitive claims.** Not "proves", "demonstrates", "guarantees",
  "essential for viability". Use "suggests", "indicates", "is associated with",
  "is consistent with", "mutational tolerance".
- **No emotive or hyperbolic adjectives**: "indispensable", "absolute",
  "extreme", "key", "strategic", "critical", "vital", "ideal".
- **No therapeutic or drug-discovery hype**: avoid "broad-spectrum target",
  "vaccine target design", "therapeutic vulnerability". Describe the observed
  evolutionary selection dynamics and nothing beyond them.
