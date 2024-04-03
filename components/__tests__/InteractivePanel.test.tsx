// Adjust import path as necessary
import { Journey, RecordedText } from "@prisma/client";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


// Adjust the import path as necessary
import { Summarizer } from "../summarizer";
// Ensure this path is correct
import InteractivePanel from "@/components/interactive-panel";
import * as useToastModule from "../ui/use-toast";


// Mock the external modules
jest.mock("../summarizer", () => ({
  // Use a mock function to simulate the Summarizer component
  Summarizer: jest.fn(() => <div>Summarizer</div>),
}))
jest.mock("../ui/use-toast", () => ({
  toast: jest.fn(),
}))

// Type assertion for the useToast module mock
const mockUseToast = useToastModule as jest.Mocked<typeof useToastModule>

describe("InteractivePanel", () => {
  const mockRecordedTexts: RecordedText[] = [
    { id: "1", text: "First text", journeyId: "journey1", createdAt: new Date(), url: "url1"},
    { id: "2", text: "Second text", journeyId: "journey1", createdAt: new Date(), url: "url2"},
  ]
  const mockJourney: Journey = {
    id: "journey1",
    label: "Test Journey",
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "This is a test journey",
    isArchived: false,
    authorId: "author1",
  }

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    render(
      <InteractivePanel
        recordedTexts={mockRecordedTexts}
        journey={mockJourney}
      />
    )

    expect(Summarizer).toHaveBeenCalledWith(
      expect.objectContaining({
        text: "First text Second text",
        journey: mockJourney,
      }),
      expect.any(Object)
    )
  })

  it("copies link to clipboard successfully", async () => {
    // Mock the clipboard functionality
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(void 0),
      },
    })

    render(
      <InteractivePanel
        recordedTexts={mockRecordedTexts}
        journey={mockJourney}
      />
    )
    const copyButton = screen.getByRole("button", { name: "Copy Link" })
    // expect(true).toBe(true)
    await userEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining(window.location.href)
    )
    expect(mockUseToast.toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Link copied to clipboard.",
      })
    )
  })

  it("handles clipboard copy failure", async () => {
    // Mock the clipboard functionality to reject
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error("Mock Error")),
      },
    })

    render(
      <InteractivePanel
        recordedTexts={mockRecordedTexts}
        journey={mockJourney}
      />
    )
    const copyButton = screen.getByRole("button", { name: "Copy Link" })
    await userEvent.click(copyButton)

    expect(mockUseToast.toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Failed to copy link.",
        description: "Please try again.",
      })
    )
  })

})