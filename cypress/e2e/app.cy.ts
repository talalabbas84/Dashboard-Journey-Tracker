describe("Navigation", () => {
  it("should navigate to the dashboard page", () => {
    // Start from the index page
    cy.login()
    cy.visit("http://localhost:3000/dashboard")

    
  })
})


describe("User logout", () => {
  it("successfully logs out and redirects to the login page", () => {
    // Step 1: Log in as a user
    // This step assumes you have a custom command setup to programmatically log in
    // For example, using `cy.login()` which you might have defined in your Cypress commands file
    cy.login()

    // Step 2: Visit a page where the logout dropdown is accessible
    // Assuming the UserAccountNav component is available on the dashboard page
    cy.visit("http://localhost:3000/dashboard")

    // Wait for necessary elements to be visible or for the application to be in a ready state
    cy.wait(1000) // Adjust based on your app's loading time or use more specific waits

    // Step 3: Open the dropdown menu to access the logout option
    // This step depends on how your dropdown is implemented.
    // You might simply click the avatar or a specific button that triggers the dropdown
    // radix-:r4: <- click on this id to open the dropdown
    cy.get('[id^="user-avatar"]').click() // Adjust the selector based on your actual implementation
    // wait 2 seconds
    cy.wait(2000)

    // Step 4: Click the "Sign out" option
    // The selector used here should uniquely identify your "Sign out" dropdown menu item
    cy.get('[data-testid="logout-button"]').click() // Adjust the selector based on your actual implementation

    // Step 5: Verify that the user is redirected to the login page
    // The URL check should be adjusted according to your application's routing logic
    cy.url().should("include", "/login")

  })
})
