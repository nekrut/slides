# Presentations

All decks in this directory are built with **deckkit** (`deckkit/`), a Marp theme
plus markdown-it plugin. Read `deckkit/README.md` for the component reference
before editing or creating a deck.

## Core rule

Slide files carry **content only**. No `<style scoped>` blocks, no inline
`style=` attributes, no ad-hoc `<div>` layout. If a slide needs something the
component vocabulary cannot express, add it to `deckkit/themes/deckkit.css` (and
a component in `deckkit/lib/` if it takes data) so every deck gets it.

Colours are named accents (`sky`, `emerald`, `purple`, `amber`, `rose`, `indigo`,
`slate`, `navy`), never hex in a slide file.

## Build

```bash
deckkit/bin/deck build <deck>/slides.md    # HTML
deckkit/bin/deck png   <deck>/slides.md    # one PNG per slide
deckkit/bin/deck watch <deck>/slides.md    # live preview
deckkit/bin/deck new   <deck>              # scaffold
```

## Verify

Slides are a fixed 1280×720. After editing, render PNGs and look at the changed
slides for vertical overflow, footer collisions and broken image paths. When a
slide runs long, step its density class down (`compact` → `dense` → `micro`) or
drop the card `size=` a notch rather than nudging spacing by hand.

Local images are referenced by relative path in the built HTML, not inlined —
any deployment must copy the asset files alongside the `.html`.
