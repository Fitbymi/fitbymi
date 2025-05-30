import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      <Navbar />
      <main>
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