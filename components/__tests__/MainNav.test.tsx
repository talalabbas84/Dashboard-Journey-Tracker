import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { MainNav } from "@/components/main-nav"
import { siteConfig } from "@/config/site"

import "@testing-library/jest-dom"

jest.mock("next/link", () => {
  // Require the actual module
  const actualNextLink = jest.requireActual("next/link")

  // Return the actual component, or manipulate as needed
  return {
    __esModule: true, // This property is necessary if your modules are using ES modules
    default: actualNextLink.default,
  }
})

describe("MainNav", () => {
  const mockItems = [
    { title: "Dashboard", href: "/dashboard", disabled: false },
    { title: "Settings", href: "/settings", disabled: true },
  ]

  it("renders the site name from the siteConfig", () => {
    render(<MainNav items={mockItems} />)
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument()
  })

  it('renders navigation items and respects the "disabled" property', async () => {
    render(<MainNav items={mockItems} />)
    // check if the data test id exists with mockItems.title name
    const firstItem = screen.getByTestId(mockItems[0].title)
    const secondItem = screen.getByTestId(mockItems[1].title)
    expect(firstItem).toBeInTheDocument()
    expect(secondItem).toBeInTheDocument()
  })

  it("toggles mobile menu on button click", async () => {
    render(<MainNav items={mockItems} />)
    const user = userEvent.setup()
    const menuButton = screen.getByText("Menu")
    await user.click(menuButton)
    const dashboardLinks = screen.getAllByText("Dashboard")
    expect(dashboardLinks[0]).toBeInTheDocument()
  })
})
