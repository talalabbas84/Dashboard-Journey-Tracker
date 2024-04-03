import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface EditorProps {
  children?: React.ReactNode
}

export default async function JourneyLayout({ children }: EditorProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      {user && (
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav} />
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </header>
      )}

      <div className="container grid flex-1 gap-12 ">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
