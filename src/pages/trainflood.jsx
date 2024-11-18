// trainflood.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { fetchTrainStations } from '../utils/TrainAPI';
import { TrainLegends } from '../components/home/Legends';

const TrainFlood = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const stationsData = await fetchTrainStations();
        setData(stationsData);
      } catch (error) {
        console.error('Error fetching train station data:', error);
      }
    };

    fetchStationsData();
  }, []);

  return (
    <div className="page-container bg-white">
      <div className="page-content">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6">
          Train Station Flood Status
        </h1>

        <div className="relative w-full h-[calc(100vh-14rem)] sm:h-[calc(100vh-12rem)] rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            className="h-full w-full z-10"
            center={[19.1, 72.9]}
            zoom={11}
            maxZoom={18}
            minZoom={11}
            maxBounds={[
              [19.4, 72.6],
              [18.85, 73.2],
            ]}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Climate IIT Bombay"
            />

            {data &&
              data.map((station, index) => {
                const color =
                  station.WarningLevel === 0
                    ? 'green'
                    : station.WarningLevel === 1
                      ? 'yellow'
                      : station.WarningLevel === 2
                        ? 'orange'
                        : 'red';

                return (
                  <CircleMarker
                    key={index}
                    center={{ lat: station.latitude, lng: station.longitude }}
                    color="black"
                    fillColor={color}
                    fillOpacity={1}
                    radius={8}
                  >
                    <Popup>
                      <div className="p-2">
                        <p className="text-sm sm:text-base">
                          <span className="font-medium">Station:</span> {station.station_name}
                          <br />
                          <span className="font-medium">Warning Level:</span>{' '}
                          <span
                            className={`
                            ${station.WarningLevel === 0 ? 'text-green-600' : ''}
                            ${station.WarningLevel === 1 ? 'text-yellow-600' : ''}
                            ${station.WarningLevel === 2 ? 'text-orange-600' : ''}
                            ${station.WarningLevel === 3 ? 'text-red-600' : ''}
                          `}
                          >
                            {station.WarningLevel}
                          </span>
                        </p>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
          </MapContainer>
        </div>

        <div className="mt-4 sm:mt-6">
          <TrainLegends />
        </div>
      </div>
    </div>
  );
};

export default TrainFlood;
