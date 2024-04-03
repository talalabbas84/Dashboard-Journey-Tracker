describe("Dashboard Navigation and Functionality", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("http://localhost:3000/dashboard")
    cy.wait(1000) // wait for the dashboard to load
  })

  it("should display journeys when the user is logged in", () => {
    cy.get('[id^="journey-"]').should("exist")
  })

  it("should redirect to login when the user is not logged in", () => {
    cy.clearCookies() // Clear cookies to ensure there's no valid session
    cy.visit("http://localhost:3000/dashboard")
    cy.url().should("include", "/login")
  })

  it("should open a journey when clicked", () => {
    cy.get('[id^="journey-"]').last().click()
    cy.url().should("include", "/journey/")
  })
})
