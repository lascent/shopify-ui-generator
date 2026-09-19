# Release 14 — Advanced Pricing + Premium Media Upgrade

## Implemented

### 1) Advanced pricing blocks
The product pricing system has been upgraded to feel more like a real premium commerce experience.

Added or improved:
- compare-at pricing support from preset product data
- richer discount logic
- save amount text
- save percentage text
- installment messaging
- bundle pricing messaging
- tiered pricing messaging
- shipping/trust notes inside price blocks
- more premium default price presentation

### 2) Better preset product data
Built-in store products are now automatically enriched with:
- compare-at prices on selected items
- stronger merchandising metadata
- preserved ratings / reviews / badges / colors

### 3) Premium product media micro-layouts
Product cards now show richer media UI depending on the generated media behavior:
- gallery mode → thumbnail rail + 360 view pill
- hoverSwap mode → Front / Detail / Lifestyle pills
- hoverVideo / autoplayVideo mode → preview clip bar
- parallax / maskedReveal mode → studio light / texture zoom chips
- default mode → editorial close-up info row

### 4) More premium product cards overall
The product cards now feel more premium with:
- richer price presentation
- better compare-at display
- visible media micro-layout sections
- preserved swatches / ratings / chips / quick view / wishlist

## Main files changed
- `src/components/storefront/storefront-preview.tsx`
- `src/lib/presets.ts`

## Goal
This pass improves the generator so the product sections feel more like:
- a modern premium Shopify-style storefront
- a more believable product merchandising system
- a richer media-driven ecommerce experience
