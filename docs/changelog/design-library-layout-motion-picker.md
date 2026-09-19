# Release 25 — Professional Design Library + Layout Families + Motion Packs + Visual Picker

Release 25 turns the existing curated recipe catalog into a user-facing visual design browser so users can deliberately choose a storefront direction instead of relying only on prompt generation.

## Professional Design Library

- All 200 curated design directions are now exposed through a searchable visual library.
- Open it from the top bar or the `Browse 200 designs` action in the Design panel.
- Every direction has a visual thumbnail, style family, layout family, motion pack, density, hero system and product system.
- The library preserves the current shop niche/products/content when a visual direction is applied.

## Filters

Users can browse by:

- Style
- Layout family
- Motion pack
- Density
- Industry/source family
- Favorites
- Recently used
- Free-text search

## Style families

The library classifies designs into professional visual directions such as Luxury, Editorial, Minimal, Premium Commerce, Tech, Bold, Street, Organic, Playful, Scandinavian, Dark, Magazine, Catalog, Storytelling, Sport, Conversion and Campaign.

## Layout families

Release 25 exposes 20 layout families:

- Full-bleed Editorial
- Split Hero
- Product-first
- Marketplace
- Magazine
- Luxury Sparse
- Bento
- Vertical Story
- Horizontal Editorial
- Sticky Retail
- Mega-menu Retail
- Catalog Heavy
- Lookbook
- Comparison-led
- Launch Landing
- Subscription
- Deals
- Story-first
- Single Product
- Mosaic Gallery

## Motion packs

The picker groups the existing production motion system into 16 selectable motion directions:

- No Motion
- Calm
- Smooth
- Editorial
- Luxury
- Cinematic
- Snappy
- Dynamic
- Playful
- Tech
- Magnetic
- Parallax
- Scroll Reveal
- Staggered Grid
- Floating Products
- Hover Rich

## Design actions

Every design can be used as-is or transformed with:

- Use this design
- Generate similar
- Remix this
- Same layout, different style
- Same style, different layout
- Different animation

These actions preserve the user's store content and change the surrounding design system.

## Favorites + recent designs

Design Library favorites and recently used directions are persisted in localStorage, making the visual browser useful across refreshes.

## Scale retained

- 200 curated design directions
- 450 prompt-ready categories
- 50 dedicated niche profiles

## Validation

- `scripts/verify-project.cjs` includes Release 25 checks.
- TypeScript/TSX syntax scan completed with 0 syntax errors.
- Existing Release 8–24 verification remains intact.
