/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/lib/db";
import { PLANS } from "@prisma/client";
import crypto from "crypto";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // Check signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
    if (!secret) {
      throw new Error("LEMON_SQUEEZY_WEBHOOK_SIGNATURE is not defined");
    }
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    console.log('Received event:', eventType);
    console.log('Event body:', body);

    switch (eventType) {
      case "subscription_created":
      case "subscription_updated":
        await handleSubscriptionChange(body);
        break;
      case "subscription_cancelled":
        await handleSubscriptionCancelled(body);
        break;
      case "subscription_resumed":
        await handleSubscriptionResumed(body);
        break;
      case "subscription_expired":
        await handleSubscriptionExpired(body);
        break;
      case "subscription_payment_success":
        await handleSubscriptionPaymentSuccess(body);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ message: "Webhook received" });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

async function handleSubscriptionChange(body: any) {
    const userId = body.meta.custom_data.user_id;
    const subscriptionId = body.data.id;
    const status = body.data.attributes.status;
    const planId = body.data.attributes.product_id;
  
    let credits = 5; // Default for FREE plan
    let plan: PLANS = PLANS.FREE;
  
    if (planId === '638793' || planId === '638802') {
      credits = 50;
      plan = PLANS.BASIC;
    } else if (planId === '638800' || planId === '638803') {
      credits = 150;
      plan = PLANS.PRO;
    }
  
    await db.user.update({
      where: { id: userId },
      data: {
        subscriptionId,
        subscriptionStatus: status,
        planId,
        plan,
        credits,
        currentPeriodEnd: new Date(body.data.attributes.renews_at),
      },
    });
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionCancelled(body: any) {
  const userId = body.meta.custom_data.user_id;

  await db.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: 'cancelled',
      // Don't change credits or plan yet, as the subscription is still active until the end of the period
    },
  });
}

async function handleSubscriptionResumed(body: any) {
  // This is similar to subscription created/updated
  await handleSubscriptionChange(body);
}

async function handleSubscriptionExpired(body: any) {
  const userId = body.meta.custom_data.user_id;

  await db.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: 'expired',
      subscriptionId: null,
      planId: null,
      plan: 'FREE',
      credits: 5, // Reset to free plan credits
      currentPeriodEnd: null,
    },
  });
}

async function handleSubscriptionPaymentSuccess(body: any) {
  // This is similar to subscription created/updated
  await handleSubscriptionChange(body);
}

