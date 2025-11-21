const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  try {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    console.log("Cleared existing data");
  } catch (error) {
    console.log("No existing data to clear (fresh database)");
  }

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create 5 test users
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      full_name: "Admin User",
      phone: "1234567890",
      is_admin: true,
    },
  });

  const users = await prisma.user.createMany({
    data: [
      {
        username: "john_doe",
        email: "john@example.com",
        password: hashedPassword,
        full_name: "John Doe",
        phone: "5551234567",
        is_admin: false,
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: hashedPassword,
        full_name: "Jane Smith",
        phone: "5559876543",
        is_admin: false,
      },
      {
        username: "bob_wilson",
        email: "bob@example.com",
        password: hashedPassword,
        full_name: "Bob Wilson",
        phone: "5555551234",
        is_admin: false,
      },
      {
        username: "alice_chen",
        email: "alice@example.com",
        password: hashedPassword,
        full_name: "Alice Chen",
        phone: "5558889999",
        is_admin: false,
      },
    ],
  });

  const allUsers = await prisma.user.findMany();
  console.log(`Created ${allUsers.length} test users`);

  // Product 1: RUNNEN Outdoor Decking
  const product1 = await prisma.product.create({
    data: {
      name: "RUNNEN Outdoor Decking",
      description:
        "Classic Nordic style outdoor flooring made from natural acacia wood with weather-resistant treatment. Perfect for balconies, patios, and gardens. Easy snap-together installation requires no tools.",
      category: "Interlocking Tiles",
      brand: "RUNNEN",
      base_price: 29.9,
      features: [
        { icon: "🌲", text: "Natural Acacia Wood" },
        { icon: "💧", text: "Weather Resistant" },
        { icon: "🔨", text: "Easy Installation" },
        { icon: "📦", text: "Pack of 10 tiles" },
      ],
      details: `Dimensions: 30cm x 30cm x 2.4cm
Weight: 1.2kg per tile, 12kg per pack
Material: Imported acacia wood with anti-corrosion treatment
Package: 10 tiles/pack, covers approximately 0.9 square meters
Installation: Snap-together interlocking, no tools required
Suitable for: Balconies, patios, gardens, poolside areas
Maintenance: Regular cleaning with water, avoid prolonged water accumulation
Warranty: 2 years`,
      featured: true,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      {
        product_id: product1.id,
        sku: "RUNNEN-WOOD-GREY",
        material: "Wood Grain",
        color: "Grey",
        price: 29.9,
        stock_quantity: 500,
        image_url: "/images/runnen-wood-grey.jpg",
      },
      {
        product_id: product1.id,
        sku: "RUNNEN-WOOD-BROWN",
        material: "Wood Grain",
        color: "Brown",
        price: 29.9,
        stock_quantity: 300,
        image_url: "/images/runnen-wood-brown.jpg",
      },
      {
        product_id: product1.id,
        sku: "RUNNEN-WOOD-WHITE",
        material: "Wood Grain",
        color: "White",
        price: 32.9,
        stock_quantity: 200,
        image_url: "/images/runnen-wood-white.jpg",
      },
      {
        product_id: product1.id,
        sku: "RUNNEN-WOOD-BLACK",
        material: "Wood Grain",
        color: "Black",
        price: 34.9,
        stock_quantity: 150,
        image_url: "/images/runnen-wood-black.jpg",
      },
    ],
  });

  console.log("Created product 1: RUNNEN with 4 variants");

  // Product 2: MÄLLSTEN Stone Pattern Decking
  const product2 = await prisma.product.create({
    data: {
      name: "MÄLLSTEN Stone Pattern Decking",
      description:
        "Modern minimalist stone-textured flooring made from high-strength composite material with natural stone appearance. Anti-slip and waterproof with excellent weather resistance. Perfect for contemporary outdoor spaces.",
      category: "Interlocking Tiles",
      brand: "MÄLLSTEN",
      base_price: 39.9,
      features: [
        { icon: "🪨", text: "Natural Stone Texture" },
        { icon: "☔", text: "Waterproof & Non-slip" },
        { icon: "⚡", text: "UV Resistant" },
        { icon: "📦", text: "Pack of 9 tiles" },
      ],
      details: `Dimensions: 33cm x 33cm x 1.8cm
Weight: 0.8kg per tile, 7.2kg per pack
Material: Composite material with stone texture surface
Package: 9 tiles/pack, covers approximately 1 square meter
Installation: Snap-together interlocking, no tools required
Suitable for: Balconies, patios, commercial spaces
Maintenance: Can be cleaned with detergent, high stain resistance
Warranty: 3 years`,
      featured: true,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      {
        product_id: product2.id,
        sku: "MALLSTEN-STONE-DARK",
        material: "Stone Texture",
        color: "Dark Grey",
        price: 39.9,
        stock_quantity: 400,
        image_url: "/images/mallsten-stone-dark.jpg",
      },
      {
        product_id: product2.id,
        sku: "MALLSTEN-STONE-LIGHT",
        material: "Stone Texture",
        color: "Light Grey",
        price: 39.9,
        stock_quantity: 350,
        image_url: "/images/mallsten-stone-light.jpg",
      },
      {
        product_id: product2.id,
        sku: "MALLSTEN-STONE-BEIGE",
        material: "Stone Texture",
        color: "Beige",
        price: 42.9,
        stock_quantity: 250,
        image_url: "/images/mallsten-stone-beige.jpg",
      },
      {
        product_id: product2.id,
        sku: "MALLSTEN-STONE-CHARCOAL",
        material: "Stone Texture",
        color: "Charcoal",
        price: 44.9,
        stock_quantity: 180,
        image_url: "/images/mallsten-stone-charcoal.jpg",
      },
    ],
  });

  console.log("Created product 2: MÄLLSTEN with 4 variants");

  // Product 3: BASIC Economy Interlocking Tiles
  const product3 = await prisma.product.create({
    data: {
      name: "BASIC Economy Interlocking Tiles",
      description:
        "Cost-effective outdoor flooring solution made from durable plastic with anti-slip surface design. Perfect for budget-conscious customers seeking practical functionality.",
      category: "Interlocking Tiles",
      brand: "BASIC",
      base_price: 19.9,
      features: [
        { icon: "💰", text: "Budget Friendly" },
        { icon: "🔧", text: "Easy to Clean" },
        { icon: "♻️", text: "Recyclable Material" },
        { icon: "📦", text: "Pack of 12 tiles" },
      ],
      details: `Dimensions: 30cm x 30cm x 1.5cm
Weight: 0.5kg per tile, 6kg per pack
Material: High-density plastic
Package: 12 tiles/pack, covers approximately 1.08 square meters
Installation: Snap-together interlocking, no tools required
Suitable for: Balconies, temporary installations
Maintenance: Clean with water or mild detergent
Warranty: 1 year`,
      featured: false,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      {
        product_id: product3.id,
        sku: "BASIC-PLASTIC-GREEN",
        material: "Plastic",
        color: "Green",
        price: 19.9,
        stock_quantity: 800,
        image_url: "/images/basic-plastic-green.jpg",
      },
      {
        product_id: product3.id,
        sku: "BASIC-PLASTIC-TERRACOTTA",
        material: "Plastic",
        color: "Terracotta",
        price: 19.9,
        stock_quantity: 600,
        image_url: "/images/basic-plastic-terracotta.jpg",
      },
      {
        product_id: product3.id,
        sku: "BASIC-PLASTIC-BLUE",
        material: "Plastic",
        color: "Blue",
        price: 21.9,
        stock_quantity: 450,
        image_url: "/images/basic-plastic-blue.jpg",
      },
    ],
  });

  console.log("Created product 3: BASIC with 3 variants");

  // Product 4: PREMIUM Composite Decking
  const product4 = await prisma.product.create({
    data: {
      name: "PREMIUM Composite Decking",
      description:
        "High-end composite decking tiles combining wood aesthetics with modern durability. Features advanced UV protection and fade-resistant technology. Ideal for luxury outdoor spaces.",
      category: "Interlocking Tiles",
      brand: "PREMIUM",
      base_price: 59.9,
      features: [
        { icon: "✨", text: "Luxury Composite Material" },
        { icon: "🛡️", text: "Fade Resistant" },
        { icon: "🌞", text: "UV Protection" },
        { icon: "📦", text: "Pack of 8 tiles" },
      ],
      details: `Dimensions: 40cm x 40cm x 2.8cm
Weight: 1.8kg per tile, 14.4kg per pack
Material: Wood-plastic composite with protective coating
Package: 8 tiles/pack, covers approximately 1.28 square meters
Installation: Premium interlocking system, no tools required
Suitable for: High-end residential, commercial spaces, rooftop gardens
Maintenance: Minimal maintenance required, occasional cleaning
Warranty: 5 years`,
      featured: true,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      {
        product_id: product4.id,
        sku: "PREMIUM-COMP-WALNUT",
        material: "Composite",
        color: "Walnut",
        price: 59.9,
        stock_quantity: 200,
        image_url: "/images/premium-comp-walnut.jpg",
      },
      {
        product_id: product4.id,
        sku: "PREMIUM-COMP-TEAK",
        material: "Composite",
        color: "Teak",
        price: 64.9,
        stock_quantity: 150,
        image_url: "/images/premium-comp-teak.jpg",
      },
      {
        product_id: product4.id,
        sku: "PREMIUM-COMP-MAHOGANY",
        material: "Composite",
        color: "Mahogany",
        price: 64.9,
        stock_quantity: 120,
        image_url: "/images/premium-comp-mahogany.jpg",
      },
    ],
  });

  console.log("Created product 4: PREMIUM with 3 variants");

  // Product 5: ECO Bamboo Tiles
  const product5 = await prisma.product.create({
    data: {
      name: "ECO Bamboo Interlocking Tiles",
      description:
        "Sustainable bamboo tiles offering natural beauty and environmental responsibility. Fast-growing bamboo provides excellent durability while being eco-friendly. Perfect for environmentally conscious customers.",
      category: "Interlocking Tiles",
      brand: "ECO",
      base_price: 44.9,
      features: [
        { icon: "🎋", text: "Sustainable Bamboo" },
        { icon: "🌍", text: "Eco-Friendly" },
        { icon: "💪", text: "High Durability" },
        { icon: "📦", text: "Pack of 10 tiles" },
      ],
      details: `Dimensions: 30cm x 30cm x 2.2cm
Weight: 1.0kg per tile, 10kg per pack
Material: Natural bamboo with weather treatment
Package: 10 tiles/pack, covers approximately 0.9 square meters
Installation: Snap-together interlocking, eco-friendly adhesive optional
Suitable for: Eco-conscious homes, garden paths, yoga decks
Maintenance: Oil treatment recommended every 6 months
Warranty: 3 years`,
      featured: true,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      {
        product_id: product5.id,
        sku: "ECO-BAMBOO-NATURAL",
        material: "Bamboo",
        color: "Natural",
        price: 44.9,
        stock_quantity: 300,
        image_url: "/images/eco-bamboo-natural.jpg",
      },
      {
        product_id: product5.id,
        sku: "ECO-BAMBOO-CARBONIZED",
        material: "Bamboo",
        color: "Carbonized Brown",
        price: 47.9,
        stock_quantity: 250,
        image_url: "/images/eco-bamboo-carbonized.jpg",
      },
      {
        product_id: product5.id,
        sku: "ECO-BAMBOO-HONEY",
        material: "Bamboo",
        color: "Honey",
        price: 46.9,
        stock_quantity: 280,
        image_url: "/images/eco-bamboo-honey.jpg",
      },
    ],
  });

  console.log("Created product 5: ECO with 3 variants");

  // Product 6: RUBBER Safety Tiles
  const product6 = await prisma.product.create({
    data: {
      name: "RUBBER Safety Playground Tiles",
      description:
        "Heavy-duty rubber interlocking tiles designed for playgrounds and high-traffic areas. Excellent shock absorption and slip resistance. Available in vibrant colors for fun outdoor spaces.",
      category: "Safety Tiles",
      brand: "RUBBER",
      base_price: 34.9,
      features: [
        { icon: "🛡️", text: "Shock Absorption" },
        { icon: "👶", text: "Child Safe" },
        { icon: "🎨", text: "Vibrant Colors" },
        { icon: "📦", text: "Pack of 9 tiles" },
      ],
      details: `Dimensions: 50cm x 50cm x 2.5cm
Weight: 2.5kg per tile, 22.5kg per pack
Material: Recycled rubber composite
Package: 9 tiles/pack, covers approximately 2.25 square meters
Installation: Heavy-duty interlocking system
Suitable for: Playgrounds, gym areas, pet areas, workshops
Maintenance: Hose down regularly, resistant to most chemicals
Warranty: 3 years`,
      featured: false,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      {
        product_id: product6.id,
        sku: "RUBBER-SAFETY-RED",
        material: "Rubber",
        color: "Red",
        price: 34.9,
        stock_quantity: 400,
        image_url: "/images/rubber-safety-red.jpg",
      },
      {
        product_id: product6.id,
        sku: "RUBBER-SAFETY-BLUE",
        material: "Rubber",
        color: "Blue",
        price: 34.9,
        stock_quantity: 380,
        image_url: "/images/rubber-safety-blue.jpg",
      },
      {
        product_id: product6.id,
        sku: "RUBBER-SAFETY-YELLOW",
        material: "Rubber",
        color: "Yellow",
        price: 34.9,
        stock_quantity: 350,
        image_url: "/images/rubber-safety-yellow.jpg",
      },
      {
        product_id: product6.id,
        sku: "RUBBER-SAFETY-BLACK",
        material: "Rubber",
        color: "Black",
        price: 32.9,
        stock_quantity: 500,
        image_url: "/images/rubber-safety-black.jpg",
      },
    ],
  });

  console.log("Created product 6: RUBBER with 4 variants");

  // Create shopping carts for 3 users
  const variants = await prisma.productVariant.findMany();
  const [john, jane, bob] = allUsers.filter((u) => !u.is_admin);

  await prisma.cartItem.createMany({
    data: [
      // John's cart - 3 items
      {
        user_id: john.id,
        variant_id: variants.find((v) => v.sku === "RUNNEN-WOOD-GREY").id,
        quantity: 2,
      },
      {
        user_id: john.id,
        variant_id: variants.find((v) => v.sku === "MALLSTEN-STONE-DARK").id,
        quantity: 1,
      },
      {
        user_id: john.id,
        variant_id: variants.find((v) => v.sku === "ECO-BAMBOO-NATURAL").id,
        quantity: 3,
      },
      // Jane's cart - 2 items
      {
        user_id: jane.id,
        variant_id: variants.find((v) => v.sku === "PREMIUM-COMP-WALNUT").id,
        quantity: 4,
      },
      {
        user_id: jane.id,
        variant_id: variants.find((v) => v.sku === "RUNNEN-WOOD-WHITE").id,
        quantity: 2,
      },
      // Bob's cart - 1 item
      {
        user_id: bob.id,
        variant_id: variants.find((v) => v.sku === "BASIC-PLASTIC-GREEN").id,
        quantity: 5,
      },
    ],
  });

  console.log("Created shopping carts for 3 users");

  console.log("\n=== Database Seed Completed! ===");
  console.log("\nStatistics:");
  console.log(`Users: ${await prisma.user.count()}`);
  console.log(`Products: ${await prisma.product.count()}`);
  console.log(`Product Variants: ${await prisma.productVariant.count()}`);
  console.log(`Cart Items: ${await prisma.cartItem.count()}`);
  console.log("\nTest Accounts (all with password: password123):");
  console.log("- admin / admin@example.com (Admin)");
  console.log("- john_doe / john@example.com");
  console.log("- jane_smith / jane@example.com");
  console.log("- bob_wilson / bob@example.com");
  console.log("- alice_chen / alice@example.com");
  console.log("\nProducts Created:");
  console.log("1. RUNNEN Outdoor Decking (4 variants)");
  console.log("2. MÄLLSTEN Stone Pattern (4 variants)");
  console.log("3. BASIC Economy Tiles (3 variants)");
  console.log("4. PREMIUM Composite (3 variants)");
  console.log("5. ECO Bamboo Tiles (3 variants)");
  console.log("6. RUBBER Safety Tiles (4 variants)");
  console.log("\nTotal: 6 products with 21 variants");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
