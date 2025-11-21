import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  // Parse features from JSON if it exists
  const features = product.features
    ? typeof product.features === "string"
      ? JSON.parse(product.features)
      : product.features
    : [];

  return (
    <div className="product-card">
      {/* Product Image - using placeholder for now */}
      <div className="product-image-wrapper">
        <img
          src={product.image_url || "/placeholder-product.jpg"}
          alt={product.name}
          className="product-image"
        />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {/* Price */}
        <div className="product-pricing">
          <span className="product-price">
            ${parseFloat(product.base_price).toFixed(2)}
          </span>
        </div>

        {/* Category/Brand */}
        {(product.category || product.brand) && (
          <p className="product-category">
            {product.brand && `${product.brand}`}
            {product.brand && product.category && " • "}
            {product.category && product.category}
          </p>
        )}

        {/* Shop Button */}
        <Link to={`/products/${product.id}`} className="shop-button">
          SHOP
        </Link>
      </div>

      {/* Product Features */}
      {features.length > 0 && (
        <div className="product-features">
          {features.slice(0, 4).map((feature, index) => (
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
