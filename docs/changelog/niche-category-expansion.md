# Release 20 — Niche Category Expansion + Niche-Aware Merchandising

The Design Direction system now recognizes **330+ prompt-ready store/category phrases**.

## New examples you can type directly

### Automotive
- Cars & Automotive
- Car Dealership & Auto Marketplace
- Electric Vehicle Accessories
- Car Parts & Accessories
- Tires & Wheels
- Car Audio & Entertainment
- Auto Detailing Products
- Motorcycle Parts & Gear
- Helmets & Riding Gear

### Phones & Tech
- Smartphones
- iPhone & iOS Phones
- Android Phones
- Refurbished Phones
- Phone Accessories
- Phone Chargers & Power Banks
- Phone Repair Parts
- Tablets & iPads
- Laptops & Computers
- Gaming PCs
- TVs & Smart TVs
- Projectors
- Home Theater & Soundbars
- Cameras & Photography
- Action Cameras
- Dash Cameras
- Wi-Fi Routers
- NAS & Storage

### Food
- Seafood & Fresh Fish
- Frozen Seafood
- Fish Market
- Sushi & Japanese Food
- Meat & Butcher Shop
- Chicken & Poultry
- Fresh Produce
- Fruit & Vegetable Market
- Dairy & Cheese
- Rice & Grains
- Noodles & Pasta
- Bakery & Desserts
- Coffee & Tea
- Milk Tea & Boba
- Energy Drinks

### Watches, Glasses & Accessories
- Classic Watches
- Luxury Watches
- Eyeglasses & Optical
- Sunglasses
- Reading Glasses
- Fine Jewelry
- Backpacks
- Luggage & Suitcases
- Briefcases & Business Bags

### Furniture & Home
- Sofas & Couches
- Beds & Mattresses
- Bedroom Furniture
- Dining Tables & Chairs
- Cabinets & Shelving
- TV Stands & Media Units
- Outdoor Furniture
- Rugs & Textiles
- Wall Art
- Home Fragrance

### Kitchen & Appliances
- Kitchen Appliances
- Refrigerators & Freezers
- Ovens & Ranges
- Air Fryers
- Microwaves
- Coffee Machines
- Blenders & Food Processors
- Rice Cookers
- Cookware & Pots
- Kitchen Knives
- Vacuum Cleaners
- Washing Machines & Dryers
- Air Conditioners
- Electric Fans
- Water Purifiers

### Sports & Outdoor
- Basketball Equipment
- Football & Soccer Gear
- Volleyball Gear
- Badminton Gear
- Tennis Gear
- Boxing & Martial Arts Gear
- Gym Equipment
- Home Fitness Equipment
- Bicycles
- E-Bikes
- Scooters
- Kayaks & Paddle Sports
- Pickleball Gear
- Padel Gear
- Overlanding Equipment

## Niche-aware generation
Release 20 does more than detect a broad category. For major niche searches such as:
- cars
- phones
- seafood
- watches
- glasses
- kitchen appliances
- sofas
- beds
- laptops
- TVs
- cameras
- gaming
- jewelry
- bags
- pet supplies
- bicycles
- sports equipment
- tools
- flowers
- books
- bakery
- coffee

…the planner now creates niche-specific:
- hero copy
- navigation labels
- collection names
- product names
- product descriptions
- pricing examples
- image-search context

This makes a search like **"premium seafood store"** generate seafood merchandising rather than generic food content, and **"luxury car marketplace"** generate automotive content instead of generic accessories.

## Main files changed
- `src/lib/category-taxonomy.ts`
- `src/lib/design-planner.ts`
- `src/lib/generator.ts`
- `src/lib/image-library.ts`
- `src/app/api/design-plan/route.ts`
- `src/components/builder/left-panel.tsx`
- `scripts/verify-project.cjs`
