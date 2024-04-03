// LoginPageComponent.test.tsx
import { render, screen } from "@testing-library/react";



import "@testing-library/jest-dom";
// Adjust the import path as needed

import LoginPageComponent from "@/app/(auth)/login/pageComponent";





// Adjust the import path as needed

// Mock the Icons module
// jest.mock("@/components/icons", () => ({
//   Icons: {
//     chevronLeft: () => <svg data-testid="icon-chevron-left"></svg>,
//     logo: () => <svg data-testid="icon-logo"></svg>,
//   },
// }))

// // Since we're not navigating in tests, Link can be mocked to a simple a tag for visual checks

// // Mock UserAuthForm if necessary
jest.mock('../user-auth-form', () => ({
  UserAuthForm: () => <div data-testid="user-auth-form"></div>,
}));

jest.mock("next/link", () => {
  // Require the actual module
  const actualNextLink = jest.requireActual("next/link")

  // Return the actual component, or manipulate as needed
  return {
    __esModule: true, // This property is necessary if your modules are using ES modules
    default: actualNextLink.default,
  }
})



describe("LoginPageComponent", () => {
  beforeEach(() => {
    render(<LoginPageComponent />)
  })

  it("renders the welcome message", () => {
    expect(screen.getByText("Welcome back")).toBeInTheDocument()
  })

  it("renders the sign-in instructions", () => {
    expect(
      screen.getByText("Enter your email to sign in to your account")
    ).toBeInTheDocument()
  })

  it("renders the UserAuthForm component", () => {
    expect(screen.getByTestId("user-auth-form")).toBeInTheDocument()
  })

  it("renders the registration link", () => {
    const registerLink = screen.getByText("Don't have an account? Sign Up")
    expect(registerLink).toBeInTheDocument()
    expect(registerLink).toHaveAttribute("href", "/register")
  })
})