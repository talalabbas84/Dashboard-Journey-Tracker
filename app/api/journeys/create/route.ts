// pages/api/journeys/create.ts
import { getServerSession } from "next-auth/next";
import { z } from "zod";



import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";


const JourneyCreateSchema = z.object({
  label: z.string(),
  content: z.string().optional(),
})

export  async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    const json = await req.json()

    const data = JourneyCreateSchema.parse(json)

    const journey = await db.journey.create({
      data: {
        ...data,
        authorId: session.user.id,
      },
      include: {
        recordedTexts: true,
      }
    })

    return new Response(JSON.stringify(journey), { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError)
      return new Response(JSON.stringify(error.issues), { status: 422 })

    
  }
}