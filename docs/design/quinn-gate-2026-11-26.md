# QA Gate — The Media Museum design sequence (four documents, as a set)

**Seat:** Quinn, quality assurance (specialist_quality_assurance). The gate and the verdict are this seat's, solely.
**Packet gated:** GOAL.md (locked decisions through "The Media Museum" and silent pool captions); Nadia's UX design (2026-11-25); Mina's UI design (2026-11-25); Elena's art direction (2026-11-26); Wren's copy (2026-11-26).
**Second rater:** Athene Coldread's cold ratings were locked 2026-11-26 23:13 PST, before any rating of mine existed, and are incorporated below finding by finding. Evaluator structure: two raters (Athene cold, Quinn gate) — not the field's three-rater mean; read all severities with the evaluator effect in mind.
**Scale:** Nielsen 0–4, shared with Athene — 0 not a problem; 1 cosmetic; 2 minor; 3 major (blocks a clean PASS; PASS WITH NOTES only on the lead's written acceptance); 4 catastrophe (fails the gate outright).
**Axes, kept separate per this seat's practice:** severity is stated per finding; evidence is labelled (directly observed in the documents / measured by my own count / inferred / maker-claimed); coverage is ledgered at the end; the verdict is below and nowhere else.

---

## VERDICT: PASS WITH NOTES — conditional

The design sequence **passes this gate with notes**, on one condition precedent: **Hue accepts the three severity-3 findings (F1, F2, F3) in writing in the gate record.** If that acceptance is not recorded, this verdict defaults to **FAIL** — not because the design is unbuildable, but because severity-3 findings may not ride silently, and done is binary.

What this verdict **does**: it closes the design sequence. The packet, corrected at the named points, is a sound basis for a catalog commission and, after that, a build brief.

What this verdict **does not do**:

- It does **not** authorize a build. A build still needs **Dustin's go**, separately given. Nothing in this document is that go.
- It does **not** discharge the build gate. When a build exists, it gets its own gate: the routing-contract test set (Nadia R1), the FE-1 keyline acceptance check (F10), rendered-viewport and 200%-text checks (Mina §7.2 names them as owed), and the real-browser usability pass this seat's playbook makes non-waivable for interactive work. None of that has run, because there is nothing to run it on.
- It does **not** rule on accessibility. AF-1/AF-2/AF-3 remain Ada's, precisely stated in §4 below.

**One item must go to Dustin** (via Hue): the 412 correction in §3. His ruling survives it; the number he was given does not.

---

## 1. F1 — the Listening Room list: SETTLED (Athene 3 → Quinn 3, adopted)

The contradiction is real, and it is inside Nadia's document, not inside Dustin's ruling. §3.4 block 3 specifies "one row per song" carrying a single voice label and a single duration — incoherent on its face, since each song has two versions with two durations. Her §6 Q2 recommendation specifies the opposite: the list "still shows all 38 rows for direct play, grouped under their song," with one exhibit per song and the version switch on the track view.

**The build follows the §6 Q2 reading**, for a record reason, not a preference: that is the text Hue put to Dustin when he ruled, and GOAL.md's Q2 entry ("one exhibit per song (19), with a sung/instrumental switch on the track view") is consistent with it. What Dustin approved already contains both halves — 19 song *exhibits*; 38 recording *rows* for direct play. This does **not** go back to Dustin as an ambiguity in his ruling; the ambiguity is between Nadia's §3.4 and her §6, and §3.4 loses.

**Fix (gates the build brief):** Nadia amends §3.4 block 3 to read as rows-per-recording grouped under their song (voice label and duration are per-recording; the queue is the currently visible list, as §3.4's queue behaviour already assumes). Mina §4.4 and Wren §4 already dress this reading; no other document changes. Owner: **Nadia**; Hue confirms the amendment against the ruling as presented.

## 2. F2 — the catalog pass: design may pass; a build may not start against air (Athene 3 → Quinn 3, adopted)

The design's job was to specify the catalog, and Nadia §4.3 does — field by field, with a hard rule (missing required field = piece excluded) whose consequence Athene states correctly: an under-delivered catalog does not degrade this museum, it empties it, wing by wing. What does not exist is the pass itself: no owner, no commission, no pilot, although Nadia R2 recommended a Park-wing pilot "in parallel with Mina's UI work" and that window has closed.

**Judgment:** the *design* passes the gate with this uncommissioned — specifying was its job, and the specification is gate-ready once amended (§5). The *build* may not start until "ready to build against" exists, concretely:

1. A **commissioned catalog pass with a named owner** (the catalog/data seat), briefed against Nadia §4.3 **as amended by this gate** (F7's crop-focus field, F12's track caption scope, F3's exhibit definition, F9's full watch-list, F22's Season blooms home, Q1's round-2 inventory).
2. The **Park-wing pilot catalog delivered and validated** against that spec — every required field populated for every Park exhibit, every `mediaKey` verified returning 200 (Elena §9a). The pilot is the pipeline proof Nadia herself sequenced; the build builds against pilot data.
3. The **full catalog is a launch condition, not a build-start condition**: before launch, the delivered catalog must state its exhibit count per wing, and any shortfall against the in-scope set must be an explicit, Hue-accepted reduction — never a silent thinning produced by the hard rule.

Owner: **Hue** (commission), **catalog/data seat** (deliverable). Gates build start: **yes**, in the form above.

## 3. F3 + F14 — the 412 count: VERIFIED against the inventory; the number is wrong (Athene F3 2 → Quinn 3, re-rated; F14 2 → Quinn 2, adopted)

I did not take either document's number on faith. Evidence: the migration record itself — `media-migration/upload.log` (599 keys, round 1), `upload-round2.py` (75 keys, round 2), `filename-map.md`. Directly counted by me:

- `hues/cultivar-photos/` holds **412 keys = 206 original files + 206 `opt/` optimised copies of the same 206 varieties**. The stem match is perfect 1:1 — every non-`opt/` stem appears exactly once under `opt/`, and vice versa; zero orphans either way. **Elena's "206 varieties" is verified correct against the primary source.** Nadia's 412 counts *files*, and exactly half of them are re-encodings of the other half.
- The round-2 park set adds **35 park-photographed varieties** under `hues/dahlias/`. Of those, 22 names also appear in the pool (including Thomas Edison, spelled `thomas-a-edison` in the pool), and Break Out appears as `breakout`. Netting spelling variants, **12 varieties are park-only**. (The 6 filename-map close-ups are the same source images as 6 of the round-2 files — no new exhibits.)
- Therefore the Dahlias wing's honest exhibit count, under the packet's own rules (one exhibit per variety; Elena's dedupe — one image = one exhibit), is **206 pool varieties, 218 distinct varieties in total**. Under a per-photograph model it would be 241 photographs (206 pool + 35 park). **Under no model consistent with the packet is it 412.** The exact final integer is the catalog pass's to confirm variety by variety; the range is not in doubt, and 412 is disproven as an exhibit count.

**Does Dustin's Q1 ruling survive? Yes, in substance; no, in its stated number — and he must be told.** The ruling was about exclusion: all hang, curation effort goes to the featured band. That stands untouched — all 218 hang, nothing is excluded by this correction. What was wrong is the integer in the question he was asked ("all 412 cultivar photos hang") and the rationale under it: Nadia §6 Q1's "real photos of real Hues varieties" presents game-pool imagery as the park's own photography (F14 — Elena's evidence, verified in structure by the inventory: the pool family and the 35-variety park family are different sets). Dustin has since kept two pool photos in the band *knowingly*, which shows the decision survives honest framing — but he approved the flagship wing's scale on a count that was a file count, exactly 2× the variety truth. A locked decision whose premise number is wrong goes back to the decider as a correction, at his convenience, not as a re-decision request. Owner: **Hue** (tell Dustin; correct GOAL.md's Q1 entry and inventory line), **Nadia** (annotate §2.1/§3.3/§6). Gates: the correction **gates any build brief or catalog brief that quotes a count**; it does not gate the design. Visitor-facing harm is contained *only if* the catalog counts exhibits — Wren's and Mina's count lines are data-driven, so they self-correct from a correct catalog and faithfully reproduce a wrong one.

I rate F3 one point above Athene (2 → 3): the number is not a label on the flagship wing, it is the premise of a locked ruling and sits in GOAL.md as fact; frequency is every Dahlias count line and the decision record itself; impact is trust in the record, which this team has been burned by before. This is a one-point re-rate, recorded as such — not a ≥2 disagreement.

## 4. FE-1 / F10, and Ada's AF-1/AF-2/AF-3

**FE-1 is confirmed and stands.** Elena's ruling, with Iris's playbook applied, is well-founded in both playbooks' medium-specific wording, and her scope limits (photographs only, this stage only, paintings untouched) are part of the ruling. **F10 (Athene 2 → Quinn 2, adopted)** is the live risk, and the wording collision is settled as follows: Mina §4.8 calls the keyline "a frame line, not a boundary carrying meaning" — written before FE-1 existed, that sentence is about *meaning* (the keyline carries no state or identity semantics); Elena's condition is about *separation* (padding + the gold-2 keyline, 4.79:1 on deep-2, are what keep a photograph's own green edge from meeting the stage — the visual fact her interpretation rests on). Both sentences can be true; a builder reading only Mina's could still honestly drop the keyline as decoration and void the ruling. **Settlement:** keyline + stage padding are build-mandatory; FE-1's condition enters the build gate as an acceptance check on the stage component ("keyline and padding present as specced, or FE-1 reopens"); Mina's sentence gets a cross-referencing annotation. Owner: **Hue** (build-gate criterion), **Mina** (annotation). Gates the stage component's build sign-off, not the design.

**Ada must ratify, precisely:**

- **AF-1** — the poppy pair set *on the evening ground*: white glyph on poppy (4.01:1) and poppy dot on deep-2 (3.73:1). Both pass the 3:1 non-text floor as measured by Mina, with glyph shape and text labels carrying the meaning redundantly. The open item is ratification of an inherited player dress on a new ground — not a measured failure.
- **AF-2** — that the three-row phone wing-strip wrap at 320–359px satisfies the floor. The substance is Dustin's ruling (full names, three rows); no semantics change is proposed (labelled nav list, `aria-current`, non-sticky strip). Ada's confirmation closes it.
- **AF-3** — the wing-marker construction: dahlia-pink (2.48:1) and marigold (1.63:1) fills cannot reach 3:1 against paper alone and are carried by the `deep` ring boundary (11.38:1) + adjacent text label + fixed position. If Ada rules the fill itself essential, Mina's fallback is already designed and measured (solid `deep` silhouettes, accent retired from those two markers).

**Gating:** AF-1/AF-2/AF-3 gate **the design's final sign-off on those components and their build** (WingMarker, MuseumPlayer, phone strip respectively). They do not gate the rest of the build, and AF-3 cannot stall the program — its fallback is pre-designed. They are accessibility rulings; neither Athene nor I rate their merits, and nothing in this verdict waives or pre-empts them. Owner: **Ada**; Hue requests the rulings with the catalog commission so they land before the affected components are built.

## 5. Consolidated findings table

Athene's 29 findings, each adopted, re-rated, or cleared on my own reading of the packet, plus two findings of my own (Q1, Q2). "Gates" = what the fix blocks if unlanded.

| ID | Finding (short title) | Athene | Quinn | Disposition | Owner | Gates |
|---|---|---|---|---|---|---|
| F1 | Listening Room list specified two incompatible ways (19 rows vs 38 rows) | 3 | **3** | Adopted; settled in §1 — 38 recording rows grouped by song; 19 exhibits | Nadia (amend §3.4) | Build brief |
| F2 | Catalog pass uncommissioned; hard rule turns shortfall into missing exhibits | 3 | **3** | Adopted; readiness defined in §2 | Hue / catalog seat | Build start |
| F3 | 412 exhibits vs 206 varieties + dedupe | 2 | **3** | **Re-rated +1**; arithmetic verified in §3 — honest count ≈218 varieties | Hue (record + tell Dustin); Nadia (annotate) | Any brief quoting a count |
| F4 | Nadia's UX framed for public strangers; locked audience is the team | 2 | 2 | Adopted | Nadia/Hue (annotate) | Rides along |
| F5 | "38 songs" placeholder survives in Nadia §3.1 | 2 | 2 | Adopted; strike at annotation pass (Wren's flag) | Nadia/Hue | Rides along |
| F6 | Wren asserts perfect pairing unconditionally (scent, About body — and the Listening Room intro line, same defect) while pairing is unverified | 2 | 2 | Adopted | Catalog pass (verify pairing); Wren (revise lines if any unmatched) | Launch (copy truth) |
| F7 | Crop-focus rule has no field and no component anchor | 2 | 2 | Adopted; add `cropFocus` to §4.3 + anchor behaviour to Mina's `card` slot | Nadia + Mina | Catalog commission |
| F8 | Elena names two keys for the Park entry (§2 vs §5) | 2 | 2 | Adopted; settled on evidence — `filename-map.md` confirms `hues/home/hero-golden-hour.webp` as the app key; Elena's own dedupe rule prefers it; §5 annotated | Elena (annotate); catalog pass | Rides along |
| F9 | UNVERIFIED list shrinks: Elena flags 5 keys, Wren's G8 drops stage-detail | 2 | 2 | Adopted; catalog brief carries Elena's full 5-key list verbatim | Hue (catalog brief) | Catalog commission |
| F10 | FE-1's keyline condition vs Mina's "not a boundary" wording | 2 | 2 | Adopted; settled in §4 | Hue (build-gate criterion); Mina (annotate) | Stage component sign-off |
| F11 | AF-3 marker construction unratified | 2 | 2 | Adopted; Ada's ruling, §4 | Ada | WingMarker build |
| F12 | `captionShort` required for all exhibits; no source or pattern for 17 of 19 songs | 2 | 2 | Adopted; Wren writes a track pattern on her §6 model, or Nadia scopes the field for tracks | Wren (pattern) / Nadia (scope) | Catalog commission |
| F13 | Routing contract: one path class unassigned; "404 with shell" undeliverable for client-rendered slugs under shell-only | 2 | 2 | Adopted, both halves; contract needs its explicit terminal rule and an honest status spec (unknown app slugs = shell at 200 rendering the museum 404 view) | Nadia | Worker build |
| F14 | Nadia's Q1 rationale misdescribes provenance | 2 | 2 | Adopted; travels with F3 as one correction to Dustin and the record | Hue / Nadia | Record; rides along for build |
| F15 | AF-1 poppy pairs unratified | 1 | 1 | Adopted; Ada, §4 | Ada | MuseumPlayer sign-off |
| F16 | AF-2 three-row wrap confirmation owed | 1 | 1 | Adopted; Ada, §4 | Ada | Build-gate checklist |
| F17 | Nadia's two-row phone-nav statement stale vs decided three rows | 1 | 1 | Adopted; annotate | Nadia/Hue | Rides along |
| F18 | `aria-current` reserved for wing nav (Nadia) vs used for playing row (shipped TrackRow, via Mina) | 1 | 1 | Adopted; record which yields; Ada sample-checks at build gate | Mina/Ada | Rides along |
| F19 | Nadia's end-of-wing example ("85 pieces") conflates prefix count with wing count | 1 | 1 | Adopted; strike/annotate | Nadia/Hue | Rides along |
| F20 | Letter-jump vs 48-reveal interaction unspecified | 1 | **0** | **Cleared** — read as a set, the packet does specify it: letter selection filters in place (Nadia §2.4/§3.3), a jumped letter renders its full group (Mina §4.3 states), and Wren §3 supplies the count-line pattern for the letter state. Residual: if any letter group ever exceeds 48, Mina's full-group rule governs deterministically — no builder guess remains | — | — |
| F21 | `?sort=` promised in URL state; no sort control exists | 1 | 1 | Adopted; remove or mark reserved-unused | Nadia/Hue | Rides along |
| F22 | Season blooms set (12) has no assigned wing/home | 1 | 1 | Adopted; one assignment decision (recommend: named non-game group inside Arcade, where the files live and Elena grouped them) | Nadia / catalog pass | Catalog commission |
| F23 | About line "every piece is the original file" vs the transform ladder (walls show quality-80/85 derivatives; original is one tap away) | 1 | 1 | Adopted; one-line revision — intent is fair, literal accuracy is copy's job | Wren | Before build (entrance copy) |
| F24 | Nadia: image itself is a link to the original; Mina's piece view omits it | 1 | 1 | Adopted; record the reconciliation (recommend Mina's labelled-action-only stands; annotate Nadia) | Nadia/Hue | Rides along |
| F25 | Track prev/next walk default order, against the packet's own origin-list principle and §3.4's queue | 1 | 1 | Adopted; align track prev/next to the visitor's queue | Nadia | Track-view build |
| F26 | Download-button decision "raised for Dustin" appears in no decision record | 1 | 1 | Adopted; complete the record or strike the claim (outcome — no button — is consistent everywhere) | Hue | Rides along |
| F27 | GOAL.md "Current state" line stale against its own Copy section | 1 | 1 | Adopted; confirmed in the file as read | Hue | Rides along |
| F28 | Procession as both Art entry and highlights slot 1 | 0 | 0 | Adopted as cleared — stated exception with reasoning on record | — | — |
| F29 | Sam Hopkins as both band #14 and highlights slot 2 | 0 | 0 | Adopted as cleared — deliberate, acknowledged in copy | — | — |
| **Q1** | **(Quinn's)** GOAL.md's inventory and Nadia's wing sources are one migration round stale: round 2's 75 keys (`hues/dahlias/` 35 park photos, `hues/seasons/`, the park photo) appear in neither — upload.log contains zero of them. Elena built on round-2 keys the packet never reconciled. A catalog briefed from GOAL.md's inventory misses 75 keys | — | **2** | Added | Hue (reconcile inventory in catalog brief) | Catalog commission |
| **Q2** | **(Quinn's)** Visitors at Dusk — a portrait photograph, highlights slot 3 and the Park wing's photographic lead — meets Mina's ExhibitCard photo treatment (fixed 4/3, fit cover) against Elena's instruction "do not force it into a landscape crop." The piece view is whole-frame, so the harm is card-level; F7's crop-focus fix mitigates but the ratio instruction and the card spec still collide for this piece | — | **1** | Added | Elena/Mina (reconcile: portrait-ratio card variant for this piece, or recorded acceptance of the anchored crop) | Rides along (depends on F7) |

**Disagreements with Athene ≥ 2 points: none.** Two one-point re-rates, both recorded with reasoning: F3 up (2 → 3, §3) and F20 down (1 → 0, cleared on the packet read as a set). On every other finding my severity is hers, reached independently — including both severity-3s, which I sustain on the documents, not on her say-so. Where I hold a different rating I have said which and why, per protocol; nothing was averaged.

**Counts:** Athene findings 29 — adopted at her severity 27 (including F28/F29 adopted as cleared), re-rated 2 (F3, F20), cleared by me 1 (F20). Added by me: 2 (Q1, Q2). Consolidated total: 31 findings. Severity distribution (my ratings): sev 3 — 3 (F1, F2, F3); sev 2 — 12 (F4–F14 less F3, plus Q1); sev 1 — 13 (F15–F19, F21–F27, Q2); sev 0 — 3 (F20, F28, F29). No severity 4s: the catastrophic direction for this project — media-serving regression — is genuinely well covered by Nadia's R-1/R-2/R-3, and every sev-3 here is resolvable by correction or commissioning, not redesign. The packet's disease is specification completeness and one wrong premise number, not danger — a chronic, process-level pattern (documents written in sequence, each assuming the next would reconcile it), which is why so many fixes are reconciliations rather than repairs.

## 6. Pre-build conditions (exact — all must hold before a build is dispatched)

1. Hue's written acceptance of F1, F2, F3 recorded against this gate (else the verdict defaults to FAIL).
2. F1 landed: Nadia's §3.4 amendment in the document.
3. Catalog pass commissioned with a named owner, briefed against §4.3 as amended by F7, F12, F3 (exhibit definition + dedupe incl. the `opt/` family), F9, F22, Q1.
4. Park-wing pilot catalog delivered and validated (required fields complete; every canonical key verified 200).
5. Dustin told the 412 correction; GOAL.md's Q1 entry and inventory corrected. No build or catalog brief may quote 412 as an exhibit count.
6. Ada's AF-1/AF-2/AF-3 rulings requested; AF-3 lands before WingMarker is built, AF-1 before MuseumPlayer sign-off, AF-2 closes on the build-gate checklist.
7. The one-pass packet annotation sweep landed: F4, F5, F8, F14, F17, F19, F21, F24, F26, F27 (one editing pass by Hue/Nadia — no redesign is authorised or needed under this item).
8. F13 landed: the routing contract completed (terminal rule for unassigned app-shaped paths; honest 404-status specification) before the Worker change is built.
9. F23 landed: Wren's one-line About revision, before the entrance is built.

Everything not listed here or in the table's "Gates" column rides along and is tracked to fix or explicit acceptance; none of it may be silently dropped.

## 7. Coverage ledger and what I did NOT check

**Population:** four design documents + GOAL.md + Athene's locked rating, as a set. **Checked:** every section of all four documents against GOAL.md and against each other; all 29 of Athene's findings re-derived from the cited sections before rating; the inventory arithmetic (F3/F14/Q1) verified by my own counts over the migration record (upload.log, upload-round2.py, filename-map.md, upload-music.log) — the one place this gate went to primary sources beyond the packet. **Evaluator structure:** single gate evaluator plus one locked cold second rater; agreement and splits reported in §5.

**What I did NOT check — named, not rounded up:**

- **No rendered surface exists.** No browser pass, no usability session, no viewport measurement, no 200%-text or forced-colours check. The human-interaction gate step is **owed in full** at build gate; this verdict says nothing about whether a person can use the built museum, only that the design documents specify a usable one.
- **No catalog data exists.** No record was sampled; field completeness, pairing truth (F6), durations, and canonical-key 200s are all unverified — they are the catalog pass's deliverables and the pilot's proof.
- **The bucket itself was not listed.** My counts rest on the migration record (logs + scripts dated 2026-11-24/25). Anything uploaded to or deleted from `hues-media` after those logs would not appear; the catalog pass's key verification closes this gap.
- **Contrast ratios were not re-measured.** Mina's pair table is taken as her computed/token evidence, labelled as such; Ada's ratifications (AF-1–AF-3) and any build-gate sampling remain hers.
- **Artwork was not viewed by me.** Elena's viewing is her evidence and is labelled with her UNVERIFIED discipline; I checked that her claims are internally consistent and inventory-consistent, not that the pictures are what she says.
- **Ada's floor was not re-ruled**, and FE-1 was reviewed as an interpretation against the two playbooks' texts, not re-decided — it is Elena and Iris's ruling; this gate checks that it was made by the right seats on stated reasoning, and it was.

**Residual risk:** the class of defect this coverage cannot see is build-time behaviour — routing under real requests, playback under real files, rendering at real sizes. That is not a caveat on this verdict; it is the reason the build gate exists and why this verdict authorises nothing on its own.
