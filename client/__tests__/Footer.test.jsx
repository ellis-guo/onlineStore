import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import Footer from "../src/components/Footer";

// Test suite for Footer component
describe("Footer Component", () => {
  // Test: Check if company name is displayed
  test("displays company name", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Ryan's Decking/i)).toBeInTheDocument();
  });

  // Test: Check if copyright info is displayed
  test("displays copyright text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/© 2025/i)).toBeInTheDocument();
  });

  // Test: Verify footer sections are rendered
  test("renders all footer sections", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("EXPLORE")).toBeInTheDocument();
    expect(screen.getByText("INFO")).toBeInTheDocument();
    expect(screen.getByText("GET IN TOUCH")).toBeInTheDocument();
  });
});
