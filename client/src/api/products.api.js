// Import the configured axios instance
import api from "./axios";

/**
 * Get all products from the backend
 * @returns {Promise<Array>} Array of product objects
 */
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

/**
 * Get a single product by ID
 * @param {number|string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
