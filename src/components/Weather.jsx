import React, { useState, useEffect } from 'react';
// import './Weather.css';
import axios from 'axios';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const fetchWeather = async (city) => {
    const W_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&APPID=${W_API_KEY}`;

    try {
      const response = await axios.get(url);
      // console.log(response.data);

      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation('');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setData({ notFound: true });
    }
  };

  const search = () => {
    if (location.trim() !== '') {
      fetchWeather(location);
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return 'bxs-sun text-orange-300';
      case 'Rain':
      case 'Drizzle':
        return 'bxs-cloud-rain text-sky-300';
      case 'Thunderstorm':
        return 'bxs-cloud-lightning text-blue-800';
      case 'Snow':
        return 'bxs-cloud-snow text-cyan-300';
      case 'Clouds':
      case 'Fog':
      case 'Haze':
      case 'Mist':
        return 'bxs-cloud text-neutral-50';
      default:
        return 'bxs-cloud text-neutral-50';
    }
  };

  const getWindDirection = (degrees) => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const adjustedDegrees = (degrees + 11.25) % 360;
    const index = Math.floor(adjustedDegrees / 22.5);

    return directions[index];
  };

  useEffect(() => {
    fetchWeather('Edmonton');
  }, []);

  return (
    <div className="weather w-full min-w-[28rem] h-[45%] bg-zinc-900 rounded-2xl py-8 px-[1.5rem] flex flex-col justify-center items-center gap-y-12">
      <div className="search flex flex-col gap-y-4">
        <div className="search-top flex items-center gap-x-3">
          <i className="fa-solid fa-location-dot text-[2.5rem] text-neutral-200 -translate-y-2"></i>
          <div className="location font-comfortaa text-[1.8rem] font-bold text-neutral-50 pl-2">
            {data.name}
            {data.sys ? `, ${data.sys.country}` : null}
          </div>
        </div>
        <div className="search-location relative">
          <input
            type="text"
            placeholder="Enter Location"
            className="w-[clamp(15rem,14cqi,25rem)] h-16 bg-transparent border-b-[0.1rem] border-[#aaa] text-[1.5rem] text-neutral-200 pl-4"
            value={location}
            onFocus={(e) => (e.target.value = '')}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i
            className="fa-solid fa-magnifying-glass absolute top-0 translate-y-1/2 right-4 text-[1.8rem] text-neutral-50"
            onClick={search}
          ></i>
        </div>
      </div>
      {data.notFound ? (
        <div className="font-comfortaa text-[1.6rem] text-neutral-200 mb-48">
          Not Found 😔
        </div>
      ) : (
        <div className="weather-data flex flex-col items-center">
          <i
            className={`bx ${
              data.weather &&
              data.weather[0] &&
              getWeatherIcon(data.weather[0].main)
            } text-[5rem] mb-3`}
          ></i>
          <div className="weather-type font-comfortaa text-[2rem] text-neutral-200 mb-6">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temp font-comfortaa text-[2rem] text-neutral-200 mb-4">
            {data.main ? `${Math.floor(data.main.temp)}℃` : null}
          </div>
          {/* For max/min temperatures
        <div className="temp-minmax font-comfortaa text-[1.4rem] text-neutral-400">
          {data.main ? (
            <>
              <i className="fa-solid fa-arrow-up text-[1.2rem]" />{' '}
              {Math.floor(data.main.temp_max)}℃ /{' '}
              <i className="fa-solid fa-arrow-down text-[1.2rem]" />{' '}
              {Math.floor(data.main.temp_min)}℃
            </>
          ) : null}
        </div> */}
          <div className="extra-info flex gap-6">
            <div className="humidity text-[1.6rem] text-neutral-400">
              {data.main ? (
                <>
                  <i className="fa-solid fa-droplet"></i> {data.main.humidity}
                  <span className="text-[1.2rem]">%</span>
                </>
              ) : null}
            </div>
            <div className="wind text-[1.6rem] text-neutral-400">
              {data.wind ? (
                <>
                  <i className="fa-solid fa-wind"></i>{' '}
                  {Math.floor(data.wind.speed)}
                  <span className="text-[1.2rem]"> m/s </span>
                  {getWindDirection(data.wind.deg)}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
