const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ProductService {
  // Get all active products
  async getAllProducts() {
    const products = await prisma.product.findMany({
      where: {
        is_active: true,
      },
      include: {
        variants: {
          take: 1,
          orderBy: {
            id: "asc",
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // Add first variant's image to product
    const productsWithImages = products.map((product) => {
      const imageUrl =
        product.variants && product.variants.length > 0
          ? product.variants[0].image_url
          : null;

      return {
        ...product,
        image_url: imageUrl,
      };
    });

    return productsWithImages;
  }

  // Get single product by ID with all variants
  async getProductById(productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
      include: {
        variants: {
          orderBy: {
            id: "asc",
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
