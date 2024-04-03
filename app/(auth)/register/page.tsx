import Link from "next/link"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { cn } from "@/lib/utils"
import RegisterPageComponent from "./pageComponent"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  return (
    RegisterPageComponent()
  )
}
