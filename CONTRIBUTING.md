# Contributing to Shopify UI Generator

Thanks for considering a contribution.

## Before you start

- Use Node.js 20 or newer.
- Create a feature branch from the latest main branch.
- Keep changes focused. Avoid unrelated rewrites.
- Preserve existing design-generation behavior unless the change intentionally improves it.

## Local setup

```bash
npm run setup
npm run dev
```

Before opening a pull request, run:

```bash
npm run verify
npm run typecheck
npm run build
```

If a command cannot run because of an environment or network limitation, explain that clearly in the pull request.

## Pull requests

A good pull request should include:

- a short description of the problem
- what changed
- screenshots or short recordings for visible UI changes
- how the change was tested
- any known limitations

For generator changes, compare multiple generations and make sure changes do not reduce niche accuracy, responsive behavior, accessibility, or design diversity.

## Coding guidelines

- Prefer composition over large category-specific duplicate components.
- Keep generated storefront behavior accessible on keyboard and touch devices.
- Prefer transform/opacity for animation.
- Respect `prefers-reduced-motion`.
- Avoid adding large dependencies unless there is a clear benefit.
- Do not commit API keys, secrets, generated `.next` files, or `node_modules`.

## Issues

Use GitHub Issues for reproducible bugs and feature proposals. Include the prompt/category used when reporting generator issues.
