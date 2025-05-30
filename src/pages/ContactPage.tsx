import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, User, Check, MapPin, MessageSquare } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { submitContactForm, subscribeToNewsletter } from '../api/webhook';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: newsletterRef, inView: newsletterInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const success = await submitContactForm(
          formData.name,
          formData.email,
          formData.phone,
          formData.message
        );
        
        if (success) {
          // Show success message
          setIsSubmitted(true);
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
        } else {
          alert("There was an error submitting your message. Please try again.");
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert("There was an error submitting your message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      setNewsletterError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    
    setIsSubscribing(true);
    
    try {
      const success = await subscribeToNewsletter(newsletterEmail, newsletterName);
      
      if (success) {
        setIsSubscribed(true);
        setNewsletterError('');
      } else {
        setNewsletterError('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setNewsletterError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubscribing(false);
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
    <motion.div 
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <main className="flex-1 pt-24">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 bg-dark-900"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <MessageSquare className="inline-block mr-3 text-primary-500" size={36} />
                Contact Me
              </h1>
              <p className="text-gray-300">
                Have questions about my training programs or want to learn more about how I can help you reach your fitness goals? 
                I'm just a message away!
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <section id="contact-form" className="bg-dark-900" ref={contactRef}>
          <motion.div 
            className="container"
            variants={sectionVariants}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
          >
            <div className="max-w-5xl mx-auto">
              <div className="gap-8">
                
                {/* Contact Form */}
                <div className="p-8 rounded-xl bg-gradient-to-r from-dark-800 to-dark-900">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                            Your Name
                          </label>
                          <div className="relative">
                            <User className="absolute top-3 left-3 text-gray-500" size={20} />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="John Doe"
                              className={`w-full pl-10 pr-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 ${
                                errors.name ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-primary-500'
                              }`}
                              value={formData.name}
                              onChange={handleChange}
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                            Your Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute top-3 left-3 text-gray-500" size={20} />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="john@example.com"
                              className={`w-full pl-10 pr-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 ${
                                errors.email ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-primary-500'
                              }`}
                              value={formData.email}
                              onChange={handleChange}
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                            Your Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute top-3 left-3 text-gray-500" size={20} />
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="(123) 456-7890"
                              className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              value={formatPhoneNumber(formData.phone)}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="How can I help you?"
                          className={`w-full p-4 bg-dark-700 rounded-md focus:outline-none focus:ring-2 ${
                            errors.message ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-primary-500'
                          }`}
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
                      </div>
                      
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="btn btn-primary flex items-center justify-center gap-2 w-full md:w-auto px-10"
                          disabled={isSubmitting}
                        >
                          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                          <Send size={16} />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-16">
                      <div className="p-4 rounded-full bg-primary-500/20 text-primary-500 mb-6">
                        <Send size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                      <p className="text-gray-300 mb-6">
                        Thank you for reaching out. I'll get back to you as soon as possible.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="btn btn-outline"
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="section-padding bg-dark-900" ref={newsletterRef}>
          <motion.div 
            className="container"
            variants={sectionVariants}
            initial="hidden"
            animate={newsletterInView ? "visible" : "hidden"}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">Join My Newsletter</h2>
              <p className="mb-8 text-gray-300">
                Subscribe to receive fitness tips, nutritional advice, and exclusive offers to help you on your fitness journey.
              </p>
              
              <div className="p-8 rounded-xl bg-gradient-to-r from-dark-800 to-dark-900">
                {!isSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="relative">
                          <User className="absolute top-3 left-3 text-gray-500" size={20} />
                          <input
                            type="text"
                            placeholder="Your name"
                            className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={newsletterName}
                            onChange={(e) => setNewsletterName(e.target.value)}
                            disabled={isSubscribing}
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute top-3 left-3 text-gray-500" size={20} />
                          <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            disabled={isSubscribing}
                          />
                        </div>
                      </div>
                      {newsletterError && <p className="mt-2 text-sm text-left text-red-500">{newsletterError}</p>}
                      <button
                        type="submit"
                        className="btn btn-primary mt-2"
                        disabled={isSubscribing}
                      >
                        {isSubscribing ? 'Processing...' : 'Subscribe'}
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
      </main>
      <Footer />
    </motion.div>
  );
};

export default ContactPage;