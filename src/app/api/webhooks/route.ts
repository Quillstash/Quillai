/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/lib/db";
import { PLANS } from "@prisma/client";
import crypto from "crypto";
import { NextRequest, NextResponse } from 'next/server';

// Add this config to ensure raw body is available
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to get raw body as text
async function getRawBody(req: NextRequest): Promise<string> {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("No request body");
  
  const chunks: Uint8Array[] = [];
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  
  return Buffer.concat(chunks.map(chunk => Buffer.from(chunk))).toString('utf8');
}

export async function POST(req: NextRequest) {
  console.log("Webhook received"); // Add logging

  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(req);
    
    const eventType = req.headers.get("x-event-name");
    console.log("Event Type:", eventType); // Add logging
    
    // Parse body after getting raw body
    const body = JSON.parse(rawBody);

    // Check signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
    if (!secret) {
      console.error("Missing webhook signature secret");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    const signature = req.headers.get("x-signature");
    if (!signature) {
      console.error("Missing signature header");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(rawBody).digest('hex');
    
    if (signature !== digest) {
      console.error("Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

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

    // Return 200 status with content-type header
    return new NextResponse(JSON.stringify({ message: "Webhook processed successfully" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Add GET handler to properly handle 405
export async function GET() {
  return new NextResponse(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Your existing handler functions remain the same
async function handleSubscriptionChange(body: any) {
    const userId = body.meta.custom_data.user_id;
    const subscriptionId = body.data.id;
    const status = body.data.attributes.status;
    const planId = body.data.attributes.product_id;
  
    let credits = 5;
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

async function handleSubscriptionCancelled(body: any) {
  const userId = body.meta.custom_data.user_id;

  await db.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: 'cancelled',
    },
  });
}

async function handleSubscriptionResumed(body: any) {
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
      credits: 5,
      currentPeriodEnd: null,
    },
  });
}

async function handleSubscriptionPaymentSuccess(body: any) {
  await handleSubscriptionChange(body);
}