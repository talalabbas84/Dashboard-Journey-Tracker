"use client";

import { useRouter } from 'next/navigation';
import { Icons } from './icons';
import { toast } from './ui/use-toast';





interface DeleteJourneyButtonProps {
  journeyId: string
}
const DeleteJourneyButton = ({ journeyId }: DeleteJourneyButtonProps) => {
  const router = useRouter()

  const handleDelete = async () => {
    const res = await fetch(`/api/journeys/${journeyId}`, {
      method: "DELETE",
    })
    if (res.ok) {
      toast({
        title: "Journey deleted",
        variant: "default",
      })
      router.refresh()
    } else {
      toast({
        title: "Failed to delete journey",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }
  return (
     <button onClick={handleDelete}>
          <Icons.trash className="ml-4" />
        </button>
  )
}

export default DeleteJourneyButton