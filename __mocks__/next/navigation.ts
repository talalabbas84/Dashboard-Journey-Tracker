jest.mock("next/navigation", () => ({
  useSelectedLayoutSegment: jest.fn(),
}))
