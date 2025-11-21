import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getAllProducts } from "../api/products.api";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call API to get real data
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array = run once on mount

  // Loading state
  if (loading) {
    return (
      <div className="products-page">
        <Navbar />
        <main className="products-main">
          <div className="products-content">
            <div className="loading-container">
              <div className="loading"></div>
              <p>Loading products...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="products-page">
        <Navbar />
        <main className="products-main">
          <div className="products-content">
            <div className="loading-container">
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
    <div className="products-page">
      <Navbar />
      <main className="products-main">
        <div className="products-content">
          {/* Page Header */}
          <div className="products-header">
            <h1 className="products-title">Our Decking Collection</h1>
            <p className="products-subtitle">
              Premium interlocking deck tiles for your outdoor space
            </p>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Products;
