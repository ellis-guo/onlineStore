const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/cart - Add item to cart (requires authentication)
router.post("/", requireAuth, async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  // Validate input
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ error: "productId and quantity are required" });
  }

  if (quantity < 1) {
    return res.status(400).json({ error: "quantity must be at least 1" });
  }

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) },
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Check if item already in cart
  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId: userId,
        productId: parseInt(productId),
      },
    },
  });

  let cartItem;

  if (existingCartItem) {
    // Update quantity (add to existing)
    cartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: existingCartItem.quantity + parseInt(quantity),
      },
      include: {
        product: true,
      },
    });
  } else {
    // Create new cart item
    cartItem = await prisma.cartItem.create({
      data: {
        userId: userId,
        productId: parseInt(productId),
        quantity: parseInt(quantity),
      },
      include: {
        product: true,
      },
    });
  }

  res.json({ message: "Added to cart", data: cartItem });
});

module.exports = router;
