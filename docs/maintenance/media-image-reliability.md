# Media Image Reliability

## Problem
Generated product and collection images were pointing directly at a dynamic third-party image URL. Some browsers, privacy extensions, networks, or the provider itself can block or fail those hotlinked requests, which leaves broken image icons and alt text in product cards.

## Fix in this build
Generated image URLs now use a same-origin Next.js endpoint:

`/api/media/image?category=...&index=...&role=...`

The route tries multiple remote image sources server-side in parallel:

1. category-aware dynamic image source
2. seeded Picsum fallback
3. curated stable Unsplash fallback

If every network source is unavailable, StoreStudio returns a generated SVG art fallback instead of a broken image icon.

## Benefits
- no direct browser hotlink dependency for generated photos
- automatic provider fallback
- works better with privacy extensions and stricter browsers
- cached media responses
- existing 1,944 deterministic image candidate system remains intact
- base presets now use the same media proxy too

## Note
Real photography still requires an internet connection. If the computer is completely offline, the built-in SVG fallback will render so the layout remains visually complete.
