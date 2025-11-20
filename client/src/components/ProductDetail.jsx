import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulating API call with mock data
    const mockProduct = {
      id: parseInt(id),
      name: "Ergo2 Pro Series Standing Desk",
      price: 230.99,
      originalPrice: 329.99,
      rating: 5.0,
      reviewCount: 152,
      images: [
        "/products/desk-1.jpg",
        "/products/desk-2.jpg",
        "/products/desk-3.jpg",
        "/products/desk-4.jpg",
      ],
      colors: [
        { name: "Black/Black", value: "#000000" },
        { name: "White/Silver", value: "#FFFFFF" },
      ],
      description: `Enhance Comfort and Productivity with MotionGrey's Ergonomic Standing Desks`,
      details: `The MotionGrey Standing Desk Pro is powered by dual motors for smooth and reliable height adjustment. Its heavy-duty frame supports multiple monitors, equipment, and larger setups with ease. Built for both home and commercial spaces, it combines strength, stability, and ergonomic comfort.`,
      features: [
        "Powerful Dual Motor System",
        "3 Years Warranty",
        'Two-Segment frame height ranges from 28" to 46"',
        "2 Preset Memory Keypad",
      ],
      inStock: true,
      shippingInfo: "Ships for free in 3-7 business days | 30-day returns",
    };

    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 300);
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", { product, quantity, color: selectedColor });
    alert("Added to cart! (Feature coming soon)");
  };

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

  if (!product) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <main className="detail-main">
          <div className="error-container">
            <h2>Product Not Found</h2>
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

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
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
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="main-image">
                {product.originalPrice > product.price && (
                  <div className="sale-badge">SALE</div>
                )}
                <img src={product.images[selectedImage]} alt={product.name} />
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="detail-info">
              <h1 className="product-title">{product.name}</h1>

              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star filled">
                      ★
                    </span>
                  ))}
                  <span className="rating-number">{product.rating}</span>
                </div>
                <span className="review-count">
                  ({product.reviewCount} Reviews)
                </span>
                <span className="shipping-badge">+ FREE SHIPPING</span>
              </div>

              {/* Price */}
              <div className="product-pricing">
                <span className="current-price">
                  ${product.price.toFixed(2)} CAD
                </span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">
                      ${product.originalPrice.toFixed(2)} CAD
                    </span>
                    <span className="discount-badge">-{discount}%</span>
                  </>
                )}
              </div>

              <div className="coupon-info">
                <span className="coupon-tag">Coupon</span>
                <span className="code-applied">✓ Code applied!</span>
              </div>

              {/* Description */}
              <div className="product-description">
                <h2>{product.description}</h2>
                <p>{product.details}</p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="color-selection">
                  <label className="selection-label">
                    TABLETOP - FRAME COLOR:{" "}
                    {product.colors[selectedColor].name.toUpperCase()}
                  </label>
                  <div className="color-options">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`color-option ${
                          selectedColor === index ? "active" : ""
                        }`}
                        onClick={() => setSelectedColor(index)}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.name}
                      >
                        {selectedColor === index && (
                          <span className="checkmark">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label>Qty</label>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="qty-input"
                    min="1"
                    max="99"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  ADD TO CART
                </button>
              </div>

              {/* Stock & Shipping Info */}
              <div className="stock-info">
                <span className="in-stock">● Available</span> |{" "}
                {product.shippingInfo}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetail;
