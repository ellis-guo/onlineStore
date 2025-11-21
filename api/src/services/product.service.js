const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ProductService {
  // Get all active products
  async getAllProducts() {
    const products = await prisma.product.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return products;
  }

  // Get single product by ID with all variants
  async getProductById(productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
      include: {
        variants: {
          where: {
            is_active: true, // Only return active variants
          },
          orderBy: {
            price: "asc", // Sort by price, cheapest first
          },
        },
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.is_active) {
      throw new Error("Product is not available");
    }

    return product;
  }
}

module.exports = new ProductService();
