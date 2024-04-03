// const nextJest = require("next/jest")

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: "./",
// })

// // Add any custom config to be passed to Jest
// const customJestConfig = {
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   testEnvironment: "jsdom",
// }

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig)

import type { Config } from "jest";
import nextJest from "next/jest.js";





const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    // Handle image imports
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    // Update your alias mapping here
    "^@/(.*)$": "<rootDir>/$1", // Adjust this line as needed
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/config/(.*)$": "<rootDir>/config/$1",
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    // Add pattern to ignore specs files
    ".*\\.spec\\.tsx?$",
  ],
  
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)