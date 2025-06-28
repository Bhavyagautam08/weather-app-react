import React, { useState, useEffect } from 'react';
import './HourlySlider.css';

const apiKey = '3e4500d23d39650407cb97ada2327e17';

const HourlySlider = ({ country, City }) => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const getThreeHourlyForecast = async () => {
      if (!City || !country) return;

      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${City},${country}&appid=${apiKey}&units=metric`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.list || !Array.isArray(data.list)) {
          alert('No 3-hour forecast data available.');
          return;
        }

        console.log("3-hour forecast API response:", data);

        // Only take next 5 intervals (3hr each = 15 hours)
        setHourlyData(data.list.slice(0, 5));
      } catch (err) {
        console.error('3-hour forecast fetch failed:', err);
        alert('Failed to fetch 3-hour forecast.');
      }
    };

    getThreeHourlyForecast();
  }, [City, country]);

  // 🕒 Extract display time for header
  const hourlyTimes = hourlyData.map((entry) => {
    const time = new Date(entry.dt * 1000);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  });

  /* 🔸 Optional: Old hourlyTimes logic you used
  const now = new Date();
  const hourlyTimes = Array.from({ length: 5 }, (_, i) => {
    const times = new Date(now.getTime() + i * 60 * 60 * 1000);
    const standTime = times.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
    return standTime;
  });
  */

  return (
    <div className="main">
      <div className="content">
        <br />
        <table className="table">
          <thead>
            <tr>
              {hourlyTimes.map((time, index) => (
                <th key={index}>{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="sec">
              {hourlyData.map((entry, index) => (
                <td key={index}>
                  <img
                    src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                    alt={entry.weather[0].main}
                    width="40"
                  />
                  <div>{entry.main.temp}°C</div>
                  <div>{entry.weather[0].main}</div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HourlySlider;
