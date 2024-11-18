import React, { useState, useEffect, useRef } from 'react';
import Map from '../components/home/crowdsource_map';
import RainFallMap from '../components/home/rainfall_map';
import WaterlevelMap from '../components/home/waterlevel_map';
import { MapContainer, TileLayer } from 'react-leaflet';
import Form from '../components/home/form';
import RainfallWidget from '../components/home/rainfall_wdget';
import WaterlevelWidget from '../components/home/waterlevel_widget';
import SearchBar from '../components/home/searchbar';
import RainfallLegend, { CrowdsourceLegends } from '../components/home/Legends';

function Home({ warningtab }) {
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

  useEffect(() => {
    if (!localStorage.getItem('hideModal')) {
      setShowModal(true);
    }
  }, []);

  return (
    <div className="page-container">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-center w-2/3">
            <h2 className="text-xl font-bold mb-4">Important Information!</h2>
            <ul className="text-left mb-4">
              {/* <li>1. Hourly rainfall forecasts (also known as 'Nowcasts'), displayed on the ‘Rainfall’ widget, are being updated every 1 hour.</li> */}
              <li>
                1. Next 3-day rainfall forecasts are being displayed on the ‘Rainfall’ widget.
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
            <div className="flex justify-around">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleModalClose}
              >
                OK
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDontShowAgain}
              >
                Don't show again
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-300">
        <div className="h-full flex flex-row-reverse justify-between z-10">
          <div className="h-[calc(100vh-5rem)] mr-3 mt-2 flex flex-col justify-center w-8/12 overflow-hidden shadow-2xl rounded-lg border-2 relative">
            <MapContainer
              className="h-full w-full z-10"
              center={[19.026, 72.8777]}
              zoom={11}
              maxZoom={18}
              minZoom={10}
              maxBounds={[
                [20, 72.6],
                [18.4, 73.2],
              ]}
              ref={mapRef}
            >
              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Climate IIT Bombay"
                ext="png"
              />

              {selectedTab === 1 && (
                <RainFallMap
                  setLocations={setRainfallLocations}
                  location={rainfallLocations}
                  zoomToLocation={zoomToLocation}
                />
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
            </MapContainer>
            {selectedTab === 1 && <RainfallLegend />}
            {selectedTab === 3 && <CrowdsourceLegends csPinToggle={csPinToggle} />}
          </div>
          <div className="relative w-1/3 p-1 flex flex-col">
            <div className="z-20 mb-2 px-2 w-full mx-auto flex justify-center bg-gray-900/90 backdrop-blur-sm rounded-xl p-1 shadow-lg">
              <button
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  selectedTab === 1
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transform scale-105'
                    : 'text-gray-200 hover:bg-gray-800/80'
                }`}
                onClick={() => handletabChange(1)}
              >
                Rainfall
              </button>
              <button
                className={`flex-1 py-2 px-3 mx-1 text-sm font-medium rounded-lg transition-all duration-300 ${
                  selectedTab === 2
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md transform scale-105'
                    : 'text-gray-200 hover:bg-gray-800/80'
                }`}
                onClick={() => handletabChange(2)}
              >
                Waterlevel
              </button>
              <button
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  selectedTab === 3
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md transform scale-105'
                    : 'text-gray-200 hover:bg-gray-800/80'
                }`}
                onClick={() => handletabChange(3)}
              >
                Reported Flood
              </button>
            </div>

            {selectedTab === 1 && rainfallLocations && (
              <div className="z-20">
                <SearchBar
                  selectedOption={rainfallLocations}
                  setSelectedOption={setRainfallLocations}
                  setZoomToLocation={setZoomToLocation}
                />
                <RainfallWidget selectedOption={rainfallLocations} />
              </div>
            )}

            {selectedTab === 2 && (
              <div className="z-20">
                <WaterlevelWidget
                  location={waterlevelLocations}
                  setLocation={setWaterlevelLocations}
                />
              </div>
            )}

            {selectedTab === 3 && (
              <div className="z-20 mt-0">
                <Form
                  setCsPinDropLocation={setCsPinDropLocation}
                  csPinDropLocation={csPinDropLocation}
                  setCsPinToggle={setCsPinToggle}
                  csPinToggle={csPinToggle}
                  setZoomToLocation={setZoomToLocation}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-center">
          Mumbai&apos;s flood monitoring dashboard hasn&apos;t been updated in a while.
        </p>
        <p className="text-lg text-center">
          We&apos;re working on it!
        </p>
      </div>
    </div>
  );
}
export default Home;
