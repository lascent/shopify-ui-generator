# Open-source release checklist

Before publishing a release:

- [ ] Run `npm run verify`
- [ ] Run `npm run typecheck`
- [ ] Run `npm run build`
- [ ] Confirm `.env.local` and API keys are not committed
- [ ] Check desktop, tablet, and mobile previews
- [ ] Check reduced-motion behavior
- [ ] Check generated image fallbacks
- [ ] Add screenshots / GIFs to the README if available
- [ ] Confirm the MIT license is acceptable for the release
- [ ] Update the version in `package.json`
- [ ] Create a GitHub release/tag

## Repository name

Use:

```text
shopify-ui-generator
```

## Suggested GitHub description

```text
Open-source generative Shopify-style storefront UI designer with composition, interaction, motion, media, and responsive design intelligence.
```

## Suggested topics

```text
nextjs react typescript shopify ecommerce ui-generator design-system motion tailwindcss zustand open-source
```
