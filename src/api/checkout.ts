import { loadStripe } from '@stripe/stripe-js';
import { products } from '../stripe-config';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createCheckoutSession(productId: string) {
  try {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    // Using the correct Supabase Edge Function endpoint
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        price_id: product.priceId,
        mode: product.mode,
        success_url: `${window.location.origin}/thank-you`,
        cancel_url: `${window.location.origin}/cart`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    return stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}