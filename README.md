# Shopify UI Generator

**Shopify UI Generator** is an open-source generative ecommerce storefront design tool built with **Next.js, React, TypeScript, Motion, Tailwind CSS, and Zustand**.

It generates Shopify-style storefront concepts from a natural-language **Design Direction** while keeping the result editable, responsive, and structured as reusable React UI rather than arbitrary generated markup.

> **Trademark note:** This is an independent open-source project. It is not affiliated with, endorsed by, or sponsored by Shopify Inc. “Shopify” is a trademark of Shopify Inc.

## Highlights

- Natural-language **Design Direction** generation
- Approximately **2,000 curated starting design directions**
- Hundreds of searchable ecommerce categories and niche profiles
- Art direction + page composition intelligence
- Multiple header, hero, product, pricing, section, and footer architectures
- Product-card anatomy and pricing-composition systems
- Typography pairing and palette systems
- Motion presets + higher-level motion language
- Category-aware and role-aware image routing
- Responsive desktop, tablet, and mobile preview
- Product, collection, search, cart, FAQ, About, and Contact previews
- Favorites, design history, A/B/C generation, locks, and section regeneration
- Visual quality / anti-repetition checks
- Shopify OS 2.0 export foundation
- Local planner works without an API key
- Optional OpenAI-powered planning route

## Screenshots

Screenshots are not bundled by default. If you publish the repository, add screenshots or a short GIF to `docs/screenshots/` and reference them here.

## Tech stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Motion
- Zustand
- Zod
- Lucide React

## Requirements

Install these first:

- **Node.js 20 or newer**
- **npm** (included with Node.js)
- Git, if you are cloning from GitHub

Check your versions:

```bash
node --version
npm --version
```

## Quick start

### Option A — one-command setup

```bash
npm run setup
npm run dev
```

Then open:

```text
http://localhost:3000
```

The setup script:

1. checks that Node.js 20+ is installed
2. creates `.env.local` from `.env.example` if needed
3. installs npm dependencies

The app works without an API key.

### Option B — standard npm setup

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd shopify-ui-generator
npm install
cp .env.example .env.local
npm run dev
```

On Windows Command Prompt, use:

```bat
copy .env.example .env.local
```

## Windows quick start

After cloning or extracting the project:

1. Install Node.js 20+
2. Double-click `start-windows.bat`
3. Wait for dependency installation on the first run
4. Open `http://localhost:3000`

The script verifies the project, installs dependencies when needed, and starts the development server.

## macOS / Linux quick start

```bash
chmod +x start-unix.sh
./start-unix.sh
```

## Optional AI planner

The built-in local structured planner requires **no API key**.

To enable the optional server-side OpenAI planner, edit `.env.local`:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.6-luna
```

Never commit `.env.local` or your API key to GitHub.

## Available commands

```bash
npm run setup      # Check Node, create .env.local, install dependencies
npm run dev        # Start the Next.js development server
npm run verify     # Run the project structure/integration verifier
npm run typecheck  # Run TypeScript checking
npm run build      # Create a production build
npm run start      # Run the production build
npm run check      # Verify + typecheck
```

## Production build

```bash
npm install
npm run verify
npm run typecheck
npm run build
npm run start
```

For production deployment, use your preferred Next.js-compatible host after a successful build.

## Project structure

```text
shopify-ui-generator/
├─ src/
│  ├─ app/                  # Next.js app, API routes and global styles
│  ├─ components/
│  │  ├─ builder/           # Builder / editor UI
│  │  └─ storefront/        # Generated storefront rendering
│  ├─ lib/
│  │  ├─ intelligence/      # Composition / typography / interaction intelligence
│  │  ├─ generator.ts       # Main generation pipeline
│  │  ├─ design-planner.ts  # Prompt and niche planning
│  │  ├─ image-library.ts   # Media routing and fallbacks
│  │  └─ design-quality.ts  # Visual quality checks
│  ├─ store/                # Zustand editor state and history
│  └─ types/                # Design genome and shared types
├─ data/                    # Retained design-direction data
├─ scripts/                 # Setup helpers
├─ .github/                 # GitHub issue / PR templates
├─ .env.example
├─ LICENSE
├─ CONTRIBUTING.md
├─ SECURITY.md
└─ README.md
```

## How generation works

The generator does not simply output a random page. It combines multiple compatible systems, including:

- category and niche detection
- art direction
- composition family
- section sequence and section variants
- header / hero / product / footer architecture
- typography pairing
- palette selection
- product-card anatomy
- pricing composition
- interaction profile
- motion language
- media direction
- responsive transformations
- novelty and quality checks

The goal is for repeated generations of the same niche to remain recognizably appropriate while still feeling structurally different.

## Design Direction examples

Try prompts such as:

```text
minimal Japanese furniture store with quiet typography and subtle interactions
```

```text
dark premium anime streetwear with huge typography, moving text and asymmetric products
```

```text
luxury chronograph watch store with editorial photography and restrained motion
```

```text
premium gaming laptop store with technical comparison, dark UI and fast microinteractions
```

```text
organic skincare store with soft editorial layout, ingredient storytelling and clean product cards
```

## Media behavior

Generated imagery uses category-, niche-, and media-role-aware routing. The project can distinguish roles such as hero, product, collection, story, lifestyle, detail, and social/UGC media.

Remote sources are loaded at runtime and can fail or return imperfect results. The project includes curated and generated fallbacks so unrelated imagery is reduced when a high-confidence source is unavailable.

If you deploy this publicly, review the licensing and usage terms of any external image source you enable.

## Open-source development status

The repository contains the composition and interaction architecture together with the preserved motion, media, typography, and responsive systems.

The project includes its own structural verifier in `scripts/verify-project.cjs`. Before publishing a release or deploying to production, run:

```bash
npm run verify
npm run typecheck
npm run build
```

Do not treat a development snapshot as production-certified unless those commands pass in your environment.


## Publish this project to GitHub

Create a new GitHub repository named **`shopify-ui-generator`** and leave GitHub's README/license initialization unchecked because this project already includes them.

Then run from the project folder:

```bash
git init
git add .
git commit -m "Initial open-source release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shopify-ui-generator.git
git push -u origin main
```

After publishing, replace `<YOUR_GITHUB_REPOSITORY_URL>` in the Quick Start example with your real repository URL.

Recommended GitHub repository settings:

- add topics such as `nextjs`, `react`, `typescript`, `shopify`, `ecommerce`, `ui-generator`, and `open-source`
- enable Issues if you want public bug reports
- enable Discussions if you want design ideas and community feedback
- enable GitHub Security Advisories for private vulnerability reports
- protect `main` once outside contributors start submitting pull requests

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

Useful contribution areas include:

- storefront composition families
- category/niche accuracy
- image relevance
- product-card anatomy
- accessible interaction patterns
- responsive transformations
- visual quality rules
- Shopify export improvements
- performance optimization

## Security

Please read [SECURITY.md](SECURITY.md). Do not post API keys or other secrets in issues, screenshots, or commits.

## License

Released under the [MIT License](LICENSE).

You may use, modify, distribute, and build on this project under the terms of the license.
