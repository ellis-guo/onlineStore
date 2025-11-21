import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCart, updateCartItem, removeFromCart } from "../api/cart.api";
import { useAuth } from "../context/AuthContext";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCart();
        setCartItems(data.cartItems || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);

        // If 401 (unauthorized), redirect to login
        if (err.response?.status === 401) {
          navigate("/login", { state: { from: { pathname: "/cart" } } });
          return;
        }

        setError("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  // Update item quantity
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    // Optimistic update - update UI immediately
    const previousItems = [...cartItems];
    setCartItems(
      cartItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      await updateCartItem(cartItemId, newQuantity);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      // Revert on error
      setCartItems(previousItems);
      alert(err.response?.data?.error || "Failed to update quantity");
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (cartItemId) => {
    if (!confirm("Remove this item from cart?")) {
      return;
    }

    // Optimistic update
    const previousItems = [...cartItems];
    setCartItems(cartItems.filter((item) => item.id !== cartItemId));

    try {
      await removeFromCart(cartItemId);
    } catch (err) {
      console.error("Failed to remove item:", err);
      // Revert on error
      setCartItems(previousItems);
      alert(err.response?.data?.error || "Failed to remove item");
    }
  };

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.variant.price);
      return sum + price * item.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal(); // Can add tax, shipping later
  };

  // Loading state
  if (loading) {
    return (
      <div className="cart-page">
        <Navbar />
        <main className="cart-main">
          <div className="loading-container">
            <div className="loading"></div>
            <p>Loading cart...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="cart-page">
        <Navbar />
        <main className="cart-main">
          <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="empty-cart">
              <p style={{ color: "var(--error)" }}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Navbar />
      <main className="cart-main">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add some products to get started!</p>
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse Products
              </Link>
            </div>
          ) : (
            // Cart with Items
            <div className="cart-content">
              {/* Cart Items List */}
              <div className="cart-items">
                {cartItems.map((item) => {
                  const maxStock = item.variant.stock_quantity;

                  return (
                    <div key={item.id} className="cart-item">
                      {/* Product Image */}
                      <Link
                        to={`/products/${item.variant.product.id}`}
                        className="item-image"
                      >
                        <img
                          src={
                            item.variant.image_url || "/placeholder-product.jpg"
                          }
                          alt={item.variant.product.name}
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="item-info">
                        <Link
                          to={`/products/${item.variant.product.id}`}
                          className="item-name"
                        >
                          {item.variant.product.name}
                        </Link>
                        {item.variant.color && (
                          <p className="item-color">
                            Color: {item.variant.color}
                            {item.variant.material &&
                              ` • ${item.variant.material}`}
                          </p>
                        )}
                        <p className="item-price">
                          ${parseFloat(item.variant.price).toFixed(2)}
                        </p>
                        {item.variant.sku && (
                          <p className="item-sku">SKU: {item.variant.sku}</p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="item-quantity">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="qty-display">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= maxStock}
                        >
                          +
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <div className="item-subtotal">
                        $
                        {(
                          parseFloat(item.variant.price) * item.quantity
                        ).toFixed(2)}
                      </div>

                      {/* Remove Button */}
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <h2 className="summary-title">Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">FREE</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span className="total-amount">
                    ${calculateTotal().toFixed(2)} CAD
                  </span>
                </div>

                <button className="checkout-btn">PROCEED TO CHECKOUT</button>

                <Link to="/products" className="continue-shopping">
                  ← Continue Shopping
                </Link>

                <div className="payment-info">
                  <p>🔒 Secure Checkout</p>
                  <p className="payment-methods">
                    We accept: 💳 Visa • MasterCard • Amex
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
