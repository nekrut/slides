---
marp: true
theme: deckkit
size: 16:9
paginate: true
header: '![BRC Analytics](https://brc-analytics.org/logo/brc.svg) BRC Analytics | American Society for Virology 2026'
footer: 'ASV 2026 • Anton Nekrutenko'
---

<!--
ASV 2026 — 15 minutes, 13 slides. Rough budget:
  title 0:30 | BRC 4 slides ~4:00 | pivot ~1:00 | Orbit 4 slides ~5:00 |
  Logan/LexicMap 2 slides ~2:30 | close ~0:30 | leaves ~1:30 slack
Arc: BRC is the front door -> its real function is handing you to Galaxy
     workflows -> workflows only answer anticipated questions -> agents answer
     the rest, Orbit is one -> Logan/LexicMap as what comes next.
Running example: Andes hantavirus M segment, reused from toolsfortomorrow_May_23_2026.
TODO before the talk: conference dates, Orbit screenshots, Logan/LexicMap Galaxy tool names.
-->

<!-- _class: title -->

```brandbar
https://brc-analytics.org/logo/brc.svg | 28 | invert
https://datamonkey.org/assets/img/header-logo.svg | 24
```

Pathogen genomics {.badge}

# Your pathogen, your question, no pipeline

## BRC Analytics, Galaxy workflows, and the agentic turn

::: presenter
Anton Nekrutenko — Penn State University

American Society for Virology 2026
:::

---

<!-- _class: compact -->

<!-- ~1:00 — Open here. The one number that matters is "free". -->

# BRC Analytics: genomes, tools, and compute for pathogens

A single front door to pathogen genome data, best-practice analysis workflows, and the compute to run them.

```stats accent=sky
1,920 | pathogen taxa | bacteria, viruses and fungi — ultimately all of NCBI Datasets
5,060 | genome assemblies | with annotations, ready to analyze
1,000s | tools & workflows | curated, versioned, reproducible
$0 | to use | no account tier, no installation
```

::: cols gap=30px
## What you get

- **Data you don't have to assemble:** genomes and annotations, kept current.
- **Analysis you don't have to build:** best-practice workflows maintained by the community.

+++

## Where it runs

- **Cloud-powered:** hosted at the Texas Advanced Computing Center, funded by ACCESS-CI.
- **Nothing to install:** open a browser and start.
:::

::: callout title="The point" icon="https://brc-analytics.org/logo/brc.svg" slim
Free compute for researchers, at [brc-analytics.org](https://brc-analytics.org) — no local cluster required.
:::

---

<!-- _class: micro -->

<!-- ~1:30 — THE key slide for section one. Walk the six steps quickly.
     Land the point: BRC is not a database you download from, it is a launcher. -->

# What BRC actually does: it hands you to Galaxy

Six choices take you from an organism name to a finished, reproducible analysis. The workflow runs in Galaxy; you never leave the browser.

::: cards cols=3 gap=14px size=xs accent=sky thumb=120px
### Find organism {tag="1"}

Pick from 1,920 taxa.

![Selecting a species in BRC Analytics](assets/brc/select-species.png)

### Select genome {tag="2"}

Choose among 5,060 assemblies.

![Selecting a genome assembly](assets/brc/select-assembly.png)

### Select workflow {tag="3"}

Best-practice, community-maintained.

![Selecting an analysis workflow](assets/brc/select-workflow.png)

### Select data {tag="4"}

Anything in the SRA, or your own.

![Selecting input data](assets/brc/find-data.png)

### Run workflow {tag="5"}

One sample or a million.

![Running the workflow in Galaxy](assets/brc/run-wf.png)

### Interpret {tag="6"}

Inspect, iterate, publish.

![Interpreting results](assets/brc/interpret.png)
:::

---

<!-- _class: dense -->

<!-- ~1:00 — Introduce the running example. This same question comes back twice:
     once solved by a workflow, once by an agent. -->

# A real question: Andes hantavirus glycoprotein

::: cols ratio="1fr 1fr"
::: card title="The setting" accent=navy size=md caps
An outbreak aboard the *MV Hondius* in May 2026 put a rodent-borne virus into a human transmission chain, on top of 104 sequenced isolates spanning both hosts.

**The question:** does the jump from rodent reservoir to human host change which residues the virus is allowed to vary?

- **Where to look:** glycoprotein M — mediates cell entry and membrane fusion.
- **What to measure:** site-level selective constraint, compared between host groups.
- **Why it is hard:** no single tool answers it — it takes a suite.

::: note accent=sky
Work with L. D. González Vázquez (Univ. of Vigo), C. Mavian (Stellenbosch), and D. Martin.
:::
:::

+++

::: figure src="assets/hanta/segM_tree.png" h=380px
104 Andes hantavirus isolates, M segment. Blue: human. Green: rodent.
:::
:::

---

<!-- _class: dense -->

<!-- ~1:30 — The payoff of section one: this is what a workflow gets you.
     Do NOT go deep on the biology; the point is that it ran, not what it found. -->

# Answered with a workflow: selection across the glycoprotein

Contrast-FEL, MEME, and B-STILL, run as a Galaxy workflow on BRC infrastructure.

```genemap length=1137 accent=purple
segment: Gn Head (1–512) | 1-512 | #3B82F6
segment: Gn Stalk | 513-647 | #60A5FA
segment: | 648-651 | #EF4444 | title="Cleavage motif (647–651)"
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

::: cards cols=2 size=sm
### What the analysis returned {accent=purple}

- **Six host-specific sites.** All six vary in the rodent reservoir but are conserved in human infections — consistent with a transmission bottleneck.
- **One of them sits in the cleavage motif.** Site 649, in the conserved **W-A-A-S-A** processing motif, tolerates valine in rodents and only alanine in humans.
- **No global relaxation.** Selection intensity is unchanged across the host transition (K ≈ 1); the shifts are local, not genome-wide.

### What it cost {accent=sky}

- **Zero software installed.** Everything ran on BRC/Galaxy compute.
- **Fully reproducible.** Every step, parameter, and version recorded in the Galaxy history.
- **But:** somebody had to know which four tools to run, in which order, with which parameters.
:::

---

<!-- _class: compact -->

<!-- ~1:00 — THE HINGE. Say it plainly and do not hedge. This is the argument
     the rest of the talk pays off. Expect pushback in Q&A; that is fine. -->

# Workflows answer the questions we anticipated

::: cols ratio="1fr 1fr"
::: card title="What a workflow is" accent=slate size=md
A workflow is a **frozen answer to a question someone already asked.** That is exactly what you want for the analyses everyone runs — assembly, variant calling, quantification.

It is exactly what you do not have for the question you actually came in with.
:::

+++

::: card title="What research actually looks like" accent=purple size=md
Every question above required a human to choose the tools, chain them, read the intermediate output, and decide what to run next.

**That loop is the bottleneck — and that loop is now automatable.**
:::
:::

::: callout title="The claim" icon="🛰️" accent=purple
Analysis is moving from *running a pipeline* to *directing an agent that assembles the pipeline as it goes.* Not eventually — the tooling exists now, and Orbit is one instance of it.
:::

---

<!-- _class: compact -->

<!-- ~1:15 — What Orbit IS. Keep it concrete: it is an app you install. -->

# Orbit: an AI research harness for Galaxy

Galaxy, a reasoning model, and a lab notebook in one window — it turns any working directory into a co-scientist project.

::: cards cols=3 gap=18px size=sm border=top
### The agent {tag="Reasoning" accent=purple}

Reads your data descriptions, drafts an analysis plan, decides how to route each step, and interprets what comes back.

Bring your own model — Anthropic, OpenAI, Google, or DeepSeek.

### Galaxy {tag="Execution" accent=sky}

Orbit registers the **Galaxy MCP server** automatically, then queries the live tool catalog and the IWC workflow registry.

Heavy lifting runs on Galaxy; small steps run locally.

### The notebook {tag="Record" accent=emerald}

A persistent `notebook.md` that accumulates across sessions — plans, invocations, results, conclusions.

Version-controlled from the first command.
:::

::: callout title="Available now" icon="🛰️" accent=purple slim
Desktop app for macOS, Linux, and Windows via WSL2 — [galaxyproject.org/tools/orbit](https://galaxyproject.org/tools/orbit/). Beta: expect rough edges.
:::

---

<!-- _class: compact -->

<!-- ~1:15 — This is the trust slide. The plan-approval pause and the git-backed
     notebook are what separate this from "I asked a chatbot". Dwell here. -->

# You approve the plan. The record writes itself.

The reason to run an agent through Galaxy rather than a chat window: every decision is inspected before it executes and preserved after it does.

::: cards cols=2 size=sm border=left
### The loop {tag="How a step happens" accent=purple}

- **Draft.** The agent proposes a plan in chat, with parameters shown.
- **Pause.** Nothing runs until you approve it — this is a hard stop, not a suggestion.
- **Route.** Each step is tagged `[local]`, `[hybrid]`, or `[remote]` so you know where it will execute.
- **Record.** The approved plan is written to the notebook *before* execution begins.

### Why it is auditable {tag="Provenance" accent=emerald}

- **Galaxy provenance underneath.** Tool versions, parameters, and inputs captured as they always are.
- **Git from the start.** Orbit runs `git init` and auto-commits — a timestamped, immutable record of every decision, with full undo.
- **The notebook is the paper's methods section**, written continuously instead of reconstructed at submission.
:::

::: callout title="The distinction that matters" icon="🔒" accent=emerald slim
An agent that cannot show its work is a liability. An agent writing into Galaxy provenance is a collaborator.
:::

---

<!-- _class: dense -->

<!-- ~1:30 — Same question as slide 5, driven by an agent instead of a workflow.
     TODO: replace the placeholder with real Orbit screenshots / notebook excerpt
     from re-running the hantavirus selection analysis. -->

# The same question, directed rather than programmed

Handing the hantavirus glycoprotein question to Orbit instead of assembling the workflow by hand.

::: cols ratio="1fr 1fr"
::: card title="What you type" accent=purple size=md
> *"These are 104 Andes hantavirus M segment sequences with host labels. Is selection different between human and rodent branches?"*

**What comes back is a plan, not an answer:** align, build a tree, label branches by host, run Contrast-FEL and MEME, summarize the sites that differ.

You read it, adjust the two things it got wrong, and approve.

::: note accent=emerald
Everything below that point is Galaxy — the same tools, the same provenance, the same results as the hand-built version.
:::
:::

+++

::: div .todo
**Orbit screenshot goes here** — the plan-approval pause with parameters shown,
and the `notebook.md` pane after the run. Replace this block with a `::: figure`.
:::

::: figure src="assets/hanta/datamonkey.svg" bare
:::

::: box title="What changes, and what does not" accent=sky size=md
- **Changes:** who assembles the pipeline, and how long it takes to ask the second question.
- **Does not change:** the tools, the provenance, or your obligation to check the result.
:::
:::

---

<!-- _class: compact -->

<!-- ~1:15 — Section three. Do not oversell; this is "here is what is coming".
     Logan is the data, LexicMap is how you search it. -->

# What comes next: the whole SRA becomes searchable

Two pieces landed recently that change what a sequence search can mean.

```stats accent=emerald cols=3
87 Pbp | assembled | every public SRA accession, contigs and unitigs
Logan | the dataset | planetary-scale assembly of all public sequencing
LexicMap | the index | align a gene against millions of genomes
```

::: cards cols=2 size=sm border=top
### Logan {tag="The data" accent=emerald}

A genome assembly performed over the **entire NCBI Sequence Read Archive** — 87 petabases of public raw data at the time it was built.

- **Unitigs** preserve nearly all the information in the original sample.
- **Contigs** trade variation for length, removing sequencing error.

Every public accession, already assembled, so you never touch the reads.

### LexicMap {tag="The search" accent=sky}

A nucleotide aligner built for the scale Logan created: query a gene, a plasmid, or a long read against **millions of genomes** and get real alignments, not just k-mer hits.

Designed for queries above ~500 bp — which is to say, for actual biological questions.
:::

---

<!-- _class: compact -->

<!-- ~1:15 — The "you can do this today" slide for section three.
     TODO: confirm exact Galaxy tool names and add a screenshot of the tool panel. -->

# Both are in Galaxy now

Which means they compose with everything else — no separate account, no download, same histories and workflows.

::: cols ratio="1fr 1fr"
::: card title="How to get to them" accent=sky size=md caps
- **Open** [usegalaxy.org](https://usegalaxy.org) and search the tool panel for **Logan** or **LexicMap**.
- **Feed them anything** already in your history — no reformatting, no export.
- **Chain the output** into the tools you already use, or into a workflow.

::: div .todo
**Confirm before the talk:** exact tool names and panel section, plus a
screenshot of the Galaxy tool panel with both tools visible.
:::
:::

+++

::: card title="What a virologist would ask" accent=emerald size=md caps
- **Where else has this sequence been seen?** Query a novel segment against every public dataset at once.
- **Is my "novel" virus actually novel?** Or has it been sitting unannotated in somebody's metagenome since 2017.
- **Who else carries this gene?** Host range and reservoir hypotheses from data that already exists.
:::
:::

::: callout title="Why this belongs in this talk" icon="🔍" accent=emerald slim
The same argument as before: the data and the tools are no longer the bottleneck — deciding what to ask is.
:::

---

<!-- _class: compact -->

<!-- ~0:30 — The ask. This is the slide people photograph. Slow down, say the
     URL out loud, leave it up through Q&A. -->

# Start here

::: cols ratio="1.4fr 0.6fr"
::: card title="Three things you can do this week" accent=sky size=md
- **Find your pathogen.** [brc-analytics.org](https://brc-analytics.org) — 1,920 taxa, 5,060 assemblies, free compute at TACC.
- **Run one workflow on it.** Pick a best-practice workflow from [iwc.galaxyproject.org](https://iwc.galaxyproject.org) and point it at SRA data you already know.
- **Then try directing it instead.** Install Orbit from [galaxyproject.org/tools/orbit](https://galaxyproject.org/tools/orbit/) and ask it the same question you just answered by hand.

::: note accent=purple
The comparison is the point. Run it both ways once, and you will know whether this is ready for your work.
:::
:::

+++

::: figure src="assets/brc/qr-code.svg" h=180px bare
gxy.io/what-is-brc
:::

::: box title="Find me" accent=slate size=md
Anton Nekrutenko · Penn State

Questions, collaborations, and complaints all welcome.
:::
:::
