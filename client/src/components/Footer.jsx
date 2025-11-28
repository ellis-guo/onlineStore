import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Footer Columns */}
        <div className="footer-columns">
          {/* Explore */}
          <div className="footer-column">
            <h3 className="footer-heading">EXPLORE</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li>
                <Link to="/locations/burnaby">Burnaby</Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="footer-column">
            <h3 className="footer-heading">INFO</h3>
            <ul className="footer-links">
              <li>
                <Link to="/returns">Returns/Exchanges</Link>
              </li>
              <li>
                <Link to="/guides">How To Guides</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="footer-column">
            <h3 className="footer-heading">GET IN TOUCH</h3>
            <ul className="footer-links">
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/showrooms">Visit Our Showrooms</Link>
              </li>
              <li>
                <Link to="/commercial">Commercial Solutions</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h3 className="footer-heading">BUILD YOUR DREAM OFFICE</h3>
            <p className="newsletter-description">
              Get emails about our products and receive special offers
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit">
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="contact-bar">
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <a href="tel:+11111111111">+1 (111) 111-1111</a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <a href="mailto:support@ryansdecking.com">
              support@ryansdecking.com
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>#100-1234 Deck Street, Burnaby, BC V5X 1X1</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear}, Ryan's Decking. All Rights Reserved.
          </p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms Of Service</Link>
            <Link to="/refund">Refund Policy</Link>
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/affiliate">Affiliate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
