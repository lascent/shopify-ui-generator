# Header Architecture Variants

The previous generator changed the `layout.nav` value but the storefront renderer still used almost the same header structure. This update changes the actual header architecture.

## 9 header architectures

1. Minimal — logo left, simple centered nav, compact actions
2. Floating — announcement strip + centered logo + balanced nav
3. Centered — large centered brand with search/actions and a separate navigation row
4. Split — hamburger/brand on the left, navigation in the middle, locale/actions on the right
5. Stacked — utility strip + centered brand row + full category navigation
6. Search First — large ecommerce search field, category dropdown and secondary catalog navigation
7. Editorial — oversized brand, magazine-style navigation and campaign badge
8. Utility — customer-service/currency utility row with retail navigation below
9. Transparent — dark campaign-style header with high-contrast navigation

## Reference adaptation

The structures are based on the variety visible in the supplied Shopify references rather than copying one theme literally. The generator now chooses header architecture based on the store category and prompt direction.

Examples:
- Tech / electronics: Search First, Stacked, Utility
- Fashion / luxury / editorial: Split, Editorial, Transparent, Centered, Floating
- Beauty: Centered, Editorial, Minimal, Stacked
- Home: Centered, Stacked, Utility, Minimal
- Kids: Floating, Centered, Split, Minimal
- Shoes: Transparent, Split, Floating, Utility
- Outdoor: Transparent, Utility, Split, Minimal
- Food: Editorial, Centered, Minimal, Floating

Repeated generation intentionally avoids the current header architecture where possible, so clicking Generate again produces more visible layout variation.

Mobile headers also adapt per architecture instead of collapsing every desktop header into the same mobile pattern.
