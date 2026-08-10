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

Three collisions the deck is built to defuse — check any edit against these:

- **64% must never appear as a bare headline figure.** It is the *wrong*
  reciprocal-link rate on the near-miss slide (true value 2.3%) *and* the
  GEO-routed share on the reach slide. Both are as briefed, so neither is
  removed — instead the near-miss card is titled by the quantity ("A link-back
  rate that was really 2.3%"), the reach slide leads with the count (422,514)
  and carries 64% only as its note, and the takeaways slide no longer repeats
  either percentage. Do not promote 64% back to a headline.
- **Never state a complement as if it were measured.** The takeaways slide says
  "~56% of pairs decided. The rest went undecided…" rather than naming a 44%.
  (The "other 36%" on the caveats slide is fine: it is the labelled remainder of
  a stated total, not a second measurement.)
- **2.3% vs 88% look contradictory and are not.** 2.3% is how often *BioProject*
  records name a paper; 88% is how often *GEO series* records do. The Signal A
  slide carries a note saying so explicitly — keep it, or the deck appears to
  contradict its own near-miss slide four slides later.

Small-sample honesty: 7 of 7 and 8 of 8 each carry a dim "promising, not
conclusive" caption at the point of claim, in addition to the caveats slide.
Do not drop the captions and rely on the caveats slide alone.

## Tone

Scientific audience, working biologists and bioinformaticians who do not know
the project. Every acronym is expanded on first use. No claim appears on a
slide that the measurements do not support — where the evidence is thin (7 of 7,
8 of 8), the slide says so rather than the speaker.

## Component added for this deck

`bars` (a single-series horizontal bar chart) was added to deckkit —
`lib/fences.mjs` plus `.bars` styling in `themes/deckkit.css` — for the
author-overlap histogram. It is generic; any deck can use it.
