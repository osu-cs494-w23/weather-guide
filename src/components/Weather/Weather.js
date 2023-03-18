import React, { useState, useEffect } from 'react';
import './Weather.css';
import WeatherBroadcast from '../MainPage/WeatherBroadCast/Weather';

const APIKEY = '0efd39a5159ec4ff5bd0154841da469a';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (city) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKEY}`;
      
      Promise.all([fetch(weatherUrl), fetch(forecastUrl)])
        .then(([weatherResponse, forecastResponse]) => {
          return Promise.all([weatherResponse.json(), forecastResponse.json()]);
        })
        .then(([weatherData, forecastData]) => {
          setWeather(weatherData);
          setForecast(forecastData);
        })
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
        {forecast && (
          <div>
            <h2>Forecast Details for {forecast.city.name}, {forecast.city.country}</h2>
            <ul>
              {forecast.list.map((forecastItem) => (
                <li key={forecastItem.dt}>
                  <p>Date/Time: {forecastItem.dt_txt}</p>
                  <p>Temperature: {forecastItem.main.temp} °F</p>
                  <p>Humidity: {forecastItem.main.humidity}%</p>
                  <p>Conditions: {forecastItem.weather[0].description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <WeatherBroadcast onCityChange={handleCityChange} />
      </div>
    </>
  );
};

export default Weather;
