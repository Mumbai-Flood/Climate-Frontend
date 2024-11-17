import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// Constants
const MOBILE_BREAKPOINT = 768;
const NAVIGATION_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/train', label: 'Rail' },
  { path: '/tweet', label: 'Tweet' },
  { path: '/about', label: 'About' }
];

const PARTNER_LOGOS = [
  { 
    url: 'https://www.iitb.ac.in/',
    img: '/img/iitb copy.png',
    alt: 'IIT Bombay',
    className: 'h-8 sm:h-10'
  },
  {
    url: 'https://www.climate.iitb.ac.in/',
    img: '/img/cs.png',
    alt: 'Climate Studies',
    className: 'h-6 sm:h-8'
  },
  {
    url: 'https://www.hdfcergo.com/',
    img: '/img/hebg.png',
    alt: 'HDFC ERGO',
    className: 'h-8 sm:h-10'
  },
  {
    url: 'https://www.hdfcergo.com/',
    img: '/img/hdfcergo.png',
    alt: 'HDFC ERGO Logo',
    className: 'h-6 sm:h-8'
  },
  {
    url: 'https://mcmcr.mcgm.gov.in/',
    img: '/img/mcm.jpg',
    alt: 'MCM',
    className: 'h-6 sm:h-8'
  }
];

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

    return (    
        <header className="h-16 fixed top-0 left-0 right-0 bg-[#F3F8FF] shadow-md z-50">
            <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                    {PARTNER_LOGOS.map((logo, index) => (
                        <a 
                            key={index} 
                            href={logo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                        >
                            <img 
                                src={logo.img} 
                                alt={logo.alt} 
                                className={`${logo.className} transition-transform hover:scale-105`}
                            />
                        </a>
                    ))}
                </div>

                {/* Title - Hidden on mobile */}
                <h1 className="hidden md:block text-lg lg:text-xl font-bold text-black font-merriweather text-center px-4">
                    MUMBAI FLOOD EXPERIMENT
                </h1>

                {/* Navigation */}
                {isMobile ? (
                    <div className="dropdown relative">
                        <button 
                            className="p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200" 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                                {NAVIGATION_LINKS.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.path}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-black transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <nav className="hidden sm:block">
                        <ul className="flex space-x-1 lg:space-x-2">
                            {NAVIGATION_LINKS.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        to={link.path} 
                                        className="px-3 py-2 rounded-lg text-sm lg:text-base text-gray-700 hover:bg-blue-100 hover:text-black transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
