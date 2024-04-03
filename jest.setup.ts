import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";





// jest.setup.ts

// Mock `useRouter` from `next/navigation`
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSelectedLayoutSegment: jest.fn(),
  notFound: jest.fn(),
  useSearchParams: jest.fn(),
  
}))



// Provide a default mock implementation
const mockUseRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  // Add other properties and methods as used in your application
  refresh: jest.fn(),
};

// Apply the default mock implementation
(useRouter as jest.Mock).mockImplementation(() => mockUseRouter);

jest.mock(
  "next/link",
  () =>
    ({ children }: any) =>
      children
)
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}))


jest.mock("@/lib/db", () => ({
  db: {
    journey: {
      findFirst: jest.fn(),
    },
  },
}))

// Mock getCurrentUser function
jest.mock("@/lib/session", () => ({
  getCurrentUser: jest.fn(),
}))


jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
}))

jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}))