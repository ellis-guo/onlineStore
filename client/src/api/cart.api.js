// Import the configured axios instance
import api from "./axios";

/**
 * Get current user's cart items
 * @returns {Promise<Object>} Object containing cartItems array
 */
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

/**
 * Add a product variant to cart
 * @param {number} variantId - Product variant ID
 * @param {number} quantity - Quantity to add
 * @returns {Promise<Object>} Created/updated cart item
 */
export const addToCart = async (variantId, quantity) => {
  const response = await api.post("/cart", {
    variantId,
    quantity,
  });
  return response.data;
};

/**
 * Update cart item quantity
 * @param {number} cartItemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} Updated cart item
 */
export const updateCartItem = async (cartItemId, quantity) => {
  const response = await api.patch(`/cart/${cartItemId}`, {
    quantity,
  });
  return response.data;
};

/**
 * Remove item from cart
 * @param {number} cartItemId - Cart item ID
 * @returns {Promise<Object>} Success message
 */
export const removeFromCart = async (cartItemId) => {
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data;
};
