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

Figures come from the analysis in the `metadata/paper-sra-linkage` repo (scan
outputs, validation and adjudication runs, hand-labelled samples). Numbers as
briefed — but see **Unresolved against the source data** below. A trace of all
14 figure groups back to the repo on 10 Aug 2026 confirmed most of them exactly
and found six the underlying data does not support as labelled. Those six are
still on the slides as briefed, because correcting them needs a decision from
the author, not a guess.

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

## Unresolved against the source data

Traced 10 Aug 2026 against `metadata/paper-sra-linkage`. Confirmed exact: the
mention and pair counts, the 99,538 / 267,661 / 291,747 split (live DB, not the
stale `data/status.json`), the ~56% derivation, 88%, the 21/1/1/1/9 histogram,
0.89, 422,514 / 155,741, 83,164 / 95,831 / median 1, and 140,768. Outstanding:

1. **"622,896 open-access papers · scanned end to end" is mislabelled.**
   622,896 is `counts.paper` — the Europe PMC *candidate-query* table, which the
   repo README calls a prefilter at ~25% precision. The scan itself covered
   millions of articles (`data/bulk_extract.log`, `data/finish.log`). So the
   number is right and the words around it are wrong, in both directions: it is
   not "papers scanned", and the slide lead "every open-access full text we
   could read" claims a completeness the candidate query does not have. Same
   number reappears on the takeaways slide.
2. **"36 of 40" does not follow from any count in the repo.** From
   `data/interview.json`: 36 is the number of items citing the dataset under
   *some other* accession form. Papers that never write the BioProject is
   **35 of 40**; and only **33 of 40** are GEO-routed at all, of which 33/33
   never write it. Numerator and denominator are both off. Bad number to leave
   on the slide about being fooled by bad numbers.
3. **4.6% fabrication is not reproducible from the artifacts.** Re-running
   `validate.audit_adjudications` over `data/adjudicated.json` prints **7.5%**
   (18 of 241). The 4.6% comes from a hand-split in commit `172ec63` calling 7
   of the 18 near-misses (11/241 = 4.56%); that split is recorded nowhere else.
4. **117 / 2 / 96% / ~32% reproduce only under an unstated filter** —
   `evidence_source == 'fulltext'` and excluding the 18 unverifiable-quote
   items. Unfiltered the same quantities are 161 / 3 / 97.9% / 33.2%. The
   filter should be stated if anyone asks how the sample was drawn.
5. **"this signal can reach" on the reach slide is doing real work.** 422,514
   and 155,741 are applicability, not resolution. What Signal A actually decides
   is 387,914 pairs (58.9%), rescuing 138,836 from ambiguous (commit `0d65421`,
   confirmed against the DB). Do not let "reach" drift into "decided".
6. **0.8% has no data artifact** — the unrelated-pair null lives only in commit
   `0d65421` and the `src/geo_pmid.py` docstring, not in
   `data/author_overlap.json`. Worth regenerating before the deck is reused.

Minor: "28–99%" truncates 99.6% (rounds to 100), so it understates — safe
direction, left alone. Note also that `data/status.json`, `data/supervise.log`
and `README.md` all carry superseded figures that contradict the deck while the
deck is right; `status.json` is the file a sceptic will open first.

## Collisions the deck is built to defuse

Check any edit against these:

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
