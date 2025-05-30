import React, { useState } from 'react';
import { Mail, Check, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { subscribeToNewsletter } from '../api/webhook';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
      const success = await subscribeToNewsletter(email, name);
      
      if (success) {
        setIsSubscribed(true);
        setError('');
      } else {
        setError('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="section-padding bg-dark-900" ref={ref}>
      <motion.div 
        className="container"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Join Our Newsletter</h2>
          <p className="mb-8 text-gray-300">
            Subscribe to receive fitness tips, nutritional advice, and exclusive offers to help you on your fitness journey.
          </p>
          
          <div className="p-8 rounded-xl bg-gradient-to-r from-dark-800 to-dark-900">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="absolute top-3 left-3 text-gray-500" size={20} />
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 text-gray-500" size={20} />
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  {error && <p className="mt-2 text-sm text-left text-red-500">{error}</p>}
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 p-4 bg-primary-500/20 rounded-md">
                <Check className="text-primary-500" size={20} />
                <p className="text-white">Thanks for subscribing! You're now on the list.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;