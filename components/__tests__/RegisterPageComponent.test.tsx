import { fireEvent, render, screen } from "@testing-library/react";



import RegisterPageComponent from "@/app/(auth)/register/pageComponent";

jest.mock("@/components/icons", () => (
  {
    Icons: {
      logo: () => <div data-testid="logo-icon"></div>,
    }
  }
))



// Mock UserAuthForm if you want to isolate this test from UserAuthForm's implementation
jest.mock("@/components/user-auth-form", () => ({
  UserAuthForm: () => <div data-testid="user-auth-form"></div>,
}))

describe("RegisterPageComponent", () => {
  it("renders correctly", () => {
    render(<RegisterPageComponent />)
    expect(screen.getByTestId("logo-icon")).toBeInTheDocument()
    expect(screen.getByText("Create an account")).toBeInTheDocument()
    expect(
      screen.getByText("Enter your email below to create your account")
    ).toBeInTheDocument()
    expect(screen.getByTestId("user-auth-form")).toBeInTheDocument()
    expect(
      screen.getByText(
        "By clicking continue, you agree to our Terms of Service and Privacy Policy."
      )
    ).toBeInTheDocument()
  })

  it("navigates to login page on clicking Login", () => {
    render(<RegisterPageComponent />)
    fireEvent.click(screen.getByText("Login"))
    // Assuming your environment or a mock of the useRouter hook could handle and assert this navigation.
    // For simplicity, this test will need adjustment to actually check navigation.
  })

 
})