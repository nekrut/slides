# Deck: ICOPA XVI (16th International Congress of Parasitology)

Montréal, 16–21 Aug 2026. Source: `slides.md` (deckkit — see `../CLAUDE.md`
and `../deckkit/README.md`).

**21 slides in a 15-minute slot.** It started at 16, which was already brisk.
At 21 this is roughly 43 seconds a slide with nothing left for questions. If it
has to come down, the archive-search block (17–20) is the newest, and slide 18
carries no data of its own and overlaps slide 17 — cut that one first.

```bash
../deckkit/bin/deck build slides.md   # HTML — the deck you present
../deckkit/bin/deck png   slides.md   # per-slide PNGs, for checking layout
../deckkit/bin/deck pptx  slides.md --image-scale 4 -o nekrutenko_icopa26.pptx
```

Always run `build` as well as `png` after an edit — checking a PNG while
`slides.html` is stale has caused confusion before.

## Slide map

Numbers shift whenever a slide is inserted, and this file refers to slides by
number throughout. **Update this map and re-check every number below after any
insertion or deletion.**

| # | Slide |
| --- | --- |
| 1 | Title |
| 2 | Take as many pictures as you like |
| 3 | Outline |
| 4 | BRC-Analytics: data, tools, workflows, infrastructure |
| 5 | Most of the BRC-Analytics catalogue is eukaryotic |
| 6 | BRC-Analytics flow |
| 7 | Workflows that run on a eukaryotic pathogen |
| 8 | Galaxy is a free public resource |
| 9 | Get data, run tools, run workflows, interpret |
| 10 | Worked example: *Cyclospora cayetanensis* |
| 11 | The future is agentic — Orbit demo |
| 12 | Software architecture and data availability |
| 13 | The workflow, as it runs |
| 14 | Head to head: conventional methods against PyEuk |
| 15 | We need testers! |
| 16 | Search against the entire SRA: only at BRC-Analytics and Galaxy |
| 17 | Two ways to search it — kmindex vs LexicMap |
| 18 | Petabase-scale search, without the hardware |
| 19 | What a 28S query finds in routine stool archives |
| 20 | From shotgun reads to MLST alleles |
| 21 | Thank you! |

## Provenance

Adapted from `../asv2026/slides.md` (American Society for Virology, July 2026).
What changed, and why:

- **Retitled** to the registered program title, "BRC-Analytics: Combining
  agentic AI with open infrastructure for pathogen genomics". "From reads to
  outbreak clusters" survives as the subtitle. Note the tension this creates:
  the title makes agentic AI a co-headliner while the deck spends one slide of
  twenty-one on it (see the trim below). Restore a slide there if the title is
  what the room came for.
- **Slide 2 is new** — an explicit invitation to photograph the deck, with the
  short link. Added on request.
- **Slide 5 is new** — the catalogue's taxonomic breakdown. An ASV audience did
  not need to be told BRC-Analytics covers their organisms; a parasitology
  audience does, and the honest answer is that 449 of 1,975 taxa are parasitic
  protists, helminths or arthropod vectors.
- **Slide 7 replaced** the four virology workflow cards with the eukaryote-
  applicable workflows actually in the BRC catalogue.
- **Slides 10–13 replaced** the Andes hantavirus selection example with
  *Cyclospora cayetanensis* outbreak surveillance.
- **The agentic section shrank from three slides to one** (slide 11). The ASV
  deck spent a divider, a poll slide and the Orbit demo on it; here the
  assertion rides in the lead line of the Orbit slide. The ASV deck's repeated
  pillars callback is therefore gone — do not go looking for it.
- **Logan and LexicMap merged** into one closer (slide 16).
- **Slides 18–20 ported** from slides 25, 26 and 27 of the Tools-for-Tomorrow
  webinar deck at `~/git/BRC-research/cyclospora/presentation/index.html`,
  rewritten into deckkit components: the LexicMap-on-Galaxy infrastructure
  argument, the three archive hits, and the read-level allele recovery. Slide
  16's third card was trimmed to a lead-in so it no longer duplicates them.
- **Slide 17 added** — the kmindex/LexicMap comparison.

- **Orbit moved to slide 11**, between the *Cyclospora* data gap and the software
  that answers it. The arc now reads: here is the problem, here is the agent,
  here is what the analysis looks like when it is built.
- **Slides 12–14 replaced** by slides 30, 31 and 32 of the webinar deck at
  `~/git/BRC-research/cyclospora/presentation/index.html` — software
  architecture, the workflow canvas, and the four-point summary. This removed
  the labelled-benchmark slide, the Galaxy reproduction table, and "What the open
  pipeline changes". **Slide 14 was then replaced again** by webinar slide 23,
  the four-arm benchmark table.
- **Slide 16 retitled** "Search against the entire SRA: only at BRC-Analytics and
  Galaxy", on request.

Two things were carried across deliberately when those three went:

- **The caveat note from the old "What the open pipeline changes" now sits on
  slide 14.** It says the legacy CDC metric discriminates better (ROC AUC 0.9964
  against 0.7692) and that the benchmark is easy. Losing it would leave the
  summary claiming more than the data supports. **Do not drop it.**
- **The cohort is named in slide 14's first card** — "the 2018 outbreak cohort,
  203 specimens, two traceback clusters" — because the slide that introduced it
  is gone and the counts 67/153, 147/153 and 195/203 would otherwise be naked.

An earlier attempt at this replacement was reverted because it also removed the
*Cyclospora* data-gap slide, leaving the organism unintroduced. Slide 10 must
stay ahead of this block.

## Argument

Four moves, same shape as ASV but with the parasitology example load-bearing:

1. **BRC-Analytics is the front door**, and it is mostly eukaryotic — slides 4–6.
2. **Its real function is handing you to Galaxy** — slides 6–9.
3. **A worked example that a parasitologist can check** — slides 10 and 12–14. The
   *Cyclospora* arc is: the public data is one assay; a labelled outbreak
   benchmark was sitting unused inside it; here is the panel as a Galaxy
   workflow, and here is honestly what that does and does not buy you.
4. **The agentic turn** — slide 11. **The searchable archive** — slides 16–20.

Closing ask: a parasitologist should leave able to run *their own* organism
through it. The last slide is the one people photograph.

## Facts to keep accurate

### BRC-Analytics catalogue — verified 18 Aug 2026 against the live catalogue

Counts come from `catalog/output/organisms.json` in
`galaxyproject/brc-analytics`, grouped by `taxonomicGroup`:

- **1,975 taxa, 5,506 assemblies** total (the ASV deck's 1,920 / 5,060 is stale).
- Parasite-relevant, 449 taxa / 989 assemblies: Nematoda 115/196, Arthropoda
  97/181, Apicomplexa 72/267, Microsporidia 51/92, Platyhelminthes 39/55,
  Kinetoplastea 39/115, Amoebozoa 28/40, Metamonada 8/43.
- Everything else: 681 fungi (Ascomycota 472, Basidiomycota 150, Chytridiomycota
  33, Mucoromycota 26), 457 viruses, 323 bacteria, 24 oomycetes, plus 41
  ungrouped or incidental. Slide 5's footnote says "also in the catalogue" and
  not "the rest" precisely because those 41 are unlisted.

Re-derive rather than trusting these if the deck is reused; the catalogue moves.

### Galaxy

750k jobs/month, 400k+ users, $2M+ free compute/year, 22k+ citations, 10,000+
tools. Unchanged from the ASV deck.

Slide 7's workflows are the eukaryote-applicable entries in the BRC catalogue
(`catalog/output/workflows.json`), except the assembly card, which reaches past
BRC into IWC — the lead line points there, so that is fair. The **14-workflow
VGP suite** is `workflows/VGP-assembly-v2/` in `galaxyproject/iwc`, counted as
`.ga` files: VGP0–VGP9 plus VGP6b, Plot-Nx-Size, the Hi-C contact map, and
post-curation processing. `workflows/genome-assembly/` holds four more (Flye,
bacterial, long-read polishing, raw-read QC). Recount before quoting; IWC grows.

### *Cyclospora* — from `nekrut/BRC-research`, `cyclospora/`

The **blog posts (`brc-blog-part2/3/4.md`) are authoritative**; the deck at
`cyclospora/presentation/index.html` is **not** — see "Numbers deliberately not
used" below.

- Data landscape: 9,054 public SRA runs, of which **9,016** are CDC's 8-marker
  amplicon panel (99.6%); **38** whole-genome runs exist worldwide; 49 assembly
  records, median 1,391 contigs / 103 kb N50. No RNA-seq, no proteomics, no data
  for any *Cyclospora* species other than *C. cayetanensis* — and with no in
  vitro culture and no animal model, that is structural.
  **Say that last part out loud.** Slide 10 carries only the four figures and the
  assembly-quality plot at full width; the card explaining *why* the data stays
  this way was cut, so the point survives only if you make it from the podium.
- Benchmark: 203 specimens, BioProject `PRJNA578931`, 10.3 GB. **Vendor A**
  (salads) n=99, **Vendor B** (vegetable trays) n=104, labelled by food-exposure
  traceback in CDC's `2018_gold_clusters.txt`. All 203 join to SRA runs via the
  BioSample `Sample Alias` field.
- Geography: 41 states across 2018–2025 recovered from CDC sample names, against
  BioSample metadata that reports only `geo_loc_name=USA`.
- Reference files: `10.5281/zenodo.21924355` (version DOI; concept DOI
  `…354`). Byte-identical to CDC's release, redeposited CC0. **Cite CDC as the
  source of the panel and the nomenclature** — slide 21 does.
- Galaxy workflow: 11 steps, 615 jobs for 153 specimens. Reproduction against
  the local run: junction precision 1.0000 / recall 0.9712; PART precision
  0.9150 / recall 0.9145; haplotype sheet byte-identical; distance matrices
  agree to 2.6 × 10⁻¹⁰ with 0 of 23,409 cells differing.
- Retention: CDC's rule keeps **67 of 153** on CDC's own calls; on the open
  pipeline's calls the same rule keeps **147 of 153** and **195 of 203**.
  PyEuk's own completeness filter drops 9, retaining 144.
- Junction coverage: called in **128 of 153** specimens against CDC's 103; **27
  specimens typed that CDC left blank**; among the 101 both call, 0 disagree.
- Determinism and speed: rerun on identical input the legacy ensemble differs in
  **66.8%** of matrix cells and is 24.1% asymmetric; PyEuk is byte-identical.
  1.56–1.73 s against 370–655 s (three runs each) — **230×–400×**, not ">300×".
- **The caveat on slide 14 is not optional.** On raw pairwise discrimination the
  legacy CDC metric wins: ROC AUC **0.9964** against **0.7692** on the same
  165-column sheet. And the benchmark is easy in a measurable way — single loci
  separate the vendors outright (`Nu_CDS1_PART_A`: 56/56 Vendor A carry `Hap_2`,
  0/35 Vendor B). PyEuk's gains are determinism, speed, label-free operation and
  retention. **Never claim it is more accurate.**

### Logan / archive search

- Logan v1.2 figures: 38M accessions, 87 Pbp raw, 8.5 Pbp unitigs, Dec 2025
  freeze. The **preprint describes v1** (27.3M, 50 Pbp) — do not mix the two
  sets, and do not call the preprint published.
- `kmindex_query` on usegalaxy.org: median 4 s single-index, 8.4 min all-index
  (a worst case — the wrapper queries indices sequentially in one job).
- **LexicMap is now on usegalaxy.org.** The ASV deck's note that it was
  usegalaxy.eu-only was true in July 2026 and is not any more — verified
  19 Aug 2026 against `usegalaxy.org/api/tools?q=lexicmap`, which returns
  `lexicmap_index/0.9.0+galaxy0` and `lexicmap_search/0.9.0+galaxy1`.
  `kmindex_build/0.6.1+galaxy0` and `kmindex_query/0.6.1+galaxy3` are there too.
  Both are also on usegalaxy.eu. Re-check the API before reusing this claim.
- The kmindex/LexicMap split on slide 17: `kmindex` returns the **fraction of
  k-mers shared** with each indexed sample — presence across raw runs, no
  coordinates. `LexicMap` **aligns**, returning matches with coordinates and
  identity, against assembled sequence, for queries longer than 150 bp. Upstream
  frames LexicMap around prokaryotic genome collections; the slide says
  "assembled sequence — Logan contigs, genome collections", which is the honest
  generalisation and matches how it is used here.
- The *Cyclospora* archive hits (28S rRNA in `SRR25011076`, Bangladesh cholera
  cohort; `ERR11474981` and `ERR11495252`, UK gastroenteritis metatranscriptomes)
  come from a task prompt, not a results document. The slide labels them
  preliminary and pairs them with the contrary result — NCBI STAT scanned 421
  stool metagenomes from ten endemic countries plus 200 wastewater metagenomes
  with a working positive control and found none. **Show both or neither.**

## Numbers deliberately not used

`cyclospora/presentation/index.html` (the Tools-for-Tomorrow webinar deck)
contains errors that were checked against the blog record and left out here:

- "Arm 3 … Cluster ARI 0.9975" — 0.9975 is an **AUC**; that row's ARI is 1.0000.
  Slide 14 carries the corrected 1.0000.
- "Arm 1 … ARI 0.9721, N=153" — Arm 1 as filed scored **0.0022** supervised;
  0.9721 is the label-free score at a later commit, over **144** specimens.
  Slide 14 shows 144 and labels the row "none — label-free".
- "Arm 4 … N=203, 100% retention, Unsupervised (0 Labels)" — it is **195 of 203**,
  and that grid row is the **supervised** path. Slide 14 states both correctly.
  The webinar's headline "Full Cohort Retention (203 vs 67)" is wrong for the
  same reason.
- "100% retention (153/153)" — PyEuk retains **144 of 153**.
- "27 blank *markers* recovered" — it is 27 **specimens**, at the junction only.
- "92.2% of isolates carry MOI ≥ 2" — unsupported; the real figure is 130 of 153
  carrying more than one haplotype **at `Nu_378_PART_D` specifically**.
- ">300× faster" — the measured range is 230×–400×.
- The "MOI paradox" framing of the legacy metric — `brc-blog-part2.md` refutes
  it explicitly. A mixed infection is rewarded by that arithmetic, not penalised.
- The Canadian ONT placement result (`Can-NML:CYC2020-001`, D = 0.0136 to
  `C_IL119_18`) has no analysis record anywhere in the repo. Webinar slides 28
  and 29 cover it; they were **not** ported, and should not be without one.

**If webinar slide 32 is ever ported in, these corrections apply.** That slide as
written contradicts the measured record in three of its four headline claims:

- "100% Patient Retention" / "no discarded cases" → **false**. PyEuk's own filter
  retains 144 of 153. Use the legacy rule's 56% attrition and the open pipeline's
  147 of 153 and 195 of 203, which agree with slide 13.
- "rescues uncalled markers with 100% precision" → it is 27 **specimens** at the
  **junction**, and panel-wide precision is 0.9150.
- "580,000 distances in 1.56 s (>300× faster than R)" → 580,503 pairs is CDC's
  1,078-specimen matrix, not this 153-specimen cohort (11,628 pairs), and the
  project's own plotting script refuses the ">300×" comparison as not
  like-for-like. Give the runtime range and **230×–400×**, without the pair count.
- "PyEuk v2.1.0" and "Python 3.11" appear nowhere in the blog record. PyEuk is
  pinned by commit, not by tag; name no Python version. `nekrut/brc-tools` and
  its `cyclospora-lofreq-pyeuk` branch are real, as are Apptainer, Numba, LoFreq
  and bwa.
- ARI 0.9737 at k = 2 **is** measured — the label-free score on the Galaxy
  workflow's own sheet. Attribute it that way, and never compare it to 0.9721,
  which is the same engine on CDC's sheet.

## Numbers used, but only as preliminary

Slides 18–20 came from the webinar deck, and the archive-mining figures on them
have **no measurement record in `nekrut/BRC-research`** — they trace to
`cyclospora/prompts/metagenomic_pyeuk_mining.md`, which is a task prompt
describing work to be done, not a results document. The three accessions
themselves (`SRR25011076`, `ERR11474981`, `ERR11495252`), their BioProjects and
read counts *are* corroborated; what is not corroborated is:

- **"2 in roughly 1,000" UK cohort prevalence** — no denominator or screen
  recorded anywhere.
- **4 reads at MAPQ 60 → 5 sub-locus calls**, the coordinates, E-values,
  MOI = 1, and the `Mt_MSR_PART_F_Hap_2` geographic split.

Both slides label this preliminary, and slide 19 carries the contrary result
from `SRA-DATA-ASSESSMENT.md` §6 — NCBI STAT scanned 421 stool metagenomes from
ten endemic countries plus 200 wastewater metagenomes with a working positive
control and found none. **Keep that caveat attached.** A "*Cyclospora* is hiding
everywhere" slide with the counter-evidence removed contradicts the project's
own assessment document, and it is the first thing a sceptical parasitologist
will ask about.

Also corrected while porting: the webinar deck calls LexicMap "alignment-free".
It is k-mer *indexed* but alignment-producing — slide 16 says "alignment-based",
which is right. And its closing line, "LexicMap proves that public sequence
archives already contain the missing links", was dropped; three accessions do
not prove that, and "proves" breaks the tone mandate.

## Published

- Deck: <https://nekrut.github.io/slides/icopa26/>
- Short link: `gxy.io/icopa26` — QR on the title and closing slides, and the URL
  on slide 2. **Live** — `galaxyproject/gxy.io` PR #135 merged on 19 Aug 2026
  and the redirect resolves to the GitHub Pages URL.
- `nekrutenko_icopa26.pptx` — image-only fallback for PowerPoint-only venues,
  21 slides at 5120×2880. Regenerate after *any* slide edit; it is a snapshot,
  not a build artifact that updates itself.

## Known limits

- **Slide 11 is a live widget**, inlined from `assets/orbit-demo.html`. It plays
  when its slide becomes active and replays on each visit, keyed off Marp's
  `bespoke-marp-active` class. In the PPTX and PNG exports it is a still frame.
  Reduced-motion is deliberately overridden — the animation *is* the content.
- Slide 11's embed is `h=485px`. At 470px the widget's status bar clips.

## Assets

- `assets/brc/`, `assets/galaxy/`, `assets/hanta/`, `images/` — copied wholesale
  from `../asv2026/`. `assets/hanta/` and several `images/` workflow cards are
  now **unreferenced**; they are kept so the hantavirus example can be restored
  without re-fetching.
- `assets/cyc/` — eight figures pulled from
  `nekrut/BRC-research:cyclospora/presentation/assets/`. Only
  `genome_quality.png` (slide 10) and `galaxy_workflow_canvas.png` (slide 13) are
  used. `galaxy_workflow.png`, `distance_auc.png`, `pipeline_compare.png`,
  `four_arm_design.png`, `expected_truth.png` and `version_trajectory.png` are
  unreferenced — `galaxy_workflow.png` was the reproduction-table slide's
  diagram, so keep it if that material may return.
- `assets/qr/icopa26.svg` — `npx qrcode -t svg -o icopa26.svg https://gxy.io/icopa26`.
  `assets/qr/testers.svg` points at the signup form. The ASV and kmindex QRs
  were deleted. Verify a regenerated QR by decoding it out of the rendered PNG,
  not by trusting the generator.

## Links

Every URL, product name, tool name and accession in the slide text is a link.
All were checked with `curl` on 19 Aug 2026; only `bv-brc.org` (403) and
`niaid.nih.gov` (405) refuse scripted requests — both are fine in a browser.

- Orbit → <https://galaxyproject.github.io/loom/>
- Logan → <https://github.com/IndexThePlanet/Logan>
- **On slide 17, every `kmindex` and `LexicMap` reference opens the tool on
  usegalaxy.org**, not upstream documentation — the inline names go to
  `kmindex_query` and `lexicmap_search`, and the tool IDs under each card go to
  their own forms. That slide is about running them, so the links must land on
  something runnable. The kmindex documentation link is no longer used anywhere.
- Slide 18 keeps `LexicMap` → <https://bioinf.shenwei.me/LexicMap/>, because
  there it names the indexing method rather than the Galaxy tool.
- Galaxy tool IDs link to `usegalaxy.org/?tool_id=<id>`; the four IDs are the
  ones the API returns, so re-check them when versions move.
- Accessions and BioProjects all use `ebi.ac.uk/ena/browser/view/<acc>`. NCBI's
  own BioProject pages return 500 to scripted requests, and ENA resolves both
  `PRJNA*` and `PRJEB*`, so ENA is used for every accession for consistency.

**Card `title=`, `subtitle=` and `tag=` are attributes, not markdown** — links
and italics inside them render as literal text. Anything that must be clickable
belongs in the card body. Slide 19's tags were changed from accessions to data
types for exactly this reason, once the accessions became links in the body.

## Language: Simplified Technical English

All slide text follows Simplified Technical English. Keep it that way when you
edit. The rules that actually bite on this deck:

- **No idioms, metaphors or colloquialisms.** Things that were removed: "ships"
  (→ provides), "fan out into", "turns up" (→ finds), "the join nobody had
  made", "the largest dataset on Earth", "junction rescue" (→ junction
  coverage), "what hosting it buys" (→ what it provides), "results pipe onward"
  (→ results go to other tools), "end to end", "bring your own", "goes looking",
  "one last thing", "a 15 min impossible challenge", "teaser".
- **Active voice.** "We give you API keys", not "You will be given API keys".
- **Short sentences, one idea each.** Semicolon-joined clauses were split.
- **One word, one meaning.** "Select" throughout, not select/pick/choose.
- **Phrasal verbs replaced** by single verbs where one exists: cut → reduce,
  inspect → examine, iterate → repeat.
- **No hyperbole.** Claims stay exactly as strong as the data supports.

Numbers, accessions, tool names and claims were not changed by the language
pass — only the wording around them.

Tone: objective about the biology, assertive about the tooling.
