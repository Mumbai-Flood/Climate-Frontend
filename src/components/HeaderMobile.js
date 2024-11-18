// HeaderMobile.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Constants - Keep in sync with Header.js
const MOBILE_BREAKPOINT = 1000;
const NAVIGATION_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/train', label: 'Rail' },
  { path: '/tweet', label: 'Tweet' },
  { path: '/about', label: 'About' },
];

const PARTNER_LOGOS = [
  {
    url: 'https://www.iitb.ac.in/',
    img: '/img/iitb copy.png',
    alt: 'IIT Bombay',
    className: 'h-10',
  },
  {
    url: 'https://www.climate.iitb.ac.in/',
    img: '/img/cs.png',
    alt: 'Climate Studies',
    className: 'h-8',
  },
  {
    url: 'https://www.hdfcergo.com/',
    img: '/img/hebg.png',
    alt: 'HDFC ERGO',
    className: 'h-10',
  },
  {
    url: 'https://mcmcr.mcgm.gov.in/',
    img: '/img/mcm.jpg',
    alt: 'MCM',
    className: 'h-8',
  },
];

function HeaderMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (isDropdownOpen && !event.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="h-[5rem] mx-auto shadow-xl bg-[#F3F8FF] w-full max overflow-hidden z-20 mb-2">
      <div
        className={`h-full flex justify-between items-center ${isMobile ? 'w-full px-4' : 'w-11/12 mx-auto'}`}
      >
        <div className="flex gap-3 items-center">
          {PARTNER_LOGOS.map((logo, index) => (
            <Link key={index} to={logo.url}>
              <img
                src={logo.img}
                alt={logo.alt}
                className={`${logo.className} transition-transform hover:scale-105`}
              />
            </Link>
          ))}
        </div>

        <h1 className="font-bold text-xs text-center text-black font-merriweather flex-grow">
          MUMBAI FLOOD EXPERIMENT
        </h1>

        <div className="flex gap-3">
          <div className="dropdown relative">
            <button
              className="dropdown-btn p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              onClick={toggleDropdown}
              aria-label="Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content absolute bg-white rounded-lg right-0 mt-2 shadow-lg overflow-hidden min-w-[120px]">
                {NAVIGATION_LINKS.map((link, index) => (
                  <div
                    key={index}
                    className="dropdown-item hover:bg-blue-50 transition-colors duration-200"
                  >
                    <Link
                      to={link.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-black"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderMobile;
