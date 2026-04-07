"use client";

import { useState } from 'react';
import { getStripe } from '@/lib/stripe-client';

interface CheckoutButtonProps {
  carId: string;
}

export default function CheckoutButton({ carId }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carId }),
      });

      const { sessionId, url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session URL');
      }
    } catch (err: any) {
      console.error('Checkout Error:', err);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="flex-1 block text-center bg-white text-black px-8 py-4 uppercase tracking-[0.3em] font-black text-xs hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : 'Reserve Now'}
    </button>
  );
}
