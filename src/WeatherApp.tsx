import './index.css';
import sunny from './assets/images/sunny.png'
import cloudy from './assets/images/cloudy.png'
import rainy from './assets/images/rainy.png'
import snowy from './assets/images/snowy.png'
import WeatherDisplay from './components/WeatherDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import NotFound from './components/NotFound';
import WeatherDetails from './components/weatherDetails';
import SearchBar from './components/SearchBar';
import { useEffect, useState } from 'react';



interface WeatherData {
  main: string;
  description: string;
  icon: string;
}

interface SysData {
  country: string;
}

interface Data {
  name: string;
  sys: SysData;
  clouds: {
    all:number |null
  }
  wind: {
    speed: number | null;
  };
  main: {
    humidity: number | null;
    temp: number | null;
    pressure : number | null
  };
  weather: WeatherData[] | null;
}

const initialData: Data = {
  name: "",
  sys: {
    country: ""
  },
  clouds: {
    all:null 
  },
  wind: {
    speed: null
  },
  main: {
    humidity: null,
    temp: null,
    pressure: null
  },
  weather: null
};

const WeatherApp: React.FC = () => {
  const api_key = '0857bdfbf9822bcb5f4d0f481d5e160a';
  const [data, setData] = useState<Data>(initialData);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const defaultLocation = 'New York';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
      setLoading(false);
    };
    fetchDefaultWeather();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const search = async () => {
    if (location.trim() !== '') {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod !== 200) {
        setNotFound(true);
      } else {
        setNotFound(false);
        setData(searchData);
        setLocation('');
        console.log(data)

      }
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const weatherImages: { [key: string]: string } = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const backgroundImages: { [key: string]: string } = {
    Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
    Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
    Snow: 'linear-gradient(to right, #aff2ff, #fff)',
    Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Mist: 'linear-gradient(to right, #57d6d4, #71eeec)',
  };

  const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;
  const backgroundImage = data.weather
    ? backgroundImages[data.weather[0].main]
    : 'linear-gradient(to right, #f3b07c, #fcd283)';

  const currentDate = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

  return (
    <div className="container" style={{ backgroundImage }}>
      <div className="weather-app" style={{ backgroundImage: backgroundImage.replace('to right', 'to top') }}>
        <div className="search">
          <img
              src={`https://flagsapi.com/${data.sys.country}/flat/64.png`}
              alt="Country Flag"
              className="country-flag"
            />
          <div className="search-top">
            <i className="fa-solid fa-location-dot"> {data.name}</i>
            <div className="location"></div>
          </div>
          <SearchBar
            location={location}
            onChange={handleInputChange}
            onSearch={search}
            onKeyDown={handleKeyDown}
          />
        </div>
        {loading ? (
          <LoadingIndicator />
        ) : notFound ? (
          <NotFound />
        ) : (
          <>
            <WeatherDisplay
              weatherData={data.weather ? data.weather[0] : null}
              weatherImage={weatherImage}
              temperature={data.main ? data.main.temp : null}
            />
            <div className="weather-date">
              <p>{formattedDate}</p>
            </div>
            <WeatherDetails
              humidity={data.main ? data.main.humidity : null}
              windSpeed={data.wind ? data.wind.speed : null}
              clouds={data.clouds ? data.clouds.all : null }
              pressure={ data.main ? data.main.pressure : null }
            />            
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
