import { fireEvent, render, screen, waitFor } from "@testing-library/react";



import "@testing-library/jest-dom";
import { signIn } from "next-auth/react";



import { UserAuthForm } from "@/components/user-auth-form";



import { toast } from "../ui/use-toast";


describe("UserAuthForm", () => {
  it("renders the form", () => {
    render(<UserAuthForm />)
    expect(screen.getByPlaceholderText("name@example.com")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Sign In with Email" })
    ).toBeInTheDocument()
  })

  it("submits the form and calls signIn with email", async () => {
    ;(signIn as jest.Mock).mockResolvedValue({ ok: true })
    render(<UserAuthForm />)
    fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
      target: { value: "test@example.com" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Sign In with Email" }))

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("email", {
        email: "test@example.com",
        redirect: false,
        callbackUrl: expect.any(String),
      })
    })
  })

  // Additional tests here...
})

describe("UserAuthForm onSubmit", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

 it("shows success toast on successful email sign-in", async () => {
  (signIn as jest.Mock).mockResolvedValue({ ok: true });

  render(<UserAuthForm />);
  fireEvent.change(screen.getByPlaceholderText("name@example.com"), { target: { value: "test@example.com" } });
  fireEvent.submit(screen.getByTestId("user-auth-form"));

  await waitFor(() => {
    expect(toast).toHaveBeenCalledWith({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  });
});
it("shows error toast on failed email sign-in", async () => {
  ;(signIn as jest.Mock).mockResolvedValue({ ok: false })

  render(<UserAuthForm />)
  fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
    target: { value: "test@example.com" },
  })
  fireEvent.submit(screen.getByTestId("user-auth-form"))

  await waitFor(() => {
    expect(toast).toHaveBeenCalledWith({
      title: "Something went wrong.",
      description: "Your sign in request failed. Please try again.",
      variant: "destructive",
    })
  })
})
it("displays an error message for invalid email input", async () => {
  render(<UserAuthForm />)
  fireEvent.input(screen.getByPlaceholderText("name@example.com"), {
    target: { value: "invalid-email" },
  })
  fireEvent.submit(screen.getByTestId("user-auth-form"))

  // Assuming your validation schema provides a specific error message for email validation
  await waitFor(() => {
    expect(screen.getByText("Invalid email")).toBeInTheDocument()
  })
})


})