import { render, screen } from "@testing-library/react";



import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";



import DeleteJourneyButton from "@/components/delete-journey-button";



import { toast } from "../ui/use-toast";


// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}))

// Mock toast
jest.mock("../ui/use-toast", () => ({
  toast: jest.fn(),
}))

// Mock Icons
jest.mock("../icons", () => ({
  Icons: {
    trash: () => <svg data-testid="icon-trash" />,
  },
  // Mocking individual named exports as well
  trash: () => <svg data-testid="icon-trash" />,
}))

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(),
  })
) as jest.Mock


describe("DeleteJourneyButton", () => {
  const journeyId = "1"

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
  })

  it("calls the API and shows success toast on successful deletion", async () => {
    const user = userEvent.setup()
    render(<DeleteJourneyButton journeyId={journeyId} />)

    await user.click(screen.getByTestId("icon-trash"))

    expect(global.fetch).toHaveBeenCalledWith(`/api/journeys/${journeyId}`, {
      method: "DELETE",
    })
    expect(toast).toHaveBeenCalledWith({
      title: "Journey deleted",
      variant: "default",
    })
    expect(useRouter().refresh).toHaveBeenCalled()
  })

  it("shows error toast on failed deletion", async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    )
    const user = userEvent.setup()
    render(<DeleteJourneyButton journeyId={journeyId} />)

    await user.click(screen.getByTestId("icon-trash"))

    expect(toast).toHaveBeenCalledWith({
      title: "Failed to delete journey",
      description: "Please try again.",
      variant: "destructive",
    })
  })
})