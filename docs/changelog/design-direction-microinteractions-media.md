# Release 17 — Advanced Design Direction AI, Product Microinteractions, Media Logic

## User-facing generation modes
The old labels were replaced with clearer wording for regular users:

- **Keep Current** — keep the current layout and style and make only small improvements.
- **Try Variations** — create noticeable changes while keeping some of the current design.
- **Create New Design** — generate a very different layout, structure, style, product presentation, footer, and animation direction.

The internal generation behavior still uses the existing safe / balanced / experimental engine, so the clearer labels do not break existing logic.

## Advanced direction understanding
The direction parser now understands more intent beyond category keywords, including:
- gallery / lookbook / masonry intent
- comparison / spec / pricing-table intent
- subscription / membership / replenishment intent
- support / FAQ / trust / shipping intent
- campaign / drop / launch / sale intent
- video / reel / GIF / motion intent

It also includes niche-specific layout intelligence for examples such as:
- anime streetwear
- smart rings
- sim racing
- specialty matcha
- Montessori / learning toys
- hot sauces
- scalp care
- overlanding / expedition gear

These signals can now influence:
- header architecture
- hero architecture
- product system
- footer system
- pricing style
- card style
- media behavior
- page density / rhythm

## Template family expansion
The curated recipe library was expanded from **120** to **144** generation recipes.

New recipe families were added across:
- fashion
- shoes
- accessories
- home
- beauty
- food
- outdoor
- kids
- tech

## Product-card microinteractions
Product cards now include more polished interactive behavior:
- animated wishlist controls
- animated quick-add overlays
- animated swatch selection affordances
- refined hover lift / image motion
- animated quick-view / save actions

## Richer video / GIF placement logic
When the design prompt explicitly asks for video, GIF-style motion, reels, cinematic clips, motion banners, or autoplay loops:
- the generated hero can automatically switch to video mode
- the correct category video pool is selected
- motion-led product cards can use autoplay video on the lead product
- a video-story section is inserted when appropriate
- product media behavior changes to `hoverVideo` or `autoplayVideo`

When the prompt explicitly says image-only / static photography / no video, the generator forces static image behavior instead.

## Validation
`scripts/verify-project.cjs` now checks:
- all referenced hero functions
- critical storefront helpers
- generation quality / anti-repeat wiring
- Release 17 generation labels
- Release 17 media-intent routing
- at least 140 curated recipes

Current verified recipe count: **144**.
