# Release 24 — Professional Visual QA, Shopify Export V2, A/B/C Variants and Scale Expansion

## Release goals

Release 24 raises the generator's quality-control and production-export layer while expanding the design catalog to the requested exact targets:

- **200 curated design directions**
- **450 unique prompt-ready categories**
- **50 dedicated niche profiles**

## Visual QA V2

`src/lib/design-quality.ts` now exposes `qualityAuditV2()` and `autoRepairDesignV2()`.

The V2 audit extends the existing quality system with checks for hero copy length, duplicate navigation and collections, duplicate section IDs, repeated section variants, gallery coverage, filter depth, repeated merchandising copy, dense mobile layouts, media quality and whole-store visual coherence. It reports a readiness state, weakest area, media score, coherence score and repair recommendations.

The Visual Critic UI now displays these V2 results and includes an **Auto fix V2** action.

## Hard regeneration locks

Hero, product and layout locks are now re-applied after planner, content and media mutations. This makes lock behavior deterministic during whole-store regeneration instead of allowing later generation stages to overwrite locked areas.

Try Variations and Create New Design modes also intentionally avoid repeating the current motion preset when alternatives are available.

## A/B/C generation

The generator can create three intentionally different candidate storefronts from one prompt. Candidate selection uses the existing quality and novelty scoring system plus Visual QA V2.

The canvas provides a side-by-side Variant A / B / C comparison with a **Use this** action. Selecting a variant makes it the active design and records it in design history.

## Shopify OS 2.0 export V2

The project export layer now produces a downloadable Shopify theme ZIP without requiring a browser-side ZIP dependency.

The generated theme foundation includes:

- `layout/theme.liquid`
- responsive base CSS and theme JavaScript
- generated header, home, product-grid and footer sections
- main product, collection, search, cart and page sections
- product-card, price and cart-drawer snippets
- Theme Editor settings schema and settings data
- JSON templates for home, product, collection, search, cart, About, Contact and FAQ
- locale data
- product variant selectors and Add to Cart form
- collection sorting
- search results
- cart UI / AJAX cart-count foundation
- reduced-motion styling
- generated design JSON and token metadata

The export UI exposes a direct **Export Shopify OS 2.0 ZIP** action.

## Catalog expansion

### Curated directions

The curated recipe catalog now contains exactly **200** design directions. Added recipes cover more editorial fashion, footwear, accessories, home, beauty, food, outdoor, kids and technology storefront compositions.

### Prompt-ready categories

The category taxonomy now contains exactly **450 unique prompt-ready categories**. Search continues to include important directions such as cars, smartphones, seafood, watches, eyewear, kitchen appliances, sofas, beds, furniture, beauty, groceries, audio, gaming and outdoor retail.

### Dedicated profiles

The planner now includes exactly **50 dedicated niche profiles**. Newer dedicated profiles include Smartwatches & Fitness Trackers, Luxury Handbags, Makeup & Cosmetics, Hair Care, Lighting & Lamps, Outdoor Furniture, Golf Equipment, Camping & Hiking, Earbuds & Personal Audio, Sneakers and Organic Grocery.

## Validation performed

- `node scripts/verify-project.cjs` — **passed**, including exact Release 24 count checks and integration checks.
- TypeScript/TSX transpile syntax scan — **27 files, 0 syntax errors**.
- The two expanded recipe definitions that initially lacked a section-rhythm argument were corrected before packaging.
- The generated Shopify settings schema was simplified to avoid empty theme-info URLs.

A complete `npm run build` / dependency-backed `npm run typecheck` could not be completed in this environment because `npm install` timed out and no local `node_modules` directory was produced. The project verifier and dependency-independent TypeScript syntax scan both pass; `start-windows.bat` remains configured to install dependencies on a normal connected development machine.
