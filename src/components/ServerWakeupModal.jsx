import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { id: 'api', name: 'API Gateway', url: 'https://api-gateway-to6i.onrender.com/health' },
  { id: 'auth', name: 'Auth Service', url: 'https://auth-service-cy89.onrender.com/health' },
  { id: 'inventory', name: 'Inventory Service', url: 'https://inventory-service-vh7h.onrender.com/health' },
  { id: 'order', name: 'Order Service', url: 'https://order-service-2p4f.onrender.com/health' },
  { id: 'payment', name: 'Payment Service', url: 'https://payment-service-uz76.onrender.com/health' },
  { id: 'notification', name: 'Notification Service', url: 'https://notification-service-xkwy.onrender.com/health' }
];

export default function ServerWakeupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [statuses, setStatuses] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenServerWakeup');
    if (!hasSeen) {
      setIsOpen(true);
      localStorage.setItem('hasSeenServerWakeup', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Reopen popup after 2 minutes
    setTimeout(() => {
      setIsOpen(true);
    }, 120000);
  };

  const checkStatuses = async () => {
    setIsChecking(true);
    const newStatuses = { ...statuses };
    
    // Set all to checking state
    services.forEach(s => newStatuses[s.id] = 'checking');
    setStatuses({ ...newStatuses });

    await Promise.all(
      services.map(async (service) => {
        try {
          const response = await fetch(`${service.url}?t=${Date.now()}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            newStatuses[service.id] = 'online';
          } else {
            newStatuses[service.id] = 'error';
          }
        } catch (error) {
          // In case of CORS error or network failure
          newStatuses[service.id] = 'offline';
        }
        setStatuses({ ...newStatuses });
      })
    );
    
    setIsChecking(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-sans font-medium text-sm hover:bg-indigo-200 transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        Wake Backend Servers
      </button>

      <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden relative flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Backend Servers Asleep? 😴</h2>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  This application uses free Render services which automatically spin down after 15 minutes of inactivity. 
                  It may take <span className="font-semibold text-indigo-600">1 to 3 minutes</span> for them to wake up on the first request.
                </p>
              </div>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2 ml-4 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-indigo-800">
                  <strong>Action Required:</strong> Please click the links below to manually wake up each service.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {services.map((service) => (
                <div key={service.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-white transition-all rounded-lg group shadow-sm">
                  <div className="flex flex-col mb-2 sm:mb-0">
                    <span className="font-semibold text-gray-800 flex items-center">
                      {service.name}
                    </span>
                    <a 
                      href={service.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:text-indigo-800 truncate max-w-[280px] hover:underline transition-all mt-1 flex items-center"
                    >
                      {service.url}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    {statuses[service.id] === 'checking' && (
                      <span className="flex items-center text-sm text-yellow-600 font-medium bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Checking
                      </span>
                    )}
                    {statuses[service.id] === 'online' && (
                      <span className="flex items-center text-sm text-green-700 font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Online
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
