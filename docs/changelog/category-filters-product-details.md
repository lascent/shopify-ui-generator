# Release 22 — Dynamic Category Engine + Filters/Specs + Product Detail Experience

## 1. Dynamic Category Engine
The generator now synthesizes a dedicated storefront direction from the full 330-category taxonomy instead of requiring every niche to be manually authored.

For prompt-ready categories it can now infer:
- niche label and base storefront family
- navigation structure
- hero architecture
- product layout
- footer direction
- density and section rhythm
- pricing/card/media behavior
- niche-specific collections
- niche-aware product names and descriptions
- media search context

Dedicated Release 21 profiles still take priority, while the new engine fills the remaining taxonomy automatically.

## 2. Category-specific filters
Generated stores can now carry filter groups into the storefront UI.

Examples:
- Cars: Brand / Type / Price
- Phones & electronics: Brand / Performance / Price
- Furniture: Room / Material / Size
- Appliances: Type / Capacity / Price
- Food: Type / Delivery / Price
- Beauty: Concern / Type / Price
- Fashion: Size / Color / Price

The product section renders these as responsive filter controls with a Clear Filters action.

## 3. Product specifications
StoreProduct now supports structured `specs` metadata.
Dynamic category generation attaches relevant specification rows such as:
- model year / power / range / transmission
- display / processor / memory / warranty
- dimensions / material / assembly / delivery
- capacity / power / dimensions / warranty
- origin / weight / storage / delivery
- ingredients / skin type / usage / size

## 4. Product Detail Experience
The existing commerce Quick View was upgraded into a richer PDP-style experience with:
- main product media
- four-image thumbnail treatment
- product price / compare-at price
- ratings
- Product Details tab
- Specifications tab
- Delivery & Returns tab
- colors / variants
- size selection where relevant
- quantity controls
- Add to Cart
- wishlist
- shipping / returns assurances

## 5. AI planner schema update
The optional OpenAI planner can now return:
- category filters
- product specification objects

The local dynamic planner remains the automatic fallback.

## Validation
- `scripts/verify-project.cjs`: passed
- Release 22 verification checks: passed
- TypeScript/TSX syntax scan: 0 errors
- 144 curated design recipes retained
- 330 prompt-ready taxonomy categories retained
