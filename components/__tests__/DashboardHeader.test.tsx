import { render, screen } from "@testing-library/react";



import { DashboardHeader } from "@/components/header";
import "@testing-library/jest-dom";





// Update the import path as necessary

describe("DashboardHeader", () => {
  it("renders the heading", () => {
    const headingText = "Test Heading"
    render(<DashboardHeader heading={headingText} />)

    expect(
      screen.getByRole("heading", { name: headingText })
    ).toBeInTheDocument()
  })

  it("conditionally renders the text if provided", () => {
    const headingText = "Test Heading"
    const extraText = "Extra text under heading"
    render(<DashboardHeader heading={headingText} text={extraText} />)

    expect(screen.getByText(extraText)).toBeInTheDocument()
  })

  it("does not render the text paragraph if not provided", () => {
    const headingText = "Test Heading"
    render(<DashboardHeader heading={headingText} />)

    // Example using queryByText for a known text
    const optionalTextParagraph = screen.queryByText("Extra text under heading")
    expect(optionalTextParagraph).not.toBeInTheDocument()
  })

  it("renders children when passed", () => {
    const headingText = "Test Heading"
    const childrenText = "Child content"
    render(
      <DashboardHeader heading={headingText}>
        <div>{childrenText}</div>
      </DashboardHeader>
    )

    expect(screen.getByText(childrenText)).toBeInTheDocument()
  })
})