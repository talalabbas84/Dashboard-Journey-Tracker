// layout.tsx

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">JourneyTracker</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/overview" passHref>
                  <button
                    className={buttonVariants({ size: "lg" })}
                    style={{ border: '2px solid #4CAF50' }} // Apply inline style for border
                  >
                    Overview
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/ai-insights" passHref>
                  <button className={buttonVariants({ size: "lg" })}>AI Insights</button>
                </Link>
              </li>
              <li>
                <Link href="/visualization" passHref>
                  <button className={buttonVariants({ size: "lg" })}>Visualization</button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        {/* Footer content */}
      </footer>
    </div>
  )
}

export default Layout
