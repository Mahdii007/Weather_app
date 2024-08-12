import React from 'react';
import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';

interface WeatherData {
  main: string;
}

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  weatherImage: string | null;
  temperature: number | null;
}

const weatherImages: { [key: string]: string } = {
  Clear: sunny,
  Clouds: cloudy,
  Rain: rainy,
  Snow: snowy,
  Haze: cloudy,
  Mist: cloudy,
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, weatherImage, temperature }) => (
  <div className="weather">
    <img src={weatherImage || weatherImages.Clear} alt="weather icon" />
    <div className="weather-type">{weatherData ? weatherData.main : 'N/A'}</div>
    <div className="temp">{temperature !== null ? `${Math.floor(temperature)}°` : 'N/A'}</div>
  </div>
);

export default WeatherDisplay;
