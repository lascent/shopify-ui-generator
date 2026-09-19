# Release 10 Runtime Fix

Fixed two errors shown in the Next.js development overlay:

1. Removed the raw `<script>` tag from `src/app/layout.tsx` that caused React/Next.js to warn about a script being rendered inside a React component.
2. Restored all missing storefront hero components, including `HeroSplit`, plus the product grid/mobile rendering helpers that were accidentally omitted from the previous Release 10 package.

The scroll-aware header and the new fashion/editorial generation updates remain in this build.
