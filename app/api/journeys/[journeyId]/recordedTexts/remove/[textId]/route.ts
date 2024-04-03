// pages/api/recordedTexts/remove/[textId].ts
import { z } from "zod"

import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    textId: z.string(),
  }),
})

export  async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)


    const { textId } = params

    await db.recordedText.delete({
      where: {
        id: textId?.toString() as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
   if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
