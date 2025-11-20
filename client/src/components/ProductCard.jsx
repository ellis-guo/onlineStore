import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  // Calculate discount percentage if there's an original price
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-wrapper">
        <img
          src={product.imageUrl || "/placeholder-product.jpg"}
          alt={product.name}
          className="product-image"
        />
        {hasDiscount && (
          <div className="discount-badge">-{discountPercent}%</div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {/* Price */}
        <div className="product-pricing">
          <span className="product-price">${product.price}</span>
          {hasDiscount && (
            <span className="product-original-price">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            {product.reviewCount && (
              <span className="review-count">
                {product.reviewCount} Reviews
              </span>
            )}
          </div>
        )}

        {/* Shop Button */}
        <Link to={`/products/${product.id}`} className="shop-button">
          SHOP
        </Link>
      </div>

      {/* Product Features */}
      {product.features && product.features.length > 0 && (
        <div className="product-features">
          {product.features.map((feature, index) => (
            <div key={index} className="feature-item">
              <span className="feature-icon">{feature.icon}</span>
              <span className="feature-text">{feature.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
