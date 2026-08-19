# Deck: ICOPA XVI (16th International Congress of Parasitology)

15-minute talk, 16 slides. Montréal, 16–21 Aug 2026. Source: `slides.md`
(deckkit — see `../CLAUDE.md` and `../deckkit/README.md`).

```bash
../deckkit/bin/deck build slides.md   # HTML — the deck you present
../deckkit/bin/deck png   slides.md   # per-slide PNGs, for checking layout
../deckkit/bin/deck pptx  slides.md --image-scale 4 -o nekrutenko_icopa26.pptx
```

Always run `build` as well as `png` after an edit — checking a PNG while
`slides.html` is stale has caused confusion before.

## Provenance

Adapted from `../asv2026/slides.md` (American Society for Virology, July 2026).
What changed, and why:

- **Retitled** to the registered program title, "BRC-Analytics: Combining
  agentic AI with open infrastructure for pathogen genomics". "From reads to
  outbreak clusters" survives as the subtitle. Note the tension this creates:
  the title makes agentic AI a co-headliner while the deck spends one slide of
  sixteen on it (see the trim below). Restore a slide there if the title is
  what the room came for.
- **Slide 4 is new** — the catalogue's taxonomic breakdown. An ASV audience did
  not need to be told BRC-Analytics covers their organisms; a parasitology
  audience does, and the honest answer is that 449 of 1,975 taxa are parasitic
  protists, helminths or arthropod vectors.
- **Slide 6 replaced** the four virology workflow cards with the eukaryote-
  applicable workflows actually in the BRC catalogue.
- **Slides 9–12 replaced** the Andes hantavirus selection example with
  *Cyclospora cayetanensis* outbreak surveillance.
- **The agentic section shrank from three slides to one** (slide 13). The ASV
  deck spent a divider, a poll slide and the Orbit demo on it; here the
  assertion rides in the lead line of the Orbit slide. The slide-3/slide-10
  pillars callback is therefore gone — do not go looking for it.
- **Logan and LexicMap merged** into one closer (slide 15).

## Argument

Four moves, same shape as ASV but with the parasitology example load-bearing:

1. **BRC-Analytics is the front door**, and it is mostly eukaryotic — slides 3–5.
2. **Its real function is handing you to Galaxy** — slides 5–8.
3. **A worked example that a parasitologist can check** — slides 9–12. The
   *Cyclospora* arc is: the public data is one assay; a labelled outbreak
   benchmark was sitting unused inside it; here is the panel as a Galaxy
   workflow, and here is honestly what that does and does not buy you.
4. **The agentic turn and the searchable archive** — slides 13–15.

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
  ungrouped or incidental. Slide 4's footnote says "also in the catalogue" and
  not "the rest" precisely because those 41 are unlisted.

Re-derive rather than trusting these if the deck is reused; the catalogue moves.

### Galaxy

750k jobs/month, 400k+ users, $2M+ free compute/year, 22k+ citations, 10,000+
tools. Unchanged from the ASV deck.

Slide 6's workflows are the eukaryote-applicable entries in the BRC catalogue
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
  **Say that last part out loud.** Slide 9 carries only the four figures and the
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
  source of the panel and the nomenclature** — slide 16 does.
- Galaxy workflow: 11 steps, 615 jobs for 153 specimens. Reproduction against
  the local run: junction precision 1.0000 / recall 0.9712; PART precision
  0.9150 / recall 0.9145; haplotype sheet byte-identical; distance matrices
  agree to 2.6 × 10⁻¹⁰ with 0 of 23,409 cells differing.
- Retention: CDC's rule keeps **67 of 153** on CDC's own calls; on the open
  pipeline's calls the same rule keeps **147 of 153** and **195 of 203**.
  PyEuk's own completeness filter drops 9, retaining 144.
- Junction rescue: called in **128 of 153** specimens against CDC's 103; **27
  specimens typed that CDC left blank**; among the 101 both call, 0 disagree.
- Determinism and speed: rerun on identical input the legacy ensemble differs in
  **66.8%** of matrix cells and is 24.1% asymmetric; PyEuk is byte-identical.
  1.56–1.73 s against 370–655 s (three runs each) — **230×–400×**, not ">300×".
- **The caveat on slide 12 is not optional.** On raw pairwise discrimination the
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
- **LexicMap is on usegalaxy.eu only, not usegalaxy.org.** Slide 15 names the
  server; keep it that way.
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
- "Arm 1 … ARI 0.9721, N=153" — Arm 1 as filed scored **0.0022** supervised;
  0.9721 is the label-free score at a later commit, over **144** specimens.
- "100% retention (153/153)" — PyEuk retains **144 of 153**.
- "27 blank *markers* recovered" — it is 27 **specimens**, at the junction only.
- "92.2% of isolates carry MOI ≥ 2" — unsupported; the real figure is 130 of 153
  carrying more than one haplotype **at `Nu_378_PART_D` specifically**.
- ">300× faster" — the measured range is 230×–400×.
- The "MOI paradox" framing of the legacy metric — `brc-blog-part2.md` refutes
  it explicitly. A mixed infection is rewarded by that arithmetic, not penalised.
- The Canadian ONT placement result (`Can-NML:CYC2020-001`, D = 0.0136 to
  `C_IL119_18`) has no analysis record anywhere in the repo. Left off entirely.

## Published

- Deck: <https://nekrut.github.io/slides/icopa26/>
- Short link: `gxy.io/icopa26` — QR on the title and closing slides.
  **The redirect does not exist yet.** Until someone adds it to
  `galaxyproject/gxy.io`, the QR falls through to gxy.io's default. If there is
  no time, repoint the QR at the GitHub Pages URL instead.
- `nekrutenko_icopa26.pptx` — image-only fallback for PowerPoint-only venues,
  16 slides at 5120×2880. Regenerate after *any* slide edit; it is a snapshot,
  not a build artifact that updates itself.

## Known limits

- **Slide 13 is a live widget**, inlined from `assets/orbit-demo.html`. It plays
  when its slide becomes active and replays on each visit, keyed off Marp's
  `bespoke-marp-active` class. In the PPTX and PNG exports it is a still frame.
  Reduced-motion is deliberately overridden — the animation *is* the content.
- Slide 13's embed is `h=485px`. At 470px the widget's status bar clips.

## Assets

- `assets/brc/`, `assets/galaxy/`, `assets/hanta/`, `images/` — copied wholesale
  from `../asv2026/`. `assets/hanta/` and several `images/` workflow cards are
  now **unreferenced**; they are kept so the hantavirus example can be restored
  without re-fetching.
- `assets/cyc/` — eight figures pulled from
  `nekrut/BRC-research:cyclospora/presentation/assets/`. Only
  `genome_quality.png` and `galaxy_workflow.png` are used; `distance_auc.png`,
  `pipeline_compare.png`, `four_arm_design.png`, `expected_truth.png`,
  `version_trajectory.png` and `galaxy_workflow_canvas.png` are staged for a
  longer version of this talk.
- `assets/qr/icopa26.svg` — `npx qrcode -t svg -o icopa26.svg https://gxy.io/icopa26`.
  `assets/qr/testers.svg` carried over. The ASV and kmindex QRs were deleted.

Tone: objective about the biology, assertive about the tooling.
