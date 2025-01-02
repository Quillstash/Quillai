import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import lemonSqueezyApiInstance from '@/utils/lemonSqueezyApi';

export const dynamic = "force-dynamic";

// Define subscription plans
const subscriptionPlans = [
  { id: '638793', name: "Basic Plan", price: 25, interval: 'monthly' },
  { id: '638800', name: "Pro Plan", price: 45, interval: 'monthly' },
  { id: '638802', name: "Basic Plan Annually", price: 240, interval: 'annual' },
  { id: '638803', name: "Pro Plan Annually", price: 360, interval: 'annual' },
];

export async function GET() {
  try {
    return Response.json({ plans: subscriptionPlans });
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return Response.json({ error: 'Failed to fetch subscription plans' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await req.json();
    if (!planId) {
      return Response.json({ message: "planId is required" }, { status: 400 });
    }

    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) {
      return Response.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    if (!storeId) {
      throw new Error('LEMON_SQUEEZY_STORE_ID is not configured');
    }

    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: session.user.id,
              plan_name: plan.name,
              plan_Id: plan.id
            },
            email: session.user.email
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: planId.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response.data.data.attributes.url;
    console.log(checkoutUrl)
    return Response.json({ checkoutUrl });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return Response.json({ message: "An error occurred" }, { status: 500 });
  }
}