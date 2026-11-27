# Art Direction — media.hues.flowers museum

**Seat:** Elena, art direction / illustration (step 3 of the design sequence, after Nadia UX and Mina UI, both delivered and verified by Hue).
**With:** Iris's colour theory playbook, applied jointly on FE-1 (§1); the floral design playbook, consulted on all dahlia curation (§3).
**Inputs honoured:** GOAL.md locked decisions (curated exhibits only; all 412 dahlias hang; 19 song exhibits; shell-only SPA; no PWA; no indexing; full wing names; full-bleed phone photo stage), Nadia §2.1/§3.1/§3.3/§4.3, Mina §2.1/§2.2/§9.2.
**Scope of this document:** selection criteria, specific selections where the record supports them, treatment rules, and the FE-1 ruling. No UX/UI changes, no final copy, no code, no new artwork produced.

**Evidence discipline used throughout:** every visual lead named below was opened and looked at in this pass (local file in `~/workspace/huesflowers-live`, or the live media URL downloaded and viewed). Anything not viewed is labelled **UNVERIFIED** and is never a lead pick. Inventory sources: `media-migration/upload.log` (599 keys), `filename-map.md`, `upload-round2.py` (the round-2 key list), `huesflowers-live/src/lib/dahlias.ts`, and the live site's own page code (home, /m home, floral-park, dahlias, music, arcade hub).

---

## 1. FE-1 — the ruling (headline item)

**Position: CONFIRMED, with one binding condition.** Photographs on Mina's deep-2 (`#1C2A21`, token `sys.color.ground-evening`) piece-view stage do **not** collide with the spirit of the house rule that dahlia paintings are never placed on dark green grounds. The all-paper fallback is **not** triggered. The build may start the stage component on this word.

**The condition:** the confirmation holds only while the photograph is visibly separated from the stage — Mina's specified construction (stage padding plus the gold-2 keyline around the photograph, 4.79:1 on deep-2, *computed by Mina*). If the keyline and padding ever come out of the build, this confirmation goes with them and FE-1 reopens.

### What the rule protects (both playbooks, read in full for this ruling)

Both playbooks state the rule in medium-specific words, with no exceptions: Elena's seat — "Never place a dahlia painting on a dark green ground"; Iris's seat — "Keep dahlia paintings off dark green grounds. That is a standing house rule with no exceptions." The rule's purpose, reconstructed from both playbooks' reasoning, is luminosity and edge integrity in watercolour:

1. Hues paintings are light-key watercolours whose lights are the paper itself. A dark surround makes those pale washes read dingy by simultaneous contrast — the painting goes dull in a way no adjustment inside the painting can fix, because the damage is done by the relationship, not the pigment.
2. The paintings' own foliage greens would merge with a green ground. The Print Edition style depends on the painted vignette edge — the artwork dissolving into its own paper. A green ground swallows that edge: the painting's world leaks into its surround and the piece stops being a bounded object.
3. The rule governs a composition act — an artist or designer *placing* a painting on a ground, where the ground becomes part of the presented artwork.

### Why a photograph on the stage does not engage it

1. **Different medium, different value structure.** A photograph's colours were fixed by the camera across a full tonal range; its luminosity does not live in paper whites. The specific harm in (1) above has nothing to act on.
2. **A mat is not a ground the picture sits in.** The photograph is a sealed rectangle with its own internal ground (garden foliage, dusk sky). Nothing in it washes out to an edge a surround could dissolve — point (2)'s leak cannot start, and the keyline condition above seals the one place it theoretically could (a green-foliage photo edge meeting a green stage).
3. **Simultaneous contrast runs the other way.** For a photograph, a quiet dark surround raises apparent brightness — the standard darkened-room gallery treatment. Mina made this argument in §2.1; Iris's playbook supports it: her method requires every ground to carry a *declared role* (support / recede / carry), and this stage's declared role is **support** — it exists so the photograph carries. A ground doing declared support work for a photograph is colour theory used correctly, not a rule bent.
4. **Internal darks are not grounds.** Several exhibited paintings themselves contain deep dusk greens (the Listening Room hero, §2, is mostly dusk blue-green inside its painted paper border). The rule has never governed what is *inside* a piece — only the ground a piece is placed on. The stage is outside the photograph in exactly the same way.

### Scope of this confirmation — what it does NOT license

- Paintings on deep-2 (or any dark ground) anywhere in the museum: still forbidden, unchanged. Painted pieces get the paper-0 mat stage, exactly as Mina designed, including thumbnails and cards.
- Artwork in the evening heads: Mina designed the Listening Room and track heads typographic-only. Keep them that way; this ruling is not a door to art on the evening ground.
- Any other surface borrowing this ruling. It covers photographs, on the piece-view stage, in this museum.
- Wing markers, medallions, and other UI enamel that happens to sit on deep tones: interface chrome, never governed by the paintings rule, and not exhibits (§5).

### What I am and am not deciding

I **am** deciding the application question Mina actually asked — photographs on this stage — because both playbooks state the rule in medium-specific terms and the purpose analysis above is consistent across both seats. I am **not** amending the rule's text, which stays Dustin's, word for word, in both playbooks. If Dustin reads his own rule more broadly than its wording, his word overrides this interpretation; the cost of that override is known and small, because Mina's all-paper fallback is fully designed and nothing else in her document changes. Hue: worth one line in your report to him so the interpretation is on the record, but it does not need to block the build.

---

## 2. Wing entry selections (Mina §9.2 slots)

One representative piece per wing, from the catalog's `featured` pieces. Ratios 16/10, Dahlias 21/10 at desktop double-span, photo treatment slot `card`. Painted selections sit in cards on paper — no entrance slot touches the dark ground, so FE-1 is not engaged by any pick below. All five picks **viewed in this pass**.

| Wing | Piece | Media key | Kind | Why this one |
|---|---|---|---|---|
| Dahlias | Labyrinth, frame-filling bloom | `hues/dahlias/labyrinth/P1000288-Labyrinth.jpg` | Photo | The strongest single dahlia photograph in the record — see below |
| The Park | Golden Hour Over the Beds | `hues/home/hero-golden-hour.webp` (upload key `hues/desktop-art/home-hero-golden-hour-20261112.webp`) | Painting | The live site's own #1 lead; the only wide park panorama |
| Art & Motifs | The Procession | `hues/m-art/painting-1080.webp` | Painting | The house benchmark artwork itself |
| Arcade | Arcade hero trio (Dusty, Hue, Cocoa) | `hues/play/arcade-hero-trio.webp` | Painting | The arcade hub's own hero image |
| Listening Room | Music hero (dusk beds, string lights, notes) | `hues/m-art/cards/music-hero-1080.webp` | Painting | Both music pages' own hero (desktop and /m) |

**Dahlias — Labyrinth.** Viewed: a huge coral-pink informal-decorative bloom with twisted, magenta-streaked petals filling the frame, tack sharp, soft green garden behind. It is one of the six close-ups the live site itself carries as named dahlia art (filename map), and it survives the 21/10 double-span crop because the bloom is centred and frame-filling at any band through its middle. Crop focus: centre of bloom. This piece is also featured-band #1 (§3) — the wing's face and its first featured bloom agreeing is correct, not lazy: it is the same piece the site already leads with.

**The Park — Golden Hour painting.** Viewed: watercolour panorama — winding path between colour-blocked dahlia beds, string lights, hills behind, painted paper border. It is the desktop homepage's hero (`src/app/page.tsx`, full-width framed plate), i.e. the site's own chosen face of the park, and its wide composition is the only park image that fills 16/10 without a destructive crop. The wing's *interior* photographic lead is different (§4): the dusk visitors photograph. A painting as the entry for a mostly-photographic wing is a deliberate choice and is Dustin's question Q2 (§8) — my recommendation is to keep it.

**Art & Motifs — The Procession.** Viewed: the watercolour of the cottage beds with the animal procession on the stone path — duck, goose, Bella, Hue the rabbit — rainbow at the vanishing point. It opens the phone home (Print Edition) and is the recorded benchmark for family art in my playbook; an art wing that led with anything else would be misrepresenting the collection. **Crop guidance:** the composition's life is in its lower two-thirds — the upper ~40% is intentional pale sky. The 16/10 entrance card crop must anchor low (subject-weighted to the path and animals), or the card reads as empty paper. The piece view itself is never cropped (§6): on its paper mat, the sky *is* the piece.

**Arcade — hero trio.** Viewed: watercolour of Dusty, Hue, and Cocoa in overalls before the Hues Floral Park stand, dahlias foreground, string lights above. It is the arcade hub's own hero (`PlayHub.tsx`) and the phone home's arcade band. It contains painted lettering ("HUES FLORAL PARK" on the stand, name tags) — catalog alt text must transcribe the lettering (Nadia §4.3 already requires this; flagged for Wren in §9).

**Listening Room — music hero.** Viewed: dusk dahlia beds under string lights with glowing music notes drifting over the rows — the hero of both the desktop and mobile Music pages. Unmistakably the music piece; no other candidate exists in the record. Note for the avoidance of doubt: this is the entrance *card* image, sitting on paper. The wing's own head stays typographic per Mina §9.2 — no conflict.

---

## 3. Dahlias featured band (12–16)

### Criteria (floral playbook applied)

1. **Park-photographed first.** `dahlias.ts` distinguishes real park photos from the shared placeholder; the round-2 upload list is exactly that photographed set (35 varieties). The band leads with the park's own camera wherever possible. The wider `cultivar-photos/` pool (206 varieties) descends from the This-or-That game pool — mixed provenance, low resolution — and is used only where it earns its place (criterion 4), flagged when used.
2. **Colour range across the band, arranged as a gradation.** Per the floral playbook's colour discipline (arrange the natural gradation; deepest and heaviest colour placed deliberately, not scattered): the band walks light → bright → deep, so the strip reads as one arranged piece rather than 14 accidents. Order below is the curation (Mina: first cell emphasised by span only; selection order does the work).
3. **Form variety.** The band should teach the dahlia family's range at a glance: decorative (formal and informal), dinnerplate scale, ball, semi-cactus, anemone, collarette, bicolor, and an open-centred bloom.
4. **Recognisability.** At least one variety a non-specialist already knows by name — Café au Lait — even at the cost of criterion 1, flagged.
5. **Image quality at band size.** Single-bloom, frame-filling, sharp at card width. Cluster shots and soft files fail this however famous the variety (see the recorded rejection under the table).
6. **No patio/dwarf/Melody/Gallery-series varieties** (house exclusion, both playbooks). None of the named picks is in an excluded series.

### The band — 14, in order

All keys are the round-2 park-photo keys unless marked *pool*. Colour/form are **as photographed** (my observation on viewing), for the catalog pass to confirm against variety data before anything is published in `colourGroup`/`form` (Nadia: those fields stay empty rather than guessed).

| # | Variety | Media key | Colour / form as photographed | Evidence |
|---|---|---|---|---|
| 1 | Labyrinth | `hues/dahlias/labyrinth/P1000288-Labyrinth.jpg` | Coral-pink, informal decorative, dinnerplate scale | Viewed; also wing entry (§2) |
| 2 | Break Out | `hues/dahlias/break-out/P1000295-Break-Out.jpg` | Blush-peach deepening to apricot heart, formal decorative | Viewed |
| 3 | Café au Lait | `hues/cultivar-photos/cafe-au-lait.jpg` *pool* | Cream, dinnerplate decorative | Viewed via media URL. **Flagged:** pool provenance, 560×700px original — card widths only (§6) |
| 4 | White Wizard | `hues/dahlias/white-wizard/P1000395-white-wizard.jpg` | White-cream, ball (quilled petals, blush edge) | Viewed |
| 5 | Golden Scepter | `hues/dahlias/golden-scepter/P1000413-Golden-Scepter.jpg` | Golden yellow, ball | Viewed |
| 6 | Totally Tangerine | `hues/dahlias/totally-tangerine/P1000437_Dahlia-Totally-Tangerine.jpg` | Pink-orange, anemone (ruffled cushion centre) | Viewed |
| 7 | Cornel Bronze | `hues/dahlias/cornel-bronze/P1000475-cornel-bronze.jpg` | Bronze-orange, ball, geometric | Viewed |
| 8 | Penhill Autumn Shade | `hues/dahlias/penhill-autumn-shade/P1000419-Penhill-Autumn-Shade.jpg` | Apricot-peach, semi-cactus starburst | Viewed. A tiny spider sits on one petal at full size — a real garden photograph; keep, it is charm at piece size and invisible at card size |
| 9 | Belle of Barmera | `hues/dahlias/belle-of-barmera/P1000448_Dahlia-Belle-of-Barmera_Sport.jpg` | Red-orange/white bicolor, open golden centre | Viewed. Source filename says "Sport" — catalog title is the variety name; no copy may claim more than the data says (§9) |
| 10 | Strawberry Ice | `hues/dahlias/strawberry-ice/P1000470-strawberry-ice-closeup.jpg` | Pink/yellow bicolor, decorative, macro | Viewed. Minor honest petal wear at macro magnification; fine at band size |
| 11 | Bumble Rumble | `hues/cultivar-photos/bumble-rumble.jpg` *pool* | Magenta/white, collarette, bee on the disc | Viewed via media URL. **Flagged:** pool provenance, 466×700px original — card widths only (§6) |
| 12 | Lilac Time | `hues/dahlias/lilac-time/P1000070-lilac-time.jpg` | Lavender-magenta, decorative | Viewed |
| 13 | Thomas Edison | `hues/dahlias/thomas-edison/P1000273-Thomas-Edison.jpg` | Deep purple, decorative | Viewed. Caution: the pool key for this variety is spelled `thomas-a-edison.jpg` — the catalog must not merge or confuse the two key families |
| 14 | Sam Hopkins | `hues/dahlias/sam-hopkins/P1000241-sam-hopkins.jpg` | Near-black burgundy-red, decorative — the band's deep closer | Viewed |

**Recorded rejection:** American Dawn — a photographed variety with a famous name, excluded on criterion 5: its park file is a soft, low-resolution cluster shot (212KB), not a single-bloom portrait. It hangs in the wing's A–Z like every other cultivar; it does not lead. Recorded here so the catalog pass doesn't re-pick it from the name.

**Band mechanics for the catalog pass:** set `featured: true` and band order on exactly these 14. Twelve are park photographs; the two pool picks are the band's only provenance compromise and are Dustin's question Q1 (§8). If he rules park-only, the band ships at 12 with no other change.

---

## 4. Entrance highlights (8–12, cross-wing)

### Criteria

1. **Rhythm across the strip** (Iris's sequence discipline): alternate pale and deep, painting and photograph, so the strip has a lights-and-darks pulse instead of a monotone run.
2. **Cross-wing by construction:** every wing appears; Dahlias — the flagship — appears most.
3. **Don't spend the wing entries twice** where a wing is deep (Dahlias, Art): highlights draw different pieces than the entry cards. Where a wing's image pool is shallow (Arcade, Listening Room), reusing the entry piece is accepted and marked.
4. Songs: exactly the ≥2 Nadia requires, placed mid-strip and late — the picks themselves are Wren/catalog territory; I recommend two titles below on record evidence only.

### The strip — 10 slots, in highlight order

| # | Piece | Media key | Wing | Evidence |
|---|---|---|---|---|
| 1 | The Procession | `hues/m-art/painting-1080.webp` | Art & Motifs | Viewed (§2). The signature artwork opens the highlights even though it is also the Art entry — it is the one piece the whole park's art is benchmarked against |
| 2 | Sam Hopkins | `hues/dahlias/sam-hopkins/P1000241-sam-hopkins.jpg` | Dahlias | Viewed (§3). Near-black red straight after the pale Procession — the strip's value contrast is set in two moves |
| 3 | Visitors at dusk, arranging buckets | `hues/park/visitors-evening-dahlia-beds.jpeg` | The Park | Viewed: portrait dusk photograph, guests arranging buckets of dahlias at a picnic table, string lights and lawn behind. The Floral Park page's own hero and the desktop home's dusk band — the park's people moment. Portrait ratio suits the ExhibitCard; do not force it into a landscape crop |
| 4 | **Song slot 1** | — | Listening Room | Wren/catalog pick. Recommendation: "A Little World Apart" (`music/tracks/38-a-little-world-apart.mp3`) — the park's official statement phrase and the catalog's closing track; the signature song |
| 5 | Dinnerplate Dahlias (botanical plate) | `hues/m-art/flowers/dinnerplate-dahlias.webp` | Art & Motifs | Viewed: whole-plant watercolour plate — three blush blooms, foliage, roots and tubers on paper. Represents the 36-plate botanical set and the museum's second art register (plate vs scene) |
| 6 | Totally Tangerine | `hues/dahlias/totally-tangerine/P1000437_Dahlia-Totally-Tangerine.jpg` | Dahlias | Viewed (§3). The anemone's ruffled centre is the strip's texture pop, mid-sequence |
| 7 | Arcade hero trio | `hues/play/arcade-hero-trio.webp` | Arcade | Viewed (§2). Wing-entry reuse, accepted per criterion 3 — the Arcade's finished-art pool is this, its sibling hero, and the season set |
| 8 | **Song slot 2** | — | Listening Room | Wren/catalog pick. Recommendation: "Zinnia Sky" (`music/tracks/09-`/`10-zinnia-sky.mp3`) — on record as the park's current advertising bed instrumental, i.e. the tune already doing public work |
| 9 | Music hero (dusk beds) | `hues/m-art/cards/music-hero-1080.webp` | Listening Room | Viewed (§2). Wing-entry reuse, accepted per criterion 3; its dusk register also rhymes with slot 3 and sets up the close |
| 10 | Strawberry Ice (macro) | `hues/dahlias/strawberry-ice/P1000470-strawberry-ice-closeup.jpg` | Dahlias | Viewed (§3). Closes the strip on texture — petal-level detail after a run of scenes |

**Catalog mechanics:** `featured: true` + `highlightOrder` 1–10 on these slots. Song pairing (which file is the exhibit's primary version) follows Nadia §3.4 and Dustin's one-exhibit-per-song ruling — not art direction's call.

---

## 5. Art-stage handling rules — exhibits vs chrome

Decision rules for the catalog pass's `exhibitStatus` field. The test, in order: **(a)** Was the piece made to be looked at, or to be used? **(b)** Does it read alone, out of its working context? **(c)** Is it the canonical version, or a duplicate/derivative? A piece must pass all three to hang solo; pieces failing (b) but with real charm hang only as a grouped set; pieces failing (a) never hang.

### Exhibits (curate in)

- **Botanical plates** — `hues/m-art/flowers/*.webp` (36) and their round-2 mirrors `hues/seasons/flowers/*.webp`: one exhibit each, one canonical key each (dedupe rule below), grouped as the set *Botanical plates*. Verified exemplar: dinnerplate-dahlias (§4) — whole-plant plates painted on paper, made to be looked at.
- **Site paintings & season cards** — `hues/m-art/cards/*` (gather-hero-1080, help-hero-1080, music-hero-1080, seasons-hero, peak-dahlia, early-may, cottage-beds, fall-peak, early-spring, may-attractions, fall-finale): exhibits, grouped *Site paintings*. Several already serve as wing/highlight pieces.
- **The Procession** — `hues/m-art/painting-1080.webp`: exhibit, canonical. `procession.png`, `procession-full.png/.webp` are the same artwork in other crops/formats — **one exhibit total**; the footer strip version is a derivative, not a second piece.
- **Park paintings** — `hues/desktop-art/home-hero-golden-hour-20261112.webp`: exhibit (also §2). `floral-park-head-20261112.webp`: **UNVERIFIED** — not viewed in this pass; catalog pass views it before curating it in or out.
- **Arcade finished art** — `hues/play/*`: arcade-hero-trio (exhibit, §2), arcade-hero (exhibit — sibling hero, same session family), tot-banner / tot-banner-ribbons (exhibit — This-or-That game art), hue-avatar / cocoa-avatar / hue-cocoa-hero / stage-detail (**UNVERIFIED** — catalog pass views before curating; avatars are character art, likely exhibits, but I do not curate what I have not seen).
- **Season blooms** — `hues/arcade-games/season-*.webp` (12): exhibits as one grouped set, *Season blooms*. Verified exemplar: season-dahlias — a finished painted bloom portrait on paper that reads alone. Small files (~500px class): card widths only (§6).

### Not exhibits (chrome and working files — `exhibitStatus` off)

- **Tab bar art** — `hues/m-art/tabbar/*` (17) and `hues/shell/*`: interface medallions, discs, and plates. Verified exemplar: tabbar-v18-med-home — a tiny enamel house medallion; charming, and unambiguously a button.
- **Sorting Table components** — `hues/arcade-games/sort-*` (~40: buckets, crates, racks, stems, fillers, packets, eggs, tubers, plus `-cut`/`-front` variants): game components, not pieces. Verified exemplar: sort-bucket — a lone galvanized bucket prop on paper, 8KB. The `-cut`/`-front` variants are production states of the same props; exhibiting them would hang the workshop, not the work.
- **Game pieces** — `hues/arcade-games/bloom-*`, `hop-*`: same reasoning as sort-* — pieces of games, not finished art. (The season-* set above is the exception because each is a complete portrait.) If the Arcade wing ever needs depth, the honest route is one grouped exhibit of game art — not 50 solo props. Not in v1.
- **Motif singles** — `hues/m-art/{alyssum,cosmos,grass,marigold,petunia,cactus,peach,pompon,rabbit,rainbow,stones,spring-cluster}` (png/webp duplicates): decorative spot illustrations made to garnish pages. They fail test (b) individually — a lone spot motif on a museum mat looks lost, not curated. Optional: one grouped exhibit *Motifs & spots* if Hue wants the wing deeper; my recommendation is to leave them out of v1.
- **Working files** — `hues/m-og/*`, `hues/og/*`, `hues/email/*`, `hues/icons/*`, `hues/m-icons/*`, `hues/hues-logo-224.png`, `hues/hues-banner-1440x448.jpg`, `hues/og-*.jpg`, `hues/videos/this-or-that-poster.jpg`, `hues/music/sound-of-hues-og.jpg`: per Nadia's non-exhibit list; they keep serving silently.

### Dedupe / canonical-key rule (applies everywhere, including §3)

One image = one exhibit, however many keys it lives under (original upload family, round-2 family, `opt/` optimised copies, png+webp pairs, the same photo under `home/`, `park/`, and `dahlias/` app keys). Canonical key chosen by: **(1)** highest native resolution; **(2)** the app-key family (`hues/dahlias/…`, `hues/home/…`) over the pool family. The catalog pass verifies every canonical key actually returns 200 before the catalog ships — three key families exist and at least one variety's spelling differs between them (Thomas Edison, §3).

### Unfit for the paper-mat treatment

**None of the pieces viewed in this pass is unfit.** Two watch-notes, which are handling rules rather than exclusions: (a) paintings with deep internal dusk tones (music hero) still take the paper mat — their painted paper border is part of the piece, and the mat continues it; (b) the transparent-ground spot motifs would be unfit *solo* on a mat, which is exactly why the rule above groups or excludes them rather than hanging them one by one. Anything the catalog pass finds that is genuinely unfit comes back through Hue per Mina §9.2 — none is known today.

---

## 6. Treatment rules

**Paintings and plates**
- `fit=pad`, always. Never cropped, never stretched, never re-framed. The full canvas — including its painted paper edge and intentional empty sky (The Procession) — is the piece.
- Paper-0 mat stage with the stitch border (Mina's construction), quality 85 per the media contract.
- The one permitted crop in the whole museum for a painting: the entrance *card* slot's 16/10 cover crop (§2, Procession anchored low) — a thumbnail convention pointing at the piece, never a presentation of it. The piece view is always whole.

**Photographs**
- Piece view: whole frame, always — on the deep-2 stage (FE-1, §1), full-bleed stage on phone per Dustin's ruling, the photograph itself uncropped inside it.
- Card/entry slots: cover crop permitted only with the focus points named in §2–§4 (Labyrinth: bloom centre; visitors-at-dusk: the table and buckets, and prefer a portrait-tolerant slot over forcing landscape).
- Transform widths from the contract ladder (320/480/768/1024/1440/1920), quality 80. **Never request a width above the file's native width.** This bites exactly twice in the featured material: the two pool photographs (§3, ~500–700px originals) are capped at 480 — they may appear in the band and on cards, and on their piece views they sit at honest size on the stage rather than being upscaled into mush. The season-bloom paintings (~500px class) carry the same cap.

**What never happens, to anything**
- No painting on a dark ground, anywhere, at any size, including thumbnails (the rule, §1).
- No colour grading, filters, or "enhancement" of exhibits — the museum shows the media as it is.
- No AI upscaling or generative fill to fake resolution.
- No text over an image (Nadia §5.3; captions live on paper or on the stage's solid ground).
- No re-encoding of bucket originals; all sizing happens through the Worker's transform path.
- No hotlinking and no new copies: the museum reads the same bucket keys the sites use.

---

## 7. New artwork

**None required.** Every slot Mina handed me — five wing entries, the featured band, the highlights' image pieces, the art stage — fills from existing media, most of it from pieces the live site already leads with. I am not speccing a museum hero illustration: Nadia and Mina designed the entrance as a directory plus highlights with no hero-art slot, and inventing one would be redoing their work from my chair. If a future pass wants a drawn museum mark, that is a separate commission through Hue.

---

## 8. Open questions for Dustin (2, with recommendations)

**Q1 — The featured band's two pool photographs.** Café au Lait and Bumble Rumble (§3, #3 and #11) come from the old game-pool family — mixed provenance, ~500px originals — while the other twelve are the park's own camera. They earn their places (Café au Lait is the one dahlia everyone knows; Bumble Rumble is the band's only collarette, bee included), and both are capped at card widths so the resolution never shows. **My recommendation: keep both, flagged and capped as specced.** Alternative: a park-only band of 12, no other change needed.

**Q2 — The Park's front door is a painting.** The Park wing entry (§2) is the golden-hour watercolour — the desktop site's own hero and the only wide panorama of the grounds — ahead of the wing's photographs, whose best piece (the dusk visitors shot) is portrait-shaped and opens the highlights instead. **My recommendation: keep the painting as the entry.** Alternative: lead with the dusk photograph and accept a hard 16/10 crop on a portrait frame.

*(FE-1 is not a question — it is decided in §1, with Dustin's override noted there.)*

---

## 9. Handoff notes

**For Wren (copy).** Slots are Mina §9.3's; art-side notes only. (a) The arcade trio contains painted lettering — "HUES FLORAL PARK" and the Dusty/Hue/Cocoa name tags — alt text transcribes it, captions may enjoy it. (b) The Procession's upper half is empty sky on purpose; copy should not apologise for it or describe the piece as unfinished. (c) Belle of Barmera's source file calls it a sport — captions stick to what the catalog data says, nothing invented. (d) The dusk visitors photograph shows real guests/team arranging real buckets; no names in copy. (e) The two song recommendations in §4 are titles on record evidence; the words around them are yours.

**For the catalog pass.** (a) Apply §5's exhibit/chrome rules and the dedupe/canonical-key rule; verify every canonical key returns 200 — three key families exist and spellings differ (Thomas Edison). (b) Set `featured`/`highlightOrder` from §3 (band, 14) and §4 (highlights, 10 slots incl. 2 songs). (c) Record native pixel dimensions per piece and enforce the §6 width caps, especially the two pool photographs and the season-bloom set. (d) `colourGroup`/`form` for the band: my as-photographed observations in §3 are a starting draft, not variety data — confirm against a variety source or leave empty (Nadia's rule). (e) Provenance honesty: pool-family pieces (the whole `cultivar-photos/` set) are game-pool images of the named varieties, not park-camera photographs; if any caption or About copy implies otherwise, it is wrong — the 35 round-2 varieties are the park-photographed set. (f) UNVERIFIED items named in §5 (floral-park-head, play avatars/heroes) get viewed before any curate-in decision.

---

## 10. What I did NOT do

- **No new artwork** — none was needed (§7); nothing was generated, drawn, or commissioned in this pass.
- **No copy** — titles above are working labels for identification; final captions, intros, and alt text are Wren's (slots per Mina §9.3), with my §9 notes as input only.
- **No UX/UI changes** — Nadia's wings, routes, and catalog shape and Mina's grounds, components, and slots are used exactly as delivered. FE-1 answers Mina's flag; it does not amend her design.
- **No exhaustive viewing** — I viewed every visual lead, every featured-band pick, and a representative exemplar of every set I ruled on (18 images). I did not open all 412 cultivar photos, all 85 m-art files, or all 74 arcade files; set-level rulings rest on the named exemplars plus the inventory record, and the specific pieces I did not view are labelled UNVERIFIED wherever they are mentioned.
- **No accessibility rulings** — AF-1/AF-2/AF-3 remain Ada's; nothing here waives or reinterprets them.
- **No change to the house rule** — §1 interprets its application to photographs; its text and its force over paintings are untouched.
- **No song curation beyond two titled recommendations** — pairing, versions, and durations are the catalog pass's, under Nadia §3.4.
