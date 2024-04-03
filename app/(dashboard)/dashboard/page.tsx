import { redirect } from "next/navigation";



import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

import DashboardPageCompoent from "./pageComponent";


export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const getJourneys = async () => {
    return await db.journey.findMany({
      where: {
        authorId: user.id,
      },
      select: {
        id: true,
        label: true,
        recordedTexts: true,
        // published: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
  }

  const journeys = await getJourneys()
 

  return (
   <DashboardPageCompoent journeys={journeys} />
  )
}