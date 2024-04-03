"use client"

// import { TrashIcon } from "@heroicons/react/solid"
import React from "react"
import { useRouter } from "next/navigation"
import { Journey, RecordedText } from "@prisma/client"
import { Trash } from "lucide-react"

import { toast } from "./ui/use-toast"

// Make sure to install @heroicons/react if you haven't already

interface JourneyTableProps {
  journey: Journey
  doNotShowAction?: boolean
}

async function deleteText(textId: string, journeyId: string, router: any) {
  const response = await fetch(
    `/api/journeys/${journeyId}/recordedTexts/remove/${textId}`,
    {
      method: "DELETE",
    }
  )

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your post was not deleted. Please try again.",
      variant: "destructive",
    })
  }
  router.refresh()

  return true
}

const JourneyTable: React.FC<JourneyTableProps> = ({
  journey,
  doNotShowAction,
}) => {
  const router = useRouter()

  if (!journey) {
    return <div>Loading...</div> // Display a loading state while the data is being fetched
  }

  return (
    <div className="size-full overflow-y-auto bg-white">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-2/5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Text
            </th>
            <th className="w-2/5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              URL
            </th>
            {!doNotShowAction && (
              <th className="w-1/10 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                Delete
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* @ts-ignore */}
          {journey.recordedTexts.map((text: RecordedText, index: number) => (
            <tr key={index} data-testid="recorded-text">
              <td className="w-2/5 break-words px-6 py-4 text-sm font-medium text-gray-900">
                {text.text}
              </td>
              <td className="w-2/5 break-words px-6 py-4 text-sm text-gray-500">
                <a
                  href={text.url}
                  // new tab
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-indigo-600 hover:text-indigo-900"
                >
                  {text.url}
                </a>
              </td>
              {!doNotShowAction && (
                <td className="w-1/10 px-6 py-4 text-center">
                  <button
                    // onClick={() => onDelete(text.id, journey.id)}
                    onClick={() => deleteText(text.id, journey.id, router)}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete"
                  >
                    <Trash size={24} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JourneyTable
