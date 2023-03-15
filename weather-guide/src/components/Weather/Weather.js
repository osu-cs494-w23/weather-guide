import React, { useState, useEffect } from 'react';
import WeatherBroadcast from '../MainPage/WeatherBroadCast/Weather';

const APIKEY = '0efd39a5159ec4ff5bd0154841da469a';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
      fetch(url)
        .then(response => response.json())
        .then(data => setWeather(data))
        .catch(error => console.log(error));
    }
  }, [city]);

  return (
    <>
      <div>
        {weather &&
          <div>
            <h2>Weather Details for {weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp} °F</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} mph</p>
            <p>Conditions: {weather.weather[0].description}</p>
          </div>
        }
        <WeatherBroadcast onCityChange={handleCityChange} />
      </div>
    </>
  );
};

export default Weather;
