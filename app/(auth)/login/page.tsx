import { Metadata } from "next"

import LoginPageComponent from "./pageComponent"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
   <LoginPageComponent />
  )
}
