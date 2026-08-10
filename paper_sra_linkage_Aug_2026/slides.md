---
marp: true
theme: deckkit
size: 16:9
paginate: true
header: 'Lab meeting | Papers and the sequencing data they produced'
footer: 'Ground truth for paper–dataset linkage • 10 August 2026'
---

<!-- 20 slides. Every figure is measured — see CLAUDE.md for provenance. -->

<!-- _class: title -->

Lab meeting {.badge}

# Which paper made this data?

## Building ground truth that links a publication to the sequencing datasets it actually generated

::: presenter
Anton Nekrutenko

10 August 2026
:::

<!--
The whole talk is one question: given a paper and an accession number, did that
paper produce that data, or is it just citing someone else's? Everything else
follows from how hard that turns out to be.
-->

---

<!-- _class: compact middle -->

# What we are trying to build

One table. Two columns. Nothing else.

| Column | Contents |
| --- | --- |
| **Paper** | a published article, identified by its PubMed number |
| **Dataset** | the sequencing data **that paper produced** — one or more archive accession numbers |

::: cards cols=2 gap=20px border=top size=md
### In scope {accent=emerald}

Data the authors generated: they ran the sequencer, deposited the reads, and the paper describes those samples.

### Out of scope {accent=rose}

Every other accession the paper mentions — data downloaded from someone else, reanalysed, benchmarked against, or used as a control cohort.
:::

<!--
This distinction is the entire talk. It sounds like a bookkeeping detail. It is
not: it decides whether the resource is usable at all.
-->

---

<!-- _class: compact middle -->

# The cast of characters

Four names that will keep coming up. Plain-language versions.

::: cards cols=2 gap=18px size=md border=left
### SRA and ENA {tag="the archives" accent=sky}

The **Sequence Read Archive** (NCBI, USA) and the **European Nucleotide Archive** (EMBL-EBI). Public repositories where raw sequencing reads get deposited. They mirror each other, so the same data sits in both.

### BioProject {tag="the umbrella" accent=indigo}

The record that groups everything one study deposited. Accessions look like `PRJNA937381`.

### GEO {tag="the side door" accent=purple}

**Gene Expression Omnibus** — a separate NCBI database for gene-expression studies. A GEO *series* such as `GSE305927` sits on top of a BioProject that the paper usually never names.

### PMID {tag="the paper's number" accent=slate}

**PubMed ID** — the unique number for a published article in NLM's biomedical literature index.
:::

---

<!-- _class: compact middle -->

# Why we want this

The eventual experiment needs a clean answer key before it can start.

::: cards cols=3 gap=18px size=md border=top
### Take a dataset {tag="1" accent=sky}

A real deposited study, with all of its sample-level annotation intact.

### Hide the metadata {tag="2" accent=amber}

Remove what tissue, what treatment, how many experimental groups.

### Ask a model to reconstruct it {tag="3" accent=purple}

Give a model such as Opus only the paper, and see how much of the hidden metadata it can put back.
:::

::: callout title="Why linkage comes first" icon="🔑"
Scoring that experiment requires knowing which paper genuinely describes which samples. Pair a dataset with a paper that merely cited it and the "answer key" is describing an experiment nobody wrote about.
:::

---

<!-- _class: divider middle -->

# A paper mentioning an accession does not mean the paper produced it

The task is not *find accessions in papers*. It is *tell generated from reused*.

<!--
Papers cite other people's datasets constantly. Reanalysis, meta-analysis,
benchmarking, control cohorts. This is normal, good scientific practice — and it
is exactly what makes the extraction problem hard.
-->

---

<!-- _class: compact middle -->

# Generated vs. reused

The same accession number, printed in the same font, in the same sentence position.

::: cards cols=2 gap=24px size=md border=top
### Generated {icon="🧬" accent=emerald}

The authors ran the sequencer. They deposited the reads. The paper describes those samples.

*"Raw reads were deposited under accession ..."*

### Reused {icon="♻️" accent=rose}

Somebody else's data, cited for reanalysis, meta-analysis, benchmarking or as a control cohort.

*"Publicly available data were obtained from accession ..."*
:::

::: note accent=rose
Get this wrong and the ground truth is poisoned: you end up asking a model to predict the metadata of samples the paper never described.
:::

---

<!-- _class: compact middle -->

# The scan

Every open-access full text we could read, every accession-shaped string in it.

```stats accent=sky
622,896 | open-access papers | scanned end to end
1,717,129 | accession mentions | extracted from full text
658,946 | paper–dataset pairs | after deduplication
```

<!--
Scale is not the hard part. Extraction at this scale is a solved engineering
problem. Deciding what each mention *means* is the hard part.
-->

---

<!-- _class: compact middle -->

# Attempt 1 — read the paper

Five signals, all derived from the text and its surroundings.

::: cards cols=3 gap=16px size=sm border=top
### Deposition vs. reuse language {tag="1" accent=emerald}

"we deposited", "reads were submitted" pointing one way; "downloaded", "obtained from" pointing the other.

### Which section {tag="2" accent=sky}

An accession in a Data Availability statement means something different from one in Methods, which means something different again from one in the reference list.

### Reciprocal link {tag="3" accent=indigo}

Does the archive record point back at this paper?

### Citation load {tag="4" accent=amber}

How many *different* papers mention the same dataset. A heavily cited dataset is a reuse magnet.

### Date ordering {tag="5" accent=purple}

Data deposited long before the paper, or long after, carries information.
:::

::: callout title="The assumption underneath" icon="📖" slim
All five signals assume the answer is somewhere in the text. That assumption is where this attempt fails.
:::

---

<!-- _class: compact middle -->

# Attempt 1 — the result

Only about 56% of pairs got an answer at all.

```stats accent=slate
99,538 | generated | accent=emerald
267,661 | reused | accent=rose
291,747 | ambiguous | the classifier declined to decide | accent=slate
```

::: callout title="The reason is not subtle" icon="🤷" accent=amber
**Most papers never write a sentence saying who deposited the data.** You cannot extract a fact that the text does not contain. No amount of prompt engineering fixes a missing sentence.
:::

<!--
Worth pausing here. The failure is not a modelling failure. It is an absence in
the source material. That reframing is what eventually produced the pivot.
-->

---

<!-- _class: compact middle -->

# How we checked ourselves

Four guards, each aimed at a specific way this kind of evaluation flatters itself.

::: cards cols=2 gap=18px size=md border=left
### Blind stratified sample {accent=sky}

The annotator never sees the prediction. Show it first and you measure agreement with the model, not agreement with the truth.

### Independent adjudicator {accent=indigo}

A second model in a fresh context that never saw the classifier or its rules. The author of a rule is not a neutral judge of that rule.

### Verbatim quote, mechanically checked {accent=purple}

Every verdict must carry a quote, checked character-for-character against the source. A fluent justification for a claim the paper never makes gets caught automatically.

### Human spot check {accent=emerald}

The lab, in interview format, one paper at a time.
:::

```metrics accent=purple
Measured genuine fabrication rate | 4.6%
```

---

<!-- _class: compact middle -->

# Attempt 1 — validation

When the text classifier commits to an answer, it is right. It just rarely commits.

::: cols ratio="1fr 1fr"
```metrics accent=emerald
Pairs where the classifier committed | 117
Contradicted by the independent adjudicator | 2
Precision on "generated" | 96%
Abstains on pairs the text *does* settle | ~32%
```

+++

::: note accent=amber
**The problem is recall, not precision.**

Tuning the rules harder would not help. The classifier is not making mistakes — it is staying silent, because the sentence it needs is usually not there.
:::
:::

---

<!-- _class: compact middle -->

# Three things that nearly fooled us

Each one produced a plausible number, a plausible fix, or a plausible absence.

::: cards cols=3 gap=16px size=sm border=top
### A 64% that was really 2.3% {tag="bad sample" accent=rose}

We measured how often archive records link back to a paper by sampling BioProject IDs — but sampled **consecutive** IDs.

Consecutive IDs are one submission batch from one group. That is not a sample of anything.

- Reported: **64%**
- Actual: **2.3%**

### A fix that fabricated data {tag="silent corruption" accent=amber}

Accessions sometimes fuse with citation superscripts in the text. The "fix" trimmed trailing digits.

Trimming a real accession lands on a **different real accession 28–99% of the time**, depending on prefix.

Losing a mention is recoverable. Silently rewriting one into another group's dataset is not. The fix was removed entirely.

### The hidden BioProject {tag="wrong search term" accent=purple}

Papers routed through GEO cite the GSE and never write the BioProject ID at all — **36 of 40** in a hand-checked sample.

Searching the paper for the BioProject finds nothing, and "nothing" looked like *no evidence* when it actually meant *wrong search term*.
:::

<!--
The third one is the interesting failure, because it is silent. The other two
announce themselves as numbers that look wrong. This one looks like data.
-->

---

<!-- _class: divider middle -->

# Stop reading the paper

The answer is already sitting in the archive metadata. Nobody has to have written a sentence about it.

---

<!-- _class: compact middle -->

# Signal A — the archive already knows

A GEO series records the PubMed ID of the paper that published it.

::: cards cols=2 gap=24px size=md border=top
### Same paper {icon="✅" accent=emerald}

The series' linked PMID *is* this paper → this paper generated the data.

### Different paper {icon="↩️" accent=rose}

The series' linked PMID is some *other* paper → this paper is reusing it.
:::

```metrics accent=emerald
GEO series carrying a linked PMID | 88%
Correct on hand-labelled items where it fired | 7 of 7
```

<!--
No text parsing. No sentence required. The submitter told GEO which paper this
belonged to, and GEO kept it.
-->

---

<!-- _class: compact middle -->

# Signal B — author overlap

Compare the paper's author surnames against the dataset's submitter names.

::: cols ratio="1.25fr 0.75fr"
```bars accent=sky wide
0.00 | 21 | no surname in common
0.01–0.24 | 1
0.25–0.49 | 1
0.50–0.74 | 1
0.75–1.00 | 9 | same people | accent=emerald
```

Author-surname overlap coefficient — 33 sampled pairs {.dim .center}

+++

::: note accent=emerald
**Bimodal, not tunable.**

21 pairs sit at exactly 0.00 and 9 at ≥0.75, with almost nothing in between. The decision threshold lands in an empty region rather than being fitted to the data.
:::

```metrics accent=sky
Correct on hand-labelled items | 8 of 8
Unrelated papers × datasets reaching the threshold | 0.8%
```
:::

<!--
The null distribution matters: pair papers with datasets they have nothing to do
with, and only 0.8% clear the threshold. Common surnames do not manufacture
matches.
-->

---

<!-- _class: compact middle -->

# The two signals are complementary

::: cards cols=2 gap=24px size=md border=left
### Where A goes quiet {accent=amber}

One hand-labelled item had no linked publication in the archive, so Signal A could not decide it.

### B caught exactly that one {accent=emerald}

Author overlap on the same item: **0.89**.
:::

::: callout title="Why this matters more than the accuracy numbers" icon="💡" accent=indigo
**Neither signal reads the paper.** The text classifier could only decide pairs where an author happened to write the relevant sentence. These decide pairs from metadata that already exists, whether anyone wrote about it or not.
:::

---

<!-- _class: compact middle -->

# How far this reaches

Two thirds of everything we extracted routes through GEO — and so is reachable this way.

```stats accent=indigo
64% | of all pairs | 422,514 pairs are GEO-routed
155,741 | currently stuck | pairs sitting in the "ambiguous" pile that this can move
```

---

<!-- _class: compact middle -->

# Caveats, on the slide rather than off it

::: cards cols=2 gap=24px size=md border=top
### Small samples {icon="📏" accent=amber}

7 of 7 and 8 of 8 are correct — and they are also *seven* and *eight*. The confidence intervals are wide. These numbers justify scaling the approach up; they do not yet bound its error rate.

### The other 36% {icon="🚧" accent=rose}

The remaining pairs cite a BioProject directly. BioProject records carry only an **organisation** name — no people — so author overlap has nothing to compare against. That slice still needs the text-based approach.
:::

<!--
Say this out loud rather than letting someone find it. The 7/7 and 8/8 are the
weakest numbers in the talk and the most likely to be quoted back.
-->

---

<!-- _class: compact middle -->

# Where we are, and what is next

The table as it stands today, and the three steps queued behind it.

```stats accent=emerald .tight cols=3
83,164 | papers | linked to data they generated
95,831 | datasets | attributed to a generating paper
1 | median datasets per paper | most papers produce exactly one
```

```timeline
track: Queued behind it | accent=indigo
node: 12% | Running now | 140,768 series | GEO→PMID across // every GEO series | lg
node: 50% | Next | BioSample | Re-measure richness // from sample records | md
node: 88% | Then | Experiment | Reconstruct metadata // from the paper alone | open
```

::: callout title="Why richness gets re-measured" icon="🔬" accent=amber slim
The current measure came from sequencing-**run** records, which turned out to be blind to experimental design: median attribute entropy **0.0**, median **1** sample group. Run records describe machines; sample records describe experiments.
:::

---

<!-- _class: compact middle -->

# Takeaways

::: cards cols=2 gap=18px size=md border=left
### The hard part is not extraction {accent=sky}

Finding accession numbers in 622,896 papers is engineering. Deciding whether each one was *generated* or *reused* is the actual problem.

### Text-only hits a wall you cannot tune past {accent=rose}

~56% decided, and the missing 44% is missing because the sentence was never written — not because the rules were too strict.

### Metadata answers questions the text never asks {accent=emerald}

GEO's linked PMID and author-name overlap decide pairs with no deposition sentence at all. Reachable for 64% of pairs (422,514), including 155,741 currently ambiguous.

### Check the checker {accent=purple}

Blind sampling, an independent adjudicator, and mechanically verified quotes caught a 64%-that-was-2.3%, a "fix" that rewrote accessions, and a search term that was silently wrong.
:::

<!--
If people remember one thing: mentioning is not producing, and the evidence that
settles it usually lives in the archive rather than in the paper.
-->
