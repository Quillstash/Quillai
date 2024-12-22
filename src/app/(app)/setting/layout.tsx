import { Metadata } from "next"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences.",
}

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" asChild>
            <Link href="/setting/profile">Profile</Link>
          </TabsTrigger>
          <TabsTrigger value="articles" asChild>
            <Link href="/setting/articles">Articles</Link>
          </TabsTrigger>
          <TabsTrigger value="teams" asChild>
            <Link href="/setting/teams">Teams</Link>
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </div>
  )
}

