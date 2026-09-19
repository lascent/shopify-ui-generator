# Composition, Interaction, and Responsive Intelligence

## Base preserved from Release 36
Release 37 extends the Release 36 StoreStudio / Shopify Generator architecture instead of replacing it. Existing motion presets, header/hero/product/footer systems, media routing, design-direction search, responsive preview, editor, history, locks, multi-page previews, commerce interactions, export foundation, and the 2,000 design directions remain in place.

## New Release 37 architecture
Release 37 adds higher-level design intelligence through the new `src/lib/intelligence/` engines:

- `art-direction-engine.ts` — compatible art-direction profiles and niche-aware visual language.
- `composition-engine.ts` — page composition families, section sequencing, density, rhythm, alignment, balance and merchandising decisions.
- `typography-engine.ts` — curated typography pair selection instead of relying on one font family for every role.
- `product-engine.ts` — product card anatomy and pricing-composition decisions.
- `interaction-engine.ts` — interaction profiles, density, responsive feedback and component-specific behavior.
- `motion-language.ts` — coordinated use of existing Release 36 motion presets rather than unrelated animation effects.
- `novelty-engine.ts` — design fingerprints and similarity/novelty evaluation against recent generations.

## Structural section rendering
Release 37 includes `src/components/storefront/sections/IntelligentSectionRenderer.tsx`, which connects composition/section variants to real storefront markup. Secondary sections no longer depend only on cosmetic metadata; layout choices can alter actual structure and content hierarchy.

The new section layer covers collection, story, testimonial, FAQ, newsletter, campaign, comparison, social/UGC, features and related secondary-section patterns.

## Product and interaction rendering
`src/components/storefront/interactions/product-interactions.ts` adds category/art-direction aware product interaction behavior. Product presentation now has a higher-level interaction/anatomy layer above the existing Release 36 motion presets.

## Generator integration
The generator pipeline was extended so explicit prompt/category/niche direction is resolved before compatible composition, typography, interaction, motion and merchandising choices. Existing generation locks are preserved and applied after design mutation so user constraints remain authoritative.

## Responsive strategy
Release 37 composition data participates in responsive rendering instead of treating mobile only as stacked desktop content. Desktop-heavy patterns are reduced or transformed on smaller previews, while critical product information remains accessible without hover.

## Media intelligence
Existing Release 36 niche-aware media routing is preserved. Release 37 extends media intent with stronger role-aware usage so hero, product, detail, lifestyle, collection, story and social contexts can receive differentiated queries and confidence handling.

## Novelty and anti-repetition
Release 37 adds design fingerprints covering structural and visual DNA. Recent designs can be compared before accepting a new design so `Create New Design` has stronger structural differences than palette-only variation.

## Quality / anti-AI checks
The quality layer has been extended to understand repetition/coherence at a higher level, including composition, section diversity, typography, product anatomy, pricing hierarchy, interactions and repeated structural patterns.

## Backward compatibility
The new Release 37 fields are additive. Existing Release 36 genomes and render paths remain supported. Release 37 engines augment existing data rather than removing the established header, hero, product, footer, motion, media and commerce systems.

## Validation status
`node scripts/verify-project.cjs` passes all retained project checks through the current Release 35/36 integration baseline, including the existing 2,000 curated directions, 521 searchable categories, 55 niche profiles, design library, responsive preview and media systems.

A full dependency-backed `npm run typecheck` and `npm run build` has not been certified in this environment because package installation/registry access was unavailable during the Release 37 work. This ZIP should therefore be treated as the current Release 37 implementation snapshot rather than a build-certified final release.
