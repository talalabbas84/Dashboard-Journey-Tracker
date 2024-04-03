import { DashboardHeader } from "@/components/header"
import { JourneyItem } from "@/components/journey-item"
import { PostCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Journeys" text="Create and manage journeys.">
        <PostCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <JourneyItem.Skeleton />
        <JourneyItem.Skeleton />
        <JourneyItem.Skeleton />
        <JourneyItem.Skeleton />
        <JourneyItem.Skeleton />
      </div>
    </DashboardShell>
  )
} 
