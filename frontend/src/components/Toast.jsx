import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (message, type = 'info', duration = 6000) => {
    const id = Date.now();
    const toast = { id, message, type };
    
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, addToast, removeToast };
};

const Toast = ({ id, message, type, onRemove }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-amber-50 border-amber-200'
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-amber-800'
  }[type];

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-amber-500'
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${bgColor} border rounded-lg p-4 flex items-start gap-3 max-w-md`}
    >
      <Icon className={`${iconColor} flex-shrink-0 w-5 h-5 mt-0.5`} />
      <p className={`${textColor} text-sm flex-1`}>{message}</p>
      <button
        onClick={() => onRemove(id)}
        className={`${textColor} hover:opacity-70 flex-shrink-0`}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
