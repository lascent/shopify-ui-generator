# Release 18 — AI Design Planner, Architecture Cleanup, Real Commerce Interactions

## 1) Structured AI Design Planner
A new planning layer now sits in front of generation.

New file:
- `src/lib/design-planner.ts`

It turns the user's direction into a structured plan containing:
- category
- confidence
- commerce intent
- design summary
- prompt signals
- header / hero / product / footer preferences
- density and section rhythm
- archetype
- pricing style
- product card style
- media behavior
- storefront copy suggestions

The built-in planner still works with no API key.

## 2) Optional server-side AI planner
New route:
- `src/app/api/design-plan/route.ts`

If `OPENAI_API_KEY` is present, StoreStudio requests a richer structured design plan from the Responses API, validates the returned enums, then merges it with the local fallback plan.

If the API is unavailable or no key is configured, generation automatically uses the local structured planner instead. The app does not become dependent on an external API.

Environment setup:
```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.6-luna
```

## 3) Smarter storefront copy
When the user enters a direction, the planner can now influence:
- hero kicker
- hero headline
- hero body copy
- CTA wording
- announcement bar
- navigation labels

This makes the generated store content better match the requested niche and mood instead of only switching layout properties.

## 4) Architecture cleanup
Large responsibilities were moved out of the storefront generator:
- prompt interpretation -> `src/lib/design-planner.ts`
- commerce state + overlays -> `src/components/storefront/commerce/commerce-provider.tsx`
- AI server integration -> `src/app/api/design-plan/route.ts`

This reduces the amount of generation and interaction logic that has to remain inside the large storefront preview file.

## 5) Real Quick View
Product cards now open a real Quick View modal with:
- product image
- product name and description
- price / compare-at price
- review information
- color choices
- category-aware size choices
- quantity controls
- Add to cart
- Wishlist toggle
- shipping / returns information

## 6) Working cart drawer
The generated storefront now includes a functional cart preview:
- add items from product cards
- add items from Quick View
- quantity controls
- remove items
- subtotal calculation
- visible cart item count in the header
- checkout preview CTA

## 7) Working wishlist state
Wishlist buttons now actually toggle state instead of being decorative only.

## 8) Better generation validation
`src/lib/design-quality.ts` now includes a `qualityAudit()` system that checks:
- section count
- body text contrast
- button contrast
- motion extremes
- conflicting layout density
- excessive hero typography
- autoplay media + looping animation combinations

Generation penalizes or rejects outputs with blocking quality issues before displaying them.

## 9) Generation mode wording retained
The regular-user wording remains:
- **Keep Current**
- **Try Variations**
- **Create New Design**

## Verification
`scripts/verify-project.cjs` now includes Release 18 checks for:
- structured planner
- optional AI route
- commerce provider
- Quick View
- Cart Drawer
- quality audit
- previous Release 17 regression checks
