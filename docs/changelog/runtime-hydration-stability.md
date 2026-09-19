# Release 20 Runtime + Hydration Hotfix

## Fixed

### 1. `useAutoHideHeader is not defined`
Restored the missing `useAutoHideHeader()` hook used by `ReferenceHeader`.

The hook now:
- finds the correct scroll container
- hides the storefront header while scrolling down
- restores it while scrolling up
- keeps the header visible near the top
- throttles scroll updates with `requestAnimationFrame`
- cleans up scroll listeners and pending animation frames

### 2. Development hydration warning caused by injected browser-extension attributes
The screenshot showed the extra attribute:

`bis_skin_checked="1"`

That attribute is not rendered by the application. It is injected into the page by a browser/security extension before React hydrates.

The project already had hydration guards on `<html>`, `<body>`, and the initial client mount. This hotfix adds a development-only pre-hydration sanitizer using Next.js `Script` to remove a small set of known extension-injected attributes before React hydration:

- `bis_skin_checked`
- `cz-shortcut-listen`
- `data-new-gr-c-s-check-loaded`
- `data-gr-ext-installed`

The sanitizer is development-only and automatically disconnects after startup.

## Validation
- TypeScript/TSX syntax parse: 0 syntax errors across project source files.
- `scripts/verify-project.cjs`: passed.
- No raw `<script>` regression; the hydration sanitizer uses Next.js `Script`.
