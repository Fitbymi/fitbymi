import React, { useState } from 'react';
import { ShoppingCart, X, Minus, Plus, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const Cart: React.FC<CartProps> = ({ 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  totalItems
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckout = () => {
    setCheckoutLoading(true);
    // Simulating API call to Stripe
    setTimeout(() => {
      alert('Redirecting to payment gateway...');
      setCheckoutLoading(false);
      // In a real application, you would redirect to Stripe's checkout page
    }, 1500);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
      {/* Cart Icon */}
      <button 
        className="fixed bottom-6 right-6 z-40 p-4 bg-primary-600 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
        onClick={toggleCart}
        aria-label="Open cart"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-primary-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-dark-900 shadow-xl flex flex-col"
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6 border-b border-dark-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingCart size={24} />
                <span>Your Cart</span>
              </h2>
              <button 
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-dark-700 transition-colors duration-300"
                onClick={toggleCart}
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={48} className="text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 mb-6">Add some fitness packages to get started!</p>
                  <button 
                    className="btn btn-primary"
                    onClick={toggleCart}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between pb-6 border-b border-dark-700"
                    >
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <p className="text-primary-500 font-medium">${item.price} / month</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-dark-800 rounded-md">
                          <button 
                            className="p-1 text-gray-400 hover:text-white" 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            className="p-1 text-gray-400 hover:text-white" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-dark-700 transition-colors duration-300"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-dark-700 bg-dark-800">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold">${calculateTotal()} / month</span>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span className="text-gray-400">Total</span>
                  <span className="text-xl font-bold">${calculateTotal()} / month</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className="btn btn-outline"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className="btn btn-primary flex items-center justify-center gap-2"
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Checkout</span>
                        <CreditCard size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;