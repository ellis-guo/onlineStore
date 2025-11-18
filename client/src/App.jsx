// Import routing tools from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all page components
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page - accessible at / */}
        <Route path="/" element={<Home />} />

        {/* Register page - accessible at /register */}
        <Route path="/register" element={<Register />} />

        {/* Login page - accessible at /login */}
        <Route path="/login" element={<Login />} />

        {/* Products page - accessible at /products */}
        <Route path="/products" element={<Products />} />

        {/* Cart page - accessible at /cart */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
