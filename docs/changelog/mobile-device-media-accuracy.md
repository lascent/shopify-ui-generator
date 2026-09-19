# Release 28 — Phone / Smartphone Media Accuracy Upgrade

## What changed
- Added dedicated **phone / smartphone / iPhone / Android** media routing.
- Added a curated fallback image pool for phone-related prompts so phone categories no longer fall back to broad tech imagery like laptops or desktop computers.
- Prioritized curated phone media before semantic generic tech media for niche phone searches.
- Disabled hero video auto-selection for phone-focused storefronts to avoid unrelated broad-tech video results.
- Added a dedicated **phone category domain preset** so phone storefronts generate more phone-specific navigation, collections, filters, specs and product naming.
- Improved label cleaning so **Smartphones & Accessories** behaves more like **Smartphones** instead of mixing unrelated accessory wording.

## Result
When the user searches or generates with categories like:
- Phones
- Smartphones
- iPhone & iOS Phones
- Android Phones
- Refurbished Phones
- Phone Accessories

…the generator is much more likely to show actual phone imagery instead of laptops, monitors or desktop computers.
