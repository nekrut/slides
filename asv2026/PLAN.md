# Slides

## Slide 1

Title: BRC-Analytics: A free, universally accessible environment for analysis of viral data

Subtitle: The fitute is agentic

badge: ASV 2026

Presenter: Anton Nekrutenko | Penn State | galaxyproject.org

## Slide 2

Title: Outline
Subtitle: A 15 min impossible chanllenge

- What is BRC-Analytics
- What is Galaxy
- What are agentic analyses
- Teaser: Logan / LexicMap

## Slide 3

Title: BRC-Analytics: data, tools, worflows, infrastrcture
Subtitle: https://brc-analytics.org

> Three cards connected

Card 1: Data (NCBI, EBI, UCSC Genome Browser)
Card 2: Tools + Workflows (BioConda, Biocontainers, Workflows)
Card 3: Compute and Storage (TACC, IU JetStream2, ACCESS-CI)

There needs to be a bracked underneath uniting the three cards and saying (Agenets)

## Slide 4

Title:  BRC-analytics flow
Subtitle: https://brc-analytics.org


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

## Slide 5

Title: Examples of workflows
Subtitle: available at https://brc-analytics.org

Four cards with /Users/anton/git/slides/asv2026/images/*-card.png


## Slide 6

Title: An exmple workflow
Subtitle: Also see https://iwc.galaxyproject.org/

/Users/anton/git/slides/asv2026/images/influenza-a-workflow-diagram.png

## Slide 7

> Create several 1-2 slides from information in "Galaxy info" heading at the end of this file

## Slide 8

Title: The future is Agentic!
Big text: AI is an environmental and sociological disaster ... but it could be great for science if used responsibly

## Slide 9

> Essentially the same as slide 3 but with some modifications:

Title: The bright agentic future
Subtitle: https://brc-analytics.org

> Three cards connected

Card 1: Data (NCBI, EBI, UCSC Genome Browser)
Card 2: Tools + Workflows (BioConda, Biocontainers, Workflows)
Card 3: Compute and Storage (TACC, IU JetStream2, ACCESS-CI)

There needs to be a bracked underneath uniting the three cards and saying (Agents)

## Slide 10

Title: Orbit
Subtitle: A BRC-analytics / Galaxy agent

Insert the following part of /Users/anton/git/slides/asv2026/images/orbit-chrm-variant-calling.png of the site into this slide so that it is dynamic

## Slide 11

Combine slides 4 and 5 from into this slide

## Slide 12

Title: We need testers!
Subtitle: You will be given API keys to frontier models!

A bit QR code poiting to https://forms.gle/T9EZyXBnACso6cYn6

## Slide 13

Title: One last thing
Sustitle: Logan is availabel from Galaxy and soon from BRC-analytics directly

Card:

qr code to https://usegalaxy.org/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/kmindex/kmindex_query/0.6.1+galaxy3

## Slide 14

> Create a slide based om what logan is and how it can be used in virology reerach. Use https://www.biorxiv.org/content/10.1101/2024.07.30.605881v2 for background info

## Slide 15

Title: Thank you!

Cards:

Card 1: Acknowledgements: NIH NIAID, NIH NHGRI
Card 2: Sergei Pond, Rayan Chikhi, Dannon Baker, Danielle, Callan, Marius Van Den Beek, Keley Beavers, John Davis, Dave Rogers, Nate Coraor, Wolfgang Maier, Bjorn Gruning



# Galaxy info from /Users/anton/git/infographics-generator/sites/what_is_galaxy/slides.md

# [global] Galaxy is free, it is powerful and it scales!
> Analyze your genomic, metagenomic, proteomic, metabolomic data in one place.

| Stat | Label |
|------|-------|
| 750,000 | jobs per month |
| 400,000+ | registered users |
| 1,500 | concurrent users |
| $2,000,000+ | free compute / year |
| 10,000+ | analysis tools |
| 22,000+ | citations |

---

# [intro] Get your data!
> From computer, web, SRA, anywhere

![Upload data to Galaxy](images/upload.png)

---

# [intro] Run a tool ...
> Select from 1,000s of tools

![Run a tool in Galaxy](images/run-tool.png)

---

# [intro] ... or run a workflow!
> Select from 100s of community curated workflows

![Run a workflow in Galaxy](images/run-wf.png)

---

# [intro] Interpret and publish!
> Use integrated Jupyter or RStudio and soon new AI agentic tools

![Interpret results in Galaxy](images/interpret.png)

---

# [global] Galaxy is Highly Scalable
> split

Galaxy provides an equivalent of **>$2,000,000/year** of free computational infrastructure to all biomedical researchers in the US.

Powered by ACCESS-CI, Galaxy accesses resources at **TACC, PSC, NCSA, and SDSC** to deliver unprecedented scale.

::: highlight
Every new Galaxy user automatically gets 250 GB of permanent storage and 1 TB of scratch space with 8 concurrent job slots.
:::

![ACCESS-CI Infrastructure](images/access-map.svg)

---

# [global] Galaxy is a Tool Ecosystem
> Galaxy serves thousands of open source analysis tools and is tightly integrated with BioConda and BioContainer communities

| Stat | Label |
|------|-------|
| 11,699 | BioConda packages |
| 30,722 | CondaForge packages |
| 12,333 | BioContainers |
| 10,676 | Galaxy wrappers |

---



