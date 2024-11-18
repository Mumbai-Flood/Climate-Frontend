import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Map from '../components/home/crowdsource_map';
import RainFallMap from '../components/home/rainfall_map';
import WaterlevelMap from '../components/home/waterlevel_map';
import Form from '../components/home/form';
import RainfallWidget from '../components/home/rainfall_wdget';
import WaterlevelWidget from '../components/home/waterlevel_widget';
import SearchBar from '../components/home/searchbar';
import {
  RainfallLegendMobile,
  WaterlevelLegendMobile,
  CrowdsourceLegendsMobile,
} from '../components/home/LegendsMobile';

function HomeMobile({ warningtab }) {
  const [selectedTab, setSelectedTab] = useState(
    warningtab || parseInt(localStorage.getItem('selectedTab')) || 1
  );
  const [rainfallLocations, setRainfallLocations] = useState(null);
  const [waterlevelLocations, setWaterlevelLocations] = useState(null);
  const [showModal, setShowModal] = useState(!localStorage.getItem('hideModal'));
  const [csPinToggle, setCsPinToggle] = useState(false);
  const [csPinDropLocation, setCsPinDropLocation] = useState(null);
  const [zoomToLocation, setZoomToLocation] = useState(null);
  const mapRef = useRef();

  const widgetContainerRef = useRef(null);

  const handletabChange = tab => {
    setSelectedTab(tab);
    localStorage.setItem('selectedTab', tab);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('hideModal', 'true');
    setShowModal(false);
  };

  const handleScroll = () => {
    if (widgetContainerRef.current) {
      widgetContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full w-full bg-[#f0f0f0] pt-16">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg text-center max-w-sm w-full">
            <h2 className="text-lg sm:text-xl font-bold mb-3">Important Information!</h2>
            <ul className="text-left mb-3 text-sm sm:text-base space-y-2">
              <li>
                1. Next 3-day rainfall forecasts are being displayed on the 'Rainfall' widget.
              </li>
              <li>
                2. FORM for reporting water levels in your area is available under 'Reported Flood'
                tab on the Home Page.
              </li>
              <li>
                3. Near real-time waterlogging information obtained from nine water-level sensors
                installed across Mumbai is available under Waterlevel widget.
              </li>
              <li>4. The hourly rainfall forecast model is still under improvement.</li>
              <li>
                5. Observed data is being sourced from Municipal Corporation of Greater Mumbai
                (MCGM) (https://dm.mcgm.gov.in/).
              </li>
            </ul>
            <div className="flex justify-center gap-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition-colors duration-200"
                onClick={handleModalClose}
              >
                OK
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition-colors duration-200"
                onClick={handleDontShowAgain}
              >
                Don't show again
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full relative">
        <div className="sticky top-16 w-full px-2 mx-auto flex justify-center z-30 bg-[#f0f0f0] py-2">
          <span
            className={`h-12 flex-1 flex items-center justify-center text-center text-[13px] sm:text-[15px] font-semibold tracking-wide cursor-pointer rounded-l-xl transition-all duration-300 ${
              selectedTab === 1
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
            onClick={() => handletabChange(1)}
          >
            Rainfall
          </span>
          <span
            className={`h-12 flex-1 flex items-center justify-center text-center text-[13px] sm:text-[15px] font-semibold tracking-wide cursor-pointer transition-all duration-300 ${
              selectedTab === 2
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
            onClick={() => handletabChange(2)}
          >
            Waterlevel
          </span>
          <span
            className={`h-12 flex-1 flex items-center justify-center text-center text-[13px] sm:text-[15px] font-semibold tracking-wide cursor-pointer rounded-r-xl transition-all duration-300 ${
              selectedTab === 3
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
            onClick={() => handletabChange(3)}
          >
            Reported Flood
          </span>
        </div>
        <div className="fixed bottom-4 right-4 z-30">
          <button
            onClick={handleScroll}
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm py-2 px-4 shadow-lg transition-all duration-300"
          >
            {widgetContainerRef.current && window.scrollY > widgetContainerRef.current.offsetTop
              ? 'Scroll Up'
              : 'Scroll Down'}
          </button>
        </div>
      </div>
      <div className="w-full h-[60vh] sm:h-[65vh] flex flex-col relative z-10">
        <MapContainer
          className="h-full w-full"
          center={[19.1, 72.9]}
          zoom={10}
          maxZoom={18}
          minZoom={11}
          maxBounds={[
            [19.4, 72.6],
            [18.85, 73.2],
          ]}
          ref={mapRef}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            minZoom={0}
            maxZoom={18}
            attribution="Climate IIT Bombay"
            ext="png"
          />
          {/* Components based on selected tab */}

          {selectedTab === 1 && (
            <RainFallMap setLocations={setRainfallLocations} location={rainfallLocations} />
          )}
          {selectedTab === 2 && <WaterlevelMap />}
          {selectedTab === 3 && (
            <Map
              csPinToggle={csPinToggle}
              csPinDropLocation={csPinDropLocation}
              setCsPinDropLocation={setCsPinDropLocation}
              zoomToLocation={zoomToLocation}
              mapRef={mapRef}
            />
          )}
          {/* Legends */}
          {selectedTab === 1 && <RainfallLegendMobile />}
          {selectedTab === 2 && <WaterlevelLegendMobile />}
          {selectedTab === 3 && <CrowdsourceLegendsMobile csPinToggle={csPinToggle} />}
        </MapContainer>
      </div>
      <div
        className="w-full min-h-[40vh] sm:min-h-[35vh] flex flex-col relative z-20 bg-gray-100"
        ref={widgetContainerRef}
      >
        {selectedTab === 1 && rainfallLocations && (
          <div className="z-20 p-2 sm:p-4">
            <SearchBar
              selectedOption={rainfallLocations}
              setSelectedOption={setRainfallLocations}
              setZoomToLocation={setZoomToLocation}
            />
            <RainfallWidget selectedOption={rainfallLocations} />
          </div>
        )}

        {selectedTab === 2 && (
          <div className="z-20 p-2 sm:p-4">
            <WaterlevelWidget location={waterlevelLocations} setLocation={setWaterlevelLocations} />
          </div>
        )}

        {selectedTab === 3 && (
          <div className="z-20 p-2 sm:p-4">
            <Form
              setCsPinDropLocation={setCsPinDropLocation}
              csPinDropLocation={csPinDropLocation}
              setCsPinToggle={setCsPinToggle}
              csPinToggle={csPinToggle}
              setZoomToLocation={setZoomToLocation}
            />
          </div>
        )}
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-lg text-center">
            Mumbai&apos;s flood monitoring dashboard hasn&apos;t been updated in a while.
          </p>
          <p className="text-lg text-center">
            We&apos;re working on it!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeMobile;
