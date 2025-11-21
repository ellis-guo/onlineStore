const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class CartService {
  // Get all cart items for a user
  async getCartItems(userId) {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        user_id: userId,
      },
      include: {
        variant: {
          include: {
            product: true, // Include product info for display
          },
        },
      },
      orderBy: {
        added_at: "desc",
      },
    });

    // Transform data for frontend
    const transformedItems = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      addedAt: item.added_at,
      variant: {
        id: item.variant.id,
        sku: item.variant.sku,
        material: item.variant.material,
        color: item.variant.color,
        price: item.variant.price,
        stockQuantity: item.variant.stock_quantity,
        imageUrl: item.variant.image_url,
        product: {
          id: item.variant.product.id,
          name: item.variant.product.name,
          description: item.variant.product.description,
        },
      },
    }));

    return transformedItems;
  }

  // Add item to cart
  async addToCart(userId, variantId, quantity) {
    // Validate quantity
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    // Check if variant exists and is active
    const variant = await prisma.productVariant.findUnique({
      where: {
        id: variantId,
      },
      include: {
        product: true,
      },
    });

    if (!variant) {
      throw new Error("Product variant not found");
    }

    if (!variant.is_active) {
      throw new Error("Product variant is not available");
    }

    if (!variant.product.is_active) {
      throw new Error("Product is not available");
    }

    // Check stock
    if (variant.stock_quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    // Check if item already in cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        user_id: userId,
        variant_id: variantId,
      },
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity (add to existing)
      const newQuantity = existingCartItem.quantity + quantity;

      // Check stock for new total quantity
      if (variant.stock_quantity < newQuantity) {
        throw new Error("Insufficient stock for requested quantity");
      }

      cartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: newQuantity,
        },
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          user_id: userId,
          variant_id: variantId,
          quantity: quantity,
        },
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return cartItem;
  }

  // Update cart item quantity
  async updateCartItem(userId, cartItemId, quantity) {
    // Validate quantity
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    // Find cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: {
        variant: true,
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    // Verify ownership
    if (cartItem.user_id !== userId) {
      throw new Error("Unauthorized");
    }

    // Check stock
    if (cartItem.variant.stock_quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    // Update quantity
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: quantity,
      },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
      },
    });

    return updatedCartItem;
  }

  // Remove item from cart
  async removeFromCart(userId, cartItemId) {
    // Find cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    // Verify ownership
    if (cartItem.user_id !== userId) {
      throw new Error("Unauthorized");
    }

    // Delete cart item
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return { message: "Item removed from cart" };
  }
}

module.exports = new CartService();
