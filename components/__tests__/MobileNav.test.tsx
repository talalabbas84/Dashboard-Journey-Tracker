import { render, screen } from "@testing-library/react";



import { siteConfig } from "@/config/site";



import { useLockBody } from "@/hooks/use-lock-body";
import "@testing-library/jest-dom";
// Update with your actual import path
import { MobileNav } from "@/components/mobile-nav";





const mockItems = [
  { title: "Home", href: "/home", disabled: false },
  { title: "About", href: "/about", disabled: false },
  { title: "Contact", href: "/contact", disabled: true },
]

jest.mock("next/link", () => {
  // Require the actual module
  const actualNextLink = jest.requireActual("next/link")

  // Return the actual component, or manipulate as needed
  return {
    __esModule: true, // This property is necessary if your modules are using ES modules
    default: actualNextLink.default,
  }
})
jest.mock("@/hooks/use-lock-body", () => ({
  useLockBody: jest.fn(),
}))

describe("MobileNav", () => {
  it("renders the MobileNav with given navigation items", () => {
    render(<MobileNav items={mockItems} />)

    // Check for logo presence
    expect(screen.getByTestId("logo-icon")).toBeInTheDocument()

    // Check for siteConfig name presence
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument()

    // Check for the presence of navigation items
    mockItems.forEach((item) => {
      const element = screen.getByText(item.title)
      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute("href", item.disabled ? "#" : item.href)
    })

    // Check if the hook useLockBody is called
    expect(useLockBody).toHaveBeenCalled()
  })

  it("renders children if provided", () => {
    const childrenText = "Child Component"
    render(<MobileNav items={mockItems}>{childrenText}</MobileNav>)

    expect(screen.getByText(childrenText)).toBeInTheDocument()
  })
})