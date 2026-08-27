---
name: PixelMurmur
description: A warm retro-futurist archive for ideas before they become things.
colors:
  warm-amber: "#c9853e"
  focus-umber: "#9b5b1e"
  canvas-greige: "#e9e1d5"
  warm-paper: "#f8f5ef"
  deep-paper: "#eee7dc"
  status-paper: "#f0ebe4"
  object-stage: "#ebe5dc"
  archive-ink: "#191816"
  soft-charcoal: "#272522"
  reading-graphite: "#4e4942"
  muted-graphite: "#69645c"
  hairline: "#d9d1c6"
typography:
  display:
    fontFamily: "Pixelify Sans Variable, sans-serif"
    fontSize: "clamp(52px, 5.3vw, 88px)"
    fontWeight: 650
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "IBM Plex Sans Variable, sans-serif"
    fontSize: "clamp(46px, 6vw, 88px)"
    fontWeight: 520
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  title:
    fontFamily: "IBM Plex Sans Variable, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.02
  body:
    fontFamily: "IBM Plex Sans Variable, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  dossier-title:
    fontFamily: "IBM Plex Sans Variable, sans-serif"
    fontSize: "clamp(44px, 4.3vw, 68px)"
    fontWeight: 560
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  dossier-body:
    fontFamily: "IBM Plex Sans Variable, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "10px"
    fontWeight: 500
    letterSpacing: "normal"
rounded:
  none: "0"
  pixel: "2px"
  window: "8px"
  shell-mobile: "10px"
  shell: "14px"
spacing:
  page-gutter: "clamp(20px, 3vw, 52px)"
components:
  button-primary:
    backgroundColor: "{colors.archive-ink}"
    textColor: "{colors.warm-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pixel}"
    padding: "0 22px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.archive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pixel}"
    padding: "0 22px"
    height: "54px"
  quiet-cta:
    backgroundColor: "transparent"
    textColor: "{colors.archive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 0 8px"
  navigation-link:
    backgroundColor: "transparent"
    textColor: "{colors.archive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  status-chip:
    backgroundColor: "{colors.status-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "13px 16px"
  pixel-mark:
    backgroundColor: "{colors.archive-ink}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.pixel}"
    size: "28px"
  object-card:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0"
  reality-scale:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "0 20px 18px"
    height: "150px"
  detail-dossier:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.dossier-title}"
    rounded: "{rounded.none}"
    padding: "28px clamp(20px, 3vw, 52px) 96px"
  status-ledger-item:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "22px 18px"
    height: "144px"
  concept-note:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.reading-graphite}"
    typography: "{typography.dossier-body}"
    rounded: "{rounded.none}"
    padding: "22px 0 0"
  collaboration-band:
    backgroundColor: "{colors.deep-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "104px clamp(20px, 3vw, 52px)"
  related-object:
    backgroundColor: "{colors.deep-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0"
---

# Design System: PixelMurmur

## Overview

**Creative North Star: "The Warm Retro-Futurist Object Archive"**

PixelMurmur treats speculative products like carefully catalogued industrial-design artifacts. A warm ivory field, compact archival metadata, and generous negative space keep the interface quiet enough for the large cream-and-tan object renders to feel credible and collectible.

The visual world is editorial rather than technological: pixel display type supplies a restrained digital trace, while IBM Plex Sans and Mono keep bilingual reading and catalog details precise. The implementation is one continuous light website; the approved reference is authority for composition and tone, not a device mockup or presentation-board template.

**Key Characteristics:**

- Warm ivory and greige surfaces with near-black type.
- Large softly lit object renders; small, exact interface chrome.
- Pixel display accents paired with sober sans and mono support type.
- Consistent English and Korean pairs across navigation, actions, metadata, and narrative copy.
- Flat catalog structure, hairline dividers, and only restrained ambient depth.
- Object detail pages read as dossiers: image evidence first, then status, notes, inquiry, and related entries.

## Colors

The palette behaves like warm archival paper around cream, tan, and charcoal industrial objects; interface color stays subordinate to the renders.

### Primary

- **Warm Amber** (`warm-amber`): the restrained material accent for warm product details and closely related object-state emphasis; it is not a page-filling brand color.
- **Focus Umber** (`focus-umber`): the accessible focus outline and selected-text accent, chosen to remain visible on the warm paper family.

### Neutral

- **Canvas Greige** (`canvas-greige`): the outer browser field that frames the single site shell.
- **Warm Paper** (`warm-paper`): the dominant site surface and default light background.
- **Deep Paper** (`deep-paper`): the collaboration and footer surface, used for tonal separation without entering a dark theme.
- **Status Paper** (`status-paper`): the compact metadata-chip surface.
- **Object Stage** (`object-stage`): the quiet neutral field behind archive renders.
- **Archive Ink** (`archive-ink`): primary text, borders, buttons, and the compact navigation mark.
- **Soft Charcoal** (`soft-charcoal`): the small pixel-window surface; use only as a contained dark object.
- **Reading Graphite** (`reading-graphite`): softened long-form copy in object summaries, concept notes, and collaboration bands.
- **Muted Graphite** (`muted-graphite`): supporting copy, IDs, and secondary labels.
- **Hairline** (`hairline`): section rules, card dividers, and reality-scale structure.

**The Light-Stays-Light Rule.** Warm paper remains the dominant field from the first viewport through the footer; charcoal is reserved for small contained elements and the primary action.

**The Object-Owns-Color Rule.** Keep the interface neutral and let product materials or per-object status accents carry the limited chroma.

## Typography

- **Display Font:** Pixelify Sans Variable (with `sans-serif` fallback)
- **Body Font:** IBM Plex Sans Variable (with `sans-serif` fallback)
- **Label/Mono Font:** IBM Plex Mono (with `monospace` fallback)

**Character:** The pairing combines a legible pixel voice with an understated contemporary grotesk. Mono labels make the archive feel measured and factual without turning it into developer tooling.

### Hierarchy

- **Display** (650, fluid display scale, 0.86 line-height): hero wordmark and other rare identity moments; the mobile hero resets to a smaller fluid range so the wordmark stays on one line.
- **Headline** (520, fluid headline scale, 0.94 line-height): large editorial statements such as the philosophy section.
- **Pixel Headline** (520–550, fluid display sizing, 0.9–1 line-height): the collaboration heading and REALITY percentages only.
- **Title** (600, 15px, 1.02 line-height): compact uppercase object names, typically held to about 12 characters per line.
- **Body** (400, 15–18px, 1.55–1.65 line-height): English and Korean explanatory copy; Korean uses `word-break: keep-all` when line wrapping needs protection.
- **Dossier Title** (560, fluid 44–68px scale, 0.94 line-height): uppercase object identity on detail pages; it stays sans rather than pixelated so the product name reads as catalog evidence.
- **Dossier Body** (400, 15px, 1.65–1.7 line-height): compact concept summaries and note copy; Korean support steps down to 14px while preserving relaxed leading.
- **Label** (500, 9–11px, uppercase): navigation, object IDs, statuses, section labels, and archive metadata.

**The Pixel-With-Purpose Rule.** Pixelify is for the wordmark, signature calls to action, pixel-status numerals, and small brand marks; never set paragraphs or ordinary metadata in it.

**The Catalog-Label Rule.** Metadata stays compact, uppercase, and mono; do not enlarge it to compete with the object or editorial headline.

## Layout

The site is one centered shell, capped at 1500px and inset from the greige canvas. Its desktop page gutter is fluid (`page-gutter`), and thin horizontal rules make long sections feel like a continuous catalog rather than separate cards.

At full desktop width, the hero uses three columns: editorial copy, an object-scale interactive showcase, and a four-object picker. The archive gives every object equal priority through a stable three-column grid, a shared square image stage, and aligned caption and metadata zones. About pairs its statement and copy with a live object count, while the journal keeps the five-step REALITY scale. At 1120px, the picker becomes a horizontal four-column rail and the archive becomes two columns. At 767px, navigation becomes an accessible dropdown, the hero and narrative sections stack, the picker becomes a swipeable rail, and the archive becomes a single reading column. The verified targets are 1280px desktop and 390px mobile.

Object detail pages open with a compact trail above a two-column dossier: a wide 1.18:1 studio stage with filename and view metadata, followed by a narrower ruled summary containing identity, state, narrative, and one inquiry action. The concept story uses three editorial columns, the status ledger uses five equal cells, concept notes use four ruled columns, and related objects use four compact tiles. At 1120px these secondary grids reduce to two columns; at 767px the dossier and story become a single reading column, the ledger becomes label/value rows, and notes become one column. Related objects become a single column at 420px.

**The Object-First Rule.** Product renders get the largest uninterrupted area; copy explains them and metadata verifies them, but neither overlays or crowds the object.

**The One-Site Rule.** Preserve a continuous responsive webpage inside one warm shell; never reproduce the laptop, phone, social-post, or brand-board frames visible in the source reference board.

**The Dossier-Reflows Rule.** On narrow screens preserve the evidence order—trail, render and caption, identity, state, summary, action—then turn dense ledger columns into readable label/value rows instead of shrinking them.

## Elevation & Depth

The system is flat inside the catalog and uses depth only to establish the outer shell and the inset pixel window. Hairlines and tonal changes do the structural work; product renders carry their own soft studio shadows.

### Shadow Vocabulary

- **Shell Ambient** (`0 24px 70px rgba(62, 47, 30, 0.14)`): a broad warm shadow that separates the entire site from the greige canvas.
- **Pixel Window Ambient** (`0 24px 54px rgba(44, 37, 29, 0.18)`): a slightly denser shadow used only beneath the dark face window in About.

**The Flat-Interior Rule.** Archive cards, metadata, content sections, and the contact surface stay shadowless; use hairlines, spacing, and paper tones for separation.

## Shapes

The page frame is softly rounded, while interface controls and pixel details use crisp, nearly square geometry. The desktop shell uses the large shell radius; mobile tightens it to the mobile-shell radius. Buttons and the navigation mark use the pixel radius, the face window uses the window radius, and cards remain borderless rectangles. The authored product renders supply the more tactile cream housings and rounded industrial silhouettes.

**The Mechanical-Soft Rule.** Let the objects carry generous curves; keep catalog controls compact and squared so the UI does not become toy-like.

## Components

### Buttons

- **Primary proposal button:** a 54px-high Archive Ink rectangle with Warm Paper text, mono uppercase label, pixel-radius corners, 22px horizontal padding, and an outbound arrow.
- **Hover / focus / active:** hover reverses to a transparent paper-toned surface with Archive Ink text; focus uses the 2px Focus Umber outline with a 4px offset; active moves down 1px.
- **Quiet collaboration CTA:** a bilingual inline link with an underline-like bottom border and arrow; its gap opens from 24px to 34px on hover.

### Chips

- **Status chip:** Status Paper, mono uppercase text, 13px by 16px padding, and the dotted circular status glyph. Keep it content-sized and square-cornered.
- **Per-object status:** the same glyph and compact mono label appear without a filled chip beneath archive cards; only this line may take the object's restrained accent.

### Cards / Containers

- **Object card:** borderless and shadowless on Warm Paper. The object stage has a near-square aspect ratio; ID, short uppercase title, status, and REALITY meter form a strict stack below.
- **Hover:** only the loaded render scales subtly (1.025 over 420ms); the card surface itself does not lift.
- **Reality meter:** pair a mono percentage with fine ticks and reveal strength according to the editorial REALITY value. Treat the value as status metadata, not an engineering measurement.

### Navigation

- **Desktop:** centered uppercase mono links with wide gaps; hover and focus draw a 1px underline from right to left. The wordmark remains left and the square pixel-face mark remains right.
- **Mobile:** replace the link row with a 44px menu button and a full-width paper dropdown below the 64px header. Preserve Escape-to-close, focus return, and the visible global focus style.

### Product Image Stage

Images load over a quiet paper skeleton and fade to full opacity over 420ms. The hero object receives the system's single entrance gesture: a 780ms settle from slight blur, scale, and vertical offset, only when reduced motion is not requested. Do not add looping object motion, parallax, or multiple competing entrances.

### Object Dossier Hero

The detail hero behaves like an archival evidence sheet, not a commerce product page. Lead with a breadcrumb trail and an oversized contained render on Deep Paper; place filename and studio-view metadata directly beneath it. The adjacent summary starts with an Archive Ink top rule and orders the object ID, uppercase sans title, status chip, REALITY track, English/Korean introduction, and the existing primary inquiry button.

**The Dossier-Is-Evidence Rule.** Use filenames, view labels, update dates, status, and REALITY to establish archive context; do not replace them with prices, ratings, inventory, purchase controls, or invented specifications.

### Status Ledger

Use a semantic label/value ledger for stable object facts. Desktop presents five equal hairline-separated cells with the value anchored low in each cell; mobile converts the same facts into stacked rows with labels left and values right. Status and REALITY remain editorial language, and the update date stays in the section heading.

### Concept Story and Notes

The story pairs one large sans statement with readable prose and a compact ruled archive aside. Concept notes are borderless, shadowless columns defined only by an Archive Ink top rule, mono label, and 15px Reading Graphite copy. Notes describe interaction, material direction, intended setting, and archive caveats as directions—not engineered specifications.

### Detail Collaboration Band

Use Deep Paper to close the dossier with a large Pixelify question, restrained English/Korean inquiry copy, and the existing primary button. The action uses the confirmed public inquiry address and a PM-specific subject; on mobile the band stacks copy above the button without centering either.

### Related Objects

Related entries are a compact continuation of the archive: a Deep Paper image stage, PM identifier, short uppercase title, and accented status. Keep them flat and let only the image scale to 1.025 on hover. The grid moves from four columns to two at 1120px and one at 420px.

### Pixel Mark

The square face is a code-native signature used at 28px in navigation and 94px inside the About window. It uses square pixel eyes and a three-part mouth; it is decorative where nearby text already supplies meaning.

## Do's and Don'ts

### Do:

- Do keep every major page surface within the Warm Paper and Deep Paper family.
- Do show retro-futurist object renders large, softly lit, and free from text overlays.
- Do keep status, IDs, filenames, and REALITY metadata compact and catalog-like.
- Do pair English navigation and labels with concise Korean support where the approved composition does.
- Do preserve visible focus states, meaningful image alternatives, semantic structure, and the reduced-motion fallback.
- Do structure object details as calm dossiers with visible state, provenance-style metadata, concept caveats, and one focused collaboration path.
- Do convert ledger cells into label/value rows and preserve evidence order on mobile.

### Don't:

- Don't introduce neon cyberpunk color, heavy gradients, gaming HUDs, or generic AI-product styling.
- Don't turn the website into a presentation board, device mockup, poster collage, or grid of floating cards.
- Don't switch sections or the footer into a dark theme; contained charcoal elements are the limit.
- Don't use pixel type for paragraphs, long Korean copy, or ordinary body text.
- Don't add excessive color, shadow, animation, rounded pills, or childish decoration around the objects.
- Don't imply that illustrative renders are manufactured products or production-ready goods.
- Don't turn a concept dossier into an ecommerce page or fill it with prices, ratings, inventory, purchase controls, or unverified specifications.
