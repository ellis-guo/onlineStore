import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProductById } from "../api/products.api";
import { addToCart } from "../api/cart.api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ProductDetail.css";
import ProductShowcase from "./ProductShowcase";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(id);
        setProduct(data);

        // If no variants, show error
        if (!data.variants || data.variants.length === 0) {
          setError("This product has no available options");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    const maxStock =
      product?.variants[selectedVariantIndex]?.stock_quantity || 0;

    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      // Redirect to login, save current location
      navigate("/login", {
        state: { from: location },
        replace: false,
      });
      return;
    }

    const selectedVariant = product.variants[selectedVariantIndex];

    // Prevent double-clicking
    if (addingToCart) {
      return;
    }

    try {
      setAddingToCart(true);

      // Call API to add to cart
      await addToCart(selectedVariant.id, quantity);

      // Show success message with link to cart
      const viewCart = window.confirm(
        `✓ Added ${quantity} item(s) to cart!\n\nClick OK to view cart, or Cancel to continue shopping.`
      );

      if (viewCart) {
        navigate("/cart");
      } else {
        // Reset quantity after adding
        setQuantity(1);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);

      // Handle specific errors
      if (err.response?.status === 401) {
        // Token expired, redirect to login
        navigate("/login", {
          state: { from: location },
          replace: false,
        });
        return;
      }

      // Show error message
      const errorMsg =
        err.response?.data?.error || "Failed to add to cart. Please try again.";
      alert(`❌ ${errorMsg}`);
    } finally {
      setAddingToCart(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <main className="detail-main">
          <div className="loading-container">
            <div className="loading"></div>
            <p>Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <main className="detail-main">
          <div className="error-container">
            <h2>Product Not Found</h2>
            <p>{error || "The product you're looking for doesn't exist."}</p>
            <button
              onClick={() => navigate("/products")}
              className="btn btn-primary"
            >
              Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get selected variant
  const selectedVariant = product.variants[selectedVariantIndex];

  // Calculate discount percentage
  const hasDiscount =
    selectedVariant.discount && parseFloat(selectedVariant.discount) > 0;
  const discountPercent = hasDiscount
    ? Math.round(
        (parseFloat(selectedVariant.discount) /
          parseFloat(selectedVariant.price)) *
          100
      )
    : 0;

  // Parse features
  const features = product.features
    ? typeof product.features === "string"
      ? JSON.parse(product.features)
      : product.features
    : [];

  // Generate images array (using selected variant's image or placeholder)
  const images = product.variants.map(
    (v) => v.image_url || "/placeholder-product.jpg"
  );

  return (
    <div className="product-detail-page">
      <Navbar />
      <main className="detail-main">
        <div className="detail-container">
          <div className="detail-content">
            {/* Left Side - Images */}
            <div className="detail-images">
              {/* Thumbnail Column */}
              <div className="thumbnail-column">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImageIndex === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="main-image">
                {hasDiscount && <div className="sale-badge">SALE</div>}
                <img src={images[selectedImageIndex]} alt={product.name} />
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="detail-info">
              <h1 className="product-title">{product.name}</h1>

              {/* Brand & Category */}
              {(product.brand || product.category) && (
                <div className="product-meta">
                  {product.brand && (
                    <span className="brand">{product.brand}</span>
                  )}
                  {product.brand && product.category && <span> • </span>}
                  {product.category && (
                    <span className="category">{product.category}</span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="product-pricing">
                <span className="current-price">
                  ${parseFloat(selectedVariant.price).toFixed(2)} CAD
                </span>
                {hasDiscount && (
                  <span className="discount-badge">-{discountPercent}%</span>
                )}
              </div>

              {/* Description */}
              <div className="product-description">
                <h2>Description</h2>
                <p>{product.description}</p>
              </div>

              {/* Details */}
              {product.details && (
                <div className="product-details">
                  <h3>Details</h3>
                  <p style={{ whiteSpace: "pre-line" }}>{product.details}</p>
                </div>
              )}

              {/* Variant Selection (Color/Material) */}
              {product.variants.length > 1 && (
                <div className="variant-selection">
                  <label className="selection-label">
                    {selectedVariant.material && selectedVariant.color
                      ? `${selectedVariant.material} - ${selectedVariant.color}`.toUpperCase()
                      : selectedVariant.color
                      ? `COLOR: ${selectedVariant.color}`.toUpperCase()
                      : `OPTION ${selectedVariantIndex + 1}`}
                  </label>
                  <div className="variant-options">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        className={`variant-option ${
                          selectedVariantIndex === index ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedVariantIndex(index);
                          setQuantity(1); // Reset quantity when changing variant
                        }}
                        title={`${variant.material || ""} ${
                          variant.color || ""
                        }`.trim()}
                      >
                        <span className="variant-label">
                          {variant.color || `Option ${index + 1}`}
                        </span>
                        <span className="variant-price">
                          ${parseFloat(variant.price).toFixed(2)}
                        </span>
                        {selectedVariantIndex === index && (
                          <span className="checkmark">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="product-features-list">
                  <h3>Features</h3>
                  <ul>
                    {features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-icon">{feature.icon}</span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label>Qty</label>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="qty-btn"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      const maxStock = selectedVariant.stock_quantity;
                      setQuantity(Math.max(1, Math.min(val, maxStock)));
                    }}
                    className="qty-input"
                    min="1"
                    max={selectedVariant.stock_quantity}
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="qty-btn"
                    disabled={quantity >= selectedVariant.stock_quantity}
                  >
                    +
                  </button>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={
                    selectedVariant.stock_quantity === 0 || addingToCart
                  }
                >
                  {addingToCart
                    ? "ADDING..."
                    : selectedVariant.stock_quantity === 0
                    ? "OUT OF STOCK"
                    : "ADD TO CART"}
                </button>
              </div>

              {/* Stock Info */}
              <div className="stock-info">
                {selectedVariant.stock_quantity > 0 ? (
                  <>
                    <span className="in-stock">● Available</span>
                    <span> ({selectedVariant.stock_quantity} in stock)</span>
                  </>
                ) : (
                  <span style={{ color: "var(--error)" }}>Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetail;
