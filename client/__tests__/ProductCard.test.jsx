import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import ProductCard from "../src/components/ProductCard";

// Mock product data for testing
const mockProduct = {
  id: 1,
  name: "RUNNEN Outdoor Decking",
  base_price: 29.99,
  category: "Decking",
  brand: "Ryan's",
  image_url: "https://example.com/deck.jpg",
  features: [],
};

// Test suite for ProductCard component
describe("ProductCard Component", () => {
  // Test: Check if product name is displayed
  test("displays product name", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText("RUNNEN Outdoor Decking")).toBeInTheDocument();
  });

  // Test: Check if product price is displayed correctly
  test("displays product price", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(/\$29\.99/)).toBeInTheDocument();
  });

  // Test: Check if product image exists with correct alt text
  test("displays product image with alt text", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const image = screen.getByAltText("RUNNEN Outdoor Decking");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/deck.jpg");
  });

  // Test: Check if SHOP button link exists
  test("has SHOP button linking to product detail page", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const shopLink = screen.getByText("SHOP");
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute("href", "/products/1");
  });
});
