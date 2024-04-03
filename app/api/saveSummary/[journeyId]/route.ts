// pages/api/journeys/[journeyId]/recordedTexts/add.ts
import { getServerSession } from "next-auth/next";
import * as z from "zod";



import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";





const routeContextSchema = z.object({
  params: z.object({
    journeyId: z.string(),
  }),
})

const schema = z.object({
  content: z.string(),
})

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    const json = await req.json()
    const body = schema.parse(json)
    const { params } = routeContextSchema.parse(context)

    const journey = await db.journey.update({
      where: {
        id: params.journeyId?.toString()
      },
      data: {
        content: body.content
      }
    })


    return new Response(JSON.stringify(journey), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}