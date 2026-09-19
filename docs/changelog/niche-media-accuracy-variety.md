# Release 29 — Niche Media Accuracy + Variety Upgrade

## Goal
Make niche-generated storefront imagery much more accurate and visually varied, especially for categories like:
- cars
- phones / smartphones
- seafood
- watches
- glasses / eyewear
- kitchen appliances
- sofa / couches
- beds / mattresses

## What was upgraded
- Added stronger niche-aware media routing for all major requested categories.
- Added curated fallback image pools for watches, eyewear, seafood, kitchen appliances, sofas, and beds.
- Improved phone accuracy further so phone categories stay phone-focused.
- Added role-based media diversity offsets so hero, story, collection, and product images are less likely to reuse the same picture patterns.
- Disabled hero-video auto mode for sensitive niche categories where precise product imagery is more important than generic motion content.
- Added more dedicated category presets so the generator now understands these niches better at the store-structure level too, not just the image level.

## Result
Generation should now feel closer to a **10/10 niche storefront preview**:
- more accurate category matching
- fewer wrong images
- more different pictures across the page
- stronger product-category identity
