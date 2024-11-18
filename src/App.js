// App.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

// Page imports
import Home from './pages/home';
import HomeMobile from './pages/home_mobile';
import TrainFlood from './pages/trainflood';
import Past from './pages/past';
import Header from './components/layout/Header';
import NotFound from './pages/404notfound';
import About from './pages/about';
import Tweet from './pages/tweet';
import TweetMobile from './pages/tweetMobile';
import TrainFloodMobile from './pages/TrainFloodMobile';
import WarningPopup from './components/common/WarningPopup';

// Constants
const MOBILE_BREAKPOINT = 768; // Match with Header component

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [showWarningPopup, setShowWarningPopup] = useState(true);

  useEffect(() => {
    localStorage.setItem('selectedTab', '1');

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-300">
      <BrowserRouter>
        <Header />
        {!isMobile && showWarningPopup && (
          <span className="absolute w-1/2 right-2 bottom-6 z-20">
            <WarningPopup onClose={() => setShowWarningPopup(false)} />
          </span>
        )}
        <Routes>
          <Route path="/" element={isMobile ? <HomeMobile /> : <Home />} />
          <Route
            path="/warning"
            element={isMobile ? <HomeMobile warningtab={3} /> : <Home warningtab={3} />}
          />
          <Route path="/train" element={isMobile ? <TrainFloodMobile /> : <TrainFlood />} />
          <Route path="/tweet" element={isMobile ? <TweetMobile /> : <Tweet />} />
          <Route path="/about" element={<About />} />
          <Route path="/past" element={<Past />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
