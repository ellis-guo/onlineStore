// Import axios library
import axios from "axios";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: "https://onlinestore-kzw0.onrender.com/api", // Backend API address
  withCredentials: true, // Include cookies in requests (for JWT authentication)
  headers: {
    "Content-Type": "application/json", // Send JSON data
  },
});

// Export the configured axios instance
export default api;
