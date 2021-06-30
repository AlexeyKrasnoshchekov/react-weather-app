import React, { useState, useEffect } from "react";
import "./css/App.css";
import GeolocationWeather from "./GeolocationWeather.js";
import Form from "./Form.js";
import Weather from "./Weather.js";
import WeatherIcons from "./WeatherIcons.js";
import LineChart from "./WeatherChart.js";

function App() {
  let long;
  let lat;

  const proxy = "https://cors-anywhere.herokuapp.com/";
  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_ID2 = process.env.REACT_APP_API_ID2;

  // state for geo weather on load
  const [name, setName] = useState("Rostov-on-don");
  const [geoUrl, setGeoUrl] = useState();
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  // state for weather on click
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [weatherTimes, setWeatherTimes] = useState([]);
  const [iconTimes, setIconTimes] = useState("");

  // state for weather chart
  const [xlabels, setXlabels] = useState([]);
  const [ytemps, setYtemps] = useState([]);

  const getGeoUrl = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      let url = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${APP_ID}`;
      // console.log("api", api);
      // getFetchGeo(api);
      setGeoUrl(url);
    });
    
  };

  async function fetchGeoUrl() {
    let data = await fetch(geoUrl);
    let dataJSON = await data.json();
    // console.log("dataJSON", dataJSON);

    setName(dataJSON.name);
    setTemperature(Math.floor((dataJSON.main.temp - 32) * (5 / 9)));
    setDescription(dataJSON.weather[0].description);

    let code = dataJSON.weather[0].id;

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      setIcon("day-" + WeatherIcons[code].icon);
    }
  };

  const getWeatherClick = async () => {
    let api = `${proxy}api.openweathermap.org/data/2.5/forecast?q=${search}&cnt=8&units=metric&appid=${APP_ID2}`;
    let data = await fetch(api);
    let dataJSON = await data.json();
    let dataList = dataJSON.list;
    setCity(dataJSON.city.name);
    setWeatherTimes(dataList);
 
  };


  const updateSearch = (e) => {
    setSearch(e.target.value);
    // console.log("search", search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    // setQuery(search);
    getWeatherClick();
    setSearch("");
  };

  const getArr = () => {
    const timeArr = [];
    const tempArr = [];
    let timeFormat;
    weatherTimes.map((weatherTime => {
      timeFormat = (new Date(weatherTime.dt * 1000)).getHours();
      timeArr.push(timeFormat);
      tempArr.push(Math.floor(weatherTime.main.temp))
    }));
    setXlabels(timeArr);
    setYtemps(tempArr);
    
  }
  
  useEffect(() => {
    getGeoUrl();
  }, []);

  useEffect(() => {
    getArr();
  }, [weatherTimes]);

  useEffect(() => {
    fetchGeoUrl();
  }, [geoUrl]);

  return (
    <div className="App">
      <GeolocationWeather
        location={name}
        temperature={temperature}
        description={description}
        setTemperature={setTemperature}
        icon={icon}
      />
      <Form search={search} updateSearch={updateSearch} getSearch={getSearch} />
      <h2 className="place">{city}</h2>
      
      <h3 className="place">Weather by hours</h3>
      <LineChart 
              xlabels={xlabels}
              ytemps={ytemps}
            />
      <div className="weather-container">
      
        {weatherTimes.map((weatherTime) => (
            <Weather
            key={weatherTime.dt}
            date={weatherTime.dt}
            weatherTime={weatherTime.dt_txt}
            weatherDegree={weatherTime.main.temp}
            weatherFeels={weatherTime.main.feels_like}
            weatherCode={weatherTime.weather[0].id}
            weatherDescription={weatherTime.weather[0].description}
            setIconTimes={setIconTimes}
            iconTimes={iconTimes}
          />
           
        ))}
      </div>
    </div>
  );
}

export default App;
