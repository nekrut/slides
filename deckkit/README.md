# deckkit

A Marp-based presentation system: write a **content-only markdown file**, get the
polished HTML deck. All styling lives in one theme (`themes/deckkit.css`); slide
files contain no CSS.

```bash
deckkit/bin/deck build  mydeck/slides.md    # -> slides.html
deckkit/bin/deck png    mydeck/slides.md    # -> slides.001.png, ...
deckkit/bin/deck pdf    mydeck/slides.md
deckkit/bin/deck watch  mydeck/slides.md    # live preview
deckkit/bin/deck new    mydeck              # scaffold a new deck
```

Reference deck: `../toolsfortomorrow_May_23_2026/slides.md`.

## Deck file skeleton

```markdown
---
marp: true
theme: deckkit
size: 16:9
paginate: true
header: '![logo](https://example.org/logo.svg) Series | Subtitle'
footer: 'Event • 22 May 2026'
---

<!-- _class: title -->

# Deck title

## Deck subtitle

---

<!-- _class: dense -->

# Slide title

One sentence of context — the paragraph right under an `h1` is styled as the lead
automatically.

...components...
```

Slides are separated by `---`. Per-slide classes go in a `<!-- _class: ... -->`
comment.

### Slide classes

| Class | Use |
| --- | --- |
| `title` | title slide: gradient wash, navy edge, no header/footer |
| `divider` | full-navy section break |
| `compact` / `dense` / `micro` | density steps (20 / 19 / 18px) for busy slides |
| `headroom` | pulls the title block up when a slide is very full |

Slides are a fixed 1280×720. When content grows, step the density class down
rather than hand-tuning spacing.

## Block components — `::: name`

Nest them freely; every level uses plain `:::`.

### `cards` — a grid of cards, one per `###`

```markdown
::: cards cols=2 gap=15px size=xs
### Recombination Screening (GARD) {tag="Control Module" accent=slate}

Identifies breakpoints to control for phylogenetic conflict.

- **Pre-flight Check:** Reduces false positive selection signals.

### Temporal Selection Spikes {tag="When? (Episodic)" accent=sky}

Detects transient evolutionary pressure.
:::
```

Container attributes (`cols`, `gap`, `ratio`, `accent`, `border`, `size`, `caps`,
`checks`) become defaults for every card; the `{...}` block on a heading
overrides them per card.

Card attributes: `tag`, `icon`, `subtitle`, `accent`, `border=left|top|none`,
`size=xs|sm|md|lg`, `caps` (uppercase title), `checks` (✓ bullets).

### `card` — a single card

```markdown
::: card title="Why Analyze Glycoprotein M?" accent=navy size=md caps
Body markdown.
:::
```

### `cols` — columns split by `+++`

```markdown
::: cols ratio="1.15fr 0.85fr"
left column
+++
right column
:::
```

Without `+++` it is a plain grid wrapper (`cols=3`, `gap=30px`, …).

### `callout` — the accented strip

```markdown
::: callout title="Integration Strategy" icon="https://www.hyphy.org/images/logo.svg" dim slim
Body text.
:::
```

`icon` takes a URL (rendered as an image, `dim` darkens a light logo) or an emoji.
`slim` is the compact variant for the bottom of a dense slide.

### `note`, `box`, `figure`, `presenter`

```markdown
::: note accent=emerald
**Conclusion:** No significant change in selection intensity.
:::

::: box title="Summary Takeaways" accent=sky size=md
- Point one
:::

::: figure src="results/tree.png" h=360px
Optional caption
:::
```

`figure` takes `src`, `h`, `alt`, and `bare` (no frame).

## Data components — fenced blocks

Text fields accept inline markdown; ` // ` becomes a line break.

### `metrics`

```
​```metrics accent=sky
Human Branches dN/dS | 0.0224
P-value (Threshold 0.05): 0.3104 (NS)
​```
```

### `timeline`

```
​```timeline
track: Hantavirus Submissions | Active Monitoring (n=994) | accent=sky
node: 10% | Oct 2025 | 174 hits | Peak Submissions // (Spring Onset) | lg
node: 80% | Mid May '26 | 0 hits | Complete Gap | open
​```
```

Node fields: `position | label | value | note | size`. Sizes: `lg`, `md`, `sm`,
`open` (hollow dashed dot).

### `genemap`

Positions are real coordinates; percentages are derived from `length=`, so
segments and markers stay aligned.

```
​```genemap length=1137 accent=purple
segment: Gn Head (1–512) | 1-512 | #3B82F6
segment: | 648-651 | #EF4444 | title="Cleavage Motif"
ticks: 1, 512, 648, 1000, 1137
mark: 71
mark: 978 | 978: ACA | raise
​```
```

`mark: position | label | raise` — `raise` staggers a marker that would collide
with its neighbour. A segment can force a width with `w=0.8%`.

### `pills`, `motif`, `brandbar`

```
​```pills
22 | Gn Head
685 | Gc Head
​```

​```motif accent=purple label="Site 649 (Middle Alanine)"
W - A - [A] - S - A
​```

​```brandbar
https://brc-analytics.org/logo/brc.svg | 28 | invert
https://datamonkey.org/assets/img/header-logo.svg | 24
​```
```

`[X]` highlights a motif position. `invert` flips a dark logo white for the
brandbar's navy plate.

## Inline

- `{{logo T:67 L:33}}` — sequence-logo stack; works inside table cells.
  A residue without a percentage takes the remaining share.
- `[text]{.class}` — span with classes. Useful ones: `.badge`, `.mono`, `.dim`,
  `.muted`, `.center`, colours `.c-sky` `.c-emerald` `.c-purple` `.c-amber`
  `.c-rose`, accents `.accent-purple` (pairs with `.badge`).
- Markdown tables are styled by the theme — use them instead of HTML tables.

## Colour

Accents are named, not hex: `sky`, `emerald`, `purple`, `amber`, `rose`,
`indigo`, `slate`, `navy`. Pass `accent=` to any component; it drives the border,
bullets, tags, metric values and marker colours together.

Re-brand a deck without touching the theme by overriding tokens in front matter:

```yaml
style: |
  :root { --sky: #B91C1C; --ink-strong: #450A0A; }
```

## Layout

`lib/` holds the markdown-it plugin — `container.mjs` (`:::` parsing),
`components.mjs` (block components), `fences.mjs` (data components),
`inline.mjs` (`{{...}}`), `attrs.mjs` (shared parsing). `marp.config.mjs` wires
the plugin and theme into marp-cli.

Local images are referenced by relative path in the built HTML, not inlined —
ship the asset files alongside the deployed `.html`.
