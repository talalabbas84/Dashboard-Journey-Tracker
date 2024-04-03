
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { JourneyItem } from "@/components/journey-item"
import { DashboardShell } from "@/components/shell"

interface DashboardPageProps {
  journeys: any[]
}

export default function DashboardPageCompoennt({
  journeys,
}: DashboardPageProps) {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Journeys"
        text="Create and manage journeys."
      ></DashboardHeader>
      <div>
        {journeys?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {journeys.map((journey) => (
              <JourneyItem key={journey.id} journey={journey}  />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Journeys created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any journeys yet. Start creating content.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
