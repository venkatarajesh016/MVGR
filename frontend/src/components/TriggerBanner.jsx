import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Bell } from 'lucide-react';
import { useTriggerStore } from '../store/triggerStore';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const TriggerBanner = () => {
  const { user } = useAuth();
  const { triggers, dismissTrigger, getActiveTriggers, addTrigger, fetchTriggers } = useTriggerStore();
  const socketRef = useRef(null);

  // Only show notifications for students and guests
  const shouldShowNotifications = user?.role === 'student' || user?.role === 'guest';

  useEffect(() => {
    // Only fetch and show notifications for students/guests
    if (!shouldShowNotifications) {
      return;
    }

    // Fetch initial triggers
    fetchTriggers();

    // Connect to Socket.io
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:5000', {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ['websocket', 'polling']
      });

      socketRef.current.on('connect', () => {
        console.log('✅ Connected to Socket.io:', socketRef.current.id);
        // Join campus room
        socketRef.current.emit('join-campus', 'main-campus');
      });

      socketRef.current.on('new-trigger', (trigger) => {
        console.log('🔔 New trigger received:', trigger);
        addTrigger(trigger);
      });

      socketRef.current.on('disconnect', () => {
        console.log('❌ Disconnected from Socket.io');
      });

      socketRef.current.on('error', (error) => {
        console.error('Socket.io error:', error);
      });
    }

    return () => {
      // Don't disconnect on unmount to keep connection alive
    };
  }, [fetchTriggers, addTrigger, shouldShowNotifications]);

  const activeTriggers = getActiveTriggers();

  // Don't show notifications for admin/teacher
  if (!shouldShowNotifications || activeTriggers.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 w-full">
      <AnimatePresence>
        {activeTriggers.map((trigger, index) => (
          <motion.div
            key={trigger._id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ delay: index * 0.1, type: 'spring', damping: 20 }}
            className={`rounded-lg p-4 flex items-start gap-3 shadow-lg border-l-4 ${
              trigger.triggerType === 'emergency'
                ? 'bg-red-50 border-red-400 border-l-red-500'
                : trigger.triggerType === 'alert'
                ? 'bg-amber-50 border-amber-400 border-l-amber-500'
                : trigger.triggerType === 'room_change'
                ? 'bg-green-50 border-green-400 border-l-green-500'
                : 'bg-blue-50 border-blue-400 border-l-blue-500'
            }`}
          >
            <div className={`flex-shrink-0 mt-0.5 ${
              trigger.triggerType === 'emergency'
                ? 'text-red-600'
                : trigger.triggerType === 'alert'
                ? 'text-amber-600'
                : trigger.triggerType === 'room_change'
                ? 'text-green-600'
                : 'text-blue-600'
            }`}>
              {trigger.triggerType === 'emergency' ? (
                <AlertCircle className="w-5 h-5 animate-pulse" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-sm ${
                trigger.triggerType === 'emergency'
                  ? 'text-red-900'
                  : trigger.triggerType === 'alert'
                  ? 'text-amber-900'
                  : trigger.triggerType === 'room_change'
                  ? 'text-green-900'
                  : 'text-blue-900'
              }`}>
                {trigger.title}
              </h3>
              <p className={`text-sm mt-1 ${
                trigger.triggerType === 'emergency'
                  ? 'text-red-800'
                  : trigger.triggerType === 'alert'
                  ? 'text-amber-800'
                  : trigger.triggerType === 'room_change'
                  ? 'text-green-800'
                  : 'text-blue-800'
              }`}>
                {trigger.message}
              </p>

              {trigger.roomChange && (
                <p className={`text-xs mt-2 font-medium ${
                  trigger.triggerType === 'emergency'
                    ? 'text-red-700'
                    : trigger.triggerType === 'alert'
                    ? 'text-amber-700'
                    : trigger.triggerType === 'room_change'
                    ? 'text-green-700'
                    : 'text-blue-700'
                }`}>
                  📍 Room Change: {trigger.roomChange.fromRoom} → {trigger.roomChange.toRoom}
                  {trigger.roomChange.subject && ` (${trigger.roomChange.subject})`}
                </p>
              )}
            </div>

            <button
              onClick={() => dismissTrigger(trigger._id)}
              className={`flex-shrink-0 p-1 rounded hover:opacity-70 transition ${
                trigger.triggerType === 'emergency'
                  ? 'text-red-600 hover:bg-red-100'
                  : trigger.triggerType === 'alert'
                  ? 'text-amber-600 hover:bg-amber-100'
                  : trigger.triggerType === 'room_change'
                  ? 'text-green-600 hover:bg-green-100'
                  : 'text-blue-600 hover:bg-blue-100'
              }`}
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TriggerBanner;
