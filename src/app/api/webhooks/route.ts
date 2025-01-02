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

// Helper function to verify webhook source
function verifyWebhookSignature(signature: string, rawBody: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(req: NextRequest) {
  console.log("Webhook received");

  try {
    // Get and verify webhook secret from environment
    const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
    if (!webhookSecret) {
      console.error("Missing webhook signature secret");
      return new NextResponse(JSON.stringify({ error: "Configuration error" }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Get and verify signature from headers
    const signature = req.headers.get("x-signature");
    if (!signature) {
      console.error("Missing signature header");
      return new NextResponse(JSON.stringify({ error: "Missing signature" }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Get raw body for signature verification
    const rawBody = await getRawBody(req);
    const body = JSON.parse(rawBody);
    const eventType = req.headers.get("x-event-name");
    
    console.log("Event Type:", eventType);
    console.log('Event body:', body);

    // Verify the webhook signature
    if (!verifyWebhookSignature(signature, rawBody, webhookSecret)) {
      console.error("Invalid signature");
      return new NextResponse(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Get the user ID from the webhook payload
    const userId = body.meta.custom_data?.user_id;
    if (!userId) {
      console.error("Missing user ID in webhook payload");
      return new NextResponse(JSON.stringify({ error: "Missing user ID" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Process the webhook based on event type
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

async function handleSubscriptionChange(body: any) {
  const userId = body.meta.custom_data.user_id;
  const subscriptionId = body.data.id;
  const status = body.data.attributes.status;
  const planId = body.data.attributes.variant_id;

  let credits = 5;
  let plan: PLANS = PLANS.FREE;

  if (planId === 638793 || planId === 638802) {
    credits = 50;
    plan = PLANS.BASIC;
  } else if (planId === 638800 || planId === 638803) {
    credits = 150;
    plan = PLANS.PRO;
  }
  
  const updateData: any = {
    subscriptionId,
    subscriptionStatus: status,
    plan,
    credits
  };

  // Only add planId if it exists
  if (planId) {
    updateData.planId = planId;
  }
  
  console.log(credits, planId);
  
  // Only add renewal date if it exists and is valid
  const renewsAt = body.data.attributes.renews_at;
  if (renewsAt && !isNaN(new Date(renewsAt).getTime())) {
    updateData.currentPeriodEnd = new Date(renewsAt);
  }

  await db.user.update({
    where: { id: userId },
    data: updateData
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