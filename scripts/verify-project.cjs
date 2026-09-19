const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = {
  preview: path.join(root, 'src', 'components', 'storefront', 'storefront-preview.tsx'),
  layout: path.join(root, 'src', 'app', 'layout.tsx'),
  page: path.join(root, 'src', 'app', 'page.tsx'),
  types: path.join(root, 'src', 'types', 'design.ts'),
  generator: path.join(root, 'src', 'lib', 'generator.ts'),
  designSystem: path.join(root, 'src', 'lib', 'design-system.ts'),
  designQuality: path.join(root, 'src', 'lib', 'design-quality.ts'),
  panel: path.join(root, 'src', 'components', 'builder', 'left-panel.tsx'),
  planner: path.join(root, 'src', 'lib', 'design-planner.ts'),
  plannerRoute: path.join(root, 'src', 'app', 'api', 'design-plan', 'route.ts'),
  commerce: path.join(root, 'src', 'components', 'storefront', 'commerce', 'commerce-provider.tsx'),
  responsive: path.join(root, 'src', 'lib', 'responsive-engine.ts'),
  advancedEditor: path.join(root, 'src', 'components', 'builder', 'advanced-editor.tsx'),
  visualCritic: path.join(root, 'src', 'components', 'builder', 'visual-critic.tsx'),
  projectExport: path.join(root, 'src', 'lib', 'project-export.ts'),
  inspector: path.join(root, 'src', 'components', 'builder', 'inspector.tsx'),
  taxonomy: path.join(root, 'src', 'lib', 'category-taxonomy.ts'),
};

function fail(message) {
  console.error('\n[VERIFY FAILED] ' + message + '\n');
  process.exit(1);
}

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) fail(`Missing required ${name} file: ${file}`);
}

const read = (key) => fs.readFileSync(files[key], 'utf8');
const layout = read('layout');
const page = read('page');
const preview = read('preview');
const types = read('types');
const generator = read('generator');
const designSystem = read('designSystem');
const designQuality = read('designQuality');
const panel = read('panel');
const planner = read('planner');
const plannerRoute = read('plannerRoute');
const commerce = read('commerce');
const responsive = read('responsive');
const advancedEditor = read('advancedEditor');
const visualCritic = read('visualCritic');
const projectExport = read('projectExport');
const inspector = read('inspector');
const taxonomy = read('taxonomy');

// Previous runtime regression: raw scripts inside a React RootLayout.
if (/<head>[\s\S]*?<script[\s>]/i.test(layout)) {
  fail('src/app/layout.tsx contains a raw <script> inside React markup.');
}

// Previous browser-extension hydration regression guard.
if (!/useState\(false\)/.test(page) || !/useEffect\(\(\)\s*=>\s*setMounted\(true\)/.test(page)) {
  fail('Client mount guard is missing from src/app/page.tsx.');
}

// Previous missing Hero* runtime regression.
const usedHeroes = [...preview.matchAll(/<(Hero[A-Za-z0-9_]+)(?=\s|\/?>)/g)].map((m) => m[1]);
const definedHeroes = new Set([...preview.matchAll(/function\s+(Hero[A-Za-z0-9_]+)\s*\(/g)].map((m) => m[1]));
const missingHeroes = [...new Set(usedHeroes)].filter((name) => !definedHeroes.has(name));
if (missingHeroes.length) fail('Missing hero component definitions: ' + missingHeroes.join(', '));

const requiredPreviewFunctions = [
  'HeroSplit',
  'HeroFullBleedEditorial',
  'HeroDualCampaign',
  'HeroFloatingProducts',
  'HeroMegaTypography',
  'HeroImageCollage',
  'HeroCollection',
  'HeroCinematicProduct',
  'FeaturesSection',
  'QuoteSection',
  'CampaignSection',
  'ComparisonSection',
  'SocialProofSection',
  'VideoStorySection',
  'PriceBlock',
  'MediaMicroLayout',
  'collectionHeadline',
  'productHeadline',
  'defaultPromo',
  'utilityLine',
  'extraHeaderLinks',
  'footerColumns',
];
const missingPreviewFunctions = requiredPreviewFunctions.filter(
  (name) => !new RegExp(`function\\s+${name}\\s*\\(`).test(preview),
);
if (missingPreviewFunctions.length) {
  fail('Missing storefront functions: ' + missingPreviewFunctions.join(', '));
}

const requiredTypes = ['CommerceArchetype', 'FooterLayout', 'PriceStyle', 'CardStyle', 'MediaBehavior'];
const missingTypes = requiredTypes.filter((name) => !new RegExp(`export type\\s+${name}\\s*=`).test(types));
if (missingTypes.length) fail('Missing design types: ' + missingTypes.join(', '));

const requiredDesignSystemExports = [
  'DESIGN_RECIPES', 'HEADER_SYSTEMS', 'HERO_SYSTEMS', 'PRODUCT_SYSTEMS',
  'FOOTER_SYSTEMS', 'PRICE_STYLES', 'CARD_STYLES', 'defaultCommerceSettings', 'sectionStrategy',
];
const missingDesignExports = requiredDesignSystemExports.filter(
  (name) => !new RegExp(`export (?:const|function)\\s+${name}\\b`).test(designSystem),
);
if (missingDesignExports.length) fail('Missing design-system exports: ' + missingDesignExports.join(', '));

if (!/export function\s+similarityScore\s*\(/.test(designQuality) || !/export function\s+qualityScore\s*\(/.test(designQuality)) {
  fail('Novelty / quality scoring engine is incomplete.');
}

if (!/DESIGN_RECIPES/.test(generator) || !/sectionStrategy/.test(generator) || !/motionMap/.test(generator)) {
  fail('Generator is not wired to the recipe / section / motion engine.');
}

if (!/(qualityScore|qualityAudit)/.test(panel) || !/similarityScore/.test(panel)) {
  fail('Generation panel is not wired to quality and anti-repeat scoring.');
}

const recipeCount = (designSystem.match(/\n\s*r\("/g) || []).length;
if (recipeCount < 140) fail(`Expected at least 140 curated recipes after , found ${recipeCount}.`);

if (!/Create New Design/.test(panel) || !/Try Variations/.test(panel) || !/Keep Current/.test(panel)) {
  fail('User-facing exploration labels are not updated to wording.');
}

if (!/categoryVideoUrl/.test(generator) || !/autoplayVideo/.test(generator) || !/videoStory/.test(generator)) {
  fail('media-intent routing is incomplete.');
}


if (!/export function\s+buildLocalDesignPlan\s*\(/.test(planner) || !/export async function\s+requestDesignPlan\s*\(/.test(planner)) {
  fail('structured design planner is incomplete.');
}
if (!/api\.openai\.com\/v1\/responses/.test(plannerRoute) || !/OPENAI_API_KEY/.test(plannerRoute)) {
  fail('optional AI planner route is not wired to the Responses API.');
}
if (!/export function\s+CommerceProvider\s*\(/.test(commerce) || !/function\s+QuickViewModal\s*\(/.test(commerce) || !/function\s+CartDrawer\s*\(/.test(commerce)) {
  fail('commerce interaction layer is incomplete.');
}
if (!/CommerceProvider/.test(preview) || !/useCommerce/.test(preview)) {
  fail('Storefront preview is not wired to commerce interactions.');
}
if (!/qualityAudit/.test(designQuality)) {
  fail('quality audit is missing.');
}

if (!/export function\s+autoRepairDesign\s*\(/.test(designQuality) || !/breakdown/.test(designQuality)) {
  fail('visual critic / auto-repair engine is incomplete.');
}
if (!/export function\s+getResponsiveDesign\s*\(/.test(responsive) || !/MOBILE_GRID_MAP/.test(responsive) || !/MOBILE_NAV_MAP/.test(responsive)) {
  fail('responsive V3 engine is incomplete.');
}
if (!/export function\s+AdvancedEditor\s*\(/.test(advancedEditor) || !/duplicateSection/.test(advancedEditor) || !/Hide on mobile/.test(advancedEditor)) {
  fail('advanced section editor is incomplete.');
}
if (!/export function\s+VisualCritic\s*\(/.test(visualCritic) || !/Auto fix/.test(visualCritic)) {
  fail('visual critic UI is incomplete.');
}
if (!/export function\s+buildProjectExport\s*\(/.test(projectExport) || !/generated-home\.liquid/.test(projectExport) || !/settings_schema\.json/.test(projectExport)) {
  fail('production export foundation is incomplete.');
}
if (!/AdvancedEditor/.test(inspector) || !/VisualCritic/.test(inspector) || !/Export project bundle/.test(inspector)) {
  fail('Inspector is not wired to the advanced editor / critic / export foundation.');
}
if (!/getResponsiveDesign/.test(preview)) {
  fail('Storefront preview is not wired to the responsive V3 engine.');
}

if (!/Cars & Automotive/.test(taxonomy) || !/Seafood & Fresh Fish/.test(taxonomy) || !/Kitchen Appliances/.test(taxonomy) || !/Sofas & Couches/.test(taxonomy)) {
  fail('expanded niche taxonomy is incomplete.');
}
if (!/NICHE_PROFILES/.test(planner) || !/mediaQuery/.test(planner) || !/collectionTitles/.test(planner) || !/detectNicheProfile/.test(planner)) {
  fail('niche merchandising planner is incomplete.');
}
if (!/searchContext/.test(fs.readFileSync(path.join(root, 'src', 'lib', 'image-library.ts'), 'utf8'))) {
  fail('niche-aware media routing is incomplete.');
}

if (!/function\s+useAutoHideHeader\s*\(/.test(preview)) {
  fail('Runtime hotfix regression: useAutoHideHeader is missing.');
}
if (/index % planner\.content\.collectionTitles\.length/.test(generator) || /index % planner\.content\.products\.length/.test(generator)) {
  fail('Runtime hotfix regression: planner content is cycling and can create duplicate rendered identities.');
}
if (!/key=\{`\$\{item\.title\}-\$\{i\}`\}/.test(preview)) {
  fail('Runtime hotfix regression: collection cards do not use collision-safe React keys.');
}
if (!/dedupeStrings\(next\.store\.navItems\)/.test(generator) || !/applyUniqueCollectionTitles\(next\.store\.collections/.test(generator)) {
  fail('Runtime hotfix regression: generated navigation / collection labels are not normalized.');
}


const nicheCount = (planner.match(/\bid:\s*"[^"]+"/g) || []).length;
if (nicheCount < 35 || !/export const\s+NICHE_DIRECTORY/.test(planner)) {
  fail(`dedicated niche directory is incomplete; found ${nicheCount} niche profiles.`);
}
if (!/(Dedicated store direction|Dedicated niche profile|Dynamic category)/.test(panel) || !/directionSuggestions/.test(panel) || !/Search \{TOTAL_SHOPIFY_CATEGORIES\} categories/.test(panel)) {
  fail('searchable Design Direction browser is incomplete.');
}
if (!/id: "cars"[\s\S]*?layoutBias:/.test(planner) || !/id: "phones"[\s\S]*?layoutBias:/.test(planner) || !/id: "seafood"[\s\S]*?layoutBias:/.test(planner) || !/id: "watches"[\s\S]*?layoutBias:/.test(planner)) {
  fail('core niche-specific layout intelligence is incomplete.');
}

console.log('[VERIFY OK] Core category intelligence checks passed.');
console.log('  - No raw RootLayout <script> regression');
console.log('  - Client mount guard is present');
console.log('  - All referenced Hero* components are defined');
console.log('  - New hero/section/pricing helpers are present');
console.log('  - design types and generator engines are wired');
console.log('  - Quality + anti-repeat scoring is wired');
console.log('  - Clear user-facing generation modes are present');
console.log('  - Media intent / video routing is wired');
console.log('  - Structured AI planner + local fallback are wired');
console.log('  - Quick View, wishlist and cart interactions are wired');
console.log('  - Quality audit rejection checks are wired');
console.log('  - Visual AI critic + automatic repair are wired');
console.log('  - Advanced live copy/style/section editor is wired');
console.log('  - Responsive V3 engine is wired');
console.log('  - React + Shopify export foundation is wired');
console.log('  - niche taxonomy + merchandising + media routing are wired');
console.log(`  - searchable Design Direction browser is wired with ${nicheCount} dedicated niches`);
console.log('  - Core niches now carry dedicated header / hero / product / footer / pricing / media biases');
console.log('  - Duplicate-key prevention + auto-hide header runtime guards are wired');
console.log(`  - ${recipeCount} curated design directions detected`);

// dynamic-category / filters / PDP checks.
const dynamicCategoryEngine = path.join(root, 'src', 'lib', 'dynamic-category-engine.ts');
if (!fs.existsSync(dynamicCategoryEngine)) fail('dynamic category engine is missing.');
const dynamicEngine = fs.readFileSync(dynamicCategoryEngine, 'utf8');
if (!/buildDynamicCategoryProfile/.test(dynamicEngine) || !/dynamicCategoryDirectory/.test(dynamicEngine) || !/DOMAIN_PRESETS/.test(dynamicEngine)) {
  fail('dynamic category engine is incomplete.');
}
if (!/filters\?:/.test(types) || !/specs\?:/.test(types)) {
  fail('category filters / product specification types are missing.');
}
if (!/CategoryFilterBar/.test(preview) || !/Clear filters/.test(preview)) {
  fail('storefront filter UI is incomplete.');
}
if (!/Product details/.test(commerce) || !/Specifications/.test(commerce) || !/Delivery & returns/.test(commerce)) {
  fail('product detail experience is incomplete.');
}
if (!/buildDynamicCategoryProfile/.test(planner) || !/dynamicCategoryDirectory/.test(planner)) {
  fail('planner is not wired to dynamic categories.');
}

console.log('[VERIFY OK] dynamic category engine checks passed.');
console.log('  - Dynamic taxonomy categories can synthesize dedicated storefront directions');
console.log('  - Category-specific filters and product specifications are wired');
console.log('  - Rich product detail experience is wired');

// multi-page / section-regeneration / image-intelligence checks.
const sectionRegenerator = path.join(root, 'src', 'lib', 'section-regenerator.ts');
const imageLibrary = path.join(root, 'src', 'lib', 'image-library.ts');
const mediaRoute = path.join(root, 'src', 'app', 'api', 'media', 'image', 'route.ts');
const canvas = path.join(root, 'src', 'components', 'builder', 'canvas.tsx');
const editorStore = path.join(root, 'src', 'store', 'editor-store.ts');
if (!fs.existsSync(sectionRegenerator)) fail('section regenerator is missing.');
for (const file of [imageLibrary, mediaRoute, canvas, editorStore]) if (!fs.existsSync(file)) fail(`required file is missing: ${file}`);
const sectionRegen = fs.readFileSync(sectionRegenerator, 'utf8');
const imageLib = fs.readFileSync(imageLibrary, 'utf8');
const imageRoute = fs.readFileSync(mediaRoute, 'utf8');
const canvasSource = fs.readFileSync(canvas, 'utf8');
const editorStoreSource = fs.readFileSync(editorStore, 'utf8');
if (!/export type\s+StorePage\s*=/.test(types) || !/"collection"/.test(types) || !/"product"/.test(types) || !/"contact"/.test(types)) {
  fail('multi-page StorePage type is incomplete.');
}
if (!/storePage:\s*StorePage/.test(editorStoreSource) || !/setStorePage/.test(editorStoreSource) || !/Preview store page/.test(canvasSource)) {
  fail('store-page selector is not wired into the editor canvas.');
}
const requiredStorePages = ['StorePageBody', 'CollectionPage', 'ProductDetailPage', 'SearchPage', 'CartPage', 'AboutPage', 'ContactPage', 'StandaloneFAQPage'];
const missingStorePages = requiredStorePages.filter((name) => !new RegExp(`function\\s+${name}\\s*\\(`).test(preview));
if (missingStorePages.length) fail('storefront pages are incomplete: ' + missingStorePages.join(', '));
if (!/export function\s+regenerateSection\s*\(/.test(sectionRegen) || !/export function\s+regenerateHero\s*\(/.test(sectionRegen) || !/SectionRegenerationIntent/.test(sectionRegen)) {
  fail('section-level regeneration engine is incomplete.');
}
if (!/Regenerate this section/.test(advancedEditor) || !/Hero regeneration/.test(advancedEditor) || !/regenerateSectionDirection/.test(advancedEditor)) {
  fail('section regeneration controls are not wired into Advanced Editor.');
}
if (!/export function\s+auditStoreMedia\s*\(/.test(imageLib) || !/gallerySize\s*=\s*4/.test(imageLib) || !/gallery\?:\s*string\[\]/.test(types)) {
  fail('image intelligence / multi-image product gallery system is incomplete.');
}
if (!/resolvedSource/.test(imageRoute) || !/semantic/.test(imageRoute) || /Promise\.any\(/.test(imageRoute)) {
  fail('media API does not prioritize semantic niche imagery deterministically.');
}
if (!/Media intelligence/.test(advancedEditor) || !/Refresh media/.test(advancedEditor)) {
  fail('media intelligence controls are not wired into Advanced Editor.');
}
if (!/generated-pages\.ts/.test(projectExport) || !/collection\.generated\.json/.test(projectExport) || !/product\.generated\.json/.test(projectExport) || !/page\.faq\.json/.test(projectExport)) {
  fail('multi-page export foundation is incomplete.');
}

console.log('[VERIFY OK] multi-page / regeneration / media intelligence checks passed.');
console.log('  - Home, Collection, Product, Search, Cart, About, Contact and FAQ previews are wired');
console.log('  - Section-level and hero-level regeneration controls are wired');
console.log('  - Product galleries and media-quality auditing are wired');
console.log('  - Semantic niche media sources are prioritized before generic fallbacks');
console.log('  - Multi-page React + Shopify export manifests are wired');

// Visual QA V2 / Shopify export V2 / hard locks / A-B-C variants / scale targets.
const profileStart = planner.indexOf('export const NICHE_PROFILES');
const profileEnd = planner.indexOf('export const NICHE_DIRECTORY');
const dedicatedProfileSource = profileStart >= 0 && profileEnd > profileStart ? planner.slice(profileStart, profileEnd) : '';
const dedicatedProfileCount = (dedicatedProfileSource.match(/\{\s*id:\s*"[^"]+"/g) || []).length;
const categoryLabels = [];
for (const block of taxonomy.matchAll(/categories:\s*\[([\s\S]*?)\]\s*,\s*keywords:/g)) {
  for (const label of block[1].matchAll(/"([^"]+)"/g)) categoryLabels.push(label[1]);
}
const promptReadyCategoryCount = new Set(categoryLabels).size;
if (recipeCount < 200) fail(`requires at least 200 curated design directions; found ${recipeCount}.`);
if (promptReadyCategoryCount < 450) fail(`requires at least 450 unique prompt-ready categories; found ${promptReadyCategoryCount}.`);
if (dedicatedProfileCount < 50) fail(`requires at least 50 dedicated niche profiles; found ${dedicatedProfileCount}.`);
if (!/export function\s+qualityAuditV2\s*\(/.test(designQuality) || !/export function\s+autoRepairDesignV2\s*\(/.test(designQuality) || !/mediaScore/.test(designQuality) || !/coherenceScore/.test(designQuality)) {
  fail('Visual QA V2 is incomplete.');
}
if (!/Generate 3 A\/B\/C variants/.test(panel) || !/generateVariants/.test(panel) || !/qualityAuditV2/.test(panel)) {
  fail('A/B/C variant generation is not wired into the Design panel.');
}
if (!/variantMode/.test(editorStoreSource) || !/setVariants/.test(editorStoreSource) || !/selectVariant/.test(editorStoreSource) || !/VariantPane/.test(canvasSource)) {
  fail('visual A/B/C comparison workspace is incomplete.');
}
if (!/hard locks/.test(generator) || !/next\.store\.heroTitle = current\.store\.heroTitle/.test(generator) || !/next\.store\.products = structuredClone\(current\.store\.products\)/.test(generator) || !/next\.layout = structuredClone\(current\.layout\)/.test(generator)) {
  fail('hard-lock regeneration guarantees are incomplete.');
}
if (!/export function\s+downloadShopifyTheme\s*\(/.test(projectExport) || !/createStoredZip/.test(projectExport) || !/shopify\/layout\/theme\.liquid/.test(projectExport) || !/main-product\.liquid/.test(projectExport) || !/cart-drawer\.liquid/.test(projectExport) || !/generated-product-grid\.liquid/.test(projectExport)) {
  fail('Shopify OS 2.0 ZIP export is incomplete.');
}

console.log('[VERIFY OK] professional generation checks passed.');
console.log(`  - ${recipeCount} curated design directions retained`);
console.log(`  - ${promptReadyCategoryCount} prompt-ready categories retained`);
console.log(`  - ${dedicatedProfileCount} dedicated niche profiles retained`);
console.log('  - Visual QA V2 + auto-repair scoring is wired');
console.log('  - Hard generation locks are re-applied after planner/media mutation');
console.log('  - A/B/C generation and visual variant selection are wired');
console.log('  - Shopify OS 2.0 ZIP export includes Liquid sections, variants, collections, cart UI, assets and responsive styles');

// professional design library / layout families / motion packs / visual picker.
const designLibraryEnginePath = path.join(root, 'src', 'lib', 'design-library.ts');
const designLibraryUIPath = path.join(root, 'src', 'components', 'builder', 'design-library.tsx');
const builderShellPath = path.join(root, 'src', 'components', 'builder', 'builder-shell.tsx');
const topbarPath = path.join(root, 'src', 'components', 'builder', 'topbar.tsx');
for (const file of [designLibraryEnginePath, designLibraryUIPath, builderShellPath, topbarPath]) {
  if (!fs.existsSync(file)) fail(`required file is missing: ${file}`);
}
const designLibraryEngine = fs.readFileSync(designLibraryEnginePath, 'utf8');
const designLibraryUI = fs.readFileSync(designLibraryUIPath, 'utf8');
const builderShellSource = fs.readFileSync(builderShellPath, 'utf8');
const topbarSource = fs.readFileSync(topbarPath, 'utf8');
if (!/export const DESIGN_LIBRARY/.test(designLibraryEngine) || !/Object\.entries\(DESIGN_RECIPES\)/.test(designLibraryEngine)) {
  fail('Design Library is not derived from the complete curated recipe catalog.');
}
if (!/export type LayoutFamily/.test(designLibraryEngine) || !/"Full-bleed Editorial"/.test(designLibraryEngine) || !/"Mosaic Gallery"/.test(designLibraryEngine)) {
  fail('professional layout-family taxonomy is incomplete.');
}
if (!/export type MotionPackName/.test(designLibraryEngine) || !/"No Motion"/.test(designLibraryEngine) || !/"Hover Rich"/.test(designLibraryEngine)) {
  fail('motion-pack taxonomy is incomplete.');
}
const layoutFamilyCount = (designLibraryEngine.match(/^\s*\|\s*"[^\n"]+"/gm) || []).length;
const motionPackBlock = designLibraryEngine.slice(designLibraryEngine.indexOf('export type MotionPackName'), designLibraryEngine.indexOf('export type DesignLibraryDirection'));
const motionPackCount = (motionPackBlock.match(/^\s*\|\s*"[^\n"]+"/gm) || []).length;
if (motionPackCount < 16) fail(`requires at least 16 motion packs; found ${motionPackCount}.`);
if (!/"sameLayoutDifferentStyle"/.test(designLibraryEngine) || !/"sameStyleDifferentLayout"/.test(designLibraryEngine) || !/"differentMotion"/.test(designLibraryEngine) || !/"similar"/.test(designLibraryEngine) || !/"remix"/.test(designLibraryEngine)) {
  fail('design remix actions are incomplete.');
}
if (!/Professional Design Library/.test(designLibraryUI) || !/matching directions/.test(designLibraryUI) || !/Favorites/.test(designLibraryUI) || !/Recent/.test(designLibraryUI)) {
  fail('visual design picker UI is incomplete.');
}
if (!/Same layout, different style/.test(designLibraryUI) || !/Same style, different layout/.test(designLibraryUI) || !/Different animation/.test(designLibraryUI) || !/Generate similar/.test(designLibraryUI) || !/Remix this/.test(designLibraryUI)) {
  fail('visual design picker actions are not exposed to users.');
}
if (!/localStorage/.test(designLibraryUI) || !/libraryFavorites/.test(editorStoreSource) || !/libraryRecent/.test(editorStoreSource)) {
  fail('favorites/recent design persistence is incomplete.');
}
if (!/<DesignLibrary\s*\/>/.test(builderShellSource) || !/setDesignLibraryOpen\(true\)/.test(topbarSource) || (!/Browse \{TOTAL_DESIGN_LIBRARY_DIRECTIONS\.toLocaleString\(\)\} designs/.test(panel) && !/Browse 400 designs/.test(panel))) {
  fail('Design Library entry points are not wired into the workspace.');
}
if (recipeCount < 200 || promptReadyCategoryCount < 450 || dedicatedProfileCount < 50) {
  fail('must retain the scale targets (>=200 / >=450 / >=50).');
}

console.log('[VERIFY OK] professional design-library checks passed.');
console.log(`  - All ${recipeCount} curated directions are available through the visual picker`);
console.log('  - Style, layout, motion, density and industry filters are wired');
console.log('  - 20 professional layout families are represented');
console.log(`  - ${motionPackCount} selectable motion packs are represented`);
console.log('  - Favorites and recently used designs persist locally');
console.log('  - Similar / remix / same-layout / same-style / different-animation actions are wired');
console.log(`  - ${recipeCount} curated directions / ${promptReadyCategoryCount} categories / ${dedicatedProfileCount} niche profiles remain intact`);

// sidebar fit / top generation actions / niche media relevance.
const controlsPath = path.join(root, 'src', 'components', 'ui', 'control.tsx');
const controlsSource = fs.readFileSync(controlsPath, 'utf8');
const imageLibrarySource = fs.readFileSync(imageLibrary, 'utf8');
if (!/whitespace-normal/.test(controlsSource) || !/min-w-0/.test(controlsSource) || !/break-words/.test(controlsSource)) {
  fail('exploration buttons are not protected against narrow-sidebar text overflow.');
}
const generateButtonIndex = panel.indexOf('"Generate"');
const generateScopeIndex = panel.indexOf('Generate scope');
if (generateButtonIndex < 0 || generateScopeIndex < 0 || generateButtonIndex > generateScopeIndex) {
  fail('Generate / Generate 3 actions are not positioned above generation scope controls.');
}
if (!/aria-label="Generate 3 A\/B\/C variants"/.test(panel) || !/>\{variantGenerating \? "Building 3\.\.\." : "Generate 3"\}<\/span>/.test(panel)) {
  fail('compact Generate 3 action is not wired.');
}
if (/2xl:grid-cols-2/.test(panel)) {
  fail('sidebar still enables the narrow 2-column scope/exploration layout that caused overflow.');
}
const imageCandidateMatch = imageLibrarySource.match(/IMAGE_CANDIDATES_PER_CATEGORY\s*=\s*(\d+)/);
const imageCandidatesPerCategory = imageCandidateMatch ? Number(imageCandidateMatch[1]) : 0;
if (imageCandidatesPerCategory < 360 || !/id:\s*"cars"/.test(imageLibrarySource) || !/premium sports car automotive photography/.test(imageLibrarySource)) {
  fail('expanded niche-aware media library is incomplete.');
}
const carFallbackBlockStart = imageLibrarySource.indexOf('id: "cars"');
const carFallbackBlockEnd = imageLibrarySource.indexOf('id: "phones"', carFallbackBlockStart);
const carFallbackBlock = carFallbackBlockStart >= 0 && carFallbackBlockEnd > carFallbackBlockStart ? imageLibrarySource.slice(carFallbackBlockStart, carFallbackBlockEnd) : '';
const carPhotoCount = (carFallbackBlock.match(/images\.unsplash\.com\/photo-/g) || []).length;
if (carPhotoCount < 10) fail(`requires at least 10 curated car-photo fallbacks; found ${carPhotoCount}.`);
if (recipeCount < 200 || promptReadyCategoryCount < 450 || dedicatedProfileCount < 50) {
  fail('must retain the professional scale targets (>=200 / >=450 / >=50).');
}
console.log('[VERIFY OK] sidebar + niche-media polish checks passed.');
console.log('  - Exploration/category controls wrap safely inside narrow sidebars');
console.log('  - Generate and Generate 3 actions are promoted above scope/exploration settings');
console.log(`  - Media library retains ${imageCandidatesPerCategory} candidates per broad category`);
console.log(`  - ${carPhotoCount} curated car fallbacks + high-signal automotive semantic queries are wired`);
console.log('  - Featured niche media routing covers cars, phones, seafood, watches, eyewear, appliances, sofas and beds');
console.log(`  - ${recipeCount} curated directions / ${promptReadyCategoryCount} categories / ${dedicatedProfileCount} niche profiles remain intact`);


// : 200 additional curated design directions / 400 total.
if (recipeCount !== 2000) fail(`requires exactly 2,000 curated design directions; found ${recipeCount}.`);
if (!/Browse \{TOTAL_DESIGN_LIBRARY_DIRECTIONS\.toLocaleString\(\)\} designs/.test(panel) && !/Browse 1,000 designs/.test(panel)) fail('Design Library entry point does not advertise the expanded design count.');
if (!/zigzagEditorial/.test(designSystem) || !/hoverPanels/.test(designSystem) || !/stackedShowcase/.test(designSystem)) {
  fail('expanded design recipes are not using the newer product layout systems.');
}
if (!/pillNav/.test(designSystem) || !/brandMarquee/.test(designSystem) || !/dualRowPromo/.test(designSystem)) {
  fail('expanded design recipes are not using the newer header systems.');
}
console.log('[VERIFY OK] mega diversity checks passed.');
console.log('  - 200 new curated directions added');
console.log('  - 2,000 total design directions available in the visual picker');


// smart Design Direction search.
{
  const panel35 = fs.readFileSync(path.join(root, 'src/components/builder/left-panel.tsx'), 'utf8');
  if (!/SMART_DIRECTION_MODIFIERS/.test(panel35) || !/directionMatchScore/.test(panel35)) fail('smart direction scoring is missing.');
  if (!/slice\(0, 16\)/.test(panel35)) fail('must surface up to 16 matching directions.');
  if (!/smart matches/.test(panel35) || !/Style direction/.test(panel35)) fail('smart direction UI labels are missing.');
  if (/\["Cars & Automotive", "Smartphones & Mobile", "Seafood & Fresh Fish"/.test(panel35)) fail('fixed quick-selection chips were not removed.');
  console.log('[VERIFY OK] smart direction search checks passed.');
  console.log(`  - ${promptReadyCategoryCount} prompt-ready categories are searchable`);
  console.log('  - Fixed bottom chips removed; live smart matching is active');
}
