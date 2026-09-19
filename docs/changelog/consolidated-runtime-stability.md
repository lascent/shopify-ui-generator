# StoreStudio Release 10 — Full Latest Fixed Build

This package consolidates the latest StoreStudio work into one clean project folder.

## Critical fixes included
- Removed the raw `<script>` injection that caused the React console error in `src/app/layout.tsx`.
- Restored and verified `HeroSplit` and all referenced `Hero*` storefront components.
- Added the latest RITUAL/editorial fashion direction and smooth scroll-aware header tween.
- Keeps the unified left configuration workspace, expanded layouts, responsive mobile rendering, image fallback system, product-layout variety, and motion presets from previous phases.
- `start-windows.bat` now deletes stale `.next` cache and `tsconfig.tsbuildinfo` before startup so an old compiled error cannot survive into the new build.
- Added `scripts/verify-project.cjs` to validate the two exact runtime failures seen previously before Next.js starts.

## Important installation note
Extract this ZIP into a **new folder**. Do not extract it on top of an older StoreStudio folder. Then run `start-windows.bat`.
