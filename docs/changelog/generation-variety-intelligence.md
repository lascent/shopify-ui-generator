# Release 15 — Generation Variety, Layout Intelligence, Header/Footer Expansion

## What was upgraded

### 1) Bigger design recipe system
Expanded the recipe library from **84** to **102** curated store-generation recipes.

Added more category-specific combinations for:
- fashion
- shoes
- accessories
- home
- beauty
- food
- outdoor
- kids
- tech

This improves:
- layout diversity
- header/footer variation
- pricing style variation
- product presentation variation
- overall design output freshness

### 2) Better prompt-to-layout matching
Generation is now more accurate when the prompt includes intent such as:
- luxury / premium / editorial
- gallery / lookbook / masonry
- comparison / specs / pricing tables
- subscription / membership / bundles
- support / trust / FAQ / shipping
- video / motion / animated / cinematic
- promo / launch / sale / drop

The generator now biases:
- header architecture
- hero format
- product layout
- footer style
- pricing style
- card style
- media behavior
- overall density / rhythm

### 3) Stronger header/footer variety
More accurate routing for prompts such as:
- mega menu / catalog nav
- side navigation / sidebar nav
- newsletter footer
- editorial footer
- support / trust / legal footer

This helps generated outputs differ structurally instead of only changing colors.

### 4) More product section variety
The generator now responds more intelligently to prompts requesting:
- gallery layouts
- comparison layouts
- bundle / kit / subscription layouts
- editorial product storytelling
- spec-heavy tech layouts

### 5) Better section planning
Section planning now adds smarter optional sections when the prompt suggests:
- video / motion story
- community / social proof
- comparison modules
- campaigns / drops / launches

## Main files changed
- `src/lib/design-system.ts`
- `src/lib/generator.ts`

## Result
Release 15 makes generation feel much less repetitive by improving:
- header diversity
- footer diversity
- product layout diversity
- prompt accuracy
- design structure variety
- premium store output quality
