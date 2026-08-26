---
marp: true
theme: deckkit
size: 16:9
paginate: true
header: 'Analysis | Papers and the datasets they generated'
footer: 'Paper ↔ SRA linkage · analysis log · 2026'
---

<!-- _class: compact -->

# The identifiers, and how they connect

The first letter shows the archive: **S** is NCBI, **E** is EBI, **D** is DDBJ. The three archives exchange all records each day, and thus the same data has one number in each archive.

```embed src="assets/accession-map.html" w=1180px scale=0.86 h=370px
```

**The difference between NCBI and EBI.** Each project has two numbers in both archives: the BioProject number and the study number. EBI gives both numbers in one record, and NCBI keeps BioProject and SRA in different databases. GEO is only at NCBI.

<!--
The same slide opens presentation-v2. Every analysis that follows counts one of
these record types, and counting the wrong one is the most common way to get a
number wrong here: a BioProject is not a study, a sample can sit in many
projects, and a GEO series sits on top of a BioProject the paper never prints.

Analyses are added below in the order they were run, not reordered afterwards
into a tidier story than the one that occurred.
-->

---

<!-- _class: compact -->

# How much data is behind one BioProject?

Counted over the **235,825** projects in the linkage table that have runs in the accession map, out of 310,810 in total.

```embed src="assets/per-project.html" w=1180px scale=0.86 h=360px
```

**Median 13 runs, but a long tail.** Half of all projects hold between 6 and 38 runs. The largest holds **2,700,701**. A mean of 108 describes almost nothing here, and any ranking that uses one will be led by the tail.

**Runs and experiments track each other almost exactly** — one library, sequenced once, is the normal case. **Studies are not plotted: every project has exactly one**, which is how ENA models the relationship rather than a fact about the data.

<!--
Buckets are half-open on the right and sum to 235,825 in both series.

74,985 projects in the linkage table have no rows in the accession map at all.
They are not zeros and are excluded rather than drawn as an empty bucket: the
map is built from an ENA snapshot, so a project registered after it, or one
whose data is at NCBI only, is absent rather than empty. Drawing them as zero
would invent a peak at the left edge.
-->

---

<!-- _class: compact -->

# What organisms are these projects about?

Every study's `tax_id` rolled up to **genus** using the NCBI taxonomy dump, over the **192,542** projects that carry one. Tile area is the project count. **Click a tile to open it** — the tail tile pages through the rest, a named genus opens its species. Back, or Escape, returns.

```embed src="assets/taxonomy.html" w=1180px scale=0.80 h=400px
```

**Two genera are more than half the corpus.** *Homo* is 31.8% and *Mus* 21.3%. The next 8 named genera together are 14%, and the remaining **7,700** are 33%.

**No other named genus reaches 2%.** The two metagenome tiles — 11,656 projects with no genus at all — are kept at the rank they do reach rather than dropped.

<!--
Rank used: 19,199 of 20,269 tax_ids resolve to a genus. The rest stop higher —
612 at no rank, 212 at family, and so on — which is what a metagenome or an
environmental sample looks like in this taxonomy. Dropping them would have
biased the picture toward organisms with tidy lineages.

Colour is kingdom, assigned in fixed order and never cycled. It is identity,
not magnitude: kingdoms have no order, so a sequential ramp would imply one.

The map is interactive: the tail tile pages ten genera at a time, a named
genus opens its species, and every tile has a hover tooltip. Species detail is
carried for genera with 20 or more projects, which is 90% of them; below that
the tile is a leaf. The whole thing is 440 KB of inlined data and script, so
the deck stays self-contained with no server.

Colour is eight fixed groups, never generated. The dump has 21 kingdom-level
names in this slice, and a 21-swatch legend is not a legend - "Heunggongvirae"
tells a reader nothing. Animals, plants, fungi, bacteria, archaea, viruses,
no-genus and other.

Two traps in the source. `superkingdom` was renamed `domain` in recent NCBI
dumps, and asking only for the old name returns "unclassified" for every
organism on earth - the first run of this slide did exactly that. And the tail
is cut at 10 named tiles: 7,700 genera below that are one honest "other" tile rather
than a few thousand slivers, since a tile too small to label is a tile nobody
can read. Two earlier cuts, at 28 and 15 tiles, left a third of the tiles
unlabelled or clipped; labels are now truncated with an ellipsis rather than
allowed to overflow.

118,238 linkage projects carry no tax_id and are outside this chart entirely.
-->

---

<!-- _class: divider middle -->

# What ENA records at each level

Four entities, four field sets. The first thing to know is that one of them does not exist.

<!--
The next four slides are an inventory, not a measurement: what ENA *can*
return, before asking how much of it is filled. Highlighted names are already
in the database.
-->

---

<!-- _class: compact -->

# BioProject and Study are one record

ENA does not separate them. A single `study` record carries **both** accessions: `study_accession` is the BioProject (`PRJEB…`, `PRJNA…`) and `secondary_study_accession` is the study (`ERP…`, `SRP…`). NCBI keeps them in two databases; ENA does not.

```embed src="assets/fields-study.html" w=1180px scale=0.80 h=180px
```

So there is no separate BioProject field set to show. **28 fields describe the project and the study together**, and 7 are in the database.

<!--
This is why the four slides asked for are three plus sample. Making a separate
BioProject slide would mean inventing a distinction the archive does not make.
-->

---

<!-- _class: compact -->

# Experiment — how the library was built

The experiment is the library: one preparation from one sample, sequenced one or more times. This is where the design fields live.

```embed src="assets/fields-experiment.html" w=1180px scale=0.80 h=168px
```

**22 fields.** The seven already pulled are the ones an experimental-design question needs: `library_strategy`, `library_source`, `library_selection`, `library_layout`, `instrument_platform`, `instrument_model`, `nominal_length`.

`library_construction_protocol` is free text averaging 600 characters — about 26 GB across all runs, so it has to be sampled rather than downloaded.

---

<!-- _class: compact -->

# Run — one execution, and where the files are

```embed src="assets/fields-run.html" w=1180px scale=0.78 h=232px
```

**35 fields, and 26 of them are file locations and checksums** — four copies each of `fastq`, `bam`, `sra` and `submitted`, one per access method. Strip those and the run level carries almost nothing about the experiment: an accession, a date, an alias, `read_count`, `base_count`, `nominal_sdev`.

This is why the first richness metric measured nothing. It was built from run records, and run records describe delivery, not biology.

---

<!-- _class: micro -->

# Sample — where the biology is, and why the list misleads

```embed src="assets/fields-sample.html" w=1180px scale=0.70 h=470px
```

**119 curated columns, and this list is the trap.** Submitters do not fill a schema: BioSample attributes are free-form, and the corpus holds **53,151 distinct keys** across 254,028,924 attribute rows. A column exists here only because ENA chose to surface that key — which is why the attributes came from the NCBI bulk release instead.

---

<!-- _class: divider middle -->

# Does having a paper make the data better described?

It is the obvious hope for this table. Two teams of agents tested it, each told to attack the other's answer. The answer is no.

<!--
The hope: a dataset with a paper behind it had someone who cared about it, so it
should be described better, and the linkage table should therefore be a way of
finding well-described data. Tested 2026-08-25. Full write-up in
FINDINGS-2026-08-25.md.
-->

---

<!-- _class: compact -->

# First: what does "better described" mean?

Every sample carries a list of labels the submitter typed in. Counting them is the simplest measure of how well a dataset is described.

```text
BioSample SAMN12345678
    tissue        liver
    age           6 weeks
    sex           male
    treatment     vehicle control
    strain        C57BL/6J
```

**Five labels.** A sample with two is thin; a sample with twenty is rich. The typical sample in this archive has **five**.

**But a dataset with a paper is not a typical dataset.** It is newer, far more likely to be human or mouse, and far more likely to have gone through GEO — and each of those three things raises the label count on its own. So we never compare across those lines. A human RNA-Seq study from 2019 with a paper is compared only against human RNA-Seq studies from 2019 without one.

<!--
Attributes come from the NCBI BioSample bulk release rather than ENA's curated
columns, because ENA surfaces a key only if it chose to, and submitters are not
filling a schema - the corpus holds 53,151 distinct keys.

"Comparing only like with like" is stratified matching on three variables:
archive routing, submission year, and genus.
-->

---

<!-- _class: compact -->

# The answer, and something to compare it against

Paper-linked datasets carry **0.118 more labels per sample** than comparable datasets without a paper. Out of about five. Is that a lot?

To find out, we need a yardstick, so we took the datasets that have **no paper at all** and split them on something meaningless: whether their accession number was issued in America or in Europe. Nothing about the science differs. It is a clerical fact about which office handed out the number.

```metrics accent=rose
Which office issued the number | 10.8 labels
Whether the project is large or small | 0.47 labels
Whether a paper exists | 0.118 labels
```

**A purely bureaucratic distinction separates this archive about ninety times more sharply than having a paper does.** Whatever the linkage table is good for, finding better-described data is not it.

<!--
Nine more placebo splits were built, none of them involving papers. A random
50/50 split of the unlinked archive gives -0.014 to +0.017 across eight draws,
which says the measuring instrument itself is unbiased - the effects above are
real differences, they are simply not about papers.
-->

---

<!-- _class: compact -->

# The check that rules out the alternative

You could still argue the papers *do* help, and something else is hiding it. So we ran the comparison inside the linked set, where that objection cannot apply.

Every paper here is findable and open-access, recent, usually GEO-routed. **The two groups differ in one thing only: whether the paper's authors produced the data, or merely reused someone else's.** If writing a paper about your own data makes you describe it more carefully, this is where it would show.

| | datasets | typical label count | how varied the labels are | groups per study |
|---|---:|---:|---:|---:|
| **authors produced the data** | 119,545 | 5.0 | 0.387 | 4.0 |
| **authors reused someone else's** | 42,471 | 5.0 | 0.374 | 4.0 |

**Identical.** Producing the data yourself does not make you describe it better.

So the small differences we do see between linked and unlinked data are about **which kinds of study end up with a findable paper** — not about anyone taking more care.

<!--
This is the cleanest control in the corpus: both arms passed the identical
discovery filter and differ only in authorship. Re-derived directly from the
bs_* columns on `study` after the teams reported. One figure did not reproduce
exactly - the team gave reused entropy as 0.364, direct measurement gives 0.374.
The conclusion does not move.

"How varied the labels are" is Shannon entropy over attribute values within a
study: a study where every sample says "tissue: liver" scores 0, one that
actually distinguishes its samples scores higher. It matters because a study can
carry many labels that are all identical, which describes nothing.
-->

---

<!-- _class: compact -->

# One field where it is true, one where it is backwards

::: cards cols=2 gap=20px size=md border=top
### Papers help here {accent=emerald}

**What tissue the sample came from.**

The one field that holds up no matter how the data is sliced — by archive, and separately within RNA-Seq, whole-exome, methylation and ATAC-seq.

### Papers hurt here {accent=rose}

**The insert size of the library** — a number needed to analyse paired-end data.

Present on **12.5%** of unlinked runs and only **6.5%** of paper-linked ones. Worse in every one of 13 years.
:::

**And the strongest-looking result was an illusion.** Free-text protocol descriptions appeared far more often on unlinked data — until we accounted for the fact that GEO submissions behave differently and are over-represented among papers. That single fact explained **96%** of the gap, and counting each project once outside GEO flips it the other way.

Any claim that papers select for better description has to explain why paper-linked data is **half as likely to record an insert size**.

---

<!-- _class: compact -->

# Two things we assumed we could measure, and cannot

**We wanted to ask: did the submitter declare which template they filled in?** It sounded like a fair test of diligence. It is not a choice at all.

```stats accent=amber
190,113 | of 190,113 European samples | declare one
0 | of 261,971 American samples | declare one
0 | of 6,962 Japanese samples | declare one
```

Three of our four proposed quality measures rested on this field. All three were measuring **which continent registered the sample**.

**And the archive is far smaller than it looks.** Forty-six million records were not deposited one at a time — a sequencing centre uploads two hundred thousand samples in a single batch, from one template, as one decision. Half the archive sits in **54 such batches**. So the real number of independent choices is closer to **a hundred thousand than to forty-six million**, and every percentage we have quoted so far implies far more precision than it has.

<!--
Field name is `checklist`. The split is by accession prefix: SAMEA (EBI), SAMN
(NCBI), SAMD (DDBJ). This also explains the earlier finding that EBI-registered
projects looked thinner - it was the same artifact seen from the other side.

The batching result: between-block variance by submitting centre and package is
83.9% against a permutation floor of 0.6%. The fix needs none of the refuted
machinery - report per-field presence weighted per record and weighted per
submission batch, side by side, and let the gap between them speak.

All four candidate completeness measures were refuted with concrete failure
cases rather than softened into caveats. Two ideas survived: gate on whether a
study can actually yield a usable question, and refuse to average unlike fields
into a single headline score.
-->
