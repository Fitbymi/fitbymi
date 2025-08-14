import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { products } from '../stripe-config';

// Mapping between service IDs and Stripe product IDs
const serviceToStripeProductMap = {
  'workout': 'prod_SG1JjNgIywzd5S',
  'nutrition': 'prod_SG1LOOOFt4jZec',
  'combo': 'prod_SG1N3NdD4esDMH',
  'booty': 'prod_SG1QPx5FPi86Rj',
  'sixpack': 'prod_SG1Sk7PleXRgvG',
  'posing': 'prod_SG1UWIK3PV3QxM',
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const addToCart = (service: any) => {
    // Get existing cart from localStorage
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
    
    // Check if service is already in cart using Stripe product ID
    const existingItem = cart.find((item: any) => item.id === stripeProductId);
    
    if (!existingItem) {
      // Add new item with the Stripe product ID
      cart.push({
        id: stripeProductId,
        title: service.title,
        price: service.price
      });
      
      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FitByMi - Personal Trainer Michelle Oliveira</title>
        <meta name="description" content="Improve your body with certified trainer Michelle Oliveira. Custom workout plans, nutrition coaching & posing instruction. Start today!" />
        <meta name="keywords" content="personal trainer Indianapolis, online fitness coaching, nutrition coaching, workout plans, posing coach, bodybuilding, weight loss, muscle building, certified trainer, Michelle Oliveira" />
        <link rel="canonical" href="https://fitbymi.net/" />
      </Helmet>
      <Navbar />
      <main>
        <div className="sr-only">
          <h1>FitByMi Personal Fitness Training and Online Coaching</h1>
          <p>
            Welcome to FitByMi, your premier destination for personalized fitness training and nutrition coaching. 
            Led by certified personal trainer Michelle Oliveira, we offer comprehensive online coaching services 
            including custom workout plans, nutrition guidance, posing instruction, and specialized programs for 
            bodybuilding, weight loss, and muscle building. Our evidence-based approach combines Michelle's 9+ years 
            of experience as a competitive bodybuilder with her expertise as a NASM-certified trainer and nutrition coach.
          </p>
        </div>
        <Hero />
        <Services addToCart={addToCart} />
        <Testimonials />
        <Newsletter />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;