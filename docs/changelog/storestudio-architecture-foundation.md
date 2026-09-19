# StoreStudio Release 2 Expansion Plan

This update pushes the generator closer to a professional commerce concept studio.

## Implemented in this release

### 1) Expanded store families
- Fashion
- Shoes
- Accessories
- Home
- Beauty
- Food
- Outdoor
- Kids
- Tech / Electronics

### 2) Larger design system
- 28 palette systems
- 24 font directions
- additional hero layout support including **showcase** composition
- expanded prompt steering for tech, kids, beauty, home, outdoor, fashion, food, and shoes

### 3) HD media engine
- **1,944 deterministic HD image candidates**
- category-aware hero, collection, story, and product media rotation
- hero-level motion media support with **27 looped video candidates**
- lock-aware refresh so locked hero/products stay preserved during regeneration

### 4) Better reference coverage
The generator is now tuned closer to the Shopify-inspired references you provided:
- strong headers and footer feel
- denser pricing/catalog direction for tech
- softer rounded cards and pastel merchandising for kids
- more editorial and premium section balance
- improved motion-ready hero support

## Recommended next upgrades

### A. “Unlimited” media pipeline
To make it feel truly unlimited, connect the current media layer to real providers:
- Pexels API for HD photos + product/lifestyle video
- Cloudinary or Supabase Storage for internal approved brand assets
- optional AI image generation endpoint for custom hero scenes
- media ranking layer (relevance + brightness + layout-fit scoring)

### B. Smart product video / GIF slots
- hover video previews on product cards
- autoplay muted clips in hero or story blocks
- product detail modal with multiple media types
- video-first beauty / tech / footwear layouts

### C. More layout families
Suggested next batch:
- split editorial collage
- mega-catalog comparison layout
- luxury magazine story layout
- Bento card commerce layout
- deal-heavy marketplace layout
- minimal Shopify-style landing layout
- collection-first brand homepage
- launch countdown campaign page

### D. Stronger prompt engine
Add structured prompting so users can enter:
- store type
- target audience
- visual style
- mood
- color preference
- layout preference
- motion intensity
- media preference (image / video / mixed)

### E. Back-end ready architecture
Best long-term stack for “real” generation:
- Next.js frontend
- Supabase / Firebase for auth + save history
- API route for AI structured generation
- Pexels / Cloudinary media services
- optional OpenAI or image model integration for custom media

## Best next coding step
If you want the strongest upgrade after this release, the best next implementation is:

**Media Provider Manager + Product Hover Video + Saved Theme Presets**

That gives the project a more premium feel immediately and makes it closer to a client-ready StoreStudio product.
