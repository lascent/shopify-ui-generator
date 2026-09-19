# Release 12 — Pro Motion, Variety, and Direction Accuracy Update

## Included upgrades

### 1) More professional motion system
- Expanded motion preset pool from **20 → 26** presets.
- Added new professional presets:
  - `luxuryFlow`
  - `gridPulse`
  - `spotlightReveal`
  - `elasticRise`
  - `softZoom`
  - `showcaseLift`
- Product cards now use richer image hover motion, not only container lift.
- Ambient looping was expanded for luxury / cinematic / soft zoom style directions.

### 2) Better animation variety on every generate
- Generator now tries **14 generation attempts** before selecting the best unique result.
- Motion selection is now prompt-aware and category-aware.
- Different niches bias toward different animation families:
  - Luxury / editorial → softer premium motion
  - Tech → sharper structured motion
  - Outdoor / performance → stronger lift / spotlight motion
  - Home / beauty → calm soft reveal motion
  - Kids → lighter spring / elastic motion

### 3) More accurate “Describe direction” AI behavior
- Prompt parsing now reads more than simple keywords.
- It scores:
  - niche/category
  - luxury/editorial tone
  - minimal vs bold direction
  - dark mood
  - technical / performance language
  - promo / retail / conversion intent
- The design description is now more descriptive and aligned to the generated result.

### 4) More category coverage
- Expanded category taxonomy with many more prompt-ready niches across:
  - Fashion
  - Shoes
  - Accessories
  - Home
  - Beauty
  - Food
  - Outdoor
  - Kids
  - Tech
- Total prompt-ready categories increased through expanded keyword coverage and niche mapping.

### 5) More layout variation support
- Section planning now uses more optional sections for stronger structure variety.
- Direction input placeholder was improved so users can give more accurate generation instructions.
- The generator resources panel now reflects the larger motion set.

## Main files updated
- `src/lib/generator.ts`
- `src/components/builder/left-panel.tsx`
- `src/components/storefront/storefront-preview.tsx`
- `src/lib/category-taxonomy.ts`
- `src/types/design.ts`

