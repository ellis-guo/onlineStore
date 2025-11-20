import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // GET /api/cart
    const mockCartItems = [
      {
        id: 1,
        productId: 1,
        name: "Ergo2 Pro Series Standing Desk",
        price: 329.99,
        quantity: 1,
        imageUrl: "/products/desk-1.jpg",
        color: "Black/Black",
      },
      {
        id: 2,
        productId: 2,
        name: "Premium Interlocking Deck Tile - Walnut",
        price: 89.99,
        quantity: 2,
        imageUrl: "/products/tile-walnut.jpg",
        color: "Natural Walnut",
      },
    ];

    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 500);
  }, []);

  const updateQuantity = (id, delta) => {
    // TODO: Call API to update quantity
    // PUT /api/cart/:id
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    // TODO: Call API to delete item
    // DELETE /api/cart/:id
    if (confirm("Remove this item from cart?")) {
      setCartItems((items) => items.filter((item) => item.id !== id));
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    // Can add tax, shipping, etc. here
    return calculateSubtotal();
  };

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
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    {/* Product Image */}
                    <Link
                      to={`/products/${item.productId}`}
                      className="item-image"
                    >
                      <img src={item.imageUrl} alt={item.name} />
                    </Link>

                    {/* Product Info */}
                    <div className="item-info">
                      <Link
                        to={`/products/${item.productId}`}
                        className="item-name"
                      >
                        {item.name}
                      </Link>
                      {item.color && (
                        <p className="item-color">Color: {item.color}</p>
                      )}
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="item-quantity">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Item Subtotal */}
                    <div className="item-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove Button */}
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
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
