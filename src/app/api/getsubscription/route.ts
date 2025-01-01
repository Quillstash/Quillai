import { auth } from "@/auth"
import { NextResponse } from "next/server"
import db from "@/lib/db"
import { PLANS } from '@prisma/client'

interface SubscriptionData {
  planName: PLANS;
  currentCredits: number;
  maxCredits: number;
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true, credits: true, creditsUsed: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const subscriptionData: SubscriptionData = {
      planName: user.plan,
      currentCredits: user.creditsUsed, 
      maxCredits: user.credits,
    }

    return NextResponse.json(subscriptionData)
  } catch (error) {
    console.error("Subscription API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

