"use client";

import { Journey, RecordedText } from "@prisma/client";



import { cn } from "@/lib/utils";



import { Summarizer } from "./summarizer";
import { buttonVariants } from "./ui/button";
import { toast } from "./ui/use-toast";


interface InteractivePanelProps {
  recordedTexts: RecordedText[]
  journey: Journey
  doNotShowAction?: boolean
}

export const InteractivePanel: React.FC<InteractivePanelProps> = ({
  recordedTexts,
  journey,
  doNotShowAction
}) => {
  const copyToClipboard = () => {
    if (!window) {
      return
    }
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link copied to clipboard.",
          itemID: "success-toast",
          variant: "default",
        })
      })
      .catch((err) => {
        toast({
          title: "Failed to copy link.",
          description: "Please try again.",
          variant: "destructive",
        })

        console.error("Failed to copy: ", err)
      })
  }
  const text = recordedTexts.map((recordedText) => recordedText.text).join(" ")

  return (
    <div className="flex w-3/4 flex-col space-y-4">
      <Summarizer text={text} journey={journey} doNotShowAction={doNotShowAction} />
      <button className={cn(buttonVariants())} onClick={copyToClipboard} data-testid="copy-url">
        Copy Link
      </button>
    </div>
  )
}

export default InteractivePanel