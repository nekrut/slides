---
marp: true
theme: deckkit
size: 16:9
paginate: true
header: '![BRC Analytics Logo](https://brc-analytics.org/logo/brc.svg) BRC-Analytics | Positive Selection Server'
footer: 'Evolutionary Tracking of Viral Outbreaks • May 22, 2026'
---

<!-- _class: title -->

```brandbar
https://brc-analytics.org/logo/brc.svg | 28 | invert
https://datamonkey.org/assets/img/header-logo.svg | 24
https://www.hyphy.org/images/logo.svg | 24
```

Platform Spotlight {.badge}

# Real-Time Evolutionary Surveillance:

## Tracking Viral Outbreak Upticks via Positive Selection Server Usage

::: presenter
Sergei Kosakovsky Pond & Anton Nekrutenko

May 22, 2026
:::

---

<!-- _class: dense -->

# BRC-Analytics: Analysis Workflow

A high-level overview of the sequence analysis pipeline, from input data processing to selection detection and downstream ecosystem integration.

::: figure src="datamonkey.svg" bare
:::

::: callout title="Workflow Pipeline" icon="https://brc-analytics.org/logo/brc.svg"
The schematic illustrates the process: inputting alignments, running analyses via Datamonkey servers or client browsers, and exporting outputs (JSON/CSV) to downstream platforms like Galaxy for visualization.
:::

---

<!-- _class: dense -->

# Datamonkey: Platforms for Molecular Evolution

Providing statistically rigorous inference frameworks for natural selection and recombination across global computing environments. The platform supports sequence analysis for diverse viral, bacterial, and eukaryotic pathogens, processing over 50,000 runs annually, where each analysis is a comparative task evaluating multi-sequence alignments and phylogenetic trees.

::: cols gap=30px
## ![](https://datamonkey.org/assets/img/header-logo.svg) Datamonkey 2.0 (Server-Side)

- **Centralized Computing:** Runs complex, resource-intensive evolutionary models on shared server clusters.
- **Queue-Based Workflow:** Processes large-scale datasets reliably, though jobs may experience wait times during peak usage.

Web portal: [datamonkey.org](https://datamonkey.org)

+++

## ![](https://datamonkey.org/assets/img/header-logo.svg) Datamonkey 3.0 (Client-Side)

- **Browser-Based Computing:** Performs analysis directly on the user's computer, eliminating server queue wait times.
- **Immediate Processing:** Minimizes wait times and supports data privacy, but is bounded by local browser memory limits.

Web portal: [v3.datamonkey.org](https://v3.datamonkey.org)
:::

::: callout title="Ecosystem Integration" icon="https://brc-analytics.org/logo/brc.svg"
Both versions operate as standalone portals for targeted analysis and integrate with automated platforms like Galaxy to support reproducible genomic pipelines.
:::

---

<!-- _class: dense -->

# Programmatic Integration: Automated Workflows

Exposing evolutionary analysis pipelines programmatically using the [Model Context Protocol](https://modelcontextprotocol.io) (via the [Datamonkey MCP Server](https://mcp.datamonkey.org)) to integrate selection inference directly into digital research systems.

::: cols gap=30px
## Workflow Automation

- **Unified Tool Access:** Connects evolutionary tools directly to existing analysis pipelines, removing manual data transfer steps.
- **Automated Research:** Integrates with digital research assistants to perform selection analyses as part of larger computational runs.

MCP service: [mcp.datamonkey.org](https://mcp.datamonkey.org)

+++

## Operational Management

- **Pre-Flight Verification:** Automatically validates input datasets and configurations prior to execution to reduce runtime failures.
- **Process Coordination:** Oversees the analysis lifecycle, handling data submission, queue monitoring, and result retrieval.
:::

::: callout title="Operational Impact" icon="https://brc-analytics.org/logo/brc.svg"
Programmatic access supports automated evolutionary tracking, enabling selective pressure monitoring to be integrated into viral surveillance workflows.
:::

---

<!-- _class: compact -->

# Outbreak Analysis: Modular Selection Suite

Analyzing selection and recombination through complementary, non-linear evolutionary inquiries.

::: cards cols=2 gap=15px size=xs
### Recombination Screening (GARD) {tag="Control Module" accent=slate}

Identifies breakpoints to control for phylogenetic conflict.

- **Pre-flight Check:** Reduces false positive selection signals.
- **Pathogen Context:** Commonly used for high-recombination pathogens (HIV, SARS-CoV-2); less relevant for non-recombining pathogens (Hantavirus).

### Temporal Selection Spikes {tag="When? (Episodic)" accent=sky}

Detects transient evolutionary pressure restricted to subset branches/sites.

- **BUSTED:** Gene-wide test for episodic selection spikes.
- **MEME:** Pinpoints individual sites under episodic pressure.

### Pervasive & Localized Pressure {tag="Where? (Sites & Branches)" accent=emerald}

Maps selective constraint and adaptation across specific loci or branches.

- **FEL & FUBAR:** Codon-level pervasive purifying or diversifying selection.
- **MEME:** Individual sites under episodic selection spikes.
- **aBSREL:** Identifies specific branches undergoing diversifying selection.

### Selective Shifts & Tuning {tag="What Differences? (Comparative)" accent=purple}

Compares evolutionary pressures between host species or groups.

- **Contrast-FEL:** Maps host-specific selection shifts (e.g. Human vs. Rodent).
- **RELAX:** Tests for selection relaxation or intensification.
:::

::: callout title="Integration Strategy" icon="https://www.hyphy.org/images/logo.svg" dim slim
Rather than running a single linear pipeline, researchers select the module suited to their biological question. Recombination screening (GARD) is recommended for recombining pathogens, while direct selection analysis is suitable for non-recombining viruses like Hantavirus.
:::

---

<!-- _class: compact -->

# Outbreak Analysis: Why Evolutionary Profiling Matters

Connecting phylogenetic patterns to biological mechanisms, structural characterization, and outbreak surveillance.

::: cards cols=2 gap=30px border=top size=sm checks
### Outbreak & Escape Tracking {icon="🎯" subtitle="Tracing Receptor Binding & Antigenic Drift" accent=sky}

- **Evasion Signals:** Separates neutral genetic drift from adaptive pressure, tracing structural changes associated with potential immune escape.
- **Host Adaptation:** Contrast-FEL maps host-specific selection shifts, identifying differences in selection pressures between host groups.

### Conservation Analysis {icon="⚓" subtitle="Locating Conserved Residues" accent=emerald}

- **Mutational Tolerance:** B-STILL identifies residues under purifying selection where mutations are less frequently observed.
- **Functional Domains:** Identifying conserved residues (e.g., fusion loops, transmembrane domains) helps characterize potential structural constraints.
:::

::: callout title="Surveillance Objective" icon="https://www.hyphy.org/images/logo.svg" dim
Integrating selection workflows supports surveillance by going beyond cataloging mutations: it provides information on whether new lineages are adapting to hosts or experiencing potential structural constraints.
:::

---

<!-- _class: micro -->

# Surveillance Dynamics: Tracking Outbreak Spikes

Analyzing Datamonkey server usage signals for Hantavirus and Ebola virus under sequence availability constraints.

```timeline
track: Hantavirus Submission Patterns | Active Monitoring (59.6% of weeks, n=994) | accent=sky
node: 10% | Oct 2025 | 174 hits | Peak Submissions // (Southern Cone Spring Onset) | lg
node: 45% | Jan 2026 | 76 hits | Uptick // (Post-PAHO Alert)
node: 70% | Mar 2026 | 148 hits | Increased Submissions // (Late-Summer Peak) | md
node: 95% | May 2026 | 98 hits | Active Submissions // (MV Hondius Outbreak) | sm

track: Ebola Virus (EBOV) Signal | Sporadic Signal (30.8% of weeks, n=110) | accent=rose
node: 10% | Late 2025 | Sporadic | Low Baseline // (Endemic Monitoring)
node: 45% | Early 2026 | Scattered | Low Baseline // (Routine Surveillance)
node: 80% | Mid May '26 | 0 hits | Complete Gap // (Pre-Alert Pause) | open
node: 95% | Late May '26 | 27 hits | Increased Submissions // (Bundibugyo Outbreak) | lg
```

::: callout title="Surveillance Insight" icon="https://brc-analytics.org/logo/brc.svg" slim
Submission surges can serve as indicators of outbreak activity. Low sequence counts can limit standard selection analysis power, suggesting the use of small-sample models.
:::

---

<!-- _class: dense -->

# Case Study: Andes Hantavirus Glycoprotein (M Segment)

Characterizing selective constraints, host adaptation, and co-evolution across 104 isolates.

::: cols
::: card title="Why Analyze Glycoprotein M?" accent=navy size=md caps
Understanding Andes Hantavirus evolutionary constraints across the host-vector barrier.

- **Entry & Transmission:** Glycoprotein M mediates cell entry and membrane fusion, making it a target of interest for neutralizing antibodies.
- **Reservoir-to-Host Spillover:** Analyzing constraints between Rodent reservoirs and Human hosts can help identify residues associated with adaptation.
- **Outbreak Tracking:** Useful for tracking transmission dynamics in outbreaks, including the recent MV Hondius cruise ship outbreak.

::: note accent=slate title="Collaborator-Driven Study"
Driven by collaborators **L. D. González Vázquez** (Univ. of Vigo), **C. Mavian** (Stellenbosch Univ.), and **D. Martin**. BRC-Analytics provided computational resources, software tools, and workflow guidance.
:::
:::

+++

::: figure src="results/segM_tree.png" h=360px
:::
:::

---

<!-- _class: dense -->

# Global Dynamics & Host Transitions

Gene-wide analysis of selective pressure changes during the transition from rodent reservoir to human host.

::: cards cols=2 border=top size=sm
### Global Selection Pressures {accent=sky}

The glycoprotein is under purifying selection, suggesting functional constraint (dN/dS << 1).

```metrics accent=sky
Human Branches dN/dS | 0.0224
Rodent Branches dN/dS | 0.0227
Background Branches dN/dS | 0.0127
```

### Selection Intensity Analysis {accent=emerald}

Tests if transmission to humans relaxes or intensifies selective constraints on the Glycoprotein relative to rodents.

```metrics accent=sky
Selection Intensity (K) | 1.07
LRT Statistic | 1.0289
P-value (Threshold 0.05) | 0.3104 (NS)
```

::: note accent=emerald
**Conclusion:** There is no significant change in selection intensity (K ≈ 1). The host transition does not suggest generalized evolutionary relaxation or intensification.
:::
:::

::: callout title="Interpretation" icon="💡" slim
This constraint aligns with the structural and functional conservation typical of the Hantavirus Glycoprotein (M Segment). The stability of global selection intensity suggests selection pressures remain similar overall in both hosts, with potential shifts localized to specific sites rather than general genomic relaxation.
:::

---

<!-- _class: dense -->

# Host-Specific Adaptation: Site-Level Shifts

Contrast-FEL identifies specific residues experiencing different evolutionary constraints between host groups.

```genemap length=1137 accent=purple
segment: Gn Head (1–512) | 1-512 | #3B82F6
segment: Gn Stalk | 513-647 | #60A5FA
segment: | 648-651 | #EF4444 | title="Cleavage Motif (647-651)"
segment: Gc Head (652–1000) | 652-1000 | #8B5CF6
segment: Gc Stem | 1001-1110 | #A78BFA
segment: TMD | 1111-1137 | #475569
ticks: 1, 512, 648, 1000, 1110, 1137
mark: 71
mark: 217
mark: 598
mark: 649
mark: 899
mark: 1051
```

::: cards cols=2 size=xs caps
### Host Constraint Shift (Human vs. Rodent) {accent=purple}

Contrast-FEL identifies 6 host-specific sites. In these results, all 6 sites exhibit variation in the rodent reservoir (higher *dN*) but are conserved in human infections (*dN* = 0), which is consistent with potential host transmission bottlenecks:

| Site & Region | Human | Rodent |
| --- | --- | --- |
| 71 [(Gn Head)]{.dim} | {{logo T}} | {{logo T:67 L:33}} |
| 217 [(Gn Head)]{.dim} | {{logo T}} | {{logo T:67 V:33}} |
| 598 [(Gn Stalk)]{.dim} | {{logo G}} | {{logo G:75 N:25}} |
| 649 [(Cleavage)]{.dim} | {{logo A}} | {{logo A:50 V:50}} |
| 899 [(Gc Head)]{.dim} | {{logo G}} | {{logo G:75 H:25}} |
| 1051 [(Gc Stem)]{.dim} | {{logo T}} | {{logo T:50 S:25 M:25}} |

### Cleavage Motif Host Tuning (Site 649) {accent=purple}

Site 649 resides in the conserved proteolytic cleavage motif **W-A-A-S-A** (glycoprotein processing):

```motif accent=purple label="Site 649 (Middle Alanine)"
W - A - [A] - S - A
```

- **Human branches:** Purifying selection (dN ≈ 0) — conserved for **Alanine (A)**.
- **Rodent branches:** Relaxed selection (dN = 0.64) — tolerates **Valine (V)** (50% Alanine [A], 50% Valine [V] in non-gapped sequences).

**Biological Significance:** Suggests host-specific differences in cellular protease interactions or processing machinery are associated with tighter constraint in human infections compared to the reservoir.
:::

---

<!-- _class: dense -->

# Diversifying Selection: Episodic Selection Pressures

Tracking localized selection pressures in the Glycoprotein.

```genemap length=1137 accent=purple
segment: Gn Head (1–512) | 1-512 | #3B82F6
segment: Gn Stalk | 513-647 | #60A5FA
segment: | 648-651 | #EF4444 | title="Cleavage Motif (647-651)"
segment: Gc Head (652–1000) | 652-1000 | #8B5CF6
segment: Gc Stem | 1001-1110 | #A78BFA
segment: TMD | 1111-1137 | #475569
ticks: 1, 512, 648, 1000, 1110, 1137
mark: 307
mark: 499
mark: 823
mark: 994 | raise
mark: 996
mark: 1055
```

::: cards cols=2 border=top
### Host Variation at Adaptive Sites {accent=purple size=sm caps}

| Site & Region | Human | Rodent | MEME p |
| --- | --- | --- | --- |
| 307 [(Gn Head)]{.dim} | {{logo S}} | {{logo S}} | [0.051]{.mono .dim} |
| 499 [(Gn Head)]{.dim} | {{logo I:70 V:30}} | {{logo I:67 V:33}} | [0.074]{.mono .dim} |
| 823 [(Gc Head)]{.dim} | {{logo A}} | {{logo A}} | [0.082]{.mono .dim} |
| 994 [(Gc Head)]{.dim} | {{logo T}} | {{logo T}} | [0.017]{.mono .dim} |
| 996 [(Gc Head)]{.dim} | {{logo T}} | {{logo T:75 V:25}} | [0.094]{.mono .dim} |
| 1055 [(Gc Stem)]{.dim} | {{logo S:80 T:20}} | {{logo S}} | [0.080]{.mono .dim} |

### Selection Summary & Interpretation {accent=indigo size=md caps}

- **Gene-Wide Selection (BUSTED-E):** Whole-tree selection is borderline significant (p = 0.054). No global enrichment on human lineages (p = 0.21).
- **Site-Specific Selection (MEME):** Identified 6 sites under episodic selection (p <= 0.10) across key domains: Gn head (307, 499), Gc head (823, 994, 996), and Gc stem (1055).
- **Hondius Outbreak Variants:** All 5 isolates from the May 2026 outbreak carry minority variants at two selected sites: site 499 (100% Valine) and site 1055 (100% Threonine).
:::

---

<!-- _class: dense -->

# Co-Evolutionary Networks (BGM)

Identifying interacting codon networks and structural linkages.

::: figure src="scratch/bgm_network_new.svg" bare
:::

::: cards cols=2 border=top size=sm
### Bayesian Graphical Models (BGM) {accent=emerald}

BGM maps epistatic interactions by detecting co-varying codon positions:

- **Network Density:** 25 co-evolving pairs (posterior probability > 0.50) across the M segment.
- **Compensatory Selection:** Links (prob ≥ 0.90) in Gn outer shell and Gc fusion loop show structural constraint.
- **Synonymous Association:** Co-variation at synonymous sites suggests RNA-level constraint.

### Co-evolving Codon Pairs (Prob ≥ 0.90) {accent=emerald}

Interaction links and structural context:

| Codon Pair | Posterior Prob | Type | Structural Context |
| --- | --- | --- | --- |
| **126 & 168** | [0.97]{.mono .c-emerald} | [Nonsyn]{.badge .accent-purple} | Gn Head outer shell co-variation (V/I vs S/N) |
| **117 & 311** | [0.95]{.mono .c-emerald} | [Nonsyn]{.badge .accent-purple} | Compensatory hydrophobic shifts (P/S/A vs T/A/S) |
| **669 & 670** | [0.95]{.mono .c-emerald} | [Nonsyn]{.badge .accent-purple} | Adjacent residues in Gc DI fusion loop (E vs I/V) |
| **743 & 785** | [0.90]{.mono .c-amber} | [Syn]{.badge .accent-amber} | Gc Head co-variation (CAG/CAA vs GTT/GTG/GTA/GTC) |
:::

::: callout title="RNA-Level vs. Protein-Level Co-evolution" icon="🔗" accent=amber slim
Codon-level BGM detects both **nonsynonymous** compensatory links (e.g., adjacent sites 669/670 in Gc) and **synonymous** co-evolving pairs (e.g., 743 & 785). Synonymous association suggests potential selection at the RNA level, which may conserve secondary structures or translation speed.
:::

---

<!-- _class: dense headroom -->

# Highly Conserved Sites & Summary

B-STILL identifies highly conserved residues suggesting potential functional constraint.

```genemap length=1137 accent=sky
segment: Gn Head (1–512) | 1-512 | #3B82F6
segment: Gn Stalk | 513-647 | #60A5FA
segment: | 648-651 | #EF4444 | title="Cleavage Motif (647-651)"
segment: Gc Head (652–1000) | 652-1000 | #8B5CF6
segment: Gc Stem | 1001-1110 | #A78BFA
segment: TMD | 1111-1137 | #475569
ticks: 1, 512, 648, 1000, 1110, 1137
mark: 22 | 22: ACC
mark: 685 | 685: TCA
mark: 735 | 735: GCA
mark: 978 | 978: ACA | raise
mark: 992 | 992: ACA
mark: 1116 | 1116: GTG
```

::: cols ratio="1.15fr 0.85fr"
::: card title="B-STILL Strongly Conserved Loci (SCLs)" accent=sky size=lg
B-STILL identifies 6 strongly conserved loci (sites 22, 685, 735, 978, 992, and 1116) under purifying constraint (Bayes Factor EBF > 10). These sites represent positions with low mutational tolerance across the glycoprotein sequence.

These sites are unusual in the context of a gene that is already quite conserved: only **7.3%** of the codons (83/1137 sites with >50% non-gap data) are perfectly conserved across all 104 isolates.
:::

+++

::: box title="Summary Takeaways" accent=sky size=md
- **Conserved Regions:** Highly conserved sites such as Site 735 (fusion loop) and Site 1116 (TMD) exhibit very low mutational tolerance, which may guide future immunogen design.
- **Host-Vector Monitoring:** Monitoring host-specific selection shifts (such as the proteolytic processing motif at site 649) provides information relevant to vector-to-human spillover analysis.
:::
:::

::: callout title="Evolutionary Summary" icon="📊" slim
By integrating B-STILL, MEME, and Contrast-FEL, we map both conserved loci and host-vector adaptations in the viral envelope, helping to characterize evolutionary constraints.
:::
