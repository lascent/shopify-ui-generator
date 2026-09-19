# Release 13 — Layout Template Expansion Update

## What was expanded

### 1) More curated layout templates
- Expanded curated recipe library from **57 → 84** layout recipes.
- Added many more combinations for:
  - fashion
  - shoes
  - accessories
  - home
  - beauty
  - food
  - outdoor
  - kids
  - tech

### 2) Better recipe mixing during Generate
- Generation no longer relies on one recipe only.
- The generator now selects:
  - a main recipe
  - a secondary hybrid recipe
- It can blend header, hero, product grid, footer, density, pricing style, and card style.
- This produces more visible structural differences between generations.

### 3) Stronger layout diversity
New recipe directions include examples like:
- runway atelier
- concept boutique
- running lab
- boutique gallery
- showroom
- routine lab
- subscription box
- expedition
- learning hub
- creator studio
- startup launch
- clean market

### 4) Better template variety for users
This update helps reduce the feeling that only colors change.
Now layout changes are more likely to affect:
- header architecture
- hero structure
- product presentation
- pricing format
- section density
- footer composition

## Main files updated
- `src/lib/design-system.ts`
- `src/lib/generator.ts`

