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


const RecordedTextCreateSchema = z.object({
  text: z.string(),
  url: z.string().url(),
})

export  async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    const json = await req.json()
    const body = RecordedTextCreateSchema.parse(json)
    const { params } = routeContextSchema.parse(context)


    const recordedText = await db.recordedText.create({
      data: {
        text: body.text,
        url: body.url,
        journeyId: params.journeyId?.toString() as string,
      },
    })


    return new Response(JSON.stringify(recordedText), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}