import { Journey } from "@prisma/client";
import { notFound } from "next/navigation";



import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import JourneyPageComponent from "./pageComponent";





// import { Editor } from "@/components/editor"

async function getJourneyById(journeyId: Journey["id"]) {
  return await db.journey.findFirst({
    where: {
      id: journeyId,
    },
    include: {
      recordedTexts: true,
    },
  })
}

interface JourneyPageProps {
  params: { journeyId: string }
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const user = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  const journey = await getJourneyById(params.journeyId)

  if (!journey) {
    notFound()
  }




  return (
   <JourneyPageComponent journey={journey} user={user} />
  )
}