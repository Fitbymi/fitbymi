import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-50 bg-dark-800 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
        >
          <CheckCircle className="text-green-500" size={20} />
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;