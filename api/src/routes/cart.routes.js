const express = require("express");
const cartService = require("../services/cart.service");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// All cart routes require authentication
router.use(requireAuth);

// GET /api/cart - Get user's cart items
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItems = await cartService.getCartItems(userId);
    res.json({ cartItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/cart - Add item to cart
router.post("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { variantId, quantity } = req.body;

    // Validate input
    if (!variantId || !quantity) {
      return res
        .status(400)
        .json({ error: "variantId and quantity are required" });
    }

    const cartItem = await cartService.addToCart(
      userId,
      parseInt(variantId),
      parseInt(quantity)
    );

    res.status(201).json({ message: "Added to cart", cartItem });
  } catch (error) {
    if (
      error.message === "Product variant not found" ||
      error.message === "Product variant is not available" ||
      error.message === "Product is not available"
    ) {
      return res.status(404).json({ error: error.message });
    }
    if (
      error.message === "Insufficient stock" ||
      error.message === "Insufficient stock for requested quantity" ||
      error.message === "Quantity must be at least 1"
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/cart/:id - Update cart item quantity
router.patch("/:id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItemId = parseInt(req.params.id);
    const { quantity } = req.body;

    // Validate input
    if (!quantity) {
      return res.status(400).json({ error: "quantity is required" });
    }

    const cartItem = await cartService.updateCartItem(
      userId,
      cartItemId,
      parseInt(quantity)
    );

    res.json({ message: "Cart item updated", cartItem });
  } catch (error) {
    if (error.message === "Cart item not found") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === "Unauthorized") {
      return res.status(403).json({ error: error.message });
    }
    if (
      error.message === "Insufficient stock" ||
      error.message === "Quantity must be at least 1"
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItemId = parseInt(req.params.id);

    const result = await cartService.removeFromCart(userId, cartItemId);

    res.json(result);
  } catch (error) {
    if (error.message === "Cart item not found") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === "Unauthorized") {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
