import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateCar } from '@/lib/inventory';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === 'checkout.session.completed') {
    const carId = session.metadata.carId;

    if (carId) {
      try {
        await updateCar(carId, {
          status: 'Reserved',
          description: `[RESERVED] ${session.customer_details.email} - ${session.id}\n\n` + (session.metadata.description || '')
        });
        console.log(`Car ${carId} reserved successfully`);
      } catch (err) {
        console.error(`Failed to update car ${carId}:`, err);
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
