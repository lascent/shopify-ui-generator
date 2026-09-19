# Shopify UI Generator

Shopify UI Generator is an open-source storefront design tool for generating and editing responsive ecommerce interfaces from a design direction or product niche.

It is built with Next.js, React, and TypeScript. The generator combines reusable layout systems for headers, heroes, product sections, pricing, typography, motion, media, and responsive behavior rather than producing a single fixed template.

> Shopify UI Generator is an independent project and is not affiliated with, endorsed by, or sponsored by Shopify Inc. Shopify is a trademark of Shopify Inc.

## Features

- Generate storefront concepts from a short design direction
- Browse a large catalog of curated ecommerce design directions and niches
- Produce different header, hero, product, pricing, section, and footer compositions
- Preview layouts on desktop, tablet, and mobile
- Regenerate individual sections while preserving locked parts of a design
- Edit copy, styling, sections, interactions, and responsive behavior
- Work with multiple storefront pages, including product, collection, cart, search, and content pages
- Use local generation without an API key, with an optional OpenAI planning route
- Export foundations for React and Shopify OS 2.0 workflows

## Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Motion](https://motion.dev/)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [Zod](https://zod.dev/)
- [Lucide React](https://lucide.dev/)

## Requirements

- Node.js 20 or newer
- npm
- Git

## Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/lascent/shopify-ui-generator.git
cd shopify-ui-generator
```

Run the setup script:

```bash
npm run setup
```

Then start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

You can also install dependencies directly with `npm install` if you do not want to use the setup helper.

### Windows

Run:

```text
start-windows.bat
```

### macOS and Linux

```bash
chmod +x start-unix.sh
./start-unix.sh
```

## Optional OpenAI Planner

The project works without an API key. To enable the optional OpenAI planner, copy `.env.example` to `.env.local` and add your key:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.6-luna
```

Keep `.env.local` and other credentials out of version control.

## Usage

1. Enter a design direction or choose a storefront category.
2. Generate a storefront variation.
3. Review the result at desktop, tablet, and mobile sizes.
4. Edit or regenerate individual sections as needed.
5. Lock elements you want to keep while exploring additional variations.
6. Export the result when the design is ready for implementation.

Example prompts:

```text
minimal Japanese furniture store with quiet typography and subtle interactions
```

```text
premium gaming laptop store with technical comparisons and restrained motion
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run setup` | Prepare the local environment and install dependencies |
| `npm run dev` | Start the development server |
| `npm run verify` | Run repository structure and integration checks |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run check` | Run verification and type checking |
| `npm run build` | Create a production build |
| `npm run start` | Start the production build |

## Project Structure

```text
shopify-ui-generator/
├── src/
│   ├── app/                 Next.js application and API routes
│   ├── components/          Builder and storefront components
│   ├── lib/                 Generation and design systems
│   ├── store/               Application state
│   └── types/               Shared TypeScript types
├── data/                    Design direction data
├── docs/                    Architecture and implementation notes
├── public/                  Static assets
├── scripts/                 Setup and verification scripts
└── .github/                 GitHub templates
```

## Development

Before opening a pull request, run:

```bash
npm run verify
npm run typecheck
npm run build
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

For security issues, follow the reporting process in [SECURITY.md](SECURITY.md).

## License

This project is available under the [MIT License](LICENSE).
