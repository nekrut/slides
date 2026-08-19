---
marp: true
theme: deckkit
size: 16:9
paginate: true
header: '![BRC Analytics](https://brc-analytics.org/logo/brc.svg) ICOPA XVI · Montréal 2026'
footer: '[brc-analytics.org](https://brc-analytics.org) | [usegalaxy.org](https://usegalaxy.org) | [galaxyproject.org](https://galaxyproject.org)'
---

<!-- Adapted from asv2026/slides.md. 20 slides / 15 minutes. Text follows Simplified Technical English. -->

<!-- _class: title -->

```brandbar
https://brc-analytics.org/logo/brc.svg | 28 | invert
```

ICOPA XVI {.badge}

# BRC-Analytics: Combining agentic AI with open infrastructure for pathogen genomics

## From reads to outbreak clusters {.nocaps}

::: presenter
Anton Nekrutenko | Penn State | [galaxyproject.org](https://galaxyproject.org)
:::

::: figure src="assets/qr/icopa26.svg" href="https://gxy.io/icopa26" bare .qr-pin
gxy.io/icopa26
:::

BRCs = BV-BRC ([bv-brc.org](https://www.bv-brc.org/)) + PDN ([pathogendatanetwork.org](https://pathogendatanetwork.org/)) + BRC-analytics ([brc-analytics.org](https://brc-analytics.org)) {.footnote}

---

<!-- _class: divider -->

# Take as many pictures as you like

The whole deck is at [gxy.io/icopa26](https://gxy.io/icopa26) {.xl}

---

<!-- _class: compact agenda -->

# Outline

Five topics in 15 minutes

- What BRC-Analytics is
- What Galaxy is
- A worked example: *Cyclospora* surveillance
- What agentic analyses are
- How to search the entire public archive

---

<!-- _class: compact middle bigtitle -->

# BRC-Analytics: data, tools, workflows, infrastructure

[brc-analytics.org](https://brc-analytics.org)

::: pillars brace="Agents" accent=amber size=xl
### Data {accent=sky}

[NCBI Datasets](https://www.ncbi.nlm.nih.gov/datasets/) · [NCBI Virus](https://www.ncbi.nlm.nih.gov/labs/virus/) · [EBI](https://www.ebi.ac.uk) · [UCSC Genome Browser](https://genome.ucsc.edu)

### Tools + Workflows {accent=emerald}

[BioConda](https://bioconda.github.io) · [BioContainers](https://biocontainers.pro) · [Workflows](https://iwc.galaxyproject.org/)

### Compute and Storage {accent=indigo}

[TACC](https://www.tacc.utexas.edu) · [IU JetStream2](https://jetstream-cloud.org) · [ACCESS-CI](https://access-ci.org)
:::

---

<!-- _class: compact middle -->

# Most of the catalogue is eukaryotic

The catalogue holds 1,975 taxa and 5,506 annotated assemblies. **449 taxa** are parasitic protists, helminths or arthropod vectors.

```bars accent=indigo unit="taxa" wide
Nematoda | 115 | 196 assemblies — *Strongyloides*, *Trichinella*, *Meloidogyne* | accent=emerald
Arthropoda (vectors) | 97 | 181 assemblies — *Anopheles*, *Aedes*, *Glossina*, ticks | accent=amber
Apicomplexa | 72 | 267 assemblies — *Plasmodium*, *Cryptosporidium*, *Babesia*, *Eimeria* | accent=rose
Microsporidia | 51 | 92 assemblies — *Encephalitozoon*, *Nematocida* | accent=purple
Platyhelminthes | 39 | 55 assemblies — *Schistosoma*, *Echinococcus*, *Taenia* | accent=sky
Kinetoplastea | 39 | 115 assemblies — *Leishmania*, *Trypanosoma* | accent=indigo
Amoebozoa | 28 | 40 assemblies — *Acanthamoeba*, *Entamoeba*, *Balamuthia* | accent=slate
Metamonada | 8 | 43 assemblies — *Giardia*, *Trichomonas*, *Histomonas* | accent=navy
```

The catalogue also holds 681 fungi, 457 viruses, 323 bacteria and 24 oomycetes. Counts are from the live catalogue, 18 August 2026. {.footnote}

---

<!-- _class: micro -->

# BRC-Analytics flow

[brc-analytics.org](https://brc-analytics.org)

::: cards cols=3 gap=14px size=xs thumb=120px
### Find organism {tag="1" accent=sky}

Select from 1,975 taxa.

![Selecting a species in BRC Analytics](assets/brc/select-species.png)

### Select genome {tag="2" accent=emerald}

Select from 5,506 assemblies.

![Selecting a genome assembly](assets/brc/select-assembly.png)

### Select workflow {tag="3" accent=indigo}

The community maintains them.

![Selecting an analysis workflow](assets/brc/select-workflow.png)

### Select data {tag="4" accent=amber}

Use SRA data or your own data.

![Selecting input data](assets/brc/find-data.png)

### Run workflow {tag="5" accent=purple}

One sample or one million.

![Running the workflow in Galaxy](assets/brc/run-wf.png)

### Interpret {tag="6" accent=rose}

Examine, repeat, publish.

![Interpreting results](assets/brc/interpret.png)
:::

---

<!-- _class: compact middle -->

# Workflows that run on a eukaryotic pathogen

The community maintains them. See also [iwc.galaxyproject.org](https://iwc.galaxyproject.org/)

::: cards cols=3 gap=16px size=md minh=180px
### Ploidy-aware variant calling {tag="Variation" accent=sky}

This workflow does not assume a haploid genome. Use it for diploid vectors and for mixed infections.

### Genome annotation with Braker3 {tag="Annotation" accent=emerald}

[Braker3](https://github.com/Gaius-Augustus/BRAKER) gives eukaryote-specific structural annotation. An `lncRNA` workflow is also available.

### RNA-Seq quantification {tag="Transcriptomics" accent=indigo}

Paired-end and single-end processing, through to counts. Single-cell preprocessing is also available.

### Assembly and polishing {tag="Assembly" accent=amber}

[Flye](https://github.com/fenderglass/Flye) assembly, long-read polishing and contamination control. The **[VGP](https://vertebrategenomesproject.org) suite adds 14 workflows**: k-mer profiling, HiFi and trio phasing, purging, Hi-C and Bionano scaffolding.

### Hi-C to balanced cool files {tag="Regulation" accent=purple}

Scaffolding and chromatin contact maps. ATAC-seq and CUT&RUN use the same tools.

### Use your own {tag="Anything" accent=rose}

Any [Galaxy](https://galaxyproject.org) workflow runs here. The *Cyclospora* typing panel later in this talk is one example.
:::

---

<!-- _class: micro -->

# Galaxy is a free public resource, and it operates at scale

[https://galaxyproject.org](https://galaxyproject.org)

::: cols ratio="1.45fr 0.55fr" gap=26px
::: figure src="images/nature-covid19-infrastructure.png" href="https://www.nature.com/articles/s41587-021-01069-1" h=470px
:::

+++

```stats cols=1 .tight
750,000 | jobs per month | accent=sky
400,000+ | registered users | accent=emerald
1,500 | concurrent users | accent=indigo
$2,000,000+ | free compute / year | accent=amber
10,000+ | analysis tools | accent=purple
22,000+ | citations | accent=rose
```
:::

---

<!-- _class: micro -->

# Get data, run tools, run workflows, interpret

::: cols cols=2 gap=16px max=790px
::: figure src="assets/galaxy/upload.png" h=226px bare
**1 · Get your data** — from your computer, the web or the SRA
:::

+++

::: figure src="assets/galaxy/run-tool.png" h=226px bare
**2 · Run a tool** — select from thousands of tools
:::

+++

::: figure src="assets/galaxy/run-wf.png" h=226px bare
**3 · Or run a workflow** — hundreds are curated
:::

+++

::: figure src="assets/galaxy/interpret.png" h=226px bare
**4 · Interpret and publish** — [Jupyter](https://jupyter.org), [RStudio](https://posit.co), and soon agents
:::
:::

---

<!-- _class: compact middle -->

# Software architecture and data availability

Every component is open source, containerised, and tied to a versioned reference set

::: cards cols=3 gap=16px size=sm minh=215px
### Galaxy tool suite {tag="1 · Open source" accent=sky}

Tool wrappers in [`nekrut/brc-tools`](https://github.com/nekrut/brc-tools/tree/cyclospora-lofreq-pyeuk), written to the IWC specification.

They join `bwa-mem` alignment, [`LoFreq`](https://csb5.github.io/lofreq/) variant calling, haplotype-sheet extraction and PyEuk clustering into one workflow. Run it from a browser, the [Galaxy](https://galaxyproject.org) API or a command line.

### Containerised engine {tag="2 · One image" accent=emerald}

One pinned Apptainer or Docker image holds PyEuk, its compiled Numba kernels, `LoFreq` and `bwa-mem`.

PyEuk is pinned by commit, not by tag. Locked dependencies stop environment drift and R package conflicts.

### Reference package {tag="3 · Cited by DOI" accent=amber}

[`10.5281/zenodo.21924355`](https://doi.org/10.5281/zenodo.21924355) holds `markers.fa`, `parts.bed`, `haplotypes78.fa` and `junction.fa` with SHA-256 checksums.

A run pins the exact bytes it used, so allele calls stay comparable between labs and between seasons.
:::

---

<!-- _class: micro -->

# The workflow, as it runs

Eleven steps in the Galaxy editor: four inputs, two callers in parallel, one sheet, one clustering step. It is editable, versioned, and anyone with the link can run it.

::: figure src="assets/cyc/galaxy_workflow_canvas.png" h=420px bare
:::

Coming to the BRC-Analytics **Workflows** tab. We need beta testers. {.footnote}

---

<!-- _class: compact middle -->

# Summary: modernised *Cyclospora* surveillance

Four changes that make outbreak analysis sensitive, deterministic and reproducible

::: cards cols=2 gap=16px size=sm minh=155px
### 1 · Fewer cases discarded {accent=emerald}

The legacy retention rule discards **56%** of the cohort — it keeps 67 of 153. Run on the open pipeline's calls, the same rule keeps **147 of 153**, and **195 of 203**.

### 2 · Deterministic topologies {accent=sky}

Stable sorting replaces random tie-breaking, and inverse-variance KING-wIBS weights model co-infection. Reruns are byte-identical, where the legacy ensemble differs in **66.8%** of cells.

### 3 · Label-free outbreak discovery {accent=indigo}

Dynamic relative-gap tree cutting finds the outbreak boundary from the data alone — **k = 2, ARI 0.9737** on the Galaxy workflow's own sheet. No pre-calibrated answer key.

### 4 · Open, fast infrastructure {accent=amber}

Vectorised Numba kernels build the distance matrix in **1.6 s**, against 370–655 s for the R implementation — **230× to 400×**. Pinned containers, open Galaxy wrappers.
:::

---

<!-- _class: compact middle -->

# What the open pipeline changes

Not discrimination. Determinism, retention and speed.

::: cards cols=3 gap=16px size=md minh=200px
### Specimens retained {tag="Retention" accent=emerald}

The CDC retention rule keeps **67 of 153** specimens with the CDC calls.

With the open pipeline calls, the same rule keeps **147 of 153**, and **195 of 203**. The open caller types loci that CDC left blank.

### Junction coverage {tag="Coverage" accent=sky}

The open caller types the mitochondrial junction in **128 of 153** specimens. CDC types it in 103.

It types **27 specimens that CDC left blank**. For the 101 specimens that both callers type, there are 0 disagreements.

### Determinism and speed {tag="Engineering" accent=amber}

With identical input, the legacy ensemble gives different values in **66.8%** of the matrix cells. The open engine is byte-identical.

It takes **1.6 s**, against 370–655 s.
:::

::: note accent=slate
**Note this clearly:** the legacy CDC metric discriminates better — ROC AUC **0.9964** against **0.7692** on the same sheet. This benchmark is also easy: single loci separate the two vendors. The improvement is in reproducibility and sample retention, not in accuracy.
:::

---

<!-- _class: micro -->

# The future is agentic

AI is an environmental and social disaster. Used responsibly, it can still be very good for science. **[Orbit](https://galaxyproject.github.io/loom/)** is a [BRC-Analytics](https://brc-analytics.org) and [Galaxy](https://galaxyproject.org) agent.

```embed src="assets/orbit-demo.html" w=1300px scale=0.80 h=485px
```

---

<!-- _class: compact middle -->

# We need testers!

We give you API keys to frontier models

::: figure src="assets/qr/testers.svg" h=455px bare
[forms.gle/W93iF3L6ypjCvcYQ6](https://forms.gle/W93iF3L6ypjCvcYQ6)
:::

---

<!-- _class: micro -->

# The entire public archive is searchable

**[Logan](https://github.com/IndexThePlanet/Logan)** reassembles every public SRA accession. You can query it from [Galaxy](https://galaxyproject.org), and soon directly from [BRC-Analytics](https://brc-analytics.org).

```stats cols=4
38M | accessions | 99.5% of SRA by size | accent=emerald
87 Pbp | raw reads in | Dec 2025 freeze | accent=sky
8.5 Pbp | unitigs out | k=31, near-lossless | accent=indigo
4 s | median query | one index · 186 Galaxy jobs | accent=amber
```

::: cols ratio="1fr 1fr 1.05fr" gap=16px stretch
::: card title="What it is" accent=emerald border=top size=sm
[Logan](https://github.com/IndexThePlanet/Logan) reassembles every public SRA accession into **unitigs** and **contigs**. Unitigs are near-lossless and best for search. Contigs are error-corrected and best for alignment.

[Read more](https://www.biorxiv.org/content/10.1101/2024.07.30.605881v2)
:::

+++

::: card title="How to query it" accent=sky border=top size=sm
- [`kmindex_query`](https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/kmindex/kmindex_query/0.6.1+galaxy3) on [usegalaxy.org](https://usegalaxy.org) — median **4 s** against one index, **8.4 min** against all of them.
- [`LexicMap`](https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/lexicmap/lexicmap_search/0.9.0+galaxy1) on [usegalaxy.org](https://usegalaxy.org) — alignment-based, for longer queries.
- Or at [logan-search.org](https://logan-search.org).
:::

+++

::: card title="What a search found" accent=amber border=top size=sm
*Cyclospora* 28S rRNA in **3 clinical stool runs** that carry a different annotation — a Bangladeshi cholera cohort and two UK gastroenteritis metatranscriptomes.

The following slides describe them.
:::
:::

---

<!-- _class: micro middle -->

# Two ways to search it, both on [usegalaxy.org](https://usegalaxy.org)

The same archive, a different question. Select the tool by the output you need.

::: cols cols=2 gap=20px
::: card title="kmindex" subtitle="Is it present, and in which datasets?" accent=sky border=top size=md
[`kmindex`](https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/kmindex/kmindex_query/0.6.1+galaxy3) queries pre-built k-mer indexes. It returns the **fraction of k-mers** that your query shares with each indexed sample, as a matrix or as JSON. It gives no coordinates.

- It searches **raw sequencing runs** — Logan unitigs, ~23M libraries
- Any query length. `(k+z)`-mers reduce false positives
- Median **4 s** against one index, **8.4 min** against all

[`kmindex_build`](https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/kmindex/kmindex_build/0.6.1+galaxy0) · [`kmindex_query`](https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/kmindex/kmindex_query/0.6.1+galaxy3)
:::

+++

::: card title="LexicMap" subtitle="Where does it align, and how well?" accent=emerald border=top size=md
[`LexicMap`](https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/lexicmap/lexicmap_search/0.9.0+galaxy1) aligns. It seeds against millions of indexed sequences, then returns each match with its coordinates and its identity.

- It searches **assembled sequence** — Logan contigs, genome collections
- Queries **longer than 150 bp** — genes, plasmids, viral genomes, long reads
- The output is alignments, so you can examine each match

[`lexicmap_index`](https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/lexicmap/lexicmap_index/0.9.0+galaxy0) · [`lexicmap_search`](https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/lexicmap/lexicmap_search/0.9.0+galaxy1)
:::
:::

::: note accent=amber
[Logan](https://github.com/IndexThePlanet/Logan) provides two products for this reason. Unitigs are near-lossless and suit `kmindex` presence search. Contigs are error-corrected and suit `LexicMap` alignment.
:::

---

<!-- _class: micro middle -->

# Petabase-scale search, without the hardware

The index is the expensive part. Build it once, then give everyone a web form.

::: pillars brace="One query box" accent=amber size=lg
### Petabase index {accent=sky}

[Logan](https://github.com/IndexThePlanet/Logan) unitigs · [`LexicMap`](https://bioinf.shenwei.me/LexicMap/) k-mer tables

### High-memory compute {accent=emerald}

TB-scale RAM · NVMe scratch · many cores

### Galaxy front end {accent=indigo}

Web UI or API · results go to other tools
:::

::: cols cols=2 gap=18px stretch
::: card title="Why most labs cannot run this themselves" accent=rose border=top size=sm
To build and search a petabase index, you need terabyte-scale memory, fast scratch storage and many cores. This is more than standard lab hardware provides. You must also rebuild the index as the archive grows.
:::

+++

::: card title="What central hosting provides" accent=emerald border=top size=sm
One shared, pre-computed index behind a web form. The accessions it returns go directly to other [Galaxy](https://galaxyproject.org) tools: [`LoFreq`](https://csb5.github.io/lofreq/), the typing panel and phylogenetic placement.
:::
:::

---

<!-- _class: micro middle -->

# What a 28S query finds in routine stool archives

Three clinical runs contain *Cyclospora*. Nobody had annotated them as such.

::: cards cols=3 gap=14px size=sm minh=170px
### Bangladesh, cholera cohort {tag="WGS metagenome" accent=sky}

An acute diarrhoeal gut metagenome from Dhaka surveillance, ~14.3M read pairs ([`SRR25011076`](https://www.ebi.ac.uk/ena/browser/view/SRR25011076) · [`PRJNA976726`](https://www.ebi.ac.uk/ena/browser/view/PRJNA976726)). It contains unannotated *Cyclospora* DNA.

### UK, unresolved gastroenteritis {tag="Metatranscriptome" accent=emerald}

A metatranscriptome, ~28.3M read pairs ([`ERR11474981`](https://www.ebi.ac.uk/ena/browser/view/ERR11474981) · [`PRJEB62473`](https://www.ebi.ac.uk/ena/browser/view/PRJEB62473)). Routine diagnostics found no pathogen in this case.

### UK, *Salmonella* co-infection {tag="Metatranscriptome" accent=amber}

A metatranscriptome ([`ERR11495252`](https://www.ebi.ac.uk/ena/browser/view/ERR11495252)) from a patient with confirmed *Salmonella*. The patient also had an unrecognised parasitic co-infection.
:::

::: cols ratio="1fr 1fr" gap=18px
::: box .box-inline accent=indigo size=sm
**Why the tests missed them.** Routine GI panels test for bacteria and viruses. A parasite that is not on the panel stays invisible until somebody sequences all the material and examines it. 28S rRNA is abundant, so metatranscriptomes stay sensitive even where parasite DNA is scarce.
:::

+++

::: box .box-inline accent=slate size=sm
**Preliminary, and contested.** This is 2 of approximately 1,000 in the UK cohort. A separate k-mer scan of 421 stool metagenomes from ten endemic countries and 200 wastewater metagenomes, with a working positive control, found none.
:::
:::

---

<!-- _class: micro middle -->

# From shotgun reads to MLST alleles

[`SRR25011076`](https://www.ebi.ac.uk/ena/browser/view/SRR25011076): filtered mapping recovers **4 reads** at MAPQ 60 with full-length identity. These give **5 sub-locus calls** on the CDC panel.

::: cols cols=2 gap=18px stretch
::: card title="Nu_360i2 — nuclear intron" subtitle="PART_D_Hap_2 / PART_E_Hap_2" accent=sky border=top size=sm
One read spans positions 334–485 (151 bp, E = 2 × 10⁻⁴³). It matches CDC outbreak haplotypes with 0 mismatches.
:::

+++

::: card title="Mt_MSR — mitochondrial rRNA" subtitle="PART_A/B_Hap_1 · PART_F_Hap_2" accent=emerald border=top size=sm
Three reads span positions 35–686 (E = 1 × 10⁻⁵⁵). Two overlapping reads agree at 100% identity.
:::
:::

::: cards cols=3 gap=14px size=sm
### One lineage, at this depth {accent=indigo}

There are zero heterozygous sites at the called loci. At less than 0.6% parasite content, unamplified shotgun sequencing samples one lineage.

### A geographic signal {accent=amber}

`Mt_MSR_PART_F_Hap_2` separates this South Asian isolate from the North American `PART_F_Hap_1`. The shared `Nu_360i2` alleles are conserved.

### DNA panel ≠ RNA scheme {accent=rose}

The UK metatranscriptomes gave 28S hits, but **0 reads** at the DNA amplicon loci. RNA-based surveillance needs ribosomal subtyping in addition to MLST.
:::

The read-level results are preliminary and unpublished. {.footnote}

---

<!-- _class: compact -->

# Thank you!

::: cols ratio="0.85fr 0.4fr 1.05fr" gap=16px stretch
::: card title="People A to Z" accent=emerald size=lg
Artem Babayan, Dannon Baker, Kelsey Beavers, Danielle Callan, Rayan Chikhi, Nate Coraor, John Davis, Björn Grüning, Teo Lemane, Wolfgang Maier, Pierre Peterlongo, Sergei Pond, Dave Rogers, Marius Van Den Beek

[CDC](https://github.com/Joel-Barratt/CDC-Complete-Cyclospora-typing-workflow-ALPHA-TEST) produced the *Cyclospora* panel, its nomenclature and the 2018 cluster labels, and released them as CC0.
:::

+++

::: card title="Funding" accent=sky size=lg
NIH [NIAID](https://www.niaid.nih.gov)

NIH [NHGRI](https://www.genome.gov)
:::

+++

::: card title="Links!" accent=indigo size=lg
- [brc-analytics.org](https://brc-analytics.org) — Data, workflows, compute
- [galaxyproject.org](https://galaxyproject.org) — Project home
- [usegalaxy.org](https://usegalaxy.org) — US
- [usegalaxy.eu](https://usegalaxy.eu) — EU
- [usegalaxy.org.au](https://usegalaxy.org.au) — Australia
- [training.galaxyproject.org](https://training.galaxyproject.org) — Galaxy Training Network
:::
:::

::: box .box-inline accent=slate size=md
**Find me at ICOPA:** [anton@nekrut.org](mailto:anton@nekrut.org)
:::

::: figure src="assets/qr/icopa26.svg" href="https://gxy.io/icopa26" h=122px bare .qr-pin
gxy.io/icopa26
:::

BRCs = BV-BRC ([bv-brc.org](https://www.bv-brc.org/)) + PDN ([pathogendatanetwork.org](https://pathogendatanetwork.org/)) + BRC-analytics ([brc-analytics.org](https://brc-analytics.org)) {.footnote}
