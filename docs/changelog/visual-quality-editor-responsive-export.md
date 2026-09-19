# Release 19 — Visual AI Critic, Advanced Editor, Responsive V3, Export Foundation

## 1) Visual AI Critic + automatic repair

The quality engine was expanded into a more useful visual critic. It now evaluates:
- body and button contrast
- page section count
- repeated section types
- product and collection depth
- missing CTA content
- crowded navigation
- excessive hero wrapping risk
- conflicting layout density
- duplicate product media / names
- heavy blur + glass performance risk
- autoplay media combined with looping motion
- mobile-hidden content overload
- high-energy looping animations

The inspector now displays a live 0–100 critic score plus accessibility, layout, and mobile sub-scores.

The **Auto fix** action repairs safe issues automatically, including:
- low contrast text
- low contrast button text
- excessive looping motion
- overlong motion duration / distance
- incompatible dense-grid + airy-density combinations
- overly large mega-typography on long hero titles
- excessive navigation items
- heavy blur settings
- overlong section stacks

Generated candidates are also auto-repaired before final quality scoring and anti-repeat selection.

## 2) Advanced live storefront editor

A new Advanced Editor is available in the inspector.

It supports live editing for:
- hero kicker
- hero heading
- hero body
- CTA text
- announcement text
- primary / accent / background / surface colors
- corner radius

Section builder controls now support:
- move section up / down
- duplicate section
- hide / show section
- hide section on mobile
- delete optional sections
- add new sections
- per-section spacing
- per-section alignment

The product section is protected from accidental deletion.

## 3) Responsive Engine V3

Responsive behavior was separated into:
`src/lib/responsive-engine.ts`

The engine now has dedicated mobile/tablet transformations for:
- complex hero layouts
- dense product systems
- comparison / spec layouts
- heavy footer architectures
- mega-menu / side-nav / category-bar headers
- media behavior
- motion intensity
- typography scaling
- section prioritization

Mobile also reduces unnecessary loop motion and caps motion distance / media zoom for smoother performance.

## 4) Production export foundation

A new export engine was added:
`src/lib/project-export.ts`

**Export project bundle** produces a portable JSON bundle containing generated files for:
- design genome JSON
- CSS design tokens
- React storefront starter component
- Shopify Online Store 2.0 Liquid hero section
- Shopify `settings_schema.json`
- Shopify `templates/index.json`
- export README

This is intentionally a foundation rather than claiming to be a complete deploy-ready Shopify theme. Real Shopify product / collection bindings still need to be connected to a store.

## 5) Accessibility / performance guards

Added storefront guards for:
- `prefers-reduced-motion`
- mobile touch target sizing
- reduced mobile animation load
- media rendering optimizations

## Main files added
- `src/components/builder/advanced-editor.tsx`
- `src/components/builder/visual-critic.tsx`
- `src/lib/responsive-engine.ts`
- `src/lib/project-export.ts`

## Main files upgraded
- `src/lib/design-quality.ts`
- `src/components/builder/left-panel.tsx`
- `src/components/builder/inspector.tsx`
- `src/components/storefront/storefront-preview.tsx`
- `src/store/editor-store.ts`
- `src/types/design.ts`
- `src/app/globals.css`
- `scripts/verify-project.cjs`
- `start-windows.bat`
