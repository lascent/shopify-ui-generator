# Release 23 — Multi-Page Store Generator + Section Regeneration + Image Intelligence

## 1) Multi-page storefront generator
The live preview can now switch between eight generated storefront pages:

- Home
- Collection
- Product
- Search
- Cart
- About
- Contact
- FAQ

A new page selector sits next to the desktop/tablet/mobile preview controls.

The pages share the generated design system, typography, palette, product data, niche profile and commerce state.

### Product page
The generated product page includes:
- multi-image gallery
- product pricing and compare-at pricing
- ratings
- color variants
- quantity selector
- wishlist
- Add to Cart
- category-aware specification table
- related products

### Collection page
Includes:
- niche/category title
- category-specific filter controls
- generated product merchandising

### Search page
Includes:
- live product search
- result count
- generated product cards
- empty-state handling

### Cart page
Includes:
- shared commerce cart state
- quantity controls
- remove action
- subtotal calculation
- checkout CTA

## 2) Section-level regeneration
Advanced Editor now supports regenerating one section without replacing the whole storefront.

Actions:
- Regenerate
- Make premium
- Make simpler
- More conversion-focused
- Try another layout

The regeneration engine can update:
- section variant
- spacing
- alignment
- eyebrow/copy direction
- product layout
- card style
- pricing style
- media behavior
- contextual imagery

Hero regeneration has the same action modes.

## 3) Image Intelligence
The media system now creates a four-image gallery for each product and dynamically allocates enough unique image slots for the complete store.

A media audit checks:
- total assets
- unique assets
- repeated media
- missing semantic image context
- missing product galleries

Advanced Editor displays the media quality score and includes a **Refresh media** action.

### Better niche image relevance
The media API no longer races a semantic image provider against generic placeholders.

Image candidates are tried in priority order:
1. niche/semantic image source
2. curated category fallback
3. generic fallback
4. generated SVG fallback if all remote sources fail

This makes prompts such as cars, seafood, smartphones, watches, sofas, beds and kitchen appliances much more likely to retain relevant imagery.

## 4) Multi-page export foundation
Project Export now includes a generated eight-page manifest plus Shopify OS 2.0 template foundations for:
- home
- collection
- product
- search
- cart
- About
- Contact
- FAQ

## 5) Reliability fixes
- fixed mixed `??` / `||` expression in generated collection title normalization
- product media allocation now scales with collection/product counts
- existing Release 20 runtime/key guards remain active

## Validation
- `scripts/verify-project.cjs` passed Release 23 checks
- 144 curated design directions retained
- 330 prompt-ready categories retained
- 39 dedicated niche profiles retained
- TypeScript/TSX syntax scan: 0 syntax errors across 27 source files
