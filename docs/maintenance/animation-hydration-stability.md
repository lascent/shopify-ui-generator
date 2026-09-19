# Animation and Hydration Stability

## Fixed repeated fade / re-animation

The builder canvas previously allowed the generated `float` preset to animate the **entire preview container forever**. That made some generated storefronts look as if they were fading/restarting over time.

The preview now:
- enters once
- stays fully visible
- never loops opacity
- never loops the whole page container
- allows only subtle transform-only media loops

Section entrance effects also keep opacity at 1, so scrolling/generation cannot create repeated fade-outs.

## `bis_skin_checked` hydration warning

`bis_skin_checked` is injected into HTML by a browser extension before React hydrates. The root now uses `suppressHydrationWarning`, plus a tiny targeted observer that removes only the `bis_skin_checked` attribute before/while the application hydrates.

If another extension injects different attributes, testing localhost in an Incognito window with extensions disabled is still the cleanest diagnostic.
