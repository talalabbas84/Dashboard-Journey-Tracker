import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
// Update this import path as necessary
import { signOut } from "next-auth/react"


// mock signOut function
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}))


import { UserAccountNav } from "@/components/user-account-nav"

// Mocking next/link and next-auth/react
jest.mock(
  "next/link",
  () =>
  // @ts-ignore
    ({ children }) =>
      children
)
jest.mock("next-auth/react")

// Mock UserAvatar
jest.mock("@/components/user-avatar", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  UserAvatar: () => <img alt="Mocked User Avatar" />,
}))

describe("UserAccountNav", () => {
  // Mock user prop
  const mockUser = {
    name: "John Doe",
    image: "https://example.com/john.jpg",
    email: "john@example.com",
  }

  it("navigates to dashboard on Dashboard link click", async () => {
    // Implementation depends on how navigation is handled in your component
    // Since we're mocking `next/link`, this example assumes checking navigation behavior through the mocked Link
    render(<UserAccountNav user={mockUser} />)
  })

  it("triggers sign out on Sign out click", async () => {
    render(<UserAccountNav user={mockUser} />)
    const user = userEvent.setup()

    // Open the dropdown to access sign out option
    // Assuming clicking the avatar opens the dropdown, adapt based on your actual implementation
    await user.click(screen.getByAltText("Mocked User Avatar"))

    // Click on "Sign out"
    await user.click(screen.getByText("Sign out"))

    // Check if signOut was called correctly
    expect(signOut).toHaveBeenCalledWith({
      callbackUrl: `${window.location.origin}/login`,
    })
  })
})
