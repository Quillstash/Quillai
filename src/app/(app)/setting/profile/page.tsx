import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/sign-in")
  }

  const user = session.user

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 pb-4 border-b">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">Profile Name</p>
          </div>
        </div>
        <div className="pb-4 border-b">
          <h4 className="text-sm font-medium">Email address</h4>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Connected account</h4>
          <p className="text-sm text-muted-foreground">
            {user.email ? `Signed up with ${user.email.split("@")[1]}` : "No connected account"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

