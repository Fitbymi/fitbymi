import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ThankYouPage from './pages/ThankYouPage';
import CartPage from './pages/CartPage';
import ServicesPage from './pages/ServicesPage';
import ServicePage from './pages/services/[id]';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import PartnersPage from './pages/PartnersPage';
import UnsubscribePage from './pages/UnsubscribePage';
import SubscribePage from './pages/SubscribePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServicePage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/unsubscribe" element={<UnsubscribePage />} />
      <Route path="/subscribe" element={<SubscribePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App