import "./ProductsPreview.css";

function ProductsPreview() {
  return (
    <section className="products-preview-section">
      <div className="products-content">
        <div className="section-header">
          <h2 className="section-title">Best Seller</h2>
          <p className="section-description">Discover our premium products</p>
        </div>

        {/* Placeholder for product cards */}
        <div className="products-grid">
          <div className="product-placeholder">
            <div className="placeholder-content">
              <span className="placeholder-icon">📦</span>
              <p>Product Card #1</p>
            </div>
          </div>
          <div className="product-placeholder">
            <div className="placeholder-content">
              <span className="placeholder-icon">📦</span>
              <p>Product Card #2</p>
            </div>
          </div>
          <div className="product-placeholder">
            <div className="placeholder-content">
              <span className="placeholder-icon">📦</span>
              <p>Product Card #3</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsPreview;
