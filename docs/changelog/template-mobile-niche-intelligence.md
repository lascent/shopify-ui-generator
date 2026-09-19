# Release 16 — Premium Templates, Better Mobile Adaptation, Niche Category Intelligence

## Implemented upgrades

### 1) Premium generation recipe expansion
The curated generation recipe system was expanded from **102** to **120** recipes.

New premium recipes were added across all major store groups:
- fashion
- shoes
- accessories
- home
- beauty
- food
- outdoor
- kids
- tech

This gives the generator more structural variety for:
- headers
- hero sections
- product sections
- pricing formats
- card systems
- footer systems

### 2) Better prompt understanding for niche store categories
The category taxonomy was expanded to support more specific Shopify-style businesses.

Examples added:
- anime streetwear
- techwear fashion
- golf apparel
- Montessori toys
- baby skincare
- barefoot shoes
- dance shoes
- recovery slides
- designer sunglasses
- laptop bags
- travel organizers
- scalp care
- lip care
- specialty matcha
- protein snacks
- hot sauces
- aroma diffusers
- smart lighting
- pickleball gear
- overlanding equipment
- smart rings
- sim racing gear
- NAS / storage
- mobile filmmaking gear

The taxonomy now includes **204** category entries overall.

### 3) Better mobile generation quality
A new adaptive mobile/tablet optimization layer was added inside the storefront preview.

It automatically makes heavy desktop layouts more usable on smaller screens by remapping complex structures such as:
- full bleed editorial heroes
- dual campaign heroes
- image collage heroes
- dense retail grids
- comparison/spec layouts
- large editorial rails
- oversized desktop footers

Examples of mobile optimization:
- `fullBleedEditorial -> showcase`
- `dualCampaign -> splitMedia`
- `comparison -> featuredPlusRail`
- `denseRetail -> cards`
- `oversizedBrand -> columns`

This improves mobile readability, spacing, flow, and content density.

### 4) Cleaner mobile section flow
On mobile, large section stacks are reduced to a more focused set so generated pages feel more polished and less overloaded.

### 5) More premium homepage and product-section combinations
Additional recipe combinations were added for:
- luxury editorial storefronts
- conversion-first storefronts
- campaign stores
- niche product labs
- boutique gallery layouts
- creator-tech stores
- subscription/product-bundle stores

## Main files updated
- `src/lib/design-system.ts`
- `src/lib/category-taxonomy.ts`
- `src/components/storefront/storefront-preview.tsx`

## Result
Release 16 makes the generator:
- more premium
- more varied
- better on mobile
- smarter with niche category prompts
- stronger in homepage + product-section combinations
