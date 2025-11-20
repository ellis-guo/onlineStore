import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // For now, using mock data
    const mockProducts = [
      {
        id: 1,
        name: "Ergo2 Pro Series Standing Desk",
        price: 329.99,
        originalPrice: 399.99,
        imageUrl: "/products/desk-1.jpg",
        rating: 4.5,
        reviewCount: 152,
        features: [
          { icon: "🔧", text: "Powerful Dual Motor System" },
          { icon: "⚙️", text: "3 Years Warranty" },
          {
            icon: "📏",
            text: 'Two-Segment frame height ranges from 28" to 46"',
          },
          { icon: "⌨️", text: "2 Preset Memory Keypad" },
        ],
      },
      {
        id: 2,
        name: "Premium Interlocking Deck Tile - Walnut",
        price: 89.99,
        originalPrice: 119.99,
        imageUrl: "/products/tile-walnut.jpg",
        rating: 5,
        reviewCount: 87,
        features: [
          { icon: "🌲", text: "Natural Acacia Wood" },
          { icon: "💧", text: "Weather Resistant" },
          { icon: "🔨", text: "Easy Installation" },
          { icon: "📦", text: "Pack of 10 tiles" },
        ],
      },
      {
        id: 3,
        name: "Classic Grey Composite Deck Tile",
        price: 79.99,
        imageUrl: "/products/tile-grey.jpg",
        rating: 4.8,
        reviewCount: 203,
        features: [
          { icon: "♻️", text: "Eco-Friendly Composite" },
          { icon: "🌞", text: "UV Resistant" },
          { icon: "🧹", text: "Low Maintenance" },
          { icon: "📐", text: '12" x 12" per tile' },
        ],
      },
      {
        id: 4,
        name: "Natural Teak Interlocking Tile",
        price: 129.99,
        originalPrice: 159.99,
        imageUrl: "/products/tile-teak.jpg",
        rating: 4.9,
        reviewCount: 156,
        features: [
          { icon: "🪵", text: "Premium Teak Wood" },
          { icon: "💪", text: "Extra Durable" },
          { icon: "🌧️", text: "All-Weather Performance" },
          { icon: "✨", text: "Natural Oil Finish" },
        ],
      },
      {
        id: 5,
        name: "Modern Black Composite Tile",
        price: 69.99,
        imageUrl: "/products/tile-black.jpg",
        rating: 4.6,
        reviewCount: 94,
        features: [
          { icon: "🎨", text: "Contemporary Design" },
          { icon: "🔥", text: "Heat Resistant" },
          { icon: "👟", text: "Anti-Slip Surface" },
          { icon: "⚡", text: "Quick Connect System" },
        ],
      },
      {
        id: 6,
        name: "Bamboo Eco Deck Tile",
        price: 99.99,
        imageUrl: "/products/tile-bamboo.jpg",
        rating: 4.7,
        reviewCount: 128,
        features: [
          { icon: "🎋", text: "Sustainable Bamboo" },
          { icon: "🌍", text: "Environmentally Friendly" },
          { icon: "💎", text: "Premium Grade" },
          { icon: "🔒", text: "Secure Locking System" },
        ],
      },
    ];

    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

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
