import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      // Not logged in, redirect to login
      navigate("/login", { state: { from: { pathname: "/cart" } } });
    } else {
      // Logged in, go to cart
      navigate("/cart");
    }
  };

  const handleSignInClick = () => {
    if (!isAuthenticated) {
      window.open("/login", "_blank");
    } else {
      navigate("/profile");
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-text">Ryan's Decking</span>
        </Link>

        {/* Center Navigation Links - Desktop Only */}
        <ul className="navbar-nav desktop-nav">
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Our Decking
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>

        {/* Right Side Actions - Desktop */}
        <div className="navbar-actions desktop-actions">
          {/* Sign In Icon */}
          <button
            className="icon-btn"
            onClick={handleSignInClick}
            aria-label="Sign in"
            title="Sign in"
          >
            <svg
              className="icon user-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart Icon */}
          <button
            className="icon-btn cart-btn"
            onClick={handleCartClick}
            aria-label="Shopping cart"
            title="Shopping cart"
          >
            <svg
              className="icon cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? "open" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <ul className="mobile-nav">
          <li className="mobile-nav-item">
            <Link
              to="/products"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Our Decking
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/about" className="mobile-nav-link" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className="mobile-nav-divider"></li>
          <li className="mobile-nav-item">
            <button
              className="mobile-nav-link"
              onClick={() => {
                handleSignInClick();
                closeMenu();
              }}
            >
              <svg
                className="mobile-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Sign In
            </button>
          </li>
          <li className="mobile-nav-item">
            <button
              className="mobile-nav-link"
              onClick={() => {
                handleCartClick();
                closeMenu();
              }}
            >
              <svg
                className="mobile-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Cart
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
