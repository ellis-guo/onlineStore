import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <main className="about-main">
        <div className="about-content">
          {/* Hero Section */}
          <section className="about-hero">
            <h1 className="about-title">About Ryan's Decking</h1>
            <p className="about-subtitle">
              Bringing Premium Outdoor Living Solutions from China to the World
            </p>
          </section>

          {/* Company Story */}
          <section className="about-section">
            <div className="section-content">
              <h2 className="section-title">Our Story</h2>
              <div className="story-text">
                <p>
                  Founded in Guangzhou, China, Ryan's Decking has been at the
                  forefront of innovative outdoor decking solutions for over a
                  decade. We are dedicated to transforming outdoor spaces with
                  high-quality, eco-friendly interlocking deck tiles that
                  combine durability, aesthetics, and ease of installation.
                </p>
                <p>
                  Our commitment to excellence has made us a trusted name in the
                  industry, serving customers across North America and beyond.
                  Every product we create reflects our passion for outdoor
                  living and our dedication to sustainable practices.
                </p>
              </div>
            </div>
          </section>

          {/* Our Mission */}
          <section className="about-section mission-section">
            <div className="section-content">
              <h2 className="section-title">Our Mission</h2>
              <div className="mission-grid">
                <div className="mission-card">
                  <div className="mission-icon">🌱</div>
                  <h3>Sustainability</h3>
                  <p>
                    We prioritize eco-friendly materials and sustainable
                    manufacturing processes to minimize our environmental
                    impact.
                  </p>
                </div>
                <div className="mission-card">
                  <div className="mission-icon">💎</div>
                  <h3>Quality</h3>
                  <p>
                    Every deck tile undergoes rigorous quality control to ensure
                    it meets our high standards for durability and performance.
                  </p>
                </div>
                <div className="mission-card">
                  <div className="mission-icon">🤝</div>
                  <h3>Customer First</h3>
                  <p>
                    We believe in building lasting relationships with our
                    customers through exceptional service and support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="about-section">
            <div className="section-content">
              <h2 className="section-title">Why Choose Ryan's Decking?</h2>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-content">
                    <h3>Premium Materials</h3>
                    <p>
                      We source only the finest wood and composite materials for
                      lasting beauty and performance.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-content">
                    <h3>Easy Installation</h3>
                    <p>
                      Our interlocking design means no tools required - simply
                      snap tiles together in minutes.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-content">
                    <h3>Weather Resistant</h3>
                    <p>
                      Engineered to withstand harsh weather conditions while
                      maintaining their appearance.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-content">
                    <h3>Versatile Design</h3>
                    <p>
                      Perfect for patios, balconies, pool areas, and any outdoor
                      space you want to enhance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="about-section cta-section">
            <div className="cta-content">
              <h2>Ready to Transform Your Outdoor Space?</h2>
              <p>
                Explore our collection of premium deck tiles and start your
                project today.
              </p>
              <div className="cta-buttons">
                <a href="/products" className="btn btn-primary btn-lg">
                  Browse Products
                </a>
                <a
                  href="mailto:info@ryansdecking.com"
                  className="btn btn-outline btn-lg"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default About;
