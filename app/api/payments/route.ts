import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from '@/lib/payments';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const allowedOrigins = [
  'http://localhost:3000',
  'https://icy-pans-rush.loca.lt',
  'https://your-production-domain.com',
];

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';
  const headers = new Headers();

  if (allowedOrigins.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }

  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(null, { status: 200, headers });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');
  let event;
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endPointSecret);
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('checkout session completed');
        const sessionId = event.data.object.id;
        console.log(sessionId);

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items'],
        });
        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      case 'customer.subscription.deleted':
        console.log('customer subscription deleted');
        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;
        await handleSubscriptionDeleted({ subscriptionId, stripe });

        console.log(subscription);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    return NextResponse.json({ error: 'Failed to trigger webhook', err }, { status: 400 });
  }
  return NextResponse.json({
    status: 'success',
  });
};
