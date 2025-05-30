import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

// Service images mapping
const serviceImages = {
  'workout': '/assets/serviceCards/workout.jpg',
  'nutrition': '/assets/serviceCards/nutrition.jpg',
  'posing': '/assets/serviceCards/11posing.jpg',
  'combo': '/assets/serviceCards/combo.jpg',
  'booty': '/assets/serviceCards/bootyBuilding.jpg',
  'sixpack': '/assets/serviceCards/sixPack.jpg',
};

interface ServiceProps {
  service: {
    id: string;
    title: string;
    price: number;
    priceLabel?: string;
    icon: React.ReactNode;
    features: string[];
    popular: boolean;
  };
  onAddToCart: (service: any) => void;
}

const ServiceCard: React.FC<ServiceProps> = ({ service, onAddToCart }) => {
  const { id, title, price, priceLabel, icon, features, popular } = service;
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    onAddToCart(service);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const isMobile = window.innerWidth < 768;
  const serviceImage = serviceImages[id] || '';

  return (
    <>
      <Notification 
        message={`${title} added to cart!`}
        isVisible={showNotification}
      />
      <motion.div variants={cardVariants}>
        <div 
          className={`price-card bg-gradient-to-r from-dark-800 to-dark-900 ${popular ? 'price-card-featured' : ''} transition-all duration-300 hover:scale-105 cursor-pointer`}
          style={{
            boxShadow: popular 
              ? '0 0 30px rgba(255, 0, 0, 0.5)' 
              : '0 0 20px rgba(255, 0, 0, 0.25)',
          }}
          onClick={() => navigate(`/services/${id}`)}
        >
          <div className="flex flex-col h-full">
            {/* Card Header with Image and Title */}
            <div className="relative mb-4">
              {/* Service Image - Larger portion for portrait images */}
              <div className="h-56 w-full overflow-hidden rounded-t-lg">
                <img 
                  src={serviceImage}
                  alt={title}
                  className="w-full h-full object-fill"
                />
              </div>
              
              {/* Title and Price overlay - semi-transparent background */}
              <div className="absolute bottom-0 left-0 right-0 bg-dark-900/80 backdrop-blur-sm p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-primary-500">{icon}</div>
                    <h3 className="text-lg font-bold">{title}</h3>
                  </div>
                  <div>
                    <span className="text-xl font-bold">${price}</span>
                    <span className="text-gray-400 text-sm"> / {priceLabel || 'month'}</span>
                  </div>
                </div>
              </div>
              
              {/* Popular badge */}
              {popular && (
                <div className="absolute top-3 right-3 bg-primary-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                  Popular
                </div>
              )}
            </div>
            
            {/* Card Body - Features */}
            <div className="p-3 flex-grow">
              <ul className="mb-5 space-y-2 text-xs md:text-sm">
                {features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <CheckCircle className="flex-shrink-0 mt-0.5 text-primary-500" size={12} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
                {features.length > 4 && (
                  <li className="text-primary-500 text-sm pt-1">
                    +{features.length - 4} more features
                  </li>
                )}
              </ul>
            </div>
            
            {/* Card Footer - Add to Cart Button */}
            <div className="p-3 mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className={`w-full py-2 text-sm font-semibold text-center rounded-md transition-all duration-300 ${
                  popular 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'border-2 border-primary-600 text-white hover:bg-primary-600/20'
                }`}
                style={{
                  boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)',
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ServiceCard;