# StoreStudio Release 4 — Generative Commerce System

## Implemented

### 100+ Shopify prompt categories
The prompt taxonomy now contains **110 unique niche storefront categories** mapped into 9 visual base families. This keeps rendering maintainable while allowing much more specific prompts.

Examples include:
- streetwear, luxury fashion, maternity, modest fashion, festival clothing
- baby essentials, educational toys, nursery, teen fashion
- sneakers, hiking footwear, luxury footwear
- handbags, jewelry, eyewear, travel accessories
- skincare, makeup, fragrance, salon tools, clean beauty
- coffee, bakery, specialty food, meal kits, beverages
- furniture, bedroom, lighting, office setup, storage, DIY
- camping, fishing, cycling, winter sports, fitness equipment
- phones, PC components, smart home, cameras, audio, laptops, displays, AR/VR

See `SHOPIFY_100_PLUS_CATEGORIES.md`.

### 37 font directions
The typography pool now contains 37 directions, including:
- Inter, Manrope, Poppins, DM Sans, Plus Jakarta Sans, Geist
- IBM Plex Sans, Source Sans 3, Nunito Sans, Outfit, Urbanist, Sora
- Figtree, Archivo, Space Grotesk, Work Sans, Montserrat
- Playfair Display, Libre Baskerville, Cormorant Garamond, Lora
- Bricolage Grotesque, Rubik, Raleway, Karla, Mulish
- Noto Sans, Noto Serif, PT Sans, Merriweather, Crimson Pro
- Josefin Sans, Bebas Neue, Cabin, Quicksand, Exo 2

### 15 hero layout families
- split
- editorial
- centered
- product
- immersive
- statement
- hotspot
- campaign
- beauty editorial
- showcase
- bento
- split media
- minimal commerce
- launch
- magazine

### 11 product layout families
- classic
- editorial
- compact
- lookbook
- catalog
- mosaic
- deals
- carousel
- editorial rail
- comparison
- cards

### AI section composer
Every full/layout generation can now regenerate the page section plan. The engine chooses and reorders:
- collections
- products
- brand/editorial story
- testimonials
- FAQ
- newsletter

Prompt cues such as “reviews”, “FAQ”, “brand story” or “journal” influence which sections are prioritized.

### Expanded motion system
Nine Motion.dev presets control:
- page / preview entrance
- section reveal offset
- stagger timing
- card hover lift
- hover scale
- media zoom
- looping cinematic / floating media motion

Presets:
- calm
- smooth
- editorial
- spring
- dynamic
- cinematic
- float
- snappy
- layered

The stylesheet also includes a `prefers-reduced-motion` fallback.

## Next production step
For a real hosted StoreStudio product, connect the existing deterministic media abstraction to a licensed media provider and store generated designs in a backend. The current architecture is intentionally structured so provider APIs can replace the demo media layer without rewriting the storefront renderer.
