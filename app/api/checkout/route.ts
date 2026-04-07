import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getCarById } from '@/lib/inventory';

export async function POST(req: Request) {
  try {
    const { carId } = await req.json();

    if (!carId) {
      return NextResponse.json({ error: 'Car ID is required' }, { status: 400 });
    }

    const car = await getCarById(carId);

    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${car.year} ${car.make} ${car.model}`,
              images: [car.image],
              description: car.description,
            },
            unit_amount: Math.round(car.price * 100), // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/inventory/${carId}`,
      metadata: {
        carId: car.id || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
