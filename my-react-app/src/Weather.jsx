import React, { useState , useEffect } from 'react';
import './weather.css';
import { weatherIcons } from './assets/weather_icons';
import { weatherColors } from './assets/weatherColors';
import Suggestions from './Components/Suggestions.jsx'
import HourlySlider from './Components/HourlySlider.jsx';

const Weather = () => {
  const [City, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [ShowHourly , setShowHourly] = useState(false) ;

  const getWeather = async () => {
    if (!City) {
      alert('Please enter the city name first.');
      return;
    }

    const apiKey = '3e4500d23d39650407cb97ada2327e17';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
      alert(data.message || 'Invalid city');
      return;
    }
      setWeatherData(data);
      console.log(data); // optional debug
    } catch (error) {
      alert('Something went wrong');
      console.error(error);
    }
  };
  useEffect(() =>{
    setShowHourly(false) ;
  } , [weatherData ?.name]);

  const bgColor = weatherData
    ? weatherColors[weatherData.weather[0].main] || weatherColors.Default
    : weatherColors.Default;

  return (
   <section className="main-container" style={{
    backgroundColor: bgColor,
    transform: ShowHourly ? 'translateY(-2.5rem)' : 'translateY(0)'
  }}
>

      <div id="container">
        <div className="heading">
          <h1>Weather App</h1>
          {weatherData && (
            <h1>
              {weatherIcons[weatherData.weather[0].main] || weatherIcons.Default}
            </h1>
          )}
        </div>

        <div className="small">
          <h3>City name :</h3>
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                getWeather();
              }
            }}
          />
          <button className='submit' onClick={getWeather}>Click</button>
        </div>

        {weatherData && (
          <div className="full-info">
            <div className="main-data" style={{backgroundColor : bgColor}}>
              <div className="data">
              <h2>{weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p><p>Description: {weatherData.weather[0].description}</p></p>
              </div>
              <div className="suggestions">
              <Suggestions weatherType = {weatherData.weather[0].main} trigger ={weatherData.name + Date.now} />
              </div>
              </div>
           <div className="hourly-updates">
          <button className='hour' onClick = {() => setShowHourly(!ShowHourly)}>{ShowHourly ? 'Hide' : 'More-updates'}</button>
           </div>
           {ShowHourly && <HourlySlider country =  {weatherData.sys.country}  City={weatherData.name} />}
          </div>
        )}
      </div>
    </section>
  );
};

export default Weather;
