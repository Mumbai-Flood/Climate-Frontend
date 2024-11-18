import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { fetchTweetList, fetchTweetMap } from '../utils/TweetAPI';

function Tweet() {
  const [mapdata, setMapData] = useState(null);
  const [listdata, setListData] = useState(null);
  const [isMapView, setIsMapView] = useState(true);

  useEffect(() => {
    const fetchtweetMap = async () => {
      try {
        const response = await fetchTweetMap();
        setMapData(response);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    const fetchtweetlist = async () => {
      try {
        const response = await fetchTweetList();
        setListData(response);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchtweetMap();
    fetchtweetlist();
  }, []);

  return (
    <div className="page-container bg-white">
      {/* Mobile Toggle */}
      <div className="sm:hidden w-full px-4 py-2 flex justify-center gap-2">
        <button
          onClick={() => setIsMapView(true)}
          className={`px-4 py-2 rounded-lg ${isMapView ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Map View
        </button>
        <button
          onClick={() => setIsMapView(false)}
          className={`px-4 py-2 rounded-lg ${!isMapView ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          List View
        </button>
      </div>

      <div className="flex flex-col sm:flex-row h-[calc(100vh-10rem)] sm:h-[calc(100vh-4rem)]">
        {/* Map Section */}
        <div
          className={`${isMapView ? 'block' : 'hidden'} sm:block w-full sm:w-1/2 h-full sm:h-5/6 p-2`}
        >
          <div className="w-full h-full shadow-lg rounded-lg overflow-hidden">
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

              {mapdata &&
                mapdata.map((mapdata, index) => {
                  const color = mapdata.sentiment === false ? 'red' : 'green';
                  return (
                    <CircleMarker
                      key={index}
                      center={{ lat: mapdata.latitude, lng: mapdata.longitude }}
                      color="black"
                      fillColor={color}
                      fill={true}
                      fillOpacity={1}
                      radius={10}
                    >
                      <Popup className="popup-content">
                        <p className="text-sm font-normal">
                          {mapdata.tweet_text}
                          <hr className="my-2" />
                          <span className="font-medium">Sentiment:</span>{' '}
                          {mapdata.sentiment === false ? 'Negative' : 'Positive'}
                          <br />
                          <span className="font-medium">Location:</span> {mapdata.address}
                          <br />
                          <span className="text-xs text-gray-600">
                            {mapdata.timestamp && new Date(mapdata.timestamp).toLocaleString()}
                          </span>
                        </p>
                      </Popup>
                    </CircleMarker>
                  );
                })}
            </MapContainer>
          </div>
        </div>

        {/* List Section */}
        <div className={`${!isMapView ? 'block' : 'hidden'} sm:block w-full sm:w-1/2 h-full p-4`}>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-4">
            Tweet Analysis
          </h1>
          <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100vh-8rem)] sm:h-5/6 rounded-lg bg-gray-50 p-4">
            {listdata &&
              listdata.map((tweet, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-md ${
                    tweet.sentiment === false
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-green-50 border border-green-200'
                  }`}
                >
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">{tweet.tweet_text}</span>
                    <hr className="my-2" />
                    <span className="text-sm">
                      <span className="font-medium">Sentiment:</span>{' '}
                      {tweet.sentiment === false ? 'Negative' : 'Positive'}
                      <br />
                      <span className="font-medium">Location:</span> {tweet.address}
                      <br />
                      <span className="text-xs text-gray-600">
                        {tweet.timestamp && new Date(tweet.timestamp).toLocaleString()}
                      </span>
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
