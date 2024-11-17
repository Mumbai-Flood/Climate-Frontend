import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const WarningPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    localStorage.setItem('selectedTab', '3');
    navigate('/warning');
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };
  
  return (
    <div 
      className={`fixed bottom-6 right-6 transition-all duration-300 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-gradient-to-br from-red-50 to-white rounded-lg shadow-lg overflow-hidden border-2 border-red-500">
        <div className="p-4 relative">
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors"
            aria-label="Close popup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <p className="text-gray-700 mb-4 pr-6">
            Notice flooding in your area? Help your community by reporting it!
          </p>
          
          <button
            onClick={handleClick}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 
                     transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                     shadow-md hover:shadow-lg"
            aria-label="Report Flood"
          >
            Report Now
          </button>
        </div>
      </div>
    </div>
  );
};

WarningPopup.propTypes = {
  onClose: PropTypes.func
};

export default WarningPopup;
