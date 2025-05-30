import React, { useState } from 'react';
import { Mail, Phone, Send, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { submitContactForm } from '../api/webhook';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { ref, inView } = useInView({
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
          // Handle API error
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="mb-4">Contact Me</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Have questions about my training programs or want to learn more about how I can help you reach your fitness goals? 
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3 p-8 rounded-xl bg-gradient-to-r from-dark-800 to-dark-900">
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
                        Your Phone Number (Optional)
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
  );
};

export default ContactForm;