import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, CreditCard, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

const ThankYouPage: React.FC = () => {
  const [purchaseDetails, setPurchaseDetails] = useState<any>(null);
  
  useEffect(() => {
    // Clear cart after successful purchase
    localStorage.removeItem('cart');
    
    // For demonstration - get details of what was purchased
    // In a real implementation, you would get this from the session or API
    const getSessionDetails = async () => {
      // This is a placeholder for what would normally be an API call
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');
      
      if (sessionId) {
        // Mock purchase details - in production would come from API
        setPurchaseDetails({
          date: new Date().toLocaleDateString(),
          paymentMethod: 'Credit Card',
          orderNumber: sessionId.substring(0, 8),
        });
      }
    };
    
    getSessionDetails();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 py-12 px-4">
      <motion.div 
        className="max-w-3xl w-full bg-dark-800 rounded-xl p-8 md:p-12 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Your purchase was successful and is being processed. Check your email for more details.
          </p>
        </div>
        
        {purchaseDetails && (
          <div className="bg-dark-900 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary-500" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Order Date</p>
                  <p>{purchaseDetails.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="text-primary-500" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Payment Method</p>
                  <p>{purchaseDetails.paymentMethod}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Dumbbell className="text-primary-500" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Order Number</p>
                  <p>#{purchaseDetails.orderNumber}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-center text-gray-300">
            I'm excited to help you on your fitness journey! 
            You'll receive an email with next steps soon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              to="/services" 
              className="btn btn-outline"
            >
              Browse More Services
            </Link>
            
            <Link 
              to="/" 
              className="btn btn-primary"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;