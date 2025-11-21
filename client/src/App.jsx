// Import routing tools
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import AuthProvider
import { AuthProvider } from "./context/AuthContext";

// Import RequireAuth component
import RequireAuth from "./components/RequireAuth";

// Import all page components
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";
import ProductDetail from "./components/ProductDetail";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes - anyone can access */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Protected route - requires authentication */}
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
