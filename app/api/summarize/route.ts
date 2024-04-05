// Go ahead and `yarn add ai openai-edge`

import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"





// Configure our OpenAI API
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // 💡 Add your OpenAI key to your .env
})
const openai = new OpenAIApi(config)

// Route handler to handle text on the page and stream back a response.
export async function POST(req: Request) {
  const { text } = await req.json()
  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      stream: true,
      max_tokens: 1500,
      // 💡 Craft your own prompt here based on your needs.
      prompt: `Summarize the following texts: ${text}`,
    })

    return new StreamingTextResponse(OpenAIStream(response))
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }

    // return new Response(JSON.stringify({text: 'hello'}))
}

// 💡 Use Vercel's edge runtime.
// export const runtime = "edge"