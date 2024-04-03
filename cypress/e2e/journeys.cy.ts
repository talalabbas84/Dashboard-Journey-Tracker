describe("Journey Interactions", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("http://localhost:3000/dashboard")
    cy.wait(1000) // ensure the page is loaded
    cy.get('[id^="journey-"]').last().click() // navigate to the last journey
    cy.wait(1000) // wait for journey page to load
  })

  it("should copy the journey summary", () => {
    cy.get('[data-testid="copy-summary"]').click()
    cy.get('[itemid="success-toast"]').should("exist")
  })

  it("should copy the journey URL", () => {
    cy.get('[data-testid="copy-url"]').click()
    cy.get('[itemid="success-toast"]').should("exist")
  })

  it("should successfully summarize text and update the summary", () => {
    cy.get('[data-testid="summarize"]').click()
    cy.wait(5000) // wait for summarization to complete
    cy.get('[data-testid="summary"]').should("exist")
  })

 
})

describe("Recorded Text Deletion within a Journey", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("http://localhost:3000/dashboard")
    cy.wait(1000) // Adjust based on your app's loading time
    cy.get('[id^="journey-"]').last().click() // focus on a specific journey
    cy.wait(2000) // wait for the journey details to load
  })

  it("successfully deletes a recorded text from the journey", () => {
    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="recorded-text"]').length > 0) {
        cy.get('[data-testid="recorded-text"]')
          .its("length")
          .then((initialCount) => {
            cy.get('[data-testid="recorded-text"]')
              .first()
              .find('button[aria-label="Delete"]')
              .click()
            cy.get('[data-testid="recorded-text"]').should(
              "have.length",
              initialCount - 1
            )
          })
      } else {
        cy.log("No recorded texts found, test cannot proceed.")
      }
    })
  })
})

describe("Summarize Button State", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("http://localhost:3000/dashboard")
    cy.wait(1000) // Adjust based on your app's loading time
    cy.get('[id^="journey-"]').first().click() // Assuming this navigates to a journey detail page
    cy.wait(1000) // Wait for journey details to load
  })

  it("should correctly enable or disable the summarize button based on recorded text presence", () => {
    // Check for the presence of recorded texts
    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="recorded-text"]').length > 0) {
        // Scenario 1: Recorded texts exist, so the summarize button should be enabled
        cy.get('[data-testid="summarize"]').should("not.be.disabled")
      } else {
        // Scenario 2: No recorded texts found, so the summarize button should be disabled
        cy.get('[data-testid="summarize"]').should("be.disabled")
      }
    })
  })
})
