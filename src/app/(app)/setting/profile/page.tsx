import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import db from "@/lib/db";
import {  Check, Crown } from "lucide-react";
import { PricingModal } from "@/components/pricing/pricing-plans";

async function getUserSubscription(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      credits: true,
      creditsUsed: true,
      currentPeriodEnd: true,
      subscriptionStatus: true
    }
  });

  return user;
}

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/sign-in")
  }

  const user = session.user
  const subscription = await getUserSubscription(user.id)

  // Format the subscription end date
  const periodEnd = subscription?.currentPeriodEnd 
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
    : null

  // Helper function to format the plan name
  const formatPlanName = (plan: string) => {
    return plan.charAt(0) + plan.slice(1).toLowerCase()
  }

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
        <div className="pb-4 border-b">
          <h4 className="text-sm font-medium">Connected account</h4>
          <p className="text-sm text-muted-foreground">
            {user.email ? `Signed up with ${user.email.split("@")[1]}` : "No connected account"}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Current Plan</h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {subscription?.plan === 'FREE' ? (
                    <div className="text-base text-muted-foreground">
                      Free Plan
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-amber-500" />
                      <span className="text-base font-medium">
                        {formatPlanName(subscription?.plan || 'Free')}
                      </span>
                    </div>
                  )}
                </div>
                {subscription?.subscriptionStatus && subscription.subscriptionStatus === 'active' && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <Check className="h-3 w-3" />
                    Active
                  </div>
                )}
              </div>
              {subscription?.plan === 'FREE' && (
                <p className="text-sm text-muted-foreground">
                  Upgrade to unlock premium features
                </p>
              )}
            <PricingModal/>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Credits Available</h4>
              <p className="text-2xl font-bold">{subscription?.credits || 0}</p>
              <p className="text-sm text-muted-foreground">
                Used: {subscription?.creditsUsed || 0}
              </p>
            </div>
            {periodEnd && (
              <div>
                <h4 className="text-sm font-medium">Current Period Ends</h4>
                <p className="text-sm text-muted-foreground">{periodEnd}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
