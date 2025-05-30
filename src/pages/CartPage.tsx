import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, X, CreditCard, Loader } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../stripe-config';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CartItem {
  id: string;
  title: string;
  price: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    setCheckoutLoading(true);
    setCheckoutError(null);
    
    try {
      // Get the first product in cart to determine checkout type
      // Stripe sessions can only be one mode (payment or subscription)
      const firstItem = cartItems[0];
      const firstProduct = products.find(p => p.id === firstItem.id);
      
      if (!firstProduct) {
        throw new Error(`Product configuration not found for: ${firstItem.title}`);
      }
      
      // Create line items array for all products in cart
      const lineItems = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);

        if (!product) {
          throw new Error(`Product configuration not found for: ${item.title}`);
        }
        
        return {
          price: product.priceId,
          quantity: 1
        };
      });
      
      console.log("Initiating checkout with products:", lineItems);
      
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          line_items: lineItems,
          mode: firstProduct.mode, // All items must use the same mode
          success_url: `${window.location.origin}/thank-you`,
          cancel_url: `${window.location.origin}/cart`,
        }),
      });

      if (!response.ok) {
        let errorText = 'Failed to create checkout session';
        try {
          const text = await response.text();
          const json = text ? JSON.parse(text) : null;
          if (json && json.error) {
            errorText = json.error;
          }
        } catch (e) {
          console.warn('Could not parse error response as JSON');
        }
        throw new Error(errorText);
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw error;
        }
      } else {
        throw new Error('Stripe failed to initialize');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setCheckoutLoading(false);
    }
  };

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        setCartItems([]);
      }
    }
  }, []);

  const removeFromCart = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  
  const getPriceLabel = () => {
    if (cartItems.length === 0) return '';
    
    // If all items have the same price label, use that
    if (cartItems.every(item => item.id === cartItems[0].id)) {
      return cartItems[0].id === 'prod_SG1UWIK3PV3QxM' ? '/ 3 sessions' :
             (cartItems[0].id === 'prod_SG1QPx5FPi86Rj' || cartItems[0].id === 'prod_SG1Sk7PleXRgvG') ? '/ 8 weeks' : 
             '/ month';
    }
    
    // Otherwise, use a generic label
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-24 bg-dark-900">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <ShoppingCart className="inline-block mr-3 text-primary-500" size={36} />
              Your Cart
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Review your selected services before checkout
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-16 bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl">
              <ShoppingCart size={64} className="text-gray-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Your cart is empty</h3>
              <p className="text-gray-400 mb-8">Looks like you haven't added any fitness packages yet.</p>
              <Link to="/services"
                className="btn btn-primary"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl overflow-hidden">
              {/* Cart Items */}
              <div className="p-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between pb-6 border-b border-dark-700"
                    >
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold">{item.title}</h4>
                        <p className="text-primary-500 font-medium">${item.price} {
                          item.id === 'prod_SG1UWIK3PV3QxM' ? '/ 3 sessions' :
                          (item.id === 'prod_SG1QPx5FPi86Rj' || item.id === 'prod_SG1Sk7PleXRgvG') ? '/ 8 weeks' : 
                          '/ month'
                        }</p>
                      </div>
                      
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-dark-700 transition-colors duration-300"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        disabled={checkoutLoading}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="p-6 bg-dark-900 border-t border-dark-700">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold">${calculateTotal()} {getPriceLabel()}</span>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-bold">${calculateTotal()} {getPriceLabel()}</span>
                </div>
                
                {checkoutError && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-md text-center">
                    <p className="text-red-400">{checkoutError}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className="btn btn-outline"
                    onClick={clearCart}
                    disabled={checkoutLoading}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className="btn btn-primary flex items-center justify-center gap-2"
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Checkout</span>
                        <CreditCard size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;