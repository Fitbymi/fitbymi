import React, { useState } from 'react';
import { Mail, AlertTriangle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { unsubscribeFromNewsletter } from '../api/webhook';

const UnsubscribePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await unsubscribeFromNewsletter(email);
      
      if (success) {
        setIsUnsubscribed(true);
        setError('');
      } else {
        setError('Failed to unsubscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter unsubscription error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Unsubscribe from Newsletter</h1>
              <p className="text-gray-300">
                We're sorry to see you go. Enter your email address below to unsubscribe from our newsletter.
              </p>
            </div>
            
            <div className="p-8 rounded-xl bg-gradient-to-r from-dark-800 to-dark-900">
              {!isUnsubscribed ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 text-gray-500" size={20} />
                      <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        className={`w-full pl-10 pr-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 ${
                          error ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-primary-500'
                        }`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        disabled={isSubmitting}
                      />
                    </div>
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-start p-4 bg-dark-700 rounded-md">
                      <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                      <p className="ml-3 text-sm text-gray-300">
                        By unsubscribing, you will no longer receive fitness tips, special offers, and updates from Fit By Mi.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Unsubscribe'}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="p-4 rounded-full bg-primary-500/20 text-primary-500 mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Unsubscribed!</h3>
                  <p className="text-gray-300 mb-6">
                    You have been successfully unsubscribed from our newsletter. We're sad to see you go, but you're welcome back anytime.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default UnsubscribePage;