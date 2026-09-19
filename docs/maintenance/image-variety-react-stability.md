# Image Variety and React Stability

## Fixed
- Added topic-aware media URLs so collection and product images are more unique within the same category.
- Expanded stable fallback image pools per category to reduce repetitive images when remote media sources fail.
- Fixed the React list key warning in the comparison grid.
- Made the initial `createdAt` deterministic to reduce avoidable SSR/client differences.

## Note about the hydration warning
If you still see `bis_skin_checked` in the hydration overlay, that attribute is usually injected by a browser extension before React hydrates. Try opening the app in Incognito or disabling the extension for localhost.
