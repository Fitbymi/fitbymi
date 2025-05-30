import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ShoppingCart, Loader } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Notification from '../../components/Notification';
import { services } from '../../components/Services';
import { products } from '../../stripe-config';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Mapping between service IDs and Stripe product IDs
const serviceToStripeProductMap = {
  'workout': 'prod_SG1JjNgIywzd5S',
  'nutrition': 'prod_SG1LOOOFt4jZec',
  'combo': 'prod_SG1N3NdD4esDMH',
  'booty': 'prod_SG1QPx5FPi86Rj',
  'sixpack': 'prod_SG1Sk7PleXRgvG',
  'posing': 'prod_SG1UWIK3PV3QxM',
};

// Service images
const serviceImages = {
  workout: '/assets/serviceCards/workout.jpg',
  nutrition: '/assets/serviceCards/nutrition.jpg',
  posing: '/assets/serviceCards/11posing.jpg',
  combo: '/assets/serviceCards/combo.jpg',
  booty: '/assets/serviceCards/bootyBuilding.jpg',
  sixpack: '/assets/serviceCards/sixPack.jpg',
};

// Detailed service descriptions for the "Why Choose This Program?" section
const serviceDescriptions = {
  workout: {
    description: "Embark on a transformative fitness journey with your Custom Workout Plan, a comprehensive online personal training program designed to elevate your fitness experience and help you achieve your health and wellness goals. Led by the expert guidance of Coach Michelle Oliveira, this program offers a personalized approach to your fitness routine.",
    benefits: [
      "Customized 4-week training plan tailored to your unique needs",
      "Weekly progress monitoring and plan adjustments",
      "Guided fitness goal setting and achievement tracking",
      "Exclusive access to the Fit by Mi WhatsApp Community",
      "24/48-hour delivery of your fully customized program"
    ],
    process: "You'll receive access to the Coaching app within 24 hours, complete a detailed questionnaire, and have an initial consultation with Coach Michelle. Your custom program will be delivered within 24-48 hours through the app."
  },
  nutrition: {
    description: "Our Custom Nutrition Coaching program meticulously crafted by Michelle Oliveira, your dedicated personal trainer, bodybuilder, and seasoned nutrition coach. This online program is the key to unlocking your fitness potential and achieving your body transformation goals.",
    benefits: [
      "Fully customized nutrition plan aligned with your specific goals",
      "Weekly check-ins with Michelle for progress tracking",
      "Body metrics monitoring and adjustment strategies",
      "Access to exclusive nutrition articles and resources",
      "Membership in the Fit by Mi community for ongoing support"
    ],
    process: "You'll gain access to our Coaching app within 24 hours, complete a comprehensive questionnaire about your nutrition habits and goals, and have a personal consultation with Michelle to align on expectations."
  },
  posing: {
    description: "Unlock your full potential and radiate confidence on stage with our exclusive Ultimate Competition Posing Mastery Package. Tailored for aspiring fit model, bikini, and wellness competitors, this package offers a unique opportunity to refine your posing skills with Michelle Oliveira, a seasoned bikini bodybuilder with 8 years of competition experience and the 2023 Ms. Indiana Bikini title.",
    benefits: [
      "Three personalized 45-minute 1:1 posing sessions",
      "Expert guidance from a champion with 9+ years of competition experience",
      "Glam Fit guidance covering makeup, suit, jewelry, hair, and shoes",
      "Personalized technique refinement to accentuate your physique",
      "Confidence and stage presence coaching for a memorable performance"
    ],
    process: "Your sessions will focus on developing a confident stage presence, mastering mandatory poses, and creating a seamless routine that showcases your strengths. Whether you're a first-time competitor or looking to refine your skills, this package is your key to mastering competition posing."
  },
  combo: {
    description: "The Combo Package combines both personalized workout and nutrition guidance for a comprehensive approach to achieving your fitness goals. With Coach Michelle's expertise in both training and nutrition, you'll receive a fully integrated program that optimizes every aspect of your fitness journey.",
    benefits: [
      "Complete workout plans tailored to your specific goals",
      "Full nutrition guidance with meal planning and macros",
      "Weekly check-ins with direct coach messaging",
      "Body composition analysis and adjustment strategies",
      "Priority support throughout your fitness journey",
      "37% savings compared to purchasing individual plans"
    ],
    process: "You'll receive comprehensive access to both workout and nutrition services through our coaching app. Coach Michelle will personally design both aspects of your program, ensuring they work together harmoniously to maximize your results."
  },
  booty: {
    description: "Sculpt, strengthen, and shape your glutes with the exact training framework Michelle used on her journey to becoming the 2023 Ms. Indiana Bikini. This program is designed for women who want to build lean muscle, boost lower body strength, and create a confident, head-turning physique.",
    benefits: [
      "3–4 lower body-focused workouts each week",
      "Specialized glute activation warm-ups",
      "Video demonstrations for perfect technique",
      "Progressive weekly programming to ensure continuous results",
      "Complementary recovery and nutrition guidance"
    ],
    process: "Over 8 weeks, you'll follow a proven plan that combines resistance training, glute activation, progressive overload, and recovery strategies tailored for results. Whether you're just starting out or leveling up, this program meets you where you are—and helps you build the glutes you've always wanted."
  },
  sixpack: {
    description: "The Six-Pack Shred program combines powerful cardio, targeted abdominal workouts, and expert nutritional guidance to help you shed unwanted fat and reveal a sculpted core over 8 transformative weeks.",
    benefits: [
      "Structured cardio plan designed to maximize fat loss",
      "Three core-focused workouts each week targeting all angles of your abs",
      "Comprehensive nutritional guidance for optimal fat burning",
      "Supplement recommendations to enhance energy and results",
      "Progressive intensity to continually challenge your body"
    ],
    process: "This 8-week program features gradually increasing intensity in both cardio and ab workouts to push past plateaus. The fasted morning cardio sessions specifically target stored fat, while the strategic abdominal training builds definition that becomes visible as you lose weight."
  }
};

const ServicePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  
  const service = services.find(s => s.id === id);
  
  // Early return if service not found
  if (!service) {
    return navigate('/services');
  }

  // Find corresponding Stripe product
  const stripeProductId = serviceToStripeProductMap[service.id];
  const stripeProduct = stripeProductId ? products.find(p => p.id === stripeProductId) : null;

  if (!stripeProduct) {
    console.error(`Stripe product not found for service ID: ${service.id}`);
    // You could handle this error state better, but for now we'll continue
  }

  // Get the appropriate service description
  const serviceDescription = serviceDescriptions[service.id] || {
    description: "This comprehensive program is designed to help you achieve your fitness goals through personalized guidance and expert support.",
    benefits: [
      "Personalized approach tailored to your needs",
      "Regular progress tracking and adjustments",
      "Expert guidance and support throughout",
      "Access to exclusive resources and materials"
    ],
    process: ""
  };

  const addToCart = () => {
    if (!stripeProductId || !stripeProduct) {
      console.error("Cannot add to cart: Stripe product configuration missing");
      return;
    }
    
    const existingCart = localStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];
    
    const existingItem = cart.find((item: any) => item.id === stripeProductId);
    
    if (!existingItem) {
      cart.push({
        id: stripeProductId,
        title: service.title,
        price: service.price
      });
      
      localStorage.setItem('cart', JSON.stringify(cart));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const handlePurchase = async () => {
    if (!stripeProduct) {
      setCheckoutError(`Product configuration not found for: ${service.title}`);
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError(null);
    
    try {
      console.log("Initiating direct checkout for product:", stripeProduct);
      
      // Using the correct Supabase Edge Function endpoint
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          price: stripeProduct.priceId,
          mode: stripeProduct.mode,
          success_url: `${window.location.origin}/thank-you`,
          cancel_url: window.location.origin + window.location.pathname,
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

  return (
    <div className="min-h-screen flex flex-col">
      <Notification 
        message={`${service.title} added to cart!`}
        isVisible={showNotification}
      />
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container py-12">
          <div className="text-center mb-8">
            <button 
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Services</span>
            </button>
            
            <h1 className="text-4xl font-bold mt-4">{service.title}</h1>
            <div className="flex items-baseline justify-center gap-2 mt-2">
              <span className="text-3xl font-bold">${service.price}</span>
              {service.priceLabel && (
                <span className="text-gray-400">/ {service.priceLabel}</span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Service Image */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src={serviceImages[service.id]} 
                    alt={service.title}
                    className="w-full h-80 object-cover"
                  />
                </div>

                <div className="prose prose-invert">
                  <h3 className="text-xl font-semibold mb-4">What's Included:</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-primary-500 mt-1 flex-shrink-0" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {checkoutError && (
                  <div className="mt-6 p-4 bg-red-900/30 border border-red-500 rounded-md text-center">
                    <p className="text-red-400">{checkoutError}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button
                    onClick={addToCart}
                    className="btn btn-outline w-full flex items-center justify-center gap-2"
                    disabled={checkoutLoading}
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={handlePurchase}
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Buy Now</span>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-800 p-8 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-6">Why Choose This Program?</h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  {serviceDescription.description}
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Program Benefits:</h3>
                  <ul className="space-y-3">
                    {serviceDescription.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-primary-500 mt-1" size={20} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {serviceDescription.process && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">How It Works:</h3>
                    <p className="text-gray-300">
                      {serviceDescription.process}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicePage;