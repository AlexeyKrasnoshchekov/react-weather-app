import React from "react";

const geolocationWeather = ({ location, temperature, description }) => {


  return (
    <div class="location">
    <h1 class="location-place">{location}</h1>
    <div class="temperature">
        <div class="degree-section">
        <h2 class="temperature-degree">{temperature}</h2> 
        <span></span>
        </div>    
    </div> 
    <div class="degree-container">
        <i class="wi wi-icon"></i>
        <div class="temperature-description">{description}</div>
    </div>
    </div>
  );
};

export default geolocationWeather;
