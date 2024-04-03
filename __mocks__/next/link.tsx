jest.mock("next/link", () => {
  // @ts-ignore
  return ({ children }) => {
    return children
  }
})
