import { render, screen } from "@testing-library/react";



import "@testing-library/jest-dom";
// Update the import path as necessary

import { EmptyPlaceholder } from "@/components/empty-placeholder";





// Ensure this is the correct path

// Mocking Icons for simplicity, adjust according to your actual implementation
jest.mock('@/components/icons', () => ({
  // Return a mock SVG for any icon name
  __esModule: true,
  Icons: new Proxy({}, {
    // @ts-ignore
    get: (target, name) => () => <svg data-testid={`icon-${name}`}></svg>,
  }),
}));

describe("EmptyPlaceholder", () => {
  it("renders correctly with children", () => {
    render(
      <EmptyPlaceholder>
        <div>Test Child</div>
      </EmptyPlaceholder>
    )

    expect(screen.getByText("Test Child")).toBeInTheDocument()
  })

  it("applies custom className and other props", () => {
    const { container } = render(
      <EmptyPlaceholder className="custom-class" data-testid="custom-element" />
    )

    expect(container.firstChild).toHaveClass("custom-class")
    expect(screen.getByTestId("custom-element")).toBeInTheDocument()
  })

  describe("EmptyPlaceholder.Icon", () => {
    it("renders the specified icon", () => {
      render(<EmptyPlaceholder.Icon name="user" />)

      expect(screen.getByTestId("icon-user")).toBeInTheDocument()
    })

    
  })

  describe("EmptyPlaceholder.Title", () => {
    it("renders title text", () => {
      render(<EmptyPlaceholder.Title>Test Title</EmptyPlaceholder.Title>)

      expect(screen.getByText("Test Title")).toBeInTheDocument()
    })
  })

  describe("EmptyPlaceholder.Description", () => {
    it("renders description text", () => {
      render(
        <EmptyPlaceholder.Description>
          Test Description
        </EmptyPlaceholder.Description>
      )

      expect(screen.getByText("Test Description")).toBeInTheDocument()
    })
  })
})