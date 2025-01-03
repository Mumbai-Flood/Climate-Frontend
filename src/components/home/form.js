import React, { useState, useEffect } from 'react';
import { fetchLocationData, sendFormData } from '../../utils/crowdSourceAPI';

function Form({
  setCsPinDropLocation,
  csPinDropLocation,
  setCsPinToggle,
  csPinToggle,
  setZoomToLocation,
}) {
  const [name, SetName] = useState('');
  const [phone, SetPhone] = useState('');
  const [feet, setFeet] = useState(null);
  const [inches, setInches] = useState(null);
  const [waterlevelfactor, setWaterlevelfactor] = useState(0);
  const [location, setLocation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [activeOption, setActiveOption] = useState(0);
  const [gpslocation, setGpsLocation] = useState(null);

  const handleSubmit = async event => {
    if (!name) {
      setMessage('Please enter your name!!!');
      return;
    }
    if (waterlevelfactor === 0) {
      setMessage('Please select water level!!!');
      return;
    }

    if (!feet || !inches) {
      setMessage('Please enter your height!!!');
      return;
    }

    if (!location) {
      setMessage('Please enter location!!!');
      return;
    }

    event.preventDefault();
    console.log('feet:', feet, 'inches:', inches, 'waterlevelfactor:', waterlevelfactor);
    const ajustedwaterlevel = feet * 12 * waterlevelfactor + inches * waterlevelfactor;

    const adjusted_feet = Math.floor(ajustedwaterlevel / 12);
    const adjusted_inches = ajustedwaterlevel % 12;
    console.log(
      'adjusted_feet:',
      adjusted_feet,
      'adjusted_inches:',
      adjusted_inches,
      'ajustedwaterlevel:',
      Math.floor(ajustedwaterlevel / 12)
    );
    console.log('ajustedwaterlevel:', ajustedwaterlevel);

    let data = {
      latitude: null,
      longitude: null,
      feet: adjusted_feet,
      inch: adjusted_inches,
    };

    if (gpslocation) {
      data = { ...data, latitude: gpslocation.lat, longitude: gpslocation.long };
    }
    if (csPinToggle && csPinDropLocation) {
      data = { ...data, latitude: csPinDropLocation.lat, longitude: csPinDropLocation.long };
    }

    sendData(data);
  };

  const sendData = async data => {
    console.log('data:', data);

    const sendata = {
      name: name,
      phone: phone,
      feet: data.feet,
      inch: data.inch,
      location: location,
      latitude: data.latitude,
      longitude: data.longitude,
      feedback: feedback,
    };

    console.log('sendata:', sendata);

    try {
      const response = await sendFormData(sendata);
      if (response.message === 'Data stored successfully') {
        setFeet(null);
        setInches(null);
        setWaterlevelfactor(0);
        setLocation('');
        setFeedback('');
        setZoomToLocation({
          lat: data.latitude,
          long: data.longitude,
          feet: data.feet,
          inch: data.inch,
        });
        setCsPinToggle(false);
        setCsPinDropLocation(null);
        window.alert(
          'Thank you for your submission. Your data has been recorded successfully. You can view your submission on the map.'
        );
      }
    } catch (error) {
      console.error('Error storing data:', error);
      setMessage('Error: Unable to store data.', error);
    }
  };

  const handleOption = (value, option) => () => {
    setWaterlevelfactor(value);
    setActiveOption(option);
  };

  const handlePinDropToggle = () => {
    if (!gpslocation) {
      setCsPinToggle(!csPinToggle);
      setCsPinDropLocation(null);
      setLocation('');
    }
  };

  const getgps = () => {
    if (!csPinToggle) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            const curr_location = await fetchLocationData({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
            setLocation(curr_location);
            setGpsLocation({ lat: position.coords.latitude, long: position.coords.longitude });
            console.log('Current location:', curr_location);
          } catch (error) {
            console.error('Error fetching location data:', error);
          }
        },
        error => {
          console.error('Error getting GPS location:', error);
        }
      );
    }
  };

  useEffect(() => {
    if (csPinToggle) {
      (async () => {
        try {
          const curr_location = await fetchLocationData({
            lat: csPinDropLocation.lat,
            long: csPinDropLocation.long,
          });
          setLocation(curr_location);
          console.log('Current location:', curr_location);
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      })();
    }
  }, [csPinToggle, csPinDropLocation]);

  return (
    <div className="max-w-xl mx-auto px-6 py-2 bg-black rounded-lg bg-opacity-80">
      <h1 className="text-2xl text-center font-semibold text-white mb-2">Submit Data</h1>
      <div className="flex flex-col justify-stretch gap-2">
        {gpslocation ? (
          <button className="bg-blue-700 text-blue-100 py-1 px-0 rounded-md">
            using current location...
          </button>
        ) : (
          <button
            onClick={getgps}
            className={`${csPinToggle ? 'bg-blue-300 disabled cursor-default' : 'pointer bg-blue-500 hover:bg-blue-600 '} text-white py-1 px-0 rounded-md`}
          >
            Use my current location
          </button>
        )}
        <button
          onClick={handlePinDropToggle}
          className={`${gpslocation ? 'bg-blue-300 disabled cursor-default' : csPinToggle ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-1 px-0 rounded-md`}
        >
          {csPinToggle ? 'Close' : 'Use location from map'}
        </button>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <label htmlFor="name" className="text-white flex items-center">
            Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="enter your name"
            name="name"
            value={name}
            onChange={e => SetName(e.target.value)}
            className="col-span-2 border rounded-md py-1.5 px-4 bg-blue-50 text-slate-900"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <label htmlFor="phone" className="text-white flex items-center">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            placeholder="enter your phone number"
            name="phone"
            value={phone}
            onChange={e => SetPhone(e.target.value)}
            className="col-span-2 border rounded-md py-1.5 px-4 bg-blue-50 text-slate-900"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <label htmlFor="location" className="text-white flex items-center">
            Location:
          </label>
          <input
            type="text"
            id="location"
            placeholder="enter your location"
            name="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="col-span-2 border rounded-md py-1.5 px-4 bg-blue-50 text-slate-900"
          />
        </div>

        <div className="flex items-center mt-2">
          <label
            htmlFor="height"
            className="block h-full text-white flex-col justify-center mr-4 mb-4"
          >
            Your Height:
          </label>

          <select
            id="height"
            name="height"
            value={feet}
            onChange={e => setFeet(e.target.value)}
            className="w-1/3 mr-4 border rounded-md py-1.5 px-1 mb-4 bg-blue-50 text-slate-900"
          >
            <option value={null}>Feet</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <select
            id="height"
            name="height"
            value={inches}
            onChange={e => setInches(e.target.value)}
            className="w-1/3 border rounded-md py-1.5 px-1 mb-4 bg-blue-50 text-slate-900"
          >
            <option value={null}>Inches</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
        </div>

        <div className="mb-4">
          <span className="block text-white mt-2">Water Level (choose one):</span>
          <div className="flex justify-evenly">
            <label
              htmlFor="waterlevel1"
              className={`inline-block border-2 ${activeOption === 1 ? 'border-red-800' : 'border-transparent hover:border-blue-100 '}`}
              onClick={handleOption(0.2, 1)}
            >
              <img src="/img/crowdsource/1.png" width={100} height={100} alt="Low water level" />
              <span className="w-full flex justify-center text-white text-[.6rem]">Ankle</span>
            </label>

            <label
              htmlFor="waterlevel2"
              className={`inline-block border-2 ${activeOption === 2 ? 'border-red-800' : 'border-transparent hover:border-blue-100 '}`}
              onClick={handleOption(0.4, 2)}
            >
              <img src="/img/crowdsource/2.png" width={100} height={100} alt="Medium water level" />
              <span className="w-full flex justify-center text-white text-[.6rem]">Knee</span>
            </label>

            <label
              htmlFor="waterlevel3"
              className={`inline-block border-2 ${activeOption === 3 ? 'border-red-800' : 'border-transparent hover:border-blue-100 '}`}
              onClick={handleOption(0.6, 3)}
            >
              <img src="/img/crowdsource/3.png" width={100} height={100} alt="High water level" />
              <span className="w-full flex justify-center text-white text-[.6rem]">Waist</span>
            </label>

            <label
              htmlFor="waterlevel3"
              className={`inline-block border-2 ${activeOption === 4 ? 'border-red-800' : 'border-transparent hover:border-blue-100 '}`}
              onClick={handleOption(0.9, 4)}
            >
              <img src="/img/crowdsource/4.png" width={100} height={100} alt="High water level" />
              <span className="w-full flex justify-center text-white text-[.6rem]">
                Neck and above
              </span>
            </label>
          </div>
        </div>

        <label htmlFor="description" className="block text-white mt-2">
          Description:
        </label>
        <textarea
          id="description"
          placeholder="Optional"
          name="description"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          className="w-full border rounded-md py-1.5 px-4 bg-blue-50 text-slate-900 resize-none"
          rows="3"
        ></textarea>

        <div className="flex justify-center mt-4 mb-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mt-4 text-white">{message}</div>
    </div>
  );
}

export default Form;
