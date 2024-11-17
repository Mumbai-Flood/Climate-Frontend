import React, { useState, useEffect } from 'react';
import { fetchStations } from '../../utils/RainfallApis';

const SearchBar = ({ setSelectedOption, selectedOption, setZoomToLocation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [stations, setStations] = useState([{ name: 'loading...' }]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setShowOptions(true);
    };

    const handledropdown = () => {
        setShowOptions(!showOptions);
        setSearchTerm('');
    };

    const handleStationSelection = (station) => {
        setSearchTerm(station.name);
        setShowOptions(false);
        setSelectedOption(station);
        setZoomToLocation([station.latitude, station.longitude]);
    };

    useEffect(() => {
        const fetchStationsData = async () => {
            try {
                const data = await fetchStations();
                setStations(data);
                if (data.length) {
                    setSelectedOption(data[0]);
                    setSearchTerm(data[0].name);
                }
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };
        
        fetchStationsData();
    }, []);

    useEffect(() => {
        if (selectedOption) {
            setSearchTerm(selectedOption.name);
        }
    }, [selectedOption]);

    const filteredStations = stations.filter(
        (station) => station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative">
                <div className={`flex items-center overflow-hidden bg-gray-900/90 backdrop-blur-sm border border-gray-700 
                    ${showOptions ? 'rounded-t-lg' : 'rounded-lg'} 
                    transition-all duration-300 shadow-lg`}>
                    <input
                        type="text"
                        className="flex-1 px-4 py-2.5 bg-transparent text-gray-100 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Search stations..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={() => setShowOptions(true)}
                    />
                    <button 
                        onClick={handledropdown}
                        className="p-2.5 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        {showOptions ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m18 15-6-6-6 6"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6"/>
                            </svg>
                        )}
                    </button>
                </div>

                {showOptions && filteredStations.length > 0 && (
                    <div className="absolute w-full mt-0.5 max-h-60 overflow-y-auto rounded-b-lg bg-gray-900/90 backdrop-blur-md 
                                border border-gray-700 shadow-lg z-50">
                        {filteredStations.map((station, index) => (
                            <button
                                key={station.id || index}
                                onClick={() => handleStationSelection(station)}
                                className="w-full px-4 py-2.5 text-left text-gray-200 hover:bg-gray-800/80 
                                        transition-colors duration-150 focus:outline-none
                                        border-b border-gray-700 last:border-b-0"
                            >
                                {station.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
