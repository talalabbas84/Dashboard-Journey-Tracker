// Adjust the import path as necessary
import { Journey, RecordedText } from "@prisma/client";
import { render, screen } from "@testing-library/react";



import { Summarizer } from "@/components/summarizer";





// Adjust the import path as necessary

// Mocking the toast function
jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}))

// A helper function to setup the test environment
const setup = (journey: Journey) => {
  const text = "Test text"
  const doNotShowAction = false
  render(
    <Summarizer
      text={text}
      journey={journey}
      doNotShowAction={doNotShowAction}
    />
  )
}

describe("Summarizer", () => {
  const mockRecordedTexts: RecordedText[] = [
    { id: "1", text: "First text", journeyId: "journey1", createdAt: new Date(), url: "url1"},
    { id: "2", text: "Second text", journeyId: "journey1", createdAt: new Date(), url: "url2"},
  ]

  const mockJourney: Journey = {
    id: "1",
    label: "Test Journey",
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "This is a test journey",
    isArchived: false,
    authorId: "author1",
    // @ts-ignore
    recordedTexts: [],
  }

  afterEach(() => {
    // Restore the original implementation after each test
    jest.restoreAllMocks()
  })

  it("renders without crashing", () => {
    setup(mockJourney)
    expect(screen.getByText("This is a test journey")).toBeInTheDocument()
  })

  // clipboard button disabled when summary is empty
  it("disables the copy button when summary is empty", () => {
    mockJourney.content = ""
    setup(mockJourney)
    // should not be on the screen screen.getByRole("button", { name: /Copy Summary/i })
    expect(screen.queryByRole("button", { name: /Copy Summary/i })).toBeNull()
  })

  // clipboard button enabled when summary is not empty
  it("enables the copy button when summary is not empty", () => {
    // add a mock summary in the p tag
    mockJourney.content = "This is a test journey"
    setup(mockJourney)

    expect(screen.getByRole("button", { name: /copy/i })).toBeEnabled()
  })

  // summarize button should be disabled if there are no recorded texts
  it("disables the summarize button when there are no recorded texts", () => {
    setup(mockJourney)
    expect(screen.getByRole("button", { name: /summarize/i })).toBeDisabled()
  })

  it("enables the summarize button when there are recorded texts", () => {
    // @ts-ignore
    mockJourney.recordedTexts = mockRecordedTexts
    setup(mockJourney)
    expect(screen.getByRole("button", { name: /summarize/i })).toBeEnabled()
  })
  // should be disable if recordTexts is empty
  it("disables the summarize button when there are no recorded texts", () => {
    // @ts-ignore
    mockJourney.recordedTexts = []
    setup(mockJourney)
    expect(screen.getByRole("button", { name: /summarize/i })).toBeDisabled()
  })

  it("shows 'No summary available' when there is no summary", () => {
    mockJourney.content = ""
    setup(mockJourney)
    expect(screen.getByText("No summary available")).toBeInTheDocument()
  })

  

})