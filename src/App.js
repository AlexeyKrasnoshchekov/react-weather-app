import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { geolocationWeather } from "./geolocationWeather.js";

function App() {
  let long;
  let lat;

  navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
  });

  const proxy = "https://cors-anywhere.herokuapp.com/";
  const APP_ID = process.env.REACT_APP_API_ID;
  const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${APP_ID}`;

  const { currentWeather, setCurrentWeather } = useState({});
  // const { currentWeatherType, setCurrentWeatherType } = useState([]);

  const getWeather = async () => {
    let data = await fetch(api);
    let dataJSON = await data.json();

    setCurrentWeather(dataJSON);
    // setCurrentWeatherType(dataJSON);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="App">
      <geolocationWeather
        location = {currentWeather.name}
        temperature={currentWeather.main.temp}
        description={currentWeather.weather[0].description}
      />
    </div>
  );
}

export default App;
