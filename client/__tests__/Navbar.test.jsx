import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Navbar from "../src/components/Navbar";
import { AuthContext } from "../src/context/AuthContext";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Test suite for Navbar component
describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper function to render Navbar with AuthContext
  const renderNavbar = (isAuthenticated = false) => {
    return render(
      <AuthContext.Provider value={{ isAuthenticated }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  // Test: Check if logo and brand name are displayed
  test("renders logo and brand name", () => {
    renderNavbar();

    const logo = screen.getByAltText("Ryan's Decking Logo");
    expect(logo).toBeInTheDocument();

    const brandName = screen.getByText("Ryan's Decking");
    expect(brandName).toBeInTheDocument();
  });

  // Test: Check if all navigation links are displayed
  test("renders all navigation links", () => {
    renderNavbar();

    const deckingLinks = screen.getAllByText("Decking");
    expect(deckingLinks.length).toBeGreaterThan(0);

    const fencingLinks = screen.getAllByText("Fencing");
    expect(fencingLinks.length).toBeGreaterThan(0);

    const gardenLinks = screen.getAllByText("Garden & Tools");
    expect(gardenLinks.length).toBeGreaterThan(0);

    const aboutLinks = screen.getAllByText("About");
    expect(aboutLinks.length).toBeGreaterThan(0);
  });

  // Test: Check if Sign In and Cart buttons exist
  test("renders sign in and cart buttons", () => {
    renderNavbar();

    const signInButton = screen.getByLabelText("Sign in");
    const cartButton = screen.getByLabelText("Shopping cart");

    expect(signInButton).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
  });

  // Test: Check mobile menu toggle functionality
  test("opens mobile menu when hamburger button is clicked", () => {
    renderNavbar();

    const menuToggle = screen.getByLabelText("Toggle navigation menu");
    fireEvent.click(menuToggle);

    const mobileMenu = document.querySelector(".mobile-menu");
    expect(mobileMenu).toHaveClass("active");
  });

  // Test: Cart button navigation when not authenticated
  test("navigates to login when cart button clicked and not authenticated", () => {
    renderNavbar(false);

    const cartButton = screen.getByLabelText("Shopping cart");
    fireEvent.click(cartButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login", {
      state: { from: { pathname: "/cart" } },
    });
  });

  // Test: Cart button navigation when authenticated
  test("navigates to cart when cart button clicked and authenticated", () => {
    renderNavbar(true);

    const cartButton = screen.getByLabelText("Shopping cart");
    fireEvent.click(cartButton);

    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});
