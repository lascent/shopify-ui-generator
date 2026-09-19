# Product Layout Variants

This update fixes the issue where generated storefronts kept using nearly the same product section structure and only changed colors.

## What changed

- Added **6 new product section architectures**:
  - `featureSplit`
  - `asymmetric`
  - `stackedCards`
  - `minimalList`
  - `spotlight`
  - `magazineGrid`
- Expanded the `ProductGridLayout` design type to support the new layouts.
- Updated the generator so product layouts are now **category-aware** and **avoid repeating the current layout** more often.
- Fashion, tech, beauty, home, kids, outdoor, food, accessories, and shoes now pull from broader layout sets.

## Result

When you click Generate, the product section should now change in a much more visible way:
- large feature card + side cards
- editorial asymmetric mix
- stacked split cards
- minimal list/catalog rows
- spotlight hero product
- magazine style collage
- plus the earlier catalog, mosaic, carousel, comparison, cards, etc.

## Main files changed

- `src/types/design.ts`
- `src/lib/generator.ts`
- `src/components/storefront/storefront-preview.tsx`
