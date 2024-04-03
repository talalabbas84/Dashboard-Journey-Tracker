import { Journey } from "@prisma/client"

import { DashboardHeader } from "@/components/header"
import InteractivePanel from "@/components/interactive-panel"
import JourneyTable from "@/components/journey-table"
import { DashboardShell } from "@/components/shell"

// import { Editor } from "@/components/editor"

interface JourneyPageProps {
  journey: Journey
  user: any
}

export default function JourneyPageComponent({
  journey,
  user,
}: JourneyPageProps) {
  const doNotShowAction = !user || journey.authorId !== user.id

  return (
    <div>
    <DashboardShell>
      <DashboardHeader heading={journey.label}>
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div className="flex h-full flex-col md:flex-row">
        <div className="w-full overflow-auto  md:w-1/2">
          <JourneyTable journey={journey} doNotShowAction={doNotShowAction} />
        </div>
        <div className="flex size-full flex-col items-center justify-center md:w-1/2">
          <InteractivePanel
            // @ts-ignore
            recordedTexts={journey.recordedTexts}
            journey={journey}
            doNotShowAction={doNotShowAction}
          />
        </div>
      </div>
    </DashboardShell>
    </div>
  )
}
