import React, { useState } from 'react';

const API_KEY = 'd843a42198ecd5bdc6e172286edb7e9d'; // Replace with your key or use env variable

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod === '404') {
        setWeather(null);
        setError('City not found. Try another.');
      } else {
        setWeather({
          name: data.name,
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
        setError('');
      }
    } catch (err) {
      setWeather(null);
      setError('Error fetching data. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <>
      {/* Animated Cloud Background */}
      <div className="clouds">
        <div className="cloud"></div>
        <div className="cloud"></div>
        <div className="cloud"></div>
      </div>

      {/* Weather Card */}
      <div className="weather-container">
        <h1>🌦 Weather App</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <img src={weather.icon} alt={weather.description} />
            <p>{Math.round(weather.temp)}°C</p>
            <p className="description">{weather.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
