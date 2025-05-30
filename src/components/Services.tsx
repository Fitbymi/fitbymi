import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Download, Dumbbell, Utensils, User, Package, Heart, Recycle as Bicycle, ListChecks, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ServiceCard from './ServiceCard';
import { requestGuide } from '../api/webhook';
import { products } from '../stripe-config';

export const services = [
  {
    id: 'workout',
    title: 'Workout Only',
    price: 199,
    icon: <Dumbbell className="text-primary-500" size={32} />,
    features: [
      'Customized 4-week training plan',
      "Coach Michelle Oliveira's Unwavering support",
      'Weekly check-ins to progress monitoring and adjustments',
      'Guided Fitness Goal setting',
      'Body metrics tracking',
      'Exclusive Access to a coaching app',
      'Exclusive Access to the "Fit by Mi" WhatsApp Community and Forum',
      'Exclusive Access to Training Articles'
    ],
    popular: false
  },
  {
    id: 'nutrition',
    title: 'Nutrition Only',
    price: 199,
    icon: <Utensils className="text-primary-500\" size={32} />,
    features: [
      'Customized nutrition plan',
      "Coach Michelle Oliveira's Unwavering support",
      'Weekly check-ins to progress monitoring and adjustments',
      'Guided Fitness Goal setting',
      'Body metrics tracking',
      'Exclusive Access to our coaching app',
      'Exclusive Access to the "Fit by Mi" WhatsApp Community and Forum',
      'Exclusive Access to Nutrition Articles'
    ],
    popular: false
  },
  {
    id: 'posing',
    title: '1:1 Posing',
    price: 99,
    priceLabel: '3 Sessions',
    icon: <User className="text-primary-500" size={32} />,
    features: [
      'Personalized 1:1 Posing Sessions (3 x 45 mins)',
      'Expert Guidance from a Proven Champion',
      'Glam Fit Guidance',
      'Tailored Feedback',
      'Confidence Support',
      'Boost stage presence with constructive guidance',
      'Shine in the spotlight with lasting impressions'
    ],
    popular: false
  },
  {
    id: 'combo',
    title: 'Combo Package',
    price: 250,
    icon: <Package className="text-primary-500\" size={32} />,
    features: [
      'Complete workout plans',
      'Full nutrition guidance',
      'Weekly check-ins',
      'Direct coach messaging',
      'Body composition analysis',
      'Priority support',
      '37% savings vs individual plans'
    ],
    popular: true
  },
  {
    id: 'booty',
    title: 'Booty-Building Program',
    price: 90,
    priceLabel: '8 weeks',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 4c-2 5-2 11 0 16" />
  <path d="M18 4c2 5 2 11 0 16" />
  <path d="M6 20c3-2 9-2 12 0" />
</svg>,
    features: [
      '3–4 lower body-focused workouts/week',
      'Glute activation warmups',
      'Video demos & technique tips',
      'Weekly progressions',
      'Bonus recovery and nutrition guidance',
    ],
    popular: false
  },
  {
    id: 'sixpack',
    title: 'Six-Pack Abdominal Program',
    price: 80,
    priceLabel: '8 weeks',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 2c-.5 2-.5 5-3 6v6c2.5 1 2.5 4 3 6" />
  <path d="M15 2c.5 2 .5 5 3 6v6c-2.5 1-2.5 4-3 6" />
  <rect x="9" y="6" width="2.5" height="3" rx="0.3" />
  <rect x="12.5" y="6" width="2.5" height="3" rx="0.3" />

  <rect x="9" y="10" width="2.5" height="3" rx="0.3" />
  <rect x="12.5" y="10" width="2.5" height="3" rx="0.3" />

  <rect x="9" y="14" width="2.5" height="3" rx="0.3" />
  <rect x="12.5" y="14" width="2.5" height="3" rx="0.3" />
</svg>,
    features: [
      'Cardio Plan for Fat Loss',
      'Abdominal Workouts',
      'Nutritional Guidance',
      'Supplement Recommendations',
      'Fasted Cardio for Optimal Fat Loss'
    ],
    popular: false
  }
];

// Mapping between service IDs and Stripe product IDs
const serviceToStripeProductMap = {
  'workout': 'prod_SG1JjNgIywzd5S',
  'nutrition': 'prod_SG1LOOOFt4jZec',
  'combo': 'prod_SG1N3NdD4esDMH',
  'booty': 'prod_SG1QPx5FPi86Rj',
  'sixpack': 'prod_SG1Sk7PleXRgvG',
  'posing': 'prod_SG1UWIK3PV3QxM',
};

// Free guides data
const guides = [
  {
    id: 'abs',
    title: '30-Day Abdominal Challenge',
    description: 'Targeted core workouts to sculpt and strengthen your abdominal muscles in 30 days.',
    icon: <ListChecks className="text-primary-500" size={24} />,
    guideType: 'abdominal'
  },
  {
    id: 'glutes',
    title: 'Glute Circuit Workout',
    description: 'Build stronger, shapelier glutes with this specially designed circuit training program.',
    icon: <Bicycle className="text-primary-500\" size={24} />,
    guideType: 'glutes'
  }
];

const Services: React.FC = ({ addToCart }) => {
  const [emails, setEmails] = useState({
    'abs': '',
    'glutes': ''
  });
  const [names, setNames] = useState({
    'abs': '',
    'glutes': ''
  });
  const [submittingGuide, setSubmittingGuide] = useState({
    'abs': false,
    'glutes': false
  });
  const [submittedGuides, setSubmittedGuides] = useState({
    'abs': false,
    'glutes': false
  });
  const [errors, setErrors] = useState({
    'abs': '',
    'glutes': ''
  });
  const [isMobile, setIsMobile] = useState(false);
  
  // Service carousel state
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const serviceCarouselRef = useRef(null);
  
  // Guide carousel state
  const [activeGuideIndex, setActiveGuideIndex] = useState(0);
  const guideCarouselRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>, guideId: string) => {
    setEmails({
      ...emails,
      [guideId]: e.target.value
    });
    
    // Clear error when typing
    if (errors[guideId]) {
      setErrors({
        ...errors,
        [guideId]: ''
      });
    }
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, guideId: string) => {
    setNames({
      ...names,
      [guideId]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent, guideId: string) => {
    e.preventDefault();
    
    const email = emails[guideId];
    const name = names[guideId];
    
    if (!email) {
      setErrors({
        ...errors,
        [guideId]: 'Please enter your email address'
      });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({
        ...errors,
        [guideId]: 'Please enter a valid email address'
      });
      return;
    }
    
    setSubmittingGuide({
      ...submittingGuide,
      [guideId]: true
    });
    
    try {
      // Find the guide to get its type
      const guide = guides.find(g => g.id === guideId);
      
      if (!guide) {
        throw new Error(`Guide with id ${guideId} not found`);
      }
      
      const success = await requestGuide(email, name, guide.guideType);
      
      if (success) {
        setSubmittedGuides({
          ...submittedGuides,
          [guideId]: true
        });
        
        setErrors({
          ...errors,
          [guideId]: ''
        });
      } else {
        setErrors({
          ...errors,
          [guideId]: 'Failed to request guide. Please try again.'
        });
      }
    } catch (error) {
      console.error(`Error requesting guide ${guideId}:`, error);
      setErrors({
        ...errors,
        [guideId]: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setSubmittingGuide({
        ...submittingGuide,
        [guideId]: false
      });
    }
  };
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { ref: guideRef, inView: guideInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Service carousel functions
  const scrollServiceLeft = () => {
    if (serviceCarouselRef.current) {
      const container = serviceCarouselRef.current;
      const cardWidth = container.querySelector('.carousel-item')?.offsetWidth || 0;
      const scrollAmount = cardWidth + 16; // card width + gap
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Update active index
      if (activeServiceIndex > 0) {
        setActiveServiceIndex(activeServiceIndex - 1);
      }
    }
  };
  
  const scrollServiceRight = () => {
    if (serviceCarouselRef.current) {
      const container = serviceCarouselRef.current;
      const cardWidth = container.querySelector('.carousel-item')?.offsetWidth || 0;
      const scrollAmount = cardWidth + 16; // card width + gap
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update active index
      if (activeServiceIndex < services.length - 1) {
        setActiveServiceIndex(activeServiceIndex + 1);
      }
    }
  };
  
  // Guide carousel functions
  const scrollGuideLeft = () => {
    if (guideCarouselRef.current) {
      const container = guideCarouselRef.current;
      const cardWidth = container.querySelector('.guide-item')?.offsetWidth || 0;
      const scrollAmount = cardWidth + 16; // card width + gap
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Update active index
      if (activeGuideIndex > 0) {
        setActiveGuideIndex(activeGuideIndex - 1);
      }
    }
  };
  
  const scrollGuideRight = () => {
    if (guideCarouselRef.current) {
      const container = guideCarouselRef.current;
      const cardWidth = container.querySelector('.guide-item')?.offsetWidth || 0;
      const scrollAmount = cardWidth + 16; // card width + gap
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update active index
      if (activeGuideIndex < guides.length - 1) {
        setActiveGuideIndex(activeGuideIndex + 1);
      }
    }
  };
  
  // Handle service carousel scroll events to update active index
  useEffect(() => {
    const handleServiceScroll = () => {
      if (serviceCarouselRef.current) {
        const container = serviceCarouselRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.querySelector('.carousel-item')?.offsetWidth || 0;
        const newIndex = Math.round(scrollLeft / (cardWidth + 16));
        if (newIndex !== activeServiceIndex && newIndex >= 0 && newIndex < services.length) {
          setActiveServiceIndex(newIndex);
        }
      }
    };
    
    const serviceCarousel = serviceCarouselRef.current;
    if (serviceCarousel) {
      serviceCarousel.addEventListener('scroll', handleServiceScroll);
      return () => serviceCarousel.removeEventListener('scroll', handleServiceScroll);
    }
  }, [activeServiceIndex, services.length]);
  
  // Handle guide carousel scroll events
  useEffect(() => {
    const handleGuideScroll = () => {
      if (guideCarouselRef.current) {
        const container = guideCarouselRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.querySelector('.guide-item')?.offsetWidth || 0;
        const newIndex = Math.round(scrollLeft / (cardWidth + 16));
        if (newIndex !== activeGuideIndex && newIndex >= 0 && newIndex < guides.length) {
          setActiveGuideIndex(newIndex);
        }
      }
    };
    
    const guideCarousel = guideCarouselRef.current;
    if (guideCarousel) {
      guideCarousel.addEventListener('scroll', handleGuideScroll);
      return () => guideCarousel.removeEventListener('scroll', handleGuideScroll);
    }
  }, [activeGuideIndex, guides.length]);
  
  // Enhanced addToCart function with proper Stripe product mapping
  const handleAddToCart = (service) => {
    // Get the corresponding Stripe product ID
    const stripeProductId = serviceToStripeProductMap[service.id];
    
    if (!stripeProductId) {
      console.error(`Stripe product not found for service ID: ${service.id}`);
      return;
    }
    
    // Find the Stripe product details
    const stripeProduct = products.find(p => p.id === stripeProductId);
    
    if (!stripeProduct) {
      console.error(`Stripe product details not found for ID: ${stripeProductId}`);
      return;
    }
    
    // Call the parent addToCart function with the service but augment it with Stripe ID
    const serviceWithStripeId = {
      ...service,
      stripeProductId // Pass the Stripe product ID for use in checkout
    };
    
    addToCart(serviceWithStripeId);
  };

  return (
    <section id="services" className="section-padding bg-dark-900" ref={ref}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">Fitness & Nutrition Programs</h2>
          <p className="text-gray-300">
            Choose the perfect plan that aligns with your fitness goals and lifestyle.</p>
        </div>

        {isMobile ? (
          <div className="relative">
            <div 
              ref={serviceCarouselRef}
              className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className="carousel-item flex-shrink-0 w-full snap-center"
                >
                  <ServiceCard service={service} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
            
            {/* Navigation Row - buttons and pagination dots in one row */}
            {services.length > 1 && (
              <div className="flex justify-center items-center gap-2 mt-3">
                <button 
                  onClick={scrollServiceLeft} 
                  className="p-2 bg-dark-800/80 backdrop-blur-sm rounded-full hover:bg-primary-600 transition-colors duration-300"
                  aria-label="Previous service"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {/* Pagination Dots */}
                <div className="flex justify-center gap-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === activeServiceIndex ? 'bg-primary-600' : 'bg-dark-700'
                      }`}
                      onClick={() => {
                        setActiveServiceIndex(index);
                        if (serviceCarouselRef.current) {
                          const container = serviceCarouselRef.current;
                          const cardWidth = container.querySelector('.carousel-item')?.offsetWidth || 0;
                          container.scrollTo({ 
                            left: index * (cardWidth + 16), 
                            behavior: 'smooth' 
                          });
                        }
                      }}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={scrollServiceRight} 
                  className="p-2 bg-dark-800/80 backdrop-blur-sm rounded-full hover:bg-primary-600 transition-colors duration-300"
                  aria-label="Next service"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} onAddToCart={handleAddToCart} />
            ))}
          </motion.div>
        )}

        {/* Free Guides Section */}
        <div className="mt-20 mb-8" ref={guideRef}>
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={guideInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4">Free Fitness Guides</h2>
            <p className="text-gray-300">
              Kickstart your fitness journey with these complimentary resources designed to help you achieve your goals.
            </p>
          </motion.div>
          
          {isMobile ? (
            <div className="relative">
              <div 
                ref={guideCarouselRef}
                className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                {guides.map((guide) => (
                  <div 
                    key={guide.id} 
                    className="guide-item flex-shrink-0 w-full snap-center"
                  >
                    <div className="bg-gradient-to-r from-dark-800 to-dark-900 p-6 rounded-xl">
                      <div className="flex items-center mb-3">
                        <div className="mr-3">{guide.icon}</div>
                        <h3 className="text-xl font-semibold">{guide.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-4">{guide.description}</p>
                      {!submittedGuides[guide.id] ? (
                        <form onSubmit={(e) => handleSubmit(e, guide.id)} className="flex flex-col gap-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="w-full">
                              <input
                                type="text"
                                placeholder="Your name"
                                className="w-full px-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={names[guide.id]}
                                onChange={(e) => handleNameChange(e, guide.id)}
                                disabled={submittingGuide[guide.id]}
                              />
                            </div>
                            <div className="w-full">
                              <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={emails[guide.id]}
                                onChange={(e) => handleEmailChange(e, guide.id)}
                                disabled={submittingGuide[guide.id]}
                              />
                            </div>
                          </div>
                          {errors[guide.id] && (
                            <p className="mt-2 text-sm text-left text-red-500">{errors[guide.id]}</p>
                          )}
                          <button
                            type="submit"
                            className="btn btn-primary flex items-center justify-center gap-2 mt-2"
                            disabled={submittingGuide[guide.id]}
                          >
                            <span>{submittingGuide[guide.id] ? 'Processing...' : 'Get Guide'}</span>
                            <Download size={16} />
                          </button>
                        </form>
                      ) : (
                        <div className="text-center p-4 bg-primary-500/20 rounded-md">
                          <p className="text-white">Thanks! Check your inbox for your free guide.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Row - buttons and pagination dots in one row */}
              {guides.length > 1 && (
                <div className="flex justify-center items-center gap-2 mt-3">
                  <button 
                    onClick={scrollGuideLeft} 
                    className="p-2 bg-dark-800/80 backdrop-blur-sm rounded-full hover:bg-primary-600 transition-colors duration-300"
                    aria-label="Previous guide"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {/* Pagination Dots */}
                  <div className="flex justify-center gap-2">
                    {guides.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          index === activeGuideIndex ? 'bg-primary-600' : 'bg-dark-700'
                        }`}
                        onClick={() => {
                          setActiveGuideIndex(index);
                          if (guideCarouselRef.current) {
                            const container = guideCarouselRef.current;
                            const cardWidth = container.querySelector('.guide-item')?.offsetWidth || 0;
                            container.scrollTo({ 
                              left: index * (cardWidth + 16), 
                              behavior: 'smooth' 
                            });
                          }
                        }}
                        aria-label={`Go to guide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={scrollGuideRight} 
                    className="p-2 bg-dark-800/80 backdrop-blur-sm rounded-full hover:bg-primary-600 transition-colors duration-300"
                    aria-label="Next guide"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {guides.map((guide) => (
                <motion.div 
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={guideInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: guides.indexOf(guide) * 0.1 }}
                  className="bg-gradient-to-r from-dark-800 to-dark-900 p-6 rounded-xl"
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3">{guide.icon}</div>
                    <h3 className="text-xl font-semibold">{guide.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{guide.description}</p>
                  {!submittedGuides[guide.id] ? (
                    <form onSubmit={(e) => handleSubmit(e, guide.id)} className="flex flex-col gap-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Your name"
                            className="w-full px-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={names[guide.id]}
                            onChange={(e) => handleNameChange(e, guide.id)}
                            disabled={submittingGuide[guide.id]}
                          />
                        </div>
                        <div className="w-full">
                          <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-3 bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={emails[guide.id]}
                            onChange={(e) => handleEmailChange(e, guide.id)}
                            disabled={submittingGuide[guide.id]}
                          />
                        </div>
                      </div>
                      {errors[guide.id] && (
                        <p className="mt-2 text-sm text-left text-red-500">{errors[guide.id]}</p>
                      )}
                      <button
                        type="submit"
                        className="btn btn-primary flex items-center justify-center gap-2 whitespace-nowrap mt-2"
                        disabled={submittingGuide[guide.id]}
                      >
                        <span>{submittingGuide[guide.id] ? 'Processing...' : 'Get Guide'}</span>
                        <Download size={16} />
                      </button>
                    </form>
                  ) : (
                    <div className="text-center p-4 bg-primary-500/20 rounded-md">
                      <p className="text-white">Thanks! Check your inbox for your free guide.</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;