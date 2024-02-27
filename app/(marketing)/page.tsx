// page.tsx

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function HomePage() {
  return (
    <>
      <section className="bg-gray-100 py-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to JourneyTracker</h1>
          <p className="text-lg mb-8">
            Organize your online journeys effectively with our app!
          </p>
          {/* <div className="space-x-4">
            <Link href="/overview" passHref>
              <button className={buttonVariants({ size: "lg" })}>Overview</button>
            </Link>
            <Link href="/ai-insights" passHref>
              <button className={buttonVariants({ size: "lg" })}>AI Insights</button>
            </Link>
            <Link href="/visualization" passHref>
              <button className={buttonVariants({ size: "lg" })}>Visualization</button>
            </Link>
          </div> */}
        </div>
      </section>
      <section className="py-20 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          {/* <p className="text-lg mb-8">
          Explore the powerful features of JourneyTracker.
          </p> */}
          <p className="text-lg mb-8">
          * Offer a centralized platform for managing information gathered from various sources.
          </p>
          <p className="text-lg mb-8">
          * Organize information into journeys, provide context, and aid in better recall.
          </p>
          <p className="text-lg mb-8">
          * Utilize AI for accurate summarization, eliminating the need for manual processing.
          </p>
          <p className="text-lg mb-8">
          * Facilitate knowledge sharing by allowing users to share their curated journeys with others.
          </p>

        </div>
      </section>
      <section className="bg-gray-100 py-20 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Proudly Open Source</h2>
          <p className="text-lg mb-8">
            JourneyTracker is open source and powered by open source software.
          </p>
          {/* GitHub stars component */}
        </div>
      </section>
    </>
  )
}
