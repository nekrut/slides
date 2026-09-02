---
marp: true
theme: deckkit
size: 16:9
paginate: true
header: 'Ten projects | SRA metadata'
footer: 'Paper ↔ SRA linkage · project catalogue · September 2026'
---

<!-- _class: title -->

# Ten projects to improve SRA metadata

## The paper corpus, ten testable projects, and two findings from one hand-checked study

---

# The paper corpus

Which open-access paper **generated** which SRA dataset. Not cited, not reused: generated.

::: cards cols=3 gap=18px size=sm border=top
### 1 · Scan {tag="Europe PMC full text" accent=sky}

Every accession-shaped string in every open-access paper, resolved to a BioProject.

### 2 · Classify {tag="generated · reused · ambiguous" accent=purple}

Two independent sources of evidence: the paper's own text, and the paper GEO says published the data.

### 3 · Validate {tag="blind sample" accent=emerald}

Independent adjudication with verified quotes. The two evidence sources agree on **98%** of pairs.
:::

```stats accent=sky
622,896 | open-access papers scanned | 1,717,129 accession mentions
658,946 | paper–project pairs | every one kept and classified
136,323 | papers that generated data | 157,619 projects · 164,848 pairs
```

::: note accent=slate
Public on Zenodo as `linkage_generated.tsv` plus all pairs, conflicts, validation records and source snapshots. **doi 10.5281/zenodo.22084398**
:::

<!--
Counts verified against links.duckdb on 2026-08-24 (text classification
validated 2026-08-18, GEO evidence merged 2026-08-24). Precision on
`generated` 96% on 117 adjudicated pairs. Text alone decided ~56% of pairs;
GEO's linked PubMed ID decided 387,914 and rescued 138,836 from ambiguous.
Full text of the corpus is on local disk: 161 GB Europe PMC mirror.
-->

---

<!-- _class: middle -->

# Four project groups

::: cards cols=2 gap=24px size=md border=top
### A · Metadata from other sources {accent=sky}

**A1 GEO-MIRROR · A2 ROSTER-AUDIT**

### B · Paper text as input {accent=purple}

**B1 HIDDEN-CELL**

### C · Record against sequence {accent=emerald}

**C1–C6**

### D · Measurement methodology {accent=amber}

**D1 VOCAB**
:::

Group C needs no paper, no adjudication, and no assumption about model training data.

---

<!-- _class: middle -->

# Group A · Metadata available from other sources

::: cards cols=2 gap=24px size=md border=top
### A1 GEO-MIRROR {accent=sky}

Per-sample values lost when GEO records were copied into SRA.

```stats accent=sky
116,660 | field-and-project pairs | constant in SRA, original in GEO
```

**Week-one test:** fetch 200 projects and count how many GEO holds more for.

### A2 ROSTER-AUDIT {accent=sky}

Papers that print a table of accession against condition.

```stats accent=sky
701 | papers with a usable table | 18,628 samples
```

**Cost:** a table parser and 15–25 hours of adjudication.
:::

---

<!-- _class: middle -->

# Group B · B1 HIDDEN-CELL

Withhold a value the submitter did supply. Give a model the paper. Measure recovery.

```stats accent=purple
1,028,626 | values available to withhold | 
524,391 | genuinely blank cells | the deployment target
15,147 | papers | full text on disk
```

::: cards cols=2 gap=24px size=md border=top
### Control arm {accent=purple}

Same model, no paper. If accuracy is unchanged, the paper adds nothing.

### Limit {accent=rose}

Recovery of *what the submitter recorded*, not ground truth.
:::

<!--
Example: PRJNA622707, tissue populated on 21 of 27 samples (Retina, Cornea,
RPE), blank on 6. Blank samples are thinner than populated ones (median 6
attributes vs 9), so held-out accuracy is an upper bound on deployment.
On `chip antibody`, 7,840 of 35,928 blank cells are non-ChIP samples where the
right answer is "not applicable".
-->

---

# Group C · The record against the sequence data

A few megabytes of reads answer a question the record cannot.

::: cards cols=3 gap=18px size=sm border=top
### C1 STRANDCHECK {accent=emerald}

RNA-seq strandedness. No field records it. **2.6M** runs under a paper.

### C2 LAYOUT-TRIANGLE {accent=emerald}

Paired vs single-end, with the paper as tie-breaker.

### C3 SELECTION-CHECK {accent=emerald}

PolyA vs ribo-depletion. **2.2M** runs say only `cDNA`.

### C4 TENX-DETECT {accent=emerald}

Droplet single-cell filed as bulk. Rate unmeasured.

### C5 TAXON-RATE {accent=emerald}

Wrong species. No estimate exists. **20,000** random runs.

### C6 KARYOCHECK {accent=emerald}

Declared sex vs X/Y coverage. **107,564** donors.
:::

::: note accent=emerald
One shared read-subsampling client. Download throughput is **1.0 MB/s** whatever the parallelism.
:::

---

<!-- _class: middle -->

# Group D · D1 VOCAB

Fill rate counts a submitter who writes `not collected` as populated.

::: cols ratio="1fr 1fr"
```text
collection_date, not a date — 6,253,348 samples

missing                     2,857,316
missing: third party data   1,097,390
not collected                 645,826
not provided                  598,684
not applicable                596,948
```

+++

Every one of these follows the INSDC standard.

Every one is counted as populated.

**Cost:** one 30-second scan.
:::

<!--
Registry confound: absence terms are far more common in NCBI-registered samples
than EBI-registered, while the date-parse failure rate is flat across that
split. Vocabulary convention, not data quality.
-->

---

<!-- _class: middle -->

# The archive is not the answer key

One hand-checked study. **PRJNA1052691**, 99 runs, compared against the paper's tables.

```stats accent=rose
81 | runs agree | on collection date
8 | missing in SRA | 
10 | contradict | SRA 2018 · paper July 2019
```

::: cards cols=2 gap=24px size=md border=top
### Only in the paper {accent=rose}

Ct value, exact date, and the outbreak cluster label the study is about.

### Only in the archive {accent=rose}

`lab_host`, `inoculation_level` as structured attributes the paper gives in prose.
:::

::: note accent=rose
A model that reads the paper *correctly* is scored wrong on ten runs. The benchmark needs a **conflict flag**.
:::

<!--
https://github.com/galaxyproject/sra-metadata-enrichment/issues/5
Also: the join key (CDC04 vs CDC04B/X/XT/R1) is published nowhere but free-text
descriptions; two papers with explicit Data Availability sentences classified
`ambiguous` (0.643, 0.188); BankIt tracking numbers cited as accessions.
-->

---

<!-- _class: middle -->

# Unreached SRA: public, correctly annotated, unusable

Commercial amplicon panels whose target sequences were never published. Nobody outside the vendor can use the reads.

```stats accent=indigo
48 | amplicons rebuilt from reads | 94% of the published panel
93.6% | of panel k-mers in Logan unitigs | 35.9% in Logan contigs
44 / 48 | recovered whole, blind | from ~2 GB of unitigs, not 25 GB of FASTQ
```

::: cards cols=2 gap=24px size=md border=top
### Why it matters {accent=indigo}

What is missing is not annotation but a reference sequence, and the source is the data, not the paper.

### Caveat {accent=amber}

Works because amplicon depth is extreme. One project, not a rate.
:::

<!--
https://github.com/galaxyproject/sra-metadata-enrichment/issues/6
Contig N50 33 bp: at amplicon depth every sequencing error recurs above the
retention threshold, so the graph branches at nearly every base (median 181
branch points per amplicon; zero at ka>=1000). Judged on contigs, Logan looks
like it failed. Flagged to Rayan Chikhi on the issue.
-->

---

<!-- _class: middle -->

# Two immediate priorities at Penn State

::: cards cols=2 gap=24px size=lg border=top
### Make John Davis' database easy to reach {accent=sky}

It holds what every project here reads from. Access is cumbersome today.

### Characterise Penn State papers first {accent=purple}

The people who made the data are down the hall. Interview them.
:::

::: note accent=purple
Interviews add a layer neither the archive nor the paper has: ground truth.
:::

---

<!-- _class: middle -->

# What runs first

| Order | Project | Why |
|---|---|---|
| **1** | D1 VOCAB | 30 seconds. Decides whether fill-rate figures are valid. |
| **2** | A1 GEO-MIRROR | 200 requests settle whether the gap is large or negligible. |
| **3** | Read-subsampling client | Shared by five Group C projects. |
| Day 1 | A1, A2, C2, C4, C5, C6, D1 | Independent resources. |
| Week 2 | C1, C3, B1 | Queue behind C6 for bandwidth; B1 needs D1 and A1. |

<!--
Each project has a stated week-one test; run it before the supporting work.
Settle first: whether bulk EBI download is reliable here, and one shared
definition of "archive holds less than the source" for A1 and A2.
-->
