# Accessibility Rulings — The Media Museum (AF-1 / AF-2 / AF-3)

**Seat:** Ada, accessibility (specialist_accessibility) — owner of the WCAG 2.2 AA floor.
**Commission:** Quinn's QA gate on the Media Museum design sequence (quinn-gate-2026-11-26.md §4) left three items for this seat's ratification. These are rulings against the floor, not redesigns. Where a fix is required, it is the nearest passing value of the same colour, never a different colour.
**Evidence discipline:** every ratio below was recomputed by this seat from the primary token hexes using the WCAG relative-luminance formula — not taken from Mina's table on trust. Mina's computed values reproduced exactly in every case checked (table in §4). Unrounded values are recorded; nothing is rounded into a pass.

---

## The three rulings, up front

| Flag | Item | Ruling |
|---|---|---|
| **AF-1** | Poppy pairs on the evening ground (MuseumPlayer) | **RATIFIED, with one condition** (paused-state dot — condition A1 below, a build-gate check) |
| **AF-2** | Three-row phone wing strip at 320–359px | **RATIFIED** (with build-gate checks A2, which are verifications of the spec as written, not changes to it) |
| **AF-3** | Wing-marker construction (sub-3:1 fills inside a passing ring, label-carried identity) | **RATIFIED as designed** — the fill is not essential to identification; Mina's deep-silhouette fallback does **not** take effect (conditions A3 guard the construction the ruling rests on) |

No floor failure was found in any of the three items as specced. Nothing in these rulings waives the build gate: the built components get sampled against the conditions below before sign-off, per Quinn §4's gating (AF-3 before WingMarker is built, AF-1 before MuseumPlayer sign-off, AF-2 on the build-gate checklist).

---

## AF-1 — Poppy pairs on the evening ground: RATIFIED, with condition A1

**The pairs, recomputed by this seat:**

| Pair | Hexes | Mina | Ada (recomputed) | Floor | Result |
|---|---|---|---|---|---|
| White play/pause glyph on poppy fill | #FFFFFF on #D85434 | 4.01:1 | **4.010:1** | 3:1 (1.4.11, non-text) | Pass |
| Poppy dot on deep-2 (`ground-evening`) | #D85434 on #1C2A21 | 3.73:1 | **3.734:1** | 3:1 (1.4.11, non-text) | Pass |
| Poppy fill boundary against deep-2 (the 44px toggle / 64px track-view control as a component) | #D85434 on #1C2A21 | (same pair) | **3.734:1** | 3:1 (1.4.11, component boundary) | Pass |

**Basis.**
- The glyph is a graphical object, not text: 1.4.3 does not apply; 1.4.11 does, at 3:1 against adjacent colours. The glyph's adjacent colour is the poppy fill it sits on — 4.010:1, a full point of headroom, no rounding question. This holds at both specced sizes (44px toggle in the player, 64px control with 24px glyph on the track view, Mina §4.9).
- The dot indicates playing state. Under 1.4.1 (Use of Color), that state is **not** carried by the dot alone: the same row/player carries the play/pause glyph shape, the "Playing" text label, the semibold title, and the wash background (Mina §3.1, §7.2). The dot would pass 1.4.11 on its own anyway (3.734:1); the redundancy is belt and braces, and it is what makes the *paused* state lawful — see condition A1.
- On the "inherited dress, new ground" question Quinn posed: a pass does not transfer between grounds by inheritance, which is why this ratification exists — but measured on *this* ground, the pair set passes on its own numbers. Ratification is of the pairs on deep-2, not of the Print player's history.

**Condition A1 (build-gate check, gates MuseumPlayer sign-off):** the paused state dims the dot to the shipped 0.4-opacity token. Blended against deep-2, that dot computes to **≈1.59:1** (this seat's computation: 40% #D85434 over #1C2A21 → rgb(103,59,41), 1.593:1) — below the 3:1 non-text floor. That is acceptable **only** because, as specced, paused is simultaneously carried by the glyph (play triangle restored), the control's action label ("Play *\<title\>*"), and the row's text state. The build-gate sample must confirm, on a built paused row and a built paused player, that the word/glyph channels are actually present wherever the dimmed dot appears. If any built surface shows the dimmed dot as the *only* paused signal, that surface fails 1.4.1 and the fix is to restore the dot to full opacity in the paused state (same colour, nearest passing treatment) — not a new colour, not a redesign.

## AF-2 — Three-row phone wing strip at 320–359px: RATIFIED

**Basis.**
- **1.4.10 Reflow (AA):** at 320 CSS px, content must reflow with no two-dimensional scrolling and no loss. A wrapping strip is precisely the reflow-conformant answer: the five chips wrap to three rows *within* the 320px measure rather than overflowing it or demanding horizontal scroll. Row count is not a criterion; nothing in WCAG prices vertical length of a non-sticky block.
- **2.4.11 Focus Not Obscured (Minimum) (AA, new in 2.2):** the strip is **non-sticky** as specced (Mina §4.0/§7.3). A wrapped three-row *sticky* strip at 320px would eat the magnified viewport and risk covering the focused element; the non-sticky spec removes that failure mode at the root. This is the single most load-bearing word in the construction, and it is already in the spec.
- **2.5.8 Target Size (Minimum) (AA, new in 2.2):** each chip is a 44px-minimum target (Mina §4.0) — nearly double the 24×24 CSS px floor, and at this seat's preferred 44px design target.
- **1.3.1 / 4.1.2 / 3.2.3:** the strip remains a labelled nav list with `aria-current` on the current wing (semantics unchanged by the wrap, per Mina §7.3 and the F18 record), and the same five names in the same order on every screen — consistent navigation and identification survive the extra row untouched.
- The substance (full wing names) is Dustin's ruling; the wrap is its consequence, and the consequence costs the floor nothing. No semantics change was proposed and none is needed.

**Build-gate checks A2 (verifications, not changes):** (i) at 320px and at 200% text resize, the strip wraps with no horizontal scrollbar and no clipped chip label; (ii) with the WCAG text-spacing overrides applied (line-height 1.5, letter-spacing 0.12em), chip labels do not clip inside their fixed chip padding — the strip may grow taller, it may not crop words; (iii) keyboard focus on a chip is fully visible and never under sticky furniture (the sticky controls row, Mina §1.5 `header` elevation, is the piece to check against).

## AF-3 — Wing-marker construction: RATIFIED AS DESIGNED (fallback does not take effect)

**The question, precisely:** are the dahlia-pink (2.482:1 on paper-1) and marigold (1.633:1) fills *essential* graphical information that must independently reach 3:1 under 1.4.11 — in which case Mina's pre-designed fallback (solid `deep` silhouettes, accent retired from those two markers) takes effect — or does the redundant-channel construction satisfy the floor?

**Ruling: the fill is not essential to identification. The construction satisfies the floor as designed.**

**Basis.**
- **What 1.4.11 actually covers:** visual information *required to identify* user-interface components and states, and parts of graphics *required to understand the content*. The WingMarker is neither. It is never interactive (no component, no state), and it is `aria-hidden` always (Mina §3.3) — it is not presented to assistive technology as content at all.
- **Identification is carried, redundantly, by channels that pass:** (1) the adjacent wing name in `ink` text, always present beside the marker (9.30:1 on paper-1) — the label does the identifying, in Mina's own words, and a text label at full text contrast is the strongest channel this seat recognises; (2) the marker's **shape boundary**, drawn by the 1.5px ring in `deep` at **11.378:1** on paper-1 (recomputed) and `paper-1` at **13.256:1** on the evening ground — the part of the graphic that makes it perceivable as a distinct shape passes the non-text floor nearly four times over; (3) a distinct silhouette per wing (disc / arch / pill / square / rounded square); (4) fixed position in an unchanging five-wing order.
- **1.4.1 (Use of Color) is the criterion this construction really answers to**, and it answers it completely: wing identity never rides on hue alone — label, shape, position, and a passing boundary all carry it. A reader with protanopia, deuteranopia, tritanopia, or full achromatopsia loses the fill's hue and nothing else; the five markers still separate by silhouette, by ring, and — as Mina notes — by a lightness ladder across the fills themselves. The closest value pair (coral/lavender) is separated by shape and by three positions of distance in the fixed order.
- **The fill's correct classification is decorative infill inside a passing boundary** — the same status as the coloured interior of an icon whose outline carries its identifiability. 1.4.11 prices the information-bearing boundary; it does not price decoration enclosed by one. Retiring the accent from two of five markers (the fallback) would buy no criterion and would cost the set its consistent construction — five markers, two visibly demoted — which is itself a consistency cost under 3.2.3/3.2.4's spirit. The fallback stays designed and unbuilt, as insurance, not as the ruling.

**Conditions A3 (they guard the premises this ruling stands on; all are build-gate checks):**
- **A3-1, label adjacency:** no built context may render a WingMarker without its adjacent visible text label. The ruling's first channel is the label; a label-less marker (e.g. a future icon-only nav) is outside this ratification and would need its own ruling — in such a context the fill *would* become essential and the fallback would apply there.
- **A3-2, the ring is structural:** the 1.5px ring (`deep` on light grounds, `paper-1` on evening) must be built as specced, in the token colours, at every marker size (16/20/24px). If the ring is dropped, thinned into invisibility, or recoloured, the construction this ruling ratifies no longer exists and AF-3 reopens automatically.
- **A3-3, forced-colors survival:** in forced-colors mode the fills will be stripped by the OS. The sample check confirms the markers degrade acceptably there — shape via border/outline or clean absence — with identity, as ever, on the text label, which forced colors preserves.

---

## 4. Verification record (this seat's own computations)

WCAG relative-luminance formula, sRGB, unrounded:

| Pair | Mina | Ada | Δ |
|---|---|---|---|
| White #FFFFFF on poppy #D85434 | 4.01 | 4.010 | exact |
| Poppy #D85434 on deep-2 #1C2A21 | 3.73 | 3.734 | exact |
| Dahlia-pink #D77FA8 on paper-1 #F7F1DE | 2.48 | 2.482 | exact |
| Marigold #E9B83A on paper-1 #F7F1DE | 1.63 | 1.633 | exact |
| Dahlia-pink on paper-0 #FFFDF4 | 2.75 | 2.751 | exact |
| Marigold on paper-0 #FFFDF4 | 1.81 | 1.811 | exact |
| `deep` #23362B ring on paper-1 | 11.38 | 11.378 | exact |
| `paper-1` ring on deep-2 | 13.26 | 13.256 | exact |
| Paused dot, 0.4 opacity over deep-2 | — (not tabled) | 1.593 | new, see A1 |

Mina's pair table is honest. That is recorded because the next seat to rely on it should know it was checked, not assumed.

## 5. Notes (observations, not findings — no owners assigned)

- **F18 pattern (aria-current):** the amendment is sound at the pattern level. Reserving `aria-current="page"` for the wing nav and carrying the playing row by `data-state` + a state-named control label ("Pause *\<title\>*" / "Play *\<title\>*") + the visible "Playing" label satisfies 1.3.1 and 4.1.2 as specced — the state is programmatically determinable through the control's name and perceivable in text, and no two unrelated "currents" compete on one page. This seat will sample-check built rows at the build gate, as Mina's amendment log requests; nothing in the pattern itself fails the floor.
- **Chip boundary:** the wing-strip chips' `line-2` ring (3.22:1 on paper-0, Mina §4.0) clears the 3:1 component-boundary floor on its own, before the label is counted. Noted because Mina's text undersells it as "carried by ring + label together" — the ring alone passes.
- **Refusals this seat endorses without being asked:** the `SegmentedControl` ban on the evening ground (its `deep` selected fill is 1.17:1 on deep-2 — an invisible selected state, a clear 1.4.11 failure avoided by design), and the refusal of `gold-ink` on `paper-2` (4.24:1) carried over from this seat's standing ruling 1. Both are the floor applied early, which is what it's for.
- **Hover is not focus:** ExhibitCard's hover treatment (a gold ring via `color-mix`) is decorative state feedback; the card's keyboard focus rides the system focus ring per Mina §3.2/§7. The build-gate sample should confirm the focus ring — not the hover ring — is what a keyboard user sees, at 3:1 against the card's paper ground.

## 6. What I did NOT rule on

- **Nothing was built.** These are rulings on a written specification and its measured token pairs. No rendered surface, screen reader pass, zoom/reflow test, or forced-colors view exists yet; A1/A2/A3 are the checks that convert these rulings into sign-off when one does. Conformance language: the design is *specified to* WCAG 2.2 AA on these three items; the museum is not thereby "compliant" or certified — certification remains a specialist firm with assistive-technology testing, as always.
- **FE-1** (photographs on the deep-2 stage) is Elena and Iris's interpretation of a house art rule; it is not an accessibility question and this seat expressed no view on it. The stage's *text* pairs on deep-2 (paper-1 13.26:1, gold-1 9.81:1, sage-1 10.15:1) pass on Mina's numbers, spot-supported by this seat's ring computation on the same ground — that is a contrast observation, not a ruling on FE-1.
- **The rest of Mina's §7 pair table** was not exhaustively recomputed — the eight pairs bearing on AF-1/AF-3 were, and all reproduced exactly; the remaining pairs (text steps, card states, LetterBar, search) stand as Mina's token/computed evidence for the build gate to sample, not as this seat's measurements.
- **Ada items outside the AF flags** — e.g. the Dahlias letter-bar behaviour at 200% resize, skeleton/loading announcements, the player's keyboard operability as built — belong to the build gate, where this seat's checklist applies in full. They are unmeasured, and unmeasured is not passed.
- **Palette and feeling.** Where pairs pass, whether poppy is the *right* red or the markers are beautiful is Iris's chair and Elena's. This seat ruled only on whether everyone can perceive and operate what was specced.
