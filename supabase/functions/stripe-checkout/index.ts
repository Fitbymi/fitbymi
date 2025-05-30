import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

// Properly check for required environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

// Log for debugging (will appear in Supabase logs)
console.log(`Environment variables present: SUPABASE_URL=${!!supabaseUrl}, SUPABASE_SERVICE_ROLE_KEY=${!!supabaseServiceRoleKey}, STRIPE_SECRET_KEY=${!!stripeSecretKey}`);

// Validate required environment variables
if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing required Supabase environment variables');
}

if (!stripeSecretKey) {
  throw new Error('Missing required Stripe secret key environment variable');
}

// Initialize clients with validated environment variables
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
const stripe = new Stripe(stripeSecretKey, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  // For 204 No Content, don't include Content-Type or body
  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const requestBody = await req.json();
    console.log("Request body:", JSON.stringify(requestBody));

    // Extract parameters
    const { 
      price, // Single price parameter for single product checkout
      price_id, // Legacy parameter name (backward compatibility)
      line_items, // For multiple products
      success_url, 
      cancel_url, 
      mode 
    } = requestBody;

    // Validate request parameters based on whether we're handling a single item or multiple items
    if (line_items && Array.isArray(line_items)) {
      // Multiple items case
      if (!line_items.length) {
        return corsResponse({ error: 'At least one line item is required' }, 400);
      }
      
      if (!mode) {
        return corsResponse({ error: 'Mode is required for multi-product checkout' }, 400);
      }
      
      if (mode !== 'payment' && mode !== 'subscription') {
        return corsResponse({ error: 'Mode must be either "payment" or "subscription"' }, 400);
      }

      // Validate all line items have a price property
      for (const item of line_items) {
        if (!item.price) {
          return corsResponse({ 
            error: `Line item missing price property: ${JSON.stringify(item)}` 
          }, 400);
        }
      }
    } else {
      // Single item case
      // Support both price and price_id for backward compatibility
      const priceId = price || price_id;
      
      if (!priceId) {
        return corsResponse({ error: 'Price ID is required' }, 400);
      }
      
      if (!mode) {
        return corsResponse({ error: 'Mode is required' }, 400);
      }
      
      if (mode !== 'payment' && mode !== 'subscription') {
        return corsResponse({ error: 'Mode must be either "payment" or "subscription"' }, 400);
      }
    }

    // Validate success_url and cancel_url regardless of single or multi-item
    if (!success_url) {
      return corsResponse({ error: 'Success URL is required' }, 400);
    }
    
    if (!cancel_url) {
      return corsResponse({ error: 'Cancel URL is required' }, 400);
    }

    // Try to get auth information, but make it optional for now
    let user = null;
    let customerId = null;

    const authHeader = req.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      try {
        const { data: userData } = await supabase.auth.getUser(token);
        if (userData && userData.user) {
          user = userData.user;
          
          // Try to fetch customer ID
          const { data: customer } = await supabase
            .from('stripe_customers')
            .select('customer_id')
            .eq('user_id', user.id)
            .is('deleted_at', null)
            .maybeSingle();
          
          if (customer && customer.customer_id) {
            customerId = customer.customer_id;
          }
        }
      } catch (error) {
        console.warn('Auth error but proceeding as guest:', error);
      }
    }

    // If we don't have a customer ID but have a user, create a customer
    if (user && !customerId) {
      try {
        const newCustomer = await stripe.customers.create({
          email: user.email,
          metadata: {
            userId: user.id,
          },
        });

        console.log(`Created new Stripe customer ${newCustomer.id} for user ${user.id}`);

        // Save customer mapping
        await supabase.from('stripe_customers').insert({
          user_id: user.id,
          customer_id: newCustomer.id,
        });

        customerId = newCustomer.id;
      } catch (error) {
        console.warn('Failed to create customer but proceeding with guest checkout:', error);
      }
    }

    // Prepare checkout session options
    let sessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: mode as 'payment' | 'subscription',
      success_url,
      cancel_url,
    };

    // Add customer if available
    if (customerId) {
      sessionOptions.customer = customerId;
    }

    // Add line items based on whether we have single product or multiple products
    if (line_items && Array.isArray(line_items)) {
      // For multiple products
      sessionOptions.line_items = line_items;
    } else {
      // For single product
      sessionOptions.line_items = [{
        price: price || price_id, // Support both parameter names
        quantity: 1,
      }];
    }

    // Create the checkout session
    console.log("Creating session with options:", JSON.stringify(sessionOptions));
    const session = await stripe.checkout.sessions.create(sessionOptions);

    console.log(`Created checkout session ${session.id}`);

    return corsResponse({ 
      sessionId: session.id, 
      url: session.url 
    });
  } catch (error: any) {
    console.error(`Checkout error: ${error.message}`);
    return corsResponse({ error: error.message }, 500);
  }
});