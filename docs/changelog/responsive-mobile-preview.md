# Release 8 — True Responsive Mobile Preview

This update fixes mobile storefronts that looked squeezed, clipped, or like desktop layouts forced into a narrow phone frame.

## Root cause

StoreStudio runs inside a desktop browser. Tailwind `md:` and `lg:` classes normally respond to the browser viewport, not the simulated phone frame. A 390px phone preview inside a 1400px browser could therefore activate desktop multi-column layouts.

## Fixes

- Mobile preview is now adaptive up to 430px and can shrink with the editor.
- Added container/device-driven responsive rules for 320–430px phone widths.
- Added dedicated mobile product renderers instead of squeezing desktop layouts.
- Product layout families now adapt as:
  - editorial / spotlight / asymmetric / feature split -> full-width feature card + compact mobile tiles
  - comparison / stacked cards / minimal list -> mobile product rows
  - carousel -> touch-friendly snap carousel
  - mosaic -> mobile two-column mosaic with a full-width lead item
  - regular cards / catalog / deals -> responsive compact product tiles
- Testimonials collapse to a readable single-column stack on phones.
- Newsletter becomes a one-column mobile card with a full-width form.
- Footer newsletter and navigation columns no longer render as desktop splits inside the phone preview.
- New hero families (Bento, Split Media, Magazine, Launch, Showcase, Minimal Commerce) receive phone-specific structure and spacing.
- Typography uses container-relative sizing where the narrow preview needs it.
- Very small phone containers (<=350px) stack dense two-column content into one column.
- Added a container-query fallback so narrow exported storefront containers also respond even without the editor's explicit `data-device="mobile"` state.

## Main files changed

- `src/components/builder/canvas.tsx`
- `src/components/storefront/storefront-preview.tsx`
- `src/app/globals.css`
