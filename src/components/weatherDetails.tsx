import React from 'react';



interface WeatherDetailsProps {
  humidity: number | null;
  windSpeed: number | null;
  clouds : number | null;
  pressure :number | null

}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({pressure ,clouds, humidity, windSpeed }) => (
  <div className="weather-data">
    <div className="humidity">
      <div className="data-name">Pressure</div>
      <i className="fa-solid fa-tachometer-alt"></i>
      <div className="data">{pressure !== null ? `${pressure} hPa` : 'N/A'}</div>
    </div>
    <div className="humidity">
      <div className="data-name">Cloudiness</div>
<i className="fa-solid fa-cloud"></i>
      <div className="data">{clouds !== null ? `${clouds}%` : 'N/A'}</div>
    </div>
    <div className="humidity">
      <div className="data-name">Humidity</div>
      <i className="fa-solid fa-droplet"></i>
      <div className="data">{humidity !== null ? `${humidity}%` : 'N/A'}</div>
    </div>
    <div className="wind">
      <div className="data-name">Wind</div>
      <i className="fa-solid fa-wind"></i>
      <div className="data">{windSpeed !== null ? `${windSpeed} km/h` : 'N/A'}</div>
    </div>
  </div>
);

export default WeatherDetails;
