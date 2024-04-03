import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"
// Update the import path as necessary

import DashboardPageComponent from "@/app/(dashboard)/dashboard/pageComponent"

jest.mock("@/components/empty-placeholder", () => ({
  ...jest.requireActual("@/components/empty-placeholder"),
  EmptyPlaceholder: () => <div data-testid="empty-placeholder" />,
}))

jest.mock("@/components/journey-item", () => ({
  JourneyItem: () => <div data-testid="journey-item" />,
}))

describe("DashboardPageComponent", () => {
  it("renders EmptyPlaceholder when there are no journeys", () => {
    render(<DashboardPageComponent journeys={[]} />)
    expect(screen.getByTestId("empty-placeholder")).toBeInTheDocument()
    expect(screen.queryByTestId("journey-item")).not.toBeInTheDocument()
  })

  it("renders JourneyItem components for each journey when there are journeys", () => {
    const mockJourneys = [
      { id: "1", name: "Journey 1" },
      { id: "2", name: "Journey 2" },
    ]
    render(<DashboardPageComponent journeys={mockJourneys} />)
    expect(screen.getAllByTestId("journey-item").length).toBe(
      mockJourneys.length
    )
    expect(screen.queryByTestId("empty-placeholder")).not.toBeInTheDocument()
  })
})
