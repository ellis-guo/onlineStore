import "./ProductShowcase.css";

function ProductShowcase() {
  return (
    <div className="product-showcase">
      {/* Hero Section with Color Block */}
      <div className="showcase-hero-block">
        <div className="hero-content">
          <h2 className="hero-title">Safety Meets Fun</h2>
          <p className="hero-subtitle">
            Premium rubber playground tiles engineered for active play
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="showcase-intro">
        <p className="intro-text">
          Our RUBBER Safety Playground Tiles are engineered to provide maximum
          protection for children during active play. Made from 100% recycled
          rubber, these tiles offer superior shock absorption while creating a
          vibrant, engaging play environment.
        </p>
        <div className="intro-highlight">
          <span className="highlight-icon">🛡️</span>
          <p className="highlight-text">
            Certified for fall heights up to 6 feet - Meeting ASTM F1292
            standards for impact protection
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="showcase-features-block">
        <h3 className="features-title">Why Choose Our Rubber Tiles?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h4>Fall Protection</h4>
            <p>
              Certified for falls up to 6 feet, protecting children during
              active play
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">02</div>
            <h4>All-Weather</h4>
            <p>
              UV-resistant and waterproof, designed to withstand harsh outdoor
              conditions
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">03</div>
            <h4>Quick Drainage</h4>
            <p>
              Perforated design allows water to flow through, keeping play areas
              dry
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">04</div>
            <h4>Eco-Friendly</h4>
            <p>
              Made from recycled rubber tires, diverting waste from landfills
            </p>
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="showcase-install-block">
        <h3 className="install-title">Easy DIY Installation</h3>
        <p className="install-subtitle">
          Transform your playground in 4 simple steps
        </p>
        <div className="install-steps">
          <div className="step-item">
            <div className="step-icon">🧹</div>
            <h4>Prepare</h4>
            <p>Clean and level your existing surface</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-icon">🔗</div>
            <h4>Connect</h4>
            <p>Snap tiles together with built-in connectors</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-icon">✂️</div>
            <h4>Trim</h4>
            <p>Cut edges to fit perfectly</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-icon">✓</div>
            <h4>Play</h4>
            <p>Ready for use immediately</p>
          </div>
        </div>
      </div>

      {/* Certifications Block */}
      <div className="showcase-cert-block">
        <h3 className="cert-title">Safety Certifications</h3>
        <div className="cert-badges">
          <div className="cert-item">
            <span className="cert-check">✓</span>
            <p>ASTM F1292</p>
          </div>
          <div className="cert-item">
            <span className="cert-check">✓</span>
            <p>CPSC Guidelines</p>
          </div>
          <div className="cert-item">
            <span className="cert-check">✓</span>
            <p>ADA Accessible</p>
          </div>
          <div className="cert-item">
            <span className="cert-check">✓</span>
            <p>Made in USA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShowcase;
