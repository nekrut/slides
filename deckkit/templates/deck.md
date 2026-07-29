---
marp: true
theme: deckkit
size: 16:9
paginate: true
header: 'Series name | Subtitle'
footer: 'Venue • Date'
---

<!-- _class: title -->

Badge text {.badge}

# Deck title

## Deck subtitle in caps

::: presenter
Author name

Date
:::

---

<!-- _class: dense -->

# A two-column slide

The paragraph under the title is the lead — one sentence of context.

::: cols gap=30px
## Left heading

- **Point:** supporting detail.
- **Point:** supporting detail.

+++

## Right heading

- **Point:** supporting detail.
:::

::: callout title="Takeaway" icon="💡"
The line you want the audience to remember.
:::

---

<!-- _class: compact -->

# A card grid

::: cards cols=2 gap=15px size=sm
### First card {tag="Category" accent=sky}

Body text.

- **Detail:** supporting text.

### Second card {tag="Category" accent=emerald}

Body text.

### Third card {tag="Category" accent=purple}

Body text.

### Fourth card {tag="Category" accent=amber}

Body text.
:::

---

<!-- _class: dense -->

# A figure slide

::: cols ratio="1fr 1fr"
::: card title="What this shows" accent=navy size=md caps
Explanation of the figure.

::: note accent=sky
**Conclusion:** the one-line reading of the data.
:::
:::

+++

::: figure src="assets/figure.png" h=360px
Optional caption
:::
:::
