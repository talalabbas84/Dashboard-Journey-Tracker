import React from "react"
import { render, screen } from "@testing-library/react"
import LoginPageComponent from "@/app/(auth)/login/pageComponent"

describe("LoginPageComponent", () => {
  it("renders the login page correctly", () => {
    render(<LoginPageComponent />)

    expect(screen.getByText("Welcome back")).toBeInTheDocument()

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    // expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument()

    // Check if the sign-up link is rendered
    expect(
      screen.getByRole("link", { name: "Don't have an account? Sign Up" })
    ).toBeInTheDocument()
  })
})
