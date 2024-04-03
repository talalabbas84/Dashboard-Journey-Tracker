// tests/api/journeys.api.spec.ts
import { expect, test } from "@playwright/test";





test.describe("/api/journeys", () => {

  // before each process.env.TEST_ENV is set to true
  test.beforeEach(async ({ context }) => {
    // context.overridePermissions("http://localhost:3000", ["geolocation"])
    process.env.TEST_ENV = "true"
  })
  test("should return 403 Unauthorized when not logged in", async ({
    request,
  }) => {
     process.env.TEST_ENV = "false"
    const response = await request.get("http://localhost:3000/api/journeys")
    expect(response.status()).toBe(403)
  })

  test("should return a list of journeys for the authenticated user", async ({
    request,
  }) => {
    // This example assumes you have a function to obtain a session token for a test user
    process.env.TEST_ENV = "true"

    const response = await request.get("http://localhost:3000/api/journeys", {
    
    })
    console.log(response)

    expect(response.status()).toBe(200)
    const journeys = await response.json()
    expect(journeys).toBeInstanceOf(Array)
    // Further checks can be added here based on expected data structure
  })

  // Additional tests for error handling, etc.
})

async function getTestUserSessionToken(): Promise<string> {
  // Implement a way to obtain a session token for a test user
  // This might involve a direct call to your authentication provider,
  // or using a stored token from a test setup process.
  return "YOUR_TEST_USER_SESSION_TOKEN"
}