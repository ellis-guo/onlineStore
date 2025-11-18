const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 清空现有数据
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 创建用户
  const hashedPassword = await bcrypt.hash("Test123!", 10);
  const hashedAdminPassword = await bcrypt.hash("Admin123!", 10);

  const testUser = await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
      fullName: "Test User",
      phone: "123-456-7890",
      isAdmin: false,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@decktiles.com",
      password: hashedAdminPassword,
      fullName: "Admin User",
      isAdmin: true,
    },
  });

  console.log("✅ Created users:", {
    testUser: testUser.username,
    admin: adminUser.username,
  });

  // 创建产品
  const products = [
    {
      name: "Classic Wood Composite Deck Tile",
      description:
        "Durable weather-resistant composite deck tiles perfect for outdoor spaces. Easy click-together installation.",
      price: 24.99,
      stockQuantity: 150,
      material: "Wood Composite",
      size: "12x12 inches",
      color: "Dark Gray",
      imageUrl:
        "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=500",
    },
    {
      name: "Premium Acacia Hardwood Tile",
      description:
        "Natural acacia hardwood deck tiles with beautiful grain patterns. Pre-oiled finish for longevity.",
      price: 34.99,
      stockQuantity: 100,
      material: "Acacia",
      size: "12x12 inches",
      color: "Natural Brown",
      imageUrl:
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500",
    },
    {
      name: "Modern Plastic Deck Tile - White",
      description:
        "Lightweight and maintenance-free plastic deck tiles. UV-resistant and perfect for balconies.",
      price: 15.99,
      stockQuantity: 200,
      material: "Plastic",
      size: "12x12 inches",
      color: "White",
      imageUrl:
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=500",
    },
    {
      name: "Rustic Wood Composite - Brown",
      description:
        "Classic brown wood composite tiles with anti-slip surface. Ideal for poolside applications.",
      price: 27.99,
      stockQuantity: 120,
      material: "Wood Composite",
      size: "12x12 inches",
      color: "Brown",
      imageUrl:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500",
    },
    {
      name: "Elegant Acacia Deck Tile Set",
      description:
        "Premium acacia wood tile set with smooth finish. Perfect for creating a warm outdoor ambiance.",
      price: 39.99,
      stockQuantity: 80,
      material: "Acacia",
      size: "12x12 inches",
      color: "Honey Brown",
      imageUrl:
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=500",
    },
    {
      name: "Contemporary Plastic Tile - Black",
      description:
        "Sleek black plastic deck tiles with modern aesthetic. Drainage holes for water management.",
      price: 18.99,
      stockQuantity: 180,
      material: "Plastic",
      size: "12x12 inches",
      color: "Black",
      imageUrl:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500",
    },
    {
      name: "Premium Composite Tile - Charcoal",
      description:
        "High-quality composite deck tiles in sophisticated charcoal. Fade-resistant technology.",
      price: 29.99,
      stockQuantity: 140,
      material: "Wood Composite",
      size: "12x12 inches",
      color: "Charcoal",
      imageUrl:
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=500",
    },
    {
      name: "Natural Acacia Wood Tile",
      description:
        "Authentic acacia wood deck tiles with natural finish. Easy to maintain and long-lasting.",
      price: 32.99,
      stockQuantity: 90,
      material: "Acacia",
      size: "12x12 inches",
      color: "Natural",
      imageUrl:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500",
    },
    {
      name: "Budget Plastic Deck Tile - Gray",
      description:
        "Affordable plastic deck tiles in neutral gray. Perfect for DIY projects and temporary installations.",
      price: 12.99,
      stockQuantity: 250,
      material: "Plastic",
      size: "12x12 inches",
      color: "Gray",
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500",
    },
    {
      name: "Luxury Composite Tile - Espresso",
      description:
        "Top-tier wood composite deck tiles in rich espresso color. Commercial-grade durability.",
      price: 44.99,
      stockQuantity: 60,
      material: "Wood Composite",
      size: "12x12 inches",
      color: "Espresso",
      imageUrl:
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=500",
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("✅ Created 10 products");
  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
