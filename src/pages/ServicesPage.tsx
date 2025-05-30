import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle, Dumbbell, Utensils, User, Package, Recycle as Bicycle, ListChecks, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import ServiceCard from '../components/ServiceCard';
import { products } from '../stripe-config';

const services = [
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
      '37% savings Vs. individual plans'
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

const ServicesPage: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

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

  const addToCart = (service: any) => {
    const existingCart = localStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];
    
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
    
    // Check if this product is already in the cart
    const existingItem = cart.find((item: any) => item.id === stripeProductId);
    
    if (!existingItem) {
      // Add new item with Stripe product ID, but keep the service price for display
      cart.push({
        id: stripeProductId,
        title: service.title,
        price: service.price
      });
      
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.querySelector('.carousel-item')?.offsetWidth || 0;
      const scrollAmount = cardWidth + 16; // card width + gap
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Update active index
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.querySelector('.carousel-item')?.offsetWidth || 0;
      const scrollAmount = cardWidth + 16; // card width + gap
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update active index
      if (activeIndex < services.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
  };
  
  // Handle carousel scroll events to update active index
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.querySelector('.carousel-item')?.offsetWidth || 0;
        const newIndex = Math.round(scrollLeft / (cardWidth + 16));
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
          setActiveIndex(newIndex);
        }
      }
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex, services.length]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.4 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <ShoppingBag className="inline-block mr-3 text-primary-500" size={36} />
                Fitness & <span className="text-primary-500">Nutrition</span> Programs
              </h1>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-primary-500 mt-1 flex-shrink-0" size={20} />
                      <p className="text-gray-300">Customized tailored plans</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-primary-500 mt-1 flex-shrink-0" size={20} />
                      <p className="text-gray-300">Science-based training + nutrition principles</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-primary-500 mt-1 flex-shrink-0" size={20} />
                      <p className="text-gray-300">Constant support and guidance</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-primary-500 mt-1 flex-shrink-0" size={20} />
                      <p className="text-gray-300">Regular tracked progress assessments</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {isMobile ? (
              <div className="relative">
                <div 
                  ref={carouselRef}
                  className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-4"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {services.map((service, index) => (
                    <div 
                      key={service.id} 
                      className="carousel-item flex-shrink-0 w-full snap-center"
                    >
                      <ServiceCard service={service} onAddToCart={addToCart} />
                    </div>
                  ))}
                </div>
                
                {/* Navigation Row - buttons and pagination dots in one row */}
                {services.length > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-3">
                    <button 
                      onClick={scrollLeft} 
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
                            index === activeIndex ? 'bg-primary-600' : 'bg-dark-700'
                          }`}
                          onClick={() => {
                            setActiveIndex(index);
                            if (carouselRef.current) {
                              const container = carouselRef.current;
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
                      onClick={scrollRight} 
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
                ref={ref}
              >
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} onAddToCart={addToCart} />
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ServicesPage;