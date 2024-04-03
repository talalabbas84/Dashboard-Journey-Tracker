import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import "@testing-library/jest-dom"
// Update the import path as necessary
import { useRouter } from "next/router"
// Update the import path as necessary
import { Journey, RecordedText } from "@prisma/client"

import JourneyTable from "@/components/journey-table"

// Adjust if you have a custom hook for navigation

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}))

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock

describe("JourneyTable", () => {
  const mockJourney: Journey = {
    id: "1",
    label: "My Test Journey",
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "Journey content",
    isArchived: false,
    authorId: "author1",
  }

  const mockRecordedTexts: RecordedText[] = [
    {
      id: "text1",
      text: "First text",
      url: "http://example.com/1",
      journeyId: "1",
      createdAt: new Date(),
    },
    {
      id: "text2",
      text: "Second text",
      url: "http://example.com/2",
      journeyId: "1",
      createdAt: new Date(),
    },
  ]

  const useRouterMock = useRouter as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    useRouterMock.mockImplementation(() => ({
      refresh: jest.fn(),
    }))
  })

  it("renders the component correctly with texts", () => {
    render(
      <JourneyTable
        // @ts-ignore
        journey={{ ...mockJourney, recordedTexts: mockRecordedTexts }}
      />
    )
    expect(screen.getByText("First text")).toBeInTheDocument()
    expect(screen.getByText("http://example.com/1")).toBeInTheDocument()
    expect(screen.getByText("Second text")).toBeInTheDocument()
    expect(screen.getByText("http://example.com/2")).toBeInTheDocument()
  })

  it("handles delete action correctly", async () => {
    const user = userEvent.setup()
    render(
      <JourneyTable
        // @ts-ignore
        journey={{ ...mockJourney, recordedTexts: mockRecordedTexts }}
      />
    )
    await user.click(screen.getAllByRole("button", { name: "Delete" })[0])
    expect(fetch).toHaveBeenCalled()
    // You may also check for the fetch call arguments to ensure correct API endpoint and method are used
  })

  it("does not show delete column when doNotShowAction is true", () => {
    render(
      <JourneyTable
        // @ts-ignore
        journey={{ ...mockJourney, recordedTexts: mockRecordedTexts }}
        doNotShowAction={true}
      />
    )
    expect(screen.queryByText("Delete")).not.toBeInTheDocument()
  })

  it("renders clickable URLs that open in a new tab", () => {
    render(
      <JourneyTable
        // @ts-ignore
        journey={{ ...mockJourney, recordedTexts: mockRecordedTexts }}
      />
    )

    // Assuming each row has a URL and you're interested in testing the first one
    const firstUrl = screen.getAllByText(/http:\/\/example\.com\/1/)[0]
    expect(firstUrl).toBeInTheDocument()
    expect(firstUrl).toHaveAttribute("href", "http://example.com/1")
    expect(firstUrl).toHaveAttribute("target", "_blank")
    expect(firstUrl).toHaveAttribute("rel", "noopener noreferrer")
  })
})
