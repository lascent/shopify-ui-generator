#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

echo ""
echo "=============================================="
echo "  Shopify UI Generator"
echo "=============================================="
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js was not found. Install Node.js 20 or newer from https://nodejs.org/"
  exit 1
fi

NODE_MAJOR=$(node -p "Number(process.versions.node.split('.')[0])")
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "Node.js 20 or newer is required. Current version: $(node --version)"
  exit 1
fi

rm -rf .next
rm -f tsconfig.tsbuildinfo

node scripts/verify-project.cjs

if [ ! -d node_modules ]; then
  npm run setup
fi

echo ""
echo "Open http://localhost:3000 in your browser."
echo "Press Ctrl+C to stop the server."
echo ""
npm run dev
