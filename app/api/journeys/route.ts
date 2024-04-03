// pages/api/journeys/index.ts
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const journeys = await db.journey.findMany({
      where: {
        authorId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include:{
        recordedTexts: true
      
      }
    })
    return new Response(JSON.stringify(journeys), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }
}
