
import { Journey } from "@prisma/client"
import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"
import { cn, formatDate } from "@/lib/utils"

import DeleteJourneyButton from "./delete-journey-button"
import { buttonVariants } from "./ui/button"

interface JourneyItemProps {
  journey: Pick<Journey, "id" | "label" | "createdAt">
}

export function JourneyItem({ journey }: JourneyItemProps) {
  
 

  return (
    <div className="flex items-center justify-between p-4" >
      <div className="grid gap-1" >
        <Link
          href={`/journey/${journey.id}`}
          className="font-semibold hover:underline"
          id={`journey-${journey.id}`}
        >
          {journey.label}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(journey.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className={cn(buttonVariants())}>
          <span>
            <Link href={`/journey/${journey.id}`}>Open Journey</Link>
          </span>
        </button>
        <DeleteJourneyButton journeyId={journey.id} />
      </div>
    </div>
  )
}

JourneyItem.Skeleton = function JourneyItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
