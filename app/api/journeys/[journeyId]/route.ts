// pages/api/journeys/[journeyId]/recordedTexts/add.ts
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    journeyId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    const { params } = routeContextSchema.parse(context)

    const recordedText = await db.recordedText.deleteMany({
      where: {
        journeyId: params.journeyId?.toString() as string,
      },
    })

    await db.journey.delete({
      where: {
        id: params.journeyId?.toString() as string,
      },
    })


    return new Response(JSON.stringify(recordedText), { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
