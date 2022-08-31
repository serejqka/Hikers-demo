import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoordinate, selectorWeather } from './weatherSlice';
import './Weather.css';

function Weather({ geo }) {
const dispatch = useDispatch();
const weatherSelector = useSelector(selectorWeather);
const geoArr = geo.split(',');

const searchLocation = async (event) => {
  dispatch(getCoordinate({ lat: geoArr[0], lon: geoArr[1] }));
};

useEffect(() => {
  searchLocation();
}, [dispatch]);

return (
  <div>
    <div className="weather-days">
      {weatherSelector && weatherSelector.map((day) => (
        <div className="weather-day" key={day.dt}>
          <div>
            <h5>{day.dt_txt.slice(5, 10).split('-').reverse().join('.')}</h5>
          </div>
          <div>
            {`${day.main.temp.toFixed(1)} °C`}
            <img className="weather-img" src={`/images/weather/${day.weather[0].main.toLowerCase()}.png`} alt="img" />
            <p>
              {`Ветер ${day.wind.speed.toFixed(1)} м/с`}
            </p>
          </div>
        </div>
      )
      )}
    </div>
  </div>
);
}

export default Weather;
