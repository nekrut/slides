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

## What data exists, how each project is tested, and two findings from one hand-checked study

---

# The problem, and the two reference sources

Every dataset in a public sequence archive carries a metadata record: organism, tissue, instrument, library preparation. These records are frequently incomplete and sometimes wrong, and every analysis built on them inherits the error.

We hold a table linking **136,323 published papers** to the **157,619 archive projects** holding the data those papers generated. A paper usually describes its samples in more detail than the archive does.

::: cards cols=2 gap=24px size=md border=top
### The paper as a reference {accent=purple}

**As an input:** extract the missing value from the paper text.

**As an answer key:** hide a value the submitter did supply and test whether it can be recovered.

### The sequence as a reference {accent=emerald}

Needs no paper and no human adjudication. Where the record and the reads disagree, the reads are the more reliable of the two.
:::

<!--
The 136,323 / 157,619 figures are generated-relation pairs after merging text
evidence with GEO publication metadata. Accuracy figures are deliberately
absent from the deck: the measurements that exist are on small draws.
-->

---

<!-- _class: compact -->

# The floor every project has to clear

Two methods recover missing metadata from the archive alone, with no paper and no model.

::: cols ratio="1fr 1fr"
**Copy from sibling samples.** Take the most frequent value of that field among the other samples in the same project.

**Copy from the sample's own title.** Many titles carry the value directly:

```text
SAMEA6677308   Kidney_old_rep2
SAMEA6529006   Arundo_collina_Roma_leaf
SAMD00229900   Anolis_allisoni_brain_liver_skin_mix
```

+++

**Where both fail**, the paper is the only remaining source:

```text
SAMN30613431   Model organism or animal sample
               from Rattus norvegicus
SAMN30613433   Model organism or animal sample
               from Rattus norvegicus
```

Every project is scored on the **residual cells** — those neither baseline recovers.
:::

::: note accent=purple
**A second prerequisite for any paper-based project:** measure how often the correct value appears in the paper at all. That is the upper bound on extraction, whatever the method.
:::

<!--
Preliminary measurements exist in analysis/PROJECTS-2026-08-26.md but rest on
348 cells from 2026 projects only, against baselines from 600- and
28,492-project draws. The populations differ, so the comparison is not firm.
-->

---

# Four groups of projects

::: cards cols=2 gap=24px size=md border=top
### A — Metadata from other sources {accent=sky}

The value exists in another database or is printed in a table in the paper.

**A1 GEO-MIRROR · A2 ROSTER-AUDIT**

### B — Paper text as input {accent=purple}

Test whether a model reading the paper recovers values the archive lacks.

**B1 HIDDEN-CELL**

### C — Comparison against sequence {accent=emerald}

Subsample the reads and check the record against the data.

**C1–C6 · six projects**

### D — Measurement methodology {accent=amber}

Fill rate is the standard quality metric. It measures the wrong quantity.

**D1 VOCAB**
:::

Group C is the largest. Its reference values come from the sequence data, so it needs no paper text, no human adjudication, and no assumption about what a model has seen in training.

---

# Group A · Metadata available from other sources

::: cards cols=2 gap=24px size=md border=top
### A1 GEO-MIRROR {accent=sky}

Datasets submitted to GEO are copied into BioSample/SRA. Where GEO holds a distinct value per sample, the copy sometimes carries one value repeated across every sample.

```stats accent=sky
247,957 | field-and-project pairs | constant across every sample
116,660 | of those came via GEO | so the original is retrievable
```

**Reference:** GEO's per-sample fields. The comparison is exact; no model, no adjudication.

**Week-one test.** Fetch 200 projects. Under about 20 with extra values in GEO and the project stops; 60 or more and this is the largest recoverable gap we have found.

### A2 ROSTER-AUDIT {accent=sky}

Some papers print a table of accessions alongside experimental condition. Compare it against the archive field by field.

```stats accent=sky
701 | papers with a usable table | of 136,323 linked
18,628 | samples covered | 
```

The informative class is **archive coarser than paper** — one value where the paper gives several. Two documents from one spreadsheet can hide a granularity difference but cannot create one.

**Cost:** a deterministic table parser plus 15–25 person-hours of adjudication. Scale is the main caveat.
:::

---

<!-- _class: dense -->

# Group B · B1 HIDDEN-CELL — paper text as input

Pick fields the submitter populated for some samples in a project and left blank for others. Withhold one populated value, supply the paper, measure recovery.

```stats accent=purple
1,028,626 | values available to withhold | across 27,075 field-and-project pairs
524,391 | genuinely blank cells | the deployment target
15,147 | papers | full text on local disk
```

::: cols ratio="1fr 1fr"
```text
PRJNA622707 — tissue on 21 of 27 samples
  Retina · Cornea · RPE     the 21 with a value
  (blank)                   the other 6
```

The submitter clearly knew the field. Withhold one of the 21; the 6 blanks are what deployment would fill.

+++

**Control arm:** the same model without the paper. If accuracy is unchanged, the paper adds nothing over the archive record.

**Scoring:** residual cells only, per field, weighted per project, with both archive-only baselines as the floor.
:::

::: note accent=rose
**Two limits.** This measures recovery of *what the submitter recorded*, not ground truth. And blank samples are thinner than populated ones — median 6 attributes against 9 — so held-out accuracy is an upper bound on deployment accuracy.
:::

<!--
On `chip antibody`, 7,840 of 35,928 blank cells are non-ChIP samples inside
mixed-assay deposits, where the correct value is "not applicable" - which a
withheld-value design cannot present as correct. A hand-labelled audit of ~300
blank cells is a prerequisite.
-->

---

<!-- _class: compact -->

# Group C · The record against the sequence data

Each project subsamples a few megabytes of reads and asks one question the record cannot answer. No paper, no model, no adjudication.

::: cards cols=3 gap=18px size=sm border=top
### C1 STRANDCHECK {accent=emerald}

RNA-seq strandedness. No field records it among the 28 study, 103 sample and 186 run fields. **6.9M** RNA-seq runs; **2.6M** under a paper.

### C2 LAYOUT-TRIANGLE {accent=emerald}

Paired vs single-end. Record-vs-data alone failed: contradictions trace to one archive pipeline. The paper is the tie-breaker.

### C3 SELECTION-CHECK {accent=emerald}

PolyA vs ribo-depletion. **2.2M** runs say only `cDNA`. rRNA and intronic fractions, calibrated within tissue and organism. Same download as C1.

### C4 TENX-DETECT {accent=emerald}

Droplet single-cell filed as bulk. A 28-base barcode mate is visible in the first few thousand reads. Sizing step first: the rate is unmeasured.

### C5 TAXON-RATE {accent=emerald}

Wrong species. No estimate exists. **20,000** random runs sketched against a reference database. The obvious genome-size flag detects assembly failure, not mislabelling.

### C6 KARYOCHECK {accent=emerald}

Declared sex vs X/Y coverage. Unit is the **donor**, not the run: three samples carry 29,315 runs between them. **107,564** distinct samples in 3,465 studies.
:::

::: callout title="Shared component" slim accent=emerald
One read-subsampling client serves C1, C2, C3, C4 and C6. Aggregate download throughput is **1.0 MB/s** regardless of parallelism, so C1 and C3 run as one job on one subsample.
:::

---

<!-- _class: compact -->

# Group D · D1 VOCAB — declared absence versus missing values

Fill rate — the share of fields holding a value — is the standard metadata quality metric. INSDC defines a controlled vocabulary for *why* a value is absent: `not collected`, `not applicable`, `restricted access`.

::: cols ratio="1fr 1fr"
```metrics accent=amber
Submitter enters "not collected" | counted as populated
Submitter enters the actual value | counted as populated
Submitter leaves the field empty | absent from the denominator
```

A submitter following the standard scores the same as one supplying the value. A submitter leaving the field empty does not enter the calculation.

+++

What `collection_date` holds when it is not a date — 6,253,348 samples:

```text
missing                       2,857,316
missing: third party data     1,097,390
not collected                   645,826
not provided                    598,684
not applicable                  596,948
```

Every one of these is counted as populated.
:::

::: note accent=amber
**Registry confound.** Absence terms are far more common in NCBI-registered samples than EBI-registered ones, while the date-parse failure rate is flat across that split. That is vocabulary convention, not data quality. Cost: one 30-second scan.
:::

---

<!-- _class: micro -->

# One hand-checked study: the archive is not the answer key

**PRJNA1052691** (Leonard et al. 2024, *Microorganisms*): 99 runs of a *Cyclospora* amplicon panel, compared field by field against the paper's tables.

::: cols ratio="1fr 1fr"
```stats accent=rose
81 | runs agree | on collection date
8 | missing in SRA | 
10 | contradict | SRA says 2018, paper says July 2019
```

The 10 are one contiguous block: five specimens, one season, mislabelled at submission. A model that reads the paper *correctly* is scored **wrong** on all ten if the archive is the key.

**Only in the paper:** Ct value and exact collection date for all 66 specimens, and the epidemiologic cluster label — the outbreak linkage the study is about. None of it is in the archive.

+++

**The join key is published nowhere.** The paper keys on `CDC04`; SRA on `CDC04B`, `CDC04X`, `CDC04XT`, `CDC04R1`. The suffixes encode bait capture, touchdown PCR and inoculation series, and appear only in free-text sample descriptions.

**The counter-direction exists too.** Raspberry samples carry `lab_host` and `inoculation_level` as structured SRA attributes that the paper states only in prose.

**Two linkage misses.** This paper and one more state deposition in a standard Data Availability sentence; our classifier calls both `ambiguous`. The paper also cites `BankIt` tracking numbers as accessions. They resolve to nothing.
:::

::: note accent=rose
**What changes:** the benchmark needs a conflict flag on pairs where paper and archive disagree, so they can be excluded or scored separately, and it must not assume information flows in one direction only.
:::

<!--
https://github.com/galaxyproject/sra-metadata-enrichment/issues/5
Across 99 runs: 81 agree on collection_date, 8 are `missing`, 10 contradict.
Ct value 66/66, exact date 66/66, epi cluster label 12/66 in the paper; 0 in SRA.
Classifier confidences for the two false negatives: 0.643 (PRJNA1052691) and
0.188 (PRJNA753088, George et al. 2022). BankIt2795740/44/49 are the gap-fill
markers behind the paper's Figure 1b.
-->

---

<!-- _class: micro -->

# Unreached SRA: public, correctly annotated, unusable

Many amplicon studies use **commercial panels whose target sequences were never published**. The reads are public and the metadata is fine, but without the panel nobody outside the vendor can map, window, or name a haplotype. The question is not *which paper made this* but *can anyone use it*.

::: cols ratio="1fr 1fr"
**Same study, 52-locus panel.** The design paper gives marker names and lengths: no primers, no coordinates, no sequences. From the raw reads, three independent routes recover the panel:

```stats accent=indigo
48 | amplicons reconstructed | 13,384 bp, 94% of the published span
46 / 48 | match a published length | null expectation 25.1, P < 0.0005
```

**Can this run at archive scale from Logan?** All 99 runs are in Logan v1.2, and the two products disagree sharply:

```metrics accent=indigo
Panel 31-mers present in unitigs | 93.6%
Panel 31-mers present in contigs | 35.9%
```

+++

**Why the contigs shatter.** Contig N50 is 33 bp. At amplicon depth every sequencing error recurs above the retention threshold, so the graph branches at nearly every base. Judged on contigs alone, Logan looks like it failed. The sequence was there the whole time.

**Filter by abundance and reassemble blind**, never looking at the panel: **44 of 48** amplicons come back whole across 24 runs, and all 48 tile to at least 95% of length.

```stats accent=indigo
~2 GB | of public unitigs | against 25+ GB of FASTQ, for the same result
```

**Caveats.** The abundance split works *because* amplicon depth is extreme; it will not transfer to shotgun libraries. One project, not a rate.
:::

::: note accent=indigo
**Why it belongs here.** "Is the panel recoverable from Logan?" is computable for any `AMPLICON` project. And what is missing is not annotation but a reference sequence, recovered from the data rather than the paper.
:::

<!--
https://github.com/galaxyproject/sra-metadata-enrichment/issues/6
Median 181 branch points per amplicon before abundance filtering; median zero
at ka>=1000. Reassembly and branch-point figures come from a scripted analysis
not yet independently re-run; containment figures were measured directly.
Flagged to Rayan Chikhi on the issue for the contigs-vs-unitigs behaviour.
-->

---

<!-- _class: compact -->

# Two immediate priorities at Penn State

::: cards cols=2 gap=24px size=md border=top
### Make John Davis' database easy to reach {accent=sky}

The database exists and holds what the projects above need, but getting at it is cumbersome today. Making it easily accessible is the first job, because every project in this deck reads from it.

### Characterise Penn State papers first {accent=purple}

From the paper corpus, select a set of recent Penn State papers and run the linkage and metadata characterisation on those before anything else.
:::

::: callout title="Why start local" accent=purple slim
The people who produced these datasets are down the hall. We can interview them about what the samples actually were and how the submission was made. That adds a layer of information that exists neither in the archive record nor in the paper, and it is the only way to get ground truth rather than the submitter's record.
:::

::: note accent=slate
Local ground truth also settles the answer-key problem on the previous slides: where paper and archive disagree, the person who made the data can say which is right.
:::

---

<!-- _class: compact -->

# What runs first

::: cards cols=3 gap=16px size=sm border=top
### First {accent=amber}

**D1 VOCAB.** One 30-second scan. Decides whether fill-rate figures used anywhere else are valid.

### Second {accent=sky}

**A1 GEO-MIRROR.** 200 requests settle whether the recoverable gap is large or negligible.

### Then {accent=emerald}

**The read-subsampling client**, shared by five Group C projects. C1 and C3 on one download; C6 queues behind them for bandwidth.
:::

| Starts | Projects | Constraint |
|---|---|---|
| **Day 1** | A1, A2, C2, C4, C5, C6, D1 | Four independent resources: NCBI requests, public assembly bucket, read downloads, local scan |
| **Week 2** | C1, C3 | Queue behind C6 for download bandwidth |
| **Week 2** | B1 | Needs D1's vocabulary and A1's fetcher |

::: note accent=slate
Each project has a stated week-one test. Running that test before the supporting work is the intended order. Two things to settle first: whether bulk EBI download is reliable on this machine, and one agreed definition of "archive holds less than the source" shared by A1 and A2.
:::
