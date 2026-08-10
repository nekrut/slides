# Deck: paper ↔ SRA linkage (lab meeting, 10 August 2026)

Source of truth: `slides.md` (deckkit format — see `../CLAUDE.md` and
`../deckkit/README.md`).

Build: `../deckkit/bin/deck build slides.md` (add `png` to check layout).

20 slides. No external assets — every visual is a deckkit component, so the
built `slides.html` is self-contained.

## What the deck covers

The arc, in order:

1. The deliverable — a two-column table pairing a paper with the sequencing
   data *that paper produced*.
2. Vocabulary for an audience that does not know the archives: SRA, ENA,
   BioProject, GEO, PMID.
3. The downstream motivation — hide a dataset's metadata and ask a model to
   reconstruct it from the paper; that needs ground truth first.
4. The central difficulty — a paper *mentioning* an accession is not a paper
   *producing* it. Generated vs. reused.
5. Attempt 1: five text signals, the 56%-decided result, the validation, and
   the three near-misses (bad sample, fabricating "fix", hidden BioProject).
6. The pivot: two metadata signals that never read the paper — GEO's linked
   PMID, and paper-author / dataset-submitter surname overlap.
7. Reach, caveats, current deliverable, next steps.

## Where the numbers come from

Every figure on a slide is measured, from the analysis in the
`metadata/paper-sra-linkage` repo (scan outputs, validation and adjudication
runs, hand-labelled samples). Nothing on a slide is estimated, rounded
differently from the source, or inferred. Numbers as briefed:

| Slide | Figure |
| --- | --- |
| The scan | 622,896 papers · 1,717,129 mentions · 658,946 pairs |
| Attempt 1 result | 99,538 generated / 267,661 reused / 291,747 ambiguous (~56% decided) |
| Self-checks | measured genuine fabrication 4.6% |
| Attempt 1 validation | 117 committed, 2 contradicted, 96% precision on "generated", abstains on ~32% of pairs the text settles |
| Near-misses | reciprocal-link rate reported 64% vs actual 2.3%; accession trimming lands on a different real accession 28–99% of the time; 36 of 40 GEO-routed papers never write the BioProject ID |
| Signal A | 88% of GEO series carry a linked PMID; correct 7 of 7 where it fired |
| Signal B | correct 8 of 8; overlap-coefficient histogram over 33 sampled pairs (21 / 1 / 1 / 1 / 9); 0.8% of unrelated pairs reach the threshold; the one item Signal A could not decide scored 0.89 |
| Reach | 64% of pairs = 422,514, including 155,741 currently ambiguous |
| Deliverable | 83,164 papers · 95,831 datasets · median 1 dataset per paper |
| Next | 140,768 GEO series; run-record richness gave median attribute entropy 0.0, median 1 sample group |

Two coincidences worth knowing before someone spots them from the floor:

- **64% appears twice with different meanings.** On the near-miss slide it is
  the *wrong* reciprocal-link rate (true value 2.3%); on the reach slide it is
  the share of pairs that are GEO-routed (422,514). Both are as briefed.
- **The "44%" on the takeaways slide** is the complement of the ~56% decided
  rate, not an independent measurement.

## Tone

Scientific audience, working biologists and bioinformaticians who do not know
the project. Every acronym is expanded on first use. No claim appears on a
slide that the measurements do not support — where the evidence is thin (7 of 7,
8 of 8), the slide says so rather than the speaker.

## Component added for this deck

`bars` (a single-series horizontal bar chart) was added to deckkit —
`lib/fences.mjs` plus `.bars` styling in `themes/deckkit.css` — for the
author-overlap histogram. It is generic; any deck can use it.
