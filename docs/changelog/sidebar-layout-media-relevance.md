# Release 26 — Sidebar Fit + Generate Actions + Niche Media Relevance

## UI fixes

- Fixed Exploration buttons so long labels such as **Create New Design** stay inside their button.
- Removed the narrow two-column Scope / Exploration layout that could squeeze controls on large desktop screens.
- Exploration now uses a stable three-button grid with wrapped, centered labels.
- Category suggestion rows and quick-category chips now wrap safely instead of overflowing.
- Generate Scope select is width-safe inside the sidebar.

## Generate actions promoted

- **Generate** and **Generate 3** now appear directly after Design Direction, before Scope and Exploration.
- Labels are shorter and fit better in the sidebar.
- Generate 3 still creates the same A/B/C variant workflow.

## Better category imagery

- Expanded deterministic image candidates from **1,944** to **3,240**.
- Added high-signal semantic media routing for:
  - Cars & Automotive
  - Smartphones & Mobile
  - Seafood & Fresh Fish
  - Watches
  - Glasses & Eyewear
  - Kitchen Appliances
  - Sofas & Couches
  - Beds & Mattresses
- Cars now use automotive-specific search queries rather than inheriting the broad Accessories image pool.
- Added **12 curated car-photo fallbacks** so Cars can still show vehicle imagery when the semantic source is unavailable.
- Product galleries continue to generate four images per product with niche-specific context.

## Retained scale

- 200 curated design directions
- 450 prompt-ready categories
- 50 dedicated niche profiles
