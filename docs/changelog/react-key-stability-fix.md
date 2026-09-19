# Release 20 Duplicate-Key Hotfix

## Fixed

The Next.js development overlay reported repeated React key warnings such as:

- `Encountered two children with the same key, 'Performance'`
- Collection strip warnings around `key={item.title}`
- Header / hero navigation warnings when generated labels repeated

## Root cause

Niche design directions can provide fewer collection names than the base storefront contains. The generator previously reused those planned titles with modulo indexing. For example, a 3-title automotive plan applied to 4 collection cards could become:

- Performance
- Electric
- Daily drivers
- Performance

That produced duplicate React keys and duplicate visible labels.

## Changes

### Generator normalization
- Added case-insensitive string de-duplication for generated navigation labels.
- Added unique collection-title normalization.
- Removed modulo cycling for collection titles.
- Removed modulo cycling for planner product content; extra preset products now keep their original identity instead of duplicating generated product names.
- Re-normalizes collection and navigation identities after media refresh.

### React key hardening
Generated-data lists now use collision-safe keys that include the item index where appropriate, including:
- collection cards
- generated navigation links
- hero navigation labels
- footer list items
- shop-the-look hotspots
- generated footer columns

### Verification guard
`scripts/verify-project.cjs` now checks that:
- `useAutoHideHeader` still exists
- collection/product planner content is not modulo-cycled
- collection cards use collision-safe keys
- generated nav and collection titles are normalized

## Result

Design directions such as `cars`, where both navigation and collection content may contain words such as `Performance`, no longer trigger duplicate-key warnings simply because repeated generated labels are rendered in the same list.
