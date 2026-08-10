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
7. What the archive signal decides at full scale (and its 2.0% disagreement
   with the text classifier), caveats, current deliverable, next steps.

## Where the numbers come from

Figures come from the analysis in the `metadata/paper-sra-linkage` repo (scan
outputs, validation and adjudication runs, hand-labelled samples). A trace of
all 14 figure groups back to the repo on 10 Aug 2026 confirmed most of them
exactly and flagged six; all six were resolved by author ruling the same day and
the slides now reflect the rulings — see **Resolved against the source data**
below.

| Slide | Figure |
| --- | --- |
| The scan | 622,896 **candidate** papers (Europe PMC query, ~25% precision prefilter) · 1,717,129 mentions · 658,946 pairs |
| Attempt 1 result | 99,538 generated / 267,661 reused / 291,747 ambiguous (~56% decided) |
| Self-checks | fabrication 7.5% (18 of 241 verdicts); ~half of the 18 are near-misses |
| Attempt 1 validation | 117 committed, 2 contradicted, 96% precision on "generated", abstains on ~32% — over adjudications with full-text evidence *and* a verifying quote |
| Near-misses | reciprocal-link rate reported 64% vs actual 2.3%; accession trimming lands on a different real accession 28–99% of the time; all 33 GEO-routed papers of 40 never write the BioProject ID (36 of 40 counting every alias) |
| Signal A | 88% of GEO series carry a linked PMID; correct 7 of 7 where it fired |
| Signal B | correct 8 of 8; overlap-coefficient histogram over 33 sampled pairs (21 / 1 / 1 / 1 / 9); 0.8% of unrelated pairs reach the threshold; the one item Signal A could not decide scored 0.89 |
| What it decides | 387,914 pairs decided (59%), 138,836 rescued from ambiguous (67,715 newly generated), 2.0% disagreement with the text classifier (5,077 of 249,078), deliverable 83,164 → 138,192 papers (+66%), 123,121 of 140,368 series with a linked publication, 422,514 GEO-reachable (64%) |
| Deliverable | 83,164 papers · 95,831 datasets · median 1 dataset per paper (pre-merge) |
| Next | 140,768 GEO series; run-record richness gave median attribute entropy 0.0, median 1 sample group |

## Resolved against the source data

Traced 10 Aug 2026 against `metadata/paper-sra-linkage`; six issues were raised
and all six were ruled on by the author and applied to the slides the same day.
Confirmed exact and untouched: the mention and pair counts, the 99,538 /
267,661 / 291,747 split (live DB, **not** `data/status.json` — see the warning
below), the ~56% derivation, 88%, the 21/1/1/1/9 histogram, 0.89, 83,164 /
95,831 / median 1, and 140,768.

1. **622,896 is a candidate count, not a census.** It is `counts.paper` — the
   Europe PMC *candidate-query* table, a prefilter at roughly 25% precision.
   Ruled: label it "candidate papers", say the query is open-access articles
   mentioning an accession, drop "scanned end to end" and any completeness
   claim. Applied on the scan slide (which now carries an explicit prefilter
   caption) and on the takeaways slide. 1,717,129 and 658,946 are unaffected.
2. **"36 of 40" was mis-attributed.** Authoritative counts for the 40-paper
   sample: 33 cite a GEO series, 3 cite another alias (ERP019477, SRR1653248,
   SRP061658), 4 cite the BioProject directly. So 36 of 40 never write the
   BioProject accession, but only 33 are GEO-routed. Ruled headline: **"all 33
   GEO-routed papers in the sample never write the BioProject accession"**, with
   "36 of 40 never write it" kept as the broader claim underneath. **Never say
   "36 of 40 cite a GEO series."**
3. **Fabrication is 7.5%, not 4.6%.** 7.5% (18 of 241 decided verdicts) is what
   `validate.audit_adjudications` reproduces over `data/adjudicated.json`; the
   4.6% was an unrecorded hand-split. Ruled: present 7.5% and add that
   inspection suggests roughly half of the 18 are near-misses (whitespace, minor
   edits, a quote spanning a paragraph boundary) rather than invention. 4.6% is
   gone from the deck.
4. **117 / 2 / 96% / ~32% are a filtered population** — adjudications that had
   real full-text evidence *and* a quote that verified. Ruled: keep the figures
   and state the population at the point of claim (the validation slide now
   does). The unfiltered equivalents 161 / 3 / 97.9% / 33.2% are the sanctioned
   substitute if the slide ever needs to shed a line.
5. **Reach became resolution.** The signal has been run over all 140,768 GEO
   series and loaded, so the applicability framing (422,514 / 155,741 "can
   reach") was replaced with measured outcomes: 123,121 of 140,368 series carry
   a linked publication (88% confirmed at full scale); 387,914 distinct pairs
   decided (59% of 658,946); 138,836 rescued from ambiguous, 67,715 of them
   newly "generated"; 2.0% disagreement with the text classifier where both
   committed (5,077 of 249,078); projected deliverable 83,164 → 138,192 papers
   (+66%). The 2.0% carries its own callout — two methods sharing no evidence,
   one reading prose and one reading archive metadata, neither tuned against the
   other, agreeing on 98% of pairs where both speak. It is the strongest
   validation in the deck. The caveat stays visible: 422,514 are GEO-reachable
   but only 387,914 decided, the gap being series with no linked publication.
   **Do not put "85%" anywhere** — an earlier pass produced it by counting
   (pair, series) rows instead of distinct pairs.
6. **The 0.8% null is now reproducible.** Artifact:
   `metadata/paper-sra-linkage/data/author_overlap_null.json` (seed 0, 1,818
   pairs) — null mean 0.0251, 0.77% at or above the 0.5 threshold; real mean
   0.2909, 30.3% at or above. Headline stays 0.8%.

Minor: "28–99%" truncates 99.6% (rounds to 100), so it understates — safe
direction, left alone.

### Warning: `data/status.json` is not a check on this deck

`metadata/paper-sra-linkage/data/status.json` is the file a sceptic will open
first, and it will mislead them. The relation split it belongs to —
**100,206 generated / 224,825 reused / 333,915 ambiguous** — is **superseded**;
the current split is **99,538 / 267,661 / 291,747** (live DB). That stale split
is printed in `data/supervise.log` and `data/supervise_run.log`, which sit
beside `status.json` and share its timestamp; `README.md` carries superseded
figures too. `status.json`'s own `counts` block (622,896 / 1,717,129 / 658,946)
does agree with the deck. Where the archived artifacts and the deck disagree,
the deck is right.

## Collisions the deck is built to defuse

Check any edit against these:

- **64% must never appear as a bare headline figure.** It is the *wrong*
  reciprocal-link rate on the near-miss slide (true value 2.3%) *and* the
  GEO-routed share on the reach slide. Both are as briefed, so neither is
  removed — instead the near-miss card is titled by the quantity ("A link-back
  rate that was really 2.3%"), the "What it actually decides" slide leads with
  387,914 and carries 422,514 / 64% only in its closing note, and the takeaways
  slide no longer repeats either percentage. Do not promote 64% back to a
  headline — and keep it stated somewhere on that slide, because the caveats
  slide's "other 36%" is the labelled remainder of it.
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
