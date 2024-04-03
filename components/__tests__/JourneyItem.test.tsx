import { render, screen } from "@testing-library/react";



import { JourneyItem } from "@/components/journey-item";



import "@testing-library/jest-dom";


jest.mock("next/link", () => {
  // Require the actual module
  const actualNextLink = jest.requireActual("next/link")

  // Return the actual component, or manipulate as needed
  return {
    __esModule: true, // This property is necessary if your modules are using ES modules
    default: actualNextLink.default,
  }
})


jest.mock("@/components/delete-journey-button", () => {
  // @ts-ignore
  // eslint-disable-next-line react/display-name
  return ({ journeyId }) => (
    // @ts-ignore
    <button data-testid="delete-journey-button">{`Delete Journey ${journeyId}`}</button>
  )
})

describe("JourneyItem", () => {
  const mockJourney = {
    id: "1",
    label: "Journey to the West",
    createdAt: new Date("2022-01-01"),
  }

  it("renders journey information correctly", () => {
    render(<JourneyItem journey={mockJourney} />)

    expect(screen.getByText(mockJourney.label)).toBeInTheDocument()
    
  })

  it("renders links with correct href", () => {
    render(<JourneyItem journey={mockJourney} />)

    // Test for the presence of the 'Open Journey' link and check its href
    const openJourneyLink = screen.getByText("Open Journey").closest("a")
    expect(openJourneyLink).toHaveAttribute(
      "href",
      `/journey/${mockJourney.id}`
    )
  })

  it("includes DeleteJourneyButton with correct props", () => {
    render(<JourneyItem journey={mockJourney} />)

    expect(screen.getByTestId("delete-journey-button")).toHaveTextContent(
      `Delete Journey ${mockJourney.id}`
    )
  })

  describe("JourneyItem.Skeleton", () => {
    it("renders skeleton loaders", () => {
      render(<JourneyItem.Skeleton />)

      // Verify the presence of skeleton elements
      expect(screen.getAllByText("")).toHaveLength(6) // Assuming Skeleton renders empty divs or spans
    })
  })
})