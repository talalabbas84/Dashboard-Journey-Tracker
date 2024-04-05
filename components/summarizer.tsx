import { Journey } from "@prisma/client"
import { useState } from "react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"
import { toast } from "./ui/use-toast"

interface SummarizerProps {
  text: string
  journey: Journey
  doNotShowAction?: boolean
}

export function Summarizer({
  text,
  journey,
  doNotShowAction,
}: SummarizerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState<any>(journey.content || "")

  const handleSummarize = () => {
    setIsLoading(true)
    let fullSummary = ""

    fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((res) => res.body)
      .then(async (body) => {
        if (!body) {
          setIsLoading(false)
          throw new Error("No response body")
        }

        const reader = body.getReader()

        return new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read()
              if (done) {
                controller.close()
                break
              }
              const chunk = new TextDecoder("utf-8").decode(value)
              fullSummary += chunk // Append each chunk to the fullSummary
              controller.enqueue(value)
            }
          },
        }).pipeTo(
          new WritableStream({
            write(chunk) {
              setSummary(
                (prev: any) => prev + new TextDecoder("utf-8").decode(chunk)
              ) // Update summary in real-time
            },
            close() {
              console.log("Stream complete")
              setIsLoading(false)
              saveSummaryToBackend(fullSummary) // Save when stream is done
            },
          })
        )
      })
      .catch((error) => {
        setIsLoading(false)
        console.error("Error:", error)
      })
  }

  const saveSummaryToBackend = (summaryText: string) => {
    fetch(`/api/saveSummary/${journey.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: summaryText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Summary saved to the backend:", data)
      })
      .catch((error) => {
        console.error("Error saving summary:", error)
      })
  }

  const copyToClipboard = () => {
    console.log(summary, 'summary')
    navigator.clipboard
      .writeText(summary)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          itemID:"success-toast",
          description: "Summary copied to clipboard",
        })
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        })
      })
  }
  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-gray-50 p-4 shadow">
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {summary ? (
            <div className="rounded bg-white p-2 text-gray-500 shadow-sm" data-testid="summary">
              {summary}
            </div>
          ):(
            <div className="rounded bg-white p-2 text-gray-500 shadow-sm">
              No summary available
            </div>
          )}
        </>
      )}
        <div className="flex flex-col justify-between md:flex-row">
          {/* @ts-ignore */}
          {!doNotShowAction && (
            <button
              onClick={handleSummarize}
              data-testid="summarize"
              className={cn(
                "rounded px-4 py-2 shadow",
                buttonVariants(),
                "bg-blue-500 text-white hover:bg-blue-600"
              )}
              // @ts-ignore
              disabled={isLoading ||journey.recordedTexts.length === 0}
            >
              {summary ? "Re-Summarize" : "Summarize"}
            </button>
          )}

          {summary && (
            <button
              onClick={copyToClipboard}
              data-testid="copy-summary"
              
              className={cn(
                "rounded px-4 py-2 shadow",
                buttonVariants(),
                "bg-green-500 text-white hover:bg-green-600"
              )}
            >
              Copy Summary
            </button>
          )}
        </div>
    
    </div>
  )
}
